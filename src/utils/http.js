import { Fly as FlyType } from 'flyio'
import Fly from 'flyio/dist/npm/wx'
import wxApi from './wxApi.js'
import env from '../env'

/**
 * @type {FlyType}
 */
const http = new Fly()
http.config.baseURL = env.host

http.interceptors.request.use(function (config) {
  config.headers['Authorization'] = 'Bearer ' + wx.getStorageSync('token')
})

http.interceptors.response.use(
  res => {
    switch (res.data.code) {
      case 401: {
        wx.reLaunch({
          url: '/pages/login/main',
          success () {
            wxApi.$modal('权限错误', res.data.error)
          }
        })
        return Promise.reject(res.data)
      }
      case 200: {
        return res.data
      }
      case 400: {
        wxApi.$modal('错误', res.data.error)
        return Promise.reject(res.data)
      }
      default: {
        wxApi.$modal('服务器错误', res)
        return Promise.reject(res.data)
      }
    }
  },
  err => {
    if (err.response && err.response.error) {
      wxApi.$modal('服务器错误', err.response.error)
    } else {
      wxApi.$modal('服务器错误', err.response)
    }
    return err
  }
)

export default http
