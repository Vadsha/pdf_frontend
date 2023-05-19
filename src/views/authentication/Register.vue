<template>
<div class="flex justify-center min-h-screen">
            <div class="container flex flex-col items-center justify-center flex-1 px-2 mx-auto ">
                <div class="relative w-1/2 px-6 py-12 text-white bg-gray-800 rounded shadow-md" style="box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;">

                  <router-link class="w-full ml-2 text-3xl text-center text-teal-600 no-underline hover:text-teal-600" to="/" >
                        Nerdy <span  class="text-red-400">Spot</span>
                  </router-link>

                  <form @submit.prevent="register">
                        <input 
                        type="text"
                        v-model="registerData.name"
                        class="relative w-full p-2 my-4 mt-8 text-sm text-gray-600 placeholder-gray-500 bg-white border rounded shadow outline-none h-fit focus:outline-none focus:ring"
                        placeholder="Full Name" />
                  <span v-if="errors.name" class="absolute p-2 px-3 mt-16 text-red-500 left-4">{{ errors.name[0] }}</span>

                  <input 
                        type="text"
                        v-model="registerData.email"
                        class="relative w-full p-2 my-4 text-sm text-gray-600 placeholder-gray-500 bg-white border rounded shadow outline-none h-fit focus:outline-none focus:ring"
                        placeholder="Email" />
                  <span v-if="errors.email" class="absolute p-2 px-3 mt-12 text-red-500 left-4">{{ errors.email[0] }}</span>

                  <input 
                        type="password"
                        v-model="registerData.password"
                        class="relative w-full p-2 my-4 text-sm text-gray-600 placeholder-gray-500 bg-white border rounded shadow outline-none h-fit focus:outline-none focus:ring"
                        placeholder="Password" />
                  <span v-if="errors.password" class="absolute p-2 px-3 mt-12 text-red-500 left-4">{{ errors.password[0] }}</span>

                  <input 
                        type="password"
                        class="relative w-full p-2 my-4 text-sm text-gray-600 placeholder-gray-500 bg-white border rounded shadow outline-none h-fit focus:outline-none focus:ring"
                        v-model="registerData.password_confirmation"
                        placeholder="Confirm Password" />
                  <!-- <span v-if="errors" class="absolute p-2 px-3 mt-12 text-red-500 left-4">Confirm your password</span> -->

                  <div class="flex justify-between mt-2">
                        <span class="mt-4">Already have an account? <router-link class="text-teal-600" :to="{name : 'Login'}">Sign In</router-link></span>
                        <button
                        type="submit"
                        class="w-1/4 py-2 my-1 text-center text-white transition bg-teal-500 border border-teal-500 rounded bg-green hover:bg-transparent"
                    >sign up</button>
                  </div>
                  </form>

                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios'
      export default {
            data(){
                  return {
                        errors : {},
                        registerData : {
                              name : '',
                              email : '',
                              password : '',
                              password_confirmation : ''
                        }
                  }
            },

            methods : {
                  register(){
                        axios.post('http://localhost:8000/api/register' , this.registerData)
                              .then((response) => {
                                    TokenService.saveToken(response.data.data.token);
                                    let token = TokenService.getToken();
                                    if (token) {
                                          this.$router.push('/admin');
                                    }
                              })
                              .catch((response) => {
                                    this.errors = response.response.data.errors;
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