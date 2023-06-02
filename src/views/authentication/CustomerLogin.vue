<template>
<div class="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12">
	<div class="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			class="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-blue-300 to-blue-600 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div class="max-w-md mx-auto">
				<div>
					<h1 class="text-2xl italic font-semibold">Welcome back to <span class="text-teal-500">Nerdy </span><span class="text-red-500">Spot</span></h1>
				</div>
				<div class="divide-y divide-gray-200">
					<div class="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                                    <form @submit.prevent="login">
                                          <div class="relative">
							      <input v-model="formData.email" autocomplete="off" type="email" class="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600" placeholder="Email address" />
							      <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
						      </div>
                                          <div class="relative mt-6">
                                                <input autocomplete="off" v-model="formData.password"  type="password" class="w-full h-10 text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                                <label for="password" class="absolute left-0 -top-5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                          </div>
                                          <div class="relative mt-4">
                                                <p class="mb-2 text-base">Doesn't have an account? <router-link class="ml-2 text-teal-600" :to="{name : 'CustomerRegister'}">Sign up</router-link></p>
                                                <button class="w-full py-1 text-white transition bg-blue-500 border border-blue-600 rounded hover:bg-transparent hover:text-blue-600">Submit</button>
                                          </div>
                                    </form>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';
import TokenService from '../../TokenService';
      export default {
            data () {
                  return {
                        formData : {
                              email : '',
                              password : ''
                        }
                  }
            },
            methods : {
                  login () {
                        axios.post('http://localhost:8000/api/login' , this.formData).then((response) => {
                              TokenService.saveToken(response.data.data.token);
                              let token = TokenService.getToken();
                              if (token) {
                                    window.history.back();
                              }
                        }).catch((response) => {
                              console.log(response);
                        })
                  }
            }
      }
</script>

<style scoped>
</style>