# Configure System Proxy

## Edit a Script

```bash
sudo vim  /etc/profile.d/proxy.sh
```

```sh
#!/bin/bash

set_proxy() {
    # set proxy config via profile.d - should apply for all users
    export http_proxy="http://127.0.0.1:7890/"
    export https_proxy="http://127.0.0.1:7890/"
    export ftp_proxy="http://127.0.0.1:7890/"
    export no_proxy="127.0.0.1,localhost"
    # For curl
    export HTTP_PROXY="http://127.0.0.1:7890/"
    export HTTPS_PROXY="http://127.0.0.1:7890/"
    export FTP_PROXY="http://127.0.0.1:7890/"
    export NO_PROXY="127.0.0.1,localhost"
    echo "Proxy has been set."
}

unset_proxy() {
    # unset proxy config
    unset http_proxy
    unset https_proxy
    unset ftp_proxy
    unset no_proxy
    # For curl
    unset HTTP_PROXY
    unset HTTPS_PROXY
    unset FTP_PROXY
    unset NO_PROXY
    echo "Proxy has been unset."
}

case $1 in
    set)
        set_proxy
        ;;
    unset)
        unset_proxy
        ;;
    *)
        echo "Usage: source $0 {set|unset}"
        ;;
esac
```

## Add Exec Permission

```bash
sudo chmod +x  /etc/profile.d/proxy.sh
```

## Apply Setting

```bash
source /etc/profile.d/proxy.sh
```
## Confirm ENV

```bash
env | grep -i proxy
```