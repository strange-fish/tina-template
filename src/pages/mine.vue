<template minapp="native" xlang="wxml">
  <view>
    <view >
      {{name}}
    </view>
    <button bind:tap="turnCrazyIntoSb">
      {{name}}
    </button>
    <button bind:tap="toggleEvent">
      Turn off
    </button>
  </view>
</template>

<script>
import { Page } from '@tinajs/tina'

Page.define({
  data: {
    crazy: true,
    arr: []
  },
  onLoad () {
    this.$bus.on('hack', this.myEvent)
  },
  compute ({ crazy }) {
    return {
      name: this.$source.options.id
    }
  },
  methods: {
    myEvent (str) {
      console.log('you are a fool!', str)
    },
    turnOff () {
      this.$bus.off('hack', this.myEvent)
    }
  }
})
</script>

<style>
</style>
