<!-- src/components/NotFound.vue -->
<template>
    <v-container fill-height class="d-flex justify-center align-center">
      <v-row class="text-center">
        <v-col>
          <h1 class="display-1 font-weight-bold">404</h1>
          <p class="subheading mb-4">Oops! The page you're looking for doesn't exist.</p>
          <v-btn
            color="primary"
            large
            to="/"
            class="white--text home-link"
            elevation="2"
          >
            Go to Home
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: "NotFound",
  };
  </script>
  
  <style scoped>
  .v-container {
    background: linear-gradient(135deg, #ff7a18, #af002d);
    color: #fff;
    height: 100vh;
    font-family: 'FontAwesome';
  }
  
  .v-row {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  h1 {
    font-size: 120px;
    margin: 0;
    font-weight: bold;
    animation: fadeInUp 1s ease-out;
  }
  
  .subheading {
    font-size: 18px;
    margin: 20px 0;
    animation: fadeInUp 1.5s ease-out;
  }
  
  .home-link {
    display: inline-block;
    padding: 10px 20px;
    background: #ff6347;
    color: #fff;
    text-decoration: none;
    border-radius: 4px;
    transition: background 0.3s ease;
  }
  
  .home-link:hover {
    background: #ff4500;
  }
  
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @media (min-width: 1280px) {
    .v-container {
        max-width: 100%;
    }
}
  </style>
  