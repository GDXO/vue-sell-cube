/**
 *  解析 URL 参数
 * @returns 参数对象
 */
export function getUrlParams () {
  const search = window.location.search
  const params = {}
  const reg = /[?&][^?&]+=[^?&]+/g

  if (search) {
    const searchArr = search.match(reg)

    searchArr.forEach(item => {
      const tempArr = item.substring(1).split('=')
      const key = decodeURIComponent(tempArr[0])
      const value = decodeURIComponent(tempArr[1])
      params[key] = value
    })
  }

  return params
}
