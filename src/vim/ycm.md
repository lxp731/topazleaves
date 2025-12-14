# YouCompleteMe

## Github Repo

[https://github.com/ycm-core/YouCompleteMe](https://github.com/ycm-core/YouCompleteMe)

[https://vimawesome.com/plugin/youcompleteme](https://vimawesome.com/plugin/youcompleteme)

## Installation

```bash
Plug 'Valloric/YouCompleteMe'
```

After `:PlugInstall`, if you use `vim-plug`

```bash
cd ~/.vim/plugged/YouCompleteMe
python3 install.py
```

If failed, according to tips, install `cmake` or `cmake3`.

## Slove `GLIBCXX_3.4.32` not found

```bash
sudo apt update
sudo apt install libstdc++6
```

```bash
strings /usr/lib/x86_64-linux-gnu/libstdc++.so.6 | grep GLIBCXX
```

Generally, you can find GLIBCXX_3.4.32 in your system. Next, just copy `libstdc++.so.6*` to default path that in error log.

```bash
sudo cp /usr/lib/x86_64-linux-gnu/libstdc++.so.6* /home/knight/miniconda3/lib/
```

## Rendering

![https://camo.githubusercontent.com/ff645d6ac63801b82adf04c354be7edfce79c60f38889f441b351dd8fe27372b/68747470733a2f2f692e696d6775722e636f6d2f304f50346f6f642e676966](https://camo.githubusercontent.com/ff645d6ac63801b82adf04c354be7edfce79c60f38889f441b351dd8fe27372b/68747470733a2f2f692e696d6775722e636f6d2f304f50346f6f642e676966)