<script setup lang="ts">
import { onMounted } from "vue";
import { musicService } from "../../API/music";

onMounted(() => {});

const getDayilymusic = () => {
  const params = {};
  musicService.getDaliyRecommend(params).then((res: any) => {
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
