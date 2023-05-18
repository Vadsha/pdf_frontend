<template>
  <div class="flex justify-center w-screen">
    <div class="relative flex flex-wrap justify-center w-5/6 ml-2 mr-56 text-gray-500 rounded-lg">
      <div class="w-5/6">
        <canvas id="mychart" class="w-full"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import ApiService from '../../../Apiservice';
export default {
  data() {
    return {
      downloads: [],
      bookNames: [],
    };
  },
  mounted() {
    ApiService.get("downloads")
      .then((response) => {
        let data = response.data.data;
        data.forEach((download) => {
          this.bookNames.push(download.book);
          this.downloads.push(download.downloads);
        });

        const ctx = document.getElementById("mychart");
        new Chart(ctx, {
          type: "bar",
          data: {
            labels: this.bookNames,
            datasets: [
              {
                barThickness: 24,
                label: "Book Downloads",
                data: this.downloads,
                backgroundColor: ["rgb(13,148,136)"],
              },
            ],
          },
        });
      })
      .catch((response) => {
        console.log(response);
      });
  },
};
</script>

<style>
</style>