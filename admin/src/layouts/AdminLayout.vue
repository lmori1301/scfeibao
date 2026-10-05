<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  Avatar,
  Bell,
  CaretBottom,
  Collection,
  DataAnalysis,
  Document,
  DocumentCopy,
  Expand,
  Files,
  Flag,
  Fold,
  FolderOpened,
  Grid,
  House,
  Link,
  List,
  Location,
  Lock,
  Memo,
  Menu,
  Picture,
  PictureFilled,
  Postcard,
  Promotion,
  QuestionFilled,
  Reading,
  Search,
  Setting,
  User,
  UserFilled,
  Van,
  VideoCamera,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { findNavigationItemByPath, getSessionPermissionNames, navigationGroups } from '@/router/admin-routes'
import http from '@/utils/http'
import { useSessionUser } from '@/utils/session-user'

const route = useRoute()
const router = useRouter()
const notificationCount = ref(0)
const brandLogo = `${import.meta.env.BASE_URL}Vector_4_567.png`

/** 侧栏收起态（对齐 web2 的「收起」行为），本地记忆 */
const COLLAPSE_KEY = 'scfeibao_admin_sidenav_collapsed'
const collapsed = ref(localStorage.getItem(COLLAPSE_KEY) === '1')
watch(collapsed, (v) => localStorage.setItem(COLLAPSE_KEY, v ? '1' : '0'))

const groupOpenState = reactive<Record<string, boolean>>(
  Object.fromEntries(navigationGroups.map((group) => [group.id, group.id === 'overview']))
)

const iconMap: Record<string, any> = {
  Avatar,
  Bell,
  CaretBottom,
  Collection,
  DataAnalysis,
  Document,
  DocumentCopy,
  Files,
  Flag,
  FolderOpened,
  Grid,
  House,
  Link,
  List,
  Location,
  Lock,
  Memo,
  Menu,
  Picture,
  PictureFilled,
  Postcard,
  Promotion,
  QuestionFilled,
  Reading,
  Search,
  Setting,
  User,
  UserFilled,
  Van,
  VideoCamera,
}

const resolveIcon = (name?: string) => iconMap[name || 'Menu'] || Menu

const currentItem = computed(() => findNavigationItemByPath(route.path))
const currentGroupId = computed(() => currentItem.value?.groupId || 'overview')

/** 顶栏面包屑：首页 / 分组 / 当前页（对齐 web2 顶栏式面包屑，页面内不再重复展示） */
const breadcrumbTrail = computed(() => {
  const item = currentItem.value
  const group = navigationGroups.find((g) => g.id === (item?.groupId || 'overview'))
  const trail: string[] = ['首页']
  if (group?.title) trail.push(group.title)
  if (item?.title && item.title !== group?.title) trail.push(item.title)
  return trail
})

const { user: currentUser } = useSessionUser()
const allowedPermissions = computed(() => new Set(getSessionPermissionNames(currentUser.value as any)))
const visibleNavigationGroups = computed(() =>
  navigationGroups
    .map((group) => ({
      ...group,
      children: group.children.filter((item) => allowedPermissions.value.has(item.name)),
    }))
    .filter((group) => group.children.length > 0)
)

/** 会话里占位用展示名：不当作顶栏主展示，避免盖住登录名或已维护的姓名 */
const SESSION_DISPLAY_PLACEHOLDERS = new Set(['测试用户', 'Test User', 'Test'])

/**
 * 顶栏：优先「姓名」（与「用户管理」中维护的展示名一致），占位名则改用登录名。
 * 不必为去掉「测试用户」而强制换账号登录；在「用户管理」改本人姓名并保存后会写入会话。
 */
const headerDisplayName = computed(() => {
  const u = currentUser.value as { realName?: string; name?: string; username?: string }
  const login = String(u?.username || '').trim()
  const label = String(u?.name || u?.realName || '').trim()

  if (label && !SESSION_DISPLAY_PLACEHOLDERS.has(label)) return label
  if (login) return login
  if (label) return label
  return '用户'
})

const handleNavigate = (path: string) => {
  if (route.path !== path) {
    router.push(path)
  }
}

const syncOpenGroupByPath = (path: string) => {
  const matchedItem = findNavigationItemByPath(path)
  const targetGroupId = matchedItem?.groupId || 'overview'
  Object.keys(groupOpenState).forEach((id) => {
    groupOpenState[id] = id === targetGroupId
  })
}

const loadNotificationCount = async () => {
  try {
    const res = await http.get('/admin/dashboard/notifications')
    notificationCount.value = Array.isArray(res.data) ? res.data.length : 0
  } catch {
    notificationCount.value = 0
  }
}

const toggleGroup = (groupId: string) => {
  // 收起态下点击分组图标：先展开侧栏，再打开该分组
  if (collapsed.value) {
    collapsed.value = false
    Object.keys(groupOpenState).forEach((id) => {
      groupOpenState[id] = id === groupId
    })
    return
  }
  const willOpen = !groupOpenState[groupId]
  Object.keys(groupOpenState).forEach((id) => {
    groupOpenState[id] = false
  })
  groupOpenState[groupId] = willOpen
}

