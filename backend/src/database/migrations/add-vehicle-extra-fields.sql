-- 车辆台账补充：业务编号、发动机/车架号、发证与有效期

ALTER TABLE `vehicles`
  ADD COLUMN `vehicleNo` varchar(40) NULL COMMENT '车辆编号' AFTER `plateNumber`,
  ADD COLUMN `engineNumber` varchar(64) NULL COMMENT '发动机号' AFTER `brandModel`,
  ADD COLUMN `chassisNumber` varchar(64) NULL COMMENT '车架号码' AFTER `engineNumber`,
  ADD COLUMN `issueDate` date NULL COMMENT '发证日期' AFTER `purchaseDate`,
  ADD COLUMN `validityDate` date NULL COMMENT '有效期限' AFTER `issueDate`;
