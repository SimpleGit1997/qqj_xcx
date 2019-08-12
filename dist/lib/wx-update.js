'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateManager = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateManager() {
  var updateManager = wx.getUpdateManager();
  updateManager.onCheckForUpdate(function (res) {
    // 请求完新版本信息的回调
    if (res.hasUpdate) {
      _wepy2.default.showLoading({
        title: '更新中...'
      });
      updateManager.onUpdateReady(function () {
        _wepy2.default.hideLoading();
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function success(res) {
            _wepy2.default.hideLoading();
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          }
        });
      });
    }
  });
  updateManager.onUpdateFailed(function () {
    _wepy2.default.hideLoading();
    wx.showModal({
      title: '更新提示',
      content: '更新失败，请尝试重新打开程序！'
    });
  });
}

exports.updateManager = updateManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInd4LXVwZGF0ZS5qcyJdLCJuYW1lcyI6WyJ1cGRhdGVNYW5hZ2VyIiwid3giLCJnZXRVcGRhdGVNYW5hZ2VyIiwib25DaGVja0ZvclVwZGF0ZSIsInJlcyIsImhhc1VwZGF0ZSIsIndlcHkiLCJzaG93TG9hZGluZyIsInRpdGxlIiwib25VcGRhdGVSZWFkeSIsImhpZGVMb2FkaW5nIiwic2hvd01vZGFsIiwiY29udGVudCIsInN1Y2Nlc3MiLCJjb25maXJtIiwiYXBwbHlVcGRhdGUiLCJvblVwZGF0ZUZhaWxlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxTQUFTQSxhQUFULEdBQXlCO0FBQ3ZCLE1BQU1BLGdCQUFnQkMsR0FBR0MsZ0JBQUgsRUFBdEI7QUFDQUYsZ0JBQWNHLGdCQUFkLENBQStCLFVBQVVDLEdBQVYsRUFBZTtBQUM1QztBQUNBLFFBQUlBLElBQUlDLFNBQVIsRUFBbUI7QUFDakJDLHFCQUFLQyxXQUFMLENBQWlCO0FBQ2ZDLGVBQU87QUFEUSxPQUFqQjtBQUdBUixvQkFBY1MsYUFBZCxDQUE0QixZQUFZO0FBQ3RDSCx1QkFBS0ksV0FBTDtBQUNBVCxXQUFHVSxTQUFILENBQWE7QUFDWEgsaUJBQU8sTUFESTtBQUVYSSxtQkFBUyxrQkFGRTtBQUdYQyxpQkFIVyxtQkFHSFQsR0FIRyxFQUdFO0FBQ1hFLDJCQUFLSSxXQUFMO0FBQ0EsZ0JBQUlOLElBQUlVLE9BQVIsRUFBaUI7QUFDZjtBQUNBZCw0QkFBY2UsV0FBZDtBQUNEO0FBQ0Y7QUFUVSxTQUFiO0FBV0QsT0FiRDtBQWNEO0FBQ0YsR0FyQkQ7QUFzQkFmLGdCQUFjZ0IsY0FBZCxDQUE2QixZQUFZO0FBQ3ZDVixtQkFBS0ksV0FBTDtBQUNBVCxPQUFHVSxTQUFILENBQWE7QUFDWEgsYUFBTyxNQURJO0FBRVhJLGVBQVM7QUFGRSxLQUFiO0FBSUQsR0FORDtBQU9EOztRQUdDWixhLEdBQUFBLGEiLCJmaWxlIjoid3gtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcblxuZnVuY3Rpb24gdXBkYXRlTWFuYWdlcigpIHtcbiAgY29uc3QgdXBkYXRlTWFuYWdlciA9IHd4LmdldFVwZGF0ZU1hbmFnZXIoKVxuICB1cGRhdGVNYW5hZ2VyLm9uQ2hlY2tGb3JVcGRhdGUoZnVuY3Rpb24gKHJlcykge1xuICAgIC8vIOivt+axguWujOaWsOeJiOacrOS/oeaBr+eahOWbnuiwg1xuICAgIGlmIChyZXMuaGFzVXBkYXRlKSB7XG4gICAgICB3ZXB5LnNob3dMb2FkaW5nKHtcbiAgICAgICAgdGl0bGU6ICfmm7TmlrDkuK0uLi4nXG4gICAgICB9KVxuICAgICAgdXBkYXRlTWFuYWdlci5vblVwZGF0ZVJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2VweS5oaWRlTG9hZGluZygpXG4gICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgdGl0bGU6ICfmm7TmlrDmj5DnpLonLFxuICAgICAgICAgIGNvbnRlbnQ6ICfmlrDniYjmnKzlt7Lnu4/lh4blpIflpb3vvIzmmK/lkKbph43lkK/lupTnlKjvvJ8nLFxuICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAvLyDmlrDnmoTniYjmnKzlt7Lnu4/kuIvovb3lpb3vvIzosIPnlKggYXBwbHlVcGRhdGUg5bqU55So5paw54mI5pys5bm26YeN5ZCvXG4gICAgICAgICAgICAgIHVwZGF0ZU1hbmFnZXIuYXBwbHlVcGRhdGUoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuICB9KVxuICB1cGRhdGVNYW5hZ2VyLm9uVXBkYXRlRmFpbGVkKGZ1bmN0aW9uICgpIHtcbiAgICB3ZXB5LmhpZGVMb2FkaW5nKClcbiAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgdGl0bGU6ICfmm7TmlrDmj5DnpLonLFxuICAgICAgY29udGVudDogJ+abtOaWsOWksei0pe+8jOivt+WwneivlemHjeaWsOaJk+W8gOeoi+W6j++8gSdcbiAgICB9KVxuICB9KVxufVxuXG5leHBvcnQge1xuICB1cGRhdGVNYW5hZ2VyXG59XG4iXX0=