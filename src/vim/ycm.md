# YouCompleteMe：Vim 代码补全引擎

## GitHub 仓库

- [https://github.com/ycm-core/YouCompleteMe](https://github.com/ycm-core/YouCompleteMe)
- [https://vimawesome.com/plugin/youcompleteme](https://vimawesome.com/plugin/youcompleteme)

## 安装

### 1. 使用 vim-plug 安装
在 `.vimrc` 文件中添加：

```vim
Plug 'ycm-core/YouCompleteMe'
```

### 2. 安装依赖
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install build-essential cmake python3-dev

# CentOS/RHEL
sudo yum install gcc-c++ cmake python3-devel

# Arch Linux
sudo pacman -S base-devel cmake python
```

### 3. 编译安装
安装插件后：
```bash
cd ~/.vim/plugged/YouCompleteMe
python3 install.py --all  # 安装所有语言支持
```

### 4. 最小化安装
如果只需要特定语言支持：
```bash
# 只安装 C/C++ 支持
python3 install.py --clangd-completer

# 只安装 Python 支持
python3 install.py --python-completer

# 只安装 Go 支持
python3 install.py --go-completer
```

## 解决 `GLIBCXX_3.4.32` 未找到错误

### 1. 更新系统库
```bash
sudo apt update
sudo apt install libstdc++6
```

### 2. 检查 GLIBCXX 版本
```bash
strings /usr/lib/x86_64-linux-gnu/libstdc++.so.6 | grep GLIBCXX
```

### 3. 复制库文件
如果系统中存在 GLIBCXX_3.4.32，将其复制到错误日志中显示的默认路径：
```bash
sudo cp /usr/lib/x86_64-linux-gnu/libstdc++.so.6* /home/knight/miniconda3/lib/
```

## 基本配置

### 1. 启用 YouCompleteMe
```vim
" 在 .vimrc 中添加
let g:ycm_global_ycm_extra_conf = '~/.vim/.ycm_extra_conf.py'
let g:ycm_confirm_extra_conf = 0
let g:ycm_collect_identifiers_from_tags_files = 1
let g:ycm_seed_identifiers_with_syntax = 1
```

### 2. 快捷键配置
```vim
" 跳转到定义
nnoremap <leader>gd :YcmCompleter GoToDefinition<CR>
nnoremap <leader>gi :YcmCompleter GoToImplementation<CR>
nnoremap <leader>gr :YcmCompleter GoToReferences<CR>

" 显示文档
nnoremap <leader>doc :YcmCompleter GetDoc<CR>

" 修复错误
nnoremap <leader>fix :YcmCompleter FixIt<CR>
```

### 3. 补全触发
```vim
" 自动触发补全
let g:ycm_auto_trigger = 1
let g:ycm_min_num_of_chars_for_completion = 2
let g:ycm_min_num_identifier_candidate_chars = 0
```

## 语言特定配置

### 1. C/C++ 配置
创建 `~/.vim/.ycm_extra_conf.py`：
```python
def Settings(**kwargs):
    return {
        'flags': [
            '-Wall',
            '-Wextra',
            '-Werror',
            '-std=c++17',
            '-I', '/usr/include',
            '-I', '/usr/local/include',
        ],
    }
```

### 2. Python 配置
```vim
" Python 补全配置
let g:ycm_python_binary_path = 'python3'
let g:ycm_python_interpreter_path = 'python3'
```

### 3. JavaScript/TypeScript 配置
```vim
" 使用 TSServer
let g:ycm_use_clangd = 0
let g:ycm_language_server = [
  \   {
  \     'name': 'tsserver',
  \     'cmdline': [ 'typescript-language-server', '--stdio' ],
  \     'filetypes': [ 'javascript', 'typescript', 'javascriptreact', 'typescriptreact' ],
  \   },
  \ ]
```

## 高级功能

### 1. 语义补全
```vim
" 启用语义补全
let g:ycm_seed_identifiers_with_syntax = 1
let g:ycm_collect_identifiers_from_comments_and_strings = 1
let g:ycm_complete_in_comments = 1
let g:ycm_complete_in_strings = 1
```

### 2. 诊断信息
```vim
" 显示诊断信息
let g:ycm_show_diagnostics_ui = 1
let g:ycm_enable_diagnostic_signs = 1
let g:ycm_enable_diagnostic_highlighting = 1
let g:ycm_echo_current_diagnostic = 1
```

### 3. 补全菜单
```vim
" 补全菜单配置
let g:ycm_add_preview_to_completeopt = 1
let g:ycm_autoclose_preview_window_after_completion = 1
let g:ycm_autoclose_preview_window_after_insertion = 1
```

## 性能优化

### 1. 缓存设置
```vim
" 启用缓存
let g:ycm_cache_omnifunc = 1
let g:ycm_disable_for_files_larger_than_kb = 1000
```

### 2. 延迟加载
```vim
" 延迟加载 YouCompleteMe
let g:ycm_filetype_whitelist = {
    \ "c":1,
    \ "cpp":1,
    \ "python":1,
    \ "java":1,
    \ "javascript":1,
    \ "typescript":1,
    \ }
```

### 3. 服务器配置
```vim
" 调整服务器参数
let g:ycm_server_keep_logfiles = 1
let g:ycm_server_log_level = 'info'
let g:ycm_server_use_vim_stdout = 0
```

## 故障排除

### 问题 1：补全不工作
```vim
" 检查 YouCompleteMe 状态
:YcmDebugInfo

" 检查日志
:YcmToggleLogs

" 重新启动服务器
:YcmRestartServer
```

### 问题 2：性能问题
```bash
# 检查内存使用
ps aux | grep ycm

# 清理缓存
rm -rf ~/.ycm_*
```

### 问题 3：特定语言不支持
```bash
# 重新编译支持特定语言
cd ~/.vim/plugged/YouCompleteMe
python3 install.py --ts-completer  # TypeScript
python3 install.py --rust-completer  # Rust
python3 install.py --java-completer  # Java
```

## 与其他插件集成

### 1. 与 ultisnips 集成
```vim
" 代码片段补全
Plug 'SirVer/ultisnips'
Plug 'honza/vim-snippets'

let g:ycm_use_ultisnips_completer = 1
let g:UltiSnipsExpandTrigger = '<tab>'
let g:UltiSnipsJumpForwardTrigger = '<tab>'
let g:UltiSnipsJumpBackwardTrigger = '<s-tab>'
```

### 2. 与 airline 集成
```vim
" 在状态栏显示 YouCompleteMe 状态
let g:airline#extensions#ycm#enabled = 1
```

### 3. 与 ale 集成
```vim
" 语法检查
Plug 'dense-analysis/ale'

let g:ale_completion_enabled = 1
let g:ale_sign_column_always = 1
```

## 替代方案

### 1. coc.nvim
```vim
" 基于 Language Server Protocol 的补全
Plug 'neoclide/coc.nvim', {'branch': 'release'}
```

### 2. deoplete.nvim
```vim
" 异步补全框架（Neovim）
Plug 'Shougo/deoplete.nvim'
if has('nvim')
  let g:deoplete#enable_at_startup = 1
endif
```

### 3. LanguageClient-neovim
```vim
" Language Server Protocol 客户端
Plug 'autozimu/LanguageClient-neovim', {
    \ 'branch': 'next',
    \ 'do': 'bash install.sh',
    \ }
```

## 最佳实践

### 1. 配置文件管理
```bash
# 创建配置目录
mkdir -p ~/.vim/ycm

# 备份配置
cp ~/.vim/.ycm_extra_conf.py ~/.vim/ycm/backup/
```

### 2. 定期更新
```bash
# 更新 YouCompleteMe
cd ~/.vim/plugged/YouCompleteMe
git pull
python3 install.py --all
```

### 3. 项目特定配置
```python
# 在项目根目录创建 .ycm_extra_conf.py
import os
import ycm_core

def DirectoryOfThisScript():
    return os.path.dirname(os.path.abspath(__file__))

def Settings(**kwargs):
    return {
        'flags': [
            '-I', os.path.join(DirectoryOfThisScript(), 'include'),
            '-I', os.path.join(DirectoryOfThisScript(), 'src'),
        ],
    }
```

## 截图

![YouCompleteMe 效果演示](https://camo.githubusercontent.com/ff645d6ac63801b82adf04c354be7edfce79c60f38889f441b351dd8fe27372b/68747470733a2f2f692e696d6775722e636f6d2f304f50346f6f642e676966)

YouCompleteMe 是一个功能强大的代码补全引擎，支持多种编程语言。虽然安装和配置相对复杂，但一旦配置完成，可以显著提高编码效率。