<template>
  <div class="controller" @keyup.space="changePlay()">
    <div class="top">
      <div class="left" @click="preTrack()">
        <el-image :src="pre"></el-image>
      </div>
      <div class="center" @click="changePlay()">
        <el-image class="ctl" :src="play" v-if="!musicStore.playStatus"></el-image>
        <el-image :src="pause" v-else></el-image>
      </div>
      <div class="right" @click="nextTrack()">
        <el-image :src="next"></el-image>
      </div>
    </div>
    <div class="bottom">
      <el-slider class="slider" @input="moveSlider" v-model="schedule" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useMusicStore } from "@/store/modules/music";
import next from "@/assets/icon/next.png";
import pre from "@/assets/icon/pre.png";
import play from "@/assets/icon/play.png";
import pause from "@/assets/icon/pause.png";
import { storeToRefs } from "pinia";

const musicStore = useMusicStore();
const { currentTime, duringTime } = storeToRefs(musicStore);
const player: any = reactive({ data: {} });
const schedule = ref(0);

onMounted(() => {
  player.data = document.getElementById("player");
  musicStore.changePlayStatus(false);
});
watch(currentTime, (nval, oval) => {
  schedule.value = Math.round((Math.floor(nval) / Math.floor(duringTime.value)) * 100);
});

const changePlay = () => {
  if (musicStore.playStatus === false) {
    player.data.play();
  } else {
    player.data.pause();
  }
  musicStore.$patch((state) => {
    state.playStatus = !state.playStatus;
  });
};
const nextTrack = () => {
  musicStore.changePlayStatus(false);
  musicStore.addIndex();
};
const preTrack = () => {
  musicStore.changePlayStatus(false);
  musicStore.subIndex();
};
const moveSlider = (val: number) => {
  musicStore.$patch((state) => {
    state.playStatus = false;
  });
  player.data.currentTime = (val / 100) * duringTime.value;
  const lrcUl: any = document.getElementById("lrcUl");
  let highLineList = Array.from(lrcUl.querySelectorAll(".lineHigh"));
  highLineList?.forEach((item: any) => {
    item.classList.remove("lineHigh");
  });
  musicStore.$patch((state) => {
    state.playStatus = true;
  });
};
</script>

<style lang="less" scoped>
.controller {
  width: 350px;
  height: 69px;
  bottom: 0;
  .top {
    margin-top: 10px;
    height: 55%;
    display: flex;
    justify-content: center;
    .center .el-image,
    .left .el-image,
    .right .el-image,
    .center,
    .left,
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 10px;
    }
    .left,
    .center,
    .right {
      width: 38px;
      height: 38px;
      &:hover {
        background-color: rgba(99, 99, 99, 0.126);
        border-radius: 50%;
        cursor: pointer;
      }
    }
    .center .ctl {
      padding-left: 2px;
    }
  }
  .bottom {
    bottom: 0;
    overflow: hidden;
    .slider {
      height: 15px;
      padding: 0 10px;
      ::v-deep(.el-slider__runway) {
        height: 3px;
        &:hover {
          height: 6px;
          .el-slider__bar {
            height: 6px;
          }
          .el-slider__button {
            opacity: 1;
          }
        }
      }
      ::v-deep(.el-slider__bar) {
        height: 3px;
      }

      ::v-deep(.el-slider__button) {
        width: 12px;
        height: 12px;
        opacity: 0;
      }
      // &:hover {

      // }
    }
  }
}
</style>
