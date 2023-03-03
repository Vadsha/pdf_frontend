<template>
  <div class="flex justify-center ">
    <div class="w-1/2 mt-6 rounded" style="background-color: #252c53">
      <form
            @submit.prevent="editFunction"
        class="relative mt-6 text-white rounded"
        style="background-color: #252c53"
      >
        <router-link class="p-2 py-1 ml-2 bg-teal-600 rounded" :to="{name : 'Categories'}"><i class="fa-solid fa-arrow-left"></i></router-link>
        <h1 class="p-2 mt-4 text-2xl">Edit (category name)</h1>
        <div class="p-2">
          <label for="name">Name</label>
          <input
            v-model="name"
            type="text"
            placeholder="search . . ."
            class="relative w-full p-2 pr-10 mt-2 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
          />
          <span v-if="error" class="absolute mt-1 text-red-500 left-2 bottom-10">please enter the name</span>
        </div>
        <div class="flex justify-end">
        <button
          class="w-16 p-1 my-4 mr-2 text-white no-underline bg-teal-600 rounded hover:text-green-400"
        >
          edit
        </button>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
      data () {
            return{
                  error : false,
                  name: "",
            }
      },
      methods : {
            editFunction(){
                  if (this.name) {
                        console.log(this.name);
                  }
                  else{
                        this.error = true;
                        setTimeout(() => {
                              this.error = false;
                        } , 3000)
                  }
            }
      }
};
</script>

<style>
</style>