# Ollama Service Discovery

#### Editing the systemd service file

```bash
sudo vim /etc/systemd/system/ollama.service
```

#### Add ENV under [Service] Item

```ini
[Service]
Environment="OLLAMA_HOST=0.0.0.0"
```

#### Reload and Restart

```bash
sudo systemctl daemon-reload
sudo systemctl restart ollama
```