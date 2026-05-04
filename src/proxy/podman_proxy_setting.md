# Podman 容器代理配置指南

## 问题描述

宿主机配置了 `http_proxy=127.0.0.1:7890`，但容器内 `127.0.0.1` 指向容器自身，导致代理不可用。

## 根本原因

Podman 默认行为：
- 自动继承宿主机的 `*_proxy` 环境变量（优先级最高）
- 即使 `containers.conf` 中配置了 `env = [...]`，若未禁用自动继承，宿主机变量仍会覆盖配置

## 解决方案

### 1. 编辑配置文件

**路径选择**：
- 当前用户生效：`~/.config/containers/containers.conf`
- 全局生效：`/etc/containers/containers.conf`

**配置内容**：
```ini
[containers]
# 禁用自动继承宿主机代理变量（关键）
http_proxy = false

# 手动指定代理，使用 host.containers.internal 指向宿主机
env = [
  "http_proxy=http://host.containers.internal:7890",
  "https_proxy=http://host.containers.internal:7890",
  "no_proxy=127.0.0.1,localhost",
  "HTTP_PROXY=http://host.containers.internal:7890",
  "HTTPS_PROXY=http://host.containers.internal:7890",
  "NO_PROXY=127.0.0.1,localhost"
]
```

> **注意**：
> - `http_proxy = false` 必须生效（取消注释）
> - 同时配置大小写变量，确保所有应用兼容
> - 文件中只保留一组 `env = [...]`，避免被覆盖
> - `host.containers.internal` 需 Podman ≥ 4.0

### 2. 验证配置

```bash
# 确认配置文件路径
podman info --format '{{.Host.ConfigFile}}'

# 启动容器检查环境变量
podman run --rm -it ubuntu /bin/bash

# 容器内执行：
env | grep -i proxy
# 预期输出应包含 host.containers.internal，而非 127.0.0.1

# 测试网络连通性
curl -I https://example.com
```

### 3. 临时方案（命令行覆盖）

无需修改配置文件，单次运行生效：

```bash
podman run --rm -it --http-proxy=false \
  -e http_proxy=http://host.containers.internal:7890 \
  -e https_proxy=http://host.containers.internal:7890 \
  -e no_proxy=127.0.0.1,localhost \
  ubuntu /bin/bash
```

### 4. 故障排查

| 现象 | 检查项 | 命令/操作 |
|------|--------|----------|
| 配置未生效 | 配置文件路径 | `podman info --format '{{.Host.ConfigFile}}'` |
| 配置被忽略 | 语法错误 | `podman info` 能否正常执行 |
| 配置冲突 | 多配置文件优先级 | 检查 `/usr/share/containers/containers.conf` |
| 临时参数干扰 | 命令行 `--http-proxy` | 命令行参数优先级 > 配置文件 |
| 域名无法解析 | Podman 版本 | `podman --version`（需 ≥ 4.0） |

### 5. 备选方案

若 `host.containers.internal` 不可用，可改用宿主机真实 IP：

```bash
# 获取宿主机在 podman 网络中的网关 IP
HOST_IP=$(ip route | grep default | awk '{print $3}')

podman run --rm -it --http-proxy=false \
  -e http_proxy=http://$HOST_IP:7890 \
  -e https_proxy=http://$HOST_IP:7890 \
  ubuntu /bin/bash
```

> ⚠️ 此方法依赖宿主机网络环境，重启后 IP 可能变化，建议优先使用 `host.containers.internal`。