# 笔记本合盖熄屏（不休眠）

本文介绍如何在 Linux 上实现「合上盖子只熄屏、不休眠」，不依赖桌面环境，适用于无头服务器或需要合盖继续运行的场景。

## 方案原理

logind 的盖子动作只有 `ignore` / `suspend` / `hibernate` / `lock` 等，**没有「熄屏」**这一项。因此需要两步配合，各管一件事：

| 组件 | 负责 | 配置 |
|---|---|---|
| `systemd-logind` | 合盖**不休眠** | `HandleLidSwitch=ignore` |
| `acpid` + 背光写入 | 合盖**熄屏** | 监听盖子事件，写入 `bl_power` |

## 配置步骤

### 1. 让合盖不休眠

```bash
sudo vim /etc/systemd/logind.conf
```

找到并修改：

```bash
HandleLidSwitch=ignore
```

重启服务生效：

```bash
sudo systemctl restart systemd-logind
```

> 只写这一行即可覆盖「电池 / 插电 / 外接显示器」全部情形（`HandleLidSwitchExternalPower` 默认被忽略，`HandleLidSwitchDocked` 默认就是 `ignore`）。

### 2. 安装 acpid

```bash
sudo apt-get install -y acpid
```

### 3. 添加盖子事件规则

```bash
sudo mkdir -p /etc/acpi/events
sudo tee /etc/acpi/events/lid >/dev/null <<'EOF'
# 盖子开关事件，交给脚本自行判断是开还是关
event=button/lid.*
action=/etc/acpi/lid.sh
EOF
```

### 4. 编写熄屏脚本

```bash
sudo tee /etc/acpi/lid.sh >/dev/null <<'EOF'
#!/bin/bash
# 关盖 -> 熄灭背光（不休眠）；开盖 -> 恢复
BL=/sys/class/backlight/intel_backlight
state=$(awk '{print $2}' /proc/acpi/button/lid/LID0/state)

case "$state" in
  closed) echo 4 > "$BL/bl_power" ;;   # 4 = 熄屏
  open)   echo 0 > "$BL/bl_power" ;;   # 0 = 点亮
esac
EOF
sudo chmod 755 /etc/acpi/lid.sh
```

> `bl_power` 只控制背光开关、不动 `brightness`，开盖后亮度保持原样。背光路径与本机不同时，用 `ls /sys/class/backlight/` 确认后替换。

### 5. 启用 acpid

```bash
sudo systemctl enable --now acpid
```

## 验收

```bash
# 1) 监听事件（保持运行，然后开合盖子）
sudo acpi_listen              # 期望看到 button/lid LID0 ...

# 2) 服务状态
systemctl is-enabled acpid    # enabled
systemctl is-active  acpid    # active

# 3) 盖子状态
cat /proc/acpi/button/lid/LID0/state   # open / closed
```

> **注意**：判断「屏幕是否熄灭」请以**合盖后用眼睛看**为准。本机实测合盖灭屏时 `bl_power` 读回值仍为 `0`（`intel_backlight` 的软件值与实际硬件状态可能不一致），不能拿它当判据。

## 回滚

```bash
sudo systemctl disable --now acpid
sudo rm -f /etc/acpi/events/lid /etc/acpi/lid.sh
echo 0 | sudo tee /sys/class/backlight/intel_backlight/bl_power   # 确保屏幕亮回来

# 恢复 logind 默认（合盖又会休眠）
sudo sed -i 's/^HandleLidSwitch=ignore/#HandleLidSwitch=suspend/' /etc/systemd/logind.conf
sudo systemctl restart systemd-logind
```
