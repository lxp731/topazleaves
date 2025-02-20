# Configure Docker Proxy

#### Edit Conf File

```bash
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