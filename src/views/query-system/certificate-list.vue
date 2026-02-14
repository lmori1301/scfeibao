<template>
    <div class="scroll-container-1_2501">
        <div id="1_2501" class="Pixso-frame-1_2501">
            <div id="1_2502" class="Pixso-vector-1_2502"></div>
            <div id="1_2503" class="Pixso-vector-1_2503"></div>
            <div id="1_2506" class="Pixso-vector-1_2506"></div>
            <p id="1_2509" class="Pixso-paragraph-1_2509">
                {{ "四川飞豹救援" }}
            </p>
            <p id="1_2510" class="Pixso-paragraph-1_2510">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <p id="1_2519" class="Pixso-paragraph-1_2519">
                当前位置：<router-link to="/" class="query-breadcrumb-link">首页</router-link> > <router-link to="/query-system/certificate" class="query-breadcrumb-link">证书查询系统</router-link> > <span class="query-breadcrumb-current">证书列表</span>
            </p>
            <div id="1_2520" class="Pixso-text-1_2520">{{ "&nbsp;" }}</div>
            <div id="1_2521" class="Pixso-vector-1_2521"></div>
            <div id="1_2522" class="Pixso-vector-1_2522"></div>
            <div id="1_2523" class="Pixso-vector-1_2523"></div>
            <div id="1_2524" class="Pixso-vector-1_2524"></div>
            <div id="1_2525" class="Pixso-vector-1_2525"></div>

            <!-- 表头 -->
            <p id="1_2526" class="Pixso-paragraph-1_2526">{{ "序号" }}</p>
            <div id="1_2547" class="Pixso-vector-1_2547"></div>
            <div id="1_2548" class="Pixso-vector-1_2548"></div>
            <p id="1_2549" class="Pixso-paragraph-1_2549">{{ "证书编号" }}</p>
            <div id="1_2570" class="Pixso-vector-1_2570"></div>
            <div id="1_2571" class="Pixso-vector-1_2571"></div>
            <p id="1_2572" class="Pixso-paragraph-1_2572">{{ "证书类型" }}</p>
            <div id="1_2593" class="Pixso-vector-1_2593"></div>
            <div id="1_2613" class="Pixso-vector-1_2613"></div>
            <div id="1_2614" class="Pixso-vector-1_2614"></div>
            <p id="1_2615" class="Pixso-paragraph-1_2615">{{ "姓名" }}</p>
            <div id="1_2636" class="Pixso-vector-1_2636"></div>
            <div id="1_2637" class="Pixso-vector-1_2637"></div>
            <p id="1_2638" class="Pixso-paragraph-1_2638">{{ "工作单位" }}</p>
            <div id="1_2659" class="Pixso-vector-1_2659"></div>
            <div id="1_2660" class="Pixso-vector-1_2660"></div>
            <p id="1_2661" class="Pixso-paragraph-1_2661">{{ "发证日期" }}</p>
            <div id="1_2682" class="Pixso-vector-1_2682"></div>
            <div id="1_2683" class="Pixso-vector-1_2683"></div>
            <p id="1_2684" class="Pixso-paragraph-1_2684">{{ "有效期至" }}</p>
            <div id="1_2705" class="Pixso-vector-1_2705"></div>
            <div id="1_2706" class="Pixso-vector-1_2706"></div>
            <p id="1_2707" class="Pixso-paragraph-1_2707">{{ "状态" }}</p>
            <div id="1_2728" class="Pixso-vector-1_2728"></div>
            <div id="1_2748" class="Pixso-vector-1_2748"></div>
            <div id="1_2749" class="Pixso-vector-1_2749"></div>
            <p id="1_2750" class="Pixso-paragraph-1_2750">{{ "操作" }}</p>
            <div id="1_2771" class="Pixso-vector-1_2771"></div>

            <!-- 动态数据行 -->
            <template v-for="(cert, index) in paginatedCertificates" :key="cert.id">
                <!-- 序号列 -->
                <div class="table-row-divider" :style="{ top: `${36.08 + index * 3.09}%` }"></div>
                <p class="table-cell table-cell-serial" :style="{ top: `${36.78 + index * 3.09}%` }">{{ cert.serialNumber }}</p>

                <!-- 证书编号列 -->
                <div class="table-row-divider" :style="{ top: `${36.08 + index * 3.09}%`, left: '10.42%', right: '79.58%' }"></div>
                <p class="table-cell table-cell-cert-number" :style="{ top: `${36.78 + index * 3.09}%` }">{{ cert.certificateNumber }}</p>

                <!-- 证书类型列 -->
                <div class="table-row-divider" :style="{ top: `${36.08 + index * 3.09}%`, left: '23.02%', right: '66.98%' }"></div>
                <p class="table-cell table-cell-cert-type" :style="{ top: `${36.78 + index * 3.09}%` }">{{ cert.certificateType }}</p>

                <!-- 姓名列 -->
                <div class="table-row-divider" :style="{ top: `${36.08 + index * 3.09}%`, left: '35.62%', right: '54.38%' }"></div>
                <p class="table-cell table-cell-name" :style="{ top: `${36.78 + index * 3.09}%` }">{{ cert.name }}</p>

                <!-- 工作单位列 -->
                <div class="table-row-divider" :style="{ top: `${36.08 + index * 3.09}%`, left: '48.23%', right: '41.77%' }"></div>
                <p class="table-cell table-cell-work-unit" :style="{ top: `${36.78 + index * 3.09}%` }">{{ cert.workUnit }}</p>

                <!-- 发证日期列 -->
                <div class="table-row-divider" :style="{ top: `${36.08 + index * 3.09}%`, left: '60.83%', right: '29.17%' }"></div>
                <p class="table-cell table-cell-issue-date" :style="{ top: `${36.78 + index * 3.09}%` }">{{ cert.issueDate }}</p>

                <!-- 有效期至列 -->
                <div class="table-row-divider" :style="{ top: `${36.08 + index * 3.09}%`, left: '73.44%', right: '16.56%' }"></div>
                <p class="table-cell table-cell-valid-until" :style="{ top: `${36.78 + index * 3.09}%` }">{{ cert.validUntil }}</p>

                <!-- 状态列 -->
                <div class="table-row-divider" :style="{ top: `${36.08 + index * 3.09}%`, left: '86.04%', right: '3.96%' }"></div>
                <p class="table-cell table-cell-status" :style="{ top: `${36.78 + index * 3.09}%` }">{{ cert.status }}</p>

                <!-- 操作列 -->
                <div class="table-row-divider" :style="{ top: `${36.08 + index * 3.09}%`, left: '89.27%', right: '0.73%' }"></div>
                <p
                    class="table-cell table-cell-action"
                    :style="{ top: `${36.78 + index * 3.09}%` }"
                    @click="goToDetail(cert.id)"
                >{{ "查看详情" }}</p>
            </template>

            <p id="1_2802" class="Pixso-paragraph-1_2802">
                {{ `查询结果   共找到 ${totalCertificates} 条记录` }}
            </p>

            <!-- 分页组件 -->
            <div style="position: absolute; right: 5.5%; top: 82%; height: 2.2%;">
                <Pagination
                    :total="totalCertificates"
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-size-options="[10, 20, 30]"
                    @page-change="handlePageChange"
                />
            </div>

            <div id="1_2879" class="Pixso-vector-1_2879"></div>
            <div id="17_26" class="Pixso-vector-17_26"></div>
            <div id="1_2892" class="Pixso-vector-1_2892"></div>
            <div id="33_237" class="Pixso-group-33_237" @click.stop>
            <div id="33_238" class="Pixso-vector-33_238"></div>
            <!-- 输入框 -->
            <input
                v-model="searchKey"
                @keyup.enter="doSearch"
                placeholder="请输入您要搜索的内容"
                class="search-input"
            />
            <!-- 搜索图标点击 -->
            <div
                id="33_240"
                class="Pixso-vector-33_240"
                style="cursor: pointer"
                @click="doSearch"
            ></div>
        </div>
            <router-link id="33_785" to="/overview-info" class="Pixso-paragraph-33_785 main-nav-link">概况信息</router-link>
            <router-link id="33_786" to="/team-building" class="Pixso-paragraph-33_786 main-nav-link">队伍建设</router-link>
            <router-link id="33_788" to="/party-building" class="Pixso-paragraph-33_788 main-nav-link">党建专栏</router-link>
            <router-link id="33_787" to="/info-public" class="Pixso-paragraph-33_787 main-nav-link">信息公开</router-link>
            <router-link id="33_789" to="/dynamic-news" class="Pixso-paragraph-33_789 main-nav-link">动态要闻</router-link>
            <router-link id="33_790" to="/policy-regulations" class="Pixso-paragraph-33_790 main-nav-link">政策法规</router-link>
            <router-link id="33_792" to="/query-system" class="Pixso-paragraph-33_792 main-nav-link">查询系统</router-link>
            <div id="34_80" class="Pixso-group-34_80">
                <p id="34_81" class="Pixso-paragraph-34_81">
                    {{ "主办单位：四川飞豹救援" }}
                </p>
                <p id="34_82" class="Pixso-paragraph-34_82">
                    {{ "承办单位：四川飞豹救援新闻宣传处" }}
                </p>
                <p id="34_83" class="Pixso-paragraph-34_83">
                    {{ "蜀ICP备XXXXXXX号" }}
                </p>
                <p id="34_84" class="Pixso-paragraph-34_84">
                    {{ "Copyright®2025 sc.feibao.com All rights reserved" }}
                </p>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Pagination from '@/components/common/Pagination.vue'

