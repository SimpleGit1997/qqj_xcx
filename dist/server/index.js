'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roomRatePlanInfo = exports.roomRatePlanDetailInfo = exports.hotelDetailInfo = exports.hotelImageInfo = exports.getHotelList = exports.queryRegionsByParentId = exports.findRegions = undefined;

require('./../npm/wepy-async-function/index.js');

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
    (0, _request.request)('GET', _index2.default.host + '/search/hotelinfo/search', param, false, "", false).then(function (res) {
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
    (0, _request.request)('GET', _index2.default.host + '/hotelinfo/hotelImageInfo', param, false, "", false).then(function (res) {
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
    (0, _request.request)('GET', _index2.default.host + '/hotelinfo/hotelDetailInfo', param, false, "JSON", false).then(function (res) {
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
    (0, _request.request)('POST', _index2.default.host + '/hotelinfo/roomRatePlanDetailInfo', param, false, "", false).then(function (res) {
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
    (0, _request.request)('POST', _index2.default.host + '/hotelinfo/roomRatePlanInfo', param, false, "JSON", true).then(function (res) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImZpbmRSZWdpb25zIiwicGFyYW0iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNvbmZpZyIsImhvc3QiLCJ0aGVuIiwicmVzIiwicXVlcnlSZWdpb25zQnlQYXJlbnRJZCIsImdldEhvdGVsTGlzdCIsImhvdGVsSW1hZ2VJbmZvIiwiaG90ZWxEZXRhaWxJbmZvIiwicm9vbVJhdGVQbGFuRGV0YWlsSW5mbyIsInJvb21SYXRlUGxhbkluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7O0FBRUE7Ozs7QUFJQSxTQUFTQSxXQUFULENBQXFCQyxLQUFyQixFQUE0QjtBQUMxQixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsMEJBQVEsS0FBUixFQUFlQyxnQkFBT0MsSUFBUCxHQUFjLGtCQUE3QixFQUFpREwsS0FBakQsRUFBd0QsS0FBeEQsRUFBK0QsRUFBL0QsRUFBbUUsSUFBbkUsRUFBeUVNLElBQXpFLENBQThFLGVBQU87QUFDbkZKLGNBQVFLLEdBQVI7QUFDRCxLQUZEO0FBR0QsR0FKTSxDQUFQO0FBS0Q7O0FBRUQ7Ozs7QUFJQSxTQUFTQyxzQkFBVCxDQUFnQ1IsS0FBaEMsRUFBdUM7QUFDckMsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLDBCQUFRLEtBQVIsRUFBZUMsZ0JBQU9DLElBQVAsR0FBYyw4QkFBN0IsRUFBNkRMLEtBQTdELEVBQW9FLEtBQXBFLEVBQTJFLEVBQTNFLEVBQStFLElBQS9FLEVBQXFGTSxJQUFyRixDQUEwRixlQUFPO0FBQy9GSixjQUFRSyxHQUFSO0FBQ0QsS0FGRDtBQUdELEdBSk0sQ0FBUDtBQUtEOztBQUVEOzs7O0FBSUEsU0FBU0UsWUFBVCxDQUFzQlQsS0FBdEIsRUFBNkI7QUFDM0IsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLDBCQUFRLEtBQVIsRUFBZUMsZ0JBQU9DLElBQVAsR0FBYywwQkFBN0IsRUFBeURMLEtBQXpELEVBQWdFLEtBQWhFLEVBQXVFLEVBQXZFLEVBQTJFLEtBQTNFLEVBQWtGTSxJQUFsRixDQUF1RixlQUFPO0FBQzVGSixjQUFRSyxHQUFSO0FBQ0QsS0FGRDtBQUdELEdBSk0sQ0FBUDtBQUtEOztBQUVEOzs7O0FBSUEsU0FBU0csY0FBVCxDQUF3QlYsS0FBeEIsRUFBK0I7QUFDN0IsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLDBCQUFRLEtBQVIsRUFBZUMsZ0JBQU9DLElBQVAsR0FBYywyQkFBN0IsRUFBMERMLEtBQTFELEVBQWlFLEtBQWpFLEVBQXdFLEVBQXhFLEVBQTRFLEtBQTVFLEVBQW1GTSxJQUFuRixDQUF3RixlQUFPO0FBQzdGSixjQUFRSyxHQUFSO0FBQ0QsS0FGRDtBQUdELEdBSk0sQ0FBUDtBQUtEOztBQUVEOzs7O0FBSUEsU0FBU0ksZUFBVCxDQUF5QlgsS0FBekIsRUFBZ0M7QUFDOUIsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDLDBCQUFRLEtBQVIsRUFBZUMsZ0JBQU9DLElBQVAsR0FBYyw0QkFBN0IsRUFBMkRMLEtBQTNELEVBQWtFLEtBQWxFLEVBQXlFLE1BQXpFLEVBQWlGLEtBQWpGLEVBQXdGTSxJQUF4RixDQUE2RixlQUFPO0FBQ2xHSixjQUFRSyxHQUFSO0FBQ0QsS0FGRDtBQUdELEdBSk0sQ0FBUDtBQUtEOztBQUVEOzs7O0FBSUEsU0FBU0ssc0JBQVQsQ0FBZ0NaLEtBQWhDLEVBQXVDO0FBQ3JDLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0QywwQkFBUSxNQUFSLEVBQWVDLGdCQUFPQyxJQUFQLEdBQWMsbUNBQTdCLEVBQW1FTCxLQUFuRSxFQUEwRSxLQUExRSxFQUFpRixFQUFqRixFQUFxRixLQUFyRixFQUE0Rk0sSUFBNUYsQ0FBaUcsZUFBTztBQUN0R0osY0FBUUssR0FBUjtBQUNELEtBRkQ7QUFHRCxHQUpNLENBQVA7QUFLRDs7QUFFRDs7OztBQUlBLFNBQVNNLGdCQUFULENBQTBCYixLQUExQixFQUFpQztBQUMvQixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDdEMsMEJBQVEsTUFBUixFQUFlQyxnQkFBT0MsSUFBUCxHQUFjLDZCQUE3QixFQUE2REwsS0FBN0QsRUFBb0UsS0FBcEUsRUFBMkUsTUFBM0UsRUFBbUYsSUFBbkYsRUFBeUZNLElBQXpGLENBQThGLGVBQU87QUFDbkdKLGNBQVFLLEdBQVI7QUFDRCxLQUZEO0FBR0QsR0FKTSxDQUFQO0FBS0Q7O1FBR0NSLFcsR0FBQUEsVztRQUNBUyxzQixHQUFBQSxzQjtRQUNBQyxZLEdBQUFBLFk7UUFDQUMsYyxHQUFBQSxjO1FBQ0FDLGUsR0FBQUEsZTtRQUNBQyxzQixHQUFBQSxzQjtRQUNBQyxnQixHQUFBQSxnQiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcbmltcG9ydCB7IHJlcXVlc3QgfSBmcm9tICcuLi9saWIvcmVxdWVzdCdcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vY29uZmlnL2luZGV4J1xuXG4vKipcbiAqIOiOt+WPluWfjuW4guWIl+ihqFxuICogQHBhcmFtIHsqfSBwYXJhbVxuICovXG5mdW5jdGlvbiBmaW5kUmVnaW9ucyhwYXJhbSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlcXVlc3QoJ0dFVCcsIGNvbmZpZy5ob3N0ICsgJ2RhdGEvZmluZFJlZ2lvbnMnLCBwYXJhbSwgZmFsc2UsIFwiXCIsIHRydWUpLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbi8qKlxuICog5p+l6K+i6KGM5pS/5Yy65Z+fXG4gKiBAcGFyYW0geyp9IHBhcmFtXG4gKi9cbmZ1bmN0aW9uIHF1ZXJ5UmVnaW9uc0J5UGFyZW50SWQocGFyYW0pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXF1ZXN0KCdHRVQnLCBjb25maWcuaG9zdCArICcvZGF0YS9xdWVyeVJlZ2lvbnNCeVBhcmVudElkJywgcGFyYW0sIGZhbHNlLCBcIlwiLCB0cnVlKS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vKipcbiAqIOiOt+WPlumFkuW6l+WIl+ihqOS/oeaBr1xuICogQHBhcmFtIHsqfSBwYXJhbVxuICovXG5mdW5jdGlvbiBnZXRIb3RlbExpc3QocGFyYW0pIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXF1ZXN0KCdHRVQnLCBjb25maWcuaG9zdCArICcvc2VhcmNoL2hvdGVsaW5mby9zZWFyY2gnLCBwYXJhbSwgZmFsc2UsIFwiXCIsIGZhbHNlKS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vKipcbiAqIOmFkuW6l+WbvueJh+aOpeWPo1xuICogQHBhcmFtIHsqfSBwYXJhbVxuICovXG5mdW5jdGlvbiBob3RlbEltYWdlSW5mbyhwYXJhbSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlcXVlc3QoJ0dFVCcsIGNvbmZpZy5ob3N0ICsgJy9ob3RlbGluZm8vaG90ZWxJbWFnZUluZm8nLCBwYXJhbSwgZmFsc2UsIFwiXCIsIGZhbHNlKS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vKipcbiAqIOmFkuW6l+S/oeaBry3or6bmg4VcbiAqIEBwYXJhbSB7Kn0gcGFyYW1cbiAqL1xuZnVuY3Rpb24gaG90ZWxEZXRhaWxJbmZvKHBhcmFtKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmVxdWVzdCgnR0VUJywgY29uZmlnLmhvc3QgKyAnL2hvdGVsaW5mby9ob3RlbERldGFpbEluZm8nLCBwYXJhbSwgZmFsc2UsIFwiSlNPTlwiLCBmYWxzZSkudGhlbihyZXMgPT4ge1xuICAgICAgcmVzb2x2ZShyZXMpXG4gICAgfSlcbiAgfSlcbn1cblxuLyoqXG4gKiDmiL/lnovkuqflk4Hku7fmoLzmjqXlj6NcbiAqIEBwYXJhbSB7Kn0gcGFyYW1cbiAqL1xuZnVuY3Rpb24gcm9vbVJhdGVQbGFuRGV0YWlsSW5mbyhwYXJhbSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlcXVlc3QoJ1BPU1QnLGNvbmZpZy5ob3N0ICsgJy9ob3RlbGluZm8vcm9vbVJhdGVQbGFuRGV0YWlsSW5mbycsICBwYXJhbSwgZmFsc2UsIFwiXCIsIGZhbHNlKS50aGVuKHJlcyA9PiB7XG4gICAgICByZXNvbHZlKHJlcylcbiAgICB9KVxuICB9KVxufVxuXG4vKipcbiAqIOmFkuW6l+mihOWumueul+S7t1xuICogQHBhcmFtIHsqfSBwYXJhbVxuICovXG5mdW5jdGlvbiByb29tUmF0ZVBsYW5JbmZvKHBhcmFtKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgcmVxdWVzdCgnUE9TVCcsY29uZmlnLmhvc3QgKyAnL2hvdGVsaW5mby9yb29tUmF0ZVBsYW5JbmZvJywgIHBhcmFtLCBmYWxzZSwgXCJKU09OXCIsIHRydWUpLnRoZW4ocmVzID0+IHtcbiAgICAgIHJlc29sdmUocmVzKVxuICAgIH0pXG4gIH0pXG59XG5cbmV4cG9ydCB7XG4gIGZpbmRSZWdpb25zLFxuICBxdWVyeVJlZ2lvbnNCeVBhcmVudElkLFxuICBnZXRIb3RlbExpc3QsXG4gIGhvdGVsSW1hZ2VJbmZvLFxuICBob3RlbERldGFpbEluZm8sXG4gIHJvb21SYXRlUGxhbkRldGFpbEluZm8sXG4gIHJvb21SYXRlUGxhbkluZm9cblxufVxuIl19