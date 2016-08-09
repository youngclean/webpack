##聊聊webpack中配置项
先来个简单的配置
```
 {
    context: __dirname + "/src", //上下文
    entry: 'index', //根据定义的context，简写路径
    output: {
        path: __dirname + "/bin", 
        filename: 'index.js'
  }
```
###context 上下文
基本路径，且是绝对路径，用来解析entry(入口)的，相对这个基本路径可进行缩写
###entry 打包入口点
**有3种写法：**
+ string形式：即上面这种，决定模块启动时加载的入口
+ array形式：所有模块启动时都会加载，最后一个是出口 `entry:['entry1', 'entry2']`
   感觉在实际项目中这种方式会用的很少
+ object形式：创建多个入口点，key是块名称，value可以是string或array
```
{
    entry: {
        page1: "./page1",
        page2: ["./entry1", "./entry2"]
    },
    output: {
        // 确保使用 [name] or [id]
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    }
}
```

