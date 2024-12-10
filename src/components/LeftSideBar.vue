<template>
   
            <div>
                <div class="merged-thread">
                    <div title="New Thread" class="new-thread">
                        <div><span>+</span>New Thread</div>
                    </div>

                    <div style="user-select: none" title="Search Everything here" class="search-bar" @click="$emit('trigger-search')">
                        <div>
                            <span>
                                <i style="margin-right: 7px; font-size: 13px;" class="fa-solid fa-magnifying-glass"
                                ></i>
                            </span>
                            <span>Search Here</span>
                        </div>
                    </div>

                    <div class="divider1"></div>
                </div>
           
                <div class="recent-threads">
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit  amet.Lorem  ipsum  dolor  sit amet.Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.</div>
                    <div class="recent-threads-item">Lorem ipsum dolor sit amet.</div>
                </div>

                <div class="divider"></div>

                <div title="Log Out" class="options">
                    <div class="logout">
                        <span>
                            <i class="fa-solid fa-right-from-bracket"></i>
                            Logout
                        </span>
                    </div>
                </div>
            </div>
    
</template>
<script setup lang="js">
// import { search } from "core-js/fn/symbol";
import { onMounted } from "vue"
import { defineEmits } from 'vue'

const limitWords = (className, wordLimit) => {
  const elements = document.querySelectorAll(className)
  elements.forEach((element) => {
    const words = element.textContent.split(" ")
    if (words.length > wordLimit) {
      element.textContent = words.slice(0, wordLimit).join(" ") + "...";
    }
  })
}

onMounted(() => {
  limitWords(".recent-threads-item", 5)
})

defineEmits(['trigger-search']);

</script>
<style lang="scss" scoped>
.divider, .divider1 {
    height: 1px;
    width: 90%;
    background-color: #d1cccc;
    margin: 10px 0;
    position: relative;
    left: 5%;
}
.merged-thread {
    background-color: #F9F9F9;
    padding-top: 1px;
    top: 8px;
    // margin-top: 30px;
    position: sticky;
    z-index: 2;
.new-thread {
    width: 80%;
    position: sticky;
    left: 17px;
    top: 20px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.35em 0.75em;
    border-radius: 7px;
    overflow: hidden;
    z-index: 3;
    div {
        width: max-content;
        user-select: none;
        span {
            margin-right: 10px;
            font-size: 20px;
            position: relative;
            top: 1px;
        }
    }
        &:hover {
            background-color: #ECECEC;
        }
}
.divider1 {
    position: sticky;
    top: 70px;
}
}
.options {
    left: 15px;
    bottom: 0px;
    cursor: pointer;
    border-radius: 7px;
    user-select: none;
    width: 100%;
    position: sticky;
    top: 34px;
    // margin-top: 30px;
    padding: 0;
    background-color: #FCFCFC;
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: left;
}
.logout {
    width: 81%;
    padding: 0.55em 0.75em;
    display: flex;
    align-items: center;
    border-radius: 7px;
    position: relative;
    top: -5px;
    &:hover {
        background-color: #ECECEC;
    }
    span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    }
}
.recent-threads {
    position: relative;
    left: 55%;
    transform: translateX(-50%);
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 15px;
    border-radius: 7px;
    padding: 0.25em;
    .recent-threads-item {
        padding: 0.65em 1em;
        // border: 1px solid #7d7a7a;
        width: max-content;
        border-radius: 7px;
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
    left: 5%;
    background-color: #FCFCFC;
    border-top: 1px solid #D1CCCC;
}
.search-bar {
    width: 80%;
    position: sticky;
    left: 17px;
    top: 20px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.35em 0.75em;
    border-radius: 7px;
    overflow: hidden;
    z-index: 3;
    &:hover {
        background-color: #ECECEC;
    }
}
</style>