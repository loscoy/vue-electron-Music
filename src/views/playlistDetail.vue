<template>
  <div class="userPlayList">
    <header class="header">
      <detail-header
        :playlistId="musicStore.playlistId.toString()"
        @change="change"
      ></detail-header>
    </header>
    <main class="main">
      <Suspense>
        <template #default>
          <component
            :is="comName[comIndex].name"
            :playlistId="musicStore.playlistId.toString()"
          ></component>
        </template>
        <template #fallback> loading... </template>
      </Suspense>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useMusicStore } from "@/store/modules/music";
import { musicService } from "@/API/music";
import { defineAsyncComponent, markRaw, onMounted, reactive, ref } from "vue";
const musicListCompVue = defineAsyncComponent(
  () => import("@/components/playlistDetail/musicListComp.vue")
);
const collectorVue = defineAsyncComponent(
  () => import("@/components/playlistDetail/collector.vue")
);
const playlistCommentVue = defineAsyncComponent(
  () => import("@/components/playlistDetail/playlistComment.vue")
);

const musicStore = useMusicStore();
const comIndex = ref(0);
let comName = reactive([
  {
    name: markRaw(musicListCompVue),
  },
  {
    name: markRaw(playlistCommentVue),
  },
  {
    name: markRaw(collectorVue),
  },
]);
const change = (index: number): void => {
  comIndex.value = index;
};
</script>

<style lang="less" scoped>
.userPlayList {
  height: 77vh;
  .header {
    // height: 24vh;
    background-color: white;
    z-index: 2;
  }
  .main {
  }
}
</style>
