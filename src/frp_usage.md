# 使用 frp

#### 项目链接

[https://github.com/fatedier/frp](https://github.com/fatedier/frp)

[中文文档](https://gofrp.org/zh-cn/)

#### 服务器配置

```bash
vim frps.toml
```

```bash
bindPort = 5432  # frp 建立通讯的端口
auth.token = "123456"
```

#### 客户端配置

```bash
vim frpc.toml
```

```bash
serverAddr = "123.57.54.42"
serverPort = 5432   # frp 建立通讯的端口
auth.token = "123456"

[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 10086   # frp 映射的端口，VPS需要打开的端口
```

#### systemctl 配置

* frps | 服务器配置

```bash
sudo vim /etc/systemd/system/frps.service
```

```ini
[Unit]
# 服务名称，可自定义
Description = frp server
After = network.target syslog.target
Wants = network.target
[Service]
Type = simple
# 启动frps的命令，需修改为您的frps的安装路径
ExecStart = /root/frp/frps -c /root/frp/config.toml
[Install]
WantedBy = multi-user.target
```

重载服务

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now frps
```

* frpc | 客户端配置

```bash
sudo vim /etc/systemd/system/frpc.service
```

```ini
[Unit]
Description=FRPC Client Service
After=network.target

[Service]
User=knight
Group=knight
Type=simple
ExecStart=/home/knight/frp/frpc -c /home/knight/frp/config.toml
Restart=on-failure
RestartSec=5s
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=frpc

[Install]
WantedBy=multi-user.target
```

重载服务

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now frpc
```