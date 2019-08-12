'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 微信小程序JavaScriptSDK
 * 
 * @version 1.2
 * @date 2019-03-06
 * @author v_ylyue@tencent.com
 */

var ERROR_CONF = {
  KEY_ERR: 311,
  KEY_ERR_MSG: 'key格式错误',
  PARAM_ERR: 310,
  PARAM_ERR_MSG: '请求参数信息有误',
  SYSTEM_ERR: 600,
  SYSTEM_ERR_MSG: '系统错误',
  WX_ERR_CODE: 1000,
  WX_OK_CODE: 200
};
var BASE_URL = 'https://apis.map.qq.com/ws/';
var URL_SEARCH = BASE_URL + 'place/v1/search';
var URL_SUGGESTION = BASE_URL + 'place/v1/suggestion';
var URL_GET_GEOCODER = BASE_URL + 'geocoder/v1/';
var URL_CITY_LIST = BASE_URL + 'district/v1/list';
var URL_AREA_LIST = BASE_URL + 'district/v1/getchildren';
var URL_DISTANCE = BASE_URL + 'distance/v1/';
var URL_DIRECTION = BASE_URL + 'direction/v1/';
var MODE = {
  driving: 'driving',
  transit: 'transit'
};
var EARTH_RADIUS = 6378136.49;
var Utils = {
  /**
  * md5加密方法
  * 版权所有©2011 Sebastian Tschan，https：//blueimp.net
  */
  safeAdd: function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xffff;
  },
  bitRotateLeft: function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
  },
  md5cmn: function md5cmn(q, a, b, x, s, t) {
    return this.safeAdd(this.bitRotateLeft(this.safeAdd(this.safeAdd(a, q), this.safeAdd(x, t)), s), b);
  },
  md5ff: function md5ff(a, b, c, d, x, s, t) {
    return this.md5cmn(b & c | ~b & d, a, b, x, s, t);
  },
  md5gg: function md5gg(a, b, c, d, x, s, t) {
    return this.md5cmn(b & d | c & ~d, a, b, x, s, t);
  },
  md5hh: function md5hh(a, b, c, d, x, s, t) {
    return this.md5cmn(b ^ c ^ d, a, b, x, s, t);
  },
  md5ii: function md5ii(a, b, c, d, x, s, t) {
    return this.md5cmn(c ^ (b | ~d), a, b, x, s, t);
  },
  binlMD5: function binlMD5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << len % 32;
    x[(len + 64 >>> 9 << 4) + 14] = len;

    var i;
    var olda;
    var oldb;
    var oldc;
    var oldd;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (i = 0; i < x.length; i += 16) {
      olda = a;
      oldb = b;
      oldc = c;
      oldd = d;

      a = this.md5ff(a, b, c, d, x[i], 7, -680876936);
      d = this.md5ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = this.md5ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = this.md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = this.md5ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = this.md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = this.md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = this.md5ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = this.md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = this.md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = this.md5ff(c, d, a, b, x[i + 10], 17, -42063);
      b = this.md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = this.md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = this.md5ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = this.md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = this.md5ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = this.md5gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = this.md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = this.md5gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = this.md5gg(b, c, d, a, x[i], 20, -373897302);
      a = this.md5gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = this.md5gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = this.md5gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = this.md5gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = this.md5gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = this.md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = this.md5gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = this.md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = this.md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = this.md5gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = this.md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = this.md5gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = this.md5hh(a, b, c, d, x[i + 5], 4, -378558);
      d = this.md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = this.md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = this.md5hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = this.md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = this.md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = this.md5hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = this.md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = this.md5hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = this.md5hh(d, a, b, c, x[i], 11, -358537222);
      c = this.md5hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = this.md5hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = this.md5hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = this.md5hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = this.md5hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = this.md5hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = this.md5ii(a, b, c, d, x[i], 6, -198630844);
      d = this.md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = this.md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = this.md5ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = this.md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = this.md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = this.md5ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = this.md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = this.md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = this.md5ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = this.md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = this.md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = this.md5ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = this.md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = this.md5ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = this.md5ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = this.safeAdd(a, olda);
      b = this.safeAdd(b, oldb);
      c = this.safeAdd(c, oldc);
      d = this.safeAdd(d, oldd);
    }
    return [a, b, c, d];
  },
  binl2rstr: function binl2rstr(input) {
    var i;
    var output = '';
    var length32 = input.length * 32;
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xff);
    }
    return output;
  },
  rstr2binl: function rstr2binl(input) {
    var i;
    var output = [];
    output[(input.length >> 2) - 1] = undefined;
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0;
    }
    var length8 = input.length * 8;
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32;
    }
    return output;
  },
  rstrMD5: function rstrMD5(s) {
    return this.binl2rstr(this.binlMD5(this.rstr2binl(s), s.length * 8));
  },
  rstrHMACMD5: function rstrHMACMD5(key, data) {
    var i;
    var bkey = this.rstr2binl(key);
    var ipad = [];
    var opad = [];
    var hash;
    ipad[15] = opad[15] = undefined;
    if (bkey.length > 16) {
      bkey = this.binlMD5(bkey, key.length * 8);
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636;
      opad[i] = bkey[i] ^ 0x5c5c5c5c;
    }
    hash = this.binlMD5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
    return this.binl2rstr(this.binlMD5(opad.concat(hash), 512 + 128));
  },
  rstr2hex: function rstr2hex(input) {
    var hexTab = '0123456789abcdef';
    var output = '';
    var x;
    var i;
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i);
      output += hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f);
    }
    return output;
  },
  str2rstrUTF8: function str2rstrUTF8(input) {
    return unescape(encodeURIComponent(input));
  },
  rawMD5: function rawMD5(s) {
    return this.rstrMD5(this.str2rstrUTF8(s));
  },
  hexMD5: function hexMD5(s) {
    return this.rstr2hex(this.rawMD5(s));
  },
  rawHMACMD5: function rawHMACMD5(k, d) {
    return this.rstrHMACMD5(this.str2rstrUTF8(k), str2rstrUTF8(d));
  },
  hexHMACMD5: function hexHMACMD5(k, d) {
    return this.rstr2hex(this.rawHMACMD5(k, d));
  },
  md5: function md5(string, key, raw) {
    if (!key) {
      if (!raw) {
        return this.hexMD5(string);
      }
      return this.rawMD5(string);
    }
    if (!raw) {
      return this.hexHMACMD5(key, string);
    }
    return this.rawHMACMD5(key, string);
  },

  /**
   * 得到md5加密后的sig参数
   * @param {Object} requestParam 接口参数
   * @param {String} sk签名字符串
   * @param {String} featrue 方法名
   * @return 返回加密后的sig参数
   */
  getSig: function getSig(requestParam, sk, feature, mode) {
    var sig = null;
    var requestArr = [];
    Object.keys(requestParam).sort().forEach(function (key) {
      requestArr.push(key + '=' + requestParam[key]);
    });
    if (feature == 'search') {
      sig = '/ws/place/v1/search?' + requestArr.join('&') + sk;
    }
    if (feature == 'suggest') {
      sig = '/ws/place/v1/suggestion?' + requestArr.join('&') + sk;
    }
    if (feature == 'reverseGeocoder') {
      sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'geocoder') {
      sig = '/ws/geocoder/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'getCityList') {
      sig = '/ws/district/v1/list?' + requestArr.join('&') + sk;
    }
    if (feature == 'getDistrictByCityId') {
      sig = '/ws/district/v1/getchildren?' + requestArr.join('&') + sk;
    }
    if (feature == 'calculateDistance') {
      sig = '/ws/distance/v1/?' + requestArr.join('&') + sk;
    }
    if (feature == 'direction') {
      sig = '/ws/direction/v1/' + mode + '?' + requestArr.join('&') + sk;
    }
    sig = this.md5(sig);
    return sig;
  },

  /**
   * 得到终点query字符串
   * @param {Array|String} 检索数据
   */
  location2query: function location2query(data) {
    if (typeof data == 'string') {
      return data;
    }
    var query = '';
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      if (!!query) {
        query += ';';
      }
      if (d.location) {
        query = query + d.location.lat + ',' + d.location.lng;
      }
      if (d.latitude && d.longitude) {
        query = query + d.latitude + ',' + d.longitude;
      }
    }
    return query;
  },


  /**
   * 计算角度
   */
  rad: function rad(d) {
    return d * Math.PI / 180.0;
  },

  /**
   * 处理终点location数组
   * @return 返回终点数组
   */
  getEndLocation: function getEndLocation(location) {
    var to = location.split(';');
    var endLocation = [];
    for (var i = 0; i < to.length; i++) {
      endLocation.push({
        lat: parseFloat(to[i].split(',')[0]),
        lng: parseFloat(to[i].split(',')[1])
      });
    }
    return endLocation;
  },


  /**
   * 计算两点间直线距离
   * @param a 表示纬度差
   * @param b 表示经度差
   * @return 返回的是距离，单位m
   */
  getDistance: function getDistance(latFrom, lngFrom, latTo, lngTo) {
    var radLatFrom = this.rad(latFrom);
    var radLatTo = this.rad(latTo);
    var a = radLatFrom - radLatTo;
    var b = this.rad(lngFrom) - this.rad(lngTo);
    var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));
    distance = distance * EARTH_RADIUS;
    distance = Math.round(distance * 10000) / 10000;
    return parseFloat(distance.toFixed(0));
  },

  /**
   * 使用微信接口进行定位
   */
  getWXLocation: function getWXLocation(success, fail, complete) {
    wx.getLocation({
      type: 'gcj02',
      success: success,
      fail: fail,
      complete: complete
    });
  },


  /**
   * 获取location参数
   */
  getLocationParam: function getLocationParam(location) {
    if (typeof location == 'string') {
      var locationArr = location.split(',');
      if (locationArr.length === 2) {
        location = {
          latitude: location.split(',')[0],
          longitude: location.split(',')[1]
        };
      } else {
        location = {};
      }
    }
    return location;
  },


  /**
   * 回调函数默认处理
   */
  polyfillParam: function polyfillParam(param) {
    param.success = param.success || function () {};
    param.fail = param.fail || function () {};
    param.complete = param.complete || function () {};
  },


  /**
   * 验证param对应的key值是否为空
   * 
   * @param {Object} param 接口参数
   * @param {String} key 对应参数的key
   */
  checkParamKeyEmpty: function checkParamKeyEmpty(param, key) {
    if (!param[key]) {
      var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + key + '参数格式有误');
      param.fail(errconf);
      param.complete(errconf);
      return true;
    }
    return false;
  },


  /**
   * 验证参数中是否存在检索词keyword
   * 
   * @param {Object} param 接口参数
   */
  checkKeyword: function checkKeyword(param) {
    return !this.checkParamKeyEmpty(param, 'keyword');
  },


  /**
   * 验证location值
   * 
   * @param {Object} param 接口参数
   */
  checkLocation: function checkLocation(param) {
    var location = this.getLocationParam(param.location);
    if (!location || !location.latitude || !location.longitude) {
      var errconf = this.buildErrorConfig(ERROR_CONF.PARAM_ERR, ERROR_CONF.PARAM_ERR_MSG + ' location参数格式有误');
      param.fail(errconf);
      param.complete(errconf);
      return false;
    }
    return true;
  },


  /**
   * 构造错误数据结构
   * @param {Number} errCode 错误码
   * @param {Number} errMsg 错误描述
   */
  buildErrorConfig: function buildErrorConfig(errCode, errMsg) {
    return {
      status: errCode,
      message: errMsg
    };
  },


  /**
   * 
   * 数据处理函数
   * 根据传入参数不同处理不同数据
   * @param {String} feature 功能名称
   * search 地点搜索
   * suggest关键词提示
   * reverseGeocoder逆地址解析
   * geocoder地址解析
   * getCityList获取城市列表：父集
   * getDistrictByCityId获取区县列表：子集
   * calculateDistance距离计算
   * @param {Object} param 接口参数
   * @param {Object} data 数据
   */
  handleData: function handleData(param, data, feature) {
    if (feature == 'search') {
      var searchResult = data.data;
      var searchSimplify = [];
      for (var i = 0; i < searchResult.length; i++) {
        searchSimplify.push({
          id: searchResult[i].id || null,
          title: searchResult[i].title || null,
          latitude: searchResult[i].location && searchResult[i].location.lat || null,
          longitude: searchResult[i].location && searchResult[i].location.lng || null,
          address: searchResult[i].address || null,
          category: searchResult[i].category || null,
          tel: searchResult[i].tel || null,
          adcode: searchResult[i].ad_info && searchResult[i].ad_info.adcode || null,
          city: searchResult[i].ad_info && searchResult[i].ad_info.city || null,
          district: searchResult[i].ad_info && searchResult[i].ad_info.district || null,
          province: searchResult[i].ad_info && searchResult[i].ad_info.province || null
        });
      }
      param.success(data, {
        searchResult: searchResult,
        searchSimplify: searchSimplify
      });
    } else if (feature == 'suggest') {
      var suggestResult = data.data;
      var suggestSimplify = [];
      for (var i = 0; i < suggestResult.length; i++) {
        suggestSimplify.push({
          adcode: suggestResult[i].adcode || null,
          address: suggestResult[i].address || null,
          category: suggestResult[i].category || null,
          city: suggestResult[i].city || null,
          district: suggestResult[i].district || null,
          id: suggestResult[i].id || null,
          latitude: suggestResult[i].location && suggestResult[i].location.lat || null,
          longitude: suggestResult[i].location && suggestResult[i].location.lng || null,
          province: suggestResult[i].province || null,
          title: suggestResult[i].title || null,
          type: suggestResult[i].type || null
        });
      }
      param.success(data, {
        suggestResult: suggestResult,
        suggestSimplify: suggestSimplify
      });
    } else if (feature == 'reverseGeocoder') {
      var reverseGeocoderResult = data.result;
      var reverseGeocoderSimplify = {
        address: reverseGeocoderResult.address || null,
        latitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lat || null,
        longitude: reverseGeocoderResult.location && reverseGeocoderResult.location.lng || null,
        adcode: reverseGeocoderResult.ad_info && reverseGeocoderResult.ad_info.adcode || null,
        city: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.city || null,
        district: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.district || null,
        nation: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.nation || null,
        province: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.province || null,
        street: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street || null,
        street_number: reverseGeocoderResult.address_component && reverseGeocoderResult.address_component.street_number || null,
        recommend: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.recommend || null,
        rough: reverseGeocoderResult.formatted_addresses && reverseGeocoderResult.formatted_addresses.rough || null
      };
      if (reverseGeocoderResult.pois) {
        //判断是否返回周边poi
        var pois = reverseGeocoderResult.pois;
        var poisSimplify = [];
        for (var i = 0; i < pois.length; i++) {
          poisSimplify.push({
            id: pois[i].id || null,
            title: pois[i].title || null,
            latitude: pois[i].location && pois[i].location.lat || null,
            longitude: pois[i].location && pois[i].location.lng || null,
            address: pois[i].address || null,
            category: pois[i].category || null,
            adcode: pois[i].ad_info && pois[i].ad_info.adcode || null,
            city: pois[i].ad_info && pois[i].ad_info.city || null,
            district: pois[i].ad_info && pois[i].ad_info.district || null,
            province: pois[i].ad_info && pois[i].ad_info.province || null
          });
        }
        param.success(data, {
          reverseGeocoderResult: reverseGeocoderResult,
          reverseGeocoderSimplify: reverseGeocoderSimplify,
          pois: pois,
          poisSimplify: poisSimplify
        });
      } else {
        param.success(data, {
          reverseGeocoderResult: reverseGeocoderResult,
          reverseGeocoderSimplify: reverseGeocoderSimplify
        });
      }
    } else if (feature == 'geocoder') {
      var geocoderResult = data.result;
      var geocoderSimplify = {
        title: geocoderResult.title || null,
        latitude: geocoderResult.location && geocoderResult.location.lat || null,
        longitude: geocoderResult.location && geocoderResult.location.lng || null,
        adcode: geocoderResult.ad_info && geocoderResult.ad_info.adcode || null,
        province: geocoderResult.address_components && geocoderResult.address_components.province || null,
        city: geocoderResult.address_components && geocoderResult.address_components.city || null,
        district: geocoderResult.address_components && geocoderResult.address_components.district || null,
        street: geocoderResult.address_components && geocoderResult.address_components.street || null,
        street_number: geocoderResult.address_components && geocoderResult.address_components.street_number || null,
        level: geocoderResult.level || null
      };
      param.success(data, {
        geocoderResult: geocoderResult,
        geocoderSimplify: geocoderSimplify
      });
    } else if (feature == 'getCityList') {
      var provinceResult = data.result[0];
      var cityResult = data.result[1];
      var districtResult = data.result[2];
      param.success(data, {
        provinceResult: provinceResult,
        cityResult: cityResult,
        districtResult: districtResult
      });
    } else if (feature == 'getDistrictByCityId') {
      var districtByCity = data.result[0];
      param.success(data, districtByCity);
    } else if (feature == 'calculateDistance') {
      var calculateDistanceResult = data.result.elements;
      var distance = [];
      for (var i = 0; i < calculateDistanceResult.length; i++) {
        distance.push(calculateDistanceResult[i].distance);
      }
      param.success(data, {
        calculateDistanceResult: calculateDistanceResult,
        distance: distance
      });
    } else if (feature == 'direction') {
      var direction = data.result.routes;
      param.success(data, direction);
    } else {
      param.success(data);
    }
  },


  /**
   * 构造微信请求参数，公共属性处理
   * 
   * @param {Object} param 接口参数
   * @param {Object} param 配置项
   * @param {String} feature 方法名
   */
  buildWxRequestConfig: function buildWxRequestConfig(param, options, feature) {
    var that = this;
    options.header = { "content-type": "application/json" };
    options.method = 'GET';
    options.success = function (res) {
      var data = res.data;
      if (data.status === 0) {
        that.handleData(param, data, feature);
      } else {
        param.fail(data);
      }
    };
    options.fail = function (res) {
      res.statusCode = ERROR_CONF.WX_ERR_CODE;
      param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
    };
    options.complete = function (res) {
      var statusCode = +res.statusCode;
      switch (statusCode) {
        case ERROR_CONF.WX_ERR_CODE:
          {
            param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
            break;
          }
        case ERROR_CONF.WX_OK_CODE:
          {
            var data = res.data;
            if (data.status === 0) {
              param.complete(data);
            } else {
              param.complete(that.buildErrorConfig(data.status, data.message));
            }
            break;
          }
        default:
          {
            param.complete(that.buildErrorConfig(ERROR_CONF.SYSTEM_ERR, ERROR_CONF.SYSTEM_ERR_MSG));
          }

      }
    };
    return options;
  },


  /**
   * 处理用户参数是否传入坐标进行不同的处理
   */
  locationProcess: function locationProcess(param, locationsuccess, locationfail, locationcomplete) {
    var that = this;
    locationfail = locationfail || function (res) {
      res.statusCode = ERROR_CONF.WX_ERR_CODE;
      param.fail(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
    };
    locationcomplete = locationcomplete || function (res) {
      if (res.statusCode == ERROR_CONF.WX_ERR_CODE) {
        param.complete(that.buildErrorConfig(ERROR_CONF.WX_ERR_CODE, res.errMsg));
      }
    };
    if (!param.location) {
      that.getWXLocation(locationsuccess, locationfail, locationcomplete);
    } else if (that.checkLocation(param)) {
      var location = Utils.getLocationParam(param.location);
      locationsuccess(location);
    }
  }
};

