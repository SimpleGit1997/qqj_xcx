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
        hotelId: option.hotelId
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvdGVsSW5mby5qcyJdLCJuYW1lcyI6WyJIb3RlbEluZm8iLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsIm1hcEN0eCIsImhvdGVsSW5mbyIsIm1hcmtlcnMiLCJwb2ludExuZyIsInBvaW50TGF0IiwibWV0aG9kcyIsImhhbmRsZVRlbCIsImNvbnRhY3RUZWwiLCJ3eCIsIm1ha2VQaG9uZUNhbGwiLCJwaG9uZU51bWJlciIsIndlcHkiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsIm9wdGlvbiIsImNyZWF0ZU1hcENvbnRleHQiLCJob3RlbElkIiwidGhlbiIsImNvbnNvbGUiLCJsb2ciLCJyZXMiLCJwdXNoIiwiaWQiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsIndpZHRoIiwiaGVpZ2h0IiwiaWNvblBhdGgiLCJjYWxsb3V0IiwiY29udGVudCIsImNvbG9yIiwiZm9udFNpemUiLCJib3JkZXJSYWRpdXMiLCJiZ0NvbG9yIiwicGFkZGluZyIsImRpc3BsYXkiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7Ozs7Ozs7O0lBR3FCQSxTOzs7Ozs7Ozs7Ozs7Ozs0TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsY0FBUSxJQURIO0FBRUxDLGlCQUFXLEVBRk47QUFHTEMsZUFBUyxFQUhKO0FBSUxDLGdCQUFVLEVBSkw7QUFLTEMsZ0JBQVU7QUFMTCxLLFFBT1BDLE8sR0FBVTtBQUNSQyxlQURRLHVCQUNJO0FBQ1YsWUFBSSxLQUFLTCxTQUFMLENBQWVNLFVBQW5CLEVBQStCO0FBQzdCQyxhQUFHQyxhQUFILENBQWlCO0FBQ2ZDLHlCQUFhLEtBQUtULFNBQUwsQ0FBZU07QUFEYixXQUFqQjtBQUdELFNBSkQsTUFJTztBQUNMSSx5QkFBS0MsU0FBTCxDQUFlO0FBQ2JDLG1CQUFPLGNBRE07QUFFYkMsa0JBQU0sTUFGTztBQUdiQyxzQkFBVTtBQUhHLFdBQWY7QUFLRDtBQUNGO0FBYk8sSzs7Ozs7NkJBZUQsQ0FBRTs7OzJCQUNKQyxNLEVBQVE7QUFBQTs7QUFDYixXQUFLaEIsTUFBTCxHQUFjUSxHQUFHUyxnQkFBSCxDQUFvQixPQUFwQixDQUFkO0FBQ0Esa0NBQWdCO0FBQ2RDLGlCQUFTRixPQUFPRTtBQURGLE9BQWhCLEVBRUdDLElBRkgsQ0FFUSxlQUFPO0FBQ2JDLGdCQUFRQyxHQUFSLENBQVlDLElBQUlyQixTQUFoQjtBQUNBLGVBQUtBLFNBQUwsR0FBaUJxQixJQUFJckIsU0FBckI7QUFDQSxlQUFLRSxRQUFMLEdBQWdCLE9BQUtGLFNBQUwsQ0FBZUUsUUFBL0I7QUFDQSxlQUFLQyxRQUFMLEdBQWdCLE9BQUtILFNBQUwsQ0FBZUcsUUFBL0I7QUFDQSxlQUFLRixPQUFMLENBQWFxQixJQUFiLENBQWtCO0FBQ2hCQyxjQUFJLENBRFk7QUFFaEJDLG9CQUFVLE9BQUt4QixTQUFMLENBQWVHLFFBRlQ7QUFHaEJzQixxQkFBVyxPQUFLekIsU0FBTCxDQUFlRSxRQUhWO0FBSWhCd0IsaUJBQU8sRUFKUztBQUtoQkMsa0JBQVEsRUFMUTtBQU1oQkMsb0JBQVUsaUNBTk07QUFPaEJDLG1CQUFTO0FBQ1BDLHFCQUFTLE9BQUs5QixTQUFMLENBQWVZLEtBRGpCO0FBRVBtQixtQkFBTyxTQUZBO0FBR1BDLHNCQUFVLElBSEg7QUFJUEMsMEJBQWMsSUFKUDtBQUtQQyxxQkFBUyxTQUxGO0FBTVBDLHFCQUFTLElBTkY7QUFPUEMscUJBQVM7QUFQRjtBQVBPLFNBQWxCO0FBaUJBLGVBQUtDLE1BQUw7QUFDRCxPQXpCRDtBQTBCRDs7OztFQXZEb0MzQixlQUFLNEIsSTs7a0JBQXZCM0MsUyIsImZpbGUiOiJob3RlbEluZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IHtcbiAgICBob3RlbERldGFpbEluZm9cbiAgfSBmcm9tICcuLi9zZXJ2ZXIvaW5kZXguanMnXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEhvdGVsSW5mbyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+mFkuW6l+S/oeaBrydcbiAgICB9XG4gICAgZGF0YSA9IHtcbiAgICAgIG1hcEN0eDogbnVsbCxcbiAgICAgIGhvdGVsSW5mbzoge30sXG4gICAgICBtYXJrZXJzOiBbXSxcbiAgICAgIHBvaW50TG5nOiAnJyxcbiAgICAgIHBvaW50TGF0OiAnJ1xuICAgIH1cbiAgICBtZXRob2RzID0ge1xuICAgICAgaGFuZGxlVGVsKCkge1xuICAgICAgICBpZiAodGhpcy5ob3RlbEluZm8uY29udGFjdFRlbCkge1xuICAgICAgICAgIHd4Lm1ha2VQaG9uZUNhbGwoe1xuICAgICAgICAgICAgcGhvbmVOdW1iZXI6IHRoaXMuaG90ZWxJbmZvLmNvbnRhY3RUZWwsXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3ZXB5LnNob3dUb2FzdCh7XG4gICAgICAgICAgICB0aXRsZTogJ+W9k+WJjemFkuW6l+ayoeaciemihOeVmeeUteivneWTpiEnLFxuICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgZHVyYXRpb246IDE1MDBcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG9uU2hvdygpIHt9XG4gICAgb25Mb2FkKG9wdGlvbikge1xuICAgICAgdGhpcy5tYXBDdHggPSB3eC5jcmVhdGVNYXBDb250ZXh0KCdteU1hcCcpXG4gICAgICBob3RlbERldGFpbEluZm8oe1xuICAgICAgICBob3RlbElkOiBvcHRpb24uaG90ZWxJZCxcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmhvdGVsSW5mbylcbiAgICAgICAgdGhpcy5ob3RlbEluZm8gPSByZXMuaG90ZWxJbmZvXG4gICAgICAgIHRoaXMucG9pbnRMbmcgPSB0aGlzLmhvdGVsSW5mby5wb2ludExuZ1xuICAgICAgICB0aGlzLnBvaW50TGF0ID0gdGhpcy5ob3RlbEluZm8ucG9pbnRMYXRcbiAgICAgICAgdGhpcy5tYXJrZXJzLnB1c2goe1xuICAgICAgICAgIGlkOiAwLFxuICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLmhvdGVsSW5mby5wb2ludExhdCxcbiAgICAgICAgICBsb25naXR1ZGU6IHRoaXMuaG90ZWxJbmZvLnBvaW50TG5nLFxuICAgICAgICAgIHdpZHRoOiAyNSxcbiAgICAgICAgICBoZWlnaHQ6IDMwLFxuICAgICAgICAgIGljb25QYXRoOiAnLi4vaW1hZ2VzL21hcC1wb3NpdGlvbi1pY29uLnBuZycsXG4gICAgICAgICAgY2FsbG91dDoge1xuICAgICAgICAgICAgY29udGVudDogdGhpcy5ob3RlbEluZm8udGl0bGUsXG4gICAgICAgICAgICBjb2xvcjogXCIjNjY2NjY2XCIsXG4gICAgICAgICAgICBmb250U2l6ZTogXCIxNFwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwXCIsXG4gICAgICAgICAgICBiZ0NvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgIHBhZGRpbmc6IFwiMTBcIixcbiAgICAgICAgICAgIGRpc3BsYXk6IFwiQUxXQVlTXCIsXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLiRhcHBseSgpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuIl19