<template>
  <div class="text-gray-500" >
      <!-- Request Book -->
      <Request
        @close="request = false"
        v-if="request"
        class="fixed z-50 top-24 left-1/3"
      />
      <!-- Nav Bar -->
      <nav class="fixed top-0 z-40 flex justify-between w-screen">
        <div class="w-1/4 mt-2">
          <router-link
            class="mx-6 text-3xl text-teal-600 no-underline hover:text-teal-600"
            to="/"
            ><span class="text-red-500">L</span>O<span class="text-red-500"
              >G</span
            >O</router-link
          >
        </div>

        <div class="relative flex justify-center w-2/3">
          <input
            @keydown="backspace"
            @keyup="filterSearch"
            type="text"
            placeholder="search . . ."
            class="relative w-2/3 p-2 mt-2 ml-12 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
          />
          <button class="absolute mr-2 text-gray-500 rounded right-24 top-4">
            <i class="ml-2 fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div class="flex justify-end w-1/3 text-white">
          <ul class="flex mt-1 mr-2">
            <li class="px-3 py-1 rounded cursor-pointer">
              <button
                @click="request = !request"
                class="p-1 px-2 no-underline bg-teal-600 rounded hover:text-gray-700"
              >
                <!-- Request Book -->
              </button>
            </li>
            <li class="px-3 py-1 rounded cursor-pointer">
              <button
                class="p-1 px-2 no-underline bg-teal-600 rounded hover:text-red-500 text-inherit"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </nav>



      Categories
      <div class="fixed z-10 text-white rounded-md bg-sky-100 top-24 left-6">
        <h1 class="py-1 text-2xl text-center text-gray-500">Categories</h1>
        <ul class="flex flex-wrap justify-around w-64 p-2">
          <li
            class="p-1 px-3 m-1 bg-teal-600 rounded cursor-pointer hover:text-gray-700"
          >
            <button @click="seeAll">All</button>
          </li>

          <li
            class="p-1 px-2 m-1 bg-teal-600 rounded cursor-pointer hover:text-gray-700"
            v-for="category in categories"
            :key="category"
          >
            <button @click="filterByCategory(category.id)">
              {{ category.name }}
            </button>
          </li>
        </ul>
      </div>

      Tags
      <div
        class="fixed z-10 text-white rounded-md md:block bg-sky-100 top-24 right-6"
      >
        <h1 class="py-1 text-2xl text-center text-gray-500">Tags</h1>
        <ul class="flex flex-wrap justify-around w-64 p-2">
          <li
            class="p-1 px-3 m-1 bg-teal-600 rounded cursor-pointer hover:text-gray-700"
          >
            <button @click="seeAll">#All</button>
          </li>
          <li
            class="p-1 px-2 m-1 bg-teal-600 rounded cursor-pointer hover:text-gray-700"
            v-for="tag in tags"
            :key="tag"
          >
            #
            <button @click="filterByTag(tag.name)">{{ tag.name }}</button>
          </li>
        </ul>
      </div>
    </div>
</template>
    
    <script>
    import Request from './Request.vue';
    import axios from 'axios';
    // import Slider from "./components/Slider.vue";
    export default {
      components: { Request },
      data() {
        return {
          request : false,
          logoutBtn: false,
          tags: [],
          categories: [],
        };
      },
    
      mounted(){
        axios.get('http://localhost:8000/api/categories')
          .then((response) => {
            this.categories = response.data.data;
          })
          .catch((response) => {
            console.log(response);
          });
          axios.get('http://localhost:8000/api/tags')
          .then((response) => {
            this.tags = response.data.data;
          })
          .catch((response) => {
            console.log(response);
          });
      },

      methods: {
        removeRequest(){
          this.request = !this.request;
        },
        filterByTag(name) {
      let tagForm = { tag: name };
      axios
        .post("http://localhost:8000/api/bytag", tagForm)
        .then((response) => {
          this.books = response.data.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },

    filterByCategory(category) {
      let categoryForm = { id: category };
      axios
        .post("http://localhost:8000/api/bycategory", categoryForm)
        .then((response) => {
          this.books = response.data.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },

    seeAll() {
      axios
        .get("http://localhost:8000/api/books")
        .then((response) => {
          this.books = response.data.data;
        })
        .catch((response) => {
          console.log(response);
        });
    },
      },
    };
    </script>
    
    <style>
</style>
    