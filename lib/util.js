'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.serialize = serialize;
exports.param = param;
function serialize(params, obj, traditional, scope) {
  var array = obj instanceof Array;
  Object.keys(obj).forEach(function (key) {
    var value = obj[key];

    // eslint-disable-next-line no-param-reassign
    if (scope) key = traditional ? scope : 'scope[' + (array ? '' : key) + ']'; // scope + '[' + (array ? '' : key) + ']'
    // handle data in serializeArray() format
    if (!scope && array) params.add(value.name, value.value);
    // recurse into nested objects
    else if (traditional ? value instanceof Array : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') serialize(params, value, traditional, key);else params.add(key, value);
  });
}

function param(obj, traditional) {
  var params = [];
  params.add = function add(k, v) {
    this.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
  };
  serialize(params, obj, traditional);
  return params.join('&').replace('%20', '+');
}