# Oh My Zsh 安装与配置指南

## 项目仓库

[https://github.com/ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

## 自动安装（推荐）

### 一键安装
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### 安装位置
默认安装到 `~/.oh-my-zsh`（主目录下的隐藏文件夹，可以通过 `cd ~/.oh-my-zsh` 访问）

## 手动安装

如果你想自定义安装位置，可以在安装前设置 `ZSH` 环境变量：

### 1. 下载安装脚本
```bash
wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh
```

### 2. 设置安装路径并运行
如果你想安装到 `$HOME/awesome-shell/oh-my-zsh`：
```bash
ZSH="$HOME/awesome-shell/oh-my-zsh" sh install.sh
```

## 配置文件

### 1. 主配置文件：~/.zshrc
安装后会自动创建或更新 `.zshrc` 文件，包含以下重要配置：

```bash
# Oh My Zsh 安装路径
export ZSH="$HOME/.oh-my-zsh"

# 主题设置
ZSH_THEME="robbyrussell"

# 插件列表
plugins=(git)

# 加载 Oh My Zsh
source $ZSH/oh-my-zsh.sh
```

### 2. 自定义配置
你可以在 `~/.zshrc` 中添加自定义配置，建议添加到文件末尾：
```bash
# 自定义别名
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'

# 自定义环境变量
export PATH="$PATH:$HOME/.local/bin"
export EDITOR='vim'

# 自定义函数
function mkcd() {
    mkdir -p "$1" && cd "$1"
}
```

## 主题配置

### 1. 查看可用主题
```bash
ls $ZSH/themes/
```

### 2. 更换主题
在 `~/.zshrc` 中修改：
```bash
ZSH_THEME="agnoster"  # 更换为 agnoster 主题
```

### 3. 热门主题推荐
- **robbyrussell**: 默认主题，简洁明了
- **agnoster**: 功能丰富，显示 Git 状态
- **af-magic**: 现代风格，色彩鲜艳
- **bira**: 简洁实用，显示时间
- **powerlevel10k**: 高度可定制，性能优秀

### 4. 自定义主题
```bash
# 复制现有主题进行修改
cp $ZSH/themes/robbyrussell.zsh-theme ~/.oh-my-zsh/custom/themes/my-theme.zsh-theme

# 在 .zshrc 中使用自定义主题
ZSH_THEME="my-theme"
```

## 插件管理

### 1. 内置插件
Oh My Zsh 自带大量插件，位于 `$ZSH/plugins/` 目录。

### 2. 启用插件
在 `~/.zshrc` 的 `plugins` 数组中添加：
```bash
plugins=(
    git
    docker
    kubectl
    python
    npm
    yarn
    zsh-autosuggestions
    zsh-syntax-highlighting
)
```

### 3. 常用插件推荐
| 插件 | 功能描述 |
|------|----------|
| git | Git 命令别名和提示 |
| docker | Docker 命令补全 |
| kubectl | Kubernetes 命令补全 |
| python | Python 开发工具 |
| npm/yarn | Node.js 包管理器 |
| zsh-autosuggestions | 命令自动建议 |
| zsh-syntax-highlighting | 语法高亮 |

### 4. 自定义插件
```bash
# 创建自定义插件目录
mkdir -p ~/.oh-my-zsh/custom/plugins/my-plugin

# 创建插件文件
vim ~/.oh-my-zsh/custom/plugins/my-plugin/my-plugin.plugin.zsh

# 在 .zshrc 中启用
plugins=(... my-plugin)
```

## 更新和维护

### 1. 手动更新
```bash
# 进入 Oh My Zsh 目录
cd ~/.oh-my-zsh

# 拉取最新代码
git pull

# 重新加载配置
source ~/.zshrc
```

### 2. 自动更新
Oh My Zsh 默认启用自动更新，可以通过以下配置调整：
```bash
# 禁用自动更新
DISABLE_AUTO_UPDATE="true"

# 设置更新频率（天）
UPDATE_ZSH_DAYS=13

# 更新时显示详细信息
DISABLE_UPDATE_PROMPT="true"
```

### 3. 检查更新
```bash
# 检查是否有可用更新
omz update --check
```

## 故障排除

### 问题 1：安装失败
```bash
# 检查网络连接
curl -I https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh

# 使用 wget 替代
wget -O install.sh https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh
bash install.sh
```

### 问题 2：主题显示异常
```bash
# 检查字体支持
echo -e "\ue0b0 \u00b1 \ue0a0 \u27a6 \u2718 \u26a1 \u2699"

# 安装 Powerline 字体
# 参考：https://github.com/powerline/fonts
```

### 问题 3：启动缓慢
```bash
# 分析启动时间
time zsh -i -c exit

# 禁用不需要的插件
# 在 plugins 数组中移除不常用的插件
```

### 问题 4：命令补全不工作
```bash
# 重新生成补全缓存
rm -f ~/.zcompdump
compinit

# 检查插件是否正确加载
echo $plugins
```

## 高级功能

### 1. 自定义目录
```bash
# 自定义配置目录
ZSH_CUSTOM="$HOME/.my-zsh-custom"

# 自定义插件目录
ZSH_CUSTOM/plugins/

# 自定义主题目录
ZSH_CUSTOM/themes/
```

### 2. 条件配置
```bash
# 根据操作系统配置
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS 特定配置
    plugins+=(macos)
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # Linux 特定配置
    plugins+=(systemd)
fi
```

### 3. 性能优化
```bash
# 禁用自动更正
DISABLE_CORRECTION="true"

# 禁用自动标题
DISABLE_AUTO_TITLE="true"

# 禁用等待提示
COMPLETION_WAITING_DOTS="false"
```

## 卸载 Oh My Zsh

### 1. 使用卸载脚本
```bash
# 运行卸载脚本
sh $ZSH/tools/uninstall.sh

# 或手动删除
uninstall_oh_my_zsh
```

### 2. 手动卸载
```bash
# 删除 Oh My Zsh 目录
rm -rf ~/.oh-my-zsh

# 恢复原始 .zshrc
mv ~/.zshrc.pre-oh-my-zsh ~/.zshrc 2>/dev/null || true

# 或删除 .zshrc
rm ~/.zshrc
```

## 最佳实践

### 1. 配置备份
```bash
# 备份配置文件
cp ~/.zshrc ~/.zshrc.backup

# 使用版本控制
git init ~/.oh-my-zsh/custom
git add .
git commit -m "Initial custom configuration"
```

### 2. 渐进式配置
- 从默认配置开始
- 逐步添加需要的插件
- 定期清理不需要的配置

### 3. 社区资源
- [Oh My Zsh Wiki](https://github.com/ohmyzsh/ohmyzsh/wiki)
- [Awesome Zsh 插件列表](https://github.com/unixorn/awesome-zsh-plugins)
- [Zsh 用户社区](https://www.reddit.com/r/zsh/)

Oh My Zsh 是一个强大的 Zsh 配置框架，通过合理的配置可以显著提升命令行使用体验。建议从基础配置开始，根据个人需求逐步定制。

