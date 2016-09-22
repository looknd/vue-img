# vue-img

vue-img 是饿了么业务中常用的插件，可将 hash 值转为对应的图片地址。  

## 使用方法

### 安装插件

```JS
// 默认全局设置
Vue.use(VueImg);

// 自定义全局设置
Vue.use(VueImg, {
  loading: '',      // [String] 占位图片 hash（可选）
  error: '',        // [String] 错误图片 hash（可选）
  prefix: '',       // [String] 自定义前缀（可选，默认当前 CDN）
  quality: 75       // [Number] 图片质量（可选，默认为 100）
});
```

### 使用指令

```HTML
<!-- 设置图片地址 -->
<img v-img="hash">
<img v-img="hash" width="100">
<img v-img="hash" height="100">
<img v-img="hash" width="100" height="100">

<!-- 设置容器背景 -->
<div v-img="hash"></div>
<li v-img="hash" width="100" height="100"></li>
```

你并不需要担心生成的 HTML 中会包含 `width` 和 `height` 属性，Vue 会自动处理。  
但如果你确实需要它们，则可以通过 `v-bind` 的方式添加。

```HTML
<img v-img="hash" :width="100">
```

不仅如此，你还可以为当前元素声明特例的 `loading` 和 `error`，它们的优先级高于全局设置。

```HTML
<!-- 使用特例的 loading -->
<img v-img="hash" loading="hash">

<!-- 不显示全局 error -->
<img v-img="hash" error>
```

### 可读属性

VueImg 提供了 `canWebp` 和 `getSrc` 属性，可在指令以外的地方使用。你应当视它们为只读属性，避免直接修改。

```JS
VueImg.canWebp      // [Boolean] 是否支持 webP
```

```JS
const src = VueImg.getSrc({
  hash: '1fa68b8d589078c3d44e3ae3d7dac9fejpeg',  // [String]  图片 hash（必填）
  prefix: '',                                    // [String]  自定义前缀（可选，默认当前 CDN）
  width: 100,                                    // [Number]  图片宽度（可选）
  height: 100,                                   // [Number]  图片高度（可选）
  quality: 75,                                   // [Number]  图片质量（可选）
});
```

### 扩展参数

VueImg 基于七牛 CDN API 开发，除了常用的图片剪裁之外，你可能还需要高斯模糊、旋转等功能。  
为此在 2.1.0 版本加入了 `suffix` 配置项，用于自定义扩展参数。它只适用于指令和 `getSrc` 函数。

**高斯模糊**

```HTML
<img v-img="hash" suffix="blur/3x5">
```

更多用法请参考[《七牛 CDN 开发者文档》](http://developer.qiniu.com/code/v6/api/kodo-api/image/imagemogr2.html)。

## 贡献代码

请参考[《饿了么开源项目贡献指南》](https://github.com/ElemeFE/vue-img/blob/master/.github/CONTRIBUTING_zh-cn.md)。

```bash
# 构建文件
npm run build

# 单元测试
npm run test
```

请确保通过单元测试以后再提交代码。  
感谢 @YiSiWang 提供测试用例。

## 开源协议

MIT
