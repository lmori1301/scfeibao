-- ============================================
-- 四川飞豹救援系统 - 完整数据迁移脚本
-- ============================================

-- 1. 队伍风采数据 (team_showcase)
INSERT INTO `team_showcase` (`title`, `imageUrl`, `description`, `sort`)
VALUES
('训练场景1', '/uploads/images/team/training-1.jpg', '队员进行绳索救援训练', 1),
('训练场景2', '/uploads/images/team/training-2.jpg', '队员进行高空救援训练', 2),
('训练场景3', '/uploads/images/team/training-3.jpg', '队员进行水域救援训练', 3),
('训练场景4', '/uploads/images/team/training-4.jpg', '队员进行地震救援训练', 4),
('实战场景1', '/uploads/images/team/action-1.jpg', '队员参与实战救援', 5),
('实战场景2', '/uploads/images/team/action-2.jpg', '队员转移被困群众', 6),
('实战场景3', '/uploads/images/team/action-3.jpg', '队员开展搜救工作', 7),
('实战场景4', '/uploads/images/team/action-4.jpg', '队员进行医疗救护', 8);

-- 2. 党建专栏数据 (party_building)
INSERT INTO `party_building` (`title`, `summary`, `content`, `category`, `publishedAt`, `coverImage`, `status`, `sort`)
VALUES
('深入学习贯彻习近平新时代中国特色社会主义思想', '党支部组织学习活动', '四川飞豹救援党支部组织全体党员深入学习贯彻习近平新时代中国特色社会主义思想，不断提高政治站位。', '党建动态', NOW(), '/uploads/images/party/study-1.jpg', 1, 1),
('开展"不忘初心、牢记使命"主题党日活动', '主题党日活动', '党支部组织开展主题党日活动，重温入党誓词，强化党员意识和责任担当。', '党建动态', NOW(), '/uploads/images/party/activity-1.jpg', 1, 2),
('党支部召开组织生活会', '组织生活会', '党支部召开组织生活会，开展批评与自我批评，不断提升党组织凝聚力和战斗力。', '组织建设', NOW(), '/uploads/images/party/meeting-1.jpg', 1, 3),
('优秀党员先进事迹报告会', '先进事迹报告', '举办优秀党员先进事迹报告会，发挥党员先锋模范作用，激励全体队员奋发进取。', '先进典型', NOW(), '/uploads/images/party/model-1.jpg', 1, 4);

-- 3. 人员信息数据 (personnel)
INSERT INTO `personnel` (`name`, `position`, `rank`, `specialty`, `joinDate`, `photo`, `phone`, `email`)
VALUES
('张伟', '队长', '一级指挥员', '综合救援', '2020-01-15', '/uploads/images/personnel/zhang-wei.jpg', '13800138001', 'zhangwei@feibao.com'),
('李明', '副队长', '二级指挥员', '地震救援', '2020-03-20', '/uploads/images/personnel/li-ming.jpg', '13800138002', 'liming@feibao.com'),
('王强', '中队长', '三级指挥员', '水域救援', '2021-05-10', '/uploads/images/personnel/wang-qiang.jpg', '13800138003', 'wangqiang@feibao.com'),
('刘洋', '班长', '四级消防士', '高空救援', '2021-08-15', '/uploads/images/personnel/liu-yang.jpg', '13800138004', 'liuyang@feibao.com'),
('陈杰', '队员', '四级消防士', '医疗救护', '2022-01-20', '/uploads/images/personnel/chen-jie.jpg', '13800138005', 'chenjie@feibao.com');

