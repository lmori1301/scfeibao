-- 人员台账：业务编号、工作单位、邮箱、出勤与培训、审核状态
-- 推荐执行：cd backend && npm run db:migrate:personnel （可重复执行、自动跳过已有列）
-- 若需手写执行，请按顺序逐条执行；列已存在会报错，可忽略或改用上面的 npm 脚本

ALTER TABLE `personnel`
  ADD COLUMN `personnelCode` varchar(32) NULL COMMENT '人员业务编号' AFTER `id`,
  ADD COLUMN `email` varchar(100) NULL COMMENT '电子邮箱' AFTER `phone`,
  ADD COLUMN `workUnit` varchar(100) NULL COMMENT '工作单位' AFTER `team`,
  ADD COLUMN `taskCount` int NOT NULL DEFAULT 0 COMMENT '出勤次数' AFTER `remark`,
  ADD COLUMN `trainingHours` int NOT NULL DEFAULT 0 COMMENT '培训时长(小时)' AFTER `taskCount`,
  ADD COLUMN `auditStatus` tinyint NOT NULL DEFAULT 1 COMMENT '审核状态 0待审核 1已通过 2已拒绝' AFTER `status`;
