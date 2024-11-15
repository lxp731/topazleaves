# Confgure .vimrc

```bash
function  AddTitleForShell()
   call append(0,"#!/bin/bash")
   call append(1,"# **********************************************************")
   call append(2,"# * Author        : Burgess Leo")
   call append(3,"# * Email         : liuxp731@qq.com")
   call append(4,"# * Create time   : ".strftime("%Y-%m-%d %H:%M"))
   call append(5,"# * Filename      : ".expand("%:t"))
   call append(6,"# * Description   : ")
   call append(7,"# **********************************************************")
endfunction



"===
"===基础设置
"===
" 设置leader
let mapleader=" "
" 超出窗口宽度自动换行
set wrap
" 显示命令
set showcmd
" 搜索
set wildmenu
" 高亮搜索
set hlsearch
" 完成搜索后清除视觉干扰
exec "nohlsearch"
" 匹配的文本立即更新
set incsearch
" 忽略大小写
set ignorecase
" 智能区分大小写
set smartcase
" 语法高亮
syntax on
" 编码
set encoding=UTF-8
" 显示行号
set number
" 显示相对行号
set relativenumber
" 高亮当前行
set cursorline
" 鼠标模式
set mouse=a
" 禁用vim的兼容模式
set nocompatible
" 启用文件类型检测
filetype on
" 启用文件类型缩进
filetype indent on
" 启用插件
filetype plugin on
" 启用插件缩进
filetype plugin indent on
" 设置终端的下划线属性
let &t_ut=''
" 启用空格替代制表符
set expandtab
" 设置制表符为2个空格
set tabstop=2
" 设置缩进宽度
set shiftwidth=2
" 设置软制表符
set softtabstop=2
" 显示空格和制表符
set list
" 定义不可见字符的显示方式
set listchars=tab:▸\ ,trail:▫
" 设置光标在屏幕边缘时滚动
set scrolloff=5
" 不限制文本的宽度
set tw=0
" 清空缩进表达式
set indentexpr=
" 允许退格键删除空格
set backspace=indent,eol,start
" 缩进模式折叠
set foldmethod=indent
" 折叠级别
set foldlevel=99
" airline
"set laststatus=2
" 改变目录
set autochdir
" 设置字典
set dictionary+=/usr/share/dict/words
" 离开插入模式自动保存
"autocmd InsertLeave * write
" 离开焦点自动保存
"autocmd FocusLost * if &modified | write | endif



"===
"===快捷键映射
"===
noremap <LEADER><CR> :nohlsearch<CR>
"map s <nop>
noremap S :w<CR>
noremap R :source $MYVIMRC<CR>
noremap j k
noremap k j
" 自动保存光标位置
augroup remember_last_cursor_position
    autocmd!
    autocmd BufWritePost * mkview
    autocmd BufReadPost * if line("'\"") > 0 && line("'\"") <= line("$") | exe "normal g`\"" | endif
augroup END
```
