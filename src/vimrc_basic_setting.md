# Confgure .vimrc

```bash
autocmd BufNewFile *.sh exec ":call AddTitleForShell()"
function  AddTitleForShell()
   call append(0,"#!/bin/bash")
   call append(1,"# **********************************************************")
   call append(2,"# * Author        : Burgess Leo")
   call append(3,"# * Email         : xiaoli@qiuqiu.com")
   call append(4,"# * Create time   : ".strftime("%Y-%m-%d %H:%M"))
   call append(5,"# * Filename      : ".expand("%:t"))
   call append(6,"# * Description   : ")
   call append(7,"# **********************************************************")
endfunction

"默认使用系统剪切板，下载vim-gtk3
set clipboard=unnamedplus

"默认显示行号
set number
"set relativenumber

"默认显示当前光标所在行
"set cursorline

"可以使用鼠标改变位置
set mouse=a

"设置字典
set dictionary+=/usr/share/dict/words 

"键位映射
"map s <nop>
map S :w<CR>
map R :source $MYVIMRC<CR>

"保存光标位置
augroup remember_last_cursor_position
    autocmd!
    " 当文件写入时保存光标位置
    autocmd BufWritePost * mkview
    " 当文件打开时恢复光标位置
    autocmd BufReadPost * if line("'\"") > 0 && line("'\"") <= line("$") | exe "normal g`\"" | endif
augroup END

"Vim 退出插入模式自动保存
autocmd InsertLeave * write

"离开焦点自动保存
autocmd FocusLost * if &modified | write | endif
```
