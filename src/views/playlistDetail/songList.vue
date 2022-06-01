<template>
  <div class="songList">
    <music-list-comp :playlistId="musicStore.playlistId.toString()"></music-list-comp>
  </div>
</template>

<script lang="ts" setup>
import { useMusicStore } from "@/store/modules/music";
const musicStore = useMusicStore();
</script>
<style lang="less" scoped></style>
