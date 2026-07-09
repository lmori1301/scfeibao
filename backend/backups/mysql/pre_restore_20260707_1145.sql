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
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_2873882c38e8c07d98cb64f962` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `admin_users` (`id`,`username`,`password`,`name`,`email`,`phone`,`role`,`status`,`lastLoginTime`,`mustChangePassword`,`createTime`,`updateTime`) VALUES
(1,'admin','$2b$10$311Z.ICFIkLY2T98oCY5j.fh6raucphnSb93tR8IqftsGJxU/e34y','系统管理员',NULL,NULL,'admin','active','2026-07-07 11:44:21.000',0,'2026-07-07 03:38:08.298','2026-07-07 03:44:21.000');
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
INSERT INTO `banners` (`id`,`title`,`imageUrl`,`link`,`sort`,`isActive`,`createdAt`) VALUES
(1,'四川飞豹救援授旗授牌仪式','/uploads/images/banner-1.jpg','/dynamic-news/1',1,1,'2026-07-07 02:24:31.999'),
(2,'全省消防救援队伍建设工作会议','/uploads/images/banner-2.jpg','/dynamic-news/2',2,1,'2026-07-07 02:24:31.999'),
(3,'省级先进集体表彰大会','/uploads/images/banner-3.jpg','/dynamic-news/3',3,1,'2026-07-07 02:24:31.999');
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
INSERT INTO `party_building` (`id`,`created_at`,`updated_at`,`deleted_at`,`title`,`summary`,`content`,`coverImage`,`category`,`viewCount`,`status`,`publishedAt`,`sort`) VALUES
(1,'2026-07-07 02:13:12.394','2026-07-07 02:13:12.394',NULL,'æ·±å…¥å­¦ä¹ è´¯å½»ä¹ è¿‘å¹³æ–°æ—¶ä»£ä¸­å›½ç‰¹è‰²ç¤¾ä¼šä¸»ä¹‰æ€æƒ³','å…šæ”¯éƒ¨ç»„ç»‡å­¦ä¹ æ´»åŠ¨','å››å·é£žè±¹æ•‘æ´å…šæ”¯éƒ¨ç»„ç»‡å…¨ä½“å…šå‘˜æ·±å…¥å­¦ä¹ è´¯å½»ä¹ è¿‘å¹³æ–°æ—¶ä»£ä¸­å›½ç‰¹è‰²ç¤¾ä¼šä¸»ä¹‰æ€æƒ³ï¼Œä¸æ–­æé«˜æ”¿æ²»ç«™ä½ã€‚','/uploads/images/party/study-1.jpg','å…šå»ºåŠ¨æ€',0,1,'2026-07-07 02:13:12.000',1),
(2,'2026-07-07 02:13:12.394','2026-07-07 02:13:12.394',NULL,'å¼€å±•\"ä¸å¿˜åˆå¿ƒã€ç‰¢è®°ä½¿å‘½\"ä¸»é¢˜å…šæ—¥æ´»åŠ¨','ä¸»é¢˜å…šæ—¥æ´»åŠ¨','å…šæ”¯éƒ¨ç»„ç»‡å¼€å±•ä¸»é¢˜å…šæ—¥æ´»åŠ¨ï¼Œé‡æ¸©å…¥å…šèª“è¯ï¼Œå¼ºåŒ–å…šå‘˜æ„è¯†å’Œè´£ä»»æ‹…å½“ã€‚','/uploads/images/party/activity-1.jpg','å…šå»ºåŠ¨æ€',0,1,'2026-07-07 02:13:12.000',2),
(3,'2026-07-07 02:13:12.394','2026-07-07 02:13:12.394',NULL,'å…šæ”¯éƒ¨å¬å¼€ç»„ç»‡ç”Ÿæ´»ä¼š','ç»„ç»‡ç”Ÿæ´»ä¼š','å…šæ”¯éƒ¨å¬å¼€ç»„ç»‡ç”Ÿæ´»ä¼šï¼Œå¼€å±•æ‰¹è¯„ä¸Žè‡ªæˆ‘æ‰¹è¯„ï¼Œä¸æ–­æå‡å…šç»„ç»‡å‡èšåŠ›å’Œæˆ˜æ–—åŠ›ã€‚','/uploads/images/party/meeting-1.jpg','ç»„ç»‡å»ºè®¾',0,1,'2026-07-07 02:13:12.000',3),
(4,'2026-07-07 02:13:12.394','2026-07-07 02:13:12.394',NULL,'ä¼˜ç§€å…šå‘˜å…ˆè¿›äº‹è¿¹æŠ¥å‘Šä¼š','å…ˆè¿›äº‹è¿¹æŠ¥å‘Š','ä¸¾åŠžä¼˜ç§€å…šå‘˜å…ˆè¿›äº‹è¿¹æŠ¥å‘Šä¼šï¼Œå‘æŒ¥å…šå‘˜å…ˆé”‹æ¨¡èŒƒä½œç”¨ï¼Œæ¿€åŠ±å…¨ä½“é˜Ÿå‘˜å¥‹å‘è¿›å–ã€‚','/uploads/images/party/model-1.jpg','å…ˆè¿›å…¸åž‹',0,1,'2026-07-07 02:13:12.000',4);
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
INSERT INTO `settings` (`id`,`key`,`value`,`description`,`type`,`createTime`,`updateTime`) VALUES
(1,'admin_operation_logs','[{\"id\":5,\"username\":\"admin\",\"action\":\"登录系统\",\"module\":\"认证\",\"ip\":\"127.0.0.1\",\"time\":\"2026-07-07 03:44:21\"},{\"id\":4,\"username\":\"admin\",\"action\":\"登录系统\",\"module\":\"认证\",\"ip\":\"127.0.0.1\",\"time\":\"2026-07-07 03:40:36\"},{\"id\":1,\"username\":\"admin\",\"action\":\"登录系统\",\"module\":\"认证\",\"ip\":\"127.0.0.1\",\"time\":\"2026-04-24 10:30:00\"},{\"id\":2,\"username\":\"admin\",\"action\":\"编辑新闻\",\"module\":\"新闻管理\",\"ip\":\"127.0.0.1\",\"time\":\"2026-04-24 10:35:00\"},{\"id\":3,\"username\":\"admin\",\"action\":\"更新网站配置\",\"module\":\"网站配置\",\"ip\":\"127.0.0.1\",\"time\":\"2026-04-24 10:40:00\"}]','后台操作日志','json','2026-07-07 03:40:36.814','2026-07-07 03:44:21.000'),
(2,'admin_navigation_items','[{\"id\":1,\"name\":\"首页\",\"path\":\"/\",\"source\":\"src/components/common/AppHeader.vue\",\"visible\":true,\"sort\":1},{\"id\":2,\"name\":\"概况信息\",\"path\":\"/overview-info\",\"source\":\"src/components/common/AppHeader.vue\",\"visible\":true,\"sort\":2},{\"id\":3,\"name\":\"党建专栏\",\"path\":\"/party-building\",\"source\":\"src/components/common/AppHeader.vue\",\"visible\":true,\"sort\":3},{\"id\":4,\"name\":\"动态要闻\",\"path\":\"/dynamic-news\",\"source\":\"src/components/common/AppHeader.vue\",\"visible\":true,\"sort\":4},{\"id\":5,\"name\":\"队伍建设\",\"path\":\"/team-building\",\"source\":\"src/components/common/AppHeader.vue\",\"visible\":true,\"sort\":5},{\"id\":6,\"name\":\"信息公开\",\"path\":\"/info-public\",\"source\":\"src/components/common/AppHeader.vue\",\"visible\":true,\"sort\":6},{\"id\":7,\"name\":\"政策法规\",\"path\":\"/policy-regulations\",\"source\":\"src/components/common/AppHeader.vue\",\"visible\":true,\"sort\":7},{\"id\":8,\"name\":\"查询系统\",\"path\":\"/query-system\",\"source\":\"src/components/common/AppHeader.vue\",\"visible\":true,\"sort\":8}]','后台导航设置','json','2026-07-07 03:46:14.192','2026-07-07 03:46:14.192');
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
INSERT INTO `team_building` (`id`,`created_at`,`updated_at`,`deleted_at`,`title`,`summary`,`content`,`coverImage`,`category`,`viewCount`,`status`,`publishedAt`,`sort`) VALUES
(1,'2026-07-07 02:13:51.023','2026-07-07 02:13:51.023',NULL,'ä¸“ä¸šæŠ€èƒ½åŸ¹è®­ä½“ç³»å»ºè®¾','å»ºç«‹å®Œå–„çš„ä¸“ä¸šæŠ€èƒ½åŸ¹è®­ä½“ç³»ï¼Œæå‡é˜Ÿå‘˜ç»¼åˆæ•‘æ´èƒ½åŠ›','å››å·é£žè±¹æ•‘æ´é«˜åº¦é‡è§†é˜Ÿä¼ä¸“ä¸šæŠ€èƒ½åŸ¹è®­ï¼Œå»ºç«‹äº†å®Œå–„çš„åŸ¹è®­ä½“ç³»ã€‚\n\nä¸€ã€åŸ¹è®­å†…å®¹\n1. ç»³ç´¢æ•‘æ´æŠ€æœ¯\n2. æ°´åŸŸæ•‘æ´æŠ€èƒ½\n3. åœ°éœ‡æ•‘æ´æŠ€æœ¯\n4. é«˜ç©ºæ•‘æ´æŠ€èƒ½\n5. åŒ»ç–—æ€¥æ•‘çŸ¥è¯†\n\näºŒã€åŸ¹è®­æ–¹å¼\n1. ç†è®ºå­¦ä¹ ä¸Žå®žæ“è®­ç»ƒç›¸ç»“åˆ\n2. å®šæœŸå¼€å±•æŠ€èƒ½è€ƒæ ¸\n3. é‚€è¯·ä¸“å®¶æŽˆè¯¾æŒ‡å¯¼\n4. å‚åŠ çœå†…å¤–äº¤æµå­¦ä¹ ','/uploads/images/team/training-system.jpg','åŸ¹è®­ä½“ç³»',0,1,'2026-07-07 02:13:51.000',1),
(2,'2026-07-07 02:13:51.023','2026-07-07 02:13:51.023',NULL,'åº”æ€¥æ¼”ç»ƒå¸¸æ€åŒ–æœºåˆ¶','å»ºç«‹åº”æ€¥æ¼”ç»ƒå¸¸æ€åŒ–æœºåˆ¶ï¼Œæé«˜å®žæˆ˜èƒ½åŠ›','ä¸ºæé«˜é˜Ÿä¼å®žæˆ˜èƒ½åŠ›ï¼Œå››å·é£žè±¹æ•‘æ´å»ºç«‹äº†åº”æ€¥æ¼”ç»ƒå¸¸æ€åŒ–æœºåˆ¶ã€‚\n\nä¸€ã€æ¼”ç»ƒç±»åž‹\n1. ç»¼åˆæ€§æ¼”ç»ƒï¼šæ¯å­£åº¦1æ¬¡\n2. ä¸“é¡¹æ¼”ç»ƒï¼šæ¯æœˆ2æ¬¡\n3. æ¡Œé¢æŽ¨æ¼”ï¼šæ¯æœˆ1æ¬¡\n\näºŒã€æ¼”ç»ƒå†…å®¹\n1. åœ°éœ‡æ•‘æ´æ¼”ç»ƒ\n2. æ°´åŸŸæ•‘æ´æ¼”ç»ƒ\n3. é«˜ç©ºæ•‘æ´æ¼”ç»ƒ\n4. åŒ»ç–—æ•‘æŠ¤æ¼”ç»ƒ\n5. å¤šéƒ¨é—¨è”åˆæ¼”ç»ƒ','/uploads/images/team/drill-mechanism.jpg','æ¼”ç»ƒæœºåˆ¶',0,1,'2026-07-07 02:13:51.000',2),
(3,'2026-07-07 02:34:22.218','2026-07-07 02:34:22.218',NULL,'专业技能培训体系建设','建立完善的专业技能培训体系，提升队员综合救援能力','四川飞豹救援高度重视队伍专业技能培训，建立了完善的培训体系。\n\n一、培训内容\n1. 绳索救援技术\n2. 水域救援技能\n3. 地震救援技术\n4. 高空救援技能\n5. 医疗急救知识\n\n二、培训方式\n1. 理论学习与实操训练相结合\n2. 定期开展技能考核\n3. 邀请专家授课指导\n4. 参加省内外交流学习','/uploads/images/team/training-system.jpg','培训体系',0,1,'2026-07-07 02:34:22.000',1),
(4,'2026-07-07 02:34:22.218','2026-07-07 02:34:22.218',NULL,'应急演练常态化机制','建立应急演练常态化机制，提高实战能力','为提高队伍实战能力，四川飞豹救援建立了应急演练常态化机制。\n\n一、演练类型\n1. 综合性演练：每季度1次\n2. 专项演练：每月2次\n3. 桌面推演：每月1次\n\n二、演练内容\n1. 地震救援演练\n2. 水域救援演练\n3. 高空救援演练\n4. 医疗救护演练\n5. 多部门联合演练','/uploads/images/team/drill-mechanism.jpg','演练机制',0,1,'2026-07-07 02:34:22.000',2);
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
INSERT INTO `team_showcase` (`id`,`title`,`type`,`imageUrl`,`description`,`sort`,`status`,`createdAt`,`updatedAt`) VALUES
(1,'è®­ç»ƒåœºæ™¯1',NULL,'/uploads/images/team/training-1.jpg','é˜Ÿå‘˜è¿›è¡Œç»³ç´¢æ•‘æ´è®­ç»ƒ',1,'显示','2026-07-07 02:13:12.386','2026-07-07 02:13:12.386'),
(2,'è®­ç»ƒåœºæ™¯2',NULL,'/uploads/images/team/training-2.jpg','é˜Ÿå‘˜è¿›è¡Œé«˜ç©ºæ•‘æ´è®­ç»ƒ',2,'显示','2026-07-07 02:13:12.386','2026-07-07 02:13:12.386'),
(3,'è®­ç»ƒåœºæ™¯3',NULL,'/uploads/images/team/training-3.jpg','é˜Ÿå‘˜è¿›è¡Œæ°´åŸŸæ•‘æ´è®­ç»ƒ',3,'显示','2026-07-07 02:13:12.386','2026-07-07 02:13:12.386'),
(4,'è®­ç»ƒåœºæ™¯4',NULL,'/uploads/images/team/training-4.jpg','é˜Ÿå‘˜è¿›è¡Œåœ°éœ‡æ•‘æ´è®­ç»ƒ',4,'显示','2026-07-07 02:13:12.386','2026-07-07 02:13:12.386'),
(5,'å®žæˆ˜åœºæ™¯1',NULL,'/uploads/images/team/action-1.jpg','é˜Ÿå‘˜å‚ä¸Žå®žæˆ˜æ•‘æ´',5,'显示','2026-07-07 02:13:12.386','2026-07-07 02:13:12.386'),
(6,'å®žæˆ˜åœºæ™¯2',NULL,'/uploads/images/team/action-2.jpg','é˜Ÿå‘˜è½¬ç§»è¢«å›°ç¾¤ä¼—',6,'显示','2026-07-07 02:13:12.386','2026-07-07 02:13:12.386'),
(7,'å®žæˆ˜åœºæ™¯3',NULL,'/uploads/images/team/action-3.jpg','é˜Ÿå‘˜å¼€å±•æœæ•‘å·¥ä½œ',7,'显示','2026-07-07 02:13:12.386','2026-07-07 02:13:12.386'),
(8,'å®žæˆ˜åœºæ™¯4',NULL,'/uploads/images/team/action-4.jpg','é˜Ÿå‘˜è¿›è¡ŒåŒ»ç–—æ•‘æŠ¤',8,'显示','2026-07-07 02:13:12.386','2026-07-07 02:13:12.386');
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
INSERT INTO `videos` (`id`,`title`,`videoUrl`,`coverUrl`,`sort`,`createdAt`,`updatedAt`,`isTop`) VALUES
(1,'å››å·é£žè±¹æ•‘æ´å®£ä¼ ç‰‡','/uploads/videos/promo-2024.mp4','/uploads/images/videos/promo-cover.jpg',1,'2026-07-07 02:13:50.806','2026-07-07 02:13:50.806',0),
(2,'åœ°éœ‡æ•‘æ´å®žæˆ˜æ¼”ç»ƒ','/uploads/videos/earthquake-drill.mp4','/uploads/images/videos/earthquake-cover.jpg',2,'2026-07-07 02:13:50.806','2026-07-07 02:13:50.806',0),
(3,'æ°´åŸŸæ•‘æ´æŠ€èƒ½å±•ç¤º','/uploads/videos/water-rescue.mp4','/uploads/images/videos/water-cover.jpg',3,'2026-07-07 02:13:50.806','2026-07-07 02:13:50.806',0),
(4,'é«˜ç©ºæ•‘æ´è®­ç»ƒçºªå®ž','/uploads/videos/high-altitude.mp4','/uploads/images/videos/altitude-cover.jpg',4,'2026-07-07 02:13:50.806','2026-07-07 02:13:50.806',0),
(5,'四川飞豹救援宣传片','/uploads/videos/promo-2024.mp4','/uploads/images/videos/promo-cover.jpg',1,'2026-07-07 02:34:21.824','2026-07-07 02:34:21.824',0),
(6,'地震救援实战演练','/uploads/videos/earthquake-drill.mp4','/uploads/images/videos/earthquake-cover.jpg',2,'2026-07-07 02:34:21.824','2026-07-07 02:34:21.824',0),
(7,'水域救援技能展示','/uploads/videos/water-rescue.mp4','/uploads/images/videos/water-cover.jpg',3,'2026-07-07 02:34:21.824','2026-07-07 02:34:21.824',0),
(8,'高空救援训练纪实','/uploads/videos/high-altitude.mp4','/uploads/images/videos/altitude-cover.jpg',4,'2026-07-07 02:34:21.824','2026-07-07 02:34:21.824',0);
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
