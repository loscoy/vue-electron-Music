<template>
  <div class="DetailHeader">
    <div class="cover">
      <img :src="playListDetail.data.coverImgUrl" />
    </div>
    <div class="navList">
      <router-link :to="'/playlistdetail/' + playlistId + '/musicList'" exact>
        <div>歌曲列表</div>
      </router-link>
      <router-link :to="'/playlistdetail/' + playlistId + '/playlistComment'" exact>
        <div>评论()</div>
      </router-link>
      <router-link :to="'/playlistdetail/' + playlistId + '/collector'" exact>
        <div>收藏者</div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { musicService } from "@/API/music";
import { onMounted, reactive, ref, watch } from "vue";

onMounted(() => {
  getDetail();
  active();
});
const props = defineProps({
  playlistId: {
    type: String,
    default: "",
  },
});
watch(props, (val) => {
  getDetail();
});
const sCount = ref(10);
const playListDetail: any = reactive({ data: {} });
const getDetail = () => {
  musicService.getPlaylistDetail({ id: props.playlistId }).then((res) => {
    playListDetail.data = res.data.playlist;
  });
};
const active = () => {
  const dom = document.getElementsByClassName("navList");
  const divList = dom[0].getElementsByTagName("div");
  divList[0].classList.add("active");
};
const removeActive = () => {
  const dom = document.getElementsByClassName("navList");
  const divList = dom[0].getElementsByTagName("div");
  divList[0].classList.remove("active");
};
</script>
<style lang="less" scoped>
.DetailHeader {
  height: 24vh;
  margin-bottom: 12px;
  .cover {
    width: 8rem;
    height: 8rem;
    margin-bottom: 12px;
    img {
      width: 100%;
      border-radius: 5px;
    }
  }
  .navList {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    background-color: white;
    div {
      text-align: left;
      margin-right: 2rem;
      margin-bottom: 0.3rem;
      font-size: 1rem;
    }
    .router-link-active div {
      position: relative;
      font-size: 1.3rem;
      font-weight: bolder;
      text-align: center;
      &::after {
        position: absolute;
        content: "";
        bottom: 0;
        left: 0;
        margin-left: 10%;
        width: 80%;
        height: 3px;
        border-radius: 5px;
        background-color: red;
      }
    }
  }
}
.active {
  position: relative;
  font-size: 1.3rem;
  font-weight: bolder;
  text-align: center;
  &::after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    margin-left: 10%;
    width: 80%;
    height: 3px;
    border-radius: 5px;
    background-color: red;
  }
}
</style>
