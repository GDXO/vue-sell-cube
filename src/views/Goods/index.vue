<template>
  <div class="goodsContainer" ref="goodsContainer">
    <div class="scrollNavBox">
      <cube-scroll-nav
        :side="true"
        :data="goods"
        :options="scrollOptions"
        v-if="goods.length"
      >
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="props.labels"
            :txts="barTxts"
            :current="props.current"
          >
            <template slot-scope="props">
              <span class="menuText">
                <SupportIco
                  v-show="props.txt.type > 0"
                  class="menuIcon"
                  :iconType="props.txt.type"
                  :imageName="3"
                  :imageWidth="12"
                  :imageHeight="12"
                  :marginRight="2"
                />{{ props.txt.name }}
                <span class="countBox" v-show="props.txt.count">
                  <Bubble :count="props.txt.count" />
                </span>
              </span>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="goodsItem in goods"
          :key="goodsItem.name"
          :label="goodsItem.name"
          :title="goodsItem.name"
        >
          <ul>
            <li
              class="foodItemBox border-bottom-1px"
              v-for="foodItem in goodsItem.foods"
              :key="foodItem.name"
            >
              <div class="foodImgBox">
                <img
                  alt="商品单项图片"
                  width="57"
                  height="57"
                  :src="foodItem.icon"
                />
              </div>
              <div class="foodItemContent">
                <h2 class="foodName">{{ foodItem.name }}</h2>
                <p class="foodDesc">{{ foodItem.description }}</p>
                <div class="foodExtra">
                  <span>月售{{ foodItem.sellCount }}份</span>
                  <span>好评率{{ foodItem.rating }}%</span>
                </div>
                <div class="foodPrice">
                  <span>
                    <span class="priceIcon">￥</span>{{ foodItem.price }}
                  </span>
                  <span v-show="foodItem.oldPrice">
                    <span class="priceIcon">￥</span>{{ foodItem.oldPrice }}
                  </span>
                </div>
                <div class="cartControlContainer">
                  <CartControl :food="foodItem" @addCount="onAddFn" />
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <ShopCart
      :deliveryPrice="seller.deliveryPrice"
      :minDeliveryPrice="seller.minPrice"
      :foodsList="selectedFoods"
      @removeCompFn="onRemoveCompFn"
      ref="shopCart"
    />
  </div>
</template>

<script>
import { getGoodsData } from '@/api/'
import SupportIco from '@/components/SupportIco/'
import Bubble from '@/components/Bubble/'
import ShopCart from '@/components/ShopCart/'
import CartControl from '@/components/CartControl/'

export default {
  name: 'pageGoods',
  components: {
    SupportIco,
    Bubble,
    ShopCart,
    CartControl
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      goods: [],
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    seller () {
      return this.data.seller
    },
    selectedFoods () {
      const resultFoods = []
      this.goods.forEach(goodsItem => {
        goodsItem.foods.forEach(foodItem => {
          if (foodItem.count) {
            resultFoods.push(foodItem)
          }
        })
      })
      return resultFoods
    },
    barTxts () {
      const resultArr = []
      this.goods.forEach(good => {
        const { type, name, foods } = good
        let count = 0

        foods.forEach(food => {
          count += food.count || 0
        })

        resultArr.push({
          type,
          name,
          count
        })
      })

      return resultArr
    }
  },
  methods: {
    async fetchData () {
      const data = await getGoodsData()

      this.goods = data
    },
    onAddFn (el) {
      this.$refs.shopCart.dropBallFn(el)
    },
    onRemoveCompFn (el) {
      this.$refs.goodsContainer.appendChild(el)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/mixins.styl'
@import '~@/assets/css/variable.styl'

.goodsContainer
  position: relative
  text-align: left
  height: 100%

  .scrollNavBox
    position: absolute
    width: 100%
    top: 0
    left: 0
    bottom: 46px

  >>> .cube-scroll-nav-bar
    width: 80px
    white-space: normal
    overflow: hidden

  >>> .cube-scroll-nav-bar-item
    padding: 0 10px
    display: flex
    align-items: center
    height: 56px
    line-height: 14px
    font-size: $fontsize-small
    background: $color-background-ssss

    .menuText
      position: relative

      .leftIcon
        vertical-align: -1px

      .countBox
        position: absolute
        top: -10px
        left: -10px

  >>> .cube-scroll-nav-bar-item_active
    background: $color-white
    color: rgb(7, 17, 27)
    font-weight: 600

  >>> .cube-scroll-nav-panel-title
    background: $color-background-ssss
    border-left: 2px solid $color-col-line
    color: rgb(147, 153, 159)
    font-weight: 600
    font-size: 12px;
    line-height: 26px;
    padding-left: 14px;

  .foodItemBox
    display: flex
    padding: 18px 0
    margin: 0 18px

    &:last-child
      &:after
        border: none

    .foodImgBox
      width: 57px

    .foodItemContent
      flex: 1
      padding-left: 10px

      .foodName
        font-size: $fontsize-medium
        color: rgb(7, 17, 27)
        line-height: 14px
        font-weight: 400

      .foodDesc,
      .foodExtra
        font-size: $fontsize-small-s
        color: rgb(147, 153, 159)
        line-height: 10px
        margin-top: 8px

      .foodDesc
        line-height: 15px
        font-weight: normal

      .foodExtra
        & > span
          font-size: $fontsize-small-s
          font-weight: normal

          &:last-child
            margin-left: 6px

      .foodPrice
        color: #f01414
        font-size: 0
        font-weight: 700
        margin-top: 8px

        & > span
          font-size: $fontsize-medium
          line-height: 24px

          .priceIcon
            font-size: $fontsize-small-s
            font-weight: normal

          &:last-child
            margin-left: 6px
            font-size: $fontsize-small-s
            color: rgb(147, 153, 159)
            text-decoration: line-through

            .priceIcon
              font-weight: normal

      .cartControlContainer
        position: absolute
        right: 0
        bottom: 19px
</style>