const router = useRouter()

// 分页状态
const currentPage = ref(1)
const pageSize = ref(10)

// 证书数据接口
interface Certificate {
    id: number
    serialNumber: number
    certificateNumber: string
    certificateType: string
    name: string
    workUnit: string
    issueDate: string
    validUntil: string
    status: string
}

// 模拟证书数据
const certificates = ref<Certificate[]>([
    {
        id: 1,
        serialNumber: 1,
        certificateNumber: 'SC20251209001',
        certificateType: '应急指挥专家',
        name: '张伟',
        workUnit: '四川飞豹救援',
        issueDate: '2023-03-15',
        validUntil: '2028-03-14',
        status: '有效'
    },
    {
        id: 2,
        serialNumber: 2,
        certificateNumber: 'SC20251209002',
        certificateType: '绳索救援技术员',
        name: '李明',
        workUnit: '四川飞豹救援',
        issueDate: '2023-04-20',
        validUntil: '2026-04-19',
        status: '有效'
    },
    {
        id: 3,
        serialNumber: 3,
        certificateNumber: 'SC20251209003',
        certificateType: '潜水救援教练',
        name: '王强',
        workUnit: '四川飞豹救援',
        issueDate: '2022-11-05',
        validUntil: '2025-11-04',
        status: '有效'
    },
    {
        id: 4,
        serialNumber: 4,
        certificateNumber: 'SC20251209004',
        certificateType: '城市搜救技术员',
        name: '刘洋',
        workUnit: '四川飞豹救援',
        issueDate: '2023-05-10',
        validUntil: '2028-05-09',
        status: '有效'
    },
    {
        id: 5,
        serialNumber: 5,
        certificateNumber: 'SC20251209005',
        certificateType: '山地救援教练',
        name: '陈杰',
        workUnit: '四川飞豹救援',
        issueDate: '2023-02-15',
        validUntil: '2026-02-14',
        status: '有效'
    },
    {
        id: 6,
        serialNumber: 6,
        certificateNumber: 'SC20251209006',
        certificateType: '急救医疗专家',
        name: '赵敏',
        workUnit: '四川飞豹救援',
        issueDate: '2022-12-10',
        validUntil: '2025-12-09',
        status: '有效'
    },
    {
        id: 7,
        serialNumber: 7,
        certificateNumber: 'SC20251209007',
        certificateType: '高级急救师',
        name: '孙丽',
        workUnit: '四川飞豹救援',
        issueDate: '2021-10-20',
        validUntil: '2024-10-19',
        status: '有效'
    },
    {
        id: 8,
        serialNumber: 8,
        certificateNumber: 'SC20251209008',
        certificateType: '水域救援技术员',
        name: '周涛',
        workUnit: '四川飞豹救援',
        issueDate: '2023-01-15',
        validUntil: '2026-01-14',
        status: '过期'
    },
    {
        id: 9,
        serialNumber: 9,
        certificateNumber: 'SC20251209009',
        certificateType: '无人机操作师',
        name: '吴鹏',
        workUnit: '四川飞豹救援',
        issueDate: '2022-09-20',
        validUntil: '2025-09-19',
        status: '过期'
    },
    {
        id: 10,
        serialNumber: 10,
        certificateNumber: 'SC20251209010',
        certificateType: '装备管理工程师',
        name: '郑浩',
        workUnit: '四川飞豹救援',
        issueDate: '2023-06-05',
        validUntil: '2028-06-04',
        status: '过期'
    },
    {
        id: 11,
        serialNumber: 11,
        certificateNumber: 'SC20251209011',
        certificateType: '地震救援专家',
        name: '黄磊',
        workUnit: '四川飞豹救援',
        issueDate: '2023-07-12',
        validUntil: '2028-07-11',
        status: '有效'
    },
    {
        id: 12,
        serialNumber: 12,
        certificateNumber: 'SC20251209012',
        certificateType: '火灾救援技术员',
        name: '徐静',
        workUnit: '四川飞豹救援',
        issueDate: '2023-08-18',
        validUntil: '2026-08-17',
        status: '有效'
    },
    {
        id: 13,
        serialNumber: 13,
        certificateNumber: 'SC20251209013',
        certificateType: '化学救援专家',
        name: '朱勇',
        workUnit: '四川飞豹救援',
        issueDate: '2022-10-25',
        validUntil: '2025-10-24',
        status: '有效'
    },
    {
        id: 14,
        serialNumber: 14,
        certificateNumber: 'SC20251209014',
        certificateType: '通信保障工程师',
        name: '林峰',
        workUnit: '四川飞豹救援',
        issueDate: '2023-09-08',
        validUntil: '2028-09-07',
        status: '有效'
    },
    {
        id: 15,
        serialNumber: 15,
        certificateNumber: 'SC20251209015',
        certificateType: '后勤保障专家',
        name: '何娟',
        workUnit: '四川飞豹救援',
        issueDate: '2023-03-22',
        validUntil: '2026-03-21',
        status: '有效'
    },
    {
        id: 16,
        serialNumber: 16,
        certificateNumber: 'SC20251209016',
        certificateType: '心理辅导师',
        name: '胡斌',
        workUnit: '四川飞豹救援',
        issueDate: '2022-11-30',
        validUntil: '2025-11-29',
        status: '有效'
    },
    {
        id: 17,
        serialNumber: 17,
        certificateNumber: 'SC20251209017',
        certificateType: '搜救犬训导员',
        name: '郭亮',
        workUnit: '四川飞豹救援',
        issueDate: '2021-12-15',
        validUntil: '2024-12-14',
        status: '过期'
    },
    {
        id: 18,
        serialNumber: 18,
        certificateNumber: 'SC20251209018',
        certificateType: '航空救援飞行员',
        name: '邓超',
        workUnit: '四川飞豹救援',
        issueDate: '2023-04-05',
        validUntil: '2026-04-04',
        status: '有效'
    },
    {
        id: 19,
        serialNumber: 19,
        certificateNumber: 'SC20251209019',
        certificateType: '医疗救护专家',
        name: '冯丽',
        workUnit: '四川飞豹救援',
        issueDate: '2022-08-20',
        validUntil: '2025-08-19',
        status: '过期'
    },
    {
        id: 20,
        serialNumber: 20,
        certificateNumber: 'SC20251209020',
        certificateType: '灾害评估专家',
        name: '曾伟',
        workUnit: '四川飞豹救援',
        issueDate: '2023-10-10',
        validUntil: '2028-10-09',
        status: '有效'
    },
    {
        id: 21,
        serialNumber: 21,
        certificateNumber: 'SC20251209021',
        certificateType: '建筑结构专家',
        name: '彭军',
        workUnit: '四川飞豹救援',
        issueDate: '2023-05-28',
        validUntil: '2026-05-27',
        status: '有效'
    },
    {
        id: 22,
        serialNumber: 22,
        certificateNumber: 'SC20251209022',
        certificateType: '环境监测工程师',
        name: '谢芳',
        workUnit: '四川飞豹救援',
        issueDate: '2022-09-15',
        validUntil: '2025-09-14',
        status: '有效'
    },
    {
        id: 23,
        serialNumber: 23,
        certificateNumber: 'SC20251209023',
        certificateType: '物资调配专员',
        name: '韩冰',
        workUnit: '四川飞豹救援',
        issueDate: '2021-11-08',
        validUntil: '2024-11-07',
        status: '过期'
    },
    {
        id: 24,
        serialNumber: 24,
        certificateNumber: 'SC20251209024',
        certificateType: '信息技术专家',
        name: '唐宇',
        workUnit: '四川飞豹救援',
        issueDate: '2023-06-18',
        validUntil: '2026-06-17',
        status: '有效'
    },
    {
        id: 25,
        serialNumber: 25,
        certificateNumber: 'SC20251209025',
        certificateType: '法律顾问',
        name: '董娜',
        workUnit: '四川飞豹救援',
        issueDate: '2022-07-25',
        validUntil: '2025-07-24',
        status: '有效'
    }
])

