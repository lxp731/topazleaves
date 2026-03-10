# 系统代理配置指南

本文介绍如何在 Linux 系统中配置全局代理设置，适用于所有用户和应用程序。

## 创建代理配置脚本

### 1. 编辑代理脚本
```bash
sudo vim /etc/profile.d/proxy.sh
```

### 2. 脚本内容
```sh
#!/bin/bash

# 设置代理函数
set_proxy() {
    # 为所有用户设置代理配置（通过 profile.d）
    
    # 小写环境变量（适用于大多数工具）
    export http_proxy="http://127.0.0.1:7890/"
    export https_proxy="http://127.0.0.1:7890/"
    export ftp_proxy="http://127.0.0.1:7890/"
    export no_proxy="127.0.0.1,localhost"
    
    # 大写环境变量（适用于 curl 等工具）
    export HTTP_PROXY="http://127.0.0.1:7890/"
    export HTTPS_PROXY="http://127.0.0.1:7890/"
    export FTP_PROXY="http://127.0.0.1:7890/"
    export NO_PROXY="127.0.0.1,localhost"
    
    # 设置 socks 代理（如果需要）
    export socks_proxy="socks5://127.0.0.1:7891/"
    export SOCKS_PROXY="socks5://127.0.0.1:7891/"
    
    # 设置 all_proxy（适用于某些工具）
    export all_proxy="socks5://127.0.0.1:7891/"
    export ALL_PROXY="socks5://127.0.0.1:7891/"
    
    echo "代理已设置。"
}

# 取消代理函数
unset_proxy() {
    # 取消所有代理配置
    
    # 取消小写环境变量
    unset http_proxy
    unset https_proxy
    unset ftp_proxy
    unset no_proxy
    
    # 取消大写环境变量
    unset HTTP_PROXY
    unset HTTPS_PROXY
    unset FTP_PROXY
    unset NO_PROXY
    
    # 取消 socks 代理
    unset socks_proxy
    unset SOCKS_PROXY
    
    # 取消 all_proxy
    unset all_proxy
    unset ALL_PROXY
    
    echo "代理已取消。"
}

# 显示当前代理设置
show_proxy() {
    echo "当前代理设置："
    echo "http_proxy:   ${http_proxy:-未设置}"
    echo "https_proxy:  ${https_proxy:-未设置}"
    echo "HTTP_PROXY:   ${HTTP_PROXY:-未设置}"
    echo "HTTPS_PROXY:  ${HTTPS_PROXY:-未设置}"
    echo "socks_proxy:  ${socks_proxy:-未设置}"
    echo "SOCKS_PROXY:  ${SOCKS_PROXY:-未设置}"
    echo "no_proxy:     ${no_proxy:-未设置}"
}

# 主函数
case $1 in
    set)
        set_proxy
        ;;
    unset)
        unset_proxy
        ;;
    show)
        show_proxy
        ;;
    *)
        echo "使用方法：source $0 {set|unset|show}"
        echo "   set    - 设置代理"
        echo "   unset  - 取消代理"
        echo "   show   - 显示当前代理设置"
        ;;
esac
```

## 设置脚本权限

### 添加执行权限
```bash
sudo chmod +x /etc/profile.d/proxy.sh
```

### 验证权限
```bash
ls -la /etc/profile.d/proxy.sh
# 应该显示：-rwxr-xr-x
```

## 使用代理脚本

### 1. 设置代理
```bash
source /etc/profile.d/proxy.sh set
```

### 2. 取消代理
```bash
source /etc/profile.d/proxy.sh unset
```

### 3. 显示代理状态
```bash
source /etc/profile.d/proxy.sh show
```

### 4. 创建别名方便使用
```bash
# 在 ~/.bashrc 或 ~/.zshrc 中添加
alias proxy-set='source /etc/profile.d/proxy.sh set'
alias proxy-unset='source /etc/profile.d/proxy.sh unset'
alias proxy-show='source /etc/profile.d/proxy.sh show'
```

## 验证代理设置

### 1. 检查环境变量
```bash
env | grep -i proxy
```

### 2. 测试代理连接
```bash
# 测试 HTTP 代理
curl -I http://www.google.com

# 测试 HTTPS 代理
curl -I https://www.google.com

# 使用代理测试
curl --proxy http://127.0.0.1:7890 -I https://www.google.com
```

### 3. 检查 IP 地址
```bash
# 查看当前 IP
curl http://ipinfo.io/ip

# 通过代理查看 IP
curl --proxy http://127.0.0.1:7890 http://ipinfo.io/ip
```

## 代理配置详解

### 1. 代理地址说明
- `127.0.0.1:7890`: 本地 HTTP/HTTPS 代理端口
- `127.0.0.1:7891`: 本地 SOCKS5 代理端口
- 根据你的代理软件调整端口号

