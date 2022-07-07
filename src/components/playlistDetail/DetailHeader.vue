<template>
  <div class="DetailHeader">
    <div class="cover">
      <img :src="playListDetail.data.coverImgUrl" />
    </div>
    <div class="playlistInfo">
      <div class="title">{{ playListDetail.data.name }}</div>
      <div class="creator" v-if="playListDetail.data.creator">
        <img :src="playListDetail.data.creator.avatarUrl" alt="avatar" />
        <p class="name">{{ playListDetail.data.creator.nickname }}</p>
        <p class="time">{{ dateFormat(playListDetail.data.createTime).split(" ")[0] }}创建</p>
      </div>
      <div class="buttons">
        <el-button-group>
          <el-button round><img :src="play" alt="icon" />播放全部</el-button>
          <el-button round :icon="Plus" />
        </el-button-group>
        <el-button round :icon="FolderAdd">收藏</el-button>
        <el-button round :icon="Share">分享</el-button>
        <el-button round :icon="Download">下载全部</el-button>
      </div>
    </div>
    <div class="describe" v-if="playListDetail.data.playCount">
      <span v-if="playListDetail.data.tags">标签:{{ handleTags(playListDetail.data.tags) }}</span>
      <span>歌曲: {{ playListDetail.data.trackCount }}</span>
      <span>播放: {{ playListDetail.data.playCount }}</span>
      <br />
      <div class="icon">
        <span>简介: {{ handleDescribe(playListDetail.data.description) }}</span>
        <el-icon @click="show === true"><CaretBottom /></el-icon>
      </div>
    </div>
    <div class="navList">
      <div @click="change(0)">歌曲列表</div>
      <div @click="change(1)">评论({{ playListDetail.data.commentCount }})</div>
      <div @click="change(2)">收藏者</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { musicService } from "@/API/music";
import { onMounted, reactive, ref, watch } from "vue";
import { dateFormat } from "@/utils/timeUtil";
import { Plus } from "@element-plus/icons-vue";
import play from "@/assets/icon/play.png";
import { FolderAdd } from "@element-plus/icons-vue";
import { Share } from "@element-plus/icons-vue";
import { Download } from "@element-plus/icons-vue";

const emit = defineEmits(["change"]);
const sCount = ref(10);
const show = ref(false);
onMounted(() => {
  getDetail();
  active(0);
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

const playListDetail: any = reactive({ data: {} });
const getDetail = () => {
  musicService.getPlaylistDetail({ id: props.playlistId }).then((res) => {
    playListDetail.data = res.data.playlist;
  });
};
const handleTags = (tags: Array<string>) => {
  if (tags.length === 0) {
    return "添加标签";
  } else {
    return tags.length === 1 ? tags[0] : tags.join("/");
  }
};
const handleDescribe = (str: string) => {
  return str === null ? "添加简介" : str;
};
const active = (index: number) => {
  const dom = document.getElementsByClassName("navList");
  const divList = dom[0].getElementsByTagName("div");
  divList[index].classList.add("active");
};
const removeActive = () => {
  const dom = document.getElementsByClassName("navList");
  const divList = dom[0].getElementsByTagName("div");
  Array.from(divList).forEach((element: any) => {
    element.classList.remove("active");
  });
};
const change = (index: number) => {
  emit("change", index);
  removeActive();
  active(index);
};
</script>
<style lang="less" scoped>
.DetailHeader {
  margin-bottom: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  overflow: hidden;
  .cover {
    position: relative;
    flex: 1;
    margin-bottom: 12px;
    text-align: left;
    img {
      height: 100px;
      border-radius: 5px;
    }
  }
  .playlistInfo {
    flex: 4;
    text-align: left;
    overflow: hidden;
    .title {
      font-weight: bold;
      font-size: 1.5rem;
    }
    .creator {
      & > * {
        margin-right: 10px;
      }
      display: flex;
      img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
      }
    }
    .buttons {
      img {
        margin-right: 5px;
      }
    }
  }
  .describe {
    flex: 1 100%;
    text-align: left;
    width: 100%;
    span {
      margin-right: 20px;
    }
    .icon {
      position: relative;
      width: 100%;
      span {
        display: inline-block;
        width: 90%;
        .textOverflow();
      }
      .el-icon {
        font-size: 20px;
        position: absolute;
        top: 0;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .navList {
    flex: 1;
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
      &:hover {
        cursor: pointer;
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
  }
}
</style>
