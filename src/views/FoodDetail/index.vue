<template>
  <transition name="detail-show">
    <div v-show="visible" class="foodDetailBox">
      <cube-scroll class="pageContentBox" ref="pageContentBox">
        <div class="headerBox">
          <img :src="selectedFood.image" alt="商品详情图片" />
          <svg
            class="icon backIcon"
            aria-hidden="true"
            @click.stop="hide"
          >
            <use xlink:href="#take-arrow_lift"></use>
          </svg>
        </div>
        <div class="titleBox">
          <h2 class="foodName">{{ selectedFood.name }}</h2>
          <div class="foodExtra">
            <span>月售{{ selectedFood.sellCount }}份</span>
            <span>好评率{{ selectedFood.rating }}%</span>
          </div>
          <div class="foodPrice">
            <span>
              <span class="priceIcon">￥</span>{{ selectedFood.price }}
            </span>
            <span v-show="selectedFood.oldPrice">
              <span class="priceIcon">￥</span>{{ selectedFood.oldPrice }}
            </span>
          </div>
          <div
            class="buyBox"
            v-if="!selectedFood.count"
            @click="addFirstFoodFn"
          >
            加入购物车
          </div>
          <div class="cartControlBox" v-else>
            <CartControl
              :food="selectedFood"
              @addCount="emitParentAddCountFn"
            />
          </div>
        </div>
        <IntervalBox />
        <div class="descBox">
          <p class="descTitle">商品介绍</p>
          <p class="descText">{{ selectedFood.description }}</p>
        </div>
        <IntervalBox />
        <div class="ratingContainer">
          <div class="ratingTitle">商品评价</div>
          <RatingFilter
            :desc="desc"
            :selectedType="selectedType"
            :showContent="showContent"
            :ratingsData="selectedFood.ratings"
            @changeSelectedType="changeSelectedTypeFn"
            @toggleShowContent="toggleShowContentFn"
          />
          <div class="ratingMainBox">
            <ul v-if="ratings && ratings.length">
              <li
                class="ratingItemBox"
                v-for="(rating, ratingIndex) of ratings"
                :key="ratingIndex"
                v-show="ratingShow(rating.rateType, rating.text)"
              >
                <p class="ratingItemHeader cleanBoth">
                  <span class="ratingTime">{{
                    rating.rateTime | formateDate
                  }}</span>
                  <span class="ratingUser">
                    {{ rating.username }}
                    <img
                      width="12"
                      height="12"
                      :src="rating.avatar"
                      alt="评论者头像"
                    />
                  </span>
                </p>
                <div class="ratingContentBox">
                  <svg
                    class="icon ratingUpIcon"
                    aria-hidden="true"
                    v-if="rating.rateType === 0"
                  >
                    <use xlink:href="#take-thumb_up"></use>
                  </svg>
                  <svg class="icon ratingDownIcon" aria-hidden="true" v-else>
                    <use xlink:href="#take-thumb_down"></use>
                  </svg>
                  <span>{{ rating.text }}</span>
                </div>
              </li>
            </ul>
            <div class="noRatingBox" v-else>暂无评价内容</div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
import moment from 'moment'
import popupMixin from '@/assets/js/mixins/popup'
import CartControl from '@/components/CartControl/'
import IntervalBox from '@/components/Interval/'
import RatingFilter from '@/components/RatingFilter/'

const RATING_ALL = 2
const RATING_POSITIVE = 1
const RATING_NEGATIVE = 0

