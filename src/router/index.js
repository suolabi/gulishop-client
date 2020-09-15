//1引入并声明使用
import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter) //声明使用

import routes from './routes'

//2必须往外暴露一个路由器对象

const {
  push: originPush
} = VueRouter.prototype

VueRouter.prototype.push = function (location, onResolve, onRejected) {
  // 判断回调，代表没有传递处理的回调，无论成功还是失败
  if (onResolve === undefined && onRejected === undefined) {
    // this指的是路由对象
    // 如果没传，就调用原来的push方法
    return originPush.call(this, location).catch(() => {})
  } else {
    return originPush.call(this, location, onResolve, onRejected)
  }
}


const {
  replace: originReplace
} = VueRouter.prototype

VueRouter.prototype.replace = function (location, onResolve, onRejected) {
  // 判断回调，代表没有出传递处理的回调，无论成功还是失败
  if (onResolve === undefined && onRejected === undefined) {
    // this指的是路由对象
    // 如果没传，就调用原来的push方法
    return originReplace.call(this, location).catch(() => {})
  } else {
    return originReplace.call(this, location, onResolve, onRejected)
  }
}




export default new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

//3、必须在vue当中去注入（使用）路由器对象 main.js当中去注入