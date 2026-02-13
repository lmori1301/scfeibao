<template>
  <div class="scroll-container-1_1324">
      <div id="1_1324" class="Pixso-frame-1_1324">
          <div id="1_1325" class="Pixso-vector-1_1325"></div>
          <div id="1_1326" class="Pixso-vector-1_1326"></div>
          <div id="1_1329" class="Pixso-vector-1_1329"></div>
          <p id="1_1332" class="Pixso-paragraph-1_1332">
              {{ "四川飞豹救援" }}
          </p>
          <p id="1_1333" class="Pixso-paragraph-1_1333">
              {{ "Sichuan Feibao Rescue" }}
          </p>
          <div id="1_1342" class="Pixso-vector-1_1342"></div>
          <div id="1_1343" class="Pixso-vector-1_1343"></div>
          <div id="17_8" class="Pixso-vector-17_8"></div>
          <div id="1_1348" class="Pixso-vector-1_1348"></div>
          <router-link id="1_1355" to="/overview-info" class="Pixso-paragraph-1_1355 main-nav-link">概况信息</router-link>
          <router-link id="1_1356" to="/team-building" class="Pixso-paragraph-1_1356 main-nav-link">队伍建设</router-link>
          <router-link id="1_1361" to="/party-building" class="Pixso-paragraph-1_1361 main-nav-link">党建专栏</router-link>
          <router-link id="1_1357" to="/info-public" class="Pixso-paragraph-1_1357 main-nav-link">信息公开</router-link>
          <router-link id="1_1358" to="/dynamic-news" class="Pixso-paragraph-1_1358 main-nav-link">动态要闻</router-link>
          <router-link id="1_1359" to="/policy-regulations" class="Pixso-paragraph-1_1359 main-nav-link">政策法规</router-link>
          <router-link id="1_1360" to="/query-system" class="Pixso-paragraph-1_1360 main-nav-link">查询系统</router-link>
          <p id="1_1362" class="Pixso-paragraph-1_1362">
              当前位置：<router-link to="/" class="party-breadcrumb-link">首页</router-link> > <router-link to="/party-building" class="party-breadcrumb-link">党建专栏</router-link> > <span class="party-breadcrumb-current">团建工作</span>
          </p>
          <div id="1_1363" class="Pixso-vector-1_1363"></div>
          <div id="1_1366" class="Pixso-vector-1_1366"></div>
          <div id="1_1369" class="Pixso-vector-1_1369"></div>
          <div id="1_1372" class="Pixso-vector-1_1372"></div>
          <!-- 动态文章列表 -->
          <template v-if="paginatedTeamWork.length > 0">
              <!-- 第一条 -->
              <div v-if="paginatedTeamWork[0]" id="1_1375" class="Pixso-vector-1_1375" @click="goToDetail(paginatedTeamWork[0].id)" style="cursor: pointer;"></div>
              <div v-if="paginatedTeamWork[0]" id="1_1376" class="Pixso-vector-1_1376"></div>
              <p v-if="paginatedTeamWork[0]" id="1_1380" class="Pixso-paragraph-1_1380">{{ formatDate(paginatedTeamWork[0].publishDate).year }}</p>
              <p v-if="paginatedTeamWork[0]" id="1_1381" class="Pixso-paragraph-1_1381">{{ formatDate(paginatedTeamWork[0].publishDate).day }}</p>
              <p v-if="paginatedTeamWork[0]" id="1_1395" class="Pixso-paragraph-1_1395" @click="goToDetail(paginatedTeamWork[0].id)" style="cursor: pointer;">{{ paginatedTeamWork[0].title }}</p>
              <p v-if="paginatedTeamWork[0]" id="1_1391" class="Pixso-paragraph-1_1391">{{ paginatedTeamWork[0].summary }}</p>

              <!-- 第二条 -->
              <div v-if="paginatedTeamWork[1]" id="1_1377" class="Pixso-vector-1_1377" @click="goToDetail(paginatedTeamWork[1].id)" style="cursor: pointer;"></div>
              <div v-if="paginatedTeamWork[1]" id="1_1382" class="Pixso-vector-1_1382"></div>
              <p v-if="paginatedTeamWork[1]" id="1_1383" class="Pixso-paragraph-1_1383">{{ formatDate(paginatedTeamWork[1].publishDate).year }}</p>
              <p v-if="paginatedTeamWork[1]" id="1_1384" class="Pixso-paragraph-1_1384">{{ formatDate(paginatedTeamWork[1].publishDate).day }}</p>
              <p v-if="paginatedTeamWork[1]" id="1_1396" class="Pixso-paragraph-1_1396" @click="goToDetail(paginatedTeamWork[1].id)" style="cursor: pointer;">{{ paginatedTeamWork[1].title }}</p>
              <p v-if="paginatedTeamWork[1]" id="1_1392" class="Pixso-paragraph-1_1392">{{ paginatedTeamWork[1].summary }}</p>

              <!-- 第三条 -->
              <div v-if="paginatedTeamWork[2]" id="1_1378" class="Pixso-vector-1_1378" @click="goToDetail(paginatedTeamWork[2].id)" style="cursor: pointer;"></div>
              <div v-if="paginatedTeamWork[2]" id="1_1385" class="Pixso-vector-1_1385"></div>
              <p v-if="paginatedTeamWork[2]" id="1_1386" class="Pixso-paragraph-1_1386">{{ formatDate(paginatedTeamWork[2].publishDate).year }}</p>
              <p v-if="paginatedTeamWork[2]" id="1_1387" class="Pixso-paragraph-1_1387">{{ formatDate(paginatedTeamWork[2].publishDate).day }}</p>
              <p v-if="paginatedTeamWork[2]" id="1_1397" class="Pixso-paragraph-1_1397" @click="goToDetail(paginatedTeamWork[2].id)" style="cursor: pointer;">{{ paginatedTeamWork[2].title }}</p>
              <p v-if="paginatedTeamWork[2]" id="1_1393" class="Pixso-paragraph-1_1393">{{ paginatedTeamWork[2].summary }}</p>

              <!-- 第四条 -->
              <div v-if="paginatedTeamWork[3]" id="1_1379" class="Pixso-vector-1_1379" @click="goToDetail(paginatedTeamWork[3].id)" style="cursor: pointer;"></div>
              <div v-if="paginatedTeamWork[3]" id="1_1388" class="Pixso-vector-1_1388"></div>
              <p v-if="paginatedTeamWork[3]" id="1_1389" class="Pixso-paragraph-1_1389">{{ formatDate(paginatedTeamWork[3].publishDate).year }}</p>
              <p v-if="paginatedTeamWork[3]" id="1_1390" class="Pixso-paragraph-1_1390">{{ formatDate(paginatedTeamWork[3].publishDate).day }}</p>
              <p v-if="paginatedTeamWork[3]" id="1_1398" class="Pixso-paragraph-1_1398" @click="goToDetail(paginatedTeamWork[3].id)" style="cursor: pointer;">{{ paginatedTeamWork[3].title }}</p>
              <p v-if="paginatedTeamWork[3]" id="1_1394" class="Pixso-paragraph-1_1394">{{ paginatedTeamWork[3].summary }}</p>
          </template>
          <template v-else>
              <div style="position: absolute; left: 26.15%; top: 18.18%; width: 68.08%; text-align: center; padding: 60px 0; color: #999;">暂无数据</div>
          </template>
          <div id="1_1475" class="Pixso-vector-1_1475"></div>
          <div id="1_1476" class="Pixso-vector-1_1476"></div>
          <div id="1_1477" class="Pixso-vector-1_1477"></div>
          <div id="1_1478" class="Pixso-vector-1_1478"></div>
          <div id="1_1479" class="Pixso-vector-1_1479"></div>
          <p id="1_1480" class="Pixso-paragraph-1_1480">{{ "PBCOL" }}</p>
          <p id="1_1481" class="Pixso-paragraph-1_1481">{{ "党建专栏" }}</p>
          <router-link id="1_1482" to="/party-building/team-work" class="Pixso-paragraph-1_1482 party-sidebar-link">
              {{ "团建工作                          >" }}
          </router-link>
          <router-link id="1_1483" to="/party-building/members" class="Pixso-paragraph-1_1483 party-sidebar-link">党员先锋</router-link>
          <router-link id="1_1484" to="/party-building/study" class="Pixso-paragraph-1_1484 party-sidebar-link">党员学"习"</router-link>
          <div id="1_1485" class="Pixso-vector-1_1485"></div>
          <div id="1_1486" class="Pixso-vector-1_1486"></div>
          <router-link id="1_1487" to="/party-building/party-work" class="Pixso-paragraph-1_1487 party-sidebar-link">党建工作</router-link>
          <div id="1_1488" class="Pixso-vector-1_1488"></div>
          <!-- 分页组件 -->
          <div style="position: absolute; right: 5.52%; top: 79.33%; height: 2.22%;">
              <Pagination
                  :total="totalTeamWork"
                  v-model:current-page="currentPage"
                  v-model:page-size="pageSize"
                  :page-size-options="[4, 8, 12]"
                  @page-change="handlePageChange"
              />
          </div>
          <div id="33_174" class="Pixso-group-33_174" @click.stop>
            <div id="33_175" class="Pixso-vector-33_175"></div>
            <!-- 输入框 -->
            <input
                v-model="searchKey"
                @keyup.enter="doSearch"
                placeholder="请输入您要搜索的内容"
                class="search-input"
            />
            <!-- 搜索图标点击 -->
            <div
                id="33_177"
                class="Pixso-vector-33_177"
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
const pageSize = ref(4)

