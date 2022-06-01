<script setup lang="ts">
import index from "./views/index.vue";
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark({
  selector: "body",
  attribute: "color-scheme",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);
</script>

<template>
  <div class="app">
    <index></index>
  </div>
</template>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  cursor: default;
  /* overflow: hidden; */
}
#app a {
  color: #2c3e50;
}

@media screen and (max-width: 1000px) {
  html {
    font-size: 14px;
  }
}
@media screen and (min-width: 1001px) {
  html {
    font-size: 16px;
  }
}
</style>
