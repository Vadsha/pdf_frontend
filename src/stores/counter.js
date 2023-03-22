import { defineStore } from "pinia";

export const useCountStore = defineStore("count", {
     state: () => {
          return {
            categories : "",
            tags : "",
            books : "",
            requests : ""
          }
      },

      actions : {
          updateCount(name , count){
            if (name == 'categories') {
              this.categories = count;
            }
            else if (name == 'tags') {
              this.tags = count;
            }
            else if (name == 'books') {
              this.books = count;
            }
            else {
              this.requests = count;
            }
          }
      }
});