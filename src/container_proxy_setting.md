# Configure Container Proxy

```bash
vim ~/.docker/config.json

{ 
  "proxies":
    { 
      "default": 
        { 
          "httpProxy": "http://172.17.0.1:7890", 
          "httpsProxy": "https://172.17.0.1:7890", 
          "noProxy": "*.<domain>,127.0.0.0/8" 
        } 
    } 
}
```