'use strict';

var _BaseConnection = require('./BaseConnection');

var _BaseConnection2 = _interopRequireDefault(_BaseConnection);

require('./HttpConnection');

require('./WebSocketConnection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _BaseConnection2.default;