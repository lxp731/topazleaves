# Vim 实用技巧合集

本文收集了 Vim 编辑器中实用的操作技巧，帮助提高编辑效率。

## 在行首添加内容

### 操作步骤：
1. 在普通模式下，按 `Ctrl-v` 进入可视块模式
2. 选择要添加内容的行，按 `I` 进入插入模式
3. 编辑内容，按 `Esc` 退出插入模式，其他行会自动添加相同内容

### 示例：
```
原始文本：
line1
line2
line3

操作后：
prefix line1
prefix line2
prefix line3
```

## 在行尾添加内容

### 操作步骤：
1. 在普通模式下，按 `gv` 选择上次的选区（或手动选择）
2. 按 `$` 跳转到行尾，按 `A` 进入插入模式
3. 编辑内容，按 `Esc` 退出插入模式

### 示例：
```
原始文本：
line1
line2
line3

操作后：
line1 suffix
line2 suffix
line3 suffix
```

## Vim 录制和回放

### 录制宏：
1. 在普通模式下，按 `qa` 开始录制（a 是宏的名称，可以使用任意字母）
2. 按 `i` 进入插入模式，编辑内容
3. 按 `Esc` 退出插入模式，按 `q` 停止录制

### 回放宏：
- 在普通模式下，按 `@a` 回放名为 a 的宏
- 按 `10@a` 回放宏 10 次

### 注意事项：
- 录制结束时，确保光标在下一行的开头
- 宏可以保存在寄存器中，重启 Vim 后仍然可用
- 使用 `:reg a` 查看宏 a 的内容

## 强制保存文件

有时你可能在 Vim 中编辑了一个文件，但没有使用 `sudo`。当你需要保存时，可以使用以下命令：

```vim
:w !sudo tee %
```

### 命令解释：
- `:w`：写入文件
- `!sudo tee %`：通过 sudo 执行 tee 命令，`%` 表示当前文件名

### 操作流程：
1. 编辑文件时忘记使用 sudo
2. 尝试保存时提示权限不足
3. 执行上述命令
4. 输入密码确认
5. 使用 `:q!` 退出（不保存缓冲区）

## 快速跳转技巧

### 1. 位置跳转
- `Ctrl-o`：跳转到上一个位置
- `Ctrl-i`：跳转到下一个位置
- 这两个命令可以在两个文件之间互相跳转

### 2. 文件跳转
- `gf`：跳转到光标指向的文件
- 需要设置 `path` 选项：`set path+=**`

### 3. URL 打开
- `gx`：在浏览器中打开光标指向的 URL
- 需要网络连接和合适的浏览器

## 更多实用技巧

### 1. 批量替换
```vim
# 替换当前行中的第一个匹配
:s/old/new/

# 替换当前行中的所有匹配
:s/old/new/g

# 替换整个文件中的匹配
:%s/old/new/g

# 替换时确认每个匹配
:%s/old/new/gc
```

### 2. 多窗口操作
```vim
# 水平分割窗口
:sp 文件名
# 或
Ctrl-w s

# 垂直分割窗口
:vsp 文件名
# 或
Ctrl-w v

# 切换窗口
Ctrl-w h/j/k/l  # 左/下/上/右
Ctrl-w w        # 循环切换
```

### 3. 标签页管理
```vim
# 新建标签页
:tabnew 文件名
# 或
:tabedit 文件名

# 切换标签页
:tabn  # 下一个
:tabp  # 上一个
:tabfirst  # 第一个
:tablast   # 最后一个

# 关闭标签页
:tabclose
# 或
:tabc
```

### 4. 寄存器使用
```vim
# 查看寄存器内容
:reg

# 复制到寄存器 a
"ayy  # 复制当前行到寄存器 a
"ap   # 粘贴寄存器 a 的内容

# 系统剪贴板
"+yy  # 复制到系统剪贴板
"+p   # 从系统剪贴板粘贴
```

### 5. 搜索和导航
```vim
# 搜索
/pattern  # 向前搜索
?pattern  # 向后搜索
n         # 下一个匹配
N         # 上一个匹配

# 标记位置
ma        # 标记当前位置为 a
'a        # 跳转到标记 a
:marks    # 查看所有标记
```

### 6. 自动补全
```vim
# 在插入模式下
Ctrl-n    # 下一个补全项
Ctrl-p    # 上一个补全项
Ctrl-x Ctrl-f  # 文件名补全
Ctrl-x Ctrl-l  # 整行补全
```

### 7. 代码折叠
```vim
# 创建折叠
zf        # 创建折叠
zd        # 删除折叠
zo        # 打开折叠
zc        # 关闭折叠
zR        # 打开所有折叠
zM        # 关闭所有折叠
```

### 8. 缩进调整
```vim
# 增加缩进
>>        # 当前行增加缩进
>G        # 从当前行到文件末尾增加缩进

# 减少缩进
<<        # 当前行减少缩进
<G        # 从当前行到文件末尾减少缩进

# 自动缩进
=G        # 从当前行到文件末尾自动缩进
gg=G      # 整个文件自动缩进
```

### 9. 文本对象操作
```vim
# 操作单词
ciw       # 修改当前单词
caw       # 修改当前单词（包括空格）
diw       # 删除当前单词
daw       # 删除当前单词（包括空格）

# 操作引号内容
ci"       # 修改双引号内的内容
ci'       # 修改单引号内的内容
ci`       # 修改反引号内的内容

# 操作括号内容
ci(       # 修改圆括号内的内容
ci[       # 修改方括号内的内容
ci{       # 修改花括号内的内容
```

### 10. 快速编辑
```vim
# 重复操作
.         # 重复上一次修改
@:        # 重复上一次 Ex 命令

# 大小写转换
~         # 切换当前字符大小写
g~~       # 切换当前行大小写
gUw       # 将单词转换为大写
guw       # 将单词转换为小写
```

## 配置建议

### 1. 添加快捷键
```vim
" 快速保存
nnoremap <leader>w :w<CR>

" 快速退出
nnoremap <leader>q :q<CR>

" 清除搜索高亮
nnoremap <leader>h :nohlsearch<CR>

" 切换行号显示
nnoremap <leader>n :set number!<CR>
```

### 2. 性能优化
```vim
" 禁用交换文件
set noswapfile

" 禁用备份文件
set nobackup
set nowritebackup

" 减少更新延迟
set updatetime=300
```

### 3. 外观优化
```vim
" 启用真彩色
set termguicolors

" 设置配色方案
colorscheme desert

" 高亮当前行
set cursorline

" 显示相对行号
set relativenumber
```

## 学习资源

### 1. 内置帮助
```vim
:help      # 查看帮助
:help usr  # 用户手册
:help quickref  # 快速参考
```

### 2. 在线资源
- [Vim 官方文档](https://www.vim.org/docs.php)
- [Vim 中文帮助](https://vimcdoc.sourceforge.net/)
- [Vim 实用技巧](https://vimawesome.com/)

### 3. 练习工具
- [Vim Adventures](https://vim-adventures.com/)：游戏化学习
- [Open Vim](https://www.openvim.com/)：交互式教程
- [Vim Genius](http://www.vimgenius.com/)：记忆卡片

掌握这些 Vim 技巧可以显著提高编辑效率。建议每天学习一两个新技巧，逐步积累经验。