<template>
  <div class="fixed m-2 mt-16 text-white bg-gray-800 rounded sm:mt-6" style="box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;">
    <div class="flex flex-col items-end">
      <span class="px-2 mt-1 mr-1 text-white bg-teal-600 rounded-full cursor-pointer" @click="removeRequest"><i class="fa-solid fa-xmark"></i></span>
    </div>
    <h1 class="p-4 pl-2 text-3xl">Request a book</h1>
    <form @submit.prevent="requestBook" class="p-4">
      <div class="mb-2">
        <label for="book">Name of the Book</label>
        <input
          v-model="request.bookrequest"
          placeholder=". . . ."
          type="text"
          class="relative w-full p-2 pr-20 mt-2 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
        />
        <span v-if="error" class="absolute mt-2 ml-1 text-red-500 top-20 right-3">please enter a book</span>
      </div>
      <button
        class="w-full p-1 no-underline bg-teal-600 border border-teal-600 rounded hover:bg-transparent"
      >
        request
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data () {
    return{
      error : false,
      request : {
        bookrequest : "",
        user_id : 1
      }
    }
  },

  methods : {
    removeRequest() {
      this.$emit('close');
    },

    requestBook(){
      if (this.request.bookrequest) {
        axios.post('http://localhost:8000/api/bookrequests' , this.request)
          .then((response) => {
            console.log(response);
          })
          .catch((response) => {
            console.log(response);
          })
        this.$emit('close');
        this.$emit('requested');
      }
      else{
        this.error = true;
      }
    }
  }
};
</script>

<style>
</style>