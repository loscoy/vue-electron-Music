<script setup lang="ts"></script>
<template>
  <div class="mainPage">
    <router-view></router-view>
  </div>
</template>
<style scoped>
@media screen and (max-width: 1000px) {
  .mainPage {
    margin-left: 2vw;
    margin-right: 2vw;
  }
}
@media screen and (min-width: 1001px) {
  .mainPage {
    margin-left: 5vw;
    margin-right: 5vw;
  }
}
</style>
