'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//https://github.com/stackOverMind/WeApp-adapter/blob/master/src/XmlHttpRequst.js
var EventTarget = require('event-target');
var URL = require('url');

var XMLHttpRequestResponseTypes = ["", "arraybuffer", "blob", "document", "json", "text"];

var XmlHttpRequest = function () {
    function XmlHttpRequest() {
        _classCallCheck(this, XmlHttpRequest);

        this.onloadstart = null;
        this.onprogress = null;
        this.onabort = null;
        this.onerror = null;
        this.onload = null;
        this.ontimeout = null;
        this.onloadend = null;
        this.onreadystatechange = null;
        this._readystate = 0;
    }

    _createClass(XmlHttpRequest, [{
        key: 'open',
        value: function open() {}
    }, {
        key: 'send',
        value: function send() {}
    }, {
        key: 'abort',
        value: function abort() {}
    }, {
        key: 'getResponseHeader',
        value: function getResponseHeader() {}
    }, {
        key: 'getAllResponseHeaders',
        value: function getAllResponseHeaders() {}
    }, {
        key: 'overrideMimeType',
        value: function overrideMimeType() {}
    }, {
        key: 'readystate',
        get: function get() {
            return this._readystate;
        }
    }, {
        key: 'status',
        get: function get() {}
    }, {
        key: 'statusText',
        get: function get() {}
    }, {
        key: 'response',
        get: function get() {}
    }, {
        key: 'responseText',
        get: function get() {}
    }, {
        key: 'responseXML',
        get: function get() {}
    }]);

    return XmlHttpRequest;
}();

XmlHttpRequest.UNSENT = 0;
XmlHttpRequest.OPENED = 1;
XmlHttpRequest.HEADERS_RECEIVED = 2;
XmlHttpRequest.LOADING = 3;
XmlHttpRequest.DONE = 4;

module.exports = XmlHttpRequest;