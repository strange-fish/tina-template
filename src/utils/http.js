import Fly from 'flyio/dist/npm/wx'
import env from '../env'

const http = new Fly()

http.interceptors.request.use(function (config) {
  config.baseURL = env.host + '/api'
  config.headers['Authorization'] = 'Bearer ' + wx.getStorageSync('token')
})

const toast = (title) => {
  wx.showToast({
    title: title || '服务器未知错误！',
    icon: 'none',
    duration: 3000 // 延迟时间,
  })
}

http.interceptors.response.use(
  res => {
    switch (res.data.code) {
      case -1: {
        wx.reLaunch({
          url: '/pages/login-welcom/main',
          success () {
            toast('登录失效，请重新登录！')
          }
        })
        return Promise.reject(res.data)
      }
      case -2: {
        wx.reLaunch({
          url: '/pages/login-welcome/main',
          success () {
            toast('注册以登录')
          }
        })
        return Promise.reject(res.data)
      }
      case 1: {
        return res.data
      }
      default: {
        toast(res.data.msg)
        return Promise.reject(res.data)
      }
    }
  },
  err => {
    if (err.response && err.response.msg) {
      toast(err.msg)
    }
    return err
  }
)

export default http
