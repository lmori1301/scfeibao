-- 证书台账：证书照片 URL
-- 推荐：cd backend && npm run db:migrate:certificate-photo

ALTER TABLE `certificates`
  ADD COLUMN `photoUrl` varchar(255) NULL COMMENT '证书照片URL' AFTER `certificateType`;
