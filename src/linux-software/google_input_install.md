# Google 拼音输入法安装指南

## 系统要求

Google 拼音输入法基于 Fcitx 输入法框架，因此需要先安装 Fcitx。

## 安装 Fcitx

### Ubuntu/Debian
```bash
sudo apt update
sudo apt install fcitx fcitx-config-gtk fcitx-ui-classic
```

### Arch Linux
```bash
sudo pacman -S fcitx fcitx-configtool fcitx-gtk2 fcitx-gtk3 fcitx-qt4 fcitx-qt5
```

### Fedora
```bash
sudo dnf install fcitx fcitx-configtool fcitx-gtk2 fcitx-gtk3 fcitx-qt4 fcitx-qt5
```

## 配置 Fcitx

### 1. 运行输入法配置工具
```bash
im-config
```

### 2. 选择 Fcitx
在图形界面中选择 Fcitx 作为默认输入法框架。

### 3. 配置环境变量
创建或编辑 `~/.xprofile` 文件：
```bash
vim ~/.xprofile
```

添加以下内容：
```bash
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
```

## 安装 Google 拼音输入法

### Ubuntu/Debian
```bash
sudo apt install fcitx-googlepinyin
```

### Arch Linux
```bash
sudo pacman -S fcitx-googlepinyin
```

### Fedora
```bash
sudo dnf install fcitx-googlepinyin
```

## 配置 Google 拼音

### 1. 启动 Fcitx 配置工具
```bash
fcitx-config-gtk3
```

### 2. 添加输入法
1. 点击左下角的 "+" 按钮
2. 取消勾选 "Only Show Current Language"
3. 在搜索框中输入 "google"
4. 选择 "Google Pinyin"
5. 点击 "OK"

### 3. 调整输入法顺序
在配置界面中，使用上下箭头调整输入法顺序，建议将 Google 拼音放在首位。

## 启动 Fcitx

### 1. 手动启动
```bash
fcitx
```

### 2. 自动启动
将 Fcitx 添加到自动启动程序：
```bash
# 创建桌面启动项
cp /usr/share/applications/fcitx.desktop ~/.config/autostart/
```

### 3. 重启生效
重启系统或重新登录使配置生效。

## 使用说明

### 1. 切换输入法
- **切换输入法**：`Ctrl + Space`
- **切换中英文**：`Shift`
- **切换全角/半角**：`Shift + Space`
- **切换中英文标点**：`Ctrl + .`

### 2. 输入法面板
Fcitx 会在系统托盘中显示图标，右键点击可以：
- 打开配置界面
- 切换输入法
- 重启 Fcitx
- 退出 Fcitx

### 3. 候选词选择
- **翻页**：`-` 和 `=` 键
- **选择候选词**：数字键 1-9

## 高级配置

### 1. 皮肤设置
```bash
# 安装额外皮肤
sudo apt install fcitx-skin-material

# 在配置工具中选择皮肤
fcitx-config-gtk3
```

### 2. 词库管理
Google 拼音支持用户词库：
- **添加词库**：在输入时选择候选词
- **导出词库**：`~/.config/fcitx/pinyin/user.py`
- **导入词库**：将词库文件复制到上述位置

### 3. 云输入
启用云输入可以获取更准确的联想词：
1. 打开 Fcitx 配置
2. 选择 Google 拼音
3. 勾选 "启用云拼音"

## 故障排除

### 问题 1：Fcitx 无法启动
```bash
# 检查进程
ps aux | grep fcitx

# 查看日志
fcitx-diagnose

# 强制重启
killall fcitx
fcitx &
```

### 问题 2：输入法不显示
```bash
# 检查环境变量
echo $GTK_IM_MODULE
echo $QT_IM_MODULE
echo $XMODIFIERS

# 重新设置环境变量
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
```

### 问题 3：特定应用无法输入中文
```bash
# 检查应用是否支持 Fcitx
# 对于某些应用可能需要特殊配置

# 尝试使用 fcitx5（新版）
sudo apt install fcitx5 fcitx5-chinese-addons
```

### 问题 4：候选词框位置异常
```bash
# 调整候选词框位置
# 在 Fcitx 配置中调整 "候选词框位置"
```

## 替代方案

### 1. Fcitx5 + Rime
```bash
# 安装
sudo apt install fcitx5 fcitx5-rime

# 配置
# Rime 提供更强大的输入法引擎
```

### 2. IBus + Pinyin
```bash
# 安装
sudo apt install ibus ibus-pinyin

# 配置
ibus-setup
```

### 3. Sogou 输入法
```bash
# 下载安装包
wget "https://cdn01.sogoucdn.com/dl/linux/sogoupinyin_版本号_amd64.deb"

# 安装
sudo dpkg -i sogoupinyin_*.deb
sudo apt install -f
```

## 最佳实践

### 1. 定期备份词库
```bash
# 备份用户词库
cp ~/.config/fcitx/pinyin/user.py ~/backup/fcitx-user-dict-$(date +%Y%m%d).py
```

### 2. 清理缓存
```bash
# 清理 Fcitx 缓存
rm -rf ~/.config/fcitx/cache
```

### 3. 更新输入法
```bash
# 定期更新系统包
sudo apt update && sudo apt upgrade

# 检查 Fcitx 更新
apt list --upgradable | grep fcitx
```

Google 拼音输入法在 Linux 上提供了良好的中文输入体验，结合 Fcitx 框架的灵活性，可以满足大多数用户的需求。如果遇到问题，可以尝试 Fcitx5 或其他输入法方案。
