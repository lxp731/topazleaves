#!/bin/bash
# **********************************************************
# * Author        : Burgess Leo
# * Email         : liuxp731@qq.com
# * Create time   : 2024-11-27 20:46
# * Filename      : sync.sh
# * Description   : 
# **********************************************************

# 检查参数数量
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 {repo|local}"
    exit 1
fi

# 根据参数执行不同的操作
case "$1" in
    local)
        cp "$HOME/.vimrc" ./vimrc
        cp "$HOME/.tmux.conf" ./tmux.conf
        echo "Copied .vimrc and .tmux.conf to the current directory."
        ;;
    repo)
        cp ./vimrc "$HOME/.vimrc"
        cp ./tmux.conf "$HOME/.tmux.conf"
        echo "Copied all files from the current directory to the home directory."
        ;;
    *)
        echo "Invalid argument: $1. Use 'repo' or 'local'."
        exit 1
        ;;
esac
