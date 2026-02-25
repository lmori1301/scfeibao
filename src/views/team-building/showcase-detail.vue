<template>
    <div class="scroll-container-1_1053">
        <div id="1_1053" class="Pixso-frame-1_1053">
            <div id="1_1054" class="Pixso-vector-1_1054"></div>
            <div id="1_1055" class="Pixso-vector-1_1055"></div>
            <div id="1_1058" class="Pixso-vector-1_1058"></div>
            <p id="1_1061" class="Pixso-paragraph-1_1061">
                {{ "四川飞豹救援" }}
            </p>
            <p id="1_1062" class="Pixso-paragraph-1_1062">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="1_1071" class="Pixso-vector-1_1071"></div>
            <p id="1_1072" class="Pixso-paragraph-1_1072">
                当前位置：<router-link to="/" class="breadcrumb-link">首页</router-link> >
                <router-link to="/team-building" class="breadcrumb-link">队伍建设</router-link> >
                <router-link to="/team-building/showcase" class="breadcrumb-link">队伍风采</router-link> >
                {{ currentItem.title }}
            </p>
            <p id="1_1073" class="Pixso-paragraph-1_1073">
                {{
                    "来源：四川飞豹救援　　　监制：新闻宣传处　　　责任编辑：余小猴　　　发布时间：2020-11-09 21:32:00"
                }}
            </p>
            <p id="1_1074" class="Pixso-paragraph-1_1074">
                {{ "2020年“119”消防宣传月启动仪式举行，“飞系”集结亮相！" }}
            </p>
            <div id="1_1075" class="Pixso-vector-1_1075"></div>
            <div id="1_1082" class="Pixso-vector-1_1082"></div>
            <div id="1_1083" class="Pixso-text-1_1083">
                <p id="1_1083_0" class="Pixso-paragraph-1_1083_0">
                    <span id="1_1083_0_1" class="Pixso-span-1_1083_0_1">{{
                        "　　11月9日，2020年“119”消防宣传月启动仪式暨成都“飞系”消防救援专业队伍技能汇报演练在成都市成都市消防救援支队培训基地隆重举行，开启了我省消防主题宣传系列活动，掀起全民消防、全民参与的新浪潮。成都市市委副书记、市长王凤朝出席活动并讲话，省安委会办公室主任、省应急管理厅段毅君厅长，省消防救援总队总队长刘赋德、政委农有良，省森林消防总队政委金德成，省委宣传部副部长、省政府新闻办主任李晓骏，省教育厅党组成员、机关党委书记李志刚，省应急管理厅副厅长毛德忠，省司法厅二级巡视员李灿，团省委二级巡视员罗奕以及省公安厅等有关部门领导出席活动。"
                    }}</span>
                </p>
                <p id="1_1083_1" class="Pixso-paragraph-1_1083_1">
                    {{ "&nbsp;" }}
                </p>
                <p id="1_1083_2" class="Pixso-paragraph-1_1083_2">
                    <span id="1_1083_2_1" class="Pixso-span-1_1083_2_1">{{
                        "　　开幕式上宣读了《关于组建成都“飞系”消防救援专业队伍》的通知，段毅君高度肯定了“飞系”消防救援专业队伍建设和全市消防安全治理取得的突出成绩，并对各级各部门做好“119”消防宣传月，推进应急救援能力持续提升提出要求。"
                    }}</span>
                </p>
            </div>
            <p id="1_1084" class="Pixso-paragraph-1_1084">
                {{
                    "　　据悉，“飞系”消防救援专业队伍是着眼超大城市“全灾种、大应急”救援需求，坚持少而精的原则，成体系打造的应急救援“尖刀、拳头”力量，在“3·30”西昌森林火灾扑救、“8·16”成都金堂特大洪灾救援等急难险重任务中发挥了不可替代作用。"
                }}
            </p>
            <div id="1_1085" class="Pixso-vector-1_1085"></div>
            <div id="1_1088" class="Pixso-vector-1_1088"></div>
            <div id="1_1091" class="Pixso-vector-1_1091"></div>
            <div id="1_1094" class="Pixso-vector-1_1094"></div>
            <div id="1_1097" class="Pixso-vector-1_1097"></div>
            <router-link to="/" id="17_4" class="Pixso-vector-17_4" style="cursor: pointer;"></router-link>
            <div id="1_1102" class="Pixso-vector-1_1102"></div>
            <router-link to="/overview-info" id="1_1103" class="Pixso-paragraph-1_1103">概况信息</router-link>
            <router-link to="/team-building" id="1_1104" class="Pixso-paragraph-1_1104">队伍建设</router-link>
            <router-link to="/info-public" id="1_1105" class="Pixso-paragraph-1_1105">信息公开</router-link>
            <router-link to="/party-building" id="1_1106" class="Pixso-paragraph-1_1106">党建专栏</router-link>
            <router-link to="/dynamic-news" id="1_1107" class="Pixso-paragraph-1_1107">动态要闻</router-link>
            <router-link to="/policy-regulations" id="1_1108" class="Pixso-paragraph-1_1108">政策法规</router-link>
            <router-link to="/query-system" id="1_1109" class="Pixso-paragraph-1_1109">查询系统</router-link>
            <div id="33_147" class="Pixso-group-33_147" @click.stop>
                <div id="33_148" class="Pixso-vector-33_148"></div>
                <!-- 输入框 -->
                <input
                    v-model="searchKey"
                    @keyup.enter="doSearch"
                    placeholder="请输入您要搜索的内容"
                    class="search-input"
                />
                <!-- 搜索图标点击 -->
                <div
                    id="33_150"
                    class="Pixso-vector-33_150"
                    style="cursor: pointer"
                    @click="doSearch"
                ></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getTeamShowcaseDetail } from '@/api/team-building'

