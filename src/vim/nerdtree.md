# NERD-Tree

> Ref: [https://vimawesome.com/plugin/nerdtree-red](https://vimawesome.com/plugin/nerdtree-red)

## Install NERDTree

Add `Plug 'preservim/nerdtree'` to your `.vimrc`, For example:

```bash
Plug 'preservim/nerdtree'
```

Reopen a Vim window and type `:PlugInstall` to install NERDTree.

## Setting Shortcut Keys

Edit `.vimrc` and add the following code:

```bash
nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <C-n> :NERDTree<CR>
nnoremap <C-t> :NERDTreeToggle<CR>
nnoremap <C-f> :NERDTreeFind<CR>
```

- `<leader>n`: Default `<leader>` is `\`. Change the foucus from file to NERDTree.
- `<C-n>`: Open NERDTree.
- `<C-t>`: Open or Close NERDTree.
- `<C-f>`: Open `/` in NERDTree.

## Auto-Open NERDTree when Vim starts with a directory argument

Add the following code to your `.vimrc`:

```bash
" Start NERDTree when Vim starts with a directory argument.
autocmd StdinReadPre * let s:std_in=1
autocmd VimEnter * if argc() == 1 && isdirectory(argv()[0]) && !exists('s:std_in') |
    \ execute 'NERDTree' argv()[0] | wincmd p | enew | execute 'cd '.argv()[0] | endif

"Close the tab if NERDTree is the only window remaining in it.
autocmd BufEnter * if winnr('$') == 1 && exists('b:NERDTree') && b:NERDTree.isTabTree() | quit | endif
```

More details at [VimAwesome](https://vimawesome.com/plugin/nerdtree-red) or [NERDTree](https://github.com/preservim/nerdtree).

## Rendering

![Rendering](https://github.com/preservim/nerdtree/raw/master/screenshot.png)
