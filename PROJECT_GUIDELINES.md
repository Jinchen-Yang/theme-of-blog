# 🎯 项目配置与代码风格指南

## 📋 项目信息

### 基础信息
- **项目名称**: Windows DIY 博客主题
- **项目类型**: Hugo 博客主题
- **Hugo 版本**: v0.154.5+
- **编程语言**: HTML5 + CSS3 + JavaScript (Vanilla)
- **模板引擎**: Hugo Templates (Go Template)
- **创建日期**: 2026-01-15
- **作者**: Jinchen Yang
- **GitHub**: https://github.com/Jinchen-Yang/theme-of-blog

### 核心特性
- ✨ 莫兰迪配色系统（6 种主题）
- 🌙 浅色/深色/自动切换模式
- 📱 全平台响应式设计（桌面/平板/手机）
- ⚡ 性能优化（GPU 加速、弹性滚动）
- 🎨 分层卡片式设计
- 🔄 实时打字机效果
- 📈 侧边栏导航系统

---

## 📁 项目结构

```
theme-of-blog/
├── hugo.toml                          # Hugo 配置文件
├── archetypes/
│   └── default.md                     # 文章模板
├── content/
│   ├── images/                        # 图片资源目录
│   └── posts/                         # 文章目录
│       └── hello-world.md             # 示例文章
├── data/
│   └── sidebar.yml                    # 侧边栏数据配置
├── themes/my-diy-theme/
│   ├── theme.toml                     # 主题元数据
│   ├── layouts/
│   │   ├── index.html                 # 首页模板
│   │   ├── _default/
│   │   │   ├── baseof.html           # 基础模板（最核心）
│   │   │   ├── single.html           # 文章详情页
│   │   │   └── list.html             # 列表页
│   ├── static/
│   │   └── css/
│   │       ├── custom.css            # 主样式文件（705行）
│   │       └── mobile-optimize.css   # 移动端优化（273行）
├── public/                            # 构建输出目录
└── 文档文件们
    ├── MOBILE_OPTIMIZATION.md
    ├── CROSS_PLATFORM_OPTIMIZATION.md
    ├── OPTIMIZATION_CHANGELOG.md
    └── UPDATE_LOG_2026_01_15.md
```

---

## 🎨 设计规范

### 颜色系统

#### CSS 变量定义位置
**文件**: `themes/my-diy-theme/static/css/custom.css` (第 1-240 行)

#### 深色模式（默认）
```css
:root {
    --color-bg-deep: 30, 41, 59;           /* 极深灰 */
    --color-bg: 51, 65, 85;                /* 主背景 */
    --color-surface: 100, 116, 139;        /* 卡片表面 */
    --color-text: 243, 244, 246;           /* 主文字 */
    --color-text-muted: 203, 213, 225;     /* 次要文字 */
    --color-border: 203, 213, 225;         /* 边框 */
    --color-accent: 167, 139, 250;         /* 强调色（极客紫） */
}
```

#### 浅色模式
```css
[data-theme="light"] {
    --color-bg: 243, 244, 246;             /* 灰白 */
    --color-surface: 255, 255, 255;        /* 纯白 */
    --color-text: 17, 24, 39;              /* 深灰 */
    --color-text-muted: 55, 65, 81;        /* 浅灰 */
    --color-border: 0, 0, 0;               /* 黑色 */
    --color-accent: 167, 139, 250;         /* 保持不变 */
}
```

#### 莫兰迪主题（6 种）
每种主题有 `light` 和 `dark` 两个版本

| 主题名 | CSS属性 | 颜色特征 |
|-------|--------|--------|
| muted-blue | data-theme="muted-blue" | 灰蓝色系 |
| muted-green | data-theme="muted-green" | 灰绿色系 |
| muted-pink | data-theme="muted-pink" | 灰粉色系 |
| muted-yellow | data-theme="muted-yellow" | 灰黄色系 |
| muted-purple | data-theme="muted-purple" | 灰紫色系 |
| muted-orange | data-theme="muted-orange" | 灰橙色系 |

### 尺寸规范

