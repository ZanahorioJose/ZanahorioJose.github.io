# 我的力量成果 · 健身主页

一个可直接嵌入 Hexo / 纯静态托管的个人健身主页。动作、部位、重量、组数、次数、画廊闪卡均由 JSON 数据驱动，右侧为健身知识小课堂。

## 上传 Hexo 请传这个文件夹整体

以 workout 文件夹为根目录，将文件原样放到站点资源目录即可（Hexo 会以 http 服务，JSON 动态渲染正常）。

| 路径 | 说明 |
| --- | --- |
| index.html | 主页面（通过 fetch 动态读取下方两个 JSON 渲染） |
| workout-data.json | 动作数据（20 个动作，可直接增删改） |
| flash-data.json | 画廊闪卡数据（8 张，可直接增删改） |
| README.md | 本说明 |
| assets/ | 全部素材：动作图、背景图、画廊卡、术语脚本 |

## 本地预览提示

因页面用 fetch 读取 JSON，请通过本地 HTTP 服务器打开，不要直接双击 file://。例如：

    npx serve .        # 或
    python -m http.server 8000   # 然后访问 http://localhost:8000

上传到 Hexo 后是 http 环境，无需此步骤。

## 命名规范

- **动作素材**：assets/move-<动作代码>.jpg|.gif，如 move-squat.jpg、move-bench-press.gif。db- 表示哑铃，杠铃不加前缀。
- **背景图**：assets/bg-left.webp、assets/bg-right.webp。
- **画廊卡**：assets/gallery-1.jpg ~ gallery-7.jpg。
- **脚本**：assets/term-tips.js（术语 hover 释义）。

规则：统一小写英文、用连字符（-）分隔、不使用中文/空格/非法字符、扩展名小写。

## workout-data.json 字段（动作卡）

id, nameZh(中文名), name(英文名), part(部位), partEmoji(部位图标), equipmentZh(器材), targetZh(目标肌群), img, gif, weight, sets, reps。

增加动作：复制一条记录改字段；删除动作：删掉对应记录即可。图片放到 assets/ 并命名规范。

## flash-data.json 字段（画廊闪卡）

{ img, label }。img 为 assets/ 下图片路径，label 为卡片文字。新增闪卡直接加一条记录，图片放到 assets/。

## 相对路径约定

页面所有资源均用相对路径（assets/xxx），可整包转移到任意子路径部署。外部字体（Sora/Roboto）经 Google Fonts CDN 加载，需要联网。

## 素材与版权说明

- **动作数据**：来自 GitHub [hasaneyldrm/exercises-dataset](https://github.com/hasaneyldrm/exercises-dataset)（MIT License，1,324 个动作）。
- **动作图片/动图**：© [Gym Visual（Gymvisual.com）](https://gymvisual.com/)，仅供个人学习，**请勿商用**。
- **闪卡全息效果**：灵感来自 [simeydotme/pokemon-cards-css](https://github.com/simeydotme/pokemon-cards-css)。
