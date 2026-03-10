# Ollama 服务发现配置指南

## 问题背景

当你在 Docker 容器中部署需要访问本地 Ollama 服务的应用时（如 OpenWeb-UI），可能会遇到容器无法发现主机上运行的 Ollama 服务的问题。这是因为默认情况下，Ollama 只监听本地回环地址（127.0.0.1）。

## 解决方案：修改 Ollama 服务配置

### 步骤 1：编辑 systemd 服务文件

使用你喜欢的文本编辑器打开 Ollama 的 systemd 服务配置文件：

```bash
sudo vim /etc/systemd/system/ollama.service
```

或者使用其他编辑器：
```bash
sudo nano /etc/systemd/system/ollama.service
```

### 步骤 2：添加环境变量

在 `[Service]` 部分添加以下环境变量配置：

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0"  # 允许所有网络接口访问
```

完整的服务文件应该类似这样：
```ini
[Unit]
Description=Ollama Service
After=network-online.target

[Service]
Type=exec
ExecStart=/usr/local/bin/ollama serve
Environment="OLLAMA_HOST=0.0.0.0"
User=ollama
Group=ollama
Restart=always
RestartSec=3

[Install]
WantedBy=default.target
```

### 步骤 3：重新加载并重启服务

应用配置更改：

```bash
# 重新加载 systemd 配置
sudo systemctl daemon-reload

# 重启 Ollama 服务
sudo systemctl restart ollama
```

### 步骤 4：验证配置

检查服务状态和监听端口：

```bash
# 检查服务运行状态
sudo systemctl status ollama

# 验证 Ollama 是否在所有接口上监听
sudo netstat -tlnp | grep 11434
```

应该能看到类似这样的输出：
```
tcp6       0      0 :::11434                :::*                    LISTEN      [ollama进程ID]
```

## 安全注意事项

⚠️ **重要提醒**：将 `OLLAMA_HOST` 设置为 `0.0.0.0` 意味着 Ollama 服务将在所有网络接口上监听，包括公网接口（如果存在）。这可能会带来安全风险。

### 推荐的安全措施

1. **使用防火墙**：配置防火墙规则，只允许特定 IP 或网段访问 11434 端口
2. **内网部署**：确保 Ollama 服务只在内网环境中使用
3. **反向代理**：通过 Nginx 等反向代理添加身份验证
4. **VPN 访问**：通过 VPN 访问内网服务

### 防火墙配置示例（UFW）

```bash
# 允许特定 IP 访问 Ollama 端口
sudo ufw allow from 192.168.1.0/24 to any port 11434

# 或者只允许 Docker 网桥
sudo ufw allow from 172.17.0.0/16 to any port 11434
```

## 故障排除

### 问题 1：修改后服务无法启动
- 检查服务文件语法：`sudo systemctl status ollama`
- 查看详细日志：`sudo journalctl -u ollama -f`

### 问题 2：容器仍然无法连接
- 确认主机防火墙配置
- 检查 Docker 网络模式
- 尝试在容器中使用 `host.docker.internal` 作为主机地址

### 问题 3：性能问题
如果发现性能下降，可以考虑：
- 调整 Ollama 的内存限制
- 使用 GPU 加速（如果支持）
- 优化模型加载策略

## 替代方案

如果你不想修改 Ollama 的主配置，还可以考虑：

1. **使用 Docker 的 host 网络模式**：让容器共享主机网络命名空间
2. **创建专用网络**：为 Ollama 和相关服务创建独立的 Docker 网络
3. **使用服务发现工具**：如 Consul 或 etcd

## 总结

正确配置 Ollama 服务发现是使用 Docker 部署 AI 相关应用的关键一步。虽然修改 `OLLAMA_HOST` 是最直接的解决方案，但务必结合实际情况考虑安全因素。

对于生产环境，建议结合防火墙、网络隔离和访问控制等多层安全措施，确保服务既可用又安全。

---

**更新记录**：
- 2024-03-10：初始版本，基于 Ollama 0.1.30 测试
- 配置方法可能随 Ollama 版本更新而变化，建议参考官方文档