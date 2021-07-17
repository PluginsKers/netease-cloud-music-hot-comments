<template>
  <div class="help">
    <font-awesome-icon
      class="close"
      icon="times"
      @click="$parent.help = false"
    />
    <p>
      本站将不会保存任何有关于您的个人信息，并在登录时将自动为您完成网易云日常签到。
    </p>

    <h3>打开/关闭 帮助页面</h3>
    <code>左滑</code>播放器 关闭 <code>右滑</code>播放器 打开

    <h3>评论点赞</h3>
    <code>长按</code>评论

    <h3>歌曲点赞/收藏/喜欢</h3>
    <code>双击</code>播放器任意位置

    <h3>评论切换</h3>
    <code>双击</code>屏幕

    <p>展望未来：云贝智能代理（领取云贝&后台完成简单任务）</p>

    <h3>相关声明：</h3>
    <p>项目介绍</p>
    <a href="https://www.52craft.cc/archives/284/" target="_blank"
      >https://www.52craft.cc/archives/284/</a
    ><br />
    <p>开源地址</p>
    <a
      href="https://github.com/PluginsKers/NeteaseCloudMusicWall"
      target="_blank"
      >https://github.com/PluginsKers/NeteaseCloudMusicWall</a
    >
  </div>
</template>

<script>
export default {
  name: "Help",
  data: () => ({}),
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.help {
  position: fixed;
  top: 20px;
  bottom: 0;
  left: 20px;
  right: 20px;
  background: rgb(255 255 255 / 80%);
  background-image: url(https://cdn.jsdelivr.net/gh/pluginskers/cdn/2021/20210427202826.png);
  background-blend-mode: hue;
  border-radius: 4px 4px 0 0;
  padding: 20px;
  z-index: 2;
}

@media (max-width: 540px) {
  .help {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background: #ffffff;
    border-radius: 0px;
    padding: 20px;
    z-index: 2;
  }
}
</style>>