import axios from 'axios'

const ERR_CODE = 0

export const getData = url => {
  return async params => {
    const { data } = await axios.get(url, { params })

    if (data.errNo !== ERR_CODE) return false

    return data.data
  }
}
