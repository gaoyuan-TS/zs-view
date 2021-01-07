export default class parameter {
  // 设置要存的列表参数
  static setItem (param) {
    let data = JSON.stringify(param)
    localStorage.setItem('paramData', data)
  }

  // 获取
  static getItem () {
    let item = localStorage.getItem('paramData')
    if (item) {
      return JSON.parse(item)
    } else {
      return false
    }
  }

  // 删除
  static remove () {
    localStorage.removeItem('paramData')
  }
}
