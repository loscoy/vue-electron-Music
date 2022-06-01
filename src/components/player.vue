<template>
  <div class="player">
    <audio id="player" v-show="false" @canplay="canplay" @timeupdate="updateTime" :src="musicUrl" ref="player" controls></audio>
    <div class="left">
      <player-left></player-left>
    </div>
    <div class="right">
      <player-right></player-right>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { musicService } from "@/API/music";
import { onMounted, reactive, ref, watch } from "vue";
import { useMusicStore } from "@/store/modules/music";
import { storeToRefs } from "pinia";

const musicStore = useMusicStore();
const { currentIndex, currentMusicId, playStatus } = storeToRefs(musicStore);
let params = reactive({ id: currentMusicId });
const player = ref();
let musicUrl = ref("");
const can = ref(false);

onMounted(() => {
  getSQUrl();
});
watch([currentMusicId, playStatus], (nval, oval) => {
  if (nval[0] !== oval[0]) {
    getSQUrl();
  }
  if (nval[1]) {
    player.value.play();
  } else {
    player.value.pause();
  }
});

const getSQUrl = async () => {
  let res = await musicService.getHighMusicUrl(params);
  res.data.data.code === 200 ? (musicUrl.value = res.data.data.url) : getUrl();
};
const getUrl = async () => {
  let res = await musicService.getMusicUrl(params);
  musicUrl.value = res.data.data[0].url;
};
const updateTime = (e: any) => {
  musicStore.currentTime = e.target.currentTime; //获取audio当前播放时间
};
const canplay = (e: any) => {
  musicStore.duringTime = e.target.duration; //歌曲可播放时获取总时间
  musicStore.changePlayStatus(true);
};
const startLoad = () => {
  musicStore.$patch((state) => {
    state.playStatus = false;
  });
};
</script>
<style lang="less">
.player {
  height: 81vh;
  padding: 5rem 50px;
  width: 100%;
  opacity: 1;
  background-color: white;
  display: flex;
  .left {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right {
    width: 50%;
  }
}
</style>
