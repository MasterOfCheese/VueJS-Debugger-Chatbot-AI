<template>
    <v-container class="user-options" fluid title="Your Profile">
      <v-menu
        offset-y
        bottom
        close-on-content-click
      >
        <template v-slot:activator="{ props }">
          <v-avatar
            v-bind="props"
            size="35"
            class="user-icon"
          >
            <v-icon v-if="!userAvatar">mdi-account</v-icon>
            <v-img v-else :src="userAvatar" alt="User Avatar" />
          </v-avatar>
        </template>
  
        <!-- Dropdown Menu -->
        <v-list>
          <v-list-item>
            <v-list-item-title style="cursor: pointer;">Hi, {{ currentUser }}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item style="display: flex; align-items: center;"
          class="logout"
          @click="logout"
        >
          <v-icon
            start
            size="18"
            class="logout-icon"
          >mdi-logout</v-icon>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </template>
<script setup>
import { ref } from 'vue';

const currentUser = ref('user1');
const userAvatar = ref(null);

const logout = () => {
  localStorage.removeItem("token");
  alert('Đăng xuất thành công')
  window.location.reload();
};
</script>
<style scoped>
.user-options {
    position: absolute;
    top: 20px;
    right: 110px;
    width: 35px;
    border-radius: 50%;
    padding: 0;
    cursor: pointer;
    z-index: 3;
}
i.mdi-account.mdi.v-icon.notranslate.v-theme--light.v-icon--size-default {
    color: #fff;
}
i.mdi-account.mdi.v-icon.notranslate.v-theme--dark.v-icon--size-default {
    color: gray;
}
.v-avatar {
    background-color: #3B5757;
}
.v-menu > .v-overlay__content > .v-card, .v-menu > .v-overlay__content > .v-sheet, .v-menu > .v-overlay__content > .v-list {
    width: 10em!important;
    left: 3.76em;
    top: 8px;
}
.logout {
  display: flex;
  align-items: center;
  color: #d9534f;
  cursor: pointer;
}
</style>
  