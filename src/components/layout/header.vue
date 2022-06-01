<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { userService } from "@/API/user";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";
import "element-plus/dist/index.css";
import { useMusicStore } from "@/store/modules/music";

interface infoObject {
  [key: string]: any;
}

const musicStore = useMusicStore();
const userStore = useUserStore();
const { status } = storeToRefs(userStore);
let dialogShow = ref(false);
let queryStr = ref<string | number>("");
const router = useRouter();
const userInfo: infoObject = reactive({ data: {} });

onMounted(() => {
  getLoginStatus();
});

const goBack = () => router.back();
const goForward = () => router.go(1);
const navBar = (val: string) => window.ipc.send("navBar", val);

const getInfo = () => {
  userService.getCurrentUserInfo().then((res) => {
    userInfo.data = res.data.profile;
  });
};
const getLoginStatus = () => {
  userService.loginStatus().then((res) => {
    const temp = res.data.data.account;
    if (temp !== null) {
      status.value = true;
      getInfo();
    } else {
      dialogShow.value = true;
    }
  });
};
const handleLogout = () => {
  userService.logOut().then((res) => {
    status.value = false;
    ElMessage.success("退出登录成功");
    window.location.reload();
  });
};
const handleCommand = (command: string) => {
  if (command === "logout") handleLogout();
};
const errorHandler = () => true;
const hidePlayer = () => {
  musicStore.$patch((state) => {
    state.musicPlayShow = false;
  });
};
</script>

<template>
  <div class="header">
    <div class="icon">
      <content-menu class="menu" v-if="!musicStore.musicPlayShow">
        <img src="@/assets/music_logo.png" />
      </content-menu>
      <div class="down" @click="hidePlayer" v-else>
        <el-icon><ArrowDown /></el-icon>
      </div>
    </div>
    <div class="drag">
      <div class="drag-left">
        <div class="route">
          <div>
            <el-icon class="left-icon" :size="16" color="white" @click="goBack"><arrow-left /></el-icon>
          </div>
          <div>
            <el-icon class="right-icon" :size="16" color="white" @click="goForward"><arrow-right /></el-icon>
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
          <el-avatar>
            <template #default>
              <el-icon v-if="!status"><User /></el-icon>
              <el-image v-else :src="userInfo.data.avatarUrl"></el-image>
            </template>
          </el-avatar>

          <el-dropdown trigger="click" style="margin-right: 30px" v-if="userInfo.data.nickname" @command="handleCommand">
            <span @click="getInfo">
              {{ userInfo.data.nickname }}
              <el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>等级</el-dropdown-item>
                <el-dropdown-item>个人信息设置</el-dropdown-item>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <span v-else @click="getLoginStatus">未登录</span>
          <el-dialog v-model="dialogShow">
            <login-page></login-page>
          </el-dialog>
        </div>

        <div class="setting">
          <el-icon><tools /></el-icon>
        </div>
      </div>
    </div>
    <el-divider direction="vertical" />
    <div class="buttons">
      <el-button plain @click="navBar('mini')"
        ><el-icon :size="30"><minus /></el-icon
      ></el-button>
      <el-button plain @click="navBar('big')"
        ><el-icon :size="30"><full-screen /></el-icon
      ></el-button>
      <el-button plain @click="navBar('close')"
        ><el-icon :size="30"><close /></el-icon
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
}
.icon {
  padding: 15px 40px;
  height: 60px;
  display: flex;
  align-items: center;
  text-align: left;
  min-width: 210px;
  max-width: 15vw;
  /* -webkit-app-region: drag; */
}
.down {
  width: 20%;
  display: flex;
  align-items: center;
}
.drag div {
  display: flex;
  align-items: center;
}
.drag-right {
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
  font-size: 1rem;
}
.avatar span:hover {
  color: rgb(194, 194, 194);
  cursor: pointer;
}
.avatar .el-avatar {
  height: 2rem;
  width: 2rem;
  line-height: 2rem;
}

.buttons .el-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.buttons {
  margin-right: 10px;
  -webkit-app-region: no-drag;
  width: 100px;
  display: flex;
}
.buttons .el-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttons .el-button .el-icon svg {
  height: 1rem;
  width: 1rem;
  line-height: 1rem;
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
.search::v-deep(.el-input__wrapper) {
  height: 30px;
  border-radius: 20px;
}
/* .search::v-deep(.el-input__prefix) {
  display: flex;
  align-items: center;
} */
.el-button {
  width: 50px;
  border: none;
  padding: 0;
  margin: 0;
}
.el-divider {
  height: 16px;
}
.setting i {
  font-size: 1rem;
}
.left-icon,
.search,
.drag-right,
.right-icon,
.menu {
  -webkit-app-region: no-drag;
}
</style>
