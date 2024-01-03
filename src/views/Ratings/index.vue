<template>
  <cube-scroll
    class="ratingPageBox"
    :data="filterRatings"
    :options="scrollOptions"
  >
    <div class="ratingMain">
      <div class="comprehensiveRatingBox">
        <div class="gradeRatingBox">
          <p class="gradeBox">{{ seller.score }}</p>
          <p class="gradeTitle">综合评分</p>
          <p class="gradeCompare">高于周边商家{{ seller.rankRate }}%</p>
        </div>
        <div class="starRatingBox">
          <div class="serviceAttitudeBox">
            <span class="starRatingTitle">服务态度</span>
            <Star :size="36" :score="seller.serviceScore" />
            <span class="starGrade">{{ seller.serviceScore }}</span>
          </div>
          <div class="productRatingsBox">
            <span class="starRatingTitle">商品评分</span>
            <Star :size="36" :score="seller.foodScore" />
            <span class="starGrade">{{ seller.foodScore }}</span>
          </div>
          <div class="deliveryTimeBox">
            <span class="starRatingTitle">送达时间</span>
            <span class="starGrade deliveryTime"
              >{{ seller.deliveryTime }}分钟</span
            >
          </div>
        </div>
      </div>
      <Interval />
      <RatingFilter
        :desc="desc"
        :selectedType="selectedType"
        :showContent="showContent"
        :ratingsData="ratings"
        @changeSelectedType="changeSelectedTypeFn"
        @toggleShowContent="toggleShowContentFn"
        v-if="filterRatings.length"
      />
      <ul v-if="filterRatings && filterRatings.length">
        <li
          class="ratingItemBox"
          v-for="(rating, ratingIndex) of filterRatings"
          :key="ratingIndex"
        >
          <p class="ratingItemHeader">
            <img width="28" height="28" :src="rating.avatar" alt="评论者头像" />
            <span class="ratingUserBox">
              {{ rating.username }}
              <span class="starBox">
                <Star :size="24" :score="rating.score" />
                <span class="deliveryTimeText" v-show="rating.deliveryTime">
                  {{ rating.deliveryTime }}分钟送达
                </span>
              </span>
            </span>
            <span class="ratingTimeBox">{{
              rating.rateTime | formateDate
            }}</span>
          </p>
          <p class="ratingContentBox">{{ rating.text }}</p>
          <div
            class="recommendBox"
            v-show="rating.recommend && rating.recommend.length"
          >
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
            <span
              class="recommendItem"
              v-for="(recommendItem, recommendIndex) of rating.recommend"
              :key="recommendIndex"
            >
              {{ recommendItem }}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </cube-scroll>
</template>

<script>
import { getRatingsData } from '@/api/'
import ratingMixin from '@/assets/js/mixins/rating'
import Star from '@/components/Star/'
import Interval from '@/components/Interval/'
import RatingFilter from '@/components/RatingFilter/'

export default {
  name: 'PageRatings',
  mixins: [ratingMixin],
  components: {
    Star,
    Interval,
    RatingFilter
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
      ratings: [],
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      },
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '不满意'
      }
    }
  },
  computed: {
    seller () {
      return this.data.seller || {}
    }
  },
  methods: {
    async fetchData () {
      if (!this.fetched) {
        const data = await getRatingsData({
          id: this.seller.id
        })

        this.ratings = data
        this.fetched = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/mixins.styl'
@import '~@/assets/css/variable.styl'

.ratingPageBox
  background: $color-white
  height: 100%
  overflow: hidden

  .comprehensiveRatingBox
    padding: 18px 0
    overflow: hidden

    .gradeRatingBox
      font-size: 0
      display: inline-block
      width: 36%
      text-align: center
      border-right: 1px solid rgba(7, 17, 27, 0.1)

      .gradeBox
        font-size: $fontsize-large-xxx
        color: rgb(255, 153, 0)
        line-height: 28px
        font-weight: normal
        margin-bottom: 6px

      .gradeTitle
        font-size: $fontsize-small
        font-weight: normal
        color: $color-background
        line-height: 12px
        margin-bottom: 8px

      .gradeCompare
        font-size: $fontsize-small-s
        color: rgb(147, 153, 159)
        line-height: 10px
        margin-bottom: 6px
        font-weight: normal

    .starRatingBox
      display: inline-block
      width: 64%

      & > div
        margin: 8px auto 0
        font-size: 0
        width: 185px

        &:first-child
          margin-top: 0

        &:last-child
          margin-bottom: 6px

        .starRatingTitle
          font-size: $fontsize-small
          color: $color-background
          font-weight: normal
          line-height: 18px

        .starBox
          display: inline-block
          margin-left: 10px
          vertical-align: -3px

        .starGrade
          font-size: $fontsize-small
          color: rgb(255, 153, 0)
          line-height: 18px
          font-weight: normal
          margin-left: 10px

          &.deliveryTime
            color: rgb(147, 153, 159)

  .ratingItemBox
    padding: 18px

    .ratingItemHeader
      display: flex
      font-weight: normal

      img
        border-radius: 50%
        width: 28px

      .ratingUserBox
        display: flex
        flex: 1
        font-size: $fontsize-small-s
        color: $color-background
        line-height: 12px
        flex-direction: column
        margin: 0 0 6px 12px

        .starBox
          display: flex
          margin-top: 4px
          align-items: baseline

          .deliveryTimeText
            font-size: $fontsize-small-s
            font-weight: 200
            color: rgb(147, 153, 159)
            line-height: 12px
            margin-left: 6px

      .ratingTimeBox
        font-size: $fontsize-small-s
        font-weight: 200
        color: rgb(147, 153, 159)
        line-height: 12px

    .ratingContentBox
      font-size: $fontsize-small
      font-weight: normal
      color: $color-background
      line-height: 18px
      margin: 0 0 8px 40px

    .recommendBox
      margin-left: 40px

      .icon
        font-size: $fontsize-small
        line-height: 16px

        &.ratingUpIcon
          color: $color-blue

        &.ratingDownIcon
          color: rgb(147, 153, 159)

      .recommendItem
        display: inline-block
        padding: 3px 6px
        font-size: $fontsize-small-s
        color: rgb(147, 153, 159)
        line-height: 16px
        border: 1px solid rgba(7, 17, 27, 0.1)
        background: $color-white
        border-radius: 1px
        margin-left: 8px
        margin-bottom: 8px
        font-weight: normal

        &:last-child
          margin-right: 0
</style>