// 计算总数
const totalCertificates = computed(() => certificates.value.length)

// 计算当前页显示的证书
const paginatedCertificates = computed(() => {
    const start = (currentPage.value - 1) * pageSize.value
    const end = start + pageSize.value
    return certificates.value.slice(start, end)
})

// 页码改变处理
function handlePageChange() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 跳转到详情页
function goToDetail(id: number) {
    router.push(`/query-system/certificate/${id}`)
}

// 搜索
const searchKey = ref('')

// 7个模块路由
const searchModules = [
  { name: '概况信息', path: '/overview-info' },
  { name: '队伍建设', path: '/team-building' },
  { name: '党建专栏', path: '/party-building' },
  { name: '信息公开', path: '/info-public' },
  { name: '动态要闻', path: '/dynamic-news' },
  { name: '政策法规', path: '/policy-regulations' },
  { name: '查询系统', path: '/query-system' },
]

// 执行搜索
const doSearch = () => {
  const key = searchKey.value?.trim()
  if (!key) return

  const target = searchModules.find(m =>
    m.name.includes(key) || key.includes(m.name)
  )

  if (target) {
    router.push({
      path: target.path,
      query: { keyword: key }
    })
  } else {
    router.push({
      path: '/search-result',
      query: { keyword: key }
    })
  }
}
</script>
<style>
.scroll-container-1_2501 {
    height: 100%;
    width: 100%;
    overflow: auto;
}
.Pixso-frame-1_2501 {
    width: 1920px;
    height: 1297px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}

