/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 587:
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};


/***/ }),

/***/ 361:
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).filter(Boolean).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};


/***/ }),

/***/ 673:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.decode = exports.parse = __webpack_require__(587);
exports.encode = exports.stringify = __webpack_require__(361);


/***/ }),

/***/ 866:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ react_native_ytdl
});

;// CONCATENATED MODULE: ./node_modules/react-native-ytdl/lib/index.js
const getInfo = __webpack_require__(731);
const utils = __webpack_require__(228);
const formatUtils = __webpack_require__(900);
const urlUtils = __webpack_require__(319);
const sig = __webpack_require__(146);
const { parseTimestamp } = __webpack_require__(495);

/**
 * @param {string} link
 * @param {!Object} options
 * @returns {Promise<Array.<Object>>}
 */
const ytdl = (link, options) => {
  return ytdl.getInfo(link, options).then(info => {
    return getURLsFromInfoCallback(info, options);
  });
};

ytdl.getBasicInfo = getInfo.getBasicInfo;
ytdl.getInfo = getInfo.getInfo;
ytdl.chooseFormat = formatUtils.chooseFormat;
ytdl.filterFormats = formatUtils.filterFormats;
ytdl.validateID = urlUtils.validateID;
ytdl.validateURL = urlUtils.validateURL;
ytdl.getURLVideoID = urlUtils.getURLVideoID;
ytdl.getVideoID = urlUtils.getVideoID;
ytdl.cache = {
  sig: sig.cache,
  info: getInfo.cache,
  cookie: getInfo.cookieCache,
};


/**
 * Gets downloadable URLs
 *
 * @param {Object} info
 * @param {Object} options
 * @returns {Promise<Array.<Object>>}
 */
const getURLsFromInfoCallback = (info, options) => new Promise(async (resolve, reject) => {
  options = options || {};

  let err = utils.playError(info.player_response, ['UNPLAYABLE', 'LIVE_STREAM_OFFLINE', 'LOGIN_REQUIRED']);
  if (err) {
    reject(err);
    return;
  }

  if (!info.formats.length) {
    reject(Error('This video is unavailable'));
    return;
  }

  let format;
  try {
    format = formatUtils.chooseFormat(info.formats, options);
  } catch (e) {
    reject(e);
    return;
  }

  const ret = [];
  if (!format.isHLS && !format.isDashMPD) {

    if (options.begin) {
      format.url += `&begin=${parseTimestamp(options.begin)}`;
    }

    const currentStream = {
      url: format.url,
      headers: []
    }
    if (options.range && (options.range.start || options.range.end)) {
      currentStream.headers.push({
        'Range': `bytes=${options.range.start || '0'}-${options.range.end || ''}`
      })
    }

    ret.push(currentStream);

  } else {

    ret.push({
      url: format.url,
      headers: []
    })

  }

  resolve(ret)

});


/* harmony default export */ const lib = (ytdl);

;// CONCATENATED MODULE: ./node_modules/react-native-ytdl/index.js


/* harmony default export */ const react_native_ytdl = (lib);

/***/ }),

/***/ 495:
/***/ ((__unused_webpack_module, exports) => {

/** TAKEN FROM: https://github.com/fent/node-m3u8stream/blob/master/src/parse-time.ts
 *  TYPES HAVE BEEN STRIPPED
 * 
 * Converts human friendly time to milliseconds. Supports the format
 * 00:00:00.000 for hours, minutes, seconds, and milliseconds respectively.
 * And 0ms, 0s, 0m, 0h, and together 1m1s.
 * 
 * 
 * @param {string|number} time
 * @return {number}
 */
const humanStr = (time) => {
  const numberFormat = /^\d+$/;
  const timeFormat = /^(?:(?:(\d+):)?(\d{1,2}):)?(\d{1,2})(?:\.(\d{3}))?$/;
  const timeUnits = {
    ms: 1,
    s: 1000,
    m: 60000,
    h: 3600000,
  };

  if (typeof time === 'number') { return time; }
  if (numberFormat.test(time)) { return +time; }
  const firstFormat = timeFormat.exec(time);
  if (firstFormat) {
    return +(firstFormat[1] || 0) * timeUnits.h +
      +(firstFormat[2] || 0) * timeUnits.m +
      +firstFormat[3] * timeUnits.s +
      +(firstFormat[4] || 0);
  } else {
    let total = 0;
    const r = /(-?\d+)(ms|s|m|h)/g;
    let rs;
    while ((rs = r.exec(time)) != null) {
      total += +rs[1] * timeUnits[rs[2]];
    }
    return total;
  }
};

exports.parseTimestamp = humanStr;

/***/ }),

/***/ 83:
/***/ ((module) => {

/**
 * A minimal working polyfill of miniget that doesn't use node's streaming api
 */

const retryStatusCodes = new Set([429, 503]);

const miniget = (url, reqOptions = {}) => {

    const fetchOptions = { ...reqOptions };
    fetchOptions.headers = {
        "Content-Type": 'text/plain;charset=UTF-8',
        ...fetchOptions.headers,
    }

    const fetchPromiseText = fetch(url, fetchOptions)
        .then(res => {
            if(retryStatusCodes.has(res.status)){
                throw Error(`Error: Status code: ${res.status}`)
            }

            return res;
        })
        .then(res => res.text())

    return {
        on: (event, callback) => {
            switch (event) {
                case 'data': fetchPromiseText.then(callback); break;
                case 'error': fetchPromiseText.catch(callback); break;
                case 'end': fetchPromiseText.finally(callback); break;

                default:
                    console.warn(`react-native-ytdl: miniget: unknown event listener received: ${event}`)
            }
        },
        setEncoding: () => {
            console.warn(`react-native-ytdl: miniget: will not use specified encoding since request has already been made. Currently using utf8 encoding.`)
        },
        text: () => {
            return fetchPromiseText
        }
    };
}

miniget.MinigetError = class MinigetError extends Error {
    constructor(message) {
        super(message);
    }
}

miniget.defaultOptions = {
    maxRedirects: 10,
    maxRetries: 5,
    maxReconnects: 0,
    backoff: { inc: 100, max: 10000 },
}

module.exports = miniget


/***/ }),

/***/ 152:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(37)

/***/ }),

