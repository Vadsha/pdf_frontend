<template>
      <div class="relative flex justify-center w-screen">
        <div
          class="flex flex-wrap justify-center w-5/6 mt-16 ml-2 mr-56 text-gray-500 rounded-lg ">

        <div  class="absolute z-50 p-2 px-6 rounded top-16 right-2">Deleted comment</div>

        <div v-for="(request,index) in requests" :key="request.id" style="box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;" class="relative z-40 w-2/3 p-2 m-2 rounded-lg bg-sky-100">
            <button @click="deleteRequest(request.id , index)" class="absolute p-2 py-1 text-white bg-teal-600 rounded right-2 top-2 hover:text-gray-500"><i class="fa-solid fa-trash"></i></button>
            <h1 class="text-xl " >{{ request.user }}</h1>
            <span class="my-1"> {{ request.created_at }}</span>
            <p class="p-2 text-white bg-teal-600 rounded">{{ request.bookrequest }}</p>
        </div>

        <div class="flex justify-end w-2/3 mt-4">
          <span :class="[meta.prev ? '' : 'bg-gray-400']"  @click="getData(meta.prev)" class="px-3 pt-2 pb-1 mx-2 text-white bg-teal-600 rounded"><i class="fa-solid fa-arrow-left"></i></span>
          <span  class="px-3 pt-2 pb-1 mx-2 text-white bg-teal-600 rounded">{{ meta.current_page }}</span>
          <span :class="[meta.next ? '' : 'bg-gray-400']" @click="getData(meta.next)" class="px-3 pt-2 pb-1 mx-2 text-white bg-teal-600 rounded"><i class="fa-solid fa-arrow-right"></i></span>
        </div>

        </div>
      </div>
</template>
    
    <script>
    import router from "../../../router";
    import axios from "axios";
    import {useMessageStore} from '../../../stores/message.js'
    export default {
      data() {
        return {
          deleted : false,
          messageStore : useMessageStore(),
          message : false,
          requests : [],
          meta : {
            next : null,
            prev : null,
            current_page : null
          }
        };
      },
      mounted() {
        axios.get(`http://localhost:8000/api/bookrequests?page=1`)
            .then((response) => {
              this.storeMeta(response);
            })
      },
      methods : {
        storeMeta(response) {
          this.requests = response.data.data;                     //store data
          //for pagination
          this.meta.prev = response.data.meta.links[0].url;
          let index = response.data.meta.links.length - 1;
          this.meta.next = response.data.meta.links[index].url;
          this.meta.current_page = response.data.meta.current_page;
        },
       getData (link) {
          if (link) {
            axios.get(link)
            .then((response) => {
              this.storeMeta(response)
            })
          }
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