# WebPack

## 一：webpack简介

什么是webpack

本质上，webpack是一个现代JavaScript应用程序的静态模块打包器，当webpack处理应用程序时，它会递归的构建一个依赖关系图，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle（文件），会把所有的文件用js的方式来处理

webpack的四大核心概念

1.入口（entry）：入口文件（程序启动文件）

2.输出（output）：输出文件（打包完成的文件）

3.加载器（loader）：因为有些东西不支持js，所以需要加载器把js不认识的内容（图片等）转换成js认识的内容，这些插件就是加载器

4.插件（plugins）：处理打包之后的内容，压缩等插件

npm start 是一种简写模式，可以不用run，但是其他的命令行只能用npm run 命令名称 来启动

## 二：webpack基本使用

### 2.1.安装

```JavaScript
npm init –y //初始化
cnpm inistall webpack@3.10.0 –save-dev//指定3.10.0版本
```

### 2.2.webpack模块化打包

#### 使用命令行的形式打包

```javascript
webpack [entry] [output]
//entry:将要打包的文件，output:目标文件
webpack  ./taiUi/tai.js  ./dist/tai.js
```

#### 使用配置文件的形式打包

*大多数项目会需要很复杂的设置，这就是为什么 webpack 要支持配置文件。这比在终端(terminal)中输入大量命令要高效的多，所以让我们创建一个取代以上使用 CLI 选项方式的配置文件*

1.创建一个 webpack.config.js配置文件（这样就可以直接npx webpack来运行代码）

```javascript
const path = require('path');

module.exports = {
  entry: './index.js', //入口文件
  output: {
    filename: 'bundle.js',//出口文件名字
    path: path.resolve(__dirname, 'dist')//要打包到哪个路径
  }
};
```

2.运行

```javascript
webpack --config webpack.config.js

如果 webpack.config.js 存在，则 webpack 命令将默认选择使用它。我们在这里使用 --config 选项只是向你表明，可以传递任何名称的配置文件

webpack
```

#### 使用npm脚本

1.设置package.json

```javascript
{
  ...
  "scripts": {
	"build": “webpack”
  },
  ...
}
```

2.运行

```javascript
npm run build
```

### 2.3.再谈webpack四大核心概念

#### Entry

代码的入口，打包的入口，可以是单个也可以是多个。配置：

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml10224\wps1.jpg)

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml10224\wps2.jpg)

推荐：

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml10224\wps3.jpg)

推荐：![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml10224\wps4.jpg)

**使用key-value的形式比较易于扩展。在后期打包的过程中也比较容易追踪打包文件（有key的存在）**

#### Output

打包生成的文件，可以是一个也可以是多个（entry是多个，output就可以是多个）。配置：

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml10224\wps5.jpg)

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml10224\wps6.jpg)

entry和output的对应规则：

[name]:对应每一个entry的key
[hash]:生成的唯一标识

#### Loaders

处理文件转为模块。配置：

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml10224\wps7.jpg)

常用loader

​					编译相关

​						babel-loader、ts-loader

​					样式相关

​						style-loader、css-loader、less-loader、postcss-loader

​					文件相关

​						file-loader、url-loader

#### Plugins

参与打包整个过程,打包优化和压缩文件等。配置：

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml10224\wps8.jpg)

常用 Plugins

​		优化相关

​		CommonsChunkPlugin，UglifyjsWebpackPlugin

​		功能相关

​		ExtractTextWebpackPlugin，HtmlWebpackPlugin

​		HotModuleReplacementPlugin ，CopyWebpackPlugin

### 2.4.三个引申概念

#### module

**分散的功能块，提供比完整程序更小的表面积。编写良好的模块提供了坚实的抽象和封装边界，构成了一致的设计和明确的目的**。

#### **Chunk**

**这个webapck专用术语用于内部管理捆绑过程。包是由块组成的，其中有几种类型(例如:条目和孩子)。通常，块与输出束紧密地对应，但是有一些配置不会产生一对一的关系。**

#### **Bundle** 

**来自多个不同模块的产品，包含已经过加载和编译过程的源文件的最终版本。**

## 三：编译ES6/ES7（babel）

### 3.1：安装babel

npm i babel-loader @babel/core  -D

npm i @babel/preset-env -D 语法

npm i @babel/polyfill --save  API

### 3.2配置babel-loader

```javascript
module:{
	rules:[
		{
		test:/\.js$/,
		use:'babel-loader',
		exclude:'/node_modules/'
		}
	]
}
```

### 3.3：配置polyfill

```javascript
直接在入口文件中 import ‘@babel/polyfill’
```



### 3.4配置.babelrc和.browserslistrc文件

.babelrc：

```javascript
{
  "presets": ["@babel/preset-env"]
}

```

.browserslistrc（浏览器兼容）：

```javascript
last 1 version
> 1%
maintained node versions
not dead
```

