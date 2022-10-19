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

## formily-designable 示例

在 react 项目中包含 formily-designable 示例， 可在项目中利用 designable 对页面进行修改， 修改后的schema在内存中保存，返回页面后可以查看更新过的页面

* ./react/designable 主目录
* ./react/designable/components 项目组件注册到designable的组件信息
* ./react/designable/decorator  给designable增加decorator设置，可以从多个定义的decorator中选取
* ./react/designable/schemas components和decorator的SchemaEditorWidget配置
* ./react/designable/setters SchemaEditorWidget的组件
* ./react/designable/dn 供designable控件的组件清单和分类
* ./react/designable/formily formily组件汇总，含antd和项目组件
* ./react/designable/main designable的渲染

### 在vue中使用

目前方案是使用 React 来完成设计器部分，然后通过 systemjs 加载到 Vue 中。

* 使用react来定义各类控件，并对控件属性做映射，调整EditorSchema。（参考上述目录说明）
* 在 ./react/editor.tsx 导出需要用到的模块
* 通过 cd ./react && npm run build:editor ，构建 editor 的 systemjs模块文件， 会生成到 ./vue2/public 目录，直接当做vue项目的模版。模版中包含了 editor的 systemjs importmap
* 通过 vue2/src/views/designable/index.vue 来加载designable

## License

[MIT](./LICENSE) license.

Copyright (c) 2017-present wangwangtou
