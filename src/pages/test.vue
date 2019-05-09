<template>
  <view>123</view>
</template>

<script lang="ts">
import { pagify, MyPage } from '../base/'

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
