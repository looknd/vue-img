import getSrc from './src'

// Set img.src or element.style.backgroundImage
const setAttr = (el, src, tag) => {
  tag === 'img' ? el.src = src : el.style.backgroundImage = `url('${src}')`
}

// Vue plugin installer
const install = (Vue, opt = {}) => {

  // Set loading image
  const bind = (el, binding, vnode) => {
    const params = binding.value
    const src = getSrc({
      hash: params.loading || opt.loading,
      width: params.width,
      height: params.height,
      prefix: opt.prefix
    })

    setAttr(el, src, vnode.tag)
  }

  // Hash change callback
  const update = (el, binding, vnode) => {
    const params = binding.value
    if (!params.hash || binding.oldValue && binding.oldValue.hash === params.hash) return

    params.prefix = opt.prefix
    params.quality = params.quality || opt.quality

    const src = getSrc(params)
    const img = new Image()

    img.onload = () => {
      setAttr(el, src, vnode.tag)
    }

    const err = params.error || opt.error
    if (typeof err === 'string' && err.length) {
      const errSrc = getSrc({
        hash: err,
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
      bind(el, binding, vnode)
      update(el, binding, vnode)
    },

    update
  })

}

export default install
