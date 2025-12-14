# yt-dlp Usage

## Install yt-dlp

```bash
uv tool install yt-dlp
```

## Usage

1. Download the video, auto select best quality **(Recommended)**

```bash
yt-dlp -f 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4' \
    https://www.youtube.com/watch?v=4-8hXLxWVvE
```

2. Download the video, auto select best quality(Not recommended)

```bash
yt-dlp https://www.youtube.com/watch?v=4-8hXLxWVvE
```
> Replace URL with you will download, It will download the video that format is webm, some videoplayer cannot play it.

3. List all available formats

```bash
yt-dlp -F https://www.youtube.com/watch?v=4-8hXLxWVvE
```

Output example:

```bash
ID  EXT   RESOLUTION FPS CH │  FILESIZE   TBR PROTO │ VCODEC          VBR ACODEC      ABR ASR MORE INFO
─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
232 mp4   1280x720    25    │ ~20.15MiB  820k m3u8  │ avc1.4D401F    820k video only          Untested
136 mp4   1280x720    25    │  11.27MiB  459k https │ avc1.4d401f    459k video only          720p, mp4_dash
609 mp4   1280x720    25    │ ~23.73MiB  966k m3u8  │ vp09.00.31.08  966k video only          Untested
247 webm  1280x720    25    │  10.72MiB  437k https │ vp9            437k video only          720p, webm_dash
398 mp4   1280x720    25    │  11.41MiB  465k https │ av01.0.05M.08  465k video only          720p, mp4_dash
270 mp4   1920x1080   25    │ ~62.58MiB 2548k m3u8  │ avc1.640028   2548k video only          Untested
137 mp4   1920x1080   25    │  40.80MiB 1661k https │ avc1.640028   1661k video only          1080p, mp4_dash
614 mp4   1920x1080   25    │ ~55.61MiB 2265k m3u8  │ vp09.00.40.08 2265k video only          Untested
248 webm  1920x1080   25    │  22.82MiB  929k https │ vp9            929k video only          1080p, webm_dash
399 mp4   1920x1080   25    │  20.32MiB  827k https │ av01.0.08M.08  827k video only          1080p, mp4_dash
```

Select the you like to download, only mark the ID

```bash
yt-dlp -f 399 https://www.youtube.com/watch?v=4-8hXLxWVvE
```

4. Rename the file

```bash
yt-dlp -o "my_video.mp4"  https://www.youtube.com/watch?v=4-8hXLxWVvE
```

5. Setting the proxy

```bash
yt-dlp --proxy "http://127.0.0.1:7890"  https://www.youtube.com/watch?v=4-8hXLxWVvE
```

6. Download the subtitles(If exists)

```bash
yt-dlp --write-sub --sub-lang en https://www.youtube.com/watch?v=4-8hXLxWVvE
```