# kns 工具安装与使用指南

kns（Kubernetes Namespace Switcher）是一个快速切换 Kubernetes 命名空间的工具，结合了 kubectl 和 fzf，让命名空间切换变得更加便捷。

## 安装 fzf（必需依赖）

### 方法一：源码安装（推荐）
```bash
# 克隆 fzf 仓库
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf

# 运行安装脚本
~/.fzf/install
```

### 方法二：使用包管理器安装
```bash
# Ubuntu/Debian
sudo apt install fzf

# Arch Linux
sudo pacman -S fzf

# macOS (Homebrew)
brew install fzf
```

## 创建 kns 脚本

### 1. 创建脚本文件
```bash
vim kns
```

### 2. 脚本内容
```shell
#!/bin/sh
# 快速 Kubernetes 命名空间切换器
# ISC Blendle, 2017

set -eu

# 检查 kubectl 是否安装
if [ ! -x "$(which kubectl 2>/dev/null)" ]; then
  echo "请先安装 kubectl：https://kubernetes.io/docs/tasks/kubectl/install/" >&2
  exit 1
fi

# 检查 fzf 是否安装
if [ ! -x "$(which fzf 2>/dev/null)" ]; then
  echo "请先安装 fzf：https://github.com/junegunn/fzf" >&2
  exit 1
fi

# 获取当前上下文和命名空间
current="$(kubectl config current-context)"
namespace="$(kubectl config view -o jsonpath="{.contexts[?(@.name == '${current}')].context.namespace}")"
if [ -z "$namespace" ]; then
  namespace="default"
fi

# 使用 fzf 选择命名空间
selected=$( (kubectl get namespaces -o=jsonpath="{.items[?(@.metadata.name!='$namespace')].metadata.name}" | xargs -n 1; echo $namespace ) | fzf -0 -1 --tac -q "${1:-""}" --prompt "$current> ")

# 设置选中的命名空间
if [ -n "$selected" ]; then
  kubectl config set-context "$current" "--namespace=$selected" >/dev/null
  echo "已将上下文命名空间设置为 \"$selected\""
fi
```

## 安装 kns 脚本

### 1. 添加执行权限
```bash
chmod +x kns
```

### 2. 移动到系统路径
```bash
sudo mv kns /usr/local/bin/kns
```

## 使用方法

### 基本使用
```bash
# 运行 kns 命令
kns
```

运行命令后，会显示当前 Kubernetes 上下文和所有可用的命名空间列表。使用方向键或搜索功能选择目标命名空间，按回车确认。

### 搜索功能
在 fzf 界面中直接输入命名空间名称的部分字符即可进行搜索。

### 命令行参数
```bash
# 带初始搜索词
kns production  # 会直接筛选包含 "production" 的命名空间
```

## 工作原理

1. **获取当前状态**：脚本首先获取当前的 Kubernetes 上下文和命名空间
2. **列出命名空间**：使用 kubectl 获取所有可用的命名空间
3. **交互选择**：通过 fzf 提供交互式选择界面
4. **更新配置**：将选中的命名空间设置为当前上下文的默认命名空间

## 注意事项

1. **权限要求**：需要具有读取和修改 kubeconfig 文件的权限
2. **kubectl 配置**：确保 kubectl 已正确配置并可以访问集群
3. **命名空间权限**：切换命名空间不会检查用户在该命名空间的权限，切换后操作可能因权限不足而失败

## 扩展功能

你可以根据需要修改脚本，添加以下功能：

1. **多集群支持**：扩展脚本以支持多个 Kubernetes 集群
2. **上下文切换**：结合 kubectx 工具实现上下文和命名空间的同时切换
3. **别名设置**：为常用命名空间设置简短别名

## 卸载

如果需要卸载 kns 工具：
```bash
sudo rm /usr/local/bin/kns
```

kns 工具大大简化了 Kubernetes 命名空间的管理工作，特别是在需要频繁切换不同环境时，能显著提高工作效率。