var QQMapWX = function () {

  /**
   * 构造函数
   * 
   * @param {Object} options 接口参数,key 为必选参数
   */
  function QQMapWX(options) {
    _classCallCheck(this, QQMapWX);

    if (!options.key) {
      throw Error('key值不能为空');
    }
    this.key = options.key;
  }

  _createClass(QQMapWX, [{
    key: 'search',


    /**
     * POI周边检索
     *
     * @param {Object} options 接口参数对象
     * 
     * 参数对象结构可以参考
     * @see http://lbs.qq.com/webservice_v1/guide-search.html
     */
    value: function search(options) {
      var that = this;
      options = options || {};

      Utils.polyfillParam(options);

      if (!Utils.checkKeyword(options)) {
        return;
      }

      var requestParam = {
        keyword: options.keyword,
        orderby: options.orderby || '_distance',
        page_size: options.page_size || 10,
        page_index: options.page_index || 1,
        output: 'json',
        key: that.key
      };

      if (options.address_format) {
        requestParam.address_format = options.address_format;
      }

      if (options.filter) {
        requestParam.filter = options.filter;
      }

      var distance = options.distance || "1000";
      var auto_extend = options.auto_extend || 1;
      var region = null;
      var rectangle = null;

      //判断城市限定参数
      if (options.region) {
        region = options.region;
      }

      //矩形限定坐标(暂时只支持字符串格式)
      if (options.rectangle) {
        rectangle = options.rectangle;
      }

      var locationsuccess = function locationsuccess(result) {
        if (region && !rectangle) {
          //城市限定参数拼接
          requestParam.boundary = "region(" + region + "," + auto_extend + "," + result.latitude + "," + result.longitude + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        } else if (rectangle && !region) {
          //矩形搜索
          requestParam.boundary = "rectangle(" + rectangle + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        } else {
          requestParam.boundary = "nearby(" + result.latitude + "," + result.longitude + "," + distance + "," + auto_extend + ")";
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'search');
          }
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_SEARCH,
          data: requestParam
        }, 'search'));
      };
      Utils.locationProcess(options, locationsuccess);
    }
  }, {
    key: 'getSuggestion',


    /**
     * sug模糊检索
     *
     * @param {Object} options 接口参数对象
     * 
     * 参数对象结构可以参考
     * http://lbs.qq.com/webservice_v1/guide-suggestion.html
     */
    value: function getSuggestion(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (!Utils.checkKeyword(options)) {
        return;
      }

      var requestParam = {
        keyword: options.keyword,
        region: options.region || '全国',
        region_fix: options.region_fix || 0,
        policy: options.policy || 0,
        page_size: options.page_size || 10, //控制显示条数
        page_index: options.page_index || 1, //控制页数
        get_subpois: options.get_subpois || 0, //返回子地点
        output: 'json',
        key: that.key
      };
      //长地址
      if (options.address_format) {
        requestParam.address_format = options.address_format;
      }
      //过滤
      if (options.filter) {
        requestParam.filter = options.filter;
      }
      //排序
      if (options.location) {
        var locationsuccess = function locationsuccess(result) {
          requestParam.location = result.latitude + ',' + result.longitude;
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');
          }
          wx.request(Utils.buildWxRequestConfig(options, {
            url: URL_SUGGESTION,
            data: requestParam
          }, "suggest"));
        };
        Utils.locationProcess(options, locationsuccess);
      } else {
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'suggest');
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_SUGGESTION,
          data: requestParam
        }, "suggest"));
      }
    }
  }, {
    key: 'reverseGeocoder',


    /**
     * 逆地址解析
     *
     * @param {Object} options 接口参数对象
     * 
     * 请求参数结构可以参考
     * http://lbs.qq.com/webservice_v1/guide-gcoder.html
     */
    value: function reverseGeocoder(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      var requestParam = {
        coord_type: options.coord_type || 5,
        get_poi: options.get_poi || 0,
        output: 'json',
        key: that.key
      };
      if (options.poi_options) {
        requestParam.poi_options = options.poi_options;
      }

      var locationsuccess = function locationsuccess(result) {
        requestParam.location = result.latitude + ',' + result.longitude;
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'reverseGeocoder');
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: URL_GET_GEOCODER,
          data: requestParam
        }, 'reverseGeocoder'));
      };
      Utils.locationProcess(options, locationsuccess);
    }
  }, {
    key: 'geocoder',


    /**
     * 地址解析
     *
     * @param {Object} options 接口参数对象
     * 
     * 请求参数结构可以参考
     * http://lbs.qq.com/webservice_v1/guide-geocoder.html
     */
    value: function geocoder(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'address')) {
        return;
      }

      var requestParam = {
        address: options.address,
        output: 'json',
        key: that.key
      };

      //城市限定
      if (options.region) {
        requestParam.region = options.region;
      }

      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'geocoder');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_GET_GEOCODER,
        data: requestParam
      }, 'geocoder'));
    }
  }, {
    key: 'getCityList',


    /**
     * 获取城市列表
     *
     * @param {Object} options 接口参数对象
     * 
     * 请求参数结构可以参考
     * http://lbs.qq.com/webservice_v1/guide-region.html
     */
    value: function getCityList(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);
      var requestParam = {
        output: 'json',
        key: that.key
      };

      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'getCityList');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_CITY_LIST,
        data: requestParam
      }, 'getCityList'));
    }
  }, {
    key: 'getDistrictByCityId',


    /**
     * 获取对应城市ID的区县列表
     *
     * @param {Object} options 接口参数对象
     * 
     * 请求参数结构可以参考
     * http://lbs.qq.com/webservice_v1/guide-region.html
     */
    value: function getDistrictByCityId(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'id')) {
        return;
      }

      var requestParam = {
        id: options.id || '',
        output: 'json',
        key: that.key
      };

      if (options.sig) {
        requestParam.sig = Utils.getSig(requestParam, options.sig, 'getDistrictByCityId');
      }

      wx.request(Utils.buildWxRequestConfig(options, {
        url: URL_AREA_LIST,
        data: requestParam
      }, 'getDistrictByCityId'));
    }
  }, {
    key: 'calculateDistance',


    /**
     * 用于单起点到多终点的路线距离(非直线距离)计算：
     * 支持两种距离计算方式：步行和驾车。
     * 起点到终点最大限制直线距离10公里。
     *
     * 新增直线距离计算。
     * 
     * @param {Object} options 接口参数对象
     * 
     * 请求参数结构可以参考
     * http://lbs.qq.com/webservice_v1/guide-distance.html
     */
    value: function calculateDistance(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'to')) {
        return;
      }

      var requestParam = {
        mode: options.mode || 'walking',
        to: Utils.location2query(options.to),
        output: 'json',
        key: that.key
      };

      if (options.from) {
        options.location = options.from;
      }

      //计算直线距离
      if (requestParam.mode == 'straight') {
        var locationsuccess = function locationsuccess(result) {
          var locationTo = Utils.getEndLocation(requestParam.to); //处理终点坐标
          var data = {
            message: "query ok",
            result: {
              elements: []
            },
            status: 0
          };
          for (var i = 0; i < locationTo.length; i++) {
            data.result.elements.push({ //将坐标存入
              distance: Utils.getDistance(result.latitude, result.longitude, locationTo[i].lat, locationTo[i].lng),
              duration: 0,
              from: {
                lat: result.latitude,
                lng: result.longitude
              },
              to: {
                lat: locationTo[i].lat,
                lng: locationTo[i].lng
              }
            });
          }
          var calculateResult = data.result.elements;
          var distanceResult = [];
          for (var i = 0; i < calculateResult.length; i++) {
            distanceResult.push(calculateResult[i].distance);
          }
          return options.success(data, {
            calculateResult: calculateResult,
            distanceResult: distanceResult
          });
        };

        Utils.locationProcess(options, locationsuccess);
      } else {
        var locationsuccess = function locationsuccess(result) {
          requestParam.from = result.latitude + ',' + result.longitude;
          if (options.sig) {
            requestParam.sig = Utils.getSig(requestParam, options.sig, 'calculateDistance');
          }
          wx.request(Utils.buildWxRequestConfig(options, {
            url: URL_DISTANCE,
            data: requestParam
          }, 'calculateDistance'));
        };

        Utils.locationProcess(options, locationsuccess);
      }
    }
  }, {
    key: 'direction',


    /**
     * 路线规划：
     * 
     * @param {Object} options 接口参数对象
     * 
     * 请求参数结构可以参考
     * https://lbs.qq.com/webservice_v1/guide-road.html
     */
    value: function direction(options) {
      var that = this;
      options = options || {};
      Utils.polyfillParam(options);

      if (Utils.checkParamKeyEmpty(options, 'to')) {
        return;
      }

      var requestParam = {
        output: 'json',
        key: that.key
      };

      //to格式处理
      if (typeof options.to == 'string') {
        requestParam.to = options.to;
      } else {
        requestParam.to = options.to.latitude + ',' + options.to.longitude;
      }
      //初始化局部请求域名
      var SET_URL_DIRECTION = null;
      //设置默认mode属性
      options.mode = options.mode || MODE.driving;

      //设置请求域名
      SET_URL_DIRECTION = URL_DIRECTION + options.mode;

      if (options.from) {
        options.location = options.from;
      }

      if (options.mode == MODE.driving) {
        if (options.from_poi) {
          requestParam.from_poi = options.from_poi;
        }
        if (options.heading) {
          requestParam.heading = options.heading;
        }
        if (options.speed) {
          requestParam.speed = options.speed;
        }
        if (options.accuracy) {
          requestParam.accuracy = options.accuracy;
        }
        if (options.road_type) {
          requestParam.road_type = options.road_type;
        }
        if (options.to_poi) {
          requestParam.to_poi = options.to_poi;
        }
        if (options.from_track) {
          requestParam.from_track = options.from_track;
        }
        if (options.waypoints) {
          requestParam.waypoints = options.waypoints;
        }
        if (options.policy) {
          requestParam.policy = options.policy;
        }
        if (options.plate_number) {
          requestParam.plate_number = options.plate_number;
        }
      }

      if (options.mode == MODE.transit) {
        if (options.departure_time) {
          requestParam.departure_time = options.departure_time;
        }
        if (options.policy) {
          requestParam.policy = options.policy;
        }
      }

      var locationsuccess = function locationsuccess(result) {
        requestParam.from = result.latitude + ',' + result.longitude;
        if (options.sig) {
          requestParam.sig = Utils.getSig(requestParam, options.sig, 'direction', options.mode);
        }
        wx.request(Utils.buildWxRequestConfig(options, {
          url: SET_URL_DIRECTION,
          data: requestParam
        }, 'direction'));
      };

      Utils.locationProcess(options, locationsuccess);
    }
  }]);

  return QQMapWX;
}();

;

