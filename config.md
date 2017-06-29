## 聊聊webpack中常用配置项
先来个简单的配置
```
 {
    context: __dirname + "/src", //上下文
    entry: './index', //根据定义的context,  直接找src/index.js
    output: {
        path: __dirname + "/bin", 
        filename: 'index.js'
  }
```
### context 上下文
基本路径，且是绝对路径，用来解析entry(入口)的，相对这个基本路径可进行缩写

### entry 打包入口点
**有3种写法：**
+ string形式：即上面这种，决定模块启动时加载的入口
+ array形式：所有模块启动时都会加载，最后一个是出口 `entry:['entry1', 'entry2']`
   感觉在实际项目中这种方式会用的很少
+ object形式：创建多个入口点，key是块名称，value可以是string或array
```
{
    entry: {
        context: __dirname + "/src", //上下文
        page1: "./entry1", // 优先找src/entry1.js，没有找到，找src/entry1/index.js
        page2: ["./entry2", "./entry2/main.js"] 优先找src/entry2.js, 再找src/entry2/index.js; src/entry2/main.js
    },
    output: {
        // 确保使用 [name] or [id]
        filename: "[name].js",
        chunkFilename: "[id].js"
    }
}
```
### output 输出
+ 一个entry
```
 {
    context: __dirname + "/src", 
    entry: './index', 
    output: {
        path: __dirname + "/bin", //存放路径 
        filename: 'index.js' // 文件名称
  }
  // 写入磁盘： _dirname/bin/index.js
```
+ 多个entry
这个时候有了多个‘块’，应该使用下面的配置，保证每个文件有自己唯一名称。

`[name]`替换每‘块’的名称

`[hash]`替换compilation的hash名称

`[chunkhash]`替换每‘块’的hash名称
```
{
  entry: {
    page1: './src/app.js',
    page2: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/built'  //绝对路径
  }
}
// 写入磁盘: ./built/page1.js, ./built/page2.js
```
#### output.publicPath
在浏览器中访问时的公共url地址，html页面中通过sript或link进行引用
**config.js**
```
{
    entry: {
        context: __dirname + "/src", //上下文
        page1: "./entry1", // 优先找src/entry1.js，没有找到，找src/entry1/index.js
        page2: ["./entry2", "./entry2/main.js"] 优先找src/entry2.js, 再找src/entry2/index.js; src/entry2/main.js
    },
    output: {
        filename: "[name].js",
        publicPath: '/assets/'
    }
}
```
**html**
```
<script src="../../bin/entry1.js"></script> <!-- 原来的写法 -->  
<script src="/assets/entry1.js"></script>  <!-- publicPath的写法 -->
//两种都能使用
```
还可以更复杂的案例，通过CDN，hashes
```
output: {
    path: "/home/proj/cdn/assets/[hash]",
    publicPath: "http://cdn.example.com/assets/[hash]/"
}
```
万一编译时输出文件不知道publicPath，那么运行时会留空白，动态的设置在入口文件中，在入口点设置`__webpack_public_path__`.
```
 __webpack_public_path__ = myRuntimePublicPath
```
### module
+ module.loaders  一组或多组模块加载器
加载器包含以下属性字段
```
test: 必须满足某条件的表达式，可以是正则，字符，返回布尔值的函数，用‘and’包含以上的数组
exclude: 条件之外
include: 条件之内
loader: 以“!”分隔的加载器名称字符
loaders: 加载器数组

module.loaders: [
 {
    test: /\.js$/,
    include: [
      path.resolve(__dirname, "src")
    ],
     exclude: /node_modules/,
     loader: "babel-loader"
  },
  {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
  }, {
      test: /\.less$/,
      loader: 'style!css!less'
   }
]
```



