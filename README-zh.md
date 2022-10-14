# formily-admin-template

> 这是一个 formily admin 管理后台。可以选择 Vue2/React 和 Element UI/Antd UI结合 axios & iconfont & lint，这些搭建后台必要的东西。

> 功能示例来源于 [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) 项目，本仓库只是用 @formily 相关库来替换其中的一些通用功能， 组件类均由功能示例项目提供


* Vue2 基于 `vue-cli@4.x` 进行构建
* React 基于 `webpack@^4.41.5",` 进行构建

## 相关项目

- 功能示例来源[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

## Vue Build Setup

```bash
# 克隆项目
git clone https://github.com/wangwangtou/formily-admin-template.git

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 进入mock目录

cd formily-admin-template/mock

# 安装依赖
npm install

# 进入项目目录
cd formily-admin-template/vue2

# 安装依赖
npm install

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9527](http://localhost:9527)

## React Build Setup

```bash
# 克隆项目
git clone https://github.com/wangwangtou/formily-admin-template.git

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npmmirror.com

# 进入mock目录

cd formily-admin-template/mock

# 安装依赖
npm install

# 进入项目目录
cd formily-admin-template/react

# 安装依赖
npm install --force

# 启动服务
npm run start
```

浏览器访问 [http://localhost:3000](http://localhost:3000)
## TODO

> <del>添加 react 示例</del>

> 添加 formily-designable 示例，并可在项目中利用 designable 对页面进行修改

## License

[MIT](./LICENSE) license.

Copyright (c) 2017-present wangwangtou
