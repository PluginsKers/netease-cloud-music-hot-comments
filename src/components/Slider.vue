<template>
  <div class="wall">
    <div class="wrapper" ref="wrapper">
      <div
        class="slide"
        v-for="(obj, index) in $parent.list"
        :key="index"
        :index="index"
      >
        <div class="slide__cover" v-if="obj.comments[commentIndex]">
          <div
            class="slide__background"
            :style="{
              background: `url(${obj.comments[commentIndex].user.avatarUrl})`,
            }"
          ></div>
          <div class="slide__overlay"></div>
        </div>
        <div class="header">
          <font-awesome-icon icon="book" />《<span class="ablum">{{
            obj.name
          }}</span
          >》
        </div>
        <div class="body" v-if="obj.comments[commentIndex]">
          <p
            class="comment"
            @dblclick="like(obj.id, obj.comments[commentIndex].commentId)"
          >
            {{ obj.comments[commentIndex].content }}
          </p>
          <span class="author">
            {{ obj.comments[commentIndex].user.nickname }}
          </span>
        </div>
        <div class="body" v-else>
          <p class="comment">它暂时还没有热评呢</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slider",
  data: () => ({
    clientHeight: 0,
    commentIndex: Math.floor(Math.random() * 20),
    startIndex: 0,
    activeElement: null,
  }),
  mounted() {
    let wrapper = this.$refs.wrapper;

    if (wrapper) {
      this.activeElement = wrapper.children[this.startIndex];
      this.activeElement.classList += " active";
      this.actived.apply();

      // mouse
      let mousestartY = null;

      wrapper.addEventListener("mousedown", (start) => {
        this.clientHeight = document.documentElement.clientHeight;
        mousestartY = start.clientY;
        wrapper.addEventListener("mousemove", this.mouseMove);
      });

      wrapper.addEventListener("mouseup", (end) => {
        wrapper.removeEventListener("mousemove", this.mouseMove);
        let r = mousestartY - end.clientY;
        if (r >= this.clientHeight * 0.1) {
          console.log("Next");
          this.next();
        } else if (r < -(this.clientHeight * 0.1)) {
          console.log("Prev");
          this.prev();
        }
      });

      // mouse scroll
      wrapper.addEventListener("mousewheel", this.mouseScroll, false);

      // touch
      let touchstartY = null;

      wrapper.addEventListener("touchstart", (start) => {
        this.clientHeight = document.documentElement.clientHeight;
        touchstartY = start.changedTouches[0].clientY;
        wrapper.addEventListener("touchmove", this.touchMove);
      });

      wrapper.addEventListener("touchend", (end) => {
        wrapper.removeEventListener("touchmove", this.touchMove);
        let r = touchstartY - end.changedTouches[0].clientY;
        if (r >= this.clientHeight * 0.2) {
          console.log("Next");
          this.next();
        } else if (r < -(this.clientHeight * 0.2)) {
          console.log("Prev");
          this.prev();
        }
      });
    }
  },
  methods: {
    next() {
      this.before.apply();
      this.beforeNext.apply();
      if (this.activeElement.nextSibling) {
        this.activeElement.classList = "slide";
        this.activeElement = this.activeElement.nextSibling;
        this.activeElement.className += " active";
      } else {
        Qmsg["warning"]("愿美好与你环环相扣呀");
      }
      this.actived.apply();
    },
    prev() {
      this.before.apply();
      this.beforePrev.apply();
      if (this.activeElement.previousSibling) {
        this.activeElement.classList = "slide";
        this.activeElement = this.activeElement.previousSibling;
        this.activeElement.className += " active";
      } else {
        Qmsg["warning"]("到顶了哦");
      }
      this.actived.apply();
    },
    before() {
      this.$parent.$refs.player.toggle("pause");
    },
    beforeNext() {},
    beforePrev() {},
    actived() {
      let current = this.$parent.list[this.activeElement.getAttribute("index")];
      current.url = null;
      console.log("开始加载Player", current);
      this.$parent.$refs.player.loader(current);
    },
    mouseMove(event) {},
    mouseScroll(event) {},
    touchMove(event) {
      let touchY = event.changedTouches[0].clientY;
    },
    like(id, cid) {
      this.$request({
        url: "/comment/like",
        params: {
          id: id,
          cid: cid,
          t: 1,
          tpye: 0,
        },
      }).then((response) => {
        if (response.data && response.data.code == 200) {
          Qmsg["success"]("点赞成功");
        } else {
          Qmsg["error"]("点赞失败");
        }
      });
    },
  },
};
</script>

<style scoped>
.wall {
  position: absolute;
  overflow: hidden;
  list-style: none;
  padding: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.slide {
  position: relative;
  margin: auto;
  height: 100%;
  color: #fff;
  padding: 10px;
  max-width: 400px;
  text-align: center;
  display: none;
}

.slide.active {
  display: block;
}

.slide__overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgb(242 165 85 / 90%);
  backdrop-filter: blur(5px);
  z-index: -1;
}

.slide__background {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -1;
}

.wall .album {
  position: relative;
  display: inline-block;
  white-space: nowrap;
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  bottom: -5px;
}

.wall .header {
  position: relative;
  left: 4px;
  height: 27px;
}

.wall .body {
  margin: 20px 0px 40px 0px;
}

.wall .comment {
  font-size: 20px;
  text-align: center;
  margin: 30px 0 60px 0;
}

.wall .author {
  position: relative;
  color: rgb(245, 203, 150);
  font-size: small;
}

.wall span.author::before {
  content: "";
  position: absolute;
  background: rgb(245, 203, 150);
  top: 8px;
  left: -50px;
  width: 45px;
  height: 1px;
}

.wall span.author::after {
  content: "";
  position: absolute;
  background: rgb(245, 203, 150);
  top: 8px;
  right: -50px;
  width: 45px;
  height: 1px;
}
</style>>