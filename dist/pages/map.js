'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Map = function (_wepy$page) {
  _inherits(Map, _wepy$page);

  function Map() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Map);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Map.__proto__ || Object.getPrototypeOf(Map)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '地图'
    }, _this.data = {
      hotelInfo: {},
      currentInfo: {},
      scale: 14,
      pointLng: '',
      pointLat: '',
      markers: [],
      polyline: []
    }, _this.computed = {}, _this.methods = {
      // 我的位置
      handleMyposition: function handleMyposition() {
        this.mapCtx.moveToLocation();
      },

      // 酒店位置
      hotellocation: function hotellocation() {
        this.mapCtx.includePoints({
          points: [{
            latitude: this.hotelInfo.pointLat,
            longitude: this.hotelInfo.pointLng
          }, {
            latitude: this.currentInfo.lat,
            longitude: this.currentInfo.lng
          }],
          padding: [100, 100, 100, 100]
        });
        this.polyline = [{
          points: [{
            latitude: this.hotelInfo.pointLat,
            longitude: this.hotelInfo.pointLng
          }, {
            latitude: this.currentInfo.lat,
            longitude: this.currentInfo.lng
          }],
          color: "#FF0000DD",
          width: 2,
          dottedLine: true
        }];
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Map, [{
    key: 'onReady',
    value: function onReady(e) {
      this.mapCtx = wx.createMapContext('myMap');
    }
  }, {
    key: 'onShow',
    value: function onShow() {}
  }, {
    key: 'onLoad',
    value: function onLoad(option) {
      var _this2 = this;

      _wepy2.default.getLocation({
        type: 'wgs84'
      }).then(function (res) {
        _this2.currentInfo = {
          lat: res.latitude,
          lng: res.longitude
        };
      });
      var hotelInfo = JSON.parse(option.hotelInfo);
      this.hotelInfo = hotelInfo;
      this.pointLng = hotelInfo.pointLng;
      this.pointLat = hotelInfo.pointLat;
      this.markers.push({
        id: 0,
        latitude: hotelInfo.pointLat,
        longitude: hotelInfo.pointLng,
        width: 25,
        height: 30,
        iconPath: '../images/map-position-icon.png',
        callout: {
          content: hotelInfo.title,
          color: "#666666",
          fontSize: "14",
          borderRadius: "10",
          bgColor: "#ffffff",
          padding: "10",
          display: "ALWAYS"
        }
      });
      this.$apply();
    }
  }]);

  return Map;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Map , 'pages/map'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC5qcyJdLCJuYW1lcyI6WyJNYXAiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiZGF0YSIsImhvdGVsSW5mbyIsImN1cnJlbnRJbmZvIiwic2NhbGUiLCJwb2ludExuZyIsInBvaW50TGF0IiwibWFya2VycyIsInBvbHlsaW5lIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiaGFuZGxlTXlwb3NpdGlvbiIsIm1hcEN0eCIsIm1vdmVUb0xvY2F0aW9uIiwiaG90ZWxsb2NhdGlvbiIsImluY2x1ZGVQb2ludHMiLCJwb2ludHMiLCJsYXRpdHVkZSIsImxvbmdpdHVkZSIsImxhdCIsImxuZyIsInBhZGRpbmciLCJjb2xvciIsIndpZHRoIiwiZG90dGVkTGluZSIsImUiLCJ3eCIsImNyZWF0ZU1hcENvbnRleHQiLCJvcHRpb24iLCJ3ZXB5IiwiZ2V0TG9jYXRpb24iLCJ0eXBlIiwidGhlbiIsInJlcyIsIkpTT04iLCJwYXJzZSIsInB1c2giLCJpZCIsImhlaWdodCIsImljb25QYXRoIiwiY2FsbG91dCIsImNvbnRlbnQiLCJ0aXRsZSIsImZvbnRTaXplIiwiYm9yZGVyUmFkaXVzIiwiYmdDb2xvciIsImRpc3BsYXkiLCIkYXBwbHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxHOzs7Ozs7Ozs7Ozs7OztnTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUdUQyxJLEdBQU87QUFDTEMsaUJBQVcsRUFETjtBQUVMQyxtQkFBYSxFQUZSO0FBR0xDLGFBQU8sRUFIRjtBQUlMQyxnQkFBVSxFQUpMO0FBS0xDLGdCQUFVLEVBTEw7QUFNTEMsZUFBUyxFQU5KO0FBT0xDLGdCQUFVO0FBUEwsSyxRQVNQQyxRLEdBQVcsRSxRQUNYQyxPLEdBQVU7QUFDUjtBQUNBQyxzQkFGUSw4QkFFVztBQUNqQixhQUFLQyxNQUFMLENBQVlDLGNBQVo7QUFDRCxPQUpPOztBQUtSO0FBQ0FDLG1CQU5RLDJCQU1RO0FBQ2QsYUFBS0YsTUFBTCxDQUFZRyxhQUFaLENBQTBCO0FBQ3hCQyxrQkFBUSxDQUFDO0FBQ1BDLHNCQUFVLEtBQUtmLFNBQUwsQ0FBZUksUUFEbEI7QUFFUFksdUJBQVcsS0FBS2hCLFNBQUwsQ0FBZUc7QUFGbkIsV0FBRCxFQUdMO0FBQ0RZLHNCQUFVLEtBQUtkLFdBQUwsQ0FBaUJnQixHQUQxQjtBQUVERCx1QkFBVyxLQUFLZixXQUFMLENBQWlCaUI7QUFGM0IsV0FISyxDQURnQjtBQVF4QkMsbUJBQVMsQ0FBQyxHQUFELEVBQU0sR0FBTixFQUFXLEdBQVgsRUFBZ0IsR0FBaEI7QUFSZSxTQUExQjtBQVVBLGFBQUtiLFFBQUwsR0FBZ0IsQ0FBQztBQUNmUSxrQkFBUSxDQUFDO0FBQ1BDLHNCQUFVLEtBQUtmLFNBQUwsQ0FBZUksUUFEbEI7QUFFUFksdUJBQVcsS0FBS2hCLFNBQUwsQ0FBZUc7QUFGbkIsV0FBRCxFQUdMO0FBQ0RZLHNCQUFVLEtBQUtkLFdBQUwsQ0FBaUJnQixHQUQxQjtBQUVERCx1QkFBVyxLQUFLZixXQUFMLENBQWlCaUI7QUFGM0IsV0FISyxDQURPO0FBUWZFLGlCQUFPLFdBUlE7QUFTZkMsaUJBQU8sQ0FUUTtBQVVmQyxzQkFBWTtBQVZHLFNBQUQsQ0FBaEI7QUFZRDtBQTdCTyxLOzs7Ozs0QkErQkZDLEMsRUFBRztBQUNULFdBQUtiLE1BQUwsR0FBY2MsR0FBR0MsZ0JBQUgsQ0FBb0IsT0FBcEIsQ0FBZDtBQUNEOzs7NkJBQ1EsQ0FBRTs7OzJCQUNKQyxNLEVBQVE7QUFBQTs7QUFDYkMscUJBQUtDLFdBQUwsQ0FBaUI7QUFDZkMsY0FBTTtBQURTLE9BQWpCLEVBRUdDLElBRkgsQ0FFUSxlQUFPO0FBQ2IsZUFBSzdCLFdBQUwsR0FBbUI7QUFDakJnQixlQUFLYyxJQUFJaEIsUUFEUTtBQUVqQkcsZUFBS2EsSUFBSWY7QUFGUSxTQUFuQjtBQUlELE9BUEQ7QUFRQSxVQUFJaEIsWUFBWWdDLEtBQUtDLEtBQUwsQ0FBV1AsT0FBTzFCLFNBQWxCLENBQWhCO0FBQ0EsV0FBS0EsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxXQUFLRyxRQUFMLEdBQWdCSCxVQUFVRyxRQUExQjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0JKLFVBQVVJLFFBQTFCO0FBQ0EsV0FBS0MsT0FBTCxDQUFhNkIsSUFBYixDQUFrQjtBQUNoQkMsWUFBSSxDQURZO0FBRWhCcEIsa0JBQVVmLFVBQVVJLFFBRko7QUFHaEJZLG1CQUFXaEIsVUFBVUcsUUFITDtBQUloQmtCLGVBQU8sRUFKUztBQUtoQmUsZ0JBQVEsRUFMUTtBQU1oQkMsa0JBQVUsaUNBTk07QUFPaEJDLGlCQUFTO0FBQ1BDLG1CQUFTdkMsVUFBVXdDLEtBRFo7QUFFUHBCLGlCQUFPLFNBRkE7QUFHUHFCLG9CQUFVLElBSEg7QUFJUEMsd0JBQWMsSUFKUDtBQUtQQyxtQkFBUyxTQUxGO0FBTVB4QixtQkFBUyxJQU5GO0FBT1B5QixtQkFBUztBQVBGO0FBUE8sT0FBbEI7QUFpQkEsV0FBS0MsTUFBTDtBQUNEOzs7O0VBaEY4QmxCLGVBQUttQixJOztrQkFBakJsRCxHIiwiZmlsZSI6Im1hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5JztcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Zyw5Zu+J1xuICAgIH07XG4gICAgZGF0YSA9IHtcbiAgICAgIGhvdGVsSW5mbzoge30sXG4gICAgICBjdXJyZW50SW5mbzoge30sXG4gICAgICBzY2FsZTogMTQsXG4gICAgICBwb2ludExuZzogJycsXG4gICAgICBwb2ludExhdDogJycsXG4gICAgICBtYXJrZXJzOiBbXSxcbiAgICAgIHBvbHlsaW5lOiBbXVxuICAgIH07XG4gICAgY29tcHV0ZWQgPSB7fTtcbiAgICBtZXRob2RzID0ge1xuICAgICAgLy8g5oiR55qE5L2N572uXG4gICAgICBoYW5kbGVNeXBvc2l0aW9uKCkge1xuICAgICAgICB0aGlzLm1hcEN0eC5tb3ZlVG9Mb2NhdGlvbigpXG4gICAgICB9LFxuICAgICAgLy8g6YWS5bqX5L2N572uXG4gICAgICBob3RlbGxvY2F0aW9uKCkge1xuICAgICAgICB0aGlzLm1hcEN0eC5pbmNsdWRlUG9pbnRzKHtcbiAgICAgICAgICBwb2ludHM6IFt7XG4gICAgICAgICAgICBsYXRpdHVkZTogdGhpcy5ob3RlbEluZm8ucG9pbnRMYXQsXG4gICAgICAgICAgICBsb25naXR1ZGU6IHRoaXMuaG90ZWxJbmZvLnBvaW50TG5nLFxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLmN1cnJlbnRJbmZvLmxhdCxcbiAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5jdXJyZW50SW5mby5sbmcsXG4gICAgICAgICAgfV0sXG4gICAgICAgICAgcGFkZGluZzogWzEwMCwgMTAwLCAxMDAsIDEwMF0sXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMucG9seWxpbmUgPSBbe1xuICAgICAgICAgIHBvaW50czogW3tcbiAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLmhvdGVsSW5mby5wb2ludExhdCxcbiAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5ob3RlbEluZm8ucG9pbnRMbmcsXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgbGF0aXR1ZGU6IHRoaXMuY3VycmVudEluZm8ubGF0LFxuICAgICAgICAgICAgbG9uZ2l0dWRlOiB0aGlzLmN1cnJlbnRJbmZvLmxuZyxcbiAgICAgICAgICB9XSxcbiAgICAgICAgICBjb2xvcjogXCIjRkYwMDAwRERcIixcbiAgICAgICAgICB3aWR0aDogMixcbiAgICAgICAgICBkb3R0ZWRMaW5lOiB0cnVlXG4gICAgICAgIH1dXG4gICAgICB9LFxuICAgIH07XG4gICAgb25SZWFkeShlKSB7XG4gICAgICB0aGlzLm1hcEN0eCA9IHd4LmNyZWF0ZU1hcENvbnRleHQoJ215TWFwJylcbiAgICB9XG4gICAgb25TaG93KCkge31cbiAgICBvbkxvYWQob3B0aW9uKSB7XG4gICAgICB3ZXB5LmdldExvY2F0aW9uKHtcbiAgICAgICAgdHlwZTogJ3dnczg0JyxcbiAgICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50SW5mbyA9IHtcbiAgICAgICAgICBsYXQ6IHJlcy5sYXRpdHVkZSxcbiAgICAgICAgICBsbmc6IHJlcy5sb25naXR1ZGVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGxldCBob3RlbEluZm8gPSBKU09OLnBhcnNlKG9wdGlvbi5ob3RlbEluZm8pXG4gICAgICB0aGlzLmhvdGVsSW5mbyA9IGhvdGVsSW5mb1xuICAgICAgdGhpcy5wb2ludExuZyA9IGhvdGVsSW5mby5wb2ludExuZ1xuICAgICAgdGhpcy5wb2ludExhdCA9IGhvdGVsSW5mby5wb2ludExhdFxuICAgICAgdGhpcy5tYXJrZXJzLnB1c2goe1xuICAgICAgICBpZDogMCxcbiAgICAgICAgbGF0aXR1ZGU6IGhvdGVsSW5mby5wb2ludExhdCxcbiAgICAgICAgbG9uZ2l0dWRlOiBob3RlbEluZm8ucG9pbnRMbmcsXG4gICAgICAgIHdpZHRoOiAyNSxcbiAgICAgICAgaGVpZ2h0OiAzMCxcbiAgICAgICAgaWNvblBhdGg6ICcuLi9pbWFnZXMvbWFwLXBvc2l0aW9uLWljb24ucG5nJyxcbiAgICAgICAgY2FsbG91dDoge1xuICAgICAgICAgIGNvbnRlbnQ6IGhvdGVsSW5mby50aXRsZSxcbiAgICAgICAgICBjb2xvcjogXCIjNjY2NjY2XCIsXG4gICAgICAgICAgZm9udFNpemU6IFwiMTRcIixcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTBcIixcbiAgICAgICAgICBiZ0NvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICBwYWRkaW5nOiBcIjEwXCIsXG4gICAgICAgICAgZGlzcGxheTogXCJBTFdBWVNcIixcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuJGFwcGx5KClcbiAgICB9XG4gIH1cbiJdfQ==