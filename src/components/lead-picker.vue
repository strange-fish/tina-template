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
    value="{{value}}"
    bindchange="handlePicker"
    data-name="{{name}}"
  >
    <view class="lead-picker__inner">
      <block wx:if="{{range[value]}}">
        {{ range[value][rangeKey] }}
      </block>
      <view wx:else class="lead-picker__label {{error ? 'is-error' : ''}}">
        {{ placeholder }}
      </view>

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
  properties: {
    range: {
      type: Array,
      value: () => [],
    },
    rangeKey: {
      type: String,
      value: 'label',
    },
    value: {
      type: [String, Number],
      value: '-1',
    },
    error: {
      type: String,
      value: '',
    },
    name: {
      type: String,
      value: '',
    },
    placeholder: {
      type: String,
      value: '',
    },
  },
  data: {},

  methods: {
    handlePicker(e) {
      this.triggerEvent('change', {
        value: e.detail.value,
        name: this.data.name,
      })
    },
  },
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
