<template>
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{floor.name}}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li class="active" v-for="(nav,index) in floor.navList" :key="nav.text">
              <a href="#tab1" data-toggle="tab">{{nav.text}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword,index) in floor.keywords" :key="index">{{keyword}}</li>
              </ul>
              <img :src="floor.imgUrl" />
            </div>
            <div class="floorBanner">

                <SliderLoop :bannerList="floor.carouselList"></SliderLoop>
              <!-- <div class="swiper-container" ref="floorSwiper">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="(carousel,index) in floor.carouselList"
                    :key="carousel.id"
                  >
                    <img :src="carousel.imgUrl" />
                  </div>
                </div> -->
                <!-- 如果需要分页器 -->
                <!-- <div class="swiper-pagination"></div> -->

                <!-- 如果需要导航按钮 -->
                <!-- <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div> -->


            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="floor.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  name: 'Floor',
  props:['floor'],  // 声明接收属性
  mounted() {
      
    //第一种：直接new Swiper
    // 这里结构没问题，因为floor的数据是通过home父组件传过来，结构已经形成，数据也已经提前拿到了
    //   new Swiper(this.$refs.floorSwiper, {
    //         loop: true, // 循环模式选项
    //         // 如果需要分页器
    //         pagination: {
    //           el: ".swiper-pagination",
    //         },
    //         // 如果需要前进后退按钮
    //         navigation: {
    //           nextEl: ".swiper-button-next",
    //           prevEl: ".swiper-button-prev",
    //         },
    //       });
  },

    // //第二种：封装组件
    //  watch: {
    // // 一般监视,只写了handler
    // // 监视bannerList：bannerList的初始值为空，当有变化的时候，说明数据回来了，再执行new swiper
    // // 但在这里不能保证结构完全形成，主要看v-for遍历执行的快，还是new swiper的快

    // floor: {
    //   immediate:true,
    //   handler() {
    //     // 配合$nextTick使用
    //     //这个回调是nextTick的回调，nextTick会等待页面dom最近一次循环更新结束之后才会执行它内部传递的回调
    //     // 也就是说，会等到页面的div创建完成之后，在执行new Swiper里的回调，创建轮播图
    //     //updated也可以实现，但是并不是最近一次更新，而是页面所有的更新都会执行这个钩子（updated），在这里没必要这样写
    //     this.$nextTick(() => {
    //       new Swiper(this.$refs.floorSwiper, {
    //         loop: true, // 循环模式选项
    //         // 如果需要分页器
    //         pagination: {
    //           el: ".swiper-pagination",
    //         },
    //         // 如果需要前进后退按钮
    //         navigation: {
    //           nextEl: ".swiper-button-next",
    //           prevEl: ".swiper-button-prev",
    //         },
    //       });
    //     });
    //   },
    // },


}
</script>

<style lang="less" scoped>
.floor {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      .fl {
        float: left;
        color: #c81623;
        font-size: 20px;
        line-height: 30px;
        margin: 9px 0;
        font-weight: 700;
      }

      .fr {
        float: right;

        .nav-tabs {
          margin: 10px 0 0;
          display: inline-block;

          li {
            float: left;
            line-height: 18px;

            a {
              padding-top: 1px;
              font-weight: 400;
              background-color: #fff;

              &::after {
                content: "|";
                padding: 0 10px;
              }
            }

            &:nth-child(7) {
              a {
                &::after {
                  content: "";
                }
              }
            }

            &.active {
              a {
                color: #e1251b;
              }
            }
          }
        }
      }
    }

    .tab-content {
      border-top: 2px solid #c81623;
      border-bottom: 1px solid #e4e4e4;

      .tab-pane {
        .floor-1 {
          height: 360px;
          display: flex;

          .blockgary {
            width: 210px;
            height: 100%;
            background: #f7f7f7;

            .jd-list {
              padding: 15px 0;
              overflow: hidden;

              li {
                list-style-type: none;
                float: left;
                width: 40%;
                margin: 0 10px;
                border-bottom: 1px solid #e4e4e4;
                text-align: center;
                line-height: 26px;
              }
            }

            img {
              width: 100%;
            }
          }

          .floorBanner {
            width: 330px;
            height: 100%;
          }

          .split {
            width: 220px;
            height: 100%;
            position: relative;

            .floor-x-line {
              position: absolute;
              background: #e4e4e4;
              width: 220px;
              height: 1px;
              top: 180px;
            }

            .floor-conver-pit {
              width: 100%;
              height: 50%;

              img {
                width: 100%;
                height: 100%;
                transition: all 400ms;

                &:hover {
                  opacity: 0.8;
                }
              }
            }
          }

          .center {
            border: 1px solid #e4e4e4;
          }
        }
      }
    }
  }
}
</style>
