<template>
  <transition name="fade">
    <div v-show="visible" class="detailBox">
      <div class="detailContentBox cleanBoth">
        <div class="detailMainBox">
          <h1 class="detailName">{{ seller.name }}</h1>
          <Star :size="48" :score="seller.score" />
          <div class="subTitleBox">
            <div class="line"></div>
            <div class="titleText">优惠信息</div>
            <div class="line"></div>
          </div>
          <!-- 优惠信息 -->
          <ul class="specialOffersBox">
            <li
              class="specialOffersItem"
              v-for="(support, index) of seller.supports"
              :key="index"
            >
              <SupportIco
                :iconType="support.type"
                :imageName="2"
                :imageWidth="16"
                :imageHeight="16"
                :marginRight="6"
              />
              <span class="supportText">{{ support.description }}</span>
            </li>
          </ul>
          <div class="subTitleBox">
            <div class="line"></div>
            <div class="titleText">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="businessAnnouncements">{{ seller.bulletin }}</div>
        </div>
      </div>
      <div class="detailCloseBox">
        <svg class="icon" aria-hidden="true" @click="hide">
          <use xlink:href="#take-close"></use>
        </svg>
      </div>
    </div>
  </transition>
</template>

<script>
import popupMixin from '@/assets/js/mixins/popup'
import SupportIco from '@/components/SupportIco/'
import Star from '@/components/Star/'

export default {
  name: 'HeaderDetail',
  mixins: [popupMixin],
  components: {
    SupportIco,
    Star
  },
  props: {
    seller: {
      type: Object,
      required: true,
      default: () => ({})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/mixins.styl'
@import '~@/assets/css/variable.styl'

.detailBox
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 100
  overflow-x: hidden
  overflow-y: auto
  background: rgba(7, 17, 27, 0.7)
  backdrop-filter: blur(10px)
  color: $color-white

  &.fade-enter-active,
  &.fade-leave-active
    transition: all 0.5s

  &.fade-enter,
  &.fade-leave-to
    opacity: 0;
    background: rgba(7, 17, 27, 0);

  .detailContentBox
    min-height: 100%

    .detailMainBox
      padding-top: 64px
      padding-bottom: 64px
      font-size: 32px
      text-align: center

      .detailName
        font-size: $fontsize-large
        line-height: 16px
        font-weight: 700
        margin-bottom: 16px

      .subTitleBox
        display: flex
        width: 80%
        margin: 28px auto 24px

        .line
          flex: 1
          background: rgba(255, 255, 255, 0.2)
          height: 1px
          align-self: center

        .titleText
          font-size: $fontsize-medium
          line-height: 14px
          font-weight: 700
          padding: 0 12px

      .specialOffersItem
        text-align: left
        padding: 0 calc(10% + 12px)
        height: 16px
        line-height: 18px
        margin-bottom: 12px
        font-size: $fontsize-large

        .supportText
          font-size: $fontsize-small
          font-weight: 200
          line-height: 12px

      .businessAnnouncements
        font-size: $fontsize-small
        font-weight: 200
        line-height: 24px
        padding: 0 calc(10% + 12px)
        text-align: left

  .detailCloseBox
    width: 32px
    height: 64px
    color: rgba(255, 255, 255, 0.5)
    margin: -64px auto 0
    clear: both
    font-size: 32px
</style>
