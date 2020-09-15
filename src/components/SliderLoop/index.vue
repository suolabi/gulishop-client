<template>
  <!-- 轮播结构 -->
  <div class="swiper-container" ref="bannerSwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(banner,index) in bannerList" :key="banner.id">
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  name: "SliderLoop",
  props:["bannerList"],
  watch: {
    // 一般监视,只写了handler
    // 监视bannerList：bannerList的初始值为空，当有变化的时候，说明数据回来了，再执行new swiper
    // 但在这里不能保证结构完全形成，主要看v-for遍历执行的快，还是new swiper的快

    bannerList: {
      immediate: true, // 这一步没意义，为了两边代码一致，抽取公共代码，形成公共组件
      handler() {
        // 配合$nextTick使用
        //这个回调是nextTick的回调，nextTick会等待页面dom最近一次循环更新结束之后才会执行它内部传递的回调
        // 也就是说，会等到页面的div创建完成之后，在执行new Swiper里的回调，创建轮播图
        //updated也可以实现，但是并不是最近一次更新，而是页面所有的更新都会执行这个钩子（updated），在这里没必要这样写
        this.$nextTick(() => {
          new Swiper(this.$refs.bannerSwiper, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less" scoped>
</style>
