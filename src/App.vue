<template>
  <div id="app">
    <Header :seller="seller" />
    <Tabs :tabs="tabs" />
  </div>
</template>

<script>
import qs from 'query-string'
import { getSellerData } from '@/api/'
import Header from '@/views/Header/'
import Tabs from '@/components/Tabs/'
import Goods from '@/views/Goods/'
import Ratings from '@/views/Ratings/'
import Seller from '@/views/Seller/'

export default {
  name: 'App',
  components: {
    Header,
    Tabs
  },
  data () {
    return {
      seller: {
        id: qs.parse(window.location.search).id
      }
    }
  },
  created () {
    this._getSellers()
  },
  computed: {
    tabs () {
      return [
        {
          label: '商品',
          component: Goods,
          data: {
            seller: this.seller
          }
        },
        {
          label: '评论',
          component: Ratings,
          data: {
            seller: this.seller
          }
        },
        {
          label: '商家',
          component: Seller,
          data: {
            seller: this.seller
          }
        }
      ]
    }
  },
  methods: {
    async _getSellers () {
      const data = await getSellerData({
        id: this.seller.id
      })

      this.seller = Object.assign({}, this.seller, data)
    }
  }
}
</script>

<style lang="stylus"></style>