## 四：处理CSS内容

```javascript
{  test:/\.less$/, 
    use:ExtractTextWebpackPlugin.extract({    
        fallback: {loader:'style-loader'}, //如果失败继续使用style-loader  
        use:[     
        {loader:"css-loader"}, //css打包    
        {loader:"postcss-loader"}//加前缀，增加css兼容性
        {loader:"less-loader"},//处理less
        ]  
     })
}
```



### 4.1：安装和配置style-loader

主要负责创建style标签，并将标签塞入到文档中

##### 安装：

npm i style-loader -D

 css热更新时 style-loader的版本
  style-loader 0版本 （0.23.1）

##### 配置：

```javascript
 {
        test:/\..css$|\.less$/,
        use:"style-loader"
  }
```

### 4.2：安装和配置css-loader

主要负责css模块化

##### 安装：

npm i css-loader -D

##### 配置：

```javascript
{
        test:/\.css$|\.less$/,
        use:"css-loader"
 }
```

### 4.3：安装和配置less&less-loader

负责解析less

##### 安装：

npm i less less-loader -D

##### 配置：

```javascript
{
        test:/\.less$/,
        use:"less-loader"
}
```

### 4.4：安装和配置postcss&postcss-loader

负责转化css代码:可以给css加前缀，增加兼容性

##### 安装：

npm i postcss postcss-loader -D

安装自动加前缀的库

npm i autoprefixer -D	

##### 配置：这里需要注意，这是后置处理，所以要放在css解析之后

```javascript
{
        test:/\.css$|\.less$/,
        use:"postcss-loader"
   }
```

##### 配置postcss.config.js

```javascript
const autoprefixer = require("autoprefixer");
module.exports={
    plugins:[
        autoprefixer(),
    ]
}
```



## 五：处理图片&第三方字体

### 5.1：安装

将css引入的图片纳入webpack的管理

npm i file-loader -D

base64编码

npm i url-loader -D

 图片压缩插件
         image-webpack-loader 4版本（4.5.0）
         file-loader  2版本 （2.0.0）
         url-loader   1版本  （1.1.0）

### 5.2：CSS引入图片&Base64编码

配置：

```javascript
{
        test:/\.(png|jpg|jpeg|gif)$/,
        use:[
          {
            loader:"url-loader",
            options:{
              //publicPath:"./dist/img",//发布目录
              outputPath:"img", //输出目录
              name:"[name].[hash:8].[ext]",
              limit:10000 //转为64编码的界限
            }
          }
        ]
      }
```



### 5.3：处理字体

配置：

```javascript
{
        test:/\.eot$|\.svg$|\.ttf$|\.woff$/,
        use:[
          {
            loader:"file-loader",
            options:{
              outputPath:"fonts"
            }
          }
        ]
      }
```



## 六：处理HTML

### 6.1：自动生成html文件

只需要一个模板，其他的自动就可以往文件里添加

#### 6.1.1：下载

npm install html-webpack-plugin  --save-dev

#### 6.1.2：引入

要在入口文件那里去引入

const HtmlWebpackPlugin = require('html-webpack-plugin');

#### 6.1.3：配置

```javascript
plugins:[
    new HtmlWebpackPlugin({
        filename:"index.html", //生成的文件名，自动回去找output那个路径
        template:"./index.html", //使用的模板
        inject:true//是否要自动插入资源
        /*minify:{
            collapseWhitespace:true//是否压缩
        }*/
      }
    )
  ]
```

### 6.2：在HTML中引入图片

#### 6.2.1：下载

npm install html-loader  --save-dev 

#### 6.2.2：配置

```javascript
{
        test:/\.html$/,
        use:[
          {
            loader:'html-loader',
            options:{
              attrs:['img:src']
            }
          }
        ]
      }
```

## 七：目录相关

### 7.1：清除目录

#### 7.1.1：安装

版本问题：

 clean-webpack-plugin 1版本 （1.0.0）

npm install clean-webpack-plugin --save-dev

如果使用webpack3.10.0，这里需要指定版本：1.0.0，不然无法兼容

#### 7.1.2：引入

const CleanWebpackPlugin = require('clean-webpack-plugin');

#### 7.1.3：配置

```javascript
plugins:[
        new CleanWebpackPlugin (['dist'])//这里的./路径根据配置文件所在的目录
      ]
```

### 7.2：移动目录

#### 7.2.1：安装

版本问题：

 copy-webpack-plugin  4版本 （4.0.4）

npm install copy-webpack-plugin --save-dev

如果使用webpack3.10.0，这里需要指定版本：4.0.4，不然无法兼容

#### 7.2.2：引入

const CopyWebpackPlugin = require('copy-webpack-plugin')

#### 7.2.3：配置

```javascript
plugins:[
        new CopyWebpackPlugin([ ...patterns ])
      ]
patterns：
	{ from: 'source', to: 'dest' }//form：移动的目录，建议绝对路径，dest：目标目录，也用绝对路径
```

