import { createRouter, createWebHistory} from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Ad from '../views/Ad.vue'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/annonces',
    name: 'Annonces',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AnimalsList.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Register
  },
  {
    path: '/register',
    name: 'Register',
    component: Login
  },
  {
    path: '/animals/:id',
    name: 'Ad',
    component: Ad
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