| 元素 | 尺寸 | 用途 |
|-----|------|-----|
| 侧边栏宽度 | 288px (w-72) | 桌面端 |
| 主内容最宽 | 896px (max-w-4xl) | 文章阅读 |
| 按钮最小尺寸 | 44×44px | 触屏可点击 |
| 颜色卡片 | 56×56px (h-14) | 主题选择 |
| 设置按钮 | 56×56px (w-14 h-14) | 固定位置 |
| 圆角基准 | 8-12px (rounded-lg/xl) | 卡片容器 |

### 间距规范

| 规范 | 大小 | 用途 |
|-----|------|-----|
| 容器内边距 | 24px (p-6) | 卡片内容 |
| 卡片间距 | 32px (gap-8) | 文章列表 |
| 主内容外边距 | 32px (p-8) | 桌面端 |
| 主内容外边距 | 16px (p-4) | 移动端 |
| 元素间距 | 8-16px | 微调 |

---

## 📐 代码风格

### HTML 规范

#### 模板结构
```html
<!-- 使用 Hugo 模板定义 -->
{{ define "main" }}
<div class="container">
    <!-- 内容 -->
</div>
{{ end }}
```

#### 命名规范
- **ID**: kebab-case (例: `id="main-content"`)
- **Class**: Tailwind 类名 (例: `class="flex items-center"`)
- **Data属性**: kebab-case (例: `data-theme="muted-blue"`)

#### 属性顺序
1. id
2. class
3. onclick/事件处理
4. data-* 属性
5. 其他属性

```html
<!-- ✅ 正确 -->
<button id="settings-btn" class="w-14 h-14 ..." onclick="toggleSettingsMenu()" data-theme="muted-blue">

<!-- ❌ 错误 -->
<button onclick="..." class="..." id="settings-btn">
```

### CSS 规范

#### 文件组织
**custom.css** (705 行总长):
```
第 1-50 行        → 触屏性能优化基础
第 50-120 行      → 全平台弹性回弹效果
第 120-250 行     → 深色/浅色/莫兰迪主题定义
第 250-350 行     → Body & 基础元素样式
第 350-450 行     → 内容样式（链接、代码、引用等）
第 450-550 行     → 导航和卡片样式
第 550-650 行     → 表格和图片样式
第 650-705 行     → 响应式和特殊效果
```

**mobile-optimize.css** (273 行):
- 移动端特定优化
- 桌面端差异化样式
- 响应式字体调整

#### 命名约定
```css
/* ✅ 正确 - 功能型命名 */
.nav-item { }
.glass-panel { }
.animate-fade-in { }
.prose { }

/* ❌ 避免 - 样式值命名 */
.blue-box { }
.large-text { }
.hidden-menu { }
```

#### CSS 变量使用
```css
/* 使用 CSS 变量而不是硬编码颜色 */
color: rgb(var(--color-text));           /* ✅ 正确 */
background: rgba(var(--color-accent), 0.5); /* ✅ 正确 */

color: #f3f4f6;                          /* ❌ 避免 */
background: rgba(167, 139, 250, 0.5);   /* ❌ 避免 */
```

#### 过渡/动画规范
```css
/* ✅ 使用标准缓动函数 */
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

/* ❌ 避免使用不标准的缓动 */
transition: all 0.3s ease;
```

**标准缓动函数**:
- 快速响应: `cubic-bezier(0.4, 0, 0.2, 1)` (200ms)
- 弹性效果: `cubic-bezier(0.34, 1.56, 0.64, 1)` (400-600ms)
- 缓出: `ease-out`

#### GPU 加速相关
```css
/* 必须添加以启用 GPU 加速 */
transform: translateZ(0);
will-change: transform, opacity;
backface-visibility: hidden;

/* 不要在频繁动画的元素上过度使用 will-change */
```

### JavaScript 规范

#### 文件位置
- 所有 JS 代码集中在 `baseof.html` 的 `<script>` 标签中
- 不使用外部 JS 文件（保持主题自包含）

