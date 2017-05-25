'use strict';

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// WebSocket依赖，node环境使用模块ws
if (typeof window !== 'undefined') {
  if (window.WebSocket) {
    module.exports = window.WebSocket;
  } else {
    console.warn('当前浏览器不支持WebSocket');
  }
} else if (typeof WebSocket !== 'undefined') {
  // eslint-disable-next-line no-undef
  module.exports = WebSocket;
} else {
  module.exports = _ws2.default;
}