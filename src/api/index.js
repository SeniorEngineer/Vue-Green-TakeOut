// n个接口请求函数的模块，函数的返回值promise对象
import ajax from './axios'
// 配置跨域路径
const BASE_URL = '/api'
// 1、根据经纬度获取位置详情
// export const reqAdress = function (geohash) {
//   ajax(`/position/${geohash}`)
// }

export const reqAdress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodTypes = () => ajax(`${BASE_URL}/index_category`)
// 3、根据经纬度获取商铺列表
export const reqShops = (longitude, latitude) => ajax(`${BASE_URL}/shops`, {latitude, longitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqLists = (geohash, keyword) => ajax(`${BASE_URL}/search_shops`, {geohash, keyword})
// 5、用户名密码登陆
export const reqLogin = ({name, pwd, captcha}) => ajax(`${BASE_URL}/login_pwd`, {captcha, pwd, name}, 'POST')
// 6、发送短信验证码
export const reqNote = (phone) => ajax(`${BASE_URL}/sendcode`, {phone})
// 7、手机号验证码登陆
export const reqIphone = (phone, code) => ajax(`${BASE_URL}/login_sms`, { phone, code }, 'POST')
// 8、根据会话获取用户信息
export const reqCookie = () => ajax(`${BASE_URL}/userinfo`)
// 9、用户登出
export const reqExit = () => ajax(`${BASE_URL}/logout`)

/*
 * mock模拟数据
*/
// 1、获取商家信息
export const reqShopInfo = () => ajax('/info')
// 2、获取商家评价
export const reqShopRatings = () => ajax('/ratings')
// 3、获取商家商品
export const reqShopGoods = () => ajax('/goods')
