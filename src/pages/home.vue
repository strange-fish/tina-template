<config>
{
  "usingComponents": {
    "lead-picker": "../components/lead-picker.vue"
  },
  "navigationBarTitleText": "test"
}
</config>

<template minapp="native" xlang="wxml">
  <view>
    <my-picker />
  </view>
</template>

<script>
import { Page } from '@tinajs/tina'

Page.define({
  data: {
    name: ''
  },
  onLoad (options) {
  },
  methods: {
    haha (e) {
    }
  }
})
</script>

<style lang="less">
.one {
  font-size: 14px;
}
</style>
