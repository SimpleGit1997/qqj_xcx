'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _index = require('./../server/index.js');

var _wxSystem = require('./../lib/wx-system.js');

var _utils = require('./../lib/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OrderList = function (_wepy$page) {
  _inherits(OrderList, _wepy$page);

  function OrderList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, OrderList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderList.__proto__ || Object.getPrototypeOf(OrderList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '订单中心'
    }, _this.components = {}, _this.data = {
      swiperIndex: 0,
      scrollHeight: 0,
      orderState: -2,
      showModal: false,
      query: {
        pageNo: 1,
        pageSize: 10,
        orderState: -2,
        orderBizCategory: 'P_BIZ_CATEGORY_DD'
      },
      hasMore: true,
      orderList: []
    }, _this.computed = {
      formatDate: function formatDate(date) {
        var formatLabel = '';
        if (date) {
          formatLabel = new Date((date + '').replace(/-/gi, "/")).toString("MM月dd日");
        }
        return formatLabel;
      },
      getDays: function getDays(date1, date2) {
        var days = 0;
        var first = new Date((date1 + '').replace(/-/gi, "/")).valueOf();
        var second = new Date((date2 + '').replace(/-/gi, "/")).valueOf();
        var time = (0, _utils.calculateDiffTime)(first, second);
        days = time[0] / 24;
        return days;
      }
    }, _this.watch = {}, _this.methods = {
      handleState: function handleState(value) {
        this.query.orderState = value;
        if (this.query.orderState == -2) {
          this.swiperIndex = 0;
        } else if (this.query.orderState == -3) {
          this.swiperIndex = 1;
        }
        this.query.pageNo = 1;
        this.$apply();
      },
      changeSwiper: function changeSwiper(e) {
        var value = e.detail.current;
        this.swiperIndex = value;
        if (this.swiperIndex == 0) {
          this.query.orderState = -2;
        } else if (this.swiperIndex == 1) {
          this.query.orderState = -3;
        }
        this.query.pageNo = 1;
        this.getOrderList();
        this.$apply();
      },

      /**
       * 下啦
       */
      scrolltolower: function scrolltolower(e) {
        var _this2 = this;

        if (this.hasMore) {
          _wepy2.default.showLoading({
            title: '加载中...'
          });
          this.query.pageNo++;
          (0, _index.findAllOrders)(this.query).then(function (res) {
            if (res.orderInfoList.length == 0) {
              wx.showToast({
                title: '暂无更多数据哦～',
                icon: 'none',
                duration: 1200
              });
              _this2.hasMore = false;
            } else if (res.orderInfoList.length > 0) {
              res.orderInfoList.forEach(function (item) {
                // 计算页面Label
                item.formatFirstTime = _this2.computed.formatDate(item.bookCheckinTime);
                item.formatSecondTime = _this2.computed.formatDate(item.checkoutTime);
                item.days = _this2.computed.getDays(item.bookCheckinTime, item.checkoutTime);
                if (item.orderState == 0) {
                  item.orderStateLabel = '待支付';
                } else if (item.orderState == 1) {
                  item.orderStateLabel = '待入住';
                } else if (item.orderState == 2) {
                  item.orderStateLabel = '待评价';
                } else if (item.orderState == 3) {
                  item.orderStateLabel = '已完成';
                } else if (item.orderState == 4) {
                  item.orderStateLabel = '已取消';
                } else if (item.orderState == 5) {
                  item.orderStateLabel = '退订中';
                } else if (item.orderState == 6) {
                  item.orderStateLabel = '已退订';
                } else if (item.orderState == 7) {
                  item.orderStateLabel = '已失效';
                } else if (item.orderState == 8) {
                  item.orderStateLabel = '已完成';
                } else if (item.orderState == 9) {
                  item.orderStateLabel = '待确认';
                }
                _this2.orderList.push(item);
              });
            }
            _this2.$apply();
            _wepy2.default.hideLoading();
          });
        } else {
          _wepy2.default.showToast({
            title: '暂无更多数据哦～',
            icon: 'none',
            duration: 1200
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(OrderList, [{
    key: 'onLoad',
    value: function onLoad() {
      this.scrollHeight = (0, _wxSystem.changePXToRPX)((0, _wxSystem.getSysHeight)()) - 88;
      this.getOrderList();
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onHide',
    value: function onHide() {}
  }, {
    key: 'onUnload',
    value: function onUnload() {}
  }, {
    key: 'getOrderList',
    value: function getOrderList() {
      var _this3 = this;

      _wepy2.default.showLoading({
        title: '加载中...'
      });
      this.orderList = [];
      (0, _index.findAllOrders)(this.query).then(function (res) {
        if (res && res.orderInfoList) {
          res.orderInfoList.forEach(function (item) {
            // 计算页面Label
            item.formatFirstTime = _this3.computed.formatDate(item.bookCheckinTime);
            item.formatSecondTime = _this3.computed.formatDate(item.checkoutTime);
            item.days = _this3.computed.getDays(item.bookCheckinTime, item.checkoutTime);
            if (item.orderState == 0) {
              item.orderStateLabel = '待支付';
            } else if (item.orderState == 1) {
              item.orderStateLabel = '待入住';
            } else if (item.orderState == 2) {
              item.orderStateLabel = '待评价';
            } else if (item.orderState == 3) {
              item.orderStateLabel = '已完成';
            } else if (item.orderState == 4) {
              item.orderStateLabel = '已取消';
            } else if (item.orderState == 5) {
              item.orderStateLabel = '退订中';
            } else if (item.orderState == 6) {
              item.orderStateLabel = '已退订';
            } else if (item.orderState == 7) {
              item.orderStateLabel = '已失效';
            } else if (item.orderState == 8) {
              item.orderStateLabel = '已完成';
            } else if (item.orderState == 9) {
              item.orderStateLabel = '待确认';
            }
            _this3.orderList.push(item);
          });
          _wepy2.default.hideLoading();
          _this3.$apply();
        }
      });
    }
  }]);

  return OrderList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderList , 'pages/orderList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyTGlzdC5qcyJdLCJuYW1lcyI6WyJPcmRlckxpc3QiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsImRhdGEiLCJzd2lwZXJJbmRleCIsInNjcm9sbEhlaWdodCIsIm9yZGVyU3RhdGUiLCJzaG93TW9kYWwiLCJxdWVyeSIsInBhZ2VObyIsInBhZ2VTaXplIiwib3JkZXJCaXpDYXRlZ29yeSIsImhhc01vcmUiLCJvcmRlckxpc3QiLCJjb21wdXRlZCIsImZvcm1hdERhdGUiLCJkYXRlIiwiZm9ybWF0TGFiZWwiLCJEYXRlIiwicmVwbGFjZSIsInRvU3RyaW5nIiwiZ2V0RGF5cyIsImRhdGUxIiwiZGF0ZTIiLCJkYXlzIiwiZmlyc3QiLCJ2YWx1ZU9mIiwic2Vjb25kIiwidGltZSIsIndhdGNoIiwibWV0aG9kcyIsImhhbmRsZVN0YXRlIiwidmFsdWUiLCIkYXBwbHkiLCJjaGFuZ2VTd2lwZXIiLCJlIiwiZGV0YWlsIiwiY3VycmVudCIsImdldE9yZGVyTGlzdCIsInNjcm9sbHRvbG93ZXIiLCJ3ZXB5Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsInRoZW4iLCJyZXMiLCJvcmRlckluZm9MaXN0IiwibGVuZ3RoIiwid3giLCJzaG93VG9hc3QiLCJpY29uIiwiZHVyYXRpb24iLCJmb3JFYWNoIiwiaXRlbSIsImZvcm1hdEZpcnN0VGltZSIsImJvb2tDaGVja2luVGltZSIsImZvcm1hdFNlY29uZFRpbWUiLCJjaGVja291dFRpbWUiLCJvcmRlclN0YXRlTGFiZWwiLCJwdXNoIiwiaGlkZUxvYWRpbmciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOztBQUdBOztBQU1BOzs7Ozs7Ozs7O0lBR3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxVLEdBQWEsRSxRQUNiQyxJLEdBQU87QUFDTEMsbUJBQWEsQ0FEUjtBQUVMQyxvQkFBYyxDQUZUO0FBR0xDLGtCQUFZLENBQUMsQ0FIUjtBQUlMQyxpQkFBVyxLQUpOO0FBS0xDLGFBQU87QUFDTEMsZ0JBQVEsQ0FESDtBQUVMQyxrQkFBVSxFQUZMO0FBR0xKLG9CQUFZLENBQUMsQ0FIUjtBQUlMSywwQkFBa0I7QUFKYixPQUxGO0FBV0xDLGVBQVMsSUFYSjtBQVlMQyxpQkFBVztBQVpOLEssUUFjUEMsUSxHQUFXO0FBQ1RDLGdCQURTLHNCQUNFQyxJQURGLEVBQ1E7QUFDZixZQUFJQyxjQUFjLEVBQWxCO0FBQ0EsWUFBSUQsSUFBSixFQUFVO0FBQ1JDLHdCQUFjLElBQUlDLElBQUosQ0FBUyxDQUFDRixPQUFPLEVBQVIsRUFBWUcsT0FBWixDQUFvQixLQUFwQixFQUEyQixHQUEzQixDQUFULEVBQTBDQyxRQUExQyxDQUFtRCxRQUFuRCxDQUFkO0FBQ0Q7QUFDRCxlQUFPSCxXQUFQO0FBQ0QsT0FQUTtBQVFUSSxhQVJTLG1CQVFEQyxLQVJDLEVBUU1DLEtBUk4sRUFRYTtBQUNwQixZQUFJQyxPQUFPLENBQVg7QUFDQSxZQUFJQyxRQUFRLElBQUlQLElBQUosQ0FBUyxDQUFDSSxRQUFRLEVBQVQsRUFBYUgsT0FBYixDQUFxQixLQUFyQixFQUE0QixHQUE1QixDQUFULEVBQTJDTyxPQUEzQyxFQUFaO0FBQ0EsWUFBSUMsU0FBUyxJQUFJVCxJQUFKLENBQVMsQ0FBQ0ssUUFBUSxFQUFULEVBQWFKLE9BQWIsQ0FBcUIsS0FBckIsRUFBNEIsR0FBNUIsQ0FBVCxFQUEyQ08sT0FBM0MsRUFBYjtBQUNBLFlBQUlFLE9BQU8sOEJBQWtCSCxLQUFsQixFQUF5QkUsTUFBekIsQ0FBWDtBQUNBSCxlQUFPSSxLQUFLLENBQUwsSUFBVSxFQUFqQjtBQUNBLGVBQU9KLElBQVA7QUFDRDtBQWZRLEssUUFpQlhLLEssR0FBUSxFLFFBT1JDLE8sR0FBVTtBQUNSQyxpQkFEUSx1QkFDSUMsS0FESixFQUNXO0FBQ2pCLGFBQUt4QixLQUFMLENBQVdGLFVBQVgsR0FBd0IwQixLQUF4QjtBQUNBLFlBQUksS0FBS3hCLEtBQUwsQ0FBV0YsVUFBWCxJQUF5QixDQUFDLENBQTlCLEVBQWlDO0FBQy9CLGVBQUtGLFdBQUwsR0FBbUIsQ0FBbkI7QUFDRCxTQUZELE1BRU8sSUFBSSxLQUFLSSxLQUFMLENBQVdGLFVBQVgsSUFBeUIsQ0FBQyxDQUE5QixFQUFpQztBQUN0QyxlQUFLRixXQUFMLEdBQW1CLENBQW5CO0FBQ0Q7QUFDRCxhQUFLSSxLQUFMLENBQVdDLE1BQVgsR0FBb0IsQ0FBcEI7QUFDQSxhQUFLd0IsTUFBTDtBQUNELE9BVk87QUFXUkMsa0JBWFEsd0JBV0tDLENBWEwsRUFXUTtBQUNkLFlBQUlILFFBQVFHLEVBQUVDLE1BQUYsQ0FBU0MsT0FBckI7QUFDQSxhQUFLakMsV0FBTCxHQUFtQjRCLEtBQW5CO0FBQ0EsWUFBSSxLQUFLNUIsV0FBTCxJQUFvQixDQUF4QixFQUEyQjtBQUN6QixlQUFLSSxLQUFMLENBQVdGLFVBQVgsR0FBd0IsQ0FBQyxDQUF6QjtBQUNELFNBRkQsTUFFTyxJQUFJLEtBQUtGLFdBQUwsSUFBb0IsQ0FBeEIsRUFBMkI7QUFDaEMsZUFBS0ksS0FBTCxDQUFXRixVQUFYLEdBQXdCLENBQUMsQ0FBekI7QUFDRDtBQUNELGFBQUtFLEtBQUwsQ0FBV0MsTUFBWCxHQUFvQixDQUFwQjtBQUNBLGFBQUs2QixZQUFMO0FBQ0EsYUFBS0wsTUFBTDtBQUNELE9BdEJPOztBQXVCUjs7O0FBR0FNLG1CQTFCUSx5QkEwQk1KLENBMUJOLEVBMEJTO0FBQUE7O0FBQ2YsWUFBSSxLQUFLdkIsT0FBVCxFQUFrQjtBQUNoQjRCLHlCQUFLQyxXQUFMLENBQWlCO0FBQ2ZDLG1CQUFPO0FBRFEsV0FBakI7QUFHQSxlQUFLbEMsS0FBTCxDQUFXQyxNQUFYO0FBQ0Usb0NBQWMsS0FBS0QsS0FBbkIsRUFBMEJtQyxJQUExQixDQUErQixlQUFPO0FBQ3BDLGdCQUFJQyxJQUFJQyxhQUFKLENBQWtCQyxNQUFsQixJQUE0QixDQUFoQyxFQUFtQztBQUNqQ0MsaUJBQUdDLFNBQUgsQ0FBYTtBQUNYTix1QkFBTyxXQURJO0FBRVhPLHNCQUFNLE1BRks7QUFHWEMsMEJBQVU7QUFIQyxlQUFiO0FBS0EscUJBQUt0QyxPQUFMLEdBQWUsS0FBZjtBQUNELGFBUEQsTUFPTyxJQUFJZ0MsSUFBSUMsYUFBSixDQUFrQkMsTUFBbEIsR0FBMkIsQ0FBL0IsRUFBa0M7QUFDdkNGLGtCQUFJQyxhQUFKLENBQWtCTSxPQUFsQixDQUEwQixnQkFBUTtBQUNoQztBQUNBQyxxQkFBS0MsZUFBTCxHQUF1QixPQUFLdkMsUUFBTCxDQUFjQyxVQUFkLENBQXlCcUMsS0FBS0UsZUFBOUIsQ0FBdkI7QUFDQUYscUJBQUtHLGdCQUFMLEdBQXdCLE9BQUt6QyxRQUFMLENBQWNDLFVBQWQsQ0FBeUJxQyxLQUFLSSxZQUE5QixDQUF4QjtBQUNBSixxQkFBSzVCLElBQUwsR0FBWSxPQUFLVixRQUFMLENBQWNPLE9BQWQsQ0FBc0IrQixLQUFLRSxlQUEzQixFQUE0Q0YsS0FBS0ksWUFBakQsQ0FBWjtBQUNBLG9CQUFJSixLQUFLOUMsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUN4QjhDLHVCQUFLSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0QsaUJBRkQsTUFFTyxJQUFJTCxLQUFLOUMsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUMvQjhDLHVCQUFLSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0QsaUJBRk0sTUFFQSxJQUFJTCxLQUFLOUMsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUMvQjhDLHVCQUFLSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0QsaUJBRk0sTUFFQSxJQUFJTCxLQUFLOUMsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUMvQjhDLHVCQUFLSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0QsaUJBRk0sTUFFQSxJQUFJTCxLQUFLOUMsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUMvQjhDLHVCQUFLSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0QsaUJBRk0sTUFFQSxJQUFJTCxLQUFLOUMsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUMvQjhDLHVCQUFLSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0QsaUJBRk0sTUFFQSxJQUFJTCxLQUFLOUMsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUMvQjhDLHVCQUFLSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0QsaUJBRk0sTUFFQSxJQUFJTCxLQUFLOUMsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUMvQjhDLHVCQUFLSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0QsaUJBRk0sTUFFQSxJQUFJTCxLQUFLOUMsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUMvQjhDLHVCQUFLSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0QsaUJBRk0sTUFFQSxJQUFJTCxLQUFLOUMsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUMvQjhDLHVCQUFLSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0Q7QUFDRCx1QkFBSzVDLFNBQUwsQ0FBZTZDLElBQWYsQ0FBb0JOLElBQXBCO0FBQ0QsZUEzQkQ7QUE0QkQ7QUFDRCxtQkFBS25CLE1BQUw7QUFDQU8sMkJBQUttQixXQUFMO0FBQ0QsV0F4Q0Q7QUF5Q0gsU0E5Q0QsTUE4Q087QUFDTG5CLHlCQUFLUSxTQUFMLENBQWU7QUFDYk4sbUJBQU8sVUFETTtBQUViTyxrQkFBTSxNQUZPO0FBR2JDLHNCQUFVO0FBSEcsV0FBZjtBQUtEO0FBQ0Y7QUFoRk8sSzs7Ozs7NkJBTkQ7QUFDUCxXQUFLN0MsWUFBTCxHQUFvQiw2QkFBYyw2QkFBZCxJQUFnQyxFQUFwRDtBQUNBLFdBQUtpQyxZQUFMO0FBQ0EsV0FBS0wsTUFBTDtBQUNEOzs7NkJBQ1EsQ0FBRTs7OzZCQW1GRixDQUFFOzs7K0JBQ0EsQ0FBRTs7O21DQUNFO0FBQUE7O0FBQ2JPLHFCQUFLQyxXQUFMLENBQWlCO0FBQ2ZDLGVBQU87QUFEUSxPQUFqQjtBQUdBLFdBQUs3QixTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsZ0NBQWMsS0FBS0wsS0FBbkIsRUFBMEJtQyxJQUExQixDQUErQixlQUFPO0FBQ3BDLFlBQUlDLE9BQU9BLElBQUlDLGFBQWYsRUFBOEI7QUFDNUJELGNBQUlDLGFBQUosQ0FBa0JNLE9BQWxCLENBQTBCLGdCQUFRO0FBQ2hDO0FBQ0FDLGlCQUFLQyxlQUFMLEdBQXVCLE9BQUt2QyxRQUFMLENBQWNDLFVBQWQsQ0FBeUJxQyxLQUFLRSxlQUE5QixDQUF2QjtBQUNBRixpQkFBS0csZ0JBQUwsR0FBd0IsT0FBS3pDLFFBQUwsQ0FBY0MsVUFBZCxDQUF5QnFDLEtBQUtJLFlBQTlCLENBQXhCO0FBQ0FKLGlCQUFLNUIsSUFBTCxHQUFZLE9BQUtWLFFBQUwsQ0FBY08sT0FBZCxDQUFzQitCLEtBQUtFLGVBQTNCLEVBQTRDRixLQUFLSSxZQUFqRCxDQUFaO0FBQ0EsZ0JBQUlKLEtBQUs5QyxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQ3hCOEMsbUJBQUtLLGVBQUwsR0FBdUIsS0FBdkI7QUFDRCxhQUZELE1BRU8sSUFBSUwsS0FBSzlDLFVBQUwsSUFBbUIsQ0FBdkIsRUFBMEI7QUFDL0I4QyxtQkFBS0ssZUFBTCxHQUF1QixLQUF2QjtBQUNELGFBRk0sTUFFQSxJQUFJTCxLQUFLOUMsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUMvQjhDLG1CQUFLSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0QsYUFGTSxNQUVBLElBQUlMLEtBQUs5QyxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQy9COEMsbUJBQUtLLGVBQUwsR0FBdUIsS0FBdkI7QUFDRCxhQUZNLE1BRUEsSUFBSUwsS0FBSzlDLFVBQUwsSUFBbUIsQ0FBdkIsRUFBMEI7QUFDL0I4QyxtQkFBS0ssZUFBTCxHQUF1QixLQUF2QjtBQUNELGFBRk0sTUFFQSxJQUFJTCxLQUFLOUMsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUMvQjhDLG1CQUFLSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0QsYUFGTSxNQUVBLElBQUlMLEtBQUs5QyxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQy9COEMsbUJBQUtLLGVBQUwsR0FBdUIsS0FBdkI7QUFDRCxhQUZNLE1BRUEsSUFBSUwsS0FBSzlDLFVBQUwsSUFBbUIsQ0FBdkIsRUFBMEI7QUFDL0I4QyxtQkFBS0ssZUFBTCxHQUF1QixLQUF2QjtBQUNELGFBRk0sTUFFQSxJQUFJTCxLQUFLOUMsVUFBTCxJQUFtQixDQUF2QixFQUEwQjtBQUMvQjhDLG1CQUFLSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0QsYUFGTSxNQUVBLElBQUlMLEtBQUs5QyxVQUFMLElBQW1CLENBQXZCLEVBQTBCO0FBQy9COEMsbUJBQUtLLGVBQUwsR0FBdUIsS0FBdkI7QUFDRDtBQUNELG1CQUFLNUMsU0FBTCxDQUFlNkMsSUFBZixDQUFvQk4sSUFBcEI7QUFDRCxXQTNCRDtBQTRCQVoseUJBQUttQixXQUFMO0FBQ0EsaUJBQUsxQixNQUFMO0FBQ0Q7QUFDRixPQWpDRDtBQWtDRDs7OztFQXRLb0NPLGVBQUtvQixJOztrQkFBdkI3RCxTIiwiZmlsZSI6Im9yZGVyTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IHtcbiAgICBmaW5kQWxsT3JkZXJzXG4gIH0gZnJvbSAnLi4vc2VydmVyL2luZGV4LmpzJztcbiAgaW1wb3J0IHtcbiAgICBnZXRTeXNXaWR0aCxcbiAgICBnZXRTeXNIZWlnaHQsXG4gICAgY2hhbmdlUFhUb1JQWCxcbiAgICBjaGFuZ2VSUFhUb1BYXG4gIH0gZnJvbSAnLi4vbGliL3d4LXN5c3RlbS5qcydcbiAgaW1wb3J0IHtcbiAgICBjYWxjdWxhdGVEaWZmVGltZSxcbiAgfSBmcm9tIFwiLi4vbGliL3V0aWxzLmpzXCI7XG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIE9yZGVyTGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleS4reW/gydcbiAgICB9O1xuICAgIGNvbXBvbmVudHMgPSB7fTtcbiAgICBkYXRhID0ge1xuICAgICAgc3dpcGVySW5kZXg6IDAsXG4gICAgICBzY3JvbGxIZWlnaHQ6IDAsXG4gICAgICBvcmRlclN0YXRlOiAtMixcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgICBxdWVyeToge1xuICAgICAgICBwYWdlTm86IDEsXG4gICAgICAgIHBhZ2VTaXplOiAxMCxcbiAgICAgICAgb3JkZXJTdGF0ZTogLTIsXG4gICAgICAgIG9yZGVyQml6Q2F0ZWdvcnk6ICdQX0JJWl9DQVRFR09SWV9ERCcsXG4gICAgICB9LFxuICAgICAgaGFzTW9yZTogdHJ1ZSxcbiAgICAgIG9yZGVyTGlzdDogW11cbiAgICB9O1xuICAgIGNvbXB1dGVkID0ge1xuICAgICAgZm9ybWF0RGF0ZShkYXRlKSB7XG4gICAgICAgIGxldCBmb3JtYXRMYWJlbCA9ICcnXG4gICAgICAgIGlmIChkYXRlKSB7XG4gICAgICAgICAgZm9ybWF0TGFiZWwgPSBuZXcgRGF0ZSgoZGF0ZSArICcnKS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnRvU3RyaW5nKFwiTU3mnIhkZOaXpVwiKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb3JtYXRMYWJlbDtcbiAgICAgIH0sXG4gICAgICBnZXREYXlzKGRhdGUxLCBkYXRlMikge1xuICAgICAgICBsZXQgZGF5cyA9IDA7XG4gICAgICAgIGxldCBmaXJzdCA9IG5ldyBEYXRlKChkYXRlMSArICcnKS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnZhbHVlT2YoKTtcbiAgICAgICAgbGV0IHNlY29uZCA9IG5ldyBEYXRlKChkYXRlMiArICcnKS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnZhbHVlT2YoKTtcbiAgICAgICAgbGV0IHRpbWUgPSBjYWxjdWxhdGVEaWZmVGltZShmaXJzdCwgc2Vjb25kKTtcbiAgICAgICAgZGF5cyA9IHRpbWVbMF0gLyAyNDtcbiAgICAgICAgcmV0dXJuIGRheXM7XG4gICAgICB9LFxuICAgIH07XG4gICAgd2F0Y2ggPSB7fTtcbiAgICBvbkxvYWQoKSB7XG4gICAgICB0aGlzLnNjcm9sbEhlaWdodCA9IGNoYW5nZVBYVG9SUFgoZ2V0U3lzSGVpZ2h0KCkpIC0gODg7XG4gICAgICB0aGlzLmdldE9yZGVyTGlzdCgpXG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICAgIG9uU2hvdygpIHt9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGhhbmRsZVN0YXRlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMucXVlcnkub3JkZXJTdGF0ZSA9IHZhbHVlXG4gICAgICAgIGlmICh0aGlzLnF1ZXJ5Lm9yZGVyU3RhdGUgPT0gLTIpIHtcbiAgICAgICAgICB0aGlzLnN3aXBlckluZGV4ID0gMFxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucXVlcnkub3JkZXJTdGF0ZSA9PSAtMykge1xuICAgICAgICAgIHRoaXMuc3dpcGVySW5kZXggPSAxXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5xdWVyeS5wYWdlTm8gPSAxXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VTd2lwZXIoZSkge1xuICAgICAgICBsZXQgdmFsdWUgPSBlLmRldGFpbC5jdXJyZW50XG4gICAgICAgIHRoaXMuc3dpcGVySW5kZXggPSB2YWx1ZVxuICAgICAgICBpZiAodGhpcy5zd2lwZXJJbmRleCA9PSAwKSB7XG4gICAgICAgICAgdGhpcy5xdWVyeS5vcmRlclN0YXRlID0gLTJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN3aXBlckluZGV4ID09IDEpIHtcbiAgICAgICAgICB0aGlzLnF1ZXJ5Lm9yZGVyU3RhdGUgPSAtM1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVlcnkucGFnZU5vID0gMVxuICAgICAgICB0aGlzLmdldE9yZGVyTGlzdCgpXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOS4i+WVplxuICAgICAgICovXG4gICAgICBzY3JvbGx0b2xvd2VyKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzTW9yZSkge1xuICAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0uLi4nXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnF1ZXJ5LnBhZ2VObysrXG4gICAgICAgICAgICBmaW5kQWxsT3JkZXJzKHRoaXMucXVlcnkpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgaWYgKHJlcy5vcmRlckluZm9MaXN0Lmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAnXGLmmoLml6Dmm7TlpJrmlbDmja7lk6bvvZ4nLFxuICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEyMDBcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMuaGFzTW9yZSA9IGZhbHNlXG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLm9yZGVySW5mb0xpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJlcy5vcmRlckluZm9MaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAvLyDorqHnrpfpobXpnaJMYWJlbFxuICAgICAgICAgICAgICAgICAgaXRlbS5mb3JtYXRGaXJzdFRpbWUgPSB0aGlzLmNvbXB1dGVkLmZvcm1hdERhdGUoaXRlbS5ib29rQ2hlY2tpblRpbWUpXG4gICAgICAgICAgICAgICAgICBpdGVtLmZvcm1hdFNlY29uZFRpbWUgPSB0aGlzLmNvbXB1dGVkLmZvcm1hdERhdGUoaXRlbS5jaGVja291dFRpbWUpXG4gICAgICAgICAgICAgICAgICBpdGVtLmRheXMgPSB0aGlzLmNvbXB1dGVkLmdldERheXMoaXRlbS5ib29rQ2hlY2tpblRpbWUsIGl0ZW0uY2hlY2tvdXRUaW1lKVxuICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ub3JkZXJTdGF0ZSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ub3JkZXJTdGF0ZUxhYmVsID0gJ+W+heaUr+S7mCdcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5vcmRlclN0YXRlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5vcmRlclN0YXRlTGFiZWwgPSAn5b6F5YWl5L2PJ1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLm9yZGVyU3RhdGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm9yZGVyU3RhdGVMYWJlbCA9ICflvoXor4Tku7cnXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ub3JkZXJTdGF0ZSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ub3JkZXJTdGF0ZUxhYmVsID0gJ+W3suWujOaIkCdcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5vcmRlclN0YXRlID09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5vcmRlclN0YXRlTGFiZWwgPSAn5bey5Y+W5raIJ1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLm9yZGVyU3RhdGUgPT0gNSkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm9yZGVyU3RhdGVMYWJlbCA9ICfpgIDorqLkuK0nXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ub3JkZXJTdGF0ZSA9PSA2KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ub3JkZXJTdGF0ZUxhYmVsID0gJ+W3sumAgOiuoidcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5vcmRlclN0YXRlID09IDcpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5vcmRlclN0YXRlTGFiZWwgPSAn5bey5aSx5pWIJ1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLm9yZGVyU3RhdGUgPT0gOCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLm9yZGVyU3RhdGVMYWJlbCA9ICflt7LlrozmiJAnXG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ub3JkZXJTdGF0ZSA9PSA5KSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ub3JkZXJTdGF0ZUxhYmVsID0gJ+W+heehruiupCdcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJMaXN0LnB1c2goaXRlbSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aaguaXoOabtOWkmuaVsOaNruWTpu+9nicsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTIwMFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH07XG4gICAgb25IaWRlKCkge31cbiAgICBvblVubG9hZCgpIHt9XG4gICAgZ2V0T3JkZXJMaXN0KCkge1xuICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitLi4uJ1xuICAgICAgfSlcbiAgICAgIHRoaXMub3JkZXJMaXN0ID0gW11cbiAgICAgIGZpbmRBbGxPcmRlcnModGhpcy5xdWVyeSkudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzICYmIHJlcy5vcmRlckluZm9MaXN0KSB7XG4gICAgICAgICAgcmVzLm9yZGVySW5mb0xpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIC8vIOiuoeeul+mhtemdokxhYmVsXG4gICAgICAgICAgICBpdGVtLmZvcm1hdEZpcnN0VGltZSA9IHRoaXMuY29tcHV0ZWQuZm9ybWF0RGF0ZShpdGVtLmJvb2tDaGVja2luVGltZSlcbiAgICAgICAgICAgIGl0ZW0uZm9ybWF0U2Vjb25kVGltZSA9IHRoaXMuY29tcHV0ZWQuZm9ybWF0RGF0ZShpdGVtLmNoZWNrb3V0VGltZSlcbiAgICAgICAgICAgIGl0ZW0uZGF5cyA9IHRoaXMuY29tcHV0ZWQuZ2V0RGF5cyhpdGVtLmJvb2tDaGVja2luVGltZSwgaXRlbS5jaGVja291dFRpbWUpXG4gICAgICAgICAgICBpZiAoaXRlbS5vcmRlclN0YXRlID09IDApIHtcbiAgICAgICAgICAgICAgaXRlbS5vcmRlclN0YXRlTGFiZWwgPSAn5b6F5pSv5LuYJ1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLm9yZGVyU3RhdGUgPT0gMSkge1xuICAgICAgICAgICAgICBpdGVtLm9yZGVyU3RhdGVMYWJlbCA9ICflvoXlhaXkvY8nXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ub3JkZXJTdGF0ZSA9PSAyKSB7XG4gICAgICAgICAgICAgIGl0ZW0ub3JkZXJTdGF0ZUxhYmVsID0gJ+W+heivhOS7tydcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5vcmRlclN0YXRlID09IDMpIHtcbiAgICAgICAgICAgICAgaXRlbS5vcmRlclN0YXRlTGFiZWwgPSAn5bey5a6M5oiQJ1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLm9yZGVyU3RhdGUgPT0gNCkge1xuICAgICAgICAgICAgICBpdGVtLm9yZGVyU3RhdGVMYWJlbCA9ICflt7Llj5bmtognXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ub3JkZXJTdGF0ZSA9PSA1KSB7XG4gICAgICAgICAgICAgIGl0ZW0ub3JkZXJTdGF0ZUxhYmVsID0gJ+mAgOiuouS4rSdcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5vcmRlclN0YXRlID09IDYpIHtcbiAgICAgICAgICAgICAgaXRlbS5vcmRlclN0YXRlTGFiZWwgPSAn5bey6YCA6K6iJ1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLm9yZGVyU3RhdGUgPT0gNykge1xuICAgICAgICAgICAgICBpdGVtLm9yZGVyU3RhdGVMYWJlbCA9ICflt7LlpLHmlYgnXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ub3JkZXJTdGF0ZSA9PSA4KSB7XG4gICAgICAgICAgICAgIGl0ZW0ub3JkZXJTdGF0ZUxhYmVsID0gJ+W3suWujOaIkCdcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS5vcmRlclN0YXRlID09IDkpIHtcbiAgICAgICAgICAgICAgaXRlbS5vcmRlclN0YXRlTGFiZWwgPSAn5b6F56Gu6K6kJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5vcmRlckxpc3QucHVzaChpdGVtKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==