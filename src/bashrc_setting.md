# .bashrc Configuration

```bash
# 设置shell命令查找
set -o vi

# 设置Ctrl+L清屏
bind -x '"\C-l":clear'

# helm complete
source <(helm completion bash)
source <(kubectl completion bash)

# alias kubectl & setting completion
alias k=kubectl
complete -o default -F __start_kubectl k

# highlight version cat
alias dog='highlight -O ansi'

# more high-level cat
alias cat='batcat'

# fzf change git branch
alias gcb="git branch | fzf --preview 'git show --color=always {-1}' \
                 --bind 'enter:become(git checkout {-1})' \
                 --height 60% --layout reverse"
```
