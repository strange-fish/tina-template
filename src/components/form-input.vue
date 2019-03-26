<config>
{
  "component": true
}
</config>

<template xlang="wxml" minapp="native">
  <view class="form-input">
    <input bind:confirm="output" value="{{value}}" class="form-input__input"/>
    <view class="form-input__error" wx:if="{{error}}">{{error}}</view>
  </view>
</template>

<script>
import { Component } from '@tinajs/tina'

Component.define({
  data: {

  },
  methods: {
    what () {
      this.waht()
    }
  }
})
</script>

<style lang="scss">
.form-input {
  &__input {
    
  }
  &__error {
    
  }
}
</style>

