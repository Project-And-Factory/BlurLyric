<script setup>
import iconToClick from './iconToClick.vue'
import iconWithText from './iconWithText.vue'

import {ref,watch} from 'vue'

const emit = defineEmits(['leftBarChange'])

const state = ref('short')

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

watch(
  state,
  async newState =>{
    emit('leftBarChange', newState); // 触发一个自定义事件input，并将inputText的值作为参数传递给父组件
  }
)
</script>

<template> 
  <div :class="['leftBar',state]">
    <!--调整侧栏状态-->
    <iconToClick @click="state= (state=='short')?'wide':'short'">
      <i class="bi bi-list"></i>
    </iconToClick>

    <h1>我的音乐</h1>

    <!--音乐库-->
    <iconWithText @click="router.push('/')" :type="(state=='short')?'hidden':null" >
      <template #svg>
        <i class="bi bi-house-fill"></i>
      </template>
      <template #text>
        音乐库
      </template>
    </iconWithText>

    <h1>设置区</h1>

    <!--音乐目录-->
    <iconWithText @click="router.push('/musicFolder/')" :type="(state=='short')?'hidden':null" >
      <template #svg>
        <i class="bi bi-folder-fill"></i>
      </template>
      <template #text>
        本地音乐目录管理
      </template>
    </iconWithText>

    <iconWithText @click="router.push('/musicFolder/')" :type="(state=='short')?'hidden':null" >
      <template #svg>
        <i class="bi bi-gear-fill"></i>
      </template>
      <template #text>
        设置
      </template>
    </iconWithText>
    
  </div>
</template>

<style>
.leftBar{
  --width: 38px;
  width: var(--width);
  transition: 0.25s cubic-bezier(.5,.3,.2,1);
  user-select: none;
  display: flex;
  flex-direction: column;
  margin: 0 7px;
  gap: 7px;
}
.leftBar.wide{
  --width: 200px
}

</style>

<style scoped>

h1{
  font-size: 15px;
  padding-left: 10px;
  color: #0000;
  white-space: nowrap;
  height: 0px;
  margin: -7px 0 0 0;
  transition: all 0.125s cubic-bezier(.5,.3,.2,1)  0.125s,color 0.125s  cubic-bezier(.5,.3,.2,1);

}
.wide h1{
  transition: all 0.125s cubic-bezier(.5,.3,.2,1) ,color 0.125s  cubic-bezier(.5,.3,.2,1) .125s;
  color: #0006;
  margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  height: 20px;

}

</style>
