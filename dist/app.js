"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

var _index = require('./config/index.js');

var _index2 = _interopRequireDefault(_index);

var _touches = require('./lib/touches.js');

var _touches2 = _interopRequireDefault(_touches);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require('./lib/date.js');

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.$config = _index2.default;
    _this.$touches = new _touches2.default();
    _this.config = {
      pages: ["pages/index", //首页
      "pages/city", //选择城市
      "pages/searchList", //选择城市
      "pages/hotelDetail", //酒店详情
      "pages/map", //酒店地图
      "pages/hotelInfo", //酒店信息
      "pages/writeOrder"],
      window: {
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "#fff",
        navigationBarTitleText: "小程序",
        navigationBarTextStyle: "black",
        backgroundColor: "#F6F6F6"
      },
      // tabBar: {
      //   color: "#494949",
      //   selectedColor: "#FF6600",
      //   borderStyle: "black",
      //   backgroundColor: "#ffffff",
      //   list: [
      //     {
      //       pagePath: "pages/index",
      //       iconPath: "images/index-icon.png",
      //       selectedIconPath: "images/index-selected-icon.png",
      //       text: "酒店"
      //     },
      //     {
      //       pagePath: "pages/aircraft",
      //       iconPath: "images/aircraft-n-icon.png",
      //       selectedIconPath: "images/aircraft-y-icon.png",
      //       text: "机票"
      //     },
      //     {
      //       pagePath: "pages/collection",
      //       iconPath: "images/love-icon.png",
      //       selectedIconPath: "images/love-icon-selected.png",
      //       text: "收藏"
      //     },
      //     {
      //       pagePath: "pages/orderList",
      //       iconPath: "images/order-icon.png",
      //       selectedIconPath: "images/order-icon-selected.png",
      //       text: "订单"
      //     },
      //     {
      //       pagePath: "pages/myIndex",
      //       iconPath: "images/my-icon.png",
      //       selectedIconPath: "images/my-icon1.png",
      //       text: "我的"
      //     }
      //   ]
      // },
      networkTimeout: {
        request: 30000,
        downloadFile: 30000
      },
      permission: {
        "scope.userLocation": {
          desc: "你的位置信息将用于小程序位置接口的效果展示"
        }
      }
    };
    _this.globalData = {};

    _this.use("requestfix");
    _this.use("promisify");
    return _this;
  }

  _createClass(_default, [{
    key: "onLaunch",
    value: function onLaunch() {
      console.info("小程序已启动！");
    }
  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiJGNvbmZpZyIsImNvbmZpZyIsIiR0b3VjaGVzIiwiVG91Y2hlcyIsInBhZ2VzIiwid2luZG93IiwiYmFja2dyb3VuZFRleHRTdHlsZSIsIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3IiLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwibmF2aWdhdGlvbkJhclRleHRTdHlsZSIsImJhY2tncm91bmRDb2xvciIsIm5ldHdvcmtUaW1lb3V0IiwicmVxdWVzdCIsImRvd25sb2FkRmlsZSIsInBlcm1pc3Npb24iLCJkZXNjIiwiZ2xvYmFsRGF0YSIsInVzZSIsImNvbnNvbGUiLCJpbmZvIiwid2VweSIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFEQUEsUUFBUSxZQUFSOzs7OztBQXVFRSxzQkFBYztBQUFBOztBQUFBOztBQUFBLFVBcEVkQyxPQW9FYyxHQXBFSkMsZUFvRUk7QUFBQSxVQW5FZEMsUUFtRWMsR0FuRUgsSUFBSUMsaUJBQUosRUFtRUc7QUFBQSxVQWxFZEYsTUFrRWMsR0FsRUw7QUFDUEcsYUFBTyxDQUNMLGFBREssRUFDVTtBQUNmLGtCQUZLLEVBRVM7QUFDZCx3QkFISyxFQUdlO0FBQ3BCLHlCQUpLLEVBSWdCO0FBQ3JCLGlCQUxLLEVBS1E7QUFDYix1QkFOSyxFQU1jO0FBQ25CLHdCQVBLLENBREE7QUFVUEMsY0FBUTtBQUNOQyw2QkFBcUIsT0FEZjtBQUVOQyxzQ0FBOEIsTUFGeEI7QUFHTkMsZ0NBQXdCLEtBSGxCO0FBSU5DLGdDQUF3QixPQUpsQjtBQUtOQyx5QkFBaUI7QUFMWCxPQVZEO0FBaUJQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQUMsc0JBQWdCO0FBQ2RDLGlCQUFTLEtBREs7QUFFZEMsc0JBQWM7QUFGQSxPQXZEVDtBQTJEUEMsa0JBQVk7QUFDViw4QkFBc0I7QUFDcEJDLGdCQUFNO0FBRGM7QUFEWjtBQTNETCxLQWtFSztBQUFBLFVBRGRDLFVBQ2MsR0FERCxFQUNDOztBQUVaLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0EsVUFBS0EsR0FBTCxDQUFTLFdBQVQ7QUFIWTtBQUliOzs7OytCQUNVO0FBQ1RDLGNBQVFDLElBQVIsQ0FBYSxTQUFiO0FBQ0Q7Ozs7RUE1RTBCQyxlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tIFwid2VweVwiO1xuICBpbXBvcnQgXCJ3ZXB5LWFzeW5jLWZ1bmN0aW9uXCI7XG4gIGltcG9ydCBjb25maWcgZnJvbSBcIi4vY29uZmlnL2luZGV4LmpzXCI7XG4gIHJlcXVpcmUoXCIuL2xpYi9kYXRlXCIpO1xuICBpbXBvcnQgVG91Y2hlcyBmcm9tIFwiLi9saWIvdG91Y2hlcy5qc1wiO1xuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIHdlcHkuYXBwIHtcbiAgICAkY29uZmlnID0gY29uZmlnO1xuICAgICR0b3VjaGVzID0gbmV3IFRvdWNoZXMoKTtcbiAgICBjb25maWcgPSB7XG4gICAgICBwYWdlczogW1xuICAgICAgICBcInBhZ2VzL2luZGV4XCIsIC8v6aaW6aG1XG4gICAgICAgIFwicGFnZXMvY2l0eVwiLCAvL+mAieaLqeWfjuW4glxuICAgICAgICBcInBhZ2VzL3NlYXJjaExpc3RcIiwgLy/pgInmi6nln47luIJcbiAgICAgICAgXCJwYWdlcy9ob3RlbERldGFpbFwiLCAvL+mFkuW6l+ivpuaDhVxuICAgICAgICBcInBhZ2VzL21hcFwiLCAvL+mFkuW6l+WcsOWbvlxuICAgICAgICBcInBhZ2VzL2hvdGVsSW5mb1wiLCAvL+mFkuW6l+S/oeaBr1xuICAgICAgICBcInBhZ2VzL3dyaXRlT3JkZXJcIiwgLy/loavlhpnorqLljZVcbiAgICAgIF0sXG4gICAgICB3aW5kb3c6IHtcbiAgICAgICAgYmFja2dyb3VuZFRleHRTdHlsZTogXCJsaWdodFwiLFxuICAgICAgICBuYXZpZ2F0aW9uQmFyQmFja2dyb3VuZENvbG9yOiBcIiNmZmZcIixcbiAgICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogXCLlsI/nqIvluo9cIixcbiAgICAgICAgbmF2aWdhdGlvbkJhclRleHRTdHlsZTogXCJibGFja1wiLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwiI0Y2RjZGNlwiXG4gICAgICB9LFxuICAgICAgLy8gdGFiQmFyOiB7XG4gICAgICAvLyAgIGNvbG9yOiBcIiM0OTQ5NDlcIixcbiAgICAgIC8vICAgc2VsZWN0ZWRDb2xvcjogXCIjRkY2NjAwXCIsXG4gICAgICAvLyAgIGJvcmRlclN0eWxlOiBcImJsYWNrXCIsXG4gICAgICAvLyAgIGJhY2tncm91bmRDb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgICAvLyAgIGxpc3Q6IFtcbiAgICAgIC8vICAgICB7XG4gICAgICAvLyAgICAgICBwYWdlUGF0aDogXCJwYWdlcy9pbmRleFwiLFxuICAgICAgLy8gICAgICAgaWNvblBhdGg6IFwiaW1hZ2VzL2luZGV4LWljb24ucG5nXCIsXG4gICAgICAvLyAgICAgICBzZWxlY3RlZEljb25QYXRoOiBcImltYWdlcy9pbmRleC1zZWxlY3RlZC1pY29uLnBuZ1wiLFxuICAgICAgLy8gICAgICAgdGV4dDogXCLphZLlupdcIlxuICAgICAgLy8gICAgIH0sXG4gICAgICAvLyAgICAge1xuICAgICAgLy8gICAgICAgcGFnZVBhdGg6IFwicGFnZXMvYWlyY3JhZnRcIixcbiAgICAgIC8vICAgICAgIGljb25QYXRoOiBcImltYWdlcy9haXJjcmFmdC1uLWljb24ucG5nXCIsXG4gICAgICAvLyAgICAgICBzZWxlY3RlZEljb25QYXRoOiBcImltYWdlcy9haXJjcmFmdC15LWljb24ucG5nXCIsXG4gICAgICAvLyAgICAgICB0ZXh0OiBcIuacuuelqFwiXG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgICB7XG4gICAgICAvLyAgICAgICBwYWdlUGF0aDogXCJwYWdlcy9jb2xsZWN0aW9uXCIsXG4gICAgICAvLyAgICAgICBpY29uUGF0aDogXCJpbWFnZXMvbG92ZS1pY29uLnBuZ1wiLFxuICAgICAgLy8gICAgICAgc2VsZWN0ZWRJY29uUGF0aDogXCJpbWFnZXMvbG92ZS1pY29uLXNlbGVjdGVkLnBuZ1wiLFxuICAgICAgLy8gICAgICAgdGV4dDogXCLmlLbol49cIlxuICAgICAgLy8gICAgIH0sXG4gICAgICAvLyAgICAge1xuICAgICAgLy8gICAgICAgcGFnZVBhdGg6IFwicGFnZXMvb3JkZXJMaXN0XCIsXG4gICAgICAvLyAgICAgICBpY29uUGF0aDogXCJpbWFnZXMvb3JkZXItaWNvbi5wbmdcIixcbiAgICAgIC8vICAgICAgIHNlbGVjdGVkSWNvblBhdGg6IFwiaW1hZ2VzL29yZGVyLWljb24tc2VsZWN0ZWQucG5nXCIsXG4gICAgICAvLyAgICAgICB0ZXh0OiBcIuiuouWNlVwiXG4gICAgICAvLyAgICAgfSxcbiAgICAgIC8vICAgICB7XG4gICAgICAvLyAgICAgICBwYWdlUGF0aDogXCJwYWdlcy9teUluZGV4XCIsXG4gICAgICAvLyAgICAgICBpY29uUGF0aDogXCJpbWFnZXMvbXktaWNvbi5wbmdcIixcbiAgICAgIC8vICAgICAgIHNlbGVjdGVkSWNvblBhdGg6IFwiaW1hZ2VzL215LWljb24xLnBuZ1wiLFxuICAgICAgLy8gICAgICAgdGV4dDogXCLmiJHnmoRcIlxuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgXVxuICAgICAgLy8gfSxcbiAgICAgIG5ldHdvcmtUaW1lb3V0OiB7XG4gICAgICAgIHJlcXVlc3Q6IDMwMDAwLFxuICAgICAgICBkb3dubG9hZEZpbGU6IDMwMDAwXG4gICAgICB9LFxuICAgICAgcGVybWlzc2lvbjoge1xuICAgICAgICBcInNjb3BlLnVzZXJMb2NhdGlvblwiOiB7XG4gICAgICAgICAgZGVzYzogXCLkvaDnmoTkvY3nva7kv6Hmga/lsIbnlKjkuo7lsI/nqIvluo/kvY3nva7mjqXlj6PnmoTmlYjmnpzlsZXnpLpcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBnbG9iYWxEYXRhID0ge307XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy51c2UoXCJyZXF1ZXN0Zml4XCIpO1xuICAgICAgdGhpcy51c2UoXCJwcm9taXNpZnlcIik7XG4gICAgfVxuICAgIG9uTGF1bmNoKCkge1xuICAgICAgY29uc29sZS5pbmZvKFwi5bCP56iL5bqP5bey5ZCv5Yqo77yBXCIpO1xuICAgIH1cbiAgfVxuIl19