'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config.dev.js');

var _config2 = _interopRequireDefault(_config);

var _config3 = require('./config.prod.js');

var _config4 = _interopRequireDefault(_config3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {};
var env = 'dev';
if (env === 'dev') {
  config = _config2.default;
} else if (env === 'prod') {
  config = _config4.default;
}
exports.default = config;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNvbmZpZyIsImVudiIsImRldkNvbmYiLCJwcm9Db25mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxTQUFTLEVBQWI7QUFDQSxJQUFJQyxXQUFKO0FBQ0EsSUFBSUEsUUFBUSxLQUFaLEVBQW1CO0FBQ2pCRCxXQUFTRSxnQkFBVDtBQUNELENBRkQsTUFFTyxJQUFJRCxRQUFRLE1BQVosRUFBb0I7QUFDekJELFdBQVNHLGdCQUFUO0FBQ0Q7a0JBQ2NILE0iLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGV2Q29uZiBmcm9tICcuL2NvbmZpZy5kZXYnXG5pbXBvcnQgcHJvQ29uZiBmcm9tICcuL2NvbmZpZy5wcm9kJ1xuXG5sZXQgY29uZmlnID0ge31cbmxldCBlbnYgPSBfX05PREVfRU5WX19cbmlmIChlbnYgPT09ICdkZXYnKSB7XG4gIGNvbmZpZyA9IGRldkNvbmZcbn0gZWxzZSBpZiAoZW52ID09PSAncHJvZCcpIHtcbiAgY29uZmlnID0gcHJvQ29uZlxufVxuZXhwb3J0IGRlZmF1bHQgY29uZmlnXG4iXX0=