<template>
      <div class="fixed flex justify-center w-screen text-gray-500">
        <form
          class="relative w-1/2 mt-20 text-white rounded-lg mr-36"
          style="background-color: #252c53"
          @submit.prevent="createTag"
        >
        <router-link
          class="absolute p-2 py-1 ml-2 bg-teal-600 rounded top-2"
          :to="{ name: 'Tags' }"
          ><i class="fa-solid fa-arrow-left"></i
        ></router-link>
          <h1 class="p-2 mt-12 text-2xl">Create Tag</h1>
          <div class="p-2">
            <label for="name">Name</label>
            <input
              v-model="formData.name"
              type="text"
              placeholder="search . . ."
              class="relative w-full p-2 pr-10 mt-2 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
            />
            <span v-if="error" class="absolute ml-1 text-red-500 left-1 bottom-12"
              >please enter a tag</span
            >
          </div>
          <div class="flex justify-end">
            <button
              class="w-16 p-1 my-4 mr-2 text-white no-underline bg-teal-600 rounded hover:text-green-400"
            >
              create
            </button>
          </div>
        </form>
      </div>
    </template>
        
    <script>
    import { useMessageStore } from "../../../stores/message.js";
    import router from "../../../router";
import ApiService from '../../../Apiservice.js';
    export default {
      data() {
        return {
          messageStore : useMessageStore(),
          error: false,
          formData : {
            name : ""
          }
        };
      },
      methods: {
        createTag() {
          if (this.formData.name) {
            ApiService.post('tags' , this.formData)
            .then((response) => {
              let name = response.data.data.name;
              this.messageStore.updateMessage(name , "has been created successfully");
              router.push("/admin/tags");
            })
            .catch((response) => {
              console.log(response.data.data.errors);
            })
          } else {
            this.error = true;
            setTimeout(() => {
              this.error = false;
            }, 3000);
          }
        },
      },
    };
    </script>
        
        <style>
    </style>