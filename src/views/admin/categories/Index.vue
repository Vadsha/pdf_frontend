<template>
  <div class="flex justify-center">

      <!-- create category -->
      <create-category @close="create = false" v-if="create" class="fixed z-50 w-full"></create-category>

      <!-- categories -->
    <vue-good-table
      class="w-1/2 mt-4"
      :columns="columns"
      :rows="rows"
      styleClass="vgt-table"
      :search-options="{
        enabled: true,
        trigger: 'enter',
      }"
    >
      <template #table-actions>
        <button
          @click="create = !create"
          class="p-1 px-2 mr-1 text-sm no-underline bg-teal-600 rounded hover:text-gray-700"
        >
          create
        </button>
      </template>

      <template #table-row="props">
        <span v-if="props.column.field == 'slug'">
          <router-link class="px-3 py-1 m-1 text-sm text-white bg-teal-600 rounded hover:text-gray-700" :to="{name : 'EditCategory' , params : {slug : props.row.slug}}" ><i class="fa-solid fa-pen"></i></router-link>
          <button @click="deleteFun(props.row.slug)" class="px-3 py-1 m-1 text-white bg-teal-600 rounded hover:text-gray-700"><i class="fa-solid fa-trash"></i></button>

        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import "vue-good-table-next/dist/vue-good-table-next.css";
import { VueGoodTable } from "vue-good-table-next";
import CreateCategory from "../../../components/CreateCategory.vue"
export default {
  components: {
    VueGoodTable,
    CreateCategory
    },
  data() {
    return {
      create : false,
      columns: [
        {
          label: "Id",
          field: "id",
        },
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Status",
          field: "status",
        },
        {
          label: "",
          field: "slug",
        },
      ],
      rows: [
        {
          id: 1,
          name: "Science",
          status: true,
          slug : "science",
        },
        { id: 2, name: "Mathmetics", status: true, slug: "math" },
        { id: 3, name: "Physics", status: true, slug: "physics" },
        { id: 4, name: "Life Style", status: true, slug: "life-style" },
        { id: 5, name: "Philo", status: true, slug: "philo" },
      ],
    };
  },
  methods : {
      deleteFun (slug) {
            console.log(slug);
      }
  }
};
</script>

<style>
th,
td {
  padding: 10px;
}
</style>