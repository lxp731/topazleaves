# Vim 基础配置文件指南

## 我的 .vimrc 配置

```bash
{{#include ../mdbook-files/vimrc}}
```

## 配置文件详解

### 1. 基础设置
```vim
" 设置不兼容 vi
set nocompatible

" 启用文件类型检测
filetype on
filetype plugin on
filetype indent on

" 设置编码
set encoding=utf-8
set fileencodings=utf-8,gbk,big5,latin1
```

### 2. 界面设置
```vim
" 语法高亮
syntax on

" 显示行号
set number

" 显示相对行号
set relativenumber

" 高亮当前行
set cursorline

" 显示状态栏
set laststatus=2

" 显示命令
set showcmd

" 显示匹配的括号
set showmatch
```

### 3. 编辑设置
```vim
" 启用鼠标
set mouse=a

" 设置缩进
set autoindent
set smartindent
set tabstop=4
set shiftwidth=4
set expandtab

" 启用回退删除
set backspace=indent,eol,start

" 启用持久性撤销
set undofile
set undodir=~/.vim/undodir
```

### 4. 搜索设置
```vim
" 搜索时忽略大小写
set ignorecase
set smartcase

" 高亮搜索结果
set hlsearch

" 输入时实时搜索
set incsearch

" 搜索时循环
set wrapscan
```

### 5. 性能优化
```vim
" 禁用交换文件
set noswapfile

" 禁用备份文件
set nobackup
set nowritebackup

" 减少更新延迟
set updatetime=300

" 禁用错误铃声
set noerrorbells
set novisualbell
```

## 常用配置选项

### 1. 主题和颜色
```vim
" 设置配色方案
colorscheme desert

" 真彩色支持
set termguicolors

" 设置背景
set background=dark
```

### 2. 快捷键映射
```vim
" 设置 Leader 键
let mapleader = ","

" 快速保存
nnoremap <leader>w :w<CR>

" 快速退出
nnoremap <leader>q :q<CR>

" 切换行号显示
nnoremap <leader>n :set number!<CR>

" 清除搜索高亮
nnoremap <leader>h :nohlsearch<CR>
```

### 3. 插件相关
```vim
" 插件管理器初始化
call plug#begin('~/.vim/plugged')

" 插件列表
Plug 'tpope/vim-sensible'
Plug 'scrooloose/nerdtree'
Plug 'vim-airline/vim-airline'

call plug#end()
```

### 4. 文件类型特定设置
```vim
" Python 文件设置
autocmd FileType python setlocal
    \ tabstop=4
    \ softtabstop=4
    \ shiftwidth=4
    \ textwidth=79
    \ expandtab
    \ autoindent
    \ fileformat=unix

" Markdown 文件设置
autocmd FileType markdown setlocal
    \ wrap
    \ linebreak
    \ spell
    \ spelllang=en_us
```

## 配置技巧

### 1. 条件配置
```vim
" 根据操作系统配置
if has('win32')
    set shell=cmd.exe
else
    set shell=/bin/bash
endif

" 根据终端类型配置
if &term =~ '^screen'
    " tmux 特定配置
endif
```

### 2. 函数定义
```vim
" 自定义函数：删除尾部空格
function! StripTrailingWhitespace()
    let l = line(".")
    let c = col(".")
    %s/\s\+$//e
    call cursor(l, c)
endfunction

" 映射到快捷键
nnoremap <leader>sw :call StripTrailingWhitespace()<CR>
```

### 3. 自动命令
```vim
" 保存时自动格式化
autocmd BufWritePre *.py,*.js,*.json,*.md,*.txt :call StripTrailingWhitespace()

" 打开文件时自动定位到上次位置
autocmd BufReadPost *
    \ if line("'\"") >= 1 && line("'\"") <= line("$") && &ft !~# 'commit'
    \ |   exe "normal! g`\""
    \ | endif
```

## 配置文件管理

### 1. 模块化配置
```bash
# 创建配置目录结构
~/.vim/
├── vimrc                  # 主配置文件
├── config/
│   ├── basic.vim         # 基础设置
│   ├── keymaps.vim       # 快捷键映射
│   ├── plugins.vim       # 插件配置
│   └── filetypes.vim     # 文件类型设置
└── after/                # 后加载配置
```

### 2. 在 vimrc 中引入模块
```vim
" 加载模块化配置
source ~/.vim/config/basic.vim
source ~/.vim/config/keymaps.vim
source ~/.vim/config/plugins.vim
source ~/.vim/config/filetypes.vim
```

### 3. 版本控制
```bash
# 初始化 Git 仓库
cd ~
git init
git add .vimrc .vim/
git commit -m "Initial vim configuration"
```

## 调试和测试

### 1. 检查配置
```vim
" 查看当前设置
:set all

" 查看特定选项
:set tabstop?

" 检查语法
:syntax
```

### 2. 性能分析
```vim
" 启动性能分析
:profile start profile.log
:profile func *
:profile file *

" 执行操作
" ...

" 停止分析
:profile pause
:q
```

### 3. 错误排查
```vim
" 查看错误信息
:messages

" 查看加载的脚本
:scriptnames

" 检查运行时路径
:set runtimepath?
```

## 推荐配置

### 1. 开发环境配置
```vim
" 代码开发专用配置
set number
set relativenumber
set cursorline
set colorcolumn=80
set signcolumn=yes
set scrolloff=5
```

### 2. 写作环境配置
```vim
" 写作专用配置
set wrap
set linebreak
set spell
set spelllang=en_us,zh_cn
set conceallevel=2
set concealcursor=nc
```

### 3. 演示环境配置
```vim
" 演示专用配置
set nonumber
set norelativenumber
set nocursorline
set laststatus=0
set showmode
set showcmd
```

## 常见问题

### 问题 1：配置不生效
```bash
# 检查配置文件位置
ls -la ~/.vimrc

# 检查文件权限
chmod 644 ~/.vimrc

# 重新加载配置
vim -u ~/.vimrc
```

### 问题 2：插件冲突
```vim
" 暂时禁用插件测试
" 在配置文件中注释掉插件行
" Plug 'some/plugin'

" 重新加载配置
:source ~/.vimrc
```

### 问题 3：性能问题
```vim
" 检查启动时间
vim --startuptime startup.log

" 查看日志分析
cat startup.log | sort -k2 -nr | head -20
```

## 最佳实践

### 1. 渐进式配置
- 从基础配置开始
- 逐步添加需要的功能
- 定期清理不需要的配置

### 2. 文档化
- 为重要配置添加注释
- 记录配置变更原因
- 分享配置经验

### 3. 备份和同步
- 定期备份配置文件
- 使用版本控制系统
- 在多台机器间同步配置

一个好的 Vim 配置可以显著提高编辑效率。建议从基础配置开始，根据实际需求逐步添加功能，形成适合自己的个性化配置。
