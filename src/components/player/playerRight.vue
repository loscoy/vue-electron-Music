<template>
  <div class="playRight">
    <div class="title">
      <div class="musicName" v-if="currentMusicDetail">{{ currentMusicDetail.name }}</div>
      <div class="artistName">{{ ArtistArr[currentIndex] }}</div>
    </div>
    <div class="lyricFrame">
      <el-scrollbar>
        <div class="lyricContent">
          <lyric></lyric>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useMusicStore } from "@/store/modules/music";
import { storeToRefs } from "pinia";

const musicStore = useMusicStore();
const { currentIndex, musicIdArr, currentMusicId, currentMusicDetail, ArtistArr } = storeToRefs(musicStore);
let parsms = reactive({ ids: currentMusicId });

const changeShow = () => {
  musicStore.$patch((state) => {
    state.musicPlayShow = true;
  });
};
</script>
<style lang="less" scoped>
.playRight {
  padding: 0 30px;
  .title {
    position: relative;
    .musicName {
      font-size: 1.5rem;
      margin: 10px;
    }
    .artistName {
      font-size: 0.9rem;
    }
  }
  .lyricFrame {
    position: relative;
    margin: 40px auto;
    height: 21rem;
    width: 400px;
  }
}
</style>
