"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Touches = function () {
  function Touches() {
    _classCallCheck(this, Touches);
  }
  /**
   * 获取滑动列表的下标值
   * @param {*} e 
   */


  _createClass(Touches, [{
    key: "_getIndex",
    value: function _getIndex(e) {
      return e.currentTarget.dataset.index;
    }
    /**
     * 获取滑动过程中滑动的距离
     * @param {*} e 
     * @param {*} startX 
     */

  }, {
    key: "_getMoveX",
    value: function _getMoveX(e, startX) {
      return this.getClientX(e) - startX;
    }
    /**
     *  获取滑动结束滑动的距离
     * @param {*} e 
     * @param {*} startX 
     */

  }, {
    key: "_getEndX",
    value: function _getEndX(e, startX) {
      var touch = e.changedTouches;
      if (touch.length === 1) {
        return touch[0].clientX - startX;
      }
    }
    /**
     *  重置数据， 把所有的列表 left 置为 0
     * @param {*} dataList 
     */

  }, {
    key: "_resetData",
    value: function _resetData(dataList) {
      for (var i in dataList) {
        dataList[i].left = 0;
      }
      return dataList;
    }
    /**
     * 获取滑动的横坐标
     * @param {*} e 
     */

  }, {
    key: "getClientX",
    value: function getClientX(e) {
      var touch = e.touches;
      if (touch.length === 1) {
        return touch[0].clientX;
      }
    }
    /**
     * touchmove 过程中更新列表数据
     * @param {*} e 
     * @param {*} dataList 
     * @param {*} startX 
     */

  }, {
    key: "touchM",
    value: function touchM(e, dataList, startX) {
      var list = this._resetData(dataList);
      list[this._getIndex(e)].left = this._getMoveX(e, startX);
      return list;
    }
    /**
     * touchend 更新列表数据
     * @param {*} e 
     * @param {*} dataList 
     * @param {*} startX 
     * @param {*} width 
     */

  }, {
    key: "touchE",
    value: function touchE(e, dataList, startX, width) {
      var list = this._resetData(dataList);
      var disX = this._getEndX(e, startX);
      var left = 0;
      if (disX < 0) {
        // 判断滑动方向， （向左滑动）
        // 滑动的距离大于删除宽度的一半就显示操作列表 否则不显示
        if (width <= 150) {
          Math.abs(disX) > width / 2 ? left = -width : left = 0;
        } else {
          Math.abs(disX) > width / 4 ? left = -width : left = 0;
        }
      } else {
        // 向右滑动复位
        left = 0;
      }
      list[this._getIndex(e)].left = left;
      return list;
    }
    /**
     * 删除功能
     * @param {*} e 
     * @param {*} dataList 
     */

  }, {
    key: "deleteItem",
    value: function deleteItem(e, dataList) {
      dataList.splice(this._getIndex(e), 1);
      return dataList;
    }
  }]);

  return Touches;
}();

