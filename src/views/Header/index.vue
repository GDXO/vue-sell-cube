<template>
  <div class="headerBox">
    <!-- 内容 -->
    <div class="contentBox">
      <div class="avatarBox">
        <img width="64" height="64" :src="seller.avatar" alt="商品头像" />
      </div>
      <div class="content">
        <div class="titleBox">
          <i class="titleIcon"></i>
          <span class="titleText">{{ seller.name }}</span>
        </div>
        <p class="description">
          {{ seller.description }} / {{ seller.deliveryTime }}分钟送达
        </p>
        <div v-if="seller.supports" class="supportsBox">
          <SupportIco
            :iconType="seller.supports[0].type"
            :imageName="1"
            :imageWidth="12"
            :imageHeight="12"
            :marginRight="4"
          />
          <span class="supportText">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div class="supportCountBox" v-if="seller.supports" @click="showDetailFn">
        <span class="supportCount">{{ seller.supports.length }}个</span>
        <svg class="icon supportCountIcon" aria-hidden="true">
          <use xlink:href="#take-keyboard_arrow_right"></use>
        </svg>
      </div>
    </div>
    <!-- 公告 -->
    <div class="bulletinBox" @click="showDetailFn">
      <i class="bulletinIcon"></i>
      <span class="bulletinText">{{ seller.bulletin }}</span>
      <svg class="icon bulletinRightIcon" aria-hidden="true">
        <use xlink:href="#take-keyboard_arrow_right"></use>
      </svg>
    </div>
    <!-- 背景 -->
    <div class="backgroundBox">
      <img width="100%" height="100%" :src="seller.avatar" alt="背景图片" />
    </div>
  </div>
</template>

<script>
import SupportIco from '@/components/SupportIco/'

export default {
  name: 'CommonHeader',
  components: {
    SupportIco
  },
  props: {
    seller: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetailFn () {
      this.headerDetailComp =
        this.headerDetailComp ||
        this.$createHeaderDetail({
          $props: {
            seller: 'seller'
          }
        })

      this.headerDetailComp.show()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/mixins.styl'
@import '~@/assets/css/variable.styl'

.headerBox
  font-size: 0
  position: relative
  background: $color-background-ss
  overflow: hidden
  color: $color-white

  .avatarBox
    display: inline-block
    vertical-align: top

    img
      border-radius: 2px

  .contentBox
    position: relative
    padding: 24px 12px 18px 24px

    .content
      display: inline-block
      margin-left: 16px
      font-size: $fontsize-normal

      .titleBox
        margin: 2px 0 8px

        .titleIcon
          display: inline-block
          width: 30px
          height: 18px
          background: no-repeat
          vertical-align: top
          bg-image('@/assets/images/brand')
          background-size: 30px 18px

        .titleText
          margin-left: 6px
          font-size: $fontsize-large
          line-height: $fontsize-large-x
          font-weight: 600

      .description
        margin: 8px 0 10px
        font-size: $fontsize-small
        line-height: $fontsize-small

      .supportsBox
        margin-top: -4px

        .supportText
          font-size: $fontsize-small-s
          line-height: $fontsize-small

    .supportCountBox
      position: absolute
      right: 12px
      bottom: 18px
      padding: 7px 8px
      line-height: $fontsize-small
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.2)
      font-size: $fontsize-small-s
      cursor: pointer

      .supportCountIcon
        font-size: $fontsize-small-s
        margin-left: 4px

  .bulletinBox
    height: 28px
    line-height: 28px
    padding: 0 12px
    background: $color-background-sss
    cursor: pointer

    i.bulletinIcon
      display: inline-block
      width: 22px
      height: 100%
      background: no-repeat center
      bg-image('@/assets/images/bulletin')
      background-size: 22px 12px

    .bulletinText
      display: inline-block
      width: calc(100% - 55px)
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      font-size: $fontsize-small-s
      margin: 0 8px

    .bulletinRightIcon
      height: 100%
      font-size: $fontsize-small-s

  .backgroundBox
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    z-index: -1
    filter: blur(10px)
</style>
