<config>
{
  "usingComponents": {},
  "navigationBarTitleText": "Leads列表"
}
</config>

<template minapp="native" xlang="wxml">
  <view class="all-leads">
    <view class="all-leads__date">{{ today }}</view>
    <view class="leads">
      <view class="leads__list" wx:for="{{[1,2,3]}}">
        <view class="leads__item">
          name
          <navigator class="leads__check" url="/pages/lead-form">
            查看
          </navigator>
          <image class="leads__arrow" src="../static/gray-arrow.png" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { Page } from '@tinajs/tina'

Page.define({
  data: {
    leadList: [],
    today: '2018-12-05',
  },
  compute(data) {
    return {}
  },
  onLoad() {
    this.getLeads()
  },
  methods: {
    getLeads() {
      this.$http.get('/leads').then(res => {
        this.setData({
          leadList: res.data,
        })
      })
    },
  },
})
</script>

<style lang="scss">
.all-leads {
  padding: 25px 28px;
  &__date {
    margin-bottom: 10px;

    font-size: 15px;
    line-height: 21px;
    color: $deep-blue;
    font-weight: bold;
    font-weight: bold;
  }
}
.leads {
  &__item {
    display: flex;
    align-items: center;
    height: 44px;
    border-bottom: 1px solid #ddd;

    color: #333;
    font-size: 13px;
  }
  &__check {
    margin-left: auto;
    margin-right: 15px;
    color: #999;
    &.is-empty {
      color: $light-blue;
    }
  }
  &__arrow {
    width: 13px;
    height: 18px;
  }
}
</style>
