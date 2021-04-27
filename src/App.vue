<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted(){
  }
};
</script>

<style>
@font-face {
  font-family: "PluginsKers";
  src: url("https://cdn.jsdelivr.net/gh/pluginskers/cdn/2021/20210427202913.woff2")
    format("woff");
}

html,
body {
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.9);
  background: rgb(242 165 85);
}

* {
  font-family: "PluginsKers";
  transition: all 0.1s;
}

label {
  margin: 0 0 0 -5px;
  padding: 8px 6px;
}

input {
  border: unset;
  font-size: 14px;
  border-radius: 4px;
  padding: 8px 6px;
  caret-color: #07c160;
}

.input-group {
  margin-bottom: 5px;
  display: grid;
}

input:focus {
  outline: unset;
}
</style>
