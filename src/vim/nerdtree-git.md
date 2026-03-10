# NERDTree Git 插件

## GitHub 仓库

[https://github.com/Xuyuanp/nerdtree-git-plugin](https://github.com/Xuyuanp/nerdtree-git-plugin)

## 安装

### 使用 vim-plug 安装
在 `.vimrc` 文件中添加：

```vim
Plug 'Xuyuanp/nerdtree-git-plugin'
```

### 配置 Git 状态指示器
```vim
" 显示文件数量统计
let g:NERDTreeGitStatusShowCounts = 1

" 自定义状态图标
let g:NERDTreeGitStatusIndicatorMapCustom = {
    \ 'Modified'  : '✹',
    \ 'Staged'    : '✚',
    \ 'Untracked' : '✭',
    \ 'Renamed'   : '➜',
    \ 'Unmerged'  : '═',
    \ 'Deleted'   : '✖',
    \ 'Dirty'     : '✗',
    \ 'Ignored'   : '☒',
    \ 'Clean'     : '✔︎',
    \ 'Unknown'   : '?',
    \ }
```

## 安装 Nerd Fonts

为了正确显示图标，需要安装 Nerd Fonts：

### 使用安装脚本
```bash
wget https://raw.githubusercontent.com/mcarvalho1/Simple-NerdFonts-Downloader/c7854dae2153aa199277926bed4b992488b65a3d/nf_downloader.sh
chmod +x nf_downloader.sh
./nf_downloader.sh
```

### 手动安装字体
```bash
# 下载字体文件
mkdir -p ~/.local/share/fonts
cd ~/.local/share/fonts

# 下载常用 Nerd Fonts
wget https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/Meslo.zip
unzip Meslo.zip -d Meslo
rm Meslo.zip

# 更新字体缓存
fc-cache -fv
```

## 功能特性

### 1. Git 状态显示
- 在 NERDTree 中显示文件的 Git 状态
- 使用图标表示不同的 Git 状态
- 支持显示修改文件数量统计

### 2. 状态图标说明
| 图标 | 状态 | 说明 |
|------|------|------|
| ✹ | Modified | 文件已修改 |
| ✚ | Staged | 文件已暂存 |
| ✭ | Untracked | 未跟踪文件 |
| ➜ | Renamed | 文件已重命名 |
| ═ | Unmerged | 合并冲突 |
| ✖ | Deleted | 文件已删除 |
| ✗ | Dirty | 工作目录不干净 |
| ☒ | Ignored | 被忽略的文件 |
| ✔︎ | Clean | 文件干净 |
| ? | Unknown | 未知状态 |

### 3. 配置选项

#### 基本配置
```vim
" 启用 Git 状态显示
let g:NERDTreeGitStatusEnable = 1

" 显示修改文件数量
let g:NERDTreeGitStatusShowCounts = 1

" 显示 Git 状态文本
let g:NERDTreeGitStatusShowText = 1
```

#### 颜色配置
```vim
" 自定义颜色
let g:NERDTreeGitStatusColors = {
    \ 'Modified'  : '#FFA500',
    \ 'Staged'    : '#00FF00',
    \ 'Untracked' : '#FFFF00',
    \ 'Renamed'   : '#00FFFF',
    \ 'Unmerged'  : '#FF00FF',
    \ 'Deleted'   : '#FF0000',
    \ 'Dirty'     : '#FF4500',
    \ 'Ignored'   : '#808080',
    \ 'Clean'     : '#00FF00',
    \ 'Unknown'   : '#FFFFFF'
    \ }
```

#### 性能优化
```vim
" 延迟更新 Git 状态
let g:NERDTreeGitStatusUpdateOnWrite = 1
let g:NERDTreeGitStatusUpdateOnCursorHold = 1

" 限制 Git 命令执行频率
let g:NERDTreeGitStatusCommand = 'git'
let g:NERDTreeGitStatusAsync = 1
```

## 使用示例

### 1. 完整配置示例
```vim
" NERDTree Git 插件配置
Plug 'preservim/nerdtree'
Plug 'Xuyuanp/nerdtree-git-plugin'

" NERDTree 配置
let NERDTreeShowHidden=1
let NERDTreeIgnore=['\.pyc$', '\~$', '\.swp$']

" Git 状态配置
let g:NERDTreeGitStatusShowCounts = 1
let g:NERDTreeGitStatusIndicatorMapCustom = {
    \ 'Modified'  : '✹',
    \ 'Staged'    : '✚',
    \ 'Untracked' : '✭',
    \ 'Renamed'   : '➜',
    \ 'Unmerged'  : '═',
    \ 'Deleted'   : '✖',
    \ 'Dirty'     : '✗',
    \ 'Ignored'   : '☒',
    \ 'Clean'     : '✔︎',
    \ 'Unknown'   : '?',
    \ }

" 快捷键
nnoremap <C-n> :NERDTreeToggle<CR>
nnoremap <leader>nf :NERDTreeFind<CR>
```

### 2. 与其他插件集成
```vim
" 与 vim-devicons 集成
Plug 'ryanoasis/vim-devicons'
let g:webdevicons_enable_nerdtree = 1
let g:NERDTreeGitStatusUseNerdFonts = 1

" 与 airline 集成
let g:airline#extensions#nerdtree#enabled = 1
```

## 故障排除

### 问题 1：图标不显示
```bash
# 检查字体是否安装
fc-list | grep -i "nerd"

# 检查终端是否支持图标
echo -e "\ue0b0 \u00b1 \ue0a0 \u27a6 \u2718 \u26a1 \u2699"

# 设置终端字体
# 在终端设置中使用 Nerd Fonts
```

### 问题 2：Git 状态不更新
```vim
" 手动刷新 Git 状态
:NERDTreeRefresh

" 检查 Git 命令是否可用
:!git --version

" 启用异步更新
let g:NERDTreeGitStatusAsync = 1
```

### 问题 3：性能问题
```vim
" 禁用文件数量统计
let g:NERDTreeGitStatusShowCounts = 0

" 减少更新频率
let g:NERDTreeGitStatusUpdateOnCursorHold = 0

" 使用更快的 Git 命令
let g:NERDTreeGitStatusCommand = 'git --no-optional-locks'
```

## 高级功能

### 1. 自定义状态检测
```vim
" 自定义 Git 状态检测函数
function! MyGitStatusIndicator(path)
    " 自定义逻辑
    return '?'
endfunction

let g:NERDTreeGitStatusCustomIndicator = function('MyGitStatusIndicator')
```

### 2. 状态过滤
```vim
" 忽略特定文件的状态
let g:NERDTreeGitStatusIgnore = ['package-lock.json', 'yarn.lock']

" 只显示特定状态
let g:NERDTreeGitStatusShowOnly = ['Modified', 'Untracked']
```

### 3. 状态提示
```vim
" 启用状态提示
let g:NERDTreeGitStatusShowTooltip = 1

" 自定义提示格式
let g:NERDTreeGitStatusTooltipFormat = '%s: %d'
```

## 替代方案

### 1. nerdtree-git-status
```vim
" 另一个 Git 状态插件
Plug 'albfan/nerdtree-git-status'
```

### 2. vim-gitgutter
```vim
" 在侧边栏显示 Git 差异
Plug 'airblade/vim-gitgutter'
```

### 3. signify
```vim
" 轻量级 Git 状态显示
Plug 'mhinz/vim-signify'
```

## 最佳实践

### 1. 字体管理
```bash
# 使用字体管理器
# 如: font-manager, gnome-font-viewer

# 定期更新字体
cd ~/.local/share/fonts
git pull origin master
fc-cache -fv
```

### 2. 配置备份
```bash
# 备份配置
cp ~/.vimrc ~/.vimrc.backup
cp -r ~/.vim ~/.vim.backup

# 使用版本控制
cd ~/.vim
git init
git add .
git commit -m "Initial vim configuration"
```

### 3. 性能监控
```vim
" 监控插件性能
:profile start profile.log
:profile func *
:profile file *
:NERDTreeToggle
:profile pause
```

## 截图

![NERDTree Git 插件效果](https://camo.githubusercontent.com/5ee5b6171cda9ea0eb6ea834185b2ef869e7cb0f81ded740e9c396b8cc47a23e/687474703a2f2f692e696d6775722e636f6d2f6a534377476a552e6769663f31)

NERDTree Git 插件为 NERDTree 添加了 Git 状态显示功能，让开发者可以直观地看到文件的版本控制状态。通过合理配置，可以大大提高开发效率。