-- 4. 车辆装备数据 (vehicles)
INSERT INTO `vehicles` (`name`, `type`, `model`, `plateNumber`, `purchaseDate`, `status`, `photo`)
VALUES
('抢险救援消防车', '消防车', 'MAN TGM 18.340', '川A·12345', '2021-06-01', '在用', '/uploads/images/vehicles/fire-truck-1.jpg'),
('水罐消防车', '消防车', '五十铃FVR', '川A·12346', '2021-07-15', '在用', '/uploads/images/vehicles/water-truck-1.jpg'),
('登高平台消防车', '消防车', '中联重科ZLJ5320', '川A·12347', '2022-03-20', '在用', '/uploads/images/vehicles/platform-truck-1.jpg'),
('救护车', '特种车辆', '福特全顺', '川A·12348', '2022-05-10', '在用', '/uploads/images/vehicles/ambulance-1.jpg'),
('指挥车', '特种车辆', '丰田普拉多', '川A·12349', '2022-08-15', '在用', '/uploads/images/vehicles/command-car-1.jpg');

-- 5. 资质证书数据 (certificates)
INSERT INTO `certificates` (`name`, `type`, `issueOrg`, `issueDate`, `expiryDate`, `certificateNo`, `image`)
VALUES
('消防救援队伍资质证书', '资质证书', '四川省应急管理厅', '2023-01-15', '2028-01-14', 'SC-XF-2023-001', '/uploads/images/certificates/cert-1.jpg'),
('应急救援队伍备案证明', '备案证明', '四川省应急管理厅', '2023-02-20', '2028-02-19', 'SC-YJ-2023-002', '/uploads/images/certificates/cert-2.jpg'),
('社会救援力量资质证书', '资质证书', '中国应急管理部', '2023-03-10', '2028-03-09', 'CN-SH-2023-003', '/uploads/images/certificates/cert-3.jpg'),
('ISO9001质量管理体系认证', '体系认证', '中国质量认证中心', '2023-04-15', '2026-04-14', 'ISO9001-2023-004', '/uploads/images/certificates/cert-4.jpg');

-- 6. 政策法规数据 (policies)
INSERT INTO `policies` (`title`, `content`, `category`, `publishDate`, `issueOrg`, `policyNo`, `file`)
VALUES
('中华人民共和国消防法', '为了预防火灾和减少火灾危害，加强应急救援工作，保护人身、财产安全，维护公共安全，制定本法。', '法律法规', '2021-04-29', '全国人民代表大会常务委员会', '主席令第81号', '/uploads/files/policies/fire-law.pdf'),
('应急救援队伍管理办法', '为规范应急救援队伍建设和管理，提高应急救援能力，制定本办法。', '部门规章', '2022-06-01', '应急管理部', '应急管理部令第5号', '/uploads/files/policies/rescue-management.pdf'),
('四川省消防条例', '为了预防火灾和减少火灾危害，加强应急救援工作，根据《中华人民共和国消防法》，结合本省实际，制定本条例。', '地方法规', '2023-01-01', '四川省人民代表大会常务委员会', '川人常〔2022〕15号', '/uploads/files/policies/sichuan-fire.pdf'),
('社会救援力量参与应急救援的指导意见', '为规范和引导社会救援力量有序参与应急救援工作，制定本指导意见。', '政策文件', '2023-03-15', '应急管理部', '应急〔2023〕8号', '/uploads/files/policies/social-rescue.pdf');

-- 7. 信息公开数据 (info_public)
INSERT INTO `info_public` (`title`, `content`, `category`, `publishDate`, `department`, `file`)
VALUES
('2024年度工作计划', '2024年度四川飞豹救援工作计划，包括队伍建设、装备采购、训练演练等方面的安排。', '工作计划', NOW(), '综合办公室', '/uploads/files/info/work-plan-2024.pdf'),
('2023年度工作总结', '2023年度四川飞豹救援工作总结，全面回顾一年来的工作成效和经验教训。', '工作总结', '2024-01-15', '综合办公室', '/uploads/files/info/work-summary-2023.pdf'),
('财务预算公开', '2024年度四川飞豹救援财务预算公开，包括收入预算、支出预算等详细信息。', '财务信息', '2024-02-01', '财务部', '/uploads/files/info/budget-2024.pdf'),
('人事任免公告', '关于四川飞豹救援人事任免的公告，涉及干部任免、岗位调整等事项。', '人事信息', '2024-01-20', '人事部', '/uploads/files/info/personnel-2024.pdf');
