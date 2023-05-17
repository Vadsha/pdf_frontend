<template>
  <div class="flex justify-center mt-12">
    <!-- message -->
    <div
      v-if="message"
      class="absolute z-50 p-2 px-4 mt-1 rounded right-4 top-12"
      style="background-color: #252c53"
    >
      <i class="fa-solid fa-star"></i> {{ messageStore.name }}
      {{ messageStore.message }}
    </div>

    <!-- categories -->
    <vue-good-table
      class="w-full"
      :columns="columns"
      :rows="books"
      styleClass="vgt-table"
      :search-options="{
        enabled: true,
        trigger: 'enter',
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records',
        perPage: 4,
        perPageDropdown: [3, 4, 5],
      }"
    >
      <template #table-actions>
        <router-link
          :to="{ name: 'CreateBook' }"
          class="p-1 px-2 mr-1 text-sm no-underline bg-teal-600 rounded hover:text-gray-700"
        >
          create
        </router-link>
      </template>

      <template #table-row="props">
        <span v-if="props.column.field == 'slug'">
          <router-link
            class="px-3 py-1 m-1 text-sm text-white bg-teal-600 rounded hover:text-gray-700"
            :to="{ name: 'Book', params: { slug: props.row.slug } }"
            ><i class="fa-solid fa-circle-info"></i
          ></router-link>
        </span>
        <span v-else-if="props.column.field == 'image'">
          <img :src="props.row.image" alt="book cover" style="width: 90px" />
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>
    
    <script>
import router from "../../../router";
import axios from "axios";
import { useMessageStore } from "../../../stores/message.js";
import "vue-good-table-next/dist/vue-good-table-next.css";
import { VueGoodTable } from "vue-good-table-next";
export default {
  components: {
    VueGoodTable,
  },
  data() {
    return {
      messageStore: useMessageStore(),
      message: false,
      books: [],
      columns: [
        {
          label: "Id",
          field: "id",
        },
        {
          label: "Image",
          field: "image",
        },
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Author",
          field: "author",
        },
        {
          label: "",
          field: "slug",
        },
      ],
    };
  },
  mounted() {
    if (this.messageStore.name) {
      this.message = true;
      setTimeout(() => {
        this.message = false;
      }, 3000);
    }

    axios.get("http://localhost:8000/api/books").then((response) => {
      this.books = response.data.data;
    });
  },
  methods: {

  },
};
</script>
    
    <style>
th,
td {
  padding: 10px;
}
</style>