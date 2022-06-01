<template>
  <div class="newMusic">
    <div class="linkText">
      <span>最新音乐</span>
      <el-icon><ArrowRightBold /></el-icon>
    </div>
    <div class="playListContainer">
      <div class="playListCard" v-for="(item, index) in newSongList.data" :key="item" @click="play(index)">
        <div class="info" v-if="item.picUrl">
          <div class="img">
            <div class="hoverPlay">
              <el-image title="播放歌曲" class="icon" :src="hoverPlay" lazy></el-image>
            </div>
            <el-image :src="item.picUrl" lazy>
              <template #placeholder>
                <el-image src="../../src/assets/default_album.jpg"></el-image>
              </template>
            </el-image>
          </div>
          <div class="info-text">
            <div class="abstract">{{ item.name }}</div>
            <div class="artist">{{ artistsArr.data[index] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { musicService } from "@/API/music";
import { onMounted, ref, reactive } from "vue";
import { useMusicStore } from "@/store/modules/music";
import { storeToRefs } from "pinia";
import { handleArtist } from "@/utils/artistUtils";
import hoverPlay from "@/assets/icon/hoverPlay.png";

const musicStore = useMusicStore();
let newSongList: any = reactive({ data: [] });
let artistsArr: any = reactive({ data: [] });

onMounted(() => {
  getNewPlaylist();
});

const getNewPlaylist = () => {
  const params = { limit: 12 };
  musicService.getNewSongs(params).then((res) => {
    newSongList.data = res.data.result;
    if (newSongList.data.length !== 0) {
      newSongList.data.forEach((item: any) => {
        artistsArr.data.push(handleArtist(item.song.artists));
      });
    }
  });
};
const musicIdArr = () => {
  return newSongList.data.map((item: any) => {
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
    .playListCard {
      width: 33%;
      margin-bottom: 10px;
      .info {
        .img {
          display: inline-block;
          position: relative;
          width: 22%;
          .hoverPlay {
            transition-duration: 1000ms;
            opacity: 0;
            color: white;
            z-index: 1;
            position: absolute;
            width: 100%;
            height: 91%;
            border-radius: 5px;
            backdrop-filter: blur(3px) saturate(200%);
            .icon {
              top: 50%;
              transform: translateY(-50%);
            }
            &:hover {
              opacity: 1;
              cursor: pointer;
            }
          }
          ::v-deep(.el-image__inner) {
            border-radius: 5px;
          }
        }
        .info-text {
          display: inline-block;
          width: 70%;
          top: 50%;
          transform: translateY(-25%);
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
}
</style>
