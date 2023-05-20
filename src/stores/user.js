import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
      state: () => {
            return {
                  id : null,
                  name : '',
                  email : ''
            }
       },
 
       actions : {
            setUser(user) {
                  this.id = user.id;
                  this.name = user.name;
                  this.email = user.email;
            }
       }
 });