// 团建工作数据
const teamWorkList = ref([
  {
    id: 1,
    title: '"我是党员，我在岗位" | 李辉："干一行、爱一行、精一行"',
    summary: '认真践行习近平总书记关于党的自我革命的重要思想李炎溪，党的十八大以来，习近平总书记站在事关党的长期...',
    publishDate: '2025-12-06'
  },
  {
    id: 2,
    title: '我是党员，我在岗位" | 张建设："村民舒心了，我们就开心"',
    summary: '协同推进科学立法、严格执法、公正司法、全民守法沈春耀，法治是治国理政的基本方式。党的二十届四中全会...',
    publishDate: '2025-12-06'
  },
  {
    id: 3,
    title: '"我是党员，我在岗位" | 黄国东："帮农民端稳\'金饭碗\'，很有成就感！"',
    summary: '"就业是家事，更是国事。"11月1日出版的第21期《求是》杂志刊发习近平总书记重要文章《促进高质量...',
    publishDate: '2025-12-06'
  },
  {
    id: 4,
    title: '"我是党员，我在岗位" | 陈蓉："确保各方平安，一切都值得"',
    summary: '"以学铸魂，就是要做好学习贯彻新时代中国特色社会主义思想的深化、内化、转化工作，从思想上正本清源、固...',
    publishDate: '2025-12-06'
  },
  {
    id: 5,
    title: '团建活动：凝聚团队力量，共创美好未来',
    summary: '通过丰富多彩的团建活动，增强团队凝聚力，提升队员之间的协作能力，为救援工作打下坚实基础...',
    publishDate: '2025-11-28'
  },
  {
    id: 6,
    title: '党员先锋：在救援一线践行初心使命',
    summary: '党员同志在救援工作中发挥先锋模范作用，用实际行动诠释共产党员的责任与担当...',
    publishDate: '2025-11-20'
  },
  {
    id: 7,
    title: '学习强国：提升理论素养，增强业务能力',
    summary: '组织队员深入学习党的理论知识，不断提升政治素养和业务能力，为救援工作提供思想保障...',
    publishDate: '2025-11-15'
  },
  {
    id: 8,
    title: '志愿服务：传递温暖，服务社会',
    summary: '积极参与社会志愿服务活动，用爱心和行动回馈社会，展现救援队伍的良好形象...',
    publishDate: '2025-11-10'
  },
  {
    id: 9,
    title: '技能培训：提升专业水平，增强救援能力',
    summary: '定期组织专业技能培训，不断提升队员的救援技能和应急处置能力...',
    publishDate: '2025-11-05'
  },
  {
    id: 10,
    title: '党建引领：以高质量党建推动高质量发展',
    summary: '坚持党建引领，充分发挥党组织的战斗堡垒作用，推动救援工作高质量发展...',
    publishDate: '2025-10-30'
  },
  {
    id: 11,
    title: '红色教育：传承红色基因，赓续精神血脉',
    summary: '组织队员参观红色教育基地，学习革命先烈的英勇事迹，传承红色基因...',
    publishDate: '2025-10-25'
  },
  {
    id: 12,
    title: '廉政建设：筑牢思想防线，守住纪律底线',
    summary: '加强廉政教育，筑牢思想防线，确保队伍清正廉洁，为救援工作提供纪律保障...',
    publishDate: '2025-10-20'
  }
])

