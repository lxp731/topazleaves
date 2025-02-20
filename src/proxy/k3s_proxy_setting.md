# Configure K3S Proxy

* `/etc/systemd/system/k3s.service.env`

* `/etc/systemd/system/k3s-agent.service.env`

```bash
HTTP_PROXY=http://your-proxy.example.com:8888
HTTPS_PROXY=http://your-proxy.example.com:8888
NO_PROXY=127.0.0.0/8,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16
```