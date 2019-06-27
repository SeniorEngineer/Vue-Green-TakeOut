/*
* 通过mutation间接更新state
* 利用commit提交mutation,异步请求接口
*/
// 引入mutatino-types常量名
import {
  RECEIVE_ADRESS,
  RECEIVE_FOODTYPES,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RESET_LOGOUT,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  ADD_GOOD,
  REDUCE_GOOD,
  CLEAR_CART,
  SEARCH_SHOPS
} from './mutation-types'
// 引入接口
import {
  reqAdress,
  reqFoodTypes,
  reqShops,
  reqCookie,
  reqExit,
  reqShopGoods,
  reqShopInfo,
  reqShopRatings,
  reqLists
} from '../api'

export default {
  // 异步获取地址
  async getAdress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude // 在state默认参数
    // 发送异步ajax请求
    const result = await reqAdress(geohash)
    // 提交mutation
    if (result.code === 0) {
      const adress = result.data
      commit(RECEIVE_ADRESS, {adress})
    }
  },
  // 异步获取食品分类列表
  async getFoodTypes ({commit}) {
    const result = await reqFoodTypes()
    if (result.code === 0) {
      const foodtypes = result.data
      commit(RECEIVE_FOODTYPES, {foodtypes})
    }
  },
  // 异步获取商家列表
  async getShops ({commit, state}) {
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
    }
  },
  // 获取用户信息
  getUser ({commit}, userInfo) {
    commit(RECEIVE_USERINFO, {userInfo})
  },
  // 根据会话获取用户信息
  async userInfoSession ({commit}) {
    const result = await reqCookie()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USERINFO, {userInfo})
    }
  },
  // 清空用户信息
  async loginOut ({commit}) {
    const result = await reqExit()
    if (result.code === 0) {
      commit(RESET_LOGOUT)
    }
  },
  // 商家信息
  async bizInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },
  // 商家评论
  async bizRatings ({commit}, fn) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      fn && fn() // 数据更新后执行回调函数
    }
  },
  // 商家商品
  async bizGoods ({commit}, fn) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      fn && fn() // 数据更新后执行回调函数
    }
  },
  // 判断增加或减少购物车数量
  alterCount ({commit}, {isCount, good}) {
    if (isCount) {
      commit(ADD_GOOD, {good})
    } else {
      commit(REDUCE_GOOD, {good})
    }
  },
  clearCart ({commit}) {
    commit(CLEAR_CART)
  },
  async searchShops ({commit, state}, keyword) {
    const geohash = state.latitude + ',' + state.longitude // 在state默认参数
    const result = await reqLists(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(SEARCH_SHOPS, {searchShops})
    }
  }
}
