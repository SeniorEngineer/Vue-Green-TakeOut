<!-- 商家信息 -->
<template>
  <div>
    <shopHeader/>
    <div class="tab">
       <div class="tab-item">
          <router-link to="/shop/ordering" replace>信息</router-link>
       </div>
       <div class="tab-item">
          <router-link to="/shop/info" replace>点餐</router-link>
       </div>
       <div class="tab-item">
          <router-link to="/shop/evaluate" replace>评论</router-link>
       </div>
    </div>
    <!-- keep-alive缓存组件内部状态，避免重新渲染 -->
    <keep-alive>
     <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import shopHeader from '../../components/shopHeader/shopHeader'
export default {
  mounted () {
    this.$store.dispatch('bizInfo')
  },
  components: {
    shopHeader
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/stylus/mixins.styl';
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
