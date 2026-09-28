# Jellyfin：免费开源的私有影音媒体中心

## 项目简介

Jellyfin 是一个免费、开源的媒体服务器软件，用于集中管理、整理和流式播放你的电影、电视剧、音乐和照片等媒体文件。作为 Emby 和 Plex 的开源替代方案，它完全免费、无需订阅，所有数据都保存在你自己的服务器上，隐私完全由你掌控。

**官方网站**：[https://jellyfin.org/](https://jellyfin.org/docs/general/installation/container)

## 核心功能

- **🎬 全媒体支持**：统一管理电影、电视剧、音乐、照片等各类媒体文件
- **🔄 实时转码**：根据播放设备与网络状况自动转码，支持硬件加速
- **🖼️ 元数据自动抓取**：自动获取海报、简介、演员等元数据信息
- **📱 多端客户端**：提供 Web、Android、iOS、智能电视、Kodi 等多种客户端
- **👥 多用户管理**：支持多用户及细粒度权限控制
- **📺 直播与录制**：支持电视调谐器接入与 DVR 直播录制
- **🔌 插件扩展**：丰富的插件系统，轻松扩展功能

## Docker 部署指南

### 准备工作
1. 确保已安装 Docker 和 Docker Compose

### docker-compose.yml 配置

```yaml
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    # Optional - specify the uid and gid you would like Jellyfin to use instead of root
    user: 0:0
    ports:
      - 8096:8096/tcp
      - 7359:7359/udp
    volumes:
      - /path/to/config:/config
      - /path/to/cache:/cache
      - type: bind
        source: /path/to/media
        target: /media
      - type: bind
        source: /path/to/media2
        target: /media2
        read_only: true
      # Optional - extra fonts to be used during transcoding with subtitle burn-in
      - type: bind
        source: /path/to/fonts
        target: /usr/local/share/fonts/custom
        read_only: true
    restart: 'unless-stopped'
    # Optional - alternative address used for autodiscovery
    environment:
      - JELLYFIN_PublishedServerUrl=http://example.com
    # Optional - may be necessary for docker healthcheck to pass if running in host network mode
    extra_hosts:
      - 'host.docker.internal:host-gateway'
```

### 部署步骤

1. 创建 `docker-compose.yml` 文件，将上述配置复制进去（记得将 `/path/to/media`、`/path/to/config` 等路径替换为你的实际目录）
2. 在终端中运行以下命令启动服务：
   ```bash
   docker-compose up -d
   ```
3. 打开浏览器访问 `http://localhost:8096`