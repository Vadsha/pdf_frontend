<template>
      <div class="flex justify-center min-h-screen">
                  <div class="container flex flex-col items-center justify-center flex-1 px-2 mx-auto ">
                      <div class="relative w-1/3 px-6 py-12 rounded shadow-md bg-sky-100" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;">
                        <router-link class="w-full ml-2 text-3xl text-center text-teal-600 no-underline hover:text-teal-600" to="/" >
                              Nerdy <span  class="text-red-400">Spot</span>
                        </router-link>

                        <form @submit.prevent="login">
                              <input 
                              type="text"
                              class="relative w-full p-2 my-4 mt-8 text-sm text-gray-600 placeholder-gray-500 bg-white border rounded shadow outline-none h-fit focus:outline-none focus:ring"
                              v-model="loginData.email"
                              placeholder="Email" />
                              <span v-if="errors.email" class="absolute p-3 pt-6 mt-12 text-red-500 left-4">{{ errors.email[0] }}</span>

                              <input 
                                    type="password"
                                    class="relative w-full p-2 my-4 text-sm text-gray-600 placeholder-gray-500 bg-white border rounded shadow outline-none h-fit focus:outline-none focus:ring"
                                    v-model="loginData.password"
                                    placeholder="Password" />
                              <span v-if="errors.password" class="absolute p-3 mt-12 text-red-500 left-4">{{ errors.password[0] }}</span>
                              <span v-if="errors.message" class="absolute p-3 mt-12 text-red-500 left-4">{{ errors.message }}</span>

                              <div class="flex justify-between mt-2 text-gray-600">
                                    <span class="mt-4">Doesn't have an account? <router-link class="text-teal-600" :to="{name : 'Register'}">Sign up</router-link></span>
                                    <button type="submit" class="w-1/4 py-2 my-1 text-center text-white bg-teal-600 rounded bg-green focus:outline-none">sign up</button>
                              </div>
                        </form>
      
                      </div>
                  </div>
              </div>
      </template>
      
      <script>
      import axios from 'axios'

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
                                    console.log(response);
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