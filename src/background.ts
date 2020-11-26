// @ts-ignore
import ytdl from "react-native-ytdl";

chrome.runtime.onMessageExternal.addListener((message: any, _: any, sendResponse: (result: any) => void) => {
  if (message && message.type === 'YOUTUBE_AUDIO_FETCH') {
    ytdl.getInfo(message.payload).then((info: any) => {
      let format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
      console.log('Format found!', format);
      sendResponse(format);
    });
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

function interceptRequest(initiator: string) {
  if (initiator &&
    (initiator.startsWith('http://localhost:3000')
    || initiator.startsWith('https://next.kaiserapps.com'))) {
    return true;
  }
}

const onHeadersReceived = (request: any) => {
  const responseHeaders = request.responseHeaders;
  if (!interceptRequest(request.initiator)) {
    return { responseHeaders };
  }
  if (prefs['overwrite-origin'] === true) {
    const o = responseHeaders.find(({name}: any) => name.toLowerCase() === 'access-control-allow-origin');
    if (o) {
      o.value = '*';
    }
    else {
      responseHeaders.push({
        'name': 'Access-Control-Allow-Origin',
        'value': '*'
      });
    }
  }
  if (prefs.methods.length > 3) { // GET, POST, HEAD are mandatory
    const o = responseHeaders.find(({ name }: any) => name.toLowerCase() === 'access-control-allow-methods');
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
    const o = responseHeaders.find(({ name }: any) => name.toLowerCase() === 'access-control-allow-credentials');
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
    const o = responseHeaders.find(({ name }: any) => name.toLowerCase() === 'access-control-allow-headers');
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
    const o = responseHeaders.find(({ name }: any) => name.toLowerCase() === 'access-control-expose-headers');
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
    const i = responseHeaders.findIndex(({ name }: any) => name.toLowerCase() === 'x-frame-options');
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
  const extra = ['blocking', 'responseHeaders'];
  chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, {
    urls: ['<all_urls>']
  }, extra);
};

install();