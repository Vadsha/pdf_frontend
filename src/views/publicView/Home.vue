<template>
      <div class="w-screen">

            <Quotes :message="quoteMessage" :speaker="quoteSpeaker" />

                  <!-- Latest Books -->
            <div  class="p-4 mx-auto sm:w-5/6">
                  <h1 class="py-4 text-2xl">Latest Books</h1>
                  <div class="flex-wrap sm:flex">
                        <div  class=" flex flex-col items-center my-8 sm:w-[33%] hover:scale-110 transition" v-for="book in books" :key="book.id">
                              <router-link :to="{name : 'ShowBook' , params : {slug : book.slug}}" class="flex justify-center w-full">
                                    <img :src="book.image" class="w-3/4" alt="">
                              </router-link>
                              <div class="flex justify-between w-3/4 p-2">
                                    <h1 class="font-bold">{{ book.name }}</h1>
                                    <button class="px-3 text-xl text-white bg-teal-500 rounded h-fit"><i class="fa-solid fa-download"></i></button>
                              </div>
                        </div>
                  </div>
            </div>

                  <!-- Categories -->
            <div class="p-4 mx-auto my-12 text-white bg-gray-800 sm:w-5/6">
                  <h1 class="py-4 text-2xl">Categories</h1>
                  <ul class="flex-wrap w-5/6 mx-auto sm:flex">
                        <li class="py-1.5 sm:w-1/3" v-for="category in categories" :key="category.id">
                              <router-link :to="{name : 'BooksByCategories' , params : {id : category.id}}" class="hover:text-teal-500">{{ category.name }}</router-link>
                        </li>
                  </ul>
            </div>

                  <!-- Trending Books -->
            <div class="flex-wrap mx-auto mt-12 sm:flex sm:w-5/6">
                  <h1 class="w-full p-4 text-2xl">Top Trending Books</h1>
                  <router-link :to="{name : 'ShowBook' , params : {slug : book.slug}}" class="sm:w-[48%] m-2 sm:flex hover:scale-110 transition p-4" v-for="book in booksByDownload" :key="book.id">
                        <img :src="book.image" class="w-3/4 mx-auto sm:w-1/3 h-fit" alt="">
                        <div class="w-3/4 p-0 mx-auto mb-8 sm:w-2/3 sm:px-2">
                              <h1 class="p-1 pt-0 text-lg font-bold">{{ book.name }}</h1>
                              <p class="p-1">{{ book.description }}</p>
                              <button class="px-3 text-xl text-white bg-teal-500 rounded h-fit"><i class="fa-solid fa-download"></i></button>
                        </div>
                  </router-link>
            </div>    

                  <!-- Read All The Books -->
            <div class="flex justify-center mx-auto mb-16 text-white sm:w-5/6">
                  <router-link :to="{name : 'AllBooks'}" class="px-4 py-2 text-lg transition bg-teal-600 border border-teal-600 hover:bg-transparent hover:text-gray-800">
                        read all the books
                  </router-link>
            </div>

            <Quotes  :message="quoteMessage2" :speaker="quoteSpeaker2" />
      </div>
</template>

<script>
import axios from 'axios';
import Quotes from '../../components/Quotes.vue'
      export default {
            components : {
                  Quotes
            },

            data () {
                  return {
                        quoteMessage : `“There is more treasure in books than in all the pirate’s loot on Treasure Island.”`,
                        quoteSpeaker : "Walt Disney",
                        quoteMessage2 : `“Books serve to show a man that those original thoughts of his aren’t very new after all.”`,
                        quoteSpeaker2 : " Abraham Lincoln",
                        books : [],
                        categories : [],
                        booksByDownload : [],
                  }
            },

            mounted () {
                  this.getBooks();
                  this.getCategories();
                  this.getBooksByDownload();
            },

            methods : {
                  getBooks(){
                        axios.get('http://localhost:8000/api/client/get-books')
                              .then((response) => {
                                    this.books = response.data.data;
                              })
                              .catch((response) => {
                                    console.log(response);
                              })
                  },

                  getCategories() {
                        axios.get('http://localhost:8000/api/client/get-categories')
                              .then((response) => {
                                    this.categories = response.data.data;
                              })
                              .catch((response) => {
                                    console.log(response);
                              })
                  },

                  getBooksByDownload() {
                        axios.get('http://localhost:8000/api/client/get-books-by-download')
                              .then((response) => {
                                    this.booksByDownload = response.data.data.filter((book) => {
                                          return book.downloads > 5
                                    }).slice(0,6);
                              })
                  }
            }

      }
</script>

<style scoped>

</style>