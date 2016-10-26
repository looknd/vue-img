import getSrc from './src'

// Set img.src or element.style.backgroundImage
const setAttr = (el, src, tag) => {
  tag === 'img' ? el.src = src : el.style.backgroundImage = `url('${src}')`
}

// Vue plugin installer
const install = (Vue, opt = {}) => {

  // Get src wrapper
  const getImageSrc = ({hash, width, height, suffix}) => getSrc({
    hash,
    width,
    height,
    suffix,
    prefix: opt.prefix,
    quality: opt.quality
  })

  // Set loading image
  const bind = (el, binding, vnode) => {
    const params = binding.value
    const src = getImageSrc({
      hash: params.loading || opt.loading,
      width: params.width,
      height: params.height
    })

    setAttr(el, src, vnode.tag)
  }

  // Hash change callback
  const update = (el, binding, vnode) => {
    const params = binding.value
    if (!params.hash || binding.oldValue && binding.oldValue.hash === params.hash) return

    const img = new Image()
    const src = getImageSrc(params)
    const err = params.error || opt.error

    img.onload = () => {
      setAttr(el, src, vnode.tag)
    }

    if (typeof err === 'string' && err.length) {
      const errSrc = getImageSrc({
        hash: err,
        width: params.width,
        height: params.height
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
