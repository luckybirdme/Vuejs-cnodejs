import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/Home'
import Topic from 'views/Topic'
import Login from 'views/Login'
import About from 'views/About'
import Create from 'views/Create'
import User from 'views/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/topic',
      name: 'Topic',
      component: Topic
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/user/:loginname',
      name: 'User',
      component: User
    }
  ]
})
