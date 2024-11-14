# FZF Integrate Git

### Github Repo

[https://github.com/junegunn/fzf-git.sh](https://github.com/junegunn/fzf-git.sh)

### Install 

```bash
mkdir -p ~/.fzf/shell && \
cd ~/.fzf/shell && \
wget https://raw.githubusercontent.com/junegunn/fzf-git.sh/refs/heads/main/fzf-git.sh
```

### Modify .bashrc

```bash
cat >> ~/.bashrc << EOF
# fzf integrade git
source ~/.fzf/shell/fzf-git.sh
EOF
```

```bash
source ~/.bashrc
```
