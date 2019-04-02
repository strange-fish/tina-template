<config>
{
  "$schema": "https://raw.githubusercontent.com/qiu8310/minapp/master/schema/page.json",
  "navigationBarTitleText": "登录",
  "navigationStyle": "custom",
  "usingComponents": {},
}
</config>

<template minapp="native" xlang="wxml">
  <view class="login">
    <input
      placeholder="手机号码"
      type="text"
      class="login__input"
      bindinput="handleInput"
    />
    <button
      open-type="getUserInfo"
      bindgetuserinfo="getUserInfo"
      class="login__btn"
      disabled="{{!canSendCode}}"
    >
      下一步
    </button>
  </view>
</template>

<script>
import { Page } from '@tinajs/tina'
import isMobilePhone from 'validator/lib/isMobilePhone.js'

Page.define({
  data: {
    phone: '',
    hasAuthBefore: false,
  },
  compute(data) {
    return {
      canSendCode:
        /^999\d{11}/.test(data.phone) || isMobilePhone(data.phone, ['zh-CN']),
    }
  },
  onLoad() {
    this.getCode()
  },
  methods: {
    getCode() {
      wx.login({
        success: res => {
          this.$global.code = res.code
        },
      })
    },
    sendCode() {
      this.$service.getSmsCode(this.data.phone).then(res => {
        this.$navigateTo('/pages/login', {
          phone: this.data.phone,
        })
      })
    },
    getUserInfo(e) {
      this.$global.userInfo = e.detail
      this.sendCode()
    },
    handleInput(e) {
      const { value } = e.detail
      this.setData({
        phone: value,
      })
    },
  },
})
</script>

<style lang="scss">
.login {
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 288px;

  background-size: 100% 100%;
  background-image: url(http://costacms-1254092492.cosgz.myqcloud.com/20190327134415.jpg);
  &__input {
    display: flex;
    box-sizing: border-box;
    width: 288px;
    height: 40px;
    margin: 0 auto;
    padding-left: 18px;

    border-radius: 5px;
    background-color: #fff;
    font-size: 14px;
  }
  &__btn {
    width: 200px;
    height: 40px;
    margin-top: 25px;
    border-radius: 40px;
    line-height: 40px;
    color: #fff !important;
    font-size: 18px;

    background: linear-gradient(to bottom, #06b4ea, #009ee8);
    &[disabled] {
      filter: grayscale(100%);
    }
  }
}
</style>
