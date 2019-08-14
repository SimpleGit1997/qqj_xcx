'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _index = require('./../server/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Onload = function (_wepy$page) {
  _inherits(Onload, _wepy$page);

  function Onload() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Onload);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Onload.__proto__ || Object.getPrototypeOf(Onload)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '惠享住',
      backgroundColor: '#ffffff'
    }, _this.components = {}, _this.data = {
      showModal: false
    }, _this.computed = {}, _this.watch = {}, _this.methods = {
      getUserInfo: function getUserInfo(e) {
        _wepy2.default.showLoading({
          title: '加载中...'
        });
        _wepy2.default.login().then(function (res) {
          return new Promise(function (resolve, reject) {
            resolve(res.code);
          });
        }).then(function (code) {
          (0, _index.getOpenId)({
            code: code
          }).then(function (res) {
            _wepy2.default.hideLoading();
            // wepy.setStorageSync('token', res.data.token);
            // wepy.setStorageSync('userInfo', res.data.userInfo);
            // if (res.data.userInfo.member_phone) {
            //   wepy.reLaunch({
            //     url: './index'
            //   });
            // } else {
            //   this.showModal = true;
            //   this.$apply();
            // }
          });
        });
      },
      hideModal: function hideModal() {
        this.showModal = false;
        this.$apply();
      },
      getPhoneNumber: function getPhoneNumber(e) {
        if (e.detail.encryptedData) {
          bindPhone(e.detail).then(function (res) {
            _wepy2.default.reLaunch({
              url: './index'
            });
          });
        }
      },
      preventTouchMove: function preventTouchMove() {
        console.warn('preventTouchMove方法已阻止其他事件。');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Onload, [{
    key: 'onLoad',
    value: function onLoad() {}
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onHide',
    value: function onHide() {}
  }, {
    key: 'onUnload',
    value: function onUnload() {}
  }]);

  return Onload;
}(_wepy2.default.page);

