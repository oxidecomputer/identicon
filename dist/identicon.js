var B = { exports: {} }, T = { exports: {} };
(function() {
  var h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = {
    rotl: function(u, c) {
      return u << c | u >>> 32 - c;
    },
    rotr: function(u, c) {
      return u << 32 - c | u >>> c;
    },
    endian: function(u) {
      if (u.constructor == Number)
        return a.rotl(u, 8) & 16711935 | a.rotl(u, 24) & 4278255360;
      for (var c = 0; c < u.length; c++)
        u[c] = a.endian(u[c]);
      return u;
    },
    randomBytes: function(u) {
      for (var c = []; u > 0; u--)
        c.push(Math.floor(Math.random() * 256));
      return c;
    },
    bytesToWords: function(u) {
      for (var c = [], i = 0, l = 0; i < u.length; i++, l += 8)
        c[l >>> 5] |= u[i] << 24 - l % 32;
      return c;
    },
    wordsToBytes: function(u) {
      for (var c = [], i = 0; i < u.length * 32; i += 8)
        c.push(u[i >>> 5] >>> 24 - i % 32 & 255);
      return c;
    },
    bytesToHex: function(u) {
      for (var c = [], i = 0; i < u.length; i++)
        c.push((u[i] >>> 4).toString(16)), c.push((u[i] & 15).toString(16));
      return c.join("");
    },
    hexToBytes: function(u) {
      for (var c = [], i = 0; i < u.length; i += 2)
        c.push(parseInt(u.substr(i, 2), 16));
      return c;
    },
    bytesToBase64: function(u) {
      for (var c = [], i = 0; i < u.length; i += 3)
        for (var l = u[i] << 16 | u[i + 1] << 8 | u[i + 2], s = 0; s < 4; s++)
          i * 8 + s * 6 <= u.length * 8 ? c.push(h.charAt(l >>> 6 * (3 - s) & 63)) : c.push("=");
      return c.join("");
    },
    base64ToBytes: function(u) {
      u = u.replace(/[^A-Z0-9+\/]/ig, "");
      for (var c = [], i = 0, l = 0; i < u.length; l = ++i % 4)
        l != 0 && c.push((h.indexOf(u.charAt(i - 1)) & Math.pow(2, -2 * l + 8) - 1) << l * 2 | h.indexOf(u.charAt(i)) >>> 6 - l * 2);
      return c;
    }
  };
  T.exports = a;
})();
var d = {
  utf8: {
    stringToBytes: function(h) {
      return d.bin.stringToBytes(unescape(encodeURIComponent(h)));
    },
    bytesToString: function(h) {
      return decodeURIComponent(escape(d.bin.bytesToString(h)));
    }
  },
  bin: {
    stringToBytes: function(h) {
      for (var a = [], u = 0; u < h.length; u++)
        a.push(h.charCodeAt(u) & 255);
      return a;
    },
    bytesToString: function(h) {
      for (var a = [], u = 0; u < h.length; u++)
        a.push(String.fromCharCode(h[u]));
      return a.join("");
    }
  }
}, F = d;
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var I = function(h) {
  return h != null && (S(h) || H(h) || !!h._isBuffer);
};
function S(h) {
  return !!h.constructor && typeof h.constructor.isBuffer == "function" && h.constructor.isBuffer(h);
}
function H(h) {
  return typeof h.readFloatLE == "function" && typeof h.slice == "function" && S(h.slice(0, 0));
}
(function() {
  var h = T.exports, a = F.utf8, u = I, c = F.bin, i = function(l, s) {
    l.constructor == String ? s && s.encoding === "binary" ? l = c.stringToBytes(l) : l = a.stringToBytes(l) : u(l) ? l = Array.prototype.slice.call(l, 0) : !Array.isArray(l) && l.constructor !== Uint8Array && (l = l.toString());
    for (var e = h.bytesToWords(l), y = l.length * 8, n = 1732584193, r = -271733879, o = -1732584194, t = 271733878, f = 0; f < e.length; f++)
      e[f] = (e[f] << 8 | e[f] >>> 24) & 16711935 | (e[f] << 24 | e[f] >>> 8) & 4278255360;
    e[y >>> 5] |= 128 << y % 32, e[(y + 64 >>> 9 << 4) + 14] = y;
    for (var g = i._ff, v = i._gg, p = i._hh, x = i._ii, f = 0; f < e.length; f += 16) {
      var _ = n, w = r, A = o, C = t;
      n = g(n, r, o, t, e[f + 0], 7, -680876936), t = g(t, n, r, o, e[f + 1], 12, -389564586), o = g(o, t, n, r, e[f + 2], 17, 606105819), r = g(r, o, t, n, e[f + 3], 22, -1044525330), n = g(n, r, o, t, e[f + 4], 7, -176418897), t = g(t, n, r, o, e[f + 5], 12, 1200080426), o = g(o, t, n, r, e[f + 6], 17, -1473231341), r = g(r, o, t, n, e[f + 7], 22, -45705983), n = g(n, r, o, t, e[f + 8], 7, 1770035416), t = g(t, n, r, o, e[f + 9], 12, -1958414417), o = g(o, t, n, r, e[f + 10], 17, -42063), r = g(r, o, t, n, e[f + 11], 22, -1990404162), n = g(n, r, o, t, e[f + 12], 7, 1804603682), t = g(t, n, r, o, e[f + 13], 12, -40341101), o = g(o, t, n, r, e[f + 14], 17, -1502002290), r = g(r, o, t, n, e[f + 15], 22, 1236535329), n = v(n, r, o, t, e[f + 1], 5, -165796510), t = v(t, n, r, o, e[f + 6], 9, -1069501632), o = v(o, t, n, r, e[f + 11], 14, 643717713), r = v(r, o, t, n, e[f + 0], 20, -373897302), n = v(n, r, o, t, e[f + 5], 5, -701558691), t = v(t, n, r, o, e[f + 10], 9, 38016083), o = v(o, t, n, r, e[f + 15], 14, -660478335), r = v(r, o, t, n, e[f + 4], 20, -405537848), n = v(n, r, o, t, e[f + 9], 5, 568446438), t = v(t, n, r, o, e[f + 14], 9, -1019803690), o = v(o, t, n, r, e[f + 3], 14, -187363961), r = v(r, o, t, n, e[f + 8], 20, 1163531501), n = v(n, r, o, t, e[f + 13], 5, -1444681467), t = v(t, n, r, o, e[f + 2], 9, -51403784), o = v(o, t, n, r, e[f + 7], 14, 1735328473), r = v(r, o, t, n, e[f + 12], 20, -1926607734), n = p(n, r, o, t, e[f + 5], 4, -378558), t = p(t, n, r, o, e[f + 8], 11, -2022574463), o = p(o, t, n, r, e[f + 11], 16, 1839030562), r = p(r, o, t, n, e[f + 14], 23, -35309556), n = p(n, r, o, t, e[f + 1], 4, -1530992060), t = p(t, n, r, o, e[f + 4], 11, 1272893353), o = p(o, t, n, r, e[f + 7], 16, -155497632), r = p(r, o, t, n, e[f + 10], 23, -1094730640), n = p(n, r, o, t, e[f + 13], 4, 681279174), t = p(t, n, r, o, e[f + 0], 11, -358537222), o = p(o, t, n, r, e[f + 3], 16, -722521979), r = p(r, o, t, n, e[f + 6], 23, 76029189), n = p(n, r, o, t, e[f + 9], 4, -640364487), t = p(t, n, r, o, e[f + 12], 11, -421815835), o = p(o, t, n, r, e[f + 15], 16, 530742520), r = p(r, o, t, n, e[f + 2], 23, -995338651), n = x(n, r, o, t, e[f + 0], 6, -198630844), t = x(t, n, r, o, e[f + 7], 10, 1126891415), o = x(o, t, n, r, e[f + 14], 15, -1416354905), r = x(r, o, t, n, e[f + 5], 21, -57434055), n = x(n, r, o, t, e[f + 12], 6, 1700485571), t = x(t, n, r, o, e[f + 3], 10, -1894986606), o = x(o, t, n, r, e[f + 10], 15, -1051523), r = x(r, o, t, n, e[f + 1], 21, -2054922799), n = x(n, r, o, t, e[f + 8], 6, 1873313359), t = x(t, n, r, o, e[f + 15], 10, -30611744), o = x(o, t, n, r, e[f + 6], 15, -1560198380), r = x(r, o, t, n, e[f + 13], 21, 1309151649), n = x(n, r, o, t, e[f + 4], 6, -145523070), t = x(t, n, r, o, e[f + 11], 10, -1120210379), o = x(o, t, n, r, e[f + 2], 15, 718787259), r = x(r, o, t, n, e[f + 9], 21, -343485551), n = n + _ >>> 0, r = r + w >>> 0, o = o + A >>> 0, t = t + C >>> 0;
    }
    return h.endian([n, r, o, t]);
  };
  i._ff = function(l, s, e, y, n, r, o) {
    var t = l + (s & e | ~s & y) + (n >>> 0) + o;
    return (t << r | t >>> 32 - r) + s;
  }, i._gg = function(l, s, e, y, n, r, o) {
    var t = l + (s & y | e & ~y) + (n >>> 0) + o;
    return (t << r | t >>> 32 - r) + s;
  }, i._hh = function(l, s, e, y, n, r, o) {
    var t = l + (s ^ e ^ y) + (n >>> 0) + o;
    return (t << r | t >>> 32 - r) + s;
  }, i._ii = function(l, s, e, y, n, r, o) {
    var t = l + (e ^ (s | ~y)) + (n >>> 0) + o;
    return (t << r | t >>> 32 - r) + s;
  }, i._blocksize = 16, i._digestsize = 16, B.exports = function(l, s) {
    if (l == null)
      throw new Error("Illegal argument " + l);
    var e = h.wordsToBytes(i(l, s));
    return s && s.asBytes ? e : s && s.asString ? c.bytesToString(e) : h.bytesToHex(e);
  };
})();
const P = () => {
  const h = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let u = "", c = 0;
  for (let i = 1; i <= 24; i++)
    u += h.substring(c = Math.floor(Math.random() * h.length), c + 1);
  return B.exports(u);
}, U = (h) => {
  const a = M(h);
  return E(a);
}, M = (h) => {
  let a = [];
  for (let u = 0; u < 18; u++) {
    const c = h.charCodeAt(u) % 2 === 0;
    u < 3 ? (a.push({ x: 2, y: u, isPixel: c }), a.push({ x: 3, y: u, isPixel: c })) : u < 6 ? (a.push({ x: 1, y: u - 3, isPixel: c }), a.push({ x: 4, y: u - 3, isPixel: c })) : u < 9 && (a.push({ x: 0, y: u - 6, isPixel: c }), a.push({ x: 5, y: u - 6, isPixel: c }));
  }
  return a;
}, E = (h) => {
  let a = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <g style="fill: currentColor">`;
  return h.forEach((u) => {
    !u.isPixel || (a += `<rect x="${u.x * 3 + 2 * u.x}" y="${u.y * 8 + 2 * u.y}" width="3" height="8"/>
    `);
  }), a += `</g>
  </svg>`, a;
};
export {
  U as generateIdenticon,
  P as randomHash
};
