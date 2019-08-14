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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlFRTWFwV1giLCJyZXF1aXJlIiwicXFtYXBzZGsiLCJJbmRleCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJuYXZpZ2F0aW9uU3R5bGUiLCIkcmVwZWF0IiwiJHByb3BzIiwiJGV2ZW50cyIsImNvbXBvbmVudHMiLCJwcmljZWFuZHN0YXJwb3B1cCIsInBvcHVwIiwiZGF0ZXBvcHVwIiwiZGF0ZXBpY2tlciIsImRhdGEiLCJjaXR5SW5mbyIsImlkIiwibmFtZSIsInBpbnlpbiIsImFjcm9ueW0iLCJyYW5rIiwiZmlyc3RDaGFyIiwibGF0IiwibG5nIiwiZGF0ZVZhbHVlIiwiX2RhdGVWYWx1ZSIsImtleXdvcmQiLCJkYXRlTW9kYWxEaWFsb2ciLCJwcmljZUFuZFN0YXJNb2RhbERpYWxvZyIsInN0YXJMaXN0IiwidmFsdWUiLCJsYWJlbCIsInByaWNlTGlzdCIsInByaWNlQW5kU3RhcmxhYmVsIiwicHJpY2UiLCJwcmljZUxhYmVsIiwic3RhciIsInN0YXJMYWJlbCIsImNvbXB1dGVkIiwiZm9ybWF0RGF0ZSIsImxlbmd0aCIsImZvckVhY2giLCJwdXNoIiwiRGF0ZSIsIml0ZW0iLCJ0b1N0cmluZyIsImdldERheXMiLCJkYXlzIiwiZmlyc3QiLCJyZXBsYWNlIiwidmFsdWVPZiIsInNlY29uZCIsInRpbWUiLCJnZXREZXNjcmliZSIsImRlc2NyaWJlIiwiY3VycmVudERhdGUiLCJjdXJyZW50U3RhbXAiLCJnZXRGdWxsWWVhciIsImdldE1vbnRoIiwiZ2V0RGF0ZSIsInN0ciIsImNoYXJBdCIsImdldERheSIsIndhdGNoIiwibWV0aG9kcyIsImhhbmRsZUNpdHkiLCJ3ZXB5IiwibmF2aWdhdGVUbyIsInVybCIsImNoYW5nZURhdGUiLCIkYXBwbHkiLCJrZXl3b3JkSW5wdXQiLCJlIiwiZGV0YWlsIiwic2hvd01vZGFsIiwiSlNPTiIsInN0cmluZ2lmeSIsImNoZWNrZWQiLCJzdGFyQXJyIiwic3BsaXQiLCJfaXRlbSIsImhhbmRsZVByaWNlIiwiaW5kZXgiLCJfaW5kZXgiLCJoYW5kbGVTdGFyIiwiZnVsbCIsImhhbmRsZVJlc2V0IiwiaGFuZGxlQ29uZmlybXMiLCJoaWRlRGF0ZURpYWxvZyIsImNsb3NlRGF0ZURpYWxvZyIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVUb1NlYXJjaCIsImNpdHlPYmoiLCJ0aGF0Iiwia2V5IiwiZ2V0TG9jYXRpb24iLCJ0eXBlIiwidGhlbiIsInJlcyIsImxvbmdpdHVkZSIsImxhdGl0dWRlIiwic2V0U3RvcmFnZVN5bmMiLCJyZXZlcnNlR2VvY29kZXIiLCJsb2NhdGlvbiIsInN1Y2Nlc3MiLCJyZXN1bHQiLCJhZF9pbmZvIiwiY2l0eSIsImNhdGNoIiwidG9kYXlGb3JtYXQiLCJ0b2RheSIsInRvbW9ycm93Rm9ybWF0IiwiYWRkRGF5cyIsImdldFN0b3JhZ2VTeW5jIiwic2hvd05hdmlnYXRpb25CYXJMb2FkaW5nIiwic3RvcFB1bGxEb3duUmVmcmVzaCIsImhpZGVOYXZpZ2F0aW9uQmFyTG9hZGluZyIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7O0FBR0E7O0FBR0E7O0FBR0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBSUEsVUFBVUMsUUFBUSwwQkFBUixDQUFkO0FBQ0EsSUFBSUMsUUFBSjs7SUFDcUJDLEs7Ozs7Ozs7Ozs7Ozs7O29MQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QixJQURqQjtBQUVQO0FBQ0FDLHVCQUFpQjtBQUhWLEssUUFLVkMsTyxHQUFVLEUsUUFDYkMsTSxHQUFTLEVBQUMscUJBQW9CLEVBQUMsUUFBTyxLQUFSLEVBQWMsWUFBVyxLQUF6QixFQUErQixRQUFPLFFBQXRDLEVBQStDLHlCQUF3Qix5QkFBdkUsRUFBckIsRUFBdUgsYUFBWSxFQUFDLFFBQU8sS0FBUixFQUFjLFlBQVcsS0FBekIsRUFBK0IsUUFBTyxRQUF0QyxFQUErQyxnQkFBZSxFQUE5RCxFQUFpRSx5QkFBd0IsaUJBQXpGLEVBQTJH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ZWtCLElBQWYsQ0FBb0JvRSxXQUFwQixFQUFpQ0UsY0FBakM7QUFDQSxXQUFLdkYsVUFBTCxHQUFrQixLQUFLRCxTQUF2QjtBQUNBLFdBQUs4QyxNQUFMO0FBQ0Q7Ozs2QkFDUTtBQUNQLFVBQUl2RCxXQUFXbUQsZUFBS2dELGNBQUwsQ0FBb0IsVUFBcEIsS0FBbUMsSUFBbEQ7QUFDQSxVQUFJbkcsUUFBSixFQUFjO0FBQ1osYUFBS0EsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxhQUFLdUQsTUFBTDtBQUNEO0FBQ0Y7Ozs2QkF3SlEsQ0FBRTs7OytCQUNBLENBQUU7QUFDYjs7Ozt3Q0FDb0I7QUFDbEJKLHFCQUFLaUQsd0JBQUw7QUFDQWpELHFCQUFLa0QsbUJBQUw7QUFDQWxELHFCQUFLbUQsd0JBQUw7QUFDRDs7OztFQXRWZ0NuRCxlQUFLb0QsSTs7a0JBQW5CcEgsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xuICBpbXBvcnQge1xuICAgIGNoYW5nZVBYVG9SUFhcbiAgfSBmcm9tIFwiQC9saWIvd3gtc3lzdGVtLmpzXCI7XG4gIGltcG9ydCB7XG4gICAgZmluZFJlZ2lvbnNcbiAgfSBmcm9tIFwiLi4vc2VydmVyL2luZGV4LmpzXCI7XG4gIGltcG9ydCB7XG4gICAgY2FsY3VsYXRlRGlmZlRpbWUsXG4gIH0gZnJvbSBcIi4uL2xpYi91dGlscy5qc1wiO1xuICBpbXBvcnQgcG9wdXAgZnJvbSAnLi4vY29tcG9uZW50cy9wb3B1cC9pbmRleCdcbiAgaW1wb3J0IGRhdGVwaWNrZXIgZnJvbSAnLi4vY29tcG9uZW50cy9kYXRlcGlja2VyL2luZGV4J1xuICB2YXIgUVFNYXBXWCA9IHJlcXVpcmUoJy4uL2xpYi9xcW1hcC13eC1qc3Nkay5qcycpO1xuICB2YXIgcXFtYXBzZGs7XG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiBcIummlumhtVwiLFxuICAgICAgLy8gZW5hYmxlUHVsbERvd25SZWZyZXNoOiB0cnVlLFxuICAgICAgbmF2aWdhdGlvblN0eWxlOiBcImN1c3RvbVwiXG4gICAgfTtcbiAgICRyZXBlYXQgPSB7fTtcclxuJHByb3BzID0ge1wicHJpY2VhbmRzdGFycG9wdXBcIjp7XCJzaXplXCI6XCI3NTBcIixcImR1cmF0aW9uXCI6XCI0MDBcIixcInR5cGVcIjpcImJvdHRvbVwiLFwidi1iaW5kOnNob3dNb2RhbC5zeW5jXCI6XCJwcmljZUFuZFN0YXJNb2RhbERpYWxvZ1wifSxcImRhdGVwb3B1cFwiOntcInNpemVcIjpcIjc1MFwiLFwiZHVyYXRpb25cIjpcIjQwMFwiLFwidHlwZVwiOlwiYm90dG9tXCIsXCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOnNob3dNb2RhbC5zeW5jXCI6XCJkYXRlTW9kYWxEaWFsb2dcIixcInhtbG5zOnYtb25cIjpcIlwifSxcImRhdGVwaWNrZXJcIjp7XCJtb250aHNcIjpcIjRcIixcInYtYmluZDp2YWx1ZS5zeW5jXCI6XCJfZGF0ZVZhbHVlXCJ9fTtcclxuJGV2ZW50cyA9IHtcImRhdGVwb3B1cFwiOntcInYtb246aGlkZU1vZGFsXCI6XCJoaWRlRGF0ZURpYWxvZ1wifSxcImRhdGVwaWNrZXJcIjp7XCJ2LW9uOmNsb3NlRGlhbG9nXCI6XCJjbG9zZURhdGVEaWFsb2dcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIHByaWNlYW5kc3RhcnBvcHVwOiBwb3B1cCxcbiAgICAgIGRhdGVwb3B1cDogcG9wdXAsXG4gICAgICBkYXRlcGlja2VyOiBkYXRlcGlja2VyXG4gICAgfTtcbiAgICBkYXRhID0ge1xuICAgICAgY2l0eUluZm86IHtcbiAgICAgICAgaWQ6IDE2NDEzMixcbiAgICAgICAgbmFtZTogJ+S4iua1t+W4gicsXG4gICAgICAgIHBpbnlpbjogJ3NoYW5naGFpJyxcbiAgICAgICAgYWNyb255bTogJ3NoJyxcbiAgICAgICAgcmFuazogJ1MnLFxuICAgICAgICBmaXJzdENoYXI6ICdTJyxcbiAgICAgICAgbGF0OiAnMzEuMjMwNDE2JyxcbiAgICAgICAgbG5nOiAnMTIxLjQ3MzcwMSdcbiAgICAgIH0sXG4gICAgICBkYXRlVmFsdWU6IFtdLFxuICAgICAgX2RhdGVWYWx1ZTogW10sXG4gICAgICBrZXl3b3JkOiAnJyxcbiAgICAgIGRhdGVNb2RhbERpYWxvZzogZmFsc2UsXG4gICAgICBwcmljZUFuZFN0YXJNb2RhbERpYWxvZzogZmFsc2UsXG4gICAgICBzdGFyTGlzdDogW3tcbiAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgICBsYWJlbDogJ+S4jemZkCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiAxLFxuICAgICAgICAgIGxhYmVsOiAn57uP5rWOL+i/numUgSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiAyLFxuICAgICAgICAgIGxhYmVsOiAn5LqM5pifL+WFtuS7lidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiAzLFxuICAgICAgICAgIGxhYmVsOiAn5LiJ5pifL+iIkumAgidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiA0LFxuICAgICAgICAgIGxhYmVsOiAn5Zub5pifL+mrmOahoydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiA1LFxuICAgICAgICAgIGxhYmVsOiAn5LqU5pifL+ixquWNjidcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHByaWNlTGlzdDogW3tcbiAgICAgICAgICB2YWx1ZTogWycnLCAnJ10sXG4gICAgICAgICAgbGFiZWw6ICfkuI3pmZAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogW1wiMFwiLCBcIjEwMFwiXSxcbiAgICAgICAgICBsYWJlbDogJzAtMTAwJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWU6IFtcIjEwMFwiLCBcIjE1MFwiXSxcbiAgICAgICAgICBsYWJlbDogJzEwMC0xNTAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogW1wiMTUwXCIsIFwiMzAwXCJdLFxuICAgICAgICAgIGxhYmVsOiAnMTUwLTMwMCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHZhbHVlOiBbXCIzMDBcIiwgXCI1MDBcIl0sXG4gICAgICAgICAgbGFiZWw6ICczMDAtNTAwJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdmFsdWU6IFtcIjUwMFwiLCBcIjgwMFwiXSxcbiAgICAgICAgICBsYWJlbDogJzUwMC04MDAnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB2YWx1ZTogW1wiOTAwXCIsICcnXSxcbiAgICAgICAgICBsYWJlbDogJzkwMOS7peS4iidcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHByaWNlQW5kU3RhcmxhYmVsOiAn5LiN6ZmQIOS4jemZkCcsXG4gICAgICBwcmljZTogWycnLCAnJ10sXG4gICAgICBwcmljZUxhYmVsOiAn5LiN6ZmQJyxcbiAgICAgIHN0YXI6ICcwLCcsXG4gICAgICBzdGFyTGFiZWw6ICfkuI3pmZAnXG4gICAgfTtcbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGZvcm1hdERhdGUoKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IFtdO1xuICAgICAgICBpZiAodGhpcy5kYXRlVmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICB2YWx1ZS5wdXNoKG5ldyBEYXRlKGl0ZW0pLnRvU3RyaW5nKFwiTU3mnIhkZOaXpVwiKSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSxcbiAgICAgIGdldERheXMoKSB7XG4gICAgICAgIGxldCBkYXlzID0gMDtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIGxldCBmaXJzdCA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZhbHVlWzBdLnJlcGxhY2UoLy0vZ2ksIFwiL1wiKSkudmFsdWVPZigpO1xuICAgICAgICAgIGxldCBzZWNvbmQgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVsxXS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnZhbHVlT2YoKTtcbiAgICAgICAgICBsZXQgdGltZSA9IGNhbGN1bGF0ZURpZmZUaW1lKGZpcnN0LCBzZWNvbmQpO1xuICAgICAgICAgIGRheXMgPSB0aW1lWzBdIC8gMjQ7XG4gICAgICAgICAgcmV0dXJuIGRheXM7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnZXREZXNjcmliZSgpIHtcbiAgICAgICAgbGV0IGRlc2NyaWJlID0gW1wiXCIsIFwiXCJdO1xuICAgICAgICBpZiAodGhpcy5kYXRlVmFsdWUubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICBsZXQgY3VycmVudFN0YW1wID0gbmV3IERhdGUoXG4gICAgICAgICAgICBjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICAgICAgY3VycmVudERhdGUuZ2V0TW9udGgoKSxcbiAgICAgICAgICAgIGN1cnJlbnREYXRlLmdldERhdGUoKVxuICAgICAgICAgICkudmFsdWVPZigpO1xuICAgICAgICAgIGxldCBmaXJzdCA9IG5ldyBEYXRlKHRoaXMuZGF0ZVZhbHVlWzBdLnJlcGxhY2UoLy0vZ2ksIFwiL1wiKSkudmFsdWVPZigpO1xuICAgICAgICAgIGxldCBzZWNvbmQgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVsxXS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnZhbHVlT2YoKTtcbiAgICAgICAgICBpZiAoY3VycmVudFN0YW1wID09IGZpcnN0KSB7XG4gICAgICAgICAgICBkZXNjcmliZVswXSA9IFwi5LuK5aSpXCI7XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhbXAgKyAyNCAqIDYwICogNjAgKiAxMDAwID09IGZpcnN0KSB7XG4gICAgICAgICAgICBkZXNjcmliZVswXSA9IFwi5piO5aSpXCI7XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhbXAgKyAyNCAqIDYwICogNjAgKiAxMDAwICogMiA9PSBmaXJzdCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMF0gPSBcIuWQjuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgIHZhciBzdHIgPSAn5pif5pyfJyArICfml6XkuIDkuozkuInlm5vkupTlha0nLmNoYXJBdChuZXcgRGF0ZShmaXJzdCkuZ2V0RGF5KCkpO1xuICAgICAgICAgICAgZGVzY3JpYmVbMF0gPSBzdHI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjdXJyZW50U3RhbXAgPT0gc2Vjb25kKSB7XG4gICAgICAgICAgICBkZXNjcmliZVsxXSA9IFwi5LuK5aSpXCI7XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhbXAgKyAyNCAqIDYwICogNjAgKiAxMDAwID09IHNlY29uZCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMV0gPSBcIuaYjuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YW1wICsgMjQgKiA2MCAqIDYwICogMTAwMCAqIDIgPT0gc2Vjb25kKSB7XG4gICAgICAgICAgICBkZXNjcmliZVsxXSA9IFwi5ZCO5aSpXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzdHIgPSAn5pif5pyfJyArICfml6XkuIDkuozkuInlm5vkupTlha0nLmNoYXJBdChuZXcgRGF0ZShzZWNvbmQpLmdldERheSgpKTtcbiAgICAgICAgICAgIGRlc2NyaWJlWzFdID0gc3RyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVzY3JpYmU7XG4gICAgICB9XG4gICAgfTtcbiAgICB3YXRjaCA9IHt9O1xuICAgIG9uTG9hZCgpIHtcbiAgICAgIGxldCB0aGF0ID0gdGhpc1xuICAgICAgLy8g5a6e5L6L5YyWQVBJ5qC45b+D57G7XG4gICAgICBxcW1hcHNkayA9IG5ldyBRUU1hcFdYKHtcbiAgICAgICAga2V5OiAnNkVCQlotSVVEQ0stMlRISlEtQVlUNUItQzdNUjctSkpGRzcnXG4gICAgICB9KTtcbiAgICAgIHdlcHkuZ2V0TG9jYXRpb24oe1xuICAgICAgICB0eXBlOiAnd2dzODQnXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMuY2l0eUluZm8ubG5nID0gcmVzLmxvbmdpdHVkZVxuICAgICAgICB0aGlzLmNpdHlJbmZvLmxhdCA9IHJlcy5sYXRpdHVkZVxuICAgICAgICB3ZXB5LnNldFN0b3JhZ2VTeW5jKCdjaXR5SW5mbycsIHRoaXMuY2l0eUluZm8pXG4gICAgICAgIHFxbWFwc2RrLnJldmVyc2VHZW9jb2Rlcih7XG4gICAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgIGxhdGl0dWRlOiByZXMubGF0aXR1ZGUsXG4gICAgICAgICAgICBsb25naXR1ZGU6IHJlcy5sb25naXR1ZGVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykge1xuICAgICAgICAgICAgdGhhdC5jaXR5SW5mby5uYW1lID0gcmVzLnJlc3VsdC5hZF9pbmZvLmNpdHlcbiAgICAgICAgICAgIHRoYXQuJGFwcGx5KClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygn5bCa5pyq5o6I5p2D5Zyw55CG5L2N572u77yBJylcbiAgICAgIH0pXG4gICAgICBsZXQgdG9kYXlGb3JtYXQgPSBEYXRlLnRvZGF5KCkudG9TdHJpbmcoXCJ5eXl5LU1NLWRkXCIpO1xuICAgICAgbGV0IHRvbW9ycm93Rm9ybWF0ID0gRGF0ZS50b2RheSgpLmFkZERheXMoMSkudG9TdHJpbmcoXCJ5eXl5LU1NLWRkXCIpO1xuICAgICAgdGhpcy5kYXRlVmFsdWUucHVzaCh0b2RheUZvcm1hdCwgdG9tb3Jyb3dGb3JtYXQpO1xuICAgICAgdGhpcy5fZGF0ZVZhbHVlID0gdGhpcy5kYXRlVmFsdWVcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIG9uU2hvdygpIHtcbiAgICAgIGxldCBjaXR5SW5mbyA9IHdlcHkuZ2V0U3RvcmFnZVN5bmMoJ2NpdHlJbmZvJykgfHwgbnVsbFxuICAgICAgaWYgKGNpdHlJbmZvKSB7XG4gICAgICAgIHRoaXMuY2l0eUluZm8gPSBjaXR5SW5mb1xuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBoYW5kbGVDaXR5KCkge1xuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vY2l0eSdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VEYXRlKCkge1xuICAgICAgICB0aGlzLl9kYXRlVmFsdWUgPSB0aGlzLmRhdGVWYWx1ZVxuICAgICAgICB0aGlzLmRhdGVNb2RhbERpYWxvZyA9IHRydWVcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIGtleXdvcmRJbnB1dChlKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IGUuZGV0YWlsLnZhbHVlXG4gICAgICAgIHRoaXMua2V5d29yZCA9IHZhbHVlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBzaG93TW9kYWwoKSB7XG4gICAgICAgIHRoaXMucHJpY2VBbmRTdGFyTW9kYWxEaWFsb2cgPSB0cnVlXG4gICAgICAgIHRoaXMucHJpY2VMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgaWYgKEpTT04uc3RyaW5naWZ5KHRoaXMucHJpY2UpID09IEpTT04uc3RyaW5naWZ5KGl0ZW0udmFsdWUpKSB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHN0YXJBcnIgPSBbXVxuICAgICAgICBpZiAodGhpcy5zdGFyTGFiZWwpIHtcbiAgICAgICAgICBzdGFyQXJyID0gdGhpcy5zdGFyTGFiZWwuc3BsaXQoJyAnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3Rhckxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBsZXQgY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgICAgaWYgKHN0YXJBcnIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc3RhckFyci5mb3JFYWNoKF9pdGVtID0+IHtcbiAgICAgICAgICAgICAgaWYgKF9pdGVtID09IGl0ZW0ubGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGNoZWNrZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSBjaGVja2VkXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIGhhbmRsZVByaWNlKGluZGV4KSB7XG4gICAgICAgIHRoaXMucHJpY2VMaXN0LmZvckVhY2goKGl0ZW0sIF9pbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChpbmRleCA9PSBfaW5kZXgpIHtcbiAgICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBoYW5kbGVTdGFyKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA9PSAwKSB7XG4gICAgICAgICAgdGhpcy5zdGFyTGlzdC5mb3JFYWNoKChpdGVtLCBfaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSBfaW5kZXgpIHtcbiAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0YXJMaXN0WzBdLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuc3Rhckxpc3RbaW5kZXhdLmNoZWNrZWQgPSAhdGhpcy5zdGFyTGlzdFtpbmRleF0uY2hlY2tlZFxuICAgICAgICAgIGxldCBmdWxsID0gdHJ1ZVxuICAgICAgICAgIHRoaXMuc3Rhckxpc3QuZm9yRWFjaCgoaXRlbSwgX2luZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoX2luZGV4ID4gMCAmJiAhaXRlbS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgIGZ1bGwgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChmdWxsKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJMaXN0LmZvckVhY2goKGl0ZW0sIF9pbmRleCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoX2luZGV4ID09IDApIHtcbiAgICAgICAgICAgICAgICBpdGVtLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBoYW5kbGVSZXNldCgpIHtcbiAgICAgICAgdGhpcy5zdGFyTGlzdC5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgIGl0ZW0uY2hlY2tlZCA9IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMucHJpY2VMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgaXRlbS5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5zdGFyTGlzdFswXS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICB0aGlzLnByaWNlTGlzdFswXS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgaGFuZGxlQ29uZmlybXMoKSB7XG4gICAgICAgIGxldCBwcmljZSA9ICcnXG4gICAgICAgIGxldCBwcmljZUxhYmVsID0gJydcbiAgICAgICAgbGV0IHN0YXIgPSAnJ1xuICAgICAgICBsZXQgc3RhckxhYmVsID0gJydcbiAgICAgICAgdGhpcy5wcmljZUxpc3QuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICBpZiAoaXRlbS5jaGVja2VkKSB7XG4gICAgICAgICAgICBwcmljZSA9IGl0ZW0udmFsdWVcbiAgICAgICAgICAgIHByaWNlTGFiZWwgPSBpdGVtLmxhYmVsXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnN0YXJMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgaWYgKGl0ZW0uY2hlY2tlZCkge1xuICAgICAgICAgICAgc3RhciArPSBpdGVtLnZhbHVlICsgJywnXG4gICAgICAgICAgICBzdGFyTGFiZWwgKz0gaXRlbS5sYWJlbCArICcgJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5wcmljZSA9IHByaWNlXG4gICAgICAgIHRoaXMucHJpY2VMYWJlbCA9IHByaWNlTGFiZWxcbiAgICAgICAgdGhpcy5zdGFyID0gc3RhclxuICAgICAgICB0aGlzLnN0YXJMYWJlbCA9IHN0YXJMYWJlbFxuICAgICAgICBpZiAocHJpY2UgfHwgc3Rhcikge1xuICAgICAgICAgIHRoaXMucHJpY2VBbmRTdGFybGFiZWwgPSBwcmljZUxhYmVsICsgJyAnICsgc3RhckxhYmVsXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wcmljZUFuZFN0YXJsYWJlbCA9ICcnXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcmljZUFuZFN0YXJNb2RhbERpYWxvZyA9IGZhbHNlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBoaWRlRGF0ZURpYWxvZygpIHtcbiAgICAgICAgaWYgKHRoaXMuX2RhdGVWYWx1ZS5sZW5ndGggPT0gMikge1xuICAgICAgICAgIHRoaXMuZGF0ZVZhbHVlID0gdGhpcy5fZGF0ZVZhbHVlXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2xvc2VEYXRlRGlhbG9nKHZhbHVlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHZhbHVlKVxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICB0aGlzLmRhdGVWYWx1ZSA9IHZhbHVlXG4gICAgICAgICAgdGhpcy5kYXRlTW9kYWxEaWFsb2cgPSBmYWxzZVxuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhbmRsZVRvU2VhcmNoKCkge1xuICAgICAgICBsZXQgY2l0eU9iaiA9IEpTT04uc3RyaW5naWZ5KHRoaXMuY2l0eUluZm8pXG4gICAgICAgIGxldCBkYXRlVmFsdWUgPSB0aGlzLmRhdGVWYWx1ZVxuICAgICAgICBsZXQga2V5d29yZCA9IHRoaXMua2V5d29yZFxuICAgICAgICBsZXQgc3RhciA9IHRoaXMuc3RhclxuICAgICAgICBsZXQgc3RhckxhYmVsID0gdGhpcy5zdGFyTGFiZWxcbiAgICAgICAgbGV0IHByaWNlID0gdGhpcy5wcmljZVxuICAgICAgICBsZXQgcHJpY2VMYWJlbCA9IHRoaXMucHJpY2VMYWJlbFxuICAgICAgICB3ZXB5Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgIHVybDogJy4vc2VhcmNoTGlzdD9jaXR5SW5mbz0nICsgY2l0eU9iaiArICcmZGF0ZVZhbHVlPScgKyBkYXRlVmFsdWUgKyAnJmtleXdvcmQ9JyArIGtleXdvcmQgKyAnJnN0YXI9JyArIHN0YXIgKyAnJnN0YXJMYWJlbD0nICsgc3RhckxhYmVsICsgJyZwcmljZT0nICsgcHJpY2UgKyAnJnByaWNlTGFiZWw9JyArIHByaWNlTGFiZWxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9O1xuICAgIG9uSGlkZSgpIHt9XG4gICAgb25VbmxvYWQoKSB7fVxuICAgIC8vIOS4i+aLieWIt+aWsOS6i+S7tlxuICAgIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgICAgd2VweS5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKTtcbiAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xuICAgICAgd2VweS5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKTtcbiAgICB9XG4gIH1cbiJdfQ==