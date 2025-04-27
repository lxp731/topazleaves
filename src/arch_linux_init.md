# Arch linux Init

1. Modify pacman mirror

```bash
sudo vim /etc/pacman.d/mirrorlist
```

```bash
## China
Server = https://mirrors.aliyun.com/archlinux/$repo/os/$arch
Server = http://mirrors.aliyun.com/archlinux/$repo/os/$arch
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
Server = http://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
Server = http://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
Server = https://mirrors.neusoft.edu.cn/archlinux/$repo/os/$arch
Server = http://mirrors.neusoft.edu.cn/archlinux/$repo/os/$arch
Server = http://mirrors.163.com/archlinux/$repo/os/$arch
Server = http://mirrors.bfsu.edu.cn/archlinux/$repo/os/$arch
Server = https://mirrors.bfsu.edu.cn/archlinux/$repo/os/$arch
```

```bash
sudo vim /etc/pacman.conf
```

```bash
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
Server = https://mirrors.aliyun.com/archlinuxcn/$arch
```

```bash
sudo pacman -Syy
```

```bash
sudo pacman -S yay base-devel tree neofetch git
```

2. Install firefox

```bash
sudo pacman -S firefox
```

3. Install font

```bash
sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji noto-fonts-extra ttf-dejavu ttf-liberation
```

4. Modify locale

```bash
sudo vim /etc/locale.gen
```

```bash
zh_CN.UTF-8 UTF-8
```

```bash
su
locale-gen && echo LANG=zh_CN.UTF-8 > /etc/locale.conf
exit
```

5. Install google-pinyin input method 

```bash
sudo pacman -S archlinuxcn-keyring
sudo pacman -S fcitx5-im 
sudo pacman -S fcitx5-chinese-addons
sudo pacman -S fcitx5-qt fctitx5-gtk fcitx5-lua
```

6. Modify environment

```bash
sudo vim /etc/environment
```

```bash
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
GLFM_IM_MODULE=ibus
```

7. Fix japan-font problem

Create a new file named 64-language-selector-prefer.conf.

```bash
cd /etc/fonts/conf.d/
sudo vim 64-language-selector-prefer.conf
```

Add the following code:

```bash
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <alias>
    <family>sans-serif</family>
    <prefer>
      <family>Noto Sans CJK SC</family>
      <family>Noto Sans CJK TC</family>
      <family>Noto Sans CJK JP</family>
    </prefer>
  </alias>
  <alias>
    <family>monospace</family>
    <prefer>
      <family>Noto Sans Mono CJK SC</family>
      <family>Noto Sans Mono CJK TC</family>
      <family>Noto Sans Mono CJK JP</family>
    </prefer>
  </alias>
</fontconfig>
```

> Ref: [Arch 简体中文本地化](https://wiki.archlinuxcn.org/wiki/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%E6%9C%AC%E5%9C%B0%E5%8C%96)

8. libreoffice-still

```bash
yay -S libreoffice-still
```