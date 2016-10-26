(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.VueImg = global.VueImg || {})));
}(this, (function (exports) { 'use strict';

// Check webP support
exports.canWebp = false;

var img = new Image();
img.onload = function () { exports.canWebp = true; };
img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==';

// Default cdn prefix
var protocol = location.protocol === 'https:' ? 'https://' : 'http://';
var env = document.domain.match(/.(alpha|beta).elenet.me$/);
var cdn = protocol + (env ? ("fuss" + (env[0])) : 'fuss10.elemecdn.com');

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

  var isValid = typeof hash === 'string' && hash.length;
  if (!isValid) { return '' }

  var _prefix = typeof prefix === 'string' ? prefix : cdn;
  var _suffix = typeof suffix === 'string' ? suffix : '';
  var _quality = typeof quality === 'number' ? ("quality/" + quality + "/") : '';
  var _format = exports.canWebp ? 'format/webp/' : '';
  var params = "" + _quality + _format + (getSize(width, height)) + _suffix;

  return _prefix + hashToPath(hash) + (params ? ("?imageMogr/" + params) : '')
};

// Set img.src or element.style.backgroundImage
var setAttr = function (el, src, tag) {
  tag === 'img' ? el.src = src : el.style.backgroundImage = "url('" + src + "')";
};

// Vue plugin installer
var install = function (Vue, opt) {
  if ( opt === void 0 ) opt = {};


  // Get src wrapper
  var getImageSrc = function (ref) {
    var hash = ref.hash;
    var width = ref.width;
    var height = ref.height;
    var suffix = ref.suffix;

    return getSrc({
    hash: hash,
    width: width,
    height: height,
    suffix: suffix,
    prefix: opt.prefix,
    quality: opt.quality
  });
  };

  // Set loading image
  var bind = function (el, binding, vnode) {
    var params = binding.value;
    var src = getImageSrc({
      hash: params.loading || opt.loading,
      width: params.width,
      height: params.height
    });

    setAttr(el, src, vnode.tag);
  };

  // Hash change callback
  var update = function (el, binding, vnode) {
    var params = binding.value;
    if (!params.hash || binding.oldValue && binding.oldValue.hash === params.hash) { return }

    var img = new Image();
    var src = getImageSrc(params);
    var err = params.error || opt.error;

    img.onload = function () {
      setAttr(el, src, vnode.tag);
    };

    if (typeof err === 'string' && err.length) {
      var errSrc = getImageSrc({
        hash: err,
        width: params.width,
        height: params.height
      });

      img.onerror = function () {
        setAttr(el, errSrc, vnode.tag);
      };
    }

    img.src = src;
  };

  // Register Vue directive
  Vue.directive('img', {
    bind: function bind$1(el, binding, vnode) {
      bind(el, binding, vnode);
      update(el, binding, vnode);
    },

    update: update
  });

};

exports.getSrc = getSrc;
exports.install = install;

Object.defineProperty(exports, '__esModule', { value: true });

})));
