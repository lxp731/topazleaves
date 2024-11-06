# Push Docker Images to Private Registry

> Tips：When install images, you need open the proxy, but you must close it before push.

### Extract Images Name to File

From the Helm's values.yaml, extract the images name and tag to images.tmp.

**Usage：get_images.sh values-nginx.yaml**

```bash
#!/bin/bash
# **********************************************************
# * Author        : Burgess Leo
# * Email         : liuxp731@qq.com
# * Create time   : 2024-09-13 16:06
# * Filename      : get_images.sh
# * Description   : Extracts Docker image names and tags from a YAML file and writes them to images.tmp
# **********************************************************

# 检查是否传入文件名作为参数
if [ "$#" -ne 1 ]; then
  echo "用法: $0 <values-nginx.yaml>"
  exit 1
fi

# 从命令行参数获取文件名
input_file="$1"

# 清空或创建 images.tmp 文件
> images.tmp

while read -r line; do
  if [[ $line == *"repository:"* ]]; then
    repository=$(echo $line | cut -d':' -f2 | xargs)
  elif [[ $line == *"tag:"* ]]; then
    tag=$(echo $line | cut -d':' -f2 | xargs)
    # 将结果写入 images.tmp 文件
    echo "$repository:$tag" >> images.tmp
  fi
done < "$input_file"
```

### Pull Docker Images

Install all dcoker images in images.tmp file, one by one. If you have else docker images_list file, you can use it instead, just confirm every lines only has one docker image name.

**Usage：pull_images.sh images.tmp**

```bash
#!/bin/bash
# **********************************************************
# * Author        : Burgess Leo
# * Email         : liuxp731@qq.com
# * Create time   : 2024-09-13 16:34
# * Filename      : pull_images.sh
# * Description   : Pull images from Internet
# **********************************************************

# 检查是否传入文件名作为参数
if [ "$#" -ne 1 ]; then
  echo "用法: $0 <images.tmp>"
  exit 1
fi

# 从命令行参数获取文件名
input_file="$1"

# 读取文件并拉取每个镜像
while read -r image; do
  if [ -n "$image" ]; then
    echo "正在拉取镜像: $image"
    docker pull "$image"
  fi
done < "$input_file"
```

### Rename Docker Images

The modified image names will be saved in the `new_images.tmp` file. And you can modify the `private_registry` to change the registry you want to push to.

**Usage：update_images.sh images.tmp**

```bash
#!/bin/bash
# **********************************************************
# * Author        : Burgess Leo
# * Email         : liuxp731@qq.com
# * Create time   : 2024-09-13 16:06
# * Filename      : update_and_tag_images.sh
# * Description   : Updates image paths and tags Docker images based on a specified file
# **********************************************************

# 检查是否传入文件名作为参数
if [ "$#" -ne 1 ]; then
  echo "用法: $0 <images.tmp>"
  exit 1
fi

# 从命令行参数获取文件名
input_file="$1"
output_file="new_images.tmp"
private_registry="192.167.3.18/"

# 创建或清空输出文件
> "$output_file"

# 处理文件内容并执行 docker tag 命令
while IFS= read -r original_image; do
  # 检查行是否为空
  if [[ -n "$original_image" ]]; then
    # 在镜像名称前加上私有仓库地址
    new_image_name="${private_registry}${original_image}"
    
    # 输出正在标记的镜像信息
    echo "正在标记镜像: docker tag $original_image $new_image_name"
    
    # 执行 docker tag 命令
    docker tag "$original_image" "$new_image_name"
    
    # 将新的镜像名称写入输出文件
    echo "$new_image_name" >> "$output_file"
  fi
done < "$input_file"

echo "所有镜像已成功标记并保存到 $output_file"
```

> After Tag docker images, you must check the `new_images_name.tmp`, ensure the image names are correct. And you must confirm about projects created in your private harbor.

### Push Images

Push images to a remote registry. This script reads a list of image names from a file named "new_images.tmp", and pushes them to a remote registry.

**Usage：push_images.sh new_images.tmp**

