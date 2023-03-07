<template>
  <div class="flex justify-center">
    <div class="w-1/2 mt-24 rounded" style="background-color: #252c53">
      <form
        @submit.prevent="editFunction"
        class="relative mt-6 text-white rounded"
        style="background-color: #252c53"
      >
        <router-link
          class="p-2 py-1 ml-2 bg-teal-600 rounded"
          :to="{ name: 'Categories' }"
          ><i class="fa-solid fa-arrow-left"></i
        ></router-link>
        <h1 class="p-2 mt-4 text-2xl">Edit Category - {{ oldData.name }}</h1>
        <div class="p-2">
          <label for="name">Name</label>
          <input
            v-model="newData.name"
            type="text"
            placeholder="search . . ."
            class="relative w-full p-2 pr-10 mt-2 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
          />
          <span v-if="error" class="absolute mt-1 text-red-500 left-2 bottom-10"
            >please enter the name</span
          >
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
import router from "../../../router";
import axios from "axios";
import { useMessageStore } from "../../../stores/message.js";
export default {
  data() {
    return {
      messageStore: useMessageStore(),
      slug: this.$route.params.slug,
      error: false,
      oldData: {
        name: "",
      },
      newData: {
        name: "",
      },
    };
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/categories/" + this.slug)
      .then((response) => {
        this.oldData.name = response.data.data.name;
      });
  },
  methods: {
    editFunction() {
      if (this.newData.name) {
        axios
          .patch(
            "http://localhost:8000/api/categories/" + this.slug,
            this.newData
          )
          .then((response) => {
            let name = response.data.data.name;
            this.messageStore.updateMessage(
              name,
              "has been updated successfully"
            );
            router.push("/admin/categories");
          })
          .catch((response) => {
            console.log(response);
            this.error = true;
            setTimeout(() => {
              this.error = false;
            }, 3000);
          });
      } else {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 3000);
      }
    },
  },
};
</script>

<style>
</style>