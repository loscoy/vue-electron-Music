import { List } from "@element-plus/icons-vue/dist/types";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/discover",
    component: () => import("@/views/mianPage.vue"),
    children: [
      {
        path: "discover",
        redirect: "/discover/discrecommend",
        component: () => import("@/views/defaultItem/discoverMusic.vue"),
        children: [
          {
            path: "discRecommend",
            component: () => import("@/views/defaultItem/discoverMusic/discRecommend.vue"),
          },
          {
            path: "renklist",
            component: () => import("@/views/defaultItem/discoverMusic/rankList.vue"),
          },
          {
            path: "singers",
            component: () => import("@/views/defaultItem/discoverMusic/singers.vue"),
          },
        ],
      },
      {
        path: "new",
        component: () => import("@/views/defaultItem/newMusic.vue"),
      },
      {
        path: "recommend",
        component: () => import("@/views/defaultItem/recommendPlaylist.vue"),
      },
      {
        path: "fm",
        component: () => import("@/views/defaultItem/personalFM.vue"),
      },
      {
        path: "/playlistdetail/:id?",
        component: () => import("@/views/playlistDetail.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
router.beforeEach((to, from, next) => {
  next();
});

export default router;
