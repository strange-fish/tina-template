const apis = {}

const routeMethods = ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch']

function queryString (params) {
  const arr = []
  if (params) {
    for (const key in params) {
      if (params[key] !== undefined) {
        arr.push(`${key}=${params[key]}`)
      }
    }
  }
  return arr.join('&')
}

routeMethods.forEach((api) => {
  function wrapApi (url, params) {
    return new Promise((resolve, reject) => {
      wx[api]({
        url: `${url}?${queryString(params)}`,
        success: resolve,
        fail: reject
      })
    })
  }
  apis['$' + api] = {
    get () {
      return wrapApi
    }
  }
})

export default apis
