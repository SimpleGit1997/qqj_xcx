'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _utils = require('./../lib/utils.js');

var _index2 = require('./../components/datepicker/index.js');

var _index3 = _interopRequireDefault(_index2);

var _index4 = require('./../server/index.js');

var _index5 = require('./../components/popup/index.js');

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotelDetail = function (_wepy$page) {
  _inherits(HotelDetail, _wepy$page);

  function HotelDetail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HotelDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HotelDetail.__proto__ || Object.getPrototypeOf(HotelDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '酒店详情'
    }, _this.data = {
      hotelId: '',
      dateValue: [],
      _dateValue: [],
      showModal: false,
      imgUrl: '',
      hotelImageList: [],
      commentNum: 0,
      avgCommentScore: 0,
      hotelInfo: {},
      roomRateList: [],
      reserve: false,
      breakfast: false,
      freeCancel: false,
      bedType: "",
      dateModalDialog: false,
      starLength: [{
        icon: '../images/star-icon.png',
        selectedIcon: '../images/star-selected-icon.png'
      }, {
        icon: '../images/star-icon.png',
        selectedIcon: '../images/star-selected-icon.png'
      }, {
        icon: '../images/star-icon.png',
        selectedIcon: '../images/star-selected-icon.png'
      }, {
        icon: '../images/star-icon.png',
        selectedIcon: '../images/star-selected-icon.png'
      }, {
        icon: '../images/star-icon.png',
        selectedIcon: '../images/star-selected-icon.png'
      }],
      tempObj: {},
      roomInfo: {},
      price: 0
    }, _this.$repeat = {}, _this.$props = { "popups": { "size": "730", "duration": "400", "type": "bottom", "v-bind:showModal.sync": "showModal" }, "datepopup": { "size": "750", "duration": "400", "type": "bottom", "xmlns:v-bind": "", "v-bind:showModal.sync": "dateModalDialog", "xmlns:v-on": "" }, "datepicker": { "months": "4", "v-bind:value.sync": "_dateValue" } }, _this.$events = { "datepopup": { "v-on:hideModal": "hideDateDialog" }, "datepicker": { "v-on:closeDialog": "closeDateDialog" } }, _this.components = {
      popups: _index6.default,
      datepopup: _index6.default,
      datepicker: _index3.default
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
      }
    }, _this.methods = {
      /**
       * 选择可定
       */
      handlereserve: function handlereserve() {
        this.reserve = !this.reserve;
        this.getRoomRatePlanDetailInfo();
        this.$apply();
      },

      /**
       * 选择早餐
       */
      handleBreakfast: function handleBreakfast() {
        this.breakfast = !this.breakfast;
        this.getRoomRatePlanDetailInfo();
        this.$apply();
      },

      /**
       * 免费取消
       */
      handleFreeCancel: function handleFreeCancel() {
        this.freeCancel = !this.freeCancel;
        this.getRoomRatePlanDetailInfo();
        this.$apply();
      },

      /**
       * 选择床型
       */
      handleBedType: function handleBedType(value) {
        if (this.bedType == value) {
          this.bedType = '';
        } else {
          this.bedType = value;
        }
        this.getRoomRatePlanDetailInfo();
        this.$apply();
      },

      /**
       * 预览图片
       */
      handleImg: function handleImg() {
        if (this.hotelImageList.length > 0) {
          var ruls = [];
          this.hotelImageList.forEach(function (item) {
            ruls.push(item.imageUrl);
          });
          _wepy2.default.previewImage({
            current: this.hotelImageList[0],
            urls: ruls
          });
        }
      },

      /**
       * 切换房型
       */
      handleRoomRate: function handleRoomRate(index) {
        this.roomRateList[index].selected = !this.roomRateList[index].selected;
        this.$apply();
      },

      /**
       * 选择日期
       */
      handleDate: function handleDate() {
        this._dateValue = this.dateValue;
        this.dateModalDialog = true;
        this.$apply();
      },
      closeDateDialog: function closeDateDialog(value) {
        if (value.length == 2) {
          this.dateValue = value;
          this.dateModalDialog = false;
          this.getRoomRatePlanDetailInfo();
          this.$apply();
        }
      },
      hideDateDialog: function hideDateDialog() {
        if (this._dateValue.length == 2) {
          this.dateValue = this._dateValue;
          this.getRoomRatePlanDetailInfo();
          this.$apply();
        }
      },
      closeModal: function closeModal() {
        this.showModal = false;
        this.$apply();
      },

      // 地图
      seeMap: function seeMap() {
        var hotelInfo = this.hotelInfo;
        var hotelJson = JSON.stringify(hotelInfo);
        _wepy2.default.navigateTo({
          url: './map?hotelInfo=' + hotelJson
        });
      },

      // 评论
      handleComment: function handleComment() {
        if (this.commentNum > 0) {
          _wepy2.default.navigateTo({
            url: './hotelDetailConter'
          });
        }
      },

      // 详情
      handleInfo: function handleInfo() {
        _wepy2.default.navigateTo({
          url: './hotelInfo?hotelId=' + this.hotelId
        });
      },

      /**
       * 订购酒店
       */
      submitOrder: function submitOrder(index, _index) {
        var _this2 = this;

        var row = Object.assign(this.roomRateList[index], {});
        row.chirdren = row.roomRatePlanList[_index];
        this.tempObj = row;
        var query = {
          houseId: this.tempObj.chirdren.houseId,
          planKeyId: this.tempObj.chirdren.keyId,
          beginTime: this.dateValue[0] ? new Date(this.dateValue[0]).toString('yyyy-MM-dd') : '',
          endTime: this.dateValue[1] ? new Date(this.dateValue[1]).toString('yyyy-MM-dd') : ''
        };
        _wepy2.default.showLoading({
          title: '加载中...'
        });
        (0, _index4.roomRatePlanInfo)(query).then(function (res) {
          _this2.price = res.data.houseInfo.price;
          _this2.showModal = true;
          _this2.roomInfo = res.data;
          _wepy2.default.hideLoading();
          _this2.$apply();
        });
      },

      // 立即预定
      handleWriteOrder: function handleWriteOrder() {
        _wepy2.default.navigateTo({
          url: './writeOrder?roomInfo=' + JSON.stringify(this.roomInfo.houseInfo) + '&date=' + this.dateValue + '&houseId=' + this.tempObj.chirdren.houseId
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HotelDetail, [{
    key: 'onLoad',
    value: function onLoad(option) {
      this.imgUrl = this.$parent.$config.imgUrl;
      if (option.hotelId) {
        this.hotelId = option.hotelId;
      }
      if (option.dateValue) {
        this.dateValue = option.dateValue.split(',') || [];
        this._dateValue = this.dateValue;
      }
      // 酒店图片列表
      this.gethotelImageInfo();
      // 获取酒店详情
      this.getHotelDetailInfo();
      // 房型价格接口
      this.getRoomRatePlanDetailInfo();
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
    key: 'getHotelDetailInfo',
    value: function getHotelDetailInfo(option) {
      var _this3 = this;

      (0, _index4.hotelDetailInfo)({
        hotelId: this.hotelId
      }).then(function (res) {
        console.log(res);
        _this3.commentNum = res.commentNum;
        _this3.avgCommentScore = res.avgCommentScore;
        _this3.hotelInfo = res.hotelInfo;
        _this3.$apply();
      });
    }
  }, {
    key: 'getRoomRatePlanDetailInfo',
    value: function getRoomRatePlanDetailInfo() {
      var _this4 = this;

      _wepy2.default.showLoading({
        title: '加载中...'
      });
      (0, _index4.roomRatePlanDetailInfo)({
        hotelId: this.hotelId,
        beginTime: this.dateValue[0] ? new Date(this.dateValue[0]).toString('yyyy-MM-dd') : '',
        endTime: this.dateValue[1] ? new Date(this.dateValue[1]).toString('yyyy-MM-dd') : '',
        reserve: this.reserve,
        breakfast: this.breakfast,
        freeCancel: this.freeCancel,
        bedType: this.bedType
      }).then(function (res) {
        _this4.roomRateList = res.roomRateList;
        _this4.$apply();
        _wepy2.default.hideLoading();
      });
    }
  }, {
    key: 'gethotelImageInfo',
    value: function gethotelImageInfo() {
      var _this5 = this;

      (0, _index4.hotelImageInfo)({
        hotelId: this.hotelId
      }).then(function (res) {
        _this5.hotelImageList = res.hotelImageList;
        _this5.$apply();
      });
    }
  }]);

  return HotelDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(HotelDetail , 'pages/hotelDetail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvdGVsRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkhvdGVsRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJob3RlbElkIiwiZGF0ZVZhbHVlIiwiX2RhdGVWYWx1ZSIsInNob3dNb2RhbCIsImltZ1VybCIsImhvdGVsSW1hZ2VMaXN0IiwiY29tbWVudE51bSIsImF2Z0NvbW1lbnRTY29yZSIsImhvdGVsSW5mbyIsInJvb21SYXRlTGlzdCIsInJlc2VydmUiLCJicmVha2Zhc3QiLCJmcmVlQ2FuY2VsIiwiYmVkVHlwZSIsImRhdGVNb2RhbERpYWxvZyIsInN0YXJMZW5ndGgiLCJpY29uIiwic2VsZWN0ZWRJY29uIiwidGVtcE9iaiIsInJvb21JbmZvIiwicHJpY2UiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwb3B1cHMiLCJkYXRlcG9wdXAiLCJkYXRlcGlja2VyIiwiY29tcHV0ZWQiLCJmb3JtYXREYXRlIiwidmFsdWUiLCJsZW5ndGgiLCJmb3JFYWNoIiwicHVzaCIsIkRhdGUiLCJpdGVtIiwidG9TdHJpbmciLCJnZXREYXlzIiwiZGF5cyIsImZpcnN0IiwicmVwbGFjZSIsInZhbHVlT2YiLCJzZWNvbmQiLCJ0aW1lIiwiZ2V0RGVzY3JpYmUiLCJkZXNjcmliZSIsImN1cnJlbnREYXRlIiwiY3VycmVudFN0YW1wIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJzdHIiLCJjaGFyQXQiLCJnZXREYXkiLCJtZXRob2RzIiwiaGFuZGxlcmVzZXJ2ZSIsImdldFJvb21SYXRlUGxhbkRldGFpbEluZm8iLCIkYXBwbHkiLCJoYW5kbGVCcmVha2Zhc3QiLCJoYW5kbGVGcmVlQ2FuY2VsIiwiaGFuZGxlQmVkVHlwZSIsImhhbmRsZUltZyIsInJ1bHMiLCJpbWFnZVVybCIsIndlcHkiLCJwcmV2aWV3SW1hZ2UiLCJjdXJyZW50IiwidXJscyIsImhhbmRsZVJvb21SYXRlIiwiaW5kZXgiLCJzZWxlY3RlZCIsImhhbmRsZURhdGUiLCJjbG9zZURhdGVEaWFsb2ciLCJoaWRlRGF0ZURpYWxvZyIsImNsb3NlTW9kYWwiLCJzZWVNYXAiLCJob3RlbEpzb24iLCJKU09OIiwic3RyaW5naWZ5IiwibmF2aWdhdGVUbyIsInVybCIsImhhbmRsZUNvbW1lbnQiLCJoYW5kbGVJbmZvIiwic3VibWl0T3JkZXIiLCJfaW5kZXgiLCJyb3ciLCJPYmplY3QiLCJhc3NpZ24iLCJjaGlyZHJlbiIsInJvb21SYXRlUGxhbkxpc3QiLCJxdWVyeSIsImhvdXNlSWQiLCJwbGFuS2V5SWQiLCJrZXlJZCIsImJlZ2luVGltZSIsImVuZFRpbWUiLCJzaG93TG9hZGluZyIsInRpdGxlIiwidGhlbiIsInJlcyIsImhvdXNlSW5mbyIsImhpZGVMb2FkaW5nIiwiaGFuZGxlV3JpdGVPcmRlciIsIm9wdGlvbiIsIiRwYXJlbnQiLCIkY29uZmlnIiwic3BsaXQiLCJnZXRob3RlbEltYWdlSW5mbyIsImdldEhvdGVsRGV0YWlsSW5mbyIsImNvbnNvbGUiLCJsb2ciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOztBQUdBOzs7O0FBQ0E7O0FBTUE7Ozs7Ozs7Ozs7OztJQUNxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsSSxHQUFPO0FBQ0xDLGVBQVMsRUFESjtBQUVMQyxpQkFBVyxFQUZOO0FBR0xDLGtCQUFZLEVBSFA7QUFJTEMsaUJBQVcsS0FKTjtBQUtMQyxjQUFRLEVBTEg7QUFNTEMsc0JBQWdCLEVBTlg7QUFPTEMsa0JBQVksQ0FQUDtBQVFMQyx1QkFBaUIsQ0FSWjtBQVNMQyxpQkFBVyxFQVROO0FBVUxDLG9CQUFjLEVBVlQ7QUFXTEMsZUFBUyxLQVhKO0FBWUxDLGlCQUFXLEtBWk47QUFhTEMsa0JBQVksS0FiUDtBQWNMQyxlQUFTLEVBZEo7QUFlTEMsdUJBQWlCLEtBZlo7QUFnQkxDLGtCQUFZLENBQUM7QUFDVEMs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QUFJOUYsY0FBMUI7QUFDQSxlQUFLb0QsTUFBTDtBQUNELE9BTEQ7QUFNRDs7OztFQTlTc0NPLGVBQUsrQyxJOztrQkFBekJuSCxXIiwiZmlsZSI6ImhvdGVsRGV0YWlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknO1xuICBpbXBvcnQge1xuICAgIGNhbGN1bGF0ZURpZmZUaW1lLFxuICB9IGZyb20gXCIuLi9saWIvdXRpbHMuanNcIjtcbiAgaW1wb3J0IGRhdGVwaWNrZXIgZnJvbSAnLi4vY29tcG9uZW50cy9kYXRlcGlja2VyL2luZGV4J1xuICBpbXBvcnQge1xuICAgIHJvb21SYXRlUGxhbkRldGFpbEluZm8sXG4gICAgaG90ZWxEZXRhaWxJbmZvLFxuICAgIGhvdGVsSW1hZ2VJbmZvLFxuICAgIHJvb21SYXRlUGxhbkluZm9cbiAgfSBmcm9tICcuLi9zZXJ2ZXIvaW5kZXguanMnXG4gIGltcG9ydCBwb3B1cHMgZnJvbSAnLi4vY29tcG9uZW50cy9wb3B1cC9pbmRleCdcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSG90ZWxEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfphZLlupfor6bmg4UnLFxuICAgIH07XG4gICAgZGF0YSA9IHtcbiAgICAgIGhvdGVsSWQ6ICcnLFxuICAgICAgZGF0ZVZhbHVlOiBbXSxcbiAgICAgIF9kYXRlVmFsdWU6IFtdLFxuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICAgIGltZ1VybDogJycsXG4gICAgICBob3RlbEltYWdlTGlzdDogW10sXG4gICAgICBjb21tZW50TnVtOiAwLFxuICAgICAgYXZnQ29tbWVudFNjb3JlOiAwLFxuICAgICAgaG90ZWxJbmZvOiB7fSxcbiAgICAgIHJvb21SYXRlTGlzdDogW10sXG4gICAgICByZXNlcnZlOiBmYWxzZSxcbiAgICAgIGJyZWFrZmFzdDogZmFsc2UsXG4gICAgICBmcmVlQ2FuY2VsOiBmYWxzZSxcbiAgICAgIGJlZFR5cGU6IFwiXCIsXG4gICAgICBkYXRlTW9kYWxEaWFsb2c6IGZhbHNlLFxuICAgICAgc3Rhckxlbmd0aDogW3tcbiAgICAgICAgICBpY29uOiAnLi4vaW1hZ2VzL3N0YXItaWNvbi5wbmcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvbjogJy4uL2ltYWdlcy9zdGFyLXNlbGVjdGVkLWljb24ucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWNvbjogJy4uL2ltYWdlcy9zdGFyLWljb24ucG5nJyxcbiAgICAgICAgICBzZWxlY3RlZEljb246ICcuLi9pbWFnZXMvc3Rhci1zZWxlY3RlZC1pY29uLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGljb246ICcuLi9pbWFnZXMvc3Rhci1pY29uLnBuZycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uOiAnLi4vaW1hZ2VzL3N0YXItc2VsZWN0ZWQtaWNvbi5wbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpY29uOiAnLi4vaW1hZ2VzL3N0YXItaWNvbi5wbmcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvbjogJy4uL2ltYWdlcy9zdGFyLXNlbGVjdGVkLWljb24ucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWNvbjogJy4uL2ltYWdlcy9zdGFyLWljb24ucG5nJyxcbiAgICAgICAgICBzZWxlY3RlZEljb246ICcuLi9pbWFnZXMvc3Rhci1zZWxlY3RlZC1pY29uLnBuZydcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHRlbXBPYmo6IHt9LFxuICAgICAgcm9vbUluZm86IHt9LFxuICAgICAgcHJpY2U6IDBcbiAgICB9O1xuICAgJHJlcGVhdCA9IHt9O1xyXG4kcHJvcHMgPSB7XCJwb3B1cHNcIjp7XCJzaXplXCI6XCI3MzBcIixcImR1cmF0aW9uXCI6XCI0MDBcIixcInR5cGVcIjpcImJvdHRvbVwiLFwidi1iaW5kOnNob3dNb2RhbC5zeW5jXCI6XCJzaG93TW9kYWxcIn0sXCJkYXRlcG9wdXBcIjp7XCJzaXplXCI6XCI3NTBcIixcImR1cmF0aW9uXCI6XCI0MDBcIixcInR5cGVcIjpcImJvdHRvbVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzaG93TW9kYWwuc3luY1wiOlwiZGF0ZU1vZGFsRGlhbG9nXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJkYXRlcGlja2VyXCI6e1wibW9udGhzXCI6XCI0XCIsXCJ2LWJpbmQ6dmFsdWUuc3luY1wiOlwiX2RhdGVWYWx1ZVwifX07XHJcbiRldmVudHMgPSB7XCJkYXRlcG9wdXBcIjp7XCJ2LW9uOmhpZGVNb2RhbFwiOlwiaGlkZURhdGVEaWFsb2dcIn0sXCJkYXRlcGlja2VyXCI6e1widi1vbjpjbG9zZURpYWxvZ1wiOlwiY2xvc2VEYXRlRGlhbG9nXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBwb3B1cHM6IHBvcHVwcyxcbiAgICAgIGRhdGVwb3B1cDogcG9wdXBzLFxuICAgICAgZGF0ZXBpY2tlcjogZGF0ZXBpY2tlclxuICAgIH1cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGZvcm1hdERhdGUoKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IFtdO1xuICAgICAgICBpZiAodGhpcy5kYXRlVmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB2YWx1ZS5wdXNoKG5ldyBEYXRlKGl0ZW0pLnRvU3RyaW5nKFwiTU3mnIhkZOaXpVwiKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSxcbiAgICAgIGdldERheXMoKSB7XG4gICAgICAgIGxldCBkYXlzID0gMDtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIGxldCBmaXJzdCA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZhbHVlWzBdLnJlcGxhY2UoLy0vZ2ksIFwiL1wiKSkudmFsdWVPZigpO1xuICAgICAgICAgIGxldCBzZWNvbmQgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVsxXS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnZhbHVlT2YoKTtcbiAgICAgICAgICBsZXQgdGltZSA9IGNhbGN1bGF0ZURpZmZUaW1lKGZpcnN0LCBzZWNvbmQpO1xuICAgICAgICAgIGRheXMgPSB0aW1lWzBdIC8gMjQ7XG4gICAgICAgICAgcmV0dXJuIGRheXM7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXREZXNjcmliZSgpIHtcbiAgICAgICAgbGV0IGRlc2NyaWJlID0gW1wiXCIsIFwiXCJdO1xuICAgICAgICBpZiAodGhpcy5kYXRlVmFsdWUubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICBsZXQgY3VycmVudFN0YW1wID0gbmV3IERhdGUoXG4gICAgICAgICAgICBjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgY3VycmVudERhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgIGN1cnJlbnREYXRlLmdldERhdGUoKVxuICAgICAgICAgICkudmFsdWVPZigpO1xuICAgICAgICAgIGxldCBmaXJzdCA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZhbHVlWzBdLnJlcGxhY2UoLy0vZ2ksIFwiL1wiKSkudmFsdWVPZigpO1xuICAgICAgICAgIGxldCBzZWNvbmQgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVsxXS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnZhbHVlT2YoKTtcbiAgICAgICAgICBpZiAoY3VycmVudFN0YW1wID09IGZpcnN0KSB7XG4gICAgICAgICAgICBkZXNjcmliZVswXSA9IFwi5LuK5aSpXCI7XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhbXAgKyAyNCAqIDYwICogNjAgKiAxMDAwID09IGZpcnN0KSB7XG4gICAgICAgICAgICBkZXNjcmliZVswXSA9IFwi5piO5aSpXCI7XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhbXAgKyAyNCAqIDYwICogNjAgKiAxMDAwICogMiA9PSBmaXJzdCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMF0gPSBcIuWQjuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3RyID0gJ+aYn+acnycgKyAn5pel5LiA5LqM5LiJ5Zub5LqU5YWtJy5jaGFyQXQobmV3IERhdGUoZmlyc3QpLmdldERheSgpKTtcbiAgICAgICAgICAgIGRlc2NyaWJlWzBdID0gc3RyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY3VycmVudFN0YW1wID09IHNlY29uZCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMV0gPSBcIuS7iuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YW1wICsgMjQgKiA2MCAqIDYwICogMTAwMCA9PSBzZWNvbmQpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzFdID0gXCLmmI7lpKlcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGFtcCArIDI0ICogNjAgKiA2MCAqIDEwMDAgKiAyID09IHNlY29uZCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMV0gPSBcIuWQjuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3RyID0gJ+aYn+acnycgKyAn5pel5LiA5LqM5LiJ5Zub5LqU5YWtJy5jaGFyQXQobmV3IERhdGUoc2Vjb25kKS5nZXREYXkoKSk7XG4gICAgICAgICAgICBkZXNjcmliZVsxXSA9IHN0cjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc2NyaWJlO1xuICAgICAgfVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8qKlxuICAgICAgICog6YCJ5oup5Y+v5a6aXG4gICAgICAgKi9cbiAgICAgIGhhbmRsZXJlc2VydmUoKSB7XG4gICAgICAgIHRoaXMucmVzZXJ2ZSA9ICF0aGlzLnJlc2VydmVcbiAgICAgICAgdGhpcy5nZXRSb29tUmF0ZVBsYW5EZXRhaWxJbmZvKClcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6YCJ5oup5pep6aSQXG4gICAgICAgKi9cbiAgICAgIGhhbmRsZUJyZWFrZmFzdCgpIHtcbiAgICAgICAgdGhpcy5icmVha2Zhc3QgPSAhdGhpcy5icmVha2Zhc3RcbiAgICAgICAgdGhpcy5nZXRSb29tUmF0ZVBsYW5EZXRhaWxJbmZvKClcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog5YWN6LS55Y+W5raIXG4gICAgICAgKi9cbiAgICAgIGhhbmRsZUZyZWVDYW5jZWwoKSB7XG4gICAgICAgIHRoaXMuZnJlZUNhbmNlbCA9ICF0aGlzLmZyZWVDYW5jZWxcbiAgICAgICAgdGhpcy5nZXRSb29tUmF0ZVBsYW5EZXRhaWxJbmZvKClcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6YCJ5oup5bqK5Z6LXG4gICAgICAgKi9cbiAgICAgIGhhbmRsZUJlZFR5cGUodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuYmVkVHlwZSA9PSB2YWx1ZSkge1xuICAgICAgICAgIHRoaXMuYmVkVHlwZSA9ICcnXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5iZWRUeXBlID0gdmFsdWVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdldFJvb21SYXRlUGxhbkRldGFpbEluZm8oKVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDpooTop4jlm77niYdcbiAgICAgICAqL1xuICAgICAgaGFuZGxlSW1nKCkge1xuICAgICAgICBpZiAodGhpcy5ob3RlbEltYWdlTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGV0IHJ1bHMgPSBbXVxuICAgICAgICAgIHRoaXMuaG90ZWxJbWFnZUxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIHJ1bHMucHVzaChpdGVtLmltYWdlVXJsKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHdlcHkucHJldmlld0ltYWdlKHtcbiAgICAgICAgICAgIGN1cnJlbnQ6IHRoaXMuaG90ZWxJbWFnZUxpc3RbMF0sXG4gICAgICAgICAgICB1cmxzOiBydWxzXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog5YiH5o2i5oi/5Z6LXG4gICAgICAgKi9cbiAgICAgIGhhbmRsZVJvb21SYXRlKGluZGV4KSB7XG4gICAgICAgIHRoaXMucm9vbVJhdGVMaXN0W2luZGV4XS5zZWxlY3RlZCA9ICF0aGlzLnJvb21SYXRlTGlzdFtpbmRleF0uc2VsZWN0ZWRcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6YCJ5oup5pel5pyfXG4gICAgICAgKi9cbiAgICAgIGhhbmRsZURhdGUoKSB7XG4gICAgICAgIHRoaXMuX2RhdGVWYWx1ZSA9IHRoaXMuZGF0ZVZhbHVlXG4gICAgICAgIHRoaXMuZGF0ZU1vZGFsRGlhbG9nID0gdHJ1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgY2xvc2VEYXRlRGlhbG9nKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT0gMikge1xuICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlID0gdmFsdWVcbiAgICAgICAgICB0aGlzLmRhdGVNb2RhbERpYWxvZyA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5nZXRSb29tUmF0ZVBsYW5EZXRhaWxJbmZvKClcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBoaWRlRGF0ZURpYWxvZygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGVWYWx1ZS5sZW5ndGggPT0gMikge1xuICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlID0gdGhpcy5fZGF0ZVZhbHVlXG4gICAgICAgICAgdGhpcy5nZXRSb29tUmF0ZVBsYW5EZXRhaWxJbmZvKClcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjbG9zZU1vZGFsKCkge1xuICAgICAgICB0aGlzLnNob3dNb2RhbCA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICAvLyDlnLDlm75cbiAgICAgIHNlZU1hcCgpIHtcbiAgICAgICAgbGV0IGhvdGVsSW5mbyA9IHRoaXMuaG90ZWxJbmZvXG4gICAgICAgIGxldCBob3RlbEpzb24gPSBKU09OLnN0cmluZ2lmeShob3RlbEluZm8pXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9tYXA/aG90ZWxJbmZvPScgKyBob3RlbEpzb25cbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICAvLyDor4TorrpcbiAgICAgIGhhbmRsZUNvbW1lbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbW1lbnROdW0gPiAwKSB7XG4gICAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICAgIHVybDogJy4vaG90ZWxEZXRhaWxDb250ZXInXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIOivpuaDhVxuICAgICAgaGFuZGxlSW5mbygpIHtcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2hvdGVsSW5mbz9ob3RlbElkPScgKyB0aGlzLmhvdGVsSWRcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOiuoui0remFkuW6l1xuICAgICAgICovXG4gICAgICBzdWJtaXRPcmRlcihpbmRleCwgX2luZGV4KSB7XG4gICAgICAgIGxldCByb3cgPSBPYmplY3QuYXNzaWduKHRoaXMucm9vbVJhdGVMaXN0W2luZGV4XSwge30pXG4gICAgICAgIHJvdy5jaGlyZHJlbiA9IHJvdy5yb29tUmF0ZVBsYW5MaXN0W19pbmRleF1cbiAgICAgICAgdGhpcy50ZW1wT2JqID0gcm93XG4gICAgICAgIGxldCBxdWVyeSA9IHtcbiAgICAgICAgICBob3VzZUlkOiB0aGlzLnRlbXBPYmouY2hpcmRyZW4uaG91c2VJZCxcbiAgICAgICAgICBwbGFuS2V5SWQ6IHRoaXMudGVtcE9iai5jaGlyZHJlbi5rZXlJZCxcbiAgICAgICAgICBiZWdpblRpbWU6IHRoaXMuZGF0ZVZhbHVlWzBdID8gbmV3IERhdGUodGhpcy5kYXRlVmFsdWVbMF0pLnRvU3RyaW5nKCd5eXl5LU1NLWRkJykgOiAnJyxcbiAgICAgICAgICBlbmRUaW1lOiB0aGlzLmRhdGVWYWx1ZVsxXSA/IG5ldyBEYXRlKHRoaXMuZGF0ZVZhbHVlWzFdKS50b1N0cmluZygneXl5eS1NTS1kZCcpIDogJycsXG4gICAgICAgIH1cbiAgICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0uLi4nXG4gICAgICAgIH0pXG4gICAgICAgIHJvb21SYXRlUGxhbkluZm8ocXVlcnkpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICB0aGlzLnByaWNlID0gcmVzLmRhdGEuaG91c2VJbmZvLnByaWNlXG4gICAgICAgICAgdGhpcy5zaG93TW9kYWwgPSB0cnVlXG4gICAgICAgICAgdGhpcy5yb29tSW5mbyA9IHJlcy5kYXRhXG4gICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICAvLyDnq4vljbPpooTlrppcbiAgICAgIGhhbmRsZVdyaXRlT3JkZXIoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi93cml0ZU9yZGVyP3Jvb21JbmZvPScgKyBKU09OLnN0cmluZ2lmeSh0aGlzLnJvb21JbmZvLmhvdXNlSW5mbykgKyAnJmRhdGU9JyArIHRoaXMuZGF0ZVZhbHVlICsgJyZob3VzZUlkPScgKyB0aGlzLnRlbXBPYmouY2hpcmRyZW4uaG91c2VJZFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH07XG4gICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgdGhpcy5pbWdVcmwgPSB0aGlzLiRwYXJlbnQuJGNvbmZpZy5pbWdVcmxcbiAgICAgIGlmIChvcHRpb24uaG90ZWxJZCkge1xuICAgICAgICB0aGlzLmhvdGVsSWQgPSBvcHRpb24uaG90ZWxJZFxuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbi5kYXRlVmFsdWUpIHtcbiAgICAgICAgdGhpcy5kYXRlVmFsdWUgPSBvcHRpb24uZGF0ZVZhbHVlLnNwbGl0KCcsJykgfHwgW11cbiAgICAgICAgdGhpcy5fZGF0ZVZhbHVlID0gdGhpcy5kYXRlVmFsdWVcbiAgICAgIH1cbiAgICAgIC8vIOmFkuW6l+WbvueJh+WIl+ihqFxuICAgICAgdGhpcy5nZXRob3RlbEltYWdlSW5mbygpXG4gICAgICAvLyDojrflj5bphZLlupfor6bmg4VcbiAgICAgIHRoaXMuZ2V0SG90ZWxEZXRhaWxJbmZvKClcbiAgICAgIC8vIOaIv+Wei+S7t+agvOaOpeWPo1xuICAgICAgdGhpcy5nZXRSb29tUmF0ZVBsYW5EZXRhaWxJbmZvKClcbiAgICB9XG4gICAgb25TaG93KCkge31cbiAgICBvbkhpZGUoKSB7fVxuICAgIG9uVW5sb2FkKCkge31cbiAgICBnZXRIb3RlbERldGFpbEluZm8ob3B0aW9uKSB7XG4gICAgICBob3RlbERldGFpbEluZm8oe1xuICAgICAgICBob3RlbElkOiB0aGlzLmhvdGVsSWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICB0aGlzLmNvbW1lbnROdW0gPSByZXMuY29tbWVudE51bVxuICAgICAgICB0aGlzLmF2Z0NvbW1lbnRTY29yZSA9IHJlcy5hdmdDb21tZW50U2NvcmVcbiAgICAgICAgdGhpcy5ob3RlbEluZm8gPSByZXMuaG90ZWxJbmZvXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldFJvb21SYXRlUGxhbkRldGFpbEluZm8oKSB7XG4gICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfliqDovb3kuK0uLi4nXG4gICAgICB9KVxuICAgICAgcm9vbVJhdGVQbGFuRGV0YWlsSW5mbyh7XG4gICAgICAgIGhvdGVsSWQ6IHRoaXMuaG90ZWxJZCxcbiAgICAgICAgYmVnaW5UaW1lOiB0aGlzLmRhdGVWYWx1ZVswXSA/IG5ldyBEYXRlKHRoaXMuZGF0ZVZhbHVlWzBdKS50b1N0cmluZygneXl5eS1NTS1kZCcpIDogJycsXG4gICAgICAgIGVuZFRpbWU6IHRoaXMuZGF0ZVZhbHVlWzFdID8gbmV3IERhdGUodGhpcy5kYXRlVmFsdWVbMV0pLnRvU3RyaW5nKCd5eXl5LU1NLWRkJykgOiAnJyxcbiAgICAgICAgcmVzZXJ2ZTogdGhpcy5yZXNlcnZlLFxuICAgICAgICBicmVha2Zhc3Q6IHRoaXMuYnJlYWtmYXN0LFxuICAgICAgICBmcmVlQ2FuY2VsOiB0aGlzLmZyZWVDYW5jZWwsXG4gICAgICAgIGJlZFR5cGU6IHRoaXMuYmVkVHlwZVxuICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICB0aGlzLnJvb21SYXRlTGlzdCA9IHJlcy5yb29tUmF0ZUxpc3RcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgIH0pXG4gICAgfVxuICAgIGdldGhvdGVsSW1hZ2VJbmZvKCkge1xuICAgICAgaG90ZWxJbWFnZUluZm8oe1xuICAgICAgICBob3RlbElkOiB0aGlzLmhvdGVsSWRcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5ob3RlbEltYWdlTGlzdCA9IHJlcy5ob3RlbEltYWdlTGlzdFxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19