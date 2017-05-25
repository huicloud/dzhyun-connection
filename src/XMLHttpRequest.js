import xhr2 from 'xhr2';

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
  module.exports = xhr2.XMLHttpRequest || xhr2;
}
