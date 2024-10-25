# 关闭盖子禁用休眠

#### 编辑配置文件
```bash
sudo gedit /etc/systemd/logind.conf
```

#### 修改这一行的值

```bash
HandleLidSwitch=ignore
```

#### 重启服务

```bash
sudo systemctl restart systemd-logind
```