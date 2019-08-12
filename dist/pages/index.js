"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wxSystem = require('./../lib/wx-system.js');

var _index2 = require('./../server/index.js');

var _utils = require('./../lib/utils.js');

var _index3 = require('./../components/popup/index.js');

var _index4 = _interopRequireDefault(_index3);

var _index5 = require('./../components/datepicker/index.js');

var _index6 = _interopRequireDefault(_index5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QQMapWX = require('./../lib/qqmap-wx-jssdk.js');
var qqmapsdk;

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: "首页",
      // enablePullDownRefresh: true,
      navigationStyle: "custom"
    }, _this.$repeat = {}, _this.$props = { "priceandstarpopup": { "size": "750", "duration": "400", "type": "bottom", "v-bind:showModal.sync": "priceAndStarModalDialog" }, "datepopup": { "size": "750", "duration": "400", "type": "bottom", "xmlns:v-bind": "", "v-bind:showModal.sync": "dateModalDialog", "xmlns:v-on": "" }, "datepicker": { "months": "4", "v-bind:value.sync": "_dateValue" } }, _this.$events = { "datepopup": { "v-on:hideModal": "hideDateDialog" }, "datepicker": { "v-on:closeDialog": "closeDateDialog" } }, _this.components = {
      priceandstarpopup: _index4.default,
      datepopup: _index4.default,
      datepicker: _index6.default
    }, _this.data = {
      cityInfo: {
        id: 164132,
        name: '上海市',
        pinyin: 'shanghai',
        acronym: 'sh',
        rank: 'S',
        firstChar: 'S',
        lat: '31.230416',
        lng: '121.473701'
      },
      dateValue: [],
      _dateValue: [],
      keyword: '',
      dateModalDialog: false,
      priceAndStarModalDialog: false,
      starList: [{
        value: 0,
        label: '不限'
      }, {
        value: 1,
        label: '经济/连锁'
      }, {
        value: 2,
        label: '二星/其他'
      }, {
        value: 3,
        label: '三星/舒适'
      }, {
        value: 4,
        label: '四星/高档'
      }, {
        value: 5,
        label: '五星/豪华'
      }],
      priceList: [{
        value: ['', ''],
        label: '不限'
      }, {
        value: ["0", "100"],
        label: '0-100'
      }, {
        value: ["100", "150"],
        label: '100-150'
      }, {
        value: ["150", "300"],
        label: '150-300'
      }, {
        value: ["300", "500"],
        label: '300-500'
      }, {
        value: ["500", "800"],
        label: '500-800'
      }, {
        value: ["900", ''],
        label: '900以上'
      }],
      priceAndStarlabel: '不限 不限',
      price: ['', ''],
      priceLabel: '不限',
      star: '0,',
      starLabel: '不限'
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
    }, _this.watch = {}, _this.methods = {
      handleCity: function handleCity() {
        _wepy2.default.navigateTo({
          url: './city'
        });
      },
      changeDate: function changeDate() {
        this._dateValue = this.dateValue;
        this.dateModalDialog = true;
        this.$apply();
      },
      keywordInput: function keywordInput(e) {
        var value = e.detail.value;
        this.keyword = value;
        this.$apply();
      },
      showModal: function showModal() {
        var _this2 = this;

        this.priceAndStarModalDialog = true;
        this.priceList.forEach(function (item) {
          if (JSON.stringify(_this2.price) == JSON.stringify(item.value)) {
            item.checked = true;
          } else {
            item.checked = false;
          }
        });
        var starArr = [];
        if (this.starLabel) {
          starArr = this.starLabel.split(' ');
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
        this.$apply();
      },
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
      handleReset: function handleReset() {
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
      handleConfirms: function handleConfirms() {
        var price = '';
        var priceLabel = '';
        var star = '';
        var starLabel = '';
        this.priceList.forEach(function (item) {
          if (item.checked) {
            price = item.value;
            priceLabel = item.label;
          }
        });
        this.starList.forEach(function (item) {
          if (item.checked) {
            star += item.value + ',';
            starLabel += item.label + ' ';
          }
        });
        this.price = price;
        this.priceLabel = priceLabel;
        this.star = star;
        this.starLabel = starLabel;
        if (price || star) {
          this.priceAndStarlabel = priceLabel + ' ' + starLabel;
        } else {
          this.priceAndStarlabel = '';
        }
        this.priceAndStarModalDialog = false;
        this.$apply();
      },
      hideDateDialog: function hideDateDialog() {
        if (this._dateValue.length == 2) {
          this.dateValue = this._dateValue;
          this.$apply();
        }
      },
      closeDateDialog: function closeDateDialog(value) {
        console.log(value);
        if (value.length == 2) {
          this.dateValue = value;
          this.dateModalDialog = false;
          this.$apply();
        }
      },
      handleToSearch: function handleToSearch() {
        var cityObj = JSON.stringify(this.cityInfo);
        var dateValue = this.dateValue;
        var keyword = this.keyword;
        var star = this.star;
        var starLabel = this.starLabel;
        var price = this.price;
        var priceLabel = this.priceLabel;
        _wepy2.default.navigateTo({
          url: './searchList?cityInfo=' + cityObj + '&dateValue=' + dateValue + '&keyword=' + keyword + '&star=' + star + '&starLabel=' + starLabel + '&price=' + price + '&priceLabel=' + priceLabel
        });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: "onLoad",
    value: function onLoad() {
      var _this3 = this;

      var that = this;
      // 实例化API核心类
      qqmapsdk = new QQMapWX({
        key: '6EBBZ-IUDCK-2THJQ-AYT5B-C7MR7-JJFG7'
      });
      _wepy2.default.getLocation({
        type: 'wgs84'
      }).then(function (res) {
        _this3.cityInfo.lng = res.longitude;
        _this3.cityInfo.lat = res.latitude;
        _wepy2.default.setStorageSync('cityInfo', _this3.cityInfo);
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function success(res) {
            that.cityInfo.name = res.result.ad_info.city;
            that.$apply();
          }
        });
      }).catch(function (err) {
        console.log('尚未授权地理位置！');
      });
      var todayFormat = Date.today().toString("yyyy-MM-dd");
      var tomorrowFormat = Date.today().addDays(1).toString("yyyy-MM-dd");
      this.dateValue.push(todayFormat, tomorrowFormat);
      this._dateValue = this.dateValue;
      this.$apply();
    }
  }, {
    key: "onShow",
    value: function onShow() {
      var cityInfo = _wepy2.default.getStorageSync('cityInfo') || null;
      if (cityInfo) {
        this.cityInfo = cityInfo;
        this.$apply();
      }
    }
  }, {
    key: "onHide",
    value: function onHide() {}
  }, {
    key: "onUnload",
    value: function onUnload() {}
    // 下拉刷新事件

  }, {
    key: "onPullDownRefresh",
    value: function onPullDownRefresh() {
      _wepy2.default.showNavigationBarLoading();
      _wepy2.default.stopPullDownRefresh();
      _wepy2.default.hideNavigationBarLoading();
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlFRTWFwV1giLCJyZXF1aXJlIiwicXFtYXBzZGsiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uU3R5bGUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwcmljZWFuZHN0YXJwb3B1cCIsInBvcHVwIiwiZGF0ZXBvcHVwIiwiZGF0ZXBpY2tlciIsImRhdGEiLCJjaXR5SW5mbyIsImlkIiwibmFtZSIsInBpbnlpbiIsImFjcm9ueW0iLCJyYW5rIiwiZmlyc3RDaGFyIiwibGF0IiwibG5nIiwiZGF0ZVZhbHVlIiwiX2RhdGVWYWx1ZSIsImtleXdvcmQiLCJkYXRlTW9kYWxEaWFsb2ciLCJwcmljZUFuZFN0YXJNb2RhbERpYWxvZyIsInN0YXJMaXN0IiwidmFsdWUiLCJsYWJlbCIsInByaWNlTGlzdCIsInByaWNlQW5kU3RhcmxhYmVsIiwicHJpY2UiLCJwcmljZUxhYmVsIiwic3RhciIsInN0YXJMYWJlbCIsImNvbXB1dGVkIiwiZm9ybWF0RGF0ZSIsImxlbmd0aCIsImZvckVhY2giLCJwdXNoIiwiRGF0ZSIsIml0ZW0iLCJ0b1N0cmluZyIsImdldERheXMiLCJkYXlzIiwiZmlyc3QiLCJyZXBsYWNlIiwidmFsdWVPZiIsInNlY29uZCIsInRpbWUiLCJnZXREZXNjcmliZSIsImRlc2NyaWJlIiwiY3VycmVudERhdGUiLCJjdXJyZW50U3RhbXAiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsIndhdGNoIiwibWV0aG9kcyIsImhhbmRsZUNpdHkiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsImNoYW5nZURhdGUiLCIkYXBwbHkiLCJrZXl3b3JkSW5wdXQiLCJlIiwiZGV0YWlsIiwic2hvd01vZGFsIiwiSlNPTiIsInN0cmluZ2lmeSIsImNoZWNrZWQiLCJzdGFyQXJyIiwic3BsaXQiLCJfaXRlbSIsImhhbmRsZVByaWNlIiwiaW5kZXgiLCJfaW5kZXgiLCJoYW5kbGVTdGFyIiwiZnVsbCIsImhhbmRsZVJlc2V0IiwiaGFuZGxlQ29uZmlybXMiLCJoaWRlRGF0ZURpYWxvZyIsImNsb3NlRGF0ZURpYWxvZyIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVUb1NlYXJjaCIsImNpdHlPYmoiLCJ0aGF0Iiwia2V5IiwiZ2V0TG9jYXRpb24iLCJ0eXBlIiwidGhlbiIsInJlcyIsImxvbmdpdHVkZSIsImxhdGl0dWRlIiwic2V0U3RvcmFnZVN5bmMiLCJyZXZlcnNlR2VvY29kZXIiLCJsb2NhdGlvbiIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJhZF9pbmZvIiwiY2l0eSIsImNhdGNoIiwidG9kYXlGb3JtYXQiLCJ0b2RheSIsInRvbW9ycm93Rm9ybWF0IiwiYWRkRGF5cyIsImdldFN0b3JhZ2VTeW5jIiwic2hvd05hdmlnYXRpb25CYXJMb2FkaW5nIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7O0FBR0E7O0FBR0E7O0FBR0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsVUFBVUMsUUFBUSwwQkFBUixDQUFkO0FBQ0EsSUFBSUMsUUFBSjs7SUFDcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQO0FBQ0FDLHVCQUFpQjtBQUhWLEssUUFLVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMscUJBQW9CLEVBQUMsUUFBTyxLQUFSLEVBQWMsWUFBVyxLQUF6QixFQUErQixRQUFPLFFBQXRDLEVBQStDLHlCQUF3Qix5QkFBdkUsRUFBckIsRUFBdUgsYUFBWSxFQUFDLFFBQU8sS0FBUixFQUFjLFlBQVcsS0FBekIsRUFBK0IsUUFBTyxRQUF0QyxFQUErQyxnQkFBZSxFQUE5RCxFQUFpRSx5QkFBd0IsaUJBQXpGLEVBQTJHLGNBQWEsRUFBeEgsRUFBbkksRUFBK1As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LFFBQWhCO0FBQ0EsYUFBS29ELE1BQUw7QUFDRDtBQUNGOzs7NkJBd0pRLENBQUU7OzsrQkFDQSxDQUFFO0FBQ2I7Ozs7d0NBQ29CO0FBQ2xCSixxQkFBS2lELHdCQUFMO0FBQ0FqRCxxQkFBS2tELG1CQUFMO0FBQ0FsRCxxQkFBS21ELHdCQUFMO0FBQ0Q7Ozs7RUFwVmdDbkQsZUFBS29ELEk7O2tCQUFuQmpILEsiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSBcIndlcHlcIjtcbiAgaW1wb3J0IHtcbiAgICBjaGFuZ2VQWFRvUlBYXG4gIH0gZnJvbSBcIkAvbGliL3d4LXN5c3RlbS5qc1wiO1xuICBpbXBvcnQge1xuICAgIGZpbmRSZWdpb25zXG4gIH0gZnJvbSBcIi4uL3NlcnZlci9pbmRleC5qc1wiO1xuICBpbXBvcnQge1xuICAgIGNhbGN1bGF0ZURpZmZUaW1lLFxuICB9IGZyb20gXCIuLi9saWIvdXRpbHMuanNcIjtcbiAgaW1wb3J0IHBvcHVwIGZyb20gJy4uL2NvbXBvbmVudHMvcG9wdXAvaW5kZXgnXG4gIGltcG9ydCBkYXRlcGlja2VyIGZyb20gJy4uL2NvbXBvbmVudHMvZGF0ZXBpY2tlci9pbmRleCdcbiAgdmFyIFFRTWFwV1ggPSByZXF1aXJlKCcuLi9saWIvcXFtYXAtd3gtanNzZGsuanMnKTtcbiAgdmFyIHFxbWFwc2RrO1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLpppbpobVcIixcbiAgICAgIC8vIGVuYWJsZVB1bGxEb3duUmVmcmVzaDogdHJ1ZSxcbiAgICAgIG5hdmlnYXRpb25TdHlsZTogXCJjdXN0b21cIlxuICAgIH07XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcInByaWNlYW5kc3RhcnBvcHVwXCI6e1wic2l6ZVwiOlwiNzUwXCIsXCJkdXJhdGlvblwiOlwiNDAwXCIsXCJ0eXBlXCI6XCJib3R0b21cIixcInYtYmluZDpzaG93TW9kYWwuc3luY1wiOlwicHJpY2VBbmRTdGFyTW9kYWxEaWFsb2dcIn0sXCJkYXRlcG9wdXBcIjp7XCJzaXplXCI6XCI3NTBcIixcImR1cmF0aW9uXCI6XCI0MDBcIixcInR5cGVcIjpcImJvdHRvbVwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDpzaG93TW9kYWwuc3luY1wiOlwiZGF0ZU1vZGFsRGlhbG9nXCIsXCJ4bWxuczp2LW9uXCI6XCJcIn0sXCJkYXRlcGlja2VyXCI6e1wibW9udGhzXCI6XCI0XCIsXCJ2LWJpbmQ6dmFsdWUuc3luY1wiOlwiX2RhdGVWYWx1ZVwifX07XHJcbiRldmVudHMgPSB7XCJkYXRlcG9wdXBcIjp7XCJ2LW9uOmhpZGVNb2RhbFwiOlwiaGlkZURhdGVEaWFsb2dcIn0sXCJkYXRlcGlja2VyXCI6e1widi1vbjpjbG9zZURpYWxvZ1wiOlwiY2xvc2VEYXRlRGlhbG9nXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XG4gICAgICBwcmljZWFuZHN0YXJwb3B1cDogcG9wdXAsXG4gICAgICBkYXRlcG9wdXA6IHBvcHVwLFxuICAgICAgZGF0ZXBpY2tlcjogZGF0ZXBpY2tlclxuICAgIH07XG4gICAgZGF0YSA9IHtcbiAgICAgIGNpdHlJbmZvOiB7XG4gICAgICAgIGlkOiAxNjQxMzIsXG4gICAgICAgIG5hbWU6ICfkuIrmtbfluIInLFxuICAgICAgICBwaW55aW46ICdzaGFuZ2hhaScsXG4gICAgICAgIGFjcm9ueW06ICdzaCcsXG4gICAgICAgIHJhbms6ICdTJyxcbiAgICAgICAgZmlyc3RDaGFyOiAnUycsXG4gICAgICAgIGxhdDogJzMxLjIzMDQxNicsXG4gICAgICAgIGxuZzogJzEyMS40NzM3MDEnXG4gICAgICB9LFxuICAgICAgZGF0ZVZhbHVlOiBbXSxcbiAgICAgIF9kYXRlVmFsdWU6IFtdLFxuICAgICAga2V5d29yZDogJycsXG4gICAgICBkYXRlTW9kYWxEaWFsb2c6IGZhbHNlLFxuICAgICAgcHJpY2VBbmRTdGFyTW9kYWxEaWFsb2c6IGZhbHNlLFxuICAgICAgc3Rhckxpc3Q6IFt7XG4gICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgICAgbGFiZWw6ICfkuI3pmZAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogMSxcbiAgICAgICAgICBsYWJlbDogJ+e7j+a1ji/ov57plIEnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogMixcbiAgICAgICAgICBsYWJlbDogJ+S6jOaYny/lhbbku5YnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogMyxcbiAgICAgICAgICBsYWJlbDogJ+S4ieaYny/oiJLpgIInXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogNCxcbiAgICAgICAgICBsYWJlbDogJ+Wbm+aYny/pq5jmoaMnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogNSxcbiAgICAgICAgICBsYWJlbDogJ+S6lOaYny/osarljY4nXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBwcmljZUxpc3Q6IFt7XG4gICAgICAgICAgdmFsdWU6IFsnJywgJyddLFxuICAgICAgICAgIGxhYmVsOiAn5LiN6ZmQJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWU6IFtcIjBcIiwgXCIxMDBcIl0sXG4gICAgICAgICAgbGFiZWw6ICcwLTEwMCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiBbXCIxMDBcIiwgXCIxNTBcIl0sXG4gICAgICAgICAgbGFiZWw6ICcxMDAtMTUwJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWU6IFtcIjE1MFwiLCBcIjMwMFwiXSxcbiAgICAgICAgICBsYWJlbDogJzE1MC0zMDAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogW1wiMzAwXCIsIFwiNTAwXCJdLFxuICAgICAgICAgIGxhYmVsOiAnMzAwLTUwMCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiBbXCI1MDBcIiwgXCI4MDBcIl0sXG4gICAgICAgICAgbGFiZWw6ICc1MDAtODAwJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWU6IFtcIjkwMFwiLCAnJ10sXG4gICAgICAgICAgbGFiZWw6ICc5MDDku6XkuIonXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBwcmljZUFuZFN0YXJsYWJlbDogJ+S4jemZkCDkuI3pmZAnLFxuICAgICAgcHJpY2U6IFsnJywgJyddLFxuICAgICAgcHJpY2VMYWJlbDogJ+S4jemZkCcsXG4gICAgICBzdGFyOiAnMCwnLFxuICAgICAgc3RhckxhYmVsOiAn5LiN6ZmQJ1xuICAgIH07XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBmb3JtYXREYXRlKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLmRhdGVWYWx1ZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdmFsdWUucHVzaChuZXcgRGF0ZShpdGVtKS50b1N0cmluZyhcIk1N5pyIZGTml6VcIikpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0sXG4gICAgICBnZXREYXlzKCkge1xuICAgICAgICBsZXQgZGF5cyA9IDA7XG4gICAgICAgIGlmICh0aGlzLmRhdGVWYWx1ZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICBsZXQgZmlyc3QgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVswXS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnZhbHVlT2YoKTtcbiAgICAgICAgICBsZXQgc2Vjb25kID0gbmV3IERhdGUodGhpcy5kYXRlVmFsdWVbMV0ucmVwbGFjZSgvLS9naSwgXCIvXCIpKS52YWx1ZU9mKCk7XG4gICAgICAgICAgbGV0IHRpbWUgPSBjYWxjdWxhdGVEaWZmVGltZShmaXJzdCwgc2Vjb25kKTtcbiAgICAgICAgICBkYXlzID0gdGltZVswXSAvIDI0O1xuICAgICAgICAgIHJldHVybiBkYXlzO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0RGVzY3JpYmUoKSB7XG4gICAgICAgIGxldCBkZXNjcmliZSA9IFtcIlwiLCBcIlwiXTtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRTdGFtcCA9IG5ldyBEYXRlKFxuICAgICAgICAgICAgY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgIGN1cnJlbnREYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICBjdXJyZW50RGF0ZS5nZXREYXRlKClcbiAgICAgICAgICApLnZhbHVlT2YoKTtcbiAgICAgICAgICBsZXQgZmlyc3QgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVswXS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnZhbHVlT2YoKTtcbiAgICAgICAgICBsZXQgc2Vjb25kID0gbmV3IERhdGUodGhpcy5kYXRlVmFsdWVbMV0ucmVwbGFjZSgvLS9naSwgXCIvXCIpKS52YWx1ZU9mKCk7XG4gICAgICAgICAgaWYgKGN1cnJlbnRTdGFtcCA9PSBmaXJzdCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMF0gPSBcIuS7iuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YW1wICsgMjQgKiA2MCAqIDYwICogMTAwMCA9PSBmaXJzdCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMF0gPSBcIuaYjuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YW1wICsgMjQgKiA2MCAqIDYwICogMTAwMCAqIDIgPT0gZmlyc3QpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzBdID0gXCLlkI7lpKlcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVzY3JpYmVbMF0gPSBcIlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY3VycmVudFN0YW1wID09IHNlY29uZCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMV0gPSBcIuS7iuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YW1wICsgMjQgKiA2MCAqIDYwICogMTAwMCA9PSBzZWNvbmQpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzFdID0gXCLmmI7lpKlcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGFtcCArIDI0ICogNjAgKiA2MCAqIDEwMDAgKiAyID09IHNlY29uZCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMV0gPSBcIuWQjuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZXNjcmliZVsxXSA9IFwiXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXNjcmliZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdhdGNoID0ge307XG4gICAgb25Mb2FkKCkge1xuICAgICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgICAvLyDlrp7kvovljJZBUEnmoLjlv4PnsbtcbiAgICAgIHFxbWFwc2RrID0gbmV3IFFRTWFwV1goe1xuICAgICAgICBrZXk6ICc2RUJCWi1JVURDSy0yVEhKUS1BWVQ1Qi1DN01SNy1KSkZHNydcbiAgICAgIH0pO1xuICAgICAgd2VweS5nZXRMb2NhdGlvbih7XG4gICAgICAgIHR5cGU6ICd3Z3M4NCdcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5jaXR5SW5mby5sbmcgPSByZXMubG9uZ2l0dWRlXG4gICAgICAgIHRoaXMuY2l0eUluZm8ubGF0ID0gcmVzLmxhdGl0dWRlXG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ2NpdHlJbmZvJywgdGhpcy5jaXR5SW5mbylcbiAgICAgICAgcXFtYXBzZGsucmV2ZXJzZUdlb2NvZGVyKHtcbiAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgbGF0aXR1ZGU6IHJlcy5sYXRpdHVkZSxcbiAgICAgICAgICAgIGxvbmdpdHVkZTogcmVzLmxvbmdpdHVkZVxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICB0aGF0LmNpdHlJbmZvLm5hbWUgPSByZXMucmVzdWx0LmFkX2luZm8uY2l0eVxuICAgICAgICAgICAgdGhhdC4kYXBwbHkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCflsJrmnKrmjojmnYPlnLDnkIbkvY3nva7vvIEnKVxuICAgICAgfSlcbiAgICAgIGxldCB0b2RheUZvcm1hdCA9IERhdGUudG9kYXkoKS50b1N0cmluZyhcInl5eXktTU0tZGRcIik7XG4gICAgICBsZXQgdG9tb3Jyb3dGb3JtYXQgPSBEYXRlLnRvZGF5KCkuYWRkRGF5cygxKS50b1N0cmluZyhcInl5eXktTU0tZGRcIik7XG4gICAgICB0aGlzLmRhdGVWYWx1ZS5wdXNoKHRvZGF5Rm9ybWF0LCB0b21vcnJvd0Zvcm1hdCk7XG4gICAgICB0aGlzLl9kYXRlVmFsdWUgPSB0aGlzLmRhdGVWYWx1ZVxuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgb25TaG93KCkge1xuICAgICAgbGV0IGNpdHlJbmZvID0gd2VweS5nZXRTdG9yYWdlU3luYygnY2l0eUluZm8nKSB8fCBudWxsXG4gICAgICBpZiAoY2l0eUluZm8pIHtcbiAgICAgICAgdGhpcy5jaXR5SW5mbyA9IGNpdHlJbmZvXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGhhbmRsZUNpdHkoKSB7XG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9jaXR5J1xuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGNoYW5nZURhdGUoKSB7XG4gICAgICAgIHRoaXMuX2RhdGVWYWx1ZSA9IHRoaXMuZGF0ZVZhbHVlXG4gICAgICAgIHRoaXMuZGF0ZU1vZGFsRGlhbG9nID0gdHJ1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAga2V5d29yZElucHV0KGUpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgdGhpcy5rZXl3b3JkID0gdmFsdWVcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIHNob3dNb2RhbCgpIHtcbiAgICAgICAgdGhpcy5wcmljZUFuZFN0YXJNb2RhbERpYWxvZyA9IHRydWVcbiAgICAgICAgdGhpcy5wcmljZUxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkodGhpcy5wcmljZSkgPT0gSlNPTi5zdHJpbmdpZnkoaXRlbS52YWx1ZSkpIHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgc3RhckFyciA9IFtdXG4gICAgICAgIGlmICh0aGlzLnN0YXJMYWJlbCkge1xuICAgICAgICAgIHN0YXJBcnIgPSB0aGlzLnN0YXJMYWJlbC5zcGxpdCgnICcpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdGFyTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGxldCBjaGVja2VkID0gZmFsc2VcbiAgICAgICAgICBpZiAoc3RhckFyci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBzdGFyQXJyLmZvckVhY2goX2l0ZW0gPT4ge1xuICAgICAgICAgICAgICBpZiAoX2l0ZW0gPT0gaXRlbS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gY2hlY2tlZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGNoZWNrZWRcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgaGFuZGxlUHJpY2UoaW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcmljZUxpc3QuZm9yRWFjaCgoaXRlbSwgX2luZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGluZGV4ID09IF9pbmRleCkge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIGhhbmRsZVN0YXIoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4ID09IDApIHtcbiAgICAgICAgICB0aGlzLnN0YXJMaXN0LmZvckVhY2goKGl0ZW0sIF9pbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09IF9pbmRleCkge1xuICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3Rhckxpc3RbMF0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgdGhpcy5zdGFyTGlzdFtpbmRleF0uY2hlY2tlZCA9ICF0aGlzLnN0YXJMaXN0W2luZGV4XS5jaGVja2VkXG4gICAgICAgICAgbGV0IGZ1bGwgPSB0cnVlXG4gICAgICAgICAgdGhpcy5zdGFyTGlzdC5mb3JFYWNoKChpdGVtLCBfaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChfaW5kZXggPiAwICYmICFpdGVtLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgZnVsbCA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGZ1bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc3Rhckxpc3QuZm9yRWFjaCgoaXRlbSwgX2luZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChfaW5kZXggPT0gMCkge1xuICAgICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIGhhbmRsZVJlc2V0KCkge1xuICAgICAgICB0aGlzLnN0YXJMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5wcmljZUxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnN0YXJMaXN0WzBdLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIHRoaXMucHJpY2VMaXN0WzBdLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBoYW5kbGVDb25maXJtcygpIHtcbiAgICAgICAgbGV0IHByaWNlID0gJydcbiAgICAgICAgbGV0IHByaWNlTGFiZWwgPSAnJ1xuICAgICAgICBsZXQgc3RhciA9ICcnXG4gICAgICAgIGxldCBzdGFyTGFiZWwgPSAnJ1xuICAgICAgICB0aGlzLnByaWNlTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGlmIChpdGVtLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHByaWNlID0gaXRlbS52YWx1ZVxuICAgICAgICAgICAgcHJpY2VMYWJlbCA9IGl0ZW0ubGFiZWxcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuc3Rhckxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpZiAoaXRlbS5jaGVja2VkKSB7XG4gICAgICAgICAgICBzdGFyICs9IGl0ZW0udmFsdWUgKyAnLCdcbiAgICAgICAgICAgIHN0YXJMYWJlbCArPSBpdGVtLmxhYmVsICsgJyAnXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnByaWNlID0gcHJpY2VcbiAgICAgICAgdGhpcy5wcmljZUxhYmVsID0gcHJpY2VMYWJlbFxuICAgICAgICB0aGlzLnN0YXIgPSBzdGFyXG4gICAgICAgIHRoaXMuc3RhckxhYmVsID0gc3RhckxhYmVsXG4gICAgICAgIGlmIChwcmljZSB8fCBzdGFyKSB7XG4gICAgICAgICAgdGhpcy5wcmljZUFuZFN0YXJsYWJlbCA9IHByaWNlTGFiZWwgKyAnICcgKyBzdGFyTGFiZWxcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnByaWNlQW5kU3RhcmxhYmVsID0gJydcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByaWNlQW5kU3Rhck1vZGFsRGlhbG9nID0gZmFsc2VcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIGhpZGVEYXRlRGlhbG9nKCkge1xuICAgICAgICBpZiAodGhpcy5fZGF0ZVZhbHVlLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgdGhpcy5kYXRlVmFsdWUgPSB0aGlzLl9kYXRlVmFsdWVcbiAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjbG9zZURhdGVEaWFsb2codmFsdWUpIHtcbiAgICAgICAgY29uc29sZS5sb2codmFsdWUpXG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT0gMikge1xuICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlID0gdmFsdWVcbiAgICAgICAgICB0aGlzLmRhdGVNb2RhbERpYWxvZyA9IGZhbHNlXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFuZGxlVG9TZWFyY2goKSB7XG4gICAgICAgIGxldCBjaXR5T2JqID0gSlNPTi5zdHJpbmdpZnkodGhpcy5jaXR5SW5mbylcbiAgICAgICAgbGV0IGRhdGVWYWx1ZSA9IHRoaXMuZGF0ZVZhbHVlXG4gICAgICAgIGxldCBrZXl3b3JkID0gdGhpcy5rZXl3b3JkXG4gICAgICAgIGxldCBzdGFyID0gdGhpcy5zdGFyXG4gICAgICAgIGxldCBzdGFyTGFiZWwgPSB0aGlzLnN0YXJMYWJlbFxuICAgICAgICBsZXQgcHJpY2UgPSB0aGlzLnByaWNlXG4gICAgICAgIGxldCBwcmljZUxhYmVsID0gdGhpcy5wcmljZUxhYmVsXG4gICAgICAgIHdlcHkubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdXJsOiAnLi9zZWFyY2hMaXN0P2NpdHlJbmZvPScgKyBjaXR5T2JqICsgJyZkYXRlVmFsdWU9JyArIGRhdGVWYWx1ZSArICcma2V5d29yZD0nICsga2V5d29yZCArICcmc3Rhcj0nICsgc3RhciArICcmc3RhckxhYmVsPScgKyBzdGFyTGFiZWwgKyAnJnByaWNlPScgKyBwcmljZSArICcmcHJpY2VMYWJlbD0nICsgcHJpY2VMYWJlbFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH07XG4gICAgb25IaWRlKCkge31cbiAgICBvblVubG9hZCgpIHt9XG4gICAgLy8g5LiL5ouJ5Yi35paw5LqL5Lu2XG4gICAgb25QdWxsRG93blJlZnJlc2goKSB7XG4gICAgICB3ZXB5LnNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZygpO1xuICAgICAgd2VweS5zdG9wUHVsbERvd25SZWZyZXNoKCk7XG4gICAgICB3ZXB5LmhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZygpO1xuICAgIH1cbiAgfVxuIl19