const handleOpenHelp = () => {
  ElMessage.info('帮助文档建设中，已为您返回工作台。')
  handleNavigate('/dashboard')
}

const handleOpenNotifications = () => {
  handleNavigate('/notifications')
}

const handleOpenProfileSecurity = () => {
  router.push('/profile-security')
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}

onMounted(loadNotificationCount)
onMounted(() => {
  syncOpenGroupByPath(route.path)
})

watch(
  () => route.path,
  (path) => {
    syncOpenGroupByPath(path)
  },
  { immediate: true }
)
</script>

<template>
  <div class="admin-shell" :class="{ 'is-collapsed': collapsed }">
    <!-- ============ 侧边栏：蓝色品牌块 + 白色菜单 + 收起 ============ -->
    <aside class="shell-sidebar">
      <div class="side-brand">
        <span class="side-brand__logo">
          <img :src="brandLogo" alt="四川飞豹徽标" />
        </span>
        <span class="side-brand__text">四川飞豹后台管理系统</span>
        <button
          class="side-brand__fold"
          type="button"
          title="收起菜单"
          aria-label="收起菜单"
          @click="collapsed = true"
        >
          <el-icon><Fold /></el-icon>
        </button>
      </div>

      <nav class="side-nav">
        <section
          v-for="group in visibleNavigationGroups"
          :key="group.id"
          class="side-group"
          :class="{
            'is-open': groupOpenState[group.id],
            'side-group--active': currentGroupId === group.id,
          }"
        >
          <button
            type="button"
            class="side-group__title"
            :title="group.title"
            @click="toggleGroup(group.id)"
          >
            <span class="side-group__icon">
              <el-icon><component :is="resolveIcon(group.icon)" /></el-icon>
            </span>
            <span class="side-group__label">{{ group.title }}</span>
            <el-icon class="side-group__arrow">
              <CaretBottom />
            </el-icon>
          </button>

          <div v-show="groupOpenState[group.id] && !collapsed" class="side-group__items">
            <button
              v-for="item in group.children"
              :key="item.path"
              type="button"
              class="side-item"
              :class="{ active: route.path === `/${item.path}` }"
              :title="item.title"
              @click="handleNavigate(`/${item.path}`)"
            >
              <span>{{ item.title }}</span>
            </button>
          </div>
        </section>
      </nav>

      <div class="side-foot">
        <button
          v-if="!collapsed"
          class="side-foot__btn"
          type="button"
          title="收起菜单"
          @click="collapsed = true"
        >
          <el-icon><Fold /></el-icon>
          <span>收起</span>
        </button>
        <button
          v-else
          class="side-foot__btn side-foot__btn--mini"
          type="button"
          title="展开菜单"
          aria-label="展开菜单"
          @click="collapsed = false"
        >
          <el-icon><Expand /></el-icon>
        </button>
      </div>
    </aside>

    <!-- ============ 右侧：顶栏（面包屑 + 用户） + 内容区 ============ -->
    <div class="shell-right">
      <header class="shell-header">
        <nav class="crumb" aria-label="当前位置">
          <template v-for="(seg, index) in breadcrumbTrail" :key="`${seg}-${index}`">
            <span v-if="index > 0" class="crumb__sep">/</span>
            <span class="crumb__seg" :class="{ 'is-last': index === breadcrumbTrail.length - 1 }">
              {{ seg }}
            </span>
          </template>
        </nav>

        <div class="header-tools">
          <button class="icon-btn" type="button" title="帮助入口" @click="handleOpenHelp">
            <el-icon><QuestionFilled /></el-icon>
          </button>
          <button class="icon-btn icon-btn--notice" type="button" title="系统通知" @click="handleOpenNotifications">
            <el-badge :value="notificationCount" :hidden="notificationCount === 0" :max="99">
              <el-icon><Bell /></el-icon>
            </el-badge>
          </button>
          <el-dropdown trigger="click" placement="bottom-end">
            <button class="header-user-name" type="button" title="个人菜单">
              <el-icon><User /></el-icon>
              <strong>{{ headerDisplayName }}</strong>
              <el-icon class="header-user-name__arrow"><CaretBottom /></el-icon>
            </button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleOpenProfileSecurity">个人中心</el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <main class="shell-main">
        <section class="content-panel">
          <div class="content-panel__body">
            <router-view />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-shell {
  height: 100vh;
  min-height: 100vh;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  background: #f5f7fa;
}

/* ---------------- 侧边栏 ---------------- */
.shell-sidebar {
  flex: 0 0 240px;
  width: 240px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  overflow: hidden;
  transition: width 0.2s ease, flex-basis 0.2s ease;
}

/* 品牌块：蓝底白字（对齐 web2 .gh-brand） */
.side-brand {
  flex: none;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  background: #2563eb;
  color: #fff;
}

