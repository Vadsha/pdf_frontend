<template>
  <div>

      <!-- Nav Bar for Large Screen -->
    <nav class="sticky top-0 z-50 flex justify-between w-screen p-2 text-white bg-gray-800">
      <div class="flex">
        <router-link :to="{name : 'HomeView'}">
          <h1 class="text-teal-500 sm:text-3xl">Nerdy <span class="text-red-500">Spot</span></h1>
        </router-link>
      </div>
      <div class="hidden md:block">
        <button class="px-3 py-1 mx-4 bg-teal-500 rounded hover:bg-teal-400">Log Out</button>
      </div>
    </nav>

    <div class="flex justify-between w-screen">
      
        <div  class="sticky top-0 flex flex-col items-center w-1/6 h-screen text-white bg-gray-800">
            <div class="flex w-full p-8 py-4">
              <img class="w-8 mr-2 rounded-full h-fit" src="../../assets/images/profile.webp" alt="">
              <h1 class="my-auto text-xl text-teal-500">{{ userStore.name }}</h1>
            </div>
            <router-link class="w-full py-2 text-center bg-teal-500 hover:bg-teal-400" :to="{name : 'dashboard-view'}">
              DASHBOARD
            </router-link>
            <ul class="w-full px-8 py-2">
              <li v-for="item in navItems" :key="item.name" class="py-2">
                  <router-link :to="{name : item.path}" class="hover:text-teal-500">
                    <i :class="item.icon"></i><span class="ml-2">{{ item.name }}</span>
                  </router-link>
              </li>
            </ul>
        </div>

      <div class="z-30 w-5/6">
        <router-view></router-view>
      </div>

    </div>

  </div>
</template>

<script>
import { useUserStore } from '../../stores/user';
export default {
  data () {
    return {
      userStore : useUserStore(),
      navItems : [
      {
          name : 'Manage Users',
          path : 'Categories',
          icon : 'fa-solid fa-user'
        },
        {
          name : 'Categories',
          path : 'Categories',
          icon : 'fa-solid fa-circle-check'
        },
        {
          name : 'Tags',
          path : 'Tags',
          icon : 'fa-solid fa-tag'
        },
        {
          name : 'Books',
          path : 'Books',
          icon : 'fa-solid fa-book-open'
        },
        {
          name : 'Book Requests',
          path : 'BookRequests',
          icon : 'fa-solid fa-heart'
        },
        {
          name : 'Notifications',
          path : 'Notifications',
          icon : 'fa-solid fa-bell'
        },
        {
          name : 'Downloads',
          path : 'Downloads',
          icon : 'fa-solid fa-circle-down'
        },
      ]
    }
  }
};
</script>

<style scoped>

</style>