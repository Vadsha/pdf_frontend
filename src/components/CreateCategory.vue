<template>
  <div class="fixed flex justify-center text-gray-500">

    <form
      class="relative w-1/2 mt-20 text-white rounded"
      style="background-color: #252c53"
      @submit.prevent="createCategory"
    >
    <span
      @click="removeCreate"
      class="absolute right-0 px-2 py-1 m-1 text-sm bg-teal-600 rounded cursor-pointer"
      
      ><i class="fa-solid fa-x"></i></span
    >
      <h1 class="p-2 mt-4 text-2xl">Create Category</h1>
      <div class="p-2">
        <label for="name">Name</label>
        <input
          v-model="name"
          type="text"
          placeholder="search . . ."
          class="relative w-full p-2 pr-10 mt-2 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
        />
        <span v-if="error" class="absolute ml-1 text-red-500 left-1 top-36"
          >please enter a category</span
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
export default {
  data() {
    return {
      error: false,
      name: "",
    };
  },
  methods: {
      removeCreate(){
            this.$emit('close');
      },

    createCategory() {
      if (!this.name) {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      } else {
        console.log(this.name);
        this.$emit('close');
      }
    },
  },
};
</script>
    
    <style>
</style>