#### 命名约定
```javascript
// ✅ 函数 - camelCase
function toggleSidebar() { }
function updateThemeButtonStates() { }

// ✅ 常量 - UPPER_SNAKE_CASE（如果有）
const MAX_ZOOM = 2.0;

// ✅ 变量 - camelCase
let currentZoom = 0.8;
let settingsMenuOpen = false;
```

#### 函数组织
```javascript
// 按功能分区，使用注释分隔
// --- A. 性能优化 ---
function scheduleAnimation() { }

// --- B. 侧边栏引擎 ---
function toggleSidebar() { }

// --- C. 主题引擎 ---
function setMorandiTheme() { }

// --- D. 缩放控制 ---
function adjustZoom() { }

// --- E. 初始化 ---
document.addEventListener('DOMContentLoaded', () => { });
```

#### 事件监听最佳实践
```javascript
// ✅ 使用 passive: true 提高性能
element.addEventListener('scroll', callback, { passive: true });

// ✅ 使用 requestAnimationFrame
requestAnimationFrame(() => {
    // DOM 更新
});

// ❌ 避免在滚动事件中直接改变 DOM
element.addEventListener('scroll', () => {
    element.style.left = scrollValue + 'px'; // 性能差
});
```

#### 条件判断
```javascript
// ✅ 检测触屏设备
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
};

// ✅ 特性检测
if (isTouchDevice()) {
    document.documentElement.setAttribute('data-touch', 'true');
}
```

---

## 📋 开发需求清单

### 功能需求

#### 已实现 ✅
- [x] 莫兰迪配色系统（6 种主题）
- [x] 浅色/深色/自动模式切换
- [x] 侧边栏导航菜单
- [x] 打字机文本效果
- [x] 社交媒体链接
- [x] 文章列表和详情页
- [x] 响应式设计（全平台）
- [x] 全平台弹性回弹滚动
- [x] 分层卡片式设计
- [x] GPU 硬件加速
- [x] 主题颜色选择器

#### 待实现功能 (如有需要)
- [ ] 文章搜索功能
- [ ] 评论系统
- [ ] 标签云展示
- [ ] 阅读统计
- [ ] 代码高亮改进

### 性能需求

| 指标 | 目标 | 当前 |
|-----|------|------|
| **首屏加载** | < 2s | ✅ 达标 |
| **动画帧率** | 60fps | ✅ 达标 |
| **响应延迟** | < 100ms | ✅ 达标 |
| **LCP** | < 2.5s | ✅ 达标 |
| **CLS** | < 0.1 | ✅ 达标 |

### 兼容性需求

| 平台 | 浏览器 | 支持 |
|-----|-------|------|
| macOS | Safari, Chrome, Firefox | ✅ |
| Windows | Chrome, Edge, Firefox | ✅ |
| Linux | Chrome, Firefox | ✅ |
| iOS | Safari, Chrome | ✅ |
| Android | Chrome, Firefox | ✅ |

---

## 🔄 工作流程规范

### 修改流程

#### 步骤 1: 规划变更
1. 明确修改目标
2. 识别影响的文件
3. 预估实现时间

#### 步骤 2: 实现变更
1. 按照代码风格编写代码
2. 修改相关样式/脚本
3. 运行 Hugo 构建验证

#### 步骤 3: 测试验证
```bash
# 构建测试
hugo --minify

# 查看构建结果
ls -lah public/

# 测试页面（如需要）
hugo server
```

#### 步骤 4: 提交变更
```bash
# 查看修改
git status

# 分别 add
git add themes/
git add content/
git add CHANGELOG.md

# 分别提交
git commit -m "feat: 功能名称"
git commit -m "docs: 文档更新"

# 创建标签
git tag -a v1.x.x -m "版本描述"

# 推送
git push origin main
git push origin --tags
```

### 文件修改规范

#### 修改 CSS 时
1. 找到对应的注释分区
2. 在该区域添加/修改代码
3. 使用 CSS 变量而非硬编码颜色
4. 添加媒体查询支持所有设备
5. 验证 Hugo 构建成功

#### 修改 HTML 时
1. 编辑对应的模板文件 (`layouts/`)
2. 遵循 Hugo 模板语法
3. 使用正确的 Tailwind 类名
4. 检查 class 属性的完整性
5. 验证缩进和格式