export default {
  name: 'FoodDetail',
  mixins: [popupMixin],
  components: {
    CartControl,
    IntervalBox,
    RatingFilter
  },
  props: {
    selectedFood: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  created () {
    this.$on('show', () => {
      this.$nextTick(() => {
        this.$refs.pageContentBox.refresh()
      })
    })
  },
  data () {
    return {
      visible: false,
      selectedType: RATING_ALL,
      showContent: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  computed: {
    ratings () {
      console.log(this.selectedFood.ratings)

      return this.selectedFood.ratings
    }
  },
  filters: {
    formateDate (time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
    }
  },
  methods: {
    pageShowFn () {
      this.visible = true

      // 初始化评论的数据状态
      this.selectedType = RATING_ALL
      this.showContent = false
      this.desc = {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    },
    addFirstFoodFn (evt) {
      if (!evt._constructed) return false

      this.$set(this.selectedFood, 'count', 1)

      this.$emit('addCount', evt.target)
    },
    emitParentAddCountFn (target) {
      this.$emit('addCount', target)
    },
    changeSelectedTypeFn (btnType) {
      this.selectedType = btnType
      this.$nextTick(() => {
        this.$refs.pageContentBox.refresh()
      })
    },
    toggleShowContentFn (contentType) {
      this.showContent = contentType
      this.$nextTick(() => {
        this.$refs.pageContentBox.refresh()
      })
    },
    ratingShow (type, text) {
      if (this.showContent && !text) return false
      if (this.selectedType === RATING_ALL) return true
      else if (type * 1 + 1 === RATING_POSITIVE) {
        return this.selectedType === RATING_POSITIVE
      } else if (type * 1 - 1 === RATING_NEGATIVE) {
        return this.selectedType === RATING_NEGATIVE
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/mixins.styl'
@import '~@/assets/css/variable.styl'

.foodDetailBox
  width: 100%
  background: $color-white
  position: fixed
  top: 0
  left: 0
  bottom: 46px

  .headerBox
    position: relative
    width: 100%
    height: 0
    padding-top: 100%

    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%

    .backIcon
      position: absolute
      top: 10px
      left: 10px
      font-size: 20px
      color: #fff
      padding: 6px
      border-radius: 5px
      background: #ccc

  .titleBox
    padding: 18px
    position: relative

    .foodName
      font-size: $fontsize-medium
      font-weight: 700
      color: $color-background
      line-height: 14px

    .foodExtra
      margin-top: 8px
      font-size: 0
      font-weight: normal

      & > span
        font-size: $fontsize-small-s
        color: rgb(147, 153, 159)
        line-height: 10px

        &:last-child
          margin-left: 12px

    .foodPrice
      margin-top: 18px
      font-size: 0

      & > span
        font-size: $fontsize-medium
        font-weight: 700
        color: $color-red
        line-height: 24px

        & > .priceIcon
          font-size: $fontsize-small-s
          font-weight: normal

        &:last-child
          margin-left: 12px
          font-size: $fontsize-small-s
          font-weight: 700
          color: rgb(147, 153, 159)
          text-decoration: line-through

          & > .priceIcon
            font-weight: normal

    .buyBox
      position: absolute
      right: 18px
      bottom: 18px
      padding: 6px 12px
      border-radius: 12px
      background: $color-blue
      font-size: $fontsize-small-s
      font-weight: normal
      color: $color-white
      line-height: 12px

    & > .cartControlBox
      position: absolute
      right: 18px
      bottom: 18px
      width: 72px

  .descBox
    padding: 18px

    .descTitle
      font-size: $fontsize-medium
      color: $color-background
      font-weight: 500
      line-height: 24px

    .descText
      font-size: $fontsize-small
      font-weight: 400
      color: rgb(77, 85, 93)
      line-height: 24px
      margin: 6px 8px

  .ratingContainer
    padding-top: 18px

    .ratingTitle
      font-size: $fontsize-medium
      font-weight: 500
      margin: 0 18px
      color: $color-background

    .ratingItemBox
      padding: 16px 18px

      .ratingItemHeader
        margin-bottom: 6px
        color: rgb(147, 153, 159)
        line-height: 12px
        font-size: 0
        font-weight: normal

        & > span
          font-size: $fontsize-small-s

        .ratingTime
          float: left

        .ratingUser
          float: right

          img
            border-radius: 50%
            margin-left: 6px
            vertical-align: top

      .ratingContentBox
        font-size: 0
        font-weight: normal

        .icon
          font-size: $fontsize-small
          line-height: 24px

          &.ratingUpIcon
            color: $color-blue

          &.ratingDownIcon
            color: rgb(147, 153, 159)

        & > span
          font-size: $fontsize-small
          color: $color-background
          margin-left: 4px

    .noRatingBox
      padding: 16px 18px
      font-size: $fontsize-small
      color: rgb(147, 153, 159)

  &.detail-show-enter-active,
  &.detail-show-leave-active
    transition: all 0.1s linear

  &.detail-show-enter,
  &.detail-show-leave-to
    opacity: 0;
    transform: translate3d(100%, 0, 0)
</style>
