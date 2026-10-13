# 医务工匠进校园活动回看网页

这份网页可通过 GitHub Pages 发布，包含实践部小团形象、三位嘉宾介绍与故事、语音寄语入口、文字稿及会后回顾入口。

## 首次发布

1. 在自己的 GitHub 账号下创建公开仓库，例如 medical-craftsmen。
2. 上传此目录的全部文件。index.html 必须直接位于仓库根目录，不要再套一层文件夹。
3. 在仓库 Settings → Pages 中，选择 Deploy from a branch；分支选择 main，目录选择 /(root)，保存。
4. 等待 GitHub 显示网站地址。用手机浏览器和微信扫码实测页面、图片和后续音频播放。
5. 确认能访问后，用 GitHub Pages 的正式地址生成新的二维码。原 chatgpt.site 地址对应的二维码不可继续用于这个新网址。

## 后续更新

修改 content.json，再提交到同一个仓库。保持 GitHub 用户名、仓库名称及访问路径不变，二维码不必更换。

- guests.zang、guests.du、guests.zheng 分别对应臧潞、杜鹏、郑宪友。
- audioSrc：目前为 null；录音确认后将 MP3 上传到仓库根目录，并填写相对地址，例如 zang-message.mp3。
- transcript：目前为 null；补入经嘉宾确认的文字稿。换段在 JSON 字符串中使用 \n。
- recaps[].url：目前为 null；补入会后推送或纪要的正式链接，页面会显示可点击的阅读入口。
- 嘉宾故事在 index.html 中，可直接修改文字后提交。

## 说明

这个网页不需要服务器程序、数据库或构建步骤。语音、文字稿和会后推送尚未提供，页面明确标注待更新。公开仓库内的文件可被别人查看，上传时只放准备用于公开展示的素材。
