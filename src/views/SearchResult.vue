<template>
  <div class="search-result-page">
    <div class="search-header">
      <h2>搜索结果</h2>
      <div class="search-condition">
        搜索关键词：<span class="keyword">{{ keyword }}</span>
      </div>
    </div>

    <div class="result-content">
      <div v-if="keyword && resultList.length > 0" class="result-list">
        <div
          class="result-item"
          v-for="(item, index) in resultList"
          :key="index"
          @click="navigateToDetail(item.link)"
        >
          <h3 class="result-title">{{ item.title }}</h3>
          <p class="result-desc">{{ item.description }}</p>
          <span class="result-date">{{ item.date }}</span>
        </div>
      </div>

      <div v-else-if="keyword && resultList.length === 0" class="no-result">
        <p>未找到与"{{ keyword }}"相关的内容</p>
      </div>

      <div v-else class="empty-keyword">
        <p>请输入搜索关键词</p>
      </div>
    </div>

    <div class="back-home">
      <button @click="goBack">返回首页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const keyword = ref('')
const resultList = ref<any[]>([])

// 模拟7个模块的数据源
const mockDataSource = [
  // 概况信息模块
  { module: '概况信息', title: '领导班子介绍', description: '四川飞豹救援领导班子成员及职责分工', date: '2024-01-20', link: '/overview-info/leadership' },
  { module: '概况信息', title: '组织架构', description: '四川飞豹救援组织架构及各部门职能介绍', date: '2024-01-19', link: '/overview-info/organization' },
  { module: '概况信息', title: '地理分布', description: '四川飞豹救援各地支队分布情况及联系方式', date: '2024-01-18', link: '/overview-info/geography' },

  // 队伍建设模块
  { module: '队伍建设', title: '关于队伍', description: '四川飞豹救援队伍简介、发展历程及荣誉', date: '2024-01-17', link: '/team-building/about' },
  { module: '队伍建设', title: '救援案例', description: '四川飞豹救援参与的重大救援行动案例', date: '2024-01-16', link: '/team-building/cases' },
  { module: '队伍建设', title: '队伍风采', description: '四川飞豹救援队员风采展示及训练场景', date: '2024-01-15', link: '/team-building/showcase' },
  { module: '队伍建设', title: '应急救援演练', description: '四川飞豹救援开展应急救援演练，提升队伍实战能力', date: '2024-01-14', link: '/team-building/cases' },

  // 党建专栏模块
  { module: '党建专栏', title: '党建工作', description: '四川飞豹救援党建工作动态及党组织建设', date: '2024-01-13', link: '/party-building/party-work' },
  { module: '党建专栏', title: '团建工作', description: '四川飞豹救援团建活动及青年工作', date: '2024-01-12', link: '/party-building/team-work' },
  { module: '党建专栏', title: '党员风采', description: '四川飞豹救援优秀党员事迹展示', date: '2024-01-11', link: '/party-building/members' },
  { module: '党建专栏', title: '学习园地', description: '党的理论学习资料及学习心得分享', date: '2024-01-10', link: '/party-building/study' },

  // 信息公开模块
  { module: '信息公开', title: '人事信息', description: '四川飞豹救援人事任免及干部公示信息', date: '2024-01-09', link: '/info-public/personnel' },
  { module: '信息公开', title: '财务公开', description: '四川飞豹救援财务收支及预算决算公开', date: '2024-01-08', link: '/info-public/personnel' },

  // 动态要闻模块
  { module: '动态要闻', title: '四川飞豹救援成都、乐山、崇州、双流支队队伍授旗授牌仪式在成都举行', description: '2024年1月15日，四川飞豹救援成都、乐山、崇州、双流支队队伍授旗授牌仪式在成都隆重举行', date: '2024-01-15', link: '/dynamic-news/1' },
  { module: '动态要闻', title: '四川飞豹救援参与重大救援行动', description: '四川飞豹救援参与重大救援行动，展现专业救援能力', date: '2024-01-14', link: '/dynamic-news/2' },
  { module: '动态要闻', title: '四川飞豹救援开展应急救援演练', description: '四川飞豹救援开展应急救援演练，提升队伍实战能力', date: '2024-01-13', link: '/dynamic-news/3' },
  { module: '动态要闻', title: '四川飞豹救援荣获省级先进集体称号', description: '四川飞豹救援因在应急救援工作中表现突出，荣获省级先进集体称号', date: '2024-01-12', link: '/dynamic-news/4' },

  // 政策法规模块
  { module: '政策法规', title: '应急救援相关法律', description: '中华人民共和国突发事件应对法、安全生产法等相关法律法规', date: '2024-01-07', link: '/policy-regulations/laws' },
  { module: '政策法规', title: '应急救援管理规定', description: '应急救援队伍管理办法、应急预案管理办法等规章制度', date: '2024-01-06', link: '/policy-regulations/regulations' },
  { module: '政策法规', title: '应急救援技术标准', description: '应急救援装备技术标准、救援操作规程等技术规范', date: '2024-01-05', link: '/policy-regulations/standards' },

  // 查询系统模块
  { module: '查询系统', title: '证书查询', description: '应急救援员证书、培训合格证书等证书查询服务', date: '2024-01-04', link: '/query-system/certificate' },
  { module: '查询系统', title: '人员查询', description: '救援队员信息查询及资质认证查询', date: '2024-01-03', link: '/query-system/personnel' },
  { module: '查询系统', title: '车辆查询', description: '救援车辆信息查询及装备配置查询', date: '2024-01-02', link: '/query-system/vehicle' }
]

// 模糊匹配函数
const fuzzyMatch = (text: string, keyword: string): boolean => {
  if (!text || !keyword) return false
  const lowerText = text.toLowerCase()
  const lowerKeyword = keyword.toLowerCase()
  return lowerText.includes(lowerKeyword)
}

// 执行搜索
const performSearch = (searchKeyword: string) => {
  if (!searchKeyword) {
    resultList.value = []
    return
  }

  // 在所有模块中进行模糊匹配
  resultList.value = mockDataSource.filter(item => {
    return fuzzyMatch(item.module, searchKeyword) ||
           fuzzyMatch(item.title, searchKeyword) ||
           fuzzyMatch(item.description, searchKeyword)
  }).map(item => ({
    module: item.module,
    title: item.title,
    description: item.description,
    date: item.date,
    link: item.link
  }))
}

onMounted(() => {
  // 获取URL中传递的搜索关键词
  keyword.value = route.query.keyword as string || ''

  // 执行搜索
  if (keyword.value) {
    performSearch(keyword.value)
  }
})

const navigateToDetail = (link: string) => {
  router.push(link)
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.search-result-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.search-header {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.search-header h2 {
  font-size: 28px;
  color: #333;
  margin-bottom: 15px;
}

.search-condition {
  font-size: 16px;
  color: #666;
}

.keyword {
  color: #005cbe;
  font-weight: bold;
  font-size: 18px;
}

.result-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-item {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.result-item:hover {
  border-color: #005cbe;
  box-shadow: 0 4px 12px rgba(0, 92, 190, 0.1);
  transform: translateY(-2px);
}

.result-title {
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 500;
}

.result-item:hover .result-title {
  color: #005cbe;
}

.result-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
}

.result-date {
  font-size: 12px;
  color: #999;
}

.no-result,
.empty-keyword {
  text-align: center;
  padding: 60px 20px;
  color: #999;
  font-size: 16px;
}

.back-home {
  margin-top: 30px;
  text-align: center;
}

.back-home button {
  padding: 12px 40px;
  background-color: #005cbe;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-home button:hover {
  background-color: #004a99;
}
</style>
