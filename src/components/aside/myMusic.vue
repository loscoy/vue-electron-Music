<template>
  <div class="myMusic">
    <span>我的音乐</span>
    <div>最近播放</div>
    <div>我的音乐云盘</div>
    <div>我的播客</div>
    <div>我的收藏</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const swich = (path: string) => router.push(path);
</script>

<style scoped>
.myMusic {
  padding-left: 10px;
  text-align: left;
}
.myMusic div {
  padding: 0 0 20px 10px;
  font-size: 1rem;
  text-align: left;
}
.myMusic span {
  font-size: 0.85rem;
  padding-left: 10px;
  color: #999;
}
</style>
