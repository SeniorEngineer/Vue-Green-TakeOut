<!-- 首页 -->
<template>
  <section class="msite">
    <!--首页头部,引入公共组件，利用插槽传值，props传值-->
    <headertop :title="adress.name">
      <router-link to="/deploy/search" class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link :to="userInfo._id?'/userinfo':'/login'" class="header_login" slot="right">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else>
            <i class="iconfont icon-person" ></i>
        </span>
      </router-link>
    </headertop>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper"  v-if="FoodArr.length > 0">
          <div class="swiper-slide" v-for="(item,index) in FoodArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(arr,index) in item" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl + arr.image_url">
              </div>
              <span>{{arr.title}}</span>
            </a>
          </div>
        </div>
        <!-- 页面加载慢时加载svg图，提升用户体验 -->
        <img src="../../../assets/images/msite_back.svg" alt="" v-else>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import ShopList from '../../../components/ShopList/ShopList'
export default {
  name: 'Msite',
  data () {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  components: {
    ShopList
  },
  methods: {
    // vuex 辅助函数触发方法
    ...mapActions(['getAdress']), // 获取位置详情
    ...mapActions(['getFoodTypes']) // 获取食品分类列表
    // this.$store.dispatch('getAdress') //相当于这个写法
  },
  mounted () {
    // 调用actions方法
    this.getAdress()
    this.getFoodTypes()
  },
  computed: {
    // abc () {
    //   return this.$store.state.adress
    // }
    // vuex辅助函数获取state的值，当一个组件需要获取多个状态的时候使用，如果都生明为计算属性会有些重复和冗余
    ...mapState([
      'adress',
      'foodtypes',
      'userInfo'
    ]),
    FoodArr () {
      // 由于接口数据是一个数组，功能是轮播一页展示八个，需将一维数组拆成二维数组
      const {foodtypes} = this
      const arr = []
      let minArr = []
      foodtypes.forEach(c => {
        // debugger
        // 如果minArr等于8，创建一个新数组
        if (minArr.length === 8) {
          minArr = []
        }
        // 如果minArr是空的，将minArr存到arr
        if (minArr.length === 0) {
          arr.push(minArr)
        }
        // 将当前分类存到minArr中
        minArr.push(c)
      })
      // console.log(arr)
      return arr
    }
  },
  // 问题是？延迟到更新页面之后执行该怎么做
  watch: { // 监听数据变化，界面更新创建swiper对象
    foodtypes () { // 数组中有数据了，在异步更新界面之前执行，首先更新状态数据然后异步更新页面
      this.$nextTick(function () { // Dom更新后，立即调用，更新数据之后写
      // eslint-disable-next-line no-unused-vars
        var mySwiper = new Swiper('.swiper-container', {
          loop: true, // 循环模式选项
          direction: 'horizontal' /* 横向滑动 */,
          autoplay: true /* 3秒自动播放 */,
          // 分页器
          pagination: {
            el: '.swiper-pagination'
          }
        })
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/mixins.styl';

.msite { // 首页
  width: 100%;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;
            text-decoration: none;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>