/***/ 37:
/***/ ((__unused_webpack_module, exports) => {

;(function (sax) { // wrapper for non-node envs
  sax.parser = function (strict, opt) { return new SAXParser(strict, opt) }
  sax.SAXParser = SAXParser
  sax.SAXStream = SAXStream
  sax.createStream = createStream

  // When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
  // When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
  // since that's the earliest that a buffer overrun could occur.  This way, checks are
  // as rare as required, but as often as necessary to ensure never crossing this bound.
  // Furthermore, buffers are only tested at most once per write(), so passing a very
  // large string into write() might have undesirable effects, but this is manageable by
  // the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
  // edge case, result in creating at most one complete copy of the string passed in.
  // Set to Infinity to have unlimited buffers.
  sax.MAX_BUFFER_LENGTH = 64 * 1024

  var buffers = [
    'comment', 'sgmlDecl', 'textNode', 'tagName', 'doctype',
    'procInstName', 'procInstBody', 'entity', 'attribName',
    'attribValue', 'cdata', 'script'
  ]

  sax.EVENTS = [
    'text',
    'processinginstruction',
    'sgmldeclaration',
    'doctype',
    'comment',
    'opentagstart',
    'attribute',
    'opentag',
    'closetag',
    'opencdata',
    'cdata',
    'closecdata',
    'error',
    'end',
    'ready',
    'script',
    'opennamespace',
    'closenamespace'
  ]

  function SAXParser (strict, opt) {
    if (!(this instanceof SAXParser)) {
      return new SAXParser(strict, opt)
    }

    var parser = this
    clearBuffers(parser)
    parser.q = parser.c = ''
    parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH
    parser.opt = opt || {}
    parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags
    parser.looseCase = parser.opt.lowercase ? 'toLowerCase' : 'toUpperCase'
    parser.tags = []
    parser.closed = parser.closedRoot = parser.sawRoot = false
    parser.tag = parser.error = null
    parser.strict = !!strict
    parser.noscript = !!(strict || parser.opt.noscript)
    parser.state = S.BEGIN
    parser.strictEntities = parser.opt.strictEntities
    parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES)
    parser.attribList = []

    // namespaces form a prototype chain.
    // it always points at the current tag,
    // which protos to its parent tag.
    if (parser.opt.xmlns) {
      parser.ns = Object.create(rootNS)
    }

    // mostly just for error reporting
    parser.trackPosition = parser.opt.position !== false
    if (parser.trackPosition) {
      parser.position = parser.line = parser.column = 0
    }
    emit(parser, 'onready')
  }

  if (!Object.create) {
    Object.create = function (o) {
      function F () {}
      F.prototype = o
      var newf = new F()
      return newf
    }
  }

  if (!Object.keys) {
    Object.keys = function (o) {
      var a = []
      for (var i in o) if (o.hasOwnProperty(i)) a.push(i)
      return a
    }
  }

  function checkBufferLength (parser) {
    var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10)
    var maxActual = 0
    for (var i = 0, l = buffers.length; i < l; i++) {
      var len = parser[buffers[i]].length
      if (len > maxAllowed) {
        // Text/cdata nodes can get big, and since they're buffered,
        // we can get here under normal conditions.
        // Avoid issues by emitting the text node now,
        // so at least it won't get any bigger.
        switch (buffers[i]) {
          case 'textNode':
            closeText(parser)
            break

          case 'cdata':
            emitNode(parser, 'oncdata', parser.cdata)
            parser.cdata = ''
            break

          case 'script':
            emitNode(parser, 'onscript', parser.script)
            parser.script = ''
            break

          default:
            error(parser, 'Max buffer length exceeded: ' + buffers[i])
        }
      }
      maxActual = Math.max(maxActual, len)
    }
    // schedule the next check for the earliest possible buffer overrun.
    var m = sax.MAX_BUFFER_LENGTH - maxActual
    parser.bufferCheckPosition = m + parser.position
  }

  function clearBuffers (parser) {
    for (var i = 0, l = buffers.length; i < l; i++) {
      parser[buffers[i]] = ''
    }
  }

  function flushBuffers (parser) {
    closeText(parser)
    if (parser.cdata !== '') {
      emitNode(parser, 'oncdata', parser.cdata)
      parser.cdata = ''
    }
    if (parser.script !== '') {
      emitNode(parser, 'onscript', parser.script)
      parser.script = ''
    }
  }

  SAXParser.prototype = {
    end: function () { end(this) },
    write: write,
    resume: function () { this.error = null; return this },
    close: function () { return this.write(null) },
    flush: function () { flushBuffers(this) }
  }

  var Stream = function () {}


  var streamWraps = sax.EVENTS.filter(function (ev) {
    return ev !== 'error' && ev !== 'end'
  })

  function createStream (strict, opt) {
    return new SAXStream(strict, opt)
  }

  function SAXStream (strict, opt) {
    if (!(this instanceof SAXStream)) {
      return new SAXStream(strict, opt)
    }

    Stream.apply(this)

    this._parser = new SAXParser(strict, opt)
    this.writable = true
    this.readable = true

    var me = this

    this._parser.onend = function () {
      me.emit('end')
    }

    this._parser.onerror = function (er) {
      me.emit('error', er)

      // if didn't throw, then means error was handled.
      // go ahead and clear error, so we can write again.
      me._parser.error = null
    }

    this._decoder = null

    streamWraps.forEach(function (ev) {
      Object.defineProperty(me, 'on' + ev, {
        get: function () {
          return me._parser['on' + ev]
        },
        set: function (h) {
          if (!h) {
            me.removeAllListeners(ev)
            me._parser['on' + ev] = h
            return h
          }
          me.on(ev, h)
        },
        enumerable: true,
        configurable: false
      })
    })
  }

  SAXStream.prototype = Object.create(Stream.prototype, {
    constructor: {
      value: SAXStream
    }
  })

  SAXStream.prototype.write = function (data) {
    if (typeof Buffer === 'function' &&
      typeof Buffer.isBuffer === 'function' &&
      Buffer.isBuffer(data)) {
      if (!this._decoder) {
        var SD = null
        this._decoder = new SD('utf8')
      }
      data = this._decoder.write(data)
    }

    this._parser.write(data.toString())
    this.emit('data', data)
    return true
  }

  SAXStream.prototype.end = function (chunk) {
    if (chunk && chunk.length) {
      this.write(chunk)
    }
    this._parser.end()
    return true
  }

  SAXStream.prototype.on = function (ev, handler) {
    var me = this
    if (!me._parser['on' + ev] && streamWraps.indexOf(ev) !== -1) {
      me._parser['on' + ev] = function () {
        var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
        args.splice(0, 0, ev)
        me.emit.apply(me, args)
      }
    }

    return Stream.prototype.on.call(me, ev, handler)
  }

  // this really needs to be replaced with character classes.
  // XML allows all manner of ridiculous numbers and digits.
  var CDATA = '[CDATA['
  var DOCTYPE = 'DOCTYPE'
  var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace'
  var XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/'
  var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE }

  // http://www.w3.org/TR/REC-xml/#NT-NameStartChar
  // This implementation works on strings, a single character at a time
  // as such, it cannot ever support astral-plane characters (10000-EFFFF)
  // without a significant breaking change to either this  parser, or the
  // JavaScript language.  Implementation of an emoji-capable xml parser
  // is left as an exercise for the reader.
  var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/

  var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/

  var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/
  var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/

  function isWhitespace (c) {
    return c === ' ' || c === '\n' || c === '\r' || c === '\t'
  }

  function isQuote (c) {
    return c === '"' || c === '\''
  }

  function isAttribEnd (c) {
    return c === '>' || isWhitespace(c)
  }

  function isMatch (regex, c) {
    return regex.test(c)
  }

  function notMatch (regex, c) {
    return !isMatch(regex, c)
  }

  var S = 0
  sax.STATE = {
    BEGIN: S++, // leading byte order mark or whitespace
    BEGIN_WHITESPACE: S++, // leading whitespace
    TEXT: S++, // general stuff
    TEXT_ENTITY: S++, // &amp and such.
    OPEN_WAKA: S++, // <
    SGML_DECL: S++, // <!BLARG
    SGML_DECL_QUOTED: S++, // <!BLARG foo "bar
    DOCTYPE: S++, // <!DOCTYPE
    DOCTYPE_QUOTED: S++, // <!DOCTYPE "//blah
    DOCTYPE_DTD: S++, // <!DOCTYPE "//blah" [ ...
    DOCTYPE_DTD_QUOTED: S++, // <!DOCTYPE "//blah" [ "foo
    COMMENT_STARTING: S++, // <!-
    COMMENT: S++, // <!--
    COMMENT_ENDING: S++, // <!-- blah -
    COMMENT_ENDED: S++, // <!-- blah --
    CDATA: S++, // <![CDATA[ something
    CDATA_ENDING: S++, // ]
    CDATA_ENDING_2: S++, // ]]
    PROC_INST: S++, // <?hi
    PROC_INST_BODY: S++, // <?hi there
    PROC_INST_ENDING: S++, // <?hi "there" ?
    OPEN_TAG: S++, // <strong
    OPEN_TAG_SLASH: S++, // <strong /
    ATTRIB: S++, // <a
    ATTRIB_NAME: S++, // <a foo
    ATTRIB_NAME_SAW_WHITE: S++, // <a foo _
    ATTRIB_VALUE: S++, // <a foo=
    ATTRIB_VALUE_QUOTED: S++, // <a foo="bar
    ATTRIB_VALUE_CLOSED: S++, // <a foo="bar"
    ATTRIB_VALUE_UNQUOTED: S++, // <a foo=bar
    ATTRIB_VALUE_ENTITY_Q: S++, // <foo bar="&quot;"
    ATTRIB_VALUE_ENTITY_U: S++, // <foo bar=&quot
    CLOSE_TAG: S++, // </a
    CLOSE_TAG_SAW_WHITE: S++, // </a   >
    SCRIPT: S++, // <script> ...
    SCRIPT_ENDING: S++ // <script> ... <
  }

  sax.XML_ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'"
  }

  sax.ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': "'",
    'AElig': 198,
    'Aacute': 193,
    'Acirc': 194,
    'Agrave': 192,
    'Aring': 197,
    'Atilde': 195,
    'Auml': 196,
    'Ccedil': 199,
    'ETH': 208,
    'Eacute': 201,
    'Ecirc': 202,
    'Egrave': 200,
    'Euml': 203,
    'Iacute': 205,
    'Icirc': 206,
    'Igrave': 204,
    'Iuml': 207,
    'Ntilde': 209,
    'Oacute': 211,
    'Ocirc': 212,
    'Ograve': 210,
    'Oslash': 216,
    'Otilde': 213,
    'Ouml': 214,
    'THORN': 222,
    'Uacute': 218,
    'Ucirc': 219,
    'Ugrave': 217,
    'Uuml': 220,
    'Yacute': 221,
    'aacute': 225,
    'acirc': 226,
    'aelig': 230,
    'agrave': 224,
    'aring': 229,
    'atilde': 227,
    'auml': 228,
    'ccedil': 231,
    'eacute': 233,
    'ecirc': 234,
    'egrave': 232,
    'eth': 240,
    'euml': 235,
    'iacute': 237,
    'icirc': 238,
    'igrave': 236,
    'iuml': 239,
    'ntilde': 241,
    'oacute': 243,
    'ocirc': 244,
    'ograve': 242,
    'oslash': 248,
    'otilde': 245,
    'ouml': 246,
    'szlig': 223,
    'thorn': 254,
    'uacute': 250,
    'ucirc': 251,
    'ugrave': 249,
    'uuml': 252,
    'yacute': 253,
    'yuml': 255,
    'copy': 169,
    'reg': 174,
    'nbsp': 160,
    'iexcl': 161,
    'cent': 162,
    'pound': 163,
    'curren': 164,
    'yen': 165,
    'brvbar': 166,
    'sect': 167,
    'uml': 168,
    'ordf': 170,
    'laquo': 171,
    'not': 172,
    'shy': 173,
    'macr': 175,
    'deg': 176,
    'plusmn': 177,
    'sup1': 185,
    'sup2': 178,
    'sup3': 179,
    'acute': 180,
    'micro': 181,
    'para': 182,
    'middot': 183,
    'cedil': 184,
    'ordm': 186,
    'raquo': 187,
    'frac14': 188,
    'frac12': 189,
    'frac34': 190,
    'iquest': 191,
    'times': 215,
    'divide': 247,
    'OElig': 338,
    'oelig': 339,
    'Scaron': 352,
    'scaron': 353,
    'Yuml': 376,
    'fnof': 402,
    'circ': 710,
    'tilde': 732,
    'Alpha': 913,
    'Beta': 914,
    'Gamma': 915,
    'Delta': 916,
    'Epsilon': 917,
    'Zeta': 918,
    'Eta': 919,
    'Theta': 920,
    'Iota': 921,
    'Kappa': 922,
    'Lambda': 923,
    'Mu': 924,
    'Nu': 925,
    'Xi': 926,
    'Omicron': 927,
    'Pi': 928,
    'Rho': 929,
    'Sigma': 931,
    'Tau': 932,
    'Upsilon': 933,
    'Phi': 934,
    'Chi': 935,
    'Psi': 936,
    'Omega': 937,
    'alpha': 945,
    'beta': 946,
    'gamma': 947,
    'delta': 948,
    'epsilon': 949,
    'zeta': 950,
    'eta': 951,
    'theta': 952,
    'iota': 953,
    'kappa': 954,
    'lambda': 955,
    'mu': 956,
    'nu': 957,
    'xi': 958,
    'omicron': 959,
    'pi': 960,
    'rho': 961,
    'sigmaf': 962,
    'sigma': 963,
    'tau': 964,
    'upsilon': 965,
    'phi': 966,
    'chi': 967,
    'psi': 968,
    'omega': 969,
    'thetasym': 977,
    'upsih': 978,
    'piv': 982,
    'ensp': 8194,
    'emsp': 8195,
    'thinsp': 8201,
    'zwnj': 8204,
    'zwj': 8205,
    'lrm': 8206,
    'rlm': 8207,
    'ndash': 8211,
    'mdash': 8212,
    'lsquo': 8216,
    'rsquo': 8217,
    'sbquo': 8218,
    'ldquo': 8220,
    'rdquo': 8221,
    'bdquo': 8222,
    'dagger': 8224,
    'Dagger': 8225,
    'bull': 8226,
    'hellip': 8230,
    'permil': 8240,
    'prime': 8242,
    'Prime': 8243,
    'lsaquo': 8249,
    'rsaquo': 8250,
    'oline': 8254,
    'frasl': 8260,
    'euro': 8364,
    'image': 8465,
    'weierp': 8472,
    'real': 8476,
    'trade': 8482,
    'alefsym': 8501,
    'larr': 8592,
    'uarr': 8593,
    'rarr': 8594,
    'darr': 8595,
    'harr': 8596,
    'crarr': 8629,
    'lArr': 8656,
    'uArr': 8657,
    'rArr': 8658,
    'dArr': 8659,
    'hArr': 8660,
    'forall': 8704,
    'part': 8706,
    'exist': 8707,
    'empty': 8709,
    'nabla': 8711,
    'isin': 8712,
    'notin': 8713,
    'ni': 8715,
    'prod': 8719,
    'sum': 8721,
    'minus': 8722,
    'lowast': 8727,
    'radic': 8730,
    'prop': 8733,
    'infin': 8734,
    'ang': 8736,
    'and': 8743,
    'or': 8744,
    'cap': 8745,
    'cup': 8746,
    'int': 8747,
    'there4': 8756,
    'sim': 8764,
    'cong': 8773,
    'asymp': 8776,
    'ne': 8800,
    'equiv': 8801,
    'le': 8804,
    'ge': 8805,
    'sub': 8834,
    'sup': 8835,
    'nsub': 8836,
    'sube': 8838,
    'supe': 8839,
    'oplus': 8853,
    'otimes': 8855,
    'perp': 8869,
    'sdot': 8901,
    'lceil': 8968,
    'rceil': 8969,
    'lfloor': 8970,
    'rfloor': 8971,
    'lang': 9001,
    'rang': 9002,
    'loz': 9674,
    'spades': 9824,
    'clubs': 9827,
    'hearts': 9829,
    'diams': 9830
  }

  Object.keys(sax.ENTITIES).forEach(function (key) {
    var e = sax.ENTITIES[key]
    var s = typeof e === 'number' ? String.fromCharCode(e) : e
    sax.ENTITIES[key] = s
  })

  for (var s in sax.STATE) {
    sax.STATE[sax.STATE[s]] = s
  }

  // shorthand
  S = sax.STATE

  function emit (parser, event, data) {
    parser[event] && parser[event](data)
  }

  function emitNode (parser, nodeType, data) {
    if (parser.textNode) closeText(parser)
    emit(parser, nodeType, data)
  }

  function closeText (parser) {
    parser.textNode = textopts(parser.opt, parser.textNode)
    if (parser.textNode) emit(parser, 'ontext', parser.textNode)
    parser.textNode = ''
  }

  function textopts (opt, text) {
    if (opt.trim) text = text.trim()
    if (opt.normalize) text = text.replace(/\s+/g, ' ')
    return text
  }

  function error (parser, er) {
    closeText(parser)
    if (parser.trackPosition) {
      er += '\nLine: ' + parser.line +
        '\nColumn: ' + parser.column +
        '\nChar: ' + parser.c
    }
    er = new Error(er)
    parser.error = er
    emit(parser, 'onerror', er)
    return parser
  }

  function end (parser) {
    if (parser.sawRoot && !parser.closedRoot) strictFail(parser, 'Unclosed root tag')
    if ((parser.state !== S.BEGIN) &&
      (parser.state !== S.BEGIN_WHITESPACE) &&
      (parser.state !== S.TEXT)) {
      error(parser, 'Unexpected end')
    }
    closeText(parser)
    parser.c = ''
    parser.closed = true
    emit(parser, 'onend')
    SAXParser.call(parser, parser.strict, parser.opt)
    return parser
  }

  function strictFail (parser, message) {
    if (typeof parser !== 'object' || !(parser instanceof SAXParser)) {
      throw new Error('bad call to strictFail')
    }
    if (parser.strict) {
      error(parser, message)
    }
  }

  function newTag (parser) {
    if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]()
    var parent = parser.tags[parser.tags.length - 1] || parser
    var tag = parser.tag = { name: parser.tagName, attributes: {} }

    // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
    if (parser.opt.xmlns) {
      tag.ns = parent.ns
    }
    parser.attribList.length = 0
    emitNode(parser, 'onopentagstart', tag)
  }

  function qname (name, attribute) {
    var i = name.indexOf(':')
    var qualName = i < 0 ? [ '', name ] : name.split(':')
    var prefix = qualName[0]
    var local = qualName[1]

    // <x "xmlns"="http://foo">
    if (attribute && name === 'xmlns') {
      prefix = 'xmlns'
      local = ''
    }

    return { prefix: prefix, local: local }
  }

  function attrib (parser) {
    if (!parser.strict) {
      parser.attribName = parser.attribName[parser.looseCase]()
    }

    if (parser.attribList.indexOf(parser.attribName) !== -1 ||
      parser.tag.attributes.hasOwnProperty(parser.attribName)) {
      parser.attribName = parser.attribValue = ''
      return
    }

    if (parser.opt.xmlns) {
      var qn = qname(parser.attribName, true)
      var prefix = qn.prefix
      var local = qn.local

      if (prefix === 'xmlns') {
        // namespace binding attribute. push the binding into scope
        if (local === 'xml' && parser.attribValue !== XML_NAMESPACE) {
          strictFail(parser,
            'xml: prefix must be bound to ' + XML_NAMESPACE + '\n' +
            'Actual: ' + parser.attribValue)
        } else if (local === 'xmlns' && parser.attribValue !== XMLNS_NAMESPACE) {
          strictFail(parser,
            'xmlns: prefix must be bound to ' + XMLNS_NAMESPACE + '\n' +
            'Actual: ' + parser.attribValue)
        } else {
          var tag = parser.tag
          var parent = parser.tags[parser.tags.length - 1] || parser
          if (tag.ns === parent.ns) {
            tag.ns = Object.create(parent.ns)
          }
          tag.ns[local] = parser.attribValue
        }
      }

      // defer onattribute events until all attributes have been seen
      // so any new bindings can take effect. preserve attribute order
      // so deferred events can be emitted in document order
      parser.attribList.push([parser.attribName, parser.attribValue])
    } else {
      // in non-xmlns mode, we can emit the event right away
      parser.tag.attributes[parser.attribName] = parser.attribValue
      emitNode(parser, 'onattribute', {
        name: parser.attribName,
        value: parser.attribValue
      })
    }

    parser.attribName = parser.attribValue = ''
  }

  function openTag (parser, selfClosing) {
    if (parser.opt.xmlns) {
      // emit namespace binding events
      var tag = parser.tag

      // add namespace info to tag
      var qn = qname(parser.tagName)
      tag.prefix = qn.prefix
      tag.local = qn.local
      tag.uri = tag.ns[qn.prefix] || ''

      if (tag.prefix && !tag.uri) {
        strictFail(parser, 'Unbound namespace prefix: ' +
          JSON.stringify(parser.tagName))
        tag.uri = qn.prefix
      }

      var parent = parser.tags[parser.tags.length - 1] || parser
      if (tag.ns && parent.ns !== tag.ns) {
        Object.keys(tag.ns).forEach(function (p) {
          emitNode(parser, 'onopennamespace', {
            prefix: p,
            uri: tag.ns[p]
          })
        })
      }

      // handle deferred onattribute events
      // Note: do not apply default ns to attributes:
      //   http://www.w3.org/TR/REC-xml-names/#defaulting
      for (var i = 0, l = parser.attribList.length; i < l; i++) {
        var nv = parser.attribList[i]
        var name = nv[0]
        var value = nv[1]
        var qualName = qname(name, true)
        var prefix = qualName.prefix
        var local = qualName.local
        var uri = prefix === '' ? '' : (tag.ns[prefix] || '')
        var a = {
          name: name,
          value: value,
          prefix: prefix,
          local: local,
          uri: uri
        }

        // if there's any attributes with an undefined namespace,
        // then fail on them now.
        if (prefix && prefix !== 'xmlns' && !uri) {
          strictFail(parser, 'Unbound namespace prefix: ' +
            JSON.stringify(prefix))
          a.uri = prefix
        }
        parser.tag.attributes[name] = a
        emitNode(parser, 'onattribute', a)
      }
      parser.attribList.length = 0
    }

    parser.tag.isSelfClosing = !!selfClosing

    // process the tag
    parser.sawRoot = true
    parser.tags.push(parser.tag)
    emitNode(parser, 'onopentag', parser.tag)
    if (!selfClosing) {
      // special case for <script> in non-strict mode.
      if (!parser.noscript && parser.tagName.toLowerCase() === 'script') {
        parser.state = S.SCRIPT
      } else {
        parser.state = S.TEXT
      }
      parser.tag = null
      parser.tagName = ''
    }
    parser.attribName = parser.attribValue = ''
    parser.attribList.length = 0
  }

  function closeTag (parser) {
    if (!parser.tagName) {
      strictFail(parser, 'Weird empty close tag.')
      parser.textNode += '</>'
      parser.state = S.TEXT
      return
    }

    if (parser.script) {
      if (parser.tagName !== 'script') {
        parser.script += '</' + parser.tagName + '>'
        parser.tagName = ''
        parser.state = S.SCRIPT
        return
      }
      emitNode(parser, 'onscript', parser.script)
      parser.script = ''
    }

    // first make sure that the closing tag actually exists.
    // <a><b></c></b></a> will close everything, otherwise.
    var t = parser.tags.length
    var tagName = parser.tagName
    if (!parser.strict) {
      tagName = tagName[parser.looseCase]()
    }
    var closeTo = tagName
    while (t--) {
      var close = parser.tags[t]
      if (close.name !== closeTo) {
        // fail the first time in strict mode
        strictFail(parser, 'Unexpected close tag')
      } else {
        break
      }
    }

    // didn't find it.  we already failed for strict, so just abort.
    if (t < 0) {
      strictFail(parser, 'Unmatched closing tag: ' + parser.tagName)
      parser.textNode += '</' + parser.tagName + '>'
      parser.state = S.TEXT
      return
    }
    parser.tagName = tagName
    var s = parser.tags.length
    while (s-- > t) {
      var tag = parser.tag = parser.tags.pop()
      parser.tagName = parser.tag.name
      emitNode(parser, 'onclosetag', parser.tagName)

      var x = {}
      for (var i in tag.ns) {
        x[i] = tag.ns[i]
      }

      var parent = parser.tags[parser.tags.length - 1] || parser
      if (parser.opt.xmlns && tag.ns !== parent.ns) {
        // remove namespace bindings introduced by tag
        Object.keys(tag.ns).forEach(function (p) {
          var n = tag.ns[p]
          emitNode(parser, 'onclosenamespace', { prefix: p, uri: n })
        })
      }
    }
    if (t === 0) parser.closedRoot = true
    parser.tagName = parser.attribValue = parser.attribName = ''
    parser.attribList.length = 0
    parser.state = S.TEXT
  }

  function parseEntity (parser) {
    var entity = parser.entity
    var entityLC = entity.toLowerCase()
    var num
    var numStr = ''

    if (parser.ENTITIES[entity]) {
      return parser.ENTITIES[entity]
    }
    if (parser.ENTITIES[entityLC]) {
      return parser.ENTITIES[entityLC]
    }
    entity = entityLC
    if (entity.charAt(0) === '#') {
      if (entity.charAt(1) === 'x') {
        entity = entity.slice(2)
        num = parseInt(entity, 16)
        numStr = num.toString(16)
      } else {
        entity = entity.slice(1)
        num = parseInt(entity, 10)
        numStr = num.toString(10)
      }
    }
    entity = entity.replace(/^0+/, '')
    if (isNaN(num) || numStr.toLowerCase() !== entity) {
      strictFail(parser, 'Invalid character entity')
      return '&' + parser.entity + ';'
    }

    return String.fromCodePoint(num)
  }

  function beginWhiteSpace (parser, c) {
    if (c === '<') {
      parser.state = S.OPEN_WAKA
      parser.startTagPosition = parser.position
    } else if (!isWhitespace(c)) {
      // have to process this as a text node.
      // weird, but happens.
      strictFail(parser, 'Non-whitespace before first tag.')
      parser.textNode = c
      parser.state = S.TEXT
    }
  }

  function charAt (chunk, i) {
    var result = ''
    if (i < chunk.length) {
      result = chunk.charAt(i)
    }
    return result
  }

  function write (chunk) {
    var parser = this
    if (this.error) {
      throw this.error
    }
    if (parser.closed) {
      return error(parser,
        'Cannot write after close. Assign an onready handler.')
    }
    if (chunk === null) {
      return end(parser)
    }
    if (typeof chunk === 'object') {
      chunk = chunk.toString()
    }
    var i = 0
    var c = ''
    while (true) {
      c = charAt(chunk, i++)
      parser.c = c

      if (!c) {
        break
      }

      if (parser.trackPosition) {
        parser.position++
        if (c === '\n') {
          parser.line++
          parser.column = 0
        } else {
          parser.column++
        }
      }

      switch (parser.state) {
        case S.BEGIN:
          parser.state = S.BEGIN_WHITESPACE
          if (c === '\uFEFF') {
            continue
          }
          beginWhiteSpace(parser, c)
          continue

        case S.BEGIN_WHITESPACE:
          beginWhiteSpace(parser, c)
          continue

        case S.TEXT:
          if (parser.sawRoot && !parser.closedRoot) {
            var starti = i - 1
            while (c && c !== '<' && c !== '&') {
              c = charAt(chunk, i++)
              if (c && parser.trackPosition) {
                parser.position++
                if (c === '\n') {
                  parser.line++
                  parser.column = 0
                } else {
                  parser.column++
                }
              }
            }
            parser.textNode += chunk.substring(starti, i - 1)
          }
          if (c === '<' && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
            parser.state = S.OPEN_WAKA
            parser.startTagPosition = parser.position
          } else {
            if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
              strictFail(parser, 'Text data outside of root node.')
            }
            if (c === '&') {
              parser.state = S.TEXT_ENTITY
            } else {
              parser.textNode += c
            }
          }
          continue

        case S.SCRIPT:
          // only non-strict
          if (c === '<') {
            parser.state = S.SCRIPT_ENDING
          } else {
            parser.script += c
          }
          continue

        case S.SCRIPT_ENDING:
          if (c === '/') {
            parser.state = S.CLOSE_TAG
          } else {
            parser.script += '<' + c
            parser.state = S.SCRIPT
          }
          continue

        case S.OPEN_WAKA:
          // either a /, ?, !, or text is coming next.
          if (c === '!') {
            parser.state = S.SGML_DECL
            parser.sgmlDecl = ''
          } else if (isWhitespace(c)) {
            // wait for it...
          } else if (isMatch(nameStart, c)) {
            parser.state = S.OPEN_TAG
            parser.tagName = c
          } else if (c === '/') {
            parser.state = S.CLOSE_TAG
            parser.tagName = ''
          } else if (c === '?') {
            parser.state = S.PROC_INST
            parser.procInstName = parser.procInstBody = ''
          } else {
            strictFail(parser, 'Unencoded <')
            // if there was some whitespace, then add that in.
            if (parser.startTagPosition + 1 < parser.position) {
              var pad = parser.position - parser.startTagPosition
              c = new Array(pad).join(' ') + c
            }
            parser.textNode += '<' + c
            parser.state = S.TEXT
          }
          continue

        case S.SGML_DECL:
          if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
            emitNode(parser, 'onopencdata')
            parser.state = S.CDATA
            parser.sgmlDecl = ''
            parser.cdata = ''
          } else if (parser.sgmlDecl + c === '--') {
            parser.state = S.COMMENT
            parser.comment = ''
            parser.sgmlDecl = ''
          } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
            parser.state = S.DOCTYPE
            if (parser.doctype || parser.sawRoot) {
              strictFail(parser,
                'Inappropriately located doctype declaration')
            }
            parser.doctype = ''
            parser.sgmlDecl = ''
          } else if (c === '>') {
            emitNode(parser, 'onsgmldeclaration', parser.sgmlDecl)
            parser.sgmlDecl = ''
            parser.state = S.TEXT
          } else if (isQuote(c)) {
            parser.state = S.SGML_DECL_QUOTED
            parser.sgmlDecl += c
          } else {
            parser.sgmlDecl += c
          }
          continue

        case S.SGML_DECL_QUOTED:
          if (c === parser.q) {
            parser.state = S.SGML_DECL
            parser.q = ''
          }
          parser.sgmlDecl += c
          continue

        case S.DOCTYPE:
          if (c === '>') {
            parser.state = S.TEXT
            emitNode(parser, 'ondoctype', parser.doctype)
            parser.doctype = true // just remember that we saw it.
          } else {
            parser.doctype += c
            if (c === '[') {
              parser.state = S.DOCTYPE_DTD
            } else if (isQuote(c)) {
              parser.state = S.DOCTYPE_QUOTED
              parser.q = c
            }
          }
          continue

        case S.DOCTYPE_QUOTED:
          parser.doctype += c
          if (c === parser.q) {
            parser.q = ''
            parser.state = S.DOCTYPE
          }
          continue

        case S.DOCTYPE_DTD:
          parser.doctype += c
          if (c === ']') {
            parser.state = S.DOCTYPE
          } else if (isQuote(c)) {
            parser.state = S.DOCTYPE_DTD_QUOTED
            parser.q = c
          }
          continue

        case S.DOCTYPE_DTD_QUOTED:
          parser.doctype += c
          if (c === parser.q) {
            parser.state = S.DOCTYPE_DTD
            parser.q = ''
          }
          continue

        case S.COMMENT:
          if (c === '-') {
            parser.state = S.COMMENT_ENDING
          } else {
            parser.comment += c
          }
          continue

        case S.COMMENT_ENDING:
          if (c === '-') {
            parser.state = S.COMMENT_ENDED
            parser.comment = textopts(parser.opt, parser.comment)
            if (parser.comment) {
              emitNode(parser, 'oncomment', parser.comment)
            }
            parser.comment = ''
          } else {
            parser.comment += '-' + c
            parser.state = S.COMMENT
          }
          continue

        case S.COMMENT_ENDED:
          if (c !== '>') {
            strictFail(parser, 'Malformed comment')
            // allow <!-- blah -- bloo --> in non-strict mode,
            // which is a comment of " blah -- bloo "
            parser.comment += '--' + c
            parser.state = S.COMMENT
          } else {
            parser.state = S.TEXT
          }
          continue

        case S.CDATA:
          if (c === ']') {
            parser.state = S.CDATA_ENDING
          } else {
            parser.cdata += c
          }
          continue

        case S.CDATA_ENDING:
          if (c === ']') {
            parser.state = S.CDATA_ENDING_2
          } else {
            parser.cdata += ']' + c
            parser.state = S.CDATA
          }
          continue

        case S.CDATA_ENDING_2:
          if (c === '>') {
            if (parser.cdata) {
              emitNode(parser, 'oncdata', parser.cdata)
            }
            emitNode(parser, 'onclosecdata')
            parser.cdata = ''
            parser.state = S.TEXT
          } else if (c === ']') {
            parser.cdata += ']'
          } else {
            parser.cdata += ']]' + c
            parser.state = S.CDATA
          }
          continue

        case S.PROC_INST:
          if (c === '?') {
            parser.state = S.PROC_INST_ENDING
          } else if (isWhitespace(c)) {
            parser.state = S.PROC_INST_BODY
          } else {
            parser.procInstName += c
          }
          continue

        case S.PROC_INST_BODY:
          if (!parser.procInstBody && isWhitespace(c)) {
            continue
          } else if (c === '?') {
            parser.state = S.PROC_INST_ENDING
          } else {
            parser.procInstBody += c
          }
          continue

        case S.PROC_INST_ENDING:
          if (c === '>') {
            emitNode(parser, 'onprocessinginstruction', {
              name: parser.procInstName,
              body: parser.procInstBody
            })
            parser.procInstName = parser.procInstBody = ''
            parser.state = S.TEXT
          } else {
            parser.procInstBody += '?' + c
            parser.state = S.PROC_INST_BODY
          }
          continue

        case S.OPEN_TAG:
          if (isMatch(nameBody, c)) {
            parser.tagName += c
          } else {
            newTag(parser)
            if (c === '>') {
              openTag(parser)
            } else if (c === '/') {
              parser.state = S.OPEN_TAG_SLASH
            } else {
              if (!isWhitespace(c)) {
                strictFail(parser, 'Invalid character in tag name')
              }
              parser.state = S.ATTRIB
            }
          }
          continue

        case S.OPEN_TAG_SLASH:
          if (c === '>') {
            openTag(parser, true)
            closeTag(parser)
          } else {
            strictFail(parser, 'Forward-slash in opening tag not followed by >')
            parser.state = S.ATTRIB
          }
          continue

        case S.ATTRIB:
          // haven't read the attribute name yet.
          if (isWhitespace(c)) {
            continue
          } else if (c === '>') {
            openTag(parser)
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH
          } else if (isMatch(nameStart, c)) {
            parser.attribName = c
            parser.attribValue = ''
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_NAME:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE
          } else if (c === '>') {
            strictFail(parser, 'Attribute without value')
            parser.attribValue = parser.attribName
            attrib(parser)
            openTag(parser)
          } else if (isWhitespace(c)) {
            parser.state = S.ATTRIB_NAME_SAW_WHITE
          } else if (isMatch(nameBody, c)) {
            parser.attribName += c
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_NAME_SAW_WHITE:
          if (c === '=') {
            parser.state = S.ATTRIB_VALUE
          } else if (isWhitespace(c)) {
            continue
          } else {
            strictFail(parser, 'Attribute without value')
            parser.tag.attributes[parser.attribName] = ''
            parser.attribValue = ''
            emitNode(parser, 'onattribute', {
              name: parser.attribName,
              value: ''
            })
            parser.attribName = ''
            if (c === '>') {
              openTag(parser)
            } else if (isMatch(nameStart, c)) {
              parser.attribName = c
              parser.state = S.ATTRIB_NAME
            } else {
              strictFail(parser, 'Invalid attribute name')
              parser.state = S.ATTRIB
            }
          }
          continue

        case S.ATTRIB_VALUE:
          if (isWhitespace(c)) {
            continue
          } else if (isQuote(c)) {
            parser.q = c
            parser.state = S.ATTRIB_VALUE_QUOTED
          } else {
            strictFail(parser, 'Unquoted attribute value')
            parser.state = S.ATTRIB_VALUE_UNQUOTED
            parser.attribValue = c
          }
          continue

        case S.ATTRIB_VALUE_QUOTED:
          if (c !== parser.q) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_Q
            } else {
              parser.attribValue += c
            }
            continue
          }
          attrib(parser)
          parser.q = ''
          parser.state = S.ATTRIB_VALUE_CLOSED
          continue

        case S.ATTRIB_VALUE_CLOSED:
          if (isWhitespace(c)) {
            parser.state = S.ATTRIB
          } else if (c === '>') {
            openTag(parser)
          } else if (c === '/') {
            parser.state = S.OPEN_TAG_SLASH
          } else if (isMatch(nameStart, c)) {
            strictFail(parser, 'No whitespace between attributes')
            parser.attribName = c
            parser.attribValue = ''
            parser.state = S.ATTRIB_NAME
          } else {
            strictFail(parser, 'Invalid attribute name')
          }
          continue

        case S.ATTRIB_VALUE_UNQUOTED:
          if (!isAttribEnd(c)) {
            if (c === '&') {
              parser.state = S.ATTRIB_VALUE_ENTITY_U
            } else {
              parser.attribValue += c
            }
            continue
          }
          attrib(parser)
          if (c === '>') {
            openTag(parser)
          } else {
            parser.state = S.ATTRIB
          }
          continue

        case S.CLOSE_TAG:
          if (!parser.tagName) {
            if (isWhitespace(c)) {
              continue
            } else if (notMatch(nameStart, c)) {
              if (parser.script) {
                parser.script += '</' + c
                parser.state = S.SCRIPT
              } else {
                strictFail(parser, 'Invalid tagname in closing tag.')
              }
            } else {
              parser.tagName = c
            }
          } else if (c === '>') {
            closeTag(parser)
          } else if (isMatch(nameBody, c)) {
            parser.tagName += c
          } else if (parser.script) {
            parser.script += '</' + parser.tagName
            parser.tagName = ''
            parser.state = S.SCRIPT
          } else {
            if (!isWhitespace(c)) {
              strictFail(parser, 'Invalid tagname in closing tag')
            }
            parser.state = S.CLOSE_TAG_SAW_WHITE
          }
          continue

        case S.CLOSE_TAG_SAW_WHITE:
          if (isWhitespace(c)) {
            continue
          }
          if (c === '>') {
            closeTag(parser)
          } else {
            strictFail(parser, 'Invalid characters in closing tag')
          }
          continue

        case S.TEXT_ENTITY:
        case S.ATTRIB_VALUE_ENTITY_Q:
        case S.ATTRIB_VALUE_ENTITY_U:
          var returnState
          var buffer
          switch (parser.state) {
            case S.TEXT_ENTITY:
              returnState = S.TEXT
              buffer = 'textNode'
              break

            case S.ATTRIB_VALUE_ENTITY_Q:
              returnState = S.ATTRIB_VALUE_QUOTED
              buffer = 'attribValue'
              break

            case S.ATTRIB_VALUE_ENTITY_U:
              returnState = S.ATTRIB_VALUE_UNQUOTED
              buffer = 'attribValue'
              break
          }

          if (c === ';') {
            parser[buffer] += parseEntity(parser)
            parser.entity = ''
            parser.state = returnState
          } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
            parser.entity += c
          } else {
            strictFail(parser, 'Invalid character in entity name')
            parser[buffer] += '&' + parser.entity + c
            parser.entity = ''
            parser.state = returnState
          }

          continue

        default:
          throw new Error(parser, 'Unknown state: ' + parser.state)
      }
    } // while

    if (parser.position >= parser.bufferCheckPosition) {
      checkBufferLength(parser)
    }
    return parser
  }

  /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
  /* istanbul ignore next */
  if (!String.fromCodePoint) {
    (function () {
      var stringFromCharCode = String.fromCharCode
      var floor = Math.floor
      var fromCodePoint = function () {
        var MAX_SIZE = 0x4000
        var codeUnits = []
        var highSurrogate
        var lowSurrogate
        var index = -1
        var length = arguments.length
        if (!length) {
          return ''
        }
        var result = ''
        while (++index < length) {
          var codePoint = Number(arguments[index])
          if (
            !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
            codePoint < 0 || // not a valid Unicode code point
            codePoint > 0x10FFFF || // not a valid Unicode code point
            floor(codePoint) !== codePoint // not an integer
          ) {
            throw RangeError('Invalid code point: ' + codePoint)
          }
          if (codePoint <= 0xFFFF) { // BMP code point
            codeUnits.push(codePoint)
          } else { // Astral code point; split in surrogate halves
            // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            codePoint -= 0x10000
            highSurrogate = (codePoint >> 10) + 0xD800
            lowSurrogate = (codePoint % 0x400) + 0xDC00
            codeUnits.push(highSurrogate, lowSurrogate)
          }
          if (index + 1 === length || codeUnits.length > MAX_SIZE) {
            result += stringFromCharCode.apply(null, codeUnits)
            codeUnits.length = 0
          }
        }
        return result
      }
      /* istanbul ignore next */
      if (Object.defineProperty) {
        Object.defineProperty(String, 'fromCodePoint', {
          value: fromCodePoint,
          configurable: true,
          writable: true
        })
      } else {
        String.fromCodePoint = fromCodePoint
      }
    }())
  }
})( false ? 0 : exports)


