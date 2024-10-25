# Wechat Install

#### 安装 Deepin Repository

```bash
wget -O- https://deepin-wine.i-m.dev/setup.sh | sh
```

#### 安装微信

```bash
sudo apt install com.qq.weixin.deepin
```

#### 解决统信应用解压失败的问题

```bash
sudo vim /opt/deepinwine/tools/run_v4.sh

# 找到下面这一行
7z x "$APPDIR/$APPTAR" -o"$1"
# 替换为
7z x "$APPDIR/$APPTAR" -o"$1" || true
```

#### 卸载微信{ignore=ture}

```bash
sudo apt remove com.qq.weixin.deepin
```

#### 删除 Deepin Repository{ignore=ture}

```bash
sudo rm /etc/apt/sources.d.list/deepin-wine.i-m.dev.list
```