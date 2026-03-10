# Powerlevel10k：强大的 Zsh 主题

## GitHub 仓库

[https://github.com/romkatv/powerlevel10k.git](https://github.com/romkatv/powerlevel10k.git)

## 安装方法

### 方法一：使用 Oh My Zsh 安装

1. 克隆仓库到 Oh My Zsh 自定义主题目录：

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```

2. 修改 `~/.zshrc` 文件：

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

3. 退出终端并重新打开，或执行：

```bash
source ~/.zshrc
```

### 方法二：手动安装（不使用 Oh My Zsh）

1. 克隆仓库：

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k
```

2. 在 `~/.zshrc` 中添加：

```bash
source ~/powerlevel10k/powerlevel10k.zsh-theme
```

### 方法三：使用包管理器

#### macOS (Homebrew)
```bash
brew install romkatv/powerlevel10k/powerlevel10k
echo 'source /usr/local/opt/powerlevel10k/powerlevel10k.zsh-theme' >> ~/.zshrc
```

#### Arch Linux (AUR)
```bash
yay -S zsh-theme-powerlevel10k-git
```

#### Ubuntu/Debian
```bash
sudo apt install zsh-theme-powerlevel10k
```

## 配置向导

首次启动 Powerlevel10k 时会自动运行配置向导：

### 1. 字体安装
配置向导会提示安装推荐的字体：
- **Meslo Nerd Font**：推荐字体，支持所有图标
- 其他 Nerd Fonts：如 Fira Code、JetBrains Mono 等

### 2. 样式选择
向导提供多种样式预设：
- **Lean**：简洁风格，占用空间小
- **Classic**：经典风格，功能丰富
- **Rainbow**：彩色风格，视觉突出
- **Pure**：类似 Pure 主题的风格

### 3. 元素配置
可以配置显示的元素：
- 当前目录
- Git 状态
- 命令执行时间
- 错误代码
- 时间日期
- 电池状态
- 虚拟环境
- Kubernetes 上下文

## 常用配置

### 1. 基本配置
在 `~/.p10k.zsh` 中配置：

```bash
# 启用瞬时提示模式
typeset -g POWERLEVEL9K_INSTANT_PROMPT=quiet

# 设置提示符样式
typeset -g POWERLEVEL9K_PROMPT_ADD_NEWLINE=true
typeset -g POWERLEVEL9K_PROMPT_ON_NEWLINE=true

# 右侧提示符元素
typeset -g POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(
    status                  # 退出状态
    command_execution_time  # 命令执行时间
    background_jobs         # 后台任务
    direnv                  # direnv 状态
    asdf                    # asdf 版本管理器
    virtualenv              # Python 虚拟环境
    anaconda                # Conda 环境
    pyenv                   # pyenv 环境
    goenv                   # goenv 环境
    nodenv                  # nodenv 环境
    nvm                     # nvm 环境
    nodeenv                 # nodeenv 环境
    rbenv                   # rbenv 环境
    rvm                     # rvm 环境
    fvm                     # Flutter 版本管理器
    luaenv                  # luaenv 环境
    jenv                    # jenv 环境
    plenv                   # plenv 环境
    phpenv                  # phpenv 环境
    scalaenv                # scalaenv 环境
    haskell_stack           # Haskell Stack
    kubecontext             # Kubernetes 上下文
    terraform               # Terraform 工作区
    aws                     # AWS 配置
    aws_eb_env              # AWS Elastic Beanstalk 环境
    azure                   # Azure 订阅
    gcloud                  # Google Cloud 配置
    google_app_cred         # Google 应用凭证
    context                 # 用户和主机名
    nordvpn                 # NordVPN 状态
    ranger                  # Ranger shell
    nnn                     # nnn shell
    vim_shell               # Vim shell
    midnight_commander      # Midnight Commander shell
    nix_shell               # Nix shell
    todo                    # todo.sh 状态
    timewarrior             # Timewarrior 状态
    taskwarrior             # Taskwarrior 状态
    time                    # 当前时间
    newline                 # 换行
)
```

### 2. Git 状态配置
```bash
# Git 状态显示
typeset -g POWERLEVEL9K_VCS_BRANCH_ICON='\uF126 '
typeset -g POWERLEVEL9K_VCS_UNTRACKED_ICON='?'
typeset -g POWERLEVEL9K_VCS_UNSTAGED_ICON='!'
typeset -g POWERLEVEL9K_VCS_STAGED_ICON='+'

# Git 状态颜色
typeset -g POWERLEVEL9K_VCS_CLEAN_FOREGROUND=2
typeset -g POWERLEVEL9K_VCS_UNTRACKED_FOREGROUND=3
typeset -g POWERLEVEL9K_VCS_MODIFIED_FOREGROUND=3
```

### 3. 目录显示配置
```bash
# 目录显示设置
typeset -g POWERLEVEL9K_SHORTEN_STRATEGY=truncate_to_unique
typeset -g POWERLEVEL9K_SHORTEN_DELIMITER='…'
typeset -g POWERLEVEL9K_SHORTEN_DIR_LENGTH=1
typeset -g POWERLEVEL9K_DIR_MAX_LENGTH=80
```

## 高级功能

### 1. 瞬时提示
Powerlevel10k 支持瞬时提示，在输入命令前显示提示符：

```bash
# 启用瞬时提示
typeset -g POWERLEVEL9K_INSTANT_PROMPT=verbose

# 禁用瞬时提示
typeset -g POWERLEVEL9K_INSTANT_PROMPT=off
```

### 2. 异步渲染
提示符元素异步加载，不阻塞终端：

```bash
# 启用异步渲染
typeset -g POWERLEVEL9K_DISABLE_GITSTATUS=false
```

### 3. 条件显示
根据条件显示或隐藏元素：

```bash
# 只在 Git 仓库中显示 Git 状态
function prompt_my_git() {
    if git rev-parse --git-dir > /dev/null 2>&1; then
        p10k segment -f 2 -i '' -t "$(git branch --show-current)"
    fi
}
```

## 自定义主题

### 1. 创建自定义配置
```bash
# 复制默认配置
cp ~/.p10k.zsh ~/.p10k.zsh.custom

# 修改自定义配置
vim ~/.p10k.zsh.custom
```

### 2. 切换配置
```bash
# 在 .zshrc 中切换配置
[[ ! -f ~/.p10k.zsh.custom ]] || source ~/.p10k.zsh.custom
```

### 3. 自定义元素
```bash
# 添加自定义元素
function prompt_my_custom() {
    p10k segment -b 1 -f 3 -i '⭐' -t 'Custom'
}

# 添加到提示符
typeset -g POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(
    my_custom
    dir
    vcs
    newline
    prompt_char
)
```

## 性能优化

### 1. 禁用不需要的元素
```bash
# 禁用不使用的元素
typeset -g POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=()
```

### 2. 减少更新频率
```bash
# 减少 Git 状态检查频率
typeset -g POWERLEVEL9K_VCS_MAX_INDEX_SIZE_DIRTY=-1
```

### 3. 使用缓存
```bash
# 启用缓存
typeset -g POWERLEVEL9K_VCS_GIT_HOOKS=(
    vcs-detect-changes
    git-untracked
    git-aheadbehind
    git-stash
    git-remotebranch
    git-tagname
)
```

## 故障排除

### 问题 1：图标不显示
```bash
# 检查字体是否安装
fc-list | grep -i "nerd"

# 设置终端字体
# 在终端设置中使用 Nerd Fonts
```

### 问题 2：配置向导不启动
```bash
# 手动启动配置向导
p10k configure

# 或删除配置文件重新配置
rm ~/.p10k.zsh
```

### 问题 3：性能问题
```bash
# 检查加载时间
time zsh -i -c exit

# 分析性能
zprof
```

### 问题 4：与其他插件冲突
```bash
# 检查插件加载顺序
# 确保 Powerlevel10k 最后加载

# 在 .zshrc 中
source $ZSH/oh-my-zsh.sh
source ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k/powerlevel10k.zsh-theme
```

## 常用命令

### 1. 配置命令
```bash
# 重新运行配置向导
p10k configure

# 重新加载配置
source ~/.zshrc

# 查看当前配置
p10k display
```

### 2. 调试命令
```bash
# 显示所有段
p10k segments

# 显示配置
p10k config

# 显示帮助
p10k help
```

### 3. 维护命令
```bash
# 更新 Powerlevel10k
git -C ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k pull

# 清理缓存
rm -rf ~/.cache/p10k-*
```

## 与其他工具集成

### 1. 与 tmux 集成
```bash
# 在 .tmux.conf 中
set -g default-terminal "screen-256color"
set -ga terminal-overrides ",xterm-256color:Tc"
```

### 2. 与 iTerm2 集成
- 在 iTerm2 设置中使用 Nerd Fonts
- 启用真彩色支持

### 3. 与 VS Code 集成
```json
// settings.json
{
    "terminal.integrated.fontFamily": "MesloLGS NF",
    "terminal.integrated.fontSize": 14
}
```

## 最佳实践

### 1. 版本控制配置
```bash
# 备份配置
cp ~/.p10k.zsh ~/.p10k.zsh.backup

# 使用 Git 管理配置
cd ~
git init
git add .p10k.zsh
git commit -m "Add Powerlevel10k configuration"
```

### 2. 多机器同步
```bash
# 使用 dotfiles 管理
git clone https://github.com/yourusername/dotfiles.git
ln -s ~/dotfiles/.p10k.zsh ~/.p10k.zsh
```

### 3. 定期更新
```bash
# 创建更新脚本
cat > ~/update-p10k.sh << 'EOF'
#!/bin/bash
cd ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
git pull
source ~/.zshrc
EOF

chmod +x ~/update-p10k.sh
```

Powerlevel10k 是一个功能强大且高度可定制的 Zsh 主题，通过合理配置可以大大提高终端使用体验。建议从默认配置开始，逐步根据个人需求进行定制。