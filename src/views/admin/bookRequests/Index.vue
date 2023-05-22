<template>
      <div class="relative flex justify-center">
        <div
          class="flex flex-wrap p-2 text-gray-500 rounded-lg ">

        <div v-for="(request,index) in requests" :key="request.id" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;" class="relative z-40 w-[47%] p-2 m-2 rounded-lg bg-sky-100">
            <button @click="deleteRequest(request.id , index)" class="absolute p-2 py-1 text-white bg-teal-600 rounded right-2 top-2 hover:text-gray-500"><i class="fa-solid fa-trash"></i></button>
            <h1 class="text-xl " >{{ request.user }}</h1>
            <span class="my-1"> {{ request.created_at }}</span>
            <p class="p-2 text-white bg-gray-800 rounded">{{ request.bookrequest }}</p>
        </div>

        <div v-show="page < lastPage" class="flex justify-center w-full p-6">
          <button class="animate-bounce" @click="addRequests">see more</button>
        </div>

        </div>
      </div>
</template>
    
<script>
import {useMessageStore} from '../../../stores/message.js'
import ApiService from '../../../Apiservice';
    export default {
      data() {
        return {
          messageStore : useMessageStore(),
          message : false,
          requests : [],
          page : 1,
          lastPage : null
        };
      },

      mounted() {
        this.getRequests();
      },

      methods : {
        getRequests () {
          ApiService.get(`bookrequests?page=${this.page}`)
            .then((response) => {
              this.requests.push(...response.data.data)
              this.lastPage = response.data.meta.last_page
            })
        },
        addRequests () {
          this.page++;
          this.getRequests();
        },
        deleteRequest (id , index) {
          if (index > -1) {
            this.requests.splice(index , 1);
          }
          axios.delete('http://localhost:8000/api/bookrequests/' + id , id)
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