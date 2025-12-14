# Modify .user-dirs.dirs

## Update the Contents

```bash
XDG_DESKTOP_DIR="$HOME/desktop"
XDG_DOCUMENTS_DIR="$HOME/document"
XDG_DOWNLOAD_DIR="$HOME/download"
XDG_MUSIC_DIR="$HOME/music"
XDG_PICTURES_DIR="$HOME/picture"
XDG_PUBLICSHARE_DIR="$HOME/public"
XDG_TEMPLATES_DIR="$HOME/template"
XDG_VIDEOS_DIR="$HOME/video"
```

## Update the Folder Names of Home Path

```bash
mv 桌面/ desktop
mv 文档/ document
mv 下载/ download
mv 音乐/ music
mv 图片/ picture
mv 公共/ public
mv 模板/ template
mv 视频/ video
```

## Reboot

```bash
reboot
```