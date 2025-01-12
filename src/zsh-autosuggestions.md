# zsh-autosuggestions

[https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md](https://github.com/zsh-users/zsh-autosuggestions/blob/master/INSTALL.md)

###  Installation

1. Clone this repository into `$ZSH_CUSTOM/plugins` (by default `~/.oh-my-zsh/custom/plugins`)

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

2. Add the plugin to the list of plugins for Oh My Zsh to load (inside `~/.zshrc`):

```bash
plugins=( 
    # other plugins...
    zsh-autosuggestions
)
```