<config>
{
  "usingComponents": {},
  "navigationBarTitleText": "EF"
}
</config>

<template minapp="native" xlang="wxml">
  <view class="home">
    <view class="home__header">
      <view class="home__logout" bindtap="logout">退出登录</view>
      <view class="home__month">十二月目标</view>
    </view>

    <view class="board">
      <view class="board__bar-bg" style="transform: rotate(-{{angle}}deg);">
        <view class="board__bar" style="border-color: {{barColor}};" />
      </view>
      <image src="../static/ring.png" class="board__ring" />

      <view class="board__content">
        <view class="board__num">{{ mark }}/{{ total }}</view>
        <view class="board__text">{{ barText }}</view>
      </view>
    </view>

    <view class="mark">
      <view class="mark__item">
        <view class="mark__num">10</view>
        <view class="mark__desc">Show</view>
      </view>
      <view class="mark__item">
        <view class="mark__num">23</view>
        <view class="mark__desc">Close</view>
      </view>
      <view class="mark__item">
        <view class="mark__num">¥3,400</view>
        <view class="mark__desc">Gross Revenue</view>
      </view>
    </view>

    <view class="leads">
      <view class="leads__title">
        今日Leads
        <navigator class="leads__all" bindtap="goToAll" url="/pages/all-leads">
          查看全部
        </navigator>
      </view>
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

    <button class="qrcode-btn" bindtap="goToQrcode">
      我的二维码
    </button>
  </view>
</template>

<script>
import { Page } from '@tinajs/tina'

Page.define({
  data: {
    mark: 80,
    total: 100,
    hasInit: false,
  },
  onLoad() {
    this.$loading('验证中')
    this.$service
      .precheck()
      .then(res => {
        this.setData({ hasInit: true })
        this.initData()
      })
      .finally(() => {
        this.$loading()
      })
  },
  onShow() {
    if (this.data.hasInit) {
      this.initData()
    }
  },
  compute(data) {
    const [color, text] = this.getColorAndText(data.mark)
    const percent = 1 - data.mark / data.total
    return {
      barColor: color,
      barText: text,
      angle: percent < 0 ? 0 : percent * 180,
    }
  },
  methods: {
    initData() {
      this.$toast('加载中')
    },
    // setMark(mark, step = 0) {
    //   const steps = [0.05, 0.1, 0.2, 0.35, 0.5, 0.6, 0.8, 1]

    //   if (step < steps.length) {
    //     const nextStep = steps[step]
    //     this.setData({
    //       mark: Math.round(mark * nextStep),
    //     })
    //     setTimeout(() => {
    //       this.setMark(mark, step + 1)
    //     }, 150)
    //   }
    // },
    getColorAndText(mark = 0) {
      if (mark <= 10) {
        return ['#ff5500', '初出茅庐']
      } else if (mark <= 30) {
        return ['#ffc033', '略有小成']
      } else if (mark <= 60) {
        return ['#ffec09', '卓乎不群']
      } else if (mark <= 90) {
        return ['#9ce30c', '罕有敌手']
      } else {
        return ['#34bd03', '一代宗师']
      }
    },
    logout() {
      this.$http.post('/logout').then(res => {
        this.$reLaunch('/pages/login')
      })
    },
    goToQrcode() {
      this.$navigateTo('/pages/qrcode')
    },
  },
})
</script>

<style lang="scss">
.home {
  &__header {
    position: relative;
    margin: 22px 20px 0;
    color: $deep-blue;
  }
  &__logout {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    @include flex-center;
    width: 51px;
    height: 18px;

    font-size: 10px;
    border-radius: 18px;
    background-color: #ddd;
  }
  &__month {
    color: $deep-blue;
    text-align: center;
  }
}

.bonus {
}

.board {
  position: relative;
  $ring: 242px;
  $radius: 28px;

  width: $ring;
  height: $ring / 2;
  margin: 20px auto 16px;
  overflow: hidden;
  &__bar-bg {
    position: relative;
    box-sizing: border-box;
    width: $ring;
    height: $ring;
    border-radius: $ring;
    border: $radius solid #eee;
    transform: rotate(-180deg);
    transition: transform 1s ease-in-out;
  }
  &__ring {
    position: absolute;
    top: 0;
    left: 0;

    width: $ring;
    height: $ring / 2;
    opacity: 0.7;
    z-index: 1;
  }
  &__bar {
    position: absolute;
    top: -$radius;
    left: -$radius;

    box-sizing: border-box;
    width: $ring;
    height: $ring / 2;
    background-color: transparent;
    border-top-right-radius: $ring / 2;
    border-top-left-radius: $ring / 2;
    display: inline-block;
    border-left: $radius solid transparent;
    border-right: $radius solid transparent;
    border-top: $radius solid transparent;
  }
  &__content {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);

    text-align: center;
    font-weight: bold;
  }
  &__num {
    margin-bottom: 4px;

    color: $deep-blue;
    font-size: 27px;
    line-height: 30px;
  }
  &__text {
    font-size: 16px;
    color: $deep-blue;
    // font-size: 12px;
    // color: #888;
  }
}

.mark {
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  margin-bottom: 24px;
  &__item {
    text-align: center;
    font-weight: bold;
  }
  &__num {
    margin-bottom: 2px;
    color: $deep-blue;
    font-size: 23px;
    line-height: 26px;
  }
  &__desc {
    color: #777;
    font-size: 13px;
    line-height: 18px;
  }
}

.leads {
  padding: 0 28px;
  &__title {
    display: flex;
    align-items: center;
    height: 22px;
    margin-bottom: 5px;

    font-weight: bold;
    font-size: 13px;
    color: $deep-blue;
  }
  &__all {
    margin-left: auto;
    font-size: 11px;
    color: #999;
  }
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

.qrcode-btn {
  @include flex-center();
  width: 226px;
  height: 40px;
  margin-top: 22px;

  font-size: 14px;
  background-color: $deep-blue;
  color: #fff;
}
</style>
