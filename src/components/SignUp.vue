<template>
    <div class="signup-container">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignUp">
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
        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          :error-messages="confirmPasswordError"
          required
        />
        <v-btn type="submit">Sign Up</v-btn>
      </form>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script setup>
  import { ref, inject } from 'vue';
  
  // Biến config được inject để làm URL động thay đổi trong public/config.json
  const config = inject('config');
  
  const username = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const confirmPasswordError = ref('');
  const errorMessage = ref('');
  
  const handleSignUp = async () => {
    if (password.value !== confirmPassword.value) {
      confirmPasswordError.value = 'Passwords do not match.';
      return;
    } else {
      confirmPasswordError.value = '';
    }
  
    if (username.value && password.value) {
      // Chuẩn bị dữ liệu JSON cho API
      const payload = {
        username: username.value,
        password: password.value,
        user_role: 'user', // user_role mặc định
      };
  
      try {
        // Gửi request đến API đăng ký
        const response = await fetch(`${config.API_BASE_URL}/api/v1/auth/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        // Xử lý response
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Something went wrong!');
        }
  
        // Xóa lỗi và thông báo đăng ký thành công
        errorMessage.value = '';
        console.log('Sign Up successful!');
        alert('Sign Up successful!')
        window.location.reload();
      } catch (error) {
        console.error('Sign Up error:', error);
        errorMessage.value = error.message || 'Sign Up failed.';
      }
    } else {
      errorMessage.value = 'Please enter both username and password.';
    }
  };
</script>
<style scoped>
 .signup-container {
  max-width: 430px;
  margin: 13% auto;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  scale: 1.4;
  border: 2px solid pink;
  transform: translateY(8px);
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