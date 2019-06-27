<!-- 信息 -->
<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <!-- current -->
          <li class="menu-item" @click="menuItem(index)" :class="{current:index === currentIndex}" style="pointer-events: auto;" v-for="(item,index) in goods" :key="index">
            <span class="text bottom-border-1px">
              <img :src="item.icon" class="icon" v-if="item.icon">
              <!--通过v-if判断icon是否有值，如果有就显示，没有就消失 -->
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="ulLi">
          <li class="food-list-hook" style="pointer-events: auto;" v-for="(item,index) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="toggleShow(good)" class="food-item bottom-border-1px" v-for="(good,index) in item.foods" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="good.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{good.name}}</h2>
                  <p class="desc">{{good.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{good.sellCount}}份</span>
                    <span>好评率{{good.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{good.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                      <CartControl :good="good"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :good="food" ref="toggle"/>
  </div>
</template>

<script>
import Food from '../../../components/CartContol/food'
import ShopCart from '../../../components/CartContol/ShopCart'
import CartControl from '../../../components/CartContol/CartContol'
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
export default {
  components: {
    CartControl,
    Food,
    ShopCart
  },
  data () {
    return {
      scrolly: 0, // 右侧滑动的y轴坐标，滑动过程实时变化
      tops: [], // 右侧分类li组成的数据
      food: {} // 当前food数据
    }
  },
  mounted () {
    this.$store.dispatch('bizGoods', () => { // 第二个参数，数据更新后执行回调函数
      this.$nextTick(() => { // dom数据更新之后执行
        this._initScroll()
        this._initTops()
      })
    })
  },
  computed: {
    ...mapState(['goods']),
    // 计算当前分类的下标
    currentIndex () {
      const {scrolly, tops} = this
      // 根据条件数据产生一个结果
      const index = tops.findIndex((ele, index) => {
        return scrolly >= ele && scrolly < tops[index + 1]
      })
      return index
    }
  },
  methods: {
    // 点击当前li显示对应的详情food
    toggleShow (good) {
      // 更新food，给food传值
      this.food = good
      // 显示food，（父组件调用子组件的方法 通过$refs）
      this.$refs.toggle.toggleShow()
      console.log(this.$refs)
    },
    // 初始化滚动
    _initScroll () {
      // 滚动效果参考better-scroll  API
      // eslint-disable-next-line no-new
      new BScroll('.menu-wrapper', {
        click: true
      })
      // 执行滚动插件
      this.foodScroll = new BScroll('.foods-wrapper', {probeType: 2, click: true})
      this.foodScroll.on('scroll', ({x, y}) => {
        // 获取绝对值
        this.scrolly = Math.abs(y)
      })
      this.foodScroll.on('scrollEnd', ({x, y}) => {
        this.scrolly = Math.abs(y)
      })
    },
    // 初始化tops
    _initTops () {
      // 定义一个空数组存数据
      const topArray = []
      let top = 0 // 初始值从0开始
      topArray.push(top)
      // 找到所有分类的li
      const lis = this.$refs.ulLi.getElementsByClassName('food-list-hook')
      // 把lis伪数组转换成数组遍历追加top
      Array.prototype.slice.call(lis).forEach(li => {
        top += li.clientHeight
        topArray.push(top)
      })
      // 更新tops数据
      this.tops = topArray
    },
    // 点击左侧li滑动到右侧对应的li
    menuItem (index) {
      // 得到目标位置的scrolly
      const scrolly = this.tops[index]
      // 立即更新scrolly让点击的li变成当前li
      this.scrolly = scrolly
      // 滑动右侧列表
      this.foodScroll.scrollTo(0, -scrolly, 300)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 194px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));
      &:last-child {
        border-none();
        margin-bottom: 0;
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>
