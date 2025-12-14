# VS-Code Control Remote Hosts

## Configure 

```bash
ssh-keygen -t rsa

ssh-copy-id -i ~/.ssh/id_rsa.pub root@192.168.1.1
```

## Add ssh config

```bash
vim ~/.ssh/config

# 添加以下内容
Host ali
  HostName 192.168.1.1
  User root
  IdentityFile ~/.ssh/id_rsa
  Port 22
```

## Install VS-Code Plugin

点击VSCode左下角图标，形似“><”，点击会自动安装。