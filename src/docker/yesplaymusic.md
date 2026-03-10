# YesPlayMusic：高颜值的自托管音乐播放器

## 项目介绍

YesPlayMusic 是一款基于 Vue.js 开发的现代化音乐播放器，以其精美的用户界面和流畅的交互体验而闻名。虽然它主要面向网易云音乐用户，但其设计和功能理念使其成为自托管音乐服务的优秀选择。

**GitHub 仓库**：[https://github.com/qier222/YesPlayMusic](https://github.com/qier222/YesPlayMusic)

## 特色功能

- **🎨 精美界面**：现代化的 Material Design 设计风格
- **🚀 快速响应**：基于 Vue 3 + Vite 构建，加载速度快
- **🎵 完整功能**：播放列表、歌词显示、音质选择等
- **📱 响应式设计**：完美适配桌面和移动设备
- **🔒 隐私保护**：自托管确保音乐数据安全

## Docker 一键部署

### 基础部署配置

```yaml
version: '3.9'

services:
  yesplaymusic:
    image: fogforest/yesplaymusic  # 社区维护的 Docker 镜像
    container_name: yesplaymusic   # 容器名称
    restart: always                # 自动重启策略
    ports:
      - "7900:80"                  # 主机端口:容器端口
```

### 部署步骤

1. 创建 `docker-compose.yml` 文件，复制上述配置
2. 运行部署命令：
   ```bash
   docker-compose up -d
   ```
3. 访问 `http://localhost:7900` 即可使用

### 进阶配置（可选）

如果你需要更复杂的配置，可以参考以下示例：

```yaml
version: '3.9'

services:
  yesplaymusic:
    image: fogforest/yesplaymusic
    container_name: yesplaymusic
    restart: always
    ports:
      - "7900:80"
    environment:
      - NODE_ENV=production
    volumes:
      - ./config:/app/config  # 挂载配置文件目录
      - ./cache:/app/cache    # 挂载缓存目录
    networks:
      - music-network

networks:
  music-network:
    driver: bridge
```

## 使用指南

### 首次使用
1. 部署完成后，打开浏览器访问对应地址
2. 界面会自动加载，你可以开始探索各项功能
3. 如果需要登录网易云账号，可以在设置中配置

### 功能亮点
- **智能推荐**：根据你的听歌习惯推荐音乐
- **歌词同步**：精确到字的歌词显示
- **多主题支持**：多种配色方案可选
- **键盘快捷键**：提升操作效率

## 注意事项

1. **版权声明**：YesPlayMusic 是一个第三方客户端，使用时请遵守相关音乐平台的用户协议
2. **数据来源**：项目依赖网易云音乐的 API，功能可能随 API 变化而调整
3. **社区维护**：Docker 镜像由社区维护，建议定期更新到最新版本

## 故障排除

如果遇到部署问题，可以尝试：

1. 检查端口是否被占用：`sudo lsof -i :7900`
2. 查看容器日志：`docker logs yesplaymusic`
3. 确保 Docker 服务正常运行：`sudo systemctl status docker`

## 结语

YesPlayMusic 不仅是一个音乐播放器，更是前端技术实践的优秀案例。它的代码结构清晰，设计理念先进，非常适合前端开发者学习和参考。

无论你是想搭建私人音乐服务，还是单纯欣赏优秀的前端项目，YesPlayMusic 都值得一试。部署简单，体验出色，何乐而不为呢？

---

**更新提示**：建议定期关注 GitHub 仓库的 Releases 页面，获取最新版本和功能更新。Docker 镜像也会相应更新，记得使用 `docker-compose pull` 拉取最新镜像。