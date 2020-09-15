<template>
  <div class="pagination">
    <button :disabled="currentPageNum === 1" @click="$emit('changePageNum',currentPageNum - 1)">上一页</button>
    <button v-if="startEnd.start > 1" @click="$emit('changePageNum',1)">1</button>
    <button v-if="startEnd.start > 2">···</button>

    <!-- vfor和vif如果一起使用vfor优先级高于vif -->
    <button
      v-for="(page) in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      :class="{active:currentPageNum === page}"
      @click="$emit('changePageNum',page)"
    >{{page}}</button>

    <button v-if="startEnd.end < totalPageNum - 1">···</button>
    <button v-if="startEnd.end < totalPageNum" @click="$emit('changePageNum',totalPageNum)">{{totalPageNum}}</button>
    <button :disabled="currentPageNum === totalPageNum" @click="$emit('changePageNum',currentPageNum + 1)">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    currentPageNum: {
      type: Number,
      default: 1,
    },
    pageSize: Number,
    total: Number,
    continueNum: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // 计算总页码
    totalPageNum() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },

    startEnd() {
      // 想计算计算连续页的起始位置和结束位置
      // 和三个数据有关系，当前页码，连续数量，总页数,把这三个取出来
      let { currentPageNum, continueNum, totalPageNum } = this;
      // 代表起始位置
      let start;
      // 代表结束位置
      let end;
      // 代表差值
      let disNum;

      // 如果总页数小于等于连续页数，那就全部展示
      if (totalPageNum <= continueNum) {
        // 1就是起始位置，总页数就是结束位置
        start = 1;
        end = totalPageNum;
      } else {
        //  首先计算正常情况
        // 起始位置等于当前页码减去 连续页数/2，向下取整
        start = currentPageNum - Math.floor(continueNum / 2);
        // 起始位置等于当前页码加上 连续页数/2，向下取整
        end = currentPageNum + Math.floor(continueNum / 2);
        // 左边边界修正
        if (start <= 1) {
          // disNum 指的是算出的start和1之间的差值，为了后面去修正算出来的start和end
          disNum = 1 - start;
          start += disNum;
          end += disNum;
        }
        // 右边边界修正
        if (end >= totalPageNum) {
          disNum = end - totalPageNum;
          start -= disNum;
          end -= disNum;
        }
      }

      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>