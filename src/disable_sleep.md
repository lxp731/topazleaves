# Disable Hibernate When Close Laptop

#### Edit Conf File
```bash
sudo gedit /etc/systemd/logind.conf
```

#### Modify Line

```bash
HandleLidSwitch=ignore
```

#### Restart Service

```bash
sudo systemctl restart systemd-logind
```