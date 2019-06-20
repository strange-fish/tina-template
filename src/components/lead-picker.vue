<config>
{
  "component": true
}
</config>

<template xlang="wxml" minapp="native">
  <picker
    class="lead-picker"
    range="{{range}}"
    range-key="{{rangeKey}}"
    value="{{currentIndex}}"
    bindchange="handlePicker"
    data-name="{{name}}"
  >
    <view class="lead-picker__inner">
      <block wx:if="{{range[currentIndex]}}">
        {{ range[currentIndex][rangeKey] }}
      </block>
      <view wx:else class="lead-picker__label {{error ? 'is-error' : ''}}">
        {{ placeholder }}
      </view>
      <!-- 没办法图片要静态分析 -->
      <image
        wx:if="{{error}}"
        class="lead-picker__arrow"
        src="../static/red-arrow.png"
      />
      <image
        wx:else
        class="lead-picker__arrow"
        src="../static/gray-arrow.png"
      />
    </view>
  </picker>
</template>

<script>
import { Component } from '@tinajs/tina'

Component.define({
  pageLifetimes: {
    show () {
      console.log('pageLifetimes -- show')
    }
  },
  properties: {
    range: {
      type: Array,
      value: () => []
    },
    rangeKey: {
      type: String,
      value: 'label'
    },
    value: {
      type: [String, Number],
      value: '-1',
      observer (val) {
        const index = this.data.range.findIndex(item => item.value === val)
        this.setData({
          currentIndex: String(index)
        })
      }
    },
    error: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: ''
    }
  },
  data: {
    currentIndex: '-1'
  },
  methods: {
    handlePicker (e) {
      const item = this.data.range[e.detail.value]
      this.triggerEvent('change', {
        value: item.value
      })
    }
  }
})
</script>

<style lang="scss">
$item-height: 40px;
.lead-picker {
  width: 100%;
  color: $light-blue;
  &__inner {
    display: flex;
    align-items: center;
    height: $item-height;
  }
  &__label {
    color: #333;
    &.is-error {
      color: $red;
    }
  }
  &__arrow {
    margin-left: auto;
    width: 17px;
    height: 20px;
    transform: rotate(90deg);
  }
}
</style>
