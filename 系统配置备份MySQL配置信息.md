# 系统配置备份 - MySQL配置信息

## 一、数据库连接配置

### 1.1 基本信息
- **数据库地址**: 127.0.0.1
- **端口**: 3308
- **用户名**: scfeibao
- **密码**: 请从部署环境变量读取，不在仓库记录
- **数据库名**: scfeibao
- **字符集**: utf8mb4
- **时区**: +08:00

### 1.2 连接字符串
```
mysql://scfeibao:<url_encoded_password>@127.0.0.1:3308/scfeibao
```

### 1.3 环境变量配置
```env
# 数据库配置
DB_HOST=127.0.0.1
DB_PORT=3308
DB_USERNAME=scfeibao
DB_PASSWORD=请替换为数据库密码
DB_DATABASE=scfeibao
```

---

## 二、数据库备份命令

### 2.1 完整备份
```bash
# 备份整个数据库
mysqldump -h 127.0.0.1 -P 3308 -u scfeibao -p"$DB_PASSWORD" scfeibao > backup_$(date +%Y%m%d_%H%M%S).sql

# 备份数据库结构和数据
mysqldump -h 127.0.0.1 -P 3308 -u scfeibao -p"$DB_PASSWORD" --databases scfeibao > scfeibao_full_backup.sql
```

### 2.2 仅备份结构
```bash
# 仅备份表结构，不包含数据
mysqldump -h 127.0.0.1 -P 3308 -u scfeibao -p"$DB_PASSWORD" --no-data scfeibao > scfeibao_schema.sql
```

### 2.3 仅备份数据
```bash
# 仅备份数据，不包含表结构
mysqldump -h 127.0.0.1 -P 3308 -u scfeibao -p"$DB_PASSWORD" --no-create-info scfeibao > scfeibao_data.sql
```

### 2.4 备份指定表
```bash
# 备份指定表
mysqldump -h 127.0.0.1 -P 3308 -u scfeibao -p"$DB_PASSWORD" scfeibao users news certificates > specific_tables_backup.sql
```

---

## 三、数据库恢复命令

### 3.1 恢复完整数据库
```bash
# 从备份文件恢复数据库
mysql -h 127.0.0.1 -P 3308 -u scfeibao -p"$DB_PASSWORD" scfeibao < backup_file.sql
```

### 3.2 恢复到新数据库
```bash
# 创建新数据库
mysql -h 127.0.0.1 -P 3308 -u root -p -e "CREATE DATABASE scfeibao_new CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; GRANT ALL PRIVILEGES ON scfeibao_new.* TO 'scfeibao'@'%'; FLUSH PRIVILEGES;"

# 恢复数据到新数据库
mysql -h 127.0.0.1 -P 3308 -u scfeibao -p"$DB_PASSWORD" scfeibao_new < backup_file.sql
```

---

## 四、数据库表结构

### 4.1 核心业务表
- `users` - 用户表
- `admin_users` - 管理员表
- `roles` - 角色表
- `news` - 新闻表
- `certificates` - 证书表
- `vehicles` - 车辆表
- `personnel` - 人员表
- `settings` - 系统设置表

### 4.2 内容管理表
- `party_building` - 党建专栏表
- `team_building` - 队伍建设表
- `info_public` - 信息公开表
- `policies` - 政策法规表

---

## 五、备份策略建议

### 5.1 自动备份
- **频率**: 每天凌晨2点自动备份
- **保留**: 保留最近30天的备份文件
- **存储**: 备份文件存储在 `/backup/mysql/` 目录

### 5.2 备份脚本示例
```bash
#!/bin/bash
# MySQL自动备份脚本

BACKUP_DIR="/backup/mysql"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/scfeibao_$DATE.sql"

# 创建备份目录
mkdir -p $BACKUP_DIR

# 执行备份
mysqldump -h 127.0.0.1 -P 3308 -u scfeibao -p"$DB_PASSWORD" scfeibao > $BACKUP_FILE

# 压缩备份文件
gzip $BACKUP_FILE

# 删除30天前的备份
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "备份完成: $BACKUP_FILE.gz"
```

---

## 六、注意事项

### 6.1 安全提醒
- ⚠️ 备份文件包含敏感数据，请妥善保管
- ⚠️ 不要将备份文件提交到版本控制系统
- ⚠️ 定期测试备份文件的可恢复性

### 6.2 恢复前检查
- ✓ 确认备份文件完整性
- ✓ 确认目标数据库版本兼容
- ✓ 在测试环境先进行恢复测试
- ✓ 恢复前先备份当前数据库

---

**文档创建时间**: 2026-02-19
**最后更新时间**: 2026-02-19
