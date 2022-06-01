<template>
  <div class="rightButtons">
    <div class="showPlayList" @click="drawer = true">
      <el-icon><Expand /></el-icon>
    </div>
    <el-drawer v-model="drawer" title="当前播放" size="400px">
      <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
        <li
          v-for="(item, index) in musicDetails"
          :key="item"
          class="infinite-list-item"
          @click="changeIndex(index)"
          :style="{ background: backgroundColor(index) }"
        >
          <div class="playing">
            <el-icon v-if="currentIndex === index"><CaretRight /></el-icon>
          </div>
          <div class="musicName" :style="{ color: highLight(index) }">{{ item.name }}</div>
          <div class="artistName" :style="{ color: highLight(index) }">{{ ArtistArr[index] }}</div>
          <div class="time">{{ new Date(item.dt).getMinutes() + ":" + new Date(item.dt).getSeconds().toString().padEnd(2, "0") }}</div>
        </li>
      </ul>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useMusicStore } from "@/store/modules/music";
import { storeToRefs } from "pinia";
import { musicService } from "@/API/music";
import { handleArtist } from "@/utils/artistUtils";

const musicStore = useMusicStore();
const { musicIdArr, currentIndex, musicDetails, ArtistArr } = storeToRefs(musicStore);
const offset = ref(0);
const drawer = ref(false);

onMounted(() => {
  getDetails();
});
watch(musicIdArr, (nval, oval) => {
  getDetails();
});
const load = () => {
  offset.value += 10;
};
const getDetails = () => {
  musicService.getMusicDetails({ ids: musicIdArr.value.join(",") }).then((res) => {
    musicStore.setMusicDetails(res.data.songs);
    artistsHandle();
  });
};
const artistsHandle = () => {
  let artistsArr: any[] = [];
  musicDetails.value.forEach((item) => {
    artistsArr.push(handleArtist(item.ar));
  });
  musicStore.setArtistArr(artistsArr);
};
const highLight = (index: number) => {
  if (index === currentIndex.value) {
    return "red";
  } else {
    return "";
  }
};
const changeIndex = (index: number) => {
  musicStore.$patch((state) => {
    state.currentIndex = index;
  });
};
const backgroundColor = (index: number) => {
  if (index % 2 === 1) {
    return "rgb(249, 249, 249)";
  }
};
</script>
<style lang="less" scoped>
.rightButtons {
  width: 20%;
  .el-drawer {
    ::v-deep(.el-drawer__header) {
      text-align: left;
    }
  }
  .showPlayList {
  }
  ::v-deep(.el-drawer__body) {
    padding: 0;
  }
  .infinite-list {
    height: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    // padding-left: 20px;
    text-align: left;
    .infinite-list-item {
      display: grid;
      grid-template-columns: 0.3fr 2fr 1fr 0.7fr;
      grid-template-rows: 40px;
      place-items: center start;
      .musicName {
        width: 100%;
        .textOverflow();
      }
      .artistName {
        font-weight: lighter;
        padding: 0;
        width: 100%;
        .textOverflow();
      }
      .time {
        color: rgba(0, 0, 0, 0.481);
        font-weight: lighter;
        width: 100%;
        text-align: center;
      }
      .playing {
        color: red;
      }
    }
  }
}
</style>
