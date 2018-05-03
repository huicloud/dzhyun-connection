//https://github.com/stackOverMind/WeApp-adapter/blob/master/src/XmlHttpRequst.js
const EventTarget = require('event-target');
const URL = require('url');
 
const XMLHttpRequestResponseTypes = [
    "",
    "arraybuffer",
    "blob",
    "document",
    "json",
    "text"
]
class XmlHttpRequest {
    constructor() {
        this.onloadstart = null
        this.onprogress = null
        this.onabort = null
        this.onerror = null
        this.onload = null
        this.ontimeout = null
        this.onloadend = null        
        this.onreadystatechange = null
        this._readystate = 0
    }
    get readystate() {
        return this._readystate
    }
    get status() {

    }
    get statusText() {

    }
    get response() {

    }
    get responseText() {

    }
    get responseXML() {

    }
    open() {

    }
    send() {

    }
    abort() {

    }
    getResponseHeader() {

    }
    getAllResponseHeaders() {

    }
    overrideMimeType() {

    }

}
XmlHttpRequest.UNSENT = 0;
XmlHttpRequest.OPENED = 1;
XmlHttpRequest.HEADERS_RECEIVED = 2;
XmlHttpRequest.LOADING = 3;
XmlHttpRequest.DONE = 4;

module.exports = XmlHttpRequest
