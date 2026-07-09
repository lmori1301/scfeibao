<template>
  <div class="personnel-public-page">
    <div v-if="loading" class="state-block">
      <el-icon class="is-loading state-icon"><Loading /></el-icon>
      <p>加载中...</p>
    </div>

    <div v-else-if="error" class="state-block state-block--error">
      <el-icon class="state-icon"><WarningFilled /></el-icon>
      <p>{{ error }}</p>
    </div>

    <div v-else-if="personnel" class="detail-shell">
      <div class="detail-card">
        <header class="detail-card__head">
          <div class="detail-card__avatar">
            <img v-if="photoUrls[0]" :src="photoUrls[0]" alt="照片" />
            <span v-else class="detail-card__avatar-placeholder">人员照片预览</span>
          </div>
        </header>

        <section class="detail-card__body">
          <h2 class="detail-card__section-title">人员信息</h2>
          <el-descriptions :column="1" border class="detail-desc">
            <el-descriptions-item label="人员编号">{{ personnel.personnelCode || personnel.id || '—' }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ personnel.name || '—' }}</el-descriptions-item>
            <el-descriptions-item label="身份证号">{{ personnel.idCard || '—' }}</el-descriptions-item>
            <el-descriptions-item label="性别">{{ personnel.gender || '—' }}</el-descriptions-item>
            <el-descriptions-item label="出生日期">{{ formatDate(personnel.birthDate) }}</el-descriptions-item>
            <el-descriptions-item label="联系电话">{{ personnel.phone || '—' }}</el-descriptions-item>
            <el-descriptions-item label="电子邮箱">{{ personnel.email || '—' }}</el-descriptions-item>
            <el-descriptions-item label="工作单位">{{ personnel.workUnit || '—' }}</el-descriptions-item>
            <el-descriptions-item label="所属队伍">{{ personnel.team || '—' }}</el-descriptions-item>
            <el-descriptions-item label="职务">{{ personnel.position || '—' }}</el-descriptions-item>
            <el-descriptions-item label="入队日期">{{ formatDate(personnel.joinDate) }}</el-descriptions-item>
            <el-descriptions-item label="出勤次数">{{ personnel.taskCount != null ? `${personnel.taskCount} 次` : '—' }}</el-descriptions-item>
            <el-descriptions-item label="培训时长">{{ personnel.trainingHours != null ? `${personnel.trainingHours} 小时` : '—' }}</el-descriptions-item>
            <el-descriptions-item label="在职状态">
              <el-tag :type="personnel.status === 1 ? 'success' : 'info'" size="small">
                {{ personnel.status === 1 ? '在职' : '离职' }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="审核状态">
              <el-tag
                :type="personnel.auditStatus === 1 ? 'success' : personnel.auditStatus === 0 ? 'warning' : 'danger'"
                size="small"
              >
                {{ auditStatusLabel(personnel.auditStatus) }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>

          <div v-if="personnel.remark" class="detail-card__block">
            <h3 class="detail-card__block-title">备注</h3>
            <div class="detail-card__text">{{ personnel.remark }}</div>
          </div>
        </section>

        <footer class="detail-card__foot">
          <p>四川飞豹救援</p>
          <p class="detail-card__time">更新时间：{{ formatDate(personnel.updatedAt) }}</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Loading, WarningFilled } from '@element-plus/icons-vue'
import http from '@/utils/http'
import { parsePhotoUrlListForDisplay } from '@/utils/photo-urls'

const route = useRoute()
const loading = ref(true)
const error = ref('')
const personnel = ref<Record<string, unknown> | null>(null)

const photoUrls = computed(() =>
  personnel.value ? parsePhotoUrlListForDisplay(String(personnel.value.photoUrl ?? '')) : []
)

const formatDate = (date: unknown) => {
  if (!date) return '—'
  const d = new Date(date as string | number | Date)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('zh-CN')
}

const auditStatusLabel = (v: unknown) => {
  const n = Number(v)
  if (n === 0) return '待审核'
  if (n === 1) return '已通过'
  if (n === 2) return '已拒绝'
  return '—'
}

const fetchPersonnelDetail = async () => {
  try {
    loading.value = true
    error.value = ''
    const id = route.params.id
    const res = (await http.get(`/personnel/${id}`)) as { data?: Record<string, unknown> }
    const row = res?.data
    if (row && typeof row === 'object' && row.id != null) {
      personnel.value = row
    } else {
      error.value = '未找到人员信息'
    }
  } catch {
    error.value = '获取人员信息失败'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPersonnelDetail()
})
</script>

<style scoped lang="scss">
.personnel-public-page {
  min-height: 100vh;
  background: #eef2f8;
  padding: 20px 16px 32px;
}

.state-block {
  max-width: 480px;
  margin: 48px auto;
  text-align: center;
  color: #5a6a85;
  font-size: 15px;

  .state-icon {
    font-size: 40px;
    margin-bottom: 12px;
    color: #2f67ff;
  }

  &--error .state-icon {
    color: #e6a23c;
  }
}

.detail-shell {
  max-width: 720px;
  margin: 0 auto;
}

.detail-card {
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e4eaf4;
  box-shadow: 0 12px 40px rgba(31, 57, 106, 0.08);
  overflow: hidden;
}

.detail-card__head {
  padding: 18px;
  text-align: center;
  background: #f7fbff;
  color: #1f2f46;
}

.detail-card__avatar {
  width: 100%;
  aspect-ratio: 4 / 3;
  margin: 0 auto;
  border-radius: 0;
  overflow: hidden;
  border: none;
  background: #edf3fb;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.detail-card__avatar-placeholder {
  font-size: 14px;
  color: #8b98ad;
}

.detail-card__body {
  padding: 20px 18px 8px;
}

.detail-card__section-title {
  margin: 0 0 12px;
  font-size: 16px;
  font-weight: 700;
  color: #1f2f46;
}

.detail-desc {
  width: 100%;
}

.detail-card__block {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #eef3fb;
}

.detail-card__block-title {
  margin: 0 0 10px;
  font-size: 15px;
  font-weight: 600;
  color: #1f2f46;
}

.detail-card__text {
  font-size: 14px;
  line-height: 1.75;
  color: #4a5568;
  white-space: pre-wrap;
}

.detail-card__foot {
  padding: 16px 18px 20px;
  text-align: center;
  background: #f8fafc;
  color: #8a96aa;
  font-size: 12px;

  p {
    margin: 4px 0;
  }
}

.detail-card__time {
  color: #b0bac9;
}

@media (max-width: 480px) {
  .personnel-public-page {
    padding: 12px 10px 24px;
  }
}
</style>
