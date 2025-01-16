// index.js
import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import LoginPage from '@/components/LoginPage.vue';
import MessageBox from '@/components/MessageBox.vue';
import { useSessionStore } from '@/stores/SessionStore';
import NotFound from '@/components/NotFound.vue';
import SignUp from '@/components/SignUp.vue';

const routes = [
  {
    path: '/',
    component: MessageBox, // wrapper chính
    children: [
      {
        path: 'chats/messages/:chatId/', // Nested route cho tin nhắn
        name: 'messages',
        component: App,
        props: true,
      },
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: 'signUp',
        name: 'SignUp',
        component: SignUp,
      }
    ],
  },
  // Thêm route 404
  {
    path: '/:pathMatch(.*)*', // Bắt tất cả các đường dẫn không hợp lệ
    name: 'NotFound',
    component: NotFound,
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
