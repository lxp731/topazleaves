# Tmux

### Installation

[https://github.com/tmux/tmux](https://github.com/tmux/tmux)

```bash
sudo apt install -y tmux
```

### Install Tmux Plugins Manager

[https://github.com/tmux-plugins/tpm](https://github.com/tmux-plugins/tpm)

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

### Create .tmux.conf File

This is my personal tmux config file.

```bash
{{#include ./mdbook-files/.tmux.conf}}
```

### Install Nerd Font

[Nerd Github Repo](https://github.com/ryanoasis/nerd-fonts)

1. Clone Repo to install

Get script of install Nerd fonts. After many attempts, Font `Meslo` performed best.

```bash
git clone --depth 1 https://github.com/ryanoasis/nerd-fonts.git && \
cd nerd-fonts/ && \
./install.sh Meslo
```

2. Use script to install **(Recommend)**

```bash
wget https://raw.githubusercontent.com/mcarvalho1/Simple-NerdFonts-Downloader/c7854dae2153aa199277926bed4b992488b65a3d/nf_downloader.sh
```

> nf_downloader.sh default will install all fonts, remember to modify it. The fonts will save in `~/.local/share/fonts`.
