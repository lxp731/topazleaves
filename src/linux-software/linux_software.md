# Linux 实用软件合集

本文收集了在 Linux 系统中常用的实用软件，涵盖开发工具、系统工具和日常应用。

## 软件分类

### 中文输入法
- [Google 拼音输入法](./google_input_install.md)
  
  最佳的中文输入解决方案。虽然搜狗输入法也可用，但它可能导致系统变慢，特别是在重启时。

### 社交应用
- [微信](./wechat_install.md)
  
  基于 Wine 的微信客户端，可以在 Ubuntu 上安装使用。尽管存在一些缺陷，但对于中文用户来说是个不错的选择。

### 网络工具
- [Clash Verge](./clash_verge_install.md)
  
  Clash for Windows 之后，推荐使用 Clash Verge 作为代理客户端。

### 终端工具
- [Tmux](./tmux.md)
  
  强大的终端分屏工具，提高命令行工作效率。

### 开发工具
- [Docker](./docker_install.md)
  
  容器化部署工具，现代应用开发的标配。

- [PyCharm](./pycharm_crack.md)
  
  Python 集成开发环境，专业版功能更强大。

### 编辑器增强
- [VIM 系统剪贴板支持](./vim_support_system_clipboard.md)
  
  让 Vim 编辑器支持系统剪贴板，提升复制粘贴效率。

## 一键安装常用工具

```bash
sudo apt install -y vim-gtk3 highlight bat ripgrep tree net-tools nmap
```

### 工具说明
- **vim-gtk3**: 支持系统剪贴板的 Vim 版本
- **highlight**: 代码语法高亮工具
- **bat**: 更好的 cat 命令替代品，支持语法高亮
- **ripgrep**: 快速的文件搜索工具
- **tree**: 以树状结构显示目录
- **net-tools**: 网络工具集（ifconfig、netstat 等）
- **nmap**: 网络扫描和安全审计工具

## 安装建议

### 1. 按需安装
根据实际需求选择安装，不必一次性安装所有软件。

### 2. 版本管理
对于开发工具，建议使用版本管理器：
- **nvm**: Node.js 版本管理
- **pyenv**: Python 版本管理
- **rvm/rbenv**: Ruby 版本管理

### 3. 包管理器选择
- **Ubuntu/Debian**: apt
- **CentOS/RHEL**: yum/dnf
- **Arch Linux**: pacman/yay
- **macOS**: Homebrew

## 软件更新

定期更新软件包以确保安全性和稳定性：

```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade

# Arch Linux
sudo pacman -Syu

# 使用 flatpak/snap
flatpak update
snap refresh
```

## 卸载软件

如果不再需要某个软件，可以安全卸载：

```bash
# 查看已安装的软件
apt list --installed | grep 软件名

# 卸载软件
sudo apt remove 软件名

# 同时删除配置文件
sudo apt purge 软件名
```

## 软件推荐原则

本合集推荐的软件基于以下原则：
1. **开源优先**: 优先选择开源软件
2. **社区活跃**: 选择有活跃社区维护的软件
3. **文档完善**: 有完整的使用文档
4. **兼容性好**: 在主流 Linux 发行版上运行良好
5. **性能优秀**: 资源占用合理，运行稳定

## 贡献指南

如果你有好的软件推荐，欢迎：
1. 测试软件在不同发行版上的兼容性
2. 提供详细的安装和使用说明
3. 分享使用技巧和最佳实践
4. 报告软件存在的问题和解决方案

通过合理选择和配置软件，可以让 Linux 系统更加高效和易用。
