<template>
      <div class="w-screen">
            <div class="w-5/6 py-6 mx-auto">
                  <div class="flex-wrap p-2 sm:flex justify-evenly" v-for="category in categories" :key="category.id">
                  <h1 class="w-full text-xl">{{ category.name }}</h1>
                  <div class="sm:w-[30%] p-4" v-for="book in category.books" :key="book.id">
                        <router-link :to="{name : 'HomeView'}">
                              <img class="w-full transition hover:scale-105" :src="baseUrl + book.image"  alt="">
                        </router-link>
                        <div class="flex justify-between p-2">
                              <h1 class="font-bold">{{ book.name }}</h1>
                              <button class="px-3 text-xl text-white bg-teal-500 rounded h-fit"><i class="fa-solid fa-download"></i></button>
                        </div>
                  </div>
                  <div class="mx-auto my-auto w-fit animate-bounce">
                        <router-link :to="{name : 'BooksByCategories' , params : {id : category.id}}" class="hover:text-teal-500">
                              {{ category.seemore }}
                        </router-link>
                  </div>
            </div>
            </div>
      </div>
</template>

<script>
import axios from 'axios'
      export default {
            data () {
                  return {
                        categories : [],
                        baseUrl : 'http://localhost:8000/storage/photos/'
                  }
            },

            mounted () {
                  this.getCategories();
            },

            methods : {
                  getCategories () {
                        axios.get('http://localhost:8000/api/client/get-categories')
                              .then((response) => {
                                    this.categories = response.data.data;
                                    this.categories.forEach((category) => {
                                          if (category.books.length > 3) {
                                                category['seemore'] = 'See More';
                                          }
                                          category.books = category.books.slice(0,3);
                                    })
                              })
                              .catch((response) => {
                                    console.log(response);
                              })
                  }
            }
      }
</script>

<style scoped>

</style>