/* 动态表格行样式 */
.table-row-divider {
    width: 3.23%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2527.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
}

.table-cell {
    font-size: 14px;
    font-family: "Helvetica Neue-Light";
    font-weight: 300;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    position: absolute;
    height: 1.7%;
}

.table-cell-serial {
    width: 1.67%;
    left: 7.97%;
    right: 90.36%;
}

.table-cell-cert-number {
    width: 10.05%;
    left: 11.2%;
    right: 78.75%;
}

.table-cell-cert-type {
    width: 10.05%;
    left: 23.8%;
    right: 66.15%;
}

.table-cell-name {
    width: 10.05%;
    left: 36.41%;
    right: 53.54%;
}

.table-cell-work-unit {
    width: 10.05%;
    left: 49.01%;
    right: 40.94%;
}

.table-cell-issue-date {
    width: 10.05%;
    left: 61.62%;
    right: 28.33%;
}

.table-cell-valid-until {
    width: 10.05%;
    left: 74.22%;
    right: 15.73%;
}

.table-cell-status {
    width: 1.67%;
    left: 86.82%;
    right: 11.51%;
}

.table-cell-action {
    width: 3.33%;
    left: 89.84%;
    right: 6.83%;
    cursor: pointer;
    color: rgba(53, 120, 248, 1);
}

.table-cell-action:hover {
    opacity: 0.8;
}

/* 面包屑导航样式 */
.query-breadcrumb-link {
    color: #848484;
    text-decoration: none;
}

.query-breadcrumb-link:hover {
    opacity: 0.9;
}

.query-breadcrumb-current {
    color: inherit;
}

/* 主导航链接样式 */
.main-nav-link {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.main-nav-link:hover {
    opacity: 0.9;
}

/* 搜索框样式 */
.search-input {
  position: absolute;
  left: 4.73%;
  top: 50%;
  transform: translateY(-50%);
  width: 68.05%;
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  font-family: "Alibaba PuHuiTi-Regular";
  color: #333;
  border: none;
  outline: none;
  background: transparent;
}
</style>
