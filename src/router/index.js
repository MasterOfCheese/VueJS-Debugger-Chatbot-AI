// index.js
import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import LoginPage from '@/components/LoginPage.vue';
import ChatsContainer from '@/components/ChatsContainer.vue';

const routes = [
  {
    path: '/',
    component: App, // App.vue là wrapper chính
    children: [
      {
        path: '',
        component: ChatsContainer,
        meta: { requiresAuth: true },
      },
      {
        path: 'login',
        component: LoginPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.path === '/login' && isAuthenticated) {
    return next('/');
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next('/login');
  }

  next();
});

export default router;
