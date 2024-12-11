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

# auto_activate uv virtual_ENV
PROJECT_PATH=""
CURRENT_PATH=""

auto_activate() {
    CURRENT_PATH=$(pwd)

    if [[ -z "$PROJECT_PATH" ]]; then
        if [ -d ".venv" ]; then
            source .venv/bin/activate
            PROJECT_PATH="$CURRENT_PATH"
        fi
    else
        if [[ "$CURRENT_PATH" == "$PROJECT_PATH"* ]]; then
            return
        else
            if [[ -n "$VIRTUAL_ENV" ]]; then
                deactivate
            fi
            PROJECT_PATH=""
            CURRENT_PATH=""
        fi
    fi
}

PROMPT_COMMAND=auto_activate

