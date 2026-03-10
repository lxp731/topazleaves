# Zsh-autocomplete：实时自动补全插件

## GitHub 仓库

[https://github.com/marlonrichert/zsh-autocomplete](https://github.com/marlonrichert/zsh-autocomplete)

## 安装方法

### 方法一：使用 Oh My Zsh 安装

1. 克隆仓库到 Oh My Zsh 自定义插件目录：

```bash
git clone --depth 1 -- https://github.com/marlonrichert/zsh-autocomplete.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autocomplete
```

2. 在 `~/.zshrc` 的插件列表中添加：

```bash
plugins=(
    # 其他插件...
    zsh-autocomplete
)
```

3. 重新加载配置：

```bash
source ~/.zshrc
```

### 方法二：手动安装（不使用 Oh My Zsh）

1. 克隆仓库：

```bash
git clone --depth 1 https://github.com/marlonrichert/zsh-autocomplete.git ~/.zsh/zsh-autocomplete
```

2. 在 `~/.zshrc` 中添加：

```bash
source ~/.zsh/zsh-autocomplete/zsh-autocomplete.plugin.zsh
```

### 方法三：使用 Zinit（推荐）

```bash
# 使用 Zinit 安装
zinit light marlonrichert/zsh-autocomplete

# 或使用延迟加载
zinit ice wait lucid
zinit light marlonrichert/zsh-autocomplete
```

## 功能特性

### 1. 实时补全
- 输入时实时显示补全建议
- 支持命令、参数、文件路径补全
- 智能过滤和排序

### 2. 多级补全
- 支持嵌套补全（如 `git commit -m "message"`）
- 上下文感知补全
- 动态补全列表

### 3. 可视化界面
- 彩色高亮显示
- 分组显示不同类型补全
- 可配置的布局和样式

## 基本使用

### 1. 导航补全列表
- **Tab**：选择下一个补全项
- **Shift-Tab**：选择上一个补全项
- **Ctrl-N**：向下导航
- **Ctrl-P**：向上导航
- **Ctrl-F**：向右翻页
- **Ctrl-B**：向左翻页

### 2. 接受补全
- **Enter**：接受当前补全
- **→** 或 **End**：接受补全并继续
- **Ctrl-Space**：接受补全并保持列表打开

### 3. 过滤补全
- 继续输入：自动过滤补全列表
- **Ctrl-U**：清除当前行
- **Ctrl-W**：删除前一个单词

## 配置选项

### 1. 补全行为
```bash
# 设置补全策略
zstyle ':autocomplete:*' default-context ''
zstyle ':autocomplete:*' min-input 1
zstyle ':autocomplete:*' list-lines 16

# 补全触发延迟（毫秒）
zstyle ':autocomplete:*' delay 0.1

# 启用模糊匹配
zstyle ':autocomplete:*' fzf-completion yes
```

### 2. 外观设置
```bash
# 补全列表颜色
zstyle ':autocomplete:*' list-colors ''
zstyle ':autocomplete:*' color yes

# 补全列表布局
zstyle ':autocomplete:*' group-name ''
zstyle ':autocomplete:*' group-order \
    'local-directories' \
    'path-directories' \
    'executables' \
    'builtins' \
    'commands' \
    'aliases' \
    'functions' \
    'parameters' \
    'reserved-words'
```

### 3. 性能优化
```bash
# 缓存设置
zstyle ':autocomplete:*' cache-path ~/.cache/zsh-autocomplete
zstyle ':autocomplete:*' cache-policy ''

# 限制补全数量
zstyle ':autocomplete:*' max-matches 100
zstyle ':autocomplete:*' max-candidates 1000
```

## 高级配置

### 1. 自定义补全源
```bash
# 添加自定义补全源
function _my_custom_completions() {
    local -a completions
    
    # 添加自定义补全
    completions+=('custom-command:自定义命令描述')
    completions+=('another-command:另一个命令描述')
    
    _describe 'custom completions' completions
}

compdef _my_custom_completions my-command
```

### 2. 上下文感知补全
```bash
# 根据当前目录提供补全
function _context_aware_completions() {
    case ${PWD##*/} in
        git*)
            _arguments \
                '--help[显示帮助信息]' \
                '--version[显示版本信息]' \
                '*: :_files'
            ;;
        docker*)
            _arguments \
                '(- *)'--help'[显示帮助信息]' \
                '(- *)'--version'[显示版本信息]' \
                '*: :_docker_complete'
            ;;
    esac
}
```

### 3. 集成其他补全系统
```bash
# 集成 fzf 补全
zstyle ':autocomplete:*' fzf-completion yes
zstyle ':autocomplete:*' fzf-bindings \
    'ctrl-space:accept' \
    'ctrl-a:toggle-all' \
    'ctrl-d:deselect-all' \
    'ctrl-t:toggle' \
    'ctrl-y:yank'
```

## 与其他插件集成

### 1. 与 zsh-syntax-highlighting 集成
```bash
# 确保加载顺序正确
# zsh-autocomplete 应该在 zsh-syntax-highlighting 之前加载
plugins=(
    # 其他插件...
    zsh-autocomplete
    zsh-syntax-highlighting
)
```

### 2. 与 zsh-autosuggestions 集成
```bash
# 配置避免冲突
zstyle ':autocomplete:*' complete-word yes
zstyle ':autocomplete:*' insert-unambiguous yes
```

### 3. 与 zsh-history-substring-search 集成
```bash
# 配置快捷键
bindkey '^[[A' history-substring-search-up
bindkey '^[[B' history-substring-search-down
```

## 自定义补全规则

### 1. 命令别名补全
```bash
# 为别名添加补全
compdef _git g=git
compdef _docker d=docker
compdef _kubectl k=kubectl

# 自定义别名补全函数
function _my_alias_completion() {
    local -a completions
    completions=('--help' '--version' '--verbose')
    _describe 'my alias completions' completions
}
compdef _my_alias_completion my-alias
```

### 2. 文件类型补全
```bash
# 根据文件类型提供补全
zstyle ':completion:*:*:*:*.*' file-patterns \
    '*.txt:text files' \
    '*.md:markdown files' \
    '*.py:python files' \
    '*.js:javascript files' \
    '*.json:json files'
```

### 3. 参数补全
```bash
# 自定义参数补全
function _my_command_completion() {
    _arguments \
        '(-v --verbose)'{-v,--verbose}'[详细输出]' \
        '(-q --quiet)'{-q,--quiet}'[安静模式]' \
        '(-f --file)'{-f,--file}'[输入文件]:filename:_files' \
        '(-o --output)'{-o,--output}'[输出文件]:filename:_files' \
        '*: :_my_custom_completions'
}
```

## 性能优化

### 1. 延迟加载
```bash
# 使用 Zinit 延迟加载
zinit ice wait"1" lucid
zinit light marlonrichert/zsh-autocomplete
```

### 2. 缓存策略
```bash
# 启用缓存
zstyle ':completion:*' use-cache on
zstyle ':completion:*' cache-path ~/.zsh/cache

# 设置缓存过期时间
zstyle ':completion:*' rehash true
```

### 3. 限制补全范围
```bash
# 只对特定命令启用高级补全
zstyle ':autocomplete:*' complete-in-word false
zstyle ':autocomplete:*' insert-unambiguous false
```

## 故障排除

### 问题 1：补全不显示
```bash
# 检查插件是否加载
echo $plugins | grep autocomplete

# 检查补全系统
autoload -Uz compinit && compinit

# 查看补全配置
zstyle -L | grep autocomplete
```

### 问题 2：性能问题
```bash
# 检查启动时间
time zsh -i -c exit

# 禁用实时补全
zstyle ':autocomplete:*' min-input 3

# 减少补全数量
zstyle ':autocomplete:*' max-matches 50
```

### 问题 3：快捷键冲突
```bash
# 查看当前快捷键绑定
bindkey | grep -E "Tab|Shift|Ctrl"

# 重新绑定快捷键
bindkey '^I' complete-word
bindkey '^[[Z' reverse-menu-complete
```

### 问题 4：与其他插件冲突
```bash
# 调整插件加载顺序
# zsh-autocomplete 应该在其他补全相关插件之后加载

# 禁用冲突功能
zstyle ':autocomplete:*' fzf-completion no
```

## 最佳实践

### 1. 渐进式配置
```bash
# 从简单配置开始，逐步添加功能
# 1. 先启用基本补全
# 2. 添加颜色和分组
# 3. 配置快捷键
# 4. 添加高级功能
```

### 2. 配置文件组织
```bash
# 创建单独的配置文件
mkdir -p ~/.zsh/completion
echo 'source ~/.zsh/completion/autocomplete.zsh' >> ~/.zshrc

# 在 autocomplete.zsh 中配置
cat > ~/.zsh/completion/autocomplete.zsh << 'EOF'
# zsh-autocomplete 配置
zstyle ':autocomplete:*' default-context ''
zstyle ':autocomplete:*' min-input 1
zstyle ':autocomplete:*' list-lines 16
EOF
```

### 3. 定期维护
```bash
# 更新插件
cd ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autocomplete
git pull

# 清理缓存
rm -rf ~/.zsh/cache
rm -rf ~/.cache/zsh-autocomplete
```

## 替代方案

### 1. zsh-completions
```bash
# 传统补全插件
plugins=(zsh-completions)
autoload -Uz compinit && compinit
```

### 2. fzf-tab
```bash
# 使用 fzf 的补全插件
plugins=(fzf-tab)
```

### 3. 原生 Zsh 补全
```bash
# 使用 Zsh 内置补全系统
autoload -Uz compinit
compinit

# 配置补全
zstyle ':completion:*' menu select
zstyle ':completion:*' list-colors ''
```

## 性能测试

### 1. 补全响应测试
```bash
# 测试补全响应时间
time (echo "git " && sleep 0.1 && echo "com") > /dev/null
```

### 2. 内存使用测试
```bash
# 检查内存使用
ps aux | grep zsh | grep -v grep | awk '{print $6/1024 " MB"}'

# 检查插件内存
pmap $(pgrep zsh) | grep -E "autocomplete|Total"
```

### 3. 启动时间优化
```bash
# 测量启动时间
for i in {1..5}; do
    time zsh -i -c exit
done | awk '/real/ {sum += $2} END {print "平均启动时间:", sum/NR "s"}'
```

zsh-autocomplete 是一个功能强大的实时补全插件，可以显著提高命令行输入效率。通过合理配置，可以获得流畅的补全体验。