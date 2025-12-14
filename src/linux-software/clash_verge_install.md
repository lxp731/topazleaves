# Install Clash-Verge

## clash-verge Project Github

[https://github.com/clash-verge-rev/clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev)

## Sloved Error of "clash-verge 依赖于 libwebkit2gtk-4.0-37."

```bash
sudo vim /etc/apt/sources.list.d/ubuntu.sources

# 添加以下内容
Types: deb
URIs: http://br.archive.ubuntu.com/ubuntu/
Suites: jammy
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

sudo apt update
```

## Sloved Error of starting "clash-verge" but no display window

```
vim /usr/share/applications/clash-verge.desktop 

# 将 Exec 改为：
Exec=env WEBKIT_DISABLE_COMPOSITING_MODE=1 clash-verge
```
