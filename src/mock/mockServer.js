/*
* mock数据
*/
import data from './data.json'
import Mock from 'mockjs'

// info信息接口
Mock.mock('/info', {code: 0, data: data.info})
// goods列表接口
Mock.mock('/goods', {code: 0, data: data.goods})
// ratings评论接口
Mock.mock('/ratings', {code: 0, data: data.ratings})
