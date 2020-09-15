<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件显示在哪里，这个标签就写在哪里 -->
    <router-view></router-view>
    <!-- 第一种判断路径 -->
    <!-- <Footer v-show = "!($route.path==='/login' || $route.path === '/register')"></Footer> -->
    <!-- 第二种 -->
    <Footer v-show="!$route.meta.isHide"></Footer>

  </div>
</template>

<script>
import Header from "@/components/Header"
import Footer from "@/components/Footer"
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    this.getCategoryList();

  },
  methods: {
    getCategoryList() {
      //用户在触发响应的actions去发请求拿数据
      this.$store.dispatch("getCategoryList");
    },
  }
}
</script>

<style scoped>

</style>
