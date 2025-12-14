# Vim Support System Clipboard

## Check Vim version

```bash
vim --version | grep clipboard
```

Output:

```bash
knight@Lenovo:~$ vim --version | grep "clipboard"
-clipboard         +keymap            +printer           +vertsplit
+ex_extra          +mouse_netterm     +syntax            -xterm_clipboard
```

`-clipboard` `-xterm_clipboard` means that vim not support system clipboard.

## Remove vim

Uninstall vim if you have installed.

```bash
sudo apt remove vim && sudo apt autoremove
```

## Install vim-gtk3

```bash
sudo apt install vim-gtk3
```

## Check Vim version again

```bash
vim --version | grep clipboard
```

Output:

```bash
knight@Lenovo:~$ vim --version | grep clipboard
+clipboard         +keymap            +printer           +vertsplit
+ex_extra          +mouse_netterm     +syntax            +xterm_clipboard
```

Confirem the key value is `+clipboard` or `+xterm_clipboard`.

## Edit .vimrc

```bash
set clipboard=unnamedplus
```

The last you can use `"*y` to copy the text to system clipboard.

---

## Use Xclip

```bash
sudo apt install xclip
```

## Modify .vimrc

```bash
vnoremap Y :w !xclip -i -sel c<CR>
```

Then you can select some contents in visual mode, and press `Y`. Finally, you can use `<Ctrl-v>` to paste it anywhere.
