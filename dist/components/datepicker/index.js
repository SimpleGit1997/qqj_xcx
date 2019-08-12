'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wxSystem = require('./../../lib/wx-system.js');

var _utils = require('./../../lib/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var date = function (_wepy$component) {
  _inherits(date, _wepy$component);

  function date() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, date);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = date.__proto__ || Object.getPrototypeOf(date)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.data = {
      dateList: []
    }, _this.watch = {
      value: function value(newValue, oldValue) {
        if (this.value) {
          this.changeDateOBj();
        }
      }
    }, _this.props = {
      color: {
        type: String,
        default: '#FF6600'
      },
      months: {
        type: String,
        default: '2'
      },
      type: {
        type: String,
        default: 'daterange'
      },
      value: {
        type: Array,
        default: [],
        twoWay: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }, _this.computed = {
      getDays: function getDays() {
        var days = 0;
        if (this.type == 'daterange' && this.value.length === 2) {
          this.dateList.forEach(function (item, index) {
            item.dateList.forEach(function (_item, _index) {
              if (!!_item._class) {
                days++;
              }
            });
          });
        }
        return days;
      }
    }, _this.methods = {
      handleDate: function handleDate(e) {
        var index = e.currentTarget.dataset.index;
        var _index = e.currentTarget.dataset._index;
        var value = this.dateList[index].dateList[_index].formatDate;
        this._setValue(value);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(date, [{
    key: 'onLoad',
    value: function onLoad() {
      var dateList = this._getDateList();
      this.dateList = dateList;
      this.$apply();
      this.setDescribe();
      this.setDisabled();
      if (this.value) {
        this.changeDateOBj();
      }
    }
  }, {
    key: 'setDescribe',

    /**
     * 设置描述 今天 明天 后天
     */
    value: function setDescribe() {
      var currentDate = new Date();
      var currentStamp = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).valueOf();
      this.dateList.forEach(function (item) {
        item.dateList.forEach(function (_item) {
          var timeStamp = _item.dateObj.valueOf();
          if (currentStamp == timeStamp) {
            _item.describe = '今天';
          } else if (currentStamp + 24 * 60 * 60 * 1000 == timeStamp) {
            _item.describe = '明天';
          } else if (currentStamp + 24 * 60 * 60 * 1000 * 2 == timeStamp) {
            _item.describe = '后天';
          }
        });
      });
      this.$apply();
    }
    /**
     * 禁用日期
     */

  }, {
    key: 'setDisabled',
    value: function setDisabled() {
      var _this2 = this;

      // 获取当前日期的周日
      var currentWeek = new Date().getDay();
      var currentDate = new Date();
      var currentStamp = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()).valueOf();
      var smallTimeStamp = new Date(currentStamp - 24 * 60 * 60 * 1000 * currentWeek).valueOf();
      this.dateList.forEach(function (item) {
        item.dateList.forEach(function (_item) {
          var timeStamp = _item.dateObj.valueOf();
          // 是否显示区域日期
          if (_this2.disabled) {
            if (timeStamp < smallTimeStamp) {
              _item.disabled = true;
              _item.show = false;
            } else {
              _item.disabled = false;
              _item.show = true;
            }
          } else {
            if (timeStamp < currentStamp) {
              _item.disabled = true;
            } else {
              _item.disabled = false;
            }
            _item.show = true;
          }
        });
      });
      this.$apply();
    }
    /**
     * 更新对象
     */

  }, {
    key: 'changeDateOBj',
    value: function changeDateOBj() {
      var _this3 = this;

      var value = this.value;
      this.dateList.forEach(function (item, index) {
        item.dateList.forEach(function (_item, _index) {
          _item._class = null;
          _item._style = null;
          var timeStamp = _item.dateObj.valueOf();
          var firstValue = '';
          var secondValue = '';
          if (_this3.type == 'daterange') {
            if (value[0]) {
              firstValue = new Date(value[0].replace(/-/gi, '/')).valueOf();
            }
            if (value[1]) {
              secondValue = new Date(value[1].replace(/-/gi, '/')).valueOf();
            }
            if (firstValue == timeStamp) {
              _item._class = 'double-checked-first';
              _item._style = 'background:' + _this3.color + ';';
            } else if (secondValue == timeStamp) {
              _item._class = 'double-checked-second';
              _item._style = 'background:' + _this3.color + ';';
            }
            if (firstValue < timeStamp && timeStamp < secondValue) {
              _item._class = 'double-checked-mid';
            }
          } else if (_this3.type == 'date') {
            var _firstValue = new Date(value.replace(/-/gi, '/')).valueOf();
            if (_firstValue == timeStamp) {
              _item._class = 'default-checked';
              _item._style = 'background:' + _this3.color + ';';
            }
          }
        });
      });
      this.$apply();
    }
    /**
     * 获取日期列表
     * dateLabel:年月
     * day:本月的第一天是周几
     * dateList:{年:year,月:month,日:date ,周:day(0~6),formatDate:格式化日期,是否当前天:isCurrentDate}
     */

  }, {
    key: '_getDateList',
    value: function _getDateList() {
      var dateList = [];
      var months = Number(this.months);
      console.log(months);
      if (months && months > 0) {
        var currentDateObj = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
        var currentYear = currentDateObj.getFullYear();
        var currentMonth = currentDateObj.getMonth() + 1;
        var currentDate = currentDateObj.getDate();
        for (var i = 0; i < months; i++) {
          if (currentMonth > 12) {
            currentYear += 1;
            currentMonth = 1;
          }
          // 获取当月天数
          var dates = new Date(currentYear, currentMonth, 0).getDate();
          var _dateList = [];
          for (var _date = 1; _date <= dates; _date++) {
            var _dateObj = new Date(currentYear + '/' + currentMonth + '/' + _date);
            // 创建日期对象
            var obj = {
              year: currentYear,
              month: currentMonth,
              date: _date,
              day: new Date(currentYear, currentMonth - 1, _date).getDay(),
              dateObj: _dateObj,
              formatDate: currentYear + '/' + currentMonth + '/' + _date
            };
            _dateList.push(obj);
          }
          // 创建列表对象
          var dateObj = {
            dateLabel: currentYear + '年' + currentMonth + '月',
            dateList: _dateList
          };
          dateList.push(dateObj);
          currentMonth++;
        }
      } else {
        console.error('\u201Cmonth\u201D\u5C5E\u6027\u4F20\u503C\u4E0D\u5BF9\uFF0C\u8BF7\u4F20\u5165\u6B63\u786E\u7684\u6570\u503C');
        return;
      }
      console.log(dateList);
      return dateList;
    }
  }, {
    key: '_setValue',
    value: function _setValue(value) {
      if (this.type == 'daterange') {
        if (this.value.length == 0) {
          this.value.push(value);
        } else if (this.value.length == 1) {
          var firstStamp = new Date(this.value[0].replace(/-/gi, '/'));
          var secondStamp = new Date(value.replace(/-/gi, '/'));
          if (firstStamp < secondStamp) {
            this.value.push(value);
          } else {
            this.value.unshift(value);
          }
        } else if (this.value.length == 2) {
          this.value = [];
          this.value.push(value);
        }
        this.$emit('closeDialog', this.value);
        this.changeDateOBj();
      } else if (this.type == 'date') {
        this.value = value;
        this.changeDateOBj();
      }
    }
  }]);

  return date;
}(_wepy2.default.component);

