<template>
  <div>
    <div class="merged-thread" :class="sidebarClass">
      <div title="New Thread" class="new-thread">
        <div>
          <v-btn variant="elevated" color="addnew" style="
              width: 100%;
              text-transform: capitalize;
              display: flex;
              justify-content: left;
            " a href="/">
            <span>+</span>New Thread
          </v-btn>
        </div>
      </div>

      <div style="user-select: none" title="Search Everything here" class="search-bar" @click="$emit('trigger-search')">
        <div style="width: 100%">
          <v-btn variant="elevated" color="search" style="
              width: 100%;
              text-transform: capitalize;
              display: flex;
              justify-content: left;
            ">
            <span>
              <i style="margin-right: 7px; font-size: 13px" class="fa-solid fa-magnifying-glass"></i>
            </span>
            Search Here</v-btn>
        </div>
      </div>

      <div class="divider1"></div>
    </div>

    <v-list class="recent-threads" :class="sidebarClass" v-on:scroll="handleScroll">
      <v-list-item-group>
        <v-list-item v-for="thread in threads" :key="thread.id" class="recent-threads-item" :class="sidebarClass">
          <v-list-item-content>
            <router-link
              v-if="!leftBarLoading"
              :to="`/chats/messages/${thread.id}`"
              @click.prevent="loadChat(thread.id)"
              class="thread-link"
              :class= "[{ 'active-thread': currentChatId === thread.id }, sidebarClass]">
              {{ thread.name }}
            </router-link>
            
            <span v-else>Loading...</span>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <div class="divider"></div>
  </div>
</template>
<script setup lang="js">
import { onMounted, ref, computed, watch } from "vue";
import { useThemeStore } from '../stores/useThemeStore';
import { useChatStore } from '../stores/Chatstore';
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router';
import { inject } from "vue"

// biến config dc inject 'config' vào để làm url động thay đổi trong public/config.json:
const config = inject('config');

const route = useRoute();
//currentChatId for css backgroundColor of router-link when active the thread
const currentChatId = computed(() => route.params.chatId);

const themeStore = useThemeStore();
const sidebarClass = computed(() => (themeStore.isDarkMode ? 'dark-sidebar' : 'light-sidebar'));
const chatStore = useChatStore();
const threads = ref([]);
const page = ref(1);
// const limit = 30;
const { leftBarLoading } = storeToRefs(chatStore);
// func lấy dữ liệu chat từ API
const isLoading = ref(false);

const lastId = ref(0);
const fetchChats = async () => {
  if (isLoading.value) {
    console.log("Đã có một request đang chạy, không gọi lại fetchChats.");
    return;
  }

  // console.log("Bắt đầu tải dữ liệu...");
  isLoading.value = true;

  try {
    const response = await fetch(
      `${config.API_BASE_URL}/api/v1/chats/conversations?last_id=${lastId.value}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      }
    );

    // console.log("Phản hồi API nhận được:", response);

    if (!response.ok) {
      throw new Error(`Lỗi khi tải API: ${response.statusText}`);
    }

    const data = await response.json();
    // console.log("Dữ liệu trả về từ API:", data);

    if (data?.data?.length) {
      lastId.value = data.data[data.data.length - 1].id; // Cập nhật last_id mới
      // console.log(`Thêm ${data.data.length} đoạn hội thoại vào danh sách.`);
      threads.value = [...threads.value, ...data.data]; // add dữ liệu mới
      page.value = data.last_id || page.value + 1; // Update `page` dựa trên `last_id` trả về từ API
      // console.log("Cập nhật page:", page.value);
      // console.log("Dữ liệu thread trả về:", data.data);

    } else {
      console.log("Không có dữ liệu mới từ API.");
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    return []; // Trả về mảng rỗng khi có lỗi
  } finally {
    // console.log("Kết thúc tải dữ liệu.");
    isLoading.value = false;
    leftBarLoading.value = false;
  }
};

// func call API khi trang được tải lần đầu
onMounted(() => {
  // console.log("Trang đã được load, gọi fetchChats lần đầu.");
  // fetchChats();
  leftBarLoading.value = true
  // console.log("LeftBarLoading: ",leftBarLoading.value)
});

// func xử lý lazy load khi cuộn tới cuối danh sách
const handleScroll = (event) => {
  console.log("Xử lý sự kiện cuộn...");
  console.log("Chiều cao scroll:", event.target.scrollHeight);
  console.log("Vị trí hiện tại của scroll:", event.target.scrollTop);
  console.log("Chiều cao vùng hiển thị:", event.target.clientHeight);

  const isBottom =
    event.target.scrollHeight - event.target.scrollTop <=
    event.target.clientHeight + 1;

  if (isBottom) {
    console.log("Đã cuộn đến đáy, tải thêm dữ liệu...");
    fetchChats();
  } else {
    console.log("Chưa cuộn đến đáy.");
  }
};

// link tới các đoạn chat khi truy cập vào ở recent chats nhé
const messages = ref([]);
const loadChat = async (chatId) => {
  console.log("Đang tải tin nhắn cho chatId:", chatId);
  try {
    const response = await fetch(
      `${config.API_BASE_URL}/api/v1/chats/messages/${chatId}/`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Không thể tải tin nhắn của chatId: ${chatId}`);
    }
    const data = await response.json();
    console.log("Dữ liệu tin nhắn nhận được:", data);
    // Xử lý dữ liệu trả về
    const formattedMessages = data.map((message) => ({
      ...message,
      role: message.chat_role, // Định dạng lại nếu cần
    }));
    messages.value = formattedMessages; // lưu tin nhắn
  } catch (error) {
    console.error("Lỗi khi tải tin nhắn:", error);
  }
};

