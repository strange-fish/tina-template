<config>
{
  "component": true
}
</config>

<template xlang="wxml" minapp="native">
  <picker
    value="{{currentIndex}}"
    bindchange="handleChange"
    range="{{range}}"
    range-key="{{rangeKey}}"
  >
    <slot />
  </picker>
</template>

<script>
import { Component } from '@tinajs/tina'

Component.define({
  externalClasses: ['picker-class'],
  properties: {
    range: {
      type: Array,
      value: () => [],
    },
    rangeKey: {
      type: String,
      value: 'value',
    },
    value: {
      type: [String, Number],
      observer(val) {
        const { rangeKey, range } = this.data
        const index = range.findIndex(item => item[rangeKey] === range)
        if (index !== -1) {
          this.setData({
            currentIndex: String(index),
          })
        }
      },
    },
  },
  data: {
    currentIndex: '-1',
  },
  methods: {
    handleChange(e) {
      const { range, rangeKey } = this.data
      const { value } = e.detail
      const item = range[index]
      if (item) {
        this.triggerEvent('change', item[rangeKey])
      }
    },
  },
})
</script>

<style lang="scss"></style>
