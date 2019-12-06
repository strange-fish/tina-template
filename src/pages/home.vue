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
    <button bind:tap="haha">{{ num }}+{{ two }}</button>
  </view>
</template>

<script>
import { Page } from '@tinajs/tina'
import { mixStore } from '../store'

Page.define({
  mixins: [
    mixStore(({ test }) => ({
      num: test.num
    }))
  ],
  data: {
    name: ''
  },
  onLoad (options) {
  },
  methods: {
    haha (e) {
      this.$store.test.num += 2
    },
    things (e) {
    }
  }
})
</script>

<style lang="scss">
.one {
  font-size: 14px;
}
</style>
