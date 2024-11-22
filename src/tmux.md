# Tmux

```bash
### tmux.conf

# system setting
set -s escape-time 0
set -g history-limit 10000
set -g default-terminal "screen-256color"

# rebind prefix key
unbind C-b
set -g prefix 'C-d'
reload configuration
bind s source-file ~/.tmux.conf \; display '~/.tmux.conf Reloaded!'

# windows behaver
set -g base-index 1
setw -g pane-base-index 1
set -g renumber-windows on
setw -g automatic-rename on

# display options
set -g set-titles on
set -g display-panes-time 2000
set -g display-time 2000
#set -g status-interval 1

# window navigation
unbind n
unbind p
unbind x
bind -n C-o previous-window
bind -n C-p next-window
bind -n C-n new-window -c "#{pane_current_path}"
bind -n C-q kill-pane

# split windows
unbind %
unbind \"
bind l split-window -h -c "#{pane_current_path}"
bind k split-window -v -c "#{pane_current_path}"
bind h split-window -hb -c "#{pane_current_path}"
bind j split-window -vb -c "#{pane_current_path}"

# windows size adjusting
bind -n M-f resize-pane -Z
bind -n M-j resize-pane -U 5
bind -n M-k resize-pane -D 5
bind -n M-h resize-pane -L 5
bind -n M-l resize-pane -R 5

# cursor-moving setting
unbind o
unbind \;
bind -T root C-Left select-pane -L
bind -T root C-Right select-pane -R
bind -T root C-Up select-pane -U
bind -T root C-Down select-pane -D
```