## 八：引入第三方库

### 8.1：CDN直接引用

使用script标签直接引用

### 8.2：使用webpack.providePlugin插件（内置）

配置：

```javascript
new webpack.ProvidePlugin({
            $:'jquery'//$是引入的对象，jquery是包名
    })
```

```
只要在模块周明华任何一个位置引入lodash  全局就可使用？
并不是，因为默认下载的lodash是node.js模块，一旦引入全局就会注册，如果下载lodash.es就只会在当前模块中有用，而且，如果一个包的大小大于500k，babel会做一些处理，不需要配置全局也可以使用
```

### 8.3：本地文件

配置：

```javascript
resolve:{//起别名，这里的别名不要和包名有冲突，如果不得已要一样，需要在前面加一个$符，这样如果在引入的时候，后面加一个\，参考的就是第三方包而不是本地文件
        alias:{
            jquery$:path.resolve(__dirname,"jq/jquery.js")
        }
    }
new webpack.ProvidePlugin({
            $:'jquery'
    	})
```

## 九：开发环境搭建

### 9.1：开发服务器

#### 9.1.1：安装

npm install webpack-dev-server --save-dev

版本问题，webpack-dev-server需要下载2.10.1才能运行

需要下载 webpack-cli：npm i webpack-cli -D

#### 9.1.2：配置

```javascript
devServer:{
	port:3333
}
new HtmlWebpackPlugin({
        filename:"index.html", //这里使用index.html，可以直接打开主页面
        template:`${__dirname}/src/tai.html`,
        inject:true
      }
    ),
```

#### 9.1.2：运行

```javascript
"scripts": {
    		"dev":"webpack-dev-server –open chrome"
  		}
```

#### 9.1.3：live-reloading

完成以上配置后自带live reloading（自动刷新浏览器）功能：

即一修改代码会立刻重新编译 页面重新渲染

### 9.2：模块热更新

#### 9.2.1：CSS热更新配置

**版本问题**：style-loader 0版本 （0.23.1）

```javascript
devServer:{
        port:3333,
        hot:true，//热更新
        overlay：true//这个是停止自动刷新
}
```

#### 9.2.2：插件

const webpack = require("webpack")

new webpack.HotModuleReplacementPlugin()

注意

修改html不会触发模块热更新。我们只能手动刷新

修改css会触发模块热更新，但这一切都依赖于style-loader，这里如果使用webpack3.10.0的话，会有很大的兼容性问题

#### 9.2.3：js热更新配置

建议使用js原生代码是不用开启热更新

