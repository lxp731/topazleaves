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

"默认显示行号
set nu

"默认显示当前光标所在行
"set cursorline

"可以使用鼠标改变位置
set mouse=a

"设置字典
set dictionary+=/usr/share/dict/words 

"Vim 退出插入模式自动保存
autocmd InsertLeave * write

"离开焦点自动保存
autocmd FocusLost * if &modified | write | endif
```
