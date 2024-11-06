# Switch Node Version

```bash
sudo vim hexo_start_stop.sh
sudo chmod +x hexo_start_stop.sh
```

```sh
#!/bin/bash

# 检查参数
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 start|stop"
    exit 1
fi

# 定义变量
NODE_V12_DIR="/home/knight/node/node-v12/bin"
NODE_V20_DIR="/home/knight/node/node-v20/bin"
NODE_BIN="/usr/bin/node"
NODE_LOCAL_BIN="/usr/local/bin/node"
NPM_BIN="/usr/bin/npm"
NPM_LOCAL_BIN="/usr/local/bin/npm"
NPX_BIN="/usr/bin/npx"
NPX_LOCAL_BIN="/usr/local/bin/npx"
# HEXO_LOCAL_BIN="/usr/local/bin/hexo"

# 根据参数执行相应的操作
case "$1" in
    start)
        # 更新符号链接到 Node v12
        sudo ln -sf "$NODE_V12_DIR/node" "$NODE_BIN"
        sudo ln -sf "$NODE_V12_DIR/node" "$NODE_LOCAL_BIN"
        sudo ln -sf "$NODE_V12_DIR/npm" "$NPM_BIN"
        sudo ln -sf "$NODE_V12_DIR/npm" "$NPM_LOCAL_BIN"
        sudo ln -sf "$NODE_V12_DIR/npx" "$NPX_BIN"
        sudo ln -sf "$NODE_V12_DIR/npx" "$NPX_LOCAL_BIN"
        # sudo ln -sf "$NODE_V12_DIR/hexo" "$HEXO_LOCAL_BIN"
        echo "Node, NPM, and NPX links updated to Node v12."
        ;;
    stop)
        # 更新符号链接到 Node v20
        sudo ln -sf "$NODE_V20_DIR/node" "$NODE_BIN"
        sudo ln -sf "$NODE_V20_DIR/node" "$NODE_LOCAL_BIN"
        sudo ln -sf "$NODE_V20_DIR/npm" "$NPM_BIN"
        sudo ln -sf "$NODE_V20_DIR/npm" "$NPM_LOCAL_BIN"
        sudo ln -sf "$NODE_V20_DIR/npx" "$NPX_BIN"
        sudo ln -sf "$NODE_V20_DIR/npx" "$NPX_LOCAL_BIN"
        # sudo rm -rf "$HEXO_LOCAL_BIN"
        echo "Node, NPM, and NPX links updated to Node v20."
        ;;
    *)
        echo "Invalid argument. Usage: $0 start|stop"
        exit 1
        ;;
esac

exit 0
```