import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dateAlignmentCases = [
  {
    viewFile: './party-work.vue',
    selectors: [
      '.Pixso-paragraph-1_1166',
      '.Pixso-paragraph-1_1167',
      '.Pixso-paragraph-1_1169',
      '.Pixso-paragraph-1_1170',
      '.Pixso-paragraph-1_1172',
      '.Pixso-paragraph-1_1173',
      '.Pixso-paragraph-1_1175',
      '.Pixso-paragraph-1_1176',
    ],
  },
  {
    viewFile: './team-work.vue',
    selectors: [
      '.Pixso-paragraph-1_1380',
      '.Pixso-paragraph-1_1381',
      '.Pixso-paragraph-1_1383',
      '.Pixso-paragraph-1_1384',
      '.Pixso-paragraph-1_1386',
      '.Pixso-paragraph-1_1387',
      '.Pixso-paragraph-1_1389',
      '.Pixso-paragraph-1_1390',
    ],
  },
  {
    viewFile: './members.vue',
    selectors: [
      '.Pixso-paragraph-6_736',
      '.Pixso-paragraph-6_737',
      '.Pixso-paragraph-1_1555',
      '.Pixso-paragraph-1_1556',
      '.Pixso-paragraph-1_1558',
      '.Pixso-paragraph-1_1559',
      '.Pixso-paragraph-1_1561',
      '.Pixso-paragraph-1_1562',
    ],
  },
  {
    viewFile: './study.vue',
    selectors: [
      '.Pixso-paragraph-1_1710',
      '.Pixso-paragraph-1_1711',
      '.Pixso-paragraph-1_1713',
      '.Pixso-paragraph-1_1714',
      '.Pixso-paragraph-1_1716',
      '.Pixso-paragraph-1_1717',
      '.Pixso-paragraph-1_1719',
      '.Pixso-paragraph-1_1720',
    ],
  },
  {
    viewFile: '../team-building/showcase.vue',
    selectors: ['.showcase-date-year', '.showcase-date-day'],
  },
]

const alignedDateRules = [
  'width: 100px;',
  'left: 51.33%;',
  'right: auto;',
  'margin: 0;',
  'text-align: center;',
  'letter-spacing: 0;',
  'white-space: nowrap;',
  'transform: translateX(-50%);',
]

describe('列表日期块对齐', () => {
  it('所有前台列表日期的年/月和日使用统一宽度与水平定位', () => {
    for (const { viewFile, selectors } of dateAlignmentCases) {
      const source = readFileSync(resolve(__dirname, viewFile), 'utf-8')
      const selectorPattern = selectors
        .map((selector) => selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('\\s*,\\s*')
      const ruleMatch = source.match(new RegExp(`${selectorPattern}\\s*\\{([^}]+)\\}`))

      for (const rule of alignedDateRules) {
        expect(ruleMatch?.[1], `${viewFile} 日期选择器缺少对齐规则：${rule}`).toContain(rule)
      }
    }
  })
})
