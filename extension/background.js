/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

const ytdl = window.require('ytdl-core-browser')({ proxyUrl: '' });
chrome.runtime.onMessageExternal.addListener((message, _, sendResponse) => {
    if (message && message.type === 'YOUTUBE_AUDIO_FETCH') {
        ytdl.getInfo(message.payload).then((info) => {
            let format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
            console.log('Format found!', format);
            sendResponse(format);
        })
            .catch((error) => {
            console.log(error);
            sendResponse(null);
        });
        return true;
    }
});
const prefs = {
    'overwrite-origin': true,
    'methods': ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'],
    'remove-x-frame': true,
    'allow-credentials': true,
    'allow-headers-value': '*',
    'expose-headers-value': '*',
    'allow-headers': true
};
function interceptRequest(initiator) {
    if (initiator &&
        (initiator.startsWith('http://localhost:3000')
            || initiator.startsWith('https://next.kaiserapps.com'))) {
        return true;
    }
}
const requestOriginMap = {};
const onHeadersReceived = (request) => {
    const responseHeaders = request.responseHeaders;
    if (!interceptRequest(request.initiator)) {
        return { responseHeaders };
    }
    if (request.statusCode === 302) {
        const o = responseHeaders.find(({ name }) => name.toLowerCase() === 'location');
        if (o) {
            requestOriginMap[o.value] = 'null';
        }
    }
    if (prefs['overwrite-origin'] === true) {
        const o = responseHeaders.find(({ name }) => name.toLowerCase() === 'access-control-allow-origin');
        if (o) {
            o.value = request.initiator;
        }
        else {
            responseHeaders.push({
                'name': 'Access-Control-Allow-Origin',
                'value': requestOriginMap[request.url] || request.initiator
            });
            if (requestOriginMap[request.url]) {
                delete requestOriginMap[request.url];
            }
        }
    }
    if (prefs.methods.length > 3) { // GET, POST, HEAD are mandatory
        const o = responseHeaders.find(({ name }) => name.toLowerCase() === 'access-control-allow-methods');
        if (o) {
            o.value = prefs.methods.join(', ');
        }
        else {
            responseHeaders.push({
                'name': 'Access-Control-Allow-Methods',
                'value': prefs.methods.join(', ')
            });
        }
    }
    if (prefs['allow-credentials'] === true) {
        const o = responseHeaders.find(({ name }) => name.toLowerCase() === 'access-control-allow-credentials');
        if (o) {
            o.value = 'true';
        }
        else {
            responseHeaders.push({
                'name': 'Access-Control-Allow-Credentials',
                'value': 'true'
            });
        }
    }
    if (prefs['allow-headers'] === true) {
        const o = responseHeaders.find(({ name }) => name.toLowerCase() === 'access-control-allow-headers');
        if (o) {
            o.value = prefs['allow-headers-value'];
        }
        else {
            responseHeaders.push({
                'name': 'Access-Control-Allow-Headers',
                'value': prefs['allow-headers-value']
            });
        }
    }
    if (prefs['allow-headers'] === true) {
        const o = responseHeaders.find(({ name }) => name.toLowerCase() === 'access-control-expose-headers');
        if (o) {
            o.value = prefs['expose-headers-value'];
        }
        else {
            responseHeaders.push({
                'name': 'Access-Control-Expose-Headers',
                'value': prefs['expose-headers-value']
            });
        }
    }
    if (prefs['remove-x-frame'] === true) {
        const i = responseHeaders.findIndex(({ name }) => name.toLowerCase() === 'x-frame-options');
        if (i !== -1) {
            responseHeaders.splice(i, 1);
        }
    }
    return { responseHeaders };
};
const remove = () => {
    chrome.webRequest.onHeadersReceived.removeListener(onHeadersReceived);
};
const install = () => {
    remove();
    const headersRecievedOptions = ['blocking', 'responseHeaders', 'extraHeaders'];
    chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, {
        urls: ['<all_urls>']
    }, headersRecievedOptions);
};
install();

/******/ })()
;