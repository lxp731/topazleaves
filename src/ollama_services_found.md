# Ollama 服务发现

#### 编辑文件

```bash
sudo vim /etc/systemd/system/ollama.service
```

#### 在[Service]下添加

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
```

#### 重载服务

```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```