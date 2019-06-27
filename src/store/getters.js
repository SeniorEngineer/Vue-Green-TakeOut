/*
* 基于state的getter计算属性
*/
export default{
  // 数量
  totalCount (state) {
    return state.cartGood.reduce((prevTotal, good) => prevTotal + good.count, 0)
  },
  // 价格
  totalPrice (state) {
    return state.cartGood.reduce((prevTotal, good) => prevTotal + good.count * good.price, 0)
  },
  positiveSize (state) {
    return state.ratings.reduce((prevTotal, rating) => prevTotal + (rating.rateType === 0 ? 1 : 0), 0)
  }
}
