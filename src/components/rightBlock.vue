<script setup>
import iconToClick from './iconToClick.vue'


</script>

<template>
  <div class="router">
    <router-view></router-view>
  </div>
</template>

<style scoped>
  .router{
    display: block;
    background-color: #eee;
    flex: 1;
    height: 100%;
    width: calc(100% + 7px);
    padding: 10px 16px;
    border-radius: 8px 0 0 0;
    box-shadow: 0px 0px 2px #0002;
    position: relative;
  }
</style>
