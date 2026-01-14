---
title: "告别手动上传！踩坑一下午，终于搞定了 Hugo + GitHub Actions 全自动部署"
description: "手把手教你搭建自动化流水线。详细复盘 SSH 密钥权限拒绝、Git 推送失败等经典报错的解决方案，附赠 VS Code 极客工作区配置。"
date: 2026-01-14T23:30:00+08:00
lastmod: 2026-01-14T23:30:00+08:00
draft: false
slug: "hugo-github-actions-deploy-guide"
image: "https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN"
tags: 
  - "Hugo"
  - "GitHub Actions"
  - "CI/CD"
  - "Linux运维"
  - "踩坑记录"
categories: 
  - "技术折腾"
  - "全栈之路"
weight: 1
---
# 告别手动上传！踩坑一下午，终于搞定了 Hugo + GitHub Actions 全自动部署
## 📖 前言：为什么我要折腾这个？

作为一个追求效率（其实是懒）的技术爱好者，我实在受够了每次写完博客都要手动生成、连接服务器、拖拽上传文件的繁琐流程。

理想中的博客发布流程应该是这样的：
1. 在本地 VS Code 里写好文章。
2. 敲一行 `git push`。
3. **喝口水，网站自动更新。**

## 前言：为什么我要折腾这个？

作为一个追求效率（其实是懒）的技术爱好者，我实在受够了每次写完博客都要手动生成、连接服务器、拖拽上传文件的繁琐流程。

理想中的博客发布流程应该是这样的：
1. 在本地 VS Code 里写好文章。
2. 敲一行 `git push`。
3. **喝口水，网站自动更新。**

为了实现这个“极客梦”，我决定搭建一套 **Hugo + GitHub Actions + 腾讯云** 的自动化流水线。本以为半小时搞定，结果因为 SSH 密钥和 Linux 权限问题，硬是踩了几个小时的坑。

为了防止下次重装服务器时失忆，特此记录全流程，尤其是那些让我头秃的报错。

---

## 🛠️ 架构速览

* **本地环境**：Windows + VS Code (配置了透明背景与极客工作区)
* **静态生成器**：Hugo
* **代码仓库**：GitHub (私有仓库)
* **服务器**：腾讯云轻量应用服务器 (Debian/Ubuntu)
* **Web 服务**：Nginx
* **自动化工具**：GitHub Actions

---

## 🚧 踩坑实录：那些阻挡我自动化的“大Boss”

### 🛑 关卡一：Git Push 时的“拒绝访问”

刚初始化完仓库，准备推送到 GitHub 时，终端直接甩给我一个 `failed to push some refs`。

**原因分析**：
这是新手经典问题。我在 GitHub 建仓库时手滑勾选了“创建 README”，导致远程仓库里有一个本地没有的文件。Git 觉得这俩历史线对不上，拒绝合并。

**💡 解决方案**：
简单粗暴，直接强制把本地作为唯一真理：
```bash
# 关联远程仓库
git remote add origin [https://github.com/你的用户名/你的仓库.git](https://github.com/你的用户名/你的仓库.git)

# 强行覆盖远程（仅限第一次初始化时使用！）
git push -u origin main -f
```


---

### 🛑 关卡二：SSH 密钥的“密码陷阱”

GitHub Actions 需要一把“钥匙”才能进入我的服务器。我兴冲冲地在本地生成了密钥填进去，结果 Actions 日志直接报错：
`ssh: handshake failed: ssh: unable to authenticate`

**原因分析**：
我看日志发现提示 `private key is passphrase protected`。原来是我生成密钥时习惯性地输入了保护密码。**自动化脚本是没有手的，它没法在运行的时候输入密码**，所以直接握手失败。

**💡 解决方案**：
生成一个专门给机器用的“无密码”密钥：

```powershell
# -N "" 表示密码为空，-m PEM 是为了保证格式兼容性
ssh-keygen -t rsa -b 4096 -m PEM -f ~/.ssh/github_deploy -N ""

```

---

### 🛑 关卡三：Linux 权限的“洁癖” (最坑的一步！)

这是卡我最久的地方。明明密钥填对了，公钥也放进服务器的 `authorized_keys` 了，本地测试连接却依然提示：
`Permission denied (publickey)`

**原因分析**：
Linux 的 SSH 服务有极其严格的权限检查机制（简称“洁癖”）。
如果你的 `.ssh` 目录或者 `authorized_keys` 文件权限太开放（比如谁都能读写），SSH 会觉得这把锁不安全，直接禁用它，而且**不会告诉你原因**。

**💡 解决方案**：
必须严格执行权限修正“三部曲”：

```bash
# 1. 目录只能自己进 (700)
chmod 700 ~/.ssh

# 2. 钥匙文件只能自己读 (600)
chmod 600 ~/.ssh/authorized_keys

# 3. (容易漏) 确保用户家目录没有被设为 777
chmod 750 /root

```

---

### 🛑 关卡四：服务器配置的“隐形门”

搞定权限后，本地能连上了，但 GitHub Actions 还是报错。最后查出来是服务器 SSH 配置的问题。

**原因分析**：
云服务器出于安全考虑，默认是在 `/etc/ssh/sshd_config` 里禁止 `root` 用户远程登录的，甚至可能没开启公钥验证功能。

**💡 解决方案**：
修改 `/etc/ssh/sshd_config`，找到并修改以下核心配置：

```text
PubkeyAuthentication yes      # 开启公钥验证
PermitRootLogin yes           # 允许 Root 登录 (安全起见建议后续改用普通用户)

```

改完记得重启服务：`systemctl restart ssh`。

---

## ✨ 最终成果：丝滑的自动化体验

在解决了上述所有问题后，我看着 GitHub Actions 的界面从红色的 ❌ 变成了绿色的 ✅。

现在，我的工作流变成了：

1. **写作**：在 VS Code 沉浸式透明背景下，用 Markdown 敲下文字。
2. **提交**：`git commit -m "new post"` & `git push`。
3. **完成**：GitHub 自动编译 Hugo，自动通过 SCP 将静态文件传输到腾讯云 Nginx 目录。

### 🎨 附：我的 VS Code 极客配置

为了让写博客更有仪式感，我还专门配置了 VS Code 的 `.code-workspace`：

* **GlassIt-VSC 插件**：一键调整窗口透明度，让代码悬浮在壁纸上。
* **状态栏变色**：设置 `statusBar.background` 为深紫色，进入专注模式。
* **连体字体**：使用 `JetBrains Mono`，让 `=>` 等符号变得无比优雅。

---

## 📝 总结

这次折腾让我明白，**CI/CD（持续集成部署）** 并没有想象中那么遥不可及。虽然中间涉及到了 Git 冲突、SSH 协议细节、Linux 权限管理等底层知识，但当跑通那一刻，那种“掌控感”是无与伦比的。

如果你也在手动上传博客，强烈建议你也试试这套方案！

> **Next Step:** 下一步准备给服务器配置 HTTPS 证书，让浏览器地址栏加上那个安全的小锁。




