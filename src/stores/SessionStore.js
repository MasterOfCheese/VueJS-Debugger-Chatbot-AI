import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSessionStore = defineStore('session', () => {
  const previousUrl = ref(localStorage.getItem('previousUrl') || '/');

  const saveUrl = (url) => {
    console.log('Saving URL:', url); // Debug
    previousUrl.value = url;
    localStorage.setItem('previousUrl', url); // Lưu URL đầy đủ vào localStorage
  };

  const getUrl = () => {
    const url = localStorage.getItem('previousUrl') || '/';
    console.log('Retrieving URL from localStorage:', url);
    return url;
  };

  return {
    saveUrl,
    getUrl,
  };
});
