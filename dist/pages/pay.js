'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../lib/utils.js');

var _index2 = require('./../server/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pay = function (_wepy$page) {
  _inherits(Pay, _wepy$page);

  function Pay() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Pay);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pay.__proto__ || Object.getPrototypeOf(Pay)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '支付订单'
    }, _this.components = {}, _this.data = {
      orderNo: '',
      endTimeValue: 0,
      currentTime: 0,
      orderInfo: {},
      timer: null,
      timeLabel: [],
      dateValue: [],
      payMethodList: [],
      available: 0,
      smsCode: '',
      second: 0,
      sendPhoneNo: '',
      payApplyNo: '',
      isOption: false,
      codeTimer: null,
      showModal: false
    }, _this.watch = {
      currentTime: function currentTime(o, n) {
        this.timeLabel = (0, _utils.calculateDiffTime)(this.currentTime, this.endTimeValue);
        if (Number(this.timeLabel[1]) === 0 && Number(this.timeLabel[2]) === 0) {
          this.orderInfo.orderState = 4;
          clearInterval(this.timer);
          this.$apply();
        }
        this.$apply();
      }
    }, _this.computed = {
      formatDate: function formatDate() {
        var value = [];
        if (this.dateValue.length > 0) {
          this.dateValue.forEach(function (item) {
            value.push(new Date(item).toString("MM月dd日"));
          });
        }
        return value;
      },
      getDays: function getDays() {
        var days = 0;
        if (this.dateValue.length === 2) {
          var first = new Date(this.dateValue[0].replace(/-/gi, "/")).valueOf();
          var second = new Date(this.dateValue[1].replace(/-/gi, "/")).valueOf();
          var time = (0, _utils.calculateDiffTime)(first, second);
          days = time[0] / 24;
          return days;
        }
      },
      getDescribe: function getDescribe() {
        var describe = ["", ""];
        if (this.dateValue.length === 2) {
          var currentDate = new Date();
          var currentStamp = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).valueOf();
          var first = new Date(this.dateValue[0].replace(/-/gi, "/")).valueOf();
          var second = new Date(this.dateValue[1].replace(/-/gi, "/")).valueOf();
          if (currentStamp == first) {
            describe[0] = "今天";
          } else if (currentStamp + 24 * 60 * 60 * 1000 == first) {
            describe[0] = "明天";
          } else if (currentStamp + 24 * 60 * 60 * 1000 * 2 == first) {
            describe[0] = "后天";
          } else {
            var str = '星期' + '日一二三四五六'.charAt(new Date(first).getDay());
            describe[0] = str;
          }
          if (currentStamp == second) {
            describe[1] = "今天";
          } else if (currentStamp + 24 * 60 * 60 * 1000 == second) {
            describe[1] = "明天";
          } else if (currentStamp + 24 * 60 * 60 * 1000 * 2 == second) {
            describe[1] = "后天";
          } else {
            var str = '星期' + '日一二三四五六'.charAt(new Date(second).getDay());
            describe[1] = str;
          }
        }
        return describe;
      },
      getBalance: function getBalance() {
        return (0, _utils.formatNumber)(this.available);
      }
    }, _this.methods = {
      handleMethods: function handleMethods(index) {
        this.payMethodList.forEach(function (item, _index) {
          if (index === _index) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
        this.$apply();
      },
      handlePay: function handlePay() {
        var _this2 = this;

        if (this.orderInfo.orderState === 4) {
          _wepy2.default.showToast({
            title: '订单已失效，请重新下单！',
            icon: 'none',
            duration: 1200
          });
        } else {
          var index = null;
          this.payMethodList.forEach(function (item, _index) {
            if (item.checked) {
              index = _index;
            }
          });
          var row = this.payMethodList[index];
          if (row.payChannelCode === 'BALANCE') {
            (0, _index2.payApply)({
              orders: {
                orderBizCategory: this.orderInfo.orderBizCategory,
                orderNo: this.orderInfo.orderNo,
                orderTotalFee: this.orderInfo.payPrice,
                sign: this.orderInfo.sign
              },
              payBizCategory: row.payBizCategory,
              payPlatform: row.payPlatform,
              payTerminal: row.payTerminal,
              payModeCode: row.payModeCode,
              payOptional: {
                id: this.orderInfo.userId
              }
            }).then(function (res) {
              _this2.showModal = true;
              _this2.$apply();
              console.log('11', res);
            });
          } else if (row.payChannelCode === 'WXA_API') {
            console.log('小程序支付还未开放');
          }
        }
      },
      smsCodeInput: function smsCodeInput(e) {
        this.smsCode = e.detail.value;
      },

      /**
       * 获取验证码
       */
      handleGetCode: function handleGetCode() {
        var _this3 = this;

        var query = {
          userId: this.orderInfo.userId,
          isShowPhoneNo: false
        };
        (0, _index2.sendVialidate)(query).then(function (res) {
          _this3.sendPhoneNo = res.sendPhoneNo;
          _this3.second = 60;
          _this3.isOption = true;
          _this3.codeTimer = setInterval(function () {
            _this3.second--;
            _this3.$apply();
            if (_this3.second <= 0) {
              clearInterval(_this3.codeTimer);
              _this3.isOption = false;
              _this3.$apply();
            }
          }, 1000);
        });
      },
      handleCloseDialog: function handleCloseDialog() {
        this.showModal = false;
        this.$apply();
      },
      submitCode: function submitCode() {
        var _this4 = this;

        _wepy2.default.showLoading({
          title: '加载中...'
        });
        (0, _index2.submitValidate)({
          phoneNo: this.sendPhoneNo,
          smsCode: this.smsCode
        }).then(function (res) {
          if (res.state == 1) {
            (0, _index2.balancePay)({
              payApplyNo: _this4.orderInfo.orderNo
            }).then(function (res) {
              console.log('余额支付', res);
            });
            _wepy2.default.hideLoading();
          } else if (res.state == 2) {
            _wepy2.default.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1500
            });
          }
        });
      },
      preventTouchMove: function preventTouchMove() {
        console.warn('preventTouchMove方法已阻止其他事件。');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Pay, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      var _this5 = this;

      (0, _index2.payMode)({
        bizCategory: 'P_BIZ_CATEGORY_DD',
        bizTerminal: 'P_TERMINAL_WECHAT_MINIPRO'
      }).then(function (res) {
        _this5.payMethodList = res.payModes;
        if (_this5.payMethodList.length > 0) {
          _this5.payMethodList[0].checked = true;
        }
        _this5.available = res.available;
        _this5.$apply();
      });
      if (option.orderNo) {
        (0, _index2.payOrderInfo)({
          orderNo: option.orderNo
        }).then(function (res) {
          _this5.orderInfo = res.orderInfo;
          _this5.orderInfo.sign = res.sign;
          var createTimeValue = new Date(_this5.orderInfo.orderTime).valueOf();
          _this5.dateValue = [new Date(_this5.orderInfo.bookCheckinTime).toString('yyyy-MM-dd'), new Date(_this5.orderInfo.checkoutTime).toString('yyyy-MM-dd')];
          _this5.endTimeValue = createTimeValue + 1000 * 60 * 15;
          _this5.currentTime = new Date().valueOf();
          _this5.$apply();
          if (_this5.currentTime > _this5.endTimeValue) {
            _this5.orderInfo.orderState = 4;
            _this5.$apply();
          }
          if (_this5.orderInfo.orderState === 0 && _this5.currentTime < _this5.endTimeValue) {
            _this5.timer = setInterval(function () {
              _this5.currentTime += 1000;
              _this5.$apply();
            }, 1000);
            _this5.$apply();
          }
        });
      }
    }
  }]);

  return Pay;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Pay , 'pages/pay'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheS5qcyJdLCJuYW1lcyI6WyJQYXkiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJvcmRlck5vIiwiZW5kVGltZVZhbHVlIiwiY3VycmVudFRpbWUiLCJvcmRlckluZm8iLCJ0aW1lciIsInRpbWVMYWJlbCIsImRhdGVWYWx1ZSIsInBheU1ldGhvZExpc3QiLCJhdmFpbGFibGUiLCJzbXNDb2RlIiwic2Vjb25kIiwic2VuZFBob25lTm8iLCJwYXlBcHBseU5vIiwiaXNPcHRpb24iLCJjb2RlVGltZXIiLCJzaG93TW9kYWwiLCJ3YXRjaCIsIm8iLCJuIiwiTnVtYmVyIiwib3JkZXJTdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCIkYXBwbHkiLCJjb21wdXRlZCIsImZvcm1hdERhdGUiLCJ2YWx1ZSIsImxlbmd0aCIsImZvckVhY2giLCJwdXNoIiwiRGF0ZSIsIml0ZW0iLCJ0b1N0cmluZyIsImdldERheXMiLCJkYXlzIiwiZmlyc3QiLCJyZXBsYWNlIiwidmFsdWVPZiIsInRpbWUiLCJnZXREZXNjcmliZSIsImRlc2NyaWJlIiwiY3VycmVudERhdGUiLCJjdXJyZW50U3RhbXAiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsInN0ciIsImNoYXJBdCIsImdldERheSIsImdldEJhbGFuY2UiLCJtZXRob2RzIiwiaGFuZGxlTWV0aG9kcyIsImluZGV4IiwiX2luZGV4IiwiY2hlY2tlZCIsImhhbmRsZVBheSIsIndlcHkiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsInJvdyIsInBheUNoYW5uZWxDb2RlIiwib3JkZXJzIiwib3JkZXJCaXpDYXRlZ29yeSIsIm9yZGVyVG90YWxGZWUiLCJwYXlQcmljZSIsInNpZ24iLCJwYXlCaXpDYXRlZ29yeSIsInBheVBsYXRmb3JtIiwicGF5VGVybWluYWwiLCJwYXlNb2RlQ29kZSIsInBheU9wdGlvbmFsIiwiaWQiLCJ1c2VySWQiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsInJlcyIsInNtc0NvZGVJbnB1dCIsImUiLCJkZXRhaWwiLCJoYW5kbGVHZXRDb2RlIiwicXVlcnkiLCJpc1Nob3dQaG9uZU5vIiwic2V0SW50ZXJ2YWwiLCJoYW5kbGVDbG9zZURpYWxvZyIsInN1Ym1pdENvZGUiLCJzaG93TG9hZGluZyIsInBob25lTm8iLCJzdGF0ZSIsImhpZGVMb2FkaW5nIiwibXNnIiwicHJldmVudFRvdWNoTW92ZSIsIndhcm4iLCJvcHRpb24iLCJiaXpDYXRlZ29yeSIsImJpelRlcm1pbmFsIiwicGF5TW9kZXMiLCJjcmVhdGVUaW1lVmFsdWUiLCJvcmRlclRpbWUiLCJib29rQ2hlY2tpblRpbWUiLCJjaGVja291dFRpbWUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOztBQUlBOzs7Ozs7Ozs7O0lBUXFCQSxHOzs7Ozs7Ozs7Ozs7OztnTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUNiQyxJLEdBQU87QUFDTEMsZUFBUyxFQURKO0FBRUxDLG9CQUFjLENBRlQ7QUFHTEMsbUJBQWEsQ0FIUjtBQUlMQyxpQkFBVyxFQUpOO0FBS0xDLGFBQU8sSUFMRjtBQU1MQyxpQkFBVyxFQU5OO0FBT0xDLGlCQUFXLEVBUE47QUFRTEMscUJBQWUsRUFSVjtBQVNMQyxpQkFBVyxDQVROO0FBVUxDLGVBQVMsRUFWSjtBQVdMQyxjQUFRLENBWEg7QUFZTEMsbUJBQWEsRUFaUjtBQWFMQyxrQkFBWSxFQWJQO0FBY0xDLGdCQUFVLEtBZEw7QUFlTEMsaUJBQVcsSUFmTjtBQWdCTEMsaUJBQVc7QUFoQk4sSyxRQWtCUEMsSyxHQUFRO0FBQ05kLGlCQURNLHVCQUNNZSxDQUROLEVBQ1NDLENBRFQsRUFDWTtBQUNoQixhQUFLYixTQUFMLEdBQWlCLDhCQUFrQixLQUFLSCxXQUF2QixFQUFvQyxLQUFLRCxZQUF6QyxDQUFqQjtBQUNBLFlBQUlrQixPQUFPLEtBQUtkLFNBQUwsQ0FBZSxDQUFmLENBQVAsTUFBOEIsQ0FBOUIsSUFBbUNjLE9BQU8sS0FBS2QsU0FBTCxDQUFlLENBQWYsQ0FBUCxNQUE4QixDQUFyRSxFQUF3RTtBQUN0RSxlQUFLRixTQUFMLENBQWVpQixVQUFmLEdBQTRCLENBQTVCO0FBQ0FDLHdCQUFjLEtBQUtqQixLQUFuQjtBQUNBLGVBQUtrQixNQUFMO0FBQ0Q7QUFDRCxhQUFLQSxNQUFMO0FBQ0Q7QUFUSyxLLFFBV1JDLFEsR0FBVztBQUNUQyxnQkFEUyx3QkFDSTtBQUNYLFlBQUlDLFFBQVEsRUFBWjtBQUNBLFlBQUksS0FBS25CLFNBQUwsQ0FBZW9CLE1BQWYsR0FBd0IsQ0FBNUIsRUFBK0I7QUFDN0IsZUFBS3BCLFNBQUwsQ0FBZXFCLE9BQWYsQ0FBdUIsZ0JBQVE7QUFDN0JGLGtCQUFNRyxJQUFOLENBQVcsSUFBSUMsSUFBSixDQUFTQyxJQUFULEVBQWVDLFFBQWYsQ0FBd0IsUUFBeEIsQ0FBWDtBQUNELFdBRkQ7QUFHRDtBQUNELGVBQU9OLEtBQVA7QUFDRCxPQVRRO0FBVVRPLGFBVlMscUJBVUM7QUFDUixZQUFJQyxPQUFPLENBQVg7QUFDQSxZQUFJLEtBQUszQixTQUFMLENBQWVvQixNQUFmLEtBQTBCLENBQTlCLEVBQWlDO0FBQy9CLGNBQUlRLFFBQVEsSUFBSUwsSUFBSixDQUFTLEtBQUt2QixTQUFMLENBQWUsQ0FBZixFQUFrQjZCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWlDLEdBQWpDLENBQVQsRUFBZ0RDLE9BQWhELEVBQVo7QUFDQSxjQUFJMUIsU0FBUyxJQUFJbUIsSUFBSixDQUFTLEtBQUt2QixTQUFMLENBQWUsQ0FBZixFQUFrQjZCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWlDLEdBQWpDLENBQVQsRUFBZ0RDLE9BQWhELEVBQWI7QUFDQSxjQUFJQyxPQUFPLDhCQUFrQkgsS0FBbEIsRUFBeUJ4QixNQUF6QixDQUFYO0FBQ0F1QixpQkFBT0ksS0FBSyxDQUFMLElBQVUsRUFBakI7QUFDQSxpQkFBT0osSUFBUDtBQUNEO0FBQ0YsT0FuQlE7QUFvQlRLLGlCQXBCUyx5QkFvQks7QUFDWixZQUFJQyxXQUFXLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBZjtBQUNBLFlBQUksS0FBS2pDLFNBQUwsQ0FBZW9CLE1BQWYsS0FBMEIsQ0FBOUIsRUFBaUM7QUFDL0IsY0FBSWMsY0FBYyxJQUFJWCxJQUFKLEVBQWxCO0FBQ0EsY0FBSVksZUFBZSxJQUFJWixJQUFKLENBQ2pCVyxZQUFZRSxXQUFaLEVBRGlCLEVBRWpCRixZQUFZRyxRQUFaLEVBRmlCLEVBR2pCSCxZQUFZSSxPQUFaLEVBSGlCLEVBSWpCUixPQUppQixFQUFuQjtBQUtBLGNBQUlGLFFBQVEsSUFBSUwsSUFBSixDQUFTLEtBQUt2QixTQUFMLENBQWUsQ0FBZixFQUFrQjZCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWlDLEdBQWpDLENBQVQsRUFBZ0RDLE9BQWhELEVBQVo7QUFDQSxjQUFJMUIsU0FBUyxJQUFJbUIsSUFBSixDQUFTLEtBQUt2QixTQUFMLENBQWUsQ0FBZixFQUFrQjZCLE9BQWxCLENBQTBCLEtBQTFCLEVBQWlDLEdBQWpDLENBQVQsRUFBZ0RDLE9BQWhELEVBQWI7QUFDQSxjQUFJSyxnQkFBZ0JQLEtBQXBCLEVBQTJCO0FBQ3pCSyxxQkFBUyxDQUFULElBQWMsSUFBZDtBQUNELFdBRkQsTUFFTyxJQUFJRSxlQUFlLEtBQUssRUFBTCxHQUFVLEVBQVYsR0FBZSxJQUE5QixJQUFzQ1AsS0FBMUMsRUFBaUQ7QUFDdERLLHFCQUFTLENBQVQsSUFBYyxJQUFkO0FBQ0QsV0FGTSxNQUVBLElBQUlFLGVBQWUsS0FBSyxFQUFMLEdBQVUsRUFBVixHQUFlLElBQWYsR0FBc0IsQ0FBckMsSUFBMENQLEtBQTlDLEVBQXFEO0FBQzFESyxxQkFBUyxDQUFULElBQWMsSUFBZDtBQUNELFdBRk0sTUFFQTtBQUNMLGdCQUFJTSxNQUFNLE9BQU8sVUFBVUMsTUFBVixDQUFpQixJQUFJakIsSUFBSixDQUFTSyxLQUFULEVBQWdCYSxNQUFoQixFQUFqQixDQUFqQjtBQUNBUixxQkFBUyxDQUFULElBQWNNLEdBQWQ7QUFDRDtBQUNELGNBQUlKLGdCQUFnQi9CLE1BQXBCLEVBQTRCO0FBQzFCNkIscUJBQVMsQ0FBVCxJQUFjLElBQWQ7QUFDRCxXQUZELE1BRU8sSUFBSUUsZUFBZSxLQUFLLEVBQUwsR0FBVSxFQUFWLEdBQWUsSUFBOUIsSUFBc0MvQixNQUExQyxFQUFrRDtBQUN2RDZCLHFCQUFTLENBQVQsSUFBYyxJQUFkO0FBQ0QsV0FGTSxNQUVBLElBQUlFLGVBQWUsS0FBSyxFQUFMLEdBQVUsRUFBVixHQUFlLElBQWYsR0FBc0IsQ0FBckMsSUFBMEMvQixNQUE5QyxFQUFzRDtBQUMzRDZCLHFCQUFTLENBQVQsSUFBYyxJQUFkO0FBQ0QsV0FGTSxNQUVBO0FBQ0wsZ0JBQUlNLE1BQU0sT0FBTyxVQUFVQyxNQUFWLENBQWlCLElBQUlqQixJQUFKLENBQVNuQixNQUFULEVBQWlCcUMsTUFBakIsRUFBakIsQ0FBakI7QUFDQVIscUJBQVMsQ0FBVCxJQUFjTSxHQUFkO0FBQ0Q7QUFDRjtBQUNELGVBQU9OLFFBQVA7QUFDRCxPQXJEUTtBQXNEVFMsZ0JBdERTLHdCQXNESTtBQUNYLGVBQU8seUJBQWEsS0FBS3hDLFNBQWxCLENBQVA7QUFDRDtBQXhEUSxLLFFBMERYeUMsTyxHQUFVO0FBQ1JDLG1CQURRLHlCQUNNQyxLQUROLEVBQ2E7QUFDbkIsYUFBSzVDLGFBQUwsQ0FBbUJvQixPQUFuQixDQUEyQixVQUFDRyxJQUFELEVBQU9zQixNQUFQLEVBQWtCO0FBQzNDLGNBQUlELFVBQVVDLE1BQWQsRUFBc0I7QUFDcEJ0QixpQkFBS3VCLE9BQUwsR0FBZSxJQUFmO0FBQ0QsV0FGRCxNQUVPO0FBQ0x2QixpQkFBS3VCLE9BQUwsR0FBZSxLQUFmO0FBQ0Q7QUFDRixTQU5EO0FBT0EsYUFBSy9CLE1BQUw7QUFDRCxPQVZPO0FBV1JnQyxlQVhRLHVCQVdJO0FBQUE7O0FBQ1YsWUFBSSxLQUFLbkQsU0FBTCxDQUFlaUIsVUFBZixLQUE4QixDQUFsQyxFQUFxQztBQUNuQ21DLHlCQUFLQyxTQUFMLENBQWU7QUFDYkMsbUJBQU8sY0FETTtBQUViQyxrQkFBTSxNQUZPO0FBR2JDLHNCQUFVO0FBSEcsV0FBZjtBQUtELFNBTkQsTUFNTztBQUNMLGNBQUlSLFFBQVEsSUFBWjtBQUNBLGVBQUs1QyxhQUFMLENBQW1Cb0IsT0FBbkIsQ0FBMkIsVUFBQ0csSUFBRCxFQUFPc0IsTUFBUCxFQUFrQjtBQUMzQyxnQkFBSXRCLEtBQUt1QixPQUFULEVBQWtCO0FBQ2hCRixzQkFBUUMsTUFBUjtBQUNEO0FBQ0YsV0FKRDtBQUtBLGNBQUlRLE1BQU0sS0FBS3JELGFBQUwsQ0FBbUI0QyxLQUFuQixDQUFWO0FBQ0EsY0FBSVMsSUFBSUMsY0FBSixLQUF1QixTQUEzQixFQUFzQztBQUNwQyxrQ0FBUztBQUNQQyxzQkFBUTtBQUNOQyxrQ0FBa0IsS0FBSzVELFNBQUwsQ0FBZTRELGdCQUQzQjtBQUVOL0QseUJBQVMsS0FBS0csU0FBTCxDQUFlSCxPQUZsQjtBQUdOZ0UsK0JBQWUsS0FBSzdELFNBQUwsQ0FBZThELFFBSHhCO0FBSU5DLHNCQUFNLEtBQUsvRCxTQUFMLENBQWUrRDtBQUpmLGVBREQ7QUFPUEMsOEJBQWdCUCxJQUFJTyxjQVBiO0FBUVBDLDJCQUFhUixJQUFJUSxXQVJWO0FBU1BDLDJCQUFhVCxJQUFJUyxXQVRWO0FBVVBDLDJCQUFhVixJQUFJVSxXQVZWO0FBV1BDLDJCQUFhO0FBQ1hDLG9CQUFJLEtBQUtyRSxTQUFMLENBQWVzRTtBQURSO0FBWE4sYUFBVCxFQWNHQyxJQWRILENBY1EsZUFBTztBQUNiLHFCQUFLM0QsU0FBTCxHQUFpQixJQUFqQjtBQUNBLHFCQUFLTyxNQUFMO0FBQ0FxRCxzQkFBUUMsR0FBUixDQUFZLElBQVosRUFBaUJDLEdBQWpCO0FBQ0QsYUFsQkQ7QUFtQkQsV0FwQkQsTUFvQk8sSUFBSWpCLElBQUlDLGNBQUosS0FBdUIsU0FBM0IsRUFBc0M7QUFDM0NjLG9CQUFRQyxHQUFSLENBQVksV0FBWjtBQUNEO0FBQ0Y7QUFDRixPQWxETztBQW1EUkUsa0JBbkRRLHdCQW1ES0MsQ0FuREwsRUFtRFE7QUFDZCxhQUFLdEUsT0FBTCxHQUFlc0UsRUFBRUMsTUFBRixDQUFTdkQsS0FBeEI7QUFDRCxPQXJETzs7QUFzRFI7OztBQUdBd0QsbUJBekRRLDJCQXlEUTtBQUFBOztBQUNkLFlBQUlDLFFBQVE7QUFDVlQsa0JBQVEsS0FBS3RFLFNBQUwsQ0FBZXNFLE1BRGI7QUFFVlUseUJBQWU7QUFGTCxTQUFaO0FBSUEsbUNBQWNELEtBQWQsRUFBcUJSLElBQXJCLENBQTBCLGVBQU87QUFDL0IsaUJBQUsvRCxXQUFMLEdBQW1Ca0UsSUFBSWxFLFdBQXZCO0FBQ0EsaUJBQUtELE1BQUwsR0FBYyxFQUFkO0FBQ0EsaUJBQUtHLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxpQkFBS0MsU0FBTCxHQUFpQnNFLFlBQVksWUFBTTtBQUNqQyxtQkFBSzFFLE1BQUw7QUFDRSxtQkFBS1ksTUFBTDtBQUNGLGdCQUFJLE9BQUtaLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUNwQlcsNEJBQWMsT0FBS1AsU0FBbkI7QUFDQSxxQkFBS0QsUUFBTCxHQUFnQixLQUFoQjtBQUNBLHFCQUFLUyxNQUFMO0FBQ0Q7QUFDRixXQVJnQixFQVFkLElBUmMsQ0FBakI7QUFTRCxTQWJEO0FBY0QsT0E1RU87QUE2RVIrRCx1QkE3RVEsK0JBNkVZO0FBQ2xCLGFBQUt0RSxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsYUFBS08sTUFBTDtBQUNELE9BaEZPO0FBaUZSZ0UsZ0JBakZRLHdCQWlGSztBQUFBOztBQUNYL0IsdUJBQUtnQyxXQUFMLENBQWlCO0FBQ2Y5QixpQkFBTztBQURRLFNBQWpCO0FBR0Esb0NBQWU7QUFDYitCLG1CQUFTLEtBQUs3RSxXQUREO0FBRWJGLG1CQUFTLEtBQUtBO0FBRkQsU0FBZixFQUdHaUUsSUFISCxDQUdRLGVBQU87QUFDYixjQUFJRyxJQUFJWSxLQUFKLElBQWEsQ0FBakIsRUFBb0I7QUFDbEIsb0NBQVc7QUFDVDdFLDBCQUFZLE9BQUtULFNBQUwsQ0FBZUg7QUFEbEIsYUFBWCxFQUVHMEUsSUFGSCxDQUVRLGVBQU87QUFDYkMsc0JBQVFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CQyxHQUFwQjtBQUNELGFBSkQ7QUFLQXRCLDJCQUFLbUMsV0FBTDtBQUNELFdBUEQsTUFPTyxJQUFJYixJQUFJWSxLQUFKLElBQWEsQ0FBakIsRUFBb0I7QUFDekJsQywyQkFBS0MsU0FBTCxDQUFlO0FBQ2JDLHFCQUFPb0IsSUFBSWMsR0FERTtBQUViakMsb0JBQU0sTUFGTztBQUdiQyx3QkFBVTtBQUhHLGFBQWY7QUFLRDtBQUNGLFNBbEJEO0FBbUJELE9BeEdPO0FBeUdSaUMsc0JBekdRLDhCQXlHVztBQUNqQmpCLGdCQUFRa0IsSUFBUixDQUFhLDRCQUFiO0FBQ0Q7QUEzR08sSzs7Ozs7NkJBNkdELENBQUU7OzsyQkFDSkMsTSxFQUFRO0FBQUE7O0FBQ2IsMkJBQVE7QUFDTkMscUJBQWEsbUJBRFA7QUFFTkMscUJBQWE7QUFGUCxPQUFSLEVBR0d0QixJQUhILENBR1EsZUFBTztBQUNiLGVBQUtuRSxhQUFMLEdBQXFCc0UsSUFBSW9CLFFBQXpCO0FBQ0EsWUFBSSxPQUFLMUYsYUFBTCxDQUFtQm1CLE1BQW5CLEdBQTRCLENBQWhDLEVBQW1DO0FBQ2pDLGlCQUFLbkIsYUFBTCxDQUFtQixDQUFuQixFQUFzQjhDLE9BQXRCLEdBQWdDLElBQWhDO0FBQ0Q7QUFDRCxlQUFLN0MsU0FBTCxHQUFpQnFFLElBQUlyRSxTQUFyQjtBQUNBLGVBQUtjLE1BQUw7QUFDRCxPQVZEO0FBV0EsVUFBSXdFLE9BQU85RixPQUFYLEVBQW9CO0FBQ2xCLGtDQUFhO0FBQ1hBLG1CQUFTOEYsT0FBTzlGO0FBREwsU0FBYixFQUVHMEUsSUFGSCxDQUVRLGVBQU87QUFDYixpQkFBS3ZFLFNBQUwsR0FBaUIwRSxJQUFJMUUsU0FBckI7QUFDQSxpQkFBS0EsU0FBTCxDQUFlK0QsSUFBZixHQUFzQlcsSUFBSVgsSUFBMUI7QUFDQSxjQUFJZ0Msa0JBQWtCLElBQUlyRSxJQUFKLENBQVMsT0FBSzFCLFNBQUwsQ0FBZWdHLFNBQXhCLEVBQW1DL0QsT0FBbkMsRUFBdEI7QUFDQSxpQkFBSzlCLFNBQUwsR0FBaUIsQ0FBQyxJQUFJdUIsSUFBSixDQUFTLE9BQUsxQixTQUFMLENBQWVpRyxlQUF4QixFQUF5Q3JFLFFBQXpDLENBQWtELFlBQWxELENBQUQsRUFBa0UsSUFBSUYsSUFBSixDQUFTLE9BQUsxQixTQUFMLENBQWVrRyxZQUF4QixFQUFzQ3RFLFFBQXRDLENBQStDLFlBQS9DLENBQWxFLENBQWpCO0FBQ0EsaUJBQUs5QixZQUFMLEdBQW9CaUcsa0JBQWtCLE9BQU8sRUFBUCxHQUFZLEVBQWxEO0FBQ0EsaUJBQUtoRyxXQUFMLEdBQW1CLElBQUkyQixJQUFKLEdBQVdPLE9BQVgsRUFBbkI7QUFDQSxpQkFBS2QsTUFBTDtBQUNBLGNBQUksT0FBS3BCLFdBQUwsR0FBbUIsT0FBS0QsWUFBNUIsRUFBMEM7QUFDeEMsbUJBQUtFLFNBQUwsQ0FBZWlCLFVBQWYsR0FBNEIsQ0FBNUI7QUFDQSxtQkFBS0UsTUFBTDtBQUNEO0FBQ0QsY0FBSSxPQUFLbkIsU0FBTCxDQUFlaUIsVUFBZixLQUE4QixDQUE5QixJQUFtQyxPQUFLbEIsV0FBTCxHQUFtQixPQUFLRCxZQUEvRCxFQUE2RTtBQUMzRSxtQkFBS0csS0FBTCxHQUFhZ0YsWUFBWSxZQUFNO0FBQzdCLHFCQUFLbEYsV0FBTCxJQUFvQixJQUFwQjtBQUNBLHFCQUFLb0IsTUFBTDtBQUNELGFBSFksRUFHVixJQUhVLENBQWI7QUFJQSxtQkFBS0EsTUFBTDtBQUNEO0FBQ0YsU0FyQkQ7QUFzQkQ7QUFDRjs7OztFQTlPOEJpQyxlQUFLK0MsSTs7a0JBQWpCM0csRyIsImZpbGUiOiJwYXkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IHtcbiAgICBjYWxjdWxhdGVEaWZmVGltZSxcbiAgICBmb3JtYXROdW1iZXJcbiAgfSBmcm9tICcuLi9saWIvdXRpbHMuanMnXG4gIGltcG9ydCB7XG4gICAgcGF5T3JkZXJJbmZvLFxuICAgIHBheU1vZGUsXG4gICAgc2VuZFZpYWxpZGF0ZSxcbiAgICBwYXlBcHBseSxcbiAgICBzdWJtaXRWYWxpZGF0ZSxcbiAgICBiYWxhbmNlUGF5XG4gIH0gZnJvbSAnLi4vc2VydmVyL2luZGV4LmpzJ1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBQYXkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmlK/ku5jorqLljZUnXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7fTtcbiAgICBkYXRhID0ge1xuICAgICAgb3JkZXJObzogJycsXG4gICAgICBlbmRUaW1lVmFsdWU6IDAsXG4gICAgICBjdXJyZW50VGltZTogMCxcbiAgICAgIG9yZGVySW5mbzoge30sXG4gICAgICB0aW1lcjogbnVsbCxcbiAgICAgIHRpbWVMYWJlbDogW10sXG4gICAgICBkYXRlVmFsdWU6IFtdLFxuICAgICAgcGF5TWV0aG9kTGlzdDogW10sXG4gICAgICBhdmFpbGFibGU6IDAsXG4gICAgICBzbXNDb2RlOiAnJyxcbiAgICAgIHNlY29uZDogMCxcbiAgICAgIHNlbmRQaG9uZU5vOiAnJyxcbiAgICAgIHBheUFwcGx5Tm86ICcnLFxuICAgICAgaXNPcHRpb246IGZhbHNlLFxuICAgICAgY29kZVRpbWVyOiBudWxsLFxuICAgICAgc2hvd01vZGFsOiBmYWxzZVxuICAgIH1cbiAgICB3YXRjaCA9IHtcbiAgICAgIGN1cnJlbnRUaW1lKG8sIG4pIHtcbiAgICAgICAgdGhpcy50aW1lTGFiZWwgPSBjYWxjdWxhdGVEaWZmVGltZSh0aGlzLmN1cnJlbnRUaW1lLCB0aGlzLmVuZFRpbWVWYWx1ZSk7XG4gICAgICAgIGlmIChOdW1iZXIodGhpcy50aW1lTGFiZWxbMV0pID09PSAwICYmIE51bWJlcih0aGlzLnRpbWVMYWJlbFsyXSkgPT09IDApIHtcbiAgICAgICAgICB0aGlzLm9yZGVySW5mby5vcmRlclN0YXRlID0gNFxuICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcik7XG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBmb3JtYXREYXRlKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLmRhdGVWYWx1ZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdmFsdWUucHVzaChuZXcgRGF0ZShpdGVtKS50b1N0cmluZyhcIk1N5pyIZGTml6VcIikpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0sXG4gICAgICBnZXREYXlzKCkge1xuICAgICAgICBsZXQgZGF5cyA9IDA7XG4gICAgICAgIGlmICh0aGlzLmRhdGVWYWx1ZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICBsZXQgZmlyc3QgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVswXS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnZhbHVlT2YoKTtcbiAgICAgICAgICBsZXQgc2Vjb25kID0gbmV3IERhdGUodGhpcy5kYXRlVmFsdWVbMV0ucmVwbGFjZSgvLS9naSwgXCIvXCIpKS52YWx1ZU9mKCk7XG4gICAgICAgICAgbGV0IHRpbWUgPSBjYWxjdWxhdGVEaWZmVGltZShmaXJzdCwgc2Vjb25kKTtcbiAgICAgICAgICBkYXlzID0gdGltZVswXSAvIDI0O1xuICAgICAgICAgIHJldHVybiBkYXlzO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0RGVzY3JpYmUoKSB7XG4gICAgICAgIGxldCBkZXNjcmliZSA9IFtcIlwiLCBcIlwiXTtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRTdGFtcCA9IG5ldyBEYXRlKFxuICAgICAgICAgICAgY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgIGN1cnJlbnREYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICBjdXJyZW50RGF0ZS5nZXREYXRlKClcbiAgICAgICAgICApLnZhbHVlT2YoKTtcbiAgICAgICAgICBsZXQgZmlyc3QgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVswXS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnZhbHVlT2YoKTtcbiAgICAgICAgICBsZXQgc2Vjb25kID0gbmV3IERhdGUodGhpcy5kYXRlVmFsdWVbMV0ucmVwbGFjZSgvLS9naSwgXCIvXCIpKS52YWx1ZU9mKCk7XG4gICAgICAgICAgaWYgKGN1cnJlbnRTdGFtcCA9PSBmaXJzdCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMF0gPSBcIuS7iuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YW1wICsgMjQgKiA2MCAqIDYwICogMTAwMCA9PSBmaXJzdCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMF0gPSBcIuaYjuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YW1wICsgMjQgKiA2MCAqIDYwICogMTAwMCAqIDIgPT0gZmlyc3QpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzBdID0gXCLlkI7lpKlcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHN0ciA9ICfmmJ/mnJ8nICsgJ+aXpeS4gOS6jOS4ieWbm+S6lOWFrScuY2hhckF0KG5ldyBEYXRlKGZpcnN0KS5nZXREYXkoKSk7XG4gICAgICAgICAgICBkZXNjcmliZVswXSA9IHN0cjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGN1cnJlbnRTdGFtcCA9PSBzZWNvbmQpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzFdID0gXCLku4rlpKlcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGFtcCArIDI0ICogNjAgKiA2MCAqIDEwMDAgPT0gc2Vjb25kKSB7XG4gICAgICAgICAgICBkZXNjcmliZVsxXSA9IFwi5piO5aSpXCI7XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhbXAgKyAyNCAqIDYwICogNjAgKiAxMDAwICogMiA9PSBzZWNvbmQpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzFdID0gXCLlkI7lpKlcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHN0ciA9ICfmmJ/mnJ8nICsgJ+aXpeS4gOS6jOS4ieWbm+S6lOWFrScuY2hhckF0KG5ldyBEYXRlKHNlY29uZCkuZ2V0RGF5KCkpO1xuICAgICAgICAgICAgZGVzY3JpYmVbMV0gPSBzdHI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXNjcmliZTtcbiAgICAgIH0sXG4gICAgICBnZXRCYWxhbmNlKCkge1xuICAgICAgICByZXR1cm4gZm9ybWF0TnVtYmVyKHRoaXMuYXZhaWxhYmxlKVxuICAgICAgfVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGhhbmRsZU1ldGhvZHMoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wYXlNZXRob2RMaXN0LmZvckVhY2goKGl0ZW0sIF9pbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gX2luZGV4KSB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIGhhbmRsZVBheSgpIHtcbiAgICAgICAgaWYgKHRoaXMub3JkZXJJbmZvLm9yZGVyU3RhdGUgPT09IDQpIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+iuouWNleW3suWkseaViO+8jOivt+mHjeaWsOS4i+WNle+8gScsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTIwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGV0IGluZGV4ID0gbnVsbFxuICAgICAgICAgIHRoaXMucGF5TWV0aG9kTGlzdC5mb3JFYWNoKChpdGVtLCBfaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgaW5kZXggPSBfaW5kZXhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBsZXQgcm93ID0gdGhpcy5wYXlNZXRob2RMaXN0W2luZGV4XVxuICAgICAgICAgIGlmIChyb3cucGF5Q2hhbm5lbENvZGUgPT09ICdCQUxBTkNFJykge1xuICAgICAgICAgICAgcGF5QXBwbHkoe1xuICAgICAgICAgICAgICBvcmRlcnM6IHtcbiAgICAgICAgICAgICAgICBvcmRlckJpekNhdGVnb3J5OiB0aGlzLm9yZGVySW5mby5vcmRlckJpekNhdGVnb3J5LFxuICAgICAgICAgICAgICAgIG9yZGVyTm86IHRoaXMub3JkZXJJbmZvLm9yZGVyTm8sXG4gICAgICAgICAgICAgICAgb3JkZXJUb3RhbEZlZTogdGhpcy5vcmRlckluZm8ucGF5UHJpY2UsXG4gICAgICAgICAgICAgICAgc2lnbjogdGhpcy5vcmRlckluZm8uc2lnblxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBwYXlCaXpDYXRlZ29yeTogcm93LnBheUJpekNhdGVnb3J5LFxuICAgICAgICAgICAgICBwYXlQbGF0Zm9ybTogcm93LnBheVBsYXRmb3JtLFxuICAgICAgICAgICAgICBwYXlUZXJtaW5hbDogcm93LnBheVRlcm1pbmFsLFxuICAgICAgICAgICAgICBwYXlNb2RlQ29kZTogcm93LnBheU1vZGVDb2RlLFxuICAgICAgICAgICAgICBwYXlPcHRpb25hbDoge1xuICAgICAgICAgICAgICAgIGlkOiB0aGlzLm9yZGVySW5mby51c2VySWRcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zaG93TW9kYWwgPSB0cnVlXG4gICAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJzExJyxyZXMpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSBpZiAocm93LnBheUNoYW5uZWxDb2RlID09PSAnV1hBX0FQSScpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCflsI/nqIvluo/mlK/ku5jov5jmnKrlvIDmlL4nKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNtc0NvZGVJbnB1dChlKSB7XG4gICAgICAgIHRoaXMuc21zQ29kZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDojrflj5bpqozor4HnoIFcbiAgICAgICAqL1xuICAgICAgaGFuZGxlR2V0Q29kZSgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgICAgIHVzZXJJZDogdGhpcy5vcmRlckluZm8udXNlcklkLFxuICAgICAgICAgIGlzU2hvd1Bob25lTm86IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgc2VuZFZpYWxpZGF0ZShxdWVyeSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIHRoaXMuc2VuZFBob25lTm8gPSByZXMuc2VuZFBob25lTm9cbiAgICAgICAgICB0aGlzLnNlY29uZCA9IDYwXG4gICAgICAgICAgdGhpcy5pc09wdGlvbiA9IHRydWVcbiAgICAgICAgICB0aGlzLmNvZGVUaW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2Vjb25kLS1cbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgaWYgKHRoaXMuc2Vjb25kIDw9IDApIHtcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmNvZGVUaW1lcik7XG4gICAgICAgICAgICAgIHRoaXMuaXNPcHRpb24gPSBmYWxzZVxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgaGFuZGxlQ2xvc2VEaWFsb2coKSB7XG4gICAgICAgIHRoaXMuc2hvd01vZGFsID0gZmFsc2VcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIHN1Ym1pdENvZGUoKSB7XG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitLi4uJ1xuICAgICAgICB9KVxuICAgICAgICBzdWJtaXRWYWxpZGF0ZSh7XG4gICAgICAgICAgcGhvbmVObzogdGhpcy5zZW5kUGhvbmVObyxcbiAgICAgICAgICBzbXNDb2RlOiB0aGlzLnNtc0NvZGVcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgIGlmIChyZXMuc3RhdGUgPT0gMSkge1xuICAgICAgICAgICAgYmFsYW5jZVBheSh7XG4gICAgICAgICAgICAgIHBheUFwcGx5Tm86IHRoaXMub3JkZXJJbmZvLm9yZGVyTm9cbiAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ+S9memineaUr+S7mCcsIHJlcylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcy5zdGF0ZSA9PSAyKSB7XG4gICAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgIHRpdGxlOiByZXMubXNnLFxuICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBwcmV2ZW50VG91Y2hNb3ZlKCkge1xuICAgICAgICBjb25zb2xlLndhcm4oJ3ByZXZlbnRUb3VjaE1vdmXmlrnms5Xlt7LpmLvmraLlhbbku5bkuovku7bjgIInKVxuICAgICAgfVxuICAgIH1cbiAgICBvblNob3coKSB7fVxuICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgIHBheU1vZGUoe1xuICAgICAgICBiaXpDYXRlZ29yeTogJ1BfQklaX0NBVEVHT1JZX0REJyxcbiAgICAgICAgYml6VGVybWluYWw6ICdQX1RFUk1JTkFMX1dFQ0hBVF9NSU5JUFJPJ1xuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnBheU1ldGhvZExpc3QgPSByZXMucGF5TW9kZXNcbiAgICAgICAgaWYgKHRoaXMucGF5TWV0aG9kTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5wYXlNZXRob2RMaXN0WzBdLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hdmFpbGFibGUgPSByZXMuYXZhaWxhYmxlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgICBpZiAob3B0aW9uLm9yZGVyTm8pIHtcbiAgICAgICAgcGF5T3JkZXJJbmZvKHtcbiAgICAgICAgICBvcmRlck5vOiBvcHRpb24ub3JkZXJOb1xuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5vcmRlckluZm8gPSByZXMub3JkZXJJbmZvXG4gICAgICAgICAgdGhpcy5vcmRlckluZm8uc2lnbiA9IHJlcy5zaWduXG4gICAgICAgICAgbGV0IGNyZWF0ZVRpbWVWYWx1ZSA9IG5ldyBEYXRlKHRoaXMub3JkZXJJbmZvLm9yZGVyVGltZSkudmFsdWVPZigpO1xuICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlID0gW25ldyBEYXRlKHRoaXMub3JkZXJJbmZvLmJvb2tDaGVja2luVGltZSkudG9TdHJpbmcoJ3l5eXktTU0tZGQnKSwgbmV3IERhdGUodGhpcy5vcmRlckluZm8uY2hlY2tvdXRUaW1lKS50b1N0cmluZygneXl5eS1NTS1kZCcpXVxuICAgICAgICAgIHRoaXMuZW5kVGltZVZhbHVlID0gY3JlYXRlVGltZVZhbHVlICsgMTAwMCAqIDYwICogMTU7XG4gICAgICAgICAgdGhpcy5jdXJyZW50VGltZSA9IG5ldyBEYXRlKCkudmFsdWVPZigpO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICBpZiAodGhpcy5jdXJyZW50VGltZSA+IHRoaXMuZW5kVGltZVZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLm9yZGVySW5mby5vcmRlclN0YXRlID0gNFxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5vcmRlckluZm8ub3JkZXJTdGF0ZSA9PT0gMCAmJiB0aGlzLmN1cnJlbnRUaW1lIDwgdGhpcy5lbmRUaW1lVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudFRpbWUgKz0gMTAwMDtcbiAgICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==