.side-brand__logo {
  flex: none;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #fff;
  display: grid;
  place-items: center;
  overflow: hidden;

  img {
    width: 24px;
    height: 24px;
    display: block;
    object-fit: contain;
  }
}

.side-brand__text {
  flex: 1;
  min-width: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.side-brand__fold {
  flex: none;
  width: 26px;
  height: 26px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }
}

.side-nav {
  flex: 1;
  min-height: 0;
  padding: 8px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-gutter: stable;
}

.side-group + .side-group {
  margin-top: 2px;
}

.side-group__title {
  width: 100%;
  height: 38px;
  padding: 0 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4b5563;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: #f5f7fa;
  }
}

.side-group__icon {
  flex: none;
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  color: #6b7280;

  :deep(.el-icon) {
    font-size: 17px;
  }
}

.side-group__label {
  flex: 1;
  min-width: 0;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.side-group__arrow {
  flex: none;
  font-size: 12px;
  color: #9ca3af;
  transition: transform 0.2s ease;
}

.side-group.is-open .side-group__arrow {
  transform: rotate(180deg);
}

/* 当前分组：图标与标题取主色 */
.side-group--active .side-group__title,
.side-group--active .side-group__icon {
  color: #2563eb;
}

.side-group__items {
  padding: 2px 0 4px;
}

.side-item {
  position: relative;
  width: 100%;
  min-height: 34px;
  padding: 7px 10px 7px 34px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  text-align: left;
  color: #4b5563;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;

  span {
    display: block;
    line-height: 1.35;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  &:hover {
    background: #f5f7fa;
    color: #2563eb;
  }

  /* 选中态：浅蓝块 + 左侧 3px 蓝条（对齐 web2 .el-menu-item.is-active） */
  &.active {
    background: #eff6ff;
    color: #2563eb;
    font-weight: 600;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 7px;
      bottom: 7px;
      width: 3px;
      border-radius: 0 3px 3px 0;
      background: #2563eb;
    }
  }
}

/* 侧栏底部：收起 / 展开 */
.side-foot {
  flex: none;
  padding: 4px 8px;
  border-top: 1px solid #eef0f3;
  display: flex;
  justify-content: flex-end;
}

.side-foot__btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #6b7280;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background: #f5f7fa;
    color: #2563eb;
  }
}

.side-foot__btn--mini {
  padding: 0 8px;
}

/* ---------------- 收起态 ---------------- */
.admin-shell.is-collapsed {
  .shell-sidebar {
    flex-basis: 64px;
    width: 64px;
  }

  .side-brand {
    padding: 0;
    justify-content: center;
  }

  .side-brand__text,
  .side-brand__fold,
  .side-foot__btn span {
    display: none;
  }

  .side-nav {
    padding-inline: 8px;
  }

  .side-group__title {
    justify-content: center;
    padding: 0;
    gap: 0;
  }

  .side-group__label,
  .side-group__arrow {
    display: none;
  }
}

/* ---------------- 右侧列 ---------------- */
.shell-right {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.shell-header {
  flex: none;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.crumb {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  font-size: 13px;
  color: #6b7280;
}

.crumb__sep {
  color: #d1d5db;
}

.crumb__seg {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.crumb__seg.is-last {
  color: #1f2937;
  font-weight: 600;
}

.header-tools {
  flex: none;
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-btn,
.header-user-name {
  border: 0;
  background: transparent;
  color: #4b5563;
  cursor: pointer;
}

.icon-btn {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 6px;

  &:hover {
    background: #eff6ff;
    color: #2563eb;
  }
}

.icon-btn--notice :deep(.el-badge__content) {
  border: 0;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.9);
}

.header-user-name {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 4px 0 8px;
  min-height: 36px;
  border-radius: 6px;
}

.header-user-name:hover {
  background: #eff6ff;
}

.header-user-name :deep(.el-icon) {
  color: #6b7280;
  font-size: 16px;
}

.header-user-name strong {
  max-width: 160px;
  color: #1f2937;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.header-user-name:hover strong,
.header-user-name:hover :deep(.el-icon) {
  color: #2563eb;
}

.header-user-name__arrow {
  font-size: 12px !important;
  opacity: 0.82;
}

/* ---------------- 内容区：卡片直接浮在页面灰底上（对齐 web2 无外层白卡） ---------------- */
.shell-main {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 12px;
  overflow: hidden;
}

.content-panel {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  overflow: hidden;
}

.content-panel__body {
  flex: 1;
  min-width: 0;
  min-height: 0;
  padding: 0;
  overflow-x: auto;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 1280px) {
  .shell-sidebar {
    flex-basis: 240px;
    width: 240px;
  }
}

@media (max-width: 960px) {
  .shell-header {
    padding-inline: 12px;
    gap: 10px;
  }

  .crumb {
    font-size: 12px;
  }

  .header-user-name strong {
    max-width: 96px;
  }

  .shell-main {
    padding: 10px;
  }
}
</style>
