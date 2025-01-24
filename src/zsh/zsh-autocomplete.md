# zsh-autocomplete

[https://github.com/marlonrichert/zsh-autocomplete](https://github.com/marlonrichert/zsh-autocomplete)

###  Installation

1. Clone this repository into `$ZSH_CUSTOM/plugins` (by default `~/.oh-my-zsh/custom/plugins`)

```bash
git clone --depth 1 -- https://github.com/marlonrichert/zsh-autocomplete.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

2. Add the plugin to the list of plugins for Oh My Zsh to load (inside `~/.zshrc`):

```bash
plugins=( 
    # other plugins...
    zsh-autocomplete
)
```