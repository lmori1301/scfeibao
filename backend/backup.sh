#!/bin/bash

# MySQL数据库备份脚本
# 用途：自动备份scfeibao数据库

# 配置信息
DB_HOST="127.0.0.1"
DB_PORT="3308"
DB_USER="scfeibao"
DB_PASS="${DB_PASSWORD:?请先设置 DB_PASSWORD}"
DB_NAME="scfeibao"
BACKUP_DIR="./backups/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_$DATE.sql"

# 创建备份目录
mkdir -p $BACKUP_DIR

# 执行备份
mysqldump -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_FILE

# 检查备份是否成功
if [ $? -eq 0 ]; then
    # 压缩备份文件
    gzip $BACKUP_FILE
    echo "✓ 备份成功: ${BACKUP_FILE}.gz"

    # 删除30天前的备份
    find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete
    echo "✓ 已清理30天前的备份文件"
else
    echo "✗ 备份失败"
    exit 1
fi
