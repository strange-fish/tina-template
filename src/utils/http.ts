import Fly from 'flyio/dist/npm/wx'
import wxApi from './wxApi'
import env from '../env'

const http = new Fly()

http.interceptors.request.use(function(config: any) {
  config.baseURL = env.tmgHost + '/efec/api'
  config.headers['Authorization'] = 'Bearer ' + wx.getStorageSync('token')
})

http.interceptors.response.use(
  (res: any) => {
    switch (res.data.code) {
      case 401: {
        wx.reLaunch({
          url: '/pages/login/main',
          success() {
            wxApi.$modal('权限错误', res.data.error)
          },
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
  (err: any) => {
    if (err.response && err.response.error) {
      wxApi.$modal('服务器错误', err.response.error)
    } else {
      wxApi.$modal('服务器错误', err.response)
    }
    return err
  }
)

export default http
