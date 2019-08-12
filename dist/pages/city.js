"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _index = require('./../server/index.js');

var _wxSystem = require('./../lib/wx-system.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var qqmapsdk;

var City = function (_wepy$page) {
  _inherits(City, _wepy$page);

  function City() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, City);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = City.__proto__ || Object.getPrototypeOf(City)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: "首页"
    }, _this.components = {}, _this.data = {
      searchFocus: false,
      scrollHeight: 0,
      eachLetterHeight: 0,
      comTop: 120,
      lettersPosition: [],
      scrollIntoView: '',
      cityList: [],
      searchList: [],
      historyList: [],
      hotCityList: [{
        id: 2,
        name: '北京',
        pinyin: 'beijing',
        acronym: 'bj',
        rank: 'S',
        firstChar: 'B',
        lat: '39.904030',
        lng: '116.407526'
      }, {
        id: 164132,
        name: '上海',
        pinyin: 'shanghai',
        acronym: 'sh',
        rank: 'S',
        firstChar: 'S',
        lat: '31.230416',
        lng: '121.473701'
      }, {
        id: 490588,
        name: '广州',
        pinyin: 'guangzhou',
        acronym: 'gz',
        rank: 'A',
        firstChar: 'G',
        lat: '23.129162',
        lng: '113.264434'
      }, {
        id: 495090,
        name: '深圳',
        pinyin: 'shenzhen',
        acronym: 'sz',
        rank: 'A',
        firstChar: 'S',
        lat: '22.543099',
        lng: '114.057868'
      }, {
        id: 194237,
        name: '杭州',
        pinyin: 'hangzhou',
        acronym: 'hz',
        rank: 'A',
        firstChar: 'H',
        lat: '30.274084',
        lng: '120.155070'
      }, {
        id: null,
        name: '全部',
        pinyin: null,
        acronym: null
      }],
      keyword: '',
      loading: false
    }, _this.computed = {}, _this.watch = {}, _this.methods = {
      searchFocus: function searchFocus() {
        this.searchFocus = true;
        this.$apply();
      },
      handleCancel: function handleCancel() {
        this.searchFocus = false;
        this.keyword = '';
        this.searchList = [];
        this.$apply();
      },
      searchInput: function searchInput(e) {
        this.keyword = e.detail.value;
        this.searchList = this.getSearchList(this.keyword, this.cityList, true);
        this.$apply();
      },
      handleDeleteKeyword: function handleDeleteKeyword() {
        this.keyword = '';
        this.searchList = [];
        this.$apply();
      },
      handleCity: function handleCity(item) {
        var historyList = _wepy2.default.getStorageSync('historyCityList') || [];
        if (historyList.length === 0 && !!item.id) {
          historyList.push(item);
        } else if (historyList.length > 0 && historyList.length < 6) {
          var isContain = false;
          historyList.forEach(function (_item) {
            if (item.id === _item.id || !item.id) {
              isContain = true;
            }
          });
          if (!isContain) {
            historyList.unshift(item);
          }
        } else if (historyList.length === 6) {
          var _isContain = false;
          historyList.forEach(function (_item) {
            if (item.id === _item.id || !item.id) {
              _isContain = true;
            }
          });
          if (!_isContain) {
            historyList.pop();
            historyList.unshift(item);
          }
        }
        _wepy2.default.setStorageSync('historyCityList', historyList);
        _wepy2.default.setStorageSync('cityInfo', item);
        wx.navigateBack({
          delta: 1
        });
      },
      preventTouchMove: function preventTouchMove() {
        console.warn('此方法阻止其他事件。');
      },
      touchmove: function touchmove(e) {
        // this.scrollIntoView = ''
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        // 判断触摸点是否在x轴上
        if (x >= this.lettersPosition[0][0]) {
          for (var i = 0, len = this.lettersPosition.length; i < len; i++) {
            var _y = this.lettersPosition[i][1],
                //每一格y轴的值
            __y = _y + this.eachLetterHeight; // 当前最大y轴高度
            if (y >= _y && y <= __y) {
              this.scrollIntoView = this.cityList[i][0];
              break;
            }
          }
        } else {
          this.scrollIntoView = '';
        }
      },
      selectedItem: function selectedItem(item) {
        this.scrollIntoView = item[0];
        this.$apply();
      },
      touchend: function touchend(e) {
        var _this2 = this;

        setTimeout(function () {
          _this2.scrollIntoView = '';
          _this2.$apply();
        }, 50);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(City, [{
    key: "onLoad",
    value: function onLoad() {
      var _this3 = this;

      this.scrollHeight = (0, _wxSystem.changePXToRPX)((0, _wxSystem.getSysHeight)()) - 88;
      _wepy2.default.showLoading({
        title: '加载中...'
      });
      this.loading = false;
      (0, _index.findRegions)().then(function (data) {
        var formatCityList = [];
        if (Array.isArray(data) && data.length > 0) {
          var tempObj = {};
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var item = _step.value;

              var firstLetter = typeof item.pinyin === 'string' && item.pinyin.length > 0 ? item.pinyin.slice(0, 1).toUpperCase() : '';
              if (firstLetter !== '') {
                if (tempObj[firstLetter] !== undefined) {
                  tempObj[firstLetter].push(item);
                } else {
                  tempObj[firstLetter] = [item];
                }
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = Object.keys(tempObj)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var i = _step2.value;

              formatCityList.push([i, tempObj[i]]);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          formatCityList.sort(function (pre, next) {
            return pre[0].charCodeAt() - next[0].charCodeAt();
          });
          _this3.cityList = formatCityList;
          // 每一小格的高度
          _this3.eachLetterHeight = (0, _wxSystem.changeRPXToPX)(36);
          var fullHeight = _this3.cityList.length * _this3.eachLetterHeight;
          _this3.comTop = (0, _wxSystem.changePXToRPX)(((0, _wxSystem.getSysHeight)() - fullHeight) / 2);
          // 顶部距离
          var comTop = (0, _wxSystem.changeRPXToPX)(_this3.comTop);
          _this3.lettersPosition = [];
          // 求各字母距离设备左上角所处位置
          for (var _i = 0, len = _this3.cityList.length; _i < len; _i++) {
            var x = (0, _wxSystem.getSysWidth)() - (0, _wxSystem.changeRPXToPX)(50);
            var y = comTop + _i * _this3.eachLetterHeight;
            _this3.lettersPosition.push([x, y]);
          }
        }
        _this3.loading = true;
        _this3.$apply();
        _wepy2.default.hideLoading();
      });
    }
  }, {
    key: "onShow",
    value: function onShow() {
      this.historyList = _wepy2.default.getStorageSync('historyCityList') || [];
      this.$apply();
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
  }, {
    key: "getSearchList",
    value: function getSearchList(text, list, canSearchSpell) {
      var reg1 = /^\w+$/g;
      var reg2 = new RegExp("^" + text, 'g');
      var reg3 = new RegExp("^[\\u4E00-\\u9FFF]{1,}$", 'g');
      var reg4 = new RegExp("^" + text, 'g');
      var resList = [];
      if (text.match(reg1) && canSearchSpell) {
        for (var i = 0, len1 = list.length; i < len1; i++) {
          for (var j = 0, len2 = list[i][1].length; j < len2; j++) {
            if (list[i][1][j].pinyin.toLowerCase().match(reg2)) {
              resList.push(list[i][1][j]);
            }
          }
        }
      } else {
        if (reg3.test(text)) {
          for (var _i2 = 0, _len2 = list.length; _i2 < _len2; _i2++) {
            for (var _j = 0, _len3 = list[_i2][1].length; _j < _len3; _j++) {
              if (list[_i2][1][_j].name.match(reg4)) {
                resList.push(list[_i2][1][_j]);
              }
            }
          }
        }
      }
      return resList;
    }
  }]);

  return City;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(City , 'pages/city'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNpdHkuanMiXSwibmFtZXMiOlsicXFtYXBzZGsiLCJDaXR5IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJkYXRhIiwic2VhcmNoRm9jdXMiLCJzY3JvbGxIZWlnaHQiLCJlYWNoTGV0dGVySGVpZ2h0IiwiY29tVG9wIiwibGV0dGVyc1Bvc2l0aW9uIiwic2Nyb2xsSW50b1ZpZXciLCJjaXR5TGlzdCIsInNlYXJjaExpc3QiLCJoaXN0b3J5TGlzdCIsImhvdENpdHlMaXN0IiwiaWQiLCJuYW1lIiwicGlueWluIiwiYWNyb255bSIsInJhbmsiLCJmaXJzdENoYXIiLCJsYXQiLCJsbmciLCJrZXl3b3JkIiwibG9hZGluZyIsImNvbXB1dGVkIiwid2F0Y2giLCJtZXRob2RzIiwiJGFwcGx5IiwiaGFuZGxlQ2FuY2VsIiwic2VhcmNoSW5wdXQiLCJlIiwiZGV0YWlsIiwidmFsdWUiLCJnZXRTZWFyY2hMaXN0IiwiaGFuZGxlRGVsZXRlS2V5d29yZCIsImhhbmRsZUNpdHkiLCJpdGVtIiwid2VweSIsImdldFN0b3JhZ2VTeW5jIiwibGVuZ3RoIiwicHVzaCIsImlzQ29udGFpbiIsImZvckVhY2giLCJfaXRlbSIsInVuc2hpZnQiLCJwb3AiLCJzZXRTdG9yYWdlU3luYyIsInd4IiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJwcmV2ZW50VG91Y2hNb3ZlIiwiY29uc29sZSIsIndhcm4iLCJ0b3VjaG1vdmUiLCJ4IiwidG91Y2hlcyIsImNsaWVudFgiLCJ5IiwiY2xpZW50WSIsImkiLCJsZW4iLCJfeSIsIl9feSIsInNlbGVjdGVkSXRlbSIsInRvdWNoZW5kIiwic2V0VGltZW91dCIsInNob3dMb2FkaW5nIiwidGl0bGUiLCJ0aGVuIiwiZm9ybWF0Q2l0eUxpc3QiLCJBcnJheSIsImlzQXJyYXkiLCJ0ZW1wT2JqIiwiZmlyc3RMZXR0ZXIiLCJzbGljZSIsInRvVXBwZXJDYXNlIiwidW5kZWZpbmVkIiwiT2JqZWN0Iiwia2V5cyIsInNvcnQiLCJwcmUiLCJuZXh0IiwiY2hhckNvZGVBdCIsImZ1bGxIZWlnaHQiLCJoaWRlTG9hZGluZyIsInNob3dOYXZpZ2F0aW9uQmFyTG9hZGluZyIsInN0b3BQdWxsRG93blJlZnJlc2giLCJoaWRlTmF2aWdhdGlvbkJhckxvYWRpbmciLCJ0ZXh0IiwibGlzdCIsImNhblNlYXJjaFNwZWxsIiwicmVnMSIsInJlZzIiLCJSZWdFeHAiLCJyZWczIiwicmVnNCIsInJlc0xpc3QiLCJtYXRjaCIsImxlbjEiLCJqIiwibGVuMiIsInRvTG93ZXJDYXNlIiwidGVzdCIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7O0FBR0E7Ozs7Ozs7Ozs7QUFNQSxJQUFJQSxRQUFKOztJQUNxQkMsSTs7Ozs7Ozs7Ozs7Ozs7a0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBRGpCLEssUUFHVEMsVSxHQUFhLEUsUUFDYkMsSSxHQUFPO0FBQ0xDLG1CQUFhLEtBRFI7QUFFTEMsb0JBQWMsQ0FGVDtBQUdMQyx3QkFBa0IsQ0FIYjtBQUlMQyxjQUFRLEdBSkg7QUFLTEMsdUJBQWlCLEVBTFo7QUFNTEMsc0JBQWdCLEVBTlg7QUFPTEMsZ0JBQVUsRUFQTDtBQVFMQyxrQkFBWSxFQVJQO0FBU0xDLG1CQUFhLEVBVFI7QUFVTEMsbUJBQWEsQ0FBQztBQUNaQyxZQUFJLENBRFE7QUFFWkMsY0FBTSxJQUZNO0FBR1pDLGdCQUFRLFNBSEk7QUFJWkMsaUJBQVMsSUFKRztBQUtaQyxjQUFNLEdBTE07QUFNWkMsbUJBQVcsR0FOQztBQU9aQyxhQUFLLFdBUE87QUFRWkMsYUFBSztBQVJPLE9BQUQsRUFTVjtBQUNEUCxZQUFJLE1BREg7QUFFREMsY0FBTSxJQUZMO0FBR0RDLGdCQUFRLFVBSFA7QUFJREMsaUJBQVMsSUFKUjtBQUtEQyxjQUFNLEdBTEw7QUFNREMsbUJBQVcsR0FOVjtBQU9EQyxhQUFLLFdBUEo7QUFRREMsYUFBSztBQVJKLE9BVFUsRUFrQlY7QUFDRFAsWUFBSSxNQURIO0FBRURD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QUFXcEIsTUFBbEMsRUFBMEM0RCxJQUFJQyxJQUE5QyxFQUFvREQsR0FBcEQsRUFBeUQ7QUFDdkQsZ0JBQUlWLEtBQUs5QixDQUFMLEVBQVEsQ0FBUixFQUFXd0MsQ0FBWCxFQUFjbkYsTUFBZCxDQUFxQnFGLFdBQXJCLEdBQW1DSixLQUFuQyxDQUF5Q0wsSUFBekMsQ0FBSixFQUFvRDtBQUNsREksc0JBQVF4RCxJQUFSLENBQWFpRCxLQUFLOUIsQ0FBTCxFQUFRLENBQVIsRUFBV3dDLENBQVgsQ0FBYjtBQUNEO0FBQ0Y7QUFDRjtBQUNGLE9BUkQsTUFRTztBQUNMLFlBQUlMLEtBQUtRLElBQUwsQ0FBVWQsSUFBVixDQUFKLEVBQXFCO0FBQ25CLGVBQUssSUFBSTdCLE1BQUksQ0FBUixFQUFXdUMsUUFBT1QsS0FBS2xELE1BQTVCLEVBQW9Db0IsTUFBSXVDLEtBQXhDLEVBQThDdkMsS0FBOUMsRUFBbUQ7QUFDakQsaUJBQUssSUFBSXdDLEtBQUksQ0FBUixFQUFXQyxRQUFPWCxLQUFLOUIsR0FBTCxFQUFRLENBQVIsRUFBV3BCLE1BQWxDLEVBQTBDNEQsS0FBSUMsS0FBOUMsRUFBb0RELElBQXBELEVBQXlEO0FBQ3ZELGtCQUFJVixLQUFLOUIsR0FBTCxFQUFRLENBQVIsRUFBV3dDLEVBQVgsRUFBY3BGLElBQWQsQ0FBbUJrRixLQUFuQixDQUF5QkYsSUFBekIsQ0FBSixFQUFvQztBQUNsQ0Msd0JBQVF4RCxJQUFSLENBQWFpRCxLQUFLOUIsR0FBTCxFQUFRLENBQVIsRUFBV3dDLEVBQVgsQ0FBYjtBQUNEO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Y7QUFDRCxhQUFPSCxPQUFQO0FBQ0Q7Ozs7RUFoUCtCM0QsZUFBS2tFLEk7O2tCQUFsQnhHLEkiLCJmaWxlIjoiY2l0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xuICBpbXBvcnQge1xuICAgIGZpbmRSZWdpb25zXG4gIH0gZnJvbSBcIi4uL3NlcnZlci9pbmRleC5qc1wiO1xuICBpbXBvcnQge1xuICAgIGdldFN5c1dpZHRoLFxuICAgIGdldFN5c0hlaWdodCxcbiAgICBjaGFuZ2VQWFRvUlBYLFxuICAgIGNoYW5nZVJQWFRvUFhcbiAgfSBmcm9tICcuLi9saWIvd3gtc3lzdGVtLmpzJ1xuICB2YXIgcXFtYXBzZGs7XG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIENpdHkgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6IFwi6aaW6aG1XCJcbiAgICB9O1xuICAgIGNvbXBvbmVudHMgPSB7fTtcbiAgICBkYXRhID0ge1xuICAgICAgc2VhcmNoRm9jdXM6IGZhbHNlLFxuICAgICAgc2Nyb2xsSGVpZ2h0OiAwLFxuICAgICAgZWFjaExldHRlckhlaWdodDogMCxcbiAgICAgIGNvbVRvcDogMTIwLFxuICAgICAgbGV0dGVyc1Bvc2l0aW9uOiBbXSxcbiAgICAgIHNjcm9sbEludG9WaWV3OiAnJyxcbiAgICAgIGNpdHlMaXN0OiBbXSxcbiAgICAgIHNlYXJjaExpc3Q6IFtdLFxuICAgICAgaGlzdG9yeUxpc3Q6IFtdLFxuICAgICAgaG90Q2l0eUxpc3Q6IFt7XG4gICAgICAgIGlkOiAyLFxuICAgICAgICBuYW1lOiAn5YyX5LqsJyxcbiAgICAgICAgcGlueWluOiAnYmVpamluZycsXG4gICAgICAgIGFjcm9ueW06ICdiaicsXG4gICAgICAgIHJhbms6ICdTJyxcbiAgICAgICAgZmlyc3RDaGFyOiAnQicsXG4gICAgICAgIGxhdDogJzM5LjkwNDAzMCcsXG4gICAgICAgIGxuZzogJzExNi40MDc1MjYnXG4gICAgICB9LCB7XG4gICAgICAgIGlkOiAxNjQxMzIsXG4gICAgICAgIG5hbWU6ICfkuIrmtbcnLFxuICAgICAgICBwaW55aW46ICdzaGFuZ2hhaScsXG4gICAgICAgIGFjcm9ueW06ICdzaCcsXG4gICAgICAgIHJhbms6ICdTJyxcbiAgICAgICAgZmlyc3RDaGFyOiAnUycsXG4gICAgICAgIGxhdDogJzMxLjIzMDQxNicsXG4gICAgICAgIGxuZzogJzEyMS40NzM3MDEnXG4gICAgICB9LCB7XG4gICAgICAgIGlkOiA0OTA1ODgsXG4gICAgICAgIG5hbWU6ICflub/lt54nLFxuICAgICAgICBwaW55aW46ICdndWFuZ3pob3UnLFxuICAgICAgICBhY3JvbnltOiAnZ3onLFxuICAgICAgICByYW5rOiAnQScsXG4gICAgICAgIGZpcnN0Q2hhcjogJ0cnLFxuICAgICAgICBsYXQ6ICcyMy4xMjkxNjInLFxuICAgICAgICBsbmc6ICcxMTMuMjY0NDM0J1xuICAgICAgfSwge1xuICAgICAgICBpZDogNDk1MDkwLFxuICAgICAgICBuYW1lOiAn5rex5ZyzJyxcbiAgICAgICAgcGlueWluOiAnc2hlbnpoZW4nLFxuICAgICAgICBhY3JvbnltOiAnc3onLFxuICAgICAgICByYW5rOiAnQScsXG4gICAgICAgIGZpcnN0Q2hhcjogJ1MnLFxuICAgICAgICBsYXQ6ICcyMi41NDMwOTknLFxuICAgICAgICBsbmc6ICcxMTQuMDU3ODY4J1xuICAgICAgfSwge1xuICAgICAgICBpZDogMTk0MjM3LFxuICAgICAgICBuYW1lOiAn5p2t5beeJyxcbiAgICAgICAgcGlueWluOiAnaGFuZ3pob3UnLFxuICAgICAgICBhY3JvbnltOiAnaHonLFxuICAgICAgICByYW5rOiAnQScsXG4gICAgICAgIGZpcnN0Q2hhcjogJ0gnLFxuICAgICAgICBsYXQ6ICczMC4yNzQwODQnLFxuICAgICAgICBsbmc6ICcxMjAuMTU1MDcwJ1xuICAgICAgfSwge1xuICAgICAgICBpZDogbnVsbCxcbiAgICAgICAgbmFtZTogJ+WFqOmDqCcsXG4gICAgICAgIHBpbnlpbjogbnVsbCxcbiAgICAgICAgYWNyb255bTogbnVsbFxuICAgICAgfV0sXG4gICAgICBrZXl3b3JkOiAnJyxcbiAgICAgIGxvYWRpbmc6ZmFsc2VcbiAgICB9O1xuICAgIGNvbXB1dGVkID0ge307XG4gICAgd2F0Y2ggPSB7fTtcbiAgICBvbkxvYWQoKSB7XG4gICAgICB0aGlzLnNjcm9sbEhlaWdodCA9IGNoYW5nZVBYVG9SUFgoZ2V0U3lzSGVpZ2h0KCkpIC0gODg7XG4gICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfliqDovb3kuK0uLi4nXG4gICAgICB9KVxuICAgICAgdGhpcy5sb2FkaW5nID0gZmFsc2VcbiAgICAgIGZpbmRSZWdpb25zKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgbGV0IGZvcm1hdENpdHlMaXN0ID0gW11cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkgJiYgZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbGV0IHRlbXBPYmogPSB7fTtcbiAgICAgICAgICBmb3IgKGxldCBpdGVtIG9mIGRhdGEpIHtcbiAgICAgICAgICAgIGxldCBmaXJzdExldHRlciA9ICh0eXBlb2YgaXRlbS5waW55aW4gPT09ICdzdHJpbmcnICYmIGl0ZW0ucGlueWluLmxlbmd0aCA+IDApID8gaXRlbS5waW55aW4uc2xpY2UoMCwgMSkudG9VcHBlckNhc2UoKSA6ICcnXG4gICAgICAgICAgICBpZiAoZmlyc3RMZXR0ZXIgIT09ICcnKSB7XG4gICAgICAgICAgICAgIGlmICh0ZW1wT2JqW2ZpcnN0TGV0dGVyXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGVtcE9ialtmaXJzdExldHRlcl0ucHVzaChpdGVtKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRlbXBPYmpbZmlyc3RMZXR0ZXJdID0gW2l0ZW1dXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChsZXQgaSBvZiBPYmplY3Qua2V5cyh0ZW1wT2JqKSkge1xuICAgICAgICAgICAgZm9ybWF0Q2l0eUxpc3QucHVzaChbaSwgdGVtcE9ialtpXV0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGZvcm1hdENpdHlMaXN0LnNvcnQoKHByZSwgbmV4dCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHByZVswXS5jaGFyQ29kZUF0KCkgLSBuZXh0WzBdLmNoYXJDb2RlQXQoKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgdGhpcy5jaXR5TGlzdCA9IGZvcm1hdENpdHlMaXN0XG4gICAgICAgICAgLy8g5q+P5LiA5bCP5qC855qE6auY5bqmXG4gICAgICAgICAgdGhpcy5lYWNoTGV0dGVySGVpZ2h0ID0gY2hhbmdlUlBYVG9QWCgzNilcbiAgICAgICAgICBsZXQgZnVsbEhlaWdodCA9IHRoaXMuY2l0eUxpc3QubGVuZ3RoICogdGhpcy5lYWNoTGV0dGVySGVpZ2h0XG4gICAgICAgICAgdGhpcy5jb21Ub3AgPSBjaGFuZ2VQWFRvUlBYKChnZXRTeXNIZWlnaHQoKSAtIGZ1bGxIZWlnaHQpIC8gMilcbiAgICAgICAgICAvLyDpobbpg6jot53nprtcbiAgICAgICAgICBsZXQgY29tVG9wID0gY2hhbmdlUlBYVG9QWCh0aGlzLmNvbVRvcClcbiAgICAgICAgICB0aGlzLmxldHRlcnNQb3NpdGlvbiA9IFtdO1xuICAgICAgICAgIC8vIOaxguWQhOWtl+avjei3neemu+iuvuWkh+W3puS4iuinkuaJgOWkhOS9jee9rlxuICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB0aGlzLmNpdHlMaXN0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB4ID0gZ2V0U3lzV2lkdGgoKSAtIGNoYW5nZVJQWFRvUFgoNTApXG4gICAgICAgICAgICBjb25zdCB5ID0gY29tVG9wICsgKGkgKiB0aGlzLmVhY2hMZXR0ZXJIZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5sZXR0ZXJzUG9zaXRpb24ucHVzaChbeCwgeV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvYWRpbmcgPSB0cnVlXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICB9KVxuICAgIH1cbiAgICBvblNob3coKSB7XG4gICAgICB0aGlzLmhpc3RvcnlMaXN0ID0gd2VweS5nZXRTdG9yYWdlU3luYygnaGlzdG9yeUNpdHlMaXN0JykgfHwgW11cbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHNlYXJjaEZvY3VzKCkge1xuICAgICAgICB0aGlzLnNlYXJjaEZvY3VzID0gdHJ1ZVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgaGFuZGxlQ2FuY2VsKCkge1xuICAgICAgICB0aGlzLnNlYXJjaEZvY3VzID0gZmFsc2VcbiAgICAgICAgdGhpcy5rZXl3b3JkID0gJydcbiAgICAgICAgdGhpcy5zZWFyY2hMaXN0ID0gW11cbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIHNlYXJjaElucHV0KGUpIHtcbiAgICAgICAgdGhpcy5rZXl3b3JkID0gZS5kZXRhaWwudmFsdWVcbiAgICAgICAgdGhpcy5zZWFyY2hMaXN0ID0gdGhpcy5nZXRTZWFyY2hMaXN0KHRoaXMua2V5d29yZCwgdGhpcy5jaXR5TGlzdCwgdHJ1ZSlcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgfSxcbiAgICAgIGhhbmRsZURlbGV0ZUtleXdvcmQoKSB7XG4gICAgICAgIHRoaXMua2V5d29yZCA9ICcnXG4gICAgICAgIHRoaXMuc2VhcmNoTGlzdCA9IFtdXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICBoYW5kbGVDaXR5KGl0ZW0pIHtcbiAgICAgICAgbGV0IGhpc3RvcnlMaXN0ID0gd2VweS5nZXRTdG9yYWdlU3luYygnaGlzdG9yeUNpdHlMaXN0JykgfHwgW11cbiAgICAgICAgaWYgKGhpc3RvcnlMaXN0Lmxlbmd0aCA9PT0gMCAmJiAhIWl0ZW0uaWQpIHtcbiAgICAgICAgICBoaXN0b3J5TGlzdC5wdXNoKGl0ZW0pXG4gICAgICAgIH0gZWxzZSBpZiAoaGlzdG9yeUxpc3QubGVuZ3RoID4gMCAmJiBoaXN0b3J5TGlzdC5sZW5ndGggPCA2KSB7XG4gICAgICAgICAgbGV0IGlzQ29udGFpbiA9IGZhbHNlXG4gICAgICAgICAgaGlzdG9yeUxpc3QuZm9yRWFjaChfaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gX2l0ZW0uaWQgfHwgIWl0ZW0uaWQpIHtcbiAgICAgICAgICAgICAgaXNDb250YWluID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICghaXNDb250YWluKSB7XG4gICAgICAgICAgICBoaXN0b3J5TGlzdC51bnNoaWZ0KGl0ZW0pXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGhpc3RvcnlMaXN0Lmxlbmd0aCA9PT0gNikge1xuICAgICAgICAgIGxldCBpc0NvbnRhaW4gPSBmYWxzZVxuICAgICAgICAgIGhpc3RvcnlMaXN0LmZvckVhY2goX2l0ZW0gPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IF9pdGVtLmlkIHx8ICFpdGVtLmlkKSB7XG4gICAgICAgICAgICAgIGlzQ29udGFpbiA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAoIWlzQ29udGFpbikge1xuICAgICAgICAgICAgaGlzdG9yeUxpc3QucG9wKClcbiAgICAgICAgICAgIGhpc3RvcnlMaXN0LnVuc2hpZnQoaXRlbSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd2VweS5zZXRTdG9yYWdlU3luYygnaGlzdG9yeUNpdHlMaXN0JywgaGlzdG9yeUxpc3QpXG4gICAgICAgIHdlcHkuc2V0U3RvcmFnZVN5bmMoJ2NpdHlJbmZvJywgaXRlbSlcbiAgICAgICAgd3gubmF2aWdhdGVCYWNrKHtcbiAgICAgICAgICBkZWx0YTogMVxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIHByZXZlbnRUb3VjaE1vdmUoKSB7XG4gICAgICAgIGNvbnNvbGUud2Fybign5q2k5pa55rOV6Zi75q2i5YW25LuW5LqL5Lu244CCJylcbiAgICAgIH0sXG4gICAgICB0b3VjaG1vdmUoZSkge1xuICAgICAgICAvLyB0aGlzLnNjcm9sbEludG9WaWV3ID0gJydcbiAgICAgICAgY29uc3QgeCA9IGUudG91Y2hlc1swXS5jbGllbnRYXG4gICAgICAgIGNvbnN0IHkgPSBlLnRvdWNoZXNbMF0uY2xpZW50WVxuICAgICAgICAvLyDliKTmlq3op6bmkbjngrnmmK/lkKblnKh46L205LiKXG4gICAgICAgIGlmICh4ID49IHRoaXMubGV0dGVyc1Bvc2l0aW9uWzBdWzBdKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRoaXMubGV0dGVyc1Bvc2l0aW9uLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBfeSA9IHRoaXMubGV0dGVyc1Bvc2l0aW9uW2ldWzFdLCAvL+avj+S4gOagvHnovbTnmoTlgLxcbiAgICAgICAgICAgICAgX195ID0gX3kgKyB0aGlzLmVhY2hMZXR0ZXJIZWlnaHQ7IC8vIOW9k+WJjeacgOWkp3novbTpq5jluqZcbiAgICAgICAgICAgIGlmICh5ID49IF95ICYmIHkgPD0gX195KSB7XG4gICAgICAgICAgICAgIHRoaXMuc2Nyb2xsSW50b1ZpZXcgPSB0aGlzLmNpdHlMaXN0W2ldWzBdXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnNjcm9sbEludG9WaWV3ID0gJydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNlbGVjdGVkSXRlbShpdGVtKSB7XG4gICAgICAgIHRoaXMuc2Nyb2xsSW50b1ZpZXcgPSBpdGVtWzBdXG4gICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgIH0sXG4gICAgICB0b3VjaGVuZChlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2Nyb2xsSW50b1ZpZXcgPSAnJ1xuICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgfSwgNTApO1xuICAgICAgfSxcbiAgICB9O1xuICAgIG9uSGlkZSgpIHt9XG4gICAgb25VbmxvYWQoKSB7fVxuICAgIC8vIOS4i+aLieWIt+aWsOS6i+S7tlxuICAgIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgICAgd2VweS5zaG93TmF2aWdhdGlvbkJhckxvYWRpbmcoKTtcbiAgICAgIHdlcHkuc3RvcFB1bGxEb3duUmVmcmVzaCgpO1xuICAgICAgd2VweS5oaWRlTmF2aWdhdGlvbkJhckxvYWRpbmcoKTtcbiAgICB9XG4gICAgZ2V0U2VhcmNoTGlzdCh0ZXh0LCBsaXN0LCBjYW5TZWFyY2hTcGVsbCkge1xuICAgICAgY29uc3QgcmVnMSA9IC9eXFx3KyQvZztcbiAgICAgIGNvbnN0IHJlZzIgPSBuZXcgUmVnRXhwKGBeJHt0ZXh0fWAsICdnJyk7XG4gICAgICBjb25zdCByZWczID0gbmV3IFJlZ0V4cCgnXltcXFxcdTRFMDAtXFxcXHU5RkZGXXsxLH0kJywgJ2cnKTtcbiAgICAgIGNvbnN0IHJlZzQgPSBuZXcgUmVnRXhwKGBeJHt0ZXh0fWAsICdnJyk7XG4gICAgICBsZXQgcmVzTGlzdCA9IFtdO1xuICAgICAgaWYgKHRleHQubWF0Y2gocmVnMSkgJiYgY2FuU2VhcmNoU3BlbGwpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbjEgPSBsaXN0Lmxlbmd0aDsgaSA8IGxlbjE7IGkrKykge1xuICAgICAgICAgIGZvciAobGV0IGogPSAwLCBsZW4yID0gbGlzdFtpXVsxXS5sZW5ndGg7IGogPCBsZW4yOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChsaXN0W2ldWzFdW2pdLnBpbnlpbi50b0xvd2VyQ2FzZSgpLm1hdGNoKHJlZzIpKSB7XG4gICAgICAgICAgICAgIHJlc0xpc3QucHVzaChsaXN0W2ldWzFdW2pdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyZWczLnRlc3QodGV4dCkpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuMSA9IGxpc3QubGVuZ3RoOyBpIDwgbGVuMTsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMCwgbGVuMiA9IGxpc3RbaV1bMV0ubGVuZ3RoOyBqIDwgbGVuMjsgaisrKSB7XG4gICAgICAgICAgICAgIGlmIChsaXN0W2ldWzFdW2pdLm5hbWUubWF0Y2gocmVnNCkpIHtcbiAgICAgICAgICAgICAgICByZXNMaXN0LnB1c2gobGlzdFtpXVsxXVtqXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNMaXN0O1xuICAgIH1cbiAgfVxuIl19