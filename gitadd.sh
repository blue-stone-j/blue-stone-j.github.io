#!/bin/bash

# 执行 git add .
git add .

# 更新所有修改过的文件的时间戳
git diff --cached --name-only | while read -r file; do
    # echo "$file"
    if [[ $file == _posts/* && $file == *md ]]; then
      if [ -r "$file" ] && [ -w "$file" ]; then
        # 获取文件的最近修改时间
        last_modified=$(stat -c "%Y" "$file")

        # 将时间戳转换为"年-月-日 时:分:秒 时区"的格式
        last_modified_formatted=$(date -d @"$last_modified" +"%Y-%m-%d %H:%M:%S %z")
        
        # 更新第四行的日期、时间和时区为当前日期、时间和时区，并添加 "date: " 前缀
        # sed -i "4s/.*/date:   $last_modified_formatted/" "$file"
        echo "$file"
      else
        echo "Skipping $file: not a readable/writable file"
      fi
    else
      echo ""
    fi
    # 检查文件是否可读写

done

