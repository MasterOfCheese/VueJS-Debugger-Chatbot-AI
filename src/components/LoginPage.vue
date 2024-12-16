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

const emit = defineEmits(['login-success']); // Khai báo sự kiện

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = () => {
  if (username.value && password.value) {
    const token = 'example-token'; // Token giả định
    localStorage.setItem('token', token); // Lưu token vào localStorage
    emit('login-success', token); // Phát sự kiện lên App.vue
  } else {
    errorMessage.value = 'Please enter both username and password.';
  }
};
</script>