// 计算总数
const totalTeamWork = computed(() => teamWorkList.value.length)

// 计算当前页显示的数据
const paginatedTeamWork = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return teamWorkList.value.slice(start, end)
})

// 格式化日期
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return {
    year: `${year}-${month}`,
    day
  }
}

// 页码改变处理
function handlePageChange() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 跳转到详情页
function goToDetail(id: number) {
  router.push(`/party-building/team-work/${id}`)
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
.scroll-container-1_1324 {
  height: 100%;
  width: 100%;
  overflow: auto;
}
.party-breadcrumb-link { color: #848484; text-decoration: none; }
.party-breadcrumb-link:hover { opacity: 0.9; }
.party-breadcrumb-link:active, .party-breadcrumb-link:visited { text-decoration: underline; }
.party-breadcrumb-current { color: inherit; }
.main-nav-link { color: #fff; text-decoration: none; cursor: pointer; }
.main-nav-link:hover { opacity: 0.9; }
.main-nav-link:active, .main-nav-link:visited { text-decoration: none; }
.party-sidebar-link { color: #fff; text-decoration: none; cursor: pointer; }
.party-sidebar-link:hover { opacity: 0.9; }
.party-sidebar-link:active, .party-sidebar-link:visited { text-decoration: none; }
.Pixso-frame-1_1324 {
  width: 1920px;
  height: 1892px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_1325 {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_1325.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}
.Pixso-vector-1_1326 {
  width: 100%;
  height: 10.25%;
  background-image: url(@/assets/images/Vector_1_1326.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 89.75%;
}
.Pixso-vector-1_1329 {
  width: 6.72%;
  height: 6.82%;
  background-image: url(@/assets/images/Vector_1_1329.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 6.46%;
  right: 86.82%;
  top: 1.74%;
  bottom: 91.44%;
}
.Pixso-paragraph-1_1332 {
  font-size: 53px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 53px;
  color: rgba(217, 38, 38, 1);
  width: 16.66%;
  height: 2.8%;
  position: absolute;
  left: 14.69%;
  right: 68.65%;
  top: 3.07%;
  bottom: 94.13%;
}
.Pixso-paragraph-1_1333 {
  font-size: 28.5px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 23.5px;
  color: rgba(217, 38, 38, 1);
  width: 16.3%;
  height: 1.27%;
  position: absolute;
  left: 14.9%;
  right: 68.8%;
  top: 6.34%;
  bottom: 92.39%;
}
.Pixso-vector-1_1342 {
  width: 100%;
  height: 3.7%;
  background-image: url(@/assets/images/Vector_1_1342.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 10.25%;
  bottom: 86.05%;
}
.Pixso-vector-1_1343 {
  width: 10.62%;
  height: 3.7%;
  background-image: url(@/assets/images/Vector_1_1343.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 34.95%;
  right: 54.43%;
  top: 10.25%;
  bottom: 86.05%;
}
.Pixso-vector-17_8 {
  width: 150px;
  height: 70px;
  background-image: url(@/assets/images/Group_17_8.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 113.00048828125px;
  top: 194px;
}
.Pixso-vector-1_1348 {
  width: 100%;
  height: 14.8%;
  background-image: url(@/assets/images/Vector_1_1348.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 85.2%;
  bottom: 0%;
}
.Pixso-paragraph-1_1355 {
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
  right: 79.37%;
  top: 11.47%;
  bottom: 87.21%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1356 {
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
  top: 11.47%;
  bottom: 87.21%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1357 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 48.7%;
  right: 47.14%;
  top: 11.47%;
  bottom: 87.21%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1358 {
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
  top: 11.47%;
  bottom: 87.21%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1359 {
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
  top: 11.47%;
  bottom: 87.21%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1360 {
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
  top: 11.47%;
  bottom: 87.21%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1361 {
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
  top: 11.47%;
  bottom: 87.21%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1362 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 5.83%;
  right: 76.82%;
  top: 15.59%;
  bottom: 83.35%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-vector-1_1363 {
  width: 22.03%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1363.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 26.15%;
  right: 51.82%;
  top: 18.18%;
  bottom: 68.08%;
}
.Pixso-vector-1_1366 {
  width: 22.03%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1366.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 26.15%;
  right: 51.82%;
  top: 33.25%;
  bottom: 53.01%;
}
.Pixso-vector-1_1369 {
  width: 22.03%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1369.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 26.15%;
  right: 51.82%;
  top: 48.31%;
  bottom: 37.95%;
}
.Pixso-vector-1_1372 {
  width: 22.03%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1372.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 26.15%;
  right: 51.82%;
  top: 63.37%;
  bottom: 22.89%;
}
.Pixso-vector-1_1375 {
  width: 46.25%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1375.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 48.23%;
  right: 5.52%;
  top: 18.18%;
  bottom: 68.08%;
}
.Pixso-vector-1_1376 {
  width: 46.25%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1376.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 48.23%;
  right: 5.52%;
  top: 33.25%;
  bottom: 53.01%;
}
.Pixso-vector-1_1377 {
  width: 46.25%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1377.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 48.23%;
  right: 5.52%;
  top: 48.31%;
  bottom: 37.95%;
}
.Pixso-vector-1_1378 {
  width: 46.25%;
  height: 13.74%;
  background-image: url(@/assets/images/Vector_1_1378.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 48.23%;
  right: 5.52%;
  top: 63.37%;
  bottom: 22.89%;
}
.Pixso-vector-1_1379 {
  width: 0%;
  height: 6.5%;
  background-image: url(@/assets/images/Vector_1_1379.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 54.43%;
  right: 45.57%;
  top: 21.83%;
  bottom: 71.67%;
}
.Pixso-paragraph-1_1380 {
  font-size: 20px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 49.71%;
  right: 47.32%;
  top: 25.9%;
  bottom: 73.04%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1381 {
  font-size: 50px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  line-height: 50px;
  color: rgba(41, 41, 41, 1);
  width: 2.29%;
  height: 2.65%;
  position: absolute;
  left: 50.05%;
  right: 47.66%;
  top: 23.2%;
  bottom: 74.15%;
}
.Pixso-vector-1_1382 {
  width: 0%;
  height: 6.5%;
  background-image: url(@/assets/images/Vector_1_1382.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 54.43%;
  right: 45.57%;
  top: 36.89%;
  bottom: 56.61%;
}
.Pixso-paragraph-1_1383 {
  font-size: 20px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 49.71%;
  right: 47.32%;
  top: 40.96%;
  bottom: 57.98%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1384 {
  font-size: 50px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  line-height: 50px;
  color: rgba(41, 41, 41, 1);
  width: 2.29%;
  height: 2.64%;
  position: absolute;
  left: 50.05%;
  right: 47.66%;
  top: 38.27%;
  bottom: 59.09%;
}
.Pixso-vector-1_1385 {
  width: 0%;
  height: 6.5%;
  background-image: url(@/assets/images/Vector_1_1385.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 54.43%;
  right: 45.57%;
  top: 51.96%;
  bottom: 41.54%;
}
.Pixso-paragraph-1_1386 {
  font-size: 20px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 49.71%;
  right: 47.32%;
  top: 56.03%;
  bottom: 42.92%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1387 {
  font-size: 50px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  line-height: 50px;
  color: rgba(41, 41, 41, 1);
  width: 2.29%;
  height: 2.64%;
  position: absolute;
  left: 50.05%;
  right: 47.66%;
  top: 53.33%;
  bottom: 44.03%;
}
.Pixso-vector-1_1388 {
  width: 0%;
  height: 6.5%;
  background-image: url(@/assets/images/Vector_1_1388.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 54.43%;
  right: 45.57%;
  top: 67.02%;
  bottom: 26.48%;
}
.Pixso-paragraph-1_1389 {
  font-size: 20px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  text-align: center;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 49.71%;
  right: 47.32%;
  top: 71.09%;
  bottom: 27.85%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1390 {
  font-size: 50px;
  font-family: "DINCondensedC-Regular";
  font-weight: 400;
  line-height: 50px;
  color: rgba(41, 41, 41, 1);
  width: 2.29%;
  height: 2.65%;
  position: absolute;
  left: 50.05%;
  right: 47.66%;
  top: 68.39%;
  bottom: 28.96%;
}
.Pixso-paragraph-1_1391 {
  font-size: 18px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 30px;
  color: rgba(132, 132, 132, 1);
  width: 33.64%;
  height: 3.17%;
  position: absolute;
  left: 56.15%;
  right: 10.21%;
  top: 26.16%;
  bottom: 70.67%;
}
.Pixso-paragraph-1_1392 {
  font-size: 18px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 30px;
  color: rgba(132, 132, 132, 1);
  width: 33.64%;
  height: 3.17%;
  position: absolute;
  left: 56.15%;
  right: 10.21%;
  top: 41.23%;
  bottom: 55.6%;
}
.Pixso-paragraph-1_1393 {
  font-size: 18px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 30px;
  color: rgba(132, 132, 132, 1);
  width: 33.64%;
  height: 3.17%;
  position: absolute;
  left: 56.15%;
  right: 10.21%;
  top: 56.29%;
  bottom: 40.54%;
}
.Pixso-paragraph-1_1394 {
  font-size: 18px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 30px;
  color: rgba(132, 132, 132, 1);
  width: 33.64%;
  height: 3.17%;
  position: absolute;
  left: 56.15%;
  right: 10.21%;
  top: 71.35%;
  bottom: 25.48%;
}
.Pixso-paragraph-1_1395 {
  font-size: 30px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 40px;
  color: rgba(56, 56, 56, 1);
  width: 34.38%;
  height: 4.23%;
  position: absolute;
  left: 56.09%;
  right: 9.53%;
  top: 20.77%;
  bottom: 75%;
}
.Pixso-paragraph-1_1396 {
  font-size: 30px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 40px;
  color: rgba(56, 56, 56, 1);
  width: 34.38%;
  height: 4.22%;
  position: absolute;
  left: 56.09%;
  right: 9.53%;
  top: 35.84%;
  bottom: 59.94%;
}
.Pixso-paragraph-1_1397 {
  font-size: 30px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 40px;
  color: rgba(56, 56, 56, 1);
  width: 34.38%;
  height: 4.23%;
  position: absolute;
  left: 56.09%;
  right: 9.53%;
  top: 50.9%;
  bottom: 44.87%;
}
.Pixso-paragraph-1_1398 {
  font-size: 30px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 40px;
  color: rgba(56, 56, 56, 1);
  width: 34.38%;
  height: 4.23%;
  position: absolute;
  left: 56.09%;
  right: 9.53%;
  top: 67.02%;
  bottom: 28.75%;
}
.Pixso-vector-1_1475 {
  width: 18.38%;
  height: 8.61%;
  background-image: url(@/assets/images/Vector_1_1475.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.94%;
  right: 75.68%;
  top: 18.13%;
  bottom: 73.26%;
}
.Pixso-vector-1_1476 {
  width: 18.38%;
  height: 6.07%;
  background-image: url(@/assets/images/Vector_1_1476.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.94%;
  right: 75.68%;
  top: 32.88%;
  bottom: 61.05%;
}
.Pixso-vector-1_1477 {
  width: 18.38%;
  height: 6.07%;
  background-image: url(@/assets/images/Vector_1_1477.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.94%;
  right: 75.68%;
  top: 39.01%;
  bottom: 54.92%;
}
.Pixso-vector-1_1478 {
  width: 18.38%;
  height: 6.08%;
  background-image: url(@/assets/images/Vector_1_1478.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.94%;
  right: 75.68%;
  top: 45.14%;
  bottom: 48.78%;
}
.Pixso-vector-1_1479 {
  width: 18.38%;
  height: 31.02%;
  background-image: url(@/assets/images/Vector_1_1479.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.94%;
  right: 75.68%;
  top: 51.27%;
  bottom: 17.71%;
}
.Pixso-paragraph-1_1480 {
  font-size: 75px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 75px;
  color: rgba(188, 211, 255, 1);
  width: 14.01%;
  height: 3.96%;
  position: absolute;
  left: 10.05%;
  right: 75.94%;
  top: 20.56%;
  bottom: 75.48%;
  opacity: 0.5;
}
.Pixso-paragraph-1_1481 {
  font-size: 50px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 50px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 11.2%;
  right: 78.54%;
  top: 20.24%;
  bottom: 77.11%;
  white-space: pre;
  flex-grow: 0;
}
.Pixso-paragraph-1_1482 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  white-space: pre;
  width: auto;
  height: auto;
  position: absolute;
  left: 8.75%;
  right: 79.01%;
  top: 35.31%;
  bottom: 63.64%;
  flex-grow: 0;
}
.Pixso-paragraph-1_1483 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  width: 4.22%;
  height: 1.06%;
  position: absolute;
  left: 8.75%;
  right: 87.03%;
  top: 41.49%;
  bottom: 57.45%;
}
.Pixso-paragraph-1_1484 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  width: 6.3%;
  height: 1.06%;
  position: absolute;
  left: 8.75%;
  right: 84.95%;
  top: 47.62%;
  bottom: 51.32%;
}
.Pixso-vector-1_1485 {
  width: 0.2%;
  height: 1.22%;
  background-image: url(@/assets/images/Vector_1_1485.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 8.07%;
  right: 91.75%;
  top: 35.25%;
  bottom: 63.53%;
}
.Pixso-vector-1_1486 {
  width: 18.38%;
  height: 6.08%;
  background-image: url(@/assets/images/Vector_1_1486.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.94%;
  right: 75.68%;
  top: 26.74%;
  bottom: 67.18%;
}
.Pixso-paragraph-1_1487 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  width: 4.22%;
  height: 1.06%;
  position: absolute;
  left: 8.75%;
  right: 87.03%;
  top: 29.23%;
  bottom: 69.71%;
}
.Pixso-vector-1_1488 {
  width: 2.14%;
  height: 2.22%;
  background-image: url(@/assets/images/Boolean_operation_1_1488.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 8.07%;
  right: 89.79%;
  top: 20.56%;
  bottom: 77.22%;
}
.Pixso-group-6_170 {
  width: 35.89%;
  height: 2.22%;
  position: absolute;
  left: 58.59%;
  right: 5.52%;
  top: 79.28%;
  bottom: 18.5%;
}
.Pixso-vector-6_171 {
  width: 87.37%;
  height: 100%;
  background-image: url(@/assets/images/Vector_6_171.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 12.63%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}
.Pixso-paragraph-6_245 {
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
.Pixso-group-33_174 {
  width: 338px;
  height: 42px;
  position: absolute;
  left: 1478px;
  top: 90px;
}
.Pixso-vector-33_175 {
  width: 100%;
  height: 42px;
  background-image: url(@/assets/images/Vector_33_175.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 50%;
  transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_176 {
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
.Pixso-vector-33_177 {
  width: 7.39%;
  height: 25px;
  background-image: url(@/assets/images/Group_33_177.png);
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