exports.default = Onload;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9ubG9hZC5qcyJdLCJuYW1lcyI6WyJPbmxvYWQiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiYmFja2dyb3VuZENvbG9yIiwiY29tcG9uZW50cyIsImRhdGEiLCJzaG93TW9kYWwiLCJjb21wdXRlZCIsIndhdGNoIiwibWV0aG9kcyIsImdldFVzZXJJbmZvIiwiZSIsIndlcHkiLCJzaG93TG9hZGluZyIsInRpdGxlIiwibG9naW4iLCJ0aGVuIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXMiLCJjb2RlIiwiaGlkZUxvYWRpbmciLCJoaWRlTW9kYWwiLCIkYXBwbHkiLCJnZXRQaG9uZU51bWJlciIsImRldGFpbCIsImVuY3J5cHRlZERhdGEiLCJiaW5kUGhvbmUiLCJyZUxhdW5jaCIsInVybCIsInByZXZlbnRUb3VjaE1vdmUiLCJjb25zb2xlIiwid2FybiIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFHcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixLQURqQjtBQUVQQyx1QkFBaUI7QUFGVixLLFFBSVRDLFUsR0FBYSxFLFFBQ2JDLEksR0FBTztBQUNMQyxpQkFBVztBQUROLEssUUFHUEMsUSxHQUFXLEUsUUFDWEMsSyxHQUFRLEUsUUFLUkMsTyxHQUFVO0FBQ1JDLGlCQURRLHVCQUNJQyxDQURKLEVBQ087QUFDYkMsdUJBQUtDLFdBQUwsQ0FBaUI7QUFDZkMsaUJBQU87QUFEUSxTQUFqQjtBQUdBRix1QkFBS0csS0FBTCxHQUFhQyxJQUFiLENBQWtCLGVBQU87QUFDdkIsaUJBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjtBQUN0Q0Qsb0JBQVFFLElBQUlDLElBQVo7QUFDRCxXQUZNLENBQVA7QUFHRCxTQUpELEVBSUdMLElBSkgsQ0FJUSxnQkFBUTtBQUNkLGdDQUFVO0FBQ1JLLGtCQUFNQTtBQURFLFdBQVYsRUFFR0wsSUFGSCxDQUVRLGVBQU87QUFDYkosMkJBQUtVLFdBQUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNELFdBZEQ7QUFlRCxTQXBCRDtBQXFCRCxPQTFCTztBQTJCUkMsZUEzQlEsdUJBMkJJO0FBQ1YsYUFBS2pCLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxhQUFLa0IsTUFBTDtBQUNELE9BOUJPO0FBK0JSQyxvQkEvQlEsMEJBK0JPZCxDQS9CUCxFQStCVTtBQUNoQixZQUFJQSxFQUFFZSxNQUFGLENBQVNDLGFBQWIsRUFBNEI7QUFDMUJDLG9CQUFVakIsRUFBRWUsTUFBWixFQUFvQlYsSUFBcEIsQ0FBeUIsZUFBTztBQUM5QkosMkJBQUtpQixRQUFMLENBQWM7QUFDWkMsbUJBQUs7QUFETyxhQUFkO0FBR0QsV0FKRDtBQUtEO0FBQ0YsT0F2Q087QUF3Q1JDLHNCQXhDUSw4QkF3Q1c7QUFDakJDLGdCQUFRQyxJQUFSLENBQWEsNEJBQWI7QUFDRDtBQTFDTyxLOzs7Ozs2QkFKRCxDQUNSOzs7NkJBQ1EsQ0FDUjs7OzZCQTZDUSxDQUFFOzs7K0JBQ0EsQ0FBRTs7OztFQTVEcUJyQixlQUFLc0IsSTs7a0JBQXBCbEMsTSIsImZpbGUiOiJvbmxvYWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCB7XG4gICAgZ2V0T3BlbklkXG4gIH0gZnJvbSAnLi4vc2VydmVyL2luZGV4LmpzJztcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgT25sb2FkIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5oOg5Lqr5L2PJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnXG4gICAgfTtcbiAgICBjb21wb25lbnRzID0ge307XG4gICAgZGF0YSA9IHtcbiAgICAgIHNob3dNb2RhbDogZmFsc2VcbiAgICB9O1xuICAgIGNvbXB1dGVkID0ge307XG4gICAgd2F0Y2ggPSB7fTtcbiAgICBvbkxvYWQoKSB7XG4gICAgfVxuICAgIG9uU2hvdygpIHtcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdldFVzZXJJbmZvKGUpIHtcbiAgICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0uLi4nXG4gICAgICAgIH0pXG4gICAgICAgIHdlcHkubG9naW4oKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUocmVzLmNvZGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KS50aGVuKGNvZGUgPT4ge1xuICAgICAgICAgIGdldE9wZW5JZCh7XG4gICAgICAgICAgICBjb2RlOiBjb2RlLFxuICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgLy8gd2VweS5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByZXMuZGF0YS50b2tlbik7XG4gICAgICAgICAgICAvLyB3ZXB5LnNldFN0b3JhZ2VTeW5jKCd1c2VySW5mbycsIHJlcy5kYXRhLnVzZXJJbmZvKTtcbiAgICAgICAgICAgIC8vIGlmIChyZXMuZGF0YS51c2VySW5mby5tZW1iZXJfcGhvbmUpIHtcbiAgICAgICAgICAgIC8vICAgd2VweS5yZUxhdW5jaCh7XG4gICAgICAgICAgICAvLyAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgIC8vICAgfSk7XG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICB0aGlzLnNob3dNb2RhbCA9IHRydWU7XG4gICAgICAgICAgICAvLyAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIGhpZGVNb2RhbCgpIHtcbiAgICAgICAgdGhpcy5zaG93TW9kYWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICBnZXRQaG9uZU51bWJlcihlKSB7XG4gICAgICAgIGlmIChlLmRldGFpbC5lbmNyeXB0ZWREYXRhKSB7XG4gICAgICAgICAgYmluZFBob25lKGUuZGV0YWlsKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICB3ZXB5LnJlTGF1bmNoKHtcbiAgICAgICAgICAgICAgdXJsOiAnLi9pbmRleCdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJldmVudFRvdWNoTW92ZSgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdwcmV2ZW50VG91Y2hNb3Zl5pa55rOV5bey6Zi75q2i5YW25LuW5LqL5Lu244CCJylcbiAgICAgIH1cbiAgICB9O1xuICAgIG9uSGlkZSgpIHt9XG4gICAgb25VbmxvYWQoKSB7fVxuICB9XG4iXX0=