exports.default = date;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImRhdGUiLCJjb21wb25lbnRzIiwiZGF0YSIsImRhdGVMaXN0Iiwid2F0Y2giLCJ2YWx1ZSIsIm5ld1ZhbHVlIiwib2xkVmFsdWUiLCJjaGFuZ2VEYXRlT0JqIiwicHJvcHMiLCJjb2xvciIsInR5cGUiLCJTdHJpbmciLCJkZWZhdWx0IiwibW9udGhzIiwiQXJyYXkiLCJ0d29XYXkiLCJkaXNhYmxlZCIsIkJvb2xlYW4iLCJjb21wdXRlZCIsImdldERheXMiLCJkYXlzIiwibGVuZ3RoIiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsIl9pdGVtIiwiX2luZGV4IiwiX2NsYXNzIiwibWV0aG9kcyIsImhhbmRsZURhdGUiLCJlIiwiY3VycmVudFRhcmdldCIsImRhdGFzZXQiLCJmb3JtYXREYXRlIiwiX3NldFZhbHVlIiwiZXZlbnRzIiwiX2dldERhdGVMaXN0IiwiJGFwcGx5Iiwic2V0RGVzY3JpYmUiLCJzZXREaXNhYmxlZCIsImN1cnJlbnREYXRlIiwiRGF0ZSIsImN1cnJlbnRTdGFtcCIsImdldEZ1bGxZZWFyIiwiZ2V0TW9udGgiLCJnZXREYXRlIiwidmFsdWVPZiIsInRpbWVTdGFtcCIsImRhdGVPYmoiLCJkZXNjcmliZSIsImN1cnJlbnRXZWVrIiwiZ2V0RGF5Iiwic21hbGxUaW1lU3RhbXAiLCJzaG93IiwiX3N0eWxlIiwiZmlyc3RWYWx1ZSIsInNlY29uZFZhbHVlIiwicmVwbGFjZSIsIk51bWJlciIsImNvbnNvbGUiLCJsb2ciLCJjdXJyZW50RGF0ZU9iaiIsImN1cnJlbnRZZWFyIiwiY3VycmVudE1vbnRoIiwiaSIsImRhdGVzIiwiX2RhdGVMaXN0IiwiX2RhdGVPYmoiLCJvYmoiLCJ5ZWFyIiwibW9udGgiLCJkYXkiLCJwdXNoIiwiZGF0ZUxhYmVsIiwiZXJyb3IiLCJmaXJzdFN0YW1wIiwic2Vjb25kU3RhbXAiLCJ1bnNoaWZ0IiwiJGVtaXQiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7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RDtBQUNGOzs7O0VBM1ArQndFLGVBQUtDLFM7O2tCQUFsQmpGLEkiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSc7XG4gIGltcG9ydCB7XG4gICAgZ2V0U3lzV2lkdGhcbiAgfSBmcm9tICcuLi8uLi9saWIvd3gtc3lzdGVtLmpzJztcbiAgaW1wb3J0IHtcbiAgICBnZXRNb250aFxuICB9IGZyb20gJy4uLy4uL2xpYi91dGlscy5qcyc7XG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIGRhdGUgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgY29tcG9uZW50cyA9IHt9O1xuICAgIGRhdGEgPSB7XG4gICAgICBkYXRlTGlzdDogW11cbiAgICB9O1xuICAgIHdhdGNoID0ge1xuICAgICAgdmFsdWUobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VEYXRlT0JqKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHByb3BzID0ge1xuICAgICAgY29sb3I6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBkZWZhdWx0OiAnI0ZGNjYwMCdcbiAgICAgIH0sXG4gICAgICBtb250aHM6IHtcbiAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICBkZWZhdWx0OiAnMidcbiAgICAgIH0sXG4gICAgICB0eXBlOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdDogJ2RhdGVyYW5nZSdcbiAgICAgIH0sXG4gICAgICB2YWx1ZToge1xuICAgICAgICB0eXBlOiBBcnJheSxcbiAgICAgICAgZGVmYXVsdDogW10sXG4gICAgICAgIHR3b1dheTogdHJ1ZVxuICAgICAgfSxcbiAgICAgIGRpc2FibGVkOiB7XG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlXG4gICAgICB9XG4gICAgfTtcbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIGdldERheXMoKSB7XG4gICAgICAgIGxldCBkYXlzID0gMDtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnZGF0ZXJhbmdlJyAmJiB0aGlzLnZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIHRoaXMuZGF0ZUxpc3QuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGl0ZW0uZGF0ZUxpc3QuZm9yRWFjaCgoX2l0ZW0sIF9pbmRleCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoISFfaXRlbS5fY2xhc3MpIHtcbiAgICAgICAgICAgICAgICBkYXlzKys7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXlzO1xuICAgICAgfVxuICAgIH07XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGhhbmRsZURhdGUoZSkge1xuICAgICAgICBsZXQgaW5kZXggPSBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pbmRleDtcbiAgICAgICAgbGV0IF9pbmRleCA9IGUuY3VycmVudFRhcmdldC5kYXRhc2V0Ll9pbmRleDtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5kYXRlTGlzdFtpbmRleF0uZGF0ZUxpc3RbX2luZGV4XS5mb3JtYXREYXRlO1xuICAgICAgICB0aGlzLl9zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBvbkxvYWQoKSB7XG4gICAgICBsZXQgZGF0ZUxpc3QgPSB0aGlzLl9nZXREYXRlTGlzdCgpO1xuICAgICAgdGhpcy5kYXRlTGlzdCA9IGRhdGVMaXN0O1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIHRoaXMuc2V0RGVzY3JpYmUoKTtcbiAgICAgIHRoaXMuc2V0RGlzYWJsZWQoKTtcbiAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlRGF0ZU9CaigpO1xuICAgICAgfVxuICAgIH1cbiAgICBldmVudHMgPSB7fTtcbiAgICAvKipcbiAgICAgKiDorr7nva7mj4/ov7Ag5LuK5aSpIOaYjuWkqSDlkI7lpKlcbiAgICAgKi9cbiAgICBzZXREZXNjcmliZSgpIHtcbiAgICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICBsZXQgY3VycmVudFN0YW1wID0gbmV3IERhdGUoXG4gICAgICAgIGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgIGN1cnJlbnREYXRlLmdldE1vbnRoKCksXG4gICAgICAgIGN1cnJlbnREYXRlLmdldERhdGUoKVxuICAgICAgKS52YWx1ZU9mKCk7XG4gICAgICB0aGlzLmRhdGVMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uZGF0ZUxpc3QuZm9yRWFjaChfaXRlbSA9PiB7XG4gICAgICAgICAgbGV0IHRpbWVTdGFtcCA9IF9pdGVtLmRhdGVPYmoudmFsdWVPZigpO1xuICAgICAgICAgIGlmIChjdXJyZW50U3RhbXAgPT0gdGltZVN0YW1wKSB7XG4gICAgICAgICAgICBfaXRlbS5kZXNjcmliZSA9ICfku4rlpKknO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YW1wICsgMjQgKiA2MCAqIDYwICogMTAwMCA9PSB0aW1lU3RhbXApIHtcbiAgICAgICAgICAgIF9pdGVtLmRlc2NyaWJlID0gJ+aYjuWkqSc7XG4gICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50U3RhbXAgKyAyNCAqIDYwICogNjAgKiAxMDAwICogMiA9PSB0aW1lU3RhbXApIHtcbiAgICAgICAgICAgIF9pdGVtLmRlc2NyaWJlID0gJ+WQjuWkqSc7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog56aB55So5pel5pyfXG4gICAgICovXG4gICAgc2V0RGlzYWJsZWQoKSB7XG4gICAgICAvLyDojrflj5blvZPliY3ml6XmnJ/nmoTlkajml6VcbiAgICAgIGxldCBjdXJyZW50V2VlayA9IG5ldyBEYXRlKCkuZ2V0RGF5KCk7XG4gICAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgbGV0IGN1cnJlbnRTdGFtcCA9IG5ldyBEYXRlKFxuICAgICAgICBjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICBjdXJyZW50RGF0ZS5nZXRNb250aCgpLFxuICAgICAgICBjdXJyZW50RGF0ZS5nZXREYXRlKClcbiAgICAgICkudmFsdWVPZigpO1xuICAgICAgbGV0IHNtYWxsVGltZVN0YW1wID0gbmV3IERhdGUoXG4gICAgICAgIGN1cnJlbnRTdGFtcCAtIDI0ICogNjAgKiA2MCAqIDEwMDAgKiBjdXJyZW50V2Vla1xuICAgICAgKS52YWx1ZU9mKCk7XG4gICAgICB0aGlzLmRhdGVMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0uZGF0ZUxpc3QuZm9yRWFjaChfaXRlbSA9PiB7XG4gICAgICAgICAgbGV0IHRpbWVTdGFtcCA9IF9pdGVtLmRhdGVPYmoudmFsdWVPZigpO1xuICAgICAgICAgIC8vIOaYr+WQpuaYvuekuuWMuuWfn+aXpeacn1xuICAgICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBpZiAodGltZVN0YW1wIDwgc21hbGxUaW1lU3RhbXApIHtcbiAgICAgICAgICAgICAgX2l0ZW0uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBfaXRlbS5zaG93ID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfaXRlbS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICBfaXRlbS5zaG93ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRpbWVTdGFtcCA8IGN1cnJlbnRTdGFtcCkge1xuICAgICAgICAgICAgICBfaXRlbS5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfaXRlbS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2l0ZW0uc2hvdyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5pu05paw5a+56LGhXG4gICAgICovXG4gICAgY2hhbmdlRGF0ZU9CaigpIHtcbiAgICAgIGxldCB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICB0aGlzLmRhdGVMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICAgIGl0ZW0uZGF0ZUxpc3QuZm9yRWFjaCgoX2l0ZW0sIF9pbmRleCkgPT4ge1xuICAgICAgICAgIF9pdGVtLl9jbGFzcyA9IG51bGw7XG4gICAgICAgICAgX2l0ZW0uX3N0eWxlID0gbnVsbDtcbiAgICAgICAgICBsZXQgdGltZVN0YW1wID0gX2l0ZW0uZGF0ZU9iai52YWx1ZU9mKCk7XG4gICAgICAgICAgbGV0IGZpcnN0VmFsdWUgPSAnJztcbiAgICAgICAgICBsZXQgc2Vjb25kVmFsdWUgPSAnJztcbiAgICAgICAgICBpZiAodGhpcy50eXBlID09ICdkYXRlcmFuZ2UnKSB7XG4gICAgICAgICAgICBpZiAodmFsdWVbMF0pIHtcbiAgICAgICAgICAgICAgZmlyc3RWYWx1ZSA9IG5ldyBEYXRlKHZhbHVlWzBdLnJlcGxhY2UoLy0vZ2ksICcvJykpLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWx1ZVsxXSkge1xuICAgICAgICAgICAgICBzZWNvbmRWYWx1ZSA9IG5ldyBEYXRlKHZhbHVlWzFdLnJlcGxhY2UoLy0vZ2ksICcvJykpLnZhbHVlT2YoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdFZhbHVlID09IHRpbWVTdGFtcCkge1xuICAgICAgICAgICAgICBfaXRlbS5fY2xhc3MgPSAnZG91YmxlLWNoZWNrZWQtZmlyc3QnO1xuICAgICAgICAgICAgICBfaXRlbS5fc3R5bGUgPSAnYmFja2dyb3VuZDonICsgdGhpcy5jb2xvciArICc7JztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2Vjb25kVmFsdWUgPT0gdGltZVN0YW1wKSB7XG4gICAgICAgICAgICAgIF9pdGVtLl9jbGFzcyA9ICdkb3VibGUtY2hlY2tlZC1zZWNvbmQnO1xuICAgICAgICAgICAgICBfaXRlbS5fc3R5bGUgPSAnYmFja2dyb3VuZDonICsgdGhpcy5jb2xvciArICc7JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmaXJzdFZhbHVlIDwgdGltZVN0YW1wICYmIHRpbWVTdGFtcCA8IHNlY29uZFZhbHVlKSB7XG4gICAgICAgICAgICAgIF9pdGVtLl9jbGFzcyA9ICdkb3VibGUtY2hlY2tlZC1taWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09ICdkYXRlJykge1xuICAgICAgICAgICAgbGV0IGZpcnN0VmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZS5yZXBsYWNlKC8tL2dpLCAnLycpKS52YWx1ZU9mKCk7XG4gICAgICAgICAgICBpZiAoZmlyc3RWYWx1ZSA9PSB0aW1lU3RhbXApIHtcbiAgICAgICAgICAgICAgX2l0ZW0uX2NsYXNzID0gJ2RlZmF1bHQtY2hlY2tlZCc7XG4gICAgICAgICAgICAgIF9pdGVtLl9zdHlsZSA9ICdiYWNrZ3JvdW5kOicgKyB0aGlzLmNvbG9yICsgJzsnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPluaXpeacn+WIl+ihqFxuICAgICAqIGRhdGVMYWJlbDrlubTmnIhcbiAgICAgKiBkYXk6XGLmnKzmnIjnmoTnrKzkuIDlpKnmmK/lkajlh6BcbiAgICAgKiBkYXRlTGlzdDp75bm0OnllYXIs5pyIOm1vbnRoLOaXpTpkYXRlICzlkag6ZGF5KDB+NiksZm9ybWF0RGF0ZTrmoLzlvI/ljJbml6XmnJ8s5piv5ZCm5b2T5YmN5aSpOmlzQ3VycmVudERhdGV9XG4gICAgICovXG4gICAgX2dldERhdGVMaXN0KCkge1xuICAgICAgbGV0IGRhdGVMaXN0ID0gW107XG4gICAgICBsZXQgbW9udGhzID0gTnVtYmVyKHRoaXMubW9udGhzKTtcbiAgICAgIGNvbnNvbGUubG9nKG1vbnRocylcbiAgICAgIGlmIChtb250aHMgJiYgbW9udGhzID4gMCkge1xuICAgICAgICBsZXQgY3VycmVudERhdGVPYmogPSBuZXcgRGF0ZShcbiAgICAgICAgICBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksXG4gICAgICAgICAgbmV3IERhdGUoKS5nZXRNb250aCgpLFxuICAgICAgICAgIG5ldyBEYXRlKCkuZ2V0RGF0ZSgpXG4gICAgICAgICk7XG4gICAgICAgIGxldCBjdXJyZW50WWVhciA9IGN1cnJlbnREYXRlT2JqLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIGxldCBjdXJyZW50TW9udGggPSBjdXJyZW50RGF0ZU9iai5nZXRNb250aCgpICsgMTtcbiAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gY3VycmVudERhdGVPYmouZ2V0RGF0ZSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vbnRoczsgaSsrKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRNb250aCA+IDEyKSB7XG4gICAgICAgICAgICBjdXJyZW50WWVhciArPSAxO1xuICAgICAgICAgICAgY3VycmVudE1vbnRoID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8g6I635Y+W5b2T5pyI5aSp5pWwXG4gICAgICAgICAgbGV0IGRhdGVzID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgMCkuZ2V0RGF0ZSgpO1xuICAgICAgICAgIGxldCBfZGF0ZUxpc3QgPSBbXTtcbiAgICAgICAgICBmb3IgKGxldCBkYXRlID0gMTsgZGF0ZSA8PSBkYXRlczsgZGF0ZSsrKSB7XG4gICAgICAgICAgICBsZXQgX2RhdGVPYmogPSBuZXcgRGF0ZShcbiAgICAgICAgICAgICAgY3VycmVudFllYXIgKyAnLycgKyBjdXJyZW50TW9udGggKyAnLycgKyBkYXRlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgLy8g5Yib5bu65pel5pyf5a+56LGhXG4gICAgICAgICAgICBsZXQgb2JqID0ge1xuICAgICAgICAgICAgICB5ZWFyOiBjdXJyZW50WWVhcixcbiAgICAgICAgICAgICAgbW9udGg6IGN1cnJlbnRNb250aCxcbiAgICAgICAgICAgICAgZGF0ZTogZGF0ZSxcbiAgICAgICAgICAgICAgZGF5OiBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoIC0gMSwgZGF0ZSkuZ2V0RGF5KCksXG4gICAgICAgICAgICAgIGRhdGVPYmo6IF9kYXRlT2JqLFxuICAgICAgICAgICAgICBmb3JtYXREYXRlOiBjdXJyZW50WWVhciArICcvJyArIGN1cnJlbnRNb250aCArICcvJyArIGRhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfZGF0ZUxpc3QucHVzaChvYmopO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyDliJvlu7rliJfooajlr7nosaFcbiAgICAgICAgICBsZXQgZGF0ZU9iaiA9IHtcbiAgICAgICAgICAgIGRhdGVMYWJlbDogY3VycmVudFllYXIgKyAn5bm0JyArIGN1cnJlbnRNb250aCArICfmnIgnLFxuICAgICAgICAgICAgZGF0ZUxpc3Q6IF9kYXRlTGlzdFxuICAgICAgICAgIH07XG4gICAgICAgICAgZGF0ZUxpc3QucHVzaChkYXRlT2JqKTtcbiAgICAgICAgICBjdXJyZW50TW9udGgrKztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihg4oCcbW9udGjigJ3lsZ7mgKfkvKDlgLzkuI3lr7nvvIzor7fkvKDlhaXmraPnoa7nmoTmlbDlgLxgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc29sZS5sb2coZGF0ZUxpc3QpO1xuICAgICAgcmV0dXJuIGRhdGVMaXN0O1xuICAgIH1cbiAgICBfc2V0VmFsdWUodmFsdWUpIHtcbiAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ2RhdGVyYW5nZScpIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLnZhbHVlLnB1c2godmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWUubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICBsZXQgZmlyc3RTdGFtcCA9IG5ldyBEYXRlKHRoaXMudmFsdWVbMF0ucmVwbGFjZSgvLS9naSwgJy8nKSk7XG4gICAgICAgICAgbGV0IHNlY29uZFN0YW1wID0gbmV3IERhdGUodmFsdWUucmVwbGFjZSgvLS9naSwgJy8nKSk7XG4gICAgICAgICAgaWYgKGZpcnN0U3RhbXAgPCBzZWNvbmRTdGFtcCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy52YWx1ZS51bnNoaWZ0KHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy52YWx1ZS5sZW5ndGggPT0gMikge1xuICAgICAgICAgIHRoaXMudmFsdWUgPSBbXTtcbiAgICAgICAgICB0aGlzLnZhbHVlLnB1c2godmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGVtaXQoJ2Nsb3NlRGlhbG9nJywgdGhpcy52YWx1ZSlcbiAgICAgICAgdGhpcy5jaGFuZ2VEYXRlT0JqKCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PSAnZGF0ZScpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB0aGlzLmNoYW5nZURhdGVPQmooKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==