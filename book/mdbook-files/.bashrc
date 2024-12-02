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

# poetry activate VENV
function cd() {
  builtin cd "$@" || return
  if [ -f "pyproject.toml" ]; then
    # 激活虚拟环境
    source $(poetry env info --path)/bin/activate
    export POETRY_ACTIVE=1 # 标记当前处于 Poetry 环境中
  else
    # 检查是否需要取消激活虚拟环境
    if [ "$POETRY_ACTIVE" = "1" ]; then
      deactivate          # 取消激活虚拟环境
      unset POETRY_ACTIVE # 清除标记
    fi
  fi
}