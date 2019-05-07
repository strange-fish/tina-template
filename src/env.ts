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

export default (__DEV__ ? staging : live)
