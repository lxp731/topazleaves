# zsh & oh-my-zsh

### Git repo

[https://github.com/ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)

### Installation 

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

The default location is `~/.oh-my-zsh` (hidden in your home directory, you can access it with `cd ~/.oh-my-zsh`)

### Manual Installation

If you want to change the location, you can do so by setting the `ZSH` environment variable before installing:

Firstly, install the install script:

```bash
wget https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh
```

Secondly, setting the install path run the install script, if you want to install oh-my-zsh to `$HOME/awesome-shell/oh-my-zsh`:

```bash
ZSH="$HOME/awesome-shell/oh-my-zsh" sh install.sh
```

