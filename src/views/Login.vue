<template>
  <div>
    <a
      href="https://github.com/PluginsKers/NeteaseCloudMusicWall"
      target="_blank"
      class="github-corner"
      aria-label="View source on Github"
      ><svg viewBox="0 0 250 250" aria-hidden="true">
        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
        <path
          d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
          fill="currentColor"
          style="transform-origin: 130px 106px"
          class="octo-arm"
        ></path>
        <path
          d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
          fill="currentColor"
          class="octo-body"
        ></path></svg
    ></a>
    <ul class="tabs">
      <li class="phone" @click="type = 'phone'">手机登录</li>
      <li class="email" @click="type = 'email'">邮箱登录</li>
      <li class="qr" @click="type = 'qr'">二维码登录</li>
    </ul>
    <div class="login">
      <div class="phone" v-show="type == 'phone'">
        <div class="input-group">
          <label for="number">手机号</label
          ><input
            id="number"
            type="text"
            placeholder="请输入手机号码(+86)"
            v-model="form.phone.phone"
          />
        </div>
        <div class="input-group">
          <label for="password">密码</label
          ><input
            id="password"
            type="password"
            placeholder="请输入密码"
            v-model="form.phone.password"
          />
        </div>
      </div>
      <div class="email" v-show="type == 'email'">
        <div class="input-group">
          <label for="email">邮箱</label
          ><input
            id="email"
            type="email"
            placeholder="请输入邮箱，163网易邮箱"
            v-model="form.email.email"
          />
        </div>
        <div class="input-group">
          <label for="password">密码</label
          ><input
            id="password"
            type="password"
            placeholder="请输入密码"
            v-model="form.email.password"
          />
        </div>
      </div>
      <div class="qr" v-show="type == 'qr'">二维码登录</div>
      <div class="submit" @click="submit">提交</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    type: "phone",
    form: {
      phone: {
        phone: null,
        password: null,
      },
      email: {
        email: null,
        password: null,
      },
      qr: {},
    },
  }),
  mounted() {
    setTimeout(() => {
      Qmsg["warning"]("请在进入前调整你的手机音量！");
    }, 2000);
  },
  methods: {
    submit() {
      this.$store.dispatch("login", {
        type: this.type,
        data: this.form[this.type],
      });
    },
  },
};
</script>

<style scoped>
.login {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 5px;
  background: #e5e5e5;
  z-index: -1;
}

.login .phone,
.login .email,
.login .qr {
  max-width: 400px;
  margin: 15px auto;
}

.login .submit {
  max-width: 400px;
  text-align: center;
  color: #fff;
  background: #07c160;
  align-items: center;
  border-radius: 4px;
  padding: 10px 0;
  margin: 10px auto;
  cursor: pointer;
}

.login .submit:hover {
  background: #06b259;
}

ul.tabs {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  list-style: none;
  padding: 0;
  margin: 5px;
  display: flex;
  z-index: 1;
}

ul.tabs li {
  width: 33.33%;
  text-align: center;
  color: #fff;
  background: #07c160;
  align-items: center;
  padding: 12px 0;
  cursor: pointer;
}

ul.tabs li:first-child {
  border-radius: 4px 0 0 4px;
}

ul.tabs li:last-child {
  border-radius: 0 4px 4px 0;
}

ul.tabs li:hover {
  background: #06b259;
}

.github-corner {
  border-bottom: 0;
  position: fixed;
  right: 0;
  text-decoration: none;
  top: 0;
  z-index: 2;
}

.github-corner svg {
  color: #e5e5e5;
  fill: var(--theme-color, #07c160);
  height: 80px;
  width: 80px;
}
</style>>