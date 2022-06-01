<template>
  <div class="userPlayList">
    <detail-header :playlistId="musicStore.playlistId.toString()"></detail-header>
    <!-- <router-view></router-view> -->
    <component :is="songListVue"></component>
  </div>
</template>

<script setup lang="ts">
import { useMusicStore } from "@/store/modules/music";
import { musicService } from "@/API/music";
import { onMounted, reactive } from "vue";
import collectorVue from "./playlistDetail/collector.vue";
import playlistCommentVue from "./playlistDetail/playlistComment.vue";
import songListVue from "./playlistDetail/songList.vue";

const musicStore = useMusicStore();
const params = reactive({ id: musicStore.playlistId, s: "10" });
const musicList: any = reactive({ data: {} });

// onMounted(() => {
//   getPlaylistDetail();
// });
// const getPlaylistDetail = () => {
//   musicService.getPlaylistDetail(params).then((res) => {
//     musicList.data = res.data;
//   });
// };
</script>

<style lang="less" scoped>
.userPlayList {
  height: 77vh;
}
</style>
