<template>
  <view>123</view>
</template>

<script lang="ts">
import { pagify, MyPage, WxBaseEvent } from '../base/'

@pagify()
class Index extends MyPage {
  data = {
    name: 'what'
  }

  onLoad () {}

  onShow () {
  }
}

export default Index

</script>

<style lang="scss">

</style>
