# NERDTree：Vim 文件浏览器插件

> 参考：[https://vimawesome.com/plugin/nerdtree-red](https://vimawesome.com/plugin/nerdtree-red)

## 安装 NERDTree

### 使用 vim-plug 安装
在 `.vimrc` 文件中添加以下内容：

```vim
Plug 'preservim/nerdtree'
```

### 安装步骤：
1. 保存 `.vimrc` 文件
2. 重新打开 Vim 窗口
3. 输入 `:PlugInstall` 安装 NERDTree

### 其他安装方法：
```vim
" 使用 Vundle
Plugin 'preservim/nerdtree'

" 使用 dein.vim
call dein#add('preservim/nerdtree')

" 使用 Pathogen
git clone https://github.com/preservim/nerdtree.git ~/.vim/bundle/nerdtree
```

## 设置快捷键

在 `.vimrc` 中添加以下快捷键映射：

```vim
" NERDTree 快捷键
nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <C-n> :NERDTree<CR>
nnoremap <C-t> :NERDTreeToggle<CR>
nnoremap <C-f> :NERDTreeFind<CR>
```

### 快捷键说明：
- `<leader>n`：默认 `<leader>` 键是 `\`。将焦点从文件切换到 NERDTree
- `<C-n>`：打开 NERDTree
- `<C-t>`：切换 NERDTree 显示/隐藏
- `<C-f>`：在 NERDTree 中查找当前文件

## 自动打开配置

### 1. Vim 启动时自动打开 NERDTree
当 Vim 以目录参数启动时自动打开 NERDTree：

```vim
" 当 Vim 以目录参数启动时自动打开 NERDTree
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 1 && isdirectory(argv()[0]) && !exists('s:std_in') |
    \ execute 'NERDTree' argv()[0] | wincmd p | enew | execute 'cd '.argv()[0] | endif
```

### 2. 自动关闭标签页
如果 NERDTree 是标签页中唯一的窗口，则关闭标签页：

```vim
" 如果 NERDTree 是标签页中唯一的窗口，则关闭标签页
autocmd BufEnter * if winnr('$') == 1 && exists('b:NERDTree') && b:NERDTree.isTabTree() | quit | endif
```

## 基本使用

### 1. 打开和关闭
```vim
:NERDTree           " 打开 NERDTree
:NERDTreeToggle     " 切换 NERDTree 显示/隐藏
:NERDTreeClose      " 关闭 NERDTree
:NERDTreeFocus      " 将焦点切换到 NERDTree
```

### 2. 文件操作
在 NERDTree 窗口中：
- `o`：打开文件或目录
- `go`：在预览窗口中打开文件
- `t`：在新标签页中打开文件
- `T`：在后台标签页中打开文件
- `i`：水平分割打开文件
- `s`：垂直分割打开文件

### 3. 目录操作
- `O`：递归打开目录
- `x`：关闭当前节点的父目录
- `X`：递归关闭所有目录
- `e`：编辑当前目录

### 4. 书签管理
- `:Bookmark <name>`：添加书签
- `B`：显示/隐藏书签
- `D`：删除书签

## 高级配置

### 1. 外观设置
```vim
" 显示行号
let NERDTreeShowLineNumbers=1

" 隐藏特定文件
let NERDTreeIgnore=['\.pyc$', '\~$', '\.swp$']

" 显示隐藏文件
let NERDTreeShowHidden=1

" 窗口大小
let NERDTreeWinSize=35

" 在右侧显示
let NERDTreeWinPos="right"
```

### 2. 图标支持
```vim
" 启用文件图标
let g:NERDTreeFileExtensionHighlightFullName = 1
let g:NERDTreeExactMatchHighlightFullName = 1
let g:NERDTreePatternMatchHighlightFullName = 1

" 使用 NERDTree 图标插件
Plug 'ryanoasis/vim-devicons'
let g:webdevicons_enable_nerdtree = 1
```

### 3. Git 集成
```vim
" 显示 Git 状态
Plug 'Xuyuanp/nerdtree-git-plugin'
let g:NERDTreeGitStatusIndicatorMapCustom = {
    \ "Modified"  : "✹",
    \ "Staged"    : "✚",
    \ "Untracked" : "✭",
    \ "Renamed"   : "➜",
    \ "Unmerged"  : "═",
    \ "Deleted"   : "✖",
    \ "Dirty"     : "✗",
    \ "Clean"     : "✔︎",
    \ "Ignored"   : "☒",
    \ "Unknown"   : "?"
    \ }
```

## 常用命令

### 1. 查找文件
```vim
:NERDTreeFind       " 在 NERDTree 中定位当前文件
:NERDTree /path     " 打开指定路径
```

### 2. 刷新和过滤
```vim
R                   " 刷新当前目录
m                   " 显示菜单
f                   " 切换文件过滤
F                   " 切换文件显示
```

### 3. 书签操作
```vim
:NERDTreeFromBookmark <name>  " 从书签打开
:NERDTreeFindBookmark         " 查找书签
```

## 集成其他插件

### 1. 与 fzf 集成
```vim
" 使用 fzf 在 NERDTree 中搜索
nnoremap <leader>p :NERDTreeFind<CR>:FZF<CR>
```

### 2. 与 airline 集成
```vim
" 在状态栏显示 NERDTree 状态
let g:airline#extensions#nerdtree#enabled = 1
```

### 3. 与 tagbar 集成
```vim
" 同时打开 NERDTree 和 Tagbar
nnoremap <leader>tt :NERDTreeToggle<CR>:TagbarToggle<CR>
```

## 性能优化

### 1. 延迟加载
```vim
" 使用 vim-plug 的延迟加载
Plug 'preservim/nerdtree', { 'on': 'NERDTreeToggle' }
```

### 2. 缓存设置
```vim
" 启用缓存
let g:NERDTreeChDirMode = 2
let g:NERDTreeBookmarksFile = expand("$HOME/.NERDTreeBookmarks")
```

### 3. 禁用不需要的功能
```vim
" 禁用鼠标支持（提高性能）
let NERDTreeMouseMode = 0

" 禁用语法高亮
let NERDTreeSyntaxDisableDefault = 1
```

## 故障排除

### 问题 1：NERDTree 不显示
```vim
" 检查插件是否安装
:PlugStatus

" 检查 NERDTree 命令是否可用
:command NERDTree

" 重新加载配置
:source ~/.vimrc
```

### 问题 2：快捷键冲突
```vim
" 检查快捷键映射
:map <C-n>
:map <C-t>

" 修改冲突的快捷键
nnoremap <leader>nt :NERDTreeToggle<CR>
```

### 问题 3：性能问题
```vim
" 检查加载时间
vim --startuptime startup.log

" 分析性能
:profile start profile.log
:profile func *
:profile file *
:NERDTreeToggle
:profile pause
```

## 替代方案

### 1. vim-dirvish
```vim
" 更轻量级的文件浏览器
Plug 'justinmk/vim-dirvish'
```

### 2. fern.vim
```vim
" 现代化的文件浏览器
Plug 'lambdalisue/fern.vim'
```

### 3. ranger.vim
```vim
" 集成 ranger 文件管理器
Plug 'francoiscabrol/ranger.vim'
```

## 最佳实践

### 1. 配置文件组织
```vim
" 将 NERDTree 配置放在单独文件中
source ~/.vim/config/nerdtree.vim
```

### 2. 项目特定配置
```vim
" 在项目根目录创建 .vimrc.local
if filereadable(".vimrc.local")
    source .vimrc.local
endif
```

### 3. 定期更新
```vim
" 更新插件
:PlugUpdate

" 清理不需要的插件
:PlugClean
```

## 截图

![NERDTree 截图](https://github.com/preservim/nerdtree/raw/master/screenshot.png)

更多详细信息请参考：
- [VimAwesome](https://vimawesome.com/plugin/nerdtree-red)
- [NERDTree GitHub 仓库](https://github.com/preservim/nerdtree)

NERDTree 是 Vim 中最流行的文件浏览器插件之一，通过合理配置可以大大提高文件导航效率。建议根据个人习惯定制快捷键和外观设置。
