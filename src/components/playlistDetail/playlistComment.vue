<template>
  <div class="">{{ msg }}</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const msg = ref("");
setTimeout(() => {
  msg.value = "hello,comment";
}, 1000);
</script>
<style lang="less" scoped></style>
