import axios from 'axios';
import qs from "qs";
import {
  Message,
  MessageBox,
  Loading
} from 'element-ui';
import router from '.././../router/index'

let baseUrl = process.env.NODE_ENV === "development" ? "/api" : "";


export default class http {

  static getLal (address, cb) {
    var geocoder = new qq.maps.Geocoder()
    geocoder.getLocation(address)
    geocoder.setComplete(function (res) {
      cb(res)
    })
    geocoder.setError(function (err) {
      cb(err)
    })
  }

  // get请求封装
  static get(url, params, loading = false ){
    return new Promise((resolve, reject) => {
      if (loading) {
        http.loading();
      }
      axios.get(baseUrl + url, {
        params: params,
        headers: {
          token: ""
        }
      }).then(respone => {
        resolve(respone);
      }).catch(error => {
        reject(error);
      });
    });
  }

  // post请求
  static post(url, params, loading = false) {
    return new Promise((resolve, reject) => {
      if (loading) {
        http.loading();
      }
      axios
        .post(baseUrl + url, {
          params: params,
          headers: {
            token: ""
          }
        })
        .then(respone => {
          http.hideLoading();
          resolve(respone);
        })
        .catch(error => {
          http.hideLoading();
          reject(error);
        });
    });
  }

  static getNoUrl (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then((response) => {
        // console.log('response', response)
          resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  static postQs(url, params, loading = true) {
    return new Promise((resolve, reject) => {
      if (loading) {
        http.loading
      }
      axios.post(baseUrl + url, qs.stringify(params), {
        headers: {
          token: ''
        }
      }).then(respone => {
        resolve(respone)
      }).catch(error => {
        reject(error)
      })
    })
  }
  // 登录
  static Login(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + url, params)
        .then(respone => {
          resolve(respone);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static loading() {
    loadingInstance = Loading.service({
      fullscreen: true,
      customClass: "LoadingClass",
      text: "拼命加载中...",
      spinner: "el-icon-loading"
    });
  }

  static hideLoading() {
    loadingInstance.close();
  }

  static success(title) {
    Message.closeAll();
    Message({
      message: title,
      type: "success",
      duration: 5000
    });
  }

  static error(title) {
    Message.closeAll();
    Message({
      message: title,
      type: "error",
      duration: 5000
    });
  }

  static warning(title) {
    Message.closeAll();
    Message({
      message: title,
      type: "warning",
      duration: 5000
    });
  }

  // 获取当前时间并格式化为(xxxx-xx-xx)
  static newDate (date) {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    month = month <= 9 ? '0' + month : month
    day = day <= 9 ? '0' + day : day
    let currentdate = year + '-' + month + '-' + day
    return currentdate
  }

  static messageBox(context, title, callback) {
    MessageBox.alert(context, title, {
      confirmButtonText: '确定',
      type: 'error',
      callback: action => {
        callback()
      }
    })
  }

  // 时间格式化：xxxx/xx/xx/xx:xx:xx
  static timeStamp(timeData, type) {
    let date = new Date(timeData);
    let year = date.getFullYear();
    let mouth =
      date.getMonth() + 1 > 9 ?
      date.getMonth() + 1 :
      "0" + (date.getMonth() + 1);
    let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
    let hour = "";
    let min = "";
    let sec = "";
    let hourMinSe = "";
    if (type) {
      hour = date.getHours() > 9 ? date.getHours() : "0" + date.getHours();
      min = date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
      sec = date.getSeconds() > 9 ? date.getSeconds() : "0" + date.getSeconds();
      hourMinSe = ` ${hour}:${min}:${sec}`;
    }
    // console.log(hour)
    let time = `${year}/${mouth}/${day}${hourMinSe}`;

    return time;
  }
}