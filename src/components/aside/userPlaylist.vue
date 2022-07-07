<template>
  <div class="userPlaylist">
    <el-collapse class="collapse" v-model="activeNames">
      <el-collapse-item class="collapse_item" title="创建的歌单" name="1">
        <router-link
          :to="'/playlistdetail/' + item.id"
          exact
          v-for="item in createdPlaylist.data"
          :key="item"
        >
          <div class="playlistName" @click="setPlaylistId(item.id)">{{ item.name }}</div>
        </router-link>
      </el-collapse-item>
      <el-collapse-item class="collapse_item" title="收藏的歌单" name="2">
        <router-link
          :to="'/playlistdetail/' + item.id"
          exact
          v-for="item in collectPlaylist.data"
          :key="item"
        >
          <div class="playlistName" @click="setPlaylistId(item.id)">{{ item.name }}</div>
        </router-link>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { useMusicStore } from "@/store/modules/music";
import { onMounted, reactive, ref } from "vue";
import { computed } from "vue-demi";
import { useRouter } from "vue-router";
import { musicService } from "../../API/music";

const user = useUserStore();
const musicStore = useMusicStore();
const uid = computed(() => user.uid);
const activeNames = ref("1");
const params: any = reactive({ data: { uid } });
const allPlaylist: any = reactive({ data: [] });
const createdPlaylist: any = reactive({ data: [] });
const collectPlaylist: any = reactive({ data: [] });

onMounted(() => {
  getUserPlayist();
});
const getUserPlayist = () => {
  musicService.getUserPlaylist(params.data).then((res) => {
    allPlaylist.data = res.data.playlist;
    handlePlaylist();
  });
};
const handlePlaylist = () => {
  createdPlaylist.data = allPlaylist.data.filter((item: any) => item.userId === uid.value);
  collectPlaylist.data = allPlaylist.data.filter((item: any) => item.userId !== uid.value);
};
const setPlaylistId = (id: number) => {
  musicStore.setPlaylistId(id);
};
</script>

<style lang="less" scoped>
.userPlaylist {
  padding-left: 10px;
  text-align: left;
  padding-left: 20px;
  .collapse {
    text-align: left;
    border: none;
    .collapse_item {
      ::v-deep(.el-collapse-item__header) {
        display: block;
        border: none;
        color: #999;
      }
      .playlistName {
        .textOverflow();
        font-size: 1rem;
        padding: 10px 0;
        &:hover {
          width: 90%;
          .a_hover();
        }
      }
    }
    .router-link-active .playlistName {
      padding-right: 10px;
      .a_active();
      &:hover {
        .a_hover();
      }
      &::after {
        .a_active_after();
      }
    }
  }
}
</style>
