<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart,index) in shopCartList" :key="cart.id">
          <li class="cart-list-con1">
            <!-- 复选框,isChecked  1为选中，0为不选中 -->
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @click="changeIsChecked(cart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <!-- 商品名 -->
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <!-- 单价 -->
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeCartNum(cart,-1)">-</a>
            <!-- 点击添加，减少，本质上需要发请求 -->
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="changeCartNum(cart,$event.target.value*1)"
            />
            <a href="javascript:void(0)" class="plus" @click="changeCartNum(cart,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <!-- 小计计算 -->
            <span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteCart(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllCheck" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{checkedNum}}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allMoney}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getShopCartList();
  },
  methods: {
    getShopCartList() {
      this.$store.dispatch("getShopCartList");
    },
    // 简写方式
    // ...mapActions(["getShopCartList"])

    //修改购物车商品数量
    // disNum代表差值
    async changeCartNum(cart, disNum) {
      //判断如果本来就是1  要改变的数量还小于0  那么不需要发请求  结果还是1
      if (cart.skuNum === 1 && disNum < 0) return;
      if (disNum + cart.skuNum < 1) {
        disNum = 1 - cart.skuNum; //修正一下，最少得是1
      }

      try {
        // 修改购物车数量请求
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 如果成功重新发请求，拿购物车列表数据
        this.getShopCartList();
      } catch (error) {
        alert("修改购物车商品数量失败" + error.message);
      }
    },

    //修改单个购物车选中状态
    async changeIsChecked(cart) {
      try {
        // cart.isChecked 隐式转换,判断每一项是否被选中，0未选中，1选中
        await this.$store.dispatch("updateCartIsChecked", {
          skuId: cart.skuId,
          isChecked: cart.isChecked ? 0 : 1,
        });
        // 修改成功，重新获取数据
        this.getShopCartList();
      } catch (error) {
        alert("修改购物车商品选中状态失败" + error.message);
      }
    },

    // 删除单个商品
    async deleteCart(cart) {
      try {
        this.$store.dispatch("deleteCart", cart.skuId);
        alert("删除购物车成功");
        this.getShopCartList();
      } catch (error) {
        alert('删除购物车失败'+ error.message)
      }
    },


    // 删除多个选中商品
    async deleteAllCart() {
       //this.$store.dispatch('deleteAllCart') 就是在调用actions当中的deleteAllCart
      //而this.$store.dispatch('deleteAllCart')是函数调用表达式，它的值就是actions当中的deleteAllCart的返回值
      //actions当中的deleteAllCart的返回值就是Promise.all返回的那个promise
      try {
        const result = await this.$store.dispatch('deleteAllCart')
        alert('删除选中的购物车成功')
        this.getShopCartList();
      } catch (error) {
        alert('删除选中的购物车失败'+error.message)
      }
    }
  },

  // 把vuex的数据捞出来
  computed: {
    ...mapState({
      shopCartList: (state) => state.shopcart.shopCartList,
    }),

    // 统计选中的数量
    checkedNum() {
      // prev：上一次返回的结果
      // 0：为统计的初始值
      return this.shopCartList.reduce((prev, item) => {
        if (item.isChecked === 1) {
          prev += item.skuNum;
        }
        return prev;
      }, 0);
    },

    // 统计总价格
    allMoney() {
      return this.shopCartList.reduce((prev, item) => {
        // 隐式类型转换
        if (item.isChecked) {
          prev += item.skuNum * item.skuPrice;
        }
        return prev;
      }, 0);
    },

    // 全选按钮
    // 不但能读取，还能修改状态，用到get和set
    isAllCheck: {
      get() {
        // 查找数组中是不是每一项都符合条件，使用every
        // 看每一项是否都为1
        return (
          this.shopCartList.every((item) => item.isChecked) &&
          this.shopCartList.length > 0
        );
      },
      // 点击全选需要修改数据，用到set
      // val是布尔值
      // 在这里我们没有后端的接口可以一下把所有的都修改了，所以我们需要一个一个修改，用到了Promise.all
      async set(val) {
        //这个值就是 Promise.all返回的那个promise
        //Promise.all 传递的参数必须是一个promise对象的数组，返回值也是一个promise
        //返回的promise对象的成功和失败  看数组内部所有的promise对象是否成功，如果都成功，那么它就成功，如果有一个失败，那它就失败
        //成功的返回值promise的数据是一个数组 【每个成功的promise的数据】
        // 失败的返回值，就是第一个失败的promise失败的原因
        try {
          const result = await this.$store.dispatch(
            "updateAllCartIsChecked",
            val ? 1 : 0
          );
          // console.log(result)
          this.getShopCartList();
        } catch (error) {
          // 这个error.message是第一个错误的原因
          alert("修改购物车商品选中状态失败" + error.message);
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>