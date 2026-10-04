/**
 * 值班表解析器回归测试（node --test）
 * 覆盖需求截图中的「日期为列」转置布局 + 边界情况。
 *
 * 运行：node --test -r ts-node/register src/common/utils/duty-roster-parser.spec.ts
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseDutyRoster, normalizeStaff } from './duty-roster-parser';

/** 完全复刻需求截图：标题 + 时间行（日期为列）+ 值班干部行 + 值班人员行 */
const SCREENSHOT_MATRIX = [
  ['四川飞豹特勤大队 2026年中秋国庆值班表'],
  ['时间', '9月25日', '9月26日', '9月27日', '10月1日', '10月2日'],
  ['值班干部（电话）', '黄凯15208324794', '陶建伟 13881936662', '李星月 15328066176', '周家海15928613494', '张从富18030454307'],
  ['值班人员（4人）', '王磊、刘勇、周驰双、段才元', '代俊良、张永祥、宁顺其、郎苹', '高欣、周驰双、熊玉蓉、段才元', '黄凯、刘勇、任晓娟、王燕成', '王磊、张永祥、宁顺其、郎苹'],
];

test('转置布局：日期为列，每列解析为一条记录', () => {
  const result = parseDutyRoster(SCREENSHOT_MATRIX);

  assert.equal(result.detectedTeamName, '四川飞豹特勤大队');
  assert.equal(result.detectedYear, '2026');
  assert.equal(result.rows.length, 5);
  assert.equal(result.errors.length, 0);

  const [first, , , , fifth] = result.rows;
  assert.equal(first.dutyDate, '2026-09-25');
  assert.equal(first.dutyCadreName, '黄凯');
  assert.equal(first.dutyCadrePhone, '15208324794');
  assert.equal(first.dutyStaff, '王磊,刘勇,周驰双,段才元');

  assert.equal(fifth.dutyDate, '2026-10-02');
  assert.equal(fifth.dutyCadreName, '张从富');
  assert.equal(fifth.dutyCadrePhone, '18030454307');
});

test('干部姓名与电话分离：带空格分隔', () => {
  const result = parseDutyRoster(SCREENSHOT_MATRIX);
  const second = result.rows[1];
  assert.equal(second.dutyCadreName, '陶建伟');
  assert.equal(second.dutyCadrePhone, '13881936662');
});

test('跨月日期：9月27日 与 10月1日 分别映射', () => {
  const result = parseDutyRoster(SCREENSHOT_MATRIX);
  assert.equal(result.rows[2].dutyDate, '2026-09-27');
  assert.equal(result.rows[3].dutyDate, '2026-10-01');
});

test('缺年份时回落到当前年份', () => {
  const matrix = [
    ['值班表'],
    ['时间', '9月25日'],
    ['值班干部（电话）', '黄凯15208324794'],
    ['值班人员（4人）', '王磊、刘勇'],
  ];
  const result = parseDutyRoster(matrix);
  const expectedYear = String(new Date().getFullYear());
  assert.equal(result.rows[0].dutyDate, `${expectedYear}-09-25`);
  assert.equal(result.detectedYear, undefined);
});

test('完整日期（2026-09-25）原样保留', () => {
  const matrix = [
    ['四川飞豹特勤大队 2026年值班表'],
    ['时间', '2026-09-25', '2026/10/01'],
    ['值班干部', '黄凯15208324794', '陶建伟13881936662'],
    ['值班人员', '王磊、刘勇', '周驰双、段才元'],
  ];
  const result = parseDutyRoster(matrix);
  assert.equal(result.rows[0].dutyDate, '2026-09-25');
  assert.equal(result.rows[1].dutyDate, '2026-10-01');
});

test('缺日期表头时返回明确错误', () => {
  const result = parseDutyRoster([['随便写的一堆内容'], ['没有时间行']]);
  assert.equal(result.rows.length, 0);
  assert.match(result.errors[0].message, /未识别到「时间」表头行/);
});

test('缺干部/人员行时返回明确错误', () => {
  const result = parseDutyRoster([
    ['四川飞豹特勤大队 2026年值班表'],
    ['时间', '9月25日'],
    ['其他行', '随便写'],
  ]);
  assert.equal(result.rows.length, 0);
  assert.match(result.errors[0].message, /未识别到「值班干部」或「值班人员」行/);
});

