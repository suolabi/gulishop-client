import Vue from "vue"
import App from "@/App"
import router from "@/router"
import store from "@/store"
import '@/mock/mockServer'


// 全局注册组件
import TypeNav from "@/components/TypeNav"
import SliderLoop from "@/components/SliderLoop"
import Pagination from "@/components/Pagination"
Vue.component('SliderLoop',SliderLoop)
Vue.component('TypeNav', TypeNav)
Vue.component('Pagination', Pagination)


// import "@/api"  //引入文件，直接调用
// import {reqCategoryList} from '@/api'
// reqCategoryList()


new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this//vm  
    //在Vue的原型上添加了一个属性  $bus   $bus指向了一个对象 这个对象就是我们vm对象
    //1、为什么要在Vue原型上添加   
    //（让所有的组件对象都能看到它，找到它）
    // 组件对象原型的原型就是vm的原型
    //2、事件总线对象必须能够使用$on和$emit，$on和$emit 两个是在Vue的原型当中
  },
  el: "#app",
  render: h => h(App),
  router,
  store   //让所有的组件当中都可以多一个对象 this.$store

})