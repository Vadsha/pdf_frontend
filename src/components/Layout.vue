<template>
      <div class="text-gray-500"   style="background-color: #252c53;">
    
        <!-- Request Book -->
        <Request  @close="request = false" v-if="request" class="fixed z-50 top-24 left-1/3" />
        <!-- Nav Bar -->
        <nav class="sticky z-40 flex justify-between w-screen">
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
                  Request Book
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
    
        <!-- Slider -->
        <!-- <Slider class="z-10" /> -->
    
        <!-- Categories -->
        <div class="fixed z-10 text-white rounded-md bg-sky-100 top-24 left-6">
          <h1 class="py-1 text-2xl text-center text-gray-500">Categories</h1>
          <ul class="flex flex-wrap justify-around w-64 p-2">
            <li
              class="p-1 px-3 m-1 bg-teal-600 rounded cursor-pointer hover:text-gray-700"
            >
              <router-link to="/">All</router-link>
            </li>
    
            <li
              class="p-1 px-2 m-1 bg-teal-600 rounded cursor-pointer hover:text-gray-700"
              v-for="category in categories"
              :key="category"
            >
              <router-link
                :to="{ name: '_Category', params: { category: category } }"
                >{{ category }}</router-link
              >
            </li>
          </ul>
        </div>
    
        <!-- Tags -->
        <div class="fixed z-10 text-white rounded-md bg-sky-100 top-24 right-6">
          <h1 class="py-1 text-2xl text-center text-gray-500">Tags</h1>
          <ul class="flex flex-wrap justify-around w-64 p-2">
            <li
              class="p-1 px-3 m-1 bg-teal-600 rounded cursor-pointer hover:text-gray-700"
            >
              <router-link to="/">#All</router-link>
            </li>
            <li
              class="p-1 px-2 m-1 bg-teal-600 rounded cursor-pointer hover:text-gray-700"
              v-for="tag in tags"
              :key="tag"
            >
              #
              <router-link :to="{ name: '_Tag', params: { tag: tag } }">{{
                tag
              }}</router-link>
            </li>
          </ul>
        </div>
    
      </div>
    </template>
    
    <script>
    import Request from './Request.vue';
    // import Slider from "./components/Slider.vue";
    export default {
      components: { Request },
      data() {
        return {
          request : false,
          logoutBtn: false,
          tags: ["Comedy", "Crime", "Fantasy", "Romance", "Si-Fi"],
          categories: [
            "Science",
            "Life Style",
            "Novel",
            "Physics",
            "Languages",
            "Cooking",
          ],
        };
      },
    
      methods: {
        removeRequest(){
          this.request = !this.request;
        }
      },
    };
    </script>
    
    <style>
    </style>
    