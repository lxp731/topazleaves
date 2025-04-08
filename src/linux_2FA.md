# Linux 2FA Authentication

## Prepare

1. Install `Google Authenticator` or `Microsoft Authenticator` in your telephone.

2. Install `libpam-google-authenticator` in your Linux.

For Debian/Ubuntu:

```bash
sudo apt-get install libpam-google-authenticator -y
```

For CentOS/RHEL:

```bash
sudo yum install epel-release -y
sudo yum install libpam-google-authenticator -y
```

##  Configure

1. Run `google-authenticator` in your Linux.

```bash
google-authenticator
```

2. Configure the settings.

* Do you want authentication tokens to be time-based (y/n)  **y**

* Then scan the QR code into your phone:

* Enter code from app (-1 to skip):  **-1**

* Do you want me to update your "/home/auther/.google_authenticator" file? (y/n) y

> **In this file you will find the secret key for your authenticator. When your tokens are lost, you can use these token to login in emergency.**

* Do you want to disallow multiple uses of the same authentication
token? This restricts you to one login about every 30s, but it increases
your chances to notice or even prevent man-in-the-middle attacks (y/n) **y**

> 您是否要禁止多次使用同一个身份验证令牌？这会限制您每 30 秒登录一次，但这会增加您注意到甚至阻止中间人攻击的机会 (y/n)

* By default, a new token is generated every 30 seconds by the mobile app.
In order to compensate for possible time-skew between the client and the server,
we allow an extra token before and after the current time. This allows for a
time skew of up to 30 seconds between authentication server and client. If you
experience problems with poor time synchronization, you can increase the window
from its default size of 3 permitted codes (one previous code, the current
code, the next code) to 17 permitted codes (the 8 previous codes, the current
code, and the 8 next codes). This will permit for a time skew of up to 4 minutes
between client and server.
Do you want to do so? (y/n) **n**

> 默认情况下，移动应用程序每 30 秒生成一个新令牌。
为了补偿客户端和服务器之间可能出现的时间偏差，
我们允许在当前时间之前和之后生成一个额外的令牌。这允许身份验证服务器和客户端之间的时间偏差最多为 30 秒。如果您遇到时间同步不佳的问题，您可以将窗口从默认的 3 个允许代码（一个前一个代码、当前代码、下一个代码）增加到 17 个允许代码（8 个前一个代码、当前代码和 8 个下一个代码）。这将允许客户端和服务器之间的时间偏差最多为 4 分钟。
你想这样做吗？（是/否）

* If the computer that you are logging into isn't hardened against brute-force
login attempts, you can enable rate-limiting for the authentication module.
By default, this limits attackers to no more than 3 login attempts every 30s.
Do you want to enable rate-limiting? (y/n) **y**

> 如果您登录的计算机没有针对暴力登录尝试进行强化，您可以为身份验证模块启用速率限制。
默认情况下，这会将攻击者的登录尝试次数限制为每 30 秒不超过 3 次。
是否要启用速率限制？（是/否）

## Modify the configuration file

1. Edit the configuration file of PAM, enable 2FA.

```bash
sudo vim /etc/pam.d/sshd
```

Add the following lines to the top of the file.

```bash
auth required pam_google_authenticator.so
```

2. Edit the configuration file of SSH, enable 2FA.

```bash
sudo vim /etc/ssh/sshd_config
```

* ChallengeResponseAuthentication

```bash
ChallengeResponseAuthentication yes
```

> ChallengeResponseAuthentication 是 SSH 服务端（sshd_config）的一个配置选项，用于控制是否启用 质询-响应认证（Challenge-Response Authentication） 机制。
它允许服务器向客户端发送一个或多个“质询”（例如文本提示、验证码请求等），客户端需正确响应才能完成认证。

* UsePAM

```bash
UsePAM yes
```

> 若 ChallengeResponseAuthentication yes，必须同时启用 UsePAM yes，否则质询无法通过 PAM 模块传递。

* KbdInteractiveAuthentication

```bash
KbdInteractiveAuthentication yes
```

> KbdInteractiveAuthentication：控制是否启用键盘交互认证（UI 交互层）。

* AuthenticationMethods

```bash
AuthenticationMethods password keyboard-interactive
```

> 使用密码和验证码的方式进行登陆

3. Config overview

```bash
UsePAM yes
KbdInteractiveAuthentication yes
ChallengeResponseAuthentication yes
PubkeyAuthentication yes
PasswordAuthentication yes
AuthenticationMethods password keyboard-interactive
#PermitEmptyPasswords no
```

## Restart SSH

```bash
sudo sshd -t 
sudo systemctl restart sshd
```