# Arch Linux 初始化配置指南

## 修改 Pacman 镜像源

### 1. 编辑镜像列表
```bash
sudo vim /etc/pacman.d/mirrorlist
```

添加以下中国镜像源：
```bash
## 中国镜像源
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

### 2. 添加 Arch Linux CN 仓库
```bash
sudo vim /etc/pacman.conf
```

在文件末尾添加：
```bash
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
Server = https://mirrors.aliyun.com/archlinuxcn/$arch
```

### 3. 更新软件包数据库
```bash
sudo pacman -Syy
```

### 4. 安装基础工具
```bash
sudo pacman -S yay base-devel tree neofetch git
```

## 安装常用软件

### 安装 Firefox 浏览器
```bash
sudo pacman -S firefox
```

### 安装字体
```bash
sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-emoji noto-fonts-extra ttf-dejavu ttf-liberation
```

## 配置本地化设置

### 1. 生成中文 locale
```bash
sudo vim /etc/locale.gen
```

取消注释以下行：
```bash
zh_CN.UTF-8 UTF-8
```

### 2. 生成 locale 并设置语言
```bash
sudo locale-gen
sudo echo "LANG=zh_CN.UTF-8" > /etc/locale.conf
```

## 安装中文输入法

### 1. 安装必要组件
```bash
sudo pacman -S archlinuxcn-keyring
sudo pacman -S fcitx5-im 
sudo pacman -S fcitx5-chinese-addons
sudo pacman -S fcitx5-qt fcitx5-gtk fcitx5-lua
```

### 2. 配置输入法环境变量
```bash
mkdir -p ~/.config/environment.d
vim ~/.config/environment.d/fcitx.conf
```

添加以下内容：
```bash
GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
```

## 修复日文字体显示问题

> 参考：[Arch 简体中文本地化](https://wiki.archlinuxcn.org/wiki/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87%E6%9C%AC%E5%9C%B0%E5%8C%96)

创建字体配置文件：
```bash
cd /etc/fonts/conf.d/
sudo vim 64-language-selector-prefer.conf
```

添加以下配置：
```xml
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

## 配置指纹登录

> 参考：[Arch 添加指纹登录](https://wiki.archlinuxcn.org/wiki/Fprint)

### 1. 安装指纹识别服务
```bash
sudo pacman -S fprintd
```

### 2. 配置 PAM 认证
编辑系统登录配置文件：
```bash
sudo vim /etc/pam.d/system-local-login
```

在文件开头添加：
```bash
auth    sufficient    pam_unix.so try_first_pass likeauth nullok
auth    sufficient    pam_fprintd.so
```

编辑 KDE 配置文件：
```bash
sudo vim /etc/pam.d/kde
```

在文件开头添加：
```bash
auth    sufficient    pam_unix.so try_first_pass likeauth nullok
auth    sufficient    pam_fprintd.so
```

### 3. 针对 CachyOS 系统不能使用密码验证 sudo 的问题

```bash
sudo vim /etc/pam.d/sudo
```

将其改为：

```bash
#%PAM-1.0
auth       sufficient   pam_fprintd.so
auth       required     pam_unix.so try_first_pass nullok
account    include      system-auth
session    include      system-auth
```
在不方便使用指纹验证时，可以 CTRL+C 取消，使用密码验证 sudo。


## 完成配置

完成以上步骤后，重启系统使所有配置生效。现在你的 Arch Linux 系统已经配置了中文环境、快速的软件源和方便的输入法，可以开始愉快地使用了。