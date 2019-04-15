<config>
{
  "usingComponents": {},
  "navigationBarTitleText": "二维码"
}
</config>

<template minapp="native" xlang="wxml">
  <view class="qrcode-bg">
    <image class="qrcode" src="{{qrcode}}" />
  </view>
</template>

<script>
import { Page } from '@tinajs/tina'

Page.define({
  data: {
    qrcode: '',
  },
  onLoad() {
    this.getQrcode()
  },
  methods: {
    getQrcode() {
      this.$http.get('qrcode').then(res => {
        this.setData({
          qrcode: res.data,
        })
      })
    },
  },
})
</script>

<style lang="scss">
.qrcode-bg {
  width: 100%;
  height: 100vh;
  background-image: url(http://costacms-1254092492.cosgz.myqcloud.com/20190328113819.jpg);
  background-repeat: no-repeat;
  background-size: contain;
}
.qrcode {
  position: absolute;
  top: 292px;
  left: 50%;
  transform: translateX(-50%);

  width: 200px;
  height: 200px;
}
</style>
