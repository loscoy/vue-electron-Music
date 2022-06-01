import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state() {
    return {
      uid: localStorage.getItem("uid") || "",
      status: Boolean(localStorage.getItem("status")) || false,
    };
  },
  actions: {
    switchStatus(status: boolean) {
      this.status = status;
    },
  },
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
