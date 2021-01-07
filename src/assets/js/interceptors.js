import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import { Message, MessageBox, Loading } from 'element-ui'
import router from '../../router/index'

import localStore from 'store'
let baseUrl = process.env.NODE_ENV === 'development' ? '/api' : ''



// axios.defaults.timeout = 200000

// 开始设置请求  发起的拦截处理
// // config 代表发起请求的参数的实体
// axios.interceptors.request.use(config => {
//   if (localStore.get('roleJson')) {
//     config.headers['token'] = localStore.get('roleJson').token
//   }
  
//   // console.log(localStore.get('roleJson'))
//   return config
// }, error => {
//   return Promise.reject(error)
// })

// 响应的拦截处理
axios.interceptors.response.use(config => {
  const { data } = config
  switch (data.code || data.statusCode) {
    case 400:
      Message.error({
        message: '错误请求'
      })
      break
    case 401:
      alert('登录状态已失效，请重新登录')
      router.replace({name: 'login'})
      break
    case 403:
        Message.error({message: '拒绝访问'});
        break
    case 405:
        Message.error({message: '请求方法未允许'});
        break
    case 408:
        Message.error({message: '请求超时'});
        break
    case 500:
        // Message.error({message: data.message});
        break
    default:
        break
  }

  return config
}, error => {
  if (error && error.response) {
    switch (error.response.status) {
      case 404:
        Message.error({message: '请求错误,未找到该资源'});
        error.message = '请求错误,未找到该资源'
        break
      case 500:
        Message.error({message: '未连接网络'});
        error.message = '网络未实现'
        break
      case 501:
        Message.error({message: '网络未实现'});
        error.message = '网络未实现'
        break
      case 502:
        Message.error({message: '网络错误'});
        error.message = '网络错误'
        break
      case 503:
        Message.error({message: '服务不可用'});
        error.message = '服务不可用'
        break
      case 504:
        Message.error({message: '网络超时'});
        error.message = '网络超时'
        break
      case 505:
        Message.error({message: 'http版本不支持该请求'});
        error.message = 'http版本不支持该请求'
        break
      default:
        error.message = `连接错误${error.response.status}`
        break
    }
  } else {
    error.message = '连接到服务器失败'
    Message.error({message: '连接到服务器失败'});
  }

  return Promise.reject(error.message);
})

Vue.prototype.$get = (url, params, Loading = false) => {
  let token = localStore.get('roleJson')? localStore.get('roleJson').token : ''
  return new Promise((resolve, reject) => {
    axios.get(baseUrl + url, {
      params : params,
      headers: {
        token: token
      }
    }).then(result => {
      resolve(result.data)
    }).catch((err) => {
      reject(err)
    });
  })
}

Vue.prototype.$post = (url, params, Loading = false) => {
  let token = localStore.get('roleJson') ? localStore.get('roleJson').token : ''
  return new Promise((resolve, reject) => {
    axios.post(baseUrl + url, params, {
      headers: {
        token: token
      }
    }).then(result => {
      resolve(result.data)
    }).catch((err) => {
      reject(err)
    });
  })
}

Vue.prototype.$postQs = (url, params, loading = true) => {
  let token = localStore.get('roleJson').token
  console.log(qs.stringify(params))
  return new Promise((resolve, reject) => {
      axios.post(baseUrl + url, qs.stringify(params), {
        headers: {
          token: token
        }
      }).then(res => {
         resolve(res.data)
      }).catch(err => {
          reject(err)
      })
  })
}

Vue.prototype.$put = (url, params) => {
  let token = localStore.get('roleJson').token
  return new Promise((resolve, reject) => {
    axios.put(baseUrl + url, params, {
      headers: {
        token: token
      }
    }).then(result => {
      resolve(result.data)
    }).catch((err) => {
      reject(err)
    });
  })
}

Vue.prototype.$location = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

Vue.prototype.$login = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(baseUrl +  url, params).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}