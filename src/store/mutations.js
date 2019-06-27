/*
* 更新state数据，通过mutation修改数据状态
* 官方推荐写法，也可以直接在mutation里写 区别在于mutation回调函数是同步 通过commit触发
* 而action是 commit mutation 不能直接更改state数据状态，是异步操作 通过dispatch触发
*/
import Vue from 'vue'
import {
  RECEIVE_ADRESS,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_LOGOUT,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  ADD_GOOD,
  REDUCE_GOOD,
  CLEAR_CART,
  SEARCH_SHOPS
} from './mutation-types'

export default {
  [RECEIVE_ADRESS] (state, {adress}) {
    state.adress = adress
  },
  [RECEIVE_FOODTYPES] (state, {foodtypes}) {
    state.foodtypes = foodtypes
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USERINFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  // getUser (state, userInfo) {
  //   state.userInfo = userInfo
  // }
  [RESET_LOGOUT] (state) {
    state.userInfo = {}
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [ADD_GOOD] (state, {good}) {
    if (!good.count) {
      Vue.set(good, 'count', 1) // good.count没值，给good 赋值count 值为1
      state.cartGood.push(good)
    } else {
      good.count++
    }
  },
  [REDUCE_GOOD] (state, {good}) {
    if (good.count) {
      good.count--
      if (good.count === 0) { // 将good从cartGood中移除
        state.cartGood.splice(state.cartGood.indexOf(good))
      }
    }
  },
  // 清空购物车
  [CLEAR_CART] (state) {
    state.cartGood.forEach(good => {
      good.count = 0
    })
    state.cartGood = []
  },
  [SEARCH_SHOPS] (state, {search}) {
    state.searchShops = search
  }
}
