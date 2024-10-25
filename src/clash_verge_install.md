# 下载 Clash-Verge

#### clash-verge项目地址

[https://github.com/clash-verge-rev/clash-verge-rev](https://github.com/clash-verge-rev/clash-verge-rev)

#### 解决"clash-verge 依赖于 libwebkit2gtk-4.0-37."问题

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

#### 解决 clash-verge 启动不显示窗口的问题

```
vim /usr/share/applications/clash-verge.desktop 

# 将 Exec 改为：
Exec=env WEBKIT_DISABLE_COMPOSITING_MODE=1 clash-verge
```