module.exports = QQMapWX;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInFxbWFwLXd4LWpzc2RrLmpzIl0sIm5hbWVzIjpbIkVSUk9SX0NPTkYiLCJLRVlfRVJSIiwiS0VZX0VSUl9NU0ciLCJQQVJBTV9FUlIiLCJQQVJBTV9FUlJfTVNHIiwiU1lTVEVNX0VSUiIsIlNZU1RFTV9FUlJfTVNHIiwiV1hfRVJSX0NPREUiLCJXWF9PS19DT0RFIiwiQkFTRV9VUkwiLCJVUkxfU0VBUkNIIiwiVVJMX1NVR0dFU1RJT04iLCJVUkxfR0VUX0dFT0NPREVSIiwiVVJMX0NJVFlfTElTVCIsIlVSTF9BUkVBX0xJU1QiLCJVUkxfRElTVEFOQ0UiLCJVUkxfRElSRUNUSU9OIiwiTU9ERSIsImRyaXZpbmciLCJ0cmFuc2l0IiwiRUFSVEhfUkFESVVTIiwiVXRpbHMiLCJzYWZlQWRkIiwieCIsInkiLCJsc3ciLCJtc3ciLCJiaXRSb3RhdGVMZWZ0IiwibnVtIiwiY250IiwibWQ1Y21uIiwicSIsImEiLCJiIiwicyIsInQiLCJtZDVmZiIsImMiLCJkIiwibWQ1Z2ciLCJtZDVoaCIsIm1kNWlpIiwiYmlubE1ENSIsImxlbiIsImkiLCJvbGRhIiwib2xkYiIsIm9sZGMiLCJvbGRkIiwibGVuZ3RoIiwiYmlubDJyc3RyIiwiaW5wdXQiLCJvdXRwdXQiLCJsZW5ndGgzMiIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInJzdHIyYmlubCIsInVuZGVmaW5lZCIsImxlbmd0aDgiLCJjaGFyQ29kZUF0IiwicnN0ck1ENSIsInJzdHJITUFDTUQ1Iiwia2V5IiwiZGF0YSIsImJrZXkiLCJpcGFkIiwib3BhZCIsImhhc2giLCJjb25jYXQiLCJyc3RyMmhleCIsImhleFRhYiIsImNoYXJBdCIsInN0cjJyc3RyVVRGOCIsInVuZXNjYXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicmF3TUQ1IiwiaGV4TUQ1IiwicmF3SE1BQ01ENSIsImsiLCJoZXhITUFDTUQ1IiwibWQ1Iiwic3RyaW5nIiwicmF3IiwiZ2V0U2lnIiwicmVxdWVzdFBhcmFtIiwic2siLCJmZWF0dXJlIiwibW9kZSIsInNpZyIsInJlcXVlc3RBcnIiLCJPYmplY3QiLCJrZXlzIiwic29ydCIsImZvckVhY2giLCJwdXNoIiwiam9pbiIsImxvY2F0aW9uMnF1ZXJ5IiwicXVlcnkiLCJsb2NhdGlvbiIsImxhdCIsImxuZyIsImxhdGl0dWRlIiwibG9uZ2l0dWRlIiwicmFkIiwiTWF0aCIsIlBJIiwiZ2V0RW5kTG9jYXRpb24iLCJ0byIsInNwbGl0IiwiZW5kTG9jYXRpb24iLCJwYXJzZUZsb2F0IiwiZ2V0RGlzdGFuY2UiLCJsYXRGcm9tIiwibG5nRnJvbSIsImxhdFRvIiwibG5nVG8iLCJyYWRMYXRGcm9tIiwicmFkTGF0VG8iLCJkaXN0YW5jZSIsImFzaW4iLCJzcXJ0IiwicG93Iiwic2luIiwiY29zIiwicm91bmQiLCJ0b0ZpeGVkIiwiZ2V0V1hMb2NhdGlvbiIsInN1Y2Nlc3MiLCJmYWlsIiwiY29tcGxldGUiLCJ3eCIsImdldExvY2F0aW9uIiwidHlwZSIsImdldExvY2F0aW9uUGFyYW0iLCJsb2NhdGlvbkFyciIsInBvbHlmaWxsUGFyYW0iLCJwYXJhbSIsImNoZWNrUGFyYW1LZXlFbXB0eSIsImVycmNvbmYiLCJidWlsZEVycm9yQ29uZmlnIiwiY2hlY2tLZXl3b3JkIiwiY2hlY2tMb2NhdGlvbiIsImVyckNvZGUiLCJlcnJNc2ciLCJzdGF0dXMiLCJtZXNzYWdlIiwiaGFuZGxlRGF0YSIsInNlYXJjaFJlc3VsdCIsInNlYXJjaFNpbXBsaWZ5IiwiaWQiLCJ0aXRsZSIsImFkZHJlc3MiLCJjYXRlZ29yeSIsInRlbCIsImFkY29kZSIsImFkX2luZm8iLCJjaXR5IiwiZGlzdHJpY3QiLCJwcm92aW5jZSIsInN1Z2dlc3RSZXN1bHQiLCJzdWdnZXN0U2ltcGxpZnkiLCJyZXZlcnNlR2VvY29kZXJSZXN1bHQiLCJyZXN1bHQiLCJyZXZlcnNlR2VvY29kZXJTaW1wbGlmeSIsImFkZHJlc3NfY29tcG9uZW50IiwibmF0aW9uIiwic3RyZWV0Iiwic3RyZWV0X251bWJlciIsInJlY29tbWVuZCIsImZvcm1hdHRlZF9hZGRyZXNzZXMiLCJyb3VnaCIsInBvaXMiLCJwb2lzU2ltcGxpZnkiLCJnZW9jb2RlclJlc3VsdCIsImdlb2NvZGVyU2ltcGxpZnkiLCJhZGRyZXNzX2NvbXBvbmVudHMiLCJsZXZlbCIsInByb3ZpbmNlUmVzdWx0IiwiY2l0eVJlc3VsdCIsImRpc3RyaWN0UmVzdWx0IiwiZGlzdHJpY3RCeUNpdHkiLCJjYWxjdWxhdGVEaXN0YW5jZVJlc3VsdCIsImVsZW1lbnRzIiwiZGlyZWN0aW9uIiwicm91dGVzIiwiYnVpbGRXeFJlcXVlc3RDb25maWciLCJvcHRpb25zIiwidGhhdCIsImhlYWRlciIsIm1ldGhvZCIsInJlcyIsInN0YXR1c0NvZGUiLCJsb2NhdGlvblByb2Nlc3MiLCJsb2NhdGlvbnN1Y2Nlc3MiLCJsb2NhdGlvbmZhaWwiLCJsb2NhdGlvbmNvbXBsZXRlIiwiUVFNYXBXWCIsIkVycm9yIiwia2V5d29yZCIsIm9yZGVyYnkiLCJwYWdlX3NpemUiLCJwYWdlX2luZGV4IiwiYWRkcmVzc19mb3JtYXQiLCJmaWx0ZXIiLCJhdXRvX2V4dGVuZCIsInJlZ2lvbiIsInJlY3RhbmdsZSIsImJvdW5kYXJ5IiwicmVxdWVzdCIsInVybCIsInJlZ2lvbl9maXgiLCJwb2xpY3kiLCJnZXRfc3VicG9pcyIsImNvb3JkX3R5cGUiLCJnZXRfcG9pIiwicG9pX29wdGlvbnMiLCJmcm9tIiwibG9jYXRpb25UbyIsImR1cmF0aW9uIiwiY2FsY3VsYXRlUmVzdWx0IiwiZGlzdGFuY2VSZXN1bHQiLCJTRVRfVVJMX0RJUkVDVElPTiIsImZyb21fcG9pIiwiaGVhZGluZyIsInNwZWVkIiwiYWNjdXJhY3kiLCJyb2FkX3R5cGUiLCJ0b19wb2kiLCJmcm9tX3RyYWNrIiwid2F5cG9pbnRzIiwicGxhdGVfbnVtYmVyIiwiZGVwYXJ0dXJlX3RpbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7Ozs7Ozs7QUFRQSxJQUFJQSxhQUFhO0FBQ2JDLFdBQVMsR0FESTtBQUViQyxlQUFh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QWIsR0FBNEI1QyxRQUFRNEMsWUFBcEM7QUFDRDtBQUNGOztBQUVELFVBQUk1QyxRQUFRbkcsSUFBUixJQUFnQnRFLEtBQUtFLE9BQXpCLEVBQWtDO0FBQ2hDLFlBQUl1SyxRQUFRNkMsY0FBWixFQUE0QjtBQUMxQm5KLHVCQUFhbUosY0FBYixHQUE4QjdDLFFBQVE2QyxjQUF0QztBQUNEO0FBQ0QsWUFBSTdDLFFBQVF5QixNQUFaLEVBQW9CO0FBQ2xCL0gsdUJBQWErSCxNQUFiLEdBQXNCekIsUUFBUXlCLE1BQTlCO0FBQ0Q7QUFDRjs7QUFFRCxVQUFJbEIsa0JBQWtCLFNBQWxCQSxlQUFrQixDQUFVL0IsTUFBVixFQUFrQjtBQUN0QzlFLHFCQUFhb0ksSUFBYixHQUFvQnRELE9BQU83RCxRQUFQLEdBQWtCLEdBQWxCLEdBQXdCNkQsT0FBTzVELFNBQW5EO0FBQ0EsWUFBSW9GLFFBQVFsRyxHQUFaLEVBQWlCO0FBQ2ZKLHVCQUFhSSxHQUFiLEdBQW1CbkUsTUFBTThELE1BQU4sQ0FBYUMsWUFBYixFQUEyQnNHLFFBQVFsRyxHQUFuQyxFQUF3QyxXQUF4QyxFQUFvRGtHLFFBQVFuRyxJQUE1RCxDQUFuQjtBQUNEO0FBQ0QyQyxXQUFHOEUsT0FBSCxDQUFXM0wsTUFBTW9LLG9CQUFOLENBQTJCQyxPQUEzQixFQUFvQztBQUM3Q3VCLGVBQUtZLGlCQUR3QztBQUU3QzlKLGdCQUFNcUI7QUFGdUMsU0FBcEMsRUFHUixXQUhRLENBQVg7QUFJRCxPQVREOztBQVdBL0QsWUFBTTJLLGVBQU4sQ0FBc0JOLE9BQXRCLEVBQStCTyxlQUEvQjtBQUNEOzs7Ozs7QUFDRjs7QUFFRHVDLE9BQU9DLE9BQVAsR0FBaUJyQyxPQUFqQiIsImZpbGUiOiJxcW1hcC13eC1qc3Nkay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiDlvq7kv6HlsI/nqIvluo9KYXZhU2NyaXB0U0RLXHJcbiAqIFxyXG4gKiBAdmVyc2lvbiAxLjJcclxuICogQGRhdGUgMjAxOS0wMy0wNlxyXG4gKiBAYXV0aG9yIHZfeWx5dWVAdGVuY2VudC5jb21cclxuICovXHJcblxyXG52YXIgRVJST1JfQ09ORiA9IHtcclxuICAgIEtFWV9FUlI6IDMxMSxcclxuICAgIEtFWV9FUlJfTVNHOiAna2V55qC85byP6ZSZ6K+vJyxcclxuICAgIFBBUkFNX0VSUjogMzEwLFxyXG4gICAgUEFSQU1fRVJSX01TRzogJ+ivt+axguWPguaVsOS/oeaBr+acieivrycsXHJcbiAgICBTWVNURU1fRVJSOiA2MDAsXHJcbiAgICBTWVNURU1fRVJSX01TRzogJ+ezu+e7n+mUmeivrycsXHJcbiAgICBXWF9FUlJfQ09ERTogMTAwMCxcclxuICAgIFdYX09LX0NPREU6IDIwMFxyXG59O1xyXG52YXIgQkFTRV9VUkwgPSAnaHR0cHM6Ly9hcGlzLm1hcC5xcS5jb20vd3MvJztcclxudmFyIFVSTF9TRUFSQ0ggPSBCQVNFX1VSTCArICdwbGFjZS92MS9zZWFyY2gnO1xyXG52YXIgVVJMX1NVR0dFU1RJT04gPSBCQVNFX1VSTCArICdwbGFjZS92MS9zdWdnZXN0aW9uJztcclxudmFyIFVSTF9HRVRfR0VPQ09ERVIgPSBCQVNFX1VSTCArICdnZW9jb2Rlci92MS8nO1xyXG52YXIgVVJMX0NJVFlfTElTVCA9IEJBU0VfVVJMICsgJ2Rpc3RyaWN0L3YxL2xpc3QnO1xyXG52YXIgVVJMX0FSRUFfTElTVCA9IEJBU0VfVVJMICsgJ2Rpc3RyaWN0L3YxL2dldGNoaWxkcmVuJztcclxudmFyIFVSTF9ESVNUQU5DRSA9IEJBU0VfVVJMICsgJ2Rpc3RhbmNlL3YxLyc7XHJcbnZhciBVUkxfRElSRUNUSU9OID0gQkFTRV9VUkwgKyAnZGlyZWN0aW9uL3YxLyc7XHJcbnZhciBNT0RFID0ge1xyXG4gIGRyaXZpbmc6ICdkcml2aW5nJyxcclxuICB0cmFuc2l0OiAndHJhbnNpdCdcclxufTtcclxudmFyIEVBUlRIX1JBRElVUyA9IDYzNzgxMzYuNDk7XHJcbnZhciBVdGlscyA9IHtcclxuICAvKipcclxuICAqIG1kNeWKoOWvhuaWueazlVxyXG4gICog54mI5p2D5omA5pyJwqkyMDExIFNlYmFzdGlhbiBUc2NoYW7vvIxodHRwc++8mi8vYmx1ZWltcC5uZXRcclxuICAqL1xyXG4gIHNhZmVBZGQoeCwgeSkge1xyXG4gICAgdmFyIGxzdyA9ICh4ICYgMHhmZmZmKSArICh5ICYgMHhmZmZmKTtcclxuICAgIHZhciBtc3cgPSAoeCA+PiAxNikgKyAoeSA+PiAxNikgKyAobHN3ID4+IDE2KTtcclxuICAgIHJldHVybiAobXN3IDw8IDE2KSB8IChsc3cgJiAweGZmZmYpO1xyXG4gIH0sXHJcbiAgYml0Um90YXRlTGVmdChudW0sIGNudCkge1xyXG4gICAgcmV0dXJuIChudW0gPDwgY250KSB8IChudW0gPj4+ICgzMiAtIGNudCkpO1xyXG4gIH0sXHJcbiAgbWQ1Y21uKHEsIGEsIGIsIHgsIHMsIHQpIHtcclxuICAgIHJldHVybiB0aGlzLnNhZmVBZGQodGhpcy5iaXRSb3RhdGVMZWZ0KHRoaXMuc2FmZUFkZCh0aGlzLnNhZmVBZGQoYSwgcSksIHRoaXMuc2FmZUFkZCh4LCB0KSksIHMpLCBiKTtcclxuICB9LFxyXG4gIG1kNWZmKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuICAgIHJldHVybiB0aGlzLm1kNWNtbigoYiAmIGMpIHwgKH5iICYgZCksIGEsIGIsIHgsIHMsIHQpO1xyXG4gIH0sXHJcbiAgbWQ1Z2coYSwgYiwgYywgZCwgeCwgcywgdCkge1xyXG4gICAgcmV0dXJuIHRoaXMubWQ1Y21uKChiICYgZCkgfCAoYyAmIH5kKSwgYSwgYiwgeCwgcywgdCk7XHJcbiAgfSxcclxuICBtZDVoaChhLCBiLCBjLCBkLCB4LCBzLCB0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5tZDVjbW4oYiBeIGMgXiBkLCBhLCBiLCB4LCBzLCB0KTtcclxuICB9LFxyXG4gIG1kNWlpKGEsIGIsIGMsIGQsIHgsIHMsIHQpIHtcclxuICAgIHJldHVybiB0aGlzLm1kNWNtbihjIF4gKGIgfCB+ZCksIGEsIGIsIHgsIHMsIHQpO1xyXG4gIH0sXHJcbiAgYmlubE1ENSh4LCBsZW4pIHtcclxuICAgIC8qIGFwcGVuZCBwYWRkaW5nICovXHJcbiAgICB4W2xlbiA+PiA1XSB8PSAweDgwIDw8IChsZW4gJSAzMik7XHJcbiAgICB4WygobGVuICsgNjQpID4+PiA5IDw8IDQpICsgMTRdID0gbGVuO1xyXG5cclxuICAgIHZhciBpO1xyXG4gICAgdmFyIG9sZGE7XHJcbiAgICB2YXIgb2xkYjtcclxuICAgIHZhciBvbGRjO1xyXG4gICAgdmFyIG9sZGQ7XHJcbiAgICB2YXIgYSA9IDE3MzI1ODQxOTM7XHJcbiAgICB2YXIgYiA9IC0yNzE3MzM4Nzk7XHJcbiAgICB2YXIgYyA9IC0xNzMyNTg0MTk0O1xyXG4gICAgdmFyIGQgPSAyNzE3MzM4Nzg7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHgubGVuZ3RoOyBpICs9IDE2KSB7XHJcbiAgICAgIG9sZGEgPSBhO1xyXG4gICAgICBvbGRiID0gYjtcclxuICAgICAgb2xkYyA9IGM7XHJcbiAgICAgIG9sZGQgPSBkO1xyXG5cclxuICAgICAgYSA9IHRoaXMubWQ1ZmYoYSwgYiwgYywgZCwgeFtpXSwgNywgLTY4MDg3NjkzNik7XHJcbiAgICAgIGQgPSB0aGlzLm1kNWZmKGQsIGEsIGIsIGMsIHhbaSArIDFdLCAxMiwgLTM4OTU2NDU4Nik7XHJcbiAgICAgIGMgPSB0aGlzLm1kNWZmKGMsIGQsIGEsIGIsIHhbaSArIDJdLCAxNywgNjA2MTA1ODE5KTtcclxuICAgICAgYiA9IHRoaXMubWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgM10sIDIyLCAtMTA0NDUyNTMzMCk7XHJcbiAgICAgIGEgPSB0aGlzLm1kNWZmKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA3LCAtMTc2NDE4ODk3KTtcclxuICAgICAgZCA9IHRoaXMubWQ1ZmYoZCwgYSwgYiwgYywgeFtpICsgNV0sIDEyLCAxMjAwMDgwNDI2KTtcclxuICAgICAgYyA9IHRoaXMubWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgNl0sIDE3LCAtMTQ3MzIzMTM0MSk7XHJcbiAgICAgIGIgPSB0aGlzLm1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDddLCAyMiwgLTQ1NzA1OTgzKTtcclxuICAgICAgYSA9IHRoaXMubWQ1ZmYoYSwgYiwgYywgZCwgeFtpICsgOF0sIDcsIDE3NzAwMzU0MTYpO1xyXG4gICAgICBkID0gdGhpcy5tZDVmZihkLCBhLCBiLCBjLCB4W2kgKyA5XSwgMTIsIC0xOTU4NDE0NDE3KTtcclxuICAgICAgYyA9IHRoaXMubWQ1ZmYoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNywgLTQyMDYzKTtcclxuICAgICAgYiA9IHRoaXMubWQ1ZmYoYiwgYywgZCwgYSwgeFtpICsgMTFdLCAyMiwgLTE5OTA0MDQxNjIpO1xyXG4gICAgICBhID0gdGhpcy5tZDVmZihhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDcsIDE4MDQ2MDM2ODIpO1xyXG4gICAgICBkID0gdGhpcy5tZDVmZihkLCBhLCBiLCBjLCB4W2kgKyAxM10sIDEyLCAtNDAzNDExMDEpO1xyXG4gICAgICBjID0gdGhpcy5tZDVmZihjLCBkLCBhLCBiLCB4W2kgKyAxNF0sIDE3LCAtMTUwMjAwMjI5MCk7XHJcbiAgICAgIGIgPSB0aGlzLm1kNWZmKGIsIGMsIGQsIGEsIHhbaSArIDE1XSwgMjIsIDEyMzY1MzUzMjkpO1xyXG5cclxuICAgICAgYSA9IHRoaXMubWQ1Z2coYSwgYiwgYywgZCwgeFtpICsgMV0sIDUsIC0xNjU3OTY1MTApO1xyXG4gICAgICBkID0gdGhpcy5tZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyA2XSwgOSwgLTEwNjk1MDE2MzIpO1xyXG4gICAgICBjID0gdGhpcy5tZDVnZyhjLCBkLCBhLCBiLCB4W2kgKyAxMV0sIDE0LCA2NDM3MTc3MTMpO1xyXG4gICAgICBiID0gdGhpcy5tZDVnZyhiLCBjLCBkLCBhLCB4W2ldLCAyMCwgLTM3Mzg5NzMwMik7XHJcbiAgICAgIGEgPSB0aGlzLm1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDVdLCA1LCAtNzAxNTU4NjkxKTtcclxuICAgICAgZCA9IHRoaXMubWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTBdLCA5LCAzODAxNjA4Myk7XHJcbiAgICAgIGMgPSB0aGlzLm1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDE1XSwgMTQsIC02NjA0NzgzMzUpO1xyXG4gICAgICBiID0gdGhpcy5tZDVnZyhiLCBjLCBkLCBhLCB4W2kgKyA0XSwgMjAsIC00MDU1Mzc4NDgpO1xyXG4gICAgICBhID0gdGhpcy5tZDVnZyhhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNSwgNTY4NDQ2NDM4KTtcclxuICAgICAgZCA9IHRoaXMubWQ1Z2coZCwgYSwgYiwgYywgeFtpICsgMTRdLCA5LCAtMTAxOTgwMzY5MCk7XHJcbiAgICAgIGMgPSB0aGlzLm1kNWdnKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNCwgLTE4NzM2Mzk2MSk7XHJcbiAgICAgIGIgPSB0aGlzLm1kNWdnKGIsIGMsIGQsIGEsIHhbaSArIDhdLCAyMCwgMTE2MzUzMTUwMSk7XHJcbiAgICAgIGEgPSB0aGlzLm1kNWdnKGEsIGIsIGMsIGQsIHhbaSArIDEzXSwgNSwgLTE0NDQ2ODE0NjcpO1xyXG4gICAgICBkID0gdGhpcy5tZDVnZyhkLCBhLCBiLCBjLCB4W2kgKyAyXSwgOSwgLTUxNDAzNzg0KTtcclxuICAgICAgYyA9IHRoaXMubWQ1Z2coYywgZCwgYSwgYiwgeFtpICsgN10sIDE0LCAxNzM1MzI4NDczKTtcclxuICAgICAgYiA9IHRoaXMubWQ1Z2coYiwgYywgZCwgYSwgeFtpICsgMTJdLCAyMCwgLTE5MjY2MDc3MzQpO1xyXG5cclxuICAgICAgYSA9IHRoaXMubWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgNV0sIDQsIC0zNzg1NTgpO1xyXG4gICAgICBkID0gdGhpcy5tZDVoaChkLCBhLCBiLCBjLCB4W2kgKyA4XSwgMTEsIC0yMDIyNTc0NDYzKTtcclxuICAgICAgYyA9IHRoaXMubWQ1aGgoYywgZCwgYSwgYiwgeFtpICsgMTFdLCAxNiwgMTgzOTAzMDU2Mik7XHJcbiAgICAgIGIgPSB0aGlzLm1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDE0XSwgMjMsIC0zNTMwOTU1Nik7XHJcbiAgICAgIGEgPSB0aGlzLm1kNWhoKGEsIGIsIGMsIGQsIHhbaSArIDFdLCA0LCAtMTUzMDk5MjA2MCk7XHJcbiAgICAgIGQgPSB0aGlzLm1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDRdLCAxMSwgMTI3Mjg5MzM1Myk7XHJcbiAgICAgIGMgPSB0aGlzLm1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDddLCAxNiwgLTE1NTQ5NzYzMik7XHJcbiAgICAgIGIgPSB0aGlzLm1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDEwXSwgMjMsIC0xMDk0NzMwNjQwKTtcclxuICAgICAgYSA9IHRoaXMubWQ1aGgoYSwgYiwgYywgZCwgeFtpICsgMTNdLCA0LCA2ODEyNzkxNzQpO1xyXG4gICAgICBkID0gdGhpcy5tZDVoaChkLCBhLCBiLCBjLCB4W2ldLCAxMSwgLTM1ODUzNzIyMik7XHJcbiAgICAgIGMgPSB0aGlzLm1kNWhoKGMsIGQsIGEsIGIsIHhbaSArIDNdLCAxNiwgLTcyMjUyMTk3OSk7XHJcbiAgICAgIGIgPSB0aGlzLm1kNWhoKGIsIGMsIGQsIGEsIHhbaSArIDZdLCAyMywgNzYwMjkxODkpO1xyXG4gICAgICBhID0gdGhpcy5tZDVoaChhLCBiLCBjLCBkLCB4W2kgKyA5XSwgNCwgLTY0MDM2NDQ4Nyk7XHJcbiAgICAgIGQgPSB0aGlzLm1kNWhoKGQsIGEsIGIsIGMsIHhbaSArIDEyXSwgMTEsIC00MjE4MTU4MzUpO1xyXG4gICAgICBjID0gdGhpcy5tZDVoaChjLCBkLCBhLCBiLCB4W2kgKyAxNV0sIDE2LCA1MzA3NDI1MjApO1xyXG4gICAgICBiID0gdGhpcy5tZDVoaChiLCBjLCBkLCBhLCB4W2kgKyAyXSwgMjMsIC05OTUzMzg2NTEpO1xyXG5cclxuICAgICAgYSA9IHRoaXMubWQ1aWkoYSwgYiwgYywgZCwgeFtpXSwgNiwgLTE5ODYzMDg0NCk7XHJcbiAgICAgIGQgPSB0aGlzLm1kNWlpKGQsIGEsIGIsIGMsIHhbaSArIDddLCAxMCwgMTEyNjg5MTQxNSk7XHJcbiAgICAgIGMgPSB0aGlzLm1kNWlpKGMsIGQsIGEsIGIsIHhbaSArIDE0XSwgMTUsIC0xNDE2MzU0OTA1KTtcclxuICAgICAgYiA9IHRoaXMubWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgNV0sIDIxLCAtNTc0MzQwNTUpO1xyXG4gICAgICBhID0gdGhpcy5tZDVpaShhLCBiLCBjLCBkLCB4W2kgKyAxMl0sIDYsIDE3MDA0ODU1NzEpO1xyXG4gICAgICBkID0gdGhpcy5tZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAzXSwgMTAsIC0xODk0OTg2NjA2KTtcclxuICAgICAgYyA9IHRoaXMubWQ1aWkoYywgZCwgYSwgYiwgeFtpICsgMTBdLCAxNSwgLTEwNTE1MjMpO1xyXG4gICAgICBiID0gdGhpcy5tZDVpaShiLCBjLCBkLCBhLCB4W2kgKyAxXSwgMjEsIC0yMDU0OTIyNzk5KTtcclxuICAgICAgYSA9IHRoaXMubWQ1aWkoYSwgYiwgYywgZCwgeFtpICsgOF0sIDYsIDE4NzMzMTMzNTkpO1xyXG4gICAgICBkID0gdGhpcy5tZDVpaShkLCBhLCBiLCBjLCB4W2kgKyAxNV0sIDEwLCAtMzA2MTE3NDQpO1xyXG4gICAgICBjID0gdGhpcy5tZDVpaShjLCBkLCBhLCBiLCB4W2kgKyA2XSwgMTUsIC0xNTYwMTk4MzgwKTtcclxuICAgICAgYiA9IHRoaXMubWQ1aWkoYiwgYywgZCwgYSwgeFtpICsgMTNdLCAyMSwgMTMwOTE1MTY0OSk7XHJcbiAgICAgIGEgPSB0aGlzLm1kNWlpKGEsIGIsIGMsIGQsIHhbaSArIDRdLCA2LCAtMTQ1NTIzMDcwKTtcclxuICAgICAgZCA9IHRoaXMubWQ1aWkoZCwgYSwgYiwgYywgeFtpICsgMTFdLCAxMCwgLTExMjAyMTAzNzkpO1xyXG4gICAgICBjID0gdGhpcy5tZDVpaShjLCBkLCBhLCBiLCB4W2kgKyAyXSwgMTUsIDcxODc4NzI1OSk7XHJcbiAgICAgIGIgPSB0aGlzLm1kNWlpKGIsIGMsIGQsIGEsIHhbaSArIDldLCAyMSwgLTM0MzQ4NTU1MSk7XHJcblxyXG4gICAgICBhID0gdGhpcy5zYWZlQWRkKGEsIG9sZGEpO1xyXG4gICAgICBiID0gdGhpcy5zYWZlQWRkKGIsIG9sZGIpO1xyXG4gICAgICBjID0gdGhpcy5zYWZlQWRkKGMsIG9sZGMpO1xyXG4gICAgICBkID0gdGhpcy5zYWZlQWRkKGQsIG9sZGQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFthLCBiLCBjLCBkXTtcclxuICB9LFxyXG4gIGJpbmwycnN0cihpbnB1dCkge1xyXG4gICAgdmFyIGk7XHJcbiAgICB2YXIgb3V0cHV0ID0gJyc7XHJcbiAgICB2YXIgbGVuZ3RoMzIgPSBpbnB1dC5sZW5ndGggKiAzMjtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGgzMjsgaSArPSA4KSB7XHJcbiAgICAgIG91dHB1dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChpbnB1dFtpID4+IDVdID4+PiAoaSAlIDMyKSkgJiAweGZmKTtcclxuICAgIH1cclxuICAgIHJldHVybiBvdXRwdXQ7XHJcbiAgfSxcclxuICByc3RyMmJpbmwoaW5wdXQpIHtcclxuICAgIHZhciBpO1xyXG4gICAgdmFyIG91dHB1dCA9IFtdO1xyXG4gICAgb3V0cHV0WyhpbnB1dC5sZW5ndGggPj4gMikgLSAxXSA9IHVuZGVmaW5lZDtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBvdXRwdXQubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgb3V0cHV0W2ldID0gMDtcclxuICAgIH1cclxuICAgIHZhciBsZW5ndGg4ID0gaW5wdXQubGVuZ3RoICogODtcclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg4OyBpICs9IDgpIHtcclxuICAgICAgb3V0cHV0W2kgPj4gNV0gfD0gKGlucHV0LmNoYXJDb2RlQXQoaSAvIDgpICYgMHhmZikgPDwgKGkgJSAzMik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0cHV0O1xyXG4gIH0sXHJcbiAgcnN0ck1ENShzKSB7XHJcbiAgICByZXR1cm4gdGhpcy5iaW5sMnJzdHIodGhpcy5iaW5sTUQ1KHRoaXMucnN0cjJiaW5sKHMpLCBzLmxlbmd0aCAqIDgpKTtcclxuICB9LFxyXG4gIHJzdHJITUFDTUQ1KGtleSwgZGF0YSkge1xyXG4gICAgdmFyIGk7XHJcbiAgICB2YXIgYmtleSA9IHRoaXMucnN0cjJiaW5sKGtleSk7XHJcbiAgICB2YXIgaXBhZCA9IFtdO1xyXG4gICAgdmFyIG9wYWQgPSBbXTtcclxuICAgIHZhciBoYXNoO1xyXG4gICAgaXBhZFsxNV0gPSBvcGFkWzE1XSA9IHVuZGVmaW5lZDtcclxuICAgIGlmIChia2V5Lmxlbmd0aCA+IDE2KSB7XHJcbiAgICAgIGJrZXkgPSB0aGlzLmJpbmxNRDUoYmtleSwga2V5Lmxlbmd0aCAqIDgpO1xyXG4gICAgfVxyXG4gICAgZm9yIChpID0gMDsgaSA8IDE2OyBpICs9IDEpIHtcclxuICAgICAgaXBhZFtpXSA9IGJrZXlbaV0gXiAweDM2MzYzNjM2O1xyXG4gICAgICBvcGFkW2ldID0gYmtleVtpXSBeIDB4NWM1YzVjNWM7XHJcbiAgICB9XHJcbiAgICBoYXNoID0gdGhpcy5iaW5sTUQ1KGlwYWQuY29uY2F0KHRoaXMucnN0cjJiaW5sKGRhdGEpKSwgNTEyICsgZGF0YS5sZW5ndGggKiA4KTtcclxuICAgIHJldHVybiB0aGlzLmJpbmwycnN0cih0aGlzLmJpbmxNRDUob3BhZC5jb25jYXQoaGFzaCksIDUxMiArIDEyOCkpO1xyXG4gIH0sXHJcbiAgcnN0cjJoZXgoaW5wdXQpIHtcclxuICAgIHZhciBoZXhUYWIgPSAnMDEyMzQ1Njc4OWFiY2RlZic7XHJcbiAgICB2YXIgb3V0cHV0ID0gJyc7XHJcbiAgICB2YXIgeDtcclxuICAgIHZhciBpO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIHggPSBpbnB1dC5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICBvdXRwdXQgKz0gaGV4VGFiLmNoYXJBdCgoeCA+Pj4gNCkgJiAweDBmKSArIGhleFRhYi5jaGFyQXQoeCAmIDB4MGYpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG91dHB1dDtcclxuICB9LFxyXG4gIHN0cjJyc3RyVVRGOChpbnB1dCkge1xyXG4gICAgcmV0dXJuIHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChpbnB1dCkpO1xyXG4gIH0sXHJcbiAgcmF3TUQ1KHMpIHtcclxuICAgIHJldHVybiB0aGlzLnJzdHJNRDUodGhpcy5zdHIycnN0clVURjgocykpO1xyXG4gIH0sXHJcbiAgaGV4TUQ1KHMpIHtcclxuICAgIHJldHVybiB0aGlzLnJzdHIyaGV4KHRoaXMucmF3TUQ1KHMpKTtcclxuICB9LFxyXG4gIHJhd0hNQUNNRDUoaywgZCkge1xyXG4gICAgcmV0dXJuIHRoaXMucnN0ckhNQUNNRDUodGhpcy5zdHIycnN0clVURjgoayksIHN0cjJyc3RyVVRGOChkKSk7XHJcbiAgfSxcclxuICBoZXhITUFDTUQ1KGssIGQpIHtcclxuICAgIHJldHVybiB0aGlzLnJzdHIyaGV4KHRoaXMucmF3SE1BQ01ENShrLCBkKSk7XHJcbiAgfSxcclxuXHJcbiAgbWQ1KHN0cmluZywga2V5LCByYXcpIHtcclxuICAgIGlmICgha2V5KSB7XHJcbiAgICAgIGlmICghcmF3KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGV4TUQ1KHN0cmluZyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMucmF3TUQ1KHN0cmluZyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIXJhdykge1xyXG4gICAgICByZXR1cm4gdGhpcy5oZXhITUFDTUQ1KGtleSwgc3RyaW5nKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLnJhd0hNQUNNRDUoa2V5LCBzdHJpbmcpO1xyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICog5b6X5YiwbWQ15Yqg5a+G5ZCO55qEc2ln5Y+C5pWwXHJcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RQYXJhbSDmjqXlj6Plj4LmlbBcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2vnrb7lkI3lrZfnrKbkuLJcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gZmVhdHJ1ZSDmlrnms5XlkI1cclxuICAgKiBAcmV0dXJuIOi/lOWbnuWKoOWvhuWQjueahHNpZ+WPguaVsFxyXG4gICAqL1xyXG4gIGdldFNpZyhyZXF1ZXN0UGFyYW0sIHNrLCBmZWF0dXJlLCBtb2RlKSB7XHJcbiAgICB2YXIgc2lnID0gbnVsbDtcclxuICAgIHZhciByZXF1ZXN0QXJyID0gW107XHJcbiAgICBPYmplY3Qua2V5cyhyZXF1ZXN0UGFyYW0pLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSl7XHJcbiAgICAgIHJlcXVlc3RBcnIucHVzaChrZXkgKyAnPScgKyByZXF1ZXN0UGFyYW1ba2V5XSk7XHJcbiAgICB9KTtcclxuICAgIGlmIChmZWF0dXJlID09ICdzZWFyY2gnKSB7XHJcbiAgICAgIHNpZyA9ICcvd3MvcGxhY2UvdjEvc2VhcmNoPycgKyByZXF1ZXN0QXJyLmpvaW4oJyYnKSArIHNrO1xyXG4gICAgfVxyXG4gICAgaWYgKGZlYXR1cmUgPT0gJ3N1Z2dlc3QnKSB7XHJcbiAgICAgIHNpZyA9ICcvd3MvcGxhY2UvdjEvc3VnZ2VzdGlvbj8nICsgcmVxdWVzdEFyci5qb2luKCcmJykgKyBzaztcclxuICAgIH1cclxuICAgIGlmIChmZWF0dXJlID09ICdyZXZlcnNlR2VvY29kZXInKSB7XHJcbiAgICAgIHNpZyA9ICcvd3MvZ2VvY29kZXIvdjEvPycgKyByZXF1ZXN0QXJyLmpvaW4oJyYnKSArIHNrO1xyXG4gICAgfVxyXG4gICAgaWYgKGZlYXR1cmUgPT0gJ2dlb2NvZGVyJykge1xyXG4gICAgICBzaWcgPSAnL3dzL2dlb2NvZGVyL3YxLz8nICsgcmVxdWVzdEFyci5qb2luKCcmJykgKyBzaztcclxuICAgIH1cclxuICAgIGlmIChmZWF0dXJlID09ICdnZXRDaXR5TGlzdCcpIHtcclxuICAgICAgc2lnID0gJy93cy9kaXN0cmljdC92MS9saXN0PycgKyByZXF1ZXN0QXJyLmpvaW4oJyYnKSArIHNrO1xyXG4gICAgfVxyXG4gICAgaWYgKGZlYXR1cmUgPT0gJ2dldERpc3RyaWN0QnlDaXR5SWQnKSB7XHJcbiAgICAgIHNpZyA9ICcvd3MvZGlzdHJpY3QvdjEvZ2V0Y2hpbGRyZW4/JyArIHJlcXVlc3RBcnIuam9pbignJicpICsgc2s7XHJcbiAgICB9XHJcbiAgICBpZiAoZmVhdHVyZSA9PSAnY2FsY3VsYXRlRGlzdGFuY2UnKSB7XHJcbiAgICAgIHNpZyA9ICcvd3MvZGlzdGFuY2UvdjEvPycgKyByZXF1ZXN0QXJyLmpvaW4oJyYnKSArIHNrO1xyXG4gICAgfVxyXG4gICAgaWYgKGZlYXR1cmUgPT0gJ2RpcmVjdGlvbicpIHtcclxuICAgICAgc2lnID0gJy93cy9kaXJlY3Rpb24vdjEvJyArIG1vZGUgKyAnPycgKyByZXF1ZXN0QXJyLmpvaW4oJyYnKSArIHNrO1xyXG4gICAgfVxyXG4gICAgc2lnID0gdGhpcy5tZDUoc2lnKTtcclxuICAgIHJldHVybiBzaWc7XHJcbiAgfSxcclxuICAgIC8qKlxyXG4gICAgICog5b6X5Yiw57uI54K5cXVlcnnlrZfnrKbkuLJcclxuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSDmo4DntKLmlbDmja5cclxuICAgICAqL1xyXG4gICAgbG9jYXRpb24ycXVlcnkoZGF0YSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHF1ZXJ5ID0gJyc7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBkID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgaWYgKCEhcXVlcnkpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5ICs9ICc7JztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZC5sb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgcXVlcnkgPSBxdWVyeSArIGQubG9jYXRpb24ubGF0ICsgJywnICsgZC5sb2NhdGlvbi5sbmc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGQubGF0aXR1ZGUgJiYgZC5sb25naXR1ZGUpIHtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gcXVlcnkgKyBkLmxhdGl0dWRlICsgJywnICsgZC5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHF1ZXJ5O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuoeeul+inkuW6plxyXG4gICAgICovXHJcbiAgICByYWQoZCkge1xyXG4gICAgICByZXR1cm4gZCAqIE1hdGguUEkgLyAxODAuMDtcclxuICAgIH0sICBcclxuICAgIC8qKlxyXG4gICAgICog5aSE55CG57uI54K5bG9jYXRpb27mlbDnu4RcclxuICAgICAqIEByZXR1cm4g6L+U5Zue57uI54K55pWw57uEXHJcbiAgICAgKi9cclxuICAgIGdldEVuZExvY2F0aW9uKGxvY2F0aW9uKXtcclxuICAgICAgdmFyIHRvID0gbG9jYXRpb24uc3BsaXQoJzsnKTtcclxuICAgICAgdmFyIGVuZExvY2F0aW9uID0gW107XHJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBlbmRMb2NhdGlvbi5wdXNoKHtcclxuICAgICAgICAgIGxhdDogcGFyc2VGbG9hdCh0b1tpXS5zcGxpdCgnLCcpWzBdKSxcclxuICAgICAgICAgIGxuZzogcGFyc2VGbG9hdCh0b1tpXS5zcGxpdCgnLCcpWzFdKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGVuZExvY2F0aW9uO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiuoeeul+S4pOeCuemXtOebtOe6v+i3neemu1xyXG4gICAgICogQHBhcmFtIGEg6KGo56S657qs5bqm5beuXHJcbiAgICAgKiBAcGFyYW0gYiDooajnpLrnu4/luqblt65cclxuICAgICAqIEByZXR1cm4g6L+U5Zue55qE5piv6Led56a777yM5Y2V5L2NbVxyXG4gICAgICovXHJcbiAgICBnZXREaXN0YW5jZShsYXRGcm9tLCBsbmdGcm9tLCBsYXRUbywgbG5nVG8pIHtcclxuICAgICAgdmFyIHJhZExhdEZyb20gPSB0aGlzLnJhZChsYXRGcm9tKTtcclxuICAgICAgdmFyIHJhZExhdFRvID0gdGhpcy5yYWQobGF0VG8pO1xyXG4gICAgICB2YXIgYSA9IHJhZExhdEZyb20gLSByYWRMYXRUbztcclxuICAgICAgdmFyIGIgPSB0aGlzLnJhZChsbmdGcm9tKSAtIHRoaXMucmFkKGxuZ1RvKTtcclxuICAgICAgdmFyIGRpc3RhbmNlID0gMiAqIE1hdGguYXNpbihNYXRoLnNxcnQoTWF0aC5wb3coTWF0aC5zaW4oYSAvIDIpLCAyKSArIE1hdGguY29zKHJhZExhdEZyb20pICogTWF0aC5jb3MocmFkTGF0VG8pICogTWF0aC5wb3coTWF0aC5zaW4oYiAvIDIpLCAyKSkpO1xyXG4gICAgICBkaXN0YW5jZSA9IGRpc3RhbmNlICogRUFSVEhfUkFESVVTO1xyXG4gICAgICBkaXN0YW5jZSA9IE1hdGgucm91bmQoZGlzdGFuY2UgKiAxMDAwMCkgLyAxMDAwMDtcclxuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoZGlzdGFuY2UudG9GaXhlZCgwKSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDkvb/nlKjlvq7kv6HmjqXlj6Pov5vooYzlrprkvY1cclxuICAgICAqL1xyXG4gICAgZ2V0V1hMb2NhdGlvbihzdWNjZXNzLCBmYWlsLCBjb21wbGV0ZSkge1xyXG4gICAgICAgIHd4LmdldExvY2F0aW9uKHtcclxuICAgICAgICAgICAgdHlwZTogJ2djajAyJyxcclxuICAgICAgICAgICAgc3VjY2Vzczogc3VjY2VzcyxcclxuICAgICAgICAgICAgZmFpbDogZmFpbCxcclxuICAgICAgICAgICAgY29tcGxldGU6IGNvbXBsZXRlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WbG9jYXRpb27lj4LmlbBcclxuICAgICAqL1xyXG4gICAgZ2V0TG9jYXRpb25QYXJhbShsb2NhdGlvbikge1xyXG4gICAgICAgIGlmICh0eXBlb2YgbG9jYXRpb24gPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdmFyIGxvY2F0aW9uQXJyID0gbG9jYXRpb24uc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uQXJyLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF0aXR1ZGU6IGxvY2F0aW9uLnNwbGl0KCcsJylbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBsb2NhdGlvbi5zcGxpdCgnLCcpWzFdXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24gPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbG9jYXRpb247XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zue6LCD5Ye95pWw6buY6K6k5aSE55CGXHJcbiAgICAgKi9cclxuICAgIHBvbHlmaWxsUGFyYW0ocGFyYW0pIHtcclxuICAgICAgICBwYXJhbS5zdWNjZXNzID0gcGFyYW0uc3VjY2VzcyB8fCBmdW5jdGlvbiAoKSB7IH07XHJcbiAgICAgICAgcGFyYW0uZmFpbCA9IHBhcmFtLmZhaWwgfHwgZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgICAgIHBhcmFtLmNvbXBsZXRlID0gcGFyYW0uY29tcGxldGUgfHwgZnVuY3Rpb24gKCkgeyB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmqjOivgXBhcmFt5a+55bqU55qEa2V55YC85piv5ZCm5Li656m6XHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSDmjqXlj6Plj4LmlbBcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkg5a+55bqU5Y+C5pWw55qEa2V5XHJcbiAgICAgKi9cclxuICAgIGNoZWNrUGFyYW1LZXlFbXB0eShwYXJhbSwga2V5KSB7XHJcbiAgICAgICAgaWYgKCFwYXJhbVtrZXldKSB7XHJcbiAgICAgICAgICAgIHZhciBlcnJjb25mID0gdGhpcy5idWlsZEVycm9yQ29uZmlnKEVSUk9SX0NPTkYuUEFSQU1fRVJSLCBFUlJPUl9DT05GLlBBUkFNX0VSUl9NU0cgKyBrZXkgKyflj4LmlbDmoLzlvI/mnInor68nKTtcclxuICAgICAgICAgICAgcGFyYW0uZmFpbChlcnJjb25mKTtcclxuICAgICAgICAgICAgcGFyYW0uY29tcGxldGUoZXJyY29uZik7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6aqM6K+B5Y+C5pWw5Lit5piv5ZCm5a2Y5Zyo5qOA57Si6K+Na2V5d29yZFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0g5o6l5Y+j5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIGNoZWNrS2V5d29yZChwYXJhbSl7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmNoZWNrUGFyYW1LZXlFbXB0eShwYXJhbSwgJ2tleXdvcmQnKTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpqozor4Fsb2NhdGlvbuWAvFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0g5o6l5Y+j5Y+C5pWwXHJcbiAgICAgKi9cclxuICAgIGNoZWNrTG9jYXRpb24ocGFyYW0pIHtcclxuICAgICAgICB2YXIgbG9jYXRpb24gPSB0aGlzLmdldExvY2F0aW9uUGFyYW0ocGFyYW0ubG9jYXRpb24pO1xyXG4gICAgICAgIGlmICghbG9jYXRpb24gfHwgIWxvY2F0aW9uLmxhdGl0dWRlIHx8ICFsb2NhdGlvbi5sb25naXR1ZGUpIHtcclxuICAgICAgICAgICAgdmFyIGVycmNvbmYgPSB0aGlzLmJ1aWxkRXJyb3JDb25maWcoRVJST1JfQ09ORi5QQVJBTV9FUlIsIEVSUk9SX0NPTkYuUEFSQU1fRVJSX01TRyArICcgbG9jYXRpb27lj4LmlbDmoLzlvI/mnInor68nKTtcclxuICAgICAgICAgICAgcGFyYW0uZmFpbChlcnJjb25mKTtcclxuICAgICAgICAgICAgcGFyYW0uY29tcGxldGUoZXJyY29uZik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5p6E6YCg6ZSZ6K+v5pWw5o2u57uT5p6EXHJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZXJyQ29kZSDplJnor6/noIFcclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBlcnJNc2cg6ZSZ6K+v5o+P6L+wXHJcbiAgICAgKi9cclxuICAgIGJ1aWxkRXJyb3JDb25maWcoZXJyQ29kZSwgZXJyTXNnKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3RhdHVzOiBlcnJDb2RlLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJNc2dcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICog5pWw5o2u5aSE55CG5Ye95pWwXHJcbiAgICAgKiDmoLnmja7kvKDlhaXlj4LmlbDkuI3lkIzlpITnkIbkuI3lkIzmlbDmja5cclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmZWF0dXJlIOWKn+iDveWQjeensFxyXG4gICAgICogc2VhcmNoIOWcsOeCueaQnOe0olxyXG4gICAgICogc3VnZ2VzdOWFs+mUruivjeaPkOekulxyXG4gICAgICogcmV2ZXJzZUdlb2NvZGVy6YCG5Zyw5Z2A6Kej5p6QXHJcbiAgICAgKiBnZW9jb2RlcuWcsOWdgOino+aekFxyXG4gICAgICogZ2V0Q2l0eUxpc3Tojrflj5bln47luILliJfooajvvJrniLbpm4ZcclxuICAgICAqIGdldERpc3RyaWN0QnlDaXR5SWTojrflj5bljLrljr/liJfooajvvJrlrZDpm4ZcclxuICAgICAqIGNhbGN1bGF0ZURpc3RhbmNl6Led56a76K6h566XXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW0g5o6l5Y+j5Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSDmlbDmja5cclxuICAgICAqL1xyXG4gICAgaGFuZGxlRGF0YShwYXJhbSxkYXRhLGZlYXR1cmUpe1xyXG4gICAgICBpZiAoZmVhdHVyZSA9PSAnc2VhcmNoJykge1xyXG4gICAgICAgIHZhciBzZWFyY2hSZXN1bHQgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgdmFyIHNlYXJjaFNpbXBsaWZ5ID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWFyY2hSZXN1bHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHNlYXJjaFNpbXBsaWZ5LnB1c2goe1xyXG4gICAgICAgICAgICBpZDogc2VhcmNoUmVzdWx0W2ldLmlkIHx8IG51bGwsXHJcbiAgICAgICAgICAgIHRpdGxlOiBzZWFyY2hSZXN1bHRbaV0udGl0bGUgfHwgbnVsbCxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IHNlYXJjaFJlc3VsdFtpXS5sb2NhdGlvbiAmJiBzZWFyY2hSZXN1bHRbaV0ubG9jYXRpb24ubGF0IHx8IG51bGwsXHJcbiAgICAgICAgICAgIGxvbmdpdHVkZTogc2VhcmNoUmVzdWx0W2ldLmxvY2F0aW9uICYmIHNlYXJjaFJlc3VsdFtpXS5sb2NhdGlvbi5sbmcgfHwgbnVsbCxcclxuICAgICAgICAgICAgYWRkcmVzczogc2VhcmNoUmVzdWx0W2ldLmFkZHJlc3MgfHwgbnVsbCxcclxuICAgICAgICAgICAgY2F0ZWdvcnk6IHNlYXJjaFJlc3VsdFtpXS5jYXRlZ29yeSB8fCBudWxsLFxyXG4gICAgICAgICAgICB0ZWw6IHNlYXJjaFJlc3VsdFtpXS50ZWwgfHwgbnVsbCxcclxuICAgICAgICAgICAgYWRjb2RlOiBzZWFyY2hSZXN1bHRbaV0uYWRfaW5mbyAmJiBzZWFyY2hSZXN1bHRbaV0uYWRfaW5mby5hZGNvZGUgfHwgbnVsbCxcclxuICAgICAgICAgICAgY2l0eTogc2VhcmNoUmVzdWx0W2ldLmFkX2luZm8gJiYgc2VhcmNoUmVzdWx0W2ldLmFkX2luZm8uY2l0eSB8fCBudWxsLFxyXG4gICAgICAgICAgICBkaXN0cmljdDogc2VhcmNoUmVzdWx0W2ldLmFkX2luZm8gJiYgc2VhcmNoUmVzdWx0W2ldLmFkX2luZm8uZGlzdHJpY3QgfHwgbnVsbCxcclxuICAgICAgICAgICAgcHJvdmluY2U6IHNlYXJjaFJlc3VsdFtpXS5hZF9pbmZvICYmIHNlYXJjaFJlc3VsdFtpXS5hZF9pbmZvLnByb3ZpbmNlIHx8IG51bGxcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhcmFtLnN1Y2Nlc3MoZGF0YSwge1xyXG4gICAgICAgICAgc2VhcmNoUmVzdWx0OiBzZWFyY2hSZXN1bHQsXHJcbiAgICAgICAgICBzZWFyY2hTaW1wbGlmeTogc2VhcmNoU2ltcGxpZnlcclxuICAgICAgICB9KVxyXG4gICAgICB9IGVsc2UgaWYgKGZlYXR1cmUgPT0gJ3N1Z2dlc3QnKSB7XHJcbiAgICAgICAgdmFyIHN1Z2dlc3RSZXN1bHQgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgdmFyIHN1Z2dlc3RTaW1wbGlmeSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3VnZ2VzdFJlc3VsdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgc3VnZ2VzdFNpbXBsaWZ5LnB1c2goe1xyXG4gICAgICAgICAgICBhZGNvZGU6IHN1Z2dlc3RSZXN1bHRbaV0uYWRjb2RlIHx8IG51bGwsXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IHN1Z2dlc3RSZXN1bHRbaV0uYWRkcmVzcyB8fCBudWxsLFxyXG4gICAgICAgICAgICBjYXRlZ29yeTogc3VnZ2VzdFJlc3VsdFtpXS5jYXRlZ29yeSB8fCBudWxsLFxyXG4gICAgICAgICAgICBjaXR5OiBzdWdnZXN0UmVzdWx0W2ldLmNpdHkgfHwgbnVsbCxcclxuICAgICAgICAgICAgZGlzdHJpY3Q6IHN1Z2dlc3RSZXN1bHRbaV0uZGlzdHJpY3QgfHwgbnVsbCxcclxuICAgICAgICAgICAgaWQ6IHN1Z2dlc3RSZXN1bHRbaV0uaWQgfHwgbnVsbCxcclxuICAgICAgICAgICAgbGF0aXR1ZGU6IHN1Z2dlc3RSZXN1bHRbaV0ubG9jYXRpb24gJiYgc3VnZ2VzdFJlc3VsdFtpXS5sb2NhdGlvbi5sYXQgfHwgbnVsbCxcclxuICAgICAgICAgICAgbG9uZ2l0dWRlOiBzdWdnZXN0UmVzdWx0W2ldLmxvY2F0aW9uICYmIHN1Z2dlc3RSZXN1bHRbaV0ubG9jYXRpb24ubG5nIHx8IG51bGwsXHJcbiAgICAgICAgICAgIHByb3ZpbmNlOiBzdWdnZXN0UmVzdWx0W2ldLnByb3ZpbmNlIHx8IG51bGwsXHJcbiAgICAgICAgICAgIHRpdGxlOiBzdWdnZXN0UmVzdWx0W2ldLnRpdGxlIHx8IG51bGwsXHJcbiAgICAgICAgICAgIHR5cGU6IHN1Z2dlc3RSZXN1bHRbaV0udHlwZSB8fCBudWxsXHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBwYXJhbS5zdWNjZXNzKGRhdGEsIHtcclxuICAgICAgICAgIHN1Z2dlc3RSZXN1bHQ6IHN1Z2dlc3RSZXN1bHQsXHJcbiAgICAgICAgICBzdWdnZXN0U2ltcGxpZnk6IHN1Z2dlc3RTaW1wbGlmeVxyXG4gICAgICAgICAgfSlcclxuICAgICAgfSBlbHNlIGlmIChmZWF0dXJlID09ICdyZXZlcnNlR2VvY29kZXInKSB7XHJcbiAgICAgICAgdmFyIHJldmVyc2VHZW9jb2RlclJlc3VsdCA9IGRhdGEucmVzdWx0O1xyXG4gICAgICAgIHZhciByZXZlcnNlR2VvY29kZXJTaW1wbGlmeSA9IHtcclxuICAgICAgICAgIGFkZHJlc3M6IHJldmVyc2VHZW9jb2RlclJlc3VsdC5hZGRyZXNzIHx8IG51bGwsXHJcbiAgICAgICAgICBsYXRpdHVkZTogcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmxvY2F0aW9uICYmIHJldmVyc2VHZW9jb2RlclJlc3VsdC5sb2NhdGlvbi5sYXQgfHwgbnVsbCxcclxuICAgICAgICAgIGxvbmdpdHVkZTogcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmxvY2F0aW9uICYmIHJldmVyc2VHZW9jb2RlclJlc3VsdC5sb2NhdGlvbi5sbmcgfHwgbnVsbCxcclxuICAgICAgICAgIGFkY29kZTogcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmFkX2luZm8gJiYgcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmFkX2luZm8uYWRjb2RlIHx8IG51bGwsXHJcbiAgICAgICAgICBjaXR5OiByZXZlcnNlR2VvY29kZXJSZXN1bHQuYWRkcmVzc19jb21wb25lbnQgJiYgcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50LmNpdHkgfHwgbnVsbCxcclxuICAgICAgICAgIGRpc3RyaWN0OiByZXZlcnNlR2VvY29kZXJSZXN1bHQuYWRkcmVzc19jb21wb25lbnQgJiYgcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50LmRpc3RyaWN0IHx8IG51bGwsXHJcbiAgICAgICAgICBuYXRpb246IHJldmVyc2VHZW9jb2RlclJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudCAmJiByZXZlcnNlR2VvY29kZXJSZXN1bHQuYWRkcmVzc19jb21wb25lbnQubmF0aW9uIHx8IG51bGwsXHJcbiAgICAgICAgICBwcm92aW5jZTogcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50ICYmIHJldmVyc2VHZW9jb2RlclJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudC5wcm92aW5jZSB8fCBudWxsLFxyXG4gICAgICAgICAgc3RyZWV0OiByZXZlcnNlR2VvY29kZXJSZXN1bHQuYWRkcmVzc19jb21wb25lbnQgJiYgcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50LnN0cmVldCB8fCBudWxsLFxyXG4gICAgICAgICAgc3RyZWV0X251bWJlcjogcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50ICYmIHJldmVyc2VHZW9jb2RlclJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudC5zdHJlZXRfbnVtYmVyIHx8IG51bGwsXHJcbiAgICAgICAgICByZWNvbW1lbmQ6IHJldmVyc2VHZW9jb2RlclJlc3VsdC5mb3JtYXR0ZWRfYWRkcmVzc2VzICYmIHJldmVyc2VHZW9jb2RlclJlc3VsdC5mb3JtYXR0ZWRfYWRkcmVzc2VzLnJlY29tbWVuZCB8fCBudWxsLFxyXG4gICAgICAgICAgcm91Z2g6IHJldmVyc2VHZW9jb2RlclJlc3VsdC5mb3JtYXR0ZWRfYWRkcmVzc2VzICYmIHJldmVyc2VHZW9jb2RlclJlc3VsdC5mb3JtYXR0ZWRfYWRkcmVzc2VzLnJvdWdoIHx8IG51bGxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmIChyZXZlcnNlR2VvY29kZXJSZXN1bHQucG9pcykgey8v5Yik5pat5piv5ZCm6L+U5Zue5ZGo6L65cG9pXHJcbiAgICAgICAgICB2YXIgcG9pcyA9IHJldmVyc2VHZW9jb2RlclJlc3VsdC5wb2lzO1xyXG4gICAgICAgICAgdmFyIHBvaXNTaW1wbGlmeSA9IFtdO1xyXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IHBvaXMubGVuZ3RoO2krKykge1xyXG4gICAgICAgICAgICBwb2lzU2ltcGxpZnkucHVzaCh7XHJcbiAgICAgICAgICAgICAgaWQ6IHBvaXNbaV0uaWQgfHwgbnVsbCxcclxuICAgICAgICAgICAgICB0aXRsZTogcG9pc1tpXS50aXRsZSB8fCBudWxsLFxyXG4gICAgICAgICAgICAgIGxhdGl0dWRlOiBwb2lzW2ldLmxvY2F0aW9uICYmIHBvaXNbaV0ubG9jYXRpb24ubGF0IHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBwb2lzW2ldLmxvY2F0aW9uICYmIHBvaXNbaV0ubG9jYXRpb24ubG5nIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgYWRkcmVzczogcG9pc1tpXS5hZGRyZXNzIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgY2F0ZWdvcnk6IHBvaXNbaV0uY2F0ZWdvcnkgfHwgbnVsbCxcclxuICAgICAgICAgICAgICBhZGNvZGU6IHBvaXNbaV0uYWRfaW5mbyAmJiBwb2lzW2ldLmFkX2luZm8uYWRjb2RlIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgY2l0eTogcG9pc1tpXS5hZF9pbmZvICYmIHBvaXNbaV0uYWRfaW5mby5jaXR5IHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgZGlzdHJpY3Q6IHBvaXNbaV0uYWRfaW5mbyAmJiBwb2lzW2ldLmFkX2luZm8uZGlzdHJpY3QgfHwgbnVsbCxcclxuICAgICAgICAgICAgICBwcm92aW5jZTogcG9pc1tpXS5hZF9pbmZvICYmIHBvaXNbaV0uYWRfaW5mby5wcm92aW5jZSB8fCBudWxsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBwYXJhbS5zdWNjZXNzKGRhdGEse1xyXG4gICAgICAgICAgICByZXZlcnNlR2VvY29kZXJSZXN1bHQ6IHJldmVyc2VHZW9jb2RlclJlc3VsdCxcclxuICAgICAgICAgICAgcmV2ZXJzZUdlb2NvZGVyU2ltcGxpZnk6IHJldmVyc2VHZW9jb2RlclNpbXBsaWZ5LFxyXG4gICAgICAgICAgICBwb2lzOiBwb2lzLFxyXG4gICAgICAgICAgICBwb2lzU2ltcGxpZnk6IHBvaXNTaW1wbGlmeVxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcGFyYW0uc3VjY2VzcyhkYXRhLCB7XHJcbiAgICAgICAgICAgIHJldmVyc2VHZW9jb2RlclJlc3VsdDogcmV2ZXJzZUdlb2NvZGVyUmVzdWx0LFxyXG4gICAgICAgICAgICByZXZlcnNlR2VvY29kZXJTaW1wbGlmeTogcmV2ZXJzZUdlb2NvZGVyU2ltcGxpZnlcclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKGZlYXR1cmUgPT0gJ2dlb2NvZGVyJykge1xyXG4gICAgICAgIHZhciBnZW9jb2RlclJlc3VsdCA9IGRhdGEucmVzdWx0O1xyXG4gICAgICAgIHZhciBnZW9jb2RlclNpbXBsaWZ5ID0ge1xyXG4gICAgICAgICAgdGl0bGU6IGdlb2NvZGVyUmVzdWx0LnRpdGxlIHx8IG51bGwsXHJcbiAgICAgICAgICBsYXRpdHVkZTogZ2VvY29kZXJSZXN1bHQubG9jYXRpb24gJiYgZ2VvY29kZXJSZXN1bHQubG9jYXRpb24ubGF0IHx8IG51bGwsXHJcbiAgICAgICAgICBsb25naXR1ZGU6IGdlb2NvZGVyUmVzdWx0LmxvY2F0aW9uICYmIGdlb2NvZGVyUmVzdWx0LmxvY2F0aW9uLmxuZyB8fCBudWxsLFxyXG4gICAgICAgICAgYWRjb2RlOiBnZW9jb2RlclJlc3VsdC5hZF9pbmZvICYmIGdlb2NvZGVyUmVzdWx0LmFkX2luZm8uYWRjb2RlIHx8IG51bGwsXHJcbiAgICAgICAgICBwcm92aW5jZTogZ2VvY29kZXJSZXN1bHQuYWRkcmVzc19jb21wb25lbnRzICYmIGdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50cy5wcm92aW5jZSB8fCBudWxsLFxyXG4gICAgICAgICAgY2l0eTogZ2VvY29kZXJSZXN1bHQuYWRkcmVzc19jb21wb25lbnRzICYmIGdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50cy5jaXR5IHx8IG51bGwsXHJcbiAgICAgICAgICBkaXN0cmljdDogZ2VvY29kZXJSZXN1bHQuYWRkcmVzc19jb21wb25lbnRzICYmIGdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50cy5kaXN0cmljdCB8fCBudWxsLFxyXG4gICAgICAgICAgc3RyZWV0OiBnZW9jb2RlclJlc3VsdC5hZGRyZXNzX2NvbXBvbmVudHMgJiYgZ2VvY29kZXJSZXN1bHQuYWRkcmVzc19jb21wb25lbnRzLnN0cmVldCB8fCBudWxsLFxyXG4gICAgICAgICAgc3RyZWV0X251bWJlcjogZ2VvY29kZXJSZXN1bHQuYWRkcmVzc19jb21wb25lbnRzICYmIGdlb2NvZGVyUmVzdWx0LmFkZHJlc3NfY29tcG9uZW50cy5zdHJlZXRfbnVtYmVyIHx8IG51bGwsXHJcbiAgICAgICAgICBsZXZlbDogZ2VvY29kZXJSZXN1bHQubGV2ZWwgfHwgbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcGFyYW0uc3VjY2VzcyhkYXRhLHtcclxuICAgICAgICAgIGdlb2NvZGVyUmVzdWx0OiBnZW9jb2RlclJlc3VsdCxcclxuICAgICAgICAgIGdlb2NvZGVyU2ltcGxpZnk6IGdlb2NvZGVyU2ltcGxpZnlcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmIChmZWF0dXJlID09ICdnZXRDaXR5TGlzdCcpIHtcclxuICAgICAgICB2YXIgcHJvdmluY2VSZXN1bHQgPSBkYXRhLnJlc3VsdFswXTtcclxuICAgICAgICB2YXIgY2l0eVJlc3VsdCA9IGRhdGEucmVzdWx0WzFdO1xyXG4gICAgICAgIHZhciBkaXN0cmljdFJlc3VsdCA9IGRhdGEucmVzdWx0WzJdO1xyXG4gICAgICAgIHBhcmFtLnN1Y2Nlc3MoZGF0YSx7XHJcbiAgICAgICAgICBwcm92aW5jZVJlc3VsdDogcHJvdmluY2VSZXN1bHQsXHJcbiAgICAgICAgICBjaXR5UmVzdWx0OiBjaXR5UmVzdWx0LFxyXG4gICAgICAgICAgZGlzdHJpY3RSZXN1bHQ6IGRpc3RyaWN0UmVzdWx0XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoZmVhdHVyZSA9PSAnZ2V0RGlzdHJpY3RCeUNpdHlJZCcpIHtcclxuICAgICAgICB2YXIgZGlzdHJpY3RCeUNpdHkgPSBkYXRhLnJlc3VsdFswXTtcclxuICAgICAgICBwYXJhbS5zdWNjZXNzKGRhdGEsIGRpc3RyaWN0QnlDaXR5KTtcclxuICAgICAgfSBlbHNlIGlmIChmZWF0dXJlID09ICdjYWxjdWxhdGVEaXN0YW5jZScpIHtcclxuICAgICAgICB2YXIgY2FsY3VsYXRlRGlzdGFuY2VSZXN1bHQgPSBkYXRhLnJlc3VsdC5lbGVtZW50czsgIFxyXG4gICAgICAgIHZhciBkaXN0YW5jZSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsY3VsYXRlRGlzdGFuY2VSZXN1bHQubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgZGlzdGFuY2UucHVzaChjYWxjdWxhdGVEaXN0YW5jZVJlc3VsdFtpXS5kaXN0YW5jZSk7XHJcbiAgICAgICAgfSAgIFxyXG4gICAgICAgIHBhcmFtLnN1Y2Nlc3MoZGF0YSwge1xyXG4gICAgICAgICAgY2FsY3VsYXRlRGlzdGFuY2VSZXN1bHQ6IGNhbGN1bGF0ZURpc3RhbmNlUmVzdWx0LFxyXG4gICAgICAgICAgZGlzdGFuY2U6IGRpc3RhbmNlXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIGlmIChmZWF0dXJlID09ICdkaXJlY3Rpb24nKSB7XHJcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGRhdGEucmVzdWx0LnJvdXRlcztcclxuICAgICAgICBwYXJhbS5zdWNjZXNzKGRhdGEsZGlyZWN0aW9uKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBwYXJhbS5zdWNjZXNzKGRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5p6E6YCg5b6u5L+h6K+35rGC5Y+C5pWw77yM5YWs5YWx5bGe5oCn5aSE55CGXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSDmjqXlj6Plj4LmlbBcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbSDphY3nva7poblcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBmZWF0dXJlIOaWueazleWQjVxyXG4gICAgICovXHJcbiAgICBidWlsZFd4UmVxdWVzdENvbmZpZyhwYXJhbSwgb3B0aW9ucywgZmVhdHVyZSkge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBvcHRpb25zLmhlYWRlciA9IHsgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfTtcclxuICAgICAgICBvcHRpb25zLm1ldGhvZCA9ICdHRVQnO1xyXG4gICAgICAgIG9wdGlvbnMuc3VjY2VzcyA9IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSByZXMuZGF0YTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgdGhhdC5oYW5kbGVEYXRhKHBhcmFtLCBkYXRhLCBmZWF0dXJlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtLmZhaWwoZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIG9wdGlvbnMuZmFpbCA9IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSBFUlJPUl9DT05GLldYX0VSUl9DT0RFO1xyXG4gICAgICAgICAgICBwYXJhbS5mYWlsKHRoYXQuYnVpbGRFcnJvckNvbmZpZyhFUlJPUl9DT05GLldYX0VSUl9DT0RFLCByZXMuZXJyTXNnKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBvcHRpb25zLmNvbXBsZXRlID0gZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICB2YXIgc3RhdHVzQ29kZSA9ICtyZXMuc3RhdHVzQ29kZTtcclxuICAgICAgICAgICAgc3dpdGNoKHN0YXR1c0NvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgRVJST1JfQ09ORi5XWF9FUlJfQ09ERToge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmNvbXBsZXRlKHRoYXQuYnVpbGRFcnJvckNvbmZpZyhFUlJPUl9DT05GLldYX0VSUl9DT0RFLCByZXMuZXJyTXNnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIEVSUk9SX0NPTkYuV1hfT0tfQ09ERToge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtLmNvbXBsZXRlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtLmNvbXBsZXRlKHRoYXQuYnVpbGRFcnJvckNvbmZpZyhkYXRhLnN0YXR1cywgZGF0YS5tZXNzYWdlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDp7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uY29tcGxldGUodGhhdC5idWlsZEVycm9yQ29uZmlnKEVSUk9SX0NPTkYuU1lTVEVNX0VSUiwgRVJST1JfQ09ORi5TWVNURU1fRVJSX01TRykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5aSE55CG55So5oi35Y+C5pWw5piv5ZCm5Lyg5YWl5Z2Q5qCH6L+b6KGM5LiN5ZCM55qE5aSE55CGXHJcbiAgICAgKi9cclxuICAgIGxvY2F0aW9uUHJvY2VzcyhwYXJhbSwgbG9jYXRpb25zdWNjZXNzLCBsb2NhdGlvbmZhaWwsIGxvY2F0aW9uY29tcGxldGUpIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgbG9jYXRpb25mYWlsID0gbG9jYXRpb25mYWlsIHx8IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSBFUlJPUl9DT05GLldYX0VSUl9DT0RFO1xyXG4gICAgICAgICAgICBwYXJhbS5mYWlsKHRoYXQuYnVpbGRFcnJvckNvbmZpZyhFUlJPUl9DT05GLldYX0VSUl9DT0RFLCByZXMuZXJyTXNnKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsb2NhdGlvbmNvbXBsZXRlID0gbG9jYXRpb25jb21wbGV0ZSB8fCBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PSBFUlJPUl9DT05GLldYX0VSUl9DT0RFKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS5jb21wbGV0ZSh0aGF0LmJ1aWxkRXJyb3JDb25maWcoRVJST1JfQ09ORi5XWF9FUlJfQ09ERSwgcmVzLmVyck1zZykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoIXBhcmFtLmxvY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoYXQuZ2V0V1hMb2NhdGlvbihsb2NhdGlvbnN1Y2Nlc3MsIGxvY2F0aW9uZmFpbCwgbG9jYXRpb25jb21wbGV0ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGF0LmNoZWNrTG9jYXRpb24ocGFyYW0pKSB7XHJcbiAgICAgICAgICAgIHZhciBsb2NhdGlvbiA9IFV0aWxzLmdldExvY2F0aW9uUGFyYW0ocGFyYW0ubG9jYXRpb24pO1xyXG4gICAgICAgICAgICBsb2NhdGlvbnN1Y2Nlc3MobG9jYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxyXG5jbGFzcyBRUU1hcFdYIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaehOmAoOWHveaVsFxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyDmjqXlj6Plj4LmlbAsa2V5IOS4uuW/hemAieWPguaVsFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKCFvcHRpb25zLmtleSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcigna2V55YC85LiN6IO95Li656m6Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMua2V5ID0gb3B0aW9ucy5rZXk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUE9J5ZGo6L655qOA57SiXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMg5o6l5Y+j5Y+C5pWw5a+56LGhXHJcbiAgICAgKiBcclxuICAgICAqIOWPguaVsOWvueixoee7k+aehOWPr+S7peWPguiAg1xyXG4gICAgICogQHNlZSBodHRwOi8vbGJzLnFxLmNvbS93ZWJzZXJ2aWNlX3YxL2d1aWRlLXNlYXJjaC5odG1sXHJcbiAgICAgKi9cclxuICAgIHNlYXJjaChvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICAgICAgICBVdGlscy5wb2x5ZmlsbFBhcmFtKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoIVV0aWxzLmNoZWNrS2V5d29yZChvcHRpb25zKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdFBhcmFtID0ge1xyXG4gICAgICAgICAgICBrZXl3b3JkOiBvcHRpb25zLmtleXdvcmQsXHJcbiAgICAgICAgICAgIG9yZGVyYnk6IG9wdGlvbnMub3JkZXJieSB8fCAnX2Rpc3RhbmNlJyxcclxuICAgICAgICAgICAgcGFnZV9zaXplOiBvcHRpb25zLnBhZ2Vfc2l6ZSB8fCAxMCxcclxuICAgICAgICAgICAgcGFnZV9pbmRleDogb3B0aW9ucy5wYWdlX2luZGV4IHx8IDEsXHJcbiAgICAgICAgICAgIG91dHB1dDogJ2pzb24nLFxyXG4gICAgICAgICAgICBrZXk6IHRoYXQua2V5XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYWRkcmVzc19mb3JtYXQpIHtcclxuICAgICAgICAgICAgcmVxdWVzdFBhcmFtLmFkZHJlc3NfZm9ybWF0ID0gb3B0aW9ucy5hZGRyZXNzX2Zvcm1hdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLmZpbHRlcikge1xyXG4gICAgICAgICAgICByZXF1ZXN0UGFyYW0uZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZGlzdGFuY2UgPSBvcHRpb25zLmRpc3RhbmNlIHx8IFwiMTAwMFwiO1xyXG4gICAgICAgIHZhciBhdXRvX2V4dGVuZCA9IG9wdGlvbnMuYXV0b19leHRlbmQgfHwgMTtcclxuICAgICAgICB2YXIgcmVnaW9uID0gbnVsbDtcclxuICAgICAgICB2YXIgcmVjdGFuZ2xlID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy/liKTmlq3ln47luILpmZDlrprlj4LmlbBcclxuICAgICAgICBpZiAob3B0aW9ucy5yZWdpb24pIHtcclxuICAgICAgICAgIHJlZ2lvbiA9IG9wdGlvbnMucmVnaW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/nn6nlvaLpmZDlrprlnZDmoIco5pqC5pe25Y+q5pSv5oyB5a2X56ym5Liy5qC85byPKVxyXG4gICAgICAgIGlmIChvcHRpb25zLnJlY3RhbmdsZSkge1xyXG4gICAgICAgICAgcmVjdGFuZ2xlID0gb3B0aW9ucy5yZWN0YW5nbGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbG9jYXRpb25zdWNjZXNzID0gZnVuY3Rpb24gKHJlc3VsdCkgeyAgICAgICAgXHJcbiAgICAgICAgICBpZiAocmVnaW9uICYmICFyZWN0YW5nbGUpIHtcclxuICAgICAgICAgICAgLy/ln47luILpmZDlrprlj4LmlbDmi7zmjqVcclxuICAgICAgICAgICAgcmVxdWVzdFBhcmFtLmJvdW5kYXJ5ID0gXCJyZWdpb24oXCIgKyByZWdpb24gKyBcIixcIiArIGF1dG9fZXh0ZW5kICsgXCIsXCIgKyByZXN1bHQubGF0aXR1ZGUgKyBcIixcIiArIHJlc3VsdC5sb25naXR1ZGUgKyBcIilcIjtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2lnKSB7XHJcbiAgICAgICAgICAgICAgcmVxdWVzdFBhcmFtLnNpZyA9IFV0aWxzLmdldFNpZyhyZXF1ZXN0UGFyYW0sIG9wdGlvbnMuc2lnLCAnc2VhcmNoJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAocmVjdGFuZ2xlICYmICFyZWdpb24pIHtcclxuICAgICAgICAgICAgLy/nn6nlvaLmkJzntKJcclxuICAgICAgICAgICAgcmVxdWVzdFBhcmFtLmJvdW5kYXJ5ID0gXCJyZWN0YW5nbGUoXCIgKyByZWN0YW5nbGUgKyBcIilcIjtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2lnKSB7XHJcbiAgICAgICAgICAgICAgcmVxdWVzdFBhcmFtLnNpZyA9IFV0aWxzLmdldFNpZyhyZXF1ZXN0UGFyYW0sIG9wdGlvbnMuc2lnLCAnc2VhcmNoJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICByZXF1ZXN0UGFyYW0uYm91bmRhcnkgPSBcIm5lYXJieShcIiArIHJlc3VsdC5sYXRpdHVkZSArIFwiLFwiICsgcmVzdWx0LmxvbmdpdHVkZSArIFwiLFwiICsgZGlzdGFuY2UgKyBcIixcIiArIGF1dG9fZXh0ZW5kICsgXCIpXCI7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnNpZykge1xyXG4gICAgICAgICAgICAgIHJlcXVlc3RQYXJhbS5zaWcgPSBVdGlscy5nZXRTaWcocmVxdWVzdFBhcmFtLCBvcHRpb25zLnNpZywgJ3NlYXJjaCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcclxuICAgICAgICAgICAgd3gucmVxdWVzdChVdGlscy5idWlsZFd4UmVxdWVzdENvbmZpZyhvcHRpb25zLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFVSTF9TRUFSQ0gsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZXF1ZXN0UGFyYW1cclxuICAgICAgICAgICAgfSwgJ3NlYXJjaCcpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFV0aWxzLmxvY2F0aW9uUHJvY2VzcyhvcHRpb25zLCBsb2NhdGlvbnN1Y2Nlc3MpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIHN1Z+aooeeziuajgOe0olxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIOaOpeWPo+WPguaVsOWvueixoVxyXG4gICAgICogXHJcbiAgICAgKiDlj4LmlbDlr7nosaHnu5PmnoTlj6/ku6Xlj4LogINcclxuICAgICAqIGh0dHA6Ly9sYnMucXEuY29tL3dlYnNlcnZpY2VfdjEvZ3VpZGUtc3VnZ2VzdGlvbi5odG1sXHJcbiAgICAgKi9cclxuICAgIGdldFN1Z2dlc3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICBVdGlscy5wb2x5ZmlsbFBhcmFtKG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBpZiAoIVV0aWxzLmNoZWNrS2V5d29yZChvcHRpb25zKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdFBhcmFtID0ge1xyXG4gICAgICAgICAgICBrZXl3b3JkOiBvcHRpb25zLmtleXdvcmQsXHJcbiAgICAgICAgICAgIHJlZ2lvbjogb3B0aW9ucy5yZWdpb24gfHwgJ+WFqOWbvScsXHJcbiAgICAgICAgICAgIHJlZ2lvbl9maXg6IG9wdGlvbnMucmVnaW9uX2ZpeCB8fCAwLFxyXG4gICAgICAgICAgICBwb2xpY3k6IG9wdGlvbnMucG9saWN5IHx8IDAsXHJcbiAgICAgICAgICAgIHBhZ2Vfc2l6ZTogb3B0aW9ucy5wYWdlX3NpemUgfHwgMTAsLy/mjqfliLbmmL7npLrmnaHmlbBcclxuICAgICAgICAgICAgcGFnZV9pbmRleDogb3B0aW9ucy5wYWdlX2luZGV4IHx8IDEsLy/mjqfliLbpobXmlbBcclxuICAgICAgICAgICAgZ2V0X3N1YnBvaXMgOiBvcHRpb25zLmdldF9zdWJwb2lzIHx8IDAsLy/ov5Tlm57lrZDlnLDngrlcclxuICAgICAgICAgICAgb3V0cHV0OiAnanNvbicsXHJcbiAgICAgICAgICAgIGtleTogdGhhdC5rZXlcclxuICAgICAgICB9O1xyXG4gICAgICAgIC8v6ZW/5Zyw5Z2AXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuYWRkcmVzc19mb3JtYXQpIHtcclxuICAgICAgICAgIHJlcXVlc3RQYXJhbS5hZGRyZXNzX2Zvcm1hdCA9IG9wdGlvbnMuYWRkcmVzc19mb3JtYXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6L+H5rukXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuZmlsdGVyKSB7XHJcbiAgICAgICAgICByZXF1ZXN0UGFyYW0uZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5o6S5bqPXHJcbiAgICAgICAgaWYgKG9wdGlvbnMubG9jYXRpb24pIHtcclxuICAgICAgICAgIHZhciBsb2NhdGlvbnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RQYXJhbS5sb2NhdGlvbiA9IHJlc3VsdC5sYXRpdHVkZSArICcsJyArIHJlc3VsdC5sb25naXR1ZGU7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnNpZykge1xyXG4gICAgICAgICAgICAgIHJlcXVlc3RQYXJhbS5zaWcgPSBVdGlscy5nZXRTaWcocmVxdWVzdFBhcmFtLCBvcHRpb25zLnNpZywgJ3N1Z2dlc3QnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KFV0aWxzLmJ1aWxkV3hSZXF1ZXN0Q29uZmlnKG9wdGlvbnMsIHtcclxuICAgICAgICAgICAgICB1cmw6IFVSTF9TVUdHRVNUSU9OLFxyXG4gICAgICAgICAgICAgIGRhdGE6IHJlcXVlc3RQYXJhbVxyXG4gICAgICAgICAgICB9LCBcInN1Z2dlc3RcIikpOyAgICAgIFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIFV0aWxzLmxvY2F0aW9uUHJvY2VzcyhvcHRpb25zLCBsb2NhdGlvbnN1Y2Nlc3MpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAob3B0aW9ucy5zaWcpIHtcclxuICAgICAgICAgICAgcmVxdWVzdFBhcmFtLnNpZyA9IFV0aWxzLmdldFNpZyhyZXF1ZXN0UGFyYW0sIG9wdGlvbnMuc2lnLCAnc3VnZ2VzdCcpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgd3gucmVxdWVzdChVdGlscy5idWlsZFd4UmVxdWVzdENvbmZpZyhvcHRpb25zLCB7XHJcbiAgICAgICAgICAgIHVybDogVVJMX1NVR0dFU1RJT04sXHJcbiAgICAgICAgICAgIGRhdGE6IHJlcXVlc3RQYXJhbVxyXG4gICAgICAgICAgfSwgXCJzdWdnZXN0XCIpKTsgICAgICBcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpgIblnLDlnYDop6PmnpBcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyDmjqXlj6Plj4LmlbDlr7nosaFcclxuICAgICAqIFxyXG4gICAgICog6K+35rGC5Y+C5pWw57uT5p6E5Y+v5Lul5Y+C6ICDXHJcbiAgICAgKiBodHRwOi8vbGJzLnFxLmNvbS93ZWJzZXJ2aWNlX3YxL2d1aWRlLWdjb2Rlci5odG1sXHJcbiAgICAgKi9cclxuICAgIHJldmVyc2VHZW9jb2RlcihvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIFV0aWxzLnBvbHlmaWxsUGFyYW0ob3B0aW9ucyk7XHJcbiAgICAgICAgdmFyIHJlcXVlc3RQYXJhbSA9IHtcclxuICAgICAgICAgICAgY29vcmRfdHlwZTogb3B0aW9ucy5jb29yZF90eXBlIHx8IDUsXHJcbiAgICAgICAgICAgIGdldF9wb2k6IG9wdGlvbnMuZ2V0X3BvaSB8fCAwLFxyXG4gICAgICAgICAgICBvdXRwdXQ6ICdqc29uJyxcclxuICAgICAgICAgICAga2V5OiB0aGF0LmtleVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKG9wdGlvbnMucG9pX29wdGlvbnMpIHtcclxuICAgICAgICAgICAgcmVxdWVzdFBhcmFtLnBvaV9vcHRpb25zID0gb3B0aW9ucy5wb2lfb3B0aW9uc1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxvY2F0aW9uc3VjY2VzcyA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgcmVxdWVzdFBhcmFtLmxvY2F0aW9uID0gcmVzdWx0LmxhdGl0dWRlICsgJywnICsgcmVzdWx0LmxvbmdpdHVkZTtcclxuICAgICAgICAgIGlmIChvcHRpb25zLnNpZykge1xyXG4gICAgICAgICAgICByZXF1ZXN0UGFyYW0uc2lnID0gVXRpbHMuZ2V0U2lnKHJlcXVlc3RQYXJhbSwgb3B0aW9ucy5zaWcsICdyZXZlcnNlR2VvY29kZXInKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICAgd3gucmVxdWVzdChVdGlscy5idWlsZFd4UmVxdWVzdENvbmZpZyhvcHRpb25zLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6IFVSTF9HRVRfR0VPQ09ERVIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiByZXF1ZXN0UGFyYW1cclxuICAgICAgICAgICAgfSwgJ3JldmVyc2VHZW9jb2RlcicpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFV0aWxzLmxvY2F0aW9uUHJvY2VzcyhvcHRpb25zLCBsb2NhdGlvbnN1Y2Nlc3MpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWcsOWdgOino+aekFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIOaOpeWPo+WPguaVsOWvueixoVxyXG4gICAgICogXHJcbiAgICAgKiDor7fmsYLlj4LmlbDnu5PmnoTlj6/ku6Xlj4LogINcclxuICAgICAqIGh0dHA6Ly9sYnMucXEuY29tL3dlYnNlcnZpY2VfdjEvZ3VpZGUtZ2VvY29kZXIuaHRtbFxyXG4gICAgICovXHJcbiAgICBnZW9jb2RlcihvcHRpb25zKSB7XHJcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgIFV0aWxzLnBvbHlmaWxsUGFyYW0ob3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGlmIChVdGlscy5jaGVja1BhcmFtS2V5RW1wdHkob3B0aW9ucywgJ2FkZHJlc3MnKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdFBhcmFtID0ge1xyXG4gICAgICAgICAgICBhZGRyZXNzOiBvcHRpb25zLmFkZHJlc3MsXHJcbiAgICAgICAgICAgIG91dHB1dDogJ2pzb24nLFxyXG4gICAgICAgICAgICBrZXk6IHRoYXQua2V5XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy/ln47luILpmZDlrppcclxuICAgICAgICBpZiAob3B0aW9ucy5yZWdpb24pIHtcclxuICAgICAgICAgIHJlcXVlc3RQYXJhbS5yZWdpb24gPSBvcHRpb25zLnJlZ2lvbjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLnNpZykge1xyXG4gICAgICAgICAgcmVxdWVzdFBhcmFtLnNpZyA9IFV0aWxzLmdldFNpZyhyZXF1ZXN0UGFyYW0sIG9wdGlvbnMuc2lnLCAnZ2VvY29kZXInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHd4LnJlcXVlc3QoVXRpbHMuYnVpbGRXeFJlcXVlc3RDb25maWcob3B0aW9ucywge1xyXG4gICAgICAgICAgICB1cmw6IFVSTF9HRVRfR0VPQ09ERVIsXHJcbiAgICAgICAgICAgIGRhdGE6IHJlcXVlc3RQYXJhbVxyXG4gICAgICAgIH0sJ2dlb2NvZGVyJykpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bln47luILliJfooahcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyDmjqXlj6Plj4LmlbDlr7nosaFcclxuICAgICAqIFxyXG4gICAgICog6K+35rGC5Y+C5pWw57uT5p6E5Y+v5Lul5Y+C6ICDXHJcbiAgICAgKiBodHRwOi8vbGJzLnFxLmNvbS93ZWJzZXJ2aWNlX3YxL2d1aWRlLXJlZ2lvbi5odG1sXHJcbiAgICAgKi9cclxuICAgIGdldENpdHlMaXN0KG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgVXRpbHMucG9seWZpbGxQYXJhbShvcHRpb25zKTtcclxuICAgICAgICB2YXIgcmVxdWVzdFBhcmFtID0ge1xyXG4gICAgICAgICAgICBvdXRwdXQ6ICdqc29uJyxcclxuICAgICAgICAgICAga2V5OiB0aGF0LmtleVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmIChvcHRpb25zLnNpZykge1xyXG4gICAgICAgICAgcmVxdWVzdFBhcmFtLnNpZyA9IFV0aWxzLmdldFNpZyhyZXF1ZXN0UGFyYW0sIG9wdGlvbnMuc2lnLCAnZ2V0Q2l0eUxpc3QnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHd4LnJlcXVlc3QoVXRpbHMuYnVpbGRXeFJlcXVlc3RDb25maWcob3B0aW9ucywge1xyXG4gICAgICAgICAgICB1cmw6IFVSTF9DSVRZX0xJU1QsXHJcbiAgICAgICAgICAgIGRhdGE6IHJlcXVlc3RQYXJhbVxyXG4gICAgICAgIH0sJ2dldENpdHlMaXN0JykpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWvueW6lOWfjuW4gklE55qE5Yy65Y6/5YiX6KGoXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMg5o6l5Y+j5Y+C5pWw5a+56LGhXHJcbiAgICAgKiBcclxuICAgICAqIOivt+axguWPguaVsOe7k+aehOWPr+S7peWPguiAg1xyXG4gICAgICogaHR0cDovL2xicy5xcS5jb20vd2Vic2VydmljZV92MS9ndWlkZS1yZWdpb24uaHRtbFxyXG4gICAgICovXHJcbiAgICBnZXREaXN0cmljdEJ5Q2l0eUlkKG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgVXRpbHMucG9seWZpbGxQYXJhbShvcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrUGFyYW1LZXlFbXB0eShvcHRpb25zLCAnaWQnKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdFBhcmFtID0ge1xyXG4gICAgICAgICAgICBpZDogb3B0aW9ucy5pZCB8fCAnJyxcclxuICAgICAgICAgICAgb3V0cHV0OiAnanNvbicsXHJcbiAgICAgICAgICAgIGtleTogdGhhdC5rZXlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBpZiAob3B0aW9ucy5zaWcpIHtcclxuICAgICAgICAgIHJlcXVlc3RQYXJhbS5zaWcgPSBVdGlscy5nZXRTaWcocmVxdWVzdFBhcmFtLCBvcHRpb25zLnNpZywgJ2dldERpc3RyaWN0QnlDaXR5SWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHd4LnJlcXVlc3QoVXRpbHMuYnVpbGRXeFJlcXVlc3RDb25maWcob3B0aW9ucywge1xyXG4gICAgICAgICAgICB1cmw6IFVSTF9BUkVBX0xJU1QsXHJcbiAgICAgICAgICAgIGRhdGE6IHJlcXVlc3RQYXJhbVxyXG4gICAgICAgIH0sJ2dldERpc3RyaWN0QnlDaXR5SWQnKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog55So5LqO5Y2V6LW354K55Yiw5aSa57uI54K555qE6Lev57q/6Led56a7KOmdnuebtOe6v+i3neemuynorqHnrpfvvJpcclxuICAgICAqIOaUr+aMgeS4pOenjei3neemu+iuoeeul+aWueW8j++8muatpeihjOWSjOmpvui9puOAglxyXG4gICAgICog6LW354K55Yiw57uI54K55pyA5aSn6ZmQ5Yi255u057q/6Led56a7MTDlhazph4zjgIJcclxuICAgICAqXHJcbiAgICAgKiDmlrDlop7nm7Tnur/ot53nprvorqHnrpfjgIJcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMg5o6l5Y+j5Y+C5pWw5a+56LGhXHJcbiAgICAgKiBcclxuICAgICAqIOivt+axguWPguaVsOe7k+aehOWPr+S7peWPguiAg1xyXG4gICAgICogaHR0cDovL2xicy5xcS5jb20vd2Vic2VydmljZV92MS9ndWlkZS1kaXN0YW5jZS5odG1sXHJcbiAgICAgKi9cclxuICAgIGNhbGN1bGF0ZURpc3RhbmNlKG9wdGlvbnMpIHtcclxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgVXRpbHMucG9seWZpbGxQYXJhbShvcHRpb25zKTtcclxuXHJcbiAgICAgICAgaWYgKFV0aWxzLmNoZWNrUGFyYW1LZXlFbXB0eShvcHRpb25zLCAndG8nKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgcmVxdWVzdFBhcmFtID0ge1xyXG4gICAgICAgICAgICBtb2RlOiBvcHRpb25zLm1vZGUgfHwgJ3dhbGtpbmcnLFxyXG4gICAgICAgICAgICB0bzogVXRpbHMubG9jYXRpb24ycXVlcnkob3B0aW9ucy50byksXHJcbiAgICAgICAgICAgIG91dHB1dDogJ2pzb24nLFxyXG4gICAgICAgICAgICBrZXk6IHRoYXQua2V5XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYgKG9wdGlvbnMuZnJvbSkge1xyXG4gICAgICAgICAgb3B0aW9ucy5sb2NhdGlvbiA9IG9wdGlvbnMuZnJvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6K6h566X55u057q/6Led56a7XHJcbiAgICAgICAgaWYocmVxdWVzdFBhcmFtLm1vZGUgPT0gJ3N0cmFpZ2h0Jyl7ICAgICAgICBcclxuICAgICAgICAgIHZhciBsb2NhdGlvbnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHZhciBsb2NhdGlvblRvID0gVXRpbHMuZ2V0RW5kTG9jYXRpb24ocmVxdWVzdFBhcmFtLnRvKTsvL+WkhOeQhue7iOeCueWdkOagh1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IHtcclxuICAgICAgICAgICAgICBtZXNzYWdlOlwicXVlcnkgb2tcIixcclxuICAgICAgICAgICAgICByZXN1bHQ6e1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHM6W11cclxuICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgIHN0YXR1czowXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbG9jYXRpb25Uby5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIGRhdGEucmVzdWx0LmVsZW1lbnRzLnB1c2goey8v5bCG5Z2Q5qCH5a2Y5YWlXHJcbiAgICAgICAgICAgICAgICBkaXN0YW5jZTogVXRpbHMuZ2V0RGlzdGFuY2UocmVzdWx0LmxhdGl0dWRlLCByZXN1bHQubG9uZ2l0dWRlLCBsb2NhdGlvblRvW2ldLmxhdCwgbG9jYXRpb25Ub1tpXS5sbmcpLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246MCxcclxuICAgICAgICAgICAgICAgIGZyb206e1xyXG4gICAgICAgICAgICAgICAgICBsYXQ6IHJlc3VsdC5sYXRpdHVkZSxcclxuICAgICAgICAgICAgICAgICAgbG5nOnJlc3VsdC5sb25naXR1ZGVcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0bzp7XHJcbiAgICAgICAgICAgICAgICAgIGxhdDogbG9jYXRpb25Ub1tpXS5sYXQsXHJcbiAgICAgICAgICAgICAgICAgIGxuZzogbG9jYXRpb25Ub1tpXS5sbmdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgY2FsY3VsYXRlUmVzdWx0ID0gZGF0YS5yZXN1bHQuZWxlbWVudHM7XHJcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZVJlc3VsdCA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGN1bGF0ZVJlc3VsdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIGRpc3RhbmNlUmVzdWx0LnB1c2goY2FsY3VsYXRlUmVzdWx0W2ldLmRpc3RhbmNlKTtcclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLnN1Y2Nlc3MoZGF0YSx7XHJcbiAgICAgICAgICAgICAgY2FsY3VsYXRlUmVzdWx0OiBjYWxjdWxhdGVSZXN1bHQsXHJcbiAgICAgICAgICAgICAgZGlzdGFuY2VSZXN1bHQ6IGRpc3RhbmNlUmVzdWx0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIFxyXG4gICAgICAgICAgVXRpbHMubG9jYXRpb25Qcm9jZXNzKG9wdGlvbnMsIGxvY2F0aW9uc3VjY2Vzcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBsb2NhdGlvbnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RQYXJhbS5mcm9tID0gcmVzdWx0LmxhdGl0dWRlICsgJywnICsgcmVzdWx0LmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuc2lnKSB7XHJcbiAgICAgICAgICAgICAgcmVxdWVzdFBhcmFtLnNpZyA9IFV0aWxzLmdldFNpZyhyZXF1ZXN0UGFyYW0sIG9wdGlvbnMuc2lnLCAnY2FsY3VsYXRlRGlzdGFuY2UnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KFV0aWxzLmJ1aWxkV3hSZXF1ZXN0Q29uZmlnKG9wdGlvbnMsIHtcclxuICAgICAgICAgICAgICB1cmw6IFVSTF9ESVNUQU5DRSxcclxuICAgICAgICAgICAgICBkYXRhOiByZXF1ZXN0UGFyYW1cclxuICAgICAgICAgICAgfSwnY2FsY3VsYXRlRGlzdGFuY2UnKSk7XHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIFV0aWxzLmxvY2F0aW9uUHJvY2VzcyhvcHRpb25zLCBsb2NhdGlvbnN1Y2Nlc3MpO1xyXG4gICAgICAgIH0gICAgICBcclxuICAgIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIOi3r+e6v+inhOWIku+8mlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIOaOpeWPo+WPguaVsOWvueixoVxyXG4gICAqIFxyXG4gICAqIOivt+axguWPguaVsOe7k+aehOWPr+S7peWPguiAg1xyXG4gICAqIGh0dHBzOi8vbGJzLnFxLmNvbS93ZWJzZXJ2aWNlX3YxL2d1aWRlLXJvYWQuaHRtbFxyXG4gICAqL1xyXG4gIGRpcmVjdGlvbihvcHRpb25zKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXM7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgIFV0aWxzLnBvbHlmaWxsUGFyYW0ob3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKFV0aWxzLmNoZWNrUGFyYW1LZXlFbXB0eShvcHRpb25zLCAndG8nKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHJlcXVlc3RQYXJhbSA9IHtcclxuICAgICAgb3V0cHV0OiAnanNvbicsXHJcbiAgICAgIGtleTogdGhhdC5rZXlcclxuICAgIH07XHJcblxyXG4gICAgLy90b+agvOW8j+WkhOeQhlxyXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnRvID09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJlcXVlc3RQYXJhbS50byA9IG9wdGlvbnMudG87XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXF1ZXN0UGFyYW0udG8gPSBvcHRpb25zLnRvLmxhdGl0dWRlICsgJywnICsgb3B0aW9ucy50by5sb25naXR1ZGU7XHJcbiAgICB9XHJcbiAgICAvL+WIneWni+WMluWxgOmDqOivt+axguWfn+WQjVxyXG4gICAgdmFyIFNFVF9VUkxfRElSRUNUSU9OID0gbnVsbDtcclxuICAgIC8v6K6+572u6buY6K6kbW9kZeWxnuaAp1xyXG4gICAgb3B0aW9ucy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IE1PREUuZHJpdmluZztcclxuXHJcbiAgICAvL+iuvue9ruivt+axguWfn+WQjVxyXG4gICAgU0VUX1VSTF9ESVJFQ1RJT04gPSBVUkxfRElSRUNUSU9OICsgb3B0aW9ucy5tb2RlO1xyXG5cclxuICAgIGlmIChvcHRpb25zLmZyb20pIHtcclxuICAgICAgb3B0aW9ucy5sb2NhdGlvbiA9IG9wdGlvbnMuZnJvbTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5tb2RlID09IE1PREUuZHJpdmluZykge1xyXG4gICAgICBpZiAob3B0aW9ucy5mcm9tX3BvaSkge1xyXG4gICAgICAgIHJlcXVlc3RQYXJhbS5mcm9tX3BvaSA9IG9wdGlvbnMuZnJvbV9wb2k7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9wdGlvbnMuaGVhZGluZykge1xyXG4gICAgICAgIHJlcXVlc3RQYXJhbS5oZWFkaW5nID0gb3B0aW9ucy5oZWFkaW5nO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvcHRpb25zLnNwZWVkKSB7XHJcbiAgICAgICAgcmVxdWVzdFBhcmFtLnNwZWVkID0gb3B0aW9ucy5zcGVlZDtcclxuICAgICAgfVxyXG4gICAgICBpZiAob3B0aW9ucy5hY2N1cmFjeSkge1xyXG4gICAgICAgIHJlcXVlc3RQYXJhbS5hY2N1cmFjeSA9IG9wdGlvbnMuYWNjdXJhY3k7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9wdGlvbnMucm9hZF90eXBlKSB7XHJcbiAgICAgICAgcmVxdWVzdFBhcmFtLnJvYWRfdHlwZSA9IG9wdGlvbnMucm9hZF90eXBlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvcHRpb25zLnRvX3BvaSkge1xyXG4gICAgICAgIHJlcXVlc3RQYXJhbS50b19wb2kgPSBvcHRpb25zLnRvX3BvaTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob3B0aW9ucy5mcm9tX3RyYWNrKSB7XHJcbiAgICAgICAgcmVxdWVzdFBhcmFtLmZyb21fdHJhY2sgPSBvcHRpb25zLmZyb21fdHJhY2s7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9wdGlvbnMud2F5cG9pbnRzKSB7XHJcbiAgICAgICAgcmVxdWVzdFBhcmFtLndheXBvaW50cyA9IG9wdGlvbnMud2F5cG9pbnRzO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvcHRpb25zLnBvbGljeSkge1xyXG4gICAgICAgIHJlcXVlc3RQYXJhbS5wb2xpY3kgPSBvcHRpb25zLnBvbGljeTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob3B0aW9ucy5wbGF0ZV9udW1iZXIpIHtcclxuICAgICAgICByZXF1ZXN0UGFyYW0ucGxhdGVfbnVtYmVyID0gb3B0aW9ucy5wbGF0ZV9udW1iZXI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAob3B0aW9ucy5tb2RlID09IE1PREUudHJhbnNpdCkge1xyXG4gICAgICBpZiAob3B0aW9ucy5kZXBhcnR1cmVfdGltZSkge1xyXG4gICAgICAgIHJlcXVlc3RQYXJhbS5kZXBhcnR1cmVfdGltZSA9IG9wdGlvbnMuZGVwYXJ0dXJlX3RpbWU7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9wdGlvbnMucG9saWN5KSB7XHJcbiAgICAgICAgcmVxdWVzdFBhcmFtLnBvbGljeSA9IG9wdGlvbnMucG9saWN5O1xyXG4gICAgICB9XHJcbiAgICB9IFxyXG5cclxuICAgIHZhciBsb2NhdGlvbnN1Y2Nlc3MgPSBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgIHJlcXVlc3RQYXJhbS5mcm9tID0gcmVzdWx0LmxhdGl0dWRlICsgJywnICsgcmVzdWx0LmxvbmdpdHVkZTtcclxuICAgICAgaWYgKG9wdGlvbnMuc2lnKSB7XHJcbiAgICAgICAgcmVxdWVzdFBhcmFtLnNpZyA9IFV0aWxzLmdldFNpZyhyZXF1ZXN0UGFyYW0sIG9wdGlvbnMuc2lnLCAnZGlyZWN0aW9uJyxvcHRpb25zLm1vZGUpO1xyXG4gICAgICB9XHJcbiAgICAgIHd4LnJlcXVlc3QoVXRpbHMuYnVpbGRXeFJlcXVlc3RDb25maWcob3B0aW9ucywge1xyXG4gICAgICAgIHVybDogU0VUX1VSTF9ESVJFQ1RJT04sXHJcbiAgICAgICAgZGF0YTogcmVxdWVzdFBhcmFtXHJcbiAgICAgIH0sICdkaXJlY3Rpb24nKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIFV0aWxzLmxvY2F0aW9uUHJvY2VzcyhvcHRpb25zLCBsb2NhdGlvbnN1Y2Nlc3MpO1xyXG4gIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gUVFNYXBXWDsiXX0=