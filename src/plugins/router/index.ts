import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/discover",
    component: () => import("@/views/mianPage.vue"),
    children: [
      {
        path: "discover",
        component: () => import("@/views/defaultItem/discoverMusic.vue"),
      },
      {
        path: "new",
        component: () => import("@/views/defaultItem/newMusic.vue"),
      },
      {
        path: "recommend",
        component: () => import("@/views/defaultItem/recommendPlaylist.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
