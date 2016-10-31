// Check webP support
let canWebp = false
const img = new Image()
img.onload = () => { canWebp = true }
img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA=='

// Default cdn prefix
const protocol = location.protocol === 'https:' ? 'https://' : 'http://'
const env = document.domain.match(/.(alpha|beta).ele(net)?.me$/)
const cdn = protocol + (env ? `fuss${env[0]}` : 'fuss10.elemecdn.com')

export { canWebp, cdn }