module.hot: 表示 [模块热替换(Hot Module Replacement)](https://webpack.docschina.org/concepts/hot-module-replacement) 是否启用，如果启用返回一个对象

module.hot.accept（），可以开启js的热更新，如果什么参数都不写，就表示接收模块自身的更新（包含自身的子模块的更新），**但是当子模块改变页面的DOM结构时，不会清除上次更改过的样式，造成样式重叠**，所以我们要做到在每次更改DOM时把上次的修改清除掉

解决：

module.hot.accept（）方法接收两个参数，第一个参数是指定监听哪个模块的热更新，第二个参数是一个回调函数，当指定模块发生改变后，就会调用这个函数

可以把子模块变成函数，返回子模块创建的DOM对象，然后在当前模块把这个DOM对象remove掉，然后再调用一次，就可以把上次创建的DOM对象清除了

### 9.3：优化代码调试

调试的时候使用我们打包之前的内容，因为比较熟悉，更适合阅读

#### 9.3.1：配置

devtool:'inline-source-map'

## 十：强约束Eslint

### 10.1：安装

下载eslint和eslintloader

npm i eslint eslint-loader  --save-dev

npm i eslint-plugin-html eslint-friendly-formatter --save-dev

eslint-plugin-html ：修复html文件的js

eslint-friendly-formatter：友好的报错信息

### 10.2：配置

需要npx eslint --init生成初始文件以及设置



eslint-plugin-html：设置.eslintrc里的配置

```javascript
module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard'
  ],
  plugins:[
    'html'//可以修改html里的js代码
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
  }
}
```

eslint-friendly-formatter：

```javascript
{
    loader:'eslint-loader',
    options:{
        formatter:require("eslint-friendly-formatter")//友好的报错信息
    }
}
```

**eslint-loader**要放在babel-loader之前来处理 即配置位置要在后

### 10.3：强约束

取消强约束：

创建一个.eslintignore文件

```js
**/*.js//把所有路径的所有名称的js文件全部屏蔽
```



```javascript
devServer.overlay(重要)
		使 eslint的报错信息打到浏览器上
		overlay:true
 devServer:{
    port:3333,//端口
    hot:true,//热更新
    overlay:true，//打印错误到浏览器
    hotonly：true//关闭自动刷新
  }
```

## 十一：生产环境优化

### 11.1：提取js公共代码

应用场景：目的是为了使用缓存，优化代码执行，把那些webpack生成的代码以及使用的第三方库，和业务代码分离出来，因为业务代码经常变化，发送提交时不需要带着一些不会发生改变的代码，减少代码请求数量和请求大小，优化页面

用hash是为了让改变内容的代码跳过304的协商缓存的向浏览器核实内容有没有变化的那一步，直接下载，因为hash会在内容变化后变化，如果地址发生变化，就不走协商缓存，直接发送请求

​          多页应用 ： 分离 第三方依赖 +  webpack生成代码 + 多页间的公共代码

​		  单页应用 ： 分离 第三方依赖 +  webpack生成代码

**公共代码的提取  入口维度的概念**

多页应用 ： 分离 第三方依赖 +  webpack生成代码 + 多页间的公共代码

单页应用 ： 分离 第三方依赖 +  webpack生成代码

**代码分割：依赖维度的概念**

分割的不是第三方库，是一个入口进来之后，使用的各个依赖之间的**公共依赖**

#### 单entry配置

```
配置使用了commonsChunkPlugin,(单entry得使用对象的形式来配置 输出得是动态的)将webpack模块化的代码 与 业务代码抽离开
```

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: {
    index:`${__dirname}/index.js`
  },
  output: {
     filename:`[name].[chunkhash:8].js`,//这里的[name]会根据入口名来定义，在这里指定，打包的每个文件都会带上hash
        path:`${__dirname}/dist` 
  },
  plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:"index"//这里拿到公共代码，因为没有比较的，所以把所有的代码都放到这里，可以不用写这个句代码
        }),
     new webpack.optimize.CommonsChunkPlugin({
            name:"webpackCommon"//提取出webpack的核心代码
        })，
      new webpack.NamedChunksPlugin(),//处理hash的
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template:`${__dirname}/index.html`,
            filename:"index.html"
        }),
        new CleanWebpackPlugin(`${__dirname}/dist`)
  ]
};
```

使用第三方库的处理方式

```javascript
将webpack模块化的代码 与 业务代码 与第三方库抽离开
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports={
    entry:{
        index:`${__dirname}/index.js`,
        vender:["lodash-es","jquery"]
    },
    output:{
        filename:`[name].[chunkhash:8].js`,
        path:`${__dirname}/dist`
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:"vender", //这里把vender和index的共同的代码抽离出来，放到vender的js文件中去，不是共同的就继续放在index里，因为index中引用了"lodash-es","jquery"，共同的代码只有这两个第三方库，完成了提取公共代码
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:"webpackCommon"//因为公共代码以及分离好了，所以剩下的只有webpack的核心代码，放到了这里
        }),

        new webpack.NamedChunksPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template:`${__dirname}/index.html`,
            filename:"index.html"
        }),
        new CleanWebpackPlugin(`${__dirname}/dist`)
    ]
}
```







#### 多entry配置

第一步：配置使用了commonsChunkPlugin**将webpack模块化的代码合并到entry之间的公共代码中** 与 业务代码抽离开



第二步：将**webpack模块化的代码 与entry之间的公共代码 与 业务代码** 一起抽离开



第三 步：引入第三方库 **将webpack模块化的代码 与entry之间的公共代码 与 业务代码  与第三方库** 一起抽离开

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
module.exports={
    entry:{
        index:`${__dirname}/index.js`,
        app:`${__dirname}/app.js`,
        vender:["lodash-es","jquery"]
    },
    output:{
        filename:`[name].js`,
        path:`${__dirname}/dist`
    },
    plugins:[
        //将index 和 app的公共代码放入commonBus中
        new webpack.optimize.CommonsChunkPlugin({
            name:"commonBus",
            chunks:["index","app"]
        }),
        //commonWebpack放webpack模块化必须的代码
        //vender 直接放第三方库的所有代码
        new webpack.optimize.CommonsChunkPlugin({
            name:"vender",
            //chunks:["vender"]  不能指定,如果指定了，会创建一个空壳，没有内容
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:"commonWebpack"
        }),
        new HtmlWebpackPlugin({
            template:`${__dirname}/index.html`,
            filename:"index.html"
        }),
        new CleanWebpackPlugin(`${__dirname}/dist`)
    ]
}
```

### 11.2：处理hash

```
new webpack.NamedChunksPlugin()//如果改变了一个模块，只需要请求改变的这一个模块，其他的还是可以使用304协商缓存，如果不指定这个，如果变一个，全部都会重新发请求
new webpack.NamedModulesPlugin()
```

### 11.3：代码分割：这里不太会

目的：把入口文件的共同依赖分离出来，把不会再发生变化的库（不是第三方库，是一个入口进来之后各个依赖之间的公共依赖）可以单独分割出来，就不去请求这些代码了，使用协商缓存，减少请求次数，优化代码的执行，而且减少每次发送请求的文件大小

