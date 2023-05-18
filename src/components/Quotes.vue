<template>
      <div class="w-screen">
            <div class="sm:py-20 py-6  px-8 mx-auto m-6 bg-gray-800 text-white sm:w-[60%] w-[96%]">
                  <h1 class="w-full text-xl text-center">{{ message }}</h1>
                  <h1 class="mt-4 mr-2 text-end"> - {{ speaker }}</h1>
            </div>
      </div>
</template>

<script>
      export default {
            props : {
                  message : '',
                  speaker : '',
            }
      }
</script>

<style lang="scss" scoped>

</style>