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
####第三方框架和库
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
#####css 加载
传统方式中html页面通过link标签引入css，既然用webpack，我们也可以模块化css，通过import，这样css完全可以跟着对应的js模块，做到真正的模块化
使用 sass-loader 编译sass或使用less-loader编译 less
```
npm install style-loader css-loader --save-dev
npm install less-loader --save-dev
```

####再次修改webpack.config.js
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
        },
        {test: /\.(less|css)$/, loaders: ['style', 'css', 'less'] }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.less'],
        modulesDirectories: ['node_modules', 'src/test'] //这里一定要加src/test,否则找不到index.less;
    }
}
```
####在index.js引入less
` import 'index.less' `

####加载图片
图片同样可以是模块，但使用的是 file loader 或者 url loader，后者会根据定义的大小范围来判断是否使用 data url

最后重新webpack

--------------
这个时候去访问index.html，得部署本地网络了，类似于express，webpack也提供了这样的模块 webpack-dev-server
####全局安装 webpack-dev-server
` npm install webpack-dev-server -g`
####在项目目录webpack下执行
`webpack-dev-server`
这样，我们就可以在默认的 http://localhost:8080 网址上打开我们的 index.html

* webpack-dev-server 提供了两种模式用于自动刷新页面
  * ifame模式
  * inline模式
  
这里不做赘述，属于高阶应用，后续开篇吧

  













