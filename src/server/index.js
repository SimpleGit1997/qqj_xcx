import 'wepy-async-function'
import wepy from 'wepy'
import { request } from '../lib/request'
import config from '../config/index'

/**
 * 获取城市列表
 * @param {*} param
 */
function findRegions(param) {
  return new Promise((resolve, reject) => {
    request('GET', config.host + 'data/findRegions', param, false, "", true).then(res => {
      resolve(res)
    })
  })
}

/**
 * 查询行政区域
 * @param {*} param
 */
function queryRegionsByParentId(param) {
  return new Promise((resolve, reject) => {
    request('GET', config.host + '/data/queryRegionsByParentId', param, false, "", true).then(res => {
      resolve(res)
    })
  })
}

/**
 * 获取酒店列表信息
 * @param {*} param
 */
function getHotelList(param) {
  return new Promise((resolve, reject) => {
    request('GET', config.host + '/search/hotelinfo/search', param, true, "", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 酒店图片接口
 * @param {*} param
 */
function hotelImageInfo(param) {
  return new Promise((resolve, reject) => {
    request('GET', config.host + '/hotelinfo/hotelImageInfo', param, true, "", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 酒店信息-详情
 * @param {*} param
 */
function hotelDetailInfo(param) {
  return new Promise((resolve, reject) => {
    request('GET', config.host + '/hotelinfo/hotelDetailInfo', param, true, "JSON", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 房型产品价格接口
 * @param {*} param
 */
function roomRatePlanDetailInfo(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/hotelinfo/roomRatePlanDetailInfo',  param, true, "", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 酒店下单初始化
 * @param {*} param
 */
function orderWrite(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/orderInfo/orderWrite',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 获取明细
 * @param {*} param
 */
function selectPrices(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/orderInfo/selectPrices',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 酒店预定算价
 * @param {*} param
 */
function roomRatePlanInfo(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/hotelinfo/roomRatePlanInfo',  param, true, "JSON", true).then(res => {
      resolve(res)
    })
  })
}


/**
 * 下订单
 * @param {*} param
 */
function addOrder(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/orderInfo/addOrder',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 获取支付订单信息
 * @param {*} param 
 */
function payOrderInfo(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/orderInfo/payOrderInfo',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 获取支付方式
 * @param {*} param 
 */
function payMode(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/pay/mode',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 预支付
 * @param {*} param 
 */
function payApply(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/pay/apply/submit?sid='+wepy.getStorageSync('sid'),  param, true, "JSON", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 发送验证码
 * @param {*} param 
 */
function sendVialidate(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/pay/sms/send',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 确认验证码
 * @param {*} param 
 */
function submitValidate(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/pay/sms/validate',  param, true, "FORM", true).then(res => {
      resolve(res)
    })
  })
}

/**
 * 余额支付
 * @param {*} param 
 */
function balancePay(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/balance/balancePay',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 订单中心
 * @param {*} param 
 */
function findAllOrders(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/findAllOrders',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 登录
 * @param {*} param 
 */
function getOpenId(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/wechat/userbind/find',  param, true, "FORM", true).then(res => {
      resolve(res)
    })
  })
}


export {
  findRegions,
  queryRegionsByParentId,
  getHotelList,
  hotelImageInfo,
  hotelDetailInfo,
  roomRatePlanDetailInfo,
  roomRatePlanInfo,
  orderWrite,
  selectPrices,
  addOrder,
  payOrderInfo,
  payMode,
  sendVialidate,
  submitValidate,
  balancePay,
  payApply,
  findAllOrders,
  getOpenId
}
