 import {
     reqAddOrUpdateShopCart,
     reqShopCartList,
     reqUpdateCartIsChecked
 } from '@/api'

 //存数据的地方，多个属性的对象
 const state = {
     //发请求的时候没有数据，所以不用存了
     shopCartList: []
 }
 //直接修改数据的地，是多个方法的一个对象  方法当中不能出现if  for   异步操作
 const mutations = {
     RECEIVESHOPCARTLIST(state, shopCartList) {
         state.shopCartList = shopCartList
     }
 }
 //和用户对接的地方  也是多个方法的一个对象 方法当中可以出现if  for  异步操作
 const actions = {
     async addOrUpdateShopCart({
         commit
     }, {
         skuId,
         skuNum
     }) {
         console.log(skuId, skuNum)
         const result = await reqAddOrUpdateShopCart(skuId, skuNum)
         if (result.code === 200) {
             return 'ok'
         } else {
             return Promise.reject(new Error('faild'))

         }
     },

     async getShopCartList({
         commit
     }) {
         const result = await reqShopCartList()
         if (result.code === 200) {
             commit('RECEIVESHOPCARTLIST', result.data)
         }
     },

     async updateCartIsChecked({commit},{skuId,isChecked}){
        const result = await reqUpdateCartIsChecked(skuId,isChecked)
        if(result.code === 200){
          return 'ok'
        }else{
          return Promise.reject(new Error('faild'))
        }
     },

     updateAllCartIsChecked({state,dispatch},isChecked){
        let promises = []
        // item代表每一行
        state.shopCartList.forEach(item => {
          if(item.isChecked === isChecked) return 
          const promise = dispatch('updateCartIsChecked',{skuId:item.skuId,isChecked:isChecked})
          promises.push(promise)
        })
        return Promise.all(promises)
      },

 }
 //通过state计算出来的属性数据（只有读没有写，只能使用state数据不能修改state数据）
 const getters = {}


 //2、向外暴露一个Store对象
 export default {
     state,
     mutations,
     actions,
     getters
 }