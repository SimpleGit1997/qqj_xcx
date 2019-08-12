'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _index = require('./../server/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HotelInfo = function (_wepy$page) {
  _inherits(HotelInfo, _wepy$page);

  function HotelInfo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, HotelInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = HotelInfo.__proto__ || Object.getPrototypeOf(HotelInfo)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '酒店信息'
    }, _this.data = {
      mapCtx: null,
      hotelInfo: {},
      markers: [],
      pointLng: '',
      pointLat: ''
    }, _this.methods = {
      handleTel: function handleTel() {
        if (this.hotelInfo.contactTel) {
          wx.makePhoneCall({
            phoneNumber: this.hotelInfo.contactTel
          });
        } else {
          _wepy2.default.showToast({
            title: '当前酒店没有预留电话哦!',
            icon: 'none',
            duration: 1500
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(HotelInfo, [{
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      var _this2 = this;

      this.mapCtx = wx.createMapContext('myMap');
      (0, _index.hotelDetailInfo)({
        hotelId: option.hotelId,
        sid: ''
      }).then(function (res) {
        console.log(res.hotelInfo);
        _this2.hotelInfo = res.hotelInfo;
        _this2.pointLng = _this2.hotelInfo.pointLng;
        _this2.pointLat = _this2.hotelInfo.pointLat;
        _this2.markers.push({
          id: 0,
          latitude: _this2.hotelInfo.pointLat,
          longitude: _this2.hotelInfo.pointLng,
          width: 25,
          height: 30,
          iconPath: '../images/map-position-icon.png',
          callout: {
            content: _this2.hotelInfo.title,
            color: "#666666",
            fontSize: "14",
            borderRadius: "10",
            bgColor: "#ffffff",
            padding: "10",
            display: "ALWAYS"
          }
        });
        _this2.$apply();
      });
    }
  }]);

  return HotelInfo;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(HotelInfo , 'pages/hotelInfo'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvdGVsSW5mby5qcyJdLCJuYW1lcyI6WyJIb3RlbEluZm8iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1hcEN0eCIsImhvdGVsSW5mbyIsIm1hcmtlcnMiLCJwb2ludExuZyIsInBvaW50TGF0IiwibWV0aG9kcyIsImhhbmRsZVRlbCIsImNvbnRhY3RUZWwiLCJ3eCIsIm1ha2VQaG9uZUNhbGwiLCJwaG9uZU51bWJlciIsIndlcHkiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsIm9wdGlvbiIsImNyZWF0ZU1hcENvbnRleHQiLCJob3RlbElkIiwic2lkIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJyZXMiLCJwdXNoIiwiaWQiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsIndpZHRoIiwiaGVpZ2h0IiwiaWNvblBhdGgiLCJjYWxsb3V0IiwiY29udGVudCIsImNvbG9yIiwiZm9udFNpemUiLCJib3JkZXJSYWRpdXMiLCJiZ0NvbG9yIiwicGFkZGluZyIsImRpc3BsYXkiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7O0lBR3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsY0FBUSxJQURIO0FBRUxDLGlCQUFXLEVBRk47QUFHTEMsZUFBUyxFQUhKO0FBSUxDLGdCQUFVLEVBSkw7QUFLTEMsZ0JBQVU7QUFMTCxLLFFBT1BDLE8sR0FBVTtBQUNSQyxlQURRLHVCQUNJO0FBQ1YsWUFBSSxLQUFLTCxTQUFMLENBQWVNLFVBQW5CLEVBQStCO0FBQzdCQyxhQUFHQyxhQUFILENBQWlCO0FBQ2ZDLHlCQUFhLEtBQUtULFNBQUwsQ0FBZU07QUFEYixXQUFqQjtBQUdELFNBSkQsTUFJTztBQUNMSSx5QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLG1CQUFPLGNBRE07QUFFYkMsa0JBQU0sTUFGTztBQUdiQyxzQkFBVTtBQUhHLFdBQWY7QUFLRDtBQUNGO0FBYk8sSzs7Ozs7NkJBZUQsQ0FBRTs7OzJCQUNKQyxNLEVBQVE7QUFBQTs7QUFDYixXQUFLaEIsTUFBTCxHQUFjUSxHQUFHUyxnQkFBSCxDQUFvQixPQUFwQixDQUFkO0FBQ0Esa0NBQWdCO0FBQ2RDLGlCQUFTRixPQUFPRSxPQURGO0FBRWRDLGFBQUs7QUFGUyxPQUFoQixFQUdHQyxJQUhILENBR1EsZUFBTztBQUNiQyxnQkFBUUMsR0FBUixDQUFZQyxJQUFJdEIsU0FBaEI7QUFDQSxlQUFLQSxTQUFMLEdBQWlCc0IsSUFBSXRCLFNBQXJCO0FBQ0EsZUFBS0UsUUFBTCxHQUFnQixPQUFLRixTQUFMLENBQWVFLFFBQS9CO0FBQ0EsZUFBS0MsUUFBTCxHQUFnQixPQUFLSCxTQUFMLENBQWVHLFFBQS9CO0FBQ0EsZUFBS0YsT0FBTCxDQUFhc0IsSUFBYixDQUFrQjtBQUNoQkMsY0FBSSxDQURZO0FBRWhCQyxvQkFBVSxPQUFLekIsU0FBTCxDQUFlRyxRQUZUO0FBR2hCdUIscUJBQVcsT0FBSzFCLFNBQUwsQ0FBZUUsUUFIVjtBQUloQnlCLGlCQUFPLEVBSlM7QUFLaEJDLGtCQUFRLEVBTFE7QUFNaEJDLG9CQUFVLGlDQU5NO0FBT2hCQyxtQkFBUztBQUNQQyxxQkFBUyxPQUFLL0IsU0FBTCxDQUFlWSxLQURqQjtBQUVQb0IsbUJBQU8sU0FGQTtBQUdQQyxzQkFBVSxJQUhIO0FBSVBDLDBCQUFjLElBSlA7QUFLUEMscUJBQVMsU0FMRjtBQU1QQyxxQkFBUyxJQU5GO0FBT1BDLHFCQUFTO0FBUEY7QUFQTyxTQUFsQjtBQWlCQSxlQUFLQyxNQUFMO0FBQ0QsT0ExQkQ7QUEyQkQ7Ozs7RUF4RG9DNUIsZUFBSzZCLEk7O2tCQUF2QjVDLFMiLCJmaWxlIjoiaG90ZWxJbmZvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCB7XG4gICAgaG90ZWxEZXRhaWxJbmZvXG4gIH0gZnJvbSAnLi4vc2VydmVyL2luZGV4LmpzJ1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBIb3RlbEluZm8gZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfphZLlupfkv6Hmga8nXG4gICAgfVxuICAgIGRhdGEgPSB7XG4gICAgICBtYXBDdHg6IG51bGwsXG4gICAgICBob3RlbEluZm86IHt9LFxuICAgICAgbWFya2VyczogW10sXG4gICAgICBwb2ludExuZzogJycsXG4gICAgICBwb2ludExhdDogJydcbiAgICB9XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGhhbmRsZVRlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaG90ZWxJbmZvLmNvbnRhY3RUZWwpIHtcbiAgICAgICAgICB3eC5tYWtlUGhvbmVDYWxsKHtcbiAgICAgICAgICAgIHBob25lTnVtYmVyOiB0aGlzLmhvdGVsSW5mby5jb250YWN0VGVsLFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2VweS5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgdGl0bGU6ICflvZPliY3phZLlupfmsqHmnInpooTnlZnnlLXor53lk6YhJyxcbiAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxNTAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBvblNob3coKSB7fVxuICAgIG9uTG9hZChvcHRpb24pIHtcbiAgICAgIHRoaXMubWFwQ3R4ID0gd3guY3JlYXRlTWFwQ29udGV4dCgnbXlNYXAnKVxuICAgICAgaG90ZWxEZXRhaWxJbmZvKHtcbiAgICAgICAgaG90ZWxJZDogb3B0aW9uLmhvdGVsSWQsXG4gICAgICAgIHNpZDogJydcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmhvdGVsSW5mbylcbiAgICAgICAgdGhpcy5ob3RlbEluZm8gPSByZXMuaG90ZWxJbmZvXG4gICAgICAgIHRoaXMucG9pbnRMbmcgPSB0aGlzLmhvdGVsSW5mby5wb2ludExuZ1xuICAgICAgICB0aGlzLnBvaW50TGF0ID0gdGhpcy5ob3RlbEluZm8ucG9pbnRMYXRcbiAgICAgICAgdGhpcy5tYXJrZXJzLnB1c2goe1xuICAgICAgICAgIGlkOiAwLFxuICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLmhvdGVsSW5mby5wb2ludExhdCxcbiAgICAgICAgICBsb25naXR1ZGU6IHRoaXMuaG90ZWxJbmZvLnBvaW50TG5nLFxuICAgICAgICAgIHdpZHRoOiAyNSxcbiAgICAgICAgICBoZWlnaHQ6IDMwLFxuICAgICAgICAgIGljb25QYXRoOiAnLi4vaW1hZ2VzL21hcC1wb3NpdGlvbi1pY29uLnBuZycsXG4gICAgICAgICAgY2FsbG91dDoge1xuICAgICAgICAgICAgY29udGVudDogdGhpcy5ob3RlbEluZm8udGl0bGUsXG4gICAgICAgICAgICBjb2xvcjogXCIjNjY2NjY2XCIsXG4gICAgICAgICAgICBmb250U2l6ZTogXCIxNFwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwXCIsXG4gICAgICAgICAgICBiZ0NvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgIHBhZGRpbmc6IFwiMTBcIixcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiQUxXQVlTXCIsXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19