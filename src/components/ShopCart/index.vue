<template>
  <div class="shopCartWrapper" ref="shopCartWrapper">
    <div
      class="shopCartBox"
      :style="{ width: getClientWidth }"
      @click.stop="toggleShopCartListFn"
    >
      <div class="leftBox">
        <div class="logoContainer">
          <div class="logoBox" :class="{ haveFood: totalCount > 0 }">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#take-shopping_cart"></use>
            </svg>
          </div>
          <div class="shopCountBox" v-show="totalCount > 0">
            <Bubble :count="totalCount" />
          </div>
        </div>
        <div class="priceBox" :class="{ haveFood: totalCount > 0 }">
          ￥{{ totalPrice }}
        </div>
        <div class="priceDescBox">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <div class="rightBox" :class="rightStatusClass" @click="payFn">
        {{ rightStatusHTML }}
      </div>
    </div>
    <div class="ballContainer">
      <div v-for="(ball, ballIndex) of balls" :key="ballIndex">
        <transition
          @before-enter="beforeDrop"
          @enter="dropping"
          @after-enter="afterDrop"
        >
          <div class="ballItem" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Bubble from '@/components/Bubble/'

const BALL_NUMBER = 10
const createBalls = () => {
  const result = []
  for (let i = 0; i < BALL_NUMBER; i++) {
    result.push({
      show: false
    })
  }

  return result
}

export default {
  name: 'ShopCart',
  components: {
    Bubble
  },
  props: {
    deliveryPrice: {
      type: Number,
      required: true,
      default: 0
    },
    minDeliveryPrice: {
      type: Number,
      required: true,
      default: 0
    },
    foodsList: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  created () {
    this.dropBalls = []
    this.shopCartListFold = true
  },
  data () {
    return {
      balls: createBalls(),
      dropBall: []
    }
  },
  computed: {
    getClientWidth () {
      return `${document.documentElement.clientWidth}px`
    },
    totalPrice () {
      let totalPrice = 0
      this.foodsList.forEach(food => {
        totalPrice += food.price * food.count
      })

      return totalPrice
    },
    totalCount () {
      let totalCount = 0
      this.foodsList.forEach(food => {
        totalCount += food.count
      })

      return totalCount
    },
    rightStatusHTML () {
      if (this.totalPrice === 0) return `￥${this.minDeliveryPrice}起送`
      else if (this.totalPrice > 0 && this.totalPrice < this.minDeliveryPrice) {
        return `还差￥${this.minDeliveryPrice - this.totalPrice}元起送`
      } else return '去结算'
    },
    rightStatusClass () {
      if (this.totalPrice < this.minDeliveryPrice) return 'initRightBox'
      else return 'finalRightBox'
    }
  },
  watch: {
    totalCount (newCount) {
      if (!this.shopCartListFold && newCount === 0) this._hideShopCartList()
    }
  },
  methods: {
    dropBallFn (el) {
      this.balls.forEach(ball => {
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
        }
      })
    },
    beforeDrop (el) {
      const ball = this.dropBalls[this.dropBalls.length - 1]
      const rect = ball.el.getBoundingClientRect()
      const x = rect.left - 32
      const y = -(window.innerHeight - rect.top - 22)

      el.style.display = 'inline-block'
      el.style.transform =
        el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
      const innerEl = el.getElementsByClassName('inner-hook')[0]
      innerEl.style.transform =
        innerEl.style.webkitTransform = `translate3d(${x}px, 0, 0)`
    },
    dropping (el, done) {
      this._reflow = document.body.offsetHeight

      el.style.display = 'inline-block'
      el.style.transform = el.style.webkitTransform = 'translate3d(0, 0, 0)'
      const innerEl = el.getElementsByClassName('inner-hook')[0]
      innerEl.style.transform = innerEl.style.webkitTransform =
        'translate3d(0, 0, 0)'

      el.addEventListener('transitionend', done)
    },
    afterDrop (el) {
      const ball = this.dropBalls.shift()

      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    toggleShopCartListFn () {
      if (this.shopCartListFold) {
        if (!this.totalCount) return false

        this.shopCartListFold = false
        this._showShopCartList()
      } else {
        this.shopCartListFold = true
        this._hideShopCartList()
      }
    },
    _showShopCartList () {
      this.shopCartListComp =
        this.shopCartListComp ||
        this.$createShopCartList({
          $props: {
            foodsList: 'foodsList'
          },
          $events: {
            hide: () => {
              this.shopCartListFold = true

              setTimeout(() => {
                this.$emit('removeCompFn', this.$refs.shopCartWrapper)
              }, 400)
            },
            addCountFn: el => {
              this.dropBallFn(el)
            }
          }
        })

      this.bodyAppendShopCartFn()

      this.shopCartListComp.show()
    },
    bodyAppendShopCartFn () {
      // 移动组件到 body 下
      document.body.appendChild(this.$refs.shopCartWrapper)
    },
    _hideShopCartList () {
      this.shopCartListComp.hide()
    },
    payFn (evt) {
      if (this.totalPrice < this.minDeliveryPrice) return false

      this.$createDialog({
        title: '支付',
        content: `您需要支付 ￥${this.totalPrice + this.deliveryPrice}元`
      }).show()

      evt.stopPropagation()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/mixins.styl'
@import '~@/assets/css/variable.styl'

.shopCartBox,
.shopCartWrapper
  display: flex
  position: fixed
  bottom: 0
  left: 0
  z-index: 50
  width: 100%
  height: 47px

  .leftBox
    flex: 1
    background: #141d27
    font-size: 0

    .logoContainer
      display: inline-block
      position: relative
      top: -12px
      width: 56px
      height: 56px
      border-radius: 50%
      margin-left: 12px
      background: #141d27
      text-align: center

      .logoBox
        width: 44px
        height: 44px
        border-radius: 50%
        background: #2b343c
        line-height: 59px
        text-align: center
        margin-top: 6px
        margin-left: 6px

        &.haveFood
          background: $color-blue

          .icon
            color: $color-white

        .icon
          font-size: $fontsize-large-xxx
          color: rgba(255, 255, 255, 0.4);

      .shopCountBox
        position: absolute
        top: 0
        right: 0
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);

    .priceBox
      display: inline-block
      vertical-align: top
      font-size: $fontsize-large
      font-weight: 700;
      color: rgba(255, 255, 255, 0.4);
      padding: 0 12px
      margin: 12px 0
      line-height: 24px
      border-right: 1px solid rgba(255, 255, 255, 0.1)

      &.haveFood
        color: $color-white

    .priceDescBox
      display: inline-block
      vertical-align: top
      font-size: $fontsize-small-s
      color: rgba(255, 255, 255, 0.4)
      padding: 0 12px
      margin: 12px 0
      line-height: 24px

  .rightBox
    width: 105px
    font-weight: 700
    line-height: 46px
    text-align: center
    padding: 0 8px
    vertical-align: middle

    &.initRightBox
      font-size: $fontsize-small
      background: #2b333b
      color: rgba(255, 255, 255, 0.4)

    &.finalRightBox
      font-size: $fontsize-medium
      background: #0f9e42
      color: $color-white

.ballContainer
  .ballItem
    position: fixed
    left: 32px
    bottom: 22px
    z-index: 200
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)

    .inner
      width:16px
      height: 16px
      border-radius: 50%
      background: $color-blue
      transition: all 0.4s linear
</style>
