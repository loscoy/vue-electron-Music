<template>
  <div class="created">
    <span>创建的歌单</span>
    <div>创建的歌单</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const swich = (path: string) => router.push(path);
</script>

<style scoped>
.created {
  padding-left: 10px;
  text-align: left;
}
.created div {
  padding: 0 0 20px 10px;
  font-size: 15px;
  text-align: left;
}
.created span {
  font-size: 13px;
  padding-left: 10px;
  color: #999;
}
</style>
