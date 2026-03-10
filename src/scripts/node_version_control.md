# Node.js 版本切换脚本

本文介绍如何使用脚本在多个 Node.js 版本之间切换，特别适用于需要不同 Node 版本的项目（如 Hexo 博客需要 Node v12，而其他项目需要 Node v20）。

## 创建版本切换脚本

### 1. 创建脚本文件
```bash
sudo vim hexo_start_stop.sh
```

### 2. 设置执行权限
```bash
sudo chmod +x hexo_start_stop.sh
```

## 脚本内容详解

```sh
#!/bin/bash

# 检查参数
if [ "$#" -ne 1 ]; then
    echo "使用方法: $0 start|stop"
    exit 1
fi

# 定义变量
NODE_V12_DIR="/home/knight/node/node-v12/bin"   # Node v12 安装目录
NODE_V20_DIR="/home/knight/node/node-v20/bin"   # Node v20 安装目录
NODE_BIN="/usr/bin/node"                        # 系统 node 命令位置
NODE_LOCAL_BIN="/usr/local/bin/node"            # 本地 node 命令位置
NPM_BIN="/usr/bin/npm"                          # 系统 npm 命令位置
NPM_LOCAL_BIN="/usr/local/bin/npm"              # 本地 npm 命令位置
NPX_BIN="/usr/bin/npx"                          # 系统 npx 命令位置
NPX_LOCAL_BIN="/usr/local/bin/npx"              # 本地 npx 命令位置
# HEXO_LOCAL_BIN="/usr/local/bin/hexo"          # Hexo 命令位置（可选）

# 根据参数执行相应的操作
case "$1" in
    start)
        # 切换到 Node v12（用于 Hexo）
        sudo ln -sf "$NODE_V12_DIR/node" "$NODE_BIN"
        sudo ln -sf "$NODE_V12_DIR/node" "$NODE_LOCAL_BIN"
        sudo ln -sf "$NODE_V12_DIR/npm" "$NPM_BIN"
        sudo ln -sf "$NODE_V12_DIR/npm" "$NPM_LOCAL_BIN"
        sudo ln -sf "$NODE_V12_DIR/npx" "$NPX_BIN"
        sudo ln -sf "$NODE_V12_DIR/npx" "$NPX_LOCAL_BIN"
        # sudo ln -sf "$NODE_V12_DIR/hexo" "$HEXO_LOCAL_BIN"
        echo "Node、NPM 和 NPX 链接已更新到 Node v12。"
        ;;
    stop)
        # 切换回 Node v20（默认版本）
        sudo ln -sf "$NODE_V20_DIR/node" "$NODE_BIN"
        sudo ln -sf "$NODE_V20_DIR/node" "$NODE_LOCAL_BIN"
        sudo ln -sf "$NODE_V20_DIR/npm" "$NPM_BIN"
        sudo ln -sf "$NODE_V20_DIR/npm" "$NPM_LOCAL_BIN"
        sudo ln -sf "$NODE_V20_DIR/npx" "$NPX_BIN"
        sudo ln -sf "$NODE_V20_DIR/npx" "$NPX_LOCAL_BIN"
        # sudo rm -rf "$HEXO_LOCAL_BIN"
        echo "Node、NPM 和 NPX 链接已更新到 Node v20。"
        ;;
    *)
        echo "参数错误。使用方法: $0 start|stop"
        exit 1
        ;;
esac

exit 0
```

## 使用说明

### 1. 切换到 Node v12（用于 Hexo）
```bash
sudo ./hexo_start_stop.sh start
```

### 2. 切换回 Node v20（默认版本）
```bash
sudo ./hexo_start_stop.sh stop
```

### 3. 验证版本切换
```bash
# 检查 Node 版本
node --version

# 检查 npm 版本
npm --version

# 检查 npx 版本
npx --version
```

## 安装多个 Node 版本

### 1. 下载 Node.js 二进制包
```bash
# 创建 Node 安装目录
mkdir -p ~/node
cd ~/node

# 下载 Node v12
wget https://nodejs.org/dist/v12.22.12/node-v12.22.12-linux-x64.tar.xz
tar -xf node-v12.22.12-linux-x64.tar.xz
mv node-v12.22.12-linux-x64 node-v12

# 下载 Node v20
wget https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz
tar -xf node-v20.11.0-linux-x64.tar.xz
mv node-v20.11.0-linux-x64 node-v20
```

### 2. 验证安装
```bash
# 测试 Node v12
~/node/node-v12/bin/node --version

# 测试 Node v20
~/node/node-v20/bin/node --version
```

## 更好的解决方案：使用 nvm

### 1. 安装 nvm（Node Version Manager）
```bash
# 下载安装脚本
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 或使用 wget
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新加载 shell 配置
source ~/.bashrc  # 或 source ~/.zshrc
```

