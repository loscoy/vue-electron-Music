import { defineStore } from "pinia";

interface stateF {
  musicIdArr: any;
  currentIndex: number;
  playModel: number;
  musicPlayShow: boolean;
  playStatus: boolean;
  currentTime: number;
  duringTime: number;
  lineNo: number;
  musicDetails: Array<any>;
  playlistId: number;
  ArtistArr: Array<any>;
  canPlay: boolean;
}

const state: stateF = {
  musicIdArr: [],
  currentIndex: 0,
  playModel: 0,
  musicPlayShow: false,
  playStatus: false,
  currentTime: 0,
  duringTime: 0,
  lineNo: 0,
  musicDetails: [],
  playlistId: 0,
  ArtistArr: [],
  canPlay: false,
};

export const useMusicStore = defineStore("music", {
  state: () => {
    return state;
  },
  getters: {
    currentMusicId(): any {
      return this.musicIdArr[this.currentIndex];
    },
    currentMusicDetail(): any {
      return this.musicDetails[this.currentIndex];
    },
  },
  actions: {
    setMusicIdArr(arr: Array<any>) {
      this.musicIdArr = arr;
    },
    setPlaylistId(id: number) {
      this.playlistId = id;
    },
    setMusicDetails(arr: Array<any>) {
      this.musicDetails = arr;
    },
    setCurrentIndex(index: number) {
      this.currentIndex = index;
    },
    setArtistArr(arr: Array<any>) {
      this.ArtistArr = arr;
    },
    changePlayStatus(status: boolean) {
      this.playStatus = status;
    },
    addIndex() {
      this.lineNo = 0;
      if (this.currentIndex < this.musicIdArr.length - 1) {
        if (state.playModel === 0) {
          this.currentIndex += 1;
        } else {
          let length = this.musicIdArr.length;
          let random = Number(Math.random() * length);
          this.currentIndex = random;
        }
      } else {
        this.currentIndex = 0;
      }
    },
    subIndex() {
      this.lineNo = 0;
      if (this.currentIndex === 0) {
        this.currentIndex = this.musicIdArr.length - 1;
      } else {
        if (this.playModel === 0) {
          this.currentIndex -= 1;
        } else {
          let length = this.musicIdArr.length;
          let random = Number(Math.random() * length);
          this.currentIndex = random;
        }
      }
    },
    changeLineNo(val: number) {
      this.lineNo = val;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "music",
        storage: localStorage,
      },
    ],
  },
});
