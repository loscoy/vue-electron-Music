<template>
  <div class="lyric">
    <ul ref="lrcUl" id="lrcUl" class="content" v-if="lrcObj.data.lines">
      <li :id="index" class="txt" v-for="(item, index) in lrcObj.data.lines" @click="playThis(index)" :key="index">
        <div>{{ item.txt }}</div>
        <!-- <div v-if="tlrcObj.data">{{ tlrcObj.data }}</div> -->
      </li>
    </ul>
    <div class="no-lyric" v-else>暂无歌词,请搜索重试</div>
  </div>
</template>

<script lang="ts" setup>
import { musicService } from "@/API/music";
import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useMusicStore } from "@/store/modules/music";
import Lyric from "lyric-parser";
import { storeToRefs } from "pinia";

const musicStore = useMusicStore();
const { currentMusicId, currentTime, musicPlayShow } = storeToRefs(musicStore);
const params = reactive({ id: currentMusicId });
const lrcUl = ref();
const lrcObj: any = reactive({ data: {} });
const tlrcObj: any = reactive({ data: {} });
const player: any = reactive({ data: {} });

onMounted(() => {
  player.data = document.getElementById("player");
  if (currentMusicId.value) {
    getLyric();
  }
  if (player.data) {
    listenPlayer();
  }
});
watch([currentMusicId, currentTime, musicPlayShow], (nval, oval) => {
  if (nval[0] !== oval[0]) {
    getLyric();
  }
  if (nval[1]) {
    currentNo(nval[1]);
  }
});
onBeforeUnmount(() => {
  removeListen();
});

const getLyric = () => {
  if (lrcUl.value) {
    goback();
  }
  musicService.getLyric(params).then((res) => {
    let lrcAll = res.data;
    tlrcObj.data = {};
    lrcObj.data = new Lyric(lrcAll.lrc.lyric);
    if (lrcAll.tlyric.lyric.length !== 0) {
      tlrcObj.data = new Lyric(lrcAll.tlyric.lyric);
    }
  });
};
const listenPlayer = () => {
  console.log("startListen...");
  player.data.addEventListener("timeupdate", _timeUpdate);
  player.data.addEventListener("ended", _ended);
};
const removeListen = () => {
  console.log("listenEnded...");
  player.data.removeEventListener("timeupdate", _timeUpdate);
  player.data.removeEventListener("ended", _ended);
};
const _timeUpdate = () => {
  if (musicStore.lineNo === lrcObj.data.lines.length) return; //当前行数与歌词数组长度相同时结束
  if (musicStore.currentTime !== 0) {
    if (lrcObj.data.lines[musicStore.lineNo].time < musicStore.currentTime * 1000) {
      lineHigh(musicStore.lineNo); //歌词中的时间小于当前播放时间，高亮当前行
      musicStore.$patch((state) => {
        state.lineNo += 1;
      });
    }
  }
};
const _ended = () => {
  musicStore.changePlayStatus(false);
  musicStore.addIndex(); //下一曲
  setTimeout(() => {
    goback(); //回滚歌词
  }, 1000);
};
const lineHigh = (lineNo: number) => {
  const list: any = document.getElementById("lrcUl")?.getElementsByTagName("li");
  if (lineNo > 0) {
    list[lineNo - 1].classList.remove("lineHigh"); //去掉上一行的高亮样式
  }
  list[lineNo].classList.add("lineHigh"); //高亮显示当前行
  //滚动至指定元素
  const element = document.getElementById(lineNo.toString());
  element?.scrollIntoView({ behavior: "smooth", block: "center" }); // 当前播放的歌词滚动至中间
};
const goback = () => {
  const items = lrcUl.value.querySelectorAll(".lineHigh");
  items.forEach((element: any) => {
    element.classList.remove("lineHigh");
  });
};
//行数处理
const currentNo = (time: number) => {
  let length = 0;
  musicStore.changeLineNo(0);
  length = lrcObj.data.lines.length;
  for (let i = 0; i < length; i++) {
    if (lrcObj.data.lines[i].time / 1000 >= time) {
      musicStore.lineNo = i - 1;
      break;
    } else if (i === length - 1) {
      musicStore.lineNo = length - 1;
      break;
    }
  }
};
const playThis = (index: number) => {
  const list: any = document.getElementById("lrcUl")?.getElementsByTagName("li");
  // 删除之前的高亮样式并设置当前点击部分高亮样式
  list[musicStore.lineNo - 1].classList.remove("lineHigh");
  musicStore.changeLineNo(index); //当前歌词行数为所点歌词行数
  list[musicStore.lineNo].classList.add("lineHigh"); //高亮显示当前行
  // 将所点歌词时间赋给播放时间
  player.data.currentTime = lrcObj.data.lines[musicStore.lineNo].time / 1000;
};
</script>
<style lang="less" scoped>
.lyric {
  .content {
    list-style: none;
    padding-left: 0;
    padding-bottom: 120px;
    .txt {
      font-size: 1.2rem;
      transition: color 300ms;
    }
    .lineHigh {
      color: #ff0000;
      font-size: 1.5rem;
    }
  }
}
</style>
