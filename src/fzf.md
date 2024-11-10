# FZF

### Official Website

- [Github repo](https://github.com/junegunn/fzf)

- [HandBook](https://junegunn.github.io/fzf/search-syntax/)

### Install 

```bash
# Clone the fzf repository
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf

# Run the install script
~/.fzf/install
```

### Setting .bashrc

A basic example, to show how to link progress with fzf.

```bash
# add a alias to change git branch
alias gcb="git branch | fzf --preview 'git show --color=always {-1}' \
                 --bind 'enter:become(git checkout {-1})' \
                 --height 60% --layout reverse"
```

Then, setting ENV vars of fzf, unlock advanced function.

```bash
# fzf init
eval "$(~/.fzf/bin/fzf --bash)"
[ -f ~/.fzf.bash ] && source ~/.fzf.bash
```

Default fzf self build-in <kbd>Ctrl</kbd>+<kbd>R</kbd> to display history cmd, <kbd>Ctrl</kbd>+<kbd>T</kbd> to show files and dirs of local path, <kbd>Alt</kbd>+<kbd>C</kbd> to exec `cd` cmd. Well, you can rewrite these function.

```bash
# CTRL-Y to copy the command into clipboard using pbcopy
export FZF_CTRL_R_OPTS="
  --bind 'ctrl-y:execute-silent(echo -n {2..} | pbcopy)+abort'
  --color header:italic
  --header 'Press CTRL-Y to copy command into clipboard'"

# Preview file content using bat (https://github.com/sharkdp/bat)
export FZF_CTRL_T_OPTS="
  --walker-skip .git,node_modules,target
  --preview 'batcat -n --color=always {}'
  --bind 'ctrl-/:change-preview-window(down|hidden|)'"

# Print tree structure in the preview window
export FZF_ALT_C_OPTS="
  --walker-skip .git,node_modules,target
  --preview 'tree -C {}'"
```

> In fzf model, you can press <kbd>Esc</kbd> to quit fzf model.