const route = useRoute()
const router = useRouter()

// 详情数据
const detailData = ref<any>(null)
const loading = ref(false)

// 获取详情数据
const fetchDetail = async () => {
    const id = route.params.id
    if (!id) return

    loading.value = true
    try {
        const res = await getTeamShowcaseDetail(Number(id))
        if (res.data) {
            detailData.value = res.data
        }
    } catch (error) {
        console.error('获取队伍风采详情失败:', error)
    } finally {
        loading.value = false
    }
}

// 当前展示的项目
const currentItem = computed(() => {
    if (detailData.value) {
        return detailData.value
    }
    return {
        title: '加载中...',
        description: '',
        date: '',
        location: '',
        images: []
    }
})

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

// 页面加载时获取详情数据
onMounted(() => {
    fetchDetail()
})
</script>
<style scoped>
.breadcrumb-link {
    color: rgba(132, 132, 132, 1);
    text-decoration: none;
    cursor: pointer;
}
.breadcrumb-link:hover {
    color: rgba(217, 38, 38, 1);
    text-decoration: underline;
}
</style>
<style>
.scroll-container-1_1053 {
    height: 100%;
    width: 100%;
    overflow: auto;
}
.Pixso-frame-1_1053 {
    width: 1920px;
    height: 4128px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-1_1054 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_1054.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-1_1055 {
    width: 100%;
    height: 4.7%;
    background-image: url(@/assets/images/Vector_1_1055.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 95.3%;
}
.Pixso-vector-1_1058 {
    width: 6.72%;
    height: 3.12%;
    background-image: url(@/assets/images/Vector_1_1058.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 0.8%;
    bottom: 96.08%;
}
.Pixso-paragraph-1_1061 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 1.28%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 1.41%;
    bottom: 97.31%;
}
.Pixso-paragraph-1_1062 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 0.58%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 2.91%;
    bottom: 96.51%;
}
.Pixso-vector-1_1071 {
    width: 88.34%;
    height: 83.26%;
    background-image: url(@/assets/images/Vector_1_1071.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.09%;
    right: 5.57%;
    top: 8.77%;
    bottom: 7.97%;
}
.Pixso-paragraph-1_1072 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 6.67%;
    right: 73.65%;
    top: 7.39%;
    bottom: 92.13%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1073 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: 50.42%;
    height: 0.48%;
    position: absolute;
    left: 25.05%;
    right: 24.53%;
    top: 13.35%;
    bottom: 86.17%;
}
.Pixso-paragraph-1_1074 {
    font-size: 50px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 70px;
    color: rgba(88, 88, 88, 1);
    width: 75.21%;
    height: 1.7%;
    position: absolute;
    left: 16.2%;
    right: 8.59%;
    top: 10.73%;
    bottom: 87.57%;
}
.Pixso-vector-1_1075 {
    width: 1920px;
    height: 280px;
    background-image: url(@/assets/images/Vector_1_1075.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(calc(-50% + 0px)) translateY(calc(-50% + 1924px));
}
.Pixso-vector-1_1082 {
    width: 88.36%;
    height: 0.04%;
    background-image: url(@/assets/images/Vector_1_1082.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.5%;
    right: 4.14%;
    top: 15.12%;
    bottom: 84.84%;
}
.Pixso-text-1_1083 {
    font-size: 28px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: Regular;
    line-height: 39.20000076293945px;
    color: rgba(106, 106, 106, 1);
    width: 71.51%;
    height: 10.27%;
    position: absolute;
    left: 17.45%;
    right: 11.04%;
    top: 16.3%;
    bottom: 73.43%;
}
.Pixso-paragraph-1_1083_0 {
    line-height: 39.20000076293945px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_1083_0_1 {
    font-size: 28px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(106, 106, 106, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_1083_1 {
    line-height: 39.20000076293945px;
    margin-top: 16px;
    position: absolute;
    left: 0px;
    top: 0px;
}
.Pixso-paragraph-1_1083_2 {
    line-height: 39.20000076293945px;
    margin-top: 16px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_1083_2_1 {
    font-size: 28px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(106, 106, 106, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_1084 {
    font-size: 28px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 39.20000076293945px;
    color: rgba(106, 106, 106, 1);
    width: 71.51%;
    height: 2.86%;
    position: absolute;
    left: 17.45%;
    right: 11.04%;
    top: 86.94%;
    bottom: 10.2%;
}
.Pixso-vector-1_1085 {
    width: 45.47%;
    height: 13.93%;
    background-image: url(@/assets/images/Vector_1_1085.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 30.47%;
    right: 24.06%;
    top: 28.08%;
    bottom: 57.99%;
}
.Pixso-vector-1_1088 {
    width: 45.47%;
    height: 13.88%;
    background-image: url(@/assets/images/Vector_1_1088.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 30.47%;
    right: 24.06%;
    top: 71.12%;
    bottom: 15%;
}
.Pixso-vector-1_1091 {
    width: 45.47%;
    height: 14.1%;
    background-image: url(@/assets/images/Vector_1_1091.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 30.47%;
    right: 24.06%;
    top: 56.71%;
    bottom: 29.19%;
}
.Pixso-vector-1_1094 {
    width: 45.47%;
    height: 14.08%;
    background-image: url(@/assets/images/Vector_1_1094.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 30.47%;
    right: 24.06%;
    top: 42.32%;
    bottom: 43.6%;
}
.Pixso-vector-1_1097 {
    width: 100%;
    height: 1.7%;
    background-image: url(@/assets/images/Vector_1_1097.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 4.7%;
    bottom: 93.6%;
}
.Pixso-vector-17_4 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_4.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 194px;
}
.Pixso-vector-1_1102 {
    width: 10.63%;
    height: 1.7%;
    background-image: url(@/assets/images/Vector_1_1102.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 24.32%;
    right: 65.05%;
    top: 4.7%;
    bottom: 93.6%;
}
.Pixso-paragraph-1_1103 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 17%;
    right: 79.32%;
    top: 5.26%;
    bottom: 94.14%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1104 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 27.5%;
    right: 68.33%;
    top: 5.26%;
    bottom: 94.14%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1105 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 48.8%;
    right: 47.03%;
    top: 5.26%;
    bottom: 94.14%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1106 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 37.6%;
    right: 57.19%;
    top: 5.26%;
    bottom: 94.14%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1107 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.43%;
    right: 36.41%;
    top: 5.26%;
    bottom: 94.14%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1108 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 70.05%;
    right: 25.78%;
    top: 5.26%;
    bottom: 94.14%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_1109 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 80.68%;
    right: 15.16%;
    top: 5.26%;
    bottom: 94.14%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-group-33_147 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1441.999755859375px;
    top: 90px;
}
.Pixso-vector-33_148 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_148.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_149 {
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
.Pixso-vector-33_150 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_150.png);
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
