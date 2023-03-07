<template>
<div class="text-white"  style="background-color: #252c53;">
    <!-- Nav Bar -->
    <nav class="fixed top-0 z-40 flex justify-between w-screen h-12" style="background-color: #252c53;">
      <div class="w-1/3 mt-2">
        <router-link
          class="mx-6 text-3xl text-teal-600 no-underline hover:text-teal-600"
          to="/"
          ><span class="text-red-500">L</span>O<span class="text-red-500"
            >G</span
          >O</router-link
        >
      </div>

      <div class="relative flex w-1/3">
        <input
          type="text"
          placeholder="search . . ."
          class="relative w-full p-2 pr-10 mt-2 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
        />
        <button class="absolute text-gray-500 rounded right-2 top-4">
          <i class="ml-2 fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div class="flex justify-end w-1/3">
        <ul class="flex mt-1 mr-2">
          <li class="px-3 py-1 rounded cursor-pointer">
            <button
              class="p-1 px-2 text-white no-underline bg-teal-600 rounded hover:text-red-500"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- side bar -->
    <div class="fixed w-1/6 h-screen mt-12" style="background-color: #252c53;">
      <div class="py-2">
        <img
          src="../../images/profile.webp"
          class="inline w-1/6 ml-4 rounded-full"
          alt=""
        />
        <p class="inline mt-4 ml-4 text-2xl">Zwe Zar Ni</p>
      </div>
      <hr />
      
      <div class="flex flex-col">
        <router-link
          to="/admin"
          class="w-full p-2 text-center text-white bg-teal-600 hover:text-gray-700"
          ><i class="fa-solid fa-gauge"></i> Dashboard</router-link
        >
      </div>
      <hr />

      <div class="flex flex-col">
        <router-link
          :to="{ name : 'Categories' }"
          class="p-2 ml-12 hover:scale-105 hover:text-green-500"
          ><i class="fa-solid fa-bars"></i> Category</router-link
        >
        <router-link
          :to="{name : 'Tags'}"
          class="p-2 ml-12 hover:scale-105 hover:text-green-500"
          ><i class="fa-solid fa-tag"></i> Tags</router-link
        >
        <router-link
          :to="{name : 'Books'}"
          class="p-2 ml-12 hover:scale-105 hover:text-green-500"
          ><i class="fa-solid fa-book-open"></i> Books</router-link
        >
      </div>
      <hr />

      <div class="flex flex-col">
        <router-link
          to="/admin"
          class="p-2 ml-12 hover:scale-105 hover:text-green-500"
          ><i class="fa-solid fa-comment"></i> Notification</router-link
        >
        <router-link
          to="/admin"
          class="p-2 ml-12 hover:scale-105 hover:text-green-500"
          ><i class="fa-solid fa-pen"></i> Book Requests</router-link
        >
        <router-link
          to="/admin"
          class="p-2 ml-12 hover:scale-105 hover:text-green-500"
          ><i class="fa-solid fa-download"></i> Downloads</router-link
        >
      </div>
      <hr />
    </div>

    <!-- main feed -->
    <div class="absolute right-0 w-5/6">
      <RouterView />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>