"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wxSystem = require('./../lib/wx-system.js');

var _index2 = require('./../server/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//接口
var SearchList = function (_wepy$page) {
  _inherits(SearchList, _wepy$page);

  function SearchList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SearchList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchList.__proto__ || Object.getPrototypeOf(SearchList)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: "搜索酒店",
      disableScroll: true
    }, _this.components = {}, _this.data = {
      scrollHeight: 0,
      pageNo: 1,
      tempObj: {
        index: null,
        checked: false
      },
      cityInfo: {},
      keyword: '',
      dateValue: [],
      price: [],
      priceLabel: "",
      star: "",
      starLabel: "",
      regionId: 0,
      distance: 0,
      bedType: 0,
      breakfastType: 0,
      orderByType: 1,
      showModal: false,
      starList: [{
        value: 0,
        label: "不限"
      }, {
        value: 1,
        label: "经济/连锁"
      }, {
        value: 2,
        label: "二星/其他"
      }, {
        value: 3,
        label: "三星/舒适"
      }, {
        value: 4,
        label: "四星/高档"
      }, {
        value: 5,
        label: "五星/豪华"
      }],
      priceList: [{
        value: ["", ""],
        label: "不限"
      }, {
        value: ["0", "100"],
        label: "0-100"
      }, {
        value: ["100", "150"],
        label: "100-150"
      }, {
        value: ["150", "300"],
        label: "150-300"
      }, {
        value: ["300", "500"],
        label: "300-500"
      }, {
        value: ["500", "800"],
        label: "500-800"
      }, {
        value: ["900", ""],
        label: "900以上"
      }],
      positionOption: ["距离", "行政区"],
      optionIndex: 0,
      typeOption: ["床型", "早餐"],
      typeIndex: 0,
      distanceList: [{
        label: "不限",
        value: "0"
      }, {
        label: "500米",
        value: "500"
      }, {
        label: "1公里",
        value: "1000"
      }, {
        label: "2公里",
        value: "2000"
      }, {
        label: "3公里",
        value: "3000"
      }, {
        label: "5公里",
        value: "5000"
      }, {
        label: "7公里",
        value: "7000"
      }, {
        label: "10公里",
        value: "10000"
      }],
      regionList: [],
      bedTypeList: [{
        label: "不限",
        value: "0"
      }, {
        label: "大床",
        value: "1"
      }, {
        label: "双床",
        value: "2"
      }, {
        label: "单人床",
        value: "3"
      }, {
        label: "多张床",
        value: "4"
      }],
      breakfastTypeList: [{
        label: "不限",
        value: "0"
      }, {
        label: "含早",
        value: "1"
      }, {
        label: "单早",
        value: "2"
      }, {
        label: "双早",
        value: "3"
      }],
      orderByTypeList: [{
        label: "距离优先",
        value: "1"
      }, {
        label: "好评优先",
        value: "2"
      }, {
        label: "低价优先",
        value: "3"
      }, {
        label: "高价优先",
        value: "4"
      }],
      hotelList: [],
      hasMore: true
    }, _this.computed = {
      formatDate: function formatDate() {
        var value = [];
        if (this.dateValue.length > 0) {
          this.dateValue.forEach(function (item) {
            value.push(new Date(item).toString("MM月dd日"));
          });
        }
        return value;
      }
    }, _this.methods = {
      /**
       * 搜索
       */
      searchSubmit: function searchSubmit(e) {
        this.getHotelInfo();
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
          var query = {
            pageNo: ++this.pageNo,
            keyword: this.keyword,
            bookStart: this.dateValue[0] ? this.dateValue[0] : '',
            bookEnd: this.dateValue[1] ? this.dateValue[1] : '',
            localPointLng: this.cityInfo.lng || '',
            localPointLat: this.cityInfo.lat || '',
            minPrice: this.price[0] ? this.price[0] : '',
            maxPrice: this.price[1] ? this.price[1] : '',
            star: this.star,
            distance: this.distance,
            cityId: this.cityInfo.id,
            regionId: this.regionId,
            bedType: this.bedType,
            breakfastType: this.breakfastType,
            orderByType: this.orderByType
          };
          console.log(query);
          (0, _index2.getHotelList)(query).then(function (data) {
            if (data.length == 0) {
              wx.showToast({
                title: '暂无更多数据哦～',
                icon: 'none',
                duration: 1200
              });
              _this2.hasMore = false;
            } else if (data.length > 0) {
              data.forEach(function (item) {
                _this2.hotelList.push(item);
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
      },
      handleHotel: function handleHotel(index) {
        var hotelId = this.hotelList[index].id;
        _wepy2.default.navigateTo({
          url: './hotelDetail?hotelId=' + hotelId + '&dateValue=' + this.dateValue
        });
      },

      /**
       * 选择距离
       */
      handleDistance: function handleDistance(index) {
        this.distance = this.distanceList[index].value;
        this.$apply();
      },

      /**
       * 选择距离/行政区
       */
      handleOptionIndex: function handleOptionIndex(index) {
        this.optionIndex = index;
        this.$apply();
      },

      /**
       * 选择早餐/床型
       */
      handleTypeIndex: function handleTypeIndex(index) {
        this.typeIndex = index;
        this.$apply();
      },

      /**
       * 选择床型
       */
      handleBedType: function handleBedType(index) {
        this.bedType = this.bedTypeList[index].value;
        this.$apply();
      },

      /**
       * 选择早餐
       */
      handleBreakfast: function handleBreakfast(index) {
        this.breakfastType = this.breakfastTypeList[index].value;
        this.$apply();
      },

      /**
       * 选择行政区
       */
      handleRegion: function handleRegion(index) {
        this.regionId = this.regionList[index].id;
        this.$apply();
      },

      /**
       * 选择排序
       */
      handleOrder: function handleOrder(index) {
        this.orderByType = this.orderByTypeList[index].value;
        console.log(this.orderByType);
        this.tempObj = {};
        this.showModal = false;
        this.getHotelInfo();
        this.$apply();
      },

      /**
       * 选择类型
       */
      handleType: function handleType(index) {
        if (this.tempObj.index == index) {
          this.tempObj.checked = false;
          this.tempObj.index = undefined;
          this.showModal = false;
        } else {
          this.tempObj.index = index;
          this.tempObj.checked = true;
          this.showModal = true;
        }
        this.$apply();
      },

      /**
       * 关闭探出框
       */
      hideModal: function hideModal() {
        this.tempObj = {};
        this.showModal = false;
        this.$apply();
      },
      preventTouchMove: function preventTouchMove() {
        console.warn("preventTouchMove方法已阻止其他事件。");
      },

      /**
       * 搜索
       */
      searchInput: function searchInput(e) {
        var value = e.detail.value;
        this.keyword = value;
        this.$apply();
      },

      /**
       * 选择星级
       */
      handleStar: function handleStar(index) {
        if (index == 0) {
          this.starList.forEach(function (item, _index) {
            if (index == _index) {
              item.checked = true;
            } else {
              item.checked = false;
            }
          });
        } else {
          this.starList[0].checked = false;
          this.starList[index].checked = !this.starList[index].checked;
          var full = true;
          this.starList.forEach(function (item, _index) {
            if (_index > 0 && !item.checked) {
              full = false;
            }
          });
          if (full) {
            this.starList.forEach(function (item, _index) {
              if (_index == 0) {
                item.checked = true;
              } else {
                item.checked = false;
              }
            });
          }
        }
        this.$apply();
      },

      /**
       * 重置星级和价格
       */
      handleResetStarAndPrice: function handleResetStarAndPrice() {
        this.starList.forEach(function (item) {
          item.checked = false;
        });
        this.priceList.forEach(function (item) {
          item.checked = false;
        });
        this.starList[0].checked = true;
        this.priceList[0].checked = true;
        this.$apply();
      },

      /**
       * 重置距离行政区
       */
      handleResetPosition: function handleResetPosition() {
        this.regionId = 0;
        this.distance = 0;
        this.$apply();
      },

      /**
       * 重置早餐床型
       */
      handleResetType: function handleResetType() {
        this.bedType = 0;
        this.breakfastType = 0;
        this.$apply();
      },

      /**
       * 选择价格
       */
      handlePrice: function handlePrice(index) {
        this.priceList.forEach(function (item, _index) {
          if (index == _index) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
        this.$apply();
      },

      /**
       * 确定位置
       */
      handleConfirmsPosition: function handleConfirmsPosition() {
        this.tempObj = {};
        this.showModal = false;
        this.getHotelInfo();
        this.$apply();
      },

      /**
       * 确定床型和早餐
       */
      handleConfirmsType: function handleConfirmsType() {
        this.tempObj = {};
        this.showModal = false;
        this.getHotelInfo();
        this.$apply();
      },

      /**
       * 确定价格和星级
       */
      handleConfirmsStarAndPrice: function handleConfirmsStarAndPrice() {
        var price = "";
        var priceLabel = "";
        var star = "";
        var starLabel = "";
        this.priceList.forEach(function (item) {
          if (item.checked) {
            price = item.value;
            priceLabel = item.label;
          }
        });
        this.starList.forEach(function (item) {
          if (item.checked) {
            star += item.value + ",";
            starLabel += item.label + " ";
          }
        });
        this.price = price;
        this.priceLabel = priceLabel;
        this.star = star;
        this.starLabel = starLabel;
        if (price || star) {
          this.priceAndStarlabel = priceLabel + " " + starLabel;
        } else {
          this.priceAndStarlabel = "";
        }
        this.tempObj = {};
        this.showModal = false;
        this.getHotelInfo();
        this.$apply();
      },
      imgError: function imgError(e) {
        var errorImgIndex = e.target.dataset.errorindex;
        this.hotelList[errorImgIndex].imageUrl = '../images/default-hotel-img.png';
        this.$apply();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SearchList, [{
    key: "onLoad",
    value: function onLoad(option) {
      var _this3 = this;

      this.scrollHeight = (0, _wxSystem.changePXToRPX)((0, _wxSystem.getSysHeight)()) - 178;
      if (option.dateValue) {
        this.dateValue = option.dateValue.split(",");
      }
      if (option.price && option.priceLabel) {
        this.price = option.price.split(",") || [];
        this.priceLabel = option.priceLabel;
      }
      if (option.star && option.starLabel) {
        this.star = option.star;
        this.starLabel = option.starLabel;
      }
      if (option.keyword) {
        this.keyword = option.keyword;
      }
      if (option.cityInfo) {
        this.cityInfo = JSON.parse(option.cityInfo);
        (0, _index2.queryRegionsByParentId)({
          parentId: this.cityInfo.id
        }).then(function (data) {
          _this3.regionList = data;
          _this3.regionList.unshift({
            name: "不限",
            id: 0
          });
          _this3.$apply();
        });
      }
      this.setPriceAndStar();
      this.$apply();
    }
  }, {
    key: "onShow",
    value: function onShow() {}
    // 设置星级和价格初始化

  }, {
    key: "setPriceAndStar",
    value: function setPriceAndStar() {
      var _this4 = this;

      this.priceList.forEach(function (item) {
        if (JSON.stringify(_this4.price) == JSON.stringify(item.value)) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
      var starArr = [];
      if (this.starLabel) {
        starArr = this.starLabel.split(" ");
      }
      this.starList.forEach(function (item) {
        var checked = false;
        if (starArr.length > 0) {
          starArr.forEach(function (_item) {
            if (_item == item.label) {
              checked = true;
            }
            item.checked = checked;
          });
        } else {
          item.checked = checked;
        }
      });
      this.getHotelInfo();
      this.$apply();
    }
  }, {
    key: "getHotelInfo",
    value: function getHotelInfo() {
      var _this5 = this;

      _wepy2.default.showLoading({
        title: '加载中...'
      });
      this.hasMore = true;
      this.pageNo = 1;
      var query = {
        pageNo: this.pageNo,
        keyword: this.keyword,
        bookStart: this.dateValue[0] ? this.dateValue[0] : '',
        bookEnd: this.dateValue[1] ? this.dateValue[1] : '',
        localPointLng: this.cityInfo.lng || '',
        localPointLat: this.cityInfo.lat || '',
        minPrice: this.price[0] ? this.price[0] : '',
        maxPrice: this.price[1] ? this.price[1] : '',
        star: this.star,
        distance: this.distance,
        cityId: this.cityInfo.id,
        regionId: this.regionId,
        bedType: this.bedType,
        breakfastType: this.breakfastType,
        orderByType: this.orderByType
      };
      (0, _index2.getHotelList)(query).then(function (data) {
        _this5.hotelList = data;
        _this5.$apply();
        _wepy2.default.hideLoading();
        if (_this5.hotelList.length === 0) {
          wx.showToast({
            title: '暂无更多数据哦～',
            icon: 'none',
            duration: 1200
          });
        }
      });
    }
  }]);

  return SearchList;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(SearchList , 'pages/searchList'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaExpc3QuanMiXSwibmFtZXMiOlsiU2VhcmNoTGlzdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkaXNhYmxlU2Nyb2xsIiwiY29tcG9uZW50cyIsImRhdGEiLCJzY3JvbGxIZWlnaHQiLCJwYWdlTm8iLCJ0ZW1wT2JqIiwiaW5kZXgiLCJjaGVja2VkIiwiY2l0eUluZm8iLCJrZXl3b3JkIiwiZGF0ZVZhbHVlIiwicHJpY2UiLCJwcmljZUxhYmVsIiwic3RhciIsInN0YXJMYWJlbCIsInJlZ2lvbklkIiwiZGlzdGFuY2UiLCJiZWRUeXBlIiwiYnJlYWtmYXN0VHlwZSIsIm9yZGVyQnlUeXBlIiwic2hvd01vZGFsIiwic3Rhckxpc3QiLCJ2YWx1ZSIsImxhYmVsIiwicHJpY2VMaXN0IiwicG9zaXRpb25PcHRpb24iLCJvcHRpb25JbmRleCIsInR5cGVPcHRpb24iLCJ0eXBlSW5kZXgiLCJkaXN0YW5jZUxpc3QiLCJyZWdpb25MaXN0IiwiYmVkVHlwZUxpc3QiLCJicmVha2Zhc3RUeXBlTGlzdCIsIm9yZGVyQnlUeXBlTGlzdCIsImhvdGVsTGlzdCIsImhhc01vcmUiLCJjb21wdXRlZCIsImZvcm1hdERhdGUiLCJsZW5ndGgiLCJmb3JFYWNoIiwicHVzaCIsIkRhdGUiLCJpdGVtIiwidG9TdHJpbmciLCJtZXRob2RzIiwic2VhcmNoU3VibWl0IiwiZSIsImdldEhvdGVsSW5mbyIsInNjcm9sbHRvbG93ZXIiLCJ3ZXB5Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsInF1ZXJ5IiwiYm9va1N0YXJ0IiwiYm9va0VuZCIsImxvY2FsUG9pbnRMbmciLCJsbmciLCJsb2NhbFBvaW50TGF0IiwibGF0IiwibWluUHJpY2UiLCJtYXhQcmljZSIsImNpdHlJZCIsImlkIiwiY29uc29sZSIsImxvZyIsInRoZW4iLCJ3eCIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsIiRhcHBseSIsImhpZGVMb2FkaW5nIiwiaGFuZGxlSG90ZWwiLCJob3RlbElkIiwibmF2aWdhdGVUbyIsInVybCIsImhhbmRsZURpc3RhbmNlIiwiaGFuZGxlT3B0aW9uSW5kZXgiLCJoYW5kbGVUeXBlSW5kZXgiLCJoYW5kbGVCZWRUeXBlIiwiaGFuZGxlQnJlYWtmYXN0IiwiaGFuZGxlUmVnaW9uIiwiaGFuZGxlT3JkZXIiLCJoYW5kbGVUeXBlIiwidW5kZWZpbmVkIiwiaGlkZU1vZGFsIiwicHJldmVudFRvdWNoTW92ZSIsIndhcm4iLCJzZWFyY2hJbnB1dCIsImRldGFpbCIsImhhbmRsZVN0YXIiLCJfaW5kZXgiLCJmdWxsIiwiaGFuZGxlUmVzZXRTdGFyQW5kUHJpY2UiLCJoYW5kbGVSZXNldFBvc2l0aW9uIiwiaGFuZGxlUmVzZXRUeXBlIiwiaGFuZGxlUHJpY2UiLCJoYW5kbGVDb25maXJtc1Bvc2l0aW9uIiwiaGFuZGxlQ29uZmlybXNUeXBlIiwiaGFuZGxlQ29uZmlybXNTdGFyQW5kUHJpY2UiLCJwcmljZUFuZFN0YXJsYWJlbCIsImltZ0Vycm9yIiwiZXJyb3JJbWdJbmRleCIsInRhcmdldCIsImRhdGFzZXQiLCJlcnJvcmluZGV4IiwiaW1hZ2VVcmwiLCJvcHRpb24iLCJzcGxpdCIsIkpTT04iLCJwYXJzZSIsInBhcmVudElkIiwidW5zaGlmdCIsIm5hbWUiLCJzZXRQcmljZUFuZFN0YXIiLCJzdHJpbmdpZnkiLCJzdGFyQXJyIiwiX2l0ZW0iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOztBQU1BOzs7Ozs7Ozs7O0FBRzZCO0lBQ1JBLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVOQyxxQkFBYztBQUZSLEssUUFJVEMsVSxHQUFhLEUsUUFDYkMsSSxHQUFPO0FBQ0xDLG9CQUFjLENBRFQ7QUFFTEMsY0FBUSxDQUZIO0FBR0xDLGVBQVM7QUFDUEMsZUFBTyxJQURBO0FBRVBDLGlCQUFTO0FBRkYsT0FISjtBQU9MQyxnQkFBVSxFQVBMO0FBUUxDLGVBQVMsRUFSSjtBQVNMQyxp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Z0NBQWFpQyxLQUFiLEVBQW9CYSxJQUFwQixDQUF5QixnQkFBUTtBQUMvQixlQUFLL0IsU0FBTCxHQUFpQmhDLElBQWpCO0FBQ0EsZUFBS29FLE1BQUw7QUFDQXJCLHVCQUFLc0IsV0FBTDtBQUNBLFlBQUksT0FBS3JDLFNBQUwsQ0FBZUksTUFBZixLQUEwQixDQUE5QixFQUFpQztBQUMvQjRCLGFBQUdDLFNBQUgsQ0FBYTtBQUNYaEIsbUJBQU8sV0FESTtBQUVYaUIsa0JBQU0sTUFGSztBQUdYQyxzQkFBVTtBQUhDLFdBQWI7QUFLRDtBQUNGLE9BWEQ7QUFZRDs7OztFQTNpQnFDcEIsZUFBS3FFLEk7O2tCQUF4QnpILFUiLCJmaWxlIjoic2VhcmNoTGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xuICBpbXBvcnQge1xuICAgIGdldFN5c1dpZHRoLFxuICAgIGdldFN5c0hlaWdodCxcbiAgICBjaGFuZ2VQWFRvUlBYLFxuICAgIGNoYW5nZVJQWFRvUFhcbiAgfSBmcm9tICcuLi9saWIvd3gtc3lzdGVtLmpzJ1xuICBpbXBvcnQge1xuICAgIHF1ZXJ5UmVnaW9uc0J5UGFyZW50SWQsXG4gICAgZ2V0SG90ZWxMaXN0XG4gIH0gZnJvbSBcIi4uL3NlcnZlci9pbmRleC5qc1wiOyAvL+aOpeWPo1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWFyY2hMaXN0IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIuaQnOe0oumFkuW6l1wiLFxuICAgICAgIGRpc2FibGVTY3JvbGw6dHJ1ZVxuICAgIH07XG4gICAgY29tcG9uZW50cyA9IHt9O1xuICAgIGRhdGEgPSB7XG4gICAgICBzY3JvbGxIZWlnaHQ6IDAsXG4gICAgICBwYWdlTm86IDEsXG4gICAgICB0ZW1wT2JqOiB7XG4gICAgICAgIGluZGV4OiBudWxsLFxuICAgICAgICBjaGVja2VkOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIGNpdHlJbmZvOiB7fSxcbiAgICAgIGtleXdvcmQ6ICcnLFxuICAgICAgZGF0ZVZhbHVlOiBbXSxcbiAgICAgIHByaWNlOiBbXSxcbiAgICAgIHByaWNlTGFiZWw6IFwiXCIsXG4gICAgICBzdGFyOiBcIlwiLFxuICAgICAgc3RhckxhYmVsOiBcIlwiLFxuICAgICAgcmVnaW9uSWQ6IDAsXG4gICAgICBkaXN0YW5jZTogMCxcbiAgICAgIGJlZFR5cGU6IDAsXG4gICAgICBicmVha2Zhc3RUeXBlOiAwLFxuICAgICAgb3JkZXJCeVR5cGU6IDEsXG4gICAgICBzaG93TW9kYWw6IGZhbHNlLFxuICAgICAgc3Rhckxpc3Q6IFt7XG4gICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgbGFiZWw6IFwi5LiN6ZmQXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiAxLFxuICAgICAgICAgIGxhYmVsOiBcIue7j+a1ji/ov57plIFcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWU6IDIsXG4gICAgICAgICAgbGFiZWw6IFwi5LqM5pifL+WFtuS7llwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogMyxcbiAgICAgICAgICBsYWJlbDogXCLkuInmmJ8v6IiS6YCCXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiA0LFxuICAgICAgICAgIGxhYmVsOiBcIuWbm+aYny/pq5jmoaNcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWU6IDUsXG4gICAgICAgICAgbGFiZWw6IFwi5LqU5pifL+ixquWNjlwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBwcmljZUxpc3Q6IFt7XG4gICAgICAgICAgdmFsdWU6IFtcIlwiLCBcIlwiXSxcbiAgICAgICAgICBsYWJlbDogXCLkuI3pmZBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWU6IFtcIjBcIiwgXCIxMDBcIl0sXG4gICAgICAgICAgbGFiZWw6IFwiMC0xMDBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWU6IFtcIjEwMFwiLCBcIjE1MFwiXSxcbiAgICAgICAgICBsYWJlbDogXCIxMDAtMTUwXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiBbXCIxNTBcIiwgXCIzMDBcIl0sXG4gICAgICAgICAgbGFiZWw6IFwiMTUwLTMwMFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogW1wiMzAwXCIsIFwiNTAwXCJdLFxuICAgICAgICAgIGxhYmVsOiBcIjMwMC01MDBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWU6IFtcIjUwMFwiLCBcIjgwMFwiXSxcbiAgICAgICAgICBsYWJlbDogXCI1MDAtODAwXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiBbXCI5MDBcIiwgXCJcIl0sXG4gICAgICAgICAgbGFiZWw6IFwiOTAw5Lul5LiKXCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHBvc2l0aW9uT3B0aW9uOiBbXCLot53nprtcIiwgXCLooYzmlL/ljLpcIl0sXG4gICAgICBvcHRpb25JbmRleDogMCxcbiAgICAgIHR5cGVPcHRpb246IFtcIuW6iuWei1wiLCBcIuaXqemkkFwiXSxcbiAgICAgIHR5cGVJbmRleDogMCxcbiAgICAgIGRpc3RhbmNlTGlzdDogW3tcbiAgICAgICAgICBsYWJlbDogXCLkuI3pmZBcIixcbiAgICAgICAgICB2YWx1ZTogXCIwXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGxhYmVsOiBcIjUwMOexs1wiLFxuICAgICAgICAgIHZhbHVlOiBcIjUwMFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogXCIx5YWs6YeMXCIsXG4gICAgICAgICAgdmFsdWU6IFwiMTAwMFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogXCIy5YWs6YeMXCIsXG4gICAgICAgICAgdmFsdWU6IFwiMjAwMFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogXCIz5YWs6YeMXCIsXG4gICAgICAgICAgdmFsdWU6IFwiMzAwMFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogXCI15YWs6YeMXCIsXG4gICAgICAgICAgdmFsdWU6IFwiNTAwMFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogXCI35YWs6YeMXCIsXG4gICAgICAgICAgdmFsdWU6IFwiNzAwMFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogXCIxMOWFrOmHjFwiLFxuICAgICAgICAgIHZhbHVlOiBcIjEwMDAwXCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHJlZ2lvbkxpc3Q6IFtdLFxuICAgICAgYmVkVHlwZUxpc3Q6IFt7XG4gICAgICAgIGxhYmVsOiBcIuS4jemZkFwiLFxuICAgICAgICB2YWx1ZTogXCIwXCJcbiAgICAgIH0sIHtcbiAgICAgICAgbGFiZWw6IFwi5aSn5bqKXCIsXG4gICAgICAgIHZhbHVlOiBcIjFcIlxuICAgICAgfSwge1xuICAgICAgICBsYWJlbDogXCLlj4zluopcIixcbiAgICAgICAgdmFsdWU6IFwiMlwiXG4gICAgICB9LCB7XG4gICAgICAgIGxhYmVsOiBcIuWNleS6uuW6ilwiLFxuICAgICAgICB2YWx1ZTogXCIzXCJcbiAgICAgIH0sIHtcbiAgICAgICAgbGFiZWw6IFwi5aSa5byg5bqKXCIsXG4gICAgICAgIHZhbHVlOiBcIjRcIlxuICAgICAgfV0sXG4gICAgICBicmVha2Zhc3RUeXBlTGlzdDogW3tcbiAgICAgICAgbGFiZWw6IFwi5LiN6ZmQXCIsXG4gICAgICAgIHZhbHVlOiBcIjBcIlxuICAgICAgfSwge1xuICAgICAgICBsYWJlbDogXCLlkKvml6lcIixcbiAgICAgICAgdmFsdWU6IFwiMVwiXG4gICAgICB9LCB7XG4gICAgICAgIGxhYmVsOiBcIuWNleaXqVwiLFxuICAgICAgICB2YWx1ZTogXCIyXCJcbiAgICAgIH0sIHtcbiAgICAgICAgbGFiZWw6IFwi5Y+M5pepXCIsXG4gICAgICAgIHZhbHVlOiBcIjNcIlxuICAgICAgfV0sXG4gICAgICBvcmRlckJ5VHlwZUxpc3Q6IFt7XG4gICAgICAgIGxhYmVsOiBcIui3neemu+S8mOWFiFwiLFxuICAgICAgICB2YWx1ZTogXCIxXCJcbiAgICAgIH0sIHtcbiAgICAgICAgbGFiZWw6IFwi5aW96K+E5LyY5YWIXCIsXG4gICAgICAgIHZhbHVlOiBcIjJcIlxuICAgICAgfSwge1xuICAgICAgICBsYWJlbDogXCLkvY7ku7fkvJjlhYhcIixcbiAgICAgICAgdmFsdWU6IFwiM1wiXG4gICAgICB9LCB7XG4gICAgICAgIGxhYmVsOiBcIumrmOS7t+S8mOWFiFwiLFxuICAgICAgICB2YWx1ZTogXCI0XCJcbiAgICAgIH1dLFxuICAgICAgaG90ZWxMaXN0OiBbXSxcbiAgICAgIGhhc01vcmU6IHRydWVcbiAgICB9O1xuICAgIGNvbXB1dGVkID0ge1xuICAgICAgZm9ybWF0RGF0ZSgpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gW107XG4gICAgICAgIGlmICh0aGlzLmRhdGVWYWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdGhpcy5kYXRlVmFsdWUuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIHZhbHVlLnB1c2gobmV3IERhdGUoaXRlbSkudG9TdHJpbmcoXCJNTeaciGRk5pelXCIpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgLyoqXG4gICAgICAgKiDmkJzntKJcbiAgICAgICAqL1xuICAgICAgc2VhcmNoU3VibWl0KGUpIHtcbiAgICAgICAgdGhpcy5nZXRIb3RlbEluZm8oKVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog5LiL5ZWmXG4gICAgICAgKi9cbiAgICAgIHNjcm9sbHRvbG93ZXIoZSkge1xuICAgICAgICBpZiAodGhpcy5oYXNNb3JlKSB7XG4gICAgICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICB0aXRsZTogJ+WKoOi9veS4rS4uLidcbiAgICAgICAgICB9KVxuICAgICAgICAgIGxldCBxdWVyeSA9IHtcbiAgICAgICAgICAgIHBhZ2VObzogKyt0aGlzLnBhZ2VObyxcbiAgICAgICAgICAgIGtleXdvcmQ6IHRoaXMua2V5d29yZCxcbiAgICAgICAgICAgIGJvb2tTdGFydDogdGhpcy5kYXRlVmFsdWVbMF0gPyB0aGlzLmRhdGVWYWx1ZVswXSA6ICcnLFxuICAgICAgICAgICAgYm9va0VuZDogdGhpcy5kYXRlVmFsdWVbMV0gPyB0aGlzLmRhdGVWYWx1ZVsxXSA6ICcnLFxuICAgICAgICAgICAgbG9jYWxQb2ludExuZzogdGhpcy5jaXR5SW5mby5sbmcgfHwgJycsXG4gICAgICAgICAgICBsb2NhbFBvaW50TGF0OiB0aGlzLmNpdHlJbmZvLmxhdCB8fCAnJyxcbiAgICAgICAgICAgIG1pblByaWNlOiB0aGlzLnByaWNlWzBdID8gdGhpcy5wcmljZVswXSA6ICcnLFxuICAgICAgICAgICAgbWF4UHJpY2U6IHRoaXMucHJpY2VbMV0gPyB0aGlzLnByaWNlWzFdIDogJycsXG4gICAgICAgICAgICBzdGFyOiB0aGlzLnN0YXIsXG4gICAgICAgICAgICBkaXN0YW5jZTogdGhpcy5kaXN0YW5jZSxcbiAgICAgICAgICAgIGNpdHlJZDogdGhpcy5jaXR5SW5mby5pZCxcbiAgICAgICAgICAgIHJlZ2lvbklkOiB0aGlzLnJlZ2lvbklkLFxuICAgICAgICAgICAgYmVkVHlwZTogdGhpcy5iZWRUeXBlLFxuICAgICAgICAgICAgYnJlYWtmYXN0VHlwZTogdGhpcy5icmVha2Zhc3RUeXBlLFxuICAgICAgICAgICAgb3JkZXJCeVR5cGU6IHRoaXMub3JkZXJCeVR5cGVcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2cocXVlcnkpXG4gICAgICAgICAgZ2V0SG90ZWxMaXN0KHF1ZXJ5KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1xi5pqC5peg5pu05aSa5pWw5o2u5ZOm772eJyxcbiAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDEyMDBcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgdGhpcy5oYXNNb3JlID0gZmFsc2VcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGRhdGEuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGVsTGlzdC5wdXNoKGl0ZW0pXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aaguaXoOabtOWkmuaVsOaNruWTpu+9nicsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTIwMFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFuZGxlSG90ZWwoaW5kZXgpIHtcbiAgICAgICAgbGV0IGhvdGVsSWQgPSB0aGlzLmhvdGVsTGlzdFtpbmRleF0uaWRcbiAgICAgICAgd2VweS5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6ICcuL2hvdGVsRGV0YWlsP2hvdGVsSWQ9JyArIGhvdGVsSWQgKyAnJmRhdGVWYWx1ZT0nKyB0aGlzLmRhdGVWYWx1ZVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6YCJ5oup6Led56a7XG4gICAgICAgKi9cbiAgICAgIGhhbmRsZURpc3RhbmNlKGluZGV4KSB7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSB0aGlzLmRpc3RhbmNlTGlzdFtpbmRleF0udmFsdWVcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6YCJ5oup6Led56a7L+ihjOaUv+WMulxuICAgICAgICovXG4gICAgICBoYW5kbGVPcHRpb25JbmRleChpbmRleCkge1xuICAgICAgICB0aGlzLm9wdGlvbkluZGV4ID0gaW5kZXhcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6YCJ5oup5pep6aSQL+W6iuWei1xuICAgICAgICovXG4gICAgICBoYW5kbGVUeXBlSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgdGhpcy50eXBlSW5kZXggPSBpbmRleFxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDpgInmi6nluorlnotcbiAgICAgICAqL1xuICAgICAgaGFuZGxlQmVkVHlwZShpbmRleCkge1xuICAgICAgICB0aGlzLmJlZFR5cGUgPSB0aGlzLmJlZFR5cGVMaXN0W2luZGV4XS52YWx1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDpgInmi6nml6nppJBcbiAgICAgICAqL1xuICAgICAgaGFuZGxlQnJlYWtmYXN0KGluZGV4KSB7XG4gICAgICAgIHRoaXMuYnJlYWtmYXN0VHlwZSA9IHRoaXMuYnJlYWtmYXN0VHlwZUxpc3RbaW5kZXhdLnZhbHVlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOmAieaLqeihjOaUv+WMulxuICAgICAgICovXG4gICAgICBoYW5kbGVSZWdpb24oaW5kZXgpIHtcbiAgICAgICAgdGhpcy5yZWdpb25JZCA9IHRoaXMucmVnaW9uTGlzdFtpbmRleF0uaWRcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOmAieaLqeaOkuW6j1xuICAgICAgICovXG4gICAgICBoYW5kbGVPcmRlcihpbmRleCkge1xuICAgICAgICB0aGlzLm9yZGVyQnlUeXBlID0gdGhpcy5vcmRlckJ5VHlwZUxpc3RbaW5kZXhdLnZhbHVlXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMub3JkZXJCeVR5cGUpXG4gICAgICAgIHRoaXMudGVtcE9iaiA9IHt9O1xuICAgICAgICB0aGlzLnNob3dNb2RhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdldEhvdGVsSW5mbygpXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDpgInmi6nnsbvlnotcbiAgICAgICAqL1xuICAgICAgaGFuZGxlVHlwZShpbmRleCkge1xuICAgICAgICBpZiAodGhpcy50ZW1wT2JqLmluZGV4ID09IGluZGV4KSB7XG4gICAgICAgICAgdGhpcy50ZW1wT2JqLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIHRoaXMudGVtcE9iai5pbmRleCA9IHVuZGVmaW5lZFxuICAgICAgICAgIHRoaXMuc2hvd01vZGFsID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnRlbXBPYmouaW5kZXggPSBpbmRleFxuICAgICAgICAgIHRoaXMudGVtcE9iai5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuc2hvd01vZGFsID0gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDlhbPpl63mjqLlh7rmoYZcbiAgICAgICAqL1xuICAgICAgaGlkZU1vZGFsKCkge1xuICAgICAgICB0aGlzLnRlbXBPYmogPSB7fTtcbiAgICAgICAgdGhpcy5zaG93TW9kYWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICBwcmV2ZW50VG91Y2hNb3ZlKCkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJwcmV2ZW50VG91Y2hNb3Zl5pa55rOV5bey6Zi75q2i5YW25LuW5LqL5Lu244CCXCIpO1xuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog5pCc57SiXG4gICAgICAgKi9cbiAgICAgIHNlYXJjaElucHV0KGUpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICAgIHRoaXMua2V5d29yZCA9IHZhbHVlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOmAieaLqeaYn+e6p1xuICAgICAgICovXG4gICAgICBoYW5kbGVTdGFyKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgICAgdGhpcy5zdGFyTGlzdC5mb3JFYWNoKChpdGVtLCBfaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSBfaW5kZXgpIHtcbiAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3Rhckxpc3RbMF0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc3Rhckxpc3RbaW5kZXhdLmNoZWNrZWQgPSAhdGhpcy5zdGFyTGlzdFtpbmRleF0uY2hlY2tlZDtcbiAgICAgICAgICBsZXQgZnVsbCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5zdGFyTGlzdC5mb3JFYWNoKChpdGVtLCBfaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChfaW5kZXggPiAwICYmICFpdGVtLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgZnVsbCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChmdWxsKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJMaXN0LmZvckVhY2goKGl0ZW0sIF9pbmRleCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoX2luZGV4ID09IDApIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOmHjee9ruaYn+e6p+WSjOS7t+agvFxuICAgICAgICovXG4gICAgICBoYW5kbGVSZXNldFN0YXJBbmRQcmljZSgpIHtcbiAgICAgICAgdGhpcy5zdGFyTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wcmljZUxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3Rhckxpc3RbMF0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgdGhpcy5wcmljZUxpc3RbMF0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOmHjee9rui3neemu+ihjOaUv+WMulxuICAgICAgICovXG4gICAgICBoYW5kbGVSZXNldFBvc2l0aW9uKCkge1xuICAgICAgICB0aGlzLnJlZ2lvbklkID0gMFxuICAgICAgICB0aGlzLmRpc3RhbmNlID0gMFxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDph43nva7ml6nppJDluorlnotcbiAgICAgICAqL1xuICAgICAgaGFuZGxlUmVzZXRUeXBlKCkge1xuICAgICAgICB0aGlzLmJlZFR5cGUgPSAwXG4gICAgICAgIHRoaXMuYnJlYWtmYXN0VHlwZSA9IDBcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6YCJ5oup5Lu35qC8XG4gICAgICAgKi9cbiAgICAgIGhhbmRsZVByaWNlKGluZGV4KSB7XG4gICAgICAgIHRoaXMucHJpY2VMaXN0LmZvckVhY2goKGl0ZW0sIF9pbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChpbmRleCA9PSBfaW5kZXgpIHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDnoa7lrprkvY3nva5cbiAgICAgICAqL1xuICAgICAgaGFuZGxlQ29uZmlybXNQb3NpdGlvbigpIHtcbiAgICAgICAgdGhpcy50ZW1wT2JqID0ge307XG4gICAgICAgIHRoaXMuc2hvd01vZGFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2V0SG90ZWxJbmZvKClcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOehruWumuW6iuWei+WSjOaXqemkkFxuICAgICAgICovXG4gICAgICBoYW5kbGVDb25maXJtc1R5cGUoKSB7XG4gICAgICAgIHRoaXMudGVtcE9iaiA9IHt9O1xuICAgICAgICB0aGlzLnNob3dNb2RhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdldEhvdGVsSW5mbygpXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDnoa7lrprku7fmoLzlkozmmJ/nuqdcbiAgICAgICAqL1xuICAgICAgaGFuZGxlQ29uZmlybXNTdGFyQW5kUHJpY2UoKSB7XG4gICAgICAgIGxldCBwcmljZSA9IFwiXCI7XG4gICAgICAgIGxldCBwcmljZUxhYmVsID0gXCJcIjtcbiAgICAgICAgbGV0IHN0YXIgPSBcIlwiO1xuICAgICAgICBsZXQgc3RhckxhYmVsID0gXCJcIjtcbiAgICAgICAgdGhpcy5wcmljZUxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpZiAoaXRlbS5jaGVja2VkKSB7XG4gICAgICAgICAgICBwcmljZSA9IGl0ZW0udmFsdWU7XG4gICAgICAgICAgICBwcmljZUxhYmVsID0gaXRlbS5sYWJlbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN0YXJMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0uY2hlY2tlZCkge1xuICAgICAgICAgICAgc3RhciArPSBpdGVtLnZhbHVlICsgXCIsXCI7XG4gICAgICAgICAgICBzdGFyTGFiZWwgKz0gaXRlbS5sYWJlbCArIFwiIFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJpY2UgPSBwcmljZTtcbiAgICAgICAgdGhpcy5wcmljZUxhYmVsID0gcHJpY2VMYWJlbDtcbiAgICAgICAgdGhpcy5zdGFyID0gc3RhcjtcbiAgICAgICAgdGhpcy5zdGFyTGFiZWwgPSBzdGFyTGFiZWw7XG4gICAgICAgIGlmIChwcmljZSB8fCBzdGFyKSB7XG4gICAgICAgICAgdGhpcy5wcmljZUFuZFN0YXJsYWJlbCA9IHByaWNlTGFiZWwgKyBcIiBcIiArIHN0YXJMYWJlbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByaWNlQW5kU3RhcmxhYmVsID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRlbXBPYmogPSB7fTtcbiAgICAgICAgdGhpcy5zaG93TW9kYWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nZXRIb3RlbEluZm8oKVxuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIGltZ0Vycm9yKGUpIHtcbiAgICAgICAgbGV0IGVycm9ySW1nSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmVycm9yaW5kZXhcbiAgICAgICAgdGhpcy5ob3RlbExpc3RbZXJyb3JJbWdJbmRleF0uaW1hZ2VVcmwgPSAnLi4vaW1hZ2VzL2RlZmF1bHQtaG90ZWwtaW1nLnBuZydcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfVxuICAgIH07XG4gICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgdGhpcy5zY3JvbGxIZWlnaHQgPSBjaGFuZ2VQWFRvUlBYKGdldFN5c0hlaWdodCgpKSAtIDE3ODtcbiAgICAgIGlmIChvcHRpb24uZGF0ZVZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGF0ZVZhbHVlID0gb3B0aW9uLmRhdGVWYWx1ZS5zcGxpdChcIixcIik7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9uLnByaWNlICYmIG9wdGlvbi5wcmljZUxhYmVsKSB7XG4gICAgICAgIHRoaXMucHJpY2UgPSBvcHRpb24ucHJpY2Uuc3BsaXQoXCIsXCIpIHx8IFtdO1xuICAgICAgICB0aGlzLnByaWNlTGFiZWwgPSBvcHRpb24ucHJpY2VMYWJlbDtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb24uc3RhciAmJiBvcHRpb24uc3RhckxhYmVsKSB7XG4gICAgICAgIHRoaXMuc3RhciA9IG9wdGlvbi5zdGFyO1xuICAgICAgICB0aGlzLnN0YXJMYWJlbCA9IG9wdGlvbi5zdGFyTGFiZWw7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9uLmtleXdvcmQpIHtcbiAgICAgICAgdGhpcy5rZXl3b3JkID0gb3B0aW9uLmtleXdvcmRcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb24uY2l0eUluZm8pIHtcbiAgICAgICAgdGhpcy5jaXR5SW5mbyA9IEpTT04ucGFyc2Uob3B0aW9uLmNpdHlJbmZvKTtcbiAgICAgICAgcXVlcnlSZWdpb25zQnlQYXJlbnRJZCh7XG4gICAgICAgICAgcGFyZW50SWQ6IHRoaXMuY2l0eUluZm8uaWRcbiAgICAgICAgfSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICB0aGlzLnJlZ2lvbkxpc3QgPSBkYXRhO1xuICAgICAgICAgIHRoaXMucmVnaW9uTGlzdC51bnNoaWZ0KHtcbiAgICAgICAgICAgIG5hbWU6IFwi5LiN6ZmQXCIsXG4gICAgICAgICAgICBpZDogMFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXRQcmljZUFuZFN0YXIoKTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIG9uU2hvdygpIHt9XG4gICAgLy8g6K6+572u5pif57qn5ZKM5Lu35qC85Yid5aeL5YyWXG4gICAgc2V0UHJpY2VBbmRTdGFyKCkge1xuICAgICAgdGhpcy5wcmljZUxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHRoaXMucHJpY2UpID09IEpTT04uc3RyaW5naWZ5KGl0ZW0udmFsdWUpKSB7XG4gICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsZXQgc3RhckFyciA9IFtdO1xuICAgICAgaWYgKHRoaXMuc3RhckxhYmVsKSB7XG4gICAgICAgIHN0YXJBcnIgPSB0aGlzLnN0YXJMYWJlbC5zcGxpdChcIiBcIik7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YXJMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGxldCBjaGVja2VkID0gZmFsc2U7XG4gICAgICAgIGlmIChzdGFyQXJyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzdGFyQXJyLmZvckVhY2goX2l0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKF9pdGVtID09IGl0ZW0ubGFiZWwpIHtcbiAgICAgICAgICAgICAgY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBjaGVja2VkO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGNoZWNrZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5nZXRIb3RlbEluZm8oKVxuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgZ2V0SG90ZWxJbmZvKCkge1xuICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitLi4uJ1xuICAgICAgfSlcbiAgICAgIHRoaXMuaGFzTW9yZSA9IHRydWVcbiAgICAgIHRoaXMucGFnZU5vID0gMVxuICAgICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgICBwYWdlTm86IHRoaXMucGFnZU5vLFxuICAgICAgICBrZXl3b3JkOiB0aGlzLmtleXdvcmQsXG4gICAgICAgIGJvb2tTdGFydDogdGhpcy5kYXRlVmFsdWVbMF0gPyB0aGlzLmRhdGVWYWx1ZVswXSA6ICcnLFxuICAgICAgICBib29rRW5kOiB0aGlzLmRhdGVWYWx1ZVsxXSA/IHRoaXMuZGF0ZVZhbHVlWzFdIDogJycsXG4gICAgICAgIGxvY2FsUG9pbnRMbmc6IHRoaXMuY2l0eUluZm8ubG5nIHx8ICcnLFxuICAgICAgICBsb2NhbFBvaW50TGF0OiB0aGlzLmNpdHlJbmZvLmxhdCB8fCAnJyxcbiAgICAgICAgbWluUHJpY2U6IHRoaXMucHJpY2VbMF0gPyB0aGlzLnByaWNlWzBdIDogJycsXG4gICAgICAgIG1heFByaWNlOiB0aGlzLnByaWNlWzFdID8gdGhpcy5wcmljZVsxXSA6ICcnLFxuICAgICAgICBzdGFyOiB0aGlzLnN0YXIsXG4gICAgICAgIGRpc3RhbmNlOiB0aGlzLmRpc3RhbmNlLFxuICAgICAgICBjaXR5SWQ6IHRoaXMuY2l0eUluZm8uaWQsXG4gICAgICAgIHJlZ2lvbklkOiB0aGlzLnJlZ2lvbklkLFxuICAgICAgICBiZWRUeXBlOiB0aGlzLmJlZFR5cGUsXG4gICAgICAgIGJyZWFrZmFzdFR5cGU6IHRoaXMuYnJlYWtmYXN0VHlwZSxcbiAgICAgICAgb3JkZXJCeVR5cGU6IHRoaXMub3JkZXJCeVR5cGVcbiAgICAgIH1cbiAgICAgIGdldEhvdGVsTGlzdChxdWVyeSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgdGhpcy5ob3RlbExpc3QgPSBkYXRhXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmICh0aGlzLmhvdGVsTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICdcYuaaguaXoOabtOWkmuaVsOaNruWTpu+9nicsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTIwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=