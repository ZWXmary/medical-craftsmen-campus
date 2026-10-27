# 医务工匠进校园活动网页

正式标题：“仁心引路，匠心致远” 医务工匠进校园——共话医路初心与职业坚守

保持原仓库、main 分支及根目录发布，原网址和二维码不变。

## 内容更新
- index.html：故事、活动介绍、嘉宾资料、访谈话题、时间地点。
- content.json：三位嘉宾的 audioSrc（录音相对路径）、transcript（文字稿）；recaps 中填写会后文章 url。未提供时保留 null。
- app.js：含 content.json 的本地兜底数据。在线读取 content.json 优先；如需直接双击网页预览也一致，可同步修改 fallback 数据。
- story-strip.png：简约小团故事插画；象征性演绎，不是嘉宾肖像或现场实录。三个故事按左中右对应臧潞、杜鹏、郑宪友。
- practice-tuanzi.png：用户提供的实践部小团原图。

录音和文字稿可分别发布。不要把音频放成自动播放。会后文章未上线时显示“活动后揭秘”。

## 发布
把本目录的 index.html、style.css、app.js、content.json、story-strip.png、practice-tuanzi.png、organization-emblem.jpg、.nojekyll 上传至现有仓库根目录（覆盖同名文件），提交到 main。保持 GitHub Pages 原有设置。不要将整个文件夹嵌套上传。
