<!--  -->
<template>
  <div class="footer_guide">
    <router-link :to="item.url" v-for="(item,index) in bottomList" :key="index" class="guide_item" >
          <span class="item_icon">
            <i class="iconfont" :class="item.icon"></i>
          </span>
          <span>{{item.title}}</span>
    </router-link>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/stylus/mixins.styl'
  .footer_guide
    top-border-1px(#e4e4e4)
    position relative
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display: flex;
      flex: 1;
      text-align: center;
      flex-direction: column;
      align-items: center;
      margin: 5px;
      color: #999;
      text-decoration: none;
      &.router-link-active
        color #02a774
      span
        font-size 12px
        margin-bottom 2px
        margin-top 2px
        .iconfont
          font-size 22px
</style>

<script>

export default {
  data () {
    return {
      bottomList: [{
        title: '外卖',
        url: '/deploy/msite',
        icon: 'icon-waimai'
      }, {
        title: '搜索',
        url: '/deploy/search',
        icon: 'icon-search'
      }, {
        title: '订单',
        url: '/deploy/order',
        icon: 'icon-dingdan'
      }, {
        title: '我的',
        url: '/deploy/profile',
        icon: 'icon-geren'
      }]
    }
  }
}
</script>
