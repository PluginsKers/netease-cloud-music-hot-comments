<template>
  <div class="player">
    <v-touch
      @swiperight="$parent.help = true"
      @swipeleft="$parent.help = false"
      @press="logout()"
      @pressup="escapeLogout()"
    >
      <div v-if="current && current.al">
        <img class="pic" :src="current.al.picUrl" />
        <div class="control" v-if="current.url" @click="toggle()">
          <font-awesome-icon :icon="status" />
          <audio
            id="audio"
            :src="current.url || ''"
            controls
            style="display: none"
            @canplay="canPlay"
            @ended="onEnd"
            @pause="onPause"
            @play="onPlay"
            autoplay
            loop
          ></audio>
        </div>
        <div class="details" @dblclick="like(current.id)">
          <p class="name">{{ current.name }}</p>
          <div class="artist">{{ current.ar[0].name }}</div>
        </div>
      </div>
      <div class="player__overlay" v-else>加载中...</div>
    </v-touch>
  </div>
</template>

<script>
export default {
  name: "Player",
  data: () => ({
    audio: null,
    current: null,
    status: "pause",
  }),
  mounted() {},
  methods: {
    loader(current) {
      this.$request({
        url: "/song/url",
        params: {
          id: current.id,
        },
      }).then((response) => {
        if (response.data && response.data.code == 200) {
          current.url = response.data.data[0].url;
          this.current = current;
          console.log("Player加载完毕", current);
          this.toggle("play");
        } else {
          Qmsg["error"]("播放失败");
        }
      });
    },
    toggle(target = null) {
      if (!this.audio) return;
      switch (target) {
        case "play":
          this.audio.play();
          this.status = "pause";
          break;
        case "pause":
          this.audio.pause();
          this.status = "play";
          break;
        default:
          if (this.audio.paused) {
            this.toggle("play");
          } else {
            this.toggle("pause");
          }
          break;
      }
    },
    canPlay() {
      console.log("音乐已经就绪");
      this.audio = document.getElementById("audio");
    },
    onPlay() {
      console.log("音乐开始播放");
      if (this.audio.volume) this.audio.volume = 0.1;
    },
    onPause() {
      console.log("音乐暂停播放");
    },
    onEnd() {
      console.log("音乐播放完毕");
      this.$parent.$refs.slider.next();
    },
    like(id) {
      this.$request({
        url: "/like",
        params: {
          id: id,
        },
      }).then((response) => {
        if (response.data && response.data.code == 200) {
          Qmsg["success"]("已添加至《我喜欢》");
        }
      });
    },
    logout() {
      console.log("开始退出登录");
      this.beforeTimer = setTimeout(() => {
        Qmsg["warning"]("继续保持长按以退出登录");
        let count = 7;
        this.refreshTimer = setInterval(() => {
          Qmsg["warning"]("准备退出");
          count--;
          if (count == 1) {
            this.$store.commit("logout");
            this.escapeLogout();
          }
        }, 1000);
      }, 500);
    },
    escapeLogout() {
      clearTimeout(this.beforeTimer);
      clearInterval(this.refreshTimer);
    },
  },
  watch: {},
};
</script>

<style scoped>
.player {
  height: 56px;
  position: fixed;
  bottom: -24px;
  opacity: 0.5;
  color: #fff;
  width: 521px;
  background: #ffffff;
  border-radius: 4px 4px 0px 0px;
  left: 50%;
  margin-left: -260px;
  z-index: 3;
}

.player__overlay {
  position: absolute;
  height: 100%;
  width: 100%;
  text-align: center;
  color: #000;
  padding: 10px 0;
  z-index: 2;
}

.player .pic {
  opacity: 0.7;
  position: absolute;
  z-index: 10005;
  top: 8px;
  left: 8px;
  bottom: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  pointer-events: none;
}

.player .control {
  position: absolute;
  right: 16px;
  color: #fff;
  bottom: -23px;
  padding: 8px 10px 4px 10px;
  box-shadow: 0px 0px 2px 0px #558b2f;
  background: linear-gradient(145deg, #c4e759, #6de195);
  border-radius: 4px 4px 0px 0px;
  cursor: default;
  z-index: 10010;
}

.player .control svg {
  width: 24px;
}

.player:hover {
  bottom: 0px;
  opacity: 1;
}

.player:hover .control {
  bottom: 0px;
}

.player:hover .logout {
  bottom: 0px;
}

.player:hover .details div:nth-child(1) {
  white-space: normal;
  display: inline;
}

@media (max-width: 540px) {
  .player {
    width: 100%;
    left: 0;
    margin: 0;
    border-radius: 0;
  }
}

.details {
  height: 100%;
  padding: 10px 0px 10px 52px;
  color: #000;
}

.details .name {
  white-space: normal;
  font-size: 1em;
  font-weight: 550;
  max-width: 160px;
  word-break: keep-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

.details .artist {
  max-width: 200px;
  font-size: 12px;
  margin: 3px 0px 0px 2px;
  opacity: 0.6;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>