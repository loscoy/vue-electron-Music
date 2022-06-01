<script setup lang="ts">
import { useMusicStore } from "@/store/modules/music";
const musicStore = useMusicStore();
</script>
<template>
  <div class="index">
    <!-- <el-container class="index-container" v-show="musicStore.musicPlayShow">
      <el-header class="index-header">
        <Header></Header>
      </el-header>
      <el-main class="player-main">
        <player></player>
      </el-main>
      <el-footer class="player-footer">
        <Footer></Footer>
      </el-footer>
    </el-container> -->

    <el-container class="index-container">
      <el-header class="index-header">
        <Header></Header>
      </el-header>
      <transition name="el-zoom-in-bottom">
        <el-main class="player-main" v-show="musicStore.musicPlayShow">
          <el-scrollbar>
            <player></player>
          </el-scrollbar>
        </el-main>
      </transition>

      <el-container class="inner-container">
        <el-aside class="index-aside">
          <el-scrollbar>
            <Aside></Aside>
          </el-scrollbar>
        </el-aside>
        <el-main class="index-main">
          <el-scrollbar>
            <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>

      <el-footer class="index-footer">
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>
<style scoped>
.index {
  height: 100vh;
  position: relative;
}
.index-container {
  height: 100%;
}
.index-header {
  padding: 0;
  overflow: hidden;
}
.index-footer {
  border-top: 1px solid #ccc;
  height: 70px;
  padding: 0 10px;
  z-index: 13;
  background-color: white;
}
.index-aside {
  border-right: 1px solid #ccc;
  min-width: 200px;
  width: 200px;
  height: 100%;
  overflow: hidden;
}
.index-main {
  padding-bottom: 0;
}
.inner-container {
  overflow: hidden;
  height: 81vh;
}
.player-main {
  top: 60px;
  bottom: 70px;
  padding: 0;
  position: absolute;
  background-color: white;
  height: 85vh;
  width: 100%;
  z-index: 12;
}
.player-footer {
  border-top: 1px solid #ccc;
  height: 70px;
  padding: 0 10px;
  width: 100%;
  /* background-color: white; */
  position: fixed;
  bottom: 0;
}
</style>
