import http from './http'

export default class Service {
  getSmsCode (mobile: string) {
    return http.post('/sms/v001/promoter/send-verify-code', {
      mobile
    })
  }

  precheck (shouldRelaunch = true) {
    return new Promise((resolve, reject) => {
      wx.login({
        success: res => {
          http
            .post('/promoter/v001/authorization/pre-check', {
              code: res.code
            })
            .then((res: any) => {
              if (res.isNeedLogin) {
                shouldRelaunch && wx.reLaunch({ url: '/pages/login-code' })
                reject(res)
              } else {
                resolve(res)
              }
            })
            .catch(reject)
        },
        fail: reject
      })
    })
  }

  logout () {
    return http.post('/promoter/v001/authorization/logout')
  }
}
