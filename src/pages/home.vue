<config>
{
  "usingComponents": {
    "author": "../components/author.vue",
    "form-input": "../components/form-input.vue"
  }
}
</config>

<template minapp="native" xlang="wxml">
  <view class="home">
    <form-input
      wx:for="{{arr}}"
      bind:output="handleChange"
      data-id="{{item.id}}"
      value="{{item.value}}"
      error="{{item.error}}">
    </form-input>
    <view class="wrap">
      <button bind:tap="goToMine" class="home__btn">
        Mine
      </button>
    </view>
  </view>
</template>

<script>
import { Page } from '@tinajs/tina'

Page.define({
  data: {
    name: 'what nam',
    fixed: true,
    width: 450,
    arr: [
      { id: 1, value: 1, error: '' },
      { id: 2, value: 1, error: '' },
      { id: 3, value: 1, error: '' }
    ],
  },
  onLoad () {
    this.$http.get(`/what`).then((res) => {
      const data = res.data
    })
    this.scroll()
  },
  methods: {
    scroll (what) {
      wx.createIntersectionObserver().relativeToViewport({top: 0}).observe('.wrap', (res) => {
        this.setData({ fixed: !this.data.fixed })
      })
    },
    goToMine () {
      this.$navigateTo('/pages/mine', {
        id: '123'
      })
    },
    handleChange (e) {
      const { value } = e.detail
      this.setData({ name: value })
    },
    handleClick () {
      console.log(' what the hack')
    },
    haha () {
      this.triggerEvent('evnet', { what: 'trfe'})
    }
  }
})
</script>

<style lang="scss">
.home {
  padding-top: 200px;
  min-height: 200vh;
  position: relative;
}
.wrap {
  height: 50px;
}
.home__btn {
  width: 100%;
}
.home__btn.fixed {
  position: fixed;
  top: 0px;
}

.what {
  font-size: 14px;
}
</style>




