<template>
  <div class="loginpage">
    <el-main>
      <el-radio-group v-model="labelPosition">
        <el-radio-button label="login">登录</el-radio-button>
        <el-radio-button label="register">注册</el-radio-button>
      </el-radio-group>
      <div class="content">
        <login v-if="labelPosition === 'login'"></login>
        <register v-else></register>
      </div>
    </el-main>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
let labelPosition = ref<string>("login");
</script>

<style lang="less" scoped>
.loginpage {
  .content {
    margin-top: 30px;
  }
}
</style>
