const hash = '50f940dbce46148638e03d0778a4c5f8jpeg'

describe('检测依赖', () => {
  it('Vue 2 已安装', () => {
    expect(Vue).to.exist
    expect(Vue.version.split('.')[0]).to.equal('2')
  })

  it('VueImg 已安装', () => {
    expect(VueImg).to.be.an('object')
  })
})

describe('检测核心函数', () => {
  const config = { hash }

  it(JSON.stringify(config), () => {
    expect(VueImg.getSrc(config))
      .to.match(/^http:\/\/fuss10.elemecdn.com\//)
      .to.include('/5/0f/940dbce46148638e03d0778a4c5f8jpeg.jpeg')
      .to.include('?imageMogr/')
      .to.match(/format\/webp\/$/)
  })

  it(JSON.stringify(config), () => {
    config.prefix = 'eleme.me'
    expect(VueImg.getSrc(config))
      .to.match(/^eleme\.me\//)
  })

  it(JSON.stringify(config), () => {
    config.suffix = 'github'
    expect(VueImg.getSrc(config))
      .to.match(/github$/)
  })
})
