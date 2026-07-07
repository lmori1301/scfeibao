<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { Key, Plus, RefreshRight, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import Pagination from '@/components/Pagination.vue'
import { usePagination } from '@/composables/usePagination'
import http from '@/utils/http'
import { formatDateTimeLocal } from '@/utils/format'
import { normalizeRolePermissionNames, rolePermissionTitle } from '@/router/admin-routes'
import type { ElTree } from 'element-plus'

type RoleItem = {
  id: number
  name: string
  code: string
  description?: string
  permissions?: string[]
  status: 'active' | 'disabled'
  createTime: string
}

/** 与 GET /admin/menu-tree 的 tree 节点一致 */
type MenuTreeNode = {
  id: string
  parentId: string | null
  name: string
  level: number
  sort: number
  routeName?: string | null
  children?: MenuTreeNode[]
}

const menuTreeLoading = ref(false)
const menuTreeData = ref<MenuTreeNode[]>([])
const menuTreeRef = ref<InstanceType<typeof ElTree>>()
const dialogVisible = ref(false)
const dialogTitle = ref('新增角色')
const isEdit = ref(false)
const formRef = ref()

type RoleListScope = '' | '启用中' | '已禁用'

const searchForm = ref({
  name: '',
  roleScope: '' as RoleListScope,
})

const { data: roles, total, loading, page, pageSize, fetch, handlePageChange, resetAndFetch } = usePagination(
  (params: Record<string, any>) =>
    http.get('/admin/roles', {
      params: {
        page: params.page,
        pageSize: params.pageSize,
        name: params.name,
        status:
          params.roleScope === '启用中'
            ? 'active'
            : params.roleScope === '已禁用'
              ? 'disabled'
              : undefined,
      },
    })
)
const formData = ref({
  id: undefined as number | undefined,
  name: '',
  code: '',
  description: '',
  permissions: [] as string[],
  status: 'active' as 'active' | 'disabled',
})

const tableRows = computed(() => roles.value as RoleItem[])

const statusLabel = (status: string) => (status === 'active' ? '启用' : '禁用')

const fetchRoles = async () => {
  await fetch({
    name: searchForm.value.name || undefined,
    roleScope: searchForm.value.roleScope || undefined,
  })
}

const handleSearch = () => {
  resetAndFetch({
    name: searchForm.value.name || undefined,
    roleScope: searchForm.value.roleScope || undefined,
  })
}

const handleReset = () => {
  searchForm.value = { name: '', roleScope: '' }
  resetAndFetch()
}

const ensureMenuTree = async () => {
  if (menuTreeData.value.length) return
  menuTreeLoading.value = true
  try {
    const res = (await http.get('/admin/menu-tree')) as { data?: { tree?: MenuTreeNode[] } }
    menuTreeData.value = res.data?.tree ?? []
  } catch {
    menuTreeData.value = []
  } finally {
    menuTreeLoading.value = false
  }
}

const syncPermissionKeysFromTree = () => {
  const leaf = (menuTreeRef.value?.getCheckedKeys(true) as string[]) ?? []
  formData.value.permissions = normalizeRolePermissionNames(leaf)
}

const collectLeafIds = (nodes: MenuTreeNode[]): string[] => {
  const out: string[] = []
  for (const n of nodes) {
    if (n.children?.length) out.push(...collectLeafIds(n.children))
    else out.push(n.id)
  }
  return out
}

const handleTreeSelectAll = () => {
  if (!menuTreeRef.value || !menuTreeData.value.length) return
  menuTreeRef.value.setCheckedKeys(collectLeafIds(menuTreeData.value), false)
  syncPermissionKeysFromTree()
}

const handleTreeInvert = () => {
  if (!menuTreeRef.value || !menuTreeData.value.length) return
  const all = collectLeafIds(menuTreeData.value)
  const cur = new Set((menuTreeRef.value.getCheckedKeys(true) as string[]) ?? [])
  menuTreeRef.value.setCheckedKeys(all.filter((id) => !cur.has(id)), false)
  syncPermissionKeysFromTree()
}

const PERMISSION_PREVIEW_MAX = 4
const permissionPreviewSlice = (row: RoleItem) => (row.permissions || []).slice(0, PERMISSION_PREVIEW_MAX)
const permissionPreviewRest = (row: RoleItem) => Math.max(0, (row.permissions || []).length - PERMISSION_PREVIEW_MAX)

const handleAdd = () => {
  dialogTitle.value = '新增角色'
  isEdit.value = false
  formData.value = {
    id: undefined,
    name: '',
    code: '',
    description: '',
    permissions: [],
    status: 'active',
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

const handleEdit = (row: RoleItem) => {
  dialogTitle.value = '编辑角色'
  isEdit.value = true
  formData.value = {
    id: row.id,
    name: row.name,
    code: row.code,
    description: row.description || '',
    permissions: normalizeRolePermissionNames(row.permissions),
    status: row.status,
  }
  dialogVisible.value = true
  nextTick(() => formRef.value?.clearValidate?.())
}

watch(dialogVisible, async (open) => {
  if (!open) return
  await ensureMenuTree()
  await nextTick()
  await nextTick()
  menuTreeRef.value?.setCheckedKeys(formData.value.permissions, false)
})

const handleDialogClosed = () => {
  formRef.value?.resetFields?.()
  formRef.value?.clearValidate?.()
}

const handleDelete = (row: RoleItem) => {
  ElMessageBox.confirm(`确定删除角色“${row.name}”吗？`, '提示', { type: 'warning' }).then(async () => {
    await http.delete(`/admin/roles/${row.id}`)
    ElMessage.success('删除成功')
    fetchRoles()
  })
}

const handleToggleStatus = (row: RoleItem) => {
  const nextStatus = row.status === 'active' ? 'disabled' : 'active'
  const actionLabel = nextStatus === 'active' ? '启用' : '禁用'
  ElMessageBox.confirm(`确定${actionLabel}该角色吗？`, '提示', { type: 'warning' }).then(async () => {
    await http.put(`/admin/roles/${row.id}/status`, { status: nextStatus })
    ElMessage.success(`${actionLabel}成功`)
    fetchRoles()
  })
}

const handleSave = async () => {
  syncPermissionKeysFromTree()
  const payload = {
    name: formData.value.name,
    description: formData.value.description,
    permissions: formData.value.permissions,
  }

  if (isEdit.value && formData.value.id) {
    await http.put(`/admin/roles/${formData.value.id}`, payload)
    await http.put(`/admin/roles/${formData.value.id}/status`, { status: formData.value.status })
  } else {
    await http.post('/admin/roles', {
      ...payload,
      code: formData.value.code,
      status: formData.value.status,
    })
  }

  ElMessage.success('保存成功')
  dialogVisible.value = false
  fetchRoles()
}

onMounted(fetchRoles)
</script>

<template>
  <div class="permissions-page admin-view-stack">
    <div class="page-crumb">系统首页 / 系统配置 / 权限设置</div>

    <div class="admin-card admin-card--search">
    <div class="admin-list-toolbar">
      <div class="admin-list-toolbar__filters permissions-toolbar__filters">
        <el-select v-model="searchForm.roleScope" placeholder="角色状态" clearable>
          <el-option label="启用中" value="启用中" />
          <el-option label="已禁用" value="已禁用" />
        </el-select>
        <el-input v-model="searchForm.name" placeholder="输入角色名称关键词" clearable class="permissions-toolbar__keyword">
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
      </div>
      <div class="admin-list-toolbar__actions">
        <div class="admin-toolbar-actions__primary">
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </div>
    </div>
    </div>

    <section class="admin-card admin-card--table permissions-panel permissions-table-panel">
      <div class="admin-table-panel__head">
        <div class="panel-title">角色权限列表</div>
        <div class="admin-table-panel__head-actions">
          <el-button plain @click="fetchRoles">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
          <el-button type="primary" @click="handleAdd">
            <el-icon><Plus /></el-icon>
            新增角色
          </el-button>
        </div>
      </div>
      <el-table :data="tableRows" v-loading="loading" stripe>
        <el-table-column type="index" label="序号" width="70" />
        <el-table-column prop="name" label="角色名称" min-width="140" show-overflow-tooltip />
        <el-table-column prop="code" label="角色代码" width="120" show-overflow-tooltip />
        <el-table-column label="描述" min-width="200" show-overflow-tooltip>
          <template #default="{ row }">{{ row.description || '—' }}</template>
        </el-table-column>
        <el-table-column label="权限范围" min-width="220">
          <template #default="{ row }">
            <div class="permission-badges">
              <template v-if="(row.permissions || []).length">
                <el-tag v-for="item in permissionPreviewSlice(row)" :key="item" effect="plain" size="small">
                  {{ rolePermissionTitle(item) }}
                </el-tag>
                <el-popover v-if="permissionPreviewRest(row) > 0" placement="top" :width="340" trigger="hover">
                  <template #reference>
                    <el-tag class="permission-badges__ellipsis" effect="plain" size="small">…</el-tag>
                  </template>
                  <div class="permission-badges__popover">
                    <el-tag
                      v-for="item in row.permissions || []"
                      :key="item"
                      effect="plain"
                      size="small"
                      class="permission-badges__popover-tag"
                    >
                      {{ rolePermissionTitle(item) }}
                    </el-tag>
                  </div>
                </el-popover>
              </template>
              <span v-else class="permission-badges__empty">未配置权限</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'info'">{{ statusLabel(row.status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="170">
          <template #default="{ row }">{{ formatDateTimeLocal(row.createTime) }}</template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="220"
          fixed="right"
          class-name="admin-table-ops-col"
          label-class-name="admin-table-ops-col--header"
        >
          <template #default="{ row }">
            <div class="admin-table-ops">
              <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button link :type="row.status === 'active' ? 'warning' : 'success'" @click="handleToggleStatus(row)">
                {{ row.status === 'active' ? '禁用' : '启用' }}
              </el-button>
              <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="total" :page="page" :page-size="pageSize" @change="handlePageChange" />
    </section>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="1220px" @closed="handleDialogClosed">
      <div class="permissions-dialog">
        <div class="permissions-dialog__main">
          <el-form ref="formRef" :model="formData" label-width="96px">
            <section class="permissions-form-section">
              <div class="permissions-form-section__header">
                <strong>角色信息</strong>
                <span>先定义角色名称、代码和用途描述，明确权限边界。</span>
              </div>
              <div class="permissions-form-section__body">
                <el-form-item label="角色名称">
                  <el-input v-model="formData.name" />
                </el-form-item>
                <el-form-item label="角色代码">
                  <el-input v-model="formData.code" :disabled="isEdit" placeholder="例如：admin_manager" />
                </el-form-item>
                <el-form-item label="描述">
                  <el-input v-model="formData.description" type="textarea" :rows="4" />
                </el-form-item>
              </div>
            </section>

            <section class="permissions-form-section">
              <div class="permissions-form-section__header">
                <strong>权限配置</strong>
                <span>树形勾选菜单；支持全选/反选；保存为叶子路由标识。</span>
              </div>
              <div class="permissions-form-section__body">
                <el-form-item label="菜单权限">
                  <div class="role-menu-tree-shell">
                    <div class="role-menu-tree-toolbar">
                      <el-button size="small" type="primary" plain :disabled="!menuTreeData.length" @click="handleTreeSelectAll">
                        全选
                      </el-button>
                      <el-button size="small" plain :disabled="!menuTreeData.length" @click="handleTreeInvert">反选</el-button>
                    </div>
                    <div v-loading="menuTreeLoading" class="role-menu-tree-wrap">
                      <el-tree
                        v-if="menuTreeData.length"
                        ref="menuTreeRef"
                        class="role-menu-tree"
                        :data="menuTreeData"
                        show-checkbox
                        node-key="id"
                        :props="{ label: 'name', children: 'children' }"
                        default-expand-all
                        :expand-on-click-node="false"
                        @check="syncPermissionKeysFromTree"
                      />
                      <div v-else-if="!menuTreeLoading" class="role-menu-tree__empty">未能加载菜单树，请刷新页面重试</div>
                    </div>
                  </div>
                </el-form-item>

                <el-form-item label="状态">
                  <el-select v-model="formData.status" style="width: 100%">
                    <el-option label="启用" value="active" />
                    <el-option label="禁用" value="disabled" />
                  </el-select>
                </el-form-item>
              </div>
            </section>
          </el-form>
        </div>
        <aside class="permissions-dialog__side">
          <div class="preview-card">
            <div class="preview-card__icon"><el-icon><Key /></el-icon></div>
            <strong>{{ formData.name || '未填写角色名称' }}</strong>
            <p>{{ formData.code || '角色代码将在这里显示' }}</p>
            <div class="preview-card__meta">
              <span>{{ formData.permissions.length }} 项权限</span>
              <span>{{ formData.status === 'active' ? '当前启用' : '当前禁用' }}</span>
            </div>
          </div>
        </aside>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.permissions-page { display: flex; flex-direction: column; gap: 18px; }
.permissions-panel, .preview-card { border: 1px solid #e6edf7; background: #fff; }
.permissions-toolbar__filters :deep(.permissions-toolbar__keyword) {
  width: 240px !important;
  max-width: 320px !important;
  flex: 0 0 auto !important;
}
.permissions-dialog__main { min-width: 0; }
.permissions-form-section {
  border: 1px solid #e6edf8;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  box-shadow: 0 12px 28px rgba(31, 57, 106, 0.04);
}
.permissions-form-section + .permissions-form-section { margin-top: 16px; }
.permissions-form-section__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #eef3fb;
}
.permissions-form-section__header strong { color: #1f2f46; font-size: 15px; font-weight: 700; }
.permissions-form-section__header span { color: #7a879d; font-size: 12px; line-height: 1.6; }
.permissions-form-section__body { padding: 18px 20px 4px; }
.permissions-form-section__body :deep(.el-form-item) { margin-bottom: 14px; }
.permissions-panel { padding: 20px; border-radius: 22px; overflow: hidden; }
.preview-card__icon {
  width: 60px; height: 60px; border-radius: 18px; display: grid; place-items: center;
  background: linear-gradient(135deg, #edf3ff 0%, #dce8ff 100%); color: #2f67ff; font-size: 24px; flex: 0 0 auto;
}
.permission-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}
.permission-badges__ellipsis {
  cursor: default;
  font-weight: 700;
  color: #5a6a85;
}
.permission-badges__popover {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 240px;
  overflow-y: auto;
}
.permission-badges__popover-tag { margin: 0; }
.permission-badges__empty { color: #7b879b; font-size: 12px; }
.permissions-dialog {
  display: grid;
  grid-template-columns: minmax(520px, 1fr) 260px;
  gap: 20px;
  align-items: start;
}
.preview-card { padding: 18px; border-radius: 20px; background: linear-gradient(180deg, #f7fbff 0%, #edf4ff 100%); }
.preview-card strong { display: block; margin-top: 14px; font-size: 18px; color: #1f2f46; }
.preview-card p { margin-top: 8px; color: #718198; font-size: 13px; }
.preview-card__meta { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.preview-card__meta span {
  padding: 6px 10px; border-radius: 999px; background: rgba(47, 103, 255, 0.1); color: #2f67ff; font-size: 12px; font-weight: 600;
}
.role-menu-tree-shell {
  width: 100%;
  min-width: 0;
}
.role-menu-tree-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}
.role-menu-tree-wrap {
  min-height: 120px;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e4e9f2;
  border-radius: 12px;
  background: #fbfcff;
  box-sizing: border-box;
}
.role-menu-tree {
  width: 100%;
  max-height: min(52vh, 480px);
  overflow: auto;
  padding-right: 4px;
}
.role-menu-tree :deep(.el-tree-node__content) {
  border-radius: 6px;
  padding-block: 2px;
}
.role-menu-tree__empty {
  font-size: 13px;
  color: #8b98ad;
  padding: 12px 0;
}
@media (max-width: 1280px) {
  .permissions-dialog { grid-template-columns: 1fr; }
  .permissions-dialog__side { order: -1; }
}
</style>