/***/ }),

/***/ 142:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const timers = {
    setTimeout: function () {
        const id = __webpack_require__.g.setTimeout(...arguments);

        const ret = {
            unref: () => id
        }
        return ret;
    }
};

module.exports = timers


/***/ }),

/***/ 442:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { setTimeout } = __webpack_require__(142);

// A cache that expires.
module.exports = class Cache extends Map {
  constructor(timeout = 1000) {
    super();
    this.timeout = timeout;
  }
  set(key, value) {
    if (this.has(key)) {
      clearTimeout(super.get(key).tid);
    }
    super.set(key, {
      tid: setTimeout(this.delete.bind(this, key), this.timeout).unref(),
      value,
    });
  }
  get(key) {
    let entry = super.get(key);
    if (entry) {
      return entry.value;
    }
    return null;
  }
  async getOrSet(key, fn) {
    if (this.has(key)) {
      return this.get(key);
    } else {
      let value = fn();
      try {
        value = await value;
        this.set(key, value);
      } catch (err) {
        this.delete(key);
        return null;
      }
      return value;
    }
  }
  delete(key) {
    let entry = super.get(key);
    if (entry) {
      clearTimeout(entry.tid);
      super.delete(key);
    }
  }
  clear() {
    for (let entry of this.values()) {
      clearTimeout(entry.tid);
    }
    super.clear();
  }
};


