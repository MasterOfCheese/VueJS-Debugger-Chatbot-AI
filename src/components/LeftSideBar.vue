<template>
    <div>
        <div class="merged-thread">
            <div title="New Thread" class="new-thread">
                <div><span>+</span>New Thread</div>
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
import { onMounted } from "vue";


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
</script>
<style lang="scss" scoped>
.divider, .divider1 {
    height: 1px;
    width: 90%;
    background-color: #d1cccc;
    margin: 20px 0;
    position: relative;
    left: 5%;
}
.merged-thread {
    background-color: #F9F9F9;
    padding-top: 1px;
    top: 8px;
    margin-top: 30px;
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
    position: absolute;
    left: 24px;
    bottom: 10px;
    padding: 0.5em 10em 0.5em 0.6em;
    cursor: pointer;
    border-radius: 7px;
    &:hover {
        background-color: #ECECEC;
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
        &:hover {
            background-color: #ECECEC;
        }
    }
}
.divider {
    position: absolute;
    bottom: 0px;
    width: 17.5%;
    left: 8px;
    padding-bottom: 2em;
    background-color: #FCFCFC;
    border-top: 2px solid #D1CCCC;
}
</style>