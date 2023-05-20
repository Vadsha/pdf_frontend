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
                        quoteMessage : `"Reading is to the mind what exercise is to the body."`,
                        quoteSpeaker : "Joseph Addison",
                        id : this.$route.params.id,
                        books : [],
                  }
            },

            mounted () {
                  this.getBooks();
            },

            methods : {
                  getBooks () {
                        axios.get(`http://localhost:8000/api/client/get-books-by-categories/${this.id}`)
                              .then((response) => {
                                    this.books = response.data.data;
                                    if (this.books.length == 0) {
                                          this.$router.push('/categories');
                                    }
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