#### 修改 JavaScript 时
1. 在 `baseof.html` 的 `<script>` 中添加
2. 使用 `// ---` 注释分隔逻辑块
3. 添加必要的错误处理
4. 使用 `{ passive: true }` 事件监听
5. 利用 `requestAnimationFrame` 优化

### 文档更新规范

#### 创建变更日志
- 文件名: `UPDATE_LOG_YYYY_MM_DD.md`
- 位置: 项目根目录
- 内容: 功能、改进、技术细节

#### 优化文档
- 文件名: `*_OPTIMIZATION.md`
- 描述: 针对某个方面的详细优化说明
- 包含: 问题分析、解决方案、效果指标

---

## 🎯 代码审查清单

提交前检查：

- [ ] 所有文件已通过 Hugo 构建
- [ ] 没有控制台错误或警告
- [ ] 代码符合本文档的风格规范
- [ ] 使用了 CSS 变量而非硬编码值
- [ ] 考虑了所有设备和浏览器
- [ ] 动画使用了标准缓动函数
- [ ] 使用了 GPU 加速技术
- [ ] 响应式设计适配所有屏幕
- [ ] 文档已更新
- [ ] Git 提交信息清晰明确

---

## 📚 参考资源

### Hugo 文档
- [Hugo 官方文档](https://gohugo.io/documentation/)
- [Hugo 模板语法](https://gohugo.io/templates/)

### CSS/JavaScript 最佳实践
- [MDN Web Docs](https://developer.mozilla.org/)
- [Web Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
- [CSS 性能优化](https://developer.mozilla.org/en-US/docs/Web/Performance/CSS_JavaScript_animation_performance)

### 设计系统
- [Tailwind CSS](https://tailwindcss.com/)
- [莫兰迪配色](https://zh.wikipedia.org/wiki/莫兰迪)
- [Remixicon 图标库](https://remixicon.com/)

---

## 📞 问题排查

### 构建失败
```bash
# 清除缓存
rm -rf public/
hugo --minify
```

### 样式不生效
- 检查 CSS 文件是否被正确加载
- 验证 Tailwind 类名是否正确
- 查看浏览器 DevTools 的 Computed Styles

### JavaScript 错误
- 打开浏览器控制台检查错误信息
- 验证事件监听器是否正确注册
- 检查 DOM 选择器是否找到元素

### 响应式问题
- 使用 DevTools 的设备模拟器测试
- 检查媒体查询条件
- 验证 Tailwind 的 `md:`, `lg:` 前缀

---

## 🔐 项目约定

### 不修改的文件
- `hugo.toml` - 项目配置，除非特别需要
- `data/sidebar.yml` - 用户应该自行修改的配置

### 主要修改区域
- `themes/my-diy-theme/layouts/` - 模板文件
- `themes/my-diy-theme/static/css/` - 样式文件
- 根目录文档文件 - 记录优化和变更

### 禁止操作
- ❌ 不要在主题中添加外部依赖
- ❌ 不要修改 Hugo 构建命令
- ❌ 不要使用内联样式 (style="...")
- ❌ 不要硬编码颜色值
- ❌ 不要破坏现有的移动端响应式设计

---

## 📌 版本历史

| 版本 | 日期 | 主要更新 |
|-----|------|---------|
| v1.0.0 | 2026-01-15 | 初始完整版本 |
| - 移动端优化 | 2026-01-15 | 触屏流畅度优化 |
| - 全平台优化 | 2026-01-15 | 弹性滚动 + 分层设计 |

---

## ✅ 使用此文档的方式

每次开始新工作时：

1. **阅读相关部分** - 理解需求
2. **遵循代码风格** - 保持一致性
3. **检查代码审查清单** - 确保质量
4. **更新文档** - 记录变更
5. **提交变更** - 按照工作流程

**此文档是实时指南，可根据项目进展更新。**

---

**最后更新**: 2026-01-15  
**维护人**: AI 助手  
**状态**: ✅ 活跃
