# Confgure .vimrc

```bash
"===
"===编写脚本自动插入
"===
function! AddTitleForShell()
   call append(0,"#!/bin/bash")
   call append(1,"# **********************************************************")
   call append(2,"# * Author        : Burgess Leo")
   call append(3,"# * Email         : liuxp731@qq.com")
   call append(4,"# * Create time   : ".strftime("%Y-%m-%d %H:%M"))
   call append(5,"# * Filename      : ".expand("%:t"))
   call append(6,"# * Description   : ")
   call append(7,"# **********************************************************")
endfunction

autocmd BufNewFile *.sh call AddTitleForShell()



"===
"===System Setting
"===
let mapleader=" "
set nocompatible
set showcmd
set mouse=a
set clipboard=unnamed
"sudo apt install xclip
vnoremap Y :w !xclip -i -sel c<CR>
filetype on
filetype indent on
filetype plugin on
filetype plugin indent on
"set laststatus=2
set autochdir
set dictionary+=/usr/share/dict/words
"autocmd InsertLeave * write
"autocmd FocusLost * if &modified | write | endif



"===
"===Show command autocomplete
"===
set wildignore=log/**,node_modules/**,target/**,tmp/**,*.rbc
set wildmenu
set wildmode=longest,list,full



"===
"===Search Setting
"===
set hlsearch
exec "nohlsearch"
set incsearch
set ignorecase
set smartcase


"===
"===Code Display
"===
set encoding=UTF-8
syntax on
set number
set relativenumber
set cursorline
let &t_ut=''



"===
"===Tab behavior
"===
set expandtab
set tabstop=2
set shiftwidth=2
set softtabstop=2
set list
set listchars=tab:▸\ ,trail:▫
set scrolloff=10



"===
"===Prevent auto line split
"===
set tw=0
set wrap
set indentexpr=
set backspace=indent,eol,start
set foldmethod=indent
set foldlevel=99



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
noremap <A-Up> dd2kp
noremap <A-Down> ddp
inoremap <C-z> <C-O>u
inoremap <C-S-k> <Esc>ddi
inoremap <A-Up> <Esc>ddkPgi
inoremap <A-Down> <Esc>ddjPgi




"===
"===Words spell Checking
"===
map <LEADER>pl :set spell!<CR>
noremap <C-x> ea<C-x>s
inoremap <C-x> <Esc>ea<C-x>s



"===
"===分割窗口
"===
noremap sl :set splitright<CR>:vsplit<CR>
noremap snl :set nosplitright<CR>:vsplit<CR>
noremap sk :set splitbelow<CR>:split<CR>
noremap snk :set nosplitbelow<CR>:split<CR>
noremap <LEADER>l <C-w>l
noremap <LEADER>h <C-w>h
noremap <LEADER>j <C-w>k
noremap <LEADER>k <C-w>j
noremap <C-Up> :res +5<CR>
noremap <C-Down> :res -5<CR>
noremap <C-Left> :vertical resize-5<CR>
noremap <C-Right> :vertical resize+5<CR>
map sv <C-w>t<C-w>H
map sh <C-w>t<C-w>K



"===
"===Tab Managet
"===
noremap tl :tabnext<CR>
noremap th :tabprevious<CR>
noremap to :tabclose<CR>
noremap tq :tabfirst<CR>
noremap tp :tablast<CR>
" Insert mode mappings
"inoremap tl <C-O>:tabnext<CR>
"inoremap th <C-O>:tabprevious<CR>
"inoremap tq <C-O>:tabfirst<CR>
"inoremap tp <C-O>:tablast<CR>



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



" ===
" === Tagbar
" ===
" nmap <F8> :TagbarToggle<CR>



"===
"===ALE
"===
" let g:ale_fixers = {
" \   '*': ['remove_trailing_lines', 'trim_whitespace'],
" \   'javascript': ['eslint'],
" \}
" let g:ale_fix_on_save = 1
" call deoplete#custom#option('sources', {
" \ '_': ['ale', 'foobar'],
" \})
" let g:ale_completion_enabled = 1



"===
"===Markdown Preview
"===
let g:mkdp_auto_start = 0
let g:mkdp_auto_close = 1
let g:mkdp_refresh_slow = 0
let g:mkdp_command_for_global = 0
let g:mkdp_open_to_the_world = 0
let g:mkdp_open_ip = ''
let g:mkdp_browser = ''
let g:mkdp_echo_preview_url = 0
let g:mkdp_browserfunc = ''
let g:mkdp_preview_options = {
    \ 'mkit': {},
    \ 'katex': {},
    \ 'uml': {},
    \ 'maid': {},
    \ 'disable_sync_scroll': 0,
    \ 'sync_scroll_type': 'middle',
    \ 'hide_yaml_meta': 1
    \ }
let g:mkdp_markdown_css = ''
let g:mkdp_highlight_css = ''
let g:mkdp_page_title = '「${name}」'
let g:mkdp_port = '3000'
let g:mkdp_theme = 'light' "dark OR light
" combine preview window
" ensure to set let g:mkdp_auto_close = 0 if you have enable this option
let g:mkdp_combine_preview = 0
" auto refetch combine preview contents when change markdown buffer
" only when g:mkdp_combine_preview is 1
let g:mkdp_combine_preview_auto_refresh = 1
noremap mp :MarkdownPreview<CR>
noremap ms :MarkdownPreviewStop<CR>



"===
"===MarkdownEdit
"===
"autocmd Filetype markdown map <leader>w yiWi[<esc>Ea](<esc>pa)
autocmd Filetype markdown inoremap ,f <Esc>/<++><CR>:nohlsearch<CR>c4l
autocmd Filetype markdown inoremap ,n ---<Enter><Enter>
autocmd Filetype markdown inoremap ,b **** <++><Esc>F*hi
autocmd Filetype markdown inoremap ,s ~~~~ <++><Esc>F~hi
autocmd Filetype markdown inoremap ,i ** <++><Esc>F*i
autocmd Filetype markdown inoremap ,d `` <++><Esc>F`i
autocmd Filetype markdown inoremap ,c ```<Enter><++><Enter>```<Enter><Enter><++><Esc>4kA
autocmd Filetype markdown inoremap ,h ====<Space><++><Esc>F=hi
autocmd Filetype markdown inoremap ,p ![](<++>) <++><Esc>F[a
autocmd Filetype markdown inoremap ,a [](<++>) <++><Esc>F[a
autocmd Filetype markdown inoremap ,1 #<Space><Enter><++><Esc>kA
autocmd Filetype markdown inoremap ,2 ##<Space><Enter><++><Esc>kA
autocmd Filetype markdown inoremap ,3 ###<Space><Enter><++><Esc>kA
autocmd Filetype markdown inoremap ,4 ####<Space><Enter><++><Esc>kA
autocmd Filetype markdown inoremap ,l --------<Enter>



"===
"===UndoTree
"===
nnoremap <F5> :UndotreeToggle<CR>



"===
"===vim-surround
"===
"objects: word(iw), line(s), tag(t)
"opretion: add, remove, change
"add: ys[objects] [Mark]
"remove: ds [Mark]
"change: cs [src_Mark], [dst_Mark]
```