### 2. 使用 nvm 管理 Node 版本
```bash
# 安装 Node v12
nvm install 12

# 安装 Node v20
nvm install 20

# 列出已安装的版本
nvm ls

# 使用特定版本
nvm use 12

# 设置默认版本
nvm alias default 20
```

### 3. nvm 常用命令
```bash
# 安装指定版本
nvm install 18.19.0

# 使用最新 LTS 版本
nvm install --lts
nvm use --lts

# 卸载版本
nvm uninstall 12

# 查看可用版本
nvm ls-remote

# 在当前目录使用特定版本（创建 .nvmrc 文件）
echo "12" > .nvmrc
nvm use
```

## 项目特定配置

### 1. 使用 .nvmrc 文件
```bash
# 在项目根目录创建 .nvmrc 文件
echo "12" > .nvmrc

# 自动切换到指定版本
nvm use
```

### 2. 使用 package.json engines 字段
```json
{
  "engines": {
    "node": ">=12.0.0 <13.0.0",
    "npm": ">=6.0.0"
  }
}
```

### 3. 自动化脚本
```bash
#!/bin/bash
# auto_node_version.sh

# 检查当前目录是否有 .nvmrc
if [ -f .nvmrc ]; then
    nvm use
fi

# 或者根据项目类型判断
if [ -f package.json ]; then
    NODE_VERSION=$(node -p "require('./package.json').engines.node" 2>/dev/null)
    if [ ! -z "$NODE_VERSION" ]; then
        nvm use "$NODE_VERSION"
    fi
fi
```

## 系统级配置

### 1. 创建符号链接的替代方案
```bash
# 使用 update-alternatives（Debian/Ubuntu）
sudo update-alternatives --install /usr/bin/node node /home/knight/node/node-v12/bin/node 100
sudo update-alternatives --install /usr/bin/node node /home/knight/node/node-v20/bin/node 200

# 切换版本
sudo update-alternatives --config node
```

### 2. 使用环境变量
```bash
# 在 ~/.bashrc 或 ~/.zshrc 中添加
export PATH="/home/knight/node/node-v20/bin:$PATH"

# 创建切换函数
node-switch() {
    if [ "$1" = "12" ]; then
        export PATH="/home/knight/node/node-v12/bin:$PATH"
        echo "切换到 Node v12"
    elif [ "$1" = "20" ]; then
        export PATH="/home/knight/node/node-v20/bin:$PATH"
        echo "切换到 Node v20"
    else
        echo "使用方法: node-switch 12|20"
    fi
}
```

## 故障排除

### 问题 1：权限不足
```bash
# 检查文件权限
ls -la /usr/bin/node
ls -la /usr/local/bin/node

# 修复权限
sudo chown root:root /usr/bin/node
sudo chmod 755 /usr/bin/node
```

### 问题 2：符号链接错误
```bash
# 检查符号链接
ls -l /usr/bin/node
ls -l /usr/local/bin/node

# 重新创建符号链接
sudo rm -f /usr/bin/node
sudo ln -s /home/knight/node/node-v20/bin/node /usr/bin/node
```

### 问题 3：版本冲突
```bash
# 检查所有 node 可执行文件位置
which -a node

# 检查 PATH 环境变量
echo $PATH | tr ':' '\n'

# 清理重复的路径
export PATH=$(echo $PATH | tr ':' '\n' | grep -v "/home/knight/node/node-v12/bin" | tr '\n' ':')
```

## 最佳实践

### 1. 使用 nvm（推荐）
- 更安全：不需要 sudo 权限
- 更灵活：支持多个版本并行
- 更易用：简单的命令接口

### 2. 项目隔离
- 每个项目使用独立的 Node 版本
- 使用 .nvmrc 文件指定版本
- 在 CI/CD 中明确指定版本

### 3. 定期更新
```bash
# 更新 nvm
nvm upgrade

# 更新 Node 到最新 LTS
nvm install --lts
nvm alias default lts/*
```

### 4. 备份配置
```bash
# 备份 nvm 安装的版本
nvm ls > ~/node-versions-backup.txt

# 备份全局包
npm list -g --depth=0 > ~/npm-global-packages.txt
```

## 性能考虑

### 1. 磁盘空间
```bash
# 查看 Node 版本占用的空间
du -sh ~/.nvm/versions/node/

# 清理旧版本
nvm uninstall 10
nvm uninstall 14
```

### 2. 启动时间
```bash
# nvm 会增加 shell 启动时间
# 可以考虑延迟加载
# 在 ~/.bashrc 或 ~/.zshrc 中添加
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # 延迟加载
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

通过合理管理 Node.js 版本，可以确保不同项目使用兼容的运行时环境，避免版本冲突问题。建议优先使用 nvm 进行版本管理。