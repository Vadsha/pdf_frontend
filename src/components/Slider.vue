<template>
  <CCarousel class="w-50 mx-auto" controls indicators transition="crossfade">
          <CCarouselItem>
               <img class="d-block w-100 h-96" src="../images/books1.jpeg" alt="slide 2"/>
          </CCarouselItem>
          <CCarouselItem>
               <img class="d-block w-100 h-96" src="../images/profile.webp" alt="slide 2"/>
          </CCarouselItem>
          <CCarouselItem>
               <img class="d-block w-100 h-96" src="../images/books1.jpeg" alt="slide 3"/>
          </CCarouselItem>
      </CCarousel>
</template>

<script>
      import { CCarousel } from '@coreui/vue'
      import { CCarouselItem } from '@coreui/vue'
      export default {
            components: {
               CCarousel,
               CCarouselItem
            },
            mounted(){
                  const nextBtn = document.querySelector('.carousel-control-next-icon');
                  nextBtn.style.display = "none";
                  const prevBtn = document.querySelector('.carousel-control-prev-icon');
                  prevBtn.style.display = "none";
                  setInterval(() => {
                  nextBtn.click();
                  },5000); 
            }

      }
</script>

<style lang="scss" scoped>

</style>