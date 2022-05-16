<template>
  <div class="recPlaylist">
    <div class="linkText">
      <span>推荐歌单</span>
      <el-icon><ArrowRightBold /></el-icon>
    </div>
    <div class="playListContainer">
      <div class="playListCard">
        <div class="coverImg" v-show="show">
          <div class="bgImg">
            <img src="@/assets/daily_back.png" />
          </div>
          <span class="img_text">{{ day }}</span>
          <el-image class="img" :src="img" @load="load"> </el-image>
        </div>
        <div class="abstract1">每日歌曲推荐</div>
      </div>

      <div class="playListCard" v-for="item in recPlaylist.data.slice(0, 9)" :key="item">
        <div class="coverImg" v-if="item.picUrl">
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
import img from "@/assets/daily_rece.png";

const show = ref(false);
const nowDate = new Date();
const day = nowDate.toString().split(" ")[2];
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
const load = () => (show.value = true);
</script>

<style scoped>
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
  width: 100%;
  border-radius: 5px;
}
.coverImg .else_img {
  width: 100%;
}
.coverImg .img {
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
</style>
