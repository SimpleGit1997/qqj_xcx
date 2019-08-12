'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeRPXToPX = exports.changePXToRPX = exports.getClientType = exports.getUserInfo = exports.getToken = exports.getSysWidth = exports.getSysHeight = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description 获取当前（可用）屏幕高度
 * @author Songjp
 */
function getSysHeight() {
  return _wepy2.default.getSystemInfoSync().windowHeight;
}

/**
 * @description 获取当前（可用）屏幕宽度
 * @author Songjp
 */
function getSysWidth() {
  return _wepy2.default.getSystemInfoSync().windowWidth;
}

/**
 * @description 获取Token
 * @author Songjp
 */
function getToken() {
  var token = _wepy2.default.getStorageSync('openId') || '';
  return token;
}

/**
 * @description (登录凭证+用户基本信息)
 * @param restUrl 接口地址
 * @param _restParams 接口参数
 * @returns Promise
 * @author Songjp
 */
function getUserInfo() {
  return new Promise(function (resolve, reject) {
    _wepy2.default.login().then(function (res) {
      var wxCode = res.code;
      _wepy2.default.getUserInfo({ withCredentials: true }).then(function (res) {
        var info = {};
        var _userInfo = res.userInfo;
        info.userinfo = _userInfo;
        info.code = wxCode;
        info.encryptedData = res.encryptedData;
        info.iv = res.iv;
        console.log('\u5FAE\u4FE1\u6388\u6743\u767B\u5F55/\u66F4\u65B0\u4FE1\u606F');
        resolve(info);
      }).catch(reject);
    }).catch(reject);
  });
};

/**
 * @description 获取小程序设备 手机型号 + 系统版本
 * @returns String
 * @author Songjp
 */
function getClientType() {
  var model = _wepy2.default.getSystemInfoSync().model + ' ' + _wepy2.default.getSystemInfoSync().system;
  return model;
}

/**
 * @description px转化rpx
 * @returns String
 * @author Songjp
 */
function changePXToRPX(px) {
  var rpx = px * (750 / getSysWidth());
  return rpx;
}

/**
 * @description rpx转化px
 * @returns String
 * @author Songjp
 */
function changeRPXToPX(rpx) {
  var px = rpx * (getSysWidth() / 750);
  return px;
}

