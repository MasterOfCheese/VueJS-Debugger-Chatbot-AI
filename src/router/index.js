// index.js
import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import LoginPage from '@/components/LoginPage.vue';
import MessageBox from '@/components/MessageBox.vue';

const routes = [
  {
    path: '/',
    component: MessageBox, // wrapper chính
    children: [
      {
        path: 'chats/:chatId/messages', // Nested route cho tin nhắn
        name: 'messages',
        component: App,
        props: true,
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
