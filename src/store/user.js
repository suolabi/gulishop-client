 import {getUserTempId,} from '@/utils/userabout'
 import {reqUserRegister,reqUserLogin,reqUserLogout} from '@/api'
 
 //存数据的地方，多个属性的对象
 const state = {
  //页面刷新，会自动触发state,进行初始化
  //在state当中存储userTempId是为了效率更高一些，因为从localstorage获取比从state直接拿要慢
  //我们只是在项目初始化的时候从localstorage获取一次，然后村给state，以后要用从state直接拿
  userTempId:getUserTempId(),
  // 初始化的时候从localStorage中读取下用户的信息，需要反序列化
  userInfo:JSON.parse(localStorage.getItem('USERINFO_KEY')) || {}
 }
 //直接修改数据的地，是多个方法的一个对象  方法当中不能出现if  for   异步操作
 const mutations= {
   RECEIVEUSERINFO(state,userInfo){
    state.userInfo = userInfo
   },

   RESETUSERINFO(state) {
    state.userInfo = {}
   }
 }
 //和用户对接的地方  也是多个方法的一个对象 方法当中可以出现if  for  异步操作
 const actions ={
   async userRegister({commit},userInfo) {
     const result = await reqUserRegister(userInfo)
     if(result.code === 200) {
       return 'ok'
     }else {
       return Promise.reject(new Error('faild'))
     }
   },

   async userLogin({commit},userInfo) {
    const result = await reqUserLogin(userInfo)
    if(result.code === 200) {
      commit('RECEIVEUSERINFO',result.data) // 修改state中的userinfo
      //把用户的信息保存起来,为了自动登录（下次再来还可以找到登录状态的用户信息）
      localStorage.setItem("USERINFO_KEY",JSON.stringify(result.data))    // 存储用户信息
      return 'ok'
    }else {
      return Promise.reject(new Error('faild'))
    }
  },

  async userLogout({commit}) {
    const result = await reqUserLogout()
    if(result.code === 200) {
      // 清空state中的数据，actions中不能修改state中的数据，必须通过mutations
      commit('RESETUSERINFO')
      // 清空localStorage中的数据
      localStorage.removeItem('USERINFO_KEY')
      return 'ok'
    }else {
      return Promise.reject(new Error('faild'))
    }
  }

 }
 //通过state计算出来的属性数据（只有读没有写，只能使用state数据不能修改state数据）
 const getters={}
 
 
 //2、向外暴露一个Store对象
 export default {
    state,
    mutations,
    actions,
    getters
  }