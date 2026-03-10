# 禁用笔记本合盖休眠功能

本文介绍如何在 Linux 系统中禁用笔记本合盖时的自动休眠功能，适用于需要合盖继续运行的情况。

## 问题背景

默认情况下，大多数 Linux 发行版在合上笔记本盖子时会触发休眠或挂起操作。这在某些场景下可能不方便，例如：
- 外接显示器使用时
- 运行长时间任务时
- 作为服务器使用时

## 配置方法

### 1. 编辑配置文件
```bash
sudo vim /etc/systemd/logind.conf
```

### 2. 修改配置项
找到或添加以下配置：
```bash
HandleLidSwitch=ignore
```

### 3. 重启服务
```bash
sudo systemctl restart systemd-logind
```

## 其他相关配置

### 电源按钮行为
```bash
HandlePowerKey=poweroff    # 按下电源键：关机
HandleSuspendKey=suspend   # 按下休眠键：挂起
HandleHibernateKey=hibernate # 按下休眠键：休眠
```

### 合盖时的其他选项
```bash
HandleLidSwitch=ignore        # 忽略合盖动作
HandleLidSwitch=suspend       # 合盖时挂起（默认）
HandleLidSwitch=hibernate     # 合盖时休眠
HandleLidSwitch=lock          # 合盖时锁定屏幕
HandleLidSwitch=poweroff      # 合盖时关机
```

## 临时解决方案

如果只需要临时禁用合盖休眠，可以使用以下命令：

### 禁用合盖检测
```bash
systemctl mask sleep.target suspend.target hibernate.target hybrid-sleep.target
```

### 重新启用合盖检测
```bash
systemctl unmask sleep.target suspend.target hibernate.target hybrid-sleep.target
```

## 图形界面设置

### GNOME 桌面环境
1. 打开"设置" → "电源"
2. 找到"合上盖子时"选项
3. 选择"不执行任何操作"

### KDE Plasma 桌面
1. 打开"系统设置" → "电源管理"
2. 选择"节能"标签页
3. 配置"合上盖子时"的行为

### XFCE 桌面
1. 打开"设置管理器" → "电源管理器"
2. 在"系统"标签页中配置合盖行为

## 验证配置

### 检查当前设置
```bash
# 查看 logind 配置
cat /etc/systemd/logind.conf | grep HandleLidSwitch

# 查看服务状态
systemctl status systemd-logind
```

### 测试效果
1. 合上笔记本盖子
2. 等待几秒钟
3. 打开盖子，检查系统是否仍在运行

## 注意事项

### 1. 散热问题
禁用合盖休眠后，笔记本在合盖状态下可能散热不良，建议：
- 确保通风良好
- 监控温度：`sensors`
- 考虑使用散热垫

### 2. 外接显示器
如果使用外接显示器，合盖后可能需要调整显示设置：
```bash
# 禁用内置显示器
xrandr --output eDP-1 --off

# 启用外接显示器
xrandr --output HDMI-1 --auto
```

### 3. 电池寿命
合盖继续运行会消耗更多电量，建议：
- 连接电源适配器
- 调整电源管理设置
- 监控电池状态：`upower -i /org/freedesktop/UPower/devices/battery_BAT0`

## 恢复默认设置

如果需要恢复默认的合盖休眠行为：

### 1. 恢复配置文件
```bash
sudo vim /etc/systemd/logind.conf
```
将 `HandleLidSwitch` 改为：
```bash
HandleLidSwitch=suspend
```

### 2. 重启服务
```bash
sudo systemctl restart systemd-logind
```

## 高级配置

### 用户特定配置
可以为特定用户设置不同的行为：
```bash
# 创建用户配置目录
mkdir -p ~/.config/systemd/user

# 创建覆盖配置
vim ~/.config/systemd/user/logind.conf.d/override.conf
```

添加内容：
```bash
[Login]
HandleLidSwitch=ignore
```

### 条件性配置
可以根据电源状态设置不同行为：
```bash
# 使用电源时忽略合盖
HandleLidSwitchExternalPower=ignore

# 使用电池时挂起
HandleLidSwitch= suspend
```

## 故障排除

### 问题：修改后不生效
```bash
# 检查配置文件语法
systemd-analyze verify /etc/systemd/logind.conf

# 重新加载所有配置
sudo systemctl daemon-reload
sudo systemctl restart systemd-logind
```

### 问题：合盖后无法唤醒
如果遇到合盖后无法唤醒的问题，可以尝试：
1. 检查内核参数：`cat /proc/cmdline`
2. 更新显卡驱动
3. 检查 ACPI 事件：`acpi_listen`

通过合理配置合盖行为，可以让笔记本更好地适应不同的使用场景，提高工作效率。