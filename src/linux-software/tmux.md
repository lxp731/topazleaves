# Tmux 终端复用器配置指南

## 安装 Tmux

### 官方网站
[https://github.com/tmux/tmux](https://github.com/tmux/tmux)

### 安装命令
```bash
# Ubuntu/Debian
sudo apt install -y tmux

# CentOS/RHEL
sudo yum install tmux

# Arch Linux
sudo pacman -S tmux

# macOS
brew install tmux
```

### 验证安装
```bash
tmux -V
# 输出类似：tmux 3.3a
```

## 安装 Tmux 插件管理器 (TPM)

### 官方网站
[https://github.com/tmux-plugins/tpm](https://github.com/tmux-plugins/tpm)

### 安装 TPM
```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

## 创建 .tmux.conf 配置文件

这是我的个人 Tmux 配置文件：

```bash
{{#include ../mdbook-files/tmux.conf}}
```

### 配置文件说明
1. **基础设置**：修改前缀键、启用鼠标支持等
2. **主题配置**：设置状态栏样式和颜色
3. **插件配置**：定义要安装的插件列表
4. **快捷键映射**：自定义常用操作的快捷键

## 安装 Nerd Fonts 字体

### 官方网站
[Nerd Fonts GitHub 仓库](https://github.com/ryanoasis/nerd-fonts)

### 方法一：使用官方脚本安装
经过多次尝试，`Meslo` 字体表现最佳：

```bash
git clone --depth 1 https://github.com/ryanoasis/nerd-fonts.git && \
cd nerd-fonts/ && \
./install.sh Meslo
```

### 方法二：使用简化脚本安装（推荐）
```bash
wget https://raw.githubusercontent.com/mcarvalho1/Simple-NerdFonts-Downloader/c7854dae2153aa199277926bed4b992488b65a3d/nf_downloader.sh
```

> **注意**：`nf_downloader.sh` 默认会安装所有字体，建议修改脚本只安装需要的字体。字体将保存在 `~/.local/share/fonts` 目录。

## Tmux 基本使用

### 启动 Tmux
```bash
tmux
# 或指定会话名称
tmux new -s mysession
```

### 常用快捷键
| 快捷键 | 功能 |
|--------|------|
| `Ctrl+b %` | 垂直分屏 |
| `Ctrl+b "` | 水平分屏 |
| `Ctrl+b 方向键` | 切换窗格 |
| `Ctrl+b c` | 新建窗口 |
| `Ctrl+b n/p` | 切换窗口 |
| `Ctrl+b d` | 分离会话 |
| `Ctrl+b [` | 进入复制模式 |
| `Ctrl+b ]` | 粘贴 |

### 会话管理
```bash
# 列出所有会话
tmux ls

# 附加到会话
tmux attach -t 会话名

# 重命名会话
tmux rename-session -t 旧名称 新名称

# 杀死会话
tmux kill-session -t 会话名
```

## 插件推荐

### 1. tmux-sensible
合理的默认配置
```tmux
set -g @plugin 'tmux-plugins/tmux-sensible'
```

### 2. tmux-prefix-highlight
高亮显示前缀键状态
```tmux
set -g @plugin 'tmux-plugins/tmux-prefix-highlight'
```

### 3. tmux-resurrect
会话保存和恢复
```tmux
set -g @plugin 'tmux-plugins/tmux-resurrect'
```

### 4. tmux-continuum
自动保存会话
```tmux
set -g @plugin 'tmux-plugins/tmux-continuum'
```

### 5. tmux-yank
系统剪贴板集成
```tmux
set -g @plugin 'tmux-plugins/tmux-yank'
```

## 插件安装步骤

### 1. 添加插件到配置
在 `.tmux.conf` 中添加插件：
```tmux
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'tmux-plugins/tmux-yank'
# 更多插件...
```

### 2. 初始化 TPM
在配置文件末尾添加：
```tmux
# 初始化 TPM
run '~/.tmux/plugins/tpm/tpm'
```

### 3. 安装插件
1. 重新加载配置文件：`tmux source ~/.tmux.conf`
2. 按 `Prefix + I`（大写 i）安装插件

### 4. 更新插件
按 `Prefix + U` 更新所有插件

### 5. 卸载插件
1. 从配置文件中删除插件行
2. 按 `Prefix + alt + u` 卸载插件

## 高级配置

### 1. 主题定制
```tmux
# 设置状态栏样式
set -g status-style "fg=#665c54"
set -g window-status-current-style "fg=#ea6962"

# 设置面板边框
set -g pane-border-style "fg=#3c3836"
set -g pane-active-border-style "fg=#ea6962"
```

### 2. 鼠标支持
```tmux
# 启用鼠标
set -g mouse on

# 鼠标滚轮支持
bind -n WheelUpPane if-shell -F -t = "#{mouse_any_flag}" "send-keys -M" "if -Ft= '#{pane_in_mode}' 'send-keys -M' 'copy-mode -e'"
```

### 3. 复制模式优化
```tmux
# 使用 vi 键绑定
setw -g mode-keys vi

# 复制到系统剪贴板
bind -T copy-mode-vi v send -X begin-selection
bind -T copy-mode-vi y send -X copy-pipe-and-cancel 'xclip -in -selection clipboard'
```

## 性能优化

### 1. 减少重绘
```tmux
# 延长状态栏更新间隔
set -g status-interval 5

# 禁用不必要的重绘
set -g focus-events off
```

### 2. 内存优化
```tmux
# 限制历史记录大小
set -g history-limit 10000

# 禁用会话恢复的自动保存
set -g @continuum-restore 'off'
```

## 故障排除

### 问题 1：插件不生效
```bash
# 检查 TPM 安装
ls ~/.tmux/plugins/tpm

# 重新安装插件
tmux kill-server
tmux
# 然后按 Prefix + I
```

### 问题 2：字体显示异常
```bash
# 清除字体缓存
fc-cache -fv

# 检查字体是否安装成功
fc-list | grep Meslo
```

### 问题 3：快捷键冲突
```tmux
# 修改前缀键
set -g prefix C-a
unbind C-b
bind C-a send-prefix
```

## 最佳实践

### 1. 配置文件管理
```bash
# 将配置文件纳入版本控制
git init ~/.tmux
git add .tmux.conf
git commit -m "Initial tmux configuration"
```

### 2. 会话命名规范
```bash
# 使用有意义的会话名称
tmux new -s web-dev
tmux new -s database
tmux new -s monitoring
```

### 3. 备份和恢复
```bash
# 手动备份会话
tmux list-sessions > tmux-sessions-backup.txt

# 使用插件自动备份
# 启用 tmux-resurrect 和 tmux-continuum
```

Tmux 是一个强大的终端复用工具，通过合理配置可以显著提高命令行工作效率。花时间学习和定制 Tmux，你会发现它成为日常开发中不可或缺的工具。