```bash
#!/bin/bash
# **********************************************************
# * Author        : Burgess Leo
# * Email         : liuxp731@qq.com
# * Create time   : 2024-09-14 09:01
# * Filename      : push_images.sh
# * Description   : Push Docker images to a registry
# **********************************************************

# 检查是否传入文件名作为参数
if [ "$#" -ne 1 ]; then
  echo "用法: $0 <images.tmp>"
  exit 1
fi

# 从命令行参数获取文件名
images_file="$1"
target_registry="192.167.3.18/library/"

# 遍历images.tmp文件中的每一行
while IFS= read -r line; do
    # 检查行是否为空
    if [ -z "$line" ]; then
        continue
    fi

    # 打印操作信息
    echo "正在推送镜像: $line"

    # 推送镜像
    docker push "$line"

done < "$images_file"

echo "所有指定的镜像已被推送。"
```

### Delete Images from Local

Delete images from local.

**Usage：delete_images.sh new_images.tmp**

```bash
#!/bin/bash
# **********************************************************
# * Author        : Burgess Leo
# * Email         : liuxp731@qq.com
# * Create time   : 2024-09-14 09:02
# * Filename      : delete_images.sh
# * Description   : Delete images that pushed
# **********************************************************

# 检查是否有参数传递
if [ $# -ne 1 ]; then
    echo "Usage: $0 <path-to-file>"
    exit 1
fi

# 指定包含镜像名称的文件路径
images_file="$1"

# 检查文件是否存在
if [ ! -f "$images_file" ]; then
    echo "Error: File '$images_file' not found."
    exit 1
fi

# 逐行读取文件中的镜像名称
while IFS= read -r image; do
    # 删除镜像，忽略不存在的镜像
    if docker rmi "$image" &>/dev/null; then
        echo "Image $image has been deleted."
    else
        echo "Image $image does not exist or could not be deleted."
    fi
done < "$images_file"

echo "All listed images have been processed."
```

### ALL IN ONE

Merge all the above scripts into one.

