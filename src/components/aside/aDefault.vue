<template>
  <div class="aDefault">
    <div @click="swich('discover')">发现音乐</div>
    <div @click="swich('recommend')">推荐歌单</div>
    <div @click="swich('new')">最新音乐</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const swich = (path: string) => router.push(path);
</script>

<style scoped>
.aDefault {
  padding-left: 10px;
}
.aDefault div {
  padding: 0 0 20px 10px;
  font-size: 15px;
  text-align: left;
}
</style>
