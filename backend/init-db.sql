-- 四川飞豹救援系统数据库初始化脚本

-- 创建数据库
CREATE DATABASE IF NOT EXISTS feibao_rescue CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE feibao_rescue;

-- 数据库创建成功提示
SELECT '数据库创建成功！' AS message;
SELECT '请启动后端服务：npm run start:dev' AS next_step;
