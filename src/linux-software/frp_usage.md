# 使用 frp

## Project Official Website

[https://github.com/fatedier/frp](https://github.com/fatedier/frp)

[中文文档](https://gofrp.org/zh-cn/)

# SSH Service

## The server configuration

```bash
vim frps.toml
```

```bash
bindPort = 5432  # frp 建立通讯的端口
auth.token = "123456"
```

## The Client configuration

```bash
vim frpc.toml
```

```bash
serverAddr = "123.00.00.01"
serverPort = 5432   # frp 建立通讯的端口
auth.token = "123456"

[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 10086   # frp 映射的端口，VPS需要打开的端口
```

## FTP Service

## The Server configuration

```bash
vim frps.toml
```

```bash
bindPort = 5432
auth.token = "123456"
```

## The Client configuration

```bash
vim frpc.toml
```

```bash
serverAddr = "123.00.00.01"
serverPort = 5432
auth.token = "123456"

[[proxies]]
name = "test_static_file"
type = "tcp"
localPort = 21
remotePort = 10086

[proxies.plugin]
type = "static_file"

# 本地文件目录，对外提供访问
localPath = "/your/local/path"

# URL 中的前缀，将被去除，保留的内容即为要访问的文件路径
stripPrefix = "static"
httpUser = "user"
httpPassword = "password"
```

## systemctl Configuration

* frps | Server configuration

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

reload daemon and start service

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now frps
```

* frpc | Client configuration

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

reload daemon and start service

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now frpc
```