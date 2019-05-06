<template>
  <view>123</view>
</template>

<script lang="ts">
import { pagify } from '@minapp/core'
import { MyPage } from '../base/MyPage'

@pagify()
class Test extends MyPage {
  data = {
    name: 'zzp'
  }
}

export default Test

</script>

<style>

</style>
