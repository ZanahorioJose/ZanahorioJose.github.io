---
title: Claude Code 使用技巧（个人向）
date: 2026-07-11 00:00:00
tags: ['Claude Code', '教程', 'AI Agent']
category: ['技术', 'AI']
---

# 写在前面

Claude Code 已经被证明是一个非常强大的 Agent 工具，而且 Anthropic 也在不断更新这项技术。我相信这篇文章总会有过时的部分，我也会不断总结更新这里的说明，希望能让更多人和我一起用好 Claude Code，来优化自己的生产力。

> **本文长期更新**

# 使用技巧


## 终端操作

1. 如果需要大量的 Prompt 输入，但是来回定位比较麻烦，并且担心不小心按到回车，可以用 `Ctrl+G` 调出一个记事本，在这里编辑好之后保存并关闭，就可以看到终端里面有你刚才写在记事本里面的大量文本了。

1. 很多人会发现在 CMD 里面，`Ctrl+C` 是终止命令的意思：双击两次组合键之后能推出 Claude Code。（这时候就发现 Mac 的好了，因为 Mac 的复制是 `Command+C`。但其实系统留了一手，用了一个我们平时基本不会用的按键：Insert。在终端里面 `Ctrl+Ins` 是复制，`Shift+Ins` 是粘贴。


## 对话技巧

1. 一般来说我会在启动 Claude 的时候就选择对应的项目文件夹，每次对话尽可能地进行隔断，不要让两组不相干的对话互相干扰。

1. 一般开启之后，我会用 `/rename` 直接给当前对话进行重命名，这样下次打开之后可以用 `/resume` 比较方便地找到。
        
    - 有一个小细节是：对于 Claude Code 来说，它有一个自动压缩（Auto Compact）机制， 如果一个对话的前置上下文长度超过了模型上限，那么它就会把最早的对话进行压缩总结，这个过程中就会丢失相应的信息。
    - 为了解决这个问题，我觉得有两点可以进行优化：
      
      1. 在配置 `settings.json` 里面的模型的时候，可以在模型后面加上 [1m]，这样 Claude 就会认为这是一个 1M context 的模型，给它配置 1M 的上下文；
      1. 当对话很长之后，重新开启一个新的对话，保留一定的信息密度。 
        > 毕竟模型和人类一样，接受的信息过多也会变笨，所以控制一段对话的长度也是很重要的一件事。
        - 在一段对话中，可以启用 `/context` 来查看当前对话的上下文占用量，如果太满了，就意味着有必要进行对话拆分了。
        - `/context` 里面有一项是 Autocompact buffer，我当前的模型是 16.5%，它就是系统流出来的给自动压缩使用的上下文。因为读取旧消息、生成摘要、写回压缩后的内容也是需要空间的。

## 技能插件

在 Claude 里面，我是在本地制作了一个 marketplace，并存放了一些技能，以插件（plug-in）的形式进行调用。我在另一个 Repo 里面介绍了这种做法。最终的效果就是我可以很简单地用斜杠命令调用我的技能。

### 配置本地插件的方法


<script src="https://giscus.app/client.js"
        data-repo="ZanahorioJose/ZanahorioJose.github.io"
        data-repo-id="R_kgDOSWl5yg"
        data-category="Blog Comment"
        data-category-id="DIC_kwDOSWl5ys4DArDd"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="light"
        data-lang="zh-CN"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
