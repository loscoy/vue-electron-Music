<template>
  <div class="newMusic">
    <div class="linkText">
      <span>最新音乐</span>
      <el-icon><ArrowRightBold /></el-icon>
    </div>
    <div class="playListContainer">
      <div class="playListCard" v-for="(item, index) in newSongList.data" :key="item">
        <div class="info" v-if="item.picUrl">
          <div class="img">
            <el-image :src="item.picUrl" lazy>
              <template #placeholder>
                <el-image src="../../src/assets/default_album.jpg"></el-image>
              </template>
            </el-image>
          </div>
          <div class="info-text">
            <div class="abstract">{{ item.name }}</div>
            <div class="artist">{{ artistsName.data[index] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { musicService } from "@/API/music";
import { onMounted, ref, reactive } from "vue";

let newSongList: any = reactive({ data: [] });
let artistsName: any = reactive({ data: [] });

onMounted(() => {
  getRecPlaylist();
});

const getRecPlaylist = () => {
  const params = { limit: 12 };
  musicService.getNewSongs(params).then((res) => {
    newSongList.data = res.data.result;
    if (newSongList.data.length !== 0) {
      newSongList.data.forEach((item: any) => {
        handleArtist(item.song.artists);
      });
    }
  });
};
const handleArtist = (artists: any) => {
  const length = artists.length;
  let artist: string = "";
  const handle1 = () => {
    artists.forEach((item: any, index: any) => {
      if (index < length - 1) {
        artist += item.name + " / ";
      } else {
        artist += item.name;
      }
    });
    artistsName.data.push(artist);
  };
  const handle2 = () => artistsName.data.push(artists[0].name);
  length > 1 ? handle1() : handle2();
};
</script>

<style lang="less" scoped>
.newMusic {
  .linkText {
    font-size: 1.5rem;
    text-align: left;
    font-weight: bolder;
    margin: 15px 0;
  }
  .playListContainer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .playListCard {
    width: 33%;
    margin-bottom: 10px;
    .info {
      display: flex;
      align-items: center;
      .img {
        width: 22%;
        ::v-deep(.el-image__inner) {
          border-radius: 5px;
        }
      }
      .info-text {
        width: 70%;
        text-align: left;
        padding-left: 10px;
        .abstract {
          .textOverflow();
          font-size: 0.9rem;
        }
        .artist {
          .textOverflow();
          font-size: 0.8rem;
          color: #999;
        }
      }
    }
  }
}
</style>
