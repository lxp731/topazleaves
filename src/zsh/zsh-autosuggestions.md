# Zsh-autosuggestions：Zsh 自动建议插件

## 官方文档

[https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md)

## 安装方法

### 方法一：使用 Oh My Zsh 安装

1. 克隆仓库到 Oh My Zsh 自定义插件目录：

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

2. 在 `~/.zshrc` 的插件列表中添加：

```bash
plugins=(
    # 其他插件...
    zsh-autosuggestions
)
```

3. 重新加载配置：

```bash
source ~/.zshrc
```

### 方法二：手动安装（不使用 Oh My Zsh）

1. 克隆仓库：

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
```

2. 在 `~/.zshrc` 中添加：

```bash
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh
```

### 方法三：使用包管理器

#### macOS (Homebrew)
```bash
brew install zsh-autosuggestions
echo 'source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh' >> ~/.zshrc
```

#### Arch Linux (AUR)
```bash
yay -S zsh-autosuggestions-git
```

#### Ubuntu/Debian
```bash
sudo apt install zsh-autosuggestions
```

## 基本使用

### 1. 接受建议
- **右箭头键** (`→`) 或 `End`：接受当前建议
- **Ctrl-F**：接受当前建议
- **Ctrl-E**：接受当前建议并执行

### 2. 部分接受
- **Ctrl-→**：接受建议到下一个单词
- **Alt-F**：接受建议到下一个单词

### 3. 忽略建议
- 继续输入：建议会自动更新
- **Esc**：清除当前建议

## 配置选项

### 1. 建议策略
```bash
# 设置建议策略（默认：history）
ZSH_AUTOSUGGEST_STRATEGY=(history completion)

# 可用策略：
# - history: 基于历史命令
# - completion: 基于补全系统
# - match_prev_cmd: 匹配上一个命令
```

### 2. 建议触发
```bash
# 触发建议的最小字符数（默认：1）
ZSH_AUTOSUGGEST_BUFFER_MAX_SIZE=20

# 异步获取建议（默认：启用）
ZSH_AUTOSUGGEST_USE_ASYNC=true

# 建议获取延迟（毫秒，默认：200）
ZSH_AUTOSUGGEST_COMPLETION_IGNORE=200
```

### 3. 外观设置
```bash
# 建议文本颜色（默认：8，灰色）
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=8'

# 可用颜色：
# - fg=black, red, green, yellow, blue, magenta, cyan, white
# - fg=0-255 (256色)
# - bg=颜色 (背景色)
# - underline (下划线)
# - bold (粗体)

# 示例：使用亮青色
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=cyan,bold'
```

### 4. 行为控制
```bash
# 禁用某些命令的建议
ZSH_AUTOSUGGEST_HISTORY_IGNORE="cd *|ls *|rm *"

# 忽略大小写（默认：敏感）
ZSH_AUTOSUGGEST_CASE_SENSITIVE=false

# 接受建议时是否添加空格（默认：true）
ZSH_AUTOSUGGEST_ACCEPT_SPACE=true
```

## 高级配置

### 1. 自定义快捷键
```bash
# 自定义接受建议的快捷键
bindkey '^ ' autosuggest-accept
bindkey '^n' autosuggest-accept
bindkey '^p' autosuggest-execute

# 自定义部分接受的快捷键
bindkey '^f' forward-word
bindkey '^b' backward-word

# 自定义清除建议的快捷键
bindkey '^c' autosuggest-clear
```

### 2. 事件钩子
```bash
# 建议接受前执行的函数
ZSH_AUTOSUGGEST_ACCEPT_WIDGETS=(
    forward-char
    end-of-line
    vi-forward-char
    vi-end-of-line
    vi-add-eol
)

# 建议部分接受前执行的函数
ZSH_AUTOSUGGEST_PARTIAL_ACCEPT_WIDGETS=(
    forward-word
    emacs-forward-word
    vi-forward-word
    vi-forward-word-end
    vi-forward-blank-word
    vi-forward-blank-word-end
    vi-find-next-char
    vi-find-next-char-skip
)

# 建议清除时执行的函数
ZSH_AUTOSUGGEST_CLEAR_WIDGETS=(
    history-search-forward
    history-search-backward
    history-beginning-search-forward
    history-beginning-search-backward
    history-substring-search-up
    history-substring-search-down
    up-line-or-beginning-search
    down-line-or-beginning-search
    up-line-or-history
    down-line-or-history
    accept-line
    copy-earlier-word
)
```

### 3. 性能优化
```bash
# 限制历史记录大小
HISTSIZE=10000
SAVEHIST=10000

# 启用共享历史
setopt share_history

