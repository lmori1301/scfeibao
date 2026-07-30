SET @has_token_version = (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'admin_users'
    AND COLUMN_NAME = 'tokenVersion'
);
SET @migration_sql = IF(
  @has_token_version = 0,
  'ALTER TABLE `admin_users` ADD COLUMN `tokenVersion` INT NOT NULL DEFAULT 0 COMMENT ''令牌版本，密码变更后递增以吊销旧会话'' AFTER `mustChangePassword`',
  'SELECT 1'
);
PREPARE migration_statement FROM @migration_sql;
EXECUTE migration_statement;
DEALLOCATE PREPARE migration_statement;
