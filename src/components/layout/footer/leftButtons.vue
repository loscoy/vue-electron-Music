<template>
  <div class="leftButtons">
    <div class="down" @click="changeShow">
      <el-icon><ArrowDown /></el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMusicStore } from "@/store/modules/music";

const musicStore = useMusicStore();

const changeShow = () => {
  musicStore.$patch((state) => {
    state.musicPlayShow = false;
  });
};
</script>
<style lang="less" scoped>
.leftButtons {
  display: flex;
  align-items: center;
  height: 69px;
  .down {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 55px;
  }
}
</style>
