import Vue from 'vue'
// import moment from 'moment' // 日期处理类库  moment库太大优化项目引用 date-fns 轻量级的
import format from 'date-fns/format'
// 自定义过滤器---日期格式化
Vue.filter('dataDate', function (value, formatStr = 'YYYY-MM-DD HH:mm:ss') {
  // return moment(value).format(formatStr)
  return format(value, formatStr)
})
