# Lx Music：洛雪音乐的自托管同步服务与在线播放器

## 项目简介

[洛雪音乐助手（Lx Music）](https://github.com/lyswhut/lx-music-desktop) 是一款广受欢迎的开源音乐播放器。本项目 `lxserver` 是它的增强版自托管同步服务端，内置了一个功能强大的 Web 播放器，让你可以随时随地在浏览器中听歌；同时它也能作为洛雪音乐客户端的数据同步服务器，实现多设备间歌单、收藏的云端同步。它支持多音源聚合搜索、自定义音源脚本，并全面适配 Subsonic 协议。

**GitHub 仓库**：[https://github.com/XCQ0607/lxserver](https://github.com/XCQ0607/lxserver)

## 核心功能

- **🎧 内置 Web 播放器**：现代化 UI、深色模式，浏览器即开即听
- **🔍 多源聚合搜索**：聚合各大音乐平台资源，想听什么搜什么
- **📋 歌单与队列管理**：多平台歌单浏览、拖拽排序、批量管理
- **🎵 完整播放控制**：音质选择、歌词显示、睡眠定时、播放倍速
- **💾 智能缓存**：自动缓存歌词、链接与歌曲，弱网也能流畅播放
- **🎨 主题与歌词卡片**：多套现代化主题，歌词卡片一键生成分享海报
- **🔌 自定义音源**：支持导入自定义源脚本，扩展音乐来源
- **📡 Subsonic 协议**：适配音流、Feishin 等客户端接入播放
- **☁️ 数据同步**：作为洛雪音乐同步服务端，实现多设备歌单与收藏云端同步
- **👥 多用户与权限**：支持多用户、访问密码及细粒度权限控制

## Docker 部署指南

### 准备工作
1. 确保已安装 Docker 和 Docker Compose

### docker-compose.yml 配置

```yaml
services:
  lx-music-web:
    image: docker.io/xcq0607/lxserver:latest
    container_name: lx-music-web
    restart: unless-stopped
    ports:
      - 9527:9527/tcp        # 直连兜底；正式入口 https://mc.home.arpa
    volumes:
      - /path/to/data:/server/data
      - /path/to/logs:/server/logs
      - /path/to/cache:/server/cache
      - /path/to/music:/server/music
    environment:
      - NODE_ENV=production
      # - ENABLE_WEBPLAYER_AUTH=true
      # - WEBPLAYER_PASSWORD=123456
      # - FRONTEND_PASSWORD=654321
      - ADMIN_PATH=/admin
      - PLAYER_PATH=/
```

### 部署步骤

1. 创建 `docker-compose.yml` 文件，将上述配置复制进去（记得将 `/home/runner/containers/anylisten` 替换为你的实际数据目录）
2. 在终端中运行以下命令启动服务：
   ```bash
   docker-compose up -d
   ```
3. 打开浏览器访问 `http://localhost:9527` 即可使用

### 访问说明

- **Web 播放器**：`http://localhost:9527`（默认路径 `/`，可通过 `PLAYER_PATH` 修改）
- **同步管理后台**：`http://localhost:9527/admin`（默认路径 `/admin`，默认密码 `123456`，可通过 `FRONTEND_PASSWORD` 修改）

> **安全提示**：管理后台默认密码为 `123456`，首次部署后请务必修改。若服务暴露在公网，建议取消注释 `ENABLE_WEBPLAYER_AUTH` 与 `WEBPLAYER_PASSWORD`，为播放器加上访问密码。
