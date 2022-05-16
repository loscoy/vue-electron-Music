<template>
  <div class="aDefault">
    <router-link to="/discover" exact>
      <div>发现音乐</div>
    </router-link>
    <router-link to="/recommend" exact>
      <div>推荐歌单</div>
    </router-link>
    <router-link to="/new" exact>
      <div>最新音乐</div>
    </router-link>
    <router-link to="/fm" exact>
      <div>私人FM</div>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.aDefault {
  padding-left: 10px;
}
.aDefault div {
  padding: 10px 10px;
  margin: 3px;
  font-size: 1rem;
  text-align: left;
  width: 90%;
  display: flex;
  align-items: center;
}
.aDefault .router-link-active div,
.aDefault .router-link-active div:hover {
  position: relative;
  font-weight: bolder;
  font-size: 1.1rem;
  color: black !important;
  width: 90%;
  border-radius: 5px;
  background-color: rgba(153, 153, 153, 0.1);
}
.aDefault .router-link-active div::after {
  position: absolute;
  content: "";
  top: 0;
  right: 10px;
  width: 3px;
  height: 50%;
  border-radius: 3px;
  margin-top: 7%;
  background-color: red;
}
.aDefault div:hover {
  border-radius: 5px;
  background-color: rgba(153, 153, 153, 0.1);
}
</style>