/***/ }),

/***/ 900:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const utils = __webpack_require__(228);
const FORMATS = __webpack_require__(294);


// Use these to help sort formats, higher index is better.
const audioEncodingRanks = [
  'mp4a',
  'mp3',
  'vorbis',
  'aac',
  'opus',
  'flac',
];
const videoEncodingRanks = [
  'mp4v',
  'avc1',
  'Sorenson H.283',
  'MPEG-4 Visual',
  'VP8',
  'VP9',
  'H.264',
];

const getVideoBitrate = format => format.bitrate || 0;
const getVideoEncodingRank = format =>
  videoEncodingRanks.findIndex(enc => format.codecs && format.codecs.includes(enc));
const getAudioBitrate = format => format.audioBitrate || 0;
const getAudioEncodingRank = format =>
  audioEncodingRanks.findIndex(enc => format.codecs && format.codecs.includes(enc));


/**
 * Sort formats by a list of functions.
 *
 * @param {Object} a
 * @param {Object} b
 * @param {Array.<Function>} sortBy
 * @returns {number}
 */
const sortFormatsBy = (a, b, sortBy) => {
  let res = 0;
  for (let fn of sortBy) {
    res = fn(b) - fn(a);
    if (res !== 0) {
      break;
    }
  }
  return res;
};


const sortFormatsByVideo = (a, b) => sortFormatsBy(a, b, [
  format => parseInt(format.qualityLabel),
  getVideoBitrate,
  getVideoEncodingRank,
]);


const sortFormatsByAudio = (a, b) => sortFormatsBy(a, b, [
  getAudioBitrate,
  getAudioEncodingRank,
]);


/**
 * Sort formats from highest quality to lowest.
 *
 * @param {Object} a
 * @param {Object} b
 * @returns {number}
 */
exports.sortFormats = (a, b) => sortFormatsBy(a, b, [
  // Formats with both video and audio are ranked highest.
  format => +!!format.isHLS,
  format => +!!format.isDashMPD,
  format => +(format.contentLength > 0),
  format => +(format.hasVideo && format.hasAudio),
  format => +format.hasVideo,
  format => parseInt(format.qualityLabel) || 0,
  getVideoBitrate,
  getAudioBitrate,
  getVideoEncodingRank,
  getAudioEncodingRank,
]);


/**
 * Choose a format depending on the given options.
 *
 * @param {Array.<Object>} formats
 * @param {Object} options
 * @returns {Object}
 * @throws {Error} when no format matches the filter/format rules
 */
exports.chooseFormat = (formats, options) => {
  if (typeof options.format === 'object') {
    if (!options.format.url) {
      throw Error('Invalid format given, did you use `ytdl.getInfo()`?');
    }
    return options.format;
  }

  if (options.filter) {
    formats = exports.filterFormats(formats, options.filter);
  }

  // We currently only support HLS-Formats for livestreams
  // So we (now) remove all non-HLS streams
  if (formats.some(fmt => fmt.isHLS)) {
    formats = formats.filter(fmt => fmt.isHLS || !fmt.isLive);
  }

  let format;
  const quality = options.quality || 'highest';
  switch (quality) {
    case 'highest':
      format = formats[0];
      break;

    case 'lowest':
      format = formats[formats.length - 1];
      break;

    case 'highestaudio': {
      formats = exports.filterFormats(formats, 'audio');
      formats.sort(sortFormatsByAudio);
      // Filter for only the best audio format
      const bestAudioFormat = formats[0];
      formats = formats.filter(f => sortFormatsByAudio(bestAudioFormat, f) === 0);
      // Check for the worst video quality for the best audio quality and pick according
      // This does not loose default sorting of video encoding and bitrate
      const worstVideoQuality = formats.map(f => parseInt(f.qualityLabel) || 0).sort((a, b) => a - b)[0];
      format = formats.find(f => (parseInt(f.qualityLabel) || 0) === worstVideoQuality);
      break;
    }

    case 'lowestaudio':
      formats = exports.filterFormats(formats, 'audio');
      formats.sort(sortFormatsByAudio);
      format = formats[formats.length - 1];
      break;

    case 'highestvideo': {
      formats = exports.filterFormats(formats, 'video');
      formats.sort(sortFormatsByVideo);
      // Filter for only the best video format
      const bestVideoFormat = formats[0];
      formats = formats.filter(f => sortFormatsByVideo(bestVideoFormat, f) === 0);
      // Check for the worst audio quality for the best video quality and pick according
      // This does not loose default sorting of audio encoding and bitrate
      const worstAudioQuality = formats.map(f => f.audioBitrate || 0).sort((a, b) => a - b)[0];
      format = formats.find(f => (f.audioBitrate || 0) === worstAudioQuality);
      break;
    }

    case 'lowestvideo':
      formats = exports.filterFormats(formats, 'video');
      formats.sort(sortFormatsByVideo);
      format = formats[formats.length - 1];
      break;

    default:
      format = getFormatByQuality(quality, formats);
      break;
  }

  if (!format) {
    throw Error(`No such format found: ${quality}`);
  }
  return format;
};

/**
 * Gets a format based on quality or array of quality's
 *
 * @param {string|[string]} quality
 * @param {[Object]} formats
 * @returns {Object}
 */
const getFormatByQuality = (quality, formats) => {
  let getFormat = itag => formats.find(format => `${format.itag}` === `${itag}`);
  if (Array.isArray(quality)) {
    return getFormat(quality.find(q => getFormat(q)));
  } else {
    return getFormat(quality);
  }
};


/**
 * @param {Array.<Object>} formats
 * @param {Function} filter
 * @returns {Array.<Object>}
 */
exports.filterFormats = (formats, filter) => {
  let fn;
  switch (filter) {
    case 'videoandaudio':
    case 'audioandvideo':
      fn = format => format.hasVideo && format.hasAudio;
      break;

    case 'video':
      fn = format => format.hasVideo;
      break;

    case 'videoonly':
      fn = format => format.hasVideo && !format.hasAudio;
      break;

    case 'audio':
      fn = format => format.hasAudio;
      break;

    case 'audioonly':
      fn = format => !format.hasVideo && format.hasAudio;
      break;

    default:
      if (typeof filter === 'function') {
        fn = filter;
      } else {
        throw TypeError(`Given filter (${filter}) is not supported`);
      }
  }
  return formats.filter(format => !!format.url && fn(format));
};


/**
 * @param {Object} format
 * @returns {Object}
 */
exports.addFormatMeta = format => {
  format = Object.assign({}, FORMATS[format.itag], format);
  format.hasVideo = !!format.qualityLabel;
  format.hasAudio = !!format.audioBitrate;
  format.container = format.mimeType ?
    format.mimeType.split(';')[0].split('/')[1] : null;
  format.codecs = format.mimeType ?
    utils.between(format.mimeType, 'codecs="', '"') : null;
  format.videoCodec = format.hasVideo && format.codecs ?
    format.codecs.split(', ')[0] : null;
  format.audioCodec = format.hasAudio && format.codecs ?
    format.codecs.split(', ').slice(-1)[0] : null;
  format.isLive = /\bsource[/=]yt_live_broadcast\b/.test(format.url);
  format.isHLS = /\/manifest\/hls_(variant|playlist)\//.test(format.url);
  format.isDashMPD = /\/manifest\/dash\//.test(format.url);
  return format;
};


/***/ }),

