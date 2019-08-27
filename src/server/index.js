import 'wepy-async-function'
import wepy from 'wepy'
import { request } from '../lib/request'
import config from '../config/index'



/**
 * 获取全球家banner
 * @param {*} param
 */
function advertisingAllocationDetailListH5OrApp(param) {
  return new Promise((resolve, reject) => {
    request('POST', config.host + '/Advertising/advertisingAllocationDetailListH5OrApp', param, false, "FORM", true).then(res => {
      resolve(res)
    })
  })
}

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
 * 全球家酒店收藏查询接口
 * @param {*} param 
 */
function selectAllFollow(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/myFollowHouse/selectAllFollow',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 收藏
 * @param {*} param 
 */
function attentionHotel(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/hotelinfo/attentionHotel',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 取消收藏
 * @param {*} param 
 */
function disAttentionHotel(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/hotelinfo/disAttentionHotel',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}


/**
 * 全球家酒店浏览查询接口
 * @param {*} param 
 */
function selectUserBrowse(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/myFollowHouse/selectUserBrowse',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}


/**
 * 全球家收藏浏览条数
 * @param {*} param 
 */
function selectFollowAndBrowseTotal(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/myFollowHouse/selectFollowAndBrowseTotal',  param, true, "FORM", false).then(res => {
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
    request('POST',config.host + '/user/pay/apply/submit?sid='+ wepy.getStorageSync('sid'),  param, true, "JSON", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 取消订单
 * @param {*} param 
 */
function orderCancel(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/orderInfo/cancel',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 退订订单
 * @param {*} param 
 */
function orderQuite(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/orderInfo/cancelOrder',  param, true, "FORM", false).then(res => {
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
    request('POST',config.host + '/pay/sms/validate',  param, true, "FORM", false).then(res => {
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
 * 订单详情
 * @param {*} param 
 */
function findOrderInfoDetail(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/orderInfo/findOrderInfoDetail',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 酒店评论
 * @param {*} param 
 */
function getAllComment(param) {
  return new Promise((resolve, reject) => {
    request('GET',config.host + '/commentInfo/getAllComment',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 获取我的页面用户信息
 * @param {*} param 
 */
function refreshUser(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/refreshUser',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}


/**
 * 发送手机验证码 更改二级密码
 * @param {*} param 
 */
function sendResetPasswordMsg(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/sms/sendResetPasswordMsg',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}


/**
 * 更改二级密码
 * @param {*} param 
 */
function changeTwoStagePassword(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/broker/backtwo',  param, true, "FORM", true).then(res => {
      resolve(res)
    })
  })
}


/**
 * 获取资产信息
 * @param {*} param 
 */
function myAsset(param) {
  return new Promise((resolve, reject) => {
    request('GET',config.host + '/user/myAsset',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 资产门店信息
 * @param {*} param 
 */
function checkShops(param) {
  return new Promise((resolve, reject) => {
    request('GET',config.host + '/user/checkShops',  param, true, "JSON", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 验证二级密码
 * @param {*} param 
 */
function checkTwoStagePwd(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/checkSecPwd',  param, true, "FORM", true).then(res => {
      resolve(res)
    })
  })
}


/**
 * 检查登录
 * @param {*} param 
 */
function loginCheck(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/loginCheck',  param, true, "FORM", true).then(res => {
      resolve(res)
    })
  })
}

/**
 * 小程序换取openId
 * @param {*} param 
 */
function getOpenId(param) {
  return new Promise((resolve, reject) => {
    request('GET',config.host + '/sns-server/wechat/minipro/login',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}


/**
 * 绑定手机号码
 * @param {*} param 
 */
function bindPhone(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/sns-server/wechat/minipro/auth-login',  param, true, "JSON", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 验证码登录
 * @param {*} param 
 */
function smsLogin(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/sns-server/wechat/minipro/sms-login',  param, true, "JSON", false).then(res => {
      resolve(res)
    })
  })
}


/**
 * 账号密码登录
 * @param {*} param 
 */
function accountLogin(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/sns-server/wechat/minipro/account-login',  param, true, "JSON", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 登录发送验证码
 * @param {*} param 
 */
function sendQuickLoginMsg(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/sms/sendQuickLoginMsg',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}

/**
 * 查看是否设置资产二级密码
 * @param {*} param 
 */
function checkHadSecPwd(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/user/checkHadSecPwd',  param, true, "FORM", true).then(res => {
      resolve(res)
    })
  })
}


/**
 * 发表评论
 * @param {*} param 
 */
function addComment(param) {
  return new Promise((resolve, reject) => {
    request('POST',config.host + '/commentInfo/addComment',  param, true, "FORM", false).then(res => {
      resolve(res)
    })
  })
}


export {
  advertisingAllocationDetailListH5OrApp,
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
  findOrderInfoDetail,
  orderCancel,
  orderQuite,
  selectAllFollow,
  selectUserBrowse,
  selectFollowAndBrowseTotal,
  disAttentionHotel,
  attentionHotel,
  getAllComment,
  refreshUser,
  sendResetPasswordMsg,
  changeTwoStagePassword,
  checkTwoStagePwd,
  myAsset,
  checkShops,
  loginCheck,
  getOpenId,
  bindPhone,
  smsLogin,
  accountLogin,
  sendQuickLoginMsg,
  checkHadSecPwd,
  addComment
}
