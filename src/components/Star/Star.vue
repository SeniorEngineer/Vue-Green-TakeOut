<!-- 评论小星星 -->
<template>
  <div class="star" :class="'star-' + size">
    <span class="star-item" v-for="(item,index) in starClass" :key="index" :class="item"></span>
  </div>
</template>

<script>
// 类名常量
const CLASS_ON = 'on'
const CLASS_HALF = 'half'
const CLASS_OFF = 'off'
export default {
  props: {
    size: Number,
    score: Number
  },
  computed: {
    /*
      计算星的算法，小数位数超过0.5就是半颗星，总位数不能超过5
      3.2 3 + 0 + 2
      3.5 3 + 1 + 1
      循环增加class
    */
    starClass () {
      const {score} = this
      const starArr = []
      // 整数部分添加n个class_on
      const ingeter = Math.floor(score)
      for (var i = 0; i < ingeter; i++) {
        starArr.push(CLASS_ON)
      }
      // 小数部分如果大于5增加class_half
      if (score * 10 - ingeter * 10 > 5) {
        starArr.push(CLASS_HALF)
      }
      // 添加n个class_off 等于5条件循环结束
      while (starArr.length < 5) {
        starArr.push(CLASS_OFF)
      }
      return starArr
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixins.styl';

/* @import url(); 引入css类 */
.star { // 2x图 3x图
  float: left;
  font-size: 0;

  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }

  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('../../assets/images/stars/star48_on');
      }

      &.half {
        bg-image('../../assets/images/stars/star48_half');
      }

      &.off {
        bg-image('../../assets/images/stars/star48_off');
      }
    }
  }

  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('../../assets/images/stars/star36_on');
      }

      &.half {
        bg-image('../../assets/images/stars/star36_half');
      }

      &.off {
        bg-image('../../assets/images/stars/star36_off');
      }
    }
  }

  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;

      &:last-child {
        margin-right: 0;
      }

      &.on {
        bg-image('../../assets/images/stars/star24_on');
      }

      &.half {
        bg-image('../../assets/images/stars/star24_half');
      }

      &.off {
        bg-image('../../assets/images/stars/star24_off');
      }
    }
  }
}
</style>
