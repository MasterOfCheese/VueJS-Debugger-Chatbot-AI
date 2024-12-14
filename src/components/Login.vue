<template>
    <div>
      <h2>Đăng nhập</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Tên người dùng:</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div>
          <label for="password">Mật khẩu:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
  
      <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
      <p v-if="token" style="color: green;">Đăng nhập thành công! Token: {{ token }}</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        username: "",
        password: "",
        token: null,
        errorMessage: null,
      };
    },
    methods: {
      async login() {
        try {
          // Gửi yêu cầu đăng nhập đến FastAPI
          const response = await axios.post('http://127.0.0.1:5000/auth/token', new URLSearchParams({
            username: this.username,
            password: this.password
          }), {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          });
  
          // Lưu token vào localStorage
          this.token = response.data.access_token;
          localStorage.setItem("accessToken", this.token);
          this.errorMessage = null;
        } catch (error) {
          // Xử lý lỗi đăng nhập
          if (error.response && error.response.data) {
            this.errorMessage = error.response.data.detail;
          } else {
            this.errorMessage = "Đã có lỗi xảy ra!";
          }
          this.token = null;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Thêm các style của bạn */
  </style>
  