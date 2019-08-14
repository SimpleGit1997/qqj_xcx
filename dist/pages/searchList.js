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
        if (this.cityInfo.id) {
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaExpc3QuanMiXSwibmFtZXMiOlsiU2VhcmNoTGlzdCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkaXNhYmxlU2Nyb2xsIiwiY29tcG9uZW50cyIsImRhdGEiLCJzY3JvbGxIZWlnaHQiLCJwYWdlTm8iLCJ0ZW1wT2JqIiwiaW5kZXgiLCJjaGVja2VkIiwiY2l0eUluZm8iLCJrZXl3b3JkIiwiZGF0ZVZhbHVlIiwicHJpY2UiLCJwcmljZUxhYmVsIiwic3RhciIsInN0YXJMYWJlbCIsInJlZ2lvbklkIiwiZGlzdGFuY2UiLCJiZWRUeXBlIiwiYnJlYWtmYXN0VHlwZSIsIm9yZGVyQnlUeXBlIiwic2hvd01vZGFsIiwic3Rhckxpc3QiLCJ2YWx1ZSIsImxhYmVsIiwicHJpY2VMaXN0IiwicG9zaXRpb25PcHRpb24iLCJvcHRpb25JbmRleCIsInR5cGVPcHRpb24iLCJ0eXBlSW5kZXgiLCJkaXN0YW5jZUxpc3QiLCJyZWdpb25MaXN0IiwiYmVkVHlwZUxpc3QiLCJicmVha2Zhc3RUeXBlTGlzdCIsIm9yZGVyQnlUeXBlTGlzdCIsImhvdGVsTGlzdCIsImhhc01vcmUiLCJjb21wdXRlZCIsImZvcm1hdERhdGUiLCJsZW5ndGgiLCJmb3JFYWNoIiwicHVzaCIsIkRhdGUiLCJpdGVtIiwidG9TdHJpbmciLCJtZXRob2RzIiwic2VhcmNoU3VibWl0IiwiZSIsImdldEhvdGVsSW5mbyIsInNjcm9sbHRvbG93ZXIiLCJ3ZXB5Iiwic2hvd0xvYWRpbmciLCJ0aXRsZSIsInF1ZXJ5IiwiYm9va1N0YXJ0IiwiYm9va0VuZCIsImxvY2FsUG9pbnRMbmciLCJsbmciLCJsb2NhbFBvaW50TGF0IiwibGF0IiwibWluUHJpY2UiLCJtYXhQcmljZSIsImNpdHlJZCIsImlkIiwiY29uc29sZSIsImxvZyIsInRoZW4iLCJ3eCIsInNob3dUb2FzdCIsImljb24iLCJkdXJhdGlvbiIsIiRhcHBseSIsImhpZGVMb2FkaW5nIiwiaGFuZGxlSG90ZWwiLCJob3RlbElkIiwibmF2aWdhdGVUbyIsInVybCIsImhhbmRsZURpc3RhbmNlIiwiaGFuZGxlT3B0aW9uSW5kZXgiLCJoYW5kbGVUeXBlSW5kZXgiLCJoYW5kbGVCZWRUeXBlIiwiaGFuZGxlQnJlYWtmYXN0IiwiaGFuZGxlUmVnaW9uIiwiaGFuZGxlT3JkZXIiLCJoYW5kbGVUeXBlIiwidW5kZWZpbmVkIiwiaGlkZU1vZGFsIiwicHJldmVudFRvdWNoTW92ZSIsIndhcm4iLCJzZWFyY2hJbnB1dCIsImRldGFpbCIsImhhbmRsZVN0YXIiLCJfaW5kZXgiLCJmdWxsIiwiaGFuZGxlUmVzZXRTdGFyQW5kUHJpY2UiLCJoYW5kbGVSZXNldFBvc2l0aW9uIiwiaGFuZGxlUmVzZXRUeXBlIiwiaGFuZGxlUHJpY2UiLCJoYW5kbGVDb25maXJtc1Bvc2l0aW9uIiwiaGFuZGxlQ29uZmlybXNUeXBlIiwiaGFuZGxlQ29uZmlybXNTdGFyQW5kUHJpY2UiLCJwcmljZUFuZFN0YXJsYWJlbCIsImltZ0Vycm9yIiwiZXJyb3JJbWdJbmRleCIsInRhcmdldCIsImRhdGFzZXQiLCJlcnJvcmluZGV4IiwiaW1hZ2VVcmwiLCJvcHRpb24iLCJzcGxpdCIsIkpTT04iLCJwYXJzZSIsInBhcmVudElkIiwidW5zaGlmdCIsIm5hbWUiLCJzZXRQcmljZUFuZFN0YXIiLCJzdHJpbmdpZnkiLCJzdGFyQXJyIiwiX2l0ZW0iLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOztBQU1BOzs7Ozs7Ozs7O0FBRzZCO0lBQ1JBLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyxxQkFBZTtBQUZSLEssUUFJVEMsVSxHQUFhLEUsUUFDYkMsSSxHQUFPO0FBQ0xDLG9CQUFjLENBRFQ7QUFFTEMsY0FBUSxDQUZIO0FBR0xDLGVBQVM7QUFDUEMsZUFBTyxJQURBO0FBRVBDLGlCQUFTO0FBRkYsT0FISjtBQU9MQyxnQkFBVSxFQVBMO0FBUUxDLGVBQVMsRUFSSjtBQVNMQyxp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LEtBQUtBLGFBZFY7QUFlVkMscUJBQWEsS0FBS0E7QUFmUixPQUFaO0FBaUJBLGdDQUFhaUMsS0FBYixFQUFvQmEsSUFBcEIsQ0FBeUIsZ0JBQVE7QUFDL0IsZUFBSy9CLFNBQUwsR0FBaUJoQyxJQUFqQjtBQUNBLGVBQUtvRSxNQUFMO0FBQ0FyQix1QkFBS3NCLFdBQUw7QUFDQSxZQUFJLE9BQUtyQyxTQUFMLENBQWVJLE1BQWYsS0FBMEIsQ0FBOUIsRUFBaUM7QUFDL0I0QixhQUFHQyxTQUFILENBQWE7QUFDWGhCLG1CQUFPLFdBREk7QUFFWGlCLGtCQUFNLE1BRks7QUFHWEMsc0JBQVU7QUFIQyxXQUFiO0FBS0Q7QUFDRixPQVhEO0FBWUQ7Ozs7RUE3aUJxQ3BCLGVBQUtxRSxJOztrQkFBeEJ6SCxVIiwiZmlsZSI6InNlYXJjaExpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcbiAgaW1wb3J0IHtcbiAgICBnZXRTeXNXaWR0aCxcbiAgICBnZXRTeXNIZWlnaHQsXG4gICAgY2hhbmdlUFhUb1JQWCxcbiAgICBjaGFuZ2VSUFhUb1BYXG4gIH0gZnJvbSAnLi4vbGliL3d4LXN5c3RlbS5qcydcbiAgaW1wb3J0IHtcbiAgICBxdWVyeVJlZ2lvbnNCeVBhcmVudElkLFxuICAgIGdldEhvdGVsTGlzdFxuICB9IGZyb20gXCIuLi9zZXJ2ZXIvaW5kZXguanNcIjsgLy/mjqXlj6NcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VhcmNoTGlzdCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLmkJzntKLphZLlupdcIixcbiAgICAgIGRpc2FibGVTY3JvbGw6IHRydWVcbiAgICB9O1xuICAgIGNvbXBvbmVudHMgPSB7fTtcbiAgICBkYXRhID0ge1xuICAgICAgc2Nyb2xsSGVpZ2h0OiAwLFxuICAgICAgcGFnZU5vOiAxLFxuICAgICAgdGVtcE9iajoge1xuICAgICAgICBpbmRleDogbnVsbCxcbiAgICAgICAgY2hlY2tlZDogZmFsc2VcbiAgICAgIH0sXG4gICAgICBjaXR5SW5mbzoge30sXG4gICAgICBrZXl3b3JkOiAnJyxcbiAgICAgIGRhdGVWYWx1ZTogW10sXG4gICAgICBwcmljZTogW10sXG4gICAgICBwcmljZUxhYmVsOiBcIlwiLFxuICAgICAgc3RhcjogXCJcIixcbiAgICAgIHN0YXJMYWJlbDogXCJcIixcbiAgICAgIHJlZ2lvbklkOiAwLFxuICAgICAgZGlzdGFuY2U6IDAsXG4gICAgICBiZWRUeXBlOiAwLFxuICAgICAgYnJlYWtmYXN0VHlwZTogMCxcbiAgICAgIG9yZGVyQnlUeXBlOiAxLFxuICAgICAgc2hvd01vZGFsOiBmYWxzZSxcbiAgICAgIHN0YXJMaXN0OiBbe1xuICAgICAgICAgIHZhbHVlOiAwLFxuICAgICAgICAgIGxhYmVsOiBcIuS4jemZkFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogMSxcbiAgICAgICAgICBsYWJlbDogXCLnu4/mtY4v6L+e6ZSBXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiAyLFxuICAgICAgICAgIGxhYmVsOiBcIuS6jOaYny/lhbbku5ZcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWU6IDMsXG4gICAgICAgICAgbGFiZWw6IFwi5LiJ5pifL+iIkumAglwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogNCxcbiAgICAgICAgICBsYWJlbDogXCLlm5vmmJ8v6auY5qGjXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiA1LFxuICAgICAgICAgIGxhYmVsOiBcIuS6lOaYny/osarljY5cIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgcHJpY2VMaXN0OiBbe1xuICAgICAgICAgIHZhbHVlOiBbXCJcIiwgXCJcIl0sXG4gICAgICAgICAgbGFiZWw6IFwi5LiN6ZmQXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiBbXCIwXCIsIFwiMTAwXCJdLFxuICAgICAgICAgIGxhYmVsOiBcIjAtMTAwXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiBbXCIxMDBcIiwgXCIxNTBcIl0sXG4gICAgICAgICAgbGFiZWw6IFwiMTAwLTE1MFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogW1wiMTUwXCIsIFwiMzAwXCJdLFxuICAgICAgICAgIGxhYmVsOiBcIjE1MC0zMDBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWU6IFtcIjMwMFwiLCBcIjUwMFwiXSxcbiAgICAgICAgICBsYWJlbDogXCIzMDAtNTAwXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiBbXCI1MDBcIiwgXCI4MDBcIl0sXG4gICAgICAgICAgbGFiZWw6IFwiNTAwLTgwMFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogW1wiOTAwXCIsIFwiXCJdLFxuICAgICAgICAgIGxhYmVsOiBcIjkwMOS7peS4ilwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBwb3NpdGlvbk9wdGlvbjogW1wi6Led56a7XCIsIFwi6KGM5pS/5Yy6XCJdLFxuICAgICAgb3B0aW9uSW5kZXg6IDAsXG4gICAgICB0eXBlT3B0aW9uOiBbXCLluorlnotcIiwgXCLml6nppJBcIl0sXG4gICAgICB0eXBlSW5kZXg6IDAsXG4gICAgICBkaXN0YW5jZUxpc3Q6IFt7XG4gICAgICAgICAgbGFiZWw6IFwi5LiN6ZmQXCIsXG4gICAgICAgICAgdmFsdWU6IFwiMFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBsYWJlbDogXCI1MDDnsbNcIixcbiAgICAgICAgICB2YWx1ZTogXCI1MDBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6IFwiMeWFrOmHjFwiLFxuICAgICAgICAgIHZhbHVlOiBcIjEwMDBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6IFwiMuWFrOmHjFwiLFxuICAgICAgICAgIHZhbHVlOiBcIjIwMDBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6IFwiM+WFrOmHjFwiLFxuICAgICAgICAgIHZhbHVlOiBcIjMwMDBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6IFwiNeWFrOmHjFwiLFxuICAgICAgICAgIHZhbHVlOiBcIjUwMDBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6IFwiN+WFrOmHjFwiLFxuICAgICAgICAgIHZhbHVlOiBcIjcwMDBcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbGFiZWw6IFwiMTDlhazph4xcIixcbiAgICAgICAgICB2YWx1ZTogXCIxMDAwMFwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICByZWdpb25MaXN0OiBbXSxcbiAgICAgIGJlZFR5cGVMaXN0OiBbe1xuICAgICAgICBsYWJlbDogXCLkuI3pmZBcIixcbiAgICAgICAgdmFsdWU6IFwiMFwiXG4gICAgICB9LCB7XG4gICAgICAgIGxhYmVsOiBcIuWkp+W6ilwiLFxuICAgICAgICB2YWx1ZTogXCIxXCJcbiAgICAgIH0sIHtcbiAgICAgICAgbGFiZWw6IFwi5Y+M5bqKXCIsXG4gICAgICAgIHZhbHVlOiBcIjJcIlxuICAgICAgfSwge1xuICAgICAgICBsYWJlbDogXCLljZXkurrluopcIixcbiAgICAgICAgdmFsdWU6IFwiM1wiXG4gICAgICB9LCB7XG4gICAgICAgIGxhYmVsOiBcIuWkmuW8oOW6ilwiLFxuICAgICAgICB2YWx1ZTogXCI0XCJcbiAgICAgIH1dLFxuICAgICAgYnJlYWtmYXN0VHlwZUxpc3Q6IFt7XG4gICAgICAgIGxhYmVsOiBcIuS4jemZkFwiLFxuICAgICAgICB2YWx1ZTogXCIwXCJcbiAgICAgIH0sIHtcbiAgICAgICAgbGFiZWw6IFwi5ZCr5pepXCIsXG4gICAgICAgIHZhbHVlOiBcIjFcIlxuICAgICAgfSwge1xuICAgICAgICBsYWJlbDogXCLljZXml6lcIixcbiAgICAgICAgdmFsdWU6IFwiMlwiXG4gICAgICB9LCB7XG4gICAgICAgIGxhYmVsOiBcIuWPjOaXqVwiLFxuICAgICAgICB2YWx1ZTogXCIzXCJcbiAgICAgIH1dLFxuICAgICAgb3JkZXJCeVR5cGVMaXN0OiBbe1xuICAgICAgICBsYWJlbDogXCLot53nprvkvJjlhYhcIixcbiAgICAgICAgdmFsdWU6IFwiMVwiXG4gICAgICB9LCB7XG4gICAgICAgIGxhYmVsOiBcIuWlveivhOS8mOWFiFwiLFxuICAgICAgICB2YWx1ZTogXCIyXCJcbiAgICAgIH0sIHtcbiAgICAgICAgbGFiZWw6IFwi5L2O5Lu35LyY5YWIXCIsXG4gICAgICAgIHZhbHVlOiBcIjNcIlxuICAgICAgfSwge1xuICAgICAgICBsYWJlbDogXCLpq5jku7fkvJjlhYhcIixcbiAgICAgICAgdmFsdWU6IFwiNFwiXG4gICAgICB9XSxcbiAgICAgIGhvdGVsTGlzdDogW10sXG4gICAgICBoYXNNb3JlOiB0cnVlXG4gICAgfTtcbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGZvcm1hdERhdGUoKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IFtdO1xuICAgICAgICBpZiAodGhpcy5kYXRlVmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB2YWx1ZS5wdXNoKG5ldyBEYXRlKGl0ZW0pLnRvU3RyaW5nKFwiTU3mnIhkZOaXpVwiKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8qKlxuICAgICAgICog5pCc57SiXG4gICAgICAgKi9cbiAgICAgIHNlYXJjaFN1Ym1pdChlKSB7XG4gICAgICAgIHRoaXMuZ2V0SG90ZWxJbmZvKClcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOS4i+WVplxuICAgICAgICovXG4gICAgICBzY3JvbGx0b2xvd2VyKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzTW9yZSkge1xuICAgICAgICAgIHdlcHkuc2hvd0xvYWRpbmcoe1xuICAgICAgICAgICAgdGl0bGU6ICfliqDovb3kuK0uLi4nXG4gICAgICAgICAgfSlcbiAgICAgICAgICBsZXQgcXVlcnkgPSB7XG4gICAgICAgICAgICBwYWdlTm86ICsrdGhpcy5wYWdlTm8sXG4gICAgICAgICAgICBrZXl3b3JkOiB0aGlzLmtleXdvcmQsXG4gICAgICAgICAgICBib29rU3RhcnQ6IHRoaXMuZGF0ZVZhbHVlWzBdID8gdGhpcy5kYXRlVmFsdWVbMF0gOiAnJyxcbiAgICAgICAgICAgIGJvb2tFbmQ6IHRoaXMuZGF0ZVZhbHVlWzFdID8gdGhpcy5kYXRlVmFsdWVbMV0gOiAnJyxcbiAgICAgICAgICAgIGxvY2FsUG9pbnRMbmc6IHRoaXMuY2l0eUluZm8ubG5nIHx8ICcnLFxuICAgICAgICAgICAgbG9jYWxQb2ludExhdDogdGhpcy5jaXR5SW5mby5sYXQgfHwgJycsXG4gICAgICAgICAgICBtaW5QcmljZTogdGhpcy5wcmljZVswXSA/IHRoaXMucHJpY2VbMF0gOiAnJyxcbiAgICAgICAgICAgIG1heFByaWNlOiB0aGlzLnByaWNlWzFdID8gdGhpcy5wcmljZVsxXSA6ICcnLFxuICAgICAgICAgICAgc3RhcjogdGhpcy5zdGFyLFxuICAgICAgICAgICAgZGlzdGFuY2U6IHRoaXMuZGlzdGFuY2UsXG4gICAgICAgICAgICBjaXR5SWQ6IHRoaXMuY2l0eUluZm8uaWQsXG4gICAgICAgICAgICByZWdpb25JZDogdGhpcy5yZWdpb25JZCxcbiAgICAgICAgICAgIGJlZFR5cGU6IHRoaXMuYmVkVHlwZSxcbiAgICAgICAgICAgIGJyZWFrZmFzdFR5cGU6IHRoaXMuYnJlYWtmYXN0VHlwZSxcbiAgICAgICAgICAgIG9yZGVyQnlUeXBlOiB0aGlzLm9yZGVyQnlUeXBlXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnNvbGUubG9nKHF1ZXJ5KVxuICAgICAgICAgIGdldEhvdGVsTGlzdChxdWVyeSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICdcYuaaguaXoOabtOWkmuaVsOaNruWTpu+9nicsXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMjAwXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHRoaXMuaGFzTW9yZSA9IGZhbHNlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBkYXRhLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RlbExpc3QucHVzaChpdGVtKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICAgIHdlcHkuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICfmmoLml6Dmm7TlpJrmlbDmja7lk6bvvZ4nLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEyMDBcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhbmRsZUhvdGVsKGluZGV4KSB7XG4gICAgICAgIGxldCBob3RlbElkID0gdGhpcy5ob3RlbExpc3RbaW5kZXhdLmlkXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9ob3RlbERldGFpbD9ob3RlbElkPScgKyBob3RlbElkICsgJyZkYXRlVmFsdWU9JyArIHRoaXMuZGF0ZVZhbHVlXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDpgInmi6not53nprtcbiAgICAgICAqL1xuICAgICAgaGFuZGxlRGlzdGFuY2UoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5kaXN0YW5jZSA9IHRoaXMuZGlzdGFuY2VMaXN0W2luZGV4XS52YWx1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDpgInmi6not53nprsv6KGM5pS/5Yy6XG4gICAgICAgKi9cbiAgICAgIGhhbmRsZU9wdGlvbkluZGV4KGluZGV4KSB7XG4gICAgICAgIHRoaXMub3B0aW9uSW5kZXggPSBpbmRleFxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDpgInmi6nml6nppJAv5bqK5Z6LXG4gICAgICAgKi9cbiAgICAgIGhhbmRsZVR5cGVJbmRleChpbmRleCkge1xuICAgICAgICB0aGlzLnR5cGVJbmRleCA9IGluZGV4XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOmAieaLqeW6iuWei1xuICAgICAgICovXG4gICAgICBoYW5kbGVCZWRUeXBlKGluZGV4KSB7XG4gICAgICAgIHRoaXMuYmVkVHlwZSA9IHRoaXMuYmVkVHlwZUxpc3RbaW5kZXhdLnZhbHVlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOmAieaLqeaXqemkkFxuICAgICAgICovXG4gICAgICBoYW5kbGVCcmVha2Zhc3QoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5icmVha2Zhc3RUeXBlID0gdGhpcy5icmVha2Zhc3RUeXBlTGlzdFtpbmRleF0udmFsdWVcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6YCJ5oup6KGM5pS/5Yy6XG4gICAgICAgKi9cbiAgICAgIGhhbmRsZVJlZ2lvbihpbmRleCkge1xuICAgICAgICB0aGlzLnJlZ2lvbklkID0gdGhpcy5yZWdpb25MaXN0W2luZGV4XS5pZFxuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6YCJ5oup5o6S5bqPXG4gICAgICAgKi9cbiAgICAgIGhhbmRsZU9yZGVyKGluZGV4KSB7XG4gICAgICAgIHRoaXMub3JkZXJCeVR5cGUgPSB0aGlzLm9yZGVyQnlUeXBlTGlzdFtpbmRleF0udmFsdWVcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5vcmRlckJ5VHlwZSlcbiAgICAgICAgdGhpcy50ZW1wT2JqID0ge307XG4gICAgICAgIHRoaXMuc2hvd01vZGFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2V0SG90ZWxJbmZvKClcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOmAieaLqeexu+Wei1xuICAgICAgICovXG4gICAgICBoYW5kbGVUeXBlKGluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLnRlbXBPYmouaW5kZXggPT0gaW5kZXgpIHtcbiAgICAgICAgICB0aGlzLnRlbXBPYmouY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy50ZW1wT2JqLmluZGV4ID0gdW5kZWZpbmVkXG4gICAgICAgICAgdGhpcy5zaG93TW9kYWwgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudGVtcE9iai5pbmRleCA9IGluZGV4XG4gICAgICAgICAgdGhpcy50ZW1wT2JqLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgdGhpcy5zaG93TW9kYWwgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOWFs+mXreaOouWHuuahhlxuICAgICAgICovXG4gICAgICBoaWRlTW9kYWwoKSB7XG4gICAgICAgIHRoaXMudGVtcE9iaiA9IHt9O1xuICAgICAgICB0aGlzLnNob3dNb2RhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIHByZXZlbnRUb3VjaE1vdmUoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcInByZXZlbnRUb3VjaE1vdmXmlrnms5Xlt7LpmLvmraLlhbbku5bkuovku7bjgIJcIik7XG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDmkJzntKJcbiAgICAgICAqL1xuICAgICAgc2VhcmNoSW5wdXQoZSkge1xuICAgICAgICBsZXQgdmFsdWUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgICAgdGhpcy5rZXl3b3JkID0gdmFsdWVcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6YCJ5oup5pif57qnXG4gICAgICAgKi9cbiAgICAgIGhhbmRsZVN0YXIoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4ID09IDApIHtcbiAgICAgICAgICB0aGlzLnN0YXJMaXN0LmZvckVhY2goKGl0ZW0sIF9pbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09IF9pbmRleCkge1xuICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zdGFyTGlzdFswXS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zdGFyTGlzdFtpbmRleF0uY2hlY2tlZCA9ICF0aGlzLnN0YXJMaXN0W2luZGV4XS5jaGVja2VkO1xuICAgICAgICAgIGxldCBmdWxsID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnN0YXJMaXN0LmZvckVhY2goKGl0ZW0sIF9pbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKF9pbmRleCA+IDAgJiYgIWl0ZW0uY2hlY2tlZCkge1xuICAgICAgICAgICAgICBmdWxsID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGZ1bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc3Rhckxpc3QuZm9yRWFjaCgoaXRlbSwgX2luZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChfaW5kZXggPT0gMCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6YeN572u5pif57qn5ZKM5Lu35qC8XG4gICAgICAgKi9cbiAgICAgIGhhbmRsZVJlc2V0U3RhckFuZFByaWNlKCkge1xuICAgICAgICB0aGlzLnN0YXJMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnByaWNlTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zdGFyTGlzdFswXS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICB0aGlzLnByaWNlTGlzdFswXS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog6YeN572u6Led56a76KGM5pS/5Yy6XG4gICAgICAgKi9cbiAgICAgIGhhbmRsZVJlc2V0UG9zaXRpb24oKSB7XG4gICAgICAgIHRoaXMucmVnaW9uSWQgPSAwXG4gICAgICAgIHRoaXMuZGlzdGFuY2UgPSAwXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOmHjee9ruaXqemkkOW6iuWei1xuICAgICAgICovXG4gICAgICBoYW5kbGVSZXNldFR5cGUoKSB7XG4gICAgICAgIHRoaXMuYmVkVHlwZSA9IDBcbiAgICAgICAgdGhpcy5icmVha2Zhc3RUeXBlID0gMFxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiDpgInmi6nku7fmoLxcbiAgICAgICAqL1xuICAgICAgaGFuZGxlUHJpY2UoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcmljZUxpc3QuZm9yRWFjaCgoaXRlbSwgX2luZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGluZGV4ID09IF9pbmRleCkge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOehruWumuS9jee9rlxuICAgICAgICovXG4gICAgICBoYW5kbGVDb25maXJtc1Bvc2l0aW9uKCkge1xuICAgICAgICB0aGlzLnRlbXBPYmogPSB7fTtcbiAgICAgICAgdGhpcy5zaG93TW9kYWwgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nZXRIb3RlbEluZm8oKVxuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICog56Gu5a6a5bqK5Z6L5ZKM5pep6aSQXG4gICAgICAgKi9cbiAgICAgIGhhbmRsZUNvbmZpcm1zVHlwZSgpIHtcbiAgICAgICAgdGhpcy50ZW1wT2JqID0ge307XG4gICAgICAgIHRoaXMuc2hvd01vZGFsID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2V0SG90ZWxJbmZvKClcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIOehruWumuS7t+agvOWSjOaYn+e6p1xuICAgICAgICovXG4gICAgICBoYW5kbGVDb25maXJtc1N0YXJBbmRQcmljZSgpIHtcbiAgICAgICAgbGV0IHByaWNlID0gXCJcIjtcbiAgICAgICAgbGV0IHByaWNlTGFiZWwgPSBcIlwiO1xuICAgICAgICBsZXQgc3RhciA9IFwiXCI7XG4gICAgICAgIGxldCBzdGFyTGFiZWwgPSBcIlwiO1xuICAgICAgICB0aGlzLnByaWNlTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChpdGVtLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHByaWNlID0gaXRlbS52YWx1ZTtcbiAgICAgICAgICAgIHByaWNlTGFiZWwgPSBpdGVtLmxhYmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3Rhckxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpZiAoaXRlbS5jaGVja2VkKSB7XG4gICAgICAgICAgICBzdGFyICs9IGl0ZW0udmFsdWUgKyBcIixcIjtcbiAgICAgICAgICAgIHN0YXJMYWJlbCArPSBpdGVtLmxhYmVsICsgXCIgXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wcmljZSA9IHByaWNlO1xuICAgICAgICB0aGlzLnByaWNlTGFiZWwgPSBwcmljZUxhYmVsO1xuICAgICAgICB0aGlzLnN0YXIgPSBzdGFyO1xuICAgICAgICB0aGlzLnN0YXJMYWJlbCA9IHN0YXJMYWJlbDtcbiAgICAgICAgaWYgKHByaWNlIHx8IHN0YXIpIHtcbiAgICAgICAgICB0aGlzLnByaWNlQW5kU3RhcmxhYmVsID0gcHJpY2VMYWJlbCArIFwiIFwiICsgc3RhckxhYmVsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJpY2VBbmRTdGFybGFiZWwgPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGVtcE9iaiA9IHt9O1xuICAgICAgICB0aGlzLnNob3dNb2RhbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdldEhvdGVsSW5mbygpXG4gICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICB9LFxuICAgICAgaW1nRXJyb3IoZSkge1xuICAgICAgICBsZXQgZXJyb3JJbWdJbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuZXJyb3JpbmRleFxuICAgICAgICB0aGlzLmhvdGVsTGlzdFtlcnJvckltZ0luZGV4XS5pbWFnZVVybCA9ICcuLi9pbWFnZXMvZGVmYXVsdC1ob3RlbC1pbWcucG5nJ1xuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfTtcbiAgICBvbkxvYWQob3B0aW9uKSB7XG4gICAgICB0aGlzLnNjcm9sbEhlaWdodCA9IGNoYW5nZVBYVG9SUFgoZ2V0U3lzSGVpZ2h0KCkpIC0gMTc4O1xuICAgICAgaWYgKG9wdGlvbi5kYXRlVmFsdWUpIHtcbiAgICAgICAgdGhpcy5kYXRlVmFsdWUgPSBvcHRpb24uZGF0ZVZhbHVlLnNwbGl0KFwiLFwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb24ucHJpY2UgJiYgb3B0aW9uLnByaWNlTGFiZWwpIHtcbiAgICAgICAgdGhpcy5wcmljZSA9IG9wdGlvbi5wcmljZS5zcGxpdChcIixcIikgfHwgW107XG4gICAgICAgIHRoaXMucHJpY2VMYWJlbCA9IG9wdGlvbi5wcmljZUxhYmVsO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbi5zdGFyICYmIG9wdGlvbi5zdGFyTGFiZWwpIHtcbiAgICAgICAgdGhpcy5zdGFyID0gb3B0aW9uLnN0YXI7XG4gICAgICAgIHRoaXMuc3RhckxhYmVsID0gb3B0aW9uLnN0YXJMYWJlbDtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb24ua2V5d29yZCkge1xuICAgICAgICB0aGlzLmtleXdvcmQgPSBvcHRpb24ua2V5d29yZFxuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbi5jaXR5SW5mbykge1xuICAgICAgICB0aGlzLmNpdHlJbmZvID0gSlNPTi5wYXJzZShvcHRpb24uY2l0eUluZm8pO1xuICAgICAgICBpZiAodGhpcy5jaXR5SW5mby5pZCkge1xuICAgICAgICAgIHF1ZXJ5UmVnaW9uc0J5UGFyZW50SWQoe1xuICAgICAgICAgICAgcGFyZW50SWQ6IHRoaXMuY2l0eUluZm8uaWRcbiAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWdpb25MaXN0ID0gZGF0YTtcbiAgICAgICAgICAgIHRoaXMucmVnaW9uTGlzdC51bnNoaWZ0KHtcbiAgICAgICAgICAgICAgbmFtZTogXCLkuI3pmZBcIixcbiAgICAgICAgICAgICAgaWQ6IDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5zZXRQcmljZUFuZFN0YXIoKTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIG9uU2hvdygpIHt9XG4gICAgLy8g6K6+572u5pif57qn5ZKM5Lu35qC85Yid5aeL5YyWXG4gICAgc2V0UHJpY2VBbmRTdGFyKCkge1xuICAgICAgdGhpcy5wcmljZUxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHRoaXMucHJpY2UpID09IEpTT04uc3RyaW5naWZ5KGl0ZW0udmFsdWUpKSB7XG4gICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsZXQgc3RhckFyciA9IFtdO1xuICAgICAgaWYgKHRoaXMuc3RhckxhYmVsKSB7XG4gICAgICAgIHN0YXJBcnIgPSB0aGlzLnN0YXJMYWJlbC5zcGxpdChcIiBcIik7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YXJMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGxldCBjaGVja2VkID0gZmFsc2U7XG4gICAgICAgIGlmIChzdGFyQXJyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzdGFyQXJyLmZvckVhY2goX2l0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKF9pdGVtID09IGl0ZW0ubGFiZWwpIHtcbiAgICAgICAgICAgICAgY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBjaGVja2VkO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGNoZWNrZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5nZXRIb3RlbEluZm8oKVxuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgZ2V0SG90ZWxJbmZvKCkge1xuICAgICAgd2VweS5zaG93TG9hZGluZyh7XG4gICAgICAgIHRpdGxlOiAn5Yqg6L295LitLi4uJ1xuICAgICAgfSlcbiAgICAgIHRoaXMuaGFzTW9yZSA9IHRydWVcbiAgICAgIHRoaXMucGFnZU5vID0gMVxuICAgICAgbGV0IHF1ZXJ5ID0ge1xuICAgICAgICBwYWdlTm86IHRoaXMucGFnZU5vLFxuICAgICAgICBrZXl3b3JkOiB0aGlzLmtleXdvcmQsXG4gICAgICAgIGJvb2tTdGFydDogdGhpcy5kYXRlVmFsdWVbMF0gPyB0aGlzLmRhdGVWYWx1ZVswXSA6ICcnLFxuICAgICAgICBib29rRW5kOiB0aGlzLmRhdGVWYWx1ZVsxXSA/IHRoaXMuZGF0ZVZhbHVlWzFdIDogJycsXG4gICAgICAgIGxvY2FsUG9pbnRMbmc6IHRoaXMuY2l0eUluZm8ubG5nIHx8ICcnLFxuICAgICAgICBsb2NhbFBvaW50TGF0OiB0aGlzLmNpdHlJbmZvLmxhdCB8fCAnJyxcbiAgICAgICAgbWluUHJpY2U6IHRoaXMucHJpY2VbMF0gPyB0aGlzLnByaWNlWzBdIDogJycsXG4gICAgICAgIG1heFByaWNlOiB0aGlzLnByaWNlWzFdID8gdGhpcy5wcmljZVsxXSA6ICcnLFxuICAgICAgICBzdGFyOiB0aGlzLnN0YXIsXG4gICAgICAgIGRpc3RhbmNlOiB0aGlzLmRpc3RhbmNlLFxuICAgICAgICBjaXR5SWQ6IHRoaXMuY2l0eUluZm8uaWQsXG4gICAgICAgIHJlZ2lvbklkOiB0aGlzLnJlZ2lvbklkLFxuICAgICAgICBiZWRUeXBlOiB0aGlzLmJlZFR5cGUsXG4gICAgICAgIGJyZWFrZmFzdFR5cGU6IHRoaXMuYnJlYWtmYXN0VHlwZSxcbiAgICAgICAgb3JkZXJCeVR5cGU6IHRoaXMub3JkZXJCeVR5cGVcbiAgICAgIH1cbiAgICAgIGdldEhvdGVsTGlzdChxdWVyeSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgdGhpcy5ob3RlbExpc3QgPSBkYXRhXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgIGlmICh0aGlzLmhvdGVsTGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICdcYuaaguaXoOabtOWkmuaVsOaNruWTpu+9nicsXG4gICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTIwMFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG4iXX0=