# VSCODE 远程连接主机

#### 设置免密登录

```bash
ssh-keygen -t rsa

ssh-copy-id -i ~/.ssh/id_rsa.pub root@192.168.1.1
```

#### 添加config配置文件

```bash
vim ~/.ssh/config

# 添加以下内容
Host ali
  HostName 192.168.1.1
  User root
  IdentityFile ~/.ssh/id_rsa
  Port 22
```

#### 下载VSCode插件{ignore=ture}

点击VSCode左下角图标，形似“><”，点击会自动安装。