#### 11.3.1：实现require.ensure

require.ensure是webpack内置的方法，里面接收四个参数

参数1：要加载的文件路径，参数2：回调，回调的第一个参数是真正的require，可以用来引入，参数3（可以不写）：失败后要调用的回调，参数4：打包时候代码分割的文件名（里面包含共同依赖的内容）

```javascript
//require.ensure返回的是一个promise，所以首先把这个promise返回出去，在外边调用之后用.then的方法（这时已经会执行函数里的代码）拿到里面的函数，然后再调用
let promise = require.ensure(["./lib/common.js"],(require)=>{
  var damuFn = require("./lib/common.js").default;
  exports.damuFn = damuFn;//拿到函数，需要自己调用
  console.log("damu-oooo")//会在.then后直接打印
},"commonBus");
exports.promise = promise;

//外边的代码
import damu from "./src/damu";

damu.promise.then(()=>{
    damu.damuFn();
});

```

这里要注意，如果是依赖多个文件，就会和require.include不一样，这里的直接会把**所有需要用到的文件放到这个文件夹**里，但是require.include会把**共同用到的文件的部分打到index**那里，出现一次。这两个位置不一样，一个在指定的文件夹里，一个在index里(因为没有指定)



#### require.include:

其实就是选择调用这个函数的文件生成的位置，到底是在默认的包里，还是在调用这个依赖的包里

当一个文件使用多个依赖时，如果使用require.ensure没有指定第三个参数（不是失败函数，是文件夹名称），**打包后就会生成两个js，分别存放每个文件所使用的依赖**，文件使用require.include可以在打包的时候把**两个文件共同的依赖的部分放在那个打包之后的文件中**（index文件里，这里要看谁用了require.include，使用之后会在那个包里面），如果不指定的话，**就会在两个文件不同依赖的那个文件中分别出现一次**，

作用：减少代码冗余，提高效率，**其实可以避免使用这个方法，指定好require.ensure里的参数**，如果指定好文件目录的话，就会产生一个文件，存放所有的依赖，这里就会产生两个

实现：

```javascript
// import commonFn from "./lib/common";
require.include("./lib/common")//指定的这个文件不会出现在两个打包的文件中去，而是去到他们共同的大文件（index）中
let promise = require.ensure(["./lib/common","./lib/common2"],(require)=>{
    let commonFn = require("./lib/common").default;
    let commonFn2 = require("./lib/common2").default;
    exports.damuFn=()=>{
        commonFn();
        commonFn2();
        console.log("damu.js")
    }
})

exports.promise = promise;

```

#### 11.3.2：实现import（）

动态地加载模块。调用 import() 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中。返回的是一个promise

在调用之前，需要先在外层包一层promise（new promise），等import方法调处理完成之后，再去调用resolve方法，外边才能拿到我们想要暴露的内容**，使用import打包的结果也是单独一个文件，里面包含的是两个文件使用的共同的代码**，可以使用魔法注释来指定包名，如果使用的话，需要两个文件都用，且两个文件的注释名还需要一样

注意：当我们import接收的参数时，需要判断依赖的文件是如何暴露的，如果使用的ES6模块化，且使用default方法暴露的，我们拿到的是一个对象，需要拿到对象身上的default，这里才是我们想要的内容

单个依赖：

```javascript
exports.promise = new Promise((resolve)=>{
    import(/* webpackChunkName:'xxxx' */"./lib/common").then((common)=>{ //魔法注释
        let commonFn = common.default;
        let xfzFn = ()=>{
            commonFn();
            console.log("xfz.js-")
        }
        resolve(xfzFn)//在这里传输数据，在外边可以接收
    })
})
exports.promise = promise；

//外部代码
xfz.promise.then((xfzFn)=>{//拿到的数据
    xfzFn()//调用依赖暴露的函数
    
})
```



实现多个依赖：这里的魔法注释，两个依赖必须一致，不然无法生成文件，生成的文件是两个依赖的共同依赖

```javascript
const one = new Promise((resolve)=>{
    import(/* webpackChunkName:'xxxx' */"./lib/common").then((common)=>{
        let commonFn = common.default;
        let xfzFn = ()=>{
            commonFn();
            console.log("xfz.js-")
        }
        resolve(xfzFn)
    })
})

const two = new Promise((resolve)=>{
    import(/* webpackChunkName:'xxxx' */"./lib/common3").then((common)=>{
        let commonFn = common.default;
        let xfzFn = ()=>{
            commonFn();
            console.log("xfz.js-")
        }
        resolve(xfzFn)
    })
})

exports.promise = Promise.all([one,two])//用Promise.all暴露一个数组，等里面的内容都加载完发送数据

外部代码
xfz.promise.then((arr)=>{
    
    arr.forEach((item)=>{ //循环来调用暴露的函数
        item()
    })
})
damu.promise.then((arr)=>{
   
    arr.forEach((item)=>{ //循环来调用暴露的函数
        item()
    })
})

```

