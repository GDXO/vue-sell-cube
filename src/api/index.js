import { getData } from './request'

const getSellerData = getData('/api/seller')
const getGoodsData = getData('/api/goods')

export { getSellerData, getGoodsData }
