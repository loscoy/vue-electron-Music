<template>
  <div class="collect">
    <span>收藏的歌单</span>
    <div v-for="i in 10" :key="i">收藏的歌单</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const swich = (path: string) => router.push(path);
</script>

<style scoped>
.collect {
  padding-left: 10px;
  text-align: left;
}
.collect div {
  padding: 0 0 20px 10px;
  font-size: 15px;
  text-align: left;
}
.collect span {
  font-size: 13px;
  padding-left: 10px;
  color: #999;
}
</style>
