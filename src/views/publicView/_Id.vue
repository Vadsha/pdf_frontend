<template>
  <div class="flex justify-center h-screen">

    <!-- Comments box -->
    <div class="fixed z-50 w-1/2 bg-gray-200 rounded top-20"  v-if="comment">
        <div class="flex flex-col items-end">
              <span class="px-2 mt-1 mr-1 text-xl text-white bg-teal-600 rounded-full cursor-pointer" @click="comment = false">x</span>
        </div>
        <ul class="p-2">
            <li v-for="comment in comments" :key="comment.id" class="p-2 my-2 text-white bg-teal-600 rounded">
              <h1 class="text-xl">{{ comment.user }}</h1>
              <p class="">{{ comment.comment }}</p>
            </li>
            <div class="flex justify-end mt-4">
              <span :class="[meta.prev ? '' : 'bg-gray-400']"  @click="getData(meta.prev)" class="px-3 pt-2 pb-1 mx-2 text-white bg-teal-600 rounded"><i class="fa-solid fa-arrow-left"></i></span>
              <span  class="px-3 pt-2 pb-1 text-white bg-teal-600 rounded">{{ meta.current_page }}</span>
              <span :class="[meta.next ? '' : 'bg-gray-400']" @click="getData(meta.next)" class="px-3 pt-2 pb-1 mx-2 text-white bg-teal-600 rounded"><i class="fa-solid fa-arrow-right"></i></span>
            </div>
      </ul>
      <form @submit.prevent="addComment" class="p-2">
        <input
          v-model="commentData.comment"
          placeholder="say something about the book. . . ."
          type="text"
          class="relative w-11/12 p-2 mt-2 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
        />
        <button class="p-3 pt-2 pb-1 ml-2 text-white bg-teal-600 rounded"><i class="fa-solid fa-paper-plane"></i></button>
      </form>
      </div>
      <!-- Request book box -->
    <Request
        @close="request = false"
        v-if="request"
        class="fixed z-50 top-24 left-1/3"
      />

      <!-- Nav Bar -->
    <nav class="fixed top-0 z-40 flex justify-between w-screen">
        <div class="w-1/4 mt-2">
          <router-link class="w-full ml-2 text-3xl text-center text-teal-600 no-underline hover:text-teal-600" to="/" >
            Nerdy <span  class="text-red-400">Spot</span>
          </router-link>
        </div>

        <div class="relative flex justify-center w-2/3">
          <input
            type="text"
            placeholder="search . . ."
            class="relative w-2/3 p-2 mt-2 ml-12 text-sm bg-white border-0 rounded shadow outline-none h-fit placeholder-slate-300 text-slate-600 focus:outline-none focus:ring"
          />
          <button class="absolute mr-2 text-gray-500 rounded right-24 top-4">
            <i class="ml-2 fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        <div class="flex justify-end w-1/3 text-white">
          <ul class="flex mt-1 mr-2">
            <li class="px-3 py-1 rounded cursor-pointer">
              <button
                @click="request = !request"
                class="p-1 px-2 no-underline bg-teal-600 rounded hover:text-gray-700"
              >
                Request Book
              </button>
            </li>
            <li class="px-3 py-1 mt-1 rounded cursor-pointer">
              <router-link :to="{name : 'Login'}"
                class="p-1 px-3 no-underline bg-teal-600 rounded hover:text-red-500 text-inherit"
              >
                Log In
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Book -->
      <div class="z-40 w-2/3 mt-20 text-gray-500 rounded h-min bg-sky-100">
        <div class="relative z-30 flex rounded-lg">
          <router-link
            class="absolute p-2 py-1 ml-1 text-white bg-teal-600 rounded top-1"
            to="/"
            ><i class="p-1 fa-solid fa-arrow-left"></i
          ></router-link>
          <img class="w-1/2 border-2 border-gray-100 rounded" :src="book.image" alt="" />
          <ul class="w-2/3 p-2 px-6">
            <li class="py-2 border-b-2 border-gray-300">
              Name : {{ book.name }}
            </li>
            <li class="py-2 border-b-2 border-gray-300">
              Downloads : {{ book.downloads }}
            </li>
            <li class="py-2 border-b-2 border-gray-300">
              Author : {{ book.author }}
            </li>
            <li class="py-2 border-b-2 border-gray-300">
              Category : {{ book.category }}
            </li>
            <li class="py-2 border-b-2 border-gray-300">
              Tags :
              <span
                class="px-1 m-1 text-white bg-teal-600 rounded"
                v-for="tag in book.tags"
                :key="tag"
                >{{ tag }}
              </span>
            </li>
            <li class="py-2 border-b-2 border-gray-300">
              Description : {{ book.description }}
            </li>
            <li class="flex justify-end">
              <button
                class="p-1 px-3 mx-2 mt-2 text-white bg-teal-600 rounded hover:text-gray-600"
                @click="toggleCommentBox(book.id)"
              >
                <i class="pt-1 fa-solid fa-comment"></i>
              </button>
              <button
                class="p-1 px-3 mt-2 text-white bg-teal-600 rounded hover:text-gray-600"
                @click="downloadBook"
              >
                <i class="pt-1 fa-solid fa-download"></i>
              </button>
            </li>
          </ul>
        </div>  
    </div>      
  </div>
</template>
    
<script>
import axios from "axios";
import Request from "../../components/Request.vue";
import router from '../../router';
export default {
  components : {Request},
  data() {
    return {
      slug: this.$route.params.slug,
      book: {},
      comments : [],
      meta : {      // for pagination
        next : null,
        prev : null,
        current_page : null
      },
      downloads: null,
      comment : false,
      request: false,
      commentData : {
        comment : '',
        book_id : null,
        user_id  : null
      }
    };
  },
  mounted() {
    axios
      .get("http://localhost:8000/api/books/" + this.slug)
      .then((response) => {
        this.book = response.data.data;
        if (!this.book) {
          router.push('/');
        }
      })
      .catch((response) => {
        console.log(response);
        router.push('/not/found');
      });
  },
  methods: {
    // for pagination
    storeMeta(response) {
          this.comments = response.data.data;                     //store data
          //for pagination
          this.meta.prev = response.data.meta.links[0].url;
          let index = response.data.meta.links.length - 1;
          this.meta.next = response.data.meta.links[index].url;
          this.meta.current_page = response.data.meta.current_page;
    },
    getData (link) {
          if (link) {
            axios.get(link)
            .then((response) => {
              this.storeMeta(response)
              console.log(response);
            })
          }
        },

    toggleCommentBox(id){
      if (this.comment) {
        this.comment = false;
      }
      else{
        this.comment = true;
        if (this.comments) {
          axios.get(`http://localhost:8000/api/comments/` + id , id)
          .then((response) => {
            this.storeMeta(response);
          })
        }
      }
    },

    addComment(){
      if (this.commentData.comment) {
        this.commentData.user = "Kyaw Gyi";
        this.commentData.book_id = this.book.id;
        this.commentData.user_id = 1;
        axios.post('http://localhost:8000/api/comments' , this.commentData)
          .then((response) => {
            this.comments.unshift(this.commentData);
          })
          .catch((response) => {
            console.log(response);
          })
      }
    },

    downloadBook() {},

  },
};
</script>
    
<style>

</style>