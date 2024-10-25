# 配置 Docker 代理

#### 编辑文件

```bash
sudo vim /etc/systemd/system/docker.service.d/http-proxy.conf
```

#### 添加以下内容

```ini
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7890"
Environment="HTTPS_PROXY=http://127.0.0.1:7890"
```

#### 重载服务

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```