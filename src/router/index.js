import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Mange = ()=>import('../views/Manage')

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: Mange,
    children:[
      {
        // Initial interface.I will probally put some access, comment data, etc 
        path:'/home'
      },
      {
        // Get all articles
        path:'/articles'
      },
      {
        // Get articles by category name
        path:'/articles/:name'
      },
      {
        // Get comments.
        path:'/comments'
      },
      {
        // Create New article
        path:'/create'
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
