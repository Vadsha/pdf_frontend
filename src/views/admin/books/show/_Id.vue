<template>
  <div class="flex justify-center">
    <div class="w-1/2 mt-16 rounded" style="background-color: #252c53">
      <div class="relative rounded-lg">
        <router-link
          class="absolute p-2 py-1 ml-1 bg-teal-600 rounded top-1"
          :to="{ name: 'Books' }"
          ><i class="fa-solid fa-arrow-left"></i
        ></router-link>
        <img class="rounded-t w-fit" :src="book.image" alt="" />
        <ul class="p-2">
          <li class="py-2 border-b-2">Name : {{ book.name }}</li>
          <li class="py-2 border-b-2">Author : {{ book.author }}</li>
          <li class="py-2 border-b-2">Category : {{ book.category }}</li>
          <li class="py-2 border-b-2">
            Tags :
            <span
              class="px-1 m-1 bg-teal-600 rounded"
              v-for="tag in book.tags"
              :key="tag"
              >{{ tag }}
            </span>
          </li>
          <li class="py-2 border-b-2">Description : {{ book.description }}</li>
          <li class="flex justify-end py-2">
            <button
              class="p-1 px-3 mx-2 bg-teal-600 rounded hover:text-gray-600"
              @click="downloadBook"
            >
              <i class="fa-solid fa-download"></i>
            </button>
            <router-link
              class="p-1 px-3 mx-2 bg-teal-600 rounded hover:text-gray-600"
              :to="{ name: 'EditBook', params: { slug: slug } }"
              ><i class="fa-solid fa-pen"></i
            ></router-link>
            <button
              class="p-1 px-3 mx-2 bg-teal-600 rounded hover:text-red-600"
              @click="deleteBook"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useMessageStore } from '../../../../stores/message';
import router from '../../../../router';
export default {
  data() {
    return {
      messageStore : useMessageStore(),
      slug: this.$route.params.slug,
      book: {},
    };
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/books/" + this.slug)
      .then((response) => {
        this.book = response.data.data;
      });
  },
  methods: {
    downloadBook(){
      // axios({
      //   url: 'http://localhost:8000/api/download', // File URL Goes Here
      //   method: 'POST',
      //   responseType: 'arraybuffer',
      //   data : {
      //     book : this.book.file
      //   }
      // })
      // .then((response) => {
      //   console.log(response);
      // })
      // .catch((response) => {
      //   console.log(response);
      // });
    },

    deleteBook(){
      axios.delete('http://localhost:8000/api/books/' + this.slug)
      .then((response) => {
        let name = this.book.name;
        this.messageStore.updateMessage(name , "has been deleted successfully!");
        router.push('/admin/books');
      })
      .catch((response) => {
        console.log(response);
      })
    }
}
}
</script>

<style>
</style>