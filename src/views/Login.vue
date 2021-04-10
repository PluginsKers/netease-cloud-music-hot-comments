<template>
  <div>
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
</style>>