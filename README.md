# Abeniy 个人网站

中文个人作品与成长记录网站。

技术方案：Next.js App Router、TypeScript、CSS Modules、MDX、Three.js，静态导出至 GitHub Pages。

## 开发进度

- 本地目录已建立。
- 已实现原创 Low-poly 日夜篝火首页、五项中文导航与暂停动画。
- 日夜默认跟随当地时间（07:00 至 18:59 为白天），手动选择会保存；主题菜单可恢复自动模式。
- 已提供桌面与移动端日夜静态快照，减少动态、WebGL 失败与低性能时降级。
- 导航目标已有基础真实内容；作品双视图、完整 MDX 案例、游戏详细记录与实验正文留待首页确认后扩展。
- 未提供可公开下载的脱敏简历，未启用 Pages 发布。

## 首页验证与快照

需要本机安装 Microsoft Edge，并先运行开发服务器。

```sh
node scripts/check-home.mjs
node scripts/scene-snapshots.mjs
```

前者验证主题时间边界、设置保存、无 WebGL、减少动态、键盘菜单、布局、暂停与导航。
后者从同一 Three.js 场景导出 `public/scene/` 下的四张静态快照；修改场景后需重新导出。
默认测试地址是 http://localhost:3000 ，验收脚本可使用 TEST_ORIGIN 指定其他地址。

Safari、真实低性能手机、GPU 显存稳定性与 Lighthouse 分数尚需进一步验证。

## 在其他电脑运行

安装 Node.js 22 和 Git，然后执行：

```sh
git clone https://github.com/Abeniy/Abeniy.github.io.git
cd Abeniy.github.io
npm ci
npm run dev
```

打开 http://localhost:3000 。无需环境变量。
执行 `npm run build` 验证构建，静态产物输出到 `out/`。
开始工作前执行 `git pull`；换电脑前提交并推送修改。
Pages 工作流仅手动触发，本次不启用网站发布。

公开邮箱：1091068886@qq.com
