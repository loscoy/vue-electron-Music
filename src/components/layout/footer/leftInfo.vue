<template>
  <div class="leftInfo">
    <div class="coverImg" @click="changeShow">
      <div class="up">
        <el-icon><ArrowUp /></el-icon>
      </div>
      <el-image :src="currentMusicDetail.al.picUrl" v-if="currentMusicDetail"></el-image>
    </div>
    <div class="info">
      <div class="songName" :title="currentMusicDetail.name" v-if="currentMusicDetail">{{ currentMusicDetail.name }}</div>
      <div class="artist" :title="artists">{{ artists }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleArtist } from "@/utils/artistUtils";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { musicService } from "../../../API/music";
import { useMusicStore } from "@/store/modules/music";
import { storeToRefs } from "pinia";

const musicStore = useMusicStore();
const { currentIndex, musicIdArr, currentMusicId, currentMusicDetail } = storeToRefs(musicStore);

const artists = computed(() => {
  return handleArtist(currentMusicDetail.value.ar);
});
const changeShow = () => {
  musicStore.$patch((state) => {
    state.musicPlayShow = true;
  });
};
</script>

<style lang="less" scoped>
.leftInfo {
  position: relative;
  height: 100%;
  max-height: 70px;
  display: flex;
  align-items: center;
  .coverImg {
    position: relative;
    display: flex;
    align-items: center;
    max-height: 70px;
    width: 55px;
    overflow: hidden;
    border-radius: 6px;
    .up {
      opacity: 0;
      color: white;
      z-index: 1;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(3px) saturate(200%);
      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
  .info {
    padding: 0 10px;
    text-align: left;
    width: 140px;
    .songName {
      font-size: 1rem;
      .textOverflow();
    }
    .artist {
      font-size: 0.8rem;
      color: #999;
      .textOverflow();
    }
  }
}
</style>
