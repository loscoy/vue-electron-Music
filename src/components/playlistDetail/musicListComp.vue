<template>
  <div class="musicList">
    <ul v-infinite-scroll="load">
      <li class="header">
        <div></div>
        <div>操作</div>
        <div>标题</div>
        <div>歌手</div>
        <div>专辑</div>
        <div>时间</div>
      </li>
      <el-skeleton style="width: 100%" :loading="loading" animated>
        <template #template>
          <div style="display: flex" v-for="i in 20" :key="i">
            <div style="width: 8.5%; padding: 5px 5px; height: 40px">
              <el-skeleton-item variant="h1"></el-skeleton-item>
            </div>
            <div style="width: 9.5%; padding: 5px 5px; height: 40px">
              <el-skeleton-item variant="h1"></el-skeleton-item>
            </div>
            <div style="width: 32%; padding: 5px 5px; height: 40px">
              <el-skeleton-item variant="h1"></el-skeleton-item>
            </div>
            <div style="width: 18%; padding: 5px 5px; height: 40px">
              <el-skeleton-item variant="h1"></el-skeleton-item>
            </div>
            <div style="width: 22.5%; padding: 5px 5px; height: 40px">
              <el-skeleton-item variant="h1"></el-skeleton-item>
            </div>
            <div style="width: 9%; padding: 5px 5px; height: 40px">
              <el-skeleton-item variant="h1"></el-skeleton-item>
            </div>
          </div>
        </template>
        <template #default>
          <li
            v-for="(item, index) in songs.data.slice(0, count)"
            :key="item"
            :style="{ background: backgroundColor(index + 1) }"
            @dblclick="play(index)"
          >
            <div class="index">{{ index + 1 }}</div>
            <div class="handle"></div>
            <div class="musicName">
              <div :title="item.name" class="name">{{ item.name }}</div>
              <div title="已存入云盘" class="icon">
                <el-icon v-if="item.pc"><MostlyCloudy /></el-icon>
              </div>
            </div>
            <div :title="artistsArr.data[index]" class="artistName">{{ artistsArr.data[index] }}</div>
            <div :title="item.al.name" class="alName">{{ item.al.name }}</div>
            <div>{{ new Date(item.dt).getMinutes().toString() }}:{{ new Date(item.dt).getSeconds().toString().padEnd(2, "0") }}</div>
          </li>
        </template>
      </el-skeleton>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { musicService } from "@/API/music";
import { handleArtist } from "@/utils/artistUtils";
import { useMusicStore } from "@/store/modules/music";

const musicStore = useMusicStore();
const props = defineProps({ playlistId: { type: String } });
const count = ref(30);
const songs: any = reactive({ data: [] });
const artistsArr: any = reactive({ data: [] });
const loading = ref(true);

onMounted(() => {
  getPlaylistSongs();
});
watch(props, (val) => {
  getPlaylistSongs();
});
const load = () => {
  if (count.value <= songs.data.length) {
    count.value += 20;
  }
};
const getPlaylistSongs = () => {
  loading.value = true;
  artistsArr.data = [];
  count.value = 10;
  musicService.getPlaylistSongs({ id: props.playlistId }).then((res) => {
    songs.data = res.data.songs;
    if (songs.data.length !== 0) {
      songs.data.forEach((item: any) => {
        artistsArr.data.push(handleArtist(item.ar));
      });
    }
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  });
};
const backgroundColor = (index: number) => {
  if (index % 2 === 1) {
    return "rgb(249, 249, 249)";
  }
};
const musicIdArr = () => {
  return songs.data.map((item: any) => {
    return item.id;
  });
};
const play = (index: number) => {
  musicStore.changePlayStatus(false);
  musicStore.setCurrentIndex(index);
  musicStore.setMusicIdArr(musicIdArr());
};
</script>

<style lang="less" scoped>
.musicList {
  position: relative;
  ul {
    list-style: none;
    height: 51vh;
    padding-left: 0;
    overflow: auto;
    margin-bottom: 0;
    .scrollBar();
    li {
      display: grid;
      grid-template-columns: 1fr 1fr 3.5fr 2fr 2.5fr 1fr;
      grid-template-rows: 40px;
      place-items: center start;
      text-align: left;
      .index {
        text-align: center;
        width: 100%;
      }
      .musicName {
        display: grid;
        grid-template-columns: 85% 15%;
        width: 100%;
        cursor: pointer;
        .name {
          .textOverflow();
        }
        .icon {
          i {
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
      .artistName {
        width: 100%;
        cursor: pointer;
        .textOverflow();
      }
      .alName {
        width: 100%;
        cursor: pointer;
        .textOverflow();
      }
    }
  }
}
</style>
