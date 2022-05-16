<template>
  <div class="discoveNav">
    <el-affix :offset="80">
      <div class="navList">
        <router-link to="discrecommend" exact>
          <div>个性推荐</div>
        </router-link>
        <router-link to="renklist" exact>
          <div>排行榜</div>
        </router-link>
        <router-link to="singers" exact>
          <div>歌手</div>
        </router-link>
      </div>
    </el-affix>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.discoveNav {
  background-color: white;
}
.navList {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  background-color: white;
}
.navList div {
  text-align: left;
  margin-right: 2rem;
  margin-bottom: 0.3rem;
  font-size: 1rem;
}
.navList .router-link-active div {
  position: relative;
  font-size: 1.5rem;
  font-weight: bolder;
  text-align: center;
}
.navList .router-link-active div::after {
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
</style>
