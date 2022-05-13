<script setup lang="ts">
import { onMounted } from "@vue/runtime-core";
import { musicService } from "../../API/music";

onMounted(() => {
  // getDayilymusic();
});
const getDayilymusic = () => {
  const params = {};
  musicService.getDaliyRecommend(params).then((res) => {
    console.log("res", res);
  });
};
</script>

<template>
  <div class="footer">
    <div class="musicController">footer</div>
  </div>
</template>
<style scoped>
.musicController {
}
</style>
