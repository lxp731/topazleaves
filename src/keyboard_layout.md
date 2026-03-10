# 键盘布局切换指南：Colemak vs QWERTY

本文介绍如何在 Linux 系统中快速切换键盘布局，特别是 Colemak 和 QWERTY 布局之间的切换。

## Colemak 键盘布局

### 切换到 Colemak 布局
```bash
setxkbmap us -variant colemak
```

### Colemak 布局特点
Colemak 是一种优化的键盘布局，相比传统的 QWERTY 布局，它：
- 减少手指移动距离
- 提高打字效率
- 降低重复性劳损风险

![Colemak 指法图](https://colemak.com/wiki/images/e/ef/Colemak_fingers.png)

## QWERTY 键盘布局

### 切换回 QWERTY 布局
```bash
setxkbmap us; xset -r 66
```

### 命令说明
- `setxkbmap us`：设置为美式 QWERTY 布局
- `xset -r 66`：重置 Caps Lock 键状态

## 永久设置键盘布局

### 方法一：修改 X11 配置
创建或编辑 `~/.xprofile` 文件：
```bash
vim ~/.xprofile
```

添加以下内容（根据你的偏好选择）：
```bash
# 使用 Colemak 布局
setxkbmap us -variant colemak

# 或者使用 QWERTY 布局
# setxkbmap us
```

### 方法二：使用桌面环境设置
大多数桌面环境（GNOME、KDE、XFCE）都提供图形化工具设置键盘布局：
1. 打开系统设置
2. 找到"区域与语言"或"键盘"设置
3. 添加或选择需要的键盘布局

## 常用快捷键

### 快速切换布局
```bash
# 创建别名方便切换
alias colemak='setxkbmap us -variant colemak'
alias qwerty='setxkbmap us; xset -r 66'

# 添加到 ~/.bashrc 或 ~/.zshrc
echo "alias colemak='setxkbmap us -variant colemak'" >> ~/.bashrc
echo "alias qwerty='setxkbmap us; xset -r 66'" >> ~/.bashrc
```

### 查看当前布局
```bash
setxkbmap -query
```

## 布局对比

| 特性 | QWERTY | Colemak |
|------|--------|---------|
| 设计年代 | 1873年 | 2006年 |
| 设计目标 | 防止打字机卡键 | 提高打字效率 |
| 常用键位置 | 分散 | 集中在主行 |
| 学习曲线 | 低（已掌握） | 中等 |
| 效率提升 | - | 约 35% |

## 学习建议

如果你打算学习 Colemak 布局：

1. **循序渐进**：先学习主行键位，再扩展
2. **使用练习工具**：如 [Colemak Academy](https://colemak.com/Academy)
3. **保持耐心**：通常需要 2-4 周适应期
4. **不要完全放弃 QWERTY**：在某些场景下可能还需要使用

## 故障排除

### 问题：切换后布局不生效
```bash
# 重启 X11 服务（谨慎使用）
sudo systemctl restart lightdm  # 或你使用的显示管理器

# 或者重新登录
```

### 问题：Caps Lock 键异常
```bash
# 完全重置键盘设置
setxkbmap -option
```

### 问题：某些应用不识别布局
有些应用（如游戏、终端模拟器）可能需要单独配置键盘布局。

## 参考资料

- [Colemak 官方网站](https://colemak.com/Unix)
- [Linux 键盘布局配置指南](https://wiki.archlinux.org/title/Xorg/Keyboard_configuration)
- [键盘布局比较研究](https://en.wikipedia.org/wiki/Keyboard_layout)

选择适合自己的键盘布局可以显著提高打字效率和舒适度。无论你选择传统的 QWERTY 还是优化的 Colemak，重要的是找到最适合自己工作习惯的方案。
