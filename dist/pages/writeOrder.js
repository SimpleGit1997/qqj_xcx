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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { getOrder } from '../server/index.js'
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
      navigationBarTitleText: '填写订单',
      disableScroll: true
    }, _this.components = {
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
      }
    }, _this.data = {
      scrollHeight: 0,
      dateValue: ['2019-08-09', '2019-08-10']
    }, _this.methods = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(WriteOrder, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.scrollHeight = (0, _wxSystem.changePXToRPX)((0, _wxSystem.getSysHeight)()) - 100;
      this.$apply();
    }
  }]);

  return WriteOrder;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(WriteOrder , 'pages/writeOrder'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndyaXRlT3JkZXIuanMiXSwibmFtZXMiOlsiV3JpdGVPcmRlciIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkaXNhYmxlU2Nyb2xsIiwiY29tcG9uZW50cyIsInBvcHVwIiwiY29tcHV0ZWQiLCJmb3JtYXREYXRlIiwidmFsdWUiLCJkYXRlVmFsdWUiLCJsZW5ndGgiLCJmb3JFYWNoIiwicHVzaCIsIkRhdGUiLCJpdGVtIiwidG9TdHJpbmciLCJnZXREYXlzIiwiZGF5cyIsImZpcnN0IiwicmVwbGFjZSIsInZhbHVlT2YiLCJzZWNvbmQiLCJ0aW1lIiwiZ2V0RGVzY3JpYmUiLCJkZXNjcmliZSIsImN1cnJlbnREYXRlIiwiY3VycmVudFN0YW1wIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJkYXRhIiwic2Nyb2xsSGVpZ2h0IiwibWV0aG9kcyIsIiRhcHBseSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7O0FBTUE7Ozs7Ozs7Ozs7QUFHQTtJQUNxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLHFCQUFjO0FBRlAsSyxRQUlUQyxVLEdBQWE7QUFDWEMsYUFBT0EsZUFESSxDQUNFO0FBREYsSyxRQUdiQyxRLEdBQVc7QUFDVEMsZ0JBRFMsd0JBQ0k7QUFDWCxZQUFJQyxRQUFRLEVBQVo7QUFDQSxZQUFJLEtBQUtDLFNBQUwsQ0FBZUMsTUFBZixHQUF3QixDQUE1QixFQUErQjtBQUM3QixlQUFLRCxTQUFMLENBQWVFLE9BQWYsQ0FBdUIsZ0JBQVE7QUFDN0JILGtCQUFNSSxJQUFOLENBQVcsSUFBSUMsSUFBSixDQUFTQyxJQUFULEVBQWVDLFFBQWYsQ0FBd0IsUUFBeEIsQ0FBWDtBQUNELFdBRkQ7QUFHRDtBQUNELGVBQU9QLEtBQVA7QUFDRCxPQVRRO0FBVVRRLGFBVlMscUJBVUM7QUFDUixZQUFJQyxP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ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IHBvcHVwIGZyb20gJy4uL2NvbXBvbmVudHMvcG9wdXAvaW5kZXgnO1xuICBpbXBvcnQge1xuICAgIGdldFN5c1dpZHRoLFxuICAgIGdldFN5c0hlaWdodCxcbiAgICBjaGFuZ2VQWFRvUlBYLFxuICAgIGNoYW5nZVJQWFRvUFhcbiAgfSBmcm9tICcuLi9saWIvd3gtc3lzdGVtLmpzJ1xuICBpbXBvcnQge1xuICAgIGNhbGN1bGF0ZURpZmZUaW1lXG4gIH0gZnJvbSBcIi4uL2xpYi91dGlscy5qc1wiO1xuICAvLyBpbXBvcnQgeyBnZXRPcmRlciB9IGZyb20gJy4uL3NlcnZlci9pbmRleC5qcydcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgV3JpdGVPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+Whq+WGmeiuouWNlScsXG4gICAgICBkaXNhYmxlU2Nyb2xsOnRydWVcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICAgIHBvcHVwOiBwb3B1cCAvL+W8ueeql1xuICAgIH07XG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBmb3JtYXREYXRlKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSBbXTtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLmRhdGVWYWx1ZS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgdmFsdWUucHVzaChuZXcgRGF0ZShpdGVtKS50b1N0cmluZyhcIk1N5pyIZGTml6VcIikpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0sXG4gICAgICBnZXREYXlzKCkge1xuICAgICAgICBsZXQgZGF5cyA9IDA7XG4gICAgICAgIGlmICh0aGlzLmRhdGVWYWx1ZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICBsZXQgZmlyc3QgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVswXS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnZhbHVlT2YoKTtcbiAgICAgICAgICBsZXQgc2Vjb25kID0gbmV3IERhdGUodGhpcy5kYXRlVmFsdWVbMV0ucmVwbGFjZSgvLS9naSwgXCIvXCIpKS52YWx1ZU9mKCk7XG4gICAgICAgICAgbGV0IHRpbWUgPSBjYWxjdWxhdGVEaWZmVGltZShmaXJzdCwgc2Vjb25kKTtcbiAgICAgICAgICBkYXlzID0gdGltZVswXSAvIDI0O1xuICAgICAgICAgIHJldHVybiBkYXlzO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZ2V0RGVzY3JpYmUoKSB7XG4gICAgICAgIGxldCBkZXNjcmliZSA9IFtcIlwiLCBcIlwiXTtcbiAgICAgICAgaWYgKHRoaXMuZGF0ZVZhbHVlLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRTdGFtcCA9IG5ldyBEYXRlKFxuICAgICAgICAgICAgY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgICAgIGN1cnJlbnREYXRlLmdldE1vbnRoKCksXG4gICAgICAgICAgICBjdXJyZW50RGF0ZS5nZXREYXRlKClcbiAgICAgICAgICApLnZhbHVlT2YoKTtcbiAgICAgICAgICBsZXQgZmlyc3QgPSBuZXcgRGF0ZSh0aGlzLmRhdGVWYWx1ZVswXS5yZXBsYWNlKC8tL2dpLCBcIi9cIikpLnZhbHVlT2YoKTtcbiAgICAgICAgICBsZXQgc2Vjb25kID0gbmV3IERhdGUodGhpcy5kYXRlVmFsdWVbMV0ucmVwbGFjZSgvLS9naSwgXCIvXCIpKS52YWx1ZU9mKCk7XG4gICAgICAgICAgaWYgKGN1cnJlbnRTdGFtcCA9PSBmaXJzdCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMF0gPSBcIuS7iuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YW1wICsgMjQgKiA2MCAqIDYwICogMTAwMCA9PSBmaXJzdCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMF0gPSBcIuaYjuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YW1wICsgMjQgKiA2MCAqIDYwICogMTAwMCAqIDIgPT0gZmlyc3QpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzBdID0gXCLlkI7lpKlcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVzY3JpYmVbMF0gPSBcIlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY3VycmVudFN0YW1wID09IHNlY29uZCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMV0gPSBcIuS7iuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFN0YW1wICsgMjQgKiA2MCAqIDYwICogMTAwMCA9PSBzZWNvbmQpIHtcbiAgICAgICAgICAgIGRlc2NyaWJlWzFdID0gXCLmmI7lpKlcIjtcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRTdGFtcCArIDI0ICogNjAgKiA2MCAqIDEwMDAgKiAyID09IHNlY29uZCkge1xuICAgICAgICAgICAgZGVzY3JpYmVbMV0gPSBcIuWQjuWkqVwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZXNjcmliZVsxXSA9IFwiXCI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXNjcmliZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIHNjcm9sbEhlaWdodDogMCxcbiAgICAgIGRhdGVWYWx1ZTogWycyMDE5LTA4LTA5JywgJzIwMTktMDgtMTAnXVxuICAgIH1cbiAgICBtZXRob2RzID0ge31cbiAgICBvblNob3coKSB7fVxuICAgIG9uTG9hZCgpIHtcbiAgICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gY2hhbmdlUFhUb1JQWChnZXRTeXNIZWlnaHQoKSkgLSAxMDA7XG4gICAgICB0aGlzLiRhcHBseSgpXG4gICAgfVxuICB9XG4iXX0=