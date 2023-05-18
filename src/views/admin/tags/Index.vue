<template>
      <div class="flex justify-center">
          <!-- message -->
          <div v-if="message" class="absolute z-50 p-2 px-4 mt-1 rounded right-4 top-12" style="background-color: #252c53;">
            <i class="fa-solid fa-star"></i> {{ messageStore.name }} {{ messageStore.message }}
          </div>
    
          <!-- categories -->
        <vue-good-table
          class="w-2/3 mt-4"
          :columns="columns"
          :rows="tags"
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
              :to="{name : 'CreateTag'}"
              class="p-1 px-2 mr-1 text-sm no-underline bg-teal-600 rounded hover:text-gray-700"
            >
              create
            </router-link>
          </template>
    
          <template #table-row="props">
            <span v-if="props.column.field == 'slug'">
              <router-link class="px-3 py-1 m-1 text-sm text-white bg-teal-600 rounded hover:text-gray-700" :to="{name : 'EditTag' , params : {slug : props.row.slug}}" ><i class="fa-solid fa-pen"></i></router-link>
              <button @click="deleteFun(props.row.slug , props.row.name)" class="px-3 py-1 m-1 text-white bg-teal-600 rounded hover:text-gray-700"><i class="fa-solid fa-trash"></i></button>
    
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
    import {useMessageStore} from '../../../stores/message.js'
    import "vue-good-table-next/dist/vue-good-table-next.css";
    import { VueGoodTable } from "vue-good-table-next";
import ApiService from '../../../Apiservice';
    export default {
      components: {
        VueGoodTable,
        },
      data() {
        return {
          messageStore : useMessageStore(),
          message : false,
          tags : [],
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
    
        ApiService.get('tags')
        .then((response) => {
          this.tags = response.data.data;
        })
      },
      methods : {
          deleteFun (slug , name) {
                ApiService.delete(`tags/${slug}`)
                .then((response) => {
                  this.messageStore.updateMessage(name , "has been deleted successfully!");
                  router.push('/admin/tags');
                })
                .catch((response) => {
                  console.log(response);
                })
          }
      }
    };
    </script>
    
    <style>

    </style>