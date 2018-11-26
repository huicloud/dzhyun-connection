'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseConnection2 = require('./BaseConnection');

var _BaseConnection3 = _interopRequireDefault(_BaseConnection2);

var _WebSocket = require('./WebSocket');

var _WebSocket2 = _interopRequireDefault(_WebSocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebSocketConnection = function (_BaseConnection) {
  _inherits(WebSocketConnection, _BaseConnection);

  /**
   * @param address
   * @param {{deferred: boolean}} options
   *  deferred: false 创建连接时马上连接websocket，默认
   *            true  延时在第一次请求时连接websocket
   * @param handler
   * @param secure
   */
  function WebSocketConnection(address, options, handler, secure) {
    _classCallCheck(this, WebSocketConnection);

    var _this = _possibleConstructorReturn(this, (WebSocketConnection.__proto__ || Object.getPrototypeOf(WebSocketConnection)).call(this, address, options, handler, secure));

    _this._protocol = 'ws';
    _this._ws = null;

    var deferred = options && options.deferred === true || false;

    if (deferred === false) {
      _this._connect();
    }
    // 在浏览器环境中，监听离线事件将手动中断ws连接
    if (typeof window !== 'undefined') {
      window.addEventListener('offline', function () {
        return _this.close();
      });
    }
    return _this;
  }

  _createClass(WebSocketConnection, [{
    key: 'getStatus',
    value: function getStatus() {
      return this._ws ? this._ws.readyState : _WebSocket2.default.CLOSED;
    }
  }, {
    key: '_connect',
    value: function _connect() {
      var _this2 = this;

      // 连接创建websocket
      if (typeof _WebSocket2.default !== 'undefined') {
        this._ws = new _WebSocket2.default(this.getAddress());

        // 避免WebSocket上没有状态静态值
        if (_WebSocket2.default.OPEN === undefined) {
          _WebSocket2.default.CONNECTING = this._ws.CONNECTING;
          _WebSocket2.default.OPEN = this._ws.OPEN;
          _WebSocket2.default.CLOSING = this._ws.CLOSING;
          _WebSocket2.default.CLOSED = this._ws.CLOSED;
        }
        this._ws.binaryType = this.options.binaryType || this.options.dataType || 'arraybuffer';

        this._ws.addEventListener('open', function () {
          _this2.trigger(_BaseConnection3.default.EVENT_OPEN);
        });
        this._ws.addEventListener('error', function (err) {
          _this2.trigger(_BaseConnection3.default.EVENT_ERROR, err);
        });
        this._ws.addEventListener('close', function () {
          _this2.trigger(_BaseConnection3.default.EVENT_CLOSE);
        });
        this._ws.addEventListener('message', function (message) {
          _this2.trigger(_BaseConnection3.default.EVENT_MESSAGE, message.data);
          _this2.trigger(_BaseConnection3.default.EVENT_RESPONSE, message.data);
        });
      } else {
        throw Error('Don\'t support WebSocket');
      }
    }
  }, {
    key: 'request',
    value: function request(message) {
      var _this3 = this;

      var msg = message || '';
      if (this.getStatus() === _WebSocket2.default.CLOSED) {
        this._connect();
      }

      if (this.getStatus() !== _WebSocket2.default.OPEN) {
        this._ws.addEventListener('open', function () {
          _this3._ws.send(msg);
          _this3.trigger(_BaseConnection3.default.EVENT_SEND, msg);
          _this3.trigger(_BaseConnection3.default.EVENT_REQUEST, msg);
        });
      } else {
        this._ws.send(msg);
        this.trigger(_BaseConnection3.default.EVENT_SEND, msg);
        this.trigger(_BaseConnection3.default.EVENT_REQUEST, msg);
      }
      return this;
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.getStatus() !== _WebSocket2.default.CLOSED) {
        this._ws.close();
        this._ws = null;
      }
      return this;
    }
  }]);

  return WebSocketConnection;
}(_BaseConnection3.default);

_BaseConnection3.default.ws = function ws(url, options, handler) {
  return new WebSocketConnection(url, options, handler, false);
};

_BaseConnection3.default.wss = function wss(url, options, handler) {
  return new WebSocketConnection(url, options, handler, true);
};

module.exports = _BaseConnection3.default;