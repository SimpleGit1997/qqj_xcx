'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOpenId = exports.findAllOrders = exports.payApply = exports.balancePay = exports.submitValidate = exports.sendVialidate = exports.payMode = exports.payOrderInfo = exports.addOrder = exports.selectPrices = exports.orderWrite = exports.roomRatePlanInfo = exports.roomRatePlanDetailInfo = exports.hotelDetailInfo = exports.hotelImageInfo = exports.getHotelList = exports.queryRegionsByParentId = exports.findRegions = undefined;

require('./../npm/wepy-async-function/index.js');

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../lib/request.js');

var _index = require('./../config/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 获取城市列表
 * @param {*} param
 */
function findRegions(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('GET', _index2.default.host + 'data/findRegions', param, false, "", true).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 查询行政区域
 * @param {*} param
 */
function queryRegionsByParentId(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('GET', _index2.default.host + '/data/queryRegionsByParentId', param, false, "", true).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 获取酒店列表信息
 * @param {*} param
 */
function getHotelList(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('GET', _index2.default.host + '/search/hotelinfo/search', param, true, "", false).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 酒店图片接口
 * @param {*} param
 */
function hotelImageInfo(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('GET', _index2.default.host + '/hotelinfo/hotelImageInfo', param, true, "", false).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 酒店信息-详情
 * @param {*} param
 */
function hotelDetailInfo(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('GET', _index2.default.host + '/hotelinfo/hotelDetailInfo', param, true, "JSON", false).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 房型产品价格接口
 * @param {*} param
 */
function roomRatePlanDetailInfo(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('POST', _index2.default.host + '/hotelinfo/roomRatePlanDetailInfo', param, true, "", false).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 酒店下单初始化
 * @param {*} param
 */
function orderWrite(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('POST', _index2.default.host + '/orderInfo/orderWrite', param, true, "FORM", false).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 获取明细
 * @param {*} param
 */
function selectPrices(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('POST', _index2.default.host + '/orderInfo/selectPrices', param, true, "FORM", false).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 酒店预定算价
 * @param {*} param
 */
function roomRatePlanInfo(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('POST', _index2.default.host + '/hotelinfo/roomRatePlanInfo', param, true, "JSON", true).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 下订单
 * @param {*} param
 */
function addOrder(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('POST', _index2.default.host + '/user/orderInfo/addOrder', param, true, "FORM", false).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 获取支付订单信息
 * @param {*} param 
 */
function payOrderInfo(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('POST', _index2.default.host + '/orderInfo/payOrderInfo', param, true, "FORM", false).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 获取支付方式
 * @param {*} param 
 */
function payMode(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('POST', _index2.default.host + '/user/pay/mode', param, true, "FORM", false).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 预支付
 * @param {*} param 
 */
function payApply(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('POST', _index2.default.host + '/user/pay/apply/submit?sid=' + _wepy2.default.getStorageSync('sid'), param, true, "JSON", false).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 发送验证码
 * @param {*} param 
 */
function sendVialidate(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('POST', _index2.default.host + '/pay/sms/send', param, true, "FORM", false).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 确认验证码
 * @param {*} param 
 */
function submitValidate(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('POST', _index2.default.host + '/pay/sms/validate', param, true, "FORM", true).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 余额支付
 * @param {*} param 
 */
function balancePay(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('POST', _index2.default.host + '/balance/balancePay', param, true, "FORM", false).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 订单中心
 * @param {*} param 
 */
function findAllOrders(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('POST', _index2.default.host + '/user/findAllOrders', param, true, "FORM", false).then(function (res) {
      resolve(res);
    });
  });
}

/**
 * 登录
 * @param {*} param 
 */
function getOpenId(param) {
  return new Promise(function (resolve, reject) {
    (0, _request.request)('POST', _index2.default.host + '/wechat/userbind/find', param, true, "FORM", true).then(function (res) {
      resolve(res);
    });
  });
}

exports.findRegions = findRegions;
exports.queryRegionsByParentId = queryRegionsByParentId;
exports.getHotelList = getHotelList;
exports.hotelImageInfo = hotelImageInfo;
exports.hotelDetailInfo = hotelDetailInfo;
exports.roomRatePlanDetailInfo = roomRatePlanDetailInfo;
exports.roomRatePlanInfo = roomRatePlanInfo;
exports.orderWrite = orderWrite;
exports.selectPrices = selectPrices;
exports.addOrder = addOrder;
exports.payOrderInfo = payOrderInfo;
exports.payMode = payMode;
exports.sendVialidate = sendVialidate;
exports.submitValidate = submitValidate;
exports.balancePay = balancePay;
exports.payApply = payApply;
exports.findAllOrders = findAllOrders;
exports.getOpenId = getOpenId;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImZpbmRSZWdpb25zIiwicGFyYW0iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNvbmZpZyIsImhvc3QiLCJ0aGVuIiwicmVzIiwicXVlcnlSZWdpb25zQnlQYXJlbnRJZCIsImdldEhvdGVsTGlzdCIsImhvdGVsSW1hZ2VJbmZvIiwiaG90ZWxEZXRhaWxJbmZvIiwicm9vbVJhdGVQbGFuRGV0YWlsSW5mbyIsIm9yZGVyV3JpdGUiLCJzZWxlY3RQcmljZXMiLCJyb29tUmF0ZVBsYW5JbmZvIiwiYWRkT3JkZXIiLCJwYXlPcmRlckluZm8iLCJwYXlNb2RlIiwicGF5QXBwbHkiLCJ3ZXB5IiwiZ2V0U3RvcmFnZVN5bmMiLCJzZW5kVmlhbGlkYXRlIiwic3VibWl0VmFsaWRhdGUiLCJiYWxhbmNlUGF5IiwiZmluZEFsbE9yZGVycyIsImdldE9wZW5JZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBOzs7O0FBSUEsU0FBU0EsV0FBVCxDQUFxQkMsS0FBckIsRUFBNEI7QUFDMUIsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLDBCQUFRLEtBQVIsRUFBZUMsZ0JBQU9DLElBQVAsR0FBYyxrQkFBN0IsRUFBaURMLEtBQWpELEVBQXdELEtBQXhELEVBQStELEVBQS9ELEVBQW1FLElBQW5FLEVBQXlFTSxJQUF6RSxDQUE4RSxlQUFPO0FBQ25GSixjQUFRSyxHQUFSO0FBQ0QsS0FGRDtBQUdELEdBSk0sQ0FBUDtBQUtEOztBQUVEOzs7O0FBSUEsU0FBU0Msc0JBQVQsQ0FBZ0NSLEtBQWhDLEVBQXVDO0FBQ3JDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QywwQkFBUSxLQUFSLEVBQWVDLGdCQUFPQyxJQUFQLEdBQWMsOEJBQTdCLEVBQTZETCxLQUE3RCxFQUFvRSxL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QUFBLGU7UUFDQUMsc0IsR0FBQUEsc0I7UUFDQUcsZ0IsR0FBQUEsZ0I7UUFDQUYsVSxHQUFBQSxVO1FBQ0FDLFksR0FBQUEsWTtRQUNBRSxRLEdBQUFBLFE7UUFDQUMsWSxHQUFBQSxZO1FBQ0FDLE8sR0FBQUEsTztRQUNBSSxhLEdBQUFBLGE7UUFDQUMsYyxHQUFBQSxjO1FBQ0FDLFUsR0FBQUEsVTtRQUNBTCxRLEdBQUFBLFE7UUFDQU0sYSxHQUFBQSxhO1FBQ0FDLFMsR0FBQUEsUyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcbmltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5pbXBvcnQgeyByZXF1ZXN0IH0gZnJvbSAnLi4vbGliL3JlcXVlc3QnXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uL2NvbmZpZy9pbmRleCdcblxuLyoqXG4gKiDojrflj5bln47luILliJfooahcbiAqIEBwYXJhbSB7Kn0gcGFyYW1cbiAqL1xuZnVuY3Rpb24gZmluZFJlZ2lvbnMocGFyYW0pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXF1ZXN0KCdHRVQnLCBjb25maWcuaG9zdCArICdkYXRhL2ZpbmRSZWdpb25zJywgcGFyYW0sIGZhbHNlLCBcIlwiLCB0cnVlKS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vKipcbiAqIOafpeivouihjOaUv+WMuuWfn1xuICogQHBhcmFtIHsqfSBwYXJhbVxuICovXG5mdW5jdGlvbiBxdWVyeVJlZ2lvbnNCeVBhcmVudElkKHBhcmFtKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmVxdWVzdCgnR0VUJywgY29uZmlnLmhvc3QgKyAnL2RhdGEvcXVlcnlSZWdpb25zQnlQYXJlbnRJZCcsIHBhcmFtLCBmYWxzZSwgXCJcIiwgdHJ1ZSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLyoqXG4gKiDojrflj5bphZLlupfliJfooajkv6Hmga9cbiAqIEBwYXJhbSB7Kn0gcGFyYW1cbiAqL1xuZnVuY3Rpb24gZ2V0SG90ZWxMaXN0KHBhcmFtKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmVxdWVzdCgnR0VUJywgY29uZmlnLmhvc3QgKyAnL3NlYXJjaC9ob3RlbGluZm8vc2VhcmNoJywgcGFyYW0sIHRydWUsIFwiXCIsIGZhbHNlKS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vKipcbiAqIOmFkuW6l+WbvueJh+aOpeWPo1xuICogQHBhcmFtIHsqfSBwYXJhbVxuICovXG5mdW5jdGlvbiBob3RlbEltYWdlSW5mbyhwYXJhbSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlcXVlc3QoJ0dFVCcsIGNvbmZpZy5ob3N0ICsgJy9ob3RlbGluZm8vaG90ZWxJbWFnZUluZm8nLCBwYXJhbSwgdHJ1ZSwgXCJcIiwgZmFsc2UpLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8qKlxuICog6YWS5bqX5L+h5oGvLeivpuaDhVxuICogQHBhcmFtIHsqfSBwYXJhbVxuICovXG5mdW5jdGlvbiBob3RlbERldGFpbEluZm8ocGFyYW0pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXF1ZXN0KCdHRVQnLCBjb25maWcuaG9zdCArICcvaG90ZWxpbmZvL2hvdGVsRGV0YWlsSW5mbycsIHBhcmFtLCB0cnVlLCBcIkpTT05cIiwgZmFsc2UpLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8qKlxuICog5oi/5Z6L5Lqn5ZOB5Lu35qC85o6l5Y+jXG4gKiBAcGFyYW0geyp9IHBhcmFtXG4gKi9cbmZ1bmN0aW9uIHJvb21SYXRlUGxhbkRldGFpbEluZm8ocGFyYW0pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXF1ZXN0KCdQT1NUJyxjb25maWcuaG9zdCArICcvaG90ZWxpbmZvL3Jvb21SYXRlUGxhbkRldGFpbEluZm8nLCAgcGFyYW0sIHRydWUsIFwiXCIsIGZhbHNlKS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vKipcbiAqIOmFkuW6l+S4i+WNleWIneWni+WMllxuICogQHBhcmFtIHsqfSBwYXJhbVxuICovXG5mdW5jdGlvbiBvcmRlcldyaXRlKHBhcmFtKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmVxdWVzdCgnUE9TVCcsY29uZmlnLmhvc3QgKyAnL29yZGVySW5mby9vcmRlcldyaXRlJywgIHBhcmFtLCB0cnVlLCBcIkZPUk1cIiwgZmFsc2UpLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8qKlxuICog6I635Y+W5piO57uGXG4gKiBAcGFyYW0geyp9IHBhcmFtXG4gKi9cbmZ1bmN0aW9uIHNlbGVjdFByaWNlcyhwYXJhbSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlcXVlc3QoJ1BPU1QnLGNvbmZpZy5ob3N0ICsgJy9vcmRlckluZm8vc2VsZWN0UHJpY2VzJywgIHBhcmFtLCB0cnVlLCBcIkZPUk1cIiwgZmFsc2UpLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8qKlxuICog6YWS5bqX6aKE5a6a566X5Lu3XG4gKiBAcGFyYW0geyp9IHBhcmFtXG4gKi9cbmZ1bmN0aW9uIHJvb21SYXRlUGxhbkluZm8ocGFyYW0pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXF1ZXN0KCdQT1NUJyxjb25maWcuaG9zdCArICcvaG90ZWxpbmZvL3Jvb21SYXRlUGxhbkluZm8nLCAgcGFyYW0sIHRydWUsIFwiSlNPTlwiLCB0cnVlKS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG5cbi8qKlxuICog5LiL6K6i5Y2VXG4gKiBAcGFyYW0geyp9IHBhcmFtXG4gKi9cbmZ1bmN0aW9uIGFkZE9yZGVyKHBhcmFtKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmVxdWVzdCgnUE9TVCcsY29uZmlnLmhvc3QgKyAnL3VzZXIvb3JkZXJJbmZvL2FkZE9yZGVyJywgIHBhcmFtLCB0cnVlLCBcIkZPUk1cIiwgZmFsc2UpLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8qKlxuICog6I635Y+W5pSv5LuY6K6i5Y2V5L+h5oGvXG4gKiBAcGFyYW0geyp9IHBhcmFtIFxuICovXG5mdW5jdGlvbiBwYXlPcmRlckluZm8ocGFyYW0pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXF1ZXN0KCdQT1NUJyxjb25maWcuaG9zdCArICcvb3JkZXJJbmZvL3BheU9yZGVySW5mbycsICBwYXJhbSwgdHJ1ZSwgXCJGT1JNXCIsIGZhbHNlKS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vKipcbiAqIOiOt+WPluaUr+S7mOaWueW8j1xuICogQHBhcmFtIHsqfSBwYXJhbSBcbiAqL1xuZnVuY3Rpb24gcGF5TW9kZShwYXJhbSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlcXVlc3QoJ1BPU1QnLGNvbmZpZy5ob3N0ICsgJy91c2VyL3BheS9tb2RlJywgIHBhcmFtLCB0cnVlLCBcIkZPUk1cIiwgZmFsc2UpLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8qKlxuICog6aKE5pSv5LuYXG4gKiBAcGFyYW0geyp9IHBhcmFtIFxuICovXG5mdW5jdGlvbiBwYXlBcHBseShwYXJhbSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlcXVlc3QoJ1BPU1QnLGNvbmZpZy5ob3N0ICsgJy91c2VyL3BheS9hcHBseS9zdWJtaXQ/c2lkPScrd2VweS5nZXRTdG9yYWdlU3luYygnc2lkJyksICBwYXJhbSwgdHJ1ZSwgXCJKU09OXCIsIGZhbHNlKS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vKipcbiAqIOWPkemAgemqjOivgeeggVxuICogQHBhcmFtIHsqfSBwYXJhbSBcbiAqL1xuZnVuY3Rpb24gc2VuZFZpYWxpZGF0ZShwYXJhbSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlcXVlc3QoJ1BPU1QnLGNvbmZpZy5ob3N0ICsgJy9wYXkvc21zL3NlbmQnLCAgcGFyYW0sIHRydWUsIFwiRk9STVwiLCBmYWxzZSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLyoqXG4gKiDnoa7orqTpqozor4HnoIFcbiAqIEBwYXJhbSB7Kn0gcGFyYW0gXG4gKi9cbmZ1bmN0aW9uIHN1Ym1pdFZhbGlkYXRlKHBhcmFtKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmVxdWVzdCgnUE9TVCcsY29uZmlnLmhvc3QgKyAnL3BheS9zbXMvdmFsaWRhdGUnLCAgcGFyYW0sIHRydWUsIFwiRk9STVwiLCB0cnVlKS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vKipcbiAqIOS9memineaUr+S7mFxuICogQHBhcmFtIHsqfSBwYXJhbSBcbiAqL1xuZnVuY3Rpb24gYmFsYW5jZVBheShwYXJhbSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlcXVlc3QoJ1BPU1QnLGNvbmZpZy5ob3N0ICsgJy9iYWxhbmNlL2JhbGFuY2VQYXknLCAgcGFyYW0sIHRydWUsIFwiRk9STVwiLCBmYWxzZSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLyoqXG4gKiDorqLljZXkuK3lv4NcbiAqIEBwYXJhbSB7Kn0gcGFyYW0gXG4gKi9cbmZ1bmN0aW9uIGZpbmRBbGxPcmRlcnMocGFyYW0pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXF1ZXN0KCdQT1NUJyxjb25maWcuaG9zdCArICcvdXNlci9maW5kQWxsT3JkZXJzJywgIHBhcmFtLCB0cnVlLCBcIkZPUk1cIiwgZmFsc2UpLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8qKlxuICog55m75b2VXG4gKiBAcGFyYW0geyp9IHBhcmFtIFxuICovXG5mdW5jdGlvbiBnZXRPcGVuSWQocGFyYW0pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXF1ZXN0KCdQT1NUJyxjb25maWcuaG9zdCArICcvd2VjaGF0L3VzZXJiaW5kL2ZpbmQnLCAgcGFyYW0sIHRydWUsIFwiRk9STVwiLCB0cnVlKS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG5cbmV4cG9ydCB7XG4gIGZpbmRSZWdpb25zLFxuICBxdWVyeVJlZ2lvbnNCeVBhcmVudElkLFxuICBnZXRIb3RlbExpc3QsXG4gIGhvdGVsSW1hZ2VJbmZvLFxuICBob3RlbERldGFpbEluZm8sXG4gIHJvb21SYXRlUGxhbkRldGFpbEluZm8sXG4gIHJvb21SYXRlUGxhbkluZm8sXG4gIG9yZGVyV3JpdGUsXG4gIHNlbGVjdFByaWNlcyxcbiAgYWRkT3JkZXIsXG4gIHBheU9yZGVySW5mbyxcbiAgcGF5TW9kZSxcbiAgc2VuZFZpYWxpZGF0ZSxcbiAgc3VibWl0VmFsaWRhdGUsXG4gIGJhbGFuY2VQYXksXG4gIHBheUFwcGx5LFxuICBmaW5kQWxsT3JkZXJzLFxuICBnZXRPcGVuSWRcbn1cbiJdfQ==