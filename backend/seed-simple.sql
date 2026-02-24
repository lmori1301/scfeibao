-- 队伍风采数据
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

-- 党建专栏数据
INSERT INTO `party_building` (`title`, `summary`, `content`, `category`, `publishedAt`, `coverImage`, `status`, `sort`)
VALUES
('深入学习贯彻习近平新时代中国特色社会主义思想', '党支部组织学习活动', '四川飞豹救援党支部组织全体党员深入学习贯彻习近平新时代中国特色社会主义思想，不断提高政治站位。', '党建动态', NOW(), '/uploads/images/party/study-1.jpg', 1, 1),
('开展"不忘初心、牢记使命"主题党日活动', '主题党日活动', '党支部组织开展主题党日活动，重温入党誓词，强化党员意识和责任担当。', '党建动态', NOW(), '/uploads/images/party/activity-1.jpg', 1, 2),
('党支部召开组织生活会', '组织生活会', '党支部召开组织生活会，开展批评与自我批评，不断提升党组织凝聚力和战斗力。', '组织建设', NOW(), '/uploads/images/party/meeting-1.jpg', 1, 3),
('优秀党员先进事迹报告会', '先进事迹报告', '举办优秀党员先进事迹报告会，发挥党员先锋模范作用，激励全体队员奋发进取。', '先进典型', NOW(), '/uploads/images/party/model-1.jpg', 1, 4);
