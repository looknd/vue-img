import getSrc from './core'

// Set img.src or element.style.backgroundImage
const setAttr = (el, src, tag) => {
  tag === 'img' ? el.src = src : el.style.backgroundImage = `url('${src}')`
}

// If value is an object, `binding.oldValue === binding.value`
const checkAttr = (el, src, tag) => {
  const re = /^url\(['"]?(.*?)['"]?\)$/
  const oldSrc = tag === 'img' ? el.src : el.style.backgroundImage.match(re)[1]
  return src === oldSrc
}

// Vue plugin installer
const install = (Vue, opt = {}) => {

  const updateCallback = (el, binding, vnode) => {
    const params = binding.value
    const hash = Object.prototype.toString.call(params).slice(8, -1) === 'Object' ? params.hash : params
    if (!hash || typeof hash !== 'string') return

    const src = getSrc({
      hash,
      width: params.width,
      height: params.height,
      prefix: opt.prefix,
      suffix: params.suffix,
      quality: params.hasOwnProperty('quality') ? params.quality : opt.quality
    })
    if (checkAttr(el, src, vnode.tag)) return

    const img = new Image()

    img.onload = () => {
      setAttr(el, src, vnode.tag)
    }

    const error = params.hasOwnProperty('error') ? params.error : opt.error
    if (error && typeof error === 'string') {
      const errSrc = getSrc({
        hash: error,
        width: params.width,
        height: params.height,
        prefix: opt.prefix
      })

      img.onerror = () => {
        setAttr(el, errSrc, vnode.tag)
      }
    }

    img.src = src
  }

  // Register Vue directive
  Vue.directive('img', {
    bind(el, binding, vnode) {
      const params = binding.value
      const loading = params.hasOwnProperty('loading') ? params.loading : opt.loading
      const src = getSrc({
        hash: loading,
        width: params.width,
        height: params.height,
        prefix: opt.prefix
      })

      if (src) setAttr(el, src, vnode.tag)

      updateCallback(el, binding, vnode)
    },

    update: updateCallback
  })

}

export default install
