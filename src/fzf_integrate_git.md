# FZF Integrate Git

### Github Repo

[https://github.com/junegunn/fzf-git.sh](https://github.com/junegunn/fzf-git.sh)

### Install 

```bash
mkdir -p ~/.fzf/shell && \
wget -O ~/.fzf/shell/fzf-git.sh \ 
    https://raw.githubusercontent.com/junegunn/fzf-git.sh/refs/heads/main/fzf-git.sh && \
chmod +x ~/.fzf/shell/fzf-git.sh
```

### Modify .bashrc

```bash
cat >> ~/.bashrc << EOF
source ~/.fzf/shell/fzf-git.sh
EOF
```

```bash
source ~/.bashrc
```
