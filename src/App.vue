<script setup>
import { onMounted, ref } from "vue"

const users = ref([]);

const fetchUsers = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    else {
      console.log('Fetch Mock-API:OK!');
    }

    const data = await response.json();
    users.value = data;                                                 
  } catch (error) {
    console.error("Error when calling API:", error);
  }
}

onMounted(() => {
  fetchUsers();
})
</script>

<template>
  <div>
    <h1>Users List</h1>
    <ul>
      <li style="margin-bottom: 15px;" v-for="user in users" :key="user.id">
        {{ user.id }}. ({{ user.name }})  <br> ({{ user.email }}) <br> ({{ user.phone }}) 
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>
