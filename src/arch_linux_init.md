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

4. modify

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

5. google-pinyin

```bash
sudo pacman -S fcitx5-im 
sudo pacman -S fcitx5-chinese-addons
sudo pacman -S fcitx5-qt fctitx5-gtk fcitx5-lua
```

6. modify

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