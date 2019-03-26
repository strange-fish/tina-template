<config>
{
  "usingComponents": "../components/author.vue"
}
</config>

<template minapp="native" xlang="wxml">
  <view>
  </view>
</template>

<script>
import { Page } from '@tinajs/tina'

Page.define({
  data: {
  },
  compute (data) {
    return {
      name: data ? 'what' : 'how'
    }
  },
  onLoad () {
  },
  methods: {
  }
})
</script>

<style lang="scss">
</style>