### 2. 环境变量说明
| 变量名 | 用途 | 示例 |
|--------|------|------|
| `http_proxy` | HTTP 代理 | `http://127.0.0.1:7890/` |
| `https_proxy` | HTTPS 代理 | `http://127.0.0.1:7890/` |
| `ftp_proxy` | FTP 代理 | `http://127.0.0.1:7890/` |
| `socks_proxy` | SOCKS 代理 | `socks5://127.0.0.1:7891/` |
| `all_proxy` | 通用代理 | `socks5://127.0.0.1:7891/` |
| `no_proxy` | 排除列表 | `127.0.0.1,localhost` |

### 3. no_proxy 配置
```bash
# 常见排除列表
export no_proxy="127.0.0.1,localhost,192.168.0.0/16,10.0.0.0/8,172.16.0.0/12,.internal,.local"
```

## 应用程序特定配置

### 1. APT (Ubuntu/Debian)
```bash
# 创建 APT 代理配置
sudo vim /etc/apt/apt.conf.d/proxy.conf
```

添加内容：
```bash
Acquire::http::Proxy "http://127.0.0.1:7890";
Acquire::https::Proxy "http://127.0.0.1:7890";
```

### 2. Git
```bash
# 设置 Git 代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 取消 Git 代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### 3. npm
```bash
# 设置 npm 代理
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890

# 取消 npm 代理
npm config delete proxy
npm config delete https-proxy
```

### 4. Docker
```bash
# 创建 Docker 代理配置
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo vim /etc/systemd/system/docker.service.d/proxy.conf
```

添加内容：
```ini
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7890"
Environment="HTTPS_PROXY=http://127.0.0.1:7890"
Environment="NO_PROXY=localhost,127.0.0.1"
```

重启 Docker：
```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 高级配置

### 1. 用户特定配置
```bash
# 在 ~/.bashrc 或 ~/.zshrc 中添加个人配置
if [ -f /etc/profile.d/proxy.sh ]; then
    source /etc/profile.d/proxy.sh set
fi
```

### 2. 条件代理
```bash
# 根据网络环境自动设置代理
auto_proxy() {
    if ping -c 1 -W 2 8.8.8.8 > /dev/null 2>&1; then
        # 可以访问外网，不设置代理
        source /etc/profile.d/proxy.sh unset
    else
        # 无法访问外网，设置代理
        source /etc/profile.d/proxy.sh set
    fi
}

# 登录时自动检测
auto_proxy
```

### 3. 代理验证
```bash
# 带认证的代理
export http_proxy="http://username:password@proxy-server:port/"
export https_proxy="http://username:password@proxy-server:port/"
```

## 故障排除

### 问题 1：代理不生效
```bash
# 检查代理服务是否运行
netstat -tlnp | grep 7890

# 检查环境变量
printenv | grep -i proxy

# 测试代理连接
curl -x http://127.0.0.1:7890 http://www.google.com
```

### 问题 2：某些应用不走代理
```bash
# 检查应用的代理配置
# 某些应用需要单独配置代理

# 使用 strace 跟踪
strace -e trace=network application
```

### 问题 3：代理速度慢
```bash
# 测试代理延迟
time curl --proxy http://127.0.0.1:7890 -I https://www.google.com

# 检查代理服务器状态
# 考虑更换代理服务器或调整配置
```

### 问题 4：证书错误
```bash
# 导入代理证书
# 某些 HTTPS 代理需要安装证书

# 临时忽略证书验证（不推荐）
export CURL_CA_BUNDLE=""
```

## 安全注意事项

### 1. 代理认证
```bash
# 不要在脚本中硬编码密码
# 使用环境变量或配置文件
export PROXY_PASSWORD="your_password"
export http_proxy="http://user:${PROXY_PASSWORD}@proxy:port/"
```

### 2. 访问控制
```bash
# 限制代理使用范围
# 只允许特定用户或应用使用代理
```

### 3. 日志记录
```bash
# 记录代理使用情况
# 监控代理流量和访问记录
```

## 替代方案

### 1. 使用 Proxychains
```bash
# 安装
sudo apt install proxychains

# 配置
sudo vim /etc/proxychains.conf

# 使用
proxychains curl http://www.google.com
```

### 2. 使用环境管理器
```bash
# 使用 direnv 管理环境
echo "export http_proxy='http://127.0.0.1:7890'" > .envrc
direnv allow
```

### 3. 使用系统设置
```bash
# GNOME 桌面环境
gsettings set org.gnome.system.proxy mode 'manual'
gsettings set org.gnome.system.proxy.http host '127.0.0.1'
gsettings set org.gnome.system.proxy.http port 7890
```

通过合理配置系统代理，可以方便地管理网络访问，提高工作效率。建议根据实际需求选择合适的代理配置方案。