#### 懒加载

根据情况，可以加载不同的内容，不使用的可以先不加载，随后控制自己想要加载的内容

```javascript
let flag = false;//根据flag来选择需要使用的依赖，如果没有使用的，就先不加载，实现懒加载
if(flag){
    import("./lib/common")
}else {
    import("./lib/common2")
}
console.log("damu.js")
```

### 11.4：js Tree shaking

把自己写的库里面没有用到的内容摇下来，如果是第三方库的内容推荐使用提取公共代码的方式，因为里面的内容基本不会更改，这样直接就可以使用缓存，不用发请求，当然，具体的使用看自己的情况

**注意：**

使用js Tree shaking必须是要用ES6模块化（import export），暴露的时候不能用default，而且这个方法是和缓存（提取公告代码）有冲突的，插件的执行顺序是从上到下，loader的执行顺序是从下到上

#### 11.4.1本地代码

```js
plugins:[
   		new webpack.optimize.UglifyJsPlugin()//可以实现js压缩和tree shaking
]
```

#### 11.4.1第三方库

需要配合lodash和babel

安装：npm install babel-plugin-lodash --save-dev

配置：在.babelrc里配置

```js
"plugins":["lodash"]
```

### 11.5：提取css代码

**使用提取css代码的配置需要注意：这个模块需要往下边放，起码也要在tree shkaing 和压缩后边，不然css里的内容就是空白**

下载：

```javascript
npm install extract-text-webpack-plugin --save-dev//这个插件可以把css从style内联的形式，变成link的形式，把css代码提取到单独的css文件里，可以避免闪屏，提高代码执行效率等
```

配置：

可以做到提取代码和压缩

```js
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin")
rules：
{
    test:/\.css$/,
        use:ExtractTextWebpackPlugin.extract({
            fallback: {
                loader:'style-loader'//如果失败继续使用style-loader
            },
            use:[
                {loader:"css-loader"}
            ]
        })
}
plugins:
new ExtractTextWebpackPlugin({
    filename:'[name].min.css'//指定css文件夹的名字
})
```

### 11.6：css tree shaking

安装：npm install purifycss-webpack glob-all  purify-css --save-dev

引入：

const PurifyCSS = require("purifycss-webpack");//删除css文件中未使用的选择器

const glob = require("glob-all");//在全局有效

配置：

```js
要配合ExtractTextWebpackPlugin插件使用 且PurifyCSS在后面配置，注意顺序
    new ExtractTextWebpackPlugin({
    	filename:'[name].min.css'//提取css文件
    }),

    new PurifyCSS({
        paths:glob.sync([
            path.join(__dirname,'./*.html')//找到html定义了哪些id或类名，再去css文件中去看有没有定义之后没使用的，如果有就摇下来
        ])
    })
```

### 11.7：html优化

作用：把webpack的核心代码分离出来后放到html里引用，每次就不需要重新去发请求下载哪些核心代码了

安装：npm install html-webpack-inline-chunk-plugin --save-dev

引入：const HtmlWebpackInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');

配置：

```javascript
plugins:[
        new webpack.optimize.CommonsChunkPlugin({ //提取公共代码
            name:"common"
        }),
 new HtmlWebpackInlineChunkPlugin({ //在提取代码之后，移动html之前
            inlineChunks:['common']
 })

        new HtmlWebpackPlugin({ //移动html'文件
            filename:"index.html",
            template:"./index.html"
        }),
       
    ]
```

### 11.8：资源压缩

#### 11.8.1：html压缩

安装：html - loader

```javascript
{
       test:/\.html$/,
       use:[
          {
            loader:'html-loader',
            options:{
                minimize: true//修改这个可以使用压缩
           	}
           }
        ]
     } 
```

#### 11.8.2：css压缩

安装：npm install --save-dev optimize-css-assets-webpack-plugin；

3. **10.0版本问题**：optimize-css-assets-webpack-plugin 3版本（3.1.1）

引入：const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

配置：new OptimizeCssAssetsPlugin()；

#### 11.8.3：js压缩

这里用new webpack.optimize.UglifyJsPlugin()这个方法也是可以实现压缩的，而且还可以去除无用的js代码，但是可能稳定性不好

安装：npm i uglifyjs-webpack-plugin -D

**版本问题**： uglifyjs-webpack-plugin 1版本 （1.2.5）

引入：const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

配置：

```js
plugins: [
    new UglifyJsPlugin(),
]
```

#### 11.8.4:图片压缩

安装：npm install image-webpack-loader --save-dev

 **版本问题**：image-webpack-loader 4版本（4.5.0）
         file-loader  2版本 （2.0.0）
         url-loader   1版本  （1.1.0）



配置：

