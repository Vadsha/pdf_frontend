<template>
      <div class="flex justify-center w-screen">
        <div
          class="relative flex flex-wrap justify-center w-5/6 ml-2 mr-56 text-gray-500 rounded-lg"
        >
        <div v-if="deleted" class="absolute z-50 p-2 px-6 bg-teal-600 rounded top-2 right-2">Deleted comment</div>
        <div v-for="(comment,index) in comments" :key="comment.id" style=" box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;" class="relative z-40 w-2/3 p-2 m-2 rounded-lg bg-sky-100">
          <button @click="deleteComment(comment.id , index)" class="absolute p-2 py-1 text-white bg-teal-600 rounded right-2 top-2 hover:text-gray-500"><i class="fa-solid fa-trash"></i></button>
          <h1 class="mr-8 text-xl" >{{ comment.user }} <span class="text-lg text-gray-400">@{{ comment.book }}</span></h1>
          <span class="my-1"> {{ comment.created_at }}</span>
          <p class="p-2 text-white bg-gray-800 rounded ">{{ comment.comment }}</p>
        </div>

        <div v-show="page < lastPage" class="flex justify-center w-full p-6">
          <button class="animate-bounce" @click="addRequests">see more</button>
        </div>
        </div>
      </div>
    </template>
    
    <script>
import ApiService from '../../../Apiservice.js';
import {useMessageStore} from '../../../stores/message.js'
    export default {

      data() {
        return {
          deleted : false,
          messageStore : useMessageStore(),
          message : false,
          comments : [],
          page : 1,
          lastPage : null
        };
      },
      mounted() {
        this.getComments();
      },
      methods : {
        getComments () {
          ApiService.get(`comments?page=${this.page}`)
            .then((response) => {
              console.log(response);
              this.comments.push(...response.data.data)
              this.lastPage = response.data.meta.last_page
            })
        },

        addRequests () {
          this.page++;
          this.getComments();
        },

        deleteComment (id , index) {
          if (index > -1) {
            this.comments.splice(index , 1);
          }
          axios.delete('http://localhost:8000/api/comments/' + id , id)
          .then((response) => {
            this.deleted = true;
            setTimeout(() => {
              this.deleted = false;
            } , 1500);
          })
          .catch((response) => {
            console.log(response);
          })
          },
          
      }
    };
    </script>
    
    <style>
    th,
    td {
      padding: 10px;
    }
    </style>