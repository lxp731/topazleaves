# Confgure .vimrc

```bash
"===
"===编写脚本自动插入
"===
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
noremap s <nop>
noremap S :w<CR>
noremap R :source $MYVIMRC<CR>
noremap XX :q!<CR>
noremap j k
noremap k j
noremap = nzz
noremap - Nzz



"===
"===分割窗口
"===
noremap sl :set splitright<CR>:vsplit<CR>
noremap sl :set nosplitright<CR>:vsplit<CR>
noremap sd :set splitbelow<CR>:split<CR>
noremap su :set nosplitbelow<CR>:split<CR>
noremap <LEADER>h <C-w>h
noremap <LEADER>l <C-w>l
noremap <LEADER>j <C-w>k
noremap <LEADER>k <C-w>j
noremap <C-Up> :res +5<CR>
noremap <C-Down> :res -5<CR>
noremap <C-Left> :vertical resize-5<CR>
noremap <C-Right> :vertical resize+5<CR>
map sv <C-w>t<C-w>H
map sh <C-w>t<C-w>K



"===
"===保存VIM光标位置
"===
augroup remember_last_cursor_position
    autocmd!
    autocmd BufWritePost * mkview
    autocmd BufReadPost * if line("'\"") > 0 && line("'\"") <= line("$") | exe "normal g`\"" | endif
augroup END



"===
"===VIM 插件管理器
"===
call plug#begin('~/.vim/plugged')
Plug 'sheerun/vim-polyglot'
Plug 'vim-airline/vim-airline'
Plug 'connorholyday/vim-snazzy'

" File navigation
Plug 'preservim/nerdtree'
Plug 'Xuyuanp/nerdtree-git-plugin'

" Taglist
Plug 'majutsushi/tagbar', { 'on': 'TagbarOpenAutoClose' }

" Error checking
Plug 'w0rp/ale'

" Auto Complete
Plug 'Valloric/YouCompleteMe'

" Undo Tree
Plug 'mbbill/undotree/'

" Other visual enhancement
Plug 'nathanaelkane/vim-indent-guides'
Plug 'itchyny/vim-cursorword'

" Git
Plug 'rhysd/conflict-marker.vim'
Plug 'tpope/vim-fugitive'
Plug 'mhinz/vim-signify'
Plug 'gisphm/vim-gitignore', { 'for': ['gitignore', 'vim-plug'] }

" HTML, CSS, JavaScript, PHP, JSON, etc.
Plug 'elzr/vim-json'
Plug 'hail2u/vim-css3-syntax'
Plug 'spf13/PIV', { 'for' :['php', 'vim-plug'] }
Plug 'gko/vim-coloresque', { 'for': ['vim-plug', 'php', 'html', 'javascript', 'css', 'less'] }
Plug 'pangloss/vim-javascript', { 'for' :['javascript', 'vim-plug'] }
Plug 'mattn/emmet-vim'

" Python
Plug 'vim-scripts/indentpython.vim'

" Markdown
Plug 'iamcco/markdown-preview.nvim', { 'do': { -> mkdp#util#install_sync() }, 'for' :['markdown', 'vim-plug'] }
Plug 'dhruvasagar/vim-table-mode', { 'on': 'TableModeToggle' }
Plug 'vimwiki/vimwiki'

" Bookmarks
Plug 'kshenoy/vim-signature'

" Other useful utilities
Plug 'terryma/vim-multiple-cursors'
Plug 'junegunn/goyo.vim' " distraction free writing mode
Plug 'tpope/vim-surround' " type ysks' to wrap the word with '' or type cs'` to change 'word' to `word`
Plug 'godlygeek/tabular' " type ;Tabularize /= to align the =
Plug 'gcmt/wildfire.vim' " in Visual mode, type i' to select all text in '', or type i) i] i} ip
Plug 'scrooloose/nerdcommenter' " in <space>cc to comment a line

" Dependencies
Plug 'MarcWeber/vim-addon-mw-utils'
Plug 'kana/vim-textobj-user'
Plug 'fadein/vim-FIGlet'
call plug#end()



"===
"===Snazzy Setting
"===
let g:SnazzyTransparent = 1
"color sorbet
color snazzy
"color slate
"color desert
"color industry
"color evening
"color habamax
"color peachpuff
"color elflord
"color pablo
"color murphy
"color lunaperche
"color koehler


"===
"===NERDTree Setting
"===
"Start NERDTree when Vim starts with a directory argument.
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 1 && isdirectory(argv()[0]) && !exists('s:std_in') |
    \ execute 'NERDTree' argv()[0] | wincmd p | enew | execute 'cd '.argv()[0] | endif
"Close the tab if NERDTree is the only window remaining in it.
autocmd BufEnter * if winnr('$') == 1 && exists('b:NERDTree') && b:NERDTree.isTabTree() | quit | endif
nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <C-t> :NERDTreeToggle<CR>
"nnoremap <C-n> :NERDTree<CR>
"nnoremap <C-f> :NERDTreeFind<CR>



" ===
" === NERDTree-git
" ===
"let g:NERDTreeGitStatusUseNerdFonts = 1
let g:NERDTreeGitStatusIndicatorMapCustom = {
                \ 'Modified'  :'✹',
                \ 'Staged'    :'✚',
                \ 'Untracked' :'✭',
                \ 'Renamed'   :'➜',
                \ 'Unmerged'  :'═',
                \ 'Deleted'   :'✖',
                \ 'Dirty'     :'✗',
                \ 'Ignored'   :'☒',
                \ 'Clean'     :'✔︎',
                \ 'Unknown'   :'?',
                \ }
```
