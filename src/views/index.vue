<script setup lang="ts"></script>
<template>
  <div class="index">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>

      <el-container>
        <el-aside>
          <Aside></Aside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>
<style scoped>
.el-container {
  min-height: 80vh;
}
.el-header {
  padding: 0;
}
.el-footer {
  bottom: 0;
  left: 0;
  border-top: 1px solid #ccc;
}
.el-aside {
  border-right: 1px solid #ccc;
  min-width: 15vw;
  width: 15vw;
}
</style>
