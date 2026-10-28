# OpenRung 用户级服务配置手册

把 `openrung` 安装到 `~/.local/bin`，并配成 **systemd 用户服务**：
开机自启（无需登录）、崩溃自动重启、本地提供 `127.0.0.1:7890` 混合代理
（HTTP/SOCKS）。

- 项目地址：<https://github.com/openrung/openrung>
- 发布页：<https://github.com/openrung/openrung/releases>
- 官网：<https://openrung.org>

本文档按顺序照做即可复现当前环境。除特别标注外，所有命令都以普通用户执行，
**不要加 sudo**。

---

## 1. 安装 openrung 到 `~/.local/bin`

release 提供各平台的预编译包，命名规则：

```
openrung-client-<os>-<arch>.tar.gz
openrung-client-windows-amd64.zip
```

| 系统 / 架构 | 文件 |
|---|---|
| Linux x86_64 | `openrung-client-linux-amd64.tar.gz` |
| Linux aarch64 | `openrung-client-linux-arm64.tar.gz` |
| macOS Intel | `openrung-client-darwin-amd64.tar.gz` |
| macOS Apple Silicon | `openrung-client-darwin-arm64.tar.gz` |
| Windows | `openrung-client-windows-amd64.zip` |

压缩包解压后是 `openrung-client-<os>-<arch>/openrung-client`，
安装时改名为 `openrung` 放进 `~/.local/bin`。

### 1.1 一键安装脚本

在任意目录执行（会自动判断架构、取最新 tag、校验 SHA256、安装到
`~/.local/bin/openrung`）：

```bash
set -euo pipefail

# 1) 架构
case "$(uname -m)" in
  x86_64|amd64)  arch=amd64 ;;
  aarch64|arm64) arch=arm64 ;;
  *) echo "不支持的架构: $(uname -m)"; exit 1 ;;
esac

# 2) 最新 client tag；API 不通时可手动指定：
#    OPENRUNG_TAG=client-v0.5.4 bash install.sh
tag="${OPENRUNG_TAG:-}"
if [ -z "$tag" ]; then
  tag="$(curl -fsSL https://api.github.com/repos/openrung/openrung/releases/latest \
    | sed -n 's/.*"tag_name": *"\([^"]*\)".*/\1/p' | head -n1)"
fi
if [ -z "$tag" ]; then
  echo "获取最新版本失败，请用 OPENRUNG_TAG=client-v0.5.4 重试"; exit 1
fi
echo "安装版本: $tag (linux-$arch)"

# 3) 下载
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
base="https://github.com/openrung/openrung/releases/download/$tag"
file="openrung-client-linux-$arch.tar.gz"

curl -fL --retry 3 --retry-delay 2 -o "$tmp/$file"        "$base/$file"
curl -fsSL --retry 3             -o "$tmp/SHA256SUMS"     "$base/SHA256SUMS"

# 4) 校验 SHA256
( cd "$tmp" && grep -F " $file" SHA256SUMS | sha256sum -c - )

# 5) 解压并安装到 ~/.local/bin
tar -xzf "$tmp/$file" -C "$tmp"
src="$tmp/openrung-client-linux-$arch/openrung-client"
[ -x "$src" ] || src="$(find "$tmp" -type f -name 'openrung-client*' -perm -u+x | head -n1)"

mkdir -p "$HOME/.local/bin"
install -m 755 "$src" "$HOME/.local/bin/openrung"

# 6) 验证
"$HOME/.local/bin/openrung" version
```

期望最后输出类似：

```
client/0.5.4 revision=b37f674da2742d0f6b7946a67969bda5e6937b85
sing-box/1.14.0-beta.17 (bundled, with_utls)
```

### 1.2 确认在 PATH 中

`~/.zshrc` 里应当有（本机已有，在 PATH 中可直接用 `openrung`）：

```bash
export PATH="$HOME/.local/bin:$PATH"
```

检查：

```bash
command -v openrung        # /home/knight/.local/bin/openrung
openrung version
```

---

## 2. 前置检查

```bash
# 二进制
ls -l ~/.local/bin/openrung
~/.local/bin/openrung version

# systemd 用户实例
systemctl --user is-system-running
```

期望输出 `running`（`degraded` 也能用，先看 `systemctl --user --failed`）。

### 允许开机自启（linger）

用户服务默认只在登录后运行。要让它在开机时就启动，需要开启 linger：

```bash
loginctl show-user "$USER" -p Linger
# 如果是 Linger=no：
sudo loginctl enable-linger "$USER"
```

---

## 3. 固定本地代理端口

端口保存在 openrung 的状态文件里（没有命令行参数）：

