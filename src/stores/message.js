import { defineStore } from "pinia";

export const useMessageStore = defineStore("message", {
     state: () => {
          return {
               name : "",
              message : "",
          }
      },

      actions : {
          updateMessage(name ,message){
               this.name = name;
               this.message = message;
          }
      }
});