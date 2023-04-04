<script setup lang="ts">
import { computed, ref, onActivated, watch } from 'vue';
import { hasPreviousRouteInApp, goHome, useRouteAndPtRouter } from "../../routes/pt-router";
import PtButton from "../../components/pt-button.vue"
import cp from "./cp-helper"
import { useTheme } from '../../hooks/useTheme';
import images from '../../images';
import ListeningLoader from '../../components/listening-loader.vue'

import demoLink from './demo-link.vue'

const { theme } = useTheme()
const { router, route } = useRouteAndPtRouter()
const hasPrev = hasPreviousRouteInApp()
const inputValue = ref<string>("")
const inputEl = ref<HTMLInputElement | null>(null)

const demoLinkList =[
  {
    title: "Digital Humans and the Story Behind Lil Miquela",
    desc:'You’ve probably heard of ‘Lil Miquela. The 19 year-old Brazilian-American inﬂuencer has millions of followers and has partnered with the likes of Samsung and Prada.',
    url:'https://pod.link/842818711/episode/1c79682198fcad98eb851e7d4177ec59'
  },
  {
    title: "The Sun Will Come Out Tomorrow....Probably",
    desc:'In today\'s episode, we\'ll be exploring ways to cultivate hope in our lives. Because let\'s face it, life can be unpredictable and chaotic, and sometimes it feels like the sun may never shine again. But even in the midst of our darkest days, there\'s always hope. By holding onto hope and believing that tomorrow will bring a brighter day, we can weather life\'s storms and emerge stronger and more resilient on the other side. So, let\'s grab our sunglasses and look to the sky with optimism, because even if we can\'t guarantee that the sun will come out tomorrow, we can choose to believe that it probably will. Join us as we dive into ways to cultivate hope as we Calm it Down in 3...2...1.',
    url:'https://pod.link/1530042513/episode/7db2ede85be7706f64cd109f3af83d56'
  },
]

const demoLink1 = {

}

const hasQuery = ref(false)
// 监听 query 的变化，更新 hasQuery
watch(() => route.query, (newV, oldV) => {
  if(route.name !== "create") return
  const { title, text, link } = newV
  const newHasQuery = Boolean(title || text || link)
  hasQuery.value = newHasQuery
})

//这段代码是使用Vue 3中的computed属性来计算一个布尔值canSubmit，
// 表示当前输入框中的内容是否符合指定的格式要求。
const canSubmit = computed(() => {
  let val = inputValue.value
  let v = val.trim()
  if(v.length < 10) return false
  const reg = /^http(s)?:\/\/[\w\.]*\w{1,32}\.\w{2,6}\S*$/g
  return reg.test(val)
})

const onInputConfirm = () => {
  inputEl?.value?.blur()
  if(!canSubmit.value) return
  cp.finishInput(inputValue.value, router, route)
}

const onTapConfirm = () => {
  if(!canSubmit.value) return
  cp.finishInput(inputValue.value, router, route)
  inputEl?.value?.blur()
}

const onTapBack = () => {
  if(hasPrev.value) router.go(-1)
  else goHome(router)
}

const onClickDemoLick = (index: any) => {

  inputValue.value = demoLinkList[index].url;
  onTapConfirm()
  console.log('click')
}

onActivated(() => {
  const { title, text, link } = route.query

  // 有从外部传来值时
  if(title || text || link) {
    hasQuery.value = true
    cp.useLinkFromQuery(router, route)
  }
  else {
    if(canSubmit.value) return
    inputEl.value?.focus()
  }
})


</script>

<template>
  <div class="page">
    <h2>音频内容</h2>
    <p>选择DemoLink或者在底部填url</p>
    <demoLink :data='demoLinkList[0]' @click="onClickDemoLick(0)"/>
    <demoLink :data='demoLinkList[1]' @click="onClickDemoLick(1)"/>
    <div class="separator"/>
    <div class="page-container">
      <h2>输入链接</h2>
      <input
        v-model="inputValue"
        placeholder="或者黏贴单集链接"
        type="url"
        @keyup.enter="onInputConfirm"
        maxlength="1000"
        ref="inputEl"
      />
      <p style ='text-align: left'>提示:<br/>
        1.支持 xiaoyuzhoufm.com、podcasts.apple.com/cn/ 或者后缀为 .mp3 的链接;<br/>
        2.小宇宙url位置为:单集-右上角-分享-复制链接<br/>
        3.可到 https://pod.link/  内搜索想听的内容，然后进入单集播放页面，使用该url
      </p>
      <p class="check-detail">
        <a href="https://pod.link/" target="_blank">
          <div class="div-bg-img check-detail-question"></div>
          <span>https://pod.link/</span>
        </a>
      </p>
    </div>
    <div class="page-btns-virtual"></div>
  </div>
  <div class="page-btns-container">
    <div class="page-btns">
      <pt-button 
        class="join-main-btn" 
        text="确定" 
        @click="onTapConfirm"
        :disabled="!canSubmit"
      />
      <pt-button :text="hasPrev ? '返回' : '回首页'" type="other" @click="onTapBack"></pt-button>
    </div>
  </div>

  <!-- 从参数创建房间 -->
  <div v-if="hasQuery" class="page-full">
    <ListeningLoader />
    <div class="pf-text">
      <span>正在创建房间..</span>
    </div>
  </div>
</template>

<style scoped lang="scss">

.page-btns-virtual {
  height: 50px;
}
.separator {
  border: 1px solid #ccc;
  margin: 20px;
  padding: 0;
  width: 80%;
}

.page-container {
  padding-top: 0px;
  h1 {
    margin-block-start: 0;
    font-size: 38px;
    line-height: 50px;
    color: var(--text-color);
    letter-spacing: 2px;
    margin-bottom: 50px;
  }

  input {
    font-size: 18px;
    line-height: 46px;
    color: var(--desc-color);
    border: 0;
    outline: none;
    text-align: center;
    //border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  input::-webkit-input-placeholder {
    color: var(--note-color);
  }

  p {
    margin-block-start: 30px;
    margin-block-end: 10px;
    font-size: 14px;
    color: var(--note-color);
    text-align: center;
    max-width: 320px;
    user-select: text;
  }

  .check-detail {
    margin-top: 0;
    
    a {
      // color: rgb(66, 133, 244);
      color: var(--tap-color);
      display: flex;
      align-items: center;

      .check-detail-question {
        width: 16px;
        height: 16px;
        opacity: .5;
        margin-right: 5px;
        background-image: v-bind("'url(' + (theme === 'light' ? images.IC_QUESTION : images.IC_QUESTION_DM) + ')'");
      }
    }
  }

}

.join-main-btn {
  margin-bottom: 20px;
}

.page-full {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1500;
  background-color: var(--bg-color);

  .pf-text {
    font-size: var(--desc-font);
    color: var(--desc-color);
    line-height: 1.5;
  }
}

</style>