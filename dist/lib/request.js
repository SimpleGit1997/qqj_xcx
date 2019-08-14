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
      param = Object.assign({ sid: '02690799-5dbd-4e66-b8ea-4084f8614939', terminal: 'P_TERMINAL_WECHAT_MINIPRO' }, param);
    }
    if (type == 'JSON') {
      type = 'application/json';
    } else if (type == 'FORM') {
      type = 'application/x-www-form-urlencoded';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3QuanMiXSwibmFtZXMiOlsicmVxdWVzdCIsIm1ldGhvZCIsImZ1bGxVcmwiLCJwYXJhbSIsInRva2VuIiwidHlwZSIsImlzUmV0dXJuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJPYmplY3QiLCJhc3NpZ24iLCJzaWQiLCJ0ZXJtaW5hbCIsInd4IiwiaGVhZGVyIiwidXJsIiwiZGF0YSIsInN1Y2Nlc3MiLCJyZXMiLCJzdGF0dXNDb2RlIiwiY29kZSIsIm1zZyIsIndlcHkiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImZhaWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7O0FBRUE7Ozs7Ozs7OztBQVNBLFNBQVNBLE9BQVQsR0FBaUc7QUFBQSxNQUEvRUMsTUFBK0UsdUVBQXRFLE1BQXNFO0FBQUEsTUFBL0RDLE9BQStEO0FBQUEsTUFBdERDLEtBQXNEO0FBQUEsTUFBL0NDLEtBQStDLHVFQUF2QyxJQUF1QztBQUFBLE1BQWpDQyxJQUFpQyx1RUFBMUIsTUFBMEI7QUFBQSxNQUFsQkMsUUFBa0IsdUVBQVAsS0FBTzs7QUFDL0YsU0FBTyxJQUFJQyxPQUFKLENBQVksVUFBVUMsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDNUMsUUFBSUwsS0FBSixFQUFXO0FBQ1RELGNBQVFPLE9BQU9DLE1BQVAsQ0FBYyxFQUFFQyxLQUFLLHNDQUFQLEVBQStDQyxVQUFTLDJCQUF4RCxFQUFkLEVBQW9HVixLQUFwRyxDQUFSO0FBQ0Q7QUFDRCxRQUFJRSxRQUFRLE1BQVosRUFBb0I7QUFDbEJBLGFBQU8sa0JBQVA7QUFDRCxLQUZELE1BRU8sSUFBSUEsUUFBUSxNQUFaLEVBQW9CO0FBQ3pCQSxhQUFPLG1DQUFQO0FBQ0Q7QUFDRFMsT0FBR2QsT0FBSCxDQUFXO0FBQ1RlLGNBQVEsRUFBRSxnQkFBZ0JWLElBQWxCLEVBREM7QUFFVFcsV0FBS2QsT0FGSTtBQUdUZSxZQUFNZCxLQUhHO0FBSVRGLGNBQVFBLE1BSkM7QUFLVGlCLGVBQVMsaUJBQVVDLEdBQVYsRUFBZTtBQUN0QixZQUFJQSxJQUFJQyxVQUFKLEtBQW1CLEdBQXZCLEVBQTRCO0FBQzFCLGNBQUlkLFFBQUosRUFBYztBQUNaRSxvQkFBUVcsSUFBSUYsSUFBWjtBQUNELFdBRkQsTUFFTztBQUNMLGdCQUFJRSxJQUFJRixJQUFKLENBQVNJLElBQVQsS0FBa0IsQ0FBdEIsRUFBeUI7QUFDdkJiLHNCQUFRVyxJQUFJRixJQUFKLENBQVNBLElBQWpCO0FBQ0QsYUFGRCxNQUVPLElBQUtFLElBQUlGLElBQUosQ0FBU0ksSUFBVCxLQUFrQixDQUFuQixJQUF5QkYsSUFBSUYsSUFBSixDQUFTSyxHQUF0QyxFQUEyQztBQUNoREMsNkJBQUtDLFNBQUwsQ0FBZTtBQUNiQyx1QkFBT04sSUFBSUYsSUFBSixDQUFTSyxHQURIO0FBRWJJLHNCQUFNLE1BRk87QUFHYkMsMEJBQVU7QUFIRyxlQUFmO0FBS0QsYUFOTSxNQU1BO0FBQ0xKLDZCQUFLQyxTQUFMLENBQWU7QUFDYkMsdUJBQU8sZUFETTtBQUViQyxzQkFBTSxNQUZPO0FBR2JDLDBCQUFVO0FBSEcsZUFBZjtBQUtEO0FBQ0Y7QUFFRixTQXJCRCxNQXFCTyxJQUFJUixJQUFJQyxVQUFKLEtBQW1CLEdBQXZCLEVBQTRCO0FBQ2pDRyx5QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLG1CQUFPLFlBRE07QUFFYkMsa0JBQU0sTUFGTztBQUdiQyxzQkFBVTtBQUhHLFdBQWY7QUFLRCxTQU5NLE1BTUEsSUFBSVIsSUFBSUMsVUFBSixLQUFtQixHQUF2QixFQUE0QjtBQUNqQ0cseUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxtQkFBTyxtQkFETTtBQUViQyxrQkFBTSxNQUZPO0FBR2JDLHNCQUFVO0FBSEcsV0FBZjtBQUtELFNBTk0sTUFNQSxJQUFJUixJQUFJQyxVQUFKLEtBQW1CLEdBQXZCLEVBQTRCO0FBQ2pDRyx5QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLG1CQUFPLFlBRE07QUFFYkMsa0JBQU0sTUFGTztBQUdiQyxzQkFBVTtBQUhHLFdBQWY7QUFLRCxTQU5NLE1BTUE7QUFDTEoseUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxtQkFBTyxRQURNO0FBRWJDLGtCQUFNLE1BRk87QUFHYkMsc0JBQVU7QUFIRyxXQUFmO0FBS0Q7QUFDRixPQXBEUTtBQXFEVEMsWUFBTSxnQkFBWTtBQUNoQkwsdUJBQUtDLFNBQUwsQ0FBZTtBQUNiQyxpQkFBTyxhQURNO0FBRWJDLGdCQUFNLE1BRk87QUFHYkMsb0JBQVU7QUFIRyxTQUFmO0FBS0Q7QUEzRFEsS0FBWDtBQTZERCxHQXRFTSxDQUFQO0FBdUVEOztRQUtDM0IsTyxHQUFBQSxPIiwiZmlsZSI6InJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4vKipcbiAqIFxuICogQHBhcmFtIHsqfSBmdWxsVXJsIOivt+axguWcsOWdgFxuICogQHBhcmFtIHsqfSBwYXJhbSDor7fmsYLlj4LmlbBcbiAqIEBwYXJhbSB7Kn0gdG9rZW4g5piv5ZCm5pC65bimdG9rZW5cbiAqIEBwYXJhbSB7Kn0gbWV0aG9kIOivt+axguaWueW8jyDpu5jorqRQT1NUXG4gKiBAcGFyYW0geyp9IHR5cGUg6K+35rGC5qC85byPIEpTT04gRk9STVxuICogQHBhcmFtIHsqfSBpc1JldHVybiDmmK/lkKbnm7TmjqXmj5Dlj5bmlbDmja7vvIjkuI3ov4fmu6TvvIlcbiAqL1xuZnVuY3Rpb24gcmVxdWVzdCggbWV0aG9kID0gJ1BPU1QnLGZ1bGxVcmwsIHBhcmFtLCB0b2tlbiA9IHRydWUsIHR5cGUgPSAnSlNPTicsIGlzUmV0dXJuID0gZmFsc2UpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIHBhcmFtID0gT2JqZWN0LmFzc2lnbih7IHNpZDogJzAyNjkwNzk5LTVkYmQtNGU2Ni1iOGVhLTQwODRmODYxNDkzOScgLHRlcm1pbmFsOidQX1RFUk1JTkFMX1dFQ0hBVF9NSU5JUFJPJ30sIHBhcmFtKVxuICAgIH1cbiAgICBpZiAodHlwZSA9PSAnSlNPTicpIHtcbiAgICAgIHR5cGUgPSAnYXBwbGljYXRpb24vanNvbidcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT0gJ0ZPUk0nKSB7XG4gICAgICB0eXBlID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICB9XG4gICAgd3gucmVxdWVzdCh7XG4gICAgICBoZWFkZXI6IHsgJ0NvbnRlbnQtVHlwZSc6IHR5cGUgfSxcbiAgICAgIHVybDogZnVsbFVybCxcbiAgICAgIGRhdGE6IHBhcmFtLFxuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgaWYgKGlzUmV0dXJuKSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAocmVzLmRhdGEuY29kZSA9PT0gMCkge1xuICAgICAgICAgICAgICByZXNvbHZlKHJlcy5kYXRhLmRhdGEpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChyZXMuZGF0YS5jb2RlICE9PSAwKSAmJiByZXMuZGF0YS5tc2cpIHtcbiAgICAgICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiByZXMuZGF0YS5tc2csXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICflj5HnlJ/mnKrnn6XplJnor6/vvIzor7fogZTns7vlrqLmnI0hJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDE1MDBcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gNDAxKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfmnKrmjojmnYMg77yM55m75b2V5aSx6LSl77yBJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gNDA0KSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfmnI3liqHlmajmib7kuI3liLDmgqjmiYDor7fmsYLnmoTmlofku7bmiJbohJrmnKzvvIEnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDE1MDBcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0dXNDb2RlID09PSA1MDApIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+acjeWKoeWZqOWPkeeUn+acquefpemUmeivr++8gScsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTUwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfnlJ/mnKrnn6XplJnor6/vvIEnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDE1MDBcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmFpbDogZnVuY3Rpb24gKCkge1xuICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgdGl0bGU6ICfnvZHnu5zotoXml7bvvIzor7fph43mlrDmk43kvZzvvIEnLFxuICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICBkdXJhdGlvbjogMTUwMFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0pXG59XG5cblxuXG5leHBvcnQge1xuICByZXF1ZXN0XG59XG4iXX0=