import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state() {
    return {
      uid: localStorage.getItem("uid") || "",
    };
  },
  actions: {},
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
