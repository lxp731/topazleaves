# Vim Tips

### Add Contents in Lines Head

1. In normal mode, press `Ctrl-v` into visual-block mode.
2. Select the lines you want to add contents, press `I` to enter insert mode.
3. Edit the contents, press `Esc` to exit insert mode, and else lines will be added automatically.

### Add Contents in Lines Tail

1. In normal mode, press `g` and `v`, that will help us to select all contents in the file.
2. Then press `$` to jump to the end of the line. Press `A` to enter insert mode.
3. Edit the contents, press `Esc` to exit insert mode, and else lines will be added automatically.

### Vim Record and Playback

1. In normal mode, press `q` and `a` to start recording.(a means the name of the recording, you can use any letter)
2. Then press `i` to enter insert mode, and edit the contents.
3. Press `Esc` to exit insert mode, and press `q` to stop recording.
4. In normal mode, press `@` and `a` to playback the recording.

> Note: When you ending the recording, ensure you cursor is at the head of the next line. Certainly, you can use `10@a` to playback the recording 10 times.

### Force Save File

Sometimes, you may edit a file in vim, but you don't use `sudo`. However, you need not to edit it again. You can use fllowing command to save the file:

```bash
:w !sudo tee %
```