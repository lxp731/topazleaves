# Wechat Install

#### Install Deepin Repository

```bash
wget -O- https://deepin-wine.i-m.dev/setup.sh | sh
```

#### Install Wechat

```bash
sudo apt install com.qq.weixin.deepin
```

#### 解决统信应用解压失败的问题

```bash
sudo vim /opt/deepinwine/tools/run_v4.sh

# find this line
7z x "$APPDIR/$APPTAR" -o"$1"
# update it following line
7z x "$APPDIR/$APPTAR" -o"$1" || true
```

#### Remove Wechat

```bash
sudo apt remove com.qq.weixin.deepin
```

#### Delete Deepin Repository

```bash
sudo rm /etc/apt/sources.d.list/deepin-wine.i-m.dev.list
```