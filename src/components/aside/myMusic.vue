<template>
  <div class="myMusic">
    <span>我的音乐</span>
    <div>我的音乐</div>
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
  font-size: 15px;
  text-align: left;
}
.myMusic span {
  font-size: 13px;
  padding-left: 10px;
  color: #999;
}
</style>
