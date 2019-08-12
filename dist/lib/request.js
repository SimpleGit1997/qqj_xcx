'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 
 * @param {*} fullUrl 请求地址
 * @param {*} param 请求参数
 * @param {*} token 是否携带token
 * @param {*} method 请求方式 默认POST
 * @param {*} type 请求格式 JSON FORM
 * @param {*} isReturn 是否直接提取数据（不过滤）
 */
function request() {
  var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'POST';
  var fullUrl = arguments[1];
  var param = arguments[2];
  var token = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'JSON';
  var isReturn = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

  return new Promise(function (resolve, reject) {
    if (token) {
      param = Object.assign({ sid: '' }, param);
    }
    if (type == 'JSON') {
      type = 'application/json';
    } else if (type == 'FORM') {
      type = 'application/x-www-form-urlencodedn';
    }
    wx.request({
      header: { 'Content-Type': type },
      url: fullUrl,
      data: param,
      method: method,
      success: function success(res) {
        if (res.statusCode === 200) {
          if (isReturn) {
            resolve(res.data);
          } else {
            if (res.data.code === 0) {
              resolve(res.data.data);
            } else if (res.data.code !== 0 && res.data.msg) {
              _wepy2.default.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 1500
              });
            } else {
              _wepy2.default.showToast({
                title: '发生未知错误，请联系客服!',
                icon: 'none',
                duration: 1500
              });
            }
          }
        } else if (res.statusCode === 401) {
          _wepy2.default.showToast({
            title: '未授权 ，登录失败！',
            icon: 'none',
            duration: 1500
          });
        } else if (res.statusCode === 404) {
          _wepy2.default.showToast({
            title: '服务器找不到您所请求的文件或脚本！',
            icon: 'none',
            duration: 1500
          });
        } else if (res.statusCode === 500) {
          _wepy2.default.showToast({
            title: '服务器发生未知错误！',
            icon: 'none',
            duration: 1500
          });
        } else {
          _wepy2.default.showToast({
            title: '生未知错误！',
            icon: 'none',
            duration: 1500
          });
        }
      },
      fail: function fail() {
        _wepy2.default.showToast({
          title: '网络超时，请重新操作！',
          icon: 'none',
          duration: 1500
        });
      }
    });
  });
}

