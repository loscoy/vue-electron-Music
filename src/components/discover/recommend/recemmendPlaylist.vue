<template>
  <div class="recPlaylist">
    <div class="linkText">
      <span>推荐歌单</span>
      <el-icon><ArrowRightBold /></el-icon>
    </div>
    <div class="playListContainer">
      <div class="playListCard">
        <div class="coverImg" v-show="show">
          <div class="hoverPlay">
            <el-image title="播放歌单内所有歌曲" class="icon" :src="hoverPlay" @click="playAll('dailyRec')" lazy></el-image>
          </div>
          <div class="bgImg">
            <img src="@/assets/daily_back.png" />
          </div>
          <span class="img_text">{{ day }}</span>
          <el-image class="img" :src="daily_rece" @load="load"> </el-image>
        </div>
        <div class="abstract1">每日歌曲推荐</div>
      </div>

      <div class="playListCard" v-for="item in recPlaylist.data" :key="item">
        <div class="coverImg" v-if="item.picUrl">
          <div class="hoverPlay">
            <el-image title="播放歌单内所有歌曲" class="icon" :src="hoverPlay" @click="playAll(item.id)" lazy></el-image>
          </div>
          <el-image class="else_img" :src="item.picUrl">
            <template #placeholder>
              <el-image :src="defaultImg"></el-image>
            </template>
          </el-image>
        </div>
        <div class="abstract">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { musicService } from "@/API/music";
import { onMounted, ref, reactive } from "vue";
import defaultImg from "../../../assets/default_album.jpg";
import daily_rece from "@/assets/daily_rece.png";
import hoverPlay from "@/assets/icon/hoverPlay.png";
import { isString } from "@vue/shared";
import { useMusicStore } from "@/store/modules/music";

const show = ref(false);
const musicStore = useMusicStore();
const day = new Date().toString().split(" ")[2];
let recPlaylist: any = reactive({
  data: [],
});

onMounted(() => {
  getRecPlaylist();
});

const getRecPlaylist = () => {
  musicService.getRecPlaylist().then((res) => {
    recPlaylist.data = res.data.recommend;
  });
};
const playAll = (temp: string | number) => {
  if (isString(temp)) {
    musicService.getDaliyRecommend().then((res) => {
      let dailyRecList = res.data.data.dailySongs;
      setStore(dailyRecList);
    });
  } else {
    musicService.getPlaylistSongs({ id: temp }).then((res) => {
      let songList = res.data.songs;
      setStore(songList);
    });
  }
};
const setStore = (songList: Array<any>) => {
  musicStore.changePlayStatus(false);
  musicStore.setCurrentIndex(0);
  musicStore.setMusicIdArr(musicIdArr(songList));
};
const musicIdArr = (list: Array<any>) => {
  return list.map((item: any) => {
    return item.id;
  });
};
const load = () => (show.value = true);
</script>

<style lang="less" scoped>
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
  width: 20%;
  margin-bottom: 10px;
}
.coverImg {
  width: 90%;
  position: relative;
}
.coverImg .bgImg {
  z-index: -1;
  /* opacity: 0; */
}
.coverImg .bgImg img {
  width: 99%;
  border-radius: 5px;
}
.coverImg .else_img {
  width: 100%;
}
.coverImg .img {
  width: 100%;
  border-radius: 5px;
  top: 0;
  left: 0;
  z-index: 1;
  position: absolute;
  /* opacity: 1; */
  /* background-image: linear-gradient(rgb(223, 139, 153), rgb(243, 60, 60), rgb(255, 166, 43), rgb(251, 251, 132)); */
  backdrop-filter: saturate(300%) blur(20px);
}
.coverImg .img_text {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  top: 5%;
  font-size: 2rem;
  width: 100%;
  height: 100%;
  color: rgb(120, 120, 120);
  font-weight: bolder;
}
::v-deep(.el-image__inner) {
  border-radius: 5px;
}
.abstract {
  width: 90%;
  font-size: 0.8rem;
}
.abstract1 {
  width: 90%;
  font-size: 0.8rem;
  margin-top: 6px;
}
.playListCard .hoverPlay {
  transition-duration: 500ms;
  opacity: 0;

  z-index: 3;
  position: absolute;
  width: 100%;
  height: 97%;
  border-radius: 5px;
  backdrop-filter: blur(5px);
  .icon {
    top: 70%;
    left: 30%;
    color: rgb(197, 125, 124);
  }
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
}
</style>
