import { createRouter, createWebHistory } from 'vue-router'

import TokenService from '../TokenService'

import IndexView from '../views/publicView/Index.vue'
import HomeView from '../views/publicView/Home.vue'
import ClientCategories from '../views/publicView/Categories.vue'
import BooksByCategories from '../views/publicView/BooksByCategories.vue'
import BooksByTags from '../views/publicView/BooksByTags.vue'
import AllBooks from '../views/publicView/AllBooks.vue'
import ShowBook from '../views/publicView/ShowBook.vue'

import CustomerRegister from '../views/authentication/CustomerRegister.vue'
import CustomerLogin from '../views/authentication/CustomerLogin.vue'

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
import ApiService from '../Apiservice'
import { useUserStore } from '../stores/user'
import axios from 'axios'

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
        {
          path: '/tags/:name',
          name: 'BooksByTags',
          component: BooksByTags,
        },
        {
          path: '/books',
          name: 'AllBooks',
          component: AllBooks,
        },
        {
          path: '/books/:slug',
          name: 'ShowBook',
          component: ShowBook,
        },
      ]
    },
    {
      path : '/login',
      name : 'CustomerLogin',
      component : CustomerLogin
    },
    {
      path : '/register',
      name : 'CustomerRegister',
      component : CustomerRegister
    },

    {
      path: '/admin/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin/register',
      name: 'Register',
      component: Register,
    },

    {
      path : '/admin',
      name : "Dashboard",
      component : Dashboard,
      meta : {
        middleware : 'auth'
      },
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
  if (to.meta.middleware == 'auth') {
    let token = TokenService.getToken();
    let userStore = useUserStore();
    ApiService.get('user').then((response) => {
      userStore.setUser(response.data);
    }).catch((response) => {
      window.location.assign('/login');
    });

    if (token) {
      next();
    } else {
      TokenService.destoryToken();
      window.location.assign('/login');
    }
  }  else {
    let token = TokenService.getToken();
    if (token) {
      let userStore = useUserStore();
      let config = { headers : {'Authorization' : `Bearer ${token}`} };
      axios.get('http://localhost:8000/api/user' , config).then((response) => {
        userStore.setUser(response.data);
      }).catch((response) => {
        console.log(response);
      })
    }
    next();
  }
})

export default router
//4|NE4FETBUtbVPFjqwjwUYXLyuZcH7KNc4uftymirE
