<config>
{
  "usingComponents": {},
  "navigationBarTitleText": "Lead 表格"
}
</config>

<template minapp="native" xlang="wxml">
  <view class="lead-form">
    <view class="wechat-info">
      <image class="wechat-info__avatar" src="{{info.avatar}}" />
      <view class="wechat-info__name">{{ info.name }}</view>
    </view>
    <view class="detail">
      <view class="detail__title">详细信息</view>
      <view class="detail__row">
        <view class="detail__col">
          <view class="detail__item">
            <input
              class="detail__input"
              placeholder="姓名"
              bindinput="handleInput"
              date-name="name"
            />
          </view>
        </view>
        <view class="detail__col">
          <view class="detail__item">
            <picker
              class="lead-picker"
              range="{{options.gender}}"
              range-key="label"
              value="{{pickers.gender}}"
              bindchange="bindDateChange"
            >
              <view class="lead-picker__inner">
                {{ options.gender[pickers.gender].label || '性别' }}
                <image
                  class="lead-picker__arrow"
                  src="../static/gray-arrow.png"
                />
              </view>
            </picker>
          </view>
        </view>
      </view>
      <view class="detail__row">
        <view class="detail__col">
          <view class="detail__item">
            <picker
              class="lead-picker"
              range="ageList"
              range-key="label"
              value="{{date}}"
              bindchange="handleAgeChange"
            >
              <view class="lead-picker__inner">
                {{ info.age || '年龄段' }}
                <image
                  class="lead-picker__arrow"
                  src="../static/gray-arrow.png"
                />
              </view>
            </picker>
          </view>
        </view>
        <view class="detail__col">
          <view class="detail__item">
            <view class="detail__text">
              158***11
              <view class="detail__plus" bindtap="toggleExtraPhone">
                {{ showExtraPhone ? '-' : '+' }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="detail__item" wx:if="{{showExtraPhone}}">
        <input
          class="detail__input"
          value="{{info.extraPhone}}"
          bindinput="handleInput"
          data-name="extraPhone"
        />
      </view>
    </view>
    <view class="detail">
      <view class="detail__title">其他信息</view>
      <view class="detail__item" wx:for="{{otherInfoList}}">
        <picker
          class="lead-picker"
          range="{{options[item.name]}}"
          range-key="{{item.key}}"
          value="{{pickers[item.name]}}"
          bindchange="bindDateChange"
        >
          <view class="lead-picker__inner">
            {{ options[item.name][pickers[item.name]].label || item.label }}
            <image class="lead-picker__arrow" src="../static/gray-arrow.png" />
          </view>
        </picker>
      </view>
      <view class="detail__item" wx:if="{{showComment}}">
        <view class="detail__text">
          添加备注
          <view class="detail__plus" bindtap="toggleComment">
            {{ showComment ? '-' : '+' }}
          </view>
        </view>
      </view>
      <textarea
        wx:else
        class="detail__textarea"
        bindinput="handleInput"
        value="{{info.comment}}"
      />
    </view>
    <button class="submit-btn" bindtap="submitForm">
      提交
    </button>
  </view>
</template>

<script>
import { Page } from '@tinajs/tina'

Page.define({
  data: {
    info: {
      avatar:
        'http://costacms-1254092492.cosgz.myqcloud.com/20190313102711.png',
      name: 'zzp',
    },
    showExtraPhone: false,
    showComment: false,
    pickers: {
      gender: '1',
      level: '1',
      reason: '1',
      center: '1',
      location: '1',
    },
    otherInfoList: [
      { label: '学习原因', key: '', name: 'reason' },
      { label: '英语级别', key: '', name: 'level' },
      { label: '首选学校', key: '', name: 'center' },
      { label: '宣传站点', key: '', name: 'location' },
    ],
    options: {
      gender: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ],
      level: [],
      reason: [],
      center: [],
      location: [],
    },
  },
  compute(data) {
    return {}
  },
  onLoad() {},
  methods: {
    toggleExtraPhone() {
      this.setData({
        showExtraPhone: !this.data.showExtraPhone,
      })
    },
    toggleComment() {
      this.setData({
        showComment: !this.data.showComment,
      })
    },
    getPickerValues() {
      const options = this.data.options
      return Object.entries(this.data.pickers).map(([key, value]) => {
        const item = options[key][value]
        return item ? item.value : ''
      })
    },
    handlePicker(e) {
      const { value } = e.detail
      const { name } = e.currentTarget.dataset
      this.setData({
        ['pickers.' + name]: value,
      })
    },
    handleInput(e) {
      const { value } = e.detail
      const { name } = e.currentTarget.dataset
      this.setData({
        ['info.' + name]: value,
      })
    },
    submitForm() {
      const pickerValue = this.getPickerValues()
    },
  },
})
</script>

<style lang="scss">
$blue: #2182f6;
.lead-form {
  padding: 17px 28px 70px;
}
.wechat-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  &__avatar {
    @include round(60px);
    margin-right: 18px;
  }
  &__name {
    font-size: 14px;
  }
}
$item-height: 40px;
.detail {
  margin-bottom: 24px;
  &__title {
    margin-bottom: 5px;
    color: $deep-blue;
    font-size: 13px;
    font-weight: bold;
  }
  &__row {
    @include row(14px);
  }
  &__col {
    @include col(2, 14px);
  }
  &__item {
    font-size: 14px;
    height: $item-height;
    border-bottom: 1px solid #bbb;
    margin-bottom: 4px;
  }
  &__input {
    display: block;
    width: 100%;
    height: 100%;
  }
  &__text {
    display: flex;
    height: $item-height;
    align-items: center;
    color: #888;
  }
  &__plus {
    margin-left: auto;
    color: $deep-blue;
    font-size: 24px;
    line-height: 0.5;
    font-weight: bold;
  }
  &__textarea {
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 104px;
    padding: 9px 14px;
    margin-top: 30px;
    border: 1px solid #eee;

    font-size: 14px;
  }
}
.lead-picker {
  width: 100%;
  &__inner {
    display: flex;
    align-items: center;
    height: $item-height;
  }
  &__arrow {
    margin-left: auto;
    width: 17px;
    height: 20px;
    transform: rotate(90deg);
  }
}
.submit-btn {
  position: fixed;
  left: 50%;
  bottom: 51px;
  transform: translateX(-50%);
  @include flex-center();
  width: 226px;
  height: 40px;

  font-size: 14px;
  background-color: $deep-blue;
  color: #fff;
}
</style>
