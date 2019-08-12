import 'wepy-async-function'
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
    request('GET', config.host + '/search/hotelinfo/search', param, false, "", false).then(res => {
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
    request('GET', config.host + '/hotelinfo/hotelImageInfo', param, false, "", false).then(res => {
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
    request('GET', config.host + '/hotelinfo/hotelDetailInfo', param, false, "JSON", false).then(res => {
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
    request('POST',config.host + '/hotelinfo/roomRatePlanDetailInfo',  param, false, "", false).then(res => {
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
    request('POST',config.host + '/hotelinfo/roomRatePlanInfo',  param, false, "JSON", true).then(res => {
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
  roomRatePlanInfo

}