/***/ 294:
/***/ ((module) => {

/**
 * http://en.wikipedia.org/wiki/YouTube#Quality_and_formats
 */
module.exports = {

  5: {
    mimeType: 'video/flv; codecs="Sorenson H.283, mp3"',
    qualityLabel: '240p',
    bitrate: 250000,
    audioBitrate: 64,
  },

  6: {
    mimeType: 'video/flv; codecs="Sorenson H.263, mp3"',
    qualityLabel: '270p',
    bitrate: 800000,
    audioBitrate: 64,
  },

  13: {
    mimeType: 'video/3gp; codecs="MPEG-4 Visual, aac"',
    qualityLabel: null,
    bitrate: 500000,
    audioBitrate: null,
  },

  17: {
    mimeType: 'video/3gp; codecs="MPEG-4 Visual, aac"',
    qualityLabel: '144p',
    bitrate: 50000,
    audioBitrate: 24,
  },

  18: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: '360p',
    bitrate: 500000,
    audioBitrate: 96,
  },

  22: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: '720p',
    bitrate: 2000000,
    audioBitrate: 192,
  },

  34: {
    mimeType: 'video/flv; codecs="H.264, aac"',
    qualityLabel: '360p',
    bitrate: 500000,
    audioBitrate: 128,
  },

  35: {
    mimeType: 'video/flv; codecs="H.264, aac"',
    qualityLabel: '480p',
    bitrate: 800000,
    audioBitrate: 128,
  },

  36: {
    mimeType: 'video/3gp; codecs="MPEG-4 Visual, aac"',
    qualityLabel: '240p',
    bitrate: 175000,
    audioBitrate: 32,
  },

  37: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: '1080p',
    bitrate: 3000000,
    audioBitrate: 192,
  },

  38: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: '3072p',
    bitrate: 3500000,
    audioBitrate: 192,
  },

  43: {
    mimeType: 'video/webm; codecs="VP8, vorbis"',
    qualityLabel: '360p',
    bitrate: 500000,
    audioBitrate: 128,
  },

  44: {
    mimeType: 'video/webm; codecs="VP8, vorbis"',
    qualityLabel: '480p',
    bitrate: 1000000,
    audioBitrate: 128,
  },

  45: {
    mimeType: 'video/webm; codecs="VP8, vorbis"',
    qualityLabel: '720p',
    bitrate: 2000000,
    audioBitrate: 192,
  },

  46: {
    mimeType: 'audio/webm; codecs="vp8, vorbis"',
    qualityLabel: '1080p',
    bitrate: null,
    audioBitrate: 192,
  },

  82: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: '360p',
    bitrate: 500000,
    audioBitrate: 96,
  },

  83: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: '240p',
    bitrate: 500000,
    audioBitrate: 96,
  },

  84: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: '720p',
    bitrate: 2000000,
    audioBitrate: 192,
  },

  85: {
    mimeType: 'video/mp4; codecs="H.264, aac"',
    qualityLabel: '1080p',
    bitrate: 3000000,
    audioBitrate: 192,
  },

  91: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: '144p',
    bitrate: 100000,
    audioBitrate: 48,
  },

  92: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: '240p',
    bitrate: 150000,
    audioBitrate: 48,
  },

  93: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: '360p',
    bitrate: 500000,
    audioBitrate: 128,
  },

  94: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: '480p',
    bitrate: 800000,
    audioBitrate: 128,
  },

  95: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: '720p',
    bitrate: 1500000,
    audioBitrate: 256,
  },

  96: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: '1080p',
    bitrate: 2500000,
    audioBitrate: 256,
  },

  100: {
    mimeType: 'audio/webm; codecs="VP8, vorbis"',
    qualityLabel: '360p',
    bitrate: null,
    audioBitrate: 128,
  },

  101: {
    mimeType: 'audio/webm; codecs="VP8, vorbis"',
    qualityLabel: '360p',
    bitrate: null,
    audioBitrate: 192,
  },

  102: {
    mimeType: 'audio/webm; codecs="VP8, vorbis"',
    qualityLabel: '720p',
    bitrate: null,
    audioBitrate: 192,
  },

  120: {
    mimeType: 'video/flv; codecs="H.264, aac"',
    qualityLabel: '720p',
    bitrate: 2000000,
    audioBitrate: 128,
  },

  127: {
    mimeType: 'audio/ts; codecs="aac"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 96,
  },

  128: {
    mimeType: 'audio/ts; codecs="aac"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 96,
  },

  132: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: '240p',
    bitrate: 150000,
    audioBitrate: 48,
  },

  133: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: '240p',
    bitrate: 200000,
    audioBitrate: null,
  },

  134: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: '360p',
    bitrate: 300000,
    audioBitrate: null,
  },

  135: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: '480p',
    bitrate: 500000,
    audioBitrate: null,
  },

  136: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: '720p',
    bitrate: 1000000,
    audioBitrate: null,
  },

  137: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: '1080p',
    bitrate: 2500000,
    audioBitrate: null,
  },

  138: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: '4320p',
    bitrate: 13500000,
    audioBitrate: null,
  },

  139: {
    mimeType: 'audio/mp4; codecs="aac"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 48,
  },

  140: {
    mimeType: 'audio/m4a; codecs="aac"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 128,
  },

  141: {
    mimeType: 'audio/mp4; codecs="aac"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 256,
  },

  151: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: '720p',
    bitrate: 50000,
    audioBitrate: 24,
  },

  160: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: '144p',
    bitrate: 100000,
    audioBitrate: null,
  },

  171: {
    mimeType: 'audio/webm; codecs="vorbis"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 128,
  },

  172: {
    mimeType: 'audio/webm; codecs="vorbis"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 192,
  },

  242: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '240p',
    bitrate: 100000,
    audioBitrate: null,
  },

  243: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '360p',
    bitrate: 250000,
    audioBitrate: null,
  },

  244: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '480p',
    bitrate: 500000,
    audioBitrate: null,
  },

  247: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '720p',
    bitrate: 700000,
    audioBitrate: null,
  },

  248: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '1080p',
    bitrate: 1500000,
    audioBitrate: null,
  },

  249: {
    mimeType: 'audio/webm; codecs="opus"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 48,
  },

  250: {
    mimeType: 'audio/webm; codecs="opus"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 64,
  },

  251: {
    mimeType: 'audio/webm; codecs="opus"',
    qualityLabel: null,
    bitrate: null,
    audioBitrate: 160,
  },

  264: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: '1440p',
    bitrate: 4000000,
    audioBitrate: null,
  },

  266: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: '2160p',
    bitrate: 12500000,
    audioBitrate: null,
  },

  271: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '1440p',
    bitrate: 9000000,
    audioBitrate: null,
  },

  272: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '4320p',
    bitrate: 20000000,
    audioBitrate: null,
  },

  278: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '144p 30fps',
    bitrate: 80000,
    audioBitrate: null,
  },

  298: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: '720p',
    bitrate: 3000000,
    audioBitrate: null,
  },

  299: {
    mimeType: 'video/mp4; codecs="H.264"',
    qualityLabel: '1080p',
    bitrate: 5500000,
    audioBitrate: null,
  },

  300: {
    mimeType: 'video/ts; codecs="H.264, aac"',
    qualityLabel: '720p',
    bitrate: 1318000,
    audioBitrate: 48,
  },

  302: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '720p HFR',
    bitrate: 2500000,
    audioBitrate: null,
  },

  303: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '1080p HFR',
    bitrate: 5000000,
    audioBitrate: null,
  },

  308: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '1440p HFR',
    bitrate: 10000000,
    audioBitrate: null,
  },

  313: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '2160p',
    bitrate: 13000000,
    audioBitrate: null,
  },

  315: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '2160p HFR',
    bitrate: 20000000,
    audioBitrate: null,
  },

  330: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '144p HDR, HFR',
    bitrate: 80000,
    audioBitrate: null,
  },

  331: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '240p HDR, HFR',
    bitrate: 100000,
    audioBitrate: null,
  },

  332: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '360p HDR, HFR',
    bitrate: 250000,
    audioBitrate: null,
  },

  333: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '240p HDR, HFR',
    bitrate: 500000,
    audioBitrate: null,
  },

  334: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '720p HDR, HFR',
    bitrate: 1000000,
    audioBitrate: null,
  },

  335: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '1080p HDR, HFR',
    bitrate: 1500000,
    audioBitrate: null,
  },

  336: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '1440p HDR, HFR',
    bitrate: 5000000,
    audioBitrate: null,
  },

  337: {
    mimeType: 'video/webm; codecs="VP9"',
    qualityLabel: '2160p HDR, HFR',
    bitrate: 12000000,
    audioBitrate: null,
  },

};


/***/ }),

/***/ 663:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const utils = __webpack_require__(228);
const qs = __webpack_require__(673);
const { parseTimestamp } = __webpack_require__(495);


const BASE_URL = 'https://www.youtube.com/watch?v=';
const TITLE_TO_CATEGORY = {
  song: { name: 'Music', url: 'https://music.youtube.com/' },
};

const getText = obj => obj ? obj.runs ? obj.runs[0].text : obj.simpleText : null;


/**
 * Get video media.
 *
 * @param {Object} info
 * @returns {Object}
 */
exports.getMedia = info => {
  let media = {};
  let results = [];
  try {
    results = info.response.contents.twoColumnWatchNextResults.results.results.contents;
  } catch (err) {
    // Do nothing
  }

  let result = results.find(v => v.videoSecondaryInfoRenderer);
  if (!result) { return {}; }

  try {
    let metadataRows =
      (result.metadataRowContainer || result.videoSecondaryInfoRenderer.metadataRowContainer)
        .metadataRowContainerRenderer.rows;
    for (let row of metadataRows) {
      if (row.metadataRowRenderer) {
        let title = getText(row.metadataRowRenderer.title).toLowerCase();
        let contents = row.metadataRowRenderer.contents[0];
        media[title] = getText(contents);
        let runs = contents.runs;
        if (runs && runs[0].navigationEndpoint) {
          media[`${title}_url`] = new URL(
            runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url, BASE_URL).toString();
        }
        if (title in TITLE_TO_CATEGORY) {
          media.category = TITLE_TO_CATEGORY[title].name;
          media.category_url = TITLE_TO_CATEGORY[title].url;
        }
      } else if (row.richMetadataRowRenderer) {
        let contents = row.richMetadataRowRenderer.contents;
        let boxArt = contents
          .filter(meta => meta.richMetadataRenderer.style === 'RICH_METADATA_RENDERER_STYLE_BOX_ART');
        for (let { richMetadataRenderer } of boxArt) {
          let meta = richMetadataRenderer;
          media.year = getText(meta.subtitle);
          let type = getText(meta.callToAction).split(' ')[1];
          media[type] = getText(meta.title);
          media[`${type}_url`] = new URL(
            meta.endpoint.commandMetadata.webCommandMetadata.url, BASE_URL).toString();
          media.thumbnails = meta.thumbnail.thumbnails;
        }
        let topic = contents
          .filter(meta => meta.richMetadataRenderer.style === 'RICH_METADATA_RENDERER_STYLE_TOPIC');
        for (let { richMetadataRenderer } of topic) {
          let meta = richMetadataRenderer;
          media.category = getText(meta.title);
          media.category_url = new URL(
            meta.endpoint.commandMetadata.webCommandMetadata.url, BASE_URL).toString();
        }
      }
    }
  } catch (err) {
    // Do nothing.
  }

  return media;
};


const isVerified = badges => !!(badges && badges.find(b => b.metadataBadgeRenderer.tooltip === 'Verified'));


/**
 * Get video author.
 *
 * @param {Object} info
 * @returns {Object}
 */
exports.getAuthor = info => {
  let channelId, thumbnails = [], subscriberCount, verified = false;
  try {
    let results = info.response.contents.twoColumnWatchNextResults.results.results.contents;
    let v = results.find(v2 =>
      v2.videoSecondaryInfoRenderer &&
      v2.videoSecondaryInfoRenderer.owner &&
      v2.videoSecondaryInfoRenderer.owner.videoOwnerRenderer);
    let videoOwnerRenderer = v.videoSecondaryInfoRenderer.owner.videoOwnerRenderer;
    channelId = videoOwnerRenderer.navigationEndpoint.browseEndpoint.browseId;
    thumbnails = videoOwnerRenderer.thumbnail.thumbnails.map(thumbnail => {
      thumbnail.url = new URL(thumbnail.url, BASE_URL).toString();
      return thumbnail;
    });
    subscriberCount = utils.parseAbbreviatedNumber(getText(videoOwnerRenderer.subscriberCountText));
    verified = isVerified(videoOwnerRenderer.badges);
  } catch (err) {
    // Do nothing.
  }
  try {
    let videoDetails = info.player_response.microformat && info.player_response.microformat.playerMicroformatRenderer;
    let id = (videoDetails && videoDetails.channelId) || channelId || info.player_response.videoDetails.channelId;
    let author = {
      id: id,
      name: videoDetails ? videoDetails.ownerChannelName : info.player_response.videoDetails.author,
      user: videoDetails ? videoDetails.ownerProfileUrl.split('/').slice(-1)[0] : null,
      channel_url: `https://www.youtube.com/channel/${id}`,
      external_channel_url: videoDetails ? `https://www.youtube.com/channel/${videoDetails.externalChannelId}` : '',
      user_url: videoDetails ? new URL(videoDetails.ownerProfileUrl, BASE_URL).toString() : '',
      thumbnails,
      verified,
      subscriber_count: subscriberCount,
    };
    if (thumbnails.length) {
      utils.deprecate(author, 'avatar', author.thumbnails[0].url, 'author.avatar', 'author.thumbnails[0].url');
    }
    return author;
  } catch (err) {
    return {};
  }
};

const parseRelatedVideo = (details, rvsParams) => {
  if (!details) return;
  try {
    let viewCount = getText(details.viewCountText);
    let shortViewCount = getText(details.shortViewCountText);
    let rvsDetails = rvsParams.find(elem => elem.id === details.videoId);
    if (!/^\d/.test(shortViewCount)) {
      shortViewCount = (rvsDetails && rvsDetails.short_view_count_text) || '';
    }
    viewCount = (/^\d/.test(viewCount) ? viewCount : shortViewCount).split(' ')[0];
    let browseEndpoint = details.shortBylineText.runs[0].navigationEndpoint.browseEndpoint;
    let channelId = browseEndpoint.browseId;
    let name = getText(details.shortBylineText);
    let user = (browseEndpoint.canonicalBaseUrl || '').split('/').slice(-1)[0];
    let video = {
      id: details.videoId,
      title: getText(details.title),
      published: getText(details.publishedTimeText),
      author: {
        id: channelId,
        name,
        user,
        channel_url: `https://www.youtube.com/channel/${channelId}`,
        user_url: `https://www.youtube.com/user/${user}`,
        thumbnails: details.channelThumbnail.thumbnails.map(thumbnail => {
          thumbnail.url = new URL(thumbnail.url, BASE_URL).toString();
          return thumbnail;
        }),
        verified: isVerified(details.ownerBadges),

        [Symbol.toPrimitive]() {
          console.warn(`\`relatedVideo.author\` will be removed in a near future release, ` +
            `use \`relatedVideo.author.name\` instead.`);
          return video.author.name;
        },

      },
      short_view_count_text: shortViewCount.split(' ')[0],
      view_count: viewCount.replace(/,/g, ''),
      length_seconds: details.lengthText ?
        Math.floor(parseTimestamp(getText(details.lengthText)) / 1000) :
        rvsParams && `${rvsParams.length_seconds}`,
      thumbnails: details.thumbnail.thumbnails,
      richThumbnails:
        details.richThumbnail ?
          details.richThumbnail.movingThumbnailRenderer.movingThumbnailDetails.thumbnails : [],
      isLive: !!(details.badges && details.badges.find(b => b.metadataBadgeRenderer.label === 'LIVE NOW')),
    };

    utils.deprecate(video, 'author_thumbnail', video.author.thumbnails[0].url,
      'relatedVideo.author_thumbnail', 'relatedVideo.author.thumbnails[0].url');
    utils.deprecate(video, 'ucid', video.author.id, 'relatedVideo.ucid', 'relatedVideo.author.id');
    utils.deprecate(video, 'video_thumbnail', video.thumbnails[0].url,
      'relatedVideo.video_thumbnail', 'relatedVideo.thumbnails[0].url');
    return video;
  } catch (err) {
    // Skip.
  }
};

/**
 * Get related videos.
 *
 * @param {Object} info
 * @returns {Array.<Object>}
 */
