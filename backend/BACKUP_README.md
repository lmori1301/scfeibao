# 数据库自动备份配置

## 定时任务设置

### 方法一：使用crontab（推荐）

```bash
# 编辑crontab
crontab -e

# 添加以下行（每天凌晨2点执行备份）
0 2 * * * cd /Users/yusenn/ProCode/demo-aistone/四川飞豹/backend && ./backup.sh >> ./backups/backup.log 2>&1
```

### 方法二：手动执行

```bash
cd backend
./backup.sh
```

## 备份说明

- **备份位置**: `backend/backups/mysql/`
- **备份格式**: `scfeibao_YYYYMMDD_HHMMSS.sql.gz`
- **保留时间**: 30天
- **自动清理**: 脚本会自动删除30天前的备份

## 恢复数据

```bash
# 解压备份文件
gunzip scfeibao_20260219_185030.sql.gz

# 恢复数据库
mysql -h 127.0.0.1 -P 3308 -u scfeibao -p"$DB_PASSWORD" scfeibao < scfeibao_20260219_185030.sql
```
