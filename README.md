<br><br>

<p align="center"><img src="./icon/icon.png" width="125px"></p>
<h3 align="center">lavandula</h3>

<br><br>

呐呐呐，看过来了的欧尼酱你好哇qwq。

这个项目是 mem0 在浏览器上装的小玩具呢。

蒻蒻的 mem0 不会开发 chrome 插件就只能写油猴脚本嘤。

但油猴脚本只滋磁单 js 文件，还不能写 Less 啥的，感觉写起来好麻烦诶。

mem0 想了想，呐，如果用点方法把这些都打包成一个文件不就好了嘛。

「emmm ... 可是要怎么打包呢」

「用 webpack 就好了吧」

「...有道理诶，看上去好方便的样子」

于是 mem0 就装了个 webpack 来打包

「可是每次都要手动跑 webpack 命令好麻烦的说...」

「那就再拉个 nodemon 吧 qwq」

<br>

## mem0 你又开坑啦，这玩意儿有个卵用啊

这项目是 mem0 的 Toy Project 大集合，所以 mem0 也不知道有什么用。

「要不把已经有的功能先写出来吧，虽然没几个，但欧尼酱不会嫌弃的吧」

mem0 这么想着，于是 `README.md` 多了下面几行

- 博客阅读器
  - CSDN 博客（blog.csdn.net）
  - cnblogs 博客（www.cnblogs.com）
  - 作业部落（www.zybuluo.com）
  - yhx-12243 的博客（yhx-12243.github.io）
  
<br>

## 呐呐呐，你讲了这么多，我可咋安装啊

由于 mem0 还在写，所以还不提供打包好的文件，欧尼酱可以手动打包嘤。

欧尼酱要装好 npm & webpack & nodemon 并配置路径，把这个仓库 git clone 到本地，依次运行这些命令就好啦。

```shell
mkdir dist
npm install
npm run build
```

打包好的文件位于 `dist/user.js`，接下来把这个文件的内容拷贝到 Tamper Monkey 中就行呐。