exports.getRelatedVideos = info => {
  let rvsParams = [], secondaryResults = [];
  try {
    rvsParams = info.response.webWatchNextResponseExtensionData.relatedVideoArgs.split(',').map(e => qs.parse(e));
  } catch (err) {
    // Do nothing.
  }
  try {
    secondaryResults = info.response.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results;
  } catch (err) {
    return [];
  }
  let videos = [];
  for (let result of secondaryResults || []) {
    let details = result.compactVideoRenderer;
    if (details) {
      let video = parseRelatedVideo(details, rvsParams);
      if (video) videos.push(video);
    } else {
      let autoplay = result.compactAutoplayRenderer || result.itemSectionRenderer;
      if (!autoplay || !Array.isArray(autoplay.contents)) continue;
      for (let content of autoplay.contents) {
        let video = parseRelatedVideo(content.compactVideoRenderer, rvsParams);
        if (video) videos.push(video);
      }
    }
  }
  return videos;
};

/**
 * Get like count.
 *
 * @param {Object} info
 * @returns {number}
 */
exports.getLikes = info => {
  try {
    let contents = info.response.contents.twoColumnWatchNextResults.results.results.contents;
    let video = contents.find(r => r.videoPrimaryInfoRenderer);
    let buttons = video.videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons;
    let like = buttons.find(b => b.toggleButtonRenderer &&
      b.toggleButtonRenderer.defaultIcon.iconType === 'LIKE');
    return parseInt(like.toggleButtonRenderer.defaultText.accessibility.accessibilityData.label.replace(/\D+/g, ''));
  } catch (err) {
    return null;
  }
};

/**
 * Get dislike count.
 *
 * @param {Object} info
 * @returns {number}
 */
exports.getDislikes = info => {
  try {
    let contents = info.response.contents.twoColumnWatchNextResults.results.results.contents;
    let video = contents.find(r => r.videoPrimaryInfoRenderer);
    let buttons = video.videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons;
    let dislike = buttons.find(b => b.toggleButtonRenderer &&
      b.toggleButtonRenderer.defaultIcon.iconType === 'DISLIKE');
    return parseInt(dislike.toggleButtonRenderer.defaultText.accessibility.accessibilityData.label.replace(/\D+/g, ''));
  } catch (err) {
    return null;
  }
};

/**
 * Cleans up a few fields on `videoDetails`.
 *
 * @param {Object} videoDetails
 * @param {Object} info
 * @returns {Object}
 */
exports.cleanVideoDetails = (videoDetails, info) => {
  videoDetails.thumbnails = videoDetails.thumbnail.thumbnails;
  delete videoDetails.thumbnail;
  utils.deprecate(videoDetails, 'thumbnail', { thumbnails: videoDetails.thumbnails },
    'videoDetails.thumbnail.thumbnails', 'videoDetails.thumbnails');
  videoDetails.description = videoDetails.shortDescription || getText(videoDetails.description);
  delete videoDetails.shortDescription;
  utils.deprecate(videoDetails, 'shortDescription', videoDetails.description,
    'videoDetails.shortDescription', 'videoDetails.description');

  // Use more reliable `lengthSeconds` from `playerMicroformatRenderer`.
  videoDetails.lengthSeconds =
    info.player_response.microformat &&
    info.player_response.microformat.playerMicroformatRenderer.lengthSeconds;
  return videoDetails;
};

/**
 * Get storyboards info.
 *
 * @param {Object} info
 * @returns {Array.<Object>}
 */
exports.getStoryboards = info => {
  const parts = info.player_response.storyboards &&
    info.player_response.storyboards.playerStoryboardSpecRenderer &&
    info.player_response.storyboards.playerStoryboardSpecRenderer.spec &&
    info.player_response.storyboards.playerStoryboardSpecRenderer.spec.split('|');

  if (!parts) return [];

  const url = new URL(parts.shift());

  return parts.map((part, i) => {
    let [
      thumbnailWidth,
      thumbnailHeight,
      thumbnailCount,
      columns,
      rows,
      interval,
      nameReplacement,
      sigh,
    ] = part.split('#');

    url.searchParams.set('sigh', sigh);

    thumbnailCount = parseInt(thumbnailCount, 10);
    columns = parseInt(columns, 10);
    rows = parseInt(rows, 10);

    const storyboardCount = Math.ceil(thumbnailCount / (columns * rows));

    return {
      templateUrl: url.toString().replace('$L', i).replace('$N', nameReplacement),
      thumbnailWidth: parseInt(thumbnailWidth, 10),
      thumbnailHeight: parseInt(thumbnailHeight, 10),
      thumbnailCount,
      interval: parseInt(interval, 10),
      columns,
      rows,
      storyboardCount,
    };
  });
};

/**
 * Get chapters info.
 *
 * @param {Object} info
 * @returns {Array.<Object>}
 */
exports.getChapters = info => {
  const playerOverlayRenderer = info.response &&
    info.response.playerOverlays &&
    info.response.playerOverlays.playerOverlayRenderer;
  const playerBar = playerOverlayRenderer &&
    playerOverlayRenderer.decoratedPlayerBarRenderer &&
    playerOverlayRenderer.decoratedPlayerBarRenderer.decoratedPlayerBarRenderer &&
    playerOverlayRenderer.decoratedPlayerBarRenderer.decoratedPlayerBarRenderer.playerBar;
  const markersMap = playerBar &&
    playerBar.multiMarkersPlayerBarRenderer &&
    playerBar.multiMarkersPlayerBarRenderer.markersMap;
  const marker = Array.isArray(markersMap) && markersMap.find(m => m.value && Array.isArray(m.value.chapters));
  if (!marker) return [];
  const chapters = marker.value.chapters;

  return chapters.map(chapter => ({
    title: getText(chapter.chapterRenderer.title),
    start_time: chapter.chapterRenderer.timeRangeStartMillis / 1000,
  }));
};


/***/ }),

/***/ 731:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const querystring = __webpack_require__(673);
const sax = __webpack_require__(152);
const miniget = __webpack_require__(83);
const utils = __webpack_require__(228);
// Forces Node JS version of setTimeout for Electron based applications
const { setTimeout } = __webpack_require__(142);
const formatUtils = __webpack_require__(900);
const urlUtils = __webpack_require__(319);
const extras = __webpack_require__(663);
const sig = __webpack_require__(146);
const Cache = __webpack_require__(442);


const BASE_URL = 'https://www.youtube.com/watch?v=';


// Cached for storing basic/full info.
exports.cache = new Cache();
exports.cookieCache = new Cache(1000 * 60 * 60 * 24);
exports.watchPageCache = new Cache();


// Special error class used to determine if an error is unrecoverable,
// as in, ytdl-core should not try again to fetch the video metadata.
// In this case, the video is usually unavailable in some way.
class UnrecoverableError extends Error {}


// List of URLs that show up in `notice_url` for age restricted videos.
const AGE_RESTRICTED_URLS = [
  'support.google.com/youtube/?p=age_restrictions',
  'youtube.com/t/community_guidelines',
];


/**
 * Gets info from a video without getting additional formats.
 *
 * @param {string} id
 * @param {Object} options
 * @returns {Promise<Object>}
*/
exports.getBasicInfo = async(id, options) => {
  const retryOptions = Object.assign({}, miniget.defaultOptions, options.requestOptions);
  options.requestOptions = Object.assign({}, options.requestOptions, {});
  options.requestOptions.headers = Object.assign({},
    {
      // eslint-disable-next-line max-len
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36',
    }, options.requestOptions.headers);
  const validate = info => {
    let playErr = utils.playError(info.player_response, ['ERROR'], UnrecoverableError);
    let privateErr = privateVideoError(info.player_response);
    if (playErr || privateErr) {
      throw playErr || privateErr;
    }
    return info && info.player_response && (
      info.player_response.streamingData || isRental(info.player_response) || isNotYetBroadcasted(info.player_response)
    );
  };
  let info = await pipeline([id, options], validate, retryOptions, [
    getWatchJSONPage,
    getWatchHTMLPage,
    getVideoInfoPage,
  ]);

  Object.assign(info, {
    formats: parseFormats(info.player_response),
    related_videos: extras.getRelatedVideos(info),
  });

  // Add additional properties to info.
  const media = extras.getMedia(info);
  const additional = {
    author: extras.getAuthor(info),
    media,
    likes: extras.getLikes(info),
    dislikes: extras.getDislikes(info),
    age_restricted: !!(media && media.notice_url && AGE_RESTRICTED_URLS.some(url => media.notice_url.includes(url))),

    // Give the standard link to the video.
    video_url: BASE_URL + id,
    storyboards: extras.getStoryboards(info),
    chapters: extras.getChapters(info),
  };

  info.videoDetails = extras.cleanVideoDetails(Object.assign({},
    info.player_response && info.player_response.microformat &&
    info.player_response.microformat.playerMicroformatRenderer,
    info.player_response && info.player_response.videoDetails, additional), info);

  return info;
};

const privateVideoError = player_response => {
  let playability = player_response && player_response.playabilityStatus;
  if (playability && playability.status === 'LOGIN_REQUIRED' && playability.messages &&
    playability.messages.filter(m => /This is a private video/.test(m)).length) {
    return new UnrecoverableError(playability.reason || (playability.messages && playability.messages[0]));
  } else {
    return null;
  }
};


const isRental = player_response => {
  let playability = player_response.playabilityStatus;
  return playability && playability.status === 'UNPLAYABLE' &&
    playability.errorScreen && playability.errorScreen.playerLegacyDesktopYpcOfferRenderer;
};


const isNotYetBroadcasted = player_response => {
  let playability = player_response.playabilityStatus;
  return playability && playability.status === 'LIVE_STREAM_OFFLINE';
};


const getWatchHTMLURL = (id, options) => `${BASE_URL + id}&hl=${options.lang || 'en'}`;
const getWatchHTMLPageBody = (id, options) => {
  const url = getWatchHTMLURL(id, options);
  return exports.watchPageCache.getOrSet(url, () => utils.exposedMiniget(url, options).text());
};


const EMBED_URL = 'https://www.youtube.com/embed/';
const getEmbedPageBody = (id, options) => {
  const embedUrl = `${EMBED_URL + id}?hl=${options.lang || 'en'}`;
  return utils.exposedMiniget(embedUrl, options).text();
};