# 忽略重复命令
setopt hist_ignore_all_dups
setopt hist_save_no_dups
setopt hist_ignore_space
```

## 与其他插件集成

### 1. 与 zsh-syntax-highlighting 集成
```bash
# 确保加载顺序正确
# zsh-syntax-highlighting 必须在最后加载
plugins=(
    # 其他插件...
    zsh-autosuggestions
    zsh-syntax-highlighting
)
```

### 2. 与 zsh-history-substring-search 集成
```bash
# 配置快捷键避免冲突
bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down
```

### 3. 与 fzf 集成
```bash
# 使用 fzf 选择历史建议
bindkey '^r' fzf-history-widget
```

## 自定义建议源

### 1. 自定义建议函数
```bash
# 创建自定义建议函数
function _my_custom_suggestions() {
    local suggestions=()
    
    # 添加自定义建议
    suggestions+=("echo 'Hello World'")
    suggestions+=("cd ~/projects")
    suggestions+=("git status")
    
    # 返回建议
    echo "${suggestions[@]}"
}

# 注册自定义建议源
ZSH_AUTOSUGGEST_CUSTOM_STRATEGIES=(my_custom_suggestions)
ZSH_AUTOSUGGEST_STRATEGY=(my_custom_suggestions history)
```

### 2. 基于上下文的建议
```bash
# 根据当前目录提供建议
function _context_based_suggestions() {
    local current_dir=$(basename "$PWD")
    local suggestions=()
    
    case $current_dir in
        git*)
            suggestions+=("git status")
            suggestions+=("git pull")
            suggestions+=("git push")
            ;;
        docker*)
            suggestions+=("docker ps")
            suggestions+=("docker-compose up")
            suggestions+=("docker logs")
            ;;
        python*)
            suggestions+=("python manage.py runserver")
            suggestions+=("pip install -r requirements.txt")
            suggestions+=("python -m pytest")
            ;;
    esac
    
    echo "${suggestions[@]}"
}
```

## 故障排除

### 问题 1：建议不显示
```bash
# 检查插件是否加载
echo $plugins | grep autosuggestions

# 检查配置文件
cat ~/.zshrc | grep -A5 -B5 "plugins="

# 手动加载测试
source ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
```

### 问题 2：快捷键冲突
```bash
# 查看当前快捷键绑定
bindkey | grep autosuggest

# 查看冲突的快捷键
bindkey | grep -E "\^\[\[A|\^\[\[B|\^R|\^S"
```

### 问题 3：性能问题
```bash
# 检查 Zsh 启动时间
time zsh -i -c exit

# 禁用异步获取（如果性能差）
ZSH_AUTOSUGGEST_USE_ASYNC=false

# 减少历史记录大小
HISTSIZE=1000
SAVEHIST=1000
```

### 问题 4：颜色不显示
```bash
# 检查终端颜色支持
echo $TERM

# 检查颜色配置
echo $ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE

# 测试颜色
for i in {0..255}; do print -Pn "%K{$i}  %k%F{$i}${(l:3::0:)i}%f " ${${(M)$((i%6)):#3}:+$'\n'}; done
```

## 最佳实践

### 1. 配置文件管理
```bash
# 创建插件配置目录
mkdir -p ~/.zsh/plugins

# 备份配置
cp ~/.zshrc ~/.zshrc.backup
cp -r ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions ~/.zsh/plugins/backup/
```

### 2. 版本控制
```bash
# 使用 Git 管理配置
cd ~
git init
git add .zshrc
git add .oh-my-zsh/custom/plugins/zsh-autosuggestions
git commit -m "Add zsh-autosuggestions configuration"
```

### 3. 定期更新
```bash
# 创建更新脚本
cat > ~/update-zsh-autosuggestions.sh << 'EOF'
#!/bin/bash
cd ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
git pull
source ~/.zshrc
echo "zsh-autosuggestions updated successfully"
EOF

chmod +x ~/update-zsh-autosuggestions.sh
```

## 替代方案

### 1. fish-style 自动建议
```bash
# 使用 fish 风格的自动建议
# zsh-autosuggestions 就是模仿 fish 的自动建议
```

### 2. 历史搜索
```bash
# 使用历史搜索替代
plugins=(history-substring-search)
```

### 3. 智能补全
```bash
# 使用更智能的补全系统
plugins=(zsh-completions)
```

## 性能测试

### 1. 基准测试
```bash
# 测试建议响应时间
time for i in {1..100}; do echo "test $i"; done | grep -q ""

# 测试历史加载时间
time fc -l 1
```

### 2. 内存使用
```bash
# 检查内存使用
ps aux | grep zsh | grep -v grep

# 检查插件内存
pmap $(pgrep zsh) | tail -20
```

### 3. 启动时间优化
```bash
# 延迟加载插件
function load_zsh_autosuggestions() {
    source ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
}

# 在需要时加载
autoload -Uz load_zsh_autosuggestions
```

zsh-autosuggestions 是一个非常实用的插件，可以大大提高命令行输入效率。通过合理配置，可以获得类似 fish shell 的流畅体验。