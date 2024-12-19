<template>
    <div>
        <div class="merged-thread" :class="sidebarClass">
            <div title="New Thread" class="new-thread">
                <div>
                    <v-btn variant="elevated" color="addnew" style="width: 100%; text-transform: capitalize; display: flex; justify-content: left;">
                    <span>+</span>New Thread
                    </v-btn>
                </div>
            </div>

            <div style="user-select: none" title="Search Everything here" class="search-bar" @click="$emit('trigger-search')">
                <div style="width: 100%;">
                    <v-btn variant="elevated" color="search" style="width: 100%; text-transform: capitalize; display: flex; justify-content: left;">
                        <span>
                        <i style="margin-right: 7px; font-size: 13px;" class="fa-solid fa-magnifying-glass"></i>
                        </span>
                        Search Here</v-btn>
                </div>
            </div>

            <div class="divider1"></div>
        </div>

        <v-list class="recent-threads" :class="sidebarClass">
            <v-list-item-group>
                <v-list-item
                    v-for="(thread, index) in threads"
                    :key="index"
                    class="recent-threads-item" :class="sidebarClass"
                    >
                    <v-list-item-content>
                        <v-list-item-title>{{ thread }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <div class="divider"></div>

        <!-- <div title="Log Out" class="options" :class="sidebarClass">
            <div class="logout">
                <span>
                    <v-btn variant="elevated" color="logout" style="width: 100%; text-transform: capitalize; display: flex; justify-content: left;">
                    <i style="margin-right: 7px; font-size: 13px;" class="fa-solid fa-right-from-bracket"></i>
                    Logout
                    </v-btn>
                </span>
            </div>
        </div> -->
    </div>
</template>
<script setup lang="js">
import { onMounted, defineEmits, ref, computed } from "vue"
import { useThemeStore } from '../stores/useThemeStore'

// Get trạng thái `isDarkMode` từ store
const themeStore = useThemeStore();
const sidebarClass = computed(() => (themeStore.isDarkMode ? 'dark-sidebar' : 'light-sidebar'));

const limitWords = (className, wordLimit) => {
  const elements = document.querySelectorAll(className)
  elements.forEach((element) => {
    const words = element.textContent.split(" ")
    if (words.length > wordLimit) {
      element.textContent = words.slice(0, wordLimit)
    }
  })
}

onMounted(() => {
  limitWords(".recent-threads-item", 4)
})

defineEmits(['trigger-search']);

const threads = ref([
  'Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
  'djtconmeLorem ipsum dolor Lorem amet.Lorem ipsum doloLorem ipsum dolor Lorem amet.Lorem ipsum dolo ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum doloLorem ipsum dolor Lorem amet.Lorem ipsum dolo',
  'djtconmeLorem ipsum dolor Lorem amet.Lorem ipsum doloLorem ipsum dolor Lorem amet.Lorem ipsum dolo ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum doloLorem ipsum dolor Lorem amet.Lorem ipsum dolo',
  'Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum doloLorem ipsum dolor Lorem amet.Lorem ipsum dolo',
  'Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum doloLorem ipsum dolor Lorem amet.Lorem ipsum dolo',
  'Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum doloLorem ipsum dolor Lorem amet.Lorem ipsum dolo',
  'Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum doloLorem ipsum dolor Lorem amet.Lorem ipsum dolo',
  'Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
  'Lorem ipsum dolor Lorem amet.',
])
</script>
<style lang="scss" scoped>
.divider, .divider1 {
    height: 1px;
    width: 90%;
    background-color: #d1cccc;
    margin: 10px 0;
    position: relative;
    left: 7%;
}
.merged-thread {
    background-color: #F9F9F9;
    padding-top: 1px;
    top: 8px;
    // margin-top: 30px;
    position: sticky;
    z-index: 2;
.new-thread {
    width: 90%;
    position: sticky;
    left: 17px;
    top: 20px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
    // padding: 0.35em 0.75em;
    border-radius: 7px;
    // overflow: hidden;
    z-index: 3;
    div {
        width: 100%;
        user-select: none;
        span {
            margin-right: 10px;
            font-size: 20px;
            position: relative;
            top: 1px;
        }
    }
}
.divider1 {
    position: sticky;
    top: 70px;
}
}
v-list-item-group {
    left: 10px;
    position: relative;
}
.options {
    left: 8px;
    bottom: 0px;
    cursor: pointer;
    border-radius: 7px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    width: 100%;
    position: sticky;
    top: 34px;
    padding: 0;
    background-color: #F9F9F9;
    height: 4em;
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: left;
}
.logout {
    width: 90%;
    display: flex;
    align-items: center;
    border-radius: 7px;
    position: relative;
    top: 2px;
    left: 9px;
    span {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 100%;
    }
}
.recent-threads {
    position: relative;
    left: 55%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 15px;
    border-radius: 7px;
    padding: 0.25em;
    background-color: #F9F9F9;
    overflow: hidden;
    width: 108%;
    .recent-threads-item {
        padding: 0.65em 1em;
        // border: 1px solid #7d7a7a;
        width: max-content;
        border-radius: 8px!important;
        cursor: pointer;
        user-select: none;
        &:hover {
            background-color: #ECECEC;
        }
    }
}
.divider {
    position: sticky;
    bottom: 0px;
    width: 90%;
    background-color: #FCFCFC;
    border-top: 1px solid #D1CCCC;
}
.search-bar {
    width: 90%;
    position: sticky;
    left: 17px;
    top: 20px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    // padding: 0.35em 0.75em;
    border-radius: 7px;
    // overflow: hidden;
    z-index: 3;
}
.dark-sidebar {
    background-color: #011E4D;
}
// .light-sidebar {
//     background-color: #fff;
// }
.recent-threads-item.dark-sidebar:hover {
    color: black;
}
</style>