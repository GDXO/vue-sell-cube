import { createAPI } from 'cube-ui'
import Vue from 'vue'
import HeaderDetail from '@/views/HeaderDetail/'
import ShopCartList from '@/components/ShopCartList/'

createAPI(Vue, HeaderDetail)
createAPI(Vue, ShopCartList)
