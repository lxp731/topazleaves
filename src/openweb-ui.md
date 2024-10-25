# Openweb-UI

#### open-webui 官网

[https://docs.openwebui.com/](https://docs.openwebui.com/)

#### Docker 部署

```bash
version: '3'

services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    ports:
      - "3000:8080"
    volumes:
      - open-webui:/app/backend/data
#    restart: always
    extra_hosts:
      - "host.docker.internal:host-gateway"

volumes:
  open-webui:
```

> docker部署open-webui需要配合[ollama 服务发现](./ollama_services_found.md)使用，否则会出现open-webui无法识别到本地模型的情况。