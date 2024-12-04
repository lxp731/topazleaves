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
    # Deactivate Conda base environment if it's active
    if [[ "$CONDA_DEFAULT_ENV" == "base" ]]; then
      conda deactivate
    fi

    # Activate Poetry virtual environment
    source .venv/bin/activate
    export POETRY_ACTIVE=1 # Mark that we're in a Poetry environment

  else
    # Check if we're leaving a Poetry-managed project
    if [ "$POETRY_ACTIVE" = "1" ]; then
      deactivate          # Deactivate the Poetry virtual environment
      unset POETRY_ACTIVE # Clear the active marker

      # Reactivate Conda base environment
      conda activate base
    fi
  fi
}
