<template>
      <div>
            <div v-for="name in FormData.name" :key="name">{{ name }}</div>
            <form @submit.prevent="handleForm" class="mt-6">
                  <div>
                        <input type="checkbox" value="crime" v-model="names">
                        <label for="crime">crime</label>
                  </div>
                  <div>
                        <input type="checkbox" value="comedy" v-model="names">
                        <label for="comedy">comedy</label>
                  </div>
                  <div>
                        <input type="checkbox" value="action" v-model="names">
                        <label for="action">action</label>
                  </div>
                  <button>submit</button>
            </form>
      </div>
</template>

<script lang="ts">
import axios from 'axios';
      export default {
            data(){
                  return{
                        names : [],
                        FormData : {
                              name : []
                        }
                  }
            },
            methods : {
                  handleForm(){
                        this.FormData.name = this.names;
                        axios.post('http://localhost:8000/api/categories' , this.FormData)
                        .then((res) => {
                              console.log(res);
                        })
                  }
            }
      }
</script>

<style>

</style>