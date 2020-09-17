 import {
     reqAddOrUpdateShopCart,
     reqShopCartList,
     reqUpdateCartIsChecked,
     reqDeleteCart
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

     async updateCartIsChecked({
         commit
     }, {
         skuId,
         isChecked
     }) {
         const result = await reqUpdateCartIsChecked(skuId, isChecked)
         if (result.code === 200) {
             return 'ok'
         } else {
             return Promise.reject(new Error('faild'))
         }
     },

     updateAllCartIsChecked({
         state,
         dispatch
     }, isChecked) {
         let promises = []
         // item代表每一行
         state.shopCartList.forEach(item => {
             // 如果全选，原本的状态和传过来的状态一样，那么就没必要发请求了
             if (item.isChecked === isChecked) return
             //   如果不一样，分发给单选的actions,返回的也是一个promise对象
             const promise = dispatch('updateCartIsChecked', {
                 skuId: item.skuId,
                 isChecked: isChecked
             })
             promises.push(promise)
         })

         return Promise.all(promises)
     },

     async deleteCart({
         commit
     }, skuId) {
         const result = await reqDeleteCart(skuId)
         if (result.code === 200) {
             return 'ok'
         } else {
             return Promise.reject(new Error('faild'))
         }
     },

     deleteAllCart({
         state,
         dispatch
     }) {
         let promises = []
         // item代表每一行
         state.shopCartList.forEach(item => {
             // 隐式转换，如果没选中为假，就不删除
             if (!item.isChecked) return
             //   如果不一样，分发给删除单个的actions,返回的也是一个promise对象
             const promise = dispatch('deleteCart', item.skuId)
             promises.push(promise)
         })
         return Promise.all(promises)
     }


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