test('单元格为空时逐列报错而非中断', () => {
  const matrix = [
    ['四川飞豹特勤大队 2026年值班表'],
    ['时间', '9月25日', '9月26日'],
    ['值班干部（电话）', '黄凯15208324794', ''],
    ['值班人员（4人）', '王磊、刘勇', ''],
  ];
  const result = parseDutyRoster(matrix);
  assert.equal(result.rows.length, 1);
  assert.equal(result.errors.length, 1);
  assert.match(result.errors[0].message, /9月26日/);
});

test('空表返回内容为空提示', () => {
  const result = parseDutyRoster([]);
  assert.equal(result.rows.length, 0);
  assert.equal(result.errors[0].message, '值班表内容为空');
});

test('值班员分隔符归一化', () => {
  assert.equal(normalizeStaff('王磊、刘勇，周驰双；段才元'), '王磊,刘勇,周驰双,段才元');
  assert.equal(normalizeStaff('  王磊  刘勇 \n 周驰双 '), '王磊,刘勇,周驰双');
  assert.equal(normalizeStaff(''), '');
});

test('带国际区号与横线的电话可识别', () => {
  const matrix = [
    ['四川飞豹特勤大队 2026年值班表'],
    ['时间', '9月25日'],
    ['值班干部（电话）', '周家海 159-2861-3494'],
    ['值班人员（4人）', '黄凯、刘勇、任晓娟、王燕成'],
  ];
  const result = parseDutyRoster(matrix);
  assert.equal(result.rows[0].dutyCadreName, '周家海');
  assert.equal(result.rows[0].dutyCadrePhone, '15928613494');
});

test('无电话的干部行仍能取到姓名', () => {
  const matrix = [
    ['四川飞豹特勤大队 2026年值班表'],
    ['时间', '9月25日'],
    ['值班干部', '黄凯'],
    ['值班人员（4人）', '王磊、刘勇'],
  ];
  const result = parseDutyRoster(matrix);
  assert.equal(result.rows[0].dutyCadreName, '黄凯');
  assert.equal(result.rows[0].dutyCadrePhone, '');
});

test('回归：标题区出现手机号时不得把号码中段误读为年份', () => {
  // 「15208324794」中含「2083」，早期实现会把它当年份，导致 dutyDate 变成 2083-xx-xx
  const matrix = [
    ['值班表', '联系人黄凯15208324794'],
    ['时间', '9月25日'],
    ['值班干部（电话）', '黄凯15208324794'],
    ['值班人员（4人）', '王磊、刘勇'],
  ];
  const result = parseDutyRoster(matrix);
  assert.equal(result.detectedYear, undefined);
  assert.equal(result.rows[0].dutyDate, `${new Date().getFullYear()}-09-25`);
});

test('回归：长数字串中段的 4 位片段不算年份', () => {
  // 「120832」中段是 2083，前后都紧邻数字，必须靠 (?<!\d)/(?!d) 边界排除
  const matrix = [
    ['第120832期值班安排'],
    ['时间', '9月25日'],
    ['值班干部（电话）', '黄凯15208324794'],
    ['值班人员（4人）', '王磊、刘勇'],
  ];
  const result = parseDutyRoster(matrix);
  assert.equal(result.detectedYear, undefined);
  assert.equal(result.rows[0].dutyDate, `${new Date().getFullYear()}-09-25`);
});

test('标题中独立出现的 4 位年份可正常识别', () => {
  const matrix = [
    ['2026年中秋国庆值班安排'],
    ['时间', '9月25日'],
    ['值班干部（电话）', '黄凯15208324794'],
    ['值班人员（4人）', '王磊、刘勇'],
  ];
  const result = parseDutyRoster(matrix);
  assert.equal(result.detectedYear, '2026');
  assert.equal(result.rows[0].dutyDate, '2026-09-25');
});

test('国际区号前缀可识别并从姓名中剔除', () => {
  const matrix = [
    ['四川飞豹特勤大队 2026年值班表'],
    ['时间', '9月25日'],
    ['值班干部（电话）', '陶建伟+8613881936662'],
    ['值班人员（4人）', '代俊良、张永祥'],
  ];
  const result = parseDutyRoster(matrix);
  assert.equal(result.rows[0].dutyCadreName, '陶建伟');
  assert.equal(result.rows[0].dutyCadrePhone, '13881936662');
});
