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
    <view class="login__input-wrap">
      <input
        placeholder="验证码"
        type="text"
        class="login__input"
        bindinput="handleInput"
      />
      <view wx:if="{{counting === 0}}" class="login__resend" bindtap="sendCode">
        重新发送
      </view>
      <view wx:else class="login__resend is-disabled" bindtap="resendLater">
        {{ counting }}s
      </view>
    </view>
    <button class="login__btn" bindtap="login" disabled="{{!canLogin}}">
      登录
    </button>
  </view>
</template>

<script>
import { Page } from '@tinajs/tina'
import isMobilePhone from 'validator/lib/isMobilePhone.js'

Page.define({
  data: {
    phone: '',
    code: '',
    counting: 0,
  },
  countDownTimer: null,
  compute(data) {
    const canSendCode = isMobilePhone(data.phone)
    return {
      canLogin: /^\d{4,6}$/.test(data.code) && canSendCode,
    }
  },
  onLoad() {
    this.setData(
      {
        phone: this.$source.options.phone || '',
        counting: 60,
      },
      this.countDown
    )
  },
  methods: {
    resendLater() {
      this.$toast('请稍后再试！')
    },
    sendCode() {
      this.$loading('发送中')
      this.$http
        .post('/sendCode')
        .then(res => {})
        .catch(() => {
          this.$loading()
        })
    },
    countDown() {
      clearTimeout(this.countDownTimer)
      const counting = this.data.counting
      if (counting > 0) {
        this.countDownTimer = setTimeout(() => {
          this.setData({ counting: counting - 1 })
          this.countDown()
        }, 1000)
      }
    },
    login() {
      this.$http
        .post('/login', {
          phone: this.data.phone,
        })
        .then(res => {})
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
  &__input-wrap {
    display: flex;
    align-items: center;
    width: 288px;
    border-radius: 5px;
    background-color: #fff;
    margin: 0 auto;
  }
  &__input {
    box-sizing: border-box;
    flex: 1;
    height: 40px;
    padding-left: 18px;

    font-size: 14px;
  }
  &__resend {
    @include flex-center;
    width: 69px;
    height: 25px;
    border-left: 1px solid #888;
    font-size: 13px;
    color: $light-blue;
    &.is-disabled {
      color: #888;
    }
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
