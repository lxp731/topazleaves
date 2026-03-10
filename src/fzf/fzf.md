# fzf：命令行模糊查找工具

## 官方网站

- [GitHub 仓库](https://github.com/junegunn/fzf)
- [使用手册](https://junegunn.github.io/fzf/search-syntax/)

## 安装 fzf

### 源码安装（推荐）
```bash
# 克隆 fzf 仓库
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf

# 运行安装脚本
~/.fzf/install
```

### 包管理器安装
```bash
# Ubuntu/Debian
sudo apt install fzf

# Arch Linux
sudo pacman -S fzf

# macOS (Homebrew)
brew install fzf

# 安装后需要运行
$(brew --prefix)/opt/fzf/install
```

## 配置 .bashrc

### 基础示例：切换 Git 分支
```bash
# 使用 fzf 选择并切换 Git 分支
alias gcb="git branch | fzf --preview 'git show --color=always {-1}' \
                 --bind 'enter:become(git checkout {-1})' \
                 --height 60% --layout reverse"
```

### 初始化 fzf 环境
```bash
# fzf 初始化
eval "$(~/.fzf/bin/fzf --bash)"
[ -f ~/.fzf.bash ] && source ~/.fzf.bash
```

## 默认快捷键

fzf 内置了以下默认快捷键：

| 快捷键 | 功能 |
|--------|------|
| <kbd>Ctrl</kbd>+<kbd>R</kbd> | 搜索命令历史 |
| <kbd>Ctrl</kbd>+<kbd>T</kbd> | 搜索文件和目录 |
| <kbd>Alt</kbd>+<kbd>C</kbd> | 切换目录 |

你可以自定义这些功能：

## 高级配置

### 1. 命令历史搜索优化
```bash
# 使用 Ctrl-Y 复制命令到剪贴板
export FZF_CTRL_R_OPTS="
  --bind 'ctrl-y:execute-silent(echo -n {2..} | pbcopy)+abort'
  --color header:italic
  --header '按 Ctrl-Y 复制命令到剪贴板'
  --height 80% --layout reverse"
```

### 2. 文件搜索优化
```bash
# 使用 bat 预览文件内容
export FZF_CTRL_T_OPTS="
  --walker-skip .git,node_modules,target
  --preview 'batcat -n --color=always {}'
  --bind 'ctrl-/:change-preview-window(down|hidden|)'
  --height 80% --layout reverse"
```

### 3. 目录切换优化
```bash
# 使用 tree 预览目录结构
export FZF_ALT_C_OPTS="
  --walker-skip .git,node_modules,target
  --preview 'tree -C {}'
  --height 80% --layout reverse"
```

### 4. 高级搜索函数：ripgrep -> fzf -> vim
```bash
# 安装依赖：sudo apt install -y ripgrep bat
rfv() (
  RELOAD='reload:rg --column --color=always --smart-case {q} || :'
  OPENER='if [[ $FZF_SELECT_COUNT -eq 0 ]]; then
            vim {1} +{2}     # 无选择：在 Vim 中打开当前行
          else
            vim +cw -q {+f}  # 有选择：为选中项创建 quickfix 列表
          fi'
  fzf --disabled --ansi --multi \
      --bind "start:$RELOAD" --bind "change:$RELOAD" \
      --bind "enter:become:$OPENER" \
      --bind "ctrl-o:execute:$OPENER" \
      --bind 'alt-a:select-all,alt-d:deselect-all,ctrl-/:toggle-preview' \
      --delimiter : \
      --preview 'batcat --style=full --color=always --highlight-line {2} {1}' \
      --preview-window '~4,+{2}+4/3,<80(up)' \
      --query "$*"
)
```

> **提示**：在 fzf 界面中，按 <kbd>Esc</kbd> 键可以退出。

## 常用功能

### 1. 搜索文件内容
```bash
# 在当前目录递归搜索包含 "keyword" 的文件
rg --color=always -n "keyword" | fzf

# 使用预览功能
rg --color=always -n "keyword" | fzf --preview 'batcat --color=always --highlight-line {2} {1}'
```

### 2. 进程管理
```bash
# 搜索并管理进程
ps aux | fzf

# 杀死选中的进程
ps aux | fzf --multi | awk '{print $2}' | xargs kill -9
```

### 3. Git 操作
```bash
# 查看 Git 提交历史
git log --oneline --graph --color=always | fzf

# 选择并查看特定提交
git log --oneline --graph --color=always | fzf --preview 'git show --color=always {1}'
```

### 4. SSH 主机连接
```bash
# 从 SSH 配置中选择主机
grep "^Host" ~/.ssh/config | cut -d' ' -f2 | fzf --preview 'ssh {} "hostname && whoami"'
```

## 配置技巧

### 1. 主题定制
```bash
# 使用 solarized 主题
export FZF_DEFAULT_OPTS="--color=bg+:#073642,bg:#002b36,spinner:#719e07,hl:#586e75 \
--color=fg:#839496,header:#586e75,info:#cb4b16,pointer:#719e07 \
--color=marker:#719e07,fg+:#839496,prompt:#719e07,hl+:#719e07"
```

### 2. 布局设置
```bash
# 设置默认布局
export FZF_DEFAULT_OPTS="--height 40% --layout=reverse --border"
```

### 3. 搜索命令
```bash
# 使用 fd 替代 find（更快）
export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
```

## 与其他工具集成

### 1. 与 Vim 集成
```vim
" 安装 fzf.vim 插件
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
Plug 'junegunn/fzf.vim'

" 快捷键映射
nnoremap <C-p> :Files<CR>
nnoremap <C-g> :Rg<CR>
nnoremap <C-b> :Buffers<CR>
```

### 2. 与 Zsh 集成
```bash
# 在 .zshrc 中添加
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
```

### 3. 与 Tmux 集成
```bash
# 在 tmux 中使用 fzf
tmux list-sessions | fzf | cut -d: -f1 | xargs tmux switch-client -t
```

## 性能优化

### 1. 使用更快的查找工具
```bash
# 安装 fd (替代 find)
sudo apt install fd-find  # Ubuntu
brew install fd           # macOS

# 配置 fzf 使用 fd
export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
```

### 2. 缓存结果
```bash
# 对于大型目录，可以使用缓存
export FZF_DEFAULT_COMMAND='find . -type f 2>/dev/null | head -10000'
```

### 3. 限制搜索范围
```bash
# 忽略特定目录
export FZF_DEFAULT_COMMAND='find . -type f -not -path "*/node_modules/*" -not -path "*/.git/*"'
```

## 常见问题

### 问题 1：安装后快捷键不生效
```bash
# 重新加载 shell 配置
source ~/.bashrc
# 或
source ~/.zshrc
```

### 问题 2：预览功能不工作
```bash
# 安装预览工具
sudo apt install bat tree  # Ubuntu
brew install bat tree      # macOS
```

### 问题 3：搜索速度慢
```bash
# 使用更快的工具
sudo apt install ripgrep fd-find  # Ubuntu
brew install ripgrep fd           # macOS
```

## 实用别名

```bash
# 快速搜索历史命令
alias h='history | fzf'

# 快速切换目录
alias d='cd $(find . -type d | fzf)'

# 快速编辑文件
alias e='vim $(fzf)'

# 快速查看文件
alias v='bat $(fzf)'

# 快速搜索并替换
alias sr='rg --files-with-matches "$1" | fzf | xargs vim -c "%s/$1/$2/g" -c "wq"'
```

fzf 是一个非常强大的命令行工具，通过模糊查找大大提高了命令行工作效率。花时间学习和配置 fzf，你会发现它值得每一分钟的投入。
