<!-- 登录页面 -->
<template>
  <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">绿色外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on: loginWay}" @click="loginWay = true">短信登录</a>
            <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay = false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form @submit.prevent='login'>
            <div :class="{on:loginWay}">
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <!-- phoneBlack为false显示disabled 为true消失 .prevent阻止浏览器默认行为 -->
                <button :disabled="!phoneBlack" @click.prevent="getCode" class="get_verification" :class="{phone_black:phoneBlack}" >
                  {{numTime>0?`已发送${numTime}s`:'获取验证码'}}
                </button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册绿色外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!loginWay}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input :type="showPwd?'text':'password'" maxlength="8" placeholder="密码" v-model="pwd">
                  <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text"></span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img class="get_verification" :src="imgCode" alt="captcha" @click="btnImage">
                </section>
              </section>
            </div>
            <button class="login_submit" :disabled='!loginColor' :class="{loginColor:!loginColor}">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
      <MessageForm v-show="showMessage" :alertText="alertText" @closeMessage="closeMessage"/>
  </section>
</template>

<script>

// 引入接口
import {reqNote, reqIphone, reqLogin} from '../../api'
// 引入message 提示框组件
import MessageForm from '../../components/MessageForm/MessageForm'
export default {
  components: {
    MessageForm
  },
  data () {
    return {
      loginWay: true, // 登录状态 true短信登录 false密码登录
      phone: '', // 手机号
      numTime: 0, // 计时器初始值
      pwd: '', // 密码
      showPwd: false, // 是否显示密码
      showMessage: false, // 显示公共组件提示框
      alertText: '', // 提示框文案
      code: '', // 短信验证码
      captcha: '', // 图形验证码
      name: '', // 用户名
      imgCode: 'http://localhost:3000/captcha' // 图形验证码地址
    }
  },
  computed: {
    // 判断是否为空显示登录背景颜色和登录是否可以点击
    loginColor () {
      if (this.loginWay) {
        return this.phone !== '' || this.code !== ''
      } else {
        return this.pwd !== '' || this.captcha !== '' || this.name !== ''
      }
    },
    // 验证手机号改变获取验证码颜色，增加类名
    phoneBlack () {
      const phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      return phoneReg.test(this.phone)
    }
  },
  methods: {
    // 获取短信验证码
    async getCode () {
      // 如果numtime等于0才执行
      if (this.numTime === 0) {
        this.numTime = 30
        // 启动计时器
        const timer = setInterval(() => {
          this.numTime--
          if (this.numTime === 0) {
            clearInterval(timer)
          }
        }, 1000)
        // 发送ajax请求（向指定手机号发送验证码）
        const result = await reqNote(this.phone) // 利用async await 异步请求接口
        // console.log(result)
        if (result.code === 0) {
          this.message('短信已发送，请您注意查收哦～')
        } else if (result.code === 1) {
          // 显示提示
          this.message(result.msg)
          // 停止计时
          if (this.numTime) { // this,numTime 为true就是大于0的意思
            this.numTime = 0
            clearInterval(this.timer)
          }
        }
      }
    },
    // 封装个调用messageform方法
    message (text) {
      this.alertText = text
      this.showMessage = true
    },
    // 关闭提示框,通过自定义方法获取
    closeMessage () {
      this.showMessage = false
    },
    // form表单验证 登录
    async login () {
      let result
      if (this.loginWay) { // 短信登录
        const {phone, code, phoneBlack} = this
        if (!phone) {
          this.message('请输入手机号~')
        } else if (!phoneBlack) {
          this.message('请输入正确的手机号~')
        } else if (!code) {
          this.message('请输入验证码~')
        }
        // 发送ajax登录请求 手机号验证码的接口
        result = await reqIphone(phone, code)
      } else { // 密码登录
        const {name, pwd, captcha} = this
        if (!name) {
          this.message('请输入用户名~')
        } else if (!pwd) {
          this.message('请输入密码~')
        } else if (!captcha) {
          this.message('请输入图形验证码~')
        }
        // 发送ajax登录请求 用户名密码的接口
        result = await reqLogin({name, pwd, captcha})
      }
      // 无论成功或失败都需停止计时器
      if (this.numTime) {
        this.numTime = 0
        clearInterval(this.timer)
      }
      if (result.code === 0) { // 成功
        // 将请求的数据保存到vuex state中
        const user = result.data
        this.$store.dispatch('getUser', user)
        // 路由跳转页面
        this.$router.replace('/deploy/profile')
      } else { // 失败
        this.message(result.msg)
        this.btnImage()
      }
    },
    // 切换图形验证码由于地址相同切换不变需拼接一个随机数解决这个问题
    btnImage () {
      this.imgCode = 'http://localhost:3000/captcha?timer=' + Date.now()
      // evevt.target.src = this.imgCode + '?timer=' + Date.now() 也可以用这种写法
    }
  }
}

</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/mixins.styl';
@import '../../assets/stylus/login.styl';
</style>
