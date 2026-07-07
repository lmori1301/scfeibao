ALTER TABLE `locations`
  ADD COLUMN `pointName` varchar(150) NOT NULL DEFAULT '' COMMENT '点位名称' AFTER `name`,
  ADD COLUMN `longitude` decimal(10,6) NOT NULL DEFAULT 0 COMMENT '经度' AFTER `phone`,
  ADD COLUMN `latitude` decimal(10,6) NOT NULL DEFAULT 0 COMMENT '纬度' AFTER `longitude`,
  ADD COLUMN `zoom` int NOT NULL DEFAULT 15 COMMENT '地图缩放级别' AFTER `latitude`;

UPDATE `locations` SET `pointName` = '四川飞豹救援总队指挥中心', `address` = '四川省成都市温江区成名高速凤凰立交四川飞豹救援总队指挥中心', `longitude` = 103.849650, `latitude` = 30.686520, `zoom` = 13 WHERE `name` = '总队指挥部';
UPDATE `locations` SET `pointName` = '四川飞豹救援特勤大队', `address` = '四川省成都市武侯区四川飞豹救援特勤大队', `longitude` = 104.043720, `latitude` = 30.641960, `zoom` = 15 WHERE `name` = '特勤大队';
UPDATE `locations` SET `pointName` = '四川飞豹救援训练与战勤保障大队', `address` = '四川省成都市双流区四川飞豹救援训练与战勤保障大队', `longitude` = 103.923710, `latitude` = 30.574470, `zoom` = 15 WHERE `name` = '训练与战勤保障大队';
UPDATE `locations` SET `pointName` = '四川飞豹救援应急通信与车辆勤务大队', `address` = '四川省成都市龙泉驿区四川飞豹救援应急通信与车辆勤务大队', `longitude` = 104.274620, `latitude` = 30.556580, `zoom` = 15 WHERE `name` = '应急通信与车辆勤务大队';
UPDATE `locations` SET `pointName` = '四川飞豹救援峨眉山直属大队', `address` = '四川省乐山市峨眉山市四川飞豹救援峨眉山直属大队', `longitude` = 103.484230, `latitude` = 29.601190, `zoom` = 15 WHERE `name` = '峨眉山直属大队';
UPDATE `locations` SET `pointName` = '四川飞豹救援搜救犬大队', `address` = '四川省成都市新都区四川飞豹救援搜救犬大队', `longitude` = 104.158170, `latitude` = 30.823440, `zoom` = 15 WHERE `name` = '搜救犬大队';
UPDATE `locations` SET `pointName` = '四川飞豹救援崇州支队', `address` = '四川省成都市崇州市四川飞豹救援崇州支队', `longitude` = 103.673020, `latitude` = 30.630110, `zoom` = 15 WHERE `name` = '崇州支队';
UPDATE `locations` SET `pointName` = '四川飞豹救援南充支队', `address` = '四川省南充市顺庆区四川飞豹救援南充支队', `longitude` = 106.110560, `latitude` = 30.837680, `zoom` = 15 WHERE `name` = '南充支队';
UPDATE `locations` SET `pointName` = '四川飞豹救援天府支队', `address` = '四川省成都市天府新区四川飞豹救援天府支队', `longitude` = 104.076510, `latitude` = 30.509720, `zoom` = 15 WHERE `name` = '天府支队';
UPDATE `locations` SET `pointName` = '四川飞豹救援雅安支队', `address` = '四川省雅安市雨城区四川飞豹救援雅安支队', `longitude` = 103.042400, `latitude` = 30.010560, `zoom` = 15 WHERE `name` = '雅安支队';
UPDATE `locations` SET `pointName` = '四川飞豹救援德阳支队', `address` = '四川省德阳市旌阳区四川飞豹救援德阳支队', `longitude` = 104.398170, `latitude` = 31.127410, `zoom` = 15 WHERE `name` = '德阳支队';
UPDATE `locations` SET `pointName` = '四川飞豹救援达州支队', `address` = '四川省达州市通川区四川飞豹救援达州支队', `longitude` = 107.467910, `latitude` = 31.209660, `zoom` = 15 WHERE `name` = '达州支队';
UPDATE `locations` SET `pointName` = '四川飞豹救援双流大队', `address` = '四川省成都市双流区四川飞豹救援双流大队', `longitude` = 103.923640, `latitude` = 30.574410, `zoom` = 15 WHERE `name` = '双流大队';
UPDATE `locations` SET `pointName` = '四川飞豹救援青白江大队', `address` = '四川省成都市青白江区四川飞豹救援青白江大队', `longitude` = 104.251740, `latitude` = 30.878570, `zoom` = 15 WHERE `name` = '青白江大队';
UPDATE `locations` SET `pointName` = '四川飞豹救援龙泉驿大队', `address` = '四川省成都市龙泉驿区四川飞豹救援龙泉驿大队', `longitude` = 104.274580, `latitude` = 30.556610, `zoom` = 15 WHERE `name` = '龙泉驿大队';
UPDATE `locations` SET `pointName` = '四川飞豹救援南部大队', `address` = '四川省南充市南部县四川飞豹救援南部大队', `longitude` = 106.061510, `latitude` = 31.349310, `zoom` = 15 WHERE `name` = '南部大队';
UPDATE `locations` SET `pointName` = '四川飞豹救援营山大队', `address` = '四川省南充市营山县四川飞豹救援营山大队', `longitude` = 106.565560, `latitude` = 31.077880, `zoom` = 15 WHERE `name` = '营山大队';
