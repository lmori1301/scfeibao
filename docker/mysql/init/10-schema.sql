-- 四川飞豹救援平台 Docker MySQL 纯表结构初始化脚本
-- 来源：2026-07-07 已验证备份；不包含任何业务数据或账号凭证。
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'editor',
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `lastLoginTime` datetime DEFAULT NULL,
  `mustChangePassword` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否需首次登录改密：1-是，0-否',
  `tokenVersion` int NOT NULL DEFAULT '0' COMMENT '令牌版本，密码变更后递增以吊销旧会话',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_2873882c38e8c07d98cb64f962` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `appointments`;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `docNumber` varchar(255) NOT NULL,
  `publishDate` date NOT NULL,
  `effectiveDate` date DEFAULT NULL,
  `department` varchar(255) DEFAULT NULL,
  `attachment` varchar(255) DEFAULT NULL,
  `attachmentName` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `banners`;
CREATE TABLE `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `sort` int NOT NULL DEFAULT '0',
  `isActive` tinyint NOT NULL DEFAULT '1',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `certificates`;
CREATE TABLE `certificates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `certificateNumber` varchar(100) NOT NULL COMMENT '证书编号',
  `certificateName` varchar(100) NOT NULL COMMENT '证书名称',
  `holderName` varchar(50) NOT NULL COMMENT '持证人姓名',
  `holderIdCard` varchar(20) DEFAULT NULL COMMENT '持证人身份证号',
  `issuingAuthority` varchar(100) DEFAULT NULL COMMENT '发证机构',
  `issueDate` date DEFAULT NULL COMMENT '发证日期',
  `expiryDate` date DEFAULT NULL COMMENT '有效期至',
  `certificateType` varchar(50) DEFAULT NULL COMMENT '证书类型',
  `photoUrl` text COMMENT '证书照片：JSON 数组 URL 或单张 URL 兼容',
  `remark` text COMMENT '备注',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1-有效，0-失效',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_9742ea65bce69db989c2e67693` (`certificateNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `friend_links`;
CREATE TABLE `friend_links` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '单位名称',
  `url` varchar(500) NOT NULL COMMENT '链接地址',
  `logo` varchar(500) DEFAULT NULL COMMENT '单位logo',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `isActive` tinyint NOT NULL DEFAULT '1' COMMENT '是否启用',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `info_public`;
CREATE TABLE `info_public` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `title` varchar(200) NOT NULL COMMENT '标题',
  `summary` text COMMENT '摘要',
  `content` longtext NOT NULL COMMENT '内容',
  `category` varchar(50) DEFAULT NULL COMMENT '分类',
  `attachmentUrl` varchar(255) DEFAULT NULL COMMENT '附件URL',
  `viewCount` int NOT NULL DEFAULT '0' COMMENT '浏览次数',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1-已发布，0-草稿',
  `publishedAt` datetime DEFAULT NULL COMMENT '发布时间',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `leadership`;
CREATE TABLE `leadership` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `nation` varchar(255) DEFAULT NULL,
  `birth` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `political` varchar(255) DEFAULT NULL,
  `duty` varchar(255) DEFAULT NULL,
  `experience` int NOT NULL DEFAULT '0',
  `actions` int NOT NULL DEFAULT '0',
  `photo` varchar(255) DEFAULT NULL,
  `sort` int NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `name` varchar(100) NOT NULL COMMENT '单位名称',
  `pointName` varchar(150) NOT NULL DEFAULT '' COMMENT '点位名称',
  `address` varchar(200) NOT NULL COMMENT '地址',
  `phone` varchar(20) NOT NULL COMMENT '联系电话',
  `longitude` decimal(10,6) NOT NULL DEFAULT '0.000000' COMMENT '经度',
  `latitude` decimal(10,6) NOT NULL DEFAULT '0.000000' COMMENT '纬度',
  `zoom` int NOT NULL DEFAULT '15' COMMENT '地图缩放级别',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1-启用，0-禁用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(50) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `summary` text COMMENT '摘要',
  `coverImage` varchar(255) DEFAULT NULL COMMENT '封面图片',
  `author` varchar(50) DEFAULT NULL COMMENT '作者',
  `viewCount` int NOT NULL DEFAULT '0' COMMENT '浏览次数',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1-已发布，0-草稿',
  `publishedAt` datetime DEFAULT NULL COMMENT '发布时间',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `isHeadline` tinyint NOT NULL DEFAULT '0' COMMENT '是否为头条：1-是，0-否',
  `isNew` tinyint NOT NULL DEFAULT '0' COMMENT '是否显示NEW标签：1-是，0-否',
  `published_at` timestamp NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cover` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `content` text,
  PRIMARY KEY (`id`),
  KEY `IDX_2e612e944ee6d20447876ca04a` (`category`),
  KEY `IDX_93ea75bfecf1870b574ac961ee` (`published_at`),
  KEY `IDX_325af326ebf4ea3912dd7b9340` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `party_building`;
CREATE TABLE `party_building` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `title` varchar(200) NOT NULL COMMENT '标题',
  `summary` text COMMENT '摘要',
  `content` longtext NOT NULL COMMENT '内容',
  `coverImage` varchar(255) DEFAULT NULL COMMENT '封面图片',
  `category` varchar(50) DEFAULT NULL COMMENT '分类',
  `viewCount` int NOT NULL DEFAULT '0' COMMENT '浏览次数',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1-已发布，0-草稿',
  `publishedAt` datetime DEFAULT NULL COMMENT '发布时间',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `party_members`;
CREATE TABLE `party_members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `description` text,
  `sort` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `party_works`;
CREATE TABLE `party_works` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `coverImage` varchar(255) DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `publishDate` datetime DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `viewCount` int NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `personnel`;
CREATE TABLE `personnel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `personnelCode` varchar(32) DEFAULT NULL COMMENT '人员业务编号',
  `name` varchar(50) NOT NULL COMMENT '姓名',
  `idCard` varchar(20) NOT NULL COMMENT '身份证号',
  `gender` varchar(10) DEFAULT NULL COMMENT '性别',
  `birthDate` date DEFAULT NULL COMMENT '出生日期',
  `phone` varchar(20) DEFAULT NULL COMMENT '联系电话',
  `email` varchar(100) DEFAULT NULL COMMENT '电子邮箱',
  `team` varchar(100) DEFAULT NULL COMMENT '所属队伍',
  `workUnit` varchar(100) DEFAULT NULL COMMENT '工作单位',
  `position` varchar(50) DEFAULT NULL COMMENT '职务',
  `joinDate` date DEFAULT NULL COMMENT '入队日期',
  `photoUrl` text COMMENT '人员照片：JSON 数组 URL 或单张 URL 兼容',
  `skills` text COMMENT '专业技能',
  `remark` text COMMENT '备注',
  `taskCount` int NOT NULL DEFAULT '0' COMMENT '出勤次数',
  `trainingHours` int NOT NULL DEFAULT '0' COMMENT '培训时长(小时)',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1-在职，0-离职',
  `auditStatus` tinyint NOT NULL DEFAULT '1' COMMENT '审核状态 0待审核 1已通过 2已拒绝',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_3e78463d3413bc637236040df9` (`idCard`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `personnel_appointments`;
CREATE TABLE `personnel_appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `appointmentDate` datetime NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `policies`;
CREATE TABLE `policies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `summary` text COMMENT '摘要',
  `content` longtext NOT NULL COMMENT '内容',
  `attachmentUrl` varchar(255) DEFAULT NULL COMMENT '附件URL',
  `publishedAt` datetime DEFAULT NULL COMMENT '发布时间',
  `effectiveDate` date DEFAULT NULL COMMENT '生效日期',
  `expiryDate` date DEFAULT NULL COMMENT '失效日期',
  `viewCount` int NOT NULL DEFAULT '0' COMMENT '浏览次数',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1-已发布，0-草稿',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `fileUrl` varchar(255) DEFAULT NULL,
  `publishDate` datetime DEFAULT NULL,
  `attachmentName` varchar(255) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `title` varchar(200) NOT NULL COMMENT '标题',
  `category` varchar(50) DEFAULT NULL COMMENT '分类',
  `issuingAuthority` varchar(100) DEFAULT NULL COMMENT '发文机关',
  `documentNumber` varchar(50) DEFAULT NULL COMMENT '文号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `public_info`;
CREATE TABLE `public_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `publishDate` datetime DEFAULT NULL,
  `attachmentUrl` varchar(255) DEFAULT NULL,
  `viewCount` int NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `rescue_cases`;
CREATE TABLE `rescue_cases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `coverImage` varchar(255) DEFAULT NULL,
  `location` varchar(255) NOT NULL,
  `rescueDate` datetime NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `permissions` json DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_648e3f5447f725579d7d4ffdfb` (`name`),
  UNIQUE KEY `IDX_f6d54f95c31b73fb1bdd8e91d0` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'text',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c8639b7626fa94ba8265628f21` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `team_building`;
CREATE TABLE `team_building` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `title` varchar(200) NOT NULL COMMENT '标题',
  `summary` text COMMENT '摘要',
  `content` longtext NOT NULL COMMENT '内容',
  `coverImage` varchar(255) DEFAULT NULL COMMENT '封面图片',
  `category` varchar(50) DEFAULT NULL COMMENT '分类',
  `viewCount` int NOT NULL DEFAULT '0' COMMENT '浏览次数',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1-已发布，0-草稿',
  `publishedAt` datetime DEFAULT NULL COMMENT '发布时间',
  `sort` int NOT NULL DEFAULT '0' COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `team_intro`;
CREATE TABLE `team_intro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `sort` int NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `team_showcase`;
CREATE TABLE `team_showcase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `description` mediumtext,
  `sort` int NOT NULL DEFAULT '0',
  `status` varchar(255) NOT NULL DEFAULT '显示',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `team_units`;
CREATE TABLE `team_units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `name` varchar(100) NOT NULL COMMENT '单位名称',
  `pointName` varchar(150) NOT NULL DEFAULT '' COMMENT '默认点位名称',
  `sort` int NOT NULL DEFAULT '0' COMMENT '默认排序',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1-启用，0-禁用',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_f4e31378f48d43d9c3d0efca6e` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `realName` varchar(50) DEFAULT NULL COMMENT '真实姓名',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `role` enum('admin','editor','viewer') NOT NULL DEFAULT 'viewer' COMMENT '角色',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1-启用，0-禁用',
  `lastLoginAt` datetime DEFAULT NULL COMMENT '最后登录时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `vehicles`;
CREATE TABLE `vehicles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` datetime(6) DEFAULT NULL COMMENT '删除时间',
  `plateNumber` varchar(20) NOT NULL COMMENT '车牌号',
  `vehicleNo` varchar(40) DEFAULT NULL COMMENT '车辆编号',
  `vehicleType` varchar(50) NOT NULL COMMENT '车辆类型',
  `brandModel` varchar(50) DEFAULT NULL COMMENT '品牌型号',
  `engineNumber` varchar(64) DEFAULT NULL COMMENT '发动机号',
  `chassisNumber` varchar(64) DEFAULT NULL COMMENT '车架号码',
  `color` varchar(50) DEFAULT NULL COMMENT '车辆颜色',
  `purchaseDate` date DEFAULT NULL COMMENT '购置日期',
  `issueDate` date DEFAULT NULL COMMENT '发证日期',
  `validityDate` date DEFAULT NULL COMMENT '有效期限',
  `team` varchar(100) DEFAULT NULL COMMENT '所属队伍',
  `responsiblePerson` varchar(50) DEFAULT NULL COMMENT '责任人',
  `phone` varchar(20) DEFAULT NULL COMMENT '联系电话',
  `configuration` text COMMENT '车辆配置',
  `photoUrl` text COMMENT '车辆照片：JSON 数组 URL 或单张 URL 兼容',
  `lastMaintenanceDate` date DEFAULT NULL COMMENT '最后保养日期',
  `nextMaintenanceDate` date DEFAULT NULL COMMENT '下次保养日期',
  `remark` text COMMENT '备注',
  `status` tinyint NOT NULL DEFAULT '1' COMMENT '状态：1-正常，0-停用',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_66ea96381a7a7ceb35c72f3662` (`plateNumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `videos`;
CREATE TABLE `videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `videoUrl` varchar(255) NOT NULL,
  `coverUrl` varchar(255) DEFAULT NULL,
  `sort` int NOT NULL DEFAULT '0',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `isTop` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `website_config`;
CREATE TABLE `website_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `key` varchar(50) NOT NULL COMMENT '配置键',
  `value` text NOT NULL COMMENT '配置值',
  `description` varchar(200) DEFAULT NULL COMMENT '配置描述',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_6ef9c2d425e9a67781953cc5ce` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS=1;
