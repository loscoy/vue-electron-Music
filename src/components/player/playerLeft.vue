<template>
  <div class="playerLeft">
    <el-image :src="currentMusicDetail.al.picUrl" v-if="currentMusicDetail"></el-image>
  </div>
</template>

<script lang="ts" setup>
import { useMusicStore } from "@/store/modules/music";
import { storeToRefs } from "pinia";

const musicStore = useMusicStore();
const { currentMusicDetail } = storeToRefs(musicStore);
</script>
<style lang="less" scoped>
.playerLeft {
  width: 25rem;
}
</style>
