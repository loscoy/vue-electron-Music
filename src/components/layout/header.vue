<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

const queryStr = ref("");
const router = useRouter();
const goBack = () => router.back();
const goForward = () => router.go(1);

const navBar = (val: string) => {
  window.ipc.send("navBar", val);
};
</script>

<template>
  <div class="header">
    <div class="icon">
      <content-menu>
        <el-icon> <expand></expand> </el-icon
      ></content-menu>
    </div>
    <div class="drag">
      <div class="drag-left">
        <div class="route">
          <div>
            <el-icon :size="16" color="white" @click="goBack"><arrow-left /></el-icon>
          </div>
          <div>
            <el-icon :size="16" color="white" @click="goForward"><arrow-right /></el-icon>
          </div>
        </div>
        <div class="search">
          <el-autocomplete v-model="queryStr" placeholder="搜索">
            <template #prefix>
              <el-icon :size="16" class="el-input__icon"><search /></el-icon>
            </template>
          </el-autocomplete>
        </div>
      </div>
      <div class="drag-right">
        <div class="avatar">
          <el-avatar :size="30">
            <template #icon>
              <el-icon><avatar /></el-icon>
            </template>
          </el-avatar>
          <span>losocy</span>
        </div>
        <div class="setting">
          <el-icon><tools /></el-icon>
        </div>
      </div>
    </div>
    <el-divider direction="vertical" />
    <div class="buttons">
      <el-button plain @click="navBar('mini')"
        ><el-icon><minus /></el-icon
      ></el-button>
      <el-button plain @click="navBar('big')"
        ><el-icon><full-screen /></el-icon
      ></el-button>
      <el-button plain @click="navBar('close')"
        ><el-icon><close /></el-icon
      ></el-button>
    </div>
  </div>
</template>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
}
.icon {
  padding-left: 10px;
  text-align: left;
  min-width: 15vw;
  width: 15vw;
}
.drag div {
  display: flex;
  align-items: center;
}
.drag-right div {
  margin-left: 10px;
  margin-right: 10px;
}
.drag {
  padding-left: 20px;
  width: 100%;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.avatar span {
  margin-left: 5px;
}
.buttons {
  margin-right: 10px;
  -webkit-app-region: no-drag;
  width: 90px;
  display: flex;
}
.route {
  width: 60px;
  display: flex;
  justify-content: space-between;
}
.route div {
  background-color: rgba(158, 158, 158, 0.3);
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: table;
}
.route div .el-icon {
  display: table-cell;
  vertical-align: middle;
}
.search {
  margin-left: 20px;
  width: 20vw;
}
::v-deep .el-input__inner {
  height: 30px;
  border-radius: 20px;
}
::v-deep .el-input__prefix {
  display: flex;
  align-items: center;
}
.el-button {
  width: 50px;
  border: none;
  padding: 0;
  margin: 0;
}
.el-divider {
  height: 16px;
}
</style>
