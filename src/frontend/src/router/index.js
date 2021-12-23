import { createRouter, createWebHistory} from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Ad from '../views/Ad.vue'
import AdCreate from '../views/AdCreate.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/adverts',
    name: 'Adverts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AnimalsList.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/adverts/:id',
    name: 'Ad',
    component: Ad
  },
  {
    path: '/adverts/create',
    name: 'AdCreation',
    component: AdCreate
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
