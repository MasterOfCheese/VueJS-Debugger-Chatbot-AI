<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <v-text-field
        v-model="username"
        label="Username"
        required
      />
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      />
      <v-btn type="submit">Login</v-btn>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="js">
import { defineEmits, ref } from 'vue';

const emit = defineEmits(['login-success']); 

const username = ref('');
const password = ref('');
const errorMessage = ref('');


const handleLogin = async () => {
  if (username.value && password.value) {
    // Dữ liệu form-encoded
    const formData = new URLSearchParams();
    formData.append('username', username.value);
    formData.append('password', password.value);

    try {
      // Gửi request đến BE
      const response = await fetch('http://172.20.10.4:5000/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      // Xử lý response
      if (!response.ok) {
        throw new Error('Invalid username or password');
      }

      const data = await response.json();
      const token = data.access_token;

      // Lưu token vào localStorage và emit sự kiện
      localStorage.setItem('token', token);
      emit('login-success', token);

      errorMessage.value = ''; // Xóa thông báo lỗi nếu thành công
      console.log('Token:', token);
    } catch (error) {
      console.error('Login error:', error);
      errorMessage.value = 'Invalid username or password';
    }
  } else {
    errorMessage.value = 'Please enter both username and password.';
  }
};
</script>
