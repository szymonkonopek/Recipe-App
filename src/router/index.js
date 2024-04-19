/* eslint-disable import/extensions */
import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Feed from '@/views/Feed';
import Profile from '@/views/Profile';
import Recipe from '@/views/Recipe';
import { getAuth } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/feed',
    name: 'feed',
    component: Feed,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/recipe/:id',
    name: 'recipe',
    component: Recipe,
    meta: {
      requiresAuth: true,
    },
  },
];

export const getCurrentUser = () => new Promise((resolve, reject) => {
  const removeListener = getAuth().onAuthStateChanged((user) => {
    removeListener();
    resolve(user);
  }, reject);
});

// eslint-disable-next-line new-cap
const router = new createRouter({
  routes,
  history: createWebHistory(),
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert('you dont have access');
      next('/');
    }
  } else {
    next();
  }
});

export default router;
