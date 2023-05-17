import { createRouter, createWebHistory } from 'vue-router'

import IndexView from '../views/publicView/Index.vue'
import HomeView from '../views/publicView/Home.vue'
import ClientCategories from '../views/publicView/Categories.vue'
import BooksByCategories from '../views/publicView/BooksByCategories.vue'

import Register from "../views/authentication/Register.vue"
import Login from "../views/authentication/Login.vue"

import Dashboard from "../views/admin/Dashboard.vue"
import DashboardView from "../views/admin/Index.vue"

import Categories from "../views/admin/categories/Index.vue"
import CreateCategory from "../views/admin/categories/Create.vue"
import EditCategory from "../views/admin/categories/_Id.vue"

import Tags from "../views/admin/tags/Index.vue"
import CreateTag from "../views/admin/tags/Create.vue"
import EditTag from "../views/admin/tags/_Id.vue"

import Books from "../views/admin/books/Index.vue"
import Book from "../views/admin/books/show/_Id.vue"
import EditBook from "../views/admin/books/edit/_Id.vue"
import CreateBook from "../views/admin/books/Create.vue"

import Notifications from "../views/admin/notifications/Index.vue"
import BookRequests from "../views/admin/bookRequests/Index.vue"
import Downloads from "../views/admin/downloads/Downloads.vue"

import NotFound from "../views/publicView/NotFound.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      children : [
        {
          path: '',
          name: 'HomeView',
          component: HomeView,
        },
        {
          path: '/categories',
          name: 'ClientCategories',
          component: ClientCategories,
        },
        {
          path: '/categories/:id',
          name: 'BooksByCategories',
          component: BooksByCategories,
        },
      ]
    },


    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },

    {
      path : '/admin',
      name : "Dashboard",
      component : Dashboard,
      children : [
        {
          path : '',
          name : 'dashboard-view',
          component : DashboardView
        },
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
        {
          path : 'categories/create',
          name : 'CreateCategory',
          component : CreateCategory
        },

        {
          path : 'tags',
          name : 'Tags',
          component : Tags
        },
        {
          path : 'tags/:slug',
          name : 'EditTag',
          component : EditTag
        },
        {
          path : 'tags/create',
          name : 'CreateTag',
          component : CreateTag
        },

        {
          path : 'books',
          name : 'Books',
          component : Books
        },
        {
          path : 'books/:slug',
          name : 'Book',
          component : Book
        },
        {
          path : 'books/create',
          name : 'CreateBook',
          component : CreateBook
        },
        {
          path : 'books/:slug',
          name : 'EditBook',
          component : EditBook
        },

        {
          path : 'notifications',
          name : 'Notifications',
          component : Notifications
        },
        {
          path : 'requests',
          name : 'BookRequests',
          component : BookRequests
        },
        {
          path : 'downloads',
          name : 'Downloads',
          component : Downloads
        },
      ]
    },

    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    }
  ]
});

router.beforeEach((to , from , next) => {
  // console.log("this is to" , from);
  // alert(to.meta.middleware);
  next();
})

export default router
