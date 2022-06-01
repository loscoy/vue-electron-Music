<template>
  <div class="footer">
    <div class="left">
      <transition name="el-fade-in">
        <left-buttons v-show="musicStore.musicPlayShow" class="left-buttons"></left-buttons>
      </transition>
      <transition name="el-fade-in">
        <left-info v-show="!musicStore.musicPlayShow" class="left-info"></left-info>
      </transition>
    </div>
    <center-contoller></center-contoller>
    <RightButtons></RightButtons>
  </div>
</template>
<script setup lang="ts">
import { useMusicStore } from "@/store/modules/music";

const musicStore = useMusicStore();
</script>

<style lang="less" scoped>
.footer {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    width: 200px;
    height: 100%;
    .left-buttons {
      position: absolute;
    }
  }
}
</style>
