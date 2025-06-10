# Setting Docker Mirror Acceleration

#### Edit Conf File

```bash
sudo vim /etc/docker/daemon.json
```

#### Add Lines

```bash
{
    "registry-mirrors": [
        "https://docker.1ms.run",
        "https://docker.xuanyuan.me",
        "https://docker.wanpeng.life",
        "https://docker.imgdb.de"
    ]
}
```

#### Reload Daemon & Restart Docker

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```


# Configure Docker Proxy

#### Edit Conf File

```bash
sudo mkdir -p /etc/systemd/system/docker.service.d && \
sudo vim /etc/systemd/system/docker.service.d/http-proxy.conf
```

#### Add Lines

```ini
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7890"
Environment="HTTPS_PROXY=http://127.0.0.1:7890"
```

#### Reload Daemon & Restart Docker

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

# Configure Container Proxy

#### Edit Conf File

```bash
vim ~/.docker/config.json
```

#### Add Lines

```bash
{
  "proxies":
    {
      "default":
        {
          "httpProxy": "http://172.17.0.1:7890",
          "httpsProxy": "http://172.17.0.1:7890",
          "noProxy": "*.<domain>,127.0.0.0/8"
        }
    }
}
```

#### Reload Daemon & Restart Docker

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```