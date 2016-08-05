#webpack入门

`请先创建github repository`

####必备环境
nodeJs
npm
####代码仓库
github最好装上客户端

----
### 开始webpack之旅
#### 全局安装webpack
`npm webpack -g`

这样可以在cmd中直接使用以下命令

`webpack`

#### 创建一个空目录 webpack
`git clone '仓库地址'`

#### 初始化 npm project
`npm init ` 回答一系列问题

####当前目录下安装webpack
`npm install --save-dev webpack`

####创建存放源码及打包后代码的目录
```
mkdir src   #源码
mkdir bin   #打包后的代码或图片
```
####创建index.html，放在src下
```
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8">
  </head>
  <body>
    <script src="../bin/index.bundle.js"></script><!-- 看下面的webpack.config.js -->
  </body>
</html>
```
####创建test/index.js，放在src下
```
var arr = ['webpack'];
console.log(arr);
```
####webpack配置
创建webpack.config.js
```
module.exports = {
    entry: './src/test/index.js', //入口
    output: {
        path: './bin',  //输出
        filename: 'index.bundle.js'
    }
}
```
在cmd执行webpack

`webpack`

* webpack将阅读webpack.config.js，进行打包，在bin目录中输出 index.bundle.js，你可以看到index.bundle.js中有一堆莫名其妙的代码，不用理，能正确执行你想要的结果就行，后期还要压缩呢。。。
```
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
....
```
------
在真正的项目中，我们需要加载第三方的js框架或库，还有css预处理等，而且我们希望从以前的AMD或CMD开发模式中解放出来，用现在的新技术进行开发，如react,es6
####安装babel react
```
npm install --save-dev  babel-core babel-preset-es2015
npm install --save-dev  babel-loader
npm install --save-dev  babel-preset-react
npm install --save-dev  react
```
####增加.babelrc
```
{ "presets": [ "es2015","react" ] }
```
####修改webpack.config.js
```
module.exports = {
    entry: './src/test/index.js', //入口
    output: {
        path: './bin',  //输出
        filename: 'index.bundle.js'
    },
     module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    }
}
```
####安装第三方框架和库
```
npm install --save jquery
```
####修改index.js
```
'use strict';

import $ from 'jquery';

$('<h1>This is Test</h1>').appendTo('body');

const ul = $('<ul></ul>').appendTo('body');
const cats = ['webpack', 'babel', 'react'];

for (const cat of cats) {
    $('<li></li>').text(cat).appendTo(ul);
}
```
重新webpack

--------------
这个时候去访问index.html，得部署本地网络了，类似于express，webpack也提供了这样的模块 webpack-cdn-server











