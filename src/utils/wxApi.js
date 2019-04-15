const apis = {}

export function toast(title, config = {}) {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title, // 提示的内容,
      icon: 'none', // 图标,
      duration: 2500, // 延迟时间,
      mask: true, // 显示透明蒙层，防止触摸穿透,
      ...config,
      success: resolve,
      fail: reject,
    })
  })
}

export function modal(title, content, config = {}) {
  return new Promise((resolve, reject) => {
    const c = (typeof content === 'object'
      ? JSON.stringify(content)
      : content
    ).substring(0, 500)
    wx.showModal({
      title,
      content: c,
      showCancel: false, // 是否显示取消按钮,
      confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
      confirmColor: '#3CC51F', // 确定按钮的文字颜色,
      ...config,
      success: res => {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          reject()
        }
      },
      fail: reject,
    })
  })
}

export function loading(title) {
  if (title) {
    wx.showLoading({
      title,
      mask: true, // 显示透明蒙层，防止触摸穿透,
    })
  } else {
    wx.hideLoading()
  }
}

apis.$toast = toast
apis.$modal = modal
apis.$loading = loading

const routeMethods = ['navigateTo', 'redirectTo', 'switchTab', 'reLaunch']

function queryString(params) {
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

routeMethods.forEach(api => {
  function wrapApi(url, params) {
    return new Promise((resolve, reject) => {
      wx[api]({
        url: `${url}?${queryString(params)}`,
        success: resolve,
        fail: reject,
      })
    })
  }
  apis['$' + api] = wrapApi
})

export default apis