```bash
#!/bin/bash
# **********************************************************
# * Author        : Burgess Leo
# * Email         : liuxp731@qq.com
# * Create time   : 2024-09-13 16:06
# * Filename      : all_in_one.sh
# * Description   : Pull images
# **********************************************************

# 欢迎信息
echo "欢迎使用 Docker 镜像管理脚本！"
echo ""

# 菜单函数
print_menu() {
  echo "*********************************************************"
  echo "*                                                       *"
  echo "*     1. Get images from Helm yaml files.               *"
  echo "*                                                       *"
  echo "*     2. Pull images from docker hub to local.          *"
  echo "*                                                       *"
  echo "*     3. Docker tag images you need to change.          *"
  echo "*                                                       *"
  echo "*     4. Push images to your private docker registry.   *"
  echo "*                                                       *"
  echo "*     5. Delete images from local.                      *"
  echo "*                                                       *"
  echo "*     6. cat images.tmp.                                *"
  echo "*                                                       *"
  echo "*     7. cat new_images.tmp.                            *"
  echo "*                                                       *"
  echo "*     8. About.                                         *"
  echo "*                                                       *"
  echo "*     0. Exit.                                          *"
  echo "*                                                       *"
  echo "*********************************************************"
}

# 主循环
while true; do
  print_menu
  read -p "请输入功能数字: " choice

  case $choice in
    1)
      read -p "请输入 Helm yaml 文件路径: " yaml_file
      if [ ! -f "$yaml_file" ]; then
        echo "错误: 文件 '$yaml_file' 不存在."
      else
        > images.tmp
        while read -r line; do
          if [[ $line == *"repository:"* ]]; then
            repository=$(echo $line | cut -d':' -f2 | xargs)
          elif [[ $line == *"tag:"* ]]; then
            tag=$(echo $line | cut -d':' -f2 | xargs)
            echo "$repository:$tag" >> images.tmp
          fi
        done < "$yaml_file"
        echo "已从 '$yaml_file' 中提取镜像并保存到 'images.tmp'，由于 Helm yaml 文件可能包含重复的镜像以及失效的 Tag 名称，请手动检查 images.tmp 文件。"
      fi

    ;;
    2)
      read -p "请输入 images.tmp 文件路径 (默认: images.tmp): " images_file
      images_file=${images_file:-images.tmp} # 设置默认值

      if [ ! -f "$images_file" ]; then
        echo "错误: 文件 '$images_file' 不存在."
      else
        while IFS= read -r image || [ -n "$image" ]; do # 修复读取逻辑以处理没有换行的情况
          if [ -n "$image" ]; then
            echo "正在拉取镜像: $image"
            docker pull "$image"
          fi
        done < "$images_file"
        echo "所有镜像已成功拉取."
      fi

    ;;
    3)
      read -p "请输入 images.tmp 文件路径 (默认: images.tmp): " images_file
      images_file=${images_file:-images.tmp} # 设置默认值

      if [ ! -f "$images_file" ]; then
        echo "错误: 文件 '$images_file' 不存在."
      else
        output_file="new_images.tmp"
        header="192.167.3.18/"
        > "$output_file"

        while IFS= read -r original_image || [ -n "$original_image" ]; do # 修复读取逻辑以处理没有换行的情况
          # 在每一行前添加私有镜像仓库地址
          new_image_name="${header}${original_image}"
          echo "正在标记镜像: docker tag $original_image $new_image_name"
          docker tag "$original_image" "$new_image_name"
          echo "$new_image_name" >> "$output_file"
        done < "$images_file"

        if [ -s "$output_file" ]; then # 检查输出文件是否非空
          echo "所有镜像已成功标记并保存到 '$output_file'."
        else
          echo "警告: '$output_file' 文件为空，未能标记任何镜像."
        fi
      fi

    ;;
    4)
      read -p "请输入 new_images.tmp 文件路径 (默认: new_images.tmp): " images_file
      images_file=${images_file:-new_images.tmp} # 设置默认值

      if [ ! -f "$images_file" ]; then
        echo "错误: 文件 '$images_file' 不存在."
      else
        while IFS= read -r line || [ -n "$line" ]; do # 修复读取逻辑以处理没有换行的情况
          if [ -z "$line" ]; then continue; fi
          echo "正在推送镜像: $line"
          docker push "$line"
        done < "$images_file"

        echo "所有指定的镜像已被推送."
      fi

    ;;
    5)
      read -p "请输入包含要删除的镜像名称的文件路径 (默认: new_images.tmp): " images_file
      images_file=${images_file:-new_images.tmp} # 设置默认值

      if [ ! -f "$images_file" ]; then
        echo "错误: 文件 '$images_file' 不存在."
      else
        while IFS= read -r image || [ -n "$image" ]; do # 修复读取逻辑以处理没有换行的情况
          if docker rmi "$image" &>/dev/null; then
            echo "镜像 $image 已被删除."
          else
            echo "镜像 $image 不存在或无法删除."
          fi
        done < "$images_file"

        echo "所有列出的镜像已被处理."
      fi

    ;;
    6)
      cat images.tmp
      
    ;;
    7)
      cat new_images.tmp
      
    ;;
    8)
      # 打印关于信息
      cat << 'EOF'
        _..._   666       
      .'     '.      _
     /    .-""-\   _/ \
   .-|   /:.   |  |   |
   |  \  |:.   /.-'-./ 
   | .-'-;:__.'    =/  
   .'=  *=|NASA _.='   
  /   _.  |    ;       
 ;-.-'|    \   |       
/   | \    _\  _\      
\__/'._;. \==' ==\     
         \    \   |    
         /    /   /    
         /-._/-._/     
  lxp    \   `\  \     
          `-._/._/     
EOF

    ;;
    0)
      echo "退出程序。再见！"
      exit 0

    ;;
    *)
      echo "无效的选择，请重新输入."
    ;;
  esac

  # 打印分隔行以提高可读性，并重新显示菜单
  printf "\n\n\n"

done
```