'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wxSystem = require('./../../lib/wx-system.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var popup = function (_wepy$component) {
  _inherits(popup, _wepy$component);

  function popup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, popup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = popup.__proto__ || Object.getPrototypeOf(popup)).call.apply(_ref, [this].concat(args))), _this), _this.components = {}, _this.data = {
      animationData: {},
      popupStyle: ''
    }, _this.watch = {
      showModal: function showModal(newValue, oldValue) {
        if (this.type === 'top') {
          this.popupStyle = 'height:' + this.size + 'rpx;width:100%;top:' + -this.size + 'rpx;';
          if (newValue && !oldValue) {
            this.animationData = _wepy2.default.createAnimation({
              duration: this.duration,
              timingFunction: 'ease'
            });
            this.animationData.translateY(this.size * ((0, _wxSystem.getSysWidth)() / 750)).step();
            this.$apply();
          } else {
            this.animationData = _wepy2.default.createAnimation({
              duration: this.duration,
              timingFunction: 'ease'
            });
            this.animationData.translateY(0).step();
            this.$apply();
          }
        } else if (this.type === 'right') {
          this.popupStyle = 'width:' + this.size + 'rpx;right:' + -this.size + 'rpx;top:0px;bottom:0px;';
          if (newValue && !oldValue) {
            this.animationData = _wepy2.default.createAnimation({
              duration: this.duration,
              timingFunction: 'ease'
            });
            this.animationData.translateX(-this.size * ((0, _wxSystem.getSysWidth)() / 750)).step();
            this.$apply();
          } else {
            this.animationData = _wepy2.default.createAnimation({
              duration: this.duration,
              timingFunction: 'ease'
            });
            this.animationData.translateX(0).step();
            this.$apply();
          }
        } else if (this.type === 'bottom') {
          this.popupStyle = 'height:' + this.size + 'rpx;bottom:' + -this.size + 'rpx;width:100%;';
          if (newValue && !oldValue) {
            this.animationData = _wepy2.default.createAnimation({
              duration: this.duration,
              timingFunction: 'ease'
            });
            this.animationData.translateY(-this.size * ((0, _wxSystem.getSysWidth)() / 750)).step();
            this.$apply();
          } else {
            this.animationData = _wepy2.default.createAnimation({
              duration: this.duration,
              timingFunction: 'ease'
            });
            this.animationData.translateY(0).step();
            this.$apply();
          }
        } else if (this.type === 'left') {
          this.popupStyle = 'width:' + this.size + 'rpx;left:' + -this.size + 'rpx;top:0px;bottom:0px;';
          if (newValue && !oldValue) {
            this.animationData = _wepy2.default.createAnimation({
              duration: this.duration,
              timingFunction: 'ease'
            });
            this.animationData.translateX(this.size * ((0, _wxSystem.getSysWidth)() / 750)).step();
            this.$apply();
          } else {
            this.animationData = _wepy2.default.createAnimation({
              duration: this.duration,
              timingFunction: 'ease'
            });
            this.animationData.translateX(0).step();
            this.$apply();
          }
        }
      }
    }, _this.props = {
      type: {
        type: String,
        default: 'right',
        twoWay: true
      },
      showModal: {
        type: Boolean,
        default: false,
        twoWay: true
      },
      size: {
        type: String,
        default: '400'
      },
      duration: {
        type: String,
        default: '400'
      }
    }, _this.methods = {
      hideModal: function hideModal() {
        this.showModal = false;
        this.$apply();
        // 标签中使用 v-on:hideModal="hideModal"
        this.$emit('hideModal');
      },
      preventTouchMove: function preventTouchMove() {
        console.warn('preventTouchMove方法已阻止其他事件。');
      }
    }, _this.events = {
      // hideModal() {
      //   this.showModal = false
      //   this.$apply()
      // }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(popup, [{
    key: 'onShow',
    value: function onShow() {}
  }]);

  return popup;
}(_wepy2.default.component);

