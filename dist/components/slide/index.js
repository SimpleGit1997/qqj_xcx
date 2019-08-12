'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Slide = function (_wepy$component) {
  _inherits(Slide, _wepy$component);

  function Slide() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Slide);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Slide.__proto__ || Object.getPrototypeOf(Slide)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.data = {
      startX: null
    }, _this.watch = {}, _this.props = {
      dataList: {
        type: Array,
        default: [],
        twoWay: true
      },
      index: {
        type: Number,
        default: 0
      },
      height: {
        type: String
      },
      operWidth: {
        type: String,
        default: '0'
      }
    }, _this.methods = {
      touchS: function touchS(e) {
        // touchstart
        this.startX = this.$parent.$parent.$touches.getClientX(e);
        this.$apply();
      },
      touchM: function touchM(e) {
        // touchmove
        this.dataList = this.$parent.$parent.$touches.touchM(e, this.dataList, this.startX);
        this.$apply();
      },
      touchE: function touchE(e) {
        // touchend
        this.dataList = this.$parent.$parent.$touches.touchE(e, this.dataList, this.startX, this.operWidth);
        this.$apply();
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Slide, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return Slide;
}(_wepy2.default.component);

exports.default = Slide;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIlNsaWRlIiwiY29tcG9uZW50cyIsImRhdGEiLCJzdGFydFgiLCJ3YXRjaCIsInByb3BzIiwiZGF0YUxpc3QiLCJ0eXBlIiwiQXJyYXkiLCJkZWZhdWx0IiwidHdvV2F5IiwiaW5kZXgiLCJOdW1iZXIiLCJoZWlnaHQiLCJTdHJpbmciLCJvcGVyV2lkdGgiLCJtZXRob2RzIiwidG91Y2hTIiwiZSIsIiRwYXJlbnQiLCIkdG91Y2hlcyIsImdldENsaWVudFgiLCIkYXBwbHkiLCJ0b3VjaE0iLCJ0b3VjaEUiLCJldmVudHMiLCJ3ZXB5IiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLFUsR0FBYSxFLFFBQ2JDLEksR0FBTztBQUNMQyxjQUFRO0FBREgsSyxRQUdQQyxLLEdBQVEsRSxRQUNSQyxLLEdBQVE7QUFDTkMsZ0JBQVU7QUFDUkMsY0FBTUMsS0FERTtBQUVSQyxpQkFBUyxFQUZEO0FBR1JDLGdCQUFRO0FBSEEsT0FESjtBQU1OQyxhQUFPO0FBQ0xKLGNBQU1LLE1BREQ7QUFFTEgsaUJBQVM7QUFGSixPQU5EO0FBVU5JLGNBQVE7QUFDTk4sY0FBTU87QUFEQSxPQVZGO0FBYU5DLGlCQUFVO0FBQ1JSLGNBQU1PLE1BREU7QUFFUkwsaUJBQVE7QUFGQTtBQWJKLEssUUFrQlJPLE8sR0FBVTtBQUNSQyxjQUFRLGdCQUFTQyxDQUFULEVBQVk7QUFBRTtBQUNwQixhQUFLZixNQUFMLEdBQWMsS0FBS2dCLE9BQUwsQ0FBYUEsT0FBYixDQUFxQkMsUUFBckIsQ0FBOEJDLFVBQTlCLENBQXlDSCxDQUF6QyxDQUFkO0FBQ0EsYUFBS0ksTUFBTDtBQUNELE9BSk87QUFLUkMsY0FBUSxnQkFBU0wsQ0FBVCxFQUFZO0FBQUU7QUFDcEIsYUFBS1osUUFBTCxHQUFnQixLQUFLYSxPQUFMLENBQWFBLE9BQWIsQ0FBcUJDLFFBQXJCLENBQThCRyxNQUE5QixDQUFxQ0wsQ0FBckMsRUFBd0MsS0FBS1osUUFBN0MsRUFBdUQsS0FBS0gsTUFBNUQsQ0FBaEI7QUFDQSxhQUFLbUIsTUFBTDtBQUNELE9BUk87QUFTUkUsY0FBUSxnQkFBU04sQ0FBVCxFQUFZO0FBQUU7QUFDcEIsYUFBS1osUUFBTCxHQUFnQixLQUFLYSxPQUFMLENBQWFBLE9BQWIsQ0FBcUJDLFFBQXJCLENBQThCSSxNQUE5QixDQUFxQ04sQ0FBckMsRUFBd0MsS0FBS1osUUFBN0MsRUFBdUQsS0FBS0gsTUFBNUQsRUFBb0UsS0FBS1ksU0FBekUsQ0FBaEI7QUFDQSxhQUFLTyxNQUFMO0FBQ0Q7QUFaTyxLLFFBZVZHLE0sR0FBUyxFOzs7Ozs2QkFEQSxDQUFFOzs7O0VBdENzQkMsZUFBS0MsUzs7a0JBQW5CM0IsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZSBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBjb21wb25lbnRzID0ge31cbiAgICBkYXRhID0ge1xuICAgICAgc3RhcnRYOiBudWxsXG4gICAgfVxuICAgIHdhdGNoID0ge31cbiAgICBwcm9wcyA9IHtcbiAgICAgIGRhdGFMaXN0OiB7XG4gICAgICAgIHR5cGU6IEFycmF5LFxuICAgICAgICBkZWZhdWx0OiBbXSxcbiAgICAgICAgdHdvV2F5OiB0cnVlXG4gICAgICB9LFxuICAgICAgaW5kZXg6IHtcbiAgICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgICBkZWZhdWx0OiAwXG4gICAgICB9LFxuICAgICAgaGVpZ2h0OiB7XG4gICAgICAgIHR5cGU6IFN0cmluZ1xuICAgICAgfSxcbiAgICAgIG9wZXJXaWR0aDp7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdDonMCdcbiAgICAgIH1cbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRvdWNoUzogZnVuY3Rpb24oZSkgeyAvLyB0b3VjaHN0YXJ0XG4gICAgICAgIHRoaXMuc3RhcnRYID0gdGhpcy4kcGFyZW50LiRwYXJlbnQuJHRvdWNoZXMuZ2V0Q2xpZW50WChlKVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgdG91Y2hNOiBmdW5jdGlvbihlKSB7IC8vIHRvdWNobW92ZVxuICAgICAgICB0aGlzLmRhdGFMaXN0ID0gdGhpcy4kcGFyZW50LiRwYXJlbnQuJHRvdWNoZXMudG91Y2hNKGUsIHRoaXMuZGF0YUxpc3QsIHRoaXMuc3RhcnRYKVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9LFxuICAgICAgdG91Y2hFOiBmdW5jdGlvbihlKSB7IC8vIHRvdWNoZW5kXG4gICAgICAgIHRoaXMuZGF0YUxpc3QgPSB0aGlzLiRwYXJlbnQuJHBhcmVudC4kdG91Y2hlcy50b3VjaEUoZSwgdGhpcy5kYXRhTGlzdCwgdGhpcy5zdGFydFgsIHRoaXMub3BlcldpZHRoKVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZCgpIHt9XG4gICAgZXZlbnRzID0ge307XG4gIH1cbiJdfQ==