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
  --header 'Press CTRL-Y to copy command into clipboard'
  --height 80% --layout reverse"

# Preview file content using bat (https://github.com/sharkdp/bat)
export FZF_CTRL_T_OPTS="
  --walker-skip .git,node_modules,target
  --preview 'batcat -n --color=always {}'
  --bind 'ctrl-/:change-preview-window(down|hidden|)'
  --height 80% --layout reverse"

# Print tree structure in the preview window
export FZF_ALT_C_OPTS="
  --walker-skip .git,node_modules,target
  --preview 'tree -C {}'
  --height 80% --layout reverse"

# ripgrep->fzf->vim [QUERY]
# sudo apt install -y ripgrep
rfv() (
  RELOAD='reload:rg --column --color=always --smart-case {q} || :'
  OPENER='if [[ $FZF_SELECT_COUNT -eq 0 ]]; then
            vim {1} +{2}     # No selection. Open the current line in Vim.
          else
            vim +cw -q {+f}  # Build quickfix list for the selected items.
          fi'
  fzf --disabled --ansi --multi \
      --bind "start:$RELOAD" --bind "change:$RELOAD" \
      --bind "enter:become:$OPENER" \
      --bind "ctrl-o:execute:$OPENER" \
      --bind 'alt-a:select-all,alt-d:deselect-all,ctrl-/:toggle-preview' \
      --delimiter : \
      --preview 'batcat --style=full --color=always --highlight-line {2} {1}' \
      --preview-window '~4,+{2}+4/3,<80(up)' \
      --query "$*"
)
```

> In fzf model, you can press <kbd>Esc</kbd> to quit fzf model.
