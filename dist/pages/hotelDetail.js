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
          _wepy2.default.hideLoading();
          _this2.$apply();
        });
      },

      // 立即预定
      handleWriteOrder: function handleWriteOrder() {
        _wepy2.default.navigateTo({
          url: './writeOrder'
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
        hotelId: this.hotelId,
        sid: ''
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvdGVsRGV0YWlsLmpzIl0sIm5hbWVzIjpbIkhvdGVsRGV0YWlsIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJob3RlbElkIiwiZGF0ZVZhbHVlIiwiX2RhdGVWYWx1ZSIsInNob3dNb2RhbCIsImltZ1VybCIsImhvdGVsSW1hZ2VMaXN0IiwiY29tbWVudE51bSIsImF2Z0NvbW1lbnRTY29yZSIsImhvdGVsSW5mbyIsInJvb21SYXRlTGlzdCIsInJlc2VydmUiLCJicmVha2Zhc3QiLCJmcmVlQ2FuY2VsIiwiYmVkVHlwZSIsImRhdGVNb2RhbERpYWxvZyIsInN0YXJMZW5ndGgiLCJpY29uIiwic2VsZWN0ZWRJY29uIiwidGVtcE9iaiIsInByaWNlIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwicG9wdXBzIiwiZGF0ZXBvcHVwIiwiZGF0ZXBpY2tlciIsImNvbXB1dGVkIiwiZm9ybWF0RGF0ZSIsInZhbHVlIiwibGVuZ3RoIiwiZm9yRWFjaCIsInB1c2giLCJEYXRlIiwiaXRlbSIsInRvU3RyaW5nIiwiZ2V0RGF5cyIsImRheXMiLCJmaXJzdCIsInJlcGxhY2UiLCJ2YWx1ZU9mIiwic2Vjb25kIiwidGltZSIsImdldERlc2NyaWJlIiwiZGVzY3JpYmUiLCJjdXJyZW50RGF0ZSIsImN1cnJlbnRTdGFtcCIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwibWV0aG9kcyIsImhhbmRsZXJlc2VydmUiLCJnZXRSb29tUmF0ZVBsYW5EZXRhaWxJbmZvIiwiJGFwcGx5IiwiaGFuZGxlQnJlYWtmYXN0IiwiaGFuZGxlRnJlZUNhbmNlbCIsImhhbmRsZUJlZFR5cGUiLCJoYW5kbGVJbWciLCJydWxzIiwiaW1hZ2VVcmwiLCJ3ZXB5IiwicHJldmlld0ltYWdlIiwiY3VycmVudCIsInVybHMiLCJoYW5kbGVSb29tUmF0ZSIsImluZGV4Iiwic2VsZWN0ZWQiLCJoYW5kbGVEYXRlIiwiY2xvc2VEYXRlRGlhbG9nIiwiaGlkZURhdGVEaWFsb2ciLCJjbG9zZU1vZGFsIiwic2VlTWFwIiwiaG90ZWxKc29uIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hdmlnYXRlVG8iLCJ1cmwiLCJoYW5kbGVDb21tZW50IiwiaGFuZGxlSW5mbyIsInN1Ym1pdE9yZGVyIiwiX2luZGV4Iiwicm93IiwiT2JqZWN0IiwiYXNzaWduIiwiY2hpcmRyZW4iLCJyb29tUmF0ZVBsYW5MaXN0IiwicXVlcnkiLCJob3VzZUlkIiwicGxhbktleUlkIiwia2V5SWQiLCJiZWdpblRpbWUiLCJlbmRUaW1lIiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsInRoZW4iLCJyZXMiLCJob3VzZUluZm8iLCJoaWRlTG9hZGluZyIsImhhbmRsZVdyaXRlT3JkZXIiLCJvcHRpb24iLCIkcGFyZW50IiwiJGNvbmZpZyIsInNwbGl0IiwiZ2V0aG90ZWxJbWFnZUluZm8iLCJnZXRIb3RlbERldGFpbEluZm8iLCJzaWQiLCJjb25zb2xlIiwibG9nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7QUFHQTs7OztBQUNBOztBQU1BOzs7Ozs7Ozs7Ozs7SUFDcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1RDLEksR0FBTztBQUNMQyxlQUFTLEVBREo7QUFFTEMsaUJBQVcsRUFGTjtBQUdMQyxrQkFBWSxFQUhQO0FBSUxDLGlCQUFXLEtBSk47QUFLTEMsY0FBUSxFQUxIO0FBTUxDLHNCQUFnQixFQU5YO0FBT0xDLGtCQUFZLENBUFA7QUFRTEMsdUJBQWlCLENBUlo7QUFTTEMsaUJBQVcsRUFUTjtBQVVMQyxvQkFBYyxFQVZUO0FBV0xDLGVBQVMsS0FYSjtBQVlMQyxpQkFBVyxLQVpOO0FBYUxDLGtCQUFZLEtBYlA7QUFjTEMsZUFBUyxFQWRKO0FBZUxDLHVCQUFpQixLQWZaO0FBZ0JMQyxrQkFBWSxDQUFDO0FBQ1RDLGNBQU0seUJBREc7QUFFVEMsc0JBQWM7QUFGTCxP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QUtoQyxTQUFMLENBQWUsQ0FBZixDQUFULEVBQTRCa0MsUUFBNUIsQ0FBcUMsWUFBckMsQ0FBcEIsR0FBeUUsRUFGL0Q7QUFHckJ3RCxpQkFBUyxLQUFLMUYsU0FBTCxDQUFlLENBQWYsSUFBb0IsSUFBSWdDLElBQUosQ0FBUyxLQUFLaEMsU0FBTCxDQUFlLENBQWYsQ0FBVCxFQUE0QmtDLFFBQTVCLENBQXFDLFlBQXJDLENBQXBCLEdBQXlFLEVBSDdEO0FBSXJCekIsaUJBQVMsS0FBS0EsT0FKTztBQUtyQkMsbUJBQVcsS0FBS0EsU0FMSztBQU1yQkMsb0JBQVksS0FBS0EsVUFOSTtBQU9yQkMsaUJBQVMsS0FBS0E7QUFQTyxPQUF2QixFQVFHaUYsSUFSSCxDQVFRLGVBQU87QUFDYixlQUFLckYsWUFBTCxHQUFvQnNGLElBQUl0RixZQUF4QjtBQUNBLGVBQUs0QyxNQUFMO0FBQ0FPLHVCQUFLcUMsV0FBTDtBQUNELE9BWkQ7QUFhRDs7O3dDQUNtQjtBQUFBOztBQUNsQixrQ0FBZTtBQUNiakcsaUJBQVMsS0FBS0E7QUFERCxPQUFmLEVBRUc4RixJQUZILENBRVEsZUFBTztBQUNiLGVBQUt6RixjQUFMLEdBQXNCMEYsSUFBSTFGLGNBQTFCO0FBQ0EsZUFBS2dELE1BQUw7QUFDRCxPQUxEO0FBTUQ7Ozs7RUEzU3NDTyxlQUFLZ0QsSTs7a0JBQXpCaEgsVyIsImZpbGUiOiJob3RlbERldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgaW1wb3J0IHtcbiAgICBjYWxjdWxhdGVEaWZmVGltZSxcbiAgfSBmcm9tIFwiLi4vbGliL3V0aWxzLmpzXCI7XG4gIGltcG9ydCBkYXRlcGlja2VyIGZyb20gJy4uL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9pbmRleCdcbiAgaW1wb3J0IHtcbiAgICByb29tUmF0ZVBsYW5EZXRhaWxJbmZvLFxuICAgIGhvdGVsRGV0YWlsSW5mbyxcbiAgICBob3RlbEltYWdlSW5mbyxcbiAgICByb29tUmF0ZVBsYW5JbmZvXG4gIH0gZnJvbSAnLi4vc2VydmVyL2luZGV4LmpzJ1xuICBpbXBvcnQgcG9wdXBzIGZyb20gJy4uL2NvbXBvbmVudHMvcG9wdXAvaW5kZXgnXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvdGVsRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn6YWS5bqX6K+m5oOFJyxcbiAgICB9O1xuICAgIGRhdGEgPSB7XG4gICAgICBob3RlbElkOiAnJyxcbiAgICAgIGRhdGVWYWx1ZTogW10sXG4gICAgICBfZGF0ZVZhbHVlOiBbXSxcbiAgICAgIHNob3dNb2RhbDogZmFsc2UsXG4gICAgICBpbWdVcmw6ICcnLFxuICAgICAgaG90ZWxJbWFnZUxpc3Q6IFtdLFxuICAgICAgY29tbWVudE51bTogMCxcbiAgICAgIGF2Z0NvbW1lbnRTY29yZTogMCxcbiAgICAgIGhvdGVsSW5mbzoge30sXG4gICAgICByb29tUmF0ZUxpc3Q6IFtdLFxuICAgICAgcmVzZXJ2ZTogZmFsc2UsXG4gICAgICBicmVha2Zhc3Q6IGZhbHNlLFxuICAgICAgZnJlZUNhbmNlbDogZmFsc2UsXG4gICAgICBiZWRUeXBlOiBcIlwiLFxuICAgICAgZGF0ZU1vZGFsRGlhbG9nOiBmYWxzZSxcbiAgICAgIHN0YXJMZW5ndGg6IFt7XG4gICAgICAgICAgaWNvbjogJy4uL2ltYWdlcy9zdGFyLWljb24ucG5nJyxcbiAgICAgICAgICBzZWxlY3RlZEljb246ICcuLi9pbWFnZXMvc3Rhci1zZWxlY3RlZC1pY29uLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGljb246ICcuLi9pbWFnZXMvc3Rhci1pY29uLnBuZycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uOiAnLi4vaW1hZ2VzL3N0YXItc2VsZWN0ZWQtaWNvbi5wbmcnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpY29uOiAnLi4vaW1hZ2VzL3N0YXItaWNvbi5wbmcnLFxuICAgICAgICAgIHNlbGVjdGVkSWNvbjogJy4uL2ltYWdlcy9zdGFyLXNlbGVjdGVkLWljb24ucG5nJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaWNvbjogJy4uL2ltYWdlcy9zdGFyLWljb24ucG5nJyxcbiAgICAgICAgICBzZWxlY3RlZEljb246ICcuLi9pbWFnZXMvc3Rhci1zZWxlY3RlZC1pY29uLnBuZydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGljb246ICcuLi9pbWFnZXMvc3Rhci1pY29uLnBuZycsXG4gICAgICAgICAgc2VsZWN0ZWRJY29uOiAnLi4vaW1hZ2VzL3N0YXItc2VsZWN0ZWQtaWNvbi5wbmcnXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICB0ZW1wT2JqOiB7fSxcbiAgICAgIHByaWNlOiAwXG4gICAgfTtcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicG9wdXBzXCI6e1wic2l6ZVwiOlwiNzMwXCIsXCJkdXJhdGlvblwiOlwiNDAwXCIsXCJ0eXBlXCI6XCJib3R0b21cIixcInYtYmluZDpzaG93TW9kYWwuc3luY1wiOlwic2hvd01vZGFsXCJ9LFwiZGF0ZXBvcHVwXCI6e1wic2l6ZVwiOlwiNzUwXCIsXCJkdXJhdGlvblwiOlwiNDAwXCIsXCJ0eXBlXCI6XCJib3R0b21cIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6c2hvd01vZGFsLnN5bmNcIjpcImRhdGVNb2RhbERpYWxvZ1wiLFwieG1sbnM6di1vblwiOlwiXCJ9LFwiZGF0ZXBpY2tlclwiOntcIm1vbnRoc1wiOlwiNFwiLFwidi1iaW5kOnZhbHVlLnN5bmNcIjpcIl9kYXRlVmFsdWVcIn19O1xyXG4kZXZlbnRzID0ge1wiZGF0ZXBvcHVwXCI6e1widi1vbjpoaWRlTW9kYWxcIjpcImhpZGVEYXRlRGlhbG9nXCJ9LFwiZGF0ZXBpY2tlclwiOntcInYtb246Y2xvc2VEaWFsb2dcIjpcImNsb3NlRGF0ZURpYWxvZ1wifX07XHJcbiBjb21wb25lbnRzID0ge1xuICAgICAgcG9wdXBzOiBwb3B1cHMsXG4gICAgICBkYXRlcG9wdXA6IHBvcHVwcyxcbiAgICAgIGRhdGVwaWNrZXI6IGRhdGVwaWNrZXJcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBmb3JtYXREYXRlKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLmRhdGVWYWx1ZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdmFsdWUucHVzaChuZXcgRGF0ZShpdGVtKS50b1N0cmluZyhcIk1N5pyIZGTml6VcIikpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0sXG4gICAgICBnZXREYXlzKCkge1xuICAgICAgICBsZXQgZGF5cyA9IDA7XG4gICAgICAgIGlmICh0aGlzLmRhdGVWYWx1ZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICBsZXQgZmlyc3QgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVswXS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnZhbHVlT2YoKTtcbiAgICAgICAgICBsZXQgc2Vjb25kID0gbmV3IERhdGUodGhpcy5kYXRlVmFsdWVbMV0ucmVwbGFjZSgvLS9naSwgXCIvXCIpKS52YWx1ZU9mKCk7XG4gICAgICAgICAgbGV0IHRpbWUgPSBjYWxjdWxhdGVEaWZmVGltZShmaXJzdCwgc2Vjb25kKTtcbiAgICAgICAgICBkYXlzID0gdGltZVswXSAvIDI0O1xuICAgICAgICAgIHJldHVybiBkYXlzO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0RGVzY3JpYmUoKSB7XG4gICAgICAgIGxldCBkZXNjcmliZSA9IFtcIlwiLCBcIlwiXTtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRTdGFtcCA9IG5ldyBEYXRlKFxuICAgICAgICAgICAgY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgIGN1cnJlbnREYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICBjdXJyZW50RGF0ZS5nZXREYXRlKClcbiAgICAgICAgICApLnZhbHVlT2YoKTtcbiAgICAgICAgICBsZXQgZmlyc3QgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVswXS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnZhbHVlT2YoKTtcbiAgICAgICAgICBsZXQgc2Vjb25kID0gbmV3IERhdGUodGhpcy5kYXRlVmFsdWVbMV0ucmVwbGFjZSgvLS9naSwgXCIvXCIpKS52YWx1ZU9mKCk7XG4gICAgICAgICAgaWYgKGN1cnJlbnRTdGFtcCA9PSBmaXJzdCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMF0gPSBcIuS7iuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YW1wICsgMjQgKiA2MCAqIDYwICogMTAwMCA9PSBmaXJzdCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMF0gPSBcIuaYjuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YW1wICsgMjQgKiA2MCAqIDYwICogMTAwMCAqIDIgPT0gZmlyc3QpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzBdID0gXCLlkI7lpKlcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVzY3JpYmVbMF0gPSBcIlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY3VycmVudFN0YW1wID09IHNlY29uZCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMV0gPSBcIuS7iuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YW1wICsgMjQgKiA2MCAqIDYwICogMTAwMCA9PSBzZWNvbmQpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzFdID0gXCLmmI7lpKlcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGFtcCArIDI0ICogNjAgKiA2MCAqIDEwMDAgKiAyID09IHNlY29uZCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMV0gPSBcIuWQjuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZXNjcmliZVsxXSA9IFwiXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXNjcmliZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICAvKipcbiAgICAgICAqIOmAieaLqeWPr+WumlxuICAgICAgICovXG4gICAgICBoYW5kbGVyZXNlcnZlKCkge1xuICAgICAgICB0aGlzLnJlc2VydmUgPSAhdGhpcy5yZXNlcnZlXG4gICAgICAgIHRoaXMuZ2V0Um9vbVJhdGVQbGFuRGV0YWlsSW5mbygpXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOmAieaLqeaXqemkkFxuICAgICAgICovXG4gICAgICBoYW5kbGVCcmVha2Zhc3QoKSB7XG4gICAgICAgIHRoaXMuYnJlYWtmYXN0ID0gIXRoaXMuYnJlYWtmYXN0XG4gICAgICAgIHRoaXMuZ2V0Um9vbVJhdGVQbGFuRGV0YWlsSW5mbygpXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOWFjei0ueWPlua2iFxuICAgICAgICovXG4gICAgICBoYW5kbGVGcmVlQ2FuY2VsKCkge1xuICAgICAgICB0aGlzLmZyZWVDYW5jZWwgPSAhdGhpcy5mcmVlQ2FuY2VsXG4gICAgICAgIHRoaXMuZ2V0Um9vbVJhdGVQbGFuRGV0YWlsSW5mbygpXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOmAieaLqeW6iuWei1xuICAgICAgICovXG4gICAgICBoYW5kbGVCZWRUeXBlKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmJlZFR5cGUgPT0gdmFsdWUpIHtcbiAgICAgICAgICB0aGlzLmJlZFR5cGUgPSAnJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYmVkVHlwZSA9IHZhbHVlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRSb29tUmF0ZVBsYW5EZXRhaWxJbmZvKClcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6aKE6KeI5Zu+54mHXG4gICAgICAgKi9cbiAgICAgIGhhbmRsZUltZygpIHtcbiAgICAgICAgaWYgKHRoaXMuaG90ZWxJbWFnZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGxldCBydWxzID0gW11cbiAgICAgICAgICB0aGlzLmhvdGVsSW1hZ2VMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBydWxzLnB1c2goaXRlbS5pbWFnZVVybClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB3ZXB5LnByZXZpZXdJbWFnZSh7XG4gICAgICAgICAgICBjdXJyZW50OiB0aGlzLmhvdGVsSW1hZ2VMaXN0WzBdLFxuICAgICAgICAgICAgdXJsczogcnVsc1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOWIh+aNouaIv+Wei1xuICAgICAgICovXG4gICAgICBoYW5kbGVSb29tUmF0ZShpbmRleCkge1xuICAgICAgICB0aGlzLnJvb21SYXRlTGlzdFtpbmRleF0uc2VsZWN0ZWQgPSAhdGhpcy5yb29tUmF0ZUxpc3RbaW5kZXhdLnNlbGVjdGVkXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOmAieaLqeaXpeacn1xuICAgICAgICovXG4gICAgICBoYW5kbGVEYXRlKCkge1xuICAgICAgICB0aGlzLl9kYXRlVmFsdWUgPSB0aGlzLmRhdGVWYWx1ZVxuICAgICAgICB0aGlzLmRhdGVNb2RhbERpYWxvZyA9IHRydWVcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIGNsb3NlRGF0ZURpYWxvZyh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICB0aGlzLmRhdGVWYWx1ZSA9IHZhbHVlXG4gICAgICAgICAgdGhpcy5kYXRlTW9kYWxEaWFsb2cgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuZ2V0Um9vbVJhdGVQbGFuRGV0YWlsSW5mbygpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGlkZURhdGVEaWFsb2coKSB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRlVmFsdWUubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICB0aGlzLmRhdGVWYWx1ZSA9IHRoaXMuX2RhdGVWYWx1ZVxuICAgICAgICAgIHRoaXMuZ2V0Um9vbVJhdGVQbGFuRGV0YWlsSW5mbygpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2xvc2VNb2RhbCgpIHtcbiAgICAgICAgdGhpcy5zaG93TW9kYWwgPSBmYWxzZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgLy8g5Zyw5Zu+XG4gICAgICBzZWVNYXAoKSB7XG4gICAgICAgIGxldCBob3RlbEluZm8gPSB0aGlzLmhvdGVsSW5mb1xuICAgICAgICBsZXQgaG90ZWxKc29uID0gSlNPTi5zdHJpbmdpZnkoaG90ZWxJbmZvKVxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vbWFwP2hvdGVsSW5mbz0nICsgaG90ZWxKc29uXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgLy8g6K+E6K66XG4gICAgICBoYW5kbGVDb21tZW50KCkge1xuICAgICAgICBpZiAodGhpcy5jb21tZW50TnVtID4gMCkge1xuICAgICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICB1cmw6ICcuL2hvdGVsRGV0YWlsQ29udGVyJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyDor6bmg4VcbiAgICAgIGhhbmRsZUluZm8oKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9ob3RlbEluZm8/aG90ZWxJZD0nICsgdGhpcy5ob3RlbElkXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDorqLotK3phZLlupdcbiAgICAgICAqL1xuICAgICAgc3VibWl0T3JkZXIoaW5kZXgsIF9pbmRleCkge1xuICAgICAgICBsZXQgcm93ID0gT2JqZWN0LmFzc2lnbih0aGlzLnJvb21SYXRlTGlzdFtpbmRleF0sIHt9KVxuICAgICAgICByb3cuY2hpcmRyZW4gPSByb3cucm9vbVJhdGVQbGFuTGlzdFtfaW5kZXhdXG4gICAgICAgIHRoaXMudGVtcE9iaiA9IHJvd1xuICAgICAgICBsZXQgcXVlcnkgPSB7XG4gICAgICAgICAgaG91c2VJZDogdGhpcy50ZW1wT2JqLmNoaXJkcmVuLmhvdXNlSWQsXG4gICAgICAgICAgcGxhbktleUlkOiB0aGlzLnRlbXBPYmouY2hpcmRyZW4ua2V5SWQsXG4gICAgICAgICAgYmVnaW5UaW1lOiB0aGlzLmRhdGVWYWx1ZVswXSA/IG5ldyBEYXRlKHRoaXMuZGF0ZVZhbHVlWzBdKS50b1N0cmluZygneXl5eS1NTS1kZCcpIDogJycsXG4gICAgICAgICAgZW5kVGltZTogdGhpcy5kYXRlVmFsdWVbMV0gPyBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVsxXSkudG9TdHJpbmcoJ3l5eXktTU0tZGQnKSA6ICcnLFxuICAgICAgICB9XG4gICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiAn5Yqg6L295LitLi4uJ1xuICAgICAgICB9KVxuICAgICAgICByb29tUmF0ZVBsYW5JbmZvKHF1ZXJ5KS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgdGhpcy5wcmljZSA9IHJlcy5kYXRhLmhvdXNlSW5mby5wcmljZVxuICAgICAgICAgIHRoaXMuc2hvd01vZGFsID0gdHJ1ZVxuICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgLy8g56uL5Y2z6aKE5a6aXG4gICAgICBoYW5kbGVXcml0ZU9yZGVyKCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vd3JpdGVPcmRlcidcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9O1xuICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgIHRoaXMuaW1nVXJsID0gdGhpcy4kcGFyZW50LiRjb25maWcuaW1nVXJsXG4gICAgICBpZiAob3B0aW9uLmhvdGVsSWQpIHtcbiAgICAgICAgdGhpcy5ob3RlbElkID0gb3B0aW9uLmhvdGVsSWRcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb24uZGF0ZVZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGF0ZVZhbHVlID0gb3B0aW9uLmRhdGVWYWx1ZS5zcGxpdCgnLCcpIHx8IFtdXG4gICAgICAgIHRoaXMuX2RhdGVWYWx1ZSA9IHRoaXMuZGF0ZVZhbHVlXG4gICAgICB9XG4gICAgICAvLyDphZLlupflm77niYfliJfooahcbiAgICAgIHRoaXMuZ2V0aG90ZWxJbWFnZUluZm8oKVxuICAgICAgLy8g6I635Y+W6YWS5bqX6K+m5oOFXG4gICAgICB0aGlzLmdldEhvdGVsRGV0YWlsSW5mbygpXG4gICAgICAvLyDmiL/lnovku7fmoLzmjqXlj6NcbiAgICAgIHRoaXMuZ2V0Um9vbVJhdGVQbGFuRGV0YWlsSW5mbygpXG4gICAgfVxuICAgIG9uU2hvdygpIHt9XG4gICAgb25IaWRlKCkge31cbiAgICBvblVubG9hZCgpIHt9XG4gICAgZ2V0SG90ZWxEZXRhaWxJbmZvKG9wdGlvbikge1xuICAgICAgaG90ZWxEZXRhaWxJbmZvKHtcbiAgICAgICAgaG90ZWxJZDogdGhpcy5ob3RlbElkLFxuICAgICAgICBzaWQ6ICcnXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgdGhpcy5jb21tZW50TnVtID0gcmVzLmNvbW1lbnROdW1cbiAgICAgICAgdGhpcy5hdmdDb21tZW50U2NvcmUgPSByZXMuYXZnQ29tbWVudFNjb3JlXG4gICAgICAgIHRoaXMuaG90ZWxJbmZvID0gcmVzLmhvdGVsSW5mb1xuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRSb29tUmF0ZVBsYW5EZXRhaWxJbmZvKCkge1xuICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitLi4uJ1xuICAgICAgfSlcbiAgICAgIHJvb21SYXRlUGxhbkRldGFpbEluZm8oe1xuICAgICAgICBob3RlbElkOiB0aGlzLmhvdGVsSWQsXG4gICAgICAgIGJlZ2luVGltZTogdGhpcy5kYXRlVmFsdWVbMF0gPyBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVswXSkudG9TdHJpbmcoJ3l5eXktTU0tZGQnKSA6ICcnLFxuICAgICAgICBlbmRUaW1lOiB0aGlzLmRhdGVWYWx1ZVsxXSA/IG5ldyBEYXRlKHRoaXMuZGF0ZVZhbHVlWzFdKS50b1N0cmluZygneXl5eS1NTS1kZCcpIDogJycsXG4gICAgICAgIHJlc2VydmU6IHRoaXMucmVzZXJ2ZSxcbiAgICAgICAgYnJlYWtmYXN0OiB0aGlzLmJyZWFrZmFzdCxcbiAgICAgICAgZnJlZUNhbmNlbDogdGhpcy5mcmVlQ2FuY2VsLFxuICAgICAgICBiZWRUeXBlOiB0aGlzLmJlZFR5cGVcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5yb29tUmF0ZUxpc3QgPSByZXMucm9vbVJhdGVMaXN0XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICB9KVxuICAgIH1cbiAgICBnZXRob3RlbEltYWdlSW5mbygpIHtcbiAgICAgIGhvdGVsSW1hZ2VJbmZvKHtcbiAgICAgICAgaG90ZWxJZDogdGhpcy5ob3RlbElkXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuaG90ZWxJbWFnZUxpc3QgPSByZXMuaG90ZWxJbWFnZUxpc3RcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiJdfQ==