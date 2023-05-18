<template>
  <div>

      <!-- Nav Bar for Large Screen -->
    <nav class="sticky top-0 z-50 flex justify-between w-screen p-2 text-white bg-gray-800">
      <div class="flex">
        <router-link :to="{name : 'dashboard-view'}">
          <h1 class="text-teal-500 sm:text-3xl">Nerdy <span class="text-red-500">Spot</span></h1>
        </router-link>
      </div>
      <div class="hidden md:block">
        <button class="px-3 py-1 mx-4 bg-teal-500 rounded hover:bg-teal-400">Log Out</button>
      </div>
    </nav>

    <div class="flex justify-between w-screen">
      
      <transition name="navbar">
          <div  class="flex flex-col items-center w-1/6 h-screen text-white bg-gray-800">
                <div class="flex py-4">
                  <img class="w-8 my-auto mr-2 rounded-full h-fit" src="../../assets/images/profile.webp" alt="">
                  <h1 class="my-auto">Vaddshah Raduv</h1>
                </div>
                <router-link class="w-full py-2 text-center bg-teal-500 hover:bg-teal-400" :to="{name : 'dashboard-view'}">
                  DASHBOARD
                </router-link>
                 <ul class="w-full px-8 py-2">
                    <li v-for="item in navItems" :key="item.name" class="py-2">
                        <router-link :to="{name : item.path}" class="hover:text-teal-500">
                          {{ item.name }}
                        </router-link>
                    </li>
                  </ul>
        </div>
      </transition>

      <div class="z-30 w-5/6">
        <router-view></router-view>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      navItems : [
      {
          name : 'Manage Users',
          path : 'Categories',
          icon : 'text-red-500'
        },
        {
          name : 'Categories',
          path : 'Categories',
          icon : 'text-red-500'
        },
        {
          name : 'Tags',
          path : 'Tags',
          icon : 'text-red-500'
        },
        {
          name : 'Books',
          path : 'Books',
          icon : 'text-red-500'
        },
        {
          name : 'Book Requests',
          path : 'BookRequests',
          icon : 'text-red-500'
        },
        {
          name : 'Notifications',
          path : 'Notifications',
          icon : 'text-red-500'
        },
        {
          name : 'Downloads',
          path : 'Downloads',
          icon : 'text-red-500'
        },
      ]
    }
  }
};
</script>

<style scoped>
.navbar-enter-from {
  opacity: 0;
  transform: translateX(-6rem);
}

.navbar-enter-active , .navbar-leave-active {
  transition: all 0.3s ease;
}

.navbar-leave-to {
  opacity: 0;
  transform: translateX(-6rem);
}
</style>