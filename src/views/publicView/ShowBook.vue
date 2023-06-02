<template>
      <div class="flex flex-wrap w-screen p-2">

            <div class="w-full md:w-[70%]">
                  <div class="sm:flex">
                        <img :src="book.image" class="w-full sm:w-1/2" alt="">
                        <div class="w-full p-2 mb-6 overflow-hidden sm:1/2">
                              <h1 class="mb-2 text-xl">{{ book.name }}</h1>
                              <h2 class="text-lg">{{ book.author }}</h2>
                              <h3 class="mb-2">Category : {{ book.category }}</h3>
                              <div class="flex flex-wrap w-full">
                                    <router-link class="px-2 py-1 m-1 text-sm text-white bg-green-500 rounded-sm" v-for="tag in book.tags"  :key="tag" :to="{name : 'BooksByTags' , params : {name : tag}}">
                                    {{ tag }}
                              </router-link>
                              </div>
                              <p class="mt-2"><i class="fa-solid fa-calendar-days"></i><span class="ml-1">{{ book.created_at }}</span></p>
                              <p class="mb-3">Description - {{ book.description }}</p>
                              <a class="px-3 py-2 text-white transition bg-teal-500 border border-teal-500 rounded hover:text-gray-700 hover:bg-transparent"  :href="`http://localhost:8000/api/client/download/${book.file}`"  download>
                                    download
                              </a>                              
                        </div>
                  </div>
                        <!-- comment section -->
                  <div class="w-full p-2 py-6">
                        <h1 class="p-2 my-4 font-semibold">{{ commentLength }} comments</h1>
                        <form class="flex" @submit.prevent="addComment">
                              <input v-model="comment.comment" placeholder="Add a comment" class="w-[80%] px-3 h-fit py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" type="text">
                              <button class="px-4 py-1.5 m-2 mt-0 text-white bg-teal-500 rounded-sm"><i class="fa-solid fa-paper-plane"></i></button>
                        </form>

                        <div class="my-6">
                              <div class="my-6" v-for="comment in book.comments" :key="comment.id">
                                    <h1 class="text-sm text-teal-600 sm:text-base">{{ comment.user }}</h1>
                                    <p class="text-sm sm:text-base">{{ comment.comment }}</p>
                              </div>
                        </div>
                  </div>
            </div>


            <div class="w-full py-4 md:w-[30%]">

                  <div class="w-full py-6">
                        <h1 class="px-3 text-lg">CATEGORIES</h1>
                        <div class="flex flex-wrap">
                              <router-link class="px-3 py-2 hover:text-teal-600" :to="{name : 'BooksByCategories' , params:{id : category.id}}" v-for="category in categories" :key="category.id">
                                    {{ category.name }} <span class="px-2 text-white py-0.5 ml-1 bg-green-500 rounded-lg">{{ category.books.length }}</span>
                              </router-link>
                        </div>
                  </div>

                  <div class="w-full py-6">
                        <h1 class="px-3 text-lg">TAGS</h1>
                        <div class="flex flex-wrap px-4">
                              <router-link class=" w-[40%] py-2 mx-2 text-teal-600 hover:text-teal-400" :to="{name : 'BooksByTags' , params : {name : tag.name}}" v-for="tag in tags" :key="tag.id">
                                    {{ tag.name }}
                              </router-link>
                        </div>
                  </div>

            </div>
            
      </div>
</template>

<script>
import axios from 'axios'
import { useUserStore } from '../../stores/user';
      export default {
            data () {
                  return {
                        userStore : useUserStore(),
                        slug : this.$route.params.slug,
                        book : {},
                        commentLength : null,
                        tags : [],
                        categories : [],
                        comment : {
                              user_id : null,
                              book_id : null,
                              comment : ''
                        }
                  }
            },

            mounted () {
                  this.getBook();
                  this.getCategories();
                  this.getTags();
            },

            methods : {
                  getBook () {
                        axios.get(`http://localhost:8000/api/client/get-book/${this.slug}`)
                              .then((response) => {
                                    this.book = response.data.data;
                                    if (!this.book) {
                                          window.history.back();
                                    }
                                    this.commentLength = this.book.comments.length;
                              })
                              .catch((response) => {
                                    console.log(response);
                                    window.history.back();
                              })
                  },
                  getCategories () {
                        axios.get('http://localhost:8000/api/client/get-categories')
                              .then((response) => {
                                    this.categories = response.data.data;
                              })
                              .catch((response) => {
                                    console.log(response);
                              })
                  },
                  getTags () {
                        axios.get('http://localhost:8000/api/client/get-tags')
                              .then((response) => {
                                    this.tags = response.data.data;
                              })
                              .catch((response) => {
                                    console.log(response);
                              })
                  },
                  addComment () {
                        if (this.userStore.id) {
                              this.comment.book_id = this.book.id,
                              this.comment.user_id = this.userStore.id;
                              axios.post('http://localhost:8000/api/client/comment' , this.comment)
                              .then((response) => {
                                    this.book.comments.unshift(response.data.data)
                                    this.comment.comment = '';
                              })
                              .catch((response) => {
                                    console.log(response);
                              })
                        } else {
                              window.location.assign('/login')
                        }
                  }
            }
      }
</script>

<style lang="scss" scoped>

</style>