<template>
    <div class="scroll-container-1_1836">
        <div id="1_1836" class="Pixso-frame-1_1836">
            <div id="1_1837" class="Pixso-vector-1_1837"></div>
            <div id="1_1838" class="Pixso-vector-1_1838"></div>
            <div id="1_1841" class="Pixso-vector-1_1841"></div>
            <p id="1_1844" class="Pixso-paragraph-1_1844">
                {{ "四川飞豹救援" }}
            </p>
            <p id="1_1845" class="Pixso-paragraph-1_1845">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="1_1854" class="Pixso-vector-1_1854"></div>
            <p id="1_1861" class="Pixso-paragraph-1_1861">
                当前位置：<router-link to="/" style="color: inherit; text-decoration: none;">首页</router-link> > <router-link to="/info-public" style="color: inherit; text-decoration: none;">信息公开</router-link> > 人事任免
            </p>
            <div id="1_1862" class="Pixso-vector-1_1862"></div>
            <div id="33_383" class="Pixso-vector-33_383"></div>
            <div id="17_5" class="Pixso-vector-17_5"></div>
            <router-link id="1_1868" to="/overview-info" class="Pixso-paragraph-1_1868 main-nav-link">概况信息</router-link>
            <router-link id="1_1869" to="/team-building" class="Pixso-paragraph-1_1869 main-nav-link">队伍建设</router-link>
            <router-link id="1_1870" to="/info-public" class="Pixso-paragraph-1_1870 main-nav-link">信息公开</router-link>
            <router-link id="1_1871" to="/dynamic-news" class="Pixso-paragraph-1_1871 main-nav-link">动态要闻</router-link>
            <router-link id="1_1872" to="/policy-regulations" class="Pixso-paragraph-1_1872 main-nav-link">政策法规</router-link>
            <router-link id="1_1873" to="/query-system" class="Pixso-paragraph-1_1873 main-nav-link">查询系统</router-link>
            <router-link id="1_1874" to="/party-building" class="Pixso-paragraph-1_1874 main-nav-link">党建专栏</router-link>
            <div id="1_1875" class="Pixso-vector-1_1875"></div>
            <div id="1_1876" class="Pixso-vector-1_1876"></div>
            <div id="1_1877" class="Pixso-vector-1_1877"></div>
            <p id="1_1878" class="Pixso-paragraph-1_1878">{{ "FOIA" }}</p>
            <p id="1_1879" class="Pixso-paragraph-1_1879">{{ "信息公开" }}</p>
            <p id="1_1880" class="Pixso-paragraph-1_1880">
                {{ "人事任免                          >" }}
            </p>
            <div id="1_1881" class="Pixso-vector-1_1881"></div>

            <!-- 动态渲染人事任免列表 -->
            <template v-for="(item, index) in paginatedPersonnel" :key="item.id">
                <!-- 背景卡片 -->
                <div :id="`1_${1961 + index}`" :class="`Pixso-vector-1_${1961 + index}`"></div>

                <!-- 标题 -->
                <p :id="`1_${1964 + index}`" :class="`Pixso-paragraph-1_${1964 + index}`">
                    {{ item.title }}
                </p>

                <!-- 文档信息 -->
                <p :id="`1_${1967 + index}`" :class="`Pixso-paragraph-1_${1967 + index}`">
                    {{ `文号：${item.docNumber}     发布日期：${item.publishDate}     生效日期：${item.effectiveDate}     发布部门：${item.department}` }}
                </p>

                <!-- 下载按钮 -->
                <div
                    :id="`1_${1970 + index * 2}`"
                    :class="`Pixso-vector-1_${1970 + index * 2}`"
                    @click="downloadFile(item.fileUrl, `${item.docNumber}.pdf`)"
                    style="cursor: pointer;"
                ></div>
                <p
                    :id="`1_${1971 + index * 2}`"
                    :class="`Pixso-paragraph-1_${1971 + index * 2}`"
                    @click="downloadFile(item.fileUrl, `${item.docNumber}.pdf`)"
                    style="cursor: pointer;"
                >{{ "下载文件" }}</p>
            </template>

            <div id="1_1976" class="Pixso-vector-1_1976"></div>

            <!-- 分页组件 -->
            <div style="position: absolute; right: 5.57%; top: 74.63%; height: 2.83%;">
                <Pagination
                    :total="totalPersonnel"
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-size-options="[3, 6, 9]"
                    @page-change="handlePageChange"
                />
            </div>
            <div id="33_156" class="Pixso-group-33_156" @click.stop>
            <div id="33_157" class="Pixso-vector-33_157"></div>
            <!-- 输入框 -->
            <input
                v-model="searchKey"
                @keyup.enter="doSearch"
                placeholder="请输入您要搜索的内容"
                class="search-input"
            />
            <!-- 搜索图标点击 -->
            <div
                id="33_159"
                class="Pixso-vector-33_159"
                style="cursor: pointer"
                @click="doSearch"
            ></div>
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
const pageSize = ref(3)

