import wepy from 'wepy'

/**
 * 
 * @param {*} fullUrl 请求地址
 * @param {*} param 请求参数
 * @param {*} token 是否携带token
 * @param {*} method 请求方式 默认POST
 * @param {*} type 请求格式 JSON FORM
 * @param {*} isReturn 是否直接提取数据（不过滤）
 */
function request( method = 'POST',fullUrl, param, token = true, type = 'JSON', isReturn = false) {
  return new Promise(function (resolve, reject) {
    if (token) {
      param = Object.assign({ sid: '' }, param)
    }
    if (type == 'JSON') {
      type = 'application/json'
    } else if (type == 'FORM') {
      type = 'application/x-www-form-urlencodedn'
    }
    wx.request({
      header: { 'Content-Type': type },
      url: fullUrl,
      data: param,
      method: method,
      success: function (res) {
        if (res.statusCode === 200) {
          if (isReturn) {
            resolve(res.data)
          } else {
            if (res.data.code === 0) {
              resolve(res.data.data)
            } else if ((res.data.code !== 0) && res.data.msg) {
              wepy.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1500
              })
            } else {
              wepy.showToast({
                title: '发生未知错误，请联系客服!',
                icon: 'none',
                duration: 1500
              })
            }
          }

        } else if (res.statusCode === 401) {
          wepy.showToast({
            title: '未授权 ，登录失败！',
            icon: 'none',
            duration: 1500
          })
        } else if (res.statusCode === 404) {
          wepy.showToast({
            title: '服务器找不到您所请求的文件或脚本！',
            icon: 'none',
            duration: 1500
          })
        } else if (res.statusCode === 500) {
          wepy.showToast({
            title: '服务器发生未知错误！',
            icon: 'none',
            duration: 1500
          })
        } else {
          wepy.showToast({
            title: '生未知错误！',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function () {
        wepy.showToast({
          title: '网络超时，请重新操作！',
          icon: 'none',
          duration: 1500
        })
      }
    })
  })
}



export {
  request
}
