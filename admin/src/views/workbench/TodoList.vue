<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('news')

const pendingNews = ref([
  { id: 1, title: '救援演练活动报道', author: '张三', submitTime: '2024-01-15 10:30' }
])

const expiringCerts = ref([
  { id: 1, name: '张三', certType: '应急指挥专家', certNo: 'CERT2024001', expiryDate: '2024-02-15', daysLeft: 15 }
])

const maintenanceVehicles = ref([
  { id: 1, plate: '川A12345', type: '救援车', issue: '发动机故障', reportTime: '2024-01-10' }
])

const handleApprove = (item: any) => {
  router.push(`/news`)
}

const handleRenew = (item: any) => {
  router.push(`/certificates`)
}

const handleMaintenance = (item: any) => {
  router.push(`/vehicles`)
}
</script>

<template>
  <div class="todo-list">
    <h2>待办事项</h2>

    <el-tabs v-model="activeTab">
      <el-tab-pane label="待审核新闻" name="news">
        <el-table :data="pendingNews" stripe>
          <el-table-column prop="title" label="标题" />
          <el-table-column prop="author" label="作者" width="100" />
          <el-table-column prop="submitTime" label="提交时间" width="150" />
          <el-table-column label="操作" width="150">
            <template #default="{ row }">
              <el-button text type="primary" size="small" @click="handleApprove(row)">审核</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="即将到期证书" name="certs">
        <el-table :data="expiringCerts" stripe>
          <el-table-column prop="name" label="姓名" width="100" />
          <el-table-column prop="certType" label="证书类型" width="150" />
          <el-table-column prop="certNo" label="证书编号" width="140" />
          <el-table-column prop="expiryDate" label="到期日期" width="110" />
          <el-table-column label="剩余天数" width="100">
            <template #default="{ row }">
              <el-tag :type="row.daysLeft <= 15 ? 'danger' : 'warning'">{{ row.daysLeft }}天</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="{ row }">
              <el-button text type="primary" size="small" @click="handleRenew(row)">续期</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="待维护车辆" name="vehicles">
        <el-table :data="maintenanceVehicles" stripe>
          <el-table-column prop="plate" label="车牌号" width="120" />
          <el-table-column prop="type" label="车辆类型" width="120" />
          <el-table-column prop="issue" label="问题描述" />
          <el-table-column prop="reportTime" label="上报时间" width="110" />
          <el-table-column label="操作" width="150">
            <template #default="{ row }">
              <el-button text type="primary" size="small" @click="handleMaintenance(row)">处理</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.todo-list {
  h2 { margin: 0 0 20px 0; font-size: 20px; font-weight: 500; }
  :deep(.el-table .el-button--text) { padding: 0; }
}
</style>