```bash
mkdir -p ~/.config/openrung

# 备份原值（如果文件已存在）
[ -f ~/.config/openrung/proxy-port.json ] && \
  cp ~/.config/openrung/proxy-port.json ~/.config/openrung/proxy-port.json.bak

# 设为 7890；文件不存在时这条也能直接创建
printf '{"port":7890}\n' > ~/.config/openrung/proxy-port.json

cat ~/.config/openrung/proxy-port.json
# {"port":7890}
```

> 首次运行 openrung 时该文件可能不存在；手动创建即可，程序会读取它。
> 如果想换端口，改这里后重启服务（见第 7 节）。

---

## 4. 创建 systemd 用户服务

```bash
mkdir -p ~/.config/systemd/user

cat > ~/.config/systemd/user/openrung.service <<'EOF'
[Unit]
Description=OpenRung proxy (headless connect, mixed inbound 127.0.0.1:7890)
After=network-online.target
Wants=network-online.target
StartLimitIntervalSec=0

[Service]
Type=simple
WorkingDirectory=%h
# 用 connect -headless，而不是 run -c <静态配置>：
# run -c 写死的是某一次连接生成的临时 sing-box 配置，里面的 UUID/relay 会过期。
# 过期后本地 7890 仍能连上，但 TLS 会立即 EOF。connect -headless 每次启动都会
# 向 broker 拉取新凭据、验证 relay 可用，并在会话内自动 failover。
ExecStart=%h/.local/bin/openrung connect -headless
Restart=always
RestartSec=5

[Install]
WantedBy=default.target
EOF
```

关键点：

- `%h` 会展开成当前用户家目录，不要手动写成固定路径。
- **不要加 `-stop-on-stdin-close`**。systemd 把 stdin 接在 `/dev/null` 上，
  该参数会把 stdin EOF 当成停止信号，服务起来就立刻退出。
- `StartLimitIntervalSec=0` 关闭启动频率限制，配合 `Restart=always` 一直重试。
- `Type=simple` 即可，`connect -headless` 是前台进程，不会 daemonize。

---

## 5. 启动并设置开机自启

```bash
systemctl --user daemon-reload
systemctl --user enable --now openrung.service
```

查看状态：

```bash
systemctl --user --no-pager status openrung.service
```

期望看到 `Active: active (running)`，日志里有：

```
[..] connected via <节点名>
status: connected via <节点名>
[..] inbound/mixed[mixed-in]: tcp server started at 127.0.0.1:7890
```

> 日志里的 `system proxy unavailable here; set manual proxy 127.0.0.1:7890`
> 是正常的：服务环境下不能自动改桌面系统代理，手动设环境变量即可。

---

## 6. 验证

```bash
# 1) 服务状态
systemctl --user is-enabled openrung   # enabled
systemctl --user is-active  openrung   # active

# 2) 端口监听
netstat -tln | grep 7890
# tcp 0 0 127.0.0.1:7890 0.0.0.0:* LISTEN

# 3) 真正走代理请求
curl -sS -m 15 -x http://127.0.0.1:7890 https://api.ipify.org; echo
# 应输出 relay 的公网 IP，而不是超时

# 4) 崩溃自动重启（可选测试）
systemctl --user kill -s KILL openrung
sleep 7
systemctl --user is-active openrung      # active
systemctl --user show -p NRestarts --value openrung   # >= 1
```

---

## 7. 可选项

### 7.1 固定节点

在 unit 的 `ExecStart` 后面追加参数，然后 `daemon-reload` + `restart`：

| 参数 | 含义 |
|---|---|
| `-relay-country DE` | 只用德国节点，会话内 failover 也限制在德国 |
| `-relay-label "Nuremberg, Germany"` | 按节点标签筛选 |
| `-relay-id relay_xxx` | 精确指定某个 relay |
| `-relay-family ipv4` | 只用 IPv4 地址的 relay |
| `-punch=false` | 关闭 NAT 打洞，始终走 relay |

例：

```ini
ExecStart=%h/.local/bin/openrung connect -headless -relay-country DE
```

不加这些参数时，每次启动自动挑选当前可用且延迟较低的 relay。

### 7.2 全局 TUN 模式

`openrung connect --tun` 需要 root，不建议放进用户服务。若确实需要，
用 system 级 unit，或 `sudo openrung connect --tun` 手动运行。

### 7.3 查看并手动选择 relay

```bash
openrung check        # 打印当前选中的可用 relay
```

---

## 8. 卸载 / 回滚

```bash
systemctl --user disable --now openrung.service
rm -f ~/.config/systemd/user/openrung.service
systemctl --user daemon-reload
```

可选清理：

```bash
# 恢复端口原值
[ -f ~/.config/openrung/proxy-port.json.bak ] && \
  mv ~/.config/openrung/proxy-port.json.bak ~/.config/openrung/proxy-port.json

# 删除二进制
rm -f ~/.local/bin/openrung

# 注意：以下操作会让 openrung 重新注册身份，非必要不要删
# rm -f ~/.config/openrung/{client-id,user-id.json,installation-key.pem}
```