# kns Install (Locking Namespace)

#### Install fzf

1. Source Code Install(Recommend)

```bash
# Clone the fzf repository
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf

# Run the install script
~/.fzf/install
```

2. apt install

```bash
sudo apt install fzf
```

#### Edit kns Script

```bash
vim kns
```

```shell
#!/bin/sh
# quick Kubernetes Namespace Switcher
# ISC Blendle, 2017

set -eu

if [ ! -x "$(which kubectl 2>/dev/null)" ]; then
  echo "please install: kubectl (https://kubernetes.io/docs/tasks/kubectl/install/)" >&2
  exit 1
fi
if [ ! -x "$(which fzf 2>/dev/null)" ]; then
  echo "please install: fzf (https://github.com/junegunn/fzf)" >&2
  exit 1
fi

current="$(kubectl config current-context)"
namespace="$(kubectl config view -o jsonpath="{.contexts[?(@.name == '${current}')].context.namespace}")"
if [ -z "$namespace" ]; then
  namespace="default"
fi

selected=$( (kubectl get namespaces -o=jsonpath="{.items[?(@.metadata.name!='$namespace')].metadata.name}" | xargs -n 1; echo $namespace ) | fzf -0 -1 --tac -q "${1:-""}" --prompt "$current> ")
if [ -n "$selected" ]; then
  kubectl config set-context "$current" "--namespace=$selected" >/dev/null
  echo "Set context namespace to \"$selected\""
fi
```

#### Add Exec Permission

```bash
chmod +x kns
sudo mv kns /usr/local/bin/kns
```
