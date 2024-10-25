# Yesplaymusic

#### yesplaymusic 官网

[https://github.com/qier222/YesPlayMusic](https://github.com/qier222/YesPlayMusic)

#### Docker 部署

```yaml
version: '3.9'

services:
  yesplaymusic:
    image: fogforest/yesplaymusic
    container_name: yesplaymusic
    restart: always
    ports:
      - "7900:80"
```