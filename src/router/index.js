// index.js
import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import LoginPage from '@/components/LoginPage.vue';
import MessageBox from '@/components/MessageBox.vue';
import { useSessionStore } from '@/stores/SessionStore';
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
  const sessionStore = useSessionStore();

  if (!isAuthenticated && to.path !== '/login') {
    // Lưu URL trước khi chuyển hướng đến trang login
    sessionStore.saveUrl(to.fullPath);
    return next('/login');
  }

  if (to.path === '/login' && isAuthenticated) {
    // Đã đăng nhập nhưng vào /login -> điều hướng về trang trước đó (hoặc trang chủ nếu không có)
    return next(sessionStore.getUrl() || '/');
  }

  next();
});



export default router;
