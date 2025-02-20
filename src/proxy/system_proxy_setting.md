# Configure System Proxy

#### Edit a Script

```bash
sudo vim  /etc/profile.d/proxy.sh
```

```sh
# set proxy config via profie.d - should apply for all users
export http_proxy="http://10.10.1.10:8080/"
export https_proxy="http://10.10.1.10:8080/"
export ftp_proxy="http://10.10.1.10:8080/"
export no_proxy="127.0.0.1,localhost"
# For curl
export HTTP_PROXY="http://10.10.1.10:8080/"
export HTTPS_PROXY="http://10.10.1.10:8080/"
export FTP_PROXY="http://10.10.1.10:8080/"
export NO_PROXY="127.0.0.1,localhost"
```

#### Add Exec Permission

```bash
sudo chmod +x  /etc/profile.d/proxy.sh
```

#### Apply Setting

```bash
source /etc/profile.d/proxy.sh
```
#### Confirm ENV

```bash
env | grep -i proxy
```