exports.default = Touches;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvdWNoZXMuanMiXSwibmFtZXMiOlsiVG91Y2hlcyIsImUiLCJjdXJyZW50VGFyZ2V0IiwiZGF0YXNldCIsImluZGV4Iiwic3RhcnRYIiwiZ2V0Q2xpZW50WCIsInRvdWNoIiwiY2hhbmdlZFRvdWNoZXMiLCJsZW5ndGgiLCJjbGllbnRYIiwiZGF0YUxpc3QiLCJpIiwibGVmdCIsInRvdWNoZXMiLCJsaXN0IiwiX3Jlc2V0RGF0YSIsIl9nZXRJbmRleCIsIl9nZXRNb3ZlWCIsIndpZHRoIiwiZGlzWCIsIl9nZXRFbmRYIiwiTWF0aCIsImFicyIsInNwbGljZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFNQSxPO0FBQ0oscUJBQWM7QUFBQTtBQUViO0FBQ0Q7Ozs7Ozs7OzhCQUlVQyxDLEVBQUc7QUFDWCxhQUFPQSxFQUFFQyxhQUFGLENBQWdCQyxPQUFoQixDQUF3QkMsS0FBL0I7QUFDRDtBQUNEOzs7Ozs7Ozs4QkFLVUgsQyxFQUFHSSxNLEVBQVE7QUFDbkIsYUFBTyxLQUFLQyxVQUFMLENBQWdCTCxDQUFoQixJQUFxQkksTUFBNUI7QUFDRDtBQUNEOzs7Ozs7Ozs2QkFLU0osQyxFQUFHSSxNLEVBQVE7QUFDbEIsVUFBSUUsUUFBUU4sRUFBRU8sY0FBZDtBQUNBLFVBQUlELE1BQU1FLE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDdEIsZUFBT0YsTUFBTSxDQUFOLEVBQVNHLE9BQVQsR0FBbUJMLE1BQTFCO0FBQ0Q7QUFDRjtBQUNEOzs7Ozs7OytCQUlXTSxRLEVBQVU7QUFDbkIsV0FBSyxJQUFJQyxDQUFULElBQWNELFFBQWQsRUFBd0I7QUFDdEJBLGlCQUFTQyxDQUFULEVBQVlDLElBQVosR0FBbUIsQ0FBbkI7QUFDRDtBQUNELGFBQU9GLFFBQVA7QUFDRDtBQUNEOzs7Ozs7OytCQUlXVixDLEVBQUc7QUFDWixVQUFJTSxRQUFRTixFQUFFYSxPQUFkO0FBQ0EsVUFBSVAsTUFBTUUsTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0QixlQUFPRixNQUFNLENBQU4sRUFBU0csT0FBaEI7QUFDRDtBQUNGO0FBQ0Q7Ozs7Ozs7OzsyQkFNT1QsQyxFQUFHVSxRLEVBQVVOLE0sRUFBUTtBQUMxQixVQUFJVSxPQUFPLEtBQUtDLFVBQUwsQ0FBZ0JMLFFBQWhCLENBQVg7QUFDQUksV0FBSyxLQUFLRSxTQUFMLENBQWVoQixDQUFmLENBQUwsRUFBd0JZLElBQXhCLEdBQStCLEtBQUtLLFNBQUwsQ0FBZWpCLENBQWYsRUFBa0JJLE1BQWxCLENBQS9CO0FBQ0EsYUFBT1UsSUFBUDtBQUNEO0FBQ0Q7Ozs7Ozs7Ozs7MkJBT09kLEMsRUFBR1UsUSxFQUFVTixNLEVBQVFjLEssRUFBTztBQUNqQyxVQUFJSixPQUFPLEtBQUtDLFVBQUwsQ0FBZ0JMLFFBQWhCLENBQVg7QUFDQSxVQUFJUyxPQUFPLEtBQUtDLFFBQUwsQ0FBY3BCLENBQWQsRUFBaUJJLE1BQWpCLENBQVg7QUFDQSxVQUFJUSxPQUFPLENBQVg7QUFDQSxVQUFJTyxPQUFPLENBQVgsRUFBYztBQUNaO0FBQ0E7QUFDQSxZQUFHRCxTQUFPLEdBQVYsRUFBYztBQUNaRyxlQUFLQyxHQUFMLENBQVNILElBQVQsSUFBaUJELFFBQVEsQ0FBekIsR0FBNkJOLE9BQU8sQ0FBQ00sS0FBckMsR0FBNkNOLE9BQU8sQ0FBcEQ7QUFDRCxTQUZELE1BRUs7QUFDSFMsZUFBS0MsR0FBTCxDQUFTSCxJQUFULElBQWlCRCxRQUFRLENBQXpCLEdBQTZCTixPQUFPLENBQUNNLEtBQXJDLEdBQTZDTixPQUFPLENBQXBEO0FBQ0Q7QUFDRixPQVJELE1BUU87QUFDTDtBQUNBQSxlQUFPLENBQVA7QUFDRDtBQUNERSxXQUFLLEtBQUtFLFNBQUwsQ0FBZWhCLENBQWYsQ0FBTCxFQUF3QlksSUFBeEIsR0FBK0JBLElBQS9CO0FBQ0EsYUFBT0UsSUFBUDtBQUNEO0FBQ0Q7Ozs7Ozs7OytCQUtXZCxDLEVBQUdVLFEsRUFBVTtBQUN0QkEsZUFBU2EsTUFBVCxDQUFnQixLQUFLUCxTQUFMLENBQWVoQixDQUFmLENBQWhCLEVBQW1DLENBQW5DO0FBQ0EsYUFBT1UsUUFBUDtBQUNEOzs7Ozs7a0JBR1lYLE8iLCJmaWxlIjoidG91Y2hlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFRvdWNoZXMge1xuICBjb25zdHJ1Y3RvcigpIHtcblxuICB9XG4gIC8qKlxuICAgKiDojrflj5bmu5HliqjliJfooajnmoTkuIvmoIflgLxcbiAgICogQHBhcmFtIHsqfSBlIFxuICAgKi9cbiAgX2dldEluZGV4KGUpIHtcbiAgICByZXR1cm4gZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcbiAgfVxuICAvKipcbiAgICog6I635Y+W5ruR5Yqo6L+H56iL5Lit5ruR5Yqo55qE6Led56a7XG4gICAqIEBwYXJhbSB7Kn0gZSBcbiAgICogQHBhcmFtIHsqfSBzdGFydFggXG4gICAqL1xuICBfZ2V0TW92ZVgoZSwgc3RhcnRYKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2xpZW50WChlKSAtIHN0YXJ0WFxuICB9XG4gIC8qKlxuICAgKiAg6I635Y+W5ruR5Yqo57uT5p2f5ruR5Yqo55qE6Led56a7XG4gICAqIEBwYXJhbSB7Kn0gZSBcbiAgICogQHBhcmFtIHsqfSBzdGFydFggXG4gICAqL1xuICBfZ2V0RW5kWChlLCBzdGFydFgpIHtcbiAgICBsZXQgdG91Y2ggPSBlLmNoYW5nZWRUb3VjaGVzXG4gICAgaWYgKHRvdWNoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuIHRvdWNoWzBdLmNsaWVudFggLSBzdGFydFhcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqICDph43nva7mlbDmja7vvIwg5oqK5omA5pyJ55qE5YiX6KGoIGxlZnQg572u5Li6IDBcbiAgICogQHBhcmFtIHsqfSBkYXRhTGlzdCBcbiAgICovXG4gIF9yZXNldERhdGEoZGF0YUxpc3QpIHtcbiAgICBmb3IgKGxldCBpIGluIGRhdGFMaXN0KSB7XG4gICAgICBkYXRhTGlzdFtpXS5sZWZ0ID0gMFxuICAgIH1cbiAgICByZXR1cm4gZGF0YUxpc3RcbiAgfVxuICAvKipcbiAgICog6I635Y+W5ruR5Yqo55qE5qiq5Z2Q5qCHXG4gICAqIEBwYXJhbSB7Kn0gZSBcbiAgICovXG4gIGdldENsaWVudFgoZSkge1xuICAgIGxldCB0b3VjaCA9IGUudG91Y2hlc1xuICAgIGlmICh0b3VjaC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiB0b3VjaFswXS5jbGllbnRYXG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiB0b3VjaG1vdmUg6L+H56iL5Lit5pu05paw5YiX6KGo5pWw5o2uXG4gICAqIEBwYXJhbSB7Kn0gZSBcbiAgICogQHBhcmFtIHsqfSBkYXRhTGlzdCBcbiAgICogQHBhcmFtIHsqfSBzdGFydFggXG4gICAqL1xuICB0b3VjaE0oZSwgZGF0YUxpc3QsIHN0YXJ0WCkge1xuICAgIGxldCBsaXN0ID0gdGhpcy5fcmVzZXREYXRhKGRhdGFMaXN0KVxuICAgIGxpc3RbdGhpcy5fZ2V0SW5kZXgoZSldLmxlZnQgPSB0aGlzLl9nZXRNb3ZlWChlLCBzdGFydFgpXG4gICAgcmV0dXJuIGxpc3RcbiAgfVxuICAvKipcbiAgICogdG91Y2hlbmQg5pu05paw5YiX6KGo5pWw5o2uXG4gICAqIEBwYXJhbSB7Kn0gZSBcbiAgICogQHBhcmFtIHsqfSBkYXRhTGlzdCBcbiAgICogQHBhcmFtIHsqfSBzdGFydFggXG4gICAqIEBwYXJhbSB7Kn0gd2lkdGggXG4gICAqL1xuICB0b3VjaEUoZSwgZGF0YUxpc3QsIHN0YXJ0WCwgd2lkdGgpIHtcbiAgICBsZXQgbGlzdCA9IHRoaXMuX3Jlc2V0RGF0YShkYXRhTGlzdClcbiAgICBsZXQgZGlzWCA9IHRoaXMuX2dldEVuZFgoZSwgc3RhcnRYKVxuICAgIGxldCBsZWZ0ID0gMFxuICAgIGlmIChkaXNYIDwgMCkge1xuICAgICAgLy8g5Yik5pat5ruR5Yqo5pa55ZCR77yMIO+8iOWQkeW3pua7keWKqO+8iVxuICAgICAgLy8g5ruR5Yqo55qE6Led56a75aSn5LqO5Yig6Zmk5a695bqm55qE5LiA5Y2K5bCx5pi+56S65pON5L2c5YiX6KGoIOWQpuWImeS4jeaYvuekulxuICAgICAgaWYod2lkdGg8PTE1MCl7XG4gICAgICAgIE1hdGguYWJzKGRpc1gpID4gd2lkdGggLyAyID8gbGVmdCA9IC13aWR0aCA6IGxlZnQgPSAwXG4gICAgICB9ZWxzZXtcbiAgICAgICAgTWF0aC5hYnMoZGlzWCkgPiB3aWR0aCAvIDQgPyBsZWZ0ID0gLXdpZHRoIDogbGVmdCA9IDBcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8g5ZCR5Y+z5ruR5Yqo5aSN5L2NXG4gICAgICBsZWZ0ID0gMFxuICAgIH1cbiAgICBsaXN0W3RoaXMuX2dldEluZGV4KGUpXS5sZWZ0ID0gbGVmdFxuICAgIHJldHVybiBsaXN0XG4gIH1cbiAgLyoqXG4gICAqIOWIoOmZpOWKn+iDvVxuICAgKiBAcGFyYW0geyp9IGUgXG4gICAqIEBwYXJhbSB7Kn0gZGF0YUxpc3QgXG4gICAqL1xuICBkZWxldGVJdGVtKGUsIGRhdGFMaXN0KSB7XG4gICAgZGF0YUxpc3Quc3BsaWNlKHRoaXMuX2dldEluZGV4KGUpLCAxKVxuICAgIHJldHVybiBkYXRhTGlzdFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvdWNoZXNcbiJdfQ==