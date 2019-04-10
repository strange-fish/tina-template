const staging = {
  tmgHost: 'https://ef-staging.wechatify.net',
  host: '',
  isDev: true
}

const live = {
  tmgHost: '',
  host: '',
  isDev: false
}

const isDev = process.env.NODE_ENV === 'development'

export default (isDev ? staging : live)
