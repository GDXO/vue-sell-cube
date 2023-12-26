<template>
  <i
    :style="cssVars"
    class="leftIcon"
    :class="`${classMap[iconType]}${imageName}`"
  ></i>
</template>

<script>
export default {
  name: 'SupportIco',
  props: {
    iconType: {
      type: Number,
      required: true,
      default: 0
    },
    imageName: {
      type: Number,
      require: true,
      default: 0
    },
    imageWidth: {
      type: Number,
      require: true,
      default: 0
    },
    imageHeight: {
      type: Number,
      require: true,
      default: 0
    },
    marginRight: {
      type: Number,
      require: true,
      default: 0
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  data () {
    return {
      classMap: []
    }
  },
  computed: {
    cssVars () {
      return {
        '--background-image-width': `${this.imageWidth}px`,
        '--background-image-height': `${this.imageHeight}px`,
        '--margin-right': `${this.marginRight}px`
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/mixins.styl'

.leftIcon
  display: inline-block
  width: var(--background-image-width)
  height: var(--background-image-height)
  background: no-repeat
  vertical-align: -3px
  margin-right: var(--margin-right)
  background-size: var(--background-image-width) var(--background-image-height)

  &.decrease1
    bg-image('@/assets/images/decrease_1')

  &.discount1
    bg-image('@/assets/images/discount_1')

  &.special1
    bg-image('@/assets/images/special_1')

  &.invoice1
    bg-image('@/assets/images/invoice_1')

  &.guarantee1
    bg-image('@/assets/images/guarantee_1')

  &.decrease2
    bg-image('@/assets/images/decrease_2')

  &.discount2
    bg-image('@/assets/images/discount_2')

  &.special2
    bg-image('@/assets/images/special_2')

  &.invoice2
    bg-image('@/assets/images/invoice_2')

  &.guarantee2
    bg-image('@/assets/images/guarantee_2')

  &.decrease3
    bg-image('@/assets/images/decrease_3')

  &.discount3
    bg-image('@/assets/images/discount_3')

  &.special3
    bg-image('@/assets/images/special_3')

  &.invoice3
    bg-image('@/assets/images/invoice_3')

  &.guarantee3
    bg-image('@/assets/images/guarantee_3')

  &.decrease4
    bg-image('@/assets/images/decrease_4')

  &.discount4
    bg-image('@/assets/images/discount_4')

  &.special4
    bg-image('@/assets/images/special_4')

  &.invoice4
    bg-image('@/assets/images/invoice_4')

  &.guarantee4
    bg-image('@/assets/images/guarantee_4')
</style>
