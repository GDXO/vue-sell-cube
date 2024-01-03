import { getData } from './request'

const getSellerData = getData('/api/seller')
const getGoodsData = getData('/api/goods')
const getRatingsData = getData('/api/ratings')

export { getSellerData, getGoodsData, getRatingsData }
