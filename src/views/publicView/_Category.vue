<template>
<div class="text-white"  style="background-color: #252c53;">
  <layout class="fixed" ></layout>
    <div class="flex flex-col items-center" style="height: 2000px;">
      <h1 class="mt-16 text-6xl">{{ $route.params.category }}</h1>
    </div>
</div>
</template>

<script>
import Layout from '../../components/Layout.vue'
export default {
components: { Layout },
}
</script>

<style lang="scss" scoped>

</style>