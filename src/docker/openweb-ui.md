# OpenWeb-UI：本地 AI 对话界面的完美解决方案

## 项目简介

OpenWeb-UI 是一个开源的 Web 界面，专门为本地部署的 Ollama 大语言模型设计。它提供了一个美观、易用的聊天界面，让你能够在浏览器中与本地 AI 模型进行自然对话。

**官方网站**：[https://docs.openwebui.com/](https://docs.openwebui.com/)

## 核心功能

- **直观的聊天界面**：类似 ChatGPT 的用户体验
- **会话管理**：支持创建、保存和管理多个对话会话
- **历史记录**：完整的对话历史保存和检索功能
- **多模型支持**：可以连接多个不同的 Ollama 模型
- **本地部署**：所有数据都保存在本地，确保隐私安全

## Docker 部署指南

### 准备工作
1. 确保已安装 Docker 和 Docker Compose
2. 确保 Ollama 服务已正确配置（参考：[Ollama 服务发现配置](../ollama_services_found.md)）

### docker-compose.yml 配置

```yaml
version: '3'

services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    container_name: open-webui
    ports:
      - "3000:8080"  # 将容器的 8080 端口映射到主机的 3000 端口
    volumes:
      - open-webui:/app/backend/data  # 数据持久化存储
    # restart: always  # 取消注释以启用自动重启
    extra_hosts:
      - "host.docker.internal:host-gateway"  # 允许容器访问主机服务

volumes:
  open-webui:  # 定义数据卷
```

### 部署步骤

1. 创建 `docker-compose.yml` 文件，将上述配置复制进去
2. 在终端中运行以下命令启动服务：
   ```bash
   docker-compose up -d
   ```
3. 打开浏览器访问 `http://localhost:3000`

## 重要提示

⚠️ **关键配置**：在部署 OpenWeb-UI 之前，必须正确配置 [Ollama 服务发现](../ollama_services_found.md)，否则 OpenWeb-UI 将无法识别本地安装的 Ollama 模型。

## 使用体验

部署完成后，你可以在浏览器中享受与本地 AI 模型的流畅对话体验。界面支持暗色/亮色主题切换，响应式设计确保在手机和电脑上都有良好的使用体验。

OpenWeb-UI 的社区非常活跃，定期更新功能和修复问题。如果你在使用过程中遇到任何问题，可以在项目的 GitHub 仓库中提交 issue 或参与讨论。

## 进阶配置

对于高级用户，OpenWeb-UI 还支持：
- 自定义主题和界面样式
- API 密钥管理
- 多用户支持
- 模型参数调优

这些功能可以通过环境变量或配置文件进行设置，具体参考官方文档。

---

**小贴士**：如果你有多个不同的 AI 模型（如 Llama、Mistral、Gemma 等），可以在 OpenWeb-UI 中轻松切换，体验不同模型的对话风格和能力差异。
