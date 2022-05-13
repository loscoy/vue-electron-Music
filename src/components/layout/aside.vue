<script setup lang="ts"></script>
<template>
  <div class="aside">
    <el-scrollbar height="80vh">
      <a-default></a-default>
      <my-Music></my-Music>
      <created-playlist></created-playlist>
      <collect-playlist></collect-playlist
    ></el-scrollbar>
  </div>
</template>
<style scoped>
.aside {
  overflow-y: auto;
}
</style>
