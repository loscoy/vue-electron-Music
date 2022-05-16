<script setup lang="ts"></script>
<template>
  <div class="index">
    <el-container class="index-container">
      <el-header class="index-header">
        <Header></Header>
      </el-header>

      <el-container class="inner-container">
        <el-aside class="index-aside">
          <el-scrollbar>
            <Aside></Aside>
          </el-scrollbar>
        </el-aside>

        <el-main class="index-main">
          <el-scrollbar>
            <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>

      <el-footer class="index-footer">
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>
<style scoped>
.index {
  height: 100vh;
}
.index-container {
  height: 100%;
}
.index-header {
  padding: 0;
}
.index-footer {
  border-top: 1px solid #ccc;
  height: 70px;
}
.index-aside {
  border-right: 1px solid #ccc;
  min-width: 200px;
  width: 200px;
  height: 100%;
  overflow: hidden;
}
.index-main {
  padding-bottom: 0;
}
.inner-container {
  overflow: hidden;
  height: 81vh;
}
</style>
