<template>
  <div class="banner">
    <el-carousel class="banner-carousel" :interval="4000" trigger="click" type="card" height="27vh" v-if="banner.data[0]">
      <el-carousel-item v-for="item in banner.data" :key="item">
        <img :src="item.imageUrl" class="banner-img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { musicService } from "@/API/music";
import { onMounted, reactive, ref } from "vue";
onMounted(() => {
  getBanner();
});

const banner = reactive({
  data: [],
});

const getBanner = () => {
  musicService.getBanner().then((res) => {
    banner.data = res.data.banners;
  });
};
</script>

<style scoped>
.banner-img {
  border-radius: 10px;
  width: 100%;
  height: 25vh;
}
</style>
