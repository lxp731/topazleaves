# Zsh-ollama-completion

[https://github.com/Katrovsky/zsh-ollama-completion](https://github.com/Katrovsky/zsh-ollama-completion)

### Installation

1.  Clone this repository into `$ZSH_CUSTOM/plugins` (by default `~/.oh-my-zsh/custom/plugins`)

```bash
git clone https://github.com/Katrovsky/zsh-ollama-completion.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/ollama
```

2. Add the plugin to the list of plugins for Oh My Zsh to load (inside `~/.zshrc`):

```bash
plugins=(
    # ...
    ollama
)
```