// 人事任免数据
const personnelList = ref([
  {
    id: 1,
    title: '四川飞豹救援关于李XX等6名同志任职的通知',
    docNumber: '应急川〔2025〕18号',
    publishDate: '2024-03-15',
    effectiveDate: '2024-05-01',
    department: '四川飞豹救援',
    fileUrl: '/files/personnel/2025-18.pdf'  // 文件附件URL，后续由后台管理系统维护
  },
  {
    id: 2,
    title: '四川飞豹救援关于王XX等5名同志任免职的通知',
    docNumber: '应急川〔2025〕17号',
    publishDate: '2024-03-10',
    effectiveDate: '2024-04-15',
    department: '四川飞豹救援',
    fileUrl: '/files/personnel/2025-17.pdf'
  },
  {
    id: 3,
    title: '四川飞豹救援关于张XX等4名同志任职的通知',
    docNumber: '应急川〔2025〕16号',
    publishDate: '2024-03-05',
    effectiveDate: '2024-04-10',
    department: '四川飞豹救援',
    fileUrl: '/files/personnel/2025-16.pdf'
  },
  {
    id: 4,
    title: '四川飞豹救援关于刘XX等3名同志任免职的通知',
    docNumber: '应急川〔2025〕15号',
    publishDate: '2024-02-28',
    effectiveDate: '2024-04-01',
    department: '四川飞豹救援',
    fileUrl: '/files/personnel/2025-15.pdf'
  },
  {
    id: 5,
    title: '四川飞豹救援关于陈XX等7名同志任职的通知',
    docNumber: '应急川〔2025〕14号',
    publishDate: '2024-02-20',
    effectiveDate: '2024-03-25',
    department: '四川飞豹救援',
    fileUrl: '/files/personnel/2025-14.pdf'
  },
  {
    id: 6,
    title: '四川飞豹救援关于赵XX等5名同志任免职的通知',
    docNumber: '应急川〔2025〕13号',
    publishDate: '2024-02-15',
    effectiveDate: '2024-03-20',
    department: '四川飞豹救援',
    fileUrl: '/files/personnel/2025-13.pdf'
  },
  {
    id: 7,
    title: '四川飞豹救援关于周XX等6名同志任职的通知',
    docNumber: '应急川〔2025〕12号',
    publishDate: '2024-02-10',
    effectiveDate: '2024-03-15',
    department: '四川飞豹救援',
    fileUrl: '/files/personnel/2025-12.pdf'
  },
  {
    id: 8,
    title: '四川飞豹救援关于吴XX等4名同志任免职的通知',
    docNumber: '应急川〔2025〕11号',
    publishDate: '2024-02-05',
    effectiveDate: '2024-03-10',
    department: '四川飞豹救援',
    fileUrl: '/files/personnel/2025-11.pdf'
  },
  {
    id: 9,
    title: '四川飞豹救援关于郑XX等5名同志任职的通知',
    docNumber: '应急川〔2025〕10号',
    publishDate: '2024-01-30',
    effectiveDate: '2024-03-05',
    department: '四川飞豹救援',
    fileUrl: '/files/personnel/2025-10.pdf'
  },
  {
    id: 10,
    title: '四川飞豹救援关于孙XX等3名同志任免职的通知',
    docNumber: '应急川〔2025〕09号',
    publishDate: '2024-01-25',
    effectiveDate: '2024-03-01',
    department: '四川飞豹救援',
    fileUrl: '/files/personnel/2025-09.pdf'
  }
])

// 计算总数
const totalPersonnel = computed(() => personnelList.value.length)

// 计算当前页显示的数据
const paginatedPersonnel = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return personnelList.value.slice(start, end)
})

// 页码改变处理
function handlePageChange() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 下载文件
function downloadFile(fileUrl: string, fileName: string) {
  if (!fileUrl) {
    console.warn('文件URL为空，无法下载')
    return
  }

  // 创建临时a标签触发下载
  const link = document.createElement('a')
  link.href = fileUrl
  link.download = fileName
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
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

  // 模糊匹配模块
  const target = searchModules.find(m =>
    m.name.includes(key) || key.includes(m.name)
  )

  if (target) {
    // 跳转到对应模块页面，并带上关键词
    router.push({
      path: target.path,
      query: { keyword: key }
    })
  } else {
    // 没匹配到，统一去搜索结果页
    router.push({
      path: '/search-result',
      query: { keyword: key }
    })
  }

  // 清空搜索框（可选）
  // searchKey.value = ''
}

