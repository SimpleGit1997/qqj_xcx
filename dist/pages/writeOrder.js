'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _index = require('./../components/popup/index.js');

var _index2 = _interopRequireDefault(_index);

var _wxSystem = require('./../lib/wx-system.js');

var _utils = require('./../lib/utils.js');

var _index3 = require('./../server/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WriteOrder = function (_wepy$page) {
  _inherits(WriteOrder, _wepy$page);

  function WriteOrder() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, WriteOrder);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WriteOrder.__proto__ || Object.getPrototypeOf(WriteOrder)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '填写订单'
      // disableScroll: true
    }, _this.$repeat = {}, _this.$props = { "popup": { "size": "500", "duration": "360", "type": "bottom", "xmlns:v-bind": "", "v-bind:showModal.sync": "showModal" } }, _this.$events = {}, _this.components = {
      popup: _index2.default //弹窗
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
            describe[0] = "";
          }
          if (currentStamp == second) {
            describe[1] = "今天";
          } else if (currentStamp + 24 * 60 * 60 * 1000 == second) {
            describe[1] = "明天";
          } else if (currentStamp + 24 * 60 * 60 * 1000 * 2 == second) {
            describe[1] = "后天";
          } else {
            describe[1] = "";
          }
        }
        return describe;
      },
      getPrice: function getPrice() {
        var price = 0;
        if (this.nightlyRateDtos.length > 0) {
          this.nightlyRateDtos.forEach(function (item) {
            price += item.salePrice;
          });
        }
        return price * this.count;
      }
    }, _this.data = {
      scrollHeight: 0,
      dateValue: ['2019-08-10', '2019-08-11'],
      roomInfo: {},
      orderInfo: {},
      houseId: '',
      count: 1,
      phone: '',
      roomsArray: [{
        label: '1间',
        value: 1
      }, {
        label: '2间',
        value: 2
      }, {
        label: '3间',
        value: 3
      }, {
        label: '4间',
        value: 4
      }, {
        label: '5间',
        value: 5
      }, {
        label: '6间',
        value: 6
      }],
      showModal: false,
      nightlyRateDtos: [],
      rooms: [{
        name: ''
      }]
    }, _this.methods = {
      roomsName: function roomsName(e) {
        var index = e.currentTarget.dataset.index;
        this.rooms[index].name = e.detail.value;
        console.log(this.rooms);
        this.$apply();
      },
      roomPickerChange: function roomPickerChange(e) {
        var index = e.detail.value;
        this.count = this.roomsArray[index].value;
        this.rooms = [];
        for (var i = 0; i < this.count; i++) {
          var obj = {
            name: ''
          };
          this.rooms.push(obj);
        }
        this.$apply();
      },
      phoneInput: function phoneInput(e) {
        this.phone = e.detail.value;
        this.$apply();
      },
      handleModal: function handleModal() {
        this.showModal = true;
        this.$apply();
      },
      handleSubmit: function handleSubmit() {
        var _this2 = this;

        var full = null;
        this.rooms.forEach(function (item) {
          if (item.name === '') {
            full = 1;
            return;
          }
          if (!/^[\u4E00-\u9FA5]{2,4}$/.test(item.name)) {
            full = 2;
            return;
          }
        });
        if (full === 1) {
          _wepy2.default.showToast({
            title: '每间需填写一位姓名',
            icon: 'none',
            duration: 1200
          });
        } else if (full === 2) {
          _wepy2.default.showToast({
            title: '请填写正确的姓名',
            icon: 'none',
            duration: 1200
          });
        } else if (!/^1[34578]\d{9}$/.test(this.phone)) {
          _wepy2.default.showToast({
            title: '请输入正确的手机号',
            icon: 'none',
            duration: 1200
          });
        } else {
          _wepy2.default.showLoading({
            title: '加载中...'
          });
          var name = '';
          if (this.count > 0) {
            this.rooms.forEach(function (item, index) {
              if (index === _this2.rooms.length - 1) {
                name += item.name;
              } else {
                name += item.name + ',';
              }
            });
          }
          var query = {
            houseId: this.houseId,
            inDate: this.dateValue[0] ? new Date(this.dateValue[0]).toString('yyyyMMdd') : '',
            outDate: this.dateValue[1] ? new Date(this.dateValue[1]).toString('yyyyMMdd') : '',
            houseNum: this.count,
            userCount: 1,
            userName: name,
            mobile: this.phone,
            orderType: 2,
            message: '',
            deposit: 0,
            agentId: 0,
            tutorId: 0,
            ignoreLogin: 1,
            discount: 0,
            rebateType: '',
            keyId: this.roomInfo.keyId,
            useType: 0,
            openId: ''
          };
          (0, _index3.addOrder)(query).then(function (res) {
            _wepy2.default.hideLoading();
            console.log(res);
            if (res && res.orderInfo.orderNo) {
              _wepy2.default.navigateTo({
                url: './pay?orderNo=' + res.orderInfo.orderNo
              });
            }
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WriteOrder, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      var _this3 = this;

      this.scrollHeight = (0, _wxSystem.changePXToRPX)((0, _wxSystem.getSysHeight)()) - 100;
      if (option.date) {
        this.dateValue = option.date.split(',') || [];
      }
      if (option.roomInfo && option.houseId) {
        this.houseId = option.houseId;
        this.roomInfo = JSON.parse(option.roomInfo);
        console.log(this.roomInfo);
        var query = {
          keyId: this.roomInfo.keyId,
          houseId: option.houseId,
          startDate: new Date(this.dateValue[0]).toString('yyyyMMdd'),
          endDate: new Date(this.dateValue[1]).toString('yyyyMMdd'),
          price: this.roomInfo.price,
          hotelBrand: this.roomInfo.source,
          terminal: 'P_TERMINAL_MOBILE_B'
        };
        (0, _index3.orderWrite)(query).then(function (res) {
          var tempObj = res.userInfo;
          _this3.orderInfo = {
            title: tempObj.houseTitle,
            avatar: tempObj.imgUrl,
            type: tempObj.houseInfo.houseTitle,
            breakfast: tempObj.houseInfo.breakfast === null || tempObj.houseInfo.breakfast === 0 ? '无早' : '有早',
            cancelLimit: tempObj.cancelLimit,
            cancelMsg: tempObj.cancelMsg,
            refundMsg: tempObj.refundPromptMsg,
            checkPolicy: tempObj.checkPolicy
          };
          _this3.$apply();
        });
        var query1 = {
          houseId: option.houseId,
          inDate: new Date(this.dateValue[0]).toString('yyyyMMdd'),
          outDate: new Date(this.dateValue[1]).toString('yyyyMMdd'),
          houseCount: this.count,
          keyId: this.roomInfo.keyId,
          orderType: 2
        };
        (0, _index3.selectPrices)(query1).then(function (res) {
          _this3.nightlyRateDtos = res.nightlyRateDtos;
          _this3.$apply();
        });
      }
      this.$apply();
    }
  }]);

  return WriteOrder;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(WriteOrder , 'pages/writeOrder'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndyaXRlT3JkZXIuanMiXSwibmFtZXMiOlsiV3JpdGVPcmRlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwb3B1cCIsImNvbXB1dGVkIiwiZm9ybWF0RGF0ZSIsInZhbHVlIiwiZGF0ZVZhbHVlIiwibGVuZ3RoIiwiZm9yRWFjaCIsInB1c2giLCJEYXRlIiwiaXRlbSIsInRvU3RyaW5nIiwiZ2V0RGF5cyIsImRheXMiLCJmaXJzdCIsInJlcGxhY2UiLCJ2YWx1ZU9mIiwic2Vjb25kIiwidGltZSIsImdldERlc2NyaWJlIiwiZGVzY3JpYmUiLCJjdXJyZW50RGF0ZSIsImN1cnJlbnRTdGFtcCIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwiZ2V0UHJpY2UiLCJwcmljZSIsIm5pZ2h0bHlSYXRlRHRvcyIsInNhbGVQcmljZSIsImNvdW50IiwiZGF0YSIsInNjcm9sbEhlaWdodCIsInJvb21JbmZvIiwib3JkZXJJbmZvIiwiaG91c2VJZCIsInBob25lIiwicm9vbXNBcnJheSIsImxhYmVsIiwic2hvd01vZGFsIiwicm9vbXMiLCJuYW1lIiwibWV0aG9kcyIsInJvb21zTmFtZSIsImUiLCJpbmRleCIsImN1cnJlbnRUYXJnZXQiLCJkYXRhc2V0IiwiZGV0YWlsIiwiY29uc29sZSIsImxvZyIsIiRhcHBseSIsInJvb21QaWNrZXJDaGFuZ2UiLCJpIiwib2JqIiwicGhvbmVJbnB1dCIsImhhbmRsZU1vZGFsIiwiaGFuZGxlU3VibWl0IiwiZnVsbCIsInRlc3QiLCJ3ZXB5Iiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJzaG93TG9hZGluZyIsInF1ZXJ5IiwiaW5EYXRlIiwib3V0RGF0ZSIsImhvdXNlTnVtIiwidXNlckNvdW50IiwidXNlck5hbWUiLCJtb2JpbGUiLCJvcmRlclR5cGUiLCJtZXNzYWdlIiwiZGVwb3NpdCIsImFnZW50SWQiLCJ0dXRvcklkIiwiaWdub3JlTG9naW4iLCJkaXNjb3VudCIsInJlYmF0ZVR5cGUiLCJrZXlJZCIsInVzZVR5cGUiLCJvcGVuSWQiLCJ0aGVuIiwiaGlkZUxvYWRpbmciLCJyZXMiLCJvcmRlck5vIiwibmF2aWdhdGVUbyIsInVybCIsIm9wdGlvbiIsImRhdGUiLCJzcGxpdCIsIkpTT04iLCJwYXJzZSIsInN0YXJ0RGF0ZSIsImVuZERhdGUiLCJob3RlbEJyYW5kIiwic291cmNlIiwidGVybWluYWwiLCJ0ZW1wT2JqIiwidXNlckluZm8iLCJob3VzZVRpdGxlIiwiYXZhdGFyIiwiaW1nVXJsIiwidHlwZSIsImhvdXNlSW5mbyIsImJyZWFrZmFzdCIsImNhbmNlbExpbWl0IiwiY2FuY2VsTXNnIiwicmVmdW5kTXNnIiwicmVmdW5kUHJvbXB0TXNnIiwiY2hlY2tQb2xpY3kiLCJxdWVyeTEiLCJob3VzZUNvdW50IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOztBQU1BOztBQUdBOzs7Ozs7Ozs7O0lBS3FCQSxVOzs7Ozs7Ozs7Ozs7Ozs4TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFDeEI7QUFGTyxLLFFBSVZDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLFNBQVEsRUFBQyxRQUFPLEtBQVIsRUFBYyxZQUFXLEtBQXpCLEVBQStCLFFBQU8sUUFBdEMsRUFBK0MsZ0JBQWUsRUFBOUQsRUFBaUUseUJBQXdCLFdBQXpGLEVBQVQsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDUkMsYUFBT0EsZUFEQyxDQUNLO0FBREwsSyxRQUdWQyxRLEdBQVc7QUFDVEMsZ0JBRFMsd0JBQ0k7QUFDWCxZQUFJQyxRQUFRLEVBQVo7QUFDQSxZQUFJLEtBQUtDLFNBQUwsQ0FBZUMsTUFBZixHQUF3QixDQUE1QixFQUErQjtBQUM3QixlQUFLRCxTQUFMLENBQWVFLE9BQWYsQ0FBdUIsZ0JBQVE7QUFDN0JILGtCQUFNSSxJQUFOLENBQVcsSUFB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QUZHO0FBR1h5RCxtQkFBUyxJQUFJM0QsSUFBSixDQUFTLEtBQUtKLFNBQUwsQ0FBZSxDQUFmLENBQVQsRUFBNEJNLFFBQTVCLENBQXFDLFVBQXJDLENBSEU7QUFJWHVHLHNCQUFZLEtBQUtwRixLQUpOO0FBS1htRCxpQkFBTyxLQUFLaEQsUUFBTCxDQUFjZ0QsS0FMVjtBQU1YUixxQkFBVztBQU5BLFNBQWI7QUFRQSxrQ0FBYXdDLE1BQWIsRUFBcUI3QixJQUFyQixDQUEwQixlQUFPO0FBQy9CLGlCQUFLeEQsZUFBTCxHQUF1QjBELElBQUkxRCxlQUEzQjtBQUNBLGlCQUFLdUIsTUFBTDtBQUNELFNBSEQ7QUFJRDtBQUNELFdBQUtBLE1BQUw7QUFDRDs7OztFQWhRcUNTLGVBQUt1RCxJOztrQkFBeEJ6SCxVIiwiZmlsZSI6IndyaXRlT3JkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IHBvcHVwIGZyb20gJy4uL2NvbXBvbmVudHMvcG9wdXAvaW5kZXgnO1xuICBpbXBvcnQge1xuICAgIGdldFN5c1dpZHRoLFxuICAgIGdldFN5c0hlaWdodCxcbiAgICBjaGFuZ2VQWFRvUlBYLFxuICAgIGNoYW5nZVJQWFRvUFhcbiAgfSBmcm9tICcuLi9saWIvd3gtc3lzdGVtLmpzJ1xuICBpbXBvcnQge1xuICAgIGNhbGN1bGF0ZURpZmZUaW1lXG4gIH0gZnJvbSBcIi4uL2xpYi91dGlscy5qc1wiO1xuICBpbXBvcnQge1xuICAgIG9yZGVyV3JpdGUsXG4gICAgc2VsZWN0UHJpY2VzLFxuICAgIGFkZE9yZGVyXG4gIH0gZnJvbSAnLi4vc2VydmVyL2luZGV4LmpzJ1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBXcml0ZU9yZGVyIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5aGr5YaZ6K6i5Y2VJyxcbiAgICAgIC8vIGRpc2FibGVTY3JvbGw6IHRydWVcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInBvcHVwXCI6e1wic2l6ZVwiOlwiNTAwXCIsXCJkdXJhdGlvblwiOlwiMzYwXCIsXCJ0eXBlXCI6XCJib3R0b21cIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2hvd01vZGFsLnN5bmNcIjpcInNob3dNb2RhbFwifX07XHJcbiRldmVudHMgPSB7fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBwb3B1cDogcG9wdXAgLy/lvLnnqpdcbiAgICB9O1xuICAgIGNvbXB1dGVkID0ge1xuICAgICAgZm9ybWF0RGF0ZSgpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gW107XG4gICAgICAgIGlmICh0aGlzLmRhdGVWYWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5kYXRlVmFsdWUuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIHZhbHVlLnB1c2gobmV3IERhdGUoaXRlbSkudG9TdHJpbmcoXCJNTeaciGRk5pelXCIpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9LFxuICAgICAgZ2V0RGF5cygpIHtcbiAgICAgICAgbGV0IGRheXMgPSAwO1xuICAgICAgICBpZiAodGhpcy5kYXRlVmFsdWUubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgbGV0IGZpcnN0ID0gbmV3IERhdGUodGhpcy5kYXRlVmFsdWVbMF0ucmVwbGFjZSgvLS9naSwgXCIvXCIpKS52YWx1ZU9mKCk7XG4gICAgICAgICAgbGV0IHNlY29uZCA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZhbHVlWzFdLnJlcGxhY2UoLy0vZ2ksIFwiL1wiKSkudmFsdWVPZigpO1xuICAgICAgICAgIGxldCB0aW1lID0gY2FsY3VsYXRlRGlmZlRpbWUoZmlyc3QsIHNlY29uZCk7XG4gICAgICAgICAgZGF5cyA9IHRpbWVbMF0gLyAyNDtcbiAgICAgICAgICByZXR1cm4gZGF5cztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdldERlc2NyaWJlKCkge1xuICAgICAgICBsZXQgZGVzY3JpYmUgPSBbXCJcIiwgXCJcIl07XG4gICAgICAgIGlmICh0aGlzLmRhdGVWYWx1ZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgIGxldCBjdXJyZW50U3RhbXAgPSBuZXcgRGF0ZShcbiAgICAgICAgICAgIGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgICBjdXJyZW50RGF0ZS5nZXRNb250aCgpLFxuICAgICAgICAgICAgY3VycmVudERhdGUuZ2V0RGF0ZSgpXG4gICAgICAgICAgKS52YWx1ZU9mKCk7XG4gICAgICAgICAgbGV0IGZpcnN0ID0gbmV3IERhdGUodGhpcy5kYXRlVmFsdWVbMF0ucmVwbGFjZSgvLS9naSwgXCIvXCIpKS52YWx1ZU9mKCk7XG4gICAgICAgICAgbGV0IHNlY29uZCA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZhbHVlWzFdLnJlcGxhY2UoLy0vZ2ksIFwiL1wiKSkudmFsdWVPZigpO1xuICAgICAgICAgIGlmIChjdXJyZW50U3RhbXAgPT0gZmlyc3QpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzBdID0gXCLku4rlpKlcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGFtcCArIDI0ICogNjAgKiA2MCAqIDEwMDAgPT0gZmlyc3QpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzBdID0gXCLmmI7lpKlcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGFtcCArIDI0ICogNjAgKiA2MCAqIDEwMDAgKiAyID09IGZpcnN0KSB7XG4gICAgICAgICAgICBkZXNjcmliZVswXSA9IFwi5ZCO5aSpXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzBdID0gXCJcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGN1cnJlbnRTdGFtcCA9PSBzZWNvbmQpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzFdID0gXCLku4rlpKlcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGFtcCArIDI0ICogNjAgKiA2MCAqIDEwMDAgPT0gc2Vjb25kKSB7XG4gICAgICAgICAgICBkZXNjcmliZVsxXSA9IFwi5piO5aSpXCI7XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhbXAgKyAyNCAqIDYwICogNjAgKiAxMDAwICogMiA9PSBzZWNvbmQpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzFdID0gXCLlkI7lpKlcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVzY3JpYmVbMV0gPSBcIlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVzY3JpYmU7XG4gICAgICB9LFxuICAgICAgZ2V0UHJpY2UoKSB7XG4gICAgICAgIGxldCBwcmljZSA9IDBcbiAgICAgICAgaWYgKHRoaXMubmlnaHRseVJhdGVEdG9zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLm5pZ2h0bHlSYXRlRHRvcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcHJpY2UgKz0gaXRlbS5zYWxlUHJpY2VcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmljZSAqIHRoaXMuY291bnRcbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHNjcm9sbEhlaWdodDogMCxcbiAgICAgIGRhdGVWYWx1ZTogWycyMDE5LTA4LTEwJywgJzIwMTktMDgtMTEnXSxcbiAgICAgIHJvb21JbmZvOiB7fSxcbiAgICAgIG9yZGVySW5mbzoge30sXG4gICAgICBob3VzZUlkOiAnJyxcbiAgICAgIGNvdW50OiAxLFxuICAgICAgcGhvbmU6ICcnLFxuICAgICAgcm9vbXNBcnJheTogW3tcbiAgICAgICAgbGFiZWw6ICcx6Ze0JyxcbiAgICAgICAgdmFsdWU6IDFcbiAgICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICcy6Ze0JyxcbiAgICAgICAgdmFsdWU6IDJcbiAgICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICcz6Ze0JyxcbiAgICAgICAgdmFsdWU6IDNcbiAgICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICc06Ze0JyxcbiAgICAgICAgdmFsdWU6IDRcbiAgICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICc16Ze0JyxcbiAgICAgICAgdmFsdWU6IDVcbiAgICAgIH0sIHtcbiAgICAgICAgbGFiZWw6ICc26Ze0JyxcbiAgICAgICAgdmFsdWU6IDZcbiAgICAgIH1dLFxuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICAgIG5pZ2h0bHlSYXRlRHRvczogW10sXG4gICAgICByb29tczogW3tcbiAgICAgICAgbmFtZTogJydcbiAgICAgIH1dXG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICByb29tc05hbWUoZSkge1xuICAgICAgICBsZXQgaW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleFxuICAgICAgICB0aGlzLnJvb21zW2luZGV4XS5uYW1lID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5yb29tcylcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIHJvb21QaWNrZXJDaGFuZ2UoZSkge1xuICAgICAgICBsZXQgaW5kZXggPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICB0aGlzLmNvdW50ID0gdGhpcy5yb29tc0FycmF5W2luZGV4XS52YWx1ZVxuICAgICAgICB0aGlzLnJvb21zID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvdW50OyBpKyspIHtcbiAgICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgbmFtZTogJydcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5yb29tcy5wdXNoKG9iailcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgcGhvbmVJbnB1dChlKSB7XG4gICAgICAgIHRoaXMucGhvbmUgPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgaGFuZGxlTW9kYWwoKSB7XG4gICAgICAgIHRoaXMuc2hvd01vZGFsID0gdHJ1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgaGFuZGxlU3VibWl0KCkge1xuICAgICAgICBsZXQgZnVsbCA9IG51bGxcbiAgICAgICAgdGhpcy5yb29tcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChpdGVtLm5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICBmdWxsID0gMVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghKC9eW1xcdTRFMDAtXFx1OUZBNV17Miw0fSQvKS50ZXN0KGl0ZW0ubmFtZSkpIHtcbiAgICAgICAgICAgIGZ1bGwgPSAyXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZnVsbCA9PT0gMSkge1xuICAgICAgICAgIHdlcHkuc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5q+P6Ze06ZyA5aGr5YaZ5LiA5L2N5aeT5ZCNJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMjAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIGlmIChmdWxsID09PSAyKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7floavlhpnmraPnoa7nmoTlp5PlkI0nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEyMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKCEoL14xWzM0NTc4XVxcZHs5fSQvLnRlc3QodGhpcy5waG9uZSkpKSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfor7fovpPlhaXmraPnoa7nmoTmiYvmnLrlj7cnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEyMDBcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0uLi4nXG4gICAgICAgICAgfSlcbiAgICAgICAgICBsZXQgbmFtZSA9ICcnXG4gICAgICAgICAgaWYgKHRoaXMuY291bnQgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnJvb21zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5yb29tcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgbmFtZSArPSBpdGVtLm5hbWVcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuYW1lICs9IGl0ZW0ubmFtZSArICcsJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgICAgICAgaG91c2VJZDogdGhpcy5ob3VzZUlkLFxuICAgICAgICAgICAgaW5EYXRlOiB0aGlzLmRhdGVWYWx1ZVswXSA/IG5ldyBEYXRlKHRoaXMuZGF0ZVZhbHVlWzBdKS50b1N0cmluZygneXl5eU1NZGQnKSA6ICcnLFxuICAgICAgICAgICAgb3V0RGF0ZTogdGhpcy5kYXRlVmFsdWVbMV0gPyBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVsxXSkudG9TdHJpbmcoJ3l5eXlNTWRkJykgOiAnJyxcbiAgICAgICAgICAgIGhvdXNlTnVtOiB0aGlzLmNvdW50LFxuICAgICAgICAgICAgdXNlckNvdW50OiAxLFxuICAgICAgICAgICAgdXNlck5hbWU6IG5hbWUsXG4gICAgICAgICAgICBtb2JpbGU6IHRoaXMucGhvbmUsXG4gICAgICAgICAgICBvcmRlclR5cGU6IDIsXG4gICAgICAgICAgICBtZXNzYWdlOiAnJyxcbiAgICAgICAgICAgIGRlcG9zaXQ6IDAsXG4gICAgICAgICAgICBhZ2VudElkOiAwLFxuICAgICAgICAgICAgdHV0b3JJZDogMCxcbiAgICAgICAgICAgIGlnbm9yZUxvZ2luOiAxLFxuICAgICAgICAgICAgZGlzY291bnQ6IDAsXG4gICAgICAgICAgICByZWJhdGVUeXBlOiAnJyxcbiAgICAgICAgICAgIGtleUlkOiB0aGlzLnJvb21JbmZvLmtleUlkLFxuICAgICAgICAgICAgdXNlVHlwZTogMCxcbiAgICAgICAgICAgIG9wZW5JZDogJydcbiAgICAgICAgICB9XG4gICAgICAgICAgYWRkT3JkZXIocXVlcnkpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgaWYgKHJlcyAmJiByZXMub3JkZXJJbmZvLm9yZGVyTm8pIHtcbiAgICAgICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgICAgICB1cmw6ICcuL3BheT9vcmRlck5vPScgKyByZXMub3JkZXJJbmZvLm9yZGVyTm9cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG9uU2hvdygpIHt9XG4gICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgdGhpcy5zY3JvbGxIZWlnaHQgPSBjaGFuZ2VQWFRvUlBYKGdldFN5c0hlaWdodCgpKSAtIDEwMDtcbiAgICAgIGlmIChvcHRpb24uZGF0ZSkge1xuICAgICAgICB0aGlzLmRhdGVWYWx1ZSA9IG9wdGlvbi5kYXRlLnNwbGl0KCcsJykgfHwgW11cbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb24ucm9vbUluZm8gJiYgb3B0aW9uLmhvdXNlSWQpIHtcbiAgICAgICAgdGhpcy5ob3VzZUlkID0gb3B0aW9uLmhvdXNlSWRcbiAgICAgICAgdGhpcy5yb29tSW5mbyA9IEpTT04ucGFyc2Uob3B0aW9uLnJvb21JbmZvKVxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJvb21JbmZvKVxuICAgICAgICBsZXQgcXVlcnkgPSB7XG4gICAgICAgICAga2V5SWQ6IHRoaXMucm9vbUluZm8ua2V5SWQsXG4gICAgICAgICAgaG91c2VJZDogb3B0aW9uLmhvdXNlSWQsXG4gICAgICAgICAgc3RhcnREYXRlOiBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVswXSkudG9TdHJpbmcoJ3l5eXlNTWRkJyksXG4gICAgICAgICAgZW5kRGF0ZTogbmV3IERhdGUodGhpcy5kYXRlVmFsdWVbMV0pLnRvU3RyaW5nKCd5eXl5TU1kZCcpLFxuICAgICAgICAgIHByaWNlOiB0aGlzLnJvb21JbmZvLnByaWNlLFxuICAgICAgICAgIGhvdGVsQnJhbmQ6IHRoaXMucm9vbUluZm8uc291cmNlLFxuICAgICAgICAgIHRlcm1pbmFsOiAnUF9URVJNSU5BTF9NT0JJTEVfQidcbiAgICAgICAgfVxuICAgICAgICBvcmRlcldyaXRlKHF1ZXJ5KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgbGV0IHRlbXBPYmogPSByZXMudXNlckluZm9cbiAgICAgICAgICB0aGlzLm9yZGVySW5mbyA9IHtcbiAgICAgICAgICAgIHRpdGxlOiB0ZW1wT2JqLmhvdXNlVGl0bGUsXG4gICAgICAgICAgICBhdmF0YXI6IHRlbXBPYmouaW1nVXJsLFxuICAgICAgICAgICAgdHlwZTogdGVtcE9iai5ob3VzZUluZm8uaG91c2VUaXRsZSxcbiAgICAgICAgICAgIGJyZWFrZmFzdDogKCh0ZW1wT2JqLmhvdXNlSW5mby5icmVha2Zhc3QgPT09IG51bGwgfHwgdGVtcE9iai5ob3VzZUluZm8uYnJlYWtmYXN0ID09PSAwKSA/ICfml6Dml6knIDogJ+acieaXqScpLFxuICAgICAgICAgICAgY2FuY2VsTGltaXQ6IHRlbXBPYmouY2FuY2VsTGltaXQsXG4gICAgICAgICAgICBjYW5jZWxNc2c6IHRlbXBPYmouY2FuY2VsTXNnLFxuICAgICAgICAgICAgcmVmdW5kTXNnOiB0ZW1wT2JqLnJlZnVuZFByb21wdE1zZyxcbiAgICAgICAgICAgIGNoZWNrUG9saWN5OiB0ZW1wT2JqLmNoZWNrUG9saWN5XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSlcbiAgICAgICAgbGV0IHF1ZXJ5MSA9IHtcbiAgICAgICAgICBob3VzZUlkOiBvcHRpb24uaG91c2VJZCxcbiAgICAgICAgICBpbkRhdGU6IG5ldyBEYXRlKHRoaXMuZGF0ZVZhbHVlWzBdKS50b1N0cmluZygneXl5eU1NZGQnKSxcbiAgICAgICAgICBvdXREYXRlOiBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVsxXSkudG9TdHJpbmcoJ3l5eXlNTWRkJyksXG4gICAgICAgICAgaG91c2VDb3VudDogdGhpcy5jb3VudCxcbiAgICAgICAgICBrZXlJZDogdGhpcy5yb29tSW5mby5rZXlJZCxcbiAgICAgICAgICBvcmRlclR5cGU6IDJcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RQcmljZXMocXVlcnkxKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5uaWdodGx5UmF0ZUR0b3MgPSByZXMubmlnaHRseVJhdGVEdG9zXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgdGhpcy4kYXBwbHkoKVxuICAgIH1cbiAgfVxuIl19