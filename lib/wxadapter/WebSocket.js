'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  https://www.w3.org/TR/2011/WD-websockets-20110419/
 */
// https://github.com/stackOverMind/WeApp-adapter/blob/master/src/WebSocket.js
var EventTarget = require('event-target');
var URL = require('url');

var WebSocket = function () {
  function WebSocket(url) {
    var _this = this;

    _classCallCheck(this, WebSocket);

    if (url == null) {
      throw new TypeError('1 argument needed');
    }
    try {
      var parsed = URL.parse(url);
      if (parsed.protocol != 'wss:') {
        throw new Error('protocol must be wss');
      }
    } catch (e) {
      throw new SyntaxError('url in wrong format,protocol must be wss');
    }
    //根据微信小程序API介绍 websocket是单例的
    if (WebSocket.instance != null) {
      WebSocket.instance.close(); //安全的关闭
    }
    WebSocket.instance = this;
    this.url = url;
    this.readyState = 0;
    this.onopen = null;
    this.onclose = null;
    this.onerror = null;
    this.onmessage = null;
    wx.connectSocket({
      url: url //API介绍比较模糊
    });
    wx.onSocketOpen(function () {
      _this.readyState = WebSocket.OPEN;
      if (_this.onopen) {
        _this.onopen.call(_this);
      }
      _this.dispatchEvent({ 'type': 'open' });
    });
    wx.onSocketError(function (e) {
      var event = { 'type': 'error', 'data': e };
      if (_this.onerror) {
        _this.onerror.call(_this, event);
      }
      _this.dispatchEvent(event);
    });
    wx.onSocketMessage(function (data) {

      if (_this.readyState !== WebSocket.OPEN && _this.readyState !== WebSocket.CLOSING) {
        return;
      }
      /* webmessage https://www.w3.org/TR/2010/WD-webmessaging-20101118/  */
      var event = { 'type': 'message', 'data': data.data //TODO origin ...
      };if (_this.onmessage) {
        _this.onmessage.call(_this, event);
      }
      _this.dispatchEvent(event);
    });
    wx.onSocketClose(function () {
      _this.readyState = WebSocket.CLOSED;
      if (_this.onclose) {
        var event = { 'type': 'close', 'wasClean': true, code: 0, reason: '' };
        _this.onclose.call(_this, event);
      }
    });
  }

  _createClass(WebSocket, [{
    key: 'close',
    value: function close() {
      wx.closeSocket();
    }
  }, {
    key: 'send',
    value: function send(data) {
      wx.sendSocketMessage({ data: data });
    }
  }]);

  return WebSocket;
}();

WebSocket.prototype.addEventListener = EventTarget.default.prototype.addEventListener;
WebSocket.prototype.removeEventListener = EventTarget.default.prototype.removeEventListener;
WebSocket.prototype.dispatchEvent = EventTarget.default.prototype.dispatchEvent;

WebSocket.CONNECTING = 0;
WebSocket.OPEN = 1;
WebSocket.CLOSING = 2;
WebSocket.CLOSED = 3;
WebSocket.instance = null;
module.exports = WebSocket;