```js
 {
              test:/\.jpg$|\.png$/,
              use:[
                  {
                      loader:"url-loader" //识别图片
                  },
                  {
                      loader: 'image-webpack-loader'//压缩图片
                  }
              ]
          }
```

## 十二：搭建脚手架

### 1.创建文件

#### webpack_base_config.js 

  : 开发和生产都需要的配置        
loader的配置在webpack_base_config中自行区分

```javascript
const merge = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var baseConfig = env =>{
   const loaderConfigFn = require("./loaderConfig/index");
   const {jsLoader, cssLoder, lessLoader, imageLoader, htmlLoader} = loaderConfigFn(env)
   return {
       entry:{
           tai:`${__dirname}/../src/taiUi/tai.js`
       },
       output:{
           // filename:"[name].[chunkhash:8].js",
           filename: env === "dev"?"[name].js":"[name].[chunkhash:8].js",
           path:path.resolve(__dirname,"../dist")
       },
       module:{
           rules:[
               {
                   test:/\.js$/,
                   use:jsLoader,
                   exclude:`/node_modules/`
               },
               {
                   test:/\.css$/,
                   use:cssLoder
               },
               {
                   test:/\.less$/,
                   use:lessLoader
               },
               {
                   test:/\.jpg$|\.png$|\.gif$/,
                   use: imageLoader
               },
               {
                   test:/\.html$/,
                   use:htmlLoader
               }
           ]
       },
       plugins:[
           new HtmlWebpackPlugin({
               filename:"index.html",
               template:`${__dirname}/../src/tai.html`
           }),
           new CopyWebpackPlugin([
               { from: `${__dirname}/../src/static`, to: `${__dirname}/../dist/static` },
               { from: `${__dirname}/../src/img/swiperimg`, to: `${__dirname}/../dist/img/swiperimg` }
           ])
       ]
   }
}
var devConfig = require("./webpack_dev_config.js");
var proConfig = require("./webpack_pro_config.js");

module.exports = (env)=>{
    return merge( baseConfig(env) , env==="dev"? devConfig : proConfig)
}
```



#### webpack_dev_config.js    

: 开发特有的配置（插件）

```js
const webpack = require("webpack");
module.exports={
    devServer:{
        port:3333,
        hot:true,
        hotOnly:true,
        overlay:true
    },
    devtool:'inline-source-map',
    plugins:[
        new webpack.HotModuleReplacementPlugin({}),
    ]
}
```

#### webpack_pro_config.js   

 : 生产特有的配置（插件）

```js
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const PurifyCSS = require("purifycss-webpack");
const HtmlWebpackInlineChunkPlugin = require('html-webpack-inline-chunk-plugin');
const glob = require("glob-all");
const webpack = require("webpack");

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require("path");

module.exports={
    plugins:[
        //js
        new webpack.optimize.UglifyJsPlugin(),
        new UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:"webpackCommon"
        }),

        //css
       /* new ExtractTextWebpackPlugin({
           filename:'[name].min.css'
       }),*/
        new PurifyCSS({
            paths:glob.sync([
                path.join(__dirname,'./*.html')
            ])
        }),
        new OptimizeCssAssetsPlugin(),
        //html
        new HtmlWebpackInlineChunkPlugin({
            inlineChunks:['webpackCommon']
        }),

        //往后放就可以注入css
        new ExtractTextWebpackPlugin({
            filename:'[name].min.css'
        }),
        //hash
        new webpack.NamedChunksPlugin(),
        new webpack.NamedModulesPlugin(),
        new CleanWebpackPlugin(`${__dirname}/../dist`)
    ]
}
```

#### 专门处理loader的文件

```js
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
module.exports=(env)=>{
    //js
    var eslintLoader = {
        loader:"eslint-loader",
        options:{
            formatter:require("eslint-friendly-formatter")
        }
    }
    var jsLoader = [
        {
            loader:"babel-loader"
        }
    ] ;
    jsLoader = jsLoader.concat(env === "dev" ? eslintLoader : []);

    //css
    var cssDevLoaderPre = [
        {loader:"css-loader"},
        {loader:"postcss-loader"}
    ]
    var cssDevLoader = [{loader:"style-loader"}].concat(cssDevLoaderPre);
    var cssProLoader = ExtractTextWebpackPlugin.extract({
        fallback: {loader:'style-loader'},
        use:cssDevLoaderPre
    });
    var cssLoder = env ==="dev" ? cssDevLoader : cssProLoader;

    //less
    var lessLoader = env ==="dev" ? cssDevLoader.concat([{
        loader:"less-loader"
    }]): ExtractTextWebpackPlugin.extract({
        fallback: {loader:'style-loader'},
        use:cssDevLoaderPre.concat([
            { loader:"less-loader"}
        ])
    });

    //图片
    var imageLoader = [
        {
            loader:"url-loader",
            options:{
                limit:8000,
                outputPath:"img",
            }
        }
    ].concat(env === 'dev'?[] :[{
        loader: 'image-webpack-loader'
    }] );

    //html
    var htmlLoader = [
        {
            loader:"html-loader",
            options: {
                attrs: ['img:src'],
                minimize: env === "pro"
            }
        }
    ]

    return {
        jsLoader,
        cssLoder,
        lessLoader,
        imageLoader,
        htmlLoader
    }
}
```

