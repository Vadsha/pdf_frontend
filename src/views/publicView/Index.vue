<template>
  <div class="w-screen text-gray-700">
    <div v-if="requestBookBox" class="fixed z-50 w-2/3 sm:left-1/3 sm:top-1/4">
      <RequestBook @requested="showRequestedMessage" @close="closeRequest" />
    </div>
    <div v-if="requestedBook" class="fixed flex justify-center w-[90%] p-6 text-white bg-teal-500 sm:w-1/3 top-1/2 sm:left-1/3 left-[1.2rem]">
        <span class="w-full text-center">Your book is requested</span>
      </div>

            <!--navbar for small screen -->
    <nav class="sticky top-0 z-50 flex w-screen p-1 text-white bg-gray-800 md:hidden">
      <div class="flex items-center w-1/2">
        <router-link :to="{name : 'HomeView'}">
            <h1 class="ml-4 text-xl text-teal-500">Nerdy <span class="text-red-500">Spot</span></h1>
        </router-link>
      </div>
      <div class="flex justify-end w-1/2">
        <button @click="menuOpened = !menuOpened" class="mr-2"><i class="fa-solid fa-bars"></i></button>
      </div>
    </nav>
    <transition name="navbar">
      <div v-if="menuOpened" class="fixed top-0 z-50 flex justify-end w-full h-screen">
        <ul class="relative flex flex-col items-center justify-center w-3/4 h-full text-xl bg-gray-50">
          <span @click="menuOpened = false" class="absolute text-xl right-3 top-3"><i class="fa-solid fa-xmark"></i></span>
          <li class="p-4">
            <router-link @click="menuOpened = false" :to="{name : 'HomeView'}" class="hover:scale-105 hover:text-teal-500">Home</router-link>
          </li>
          <li class="p-4">
            <router-link @click="menuOpened = false" :to="{name : 'ClientCategories'}"  class="hover:scale-105 hover:text-teal-500">Categories</router-link>
          </li>
          <li class="p-4">
            <router-link @click="menuOpened = false"  :to="{name : 'AllBooks'}" class="hover:scale-105 hover:text-teal-500">Books</router-link>
          </li>
          <li class="p-4">
            <button @click="requestBookBox = true; menuOpened = false" class="bg-teal-600 py-1.5 border  px-3 text-white rounded  hover:bg-transparent hover:border-teal-600 hover:text-gray-700">Request Book</button>
          </li>
        </ul>
      </div>
    </transition>

          <!--navbar for large screen -->
    <nav class="sticky top-0 z-50 hidden w-screen text-white bg-gray-800 md:flex">
      <div class="flex items-center w-1/3">
        <router-link :to="{name : 'HomeView'}">
            <h1 class="ml-4 text-3xl text-teal-500">Nerdy <span class="text-red-500">Spot</span></h1>
        </router-link>
      </div>
      <ul class="flex items-center justify-end w-2/3 mr-4">
        <li class="px-4">
          <router-link :to="{name : 'HomeView'}"  class="hover:scale-105 hover:text-teal-500">Home</router-link>
        </li>
        <li class="px-4">
          <router-link :to="{name : 'ClientCategories'}"  class="hover:scale-105 hover:text-teal-500">Categories</router-link>
        </li>
        <li class="px-4">
          <router-link :to="{name : 'AllBooks'}"  class="hover:scale-105 hover:text-teal-500">Books</router-link>
        </li>
        <li class="p-2">
          <button @click="requestBookBox = !requestBookBox" class="bg-teal-600 transition py-1.5 border border-teal-600  px-3 text-white rounded  hover:bg-transparent">Request Book</button>
        </li>
      </ul>
    </nav>

    <router-view class="z-40"></router-view>

      <!-- Footer -->
    <div class="py-4 text-gray-200 bg-gray-800">
        <p class="w-full text-center">@Your mama so fat that she fell from both side of the bed</p>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import RequestBook from '../../components/Request.vue'
  export default {
    components : {
      RequestBook,
    },
    data () {
      return {
        menuOpened : false,
        requestBookBox : false,
        requestedBook : false,
      }
    },

    mounted () {

    },

    methods : {
      closeRequest(){
        this.requestBookBox = false;
      },
      showRequestedMessage(){
        this.requestedBook = true;
        setTimeout(() => {
          this.requestedBook = false;
        } , 2000)
      },

    }
  }
</script>

<style scoped>
/* animation for navbar on small screens */
.navbar-enter-from {
  opacity: 0;
  transform: translateX(3rem);
}

.navbar-enter-active , .navbar-leave-active {
  transition: all 0.3s ease;
}

.navbar-leave-to {
  opacity: 0;
  transform: translateX(3rem);
}
</style>