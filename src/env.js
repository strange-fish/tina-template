const staging = {
  host: '',
  isDev: true
}

const live = {
  host: '',
  isDev: false
}

const isDev = process.env.NODE_ENV === 'development'

export default (isDev ? staging : live)
