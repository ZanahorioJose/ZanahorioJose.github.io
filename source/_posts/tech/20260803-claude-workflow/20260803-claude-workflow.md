---
title: Claude Code 工作流分享
date: 2026-08-03 00:00:00
tags: ['Claude Code']
category: ['开发', 'AI']
---

> I barely even touch the keyboard."
> —— Andrej Karpathy

从某一天开始，和 AI 对话的方式已经变成了语音输入，（当然，这得益于 AI 语音识别的发展）
此时还在用打字跟 AI 对话，就显得非常缓慢了。
我不知道官方有没有什么称呼，现在我们已经从 Vibe Coding 快速迈向 Voice Coding 了。

工欲善其事，必先利其器。徒有想要语音输入的想法还不够，还得有好上手的工具。
好巧不巧，**自媒体**的蓬勃发展给语音对话产生了无限可能，遍地的桌面麦和领夹麦让 Voice Coding 变得触手可及。
这次我是入手了一个大疆的 DJI MIC MINI 2，一拖一只要300块出头，就能在工作中解放双手。

{% asset_img dji.jpg 大疆麦克风真的是好物（左边是接收器，右边是麦克风） %}

我用的 AI 输入法是 AutoGLM，国产的。

- AutoGLM 最大的优势就是便宜，因为智谱似乎想让这个产品永远免费下去。
- 但是免费毕竟也是有一些代价的，和大家用的比较多的 Typeless 相比（Typeless 包年的话月费是12美元），AutoGLM 没有直接的翻译和问答功能，不过这对于我来说影响不是很大。

与此同时我觉得最神奇的是这些语音识别软件都已经做出了“气声”识别功能，也就是说我在工位上用气声和 AI 对话，它的准确率也非常高。
这还说啥了兄弟，都给你了呗。

另外也分享一个最近使用的情况。简单来说我需要对齐两个数据库（一个在线一个本地），其中在线数据库里面有非常多脏数据，我需要和本地信息一个个比较。
相当于有非常多的 corner case，我需要登陆网站一一核对。

这个项目登陆网站查看不是最复杂的，最复杂的部分是我需要跟 AI 解释清楚两个数据库的运行逻辑，并在出现 corner case 之后制定好每一个场景的修复方案。
光听的这个做法，就免不了和 Agent 疯狂码字。放在以前，光把需求和 Agent 说清楚就要半天时间，现在我就仿佛在和一个同事聊天，
用**“话疗”**的方式就把的需求说得明明白白。到了解决 corner case 的时间点，就开始像收发室分配快递一样，“你这样，你这样，你那样，……”，娓娓道来。

做这个项目之前还发生了一件事，就是 DeepSeek V4 Flash 正式版 API 上线了，所以在 LLM 上我又得到了一次助力。
相较于当前的 Pro，Flash 的速度更快，理解能力更强，也是优化了我的项目体验。

这一天我扑哧扑哧和 Agent 对话了10个小时，花了小小5块钱，我感觉赚飞了。

{% asset_img credit.png 猛猛干一天用了区区4块钱 %}

{% asset_img token.png DeepSeek Flash 好用，多用 %}

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