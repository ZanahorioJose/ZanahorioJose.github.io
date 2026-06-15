# ZanahorioJose.github.io
Personal Blog for ZanahorioJose 

---

这里讲解一下我自己研究的 `Hexo` 部署博客的过程。

## 准备工作
首先是我进行部署的总纲领：在 GitHub 上开一个 repo，**使用 github.io 的方式进行部署**。暂时不考虑个性化域名，就是用 github.io。

## 原理钻研
用 Node.js 和 hexo 部署的原理大概明白了：
1. 在我本地，其实使用 Node 里面的 Hexo 生成一个博客**静态**页面（全 HTML），我的电脑里面其实存储了生成这个静态页面所需的源码。
  - 在 hexo 命令里面，
    - `hexo generate` 负责生成静态 HTML 代码，
    - `hexo deploy` 负责根据部署逻辑将其同步至 git 页面。这一步假如我的本地电脑已经配置好了 SSH，所以实际上会自动进行 commit + push 的工作。
2. 所以其实一共有两套代码：
  - 一套是使用了 hexo generate + deploy 之后完整的 HTML 源码；（展示用）
  - 还有一套是底层配套的 node 源码。（开发用）
3. 我之前测试生成了本地 localhost 的 HTML 页面，这里到完整上线还差什么？**答：deploy 这一步**。
  - 目前我使用 `hexo server` 命令，已经可以在 localhost 呈现正常的网页效果了，所以本地命令并没有什么问题。

## 关于主题
下一个需要解决的小问题是：如何确保我的电脑能够正常生成**主题（Theme）**
  1. 昨天测试的时候发现，主题既可以是存放在 theme 文件夹里的一个包（自己生成的文件），也可以是 npm 安装的一个 package。
  2. 当时我还很纳闷难道我本地的 npm package 还能应用到云端 HTML？根据原理解释的内容，主题只是 HTML 的内容罢了。
  3. 如果给定的 theme 无法正常安装，可以试试翻墙等途径。
  
## 开发建议
在 repo 里面放置多个分支，例如 main/master 分支存放 HTML 展示源码（同时也作为这个 repo 的默认分支），再开一个 source 分支存放 node 相关的源码。
  - 部署环节，我们可以指定 github.io 用 main 分支的 HTML 代码；
  - 开发环节，我们只要维护 source 分支的代码即可。换言之，就算有一天 main 分支的东西坏了，我也应该可以随时根据 source 的分支将网站复原出来。
