# 个人主页

极简现代风格的个人项目展示主页。

## 技术栈

纯静态 HTML / CSS / JavaScript，无需任何构建工具或框架。

## 本地预览

直接在浏览器中打开 `index.html` 即可，或者使用任意本地服务器：

```bash
# Python 3
python -m http.server 8080

# Node.js (需要安装 http-server)
npx http-server -p 8080
```

然后访问 `http://localhost:8080`

## 部署到 GitHub Pages

1. 在 GitHub 创建一个新的公开仓库（例如 `portfolio`）
2. 将本目录下的文件推送到仓库：

```bash
git init
git add .
git commit -m "Initial commit: personal homepage"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

3. 在 GitHub 仓库页面，进入 **Settings → Pages**
4. 在 "Branch" 下拉中选择 `main`，点击 **Save**
5. 等待几分钟，页面会部署到 `https://你的用户名.github.io/你的仓库名`

## 自定义内容

- **个人信息**：修改各 HTML 文件中的姓名、简介等占位内容
- **项目**：在 `index.html` 和 `projects.html` 中替换项目卡片
- **技能**：在 `about.html` 中修改技能标签
- **联系方式**：在 `contact.html` 中替换链接
- **样式**：在 `css/style.css` 中修改 `:root` 下的 CSS 变量来更换配色

## 文件结构

```
├── index.html              # 首页
├── projects.html           # 项目展示
├── about.html              # 关于我
├── contact.html            # 联系方式
├── artwork.html            # 画作详情
├── archer-vs-assassin.html # AI 对战详情
├── shogun-ai.html          # 游戏自动玩详情
├── ucla-game-lab.html      # UCLA 夏校详情
├── css/
│   └── style.css           # 全局样式
├── js/
│   └── main.js             # 全局脚本（导航栏、页脚注入）
└── images/                 # 图片素材
```
