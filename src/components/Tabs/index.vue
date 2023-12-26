<template>
  <div class="tabContainer">
    <cube-tab-bar
      ref="tabBar"
      class="border-bottom-1px"
      :show-slider="true"
      :data="tabs"
      :useTransition="false"
      v-model="selectedLabel"
    ></cube-tab-bar>
    <div class="sliderContainer">
      <cube-slide
        ref="tabsSlide"
        :loop="false"
        :auto-play="false"
        :show-dots="false"
        :initial-index="index"
        :options="slideOptions"
        @change="onChangeFn"
        @scroll="onScrollFn"
      >
        <cube-slide-item v-for="(tab, tabIndex) of tabs" :key="tabIndex">
          <component :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonTabs',
  props: {
    tabs: {
      type: Array,
      required: true,
      default: () => []
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      index: this.initialIndex,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    selectedLabel: {
      get () {
        return this.tabs[this.index].label
      },
      set (newLabel) {
        this.index = this.tabs.findIndex(value => value.label === newLabel)
      }
    }
  },
  methods: {
    onChangeFn (current) {
      this.index = current
    },
    onScrollFn (pos) {
      const tabBarRef = this.$refs.tabBar
      const tabBarWidth = tabBarRef.$el.clientWidth
      const sliderWidth = this.$refs.tabsSlide.slide.scrollerWidth
      const tabBarTransformWidth = -pos.x / sliderWidth * tabBarWidth

      tabBarRef.setSliderTransform(tabBarTransformWidth)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/variable.styl'

.tabContainer
  >>> .cube-tab
    padding: 10px 0
  display: flex
  flex-direction: column
  height: 100%

  .sliderContainer
    flex: 1
    overflow: hidden
</style>