**创建快捷命令方式**

 ```js
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "pro": "webpack --env pro --config ./config/webpack_base_config.js",
    "dev": "webpack-dev-server --env dev --config ./config/webpack_base_config.js --open chrome"
  }
 ```

--env pro :命令行参数，可以拿到，然后判断想要进行什么操作

--config  ./config/webpack_base_config.js ：如果不使用默认的webpack.config.js，需要用--config来指定需要用哪个配置文件

### 2.拿到命令行参数，并返回不同的配置

在base（公共）里用module.exports = (flag)=>{}//这里这个参数flag就是命令行里的内容，是webpack默认提供的一种方式，当执行命令时自动调用，拿到的就是--env那个参数，第二个参数就是命令行里所有的内容

根据不同的指令，返回不同的内容，这个内容就是配置文件

安装：npm i webpack-merge -D

接收两个参数，可以用来**合并两个配置文件**

引入：const merge = require（”webpack-merge“）

配置：

```js
module.exports = (env)=>{
    return merge( baseConfig(env) , env==="dev"? devConfig : proConfig)
}
```





## package.json内容

```javascript
{
  "name": "01_webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "autoprefixer": "^9.6.1",
    "babel-loader": "^8.0.6",
    "css-loader": "^3.2.0",
    "file-loader": "^4.2.0",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.9.0",
    "less-loader": "^5.0.0",
    "postcss": "^7.0.17",
    "postcss-loader": "^3.0.0",
    "style-loader": "^1.0.0",
    "url-loader": "^2.1.0",
    "webpack": "^3.10.0"
  },
  "dependencies": {
    "@babel/polyfill": "^7.4.4"
  }
}
```

兼容webpack3.10.0热更新的版本

```javascript
{
  "name": "02_webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack",
    "dev": "webpack-dev-server --open chrome"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "autoprefixer": "^9.6.1",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^1.0.0",
    "copy-webpack-plugin": "^4.0.4",
    "css-loader": "^3.2.0",
    "eslint": "^6.1.0",
    "eslint-config-standard": "^13.0.1",
    "eslint-friendly-formatter": "^4.0.1",
    "eslint-loader": "^2.2.1",
    "eslint-plugin-html": "^6.0.0",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-node": "^9.1.0",
    "eslint-plugin-promise": "^4.2.1",
    "eslint-plugin-standard": "^4.0.0",
    "file-loader": "^4.2.0",
    "hosted-git-info": "^3.0.0",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.9.0",
    "less-loader": "^5.0.0",
    "postcss": "^7.0.17",
    "postcss-loader": "^3.0.0",
    "style-loader": "^0.23.1",
    "url-loader": "^2.1.0",
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.10.1"
  },
  "dependencies": {
    "@babel/polyfill": "^7.4.4"
  }
}
```



## webpack.config.js内容

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  entry: `${__dirname}/src/taiUi/tai.js`,
  output: {
    filename: 'tai.js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        use:[
          {
            loader:"babel-loader"
          }
        ],
        exclude:`/node_modules/`
      },
      {
        test:/\.css$/,
        use:[
          {
            loader:"style-loader"
          },
          {
            loader:"css-loader"
          },
          {
            loader:"postcss-loader"
          }
        ]
      },
      {
        test:/\.less$/,
        use:[
          {
            loader:"style-loader"
          },
          {
            loader:"css-loader"
          },
          {
            loader:"postcss-loader"
          },
          {
            loader:"less-loader"
          }
        ]
      },
      {
        test:/\.(png|jpg|jpeg|gif)$/,
        use:[
          {
            loader:"url-loader",
            options:{
              //publicPath:"./dist/img",//发布目录
              outputPath:"img", //输出目录
              name:"[name].[hash:8].[ext]",
              limit:10000 //转为64编码的界限
            }
          }
        ]
      },
      {
        test:/\.html$/,
        use:[
          {
            loader:'html-loader',
            options:{
              attrs:['img:src']
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename:"tai.html",
      template:`${__dirname}/src/tai.html`
    }),
    new CleanWebpackPlugin (['./dist']),
    new CopyWebpackPlugin([
      { from: `${__dirname}/src/static`, to: `${__dirname}/dist/static` },
      { from: `${__dirname}/src/img/swiperimg`, to: `${__dirname}/dist/img/swiperimg` }
      ])
  ]
};

```

## 入口文件需要引入的

```javascript

import "@babel/polyfill"; //处理API
import "./src/less/index.less";
```

