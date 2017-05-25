'use strict';

var _xhr = require('xhr2');

var _xhr2 = _interopRequireDefault(_xhr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 判断环境，浏览器环境存在window对象
if (typeof window !== 'undefined') {

  // 不考虑IE6以下的ActiveX方式
  if (window.XMLHttpRequest) {
    module.exports = window.XMLHttpRequest;
  } else {
    console.warn('当前浏览器不支持XMLHttpRequest');
  }
} else if (typeof XMLHttpRequest !== 'undefined') {
  // eslint-disable-next-line no-undef
  module.exports = XMLHttpRequest;
} else {

  // nodejs中使用xhr2模块
  module.exports = _xhr2.default.XMLHttpRequest || _xhr2.default;
}