//watch này sẽ GET lại name ở đoạn chat hiện tại rồi mới theo dõi sự thay đổi -> solved dc vấn đề ko update được data của threads.
watch(leftBarLoading, async () => {
  if (leftBarLoading.value) {
    threads.value = [];
    lastId.value = 0;
    await fetchChats();

    // duyệt qua các thread và kiểm tra nếu thiếu tên thì gọi API để lấy tên
    if (threads.value.length > 0) {
      for (const thread of threads.value) {
        if (!thread.name) {
          try {
            // console.log('Fetching thread with ID:', thread.id);
            const response = await fetch(`${config.API_BASE_URL}/api/v1/chats/conversations/${thread.id}/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
              },
            });

            if (!response.ok) {
              console.error('Failed to fetch thread name from API:', response.status, await response.text());
              continue;
            }

            const threadData = await response.json();
            thread.name = threadData.name || 'Tên mặc định';
          } catch (error) {
            console.error('Error fetching thread data:', error);
          }
        }
      }
    }
  }
});

// // Watch lắng nghe sự thay đổi của threads
// watch(threads, (newValue) => {
//   console.log("Threads updated:", newValue);
// }, { deep: true }); // Lắng nghe thay đổi sâu

</script>
<style lang="scss" scoped>
a.router-link-active {
  background-color: #E3E3E3;
  color: black;
}
a.router-link-active.dark-sidebar {
    background-color: #4e4c4c!important;
    color: white;
}
.thread-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  padding: 0.7em 1em;
  display: inline-flex;
  border-radius: 10px;
  &:hover {
    background-color: #E3E3E3;
  }
}
.thread-link.dark-sidebar:hover {
  background-color: #2F2F2F;
  color: white;
}
.v-list-item__content {
  align-self: center;
  grid-area: auto !important;
  overflow: hidden;
}

.divider,
.divider1 {
  height: 1px;
  width: 90%;
  background-color: #d1cccc;
  margin: 10px 0;
  position: relative;
  left: 7%;
}

.merged-thread {
  background-color: #f9f9f9;
  padding-top: 1px;
  top: 8px;
  position: sticky;
  z-index: 2;
  height: max-content;
  margin-bottom: 1em;
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
  left: 5%;
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
  background-color: #f9f9f9;
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
  left: 47%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 15px;
  border-radius: 7px;
  padding: 0.25em;
  background-color: #f9f9f9;
  overflow: hidden;
  width: 108%;
  overflow-y: scroll;
  height: 87%;
  .recent-threads-item {
    padding: 0.05em 1em;
    // border: 1px solid #7d7a7a;
    width: max-content;
    border-radius: 8px !important;
    user-select: none;
    position: relative;
    left: 2%;
    white-space: nowrap;
  }
}

.divider {
  position: sticky;
  bottom: 0px;
  width: 90%;
  background-color: #fcfcfc;
  border-top: 1px solid #d1cccc;
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
      background-color: #212121;
}

// .recent-threads-item.dark-sidebar:hover {
//   color: black;
// }
</style>
