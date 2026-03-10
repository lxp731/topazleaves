# Linux SSH 双因素认证配置指南

本文介绍如何在 Linux 系统上为 SSH 登录配置双因素认证（2FA），使用 Google Authenticator 增强系统安全性。

## 准备工作

### 1. 安装手机应用
在手机上安装以下任意一款验证器应用：
- Google Authenticator
- Microsoft Authenticator
- Authy

### 2. 安装系统组件
根据你的 Linux 发行版安装相应软件包：

**Debian/Ubuntu:**
```bash
sudo apt-get install libpam-google-authenticator -y
```

**CentOS/RHEL:**
```bash
sudo yum install epel-release -y
sudo yum install libpam-google-authenticator -y
```

**Arch Linux:**
```bash
sudo pacman -S libpam-google-authenticator
```

## 配置 Google Authenticator

### 1. 运行配置向导
```bash
google-authenticator
```

### 2. 配置选项说明

#### 选项 1：基于时间的令牌
```
Do you want authentication tokens to be time-based (y/n) y
```
选择 `y`，使用基于时间的动态令牌。

#### 选项 2：扫描二维码
程序会显示一个二维码，用手机验证器应用扫描它。

#### 选项 3：跳过初始验证
```
Enter code from app (-1 to skip): -1
```
输入 `-1` 跳过初始验证。

#### 选项 4：保存配置文件
```
Do you want me to update your "/home/用户名/.google_authenticator" file? (y/n) y
```
选择 `y`，保存配置文件。**重要**：这个文件包含你的密钥，如果丢失令牌可以用它紧急登录。

#### 选项 5：防止令牌重用
```
Do you want to disallow multiple uses of the same authentication token? (y/n) y
```
选择 `y`，防止同一个令牌被多次使用，增加安全性。

#### 选项 6：时间窗口设置
```
Do you want to increase the time window? (y/n) n
```
选择 `n`，使用默认的 3 个令牌窗口（前后各 1 个，共 30 秒时间容差）。

#### 选项 7：启用频率限制
```
Do you want to enable rate-limiting? (y/n) y
```
选择 `y`，启用频率限制，防止暴力破解。

## 修改系统配置

### 1. 配置 PAM 认证
编辑 SSH 的 PAM 配置文件：
```bash
sudo vim /etc/pam.d/sshd
```

在文件开头添加：
```bash
auth required pam_google_authenticator.so
```

### 2. 配置 SSH 服务
编辑 SSH 服务配置文件：
```bash
sudo vim /etc/ssh/sshd_config
```

修改以下配置项：

#### 启用质询响应认证
```bash
ChallengeResponseAuthentication yes
```
**说明**：启用质询-响应认证机制，允许服务器向客户端发送验证码请求。

#### 启用 PAM 支持
```bash
UsePAM yes
```
**说明**：必须启用 PAM 支持，否则质询无法传递。

#### 启用键盘交互认证
```bash
KbdInteractiveAuthentication yes
```
**说明**：启用键盘交互认证界面。

#### 设置认证方法
```bash
AuthenticationMethods publickey password keyboard-interactive
```
**说明**：设置认证顺序：先公钥，再密码，最后验证码。

### 3. 完整配置示例
```bash
UsePAM yes
KbdInteractiveAuthentication yes
ChallengeResponseAuthentication yes
PubkeyAuthentication yes
PasswordAuthentication yes
AuthenticationMethods publickey password keyboard-interactive
#PermitEmptyPasswords no
```

## 重启 SSH 服务

### 1. 测试配置语法
```bash
sudo sshd -t
```
如果没有错误输出，说明配置语法正确。

### 2. 重启 SSH 服务
```bash
sudo systemctl restart sshd
```

## 测试登录

现在尝试使用 SSH 登录，系统会要求：
1. 输入密码
2. 输入 Google Authenticator 生成的 6 位验证码

## 注意事项

### 1. 备份紧急代码
`.google_authenticator` 文件中的紧急代码非常重要，建议安全备份。

### 2. 时间同步
确保服务器和手机的时间同步，否则验证码可能失效。

### 3. 多用户配置
每个需要 2FA 的用户都需要单独运行 `google-authenticator` 命令。

### 4. 故障排除
如果无法登录，可以：
- 检查系统时间是否正确
- 查看 `/var/log/auth.log` 获取详细错误信息
- 暂时禁用 2FA 进行测试

## 安全建议

1. **结合公钥认证**：建议同时使用 SSH 公钥认证，提供多层保护
2. **限制登录尝试**：配置 fail2ban 防止暴力破解
3. **定期备份**：定期备份验证器配置
4. **备用方案**：准备备用登录方式，防止验证器丢失

通过配置双因素认证，可以显著提高 SSH 登录的安全性，防止密码泄露导致的未授权访问。