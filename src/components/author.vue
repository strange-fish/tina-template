<config>
{
  "component": true
}
</config>

<template xlang="wxml" minapp="native">
  <view>
    <slot></slot>
  </view>
</template>

<script>
import { Component } from '@tinajs/tina'

Component.define({
  data: {
  },
  methods: {
    handleChange (e) {
    }
  }
})
</script>

<style lang="scss">

</style>

