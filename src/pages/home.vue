<config>
{
  "usingComponents": {
    "my-picker": "../components/lead-picker.vue"
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

<style lang="scss"></style>
