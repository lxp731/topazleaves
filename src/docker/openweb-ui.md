# OpenWeb-UI

#### open-webui Official Website

[https://docs.openwebui.com/](https://docs.openwebui.com/)

#### Docker Deployment

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

> Docker deploy open-webui needs to configure [ollama Service Discovery](./ollama_services_found.md), or ollama can't discern local models.