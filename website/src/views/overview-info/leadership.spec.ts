/**
 * leadership.vue 组件测试
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import Leadership from './leadership.vue'

const mockItems = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `领导${i + 1}`,
  position: '职位甲、职位乙',
  gender: '男',
  nation: '汉族',
  birth: '1980年1月',
  education: '本科',
  political: '中共党员',
  duty: '职责说明',
  experience: 10,
  actions: 50,
  photo: '',
  sort: i,
}))

vi.mock('@/api/overview-info', () => ({
  getLeadershipList: vi.fn(() =>
    Promise.resolve({
      code: 200,
      message: 'ok',
      data: { items: mockItems, total: 24, page: 1, pageSize: 500 },
    })
  ),
}))

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/overview-info/leadership', component: Leadership }],
})

describe('Leadership.vue', () => {
  let wrapper: Awaited<ReturnType<typeof mount>>

  beforeEach(async () => {
    router.push('/overview-info/leadership')
    await router.isReady()

    wrapper = mount(Leadership, {
      global: {
        plugins: [router],
        stubs: { 'el-dialog': true },
      },
    })
    await flushPromises()
    await nextTick()
  })

  it('应该正确渲染组件', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.scroll-container-1_183').exists()).toBe(true)
  })

  it('应该显示12个领导（默认每页12条）', () => {
    expect(wrapper.vm.paginatedLeaders.length).toBe(12)
  })

  it('计算总页数应该正确（24个领导，每页12条 = 2页）', () => {
    expect(wrapper.vm.totalPages).toBe(2)
  })

  it('切换到每页24条时应该显示所有领导', async () => {
    wrapper.vm.pageSize = 24
    await nextTick()

    expect(wrapper.vm.totalPages).toBe(1)
    expect(wrapper.vm.paginatedLeaders.length).toBe(24)
  })

  it('点击下一页应该切换到第2页', async () => {
    wrapper.vm.handlePageChange(2)
    await nextTick()

    expect(wrapper.vm.currentPage).toBe(2)
  })

  it('打开详情弹窗应该设置正确的索引', async () => {
    wrapper.vm.openDetail(5)
    await nextTick()

    expect(wrapper.vm.detailVisible).toBe(true)
    expect(wrapper.vm.detailIndex).toBe(5)
  })

  it('关闭详情弹窗应该重置状态', async () => {
    wrapper.vm.openDetail(5)
    await nextTick()

    wrapper.vm.closeDetail()
    await nextTick()

    expect(wrapper.vm.detailVisible).toBe(false)
  })

  it('页码跳转应该正确工作', async () => {
    wrapper.vm.jumpPage = 2
    wrapper.vm.handleJump()
    await nextTick()

    expect(wrapper.vm.currentPage).toBe(2)
  })

  it('跳转到超出范围的页码应该限制到最大页码', async () => {
    wrapper.vm.jumpPage = 999
    wrapper.vm.handleJump()
    await nextTick()

    expect(wrapper.vm.currentPage).toBe(wrapper.vm.totalPages)
  })
})
