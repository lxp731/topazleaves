# Rust 项目发布指南：使用 cargo-dist 自动化发布到 GitHub

本指南详细介绍了如何使用 cargo-dist 工具将 Rust 项目自动化发布到 GitHub，涵盖从环境配置到持续集成的完整流程。

---

## 📋 目录

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Rust 项目使用 cargo-dist 发布到 GitHub 完整指南](#rust-项目使用-cargo-dist-发布到-github-完整指南)
  - [📋 目录](#-目录)
  - [1. 环境准备](#1-环境准备)
    - [1.1 安装 rustup（推荐）](#11-安装-rustup推荐)
    - [1.2 安装 cargo-dist](#12-安装-cargo-dist)
    - [1.3 卸载系统 Rust（可选但推荐）](#13-卸载系统-rust可选但推荐)
  - [2. 项目配置](#2-项目配置)
    - [2.1 完善 Cargo.toml](#21-完善-cargotoml)
    - [2.2 准备必要文件](#22-准备必要文件)
    - [2.3 代码检查](#23-代码检查)
  - [3. 初始化 cargo-dist](#3-初始化-cargo-dist)
    - [3.1 执行初始化](#31-执行初始化)
    - [3.2 生成的文件](#32-生成的文件)
    - [3.3 检查配置](#33-检查配置)
    - [3.4 预览发布计划（可选）](#34-预览发布计划可选)
  - [4. Git 配置与推送](#4-git-配置与推送)
    - [4.1 初始化 Git 仓库](#41-初始化-git-仓库)
    - [4.2 关联远程仓库](#42-关联远程仓库)
    - [4.3 启用 GitHub Actions](#43-启用-github-actions)
  - [5. 创建 Tag 触发发布](#5-创建-tag-触发发布)
    - [5.1 创建版本 Tag](#51-创建版本-tag)
    - [5.2 Tag 命名规范](#52-tag-命名规范)
  - [6. 验证发布结果](#6-验证发布结果)
    - [6.1 监控 GitHub Actions](#61-监控-github-actions)
    - [6.2 检查 Releases 页面](#62-检查-releases-页面)
    - [6.3 生成的文件示例](#63-生成的文件示例)
    - [6.4 测试安装](#64-测试安装)
  - [7. 后续版本更新](#7-后续版本更新)
    - [7.1 发布新版本流程](#71-发布新版本流程)
    - [7.2 使用 cargo-release 自动化（可选）](#72-使用-cargo-release-自动化可选)
  - [8. 常见问题排查](#8-常见问题排查)
  - [9. 附录：AUR 发布指南](#9-附录aur-发布指南)
    - [9.1 创建 PKGBUILD](#91-创建-pkgbuild)
    - [9.2 生成 .SRCINFO](#92-生成-srcinfo)
    - [9.3 提交到 AUR](#93-提交到-aur)
    - [9.4 用户安装](#94-用户安装)
  - [📌 快速检查清单](#-快速检查清单)
  - [🔗 相关资源](#-相关资源)

<!-- /code_chunk_output -->



---

## 1. 环境准备

### 1.1 安装 rustup（推荐）

不要使用系统自带的 Rust，请使用官方推荐的 rustup：

```bash
# 安装 rustup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# 生效环境变量
source "$HOME/.cargo/env"

# 验证安装
which cargo
# 应输出：/home/你的用户名/.cargo/bin/cargo

cargo --version
# 输出应包含 "rustup" 字样
```

### 1.2 安装 cargo-dist

```bash
# 安装 cargo-dist
cargo install cargo-dist

# 如果提示找不到命令，创建软链接
ln -s ~/.cargo/bin/dist ~/.cargo/bin/cargo-dist

# 验证安装
cargo dist --version
```

### 1.3 卸载系统 Rust（可选但推荐）

```bash
# Ubuntu/Debian
sudo apt remove rustc cargo
sudo apt autoremove

# CentOS/Fedora
sudo dnf remove rustc cargo
```

---

## 2. 项目配置

### 2.1 完善 Cargo.toml

确保 `Cargo.toml` 包含完整的元数据：

```toml
[package]
name = "your-project-name"
version = "0.1.0"
edition = "2021"
description = "项目简短描述"
license = "MIT"
repository = "https://github.com/你的用户名/项目名"
homepage = "https://..."
keywords = ["rust", "tool"]
categories = ["command-line-utilities"]

[profile.release]
strip = true           # 去除调试符号，减小体积
lto = true             # 链接时优化
codegen-units = 1      # 增加编译时间但优化更好
```

### 2.2 准备必要文件

确保项目根目录包含：

```
your-project/
├── Cargo.toml
├── README.md          # 必须，包含安装和使用说明
├── LICENSE            # 必须，与 Cargo.toml 中 license 一致
├── CHANGELOG.md       # 推荐，记录版本变更
└── src/
    └── main.rs
```

### 2.3 代码检查

```bash
cargo fmt --check
cargo clippy
cargo test
```

---

## 3. 初始化 cargo-dist

### 3.1 执行初始化

在项目根目录执行：

```bash
cargo dist init
```

### 3.2 生成的文件

初始化后会生成以下文件：

| 文件 | 作用 |
| :--- | :--- |
| `.github/workflows/release.yml` | GitHub Actions 自动发布流程 |
| `dist-workspace.toml` | cargo-dist 配置文件 |
| `Cargo.toml` | 可能添加 `[package.metadata.dist]` |

### 3.3 检查配置

查看 `dist-workspace.toml` 确认目标平台：

```toml
[dist]
targets = [
    "x86_64-unknown-linux-gnu",
    "x86_64-apple-darwin",
    "x86_64-pc-windows-msvc",
    "aarch64-apple-darwin",
]
```

### 3.4 预览发布计划（可选）

```bash
cargo dist plan
```

---

## 4. Git 配置与推送

### 4.1 初始化 Git 仓库

```bash
# 如果还没初始化
git init

# 添加所有文件
git add .

# 提交
git commit -m "feat: init cargo-dist release workflow"
```

### 4.2 关联远程仓库

```bash
# 替换为你的仓库地址
git remote add origin https://github.com/你的用户名/你的项目名.git

# 推送代码
git push -u origin main
# 或 master，取决于你的默认分支
```

### 4.3 启用 GitHub Actions

1. 访问 GitHub 仓库
2. 点击 **Settings** → **Actions** → **General**
3. 确保 **Allow GitHub Actions** 已启用
4. 确保 **Allow GitHub Actions to create releases** 已启用

---

## 5. 创建 Tag 触发发布

### 5.1 创建版本 Tag

```bash
# 创建带注释的 Tag（必须 v 开头）
git tag -a v0.1.0 -m "Release version 0.1.0"

# 推送 Tag 到远程（触发 GitHub Actions）
git push origin v0.1.0
```

### 5.2 Tag 命名规范

| 格式 | 说明 |
| :--- | :--- |
| `v0.1.0` | ✅ 推荐，语义化版本 |
| `v1.0.0` | ✅ 正式版本 |
| `v0.1.0-beta.1` | ✅ 预发布版本 |
| `0.1.0` | ❌ 缺少 v 前缀，可能不触发 |

---

## 6. 验证发布结果

### 6.1 监控 GitHub Actions

1. 打开 GitHub 仓库
2. 点击 **Actions** 标签
3. 找到 **Release** 工作流
4. 等待运行完成（通常 5-15 分钟）

### 6.2 检查 Releases 页面

访问：`https://github.com/你的用户名/你的项目名/releases`

应看到：
- ✅ 版本标签 `v0.1.0`
- ✅ 各平台二进制包
- ✅ 安装脚本

### 6.3 生成的文件示例

| 文件 | 说明 |
| :--- | :--- |
| `your-project-v0.1.0-x86_64-unknown-linux-gnu.tar.gz` | Linux 包 |
| `your-project-v0.1.0-x86_64-apple-darwin.tar.gz` | macOS 包 |
| `your-project-v0.1.0-x86_64-pc-windows-msvc.zip` | Windows 包 |
| `installer.sh` | Linux/macOS 安装脚本 |
| `installer.ps1` | Windows 安装脚本 |
| `.sha256` | 校验和文件 |

### 6.4 测试安装

```bash
# Linux/macOS
curl --proto '=https' --tlsv1.2 -sSf https://github.com/你的用户名/你的项目名/releases/download/v0.1.0/installer.sh | sh

# Windows PowerShell
powershell -c "irm https://github.com/你的用户名/你的项目名/releases/download/v0.1.0/installer.ps1 | iex"
```

---

## 7. 后续版本更新

### 7.1 发布新版本流程

```bash
# 1. 更新 Cargo.toml 中的版本号
# 2. 提交更改
git add Cargo.toml
git commit -m "chore: bump version to 0.2.0"
git push

# 3. 创建新 Tag
git tag -a v0.2.0 -m "Release version 0.2.0"
git push origin v0.2.0
```

### 7.2 使用 cargo-release 自动化（可选）

```bash
# 安装
cargo install cargo-release

# 自动更新版本、打 Tag、推送
cargo release patch --execute    # 0.1.0 → 0.1.1
cargo release minor --execute    # 0.1.0 → 0.2.0
cargo release major --execute    # 0.1.0 → 1.0.0
```

---

## 8. 常见问题排查

| 问题 | 解决方案 |
| :--- | :--- |
| `cargo dist` 命令找不到 | 创建软链接：`ln -s ~/.cargo/bin/dist ~/.cargo/bin/cargo-dist` |
| Actions 未触发 | 检查 Tag 格式是否为 `v*`，检查仓库 Actions 权限设置 |
| 编译失败 | 查看 Actions 日志，检查代码是否有平台特定问题 |
| 权限错误 | Settings → Actions → General → 启用 "Allow GitHub Actions to create releases" |
| 想手动触发 | Actions 页面 → 选择工作流 → "Run workflow" |
| 想预览打包结果 | 运行 `cargo dist plan` |

---

## 9. 附录：AUR 发布指南

### 9.1 创建 PKGBUILD

```bash
# Maintainer: Your Name <your.email@example.com>
pkgname=你的项目名
pkgver=0.1.0
pkgrel=1
pkgdesc="项目描述"
arch=('x86_64' 'aarch64')
url="https://github.com/你的用户名/你的项目名"
license=('MIT')
depends=()
makedepends=('cargo')
source=("$pkgname-$pkgver.tar.gz::https://github.com/你的用户名/你的项目名/archive/refs/tags/v$pkgver.tar.gz")
sha256sums=('SKIP')

build() {
    cd "$srcdir/$pkgname-$pkgver"
    cargo build --release
}

package() {
    cd "$srcdir/$pkgname-$pkgver"
    install -Dm755 "target/release/$pkgname" "$pkgdir/usr/bin/$pkgname"
    install -Dm644 LICENSE "$pkgdir/usr/share/licenses/$pkgname/LICENSE"
}
```

### 9.2 生成 .SRCINFO

```bash
sudo pacman -S pacman-contrib
cd aur
makepkg --printsrcinfo > .SRCINFO
```

### 9.3 提交到 AUR

```bash
# 克隆 AUR 仓库
git clone ssh://aur@aur.archlinux.org/你的项目名.git

# 复制文件并提交
cp PKGBUILD .SRCINFO 你的项目名/
cd 你的项目名
git add PKGBUILD .SRCINFO
git commit -m "Initial release v0.1.0"
git push
```

### 9.4 用户安装

```bash
yay -S 你的项目名
# 或
paru -S 你的项目名
```

---

## 📌 快速检查清单

```
□ rustup 已安装且 PATH 正确
□ cargo-dist 已安装且可运行
□ Cargo.toml 元数据完整
□ README.md 和 LICENSE 存在
□ cargo dist init 成功执行
□ Git 仓库已关联远程
□ GitHub Actions 已启用
□ Tag 格式为 v*.*.*
□ Releases 页面可见下载文件
□ 安装脚本测试通过
```

---

## 🔗 相关资源

- [cargo-dist 官方文档](https://github.com/axodotdev/cargo-dist)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [AUR 提交指南](https://wiki.archlinux.org/title/AUR_submission_guidelines)
- [语义化版本规范](https://semver.org/)