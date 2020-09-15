<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveOutDiv" @mouseenter="moveInDiv">
        <h2 class="all">全部商品分类</h2>
        <transition name="show">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="toSearch">
              <div
                class="item"
                v-for="(c1,index) in categoryList"
                :key="c1.categoryId"
                :class="{item_on:currentIndex===index}"
                @mouseenter="moveIn(index)"
              >
                <!-- 移入哪个一级分类，就把哪个下标赋值给currentIndex 移入的下标一定和currentIndex相等-->
                <h3>
                  <!-- 声明式导航本质上是组件对象，组件对象过多，会造成效率很慢  所以会很卡 -->
                  <!-- <router-link
                  :to="{name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}"
                  >{{c1.categoryName}}</router-link>-->
                  <a
                    href="###"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>

                  <!-- 编程式导航 -->
                  <!-- 每个a标签都添加事件效率仍然低下，采用事件委派处理更妥当  -->
                  <!-- <a
                  href="###"
                  @click="$router.push({name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}})"
                  >{{c1.categoryName}}</a>-->
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <!-- <router-link
                        :to="{name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}"
                        >{{c2.categoryName}}</router-link>-->

                        <!-- 自定义属性  -->
                        <a
                          href="###"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                        <!-- <a
                        href="###"
                        @click="$router.push({name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}})"
                        >{{c2.categoryName}}</a>-->
                      </dt>
                      <dd>
                        <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                          <!-- <router-link
                          :to="{name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}"
                          >{{c3.categoryName}}</router-link>-->

                          <!-- <a
                          href="###"
                          @click="$router.push({name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}})"
                          >{{c3.categoryName}}</a>-->

                          <a
                            href="###"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 全部引入
// import _ from "lodash"
// 按需引入
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  mounted() {
    //挂载完成后（模板挂载完成后，模板变为真正的dom后）

    //放在这里会发多次请求而请求的数据是一样的，挪到App当中发请求存数据（home/search都会发）
    // this.getCategoryList();

    //为了判断是在home页还是在search页，如果是search页那么我们要首先隐藏掉三级分类列表
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
  methods: {
    getCategoryList() {
      //用户在触发响应的actions去发请求拿数据
      this.$store.dispatch("getCategoryList");
    },
    // moveIn(index) {
    //     console.log(index);
    //     this.currentIndex = index
    // }
    // 需要节流的函数
    // { 'trailing': false }:不让函数在拖延的时间之后执行，也就是在时间间隔内执行完这个函数
    moveIn: throttle(
      function (index) {
        console.log(index);
        this.currentIndex = index;
      },
      50,
      { trailing: false }
    ),

    // 移入到全部商品分类显示三级商品分类列表
    moveInDiv() {
      this.isShow = true;
    },
    //移出全部商品分类外部的div，隐藏search的三级分类列表，home当中隐藏23级分类
    moveOutDiv() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
    toSearch(event) {
      let target = event.target; // 代表目标元素
      event.preventDefault();

      // 自定义属性data-上的api
      // dataset拿的就是元素身上以data-开头的所有属性和值组成的一个对象
      let data = target.dataset;
      console.log(data);

      let { categoryname, category1id, category2id, category3id } = data;

      // 判断是否为a标签
      if (categoryname) {
        // 如果categoryname存在，那么点击的一个是a标签

        // 点击的a,那么一定会跳转，创建跳转的对象
        let location = {
          name: "search",
        };

        // 创建query参数对象，收集整理query参数
        let query = {
          categoryName: categoryname,
        };

        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }

        // 把query参数放到location当中
        location.query = query;

        let { params } = this.$route;
        if (params) {
          location.params = params;
        }

        // 看是否是从首页home到search页
        //判断当前路由路径是什么，如果是home，那么我们就push，如果不是home那就replace
        if (this.$route.path != "/home") {
          this.$router.replace(location);
        } else {
          this.$router.push(location);
        }
      }
    },
  },
  computed: {
    // 可以去拿vuex当中state及getters当中的数据
    //   计算属性
    // categoryList() {
    //   return this.$store.state.home.categoryList;
    // },
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: skyblue;
      z-index: 999;

      &.show-enter {
        opacity: 0;
        height: 0;
      }

      &.show-enter-active {
        transition: all 0.5s;
      }
      &.show-enter-to {
        opacity: 1;
        height: 461px;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 615px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background: hotpink;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
