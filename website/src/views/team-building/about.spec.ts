import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import TeamAbout from './about.vue'

const longContent = `<p>${'四川飞豹救援坚持人民至上，生命至上，围绕综合应急救援开展专业训练。'.repeat(260)}</p>`

vi.mock('@/api/team-building', () => ({
  getTeamAbout: vi.fn(() =>
    Promise.resolve({
      code: 200,
      message: 'ok',
      data: { content: longContent },
    }),
  ),
}))

vi.mock('@/api/config', () => ({
  getWebsiteConfig: vi.fn(() =>
    Promise.resolve({
      code: 200,
      message: 'ok',
      data: {
        host_unit: '四川飞豹救援',
        organizer_unit: '四川飞豹救援新闻宣传处',
        icp_number: '蜀ICP备2026009479',
        copyright: 'Copyright®2026 www.scfeibao.com All rights reserved',
      },
    }),
  ),
}))

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div />' } },
    { path: '/team-building', component: { template: '<div />' } },
    { path: '/team-building/about', component: TeamAbout },
    { path: '/team-building/cases', component: { template: '<div />' } },
    { path: '/team-building/showcase', component: { template: '<div />' } },
    { path: '/overview-info', component: { template: '<div />' } },
    { path: '/party-building', component: { template: '<div />' } },
    { path: '/info-public', component: { template: '<div />' } },
    { path: '/dynamic-news', component: { template: '<div />' } },
    { path: '/policy-regulations', component: { template: '<div />' } },
    { path: '/query-system', component: { template: '<div />' } },
    { path: '/search-result', component: { template: '<div />' } },
  ],
})

describe('team-building/about.vue', () => {
  beforeEach(async () => {
    router.push('/team-building/about')
    await router.isReady()
  })

  it('长篇队伍介绍内容应该撑开页面并下移底部区域', async () => {
    const wrapper = mount(TeamAbout, {
      global: {
        plugins: [router],
      },
    })

    await flushPromises()
    await nextTick()

    expect(wrapper.vm.pageHeight).toBeGreaterThan(1872)
    expect(wrapper.vm.footerTop).toBeGreaterThan(1647)
  })
})
