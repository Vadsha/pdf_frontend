<template>
      <div class="flex justify-center w-screen h-screen p-1">
            <div class="p-6 m-auto text-white bg-gray-800 h-fit sm:w-1/2">
                  <router-link to="/" class="w-full text-teal-600 sm:text-3xl ">
                        Nerdy <span  class="text-red-400">Spot</span>
                  </router-link>

                        <form class="relative" @submit.prevent="login">
                              <input 
                              type="text"
                              class="relative w-full p-2 my-4 mt-8 text-sm text-gray-600 placeholder-gray-500 bg-white border rounded shadow outline-none h-fit focus:outline-none focus:ring"
                              v-model="loginData.email"
                              placeholder="Email" />
                              <span v-if="errors.email" class="absolute p-3 pt-6 mt-12 text-red-500 left-1">{{ errors.email[0] }}</span>

                              <input 
                                    type="password"
                                    class="relative w-full p-2 my-4 text-sm text-gray-600 placeholder-gray-500 bg-white border rounded shadow outline-none h-fit focus:outline-none focus:ring"
                                    v-model="loginData.password"
                                    placeholder="Password" />
                              <span v-if="errors.password" class="absolute p-3 mt-12 text-red-500 left-1">{{ errors.password[0] }}</span>
                              <span v-if="errors.message" class="absolute p-3 mt-12 text-red-500 left-1">{{ errors.message }}</span>

                              <div class="flex justify-between mt-2">
                                    <span class="mt-4">Doesn't have an account? <router-link class="text-teal-600" :to="{name : 'Register'}">Sign up</router-link></span>
                                    <button type="submit" class="w-1/4 py-2 my-1 text-center text-white transition bg-teal-500 border border-teal-500 rounded bg-green hover:bg-transparent">sign up</button>
                              </div>
                        </form>
            </div>
      </div>
</template>
      
      <script>
      import axios from 'axios'
      import TokenService from '../../TokenService'

            export default {
                  data () {
                        return {
                              errors : {},
                              loginData : {
                                    email : '',
                                    password : ''
                              }
                        }
                  },

                  methods : {
                        login(){
                              axios.post('http://localhost:8000/api/login' , this.loginData)
                                    .then((response) => {
                                          TokenService.saveToken(response.data.data.token);
                                          let token = TokenService.getToken();
                                          if (token) {
                                                this.$router.push('/admin');
                                          }
                                    })
                                    .catch((response) => {
                                          this.errors = response.response.data.errors;
                                          console.log(response);
                                          setTimeout(() => {
                                                this.errors = {};
                                          } , 3000)
                                    })
                        }
            }
            }
      </script>
      
      <style>
      
      </style>