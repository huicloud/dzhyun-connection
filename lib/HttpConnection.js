'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseConnection2 = require('./BaseConnection');

var _BaseConnection3 = _interopRequireDefault(_BaseConnection2);

var _ajax = require('./ajax');

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HttpConnection = function (_BaseConnection) {
  _inherits(HttpConnection, _BaseConnection);

  function HttpConnection() {
    var _ref;

    _classCallCheck(this, HttpConnection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // 用于记录当前未关闭的请求
    var _this = _possibleConstructorReturn(this, (_ref = HttpConnection.__proto__ || Object.getPrototypeOf(HttpConnection)).call.apply(_ref, [this].concat(args)));

    _this._request = [];
    return _this;
  }

  _createClass(HttpConnection, [{
    key: 'request',
    value: function request(message, options) {
      var _this2 = this;

      var ajaxOptions = Object.assign({}, this.options, options);
      var xhr = void 0;

      ajaxOptions.success = function (data) {
        _this2.trigger(_BaseConnection3.default.EVENT_MESSAGE, data);
        _this2.trigger(_BaseConnection3.default.EVENT_RESPONSE, data);
      };

      ajaxOptions.error = function (jqXHR, textStatus, errorThrown) {
        _this2.trigger(_BaseConnection3.default.EVENT_ERROR, errorThrown);
      };

      ajaxOptions.complete = function () {
        var index = _this2._request.indexOf(xhr);
        _this2._request.splice(index, 1);
      };

      ajaxOptions.url = this.getAddress() + (message || '');

      xhr = (0, _ajax2.default)(ajaxOptions);

      if (xhr) {
        xhr.onreadystatechange = function (origFun) {
          return function () {
            if (xhr.readyState === 2) {

              // 发出了请求
              _this2.trigger(_BaseConnection3.default.EVENT_SEND, message);
              _this2.trigger(_BaseConnection3.default.EVENT_REQUEST, message);
            }
            if (origFun) origFun.call(xhr);
          };
        }(xhr.onreadystatechange);
      }

      // 打开了连接
      this.trigger(_BaseConnection3.default.EVENT_OPEN);

      this._request.push(xhr);

      xhr.onprogress = function (event) {
        _this2.trigger(_BaseConnection3.default.EVENT_PROGRESS, event);
      };

      return this;
    }
  }, {
    key: 'close',
    value: function close() {
      var _this3 = this;

      // 取消全部未结束的请求
      this._request.forEach(function (xhr, index) {
        xhr.abort();
        _this3._request.splice(index, 1);
      });

      this.trigger(_BaseConnection3.default.EVENT_CLOSE);
      return this;
    }
  }]);

  return HttpConnection;
}(_BaseConnection3.default);

_BaseConnection3.default.http = function http(url, options, handler) {
  return new HttpConnection(url, options, handler, false);
};

_BaseConnection3.default.https = function https(url, options, handler) {
  return new HttpConnection(url, options, handler, true);
};

module.exports = _BaseConnection3.default;