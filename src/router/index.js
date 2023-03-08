import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/publicView/Index.vue'
import _Category from "../views/publicView/_Category.vue";
import _Tag from "../views/publicView/_Tag.vue";
import Dashboard from "../views/admin/Dashboard.vue"
import Test from "../views/admin/Test.vue"
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
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/test',
      name : "Test",
      component : Test
    },
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
      ]
    }
  ]
})

export default router
