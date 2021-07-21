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
    <p><code>左滑播放器</code> 关闭帮助</p>
    <p><code>右滑播放器</code> 打开帮助</p>

    <h3>评论点赞</h3>
    <p><code>长按评论</code></p>

    <h3>歌曲点赞/收藏/喜欢</h3>
    <p><code>双击播放器</code> 收藏</p>

    <h3>评论切换</h3>
    <p><code>双击屏幕</code> 进行刷新</p>

    <h3>退出登录</h3>
    <p><code>长按播放器</code> Tip:退出将销毁所有Cookie和本地存储</p>

    <h3>展望未来</h3>
    <p>云贝智能代理（<span @click="sign()">领取云贝</span>）</p>
    <p>音频可视化的使用体验。</p>

    <h3>相关声明：</h3>
    <p>
      <a href="https://www.52craft.cc/archives/284/" target="_blank">项目介绍</a
      >&nbsp;
      <a
        href="https://github.com/PluginsKers/NeteaseCloudMusicWall"
        target="_blank"
        >开源地址</a
      >&nbsp;
      <a href="https://www.52craft.cc/" target="_blank">KERS的博客</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "Help",
  data: () => ({}),
  mounted() {},
  methods: {
    sign() {
      this.$request({
        url: "/yunbei/sign",
      }).then((response) => {
        if (response.data && response.data.code == 200) {
        } else {
        }
      });
      this.$request({
        url: "/yunbei/tasks",
      }).then((response) => {
        if (response.data && response.data.code == 200) {
          for (let i of response.data.data) {
            if (i.userTaskId != 0 && !i.completed) {
              this.$request({
                url: "/yunbei/task/finish",
                params: {
                  userTaskId: i.userTaskId,
                },
              }).then((response) => {
                if (response.data && response.data.code == 200) {
                  Qmsg["success"](`完成任务《${i.taskName}》`);
                } else {
                }
              });
            }
          }
        } else {
        }
      });
    },
  },
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
  background: rgb(255 255 255 / 90%)
    url(https://cdn.jsdelivr.net/gh/pluginskers/cdn/2021/20210427202826.png);
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
    border-radius: 0px;
    padding: 20px;
    z-index: 2;
  }
}
</style>>