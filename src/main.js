import Vue from "vue"
import App from "@/App"
import router from "@/router"
import store from "@/store"


import TypeNav from "@/components/TypeNav"
Vue.component('TypeNav', TypeNav)


// import "@/api"  //引入文件，直接调用
// import {reqCategoryList} from '@/api'
// reqCategoryList()


new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store   //让所有的组件当中都可以多一个对象 this.$store

})