exports.default = popup;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInBvcHVwIiwiY29tcG9uZW50cyIsImRhdGEiLCJhbmltYXRpb25EYXRhIiwicG9wdXBTdHlsZSIsIndhdGNoIiwic2hvd01vZGFsIiwibmV3VmFsdWUiLCJvbGRWYWx1ZSIsInR5cGUiLCJzaXplIiwid2VweSIsImNyZWF0ZUFuaW1hdGlvbiIsImR1cmF0aW9uIiwidGltaW5nRnVuY3Rpb24iLCJ0cmFuc2xhdGVZIiwic3RlcCIsIiRhcHBseSIsInRyYW5zbGF0ZVgiLCJwcm9wcyIsIlN0cmluZyIsImRlZmF1bHQiLCJ0d29XYXkiLCJCb29sZWFuIiwibWV0aG9kcyIsImhpZGVNb2RhbCIsIiRlbWl0IiwicHJldmVudFRvdWNoTW92ZSIsImNvbnNvbGUiLCJ3YXJuIiwiZXZlbnRzIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7O0lBR3FCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLFUsR0FBYSxFLFFBQ2JDLEksR0FBTztBQUNMQyxxQkFBZSxFQURWO0FBRUxDLGtCQUFZO0FBRlAsSyxRQUlQQyxLLEdBQVE7QUFDTkMsZUFETSxxQkFDSUMsUUFESixFQUNjQyxRQURkLEVBQ3dCO0FBQzVCLFlBQUksS0FBS0MsSUFBTCxLQUFjLEtBQWxCLEVBQXlCO0FBQ3ZCLGVBQUtMLFVBQUwsZUFBNEIsS0FBS00sSUFBakMsMkJBQTJELENBQUMsS0FBS0EsSUFBakU7QUFDQSxjQUFJSCxZQUFZLENBQUNDLFFBQWpCLEVBQTJCO0FBQ3pCLGlCQUFLTCxhQUFMLEdBQXFCUSxlQUFLQyxlQUFMLENBQXFCO0FBQ3hDQyx3QkFBVSxLQUFLQSxRQUR5QjtBQUV4Q0MsOEJBQWdCO0FBRndCLGFBQXJCLENBQXJCO0FBSUEsaUJBQUtYLGFBQUwsQ0FBbUJZLFVBQW5CLENBQThCLEtBQUtMLElBQUwsSUFBYSwrQkFBZ0IsR0FBN0IsQ0FBOUIsRUFBaUVNLElBQWpFO0FBQ0EsaUJBQUtDLE1B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RDtBQUNGO0FBQ0Y7QUF2RUssSyxRQXlFUkUsSyxHQUFRO0FBQ05WLFlBQU07QUFDSkEsY0FBTVcsTUFERjtBQUVKQyxpQkFBUyxPQUZMO0FBR0pDLGdCQUFRO0FBSEosT0FEQTtBQU1OaEIsaUJBQVc7QUFDVEcsY0FBTWMsT0FERztBQUVURixpQkFBUyxLQUZBO0FBR1RDLGdCQUFRO0FBSEMsT0FOTDtBQVdOWixZQUFNO0FBQ0pELGNBQU1XLE1BREY7QUFFSkMsaUJBQVM7QUFGTCxPQVhBO0FBZU5SLGdCQUFVO0FBQ1JKLGNBQU1XLE1BREU7QUFFUkMsaUJBQVM7QUFGRDtBQWZKLEssUUFvQlJHLE8sR0FBVTtBQUNSQyxlQURRLHVCQUNJO0FBQ1YsYUFBS25CLFNBQUwsR0FBaUIsS0FBakI7QUFDQSxhQUFLVyxNQUFMO0FBQ0E7QUFDQSxhQUFLUyxLQUFMLENBQVcsV0FBWDtBQUNELE9BTk87QUFPUkMsc0JBUFEsOEJBT1c7QUFDakJDLGdCQUFRQyxJQUFSLENBQWEsNEJBQWI7QUFDRDtBQVRPLEssUUFZVkMsTSxHQUFTO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFKTyxLOzs7Ozs2QkFEQSxDQUFFOzs7O0VBOUdzQm5CLGVBQUtvQixTOztrQkFBbkIvQixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCB7XG4gICAgZ2V0U3lzV2lkdGhcbiAgfSBmcm9tICcuLi8uLi9saWIvd3gtc3lzdGVtLmpzJ1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBwb3B1cCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBjb21wb25lbnRzID0ge31cbiAgICBkYXRhID0ge1xuICAgICAgYW5pbWF0aW9uRGF0YToge30sXG4gICAgICBwb3B1cFN0eWxlOiAnJ1xuICAgIH1cbiAgICB3YXRjaCA9IHtcbiAgICAgIHNob3dNb2RhbChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICB0aGlzLnBvcHVwU3R5bGUgPSBgaGVpZ2h0OiR7dGhpcy5zaXplfXJweDt3aWR0aDoxMDAlO3RvcDokey10aGlzLnNpemV9cnB4O2BcbiAgICAgICAgICBpZiAobmV3VmFsdWUgJiYgIW9sZFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkRhdGEgPSB3ZXB5LmNyZWF0ZUFuaW1hdGlvbih7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLmR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmdGdW5jdGlvbjogJ2Vhc2UnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25EYXRhLnRyYW5zbGF0ZVkodGhpcy5zaXplICogKGdldFN5c1dpZHRoKCkgLyA3NTApKS5zdGVwKClcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25EYXRhID0gd2VweS5jcmVhdGVBbmltYXRpb24oe1xuICAgICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5kdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nRnVuY3Rpb246ICdlYXNlJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRGF0YS50cmFuc2xhdGVZKDApLnN0ZXAoKVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICB0aGlzLnBvcHVwU3R5bGUgPSBgd2lkdGg6JHt0aGlzLnNpemV9cnB4O3JpZ2h0OiR7LXRoaXMuc2l6ZX1ycHg7dG9wOjBweDtib3R0b206MHB4O2BcbiAgICAgICAgICBpZiAobmV3VmFsdWUgJiYgIW9sZFZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkRhdGEgPSB3ZXB5LmNyZWF0ZUFuaW1hdGlvbih7XG4gICAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLmR1cmF0aW9uLFxuICAgICAgICAgICAgICB0aW1pbmdGdW5jdGlvbjogJ2Vhc2UnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25EYXRhLnRyYW5zbGF0ZVgoLXRoaXMuc2l6ZSAqIChnZXRTeXNXaWR0aCgpIC8gNzUwKSkuc3RlcCgpXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRGF0YSA9IHdlcHkuY3JlYXRlQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZ0Z1bmN0aW9uOiAnZWFzZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkRhdGEudHJhbnNsYXRlWCgwKS5zdGVwKClcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnYm90dG9tJykge1xuICAgICAgICAgIHRoaXMucG9wdXBTdHlsZSA9IGBoZWlnaHQ6JHt0aGlzLnNpemV9cnB4O2JvdHRvbTokey10aGlzLnNpemV9cnB4O3dpZHRoOjEwMCU7YFxuICAgICAgICAgIGlmIChuZXdWYWx1ZSAmJiAhb2xkVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRGF0YSA9IHdlcHkuY3JlYXRlQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZ0Z1bmN0aW9uOiAnZWFzZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkRhdGEudHJhbnNsYXRlWSgtdGhpcy5zaXplICogKGdldFN5c1dpZHRoKCkgLyA3NTApKS5zdGVwKClcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25EYXRhID0gd2VweS5jcmVhdGVBbmltYXRpb24oe1xuICAgICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5kdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nRnVuY3Rpb246ICdlYXNlJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRGF0YS50cmFuc2xhdGVZKDApLnN0ZXAoKVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdsZWZ0Jykge1xuICAgICAgICAgIHRoaXMucG9wdXBTdHlsZSA9IGB3aWR0aDoke3RoaXMuc2l6ZX1ycHg7bGVmdDokey10aGlzLnNpemV9cnB4O3RvcDowcHg7Ym90dG9tOjBweDtgXG4gICAgICAgICAgaWYgKG5ld1ZhbHVlICYmICFvbGRWYWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25EYXRhID0gd2VweS5jcmVhdGVBbmltYXRpb24oe1xuICAgICAgICAgICAgICBkdXJhdGlvbjogdGhpcy5kdXJhdGlvbixcbiAgICAgICAgICAgICAgdGltaW5nRnVuY3Rpb246ICdlYXNlJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRGF0YS50cmFuc2xhdGVYKHRoaXMuc2l6ZSAqIChnZXRTeXNXaWR0aCgpIC8gNzUwKSkuc3RlcCgpXG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRGF0YSA9IHdlcHkuY3JlYXRlQW5pbWF0aW9uKHtcbiAgICAgICAgICAgICAgZHVyYXRpb246IHRoaXMuZHVyYXRpb24sXG4gICAgICAgICAgICAgIHRpbWluZ0Z1bmN0aW9uOiAnZWFzZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkRhdGEudHJhbnNsYXRlWCgwKS5zdGVwKClcbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcHJvcHMgPSB7XG4gICAgICB0eXBlOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdDogJ3JpZ2h0JyxcbiAgICAgICAgdHdvV2F5OiB0cnVlXG4gICAgICB9LFxuICAgICAgc2hvd01vZGFsOiB7XG4gICAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICAgIGRlZmF1bHQ6IGZhbHNlLFxuICAgICAgICB0d29XYXk6IHRydWVcbiAgICAgIH0sXG4gICAgICBzaXplOiB7XG4gICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgZGVmYXVsdDogJzQwMCdcbiAgICAgIH0sXG4gICAgICBkdXJhdGlvbjoge1xuICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgIGRlZmF1bHQ6ICc0MDAnXG4gICAgICB9XG4gICAgfVxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBoaWRlTW9kYWwoKSB7XG4gICAgICAgIHRoaXMuc2hvd01vZGFsID0gZmFsc2VcbiAgICAgICAgdGhpcy4kYXBwbHkoKVxuICAgICAgICAvLyDmoIfnrb7kuK3kvb/nlKggdi1vbjpoaWRlTW9kYWw9XCJoaWRlTW9kYWxcIlxuICAgICAgICB0aGlzLiRlbWl0KCdoaWRlTW9kYWwnKVxuICAgICAgfSxcbiAgICAgIHByZXZlbnRUb3VjaE1vdmUoKSB7XG4gICAgICAgIGNvbnNvbGUud2FybigncHJldmVudFRvdWNoTW92ZeaWueazleW3sumYu+atouWFtuS7luS6i+S7tuOAgicpXG4gICAgICB9XG4gICAgfVxuICAgIG9uU2hvdygpIHt9XG4gICAgZXZlbnRzID0ge1xuICAgICAgLy8gaGlkZU1vZGFsKCkge1xuICAgICAgLy8gICB0aGlzLnNob3dNb2RhbCA9IGZhbHNlXG4gICAgICAvLyAgIHRoaXMuJGFwcGx5KClcbiAgICAgIC8vIH1cbiAgICB9O1xuICB9XG4iXX0=