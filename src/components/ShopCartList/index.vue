<template>
  <transition name="fade-popup">
    <cube-popup
      v-show="visible"
      :mask-closable="true"
      :z-index="40"
      position="bottom"
      type="shopCartList"
      @mask-click="maskClickFn"
    >
      <transition name="fold-shop-cart">
        <div class="shopCartGoodsListBox" v-show="visible">
          <div class="shopCartTitleBox border-bottom-1px">
            <h1 class="titleText">购物车</h1>
            <span class="clearShopCartBtn" @click="clearShopCartFn">清空</span>
          </div>
          <cube-scroll class="foodsListContent" ref="foodsListContent">
            <ul class="foodsListBox">
              <li
                class="shopCartFoodItemBox border-bottom-1px"
                v-for="(shopCartFoodItem, shopCartFoodIndex) of foodsList"
                :key="shopCartFoodIndex"
              >
                <span class="foodName">{{ shopCartFoodItem.name }}</span>
                <div class="priceBox">
                  <span class="priceIcon">￥</span>
                  {{ shopCartFoodItem.price * shopCartFoodItem.count }}
                </div>
                <div class="cartControlContainer">
                  <CartControl
                    :food="shopCartFoodItem"
                    @addCount="onAddCountFn"
                  />
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
import popupMixin from '@/assets/js/mixins/popup'
import CartControl from '@/components/CartControl/'

export default {
  name: 'ShopCartList',
  mixins: [popupMixin],
  components: {
    CartControl
  },
  props: {
    foodsList: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this.$on('show', () => {
      this.$nextTick(() => {
        this.$refs.foodsListContent.refresh()
      })
    })
  },
  methods: {
    maskClickFn () {
      this.hide()
    },
    clearShopCartFn () {
      this.dialogComp =
        this.dialogComp ||
        this.$createDialog({
          type: 'confirm',
          title: '清空购物车',
          content: '确定要清空购物车吗？',
          $events: {
            confirm: () => {
              this.foodsList.forEach(food => {
                food.count = 0
              })

              this.hide()
            }
          }
        })

      this.dialogComp.show()
    },
    onAddCountFn (el) {
      this.$emit('addCountFn', el)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'

.cube-shopCartList
  bottom: 46px

  &.fade-popup-enter-active,
  &.fade-popup-leave-active
    transition: all 0.3s

  &.fade-popup-enter,
  &.fade-popup-leave-to
    opacity: 0

.shopCartGoodsListBox
  position: absolute
  top: 0
  left: 0
  width: 100%
  transform: translateY(-100%)
  z-index: -1

  .shopCartTitleBox
    height: 40px
    padding: 0 18px
    background: #f3f5f7
    line-height: 40px

    .titleText
      font-size: 14px
      font-weight: 300
      color: $color-background
      float: left

    .clearShopCartBtn
      font-size: $fontsize-small
      color: $color-blue
      float: right
      font-weight: normal

  .foodsListContent
    max-height: 265px
    overflow: hidden

    .foodsListBox
      background: $color-white

      & > .shopCartFoodItemBox:last-child
        &:after
          border: none

      .shopCartFoodItemBox
        height: 48px
        padding: 12px 0
        margin: 0 18px
        position: relative

        .foodName
          color: #07111b
          font-size: $fontsize-medium
          font-weight: normal
          line-height: 24px

        .priceBox
          position: absolute
          right: 90px
          bottom: 12px
          font-size: $fontsize-medium
          font-weight: 700
          color: $color-red
          line-height: 24px

          .priceIcon
            font-size: $fontsize-small-s
            font-weight: normal

        .cartControlContainer
          position: absolute
          right: 0
          bottom: 12px

  &.fold-shop-cart-enter-active,
  &.fold-shop-cart-leave-active
    transition: all 0.3s linear

  &.fold-shop-cart-enter,
  &.fold-shop-cart-leave-to
    opacity: 0
    transform: translateY(0)
</style>
