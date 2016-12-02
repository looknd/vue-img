(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.VueImg = factory());
}(this, (function () { 'use strict';

var VueImg$1 = Object.create(null);

// Check webP support
VueImg$1.canWebp = false;
var img = new Image();
img.onload = function () { VueImg$1.canWebp = true; };
img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==';

// Default cdn prefix
var protocol = location.protocol === 'https:' ? 'https://' : 'http://';
var env = document.domain.match(/.(alpha|beta).ele(net)?.me$/);
VueImg$1.cdn = protocol + (env ? ("fuss" + (env[0])) : 'fuss10.elemecdn.com');

// Translate hash to path
var hashToPath = function (hash) { return hash.replace(/^(\w)(\w\w)(\w{29}(\w*))$/, '/$1/$2/$3.$4'); };

// Get image size
var getSize = function (width, height) {
  var thumb = 'thumbnail/';
  var cover = width + "x" + height;

  if (width && height) { return (thumb + "!" + cover + "r/gravity/Center/crop/" + cover + "/") }
  if (width) { return ("" + thumb + width + "x/") }
  if (height) { return (thumb + "x" + height + "/") }
  return ''
};

// Get image size
var getSrc = function (ref) {
  if ( ref === void 0 ) ref = {};
  var hash = ref.hash;
  var width = ref.width;
  var height = ref.height;
  var prefix = ref.prefix;
  var suffix = ref.suffix;
  var quality = ref.quality;

  if (!hash || typeof hash !== 'string') { return '' }

  var _prefix = typeof prefix === 'string' ? prefix : VueImg$1.cdn;
  var _suffix = typeof suffix === 'string' ? suffix : '';
  var _quality = typeof quality === 'number' ? ("quality/" + quality + "/") : '';
  var _format = VueImg$1.canWebp ? 'format/webp/' : '';
  var params = "" + _quality + _format + (getSize(width, height)) + _suffix;

  return _prefix + hashToPath(hash) + (params ? ("?imageMogr/" + params) : '')
};

// Set img.src or element.style.backgroundImage
var setAttr = function (el, src, tag) {
  tag === 'img' ? el.src = src : el.style.backgroundImage = "url('" + src + "')";
};

// If value is an object, `binding.oldValue === binding.value`
var checkAttr = function (el, src, tag) {
  if (tag === 'img') { return el.src === src }
  var re = /^url\(['"]?(.*?)['"]?\)$/;
  var result = el.style.backgroundImage.match(re);
  return result && result[1] === src
};

// Vue plugin installer
var install = function (Vue, opt) {
  if ( opt === void 0 ) opt = {};


  var updateCallback = function (el, binding, vnode) {
    var params = binding.value;
    var hash = Object.prototype.toString.call(params).slice(8, -1) === 'Object' ? params.hash : params;
    if (!hash || typeof hash !== 'string') { return }

    var src = getSrc({
      hash: hash,
      width: params.width,
      height: params.height,
      prefix: opt.prefix,
      suffix: params.suffix,
      quality: params.hasOwnProperty('quality') ? params.quality : opt.quality
    });
    if (checkAttr(el, src, vnode.tag)) { return }

    var img = new Image();

    img.onload = function () {
      setAttr(el, src, vnode.tag);
    };

    var error = params.hasOwnProperty('error') ? params.error : opt.error;
    if (error && typeof error === 'string') {
      var errSrc = getSrc({
        hash: error,
        width: params.width,
        height: params.height,
        prefix: opt.prefix
      });

      img.onerror = function () {
        setAttr(el, errSrc, vnode.tag);
      };
    }

    img.src = src;
  };

  // Register Vue directive
  Vue.directive('img', {
    bind: function bind(el, binding, vnode) {
      var params = binding.value || {};
      var loading = params.hasOwnProperty('loading') ? params.loading : opt.loading;
      var src = getSrc({
        hash: loading,
        width: params.width,
        height: params.height,
        prefix: opt.prefix
      });

      if (src) { setAttr(el, src, vnode.tag); }

      updateCallback(el, binding, vnode);
    },

    update: updateCallback
  });

};

VueImg$1.getSrc = getSrc;
VueImg$1.install = install;

return VueImg$1;

})));
