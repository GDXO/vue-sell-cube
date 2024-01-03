<template>
  <cube-scroll
    class="sellerPageContainer"
    ref="sellerPageContainer"
    :options="scrollOptions"
  >
    <div class="sellerPageMainContainer">
      <div class="overviewBox">
        <div class="overviewTitleBox">
          <div class="sellerTitleBox">
            <span class="sellerName">{{ seller.name }}</span>
            <div class="starContainer">
              <Star :size="36" :score="seller.serviceScore" />
              <span class="ratingCountText">({{ seller.ratingCount }})</span>
              <span class="sellCountText">月售{{ seller.sellCount }}单</span>
            </div>
          </div>
          <span class="favoriteBox" @click="toggleFavoriteFn">
            <svg
              class="icon favoriteIcon"
              :class="{ active: favorite }"
              aria-hidden="true"
            >
              <use xlink:href="#take-favorite"></use>
            </svg>
            {{ favoriteText }}
          </span>
        </div>
        <div class="remarkBox">
          <p class="overviewRemarkItem">
            <span class="titleText">起送价</span>
            <span class="numberText">
              {{ seller.minPrice }}
              <span class="unitText">元</span>
            </span>
          </p>
          <p class="overviewRemarkItem">
            <span class="titleText">商家配送</span>
            <span class="numberText">
              {{ seller.deliveryPrice }}
              <span class="unitText">元</span>
            </span>
          </p>
          <p class="overviewRemarkItem">
            <span class="titleText">平均配送时间</span>
            <span class="numberText">
              {{ seller.deliveryTime }}
              <span class="unitText">分钟</span>
            </span>
          </p>
        </div>
      </div>
      <Interval />
      <div class="bulletinBox">
        <p class="bulletinTitleText">公告和活动</p>
        <p class="bulletinText">{{ seller.bulletin }}</p>
        <ul v-show="seller.supports && seller.supports.length">
          <li
            class="supportBox"
            v-for="(support, supportIndex) of seller.supports"
            :key="supportIndex"
          >
            <SupportIco
              :iconType="support.type"
              :imageName="4"
              :imageWidth="16"
              :imageHeight="16"
              :marginRight="6"
            />
            <span class="supportText">{{ support.description }}</span>
          </li>
        </ul>
      </div>
      <Interval />
      <div class="businessRealityBox">
        <p class="businessRealityText">商家实景</p>
        <cube-scroll
          class="realityContainer"
          ref="csa"
          :options="picScrollOptions"
        >
          <ul class="realityMainBox" ref="realityMainBox">
            <li
              class="realityItemBox"
              v-for="(realityItem, realityIndex) of seller.pics"
              :key="realityIndex"
            >
              <img
                width="120"
                height="90"
                :src="realityItem"
                alt="商家实景图片"
              />
            </li>
          </ul>
        </cube-scroll>
      </div>
      <Interval />
      <div class="businessInfoContainer">
        <p class="infoText">商家信息</p>
        <ul v-show="seller.infos && seller.infos.length">
          <li
            class="infoItemBox"
            v-for="(infoItem, infoIndex) of seller.infos"
            :key="infoIndex"
          >
            {{ infoItem }}
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import {
  saveDataToLocalStorage,
  readDataFromLocalStorage
} from '@/assets/js/handleStorage'
import Star from '@/components/Star/'
import Interval from '@/components/Interval/'
import SupportIco from '@/components/SupportIco/'

export default {
  name: 'PageSellers',
  components: {
    Star,
    Interval,
    SupportIco
  },
  props: {
    data: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data () {
    return {
      favorite: readDataFromLocalStorage(
        this.data.seller.id,
        'favorite',
        false
      ),
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      },
      picScrollOptions: {
        startX: 0,
        click: true,
        scrollX: true,
        scrollY: false,
        stopPropagation: true,
        eventPassthrough: 'vertical'
      }
    }
  },
  computed: {
    seller () {
      return this.data.seller || {}
    },
    favoriteText () {
      return this.favorite ? '已收藏' : '收藏'
    }
  },
  methods: {
    toggleFavoriteFn (evt) {
      if (!evt._constructed) return false

      this.favorite = !this.favorite

      saveDataToLocalStorage(this.seller.id, 'favorite', this.favorite)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/mixins.styl'
@import '~@/assets/css/variable.styl'

.sellerPageContainer
  background: $color-white
  height: 100%
  overflow: hidden

  .sellerName,
  .bulletinTitleText,
  .businessRealityText,
  .infoText
    font-size: $fontsize-medium
    color: $color-background
    line-height: 14px
    margin-bottom: 8px
    font-weight: normal

  .overviewBox
    padding: 18px

    .overviewTitleBox
      display: flex
      font-weight: normal
      padding-bottom: 18px

      .sellerTitleBox
        display: flex
        flex: 1
        flex-direction: column

        .starContainer
          display: flex
          flex-direction: row
          font-size: $fontsize-small-s
          color: rgb(77, 85, 93)
          line-height: 18px

          .ratingCountText
            margin-left: 8px

          .sellCountText
            margin-left: 12px

      .favoriteBox
        display: flex
        flex-direction: column
        align-items: flex-end
        font-size: $fontsize-small-s
        color: rgb(77, 85, 93)
        line-height: 10px
        font-weight: normal

        .favoriteIcon
          font-size: 24px
          color: #D4D6D9
          line-height: 24px
          margin-bottom: 4px

          &.active
            color: $color-red

    .remarkBox
      display: flex
      flex-wrap: nowrap
      padding-top: 18px

      .overviewRemarkItem
        display: flex
        flex: 1
        flex-direction: column
        align-items: center
        border-left: 1px solid rgba(7, 17, 27, 0.1)

        &:first-child
          border-left: none

        .titleText
          font-size: $fontsize-small-s
          color: rgb(147, 153, 159)
          line-height: 10px
          font-weight: normal
          margin-bottom: 4px

        .numberText
          font-size: $fontsize-large-xxx
          font-weight: 200
          color: $color-background
          line-height: 24px

          .unitText
            font-size: $fontsize-small-s
            font-weight: normal

  .bulletinBox
    padding: 18px 18px 0

    .bulletinText
      font-size: $fontsize-small
      font-weight: 400
      color: $color-red
      line-height: 24px
      padding: 0 12px
      padding-bottom: 16px
      white-space: pre-wrap

    .supportBox
      padding: 16px 12px

      &:last-child
        &:after
          border: none

      .supportText
        font-size: $fontsize-small
        font-weight: 200
        color: $color-background
        line-height: 16px

  .businessRealityBox
    padding: 18px

    .businessRealityText
      margin-bottom: 12px

    .realityContainer
      display: flex
      align-items: center

    .realityMainBox
      white-space: nowrap

      .realityItemBox
        display: inline-block
        width: 120px
        height: 90px
        margin-left: 6px

        &:first-child
          margin-left: 0

  .businessInfoContainer
    padding: 18px

    .infoText
      margin-bottom: 12px

    .infoItemBox
      padding: 16px 12px
      border-top: 1px solid rgba(7, 17, 27, 0.1)
      font-size: $fontsize-small
      font-weight: 300
      color: $color-background
      line-height: 16px
</style>
