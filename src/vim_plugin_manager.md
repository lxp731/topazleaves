# Vim Plugin Manager

### Official Website

[https://github.com/junegunn/vim-plug?tab=readme-ov-file](https://github.com/junegunn/vim-plug?tab=readme-ov-file)

### Install vim-plug

```bash
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

### Modify .vimrc

Add the following content:

```bash
call plug#begin('~/.vim/plugged')

" List your plugins here
Plug 'tpope/vim-sensible'

call plug#end()
```

You can add any plugins in the middle of call plug. 

Reload the file or restart Vim, then you can:

- `:PlugInstall` to install the plugins
- `:PlugUpdate` to install or update the plugins
- `:PlugDiff` to review the changes from the last update
- `:PlugClean` to remove plugins no longer in the list
