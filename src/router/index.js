import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/publicView/Index.vue'
import _Category from "../views/publicView/_Category.vue";
import _Tag from "../views/publicView/_Tag.vue";
import Dashboard from "../views/admin/Dashboard.vue"
import Categories from "../views/admin/categories/Index.vue"
import EditCategory from "../views/admin/categories/_Id.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    },
    {
      path : '/:category',
      name : "_Category",
      component : _Category,
      props : true
    },
    {
      path : '/:tag',
      name : "_Tag",
      component : _Tag,
      props : true
    },

    {
      path : '/admin',
      name : "dashboard",
      component : Dashboard,
      children : [
        {
          path : 'categories',
          name : 'Categories',
          component : Categories
        },
        {
          path : 'categories/:slug',
          name : 'EditCategory',
          component : EditCategory
        },

      ]
    }
  ]
})

export default router