exports.request = request;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3QuanMiXSwibmFtZXMiOlsicmVxdWVzdCIsIm1ldGhvZCIsImZ1bGxVcmwiLCJwYXJhbSIsInRva2VuIiwidHlwZSIsImlzUmV0dXJuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJPYmplY3QiLCJhc3NpZ24iLCJzaWQiLCJ3eCIsImhlYWRlciIsInVybCIsImRhdGEiLCJzdWNjZXNzIiwicmVzIiwic3RhdHVzQ29kZSIsImNvZGUiLCJtc2ciLCJ3ZXB5Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJmYWlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7OztBQUVBOzs7Ozs7Ozs7QUFTQSxTQUFTQSxPQUFULEdBQWlHO0FBQUEsTUFBL0VDLE1BQStFLHVFQUF0RSxNQUFzRTtBQUFBLE1BQS9EQyxPQUErRDtBQUFBLE1BQXREQyxLQUFzRDtBQUFBLE1BQS9DQyxLQUErQyx1RUFBdkMsSUFBdUM7QUFBQSxNQUFqQ0MsSUFBaUMsdUVBQTFCLE1BQTBCO0FBQUEsTUFBbEJDLFFBQWtCLHVFQUFQLEtBQU87O0FBQy9GLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQVVDLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzVDLFFBQUlMLEtBQUosRUFBVztBQUNURCxjQUFRTyxPQUFPQyxNQUFQLENBQWMsRUFBRUMsS0FBSyxFQUFQLEVBQWQsRUFBMkJULEtBQTNCLENBQVI7QUFDRDtBQUNELFFBQUlFLFFBQVEsTUFBWixFQUFvQjtBQUNsQkEsYUFBTyxrQkFBUDtBQUNELEtBRkQsTUFFTyxJQUFJQSxRQUFRLE1BQVosRUFBb0I7QUFDekJBLGFBQU8sb0NBQVA7QUFDRDtBQUNEUSxPQUFHYixPQUFILENBQVc7QUFDVGMsY0FBUSxFQUFFLGdCQUFnQlQsSUFBbEIsRUFEQztBQUVUVSxXQUFLYixPQUZJO0FBR1RjLFlBQU1iLEtBSEc7QUFJVEYsY0FBUUEsTUFKQztBQUtUZ0IsZUFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCLFlBQUlBLElBQUlDLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDMUIsY0FBSWIsUUFBSixFQUFjO0FBQ1pFLG9CQUFRVSxJQUFJRixJQUFaO0FBQ0QsV0FGRCxNQUVPO0FBQ0wsZ0JBQUlFLElBQUlGLElBQUosQ0FBU0ksSUFBVCxLQUFrQixDQUF0QixFQUF5QjtBQUN2Qlosc0JBQVFVLElBQUlGLElBQUosQ0FBU0EsSUFBakI7QUFDRCxhQUZELE1BRU8sSUFBS0UsSUFBSUYsSUFBSixDQUFTSSxJQUFULEtBQWtCLENBQW5CLElBQXlCRixJQUFJRixJQUFKLENBQVNLLEdBQXRDLEVBQTJDO0FBQ2hEQyw2QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLHVCQUFPTixJQUFJRixJQUFKLENBQVNLLEdBREg7QUFFYkksc0JBQU0sTUFGTztBQUdiQywwQkFBVTtBQUhHLGVBQWY7QUFLRCxhQU5NLE1BTUE7QUFDTEosNkJBQUtDLFNBQUwsQ0FBZTtBQUNiQyx1QkFBTyxlQURNO0FBRWJDLHNCQUFNLE1BRk87QUFHYkMsMEJBQVU7QUFIRyxlQUFmO0FBS0Q7QUFDRjtBQUVGLFNBckJELE1BcUJPLElBQUlSLElBQUlDLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDakNHLHlCQUFLQyxTQUFMLENBQWU7QUFDYkMsbUJBQU8sWUFETTtBQUViQyxrQkFBTSxNQUZPO0FBR2JDLHNCQUFVO0FBSEcsV0FBZjtBQUtELFNBTk0sTUFNQSxJQUFJUixJQUFJQyxVQUFKLEtBQW1CLEdBQXZCLEVBQTRCO0FBQ2pDRyx5QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLG1CQUFPLG1CQURNO0FBRWJDLGtCQUFNLE1BRk87QUFHYkMsc0JBQVU7QUFIRyxXQUFmO0FBS0QsU0FOTSxNQU1BLElBQUlSLElBQUlDLFVBQUosS0FBbUIsR0FBdkIsRUFBNEI7QUFDakNHLHlCQUFLQyxTQUFMLENBQWU7QUFDYkMsbUJBQU8sWUFETTtBQUViQyxrQkFBTSxNQUZPO0FBR2JDLHNCQUFVO0FBSEcsV0FBZjtBQUtELFNBTk0sTUFNQTtBQUNMSix5QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLG1CQUFPLFFBRE07QUFFYkMsa0JBQU0sTUFGTztBQUdiQyxzQkFBVTtBQUhHLFdBQWY7QUFLRDtBQUNGLE9BcERRO0FBcURUQyxZQUFNLGdCQUFZO0FBQ2hCTCx1QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLGlCQUFPLGFBRE07QUFFYkMsZ0JBQU0sTUFGTztBQUdiQyxvQkFBVTtBQUhHLFNBQWY7QUFLRDtBQTNEUSxLQUFYO0FBNkRELEdBdEVNLENBQVA7QUF1RUQ7O1FBS0MxQixPLEdBQUFBLE8iLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbi8qKlxuICogXG4gKiBAcGFyYW0geyp9IGZ1bGxVcmwg6K+35rGC5Zyw5Z2AXG4gKiBAcGFyYW0geyp9IHBhcmFtIOivt+axguWPguaVsFxuICogQHBhcmFtIHsqfSB0b2tlbiDmmK/lkKbmkLrluKZ0b2tlblxuICogQHBhcmFtIHsqfSBtZXRob2Qg6K+35rGC5pa55byPIOm7mOiupFBPU1RcbiAqIEBwYXJhbSB7Kn0gdHlwZSDor7fmsYLmoLzlvI8gSlNPTiBGT1JNXG4gKiBAcGFyYW0geyp9IGlzUmV0dXJuIOaYr+WQpuebtOaOpeaPkOWPluaVsOaNru+8iOS4jei/h+a7pO+8iVxuICovXG5mdW5jdGlvbiByZXF1ZXN0KCBtZXRob2QgPSAnUE9TVCcsZnVsbFVybCwgcGFyYW0sIHRva2VuID0gdHJ1ZSwgdHlwZSA9ICdKU09OJywgaXNSZXR1cm4gPSBmYWxzZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGlmICh0b2tlbikge1xuICAgICAgcGFyYW0gPSBPYmplY3QuYXNzaWduKHsgc2lkOiAnJyB9LCBwYXJhbSlcbiAgICB9XG4gICAgaWYgKHR5cGUgPT0gJ0pTT04nKSB7XG4gICAgICB0eXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgfSBlbHNlIGlmICh0eXBlID09ICdGT1JNJykge1xuICAgICAgdHlwZSA9ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRuJ1xuICAgIH1cbiAgICB3eC5yZXF1ZXN0KHtcbiAgICAgIGhlYWRlcjogeyAnQ29udGVudC1UeXBlJzogdHlwZSB9LFxuICAgICAgdXJsOiBmdWxsVXJsLFxuICAgICAgZGF0YTogcGFyYW0sXG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgICAgICBpZiAoaXNSZXR1cm4pIHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChyZXMuZGF0YS5jb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUocmVzLmRhdGEuZGF0YSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKHJlcy5kYXRhLmNvZGUgIT09IDApICYmIHJlcy5kYXRhLm1zZykge1xuICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IHJlcy5kYXRhLm1zZyxcbiAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDE1MDBcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+WPkeeUn+acquefpemUmeivr++8jOivt+iBlOezu+WuouacjSEnLFxuICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMTUwMFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0dXNDb2RlID09PSA0MDEpIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+acquaOiOadgyDvvIznmbvlvZXlpLHotKXvvIEnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDE1MDBcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0dXNDb2RlID09PSA0MDQpIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+acjeWKoeWZqOaJvuS4jeWIsOaCqOaJgOivt+axgueahOaWh+S7tuaIluiEmuacrO+8gScsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTUwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1c0NvZGUgPT09IDUwMCkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5pyN5Yqh5Zmo5Y+R55Sf5pyq55+l6ZSZ6K+v77yBJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+eUn+acquefpemUmeivr++8gScsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTUwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBmYWlsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+e9kee7nOi2heaXtu+8jOivt+mHjeaWsOaTjeS9nO+8gScsXG4gICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn1cblxuXG5cbmV4cG9ydCB7XG4gIHJlcXVlc3Rcbn1cbiJdfQ==