exports.getSysHeight = getSysHeight;
exports.getSysWidth = getSysWidth;
exports.getToken = getToken;
exports.getUserInfo = getUserInfo;
exports.getClientType = getClientType;
exports.changePXToRPX = changePXToRPX;
exports.changeRPXToPX = changeRPXToPX;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4LXN5c3RlbS5qcyJdLCJuYW1lcyI6WyJnZXRTeXNIZWlnaHQiLCJ3ZXB5IiwiZ2V0U3lzdGVtSW5mb1N5bmMiLCJ3aW5kb3dIZWlnaHQiLCJnZXRTeXNXaWR0aCIsIndpbmRvd1dpZHRoIiwiZ2V0VG9rZW4iLCJ0b2tlbiIsImdldFN0b3JhZ2VTeW5jIiwiZ2V0VXNlckluZm8iLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImxvZ2luIiwidGhlbiIsInJlcyIsInd4Q29kZSIsImNvZGUiLCJ3aXRoQ3JlZGVudGlhbHMiLCJpbmZvIiwiX3VzZXJJbmZvIiwidXNlckluZm8iLCJ1c2VyaW5mbyIsImVuY3J5cHRlZERhdGEiLCJpdiIsImNvbnNvbGUiLCJsb2ciLCJjYXRjaCIsImdldENsaWVudFR5cGUiLCJtb2RlbCIsInN5c3RlbSIsImNoYW5nZVBYVG9SUFgiLCJweCIsInJweCIsImNoYW5nZVJQWFRvUFgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUE7Ozs7QUFJQSxTQUFTQSxZQUFULEdBQXdCO0FBQ3RCLFNBQU9DLGVBQUtDLGlCQUFMLEdBQXlCQyxZQUFoQztBQUNEOztBQUVEOzs7O0FBSUEsU0FBU0MsV0FBVCxHQUF1QjtBQUNyQixTQUFPSCxlQUFLQyxpQkFBTCxHQUF5QkcsV0FBaEM7QUFDRDs7QUFFRDs7OztBQUlBLFNBQVNDLFFBQVQsR0FBb0I7QUFDbEIsTUFBSUMsUUFBUU4sZUFBS08sY0FBTCxDQUFvQixRQUFwQixLQUFpQyxFQUE3QztBQUNBLFNBQU9ELEtBQVA7QUFDRDs7QUFFRDs7Ozs7OztBQU9BLFNBQVNFLFdBQVQsR0FBdUI7QUFDckIsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ3RDWCxtQkFBS1ksS0FBTCxHQUFhQyxJQUFiLENBQWtCLFVBQUNDLEdBQUQsRUFBUztBQUN6QixVQUFJQyxTQUFTRCxJQUFJRSxJQUFqQjtBQUNBaEIscUJBQUtRLFdBQUwsQ0FBaUIsRUFBQ1MsaUJBQWlCLElBQWxCLEVBQWpCLEVBQTBDSixJQUExQyxDQUErQyxVQUFDQyxHQUFELEVBQVM7QUFDdEQsWUFBSUksT0FBTyxFQUFYO0FBQ0EsWUFBSUMsWUFBWUwsSUFBSU0sUUFBcEI7QUFDQUYsYUFBS0csUUFBTCxHQUFnQkYsU0FBaEI7QUFDQUQsYUFBS0YsSUFBTCxHQUFZRCxNQUFaO0FBQ0FHLGFBQUtJLGFBQUwsR0FBcUJSLElBQUlRLGFBQXpCO0FBQ0FKLGFBQUtLLEVBQUwsR0FBVVQsSUFBSVMsRUFBZDtBQUNBQyxnQkFBUUMsR0FBUjtBQUNBZixnQkFBUVEsSUFBUjtBQUNELE9BVEQsRUFTR1EsS0FUSCxDQVNTZixNQVRUO0FBVUQsS0FaRCxFQVlHZSxLQVpILENBWVNmLE1BWlQ7QUFhRCxHQWRNLENBQVA7QUFlRDs7QUFFRDs7Ozs7QUFLQSxTQUFTZ0IsYUFBVCxHQUF5QjtBQUN2QixNQUFJQyxRQUFRNUIsZUFBS0MsaUJBQUwsR0FBeUIyQixLQUF6QixHQUFpQyxHQUFqQyxHQUF1QzVCLGVBQUtDLGlCQUFMLEdBQXlCNEIsTUFBNUU7QUFDQSxTQUFPRCxLQUFQO0FBQ0Q7O0FBRUQ7Ozs7O0FBS0EsU0FBU0UsYUFBVCxDQUF1QkMsRUFBdkIsRUFBMkI7QUFDekIsTUFBSUMsTUFBTUQsTUFBTSxNQUFNNUIsYUFBWixDQUFWO0FBQ0EsU0FBTzZCLEdBQVA7QUFDRDs7QUFFRDs7Ozs7QUFLQSxTQUFTQyxhQUFULENBQXVCRCxHQUF2QixFQUE0QjtBQUMxQixNQUFJRCxLQUFLQyxPQUFPN0IsZ0JBQWdCLEdBQXZCLENBQVQ7QUFDQSxTQUFPNEIsRUFBUDtBQUNEOztRQUdDaEMsWSxHQUFBQSxZO1FBQ0FJLFcsR0FBQUEsVztRQUNBRSxRLEdBQUFBLFE7UUFDQUcsVyxHQUFBQSxXO1FBQ0FtQixhLEdBQUFBLGE7UUFDQUcsYSxHQUFBQSxhO1FBQ0FHLGEsR0FBQUEsYSIsImZpbGUiOiJ3eC1zeXN0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDojrflj5blvZPliY3vvIjlj6/nlKjvvInlsY/luZXpq5jluqZcbiAqIEBhdXRob3IgU29uZ2pwXG4gKi9cbmZ1bmN0aW9uIGdldFN5c0hlaWdodCgpIHtcbiAgcmV0dXJuIHdlcHkuZ2V0U3lzdGVtSW5mb1N5bmMoKS53aW5kb3dIZWlnaHRcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g6I635Y+W5b2T5YmN77yI5Y+v55So77yJ5bGP5bmV5a695bqmXG4gKiBAYXV0aG9yIFNvbmdqcFxuICovXG5mdW5jdGlvbiBnZXRTeXNXaWR0aCgpIHtcbiAgcmV0dXJuIHdlcHkuZ2V0U3lzdGVtSW5mb1N5bmMoKS53aW5kb3dXaWR0aFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDojrflj5ZUb2tlblxuICogQGF1dGhvciBTb25nanBcbiAqL1xuZnVuY3Rpb24gZ2V0VG9rZW4oKSB7XG4gIGxldCB0b2tlbiA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ29wZW5JZCcpIHx8ICcnXG4gIHJldHVybiB0b2tlblxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiAo55m75b2V5Yet6K+BK+eUqOaIt+WfuuacrOS/oeaBrylcbiAqIEBwYXJhbSByZXN0VXJsIOaOpeWPo+WcsOWdgFxuICogQHBhcmFtIF9yZXN0UGFyYW1zIOaOpeWPo+WPguaVsFxuICogQHJldHVybnMgUHJvbWlzZVxuICogQGF1dGhvciBTb25nanBcbiAqL1xuZnVuY3Rpb24gZ2V0VXNlckluZm8oKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgd2VweS5sb2dpbigpLnRoZW4oKHJlcykgPT4ge1xuICAgICAgbGV0IHd4Q29kZSA9IHJlcy5jb2RlXG4gICAgICB3ZXB5LmdldFVzZXJJbmZvKHt3aXRoQ3JlZGVudGlhbHM6IHRydWV9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgbGV0IGluZm8gPSB7fVxuICAgICAgICBsZXQgX3VzZXJJbmZvID0gcmVzLnVzZXJJbmZvXG4gICAgICAgIGluZm8udXNlcmluZm8gPSBfdXNlckluZm9cbiAgICAgICAgaW5mby5jb2RlID0gd3hDb2RlXG4gICAgICAgIGluZm8uZW5jcnlwdGVkRGF0YSA9IHJlcy5lbmNyeXB0ZWREYXRhXG4gICAgICAgIGluZm8uaXYgPSByZXMuaXZcbiAgICAgICAgY29uc29sZS5sb2coYOW+ruS/oeaOiOadg+eZu+W9lS/mm7TmlrDkv6Hmga9gKVxuICAgICAgICByZXNvbHZlKGluZm8pXG4gICAgICB9KS5jYXRjaChyZWplY3QpXG4gICAgfSkuY2F0Y2gocmVqZWN0KVxuICB9KVxufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g6I635Y+W5bCP56iL5bqP6K6+5aSHIOaJi+acuuWei+WPtyArIOezu+e7n+eJiOacrFxuICogQHJldHVybnMgU3RyaW5nXG4gKiBAYXV0aG9yIFNvbmdqcFxuICovXG5mdW5jdGlvbiBnZXRDbGllbnRUeXBlKCkge1xuICBsZXQgbW9kZWwgPSB3ZXB5LmdldFN5c3RlbUluZm9TeW5jKCkubW9kZWwgKyAnICcgKyB3ZXB5LmdldFN5c3RlbUluZm9TeW5jKCkuc3lzdGVtXG4gIHJldHVybiBtb2RlbFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBweOi9rOWMlnJweFxuICogQHJldHVybnMgU3RyaW5nXG4gKiBAYXV0aG9yIFNvbmdqcFxuICovXG5mdW5jdGlvbiBjaGFuZ2VQWFRvUlBYKHB4KSB7XG4gIGxldCBycHggPSBweCAqICg3NTAgLyBnZXRTeXNXaWR0aCgpKVxuICByZXR1cm4gcnB4XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIHJweOi9rOWMlnB4XG4gKiBAcmV0dXJucyBTdHJpbmdcbiAqIEBhdXRob3IgU29uZ2pwXG4gKi9cbmZ1bmN0aW9uIGNoYW5nZVJQWFRvUFgocnB4KSB7XG4gIGxldCBweCA9IHJweCAqIChnZXRTeXNXaWR0aCgpIC8gNzUwKVxuICByZXR1cm4gcHhcbn1cblxuZXhwb3J0ICB7XG4gIGdldFN5c0hlaWdodCxcbiAgZ2V0U3lzV2lkdGgsXG4gIGdldFRva2VuLFxuICBnZXRVc2VySW5mbyxcbiAgZ2V0Q2xpZW50VHlwZSxcbiAgY2hhbmdlUFhUb1JQWCxcbiAgY2hhbmdlUlBYVG9QWFxufVxuIl19