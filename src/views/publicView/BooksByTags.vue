<template>
      <div class="w-screen">

<Quotes :message="quoteMessage" :speaker="quoteSpeaker" />

<div class="flex-wrap mx-auto mb-8 sm:w-5/6 sm:flex">
      <div class="sm:w-[30%] p-6" v-for="book in books" :key="book.id">
            <router-link :to="{name : 'ShowBook' , params : {slug : book.slug}}">
                  <img class="w-full hover:scale-105" :src="book.image" alt="">
            </router-link>
            <div class="flex justify-between p-1 py-2">
                  <div>
                        <h1 class="text-lg">{{ book.name }}</h1>
                  </div>
                  <button class="px-3 text-xl text-white bg-teal-500 rounded h-fit"><i class="fa-solid fa-download"></i></button>
            </div>
      </div>
</div>

</div>
</template>

<script>
import axios from 'axios'
import Quotes from '../../components/Quotes.vue'
      export default {
            components : {
                  Quotes
            },

            data () {
                  return {
                        quoteMessage : `"Think before you speak.Read before you think."`,
                        quoteSpeaker : "Fran Lebowitz",
                        tagName : this.$route.params.name,
                        books : [],
                  }
            },

            mounted () {
                  this.getBooks();
            },

            methods : {
                  getBooks () {
                        axios.get(`http://localhost:8000/api/client/get-books-by-tags/${this.tagName}`)
                              .then((response) => {
                                    this.books = response.data.data;
                              })
                              .catch((response) => {
                                    console.log(response);
                              })
                  }
            }
      }
</script>

<style lang="scss" scoped>

</style>