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
import { inject } from "vue"

// biến config dc inject 'config' vào để làm url động thay đổi trong public/config.json:
const config = inject('config');

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
      const response = await fetch(`${config.API_BASE_URL}/api/v1/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      // Xử lý response
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const token = data.access_token;

      // Lưu token vào localStorage và emit sự kiện
      localStorage.setItem('token', token);
      emit('login-success', token);

      errorMessage.value = ''; // Xóa thông báo lỗi nếu thành công
    } catch (error) {
      console.error('Login error:', error);
      errorMessage.value = 'Invalid username or password';
    }
  } else {
    errorMessage.value = 'Please enter both username and password.';
  }
};
</script>
<style scoped>
.login-container {
  max-width: 430px;
  margin: 13% auto;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  scale: 1.4;
  border: 2px solid pink;
  transform: translateY(-5px);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.v-text-field {
  margin-bottom: 15px;
}

.v-text-field input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  transition: border-color 0.3s;
}

.v-text-field input:focus {
  border-color: #007bff;
  outline: none;
}

.v-btn {
  width: 100%;
  padding: 10px;
  background: linear-gradient(145deg, #8447b6, #87adf1);

  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.v-btn:hover {
  background: linear-gradient(145deg, #6b3696, #698ed4);
}
.error {
  color: #e74c3c;
  margin-top: 10px;
  text-align: center;
}
</style>