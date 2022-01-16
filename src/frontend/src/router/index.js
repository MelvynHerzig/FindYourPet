import { createRouter, createWebHistory} from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Advert from '../views/Advert.vue'
import AdvertCreation from '../views/AdvertCreation.vue';
import Profile from "../views/Profile";
import {memberIsConnected} from "../logic/apicalls";

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
    component: () => import('../views/AdvertsList.vue')
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
    name: 'Advert',
    component: Advert
  },
  {
    path: '/adverts/create',
    name: 'AdvertCreation',
    component: AdvertCreation,
    beforeEnter: requireAuth
  },
  {
    path: '/adverts/:id/modify',
    name: 'AdvertModification',
    component: AdvertCreation,
    beforeEnter: requireAuth
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: requireAuth
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

function requireAuth(to, from, next) {
  if(!memberIsConnected()) {
    next({ name: 'Login' });
  } else {
    next();
  }
}
