-- ============================================================================
-- 迁移：12-leadership-dict.sql
-- 用途：为「门户内容 → 领导信息」表单的 民族 / 学历 / 政治面貌 三个下拉提供
--       数据字典种子（system_dict_data），由前端调用
--       GET /system/dict/data/type/:dictType 读取（该接口为 @Public）。
-- 说明：
--   1) 幂等：同一 (dict_type, dict_value) 若已存在则跳过，可重复执行。
--   2) 【重要】脚本头必须 SET NAMES utf8mb4。MySQL 8 的 mysql CLI 默认
--      character_set_client=latin1（实为 cp1252），若不带此语句，UTF-8 字节会
--      被二次编码写库，页面下拉将出现 "ä¸å...±å...šå'˜" 之类的 mojibake 乱码。
--      手工用 CLI 执行时必须同时加 --default-character-set=utf8mb4。
--   3) 数据内容：民族（中华人民共和国 56 个民族） 56 条、学历 8 条、
--      政治面貌 13 条，共 77 条。
--   4) 与 11-team-duty.sql 同惯例；duty_year / team_name 之外新增字典类型
--      无需改动后端（optionsByType 对任意 dictType 直查本表）。
-- ============================================================================

SET NAMES utf8mb4;

INSERT INTO `system_dict_data` (`dict_type`, `dict_label`, `dict_value`, `sort`, `status`)
SELECT t.dict_type, t.dict_label, t.dict_value, t.sort, 1
FROM (
          SELECT 'nation' AS dict_type, '汉族' AS dict_label, '汉族' AS dict_value, 1 AS sort
  UNION ALL SELECT 'nation', '蒙古族', '蒙古族', 2
  UNION ALL SELECT 'nation', '回族', '回族', 3
  UNION ALL SELECT 'nation', '藏族', '藏族', 4
  UNION ALL SELECT 'nation', '维吾尔族', '维吾尔族', 5
  UNION ALL SELECT 'nation', '苗族', '苗族', 6
  UNION ALL SELECT 'nation', '彝族', '彝族', 7
  UNION ALL SELECT 'nation', '壮族', '壮族', 8
  UNION ALL SELECT 'nation', '布依族', '布依族', 9
  UNION ALL SELECT 'nation', '朝鲜族', '朝鲜族', 10
  UNION ALL SELECT 'nation', '满族', '满族', 11
  UNION ALL SELECT 'nation', '侗族', '侗族', 12
  UNION ALL SELECT 'nation', '瑶族', '瑶族', 13
  UNION ALL SELECT 'nation', '白族', '白族', 14
  UNION ALL SELECT 'nation', '土家族', '土家族', 15
  UNION ALL SELECT 'nation', '哈尼族', '哈尼族', 16
  UNION ALL SELECT 'nation', '哈萨克族', '哈萨克族', 17
  UNION ALL SELECT 'nation', '傣族', '傣族', 18
  UNION ALL SELECT 'nation', '黎族', '黎族', 19
  UNION ALL SELECT 'nation', '傈僳族', '傈僳族', 20
  UNION ALL SELECT 'nation', '佤族', '佤族', 21
  UNION ALL SELECT 'nation', '畲族', '畲族', 22
  UNION ALL SELECT 'nation', '高山族', '高山族', 23
  UNION ALL SELECT 'nation', '拉祜族', '拉祜族', 24
  UNION ALL SELECT 'nation', '水族', '水族', 25
  UNION ALL SELECT 'nation', '东乡族', '东乡族', 26
  UNION ALL SELECT 'nation', '纳西族', '纳西族', 27
  UNION ALL SELECT 'nation', '景颇族', '景颇族', 28
  UNION ALL SELECT 'nation', '柯尔克孜族', '柯尔克孜族', 29
  UNION ALL SELECT 'nation', '土族', '土族', 30
  UNION ALL SELECT 'nation', '达斡尔族', '达斡尔族', 31
  UNION ALL SELECT 'nation', '仫佬族', '仫佬族', 32
  UNION ALL SELECT 'nation', '羌族', '羌族', 33
  UNION ALL SELECT 'nation', '布朗族', '布朗族', 34
  UNION ALL SELECT 'nation', '撒拉族', '撒拉族', 35
  UNION ALL SELECT 'nation', '毛南族', '毛南族', 36
  UNION ALL SELECT 'nation', '仡佬族', '仡佬族', 37
  UNION ALL SELECT 'nation', '锡伯族', '锡伯族', 38
  UNION ALL SELECT 'nation', '阿昌族', '阿昌族', 39
  UNION ALL SELECT 'nation', '普米族', '普米族', 40
  UNION ALL SELECT 'nation', '塔吉克族', '塔吉克族', 41
  UNION ALL SELECT 'nation', '怒族', '怒族', 42
  UNION ALL SELECT 'nation', '乌孜别克族', '乌孜别克族', 43
  UNION ALL SELECT 'nation', '俄罗斯族', '俄罗斯族', 44
  UNION ALL SELECT 'nation', '鄂温克族', '鄂温克族', 45
  UNION ALL SELECT 'nation', '德昂族', '德昂族', 46
  UNION ALL SELECT 'nation', '保安族', '保安族', 47
  UNION ALL SELECT 'nation', '裕固族', '裕固族', 48
  UNION ALL SELECT 'nation', '京族', '京族', 49
  UNION ALL SELECT 'nation', '塔塔尔族', '塔塔尔族', 50
  UNION ALL SELECT 'nation', '独龙族', '独龙族', 51
  UNION ALL SELECT 'nation', '鄂伦春族', '鄂伦春族', 52
  UNION ALL SELECT 'nation', '赫哲族', '赫哲族', 53
  UNION ALL SELECT 'nation', '门巴族', '门巴族', 54
  UNION ALL SELECT 'nation', '珞巴族', '珞巴族', 55
  UNION ALL SELECT 'nation', '基诺族', '基诺族', 56
  UNION ALL SELECT 'education', '小学', '小学', 1
  UNION ALL SELECT 'education', '初中', '初中', 2
  UNION ALL SELECT 'education', '高中', '高中', 3
  UNION ALL SELECT 'education', '中专', '中专', 4
  UNION ALL SELECT 'education', '大专', '大专', 5
  UNION ALL SELECT 'education', '本科', '本科', 6
  UNION ALL SELECT 'education', '硕士研究生', '硕士研究生', 7
  UNION ALL SELECT 'education', '博士研究生', '博士研究生', 8
  UNION ALL SELECT 'political_status', '中共党员', '中共党员', 1
  UNION ALL SELECT 'political_status', '中共预备党员', '中共预备党员', 2
  UNION ALL SELECT 'political_status', '共青团员', '共青团员', 3
  UNION ALL SELECT 'political_status', '民革党员', '民革党员', 4
  UNION ALL SELECT 'political_status', '民盟盟员', '民盟盟员', 5
  UNION ALL SELECT 'political_status', '民建会员', '民建会员', 6
  UNION ALL SELECT 'political_status', '民进会员', '民进会员', 7
  UNION ALL SELECT 'political_status', '农工党党员', '农工党党员', 8
  UNION ALL SELECT 'political_status', '致公党党员', '致公党党员', 9
  UNION ALL SELECT 'political_status', '九三学社社员', '九三学社社员', 10
  UNION ALL SELECT 'political_status', '台盟盟员', '台盟盟员', 11
  UNION ALL SELECT 'political_status', '无党派人士', '无党派人士', 12
  UNION ALL SELECT 'political_status', '群众', '群众', 13
) AS t
WHERE NOT EXISTS (
  SELECT 1 FROM `system_dict_data` AS d
   WHERE d.dict_type = t.dict_type AND d.dict_value = t.dict_value
);

-- 验证 -----------------------------------------------------------------------
SELECT dict_type, COUNT(*) AS n FROM `system_dict_data`
 WHERE dict_type IN ('nation', 'education', 'political_status')
 GROUP BY dict_type ORDER BY dict_type;
