// 小程序环境中存在全局对象wx
let ws = {}
if (typeof wx !== 'undefined'){
  ws = require('./wxadapter/WebSocket.js')
}else{
  ws = require('ws');
}


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
  module.exports = ws;
}
