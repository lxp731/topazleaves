# Arch linux Init

## Modify pacman mirror

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

## Install firefox

```bash
sudo pacman -S firefox
```

## Install font

```bash
sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji noto-fonts-extra ttf-dejavu ttf-liberation
```

## Modify locale

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

## Install google-pinyin input method 

```bash
sudo pacman -S archlinuxcn-keyring
sudo pacman -S fcitx5-im 
sudo pacman -S fcitx5-chinese-addons
sudo pacman -S fcitx5-qt fctitx5-gtk fcitx5-lua
```

## Modify input environment

```bash
mkdir -p /home/knight/.config/environment.d && \
vim fcitx.conf
```

```bash
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
```

## Fix Japan-font problem

> Ref：[Arch 简体中文本地化](https://wiki.archlinuxcn.org/wiki/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%E6%9C%AC%E5%9C%B0%E5%8C%96)

Create a new file named 64-language-selector-prefer.conf.

```bash
cd /etc/fonts/conf.d/ && \
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

## Auth fprint login

> Ref：[Arch 添加指纹登陆](https://wiki.archlinuxcn.org/wiki/Fprint)

```bash
sudo pacman -S fprintd
```

Edit `system-local-login` file in `/etc/pam.d/`.

```bash
sudo vim /etc/pam.d/system-local-login
```

Add following lines at the top of the file:

```bash
auth		  sufficient  	pam_unix.so try_first_pass likeauth nullok
auth      sufficient    pam_fprintd.so
```

Edit `kde` file in `/etc/pam.d/`.

```bash
sudo vim /etc/pam.d/kde
```

Add following lines at the top of the file:

```bash
auth		  sufficient  	pam_unix.so try_first_pass likeauth nullok
auth      sufficient    pam_fprintd.so
```