<template>
  <div id="app">
    <Header :seller="seller" />
  </div>
</template>

<script>
import { getSellerData } from '@/api/'
import { getUrlParams } from '@/assets/js/utils'
import Header from '@/views/Header/'

export default {
  name: 'App',
  components: {
    Header
  },
  data () {
    return {
      seller: {
        id: (() => {
          const params = getUrlParams()
          return params.id
        })()
      }
    }
  },
  created () {
    this._getSellers()
  },
  methods: {
    async _getSellers () {
      const data = await getSellerData()

      this.seller = Object.assign({}, this.seller, data)
    }
  }
}
</script>

<style lang="stylus"></style>
