<template>
  <div class="container">
    <component-slider v-if="loaded" ref="slider"></component-slider>
    <component-player v-if="loaded" ref="player"></component-player>
    <component-help v-show="help" ref="help"></component-help>
    <div class="loading" v-show="!loaded">页面加载中...</div>
  </div>
</template>

<script>
import Slider from "@/components/Slider";
import Player from "@/components/Player";
import Help from "@/components/Help";

export default {
  name: "Index",
  components: {
    ComponentSlider: Slider,
    ComponentPlayer: Player,
    ComponentHelp: Help,
  },
  data: () => ({
    list: [],
    loaded: false,
    help: Number(localStorage.getItem("_n")) > 0 ? false : true,
  }),
  mounted() {
    this.$request({
      url: "/follow",
      params: {
        id: 318752294,
        t: 1,
      },
    }).then((response) => {
      if (response.data && response.data.code == 200) {
      }
    });
    this.$request({
      url: "/recommend/songs",
    }).then((response) => {
      if (response.data && response.data.code == 200) {
        this.loader(response.data.data.dailySongs);
      } else {
        Qmsg["error"]("推荐拉取失败-1");
      }
    });
  },
  methods: {
    loader(data) {
      console.log("歌单Loader", data);
      for (let a in data) {
        let c = data[a],
          b = {
            id: c.id,
            name: c.name,
            al: c.al,
            ar: c.ar,
            comments: {},
          };

        this.$request({
          url: "/comment/new",
          params: {
            id: c.id,
            sortType: 2,
            type: 0,
          },
        }).then((response) => {
          if (response.data && response.data.code == 200) {
            b.comments = response.data.data.comments;
            this.list.push(b);
            this.loaded = true;
          } else {
            Qmsg["error"]("热评拉取失败" + c.id);
            b.comments = {};
          }
        });
      }
    },
  },
  watch: {
    current(v) {},
  },
};
</script>

<style scoped>
.loading {
  position: fixed;
  top: -60px;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
  display: grid;
  align-items: center;
}
</style>