const getHTML5player = body => {
  let html5playerRes =
    /<script\s+src="([^"]+)"(?:\s+type="text\/javascript")?\s+name="player_ias\/base"\s*>|"jsUrl":"([^"]+)"/
      .exec(body);
  return html5playerRes ? html5playerRes[1] || html5playerRes[2] : null;
};


const getIdentityToken = (id, options, key, throwIfNotFound) =>
  exports.cookieCache.getOrSet(key, async() => {
    let page = await getWatchHTMLPageBody(id, options);
    let match = page.match(/(["'])ID_TOKEN\1[:,]\s?"([^"]+)"/);
    if (!match && throwIfNotFound) {
      throw new UnrecoverableError('Cookie header used in request, but unable to find YouTube identity token');
    }
    return match && match[2];
  });


/**
 * Goes through each endpoint in the pipeline, retrying on failure if the error is recoverable.
 * If unable to succeed with one endpoint, moves onto the next one.
 *
 * @param {Array.<Object>} args
 * @param {Function} validate
 * @param {Object} retryOptions
 * @param {Array.<Function>} endpoints
 * @returns {[Object, Object, Object]}
 */
const pipeline = async(args, validate, retryOptions, endpoints) => {
  let info;
  for (let func of endpoints) {
    try {
      const newInfo = await retryFunc(func, args.concat([info]), retryOptions);
      if (newInfo.player_response) {
        newInfo.player_response.videoDetails = assign(
          info && info.player_response && info.player_response.videoDetails,
          newInfo.player_response.videoDetails);
        newInfo.player_response = assign(info && info.player_response, newInfo.player_response);
      }
      info = assign(info, newInfo);
      if (validate(info, false)) {
        break;
      }
    } catch (err) {
      if (err instanceof UnrecoverableError || func === endpoints[endpoints.length - 1]) {
        throw err;
      }
      // Unable to find video metadata... so try next endpoint.
    }
  }
  return info;
};


/**
 * Like Object.assign(), but ignores `null` and `undefined` from `source`.
 *
 * @param {Object} target
 * @param {Object} source
 * @returns {Object}
 */
const assign = (target, source) => {
  if (!target || !source) { return target || source; }
  for (let [key, value] of Object.entries(source)) {
    if (value !== null && value !== undefined) {
      target[key] = value;
    }
  }
  return target;
};


/**
 * Given a function, calls it with `args` until it's successful,
 * or until it encounters an unrecoverable error.
 * Currently, any error from miniget is considered unrecoverable. Errors such as
 * too many redirects, invalid URL, status code 404, status code 502.
 *
 * @param {Function} func
 * @param {Array.<Object>} args
 * @param {Object} options
 * @param {number} options.maxRetries
 * @param {Object} options.backoff
 * @param {number} options.backoff.inc
 */
const retryFunc = async(func, args, options) => {
  let currentTry = 0, result;
  while (currentTry <= options.maxRetries) {
    try {
      result = await func(...args);
      break;
    } catch (err) {
      if (err instanceof UnrecoverableError ||
        (err instanceof miniget.MinigetError && err.statusCode < 500) || currentTry >= options.maxRetries) {
        throw err;
      }
      let wait = Math.min(++currentTry * options.backoff.inc, options.backoff.max);
      await new Promise(resolve => setTimeout(resolve, wait));
    }
  }
  return result;
};


const jsonClosingChars = /^[)\]}'\s]+/;
const parseJSON = (source, varName, json) => {
  if (!json || typeof json === 'object') {
    return json;
  } else {
    try {
      json = json.replace(jsonClosingChars, '');
      return JSON.parse(json);
    } catch (err) {
      throw Error(`Error parsing ${varName} in ${source}: ${err.message}`);
    }
  }
};


const findJSON = (source, varName, body, left, right, prependJSON) => {
  let jsonStr = utils.between(body, left, right);
  if (!jsonStr) {
    throw Error(`Could not find ${varName} in ${source}`);
  }
  return parseJSON(source, varName, utils.cutAfterJSON(`${prependJSON}${jsonStr}`));
};


const findPlayerResponse = (source, info) => {
  const player_response = info && (
    (info.args && info.args.player_response) ||
    info.player_response || info.playerResponse || info.embedded_player_response);
  return parseJSON(source, 'player_response', player_response);
};


const getWatchJSONURL = (id, options) => `${getWatchHTMLURL(id, options)}&pbj=1`;
const getWatchJSONPage = async(id, options) => {
  const reqOptions = Object.assign({ headers: {} }, options.requestOptions);
  let cookie = reqOptions.headers.Cookie || reqOptions.headers.cookie;
  reqOptions.headers = Object.assign({
    'x-youtube-client-name': '1',
    'x-youtube-client-version': '2.20201203.06.00',
    'x-youtube-identity-token': exports.cookieCache.get(cookie || 'browser') || '',
  }, reqOptions.headers);

  const setIdentityToken = async(key, throwIfNotFound) => {
    if (reqOptions.headers['x-youtube-identity-token']) { return; }
    reqOptions.headers['x-youtube-identity-token'] = await getIdentityToken(id, options, key, throwIfNotFound);
  };

  if (cookie) {
    await setIdentityToken(cookie, true);
  }

  const jsonUrl = getWatchJSONURL(id, options);
  const body = await utils.exposedMiniget(jsonUrl, options, reqOptions).text();
  let parsedBody = parseJSON('watch.json', 'body', body);
  if (parsedBody.reload === 'now') {
    await setIdentityToken('browser', false);
  }
  if (parsedBody.reload === 'now' || !Array.isArray(parsedBody)) {
    throw Error('Unable to retrieve video metadata in watch.json');
  }
  let info = parsedBody.reduce((part, curr) => Object.assign(curr, part), {});
  info.player_response = findPlayerResponse('watch.json', info);
  info.html5player = info.player && info.player.assets && info.player.assets.js;

  return info;
};


const getWatchHTMLPage = async(id, options) => {
  let body = await getWatchHTMLPageBody(id, options);
  let info = { page: 'watch' };
  try {
    info.player_response = findJSON('watch.html', 'player_response',
      body, /\bytInitialPlayerResponse\s*=\s*\{/i, '\n', '{');
  } catch (err) {
    let args = findJSON('watch.html', 'player_response', body, /\bytplayer\.config\s*=\s*{/, '</script>', '{');
    info.player_response = findPlayerResponse('watch.html', args);
  }
  info.response = findJSON('watch.html', 'response', body, /\bytInitialData("\])?\s*=\s*\{/i, '\n', '{');
  info.html5player = getHTML5player(body);
  return info;
};


const INFO_HOST = 'www.youtube.com';
const INFO_PATH = '/get_video_info';
const VIDEO_EURL = 'https://youtube.googleapis.com/v/';
const getVideoInfoPage = async(id, options) => {
  const url = new URL(`https://${INFO_HOST}${INFO_PATH}`);
  url.searchParams.set('video_id', id);
  url.searchParams.set('c', 'TVHTML5');
  url.searchParams.set('cver', '7.20190319');
  url.searchParams.set('eurl', VIDEO_EURL + id);
  url.searchParams.set('ps', 'default');
  url.searchParams.set('gl', 'US');
  url.searchParams.set('hl', options.lang || 'en');
  url.searchParams.set('html5', '1');
  const body = await utils.exposedMiniget(url.toString(), options).text();
  let info = querystring.parse(body);
  info.player_response = findPlayerResponse('get_video_info', info);
  return info;
};


/**
 * @param {Object} player_response
 * @returns {Array.<Object>}
 */
const parseFormats = player_response => {
  let formats = [];
  if (player_response && player_response.streamingData) {
    formats = formats
      .concat(player_response.streamingData.formats || [])
      .concat(player_response.streamingData.adaptiveFormats || []);
  }
  return formats;
};


/**
 * Gets info from a video additional formats and deciphered URLs.
 *
 * @param {string} id
 * @param {Object} options
 * @returns {Promise<Object>}
 */
exports.getInfo = async(id, options) => {
  let info = await exports.getBasicInfo(id, options);
  const hasManifest =
    info.player_response && info.player_response.streamingData && (
      info.player_response.streamingData.dashManifestUrl ||
      info.player_response.streamingData.hlsManifestUrl
    );
  let funcs = [];
  if (info.formats.length) {
    info.html5player = info.html5player ||
      getHTML5player(await getWatchHTMLPageBody(id, options)) || getHTML5player(await getEmbedPageBody(id, options));
    if (!info.html5player) {
      throw Error('Unable to find html5player file');
    }
    const html5player = new URL(info.html5player, BASE_URL).toString();
    funcs.push(sig.decipherFormats(info.formats, html5player, options));
  }
  if (hasManifest && info.player_response.streamingData.dashManifestUrl) {
    let url = info.player_response.streamingData.dashManifestUrl;
    funcs.push(getDashManifest(url, options));
  }
  if (hasManifest && info.player_response.streamingData.hlsManifestUrl) {
    let url = info.player_response.streamingData.hlsManifestUrl;
    funcs.push(getM3U8(url, options));
  }

  let results = await Promise.all(funcs);
  info.formats = Object.values(Object.assign({}, ...results));
  info.formats = info.formats.map(formatUtils.addFormatMeta);
  info.formats.sort(formatUtils.sortFormats);
  info.full = true;
  return info;
};


/**
 * Gets additional DASH formats.
 *
 * @param {string} url
 * @param {Object} options
 * @returns {Promise<Array.<Object>>}
 */
const getDashManifest = (url, options) => new Promise((resolve, reject) => {
  let formats = {};
  const parser = sax.parser(false);
  parser.onerror = reject;
  let adaptationSet;
  parser.onopentag = node => {
    if (node.name === 'ADAPTATIONSET') {
      adaptationSet = node.attributes;
    } else if (node.name === 'REPRESENTATION') {
      const itag = parseInt(node.attributes.ID);
      if (!isNaN(itag)) {
        formats[url] = Object.assign({
          itag, url,
          bitrate: parseInt(node.attributes.BANDWIDTH),
          mimeType: `${adaptationSet.MIMETYPE}; codecs="${node.attributes.CODECS}"`,
        }, node.attributes.HEIGHT ? {
          width: parseInt(node.attributes.WIDTH),
          height: parseInt(node.attributes.HEIGHT),
          fps: parseInt(node.attributes.FRAMERATE),
        } : {
          audioSampleRate: node.attributes.AUDIOSAMPLINGRATE,
        });
      }
    }
  };
  parser.onend = () => { resolve(formats); };
  const req = utils.exposedMiniget(new URL(url, BASE_URL).toString(), options);
  req.setEncoding('utf8');
  req.on('error', reject);
  req.on('data', chunk => { parser.write(chunk); });
  req.on('end', parser.close.bind(parser));
});


/**
 * Gets additional formats.
 *
 * @param {string} url
 * @param {Object} options
 * @returns {Promise<Array.<Object>>}
 */
const getM3U8 = async(url, options) => {
  url = new URL(url, BASE_URL);
  const body = await utils.exposedMiniget(url.toString(), options).text();
  let formats = {};
  body
    .split('\n')
    .filter(line => /^https?:\/\//.test(line))
    .forEach(line => {
      const itag = parseInt(line.match(/\/itag\/(\d+)\//)[1]);
      formats[line] = { itag, url: line };
    });
  return formats;
};


// Cache get info functions.
// In case a user wants to get a video's info before downloading.
for (let funcName of ['getBasicInfo', 'getInfo']) {
  /**
   * @param {string} link
   * @param {Object} options
   * @returns {Promise<Object>}
   */
  const func = exports[funcName];
  exports[funcName] = async(link, options = {}) => {
    utils.checkForUpdates();
    let id = await urlUtils.getVideoID(link);
    const key = [funcName, id, options.lang].join('-');
    return exports.cache.getOrSet(key, () => func(id, options));
  };
}


// Export a few helpers.
exports.validateID = urlUtils.validateID;
exports.validateURL = urlUtils.validateURL;
exports.getURLVideoID = urlUtils.getURLVideoID;
exports.getVideoID = urlUtils.getVideoID;


/***/ }),

/***/ 146:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

const querystring = __webpack_require__(673);
const Cache = __webpack_require__(442);
const utils = __webpack_require__(228);


// A shared cache to keep track of html5player.js tokens.
exports.cache = new Cache();


/**
 * Extract signature deciphering tokens from html5player file.
 *
 * @param {string} html5playerfile
 * @param {Object} options
 * @returns {Promise<Array.<string>>}
 */
exports.getTokens = (html5playerfile, options) => exports.cache.getOrSet(html5playerfile, async() => {
  const body = await utils.exposedMiniget(html5playerfile, options).text();
  const tokens = exports.extractActions(body);
  if (!tokens || !tokens.length) {
    throw Error('Could not extract signature deciphering actions');
  }
  exports.cache.set(html5playerfile, tokens);
  return tokens;
});


/**
 * Decipher a signature based on action tokens.
 *
 * @param {Array.<string>} tokens
 * @param {string} sig
 * @returns {string}
 */
exports.decipher = (tokens, sig) => {
  sig = sig.split('');
  for (let i = 0, len = tokens.length; i < len; i++) {
    let token = tokens[i], pos;
    switch (token[0]) {
      case 'r':
        sig = sig.reverse();
        break;
      case 'w':
        pos = ~~token.slice(1);
        sig = swapHeadAndPosition(sig, pos);
        break;
      case 's':
        pos = ~~token.slice(1);
        sig = sig.slice(pos);
        break;
      case 'p':
        pos = ~~token.slice(1);
        sig.splice(0, pos);
        break;
    }
  }
  return sig.join('');
};


/**
 * Swaps the first element of an array with one of given position.
 *
 * @param {Array.<Object>} arr
 * @param {number} position
 * @returns {Array.<Object>}
 */
const swapHeadAndPosition = (arr, position) => {
  const first = arr[0];
  arr[0] = arr[position % arr.length];
  arr[position] = first;
  return arr;
};


const jsVarStr = '[a-zA-Z_\\$][a-zA-Z_0-9]*';
const jsSingleQuoteStr = `'[^'\\\\]*(:?\\\\[\\s\\S][^'\\\\]*)*'`;
const jsDoubleQuoteStr = `"[^"\\\\]*(:?\\\\[\\s\\S][^"\\\\]*)*"`;
const jsQuoteStr = `(?:${jsSingleQuoteStr}|${jsDoubleQuoteStr})`;
const jsKeyStr = `(?:${jsVarStr}|${jsQuoteStr})`;
const jsPropStr = `(?:\\.${jsVarStr}|\\[${jsQuoteStr}\\])`;
const jsEmptyStr = `(?:''|"")`;
const reverseStr = ':function\\(a\\)\\{' +
  '(?:return )?a\\.reverse\\(\\)' +
'\\}';
const sliceStr = ':function\\(a,b\\)\\{' +
  'return a\\.slice\\(b\\)' +
'\\}';
const spliceStr = ':function\\(a,b\\)\\{' +
  'a\\.splice\\(0,b\\)' +
'\\}';
const swapStr = ':function\\(a,b\\)\\{' +
  'var c=a\\[0\\];a\\[0\\]=a\\[b(?:%a\\.length)?\\];a\\[b(?:%a\\.length)?\\]=c(?:;return a)?' +
'\\}';
const actionsObjRegexp = new RegExp(
  `var (${jsVarStr})=\\{((?:(?:${
    jsKeyStr}${reverseStr}|${
    jsKeyStr}${sliceStr}|${
    jsKeyStr}${spliceStr}|${
    jsKeyStr}${swapStr
  }),?\\r?\\n?)+)\\};`);
const actionsFuncRegexp = new RegExp(`${`function(?: ${jsVarStr})?\\(a\\)\\{` +
    `a=a\\.split\\(${jsEmptyStr}\\);\\s*` +
    `((?:(?:a=)?${jsVarStr}`}${
  jsPropStr
}\\(a,\\d+\\);)+)` +
    `return a\\.join\\(${jsEmptyStr}\\)` +
  `\\}`);
const reverseRegexp = new RegExp(`(?:^|,)(${jsKeyStr})${reverseStr}`, 'm');
const sliceRegexp = new RegExp(`(?:^|,)(${jsKeyStr})${sliceStr}`, 'm');
const spliceRegexp = new RegExp(`(?:^|,)(${jsKeyStr})${spliceStr}`, 'm');
const swapRegexp = new RegExp(`(?:^|,)(${jsKeyStr})${swapStr}`, 'm');


/**
 * Extracts the actions that should be taken to decipher a signature.
 *
 * This searches for a function that performs string manipulations on
 * the signature. We already know what the 3 possible changes to a signature
 * are in order to decipher it. There is
 *
 * * Reversing the string.
 * * Removing a number of characters from the beginning.
 * * Swapping the first character with another position.
 *
 * Note, `Array#slice()` used to be used instead of `Array#splice()`,
 * it's kept in case we encounter any older html5player files.
 *
 * After retrieving the function that does this, we can see what actions
 * it takes on a signature.
 *
 * @param {string} body
 * @returns {Array.<string>}
 */
exports.extractActions = body => {
  const objResult = actionsObjRegexp.exec(body);
  const funcResult = actionsFuncRegexp.exec(body);
  if (!objResult || !funcResult) { return null; }

  const obj = objResult[1].replace(/\$/g, '\\$');
  const objBody = objResult[2].replace(/\$/g, '\\$');
  const funcBody = funcResult[1].replace(/\$/g, '\\$');

  let result = reverseRegexp.exec(objBody);
  const reverseKey = result && result[1]
    .replace(/\$/g, '\\$')
    .replace(/\$|^'|^"|'$|"$/g, '');
  result = sliceRegexp.exec(objBody);
  const sliceKey = result && result[1]
    .replace(/\$/g, '\\$')
    .replace(/\$|^'|^"|'$|"$/g, '');
  result = spliceRegexp.exec(objBody);
  const spliceKey = result && result[1]
    .replace(/\$/g, '\\$')
    .replace(/\$|^'|^"|'$|"$/g, '');
  result = swapRegexp.exec(objBody);
  const swapKey = result && result[1]
    .replace(/\$/g, '\\$')
    .replace(/\$|^'|^"|'$|"$/g, '');

  const keys = `(${[reverseKey, sliceKey, spliceKey, swapKey].join('|')})`;
  const myreg = `(?:a=)?${obj
  }(?:\\.${keys}|\\['${keys}'\\]|\\["${keys}"\\])` +
    `\\(a,(\\d+)\\)`;
  const tokenizeRegexp = new RegExp(myreg, 'g');
  const tokens = [];
  while ((result = tokenizeRegexp.exec(funcBody)) !== null) {
    let key = result[1] || result[2] || result[3];
    switch (key) {
      case swapKey:
        tokens.push(`w${result[4]}`);
        break;
      case reverseKey:
        tokens.push('r');
        break;
      case sliceKey:
        tokens.push(`s${result[4]}`);
        break;
      case spliceKey:
        tokens.push(`p${result[4]}`);
        break;
    }
  }
  return tokens;
};


/**
 * @param {Object} format
 * @param {string} sig
 */
exports.setDownloadURL = (format, sig) => {
  let decodedUrl;
  if (format.url) {
    decodedUrl = format.url;
  } else {
    return;
  }

  try {
    decodedUrl = decodeURIComponent(decodedUrl);
  } catch (err) {
    return;
  }

  // Make some adjustments to the final url.
  const parsedUrl = new URL(decodedUrl);

  // This is needed for a speedier download.
  // See https://github.com/fent/node-ytdl-core/issues/127
  parsedUrl.searchParams.set('ratebypass', 'yes');

  if (sig) {
    // When YouTube provides a `sp` parameter the signature `sig` must go
    // into the parameter it specifies.
    // See https://github.com/fent/node-ytdl-core/issues/417
    parsedUrl.searchParams.set(format.sp || 'signature', sig);
  }

  format.url = parsedUrl.toString();
};


/**
 * Applies `sig.decipher()` to all format URL's.
 *
 * @param {Array.<Object>} formats
 * @param {string} html5player
 * @param {Object} options
 */
exports.decipherFormats = async(formats, html5player, options) => {
  let decipheredFormats = {};
  let tokens = await exports.getTokens(html5player, options);
  formats.forEach(format => {
    let cipher = format.signatureCipher || format.cipher;
    if (cipher) {
      Object.assign(format, querystring.parse(cipher));
      delete format.signatureCipher;
      delete format.cipher;
    }
    const sig = tokens && format.s ? exports.decipher(tokens, format.s) : null;
    exports.setDownloadURL(format, sig);
    decipheredFormats[format.url] = format;
  });
  return decipheredFormats;
};


/***/ }),

/***/ 319:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Get video ID.
 *
 * There are a few type of video URL formats.
 *  - https://www.youtube.com/watch?v=VIDEO_ID
 *  - https://m.youtube.com/watch?v=VIDEO_ID
 *  - https://youtu.be/VIDEO_ID
 *  - https://www.youtube.com/v/VIDEO_ID
 *  - https://www.youtube.com/embed/VIDEO_ID
 *  - https://music.youtube.com/watch?v=VIDEO_ID
 *  - https://gaming.youtube.com/watch?v=VIDEO_ID
 *
 * @param {string} link
 * @return {string}
 * @throws {Error} If unable to find a id
 * @throws {TypeError} If videoid doesn't match specs
 */
const validQueryDomains = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'gaming.youtube.com',
]);
const validPathDomains = /^https?:\/\/(youtu\.be\/|(www\.)?youtube.com\/(embed|v|shorts)\/)/;
exports.getURLVideoID = link => {
  const parsed = new URL(link);
  let id = parsed.searchParams.get('v');
  if (validPathDomains.test(link) && !id) {
    const paths = parsed.pathname.split('/');
    id = paths[paths.length - 1];
  } else if (parsed.hostname && !validQueryDomains.has(parsed.hostname)) {
    throw Error('Not a YouTube domain');
  }
  if (!id) {
    throw Error(`No video id found: ${link}`);
  }
  id = id.substring(0, 11);
  if (!exports.validateID(id)) {
    throw TypeError(`Video id (${id}) does not match expected ` +
      `format (${idRegex.toString()})`);
  }
  return id;
};


/**
 * Gets video ID either from a url or by checking if the given string
 * matches the video ID format.
 *
 * @param {string} str
 * @returns {string}
 * @throws {Error} If unable to find a id
 * @throws {TypeError} If videoid doesn't match specs
 */
const urlRegex = /^https?:\/\//;
exports.getVideoID = str => {
  if (exports.validateID(str)) {
    return str;
  } else if (urlRegex.test(str)) {
    return exports.getURLVideoID(str);
  } else {
    throw Error(`No video id found: ${str}`);
  }
};


/**
 * Returns true if given id satifies YouTube's id format.
 *
 * @param {string} id
 * @return {boolean}
 */
const idRegex = /^[a-zA-Z0-9-_]{11}$/;
exports.validateID = id => idRegex.test(id);


/**
 * Checks wether the input string includes a valid id.
 *
 * @param {string} string
 * @returns {boolean}
 */
exports.validateURL = string => {
  try {
    exports.getURLVideoID(string);
    return true;
  } catch (e) {
    return false;
  }
};


/***/ }),

/***/ 228:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(429);
const miniget = __webpack_require__(83);


/**
 * Extract string inbetween another.
 *
 * @param {string} haystack
 * @param {string} left
 * @param {string} right
 * @returns {string}
 */
exports.between = (haystack, left, right) => {
  let pos;
  if (left instanceof RegExp) {
    const match = haystack.match(left);
    if (!match) { return ''; }
    pos = match.index + match[0].length;
  } else {
    pos = haystack.indexOf(left);
    if (pos === -1) { return ''; }
    pos += left.length;
  }
  haystack = haystack.slice(pos);
  pos = haystack.indexOf(right);
  if (pos === -1) { return ''; }
  haystack = haystack.slice(0, pos);
  return haystack;
};


/**
 * Get a number from an abbreviated number string.
 *
 * @param {string} string
 * @returns {number}
 */
exports.parseAbbreviatedNumber = string => {
  const match = string
    .replace(',', '.')
    .replace(' ', '')
    .match(/([\d,.]+)([MK]?)/);
  if (match) {
    let [, num, multi] = match;
    num = parseFloat(num);
    return Math.round(multi === 'M' ? num * 1000000 :
      multi === 'K' ? num * 1000 : num);
  }
  return null;
};


/**
 * Match begin and end braces of input JSON, return only json
 *
 * @param {string} mixedJson
 * @returns {string}
*/
exports.cutAfterJSON = mixedJson => {
  let open, close;
  if (mixedJson[0] === '[') {
    open = '[';
    close = ']';
  } else if (mixedJson[0] === '{') {
    open = '{';
    close = '}';
  }

  if (!open) {
    throw new Error(`Can't cut unsupported JSON (need to begin with [ or { ) but got: ${mixedJson[0]}`);
  }

  // States if the loop is currently in a string
  let isString = false;

  // States if the current character is treated as escaped or not
  let isEscaped = false;

  // Current open brackets to be closed
  let counter = 0;

  let i;
  for (i = 0; i < mixedJson.length; i++) {
    // Toggle the isString boolean when leaving/entering string
    if (mixedJson[i] === '"' && !isEscaped) {
      isString = !isString;
      continue;
    }

    // Toggle the isEscaped boolean for every backslash
    // Reset for every regular character
    isEscaped = mixedJson[i] === '\\' && !isEscaped;

    if (isString) continue;

    if (mixedJson[i] === open) {
      counter++;
    } else if (mixedJson[i] === close) {
      counter--;
    }

    // All brackets have been closed, thus end of JSON is reached
    if (counter === 0) {
      // Return the cut JSON
      return mixedJson.substr(0, i + 1);
    }
  }

  // We ran through the whole string and ended up with an unclosed bracket
  throw Error("Can't cut unsupported JSON (no matching closing bracket found)");
};


/**
 * Checks if there is a playability error.
 *
 * @param {Object} player_response
 * @param {Array.<string>} statuses
 * @param {Error} ErrorType
 * @returns {!Error}
 */
exports.playError = (player_response, statuses, ErrorType = Error) => {
  let playability = player_response && player_response.playabilityStatus;
  if (playability && statuses.includes(playability.status)) {
    return new ErrorType(playability.reason || (playability.messages && playability.messages[0]));
  }
  return null;
};

/**
 * Does a miniget request and calls options.requestCallback if present
 *
 * @param {string} url the request url
 * @param {Object} options an object with optional requestOptions and requestCallback parameters
 * @param {Object} requestOptionsOverwrite overwrite of options.requestOptions
 * @returns {miniget.Stream}
 */
exports.exposedMiniget = (url, options = {}, requestOptionsOverwrite) => {
  const req = miniget(url, requestOptionsOverwrite || options.requestOptions);
  if (typeof options.requestCallback === 'function') options.requestCallback(req);
  return req;
};

/**
 * Temporary helper to help deprecating a few properties.
 *
 * @param {Object} obj
 * @param {string} prop
 * @param {Object} value
 * @param {string} oldPath
 * @param {string} newPath
 */
exports.deprecate = (obj, prop, value, oldPath, newPath) => {
  Object.defineProperty(obj, prop, {
    get: () => {
      console.warn(`\`${oldPath}\` will be removed in a near future release, ` +
        `use \`${newPath}\` instead.`);
      return value;
    },
  });
};


// Check for updates.
const pkg = __webpack_require__(573);
const UPDATE_INTERVAL = 1000 * 60 * 60 * 12;
exports.lastUpdateCheck = 0;
exports.checkForUpdates = () => {
  if (!process.env.YTDL_NO_UPDATE && !pkg.version.startsWith('0.0.0-') &&
    Date.now() - exports.lastUpdateCheck >= UPDATE_INTERVAL) {
    exports.lastUpdateCheck = Date.now();
    return miniget('https://api.github.com/repos/fent/node-ytdl-core/releases/latest', {
      headers: { 'User-Agent': 'ytdl-core' },
    }).text().then(response => {
      if (JSON.parse(response).tag_name !== `v${pkg.version}`) {
        console.warn("\u001b[33mWARNING:\u001b[0m react-native-ytdl is out of date! If the latest port is available, update with \"npm install react-native-ytdl@latest\".");
      }
    }, err => {
      console.warn('Error checking for updates:', err.message);
      console.warn('You can disable this check by setting the `YTDL_NO_UPDATE` env variable.');
    });
  }
  return null;
};


/***/ }),

/***/ 573:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse("{\"_from\":\"github:benkaiser/react-native-ytdl\",\"_id\":\"react-native-ytdl@4.8.2\",\"_inBundle\":false,\"_integrity\":\"\",\"_location\":\"/react-native-ytdl\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"git\",\"raw\":\"github:benkaiser/react-native-ytdl\",\"rawSpec\":\"github:benkaiser/react-native-ytdl\",\"saveSpec\":\"github:benkaiser/react-native-ytdl\",\"fetchSpec\":null,\"gitCommittish\":null},\"_requiredBy\":[\"#USER\",\"/\"],\"_resolved\":\"github:benkaiser/react-native-ytdl#f860f6d90d063d67bcedf2cd0490304c2a375e1b\",\"_spec\":\"github:benkaiser/react-native-ytdl\",\"_where\":\"/Users/benkaiser/git/Stretto-Helper-Extension\",\"author\":{\"name\":\"Abel Tesfaye\"},\"bugs\":{\"url\":\"https://github.com/ytdl-js/react-native-ytdl/issues\"},\"bundleDependencies\":false,\"dependencies\":{\"querystring\":\"^0.2.1\",\"url\":\"~0.10.1\",\"whatwg-url-without-unicode\":\"^8.0.0-3\"},\"deprecated\":false,\"description\":\"YouTube video and audio stream extractor for react native.\",\"homepage\":\"https://github.com/ytdl-js/react-native-ytdl#readme\",\"keywords\":[\"react\",\"native\",\"youtube\",\"downloader\",\"audio\",\"video\",\"stream\",\"extractor\",\"ytdl\"],\"license\":\"ISC\",\"main\":\"index.js\",\"name\":\"react-native-ytdl\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/ytdl-js/react-native-ytdl.git\"},\"scripts\":{\"apply-patches\":\"./__AUTO_PATCHER__/shell_scripts/apply_custom_implementations_to_temp_dir.sh\",\"clean-temp\":\"./__AUTO_PATCHER__/shell_scripts/clean_temp_dir.sh\",\"clone-and-patch\":\"npm run clone-node-ytdl-core && npm run apply-patches && npm run copy-to-project-root && npm run copy-to-test-app && npm run clean-temp\",\"clone-node-ytdl-core\":\"./__AUTO_PATCHER__/shell_scripts/clone_node_ytdl_core_to_temp_dir.sh\",\"copy-to-project-root\":\"./__AUTO_PATCHER__/shell_scripts/copy_patches_from_temp_dir_to_project_root.sh\",\"copy-to-test-app\":\"./__AUTO_PATCHER__/shell_scripts/copy_patches_and_package_json_from_temp_dir_to_test_app.sh\",\"test\":\"echo \\\"Error: no test specified\\\" && exit 1\"},\"version\":\"4.8.2\"}");

/***/ }),

/***/ 136:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
// @ts-ignore
const react_native_ytdl_1 = __importDefault(__webpack_require__(866));
chrome.runtime.onMessageExternal.addListener((message, _, sendResponse) => {
    if (message && message.type === 'YOUTUBE_AUDIO_FETCH') {
        react_native_ytdl_1.default.getInfo(message.payload).then((info) => {
            let format = react_native_ytdl_1.default.chooseFormat(info.formats, { quality: 'highestaudio' });
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
function isThisExtension(initiator) {
    return initiator === `chrome-extension://${chrome.runtime.id}`;
}
const requestOriginMap = {};
const onBeforeSendHeaders = (request) => {
    const requestHeaders = request.requestHeaders;
    if (isThisExtension(request.initiator)) {
        for (var i = 0; i < requestHeaders.length; ++i) {
            if (requestHeaders[i].name === 'User-Agent') {
                // drop mobile user-agent detection
                requestHeaders[i].value = requestHeaders[i].value.replace('Android', '').replace('Mobile', '');
            }
            if (requestHeaders[i].name.toLowerCase() === 'x-youtube-identity-token') {
                // drop mobile user-agent detection
                requestHeaders[i].value = requestHeaders[i].value.replace('\\u003d', '=');
            }
        }
    }
    else if (request.url.includes('https://www.youtube.com/') || request.url.includes('https://soundcloud.com/')) {
        for (var i = 0; i < requestHeaders.length; ++i) {
            if (requestHeaders[i].name === 'User-Agent') {
                // drop mobile user-agent detection
                requestHeaders[i].value = requestHeaders[i].value.replace('Android', '').replace('Mobile', '');
            }
        }
    }
    return { requestHeaders };
};
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
    chrome.webRequest.onBeforeSendHeaders.removeListener(onBeforeSendHeaders);
    chrome.webRequest.onHeadersReceived.removeListener(onHeadersReceived);
};
const install = () => {
    remove();
    chrome.webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeaders, { urls: ['<all_urls>'] }, ['blocking', 'requestHeaders']);
    const headersRecievedOptions = ['blocking', 'responseHeaders'];
    if (!navigator.userAgent.includes('Android')) {
        headersRecievedOptions.push('extraHeaders');
    }
    chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, {
        urls: ['<all_urls>']
    }, headersRecievedOptions);
};
install();


/***/ }),

/***/ 429:
/***/ ((module) => {

"use strict";

module.exports = {
    env: {
        YTDL_NO_UPDATE: true
    }
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_require__(136);
/******/ })()
;