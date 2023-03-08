<template>
  <div class="fixed flex justify-center w-screen text-gray-500">
    <form
      class="relative w-1/2 mt-16 text-white rounded-lg mr-36"
      style="background-color: #252c53"
      @submit.prevent="editBook"
    >
      <router-link
        class="absolute p-2 py-1 ml-2 bg-teal-600 rounded top-2"
        :to="{ name: 'Books' }"
        ><i class="fa-solid fa-arrow-left"></i
      ></router-link>
      <h1 class="p-2 mt-12 text-2xl">Edit Book</h1>

      <div class="flex flex-wrap justify-between">
        <div class="relative w-1/2 p-2 py-1">
          <label for="name">Name</label>
          <input
            v-model="formData.name"
            type="text"
            placeholder="name"
            class="relative w-full p-2 pr-10 mt-2 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
          />
          <div v-if="errors.name" class="absolute text-red-500 right-2 text-end">{{ errors.name[0] }}</div>
        </div>

        <div class="relative w-1/2 p-2 py-1">
          <label for="author">Author</label>
          <input
            v-model="formData.author"
            type="text"
            placeholder="author"
            class="relative w-full p-2 pr-10 mt-2 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
          />
          <div v-if="errors.author" class="absolute text-red-500 right-2 text-end">{{ errors.author[0] }}</div>
        </div>

        <div class="relative w-1/2 p-2 py-1">
          <label for="file">File</label>
          <input
            @change="insertFile"
            type="file"
            class="relative w-full p-2 pr-10 mt-2 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
          />
          <div v-if="errors.file" class="absolute text-red-500 right-2 text-end">{{ errors.file[0] }}</div>
        </div>

        <div class="relative w-1/2 p-2 py-1">
          <label for="category">Category</label>
          <select
            class="relative w-full p-2 pr-10 mt-2 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
            v-model="formData.category_id"
            id=""
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <div v-if="errors.category" class="absolute text-red-500 right-2 text-end">{{ errors.category[0] }}</div>
        </div>

        <div class="flex w-full p-2 py-1">
            <div class="relative w-1/2">
                  <label for="image">Image</label><br>
                  <input
                        @change="insertImage"
                        type="file"
                        class="relative w-full p-2 pr-10 mt-2 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                  />
                  <div v-if="errors.image" class="absolute text-red-500 right-2 text-end">{{ errors.image[0] }}</div>
            </div>
          <img v-if="previewImage" style="width: 75px; height:90px ;" class="mt-2 ml-12 rounded" :src="previewImage" alt="">
        </div>

        

        <div class="w-full p-2 py-1">
          <label for="author">Description</label>
            <textarea             
                  class="relative w-full p-2 pr-10 mt-2 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
                  v-model="formData.description" id="" cols="30" rows="2" >
            </textarea>
            <div v-if="errors.description" class="absolute text-red-500 right-2 text-end">{{ errors.description[0] }}</div>
        </div>

        <div class="relative flex w-1/2 p-2 py-1">
          <div class="p-1 m-auto bg-teal-600 rounded" v-for="tag in tags" :key="tag.id">
            <input class="mr-1" type="checkbox" :value="tag.name" v-model="formData.tags" />
            <label for="crime">{{ tag.name }}</label>
            <div v-if="errors.tags"  class="absolute mt-2 text-red-500 right-6 text-end">please select some tags</div>
          </div>
        </div>


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
</template>
        
    <script>
import { useMessageStore } from "../../../../stores/message.js";
import router from "../../../../router";
import axios from "axios";
export default {
  data() {
    return {
      slug : this.$route.params.slug,
      categories: [],
      tags: [],
      previewImage : "",
      file : '',        //to mutate pdf file
      image : '',   //to mutate image
      messageStore: useMessageStore(),

      formData: {     //to upload
        name: "",
        author: "",
        description: "",
        file: '',
        image: '',
        category_id: null,
        tags: [],
      },

      errors : {}   //for response errors

    };
  },

  mounted() {
    //book
    axios
      .get("http://localhost:8000/api/books/" + this.slug)
      .then((response) => {
        this.formData = response.data.data;
      })
      .catch((response) => {
        console.log(response);
      });
    //categories
    axios
      .get("http://localhost:8000/api/categories")
      .then((response) => {
        this.categories = response.data.data;
      })
      .catch((response) => {
        console.log(response);
      });

    //tags
    axios
      .get("http://localhost:8000/api/tags")
      .then((response) => {
        this.tags = response.data.data;
      })
      .catch((response) => {
        console.log(response.data.errors);
      });
  },

  methods: {
    editBook() {
      let form = new FormData();
      form.set('file' , this.formData.file);
      form.set('image' , this.formData.image)
      form.set('name' , this.formData.name)
      form.set('author' , this.formData.author)
      form.set('description' , this.formData.description)
      form.set('category_id' , this.formData.category_id)
      form.set('tags' , this.formData.tags)

      axios
        .put("http://localhost:8000/api/books/" + this.slug , form)
        .then((response) => {
          let name = response.data.data.name;
          this.messageStore.updateMessage(
            name,
            "has been created successfully"
          );
          router.push("/admin/books"); 
        })
        .catch((response) => {
          this.errors = response.response.data.errors;
          console.log(this.errors);
        });
    },

    insertFile(event) {
      this.formData.file = event.target.files[0];
    },

    insertImage(event) {
      if (event.target.files.length) {
        this.formData.image = event.target.files[0];
        this.previewImage = URL.createObjectURL(event.target.files[0])
      }
    },
  },
};
</script>
        
        <style>
</style>