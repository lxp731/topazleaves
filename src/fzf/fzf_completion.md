# FZF Replace Bash Completion

## Github Repo

[https://github.com/lincheney/fzf-tab-completion](https://github.com/lincheney/fzf-tab-completion)

## Install Script 

```bash
mkdir -p ~/.fzf/shell && \
wget -O ~/.fzf/shell/fzf-bash-completion.sh \
    https://raw.githubusercontent.com/lincheney/fzf-tab-completion/refs/heads/master/bash/fzf-bash-completion.sh
```

## Modify .bashrc

```bash
cat >> ~/.bashrc << EOF
# use fzf replace system completion
source ~/.fzf/shell/fzf-bash-completion.sh
bind -x '"\t": fzf_bash_completion'
EOF
```

```bash
source ~/.bashrc
```
