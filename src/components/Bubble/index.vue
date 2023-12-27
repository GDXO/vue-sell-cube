<template>
  <span class="bubbleBox">
    {{ count }}
  </span>
</template>

<script>
export default {
  name: 'CommonBubble',
  props: {
    count: {
      type: Number
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~@/assets/css/variable.styl'

.bubbleBox
  display: inline-block
  padding: 0 5px
  height: 16px
  line-height: 16px
  text-align: center
  border-radius: 50%
  font-family: Helvetica
  font-weight: 700
  font-size: $fontsize-small-s
  color: $color-white
  background: linear-gradient(to right, $color-orange, $color-red)
</style>
