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
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { findNavigationItemByPath, getSessionPermissionNames, navigationGroups } from '@/router/admin-routes'
import http from '@/utils/http'
import { useSessionUser } from '@/utils/session-user'

const route = useRoute()
const router = useRouter()
const notificationCount = ref(0)
const brandLogo = `${import.meta.env.BASE_URL}Vector_4_567.png`

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
  <div class="admin-shell">
    <header class="shell-header">
      <div class="header-surface">
        <div class="brand-wrap">
          <img class="brand-logo" :src="brandLogo" alt="四川飞豹徽标" />
          <div class="brand-name">四川飞豹后台管理系统</div>
        </div>
      </div>

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

    <div class="shell-body">
      <aside class="shell-sidebar">
        <section
          v-for="group in visibleNavigationGroups"
          :key="group.id"
          class="side-group"
          :class="{
            'is-open': groupOpenState[group.id],
            'side-group--overview': group.id === 'overview',
            'side-group--active': currentGroupId === group.id,
          }"
        >
          <button
            type="button"
            class="side-group__title"
            :title="group.title"
            @click="toggleGroup(group.id)"
          >
            <div class="side-group__title-main">
              <el-icon><component :is="resolveIcon(group.icon)" /></el-icon>
              <span>{{ group.title }}</span>
            </div>
            <el-icon class="side-group__arrow">
              <CaretBottom />
            </el-icon>
          </button>

          <div v-show="groupOpenState[group.id]" class="side-group__items">
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
      </aside>

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
  flex-direction: column;
  overflow: hidden;
  background: #f5f7fa;
}

.shell-header {
  min-height: 56px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px 8px 16px;
  position: sticky;
  top: 0;
  z-index: 20;
  box-shadow: none;
}

.header-surface {
  display: flex;
  align-items: center;
  min-width: 0;
}

.brand-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.brand-logo {
  width: 38px;
  height: 38px;
  display: block;
  object-fit: contain;
}

.brand-name {
  font-size: 16px;
  color: #1f2937;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.header-tools {
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
  border-radius: 12px;

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
  border-radius: 12px;
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

.shell-body {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: stretch;
  transition: none;
}

.shell-sidebar {
  flex: 0 0 240px;
  width: 240px;
  margin: 0;
  padding: 8px;
  border: 0;
  border-right: 1px solid #e5e7eb;
  border-radius: 0;
  background: #fff;
  box-shadow: none;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-gutter: stable;
  align-self: stretch;
}

.side-group + .side-group {
  margin-top: 6px;
}

.side-group {
  position: relative;
  border-radius: 8px;
  transition: background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.side-group--active {
  background: #f2f6fe;
  box-shadow: inset 0 0 0 1px #d7e4fa;
}

.side-group--overview {
  margin-bottom: 6px;
  padding: 4px;
  background: #f4f7fd;
  box-shadow: inset 0 0 0 1px #e3ebf8;
}

.side-group--overview.side-group--active {
  background: #eaf1fe;
  box-shadow: inset 0 0 0 1px #cbdcfa;
}

.side-group__title {
  width: 100%;
  min-height: 36px;
  padding: 0 8px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #53627a;
  font-size: 13px;
  cursor: pointer;
}

.side-group--overview .side-group__title {
  min-height: 42px;
  padding-inline: 10px;
  color: #173767;
}

.side-group--overview .side-group__title-main {
  font-size: 14px;
  gap: 8px;
}

.side-group--overview .side-group__title-main :deep(.el-icon) {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background: #2563eb;
  color: #fff;
  font-size: 14px;
}

.side-group__title-main {
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: 600;
}

.side-group__arrow {
  font-size: 12px;
  color: #9aa7bc;
  transition: transform 0.2s ease;
}

.side-group.is-open .side-group__arrow {
  transform: rotate(0deg);
}

.side-group__items { margin-top: 4px; }

.side-group--overview .side-group__items {
  margin-top: 2px;
}

.side-item {
  width: 100%;
  min-height: 34px;
  border: 0;
  background: transparent;
  position: relative;
  text-align: left;
  padding: 7px 10px 7px 28px;
  color: #56657d;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  span {
    display: block;
    white-space: normal;
    overflow-wrap: anywhere;
    line-height: 1.3;
  }

  &:hover {
    background: #eef4ff;
    color: #2563eb;
  }

  &.active {
    color: #2563eb;
    background: #eef4ff;
    font-weight: 600;
    box-shadow: inset 0 0 0 1px #d8e4ff;

    &::after {
      content: '';
      position: absolute;
      right: 8px;
      top: 7px;
      bottom: 7px;
      width: 3px;
      border-radius: 999px;
      background: #2563eb;
    }
  }
}

.side-group--overview .side-item {
  min-height: 40px;
  padding: 10px 12px 10px 16px;
  border-radius: 10px;
  font-size: 12px;
}

.side-group--overview .side-item:hover {
  background: rgba(255, 255, 255, 0.82);
  color: #2153b5;
}

.side-group--overview .side-item.active {
  background: #fff;
  color: #18418b;
  box-shadow: inset 0 0 0 1px #c8d9ff;
}

.side-group--overview .side-item.active::after {
  right: 10px;
  top: 9px;
  bottom: 9px;
  background: #2563eb;
}

.shell-main {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 12px 12px 14px;
}

.content-panel {
  border: 1px solid #e5e7eb;
  background: #fff;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: none;
}

.content-panel__body {
  flex: 1;
  min-height: 0;
  min-width: 0;
  /* 宽表格需横向滚动，hidden 会导致列被压缩重叠 */
  overflow-x: auto;
  overflow-y: auto;
  padding: 16px 18px 18px;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 1280px) {
  .shell-sidebar {
    flex-basis: 240px;
    width: 240px;
  }

  .shell-main {
    padding-inline: 12px;
  }
}

@media (max-width: 960px) {
  .shell-header {
    min-height: 64px;
    padding-block: 10px;
    align-items: flex-start;
    gap: 12px;
    flex-wrap: wrap;
  }

  .header-surface {
    width: auto;
  }

  .brand-logo {
    width: 40px;
    height: 40px;
  }

  .brand-name {
    font-size: 14px;
  }

  .header-tools {
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 10px;
  }

  .shell-sidebar {
    flex: 0 0 96px;
    width: 96px;
    margin: 12px 0 12px 12px;
    padding-inline: 8px;
  }

  .side-group__title {
    padding-inline: 0;
    justify-content: center;
  }

  .side-group--overview {
    padding: 4px;
  }

  .side-group__title-main {
    gap: 0;
  }

  .side-group__title-main span,
  .side-group__arrow {
    display: none;
  }

  .content-panel__body {
    padding: 14px;
  }
}
</style>
