# Control Docker Proxy Up/Down

```bash
sudo vim docker_proxy_start_stop.sh
sudo chmod +x docker_proxy_start_stop.sh
```

```sh
#!/bin/bash

# Define paths
CONF_FILE="/etc/systemd/system/docker.service.d/http-proxy.conf"
BACKUP_CONF_FILE="/etc/systemd/system/docker.service.d/http-proxy.conf.bak"

# Function to enable proxy
enable_proxy() {
    # Check if the current configuration file is already the backup
    if [ -f "$CONF_FILE" ] && cmp --silent "$CONF_FILE" "$BACKUP_CONF_FILE"; then
        echo "Proxy configuration is already enabled."
    else
        # Move the backup configuration to the active configuration file
        sudo mv "$BACKUP_CONF_FILE" "$CONF_FILE"
        
        # Reload systemd manager configuration
        sudo systemctl daemon-reload
        
        # Restart Docker service
        sudo systemctl restart docker.service
        echo "Proxy configuration enabled."
    fi
}

# Function to disable proxy
disable_proxy() {
    # Check if the current configuration file is the original
    if [ -f "$CONF_FILE" ] && ! cmp --silent "$CONF_FILE" "$BACKUP_CONF_FILE"; then
        # Move the active configuration file to the backup
        sudo mv "$CONF_FILE" "$BACKUP_CONF_FILE"
        
        # Reload systemd manager configuration
        sudo systemctl daemon-reload
        
        # Restart Docker service
        sudo systemctl restart docker.service
        echo "Proxy configuration disabled."
    else
        echo "Proxy configuration is already disabled."
    fi
}

# Check the command argument
case $1 in
    start)
        enable_proxy
        ;;
    stop)
        disable_proxy
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        exit 1
        ;;
esac

exit 0
```