</script>
<style>
.scroll-container-1_1836 {
    height: 100%;
    width: 100%;
    overflow: auto;
}
.Pixso-frame-1_1836 {
    width: 1920px;
    height: 1486px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_1837 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_1837.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-1_1838 {
    width: 100%;
    height: 13.06%;
    background-image: url(@/assets/images/Vector_1_1838.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 86.94%;
}
.Pixso-vector-1_1841 {
    width: 6.72%;
    height: 8.68%;
    background-image: url(@/assets/images/Vector_1_1841.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 2.22%;
    bottom: 89.1%;
}
.Pixso-paragraph-1_1844 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 3.57%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 3.9%;
    bottom: 92.53%;
}
.Pixso-paragraph-1_1845 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 1.61%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 8.08%;
    bottom: 90.31%;
}
.Pixso-vector-1_1854 {
    width: 100%;
    height: 18.84%;
    background-image: url(@/assets/images/Vector_1_1854.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 81.16%;
    bottom: 0%;
}
.Pixso-paragraph-1_1861 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 5.83%;
    right: 76.56%;
    top: 19.85%;
    bottom: 78.8%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_1862 {
    width: 100%;
    height: 4.71%;
    background-image: url(@/assets/images/Vector_1_1862.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 13.06%;
    bottom: 82.23%;
}
.Pixso-vector-33_383 {
    width: 10.62%;
    height: 4.71%;
    background-image: url(@/assets/images/Vector_33_383.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 45.47%;
    right: 43.91%;
    top: 13.06%;
    bottom: 82.23%;
}
.Pixso-vector-17_5 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_5.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 194px;
}
.Pixso-paragraph-1_1868 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 16.46%;
    right: 79.38%;
    top: 14.6%;
    bottom: 83.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1869 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 27.45%;
    right: 68.39%;
    top: 14.6%;
    bottom: 83.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1870 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 48.18%;
    right: 46.61%;
    top: 14.6%;
    bottom: 83.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1871 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.27%;
    right: 36.56%;
    top: 14.6%;
    bottom: 83.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1872 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 70.16%;
    right: 25.68%;
    top: 14.6%;
    bottom: 83.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1873 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 81.04%;
    right: 14.79%;
    top: 14.6%;
    bottom: 83.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1874 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 38.13%;
    right: 57.71%;
    top: 14.6%;
    bottom: 83.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_1875 {
    width: 18.38%;
    height: 10.97%;
    background-image: url(@/assets/images/Vector_1_1875.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 22.81%;
    bottom: 66.22%;
}
.Pixso-vector-1_1876 {
    width: 18.38%;
    height: 7.74%;
    background-image: url(@/assets/images/Vector_1_1876.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 33.85%;
    bottom: 58.41%;
}
.Pixso-vector-1_1877 {
    width: 18.38%;
    height: 38.02%;
    background-image: url(@/assets/images/Vector_1_1877.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 75.73%;
    top: 41.66%;
    bottom: 20.32%;
}
.Pixso-paragraph-1_1878 {
    font-size: 75px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 75px;
    color: rgba(188, 211, 255, 1);
    width: 9.22%;
    height: 5.05%;
    position: absolute;
    left: 10%;
    right: 80.78%;
    top: 25.91%;
    bottom: 69.04%;
    opacity: 0.5;
}
.Pixso-paragraph-1_1879 {
    font-size: 50px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 50px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 11.15%;
    right: 78.59%;
    top: 25.5%;
    bottom: 71.13%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1880 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre-wrap;
    width: 11.77%;
    height: 1.35%;
    position: absolute;
    left: 8.7%;
    right: 79.53%;
    top: 36.94%;
    bottom: 61.71%;
}
.Pixso-vector-1_1881 {
    width: 0.05%;
    height: 1.55%;
    background-image: url(@/assets/images/Vector_1_1881.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 8.02%;
    right: 91.93%;
    top: 36.88%;
    bottom: 61.57%;
}
.Pixso-paragraph-1_1882 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: 29.12%;
    height: 1.35%;
    position: absolute;
    left: 28.02%;
    right: 42.86%;
    top: 25.37%;
    bottom: 73.28%;
}
.Pixso-paragraph-1_1883 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: 29.12%;
    height: 1.35%;
    position: absolute;
    left: 28.02%;
    right: 42.86%;
    top: 42.53%;
    bottom: 56.12%;
}
.Pixso-paragraph-1_1884 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: 29.12%;
    height: 1.35%;
    position: absolute;
    left: 28.02%;
    right: 42.86%;
    top: 59.69%;
    bottom: 38.96%;
}
.Pixso-vector-1_1961 {
    width: 68.33%;
    height: 15.47%;
    background-image: url(@/assets/images/Vector_1_1961.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.15%;
    right: 5.52%;
    top: 22.75%;
    bottom: 61.78%;
}
.Pixso-vector-1_1962 {
    width: 68.33%;
    height: 15.47%;
    background-image: url(@/assets/images/Vector_1_1962.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.15%;
    right: 5.52%;
    top: 39.91%;
    bottom: 44.62%;
}
.Pixso-vector-1_1963 {
    width: 68.33%;
    height: 15.47%;
    background-image: url(@/assets/images/Vector_1_1963.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.15%;
    right: 5.52%;
    top: 57.07%;
    bottom: 27.46%;
}
.Pixso-paragraph-1_1964 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 28.02%;
    right: 42.97%;
    top: 25.37%;
    bottom: 73.28%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1965 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 28.02%;
    right: 41.51%;
    top: 42.53%;
    bottom: 56.12%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1966 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 28.02%;
    right: 41.51%;
    top: 59.69%;
    bottom: 38.96%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1967 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    white-space: pre-wrap;
    width: auto;
    height: auto;
    position: absolute;
    left: 28.02%;
    right: 21.35%;
    top: 29.34%;
    bottom: 69.31%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1968 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    white-space: pre-wrap;
    width: auto;
    height: auto;
    position: absolute;
    left: 28.02%;
    right: 21.35%;
    top: 46.5%;
    bottom: 52.15%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1969 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    white-space: pre-wrap;
    width: auto;
    height: auto;
    position: absolute;
    left: 28.02%;
    right: 21.35%;
    top: 63.66%;
    bottom: 34.99%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_1970 {
    width: 5.63%;
    height: 2.42%;
    background-image: url(@/assets/images/Vector_1_1970.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.07%;
    right: 66.3%;
    top: 33.31%;
    bottom: 64.27%;
}
.Pixso-paragraph-1_1971 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(21, 112, 206, 1);
    width: 4.27%;
    height: 1.35%;
    position: absolute;
    left: 28.75%;
    right: 66.98%;
    top: 33.85%;
    bottom: 64.8%;
}
.Pixso-vector-1_1972 {
    width: 5.63%;
    height: 2.42%;
    background-image: url(@/assets/images/Vector_1_1972.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.07%;
    right: 66.3%;
    top: 50.47%;
    bottom: 47.11%;
}
.Pixso-paragraph-1_1973 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(21, 112, 206, 1);
    width: 4.27%;
    height: 1.35%;
    position: absolute;
    left: 28.75%;
    right: 66.98%;
    top: 51.01%;
    bottom: 47.64%;
}
.Pixso-vector-1_1974 {
    width: 5.63%;
    height: 2.42%;
    background-image: url(@/assets/images/Vector_1_1974.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.07%;
    right: 66.3%;
    top: 67.63%;
    bottom: 29.95%;
}
.Pixso-paragraph-1_1975 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(21, 112, 206, 1);
    width: 4.27%;
    height: 1.35%;
    position: absolute;
    left: 28.75%;
    right: 66.98%;
    top: 68.17%;
    bottom: 30.48%;
}
.Pixso-vector-1_1976 {
    width: 2.14%;
    height: 2.83%;
    background-image: url(@/assets/images/Boolean_operation_1_1976.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.86%;
    right: 90%;
    top: 25.77%;
    bottom: 71.4%;
}
.Pixso-group-6_322 {
    width: 35.89%;
    height: 2.83%;
    position: absolute;
    left: 58.54%;
    right: 5.57%;
    top: 74.63%;
    bottom: 22.54%;
}
.Pixso-vector-6_323 {
    width: 87.37%;
    height: 100%;
    background-image: url(@/assets/images/Vector_6_323.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 12.63%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-paragraph-6_397 {
    font-size: 14px;
    font-family: "Helvetica Neue-Light";
    font-weight: 300;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 9.87%;
    height: 52.38%;
    position: absolute;
    left: 0%;
    right: 90.13%;
    top: 23.81%;
    bottom: 23.81%;
}
.Pixso-group-33_156 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1475px;
    top: 90px;
}
.Pixso-vector-33_157 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_157.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_158 {
    font-size: 16px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(88, 83, 83, 1);
    width: 68.05%;
    height: 20px;
    position: absolute;
    left: 4.73%;
    right: 27.22%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-vector-33_159 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_159.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.21%;
    right: 7.4%;
    top: 50%;
    transform: translateY(calc(-50% + 0.5px));
}


/* 搜索框样式覆盖原有文字，保持样式不变 */
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
