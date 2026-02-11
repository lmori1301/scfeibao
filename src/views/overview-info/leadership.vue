<template>
  <div class="scroll-container-1_183">
    <!-- 领导信息列表主页面 -->
    <div id="1_183" class="Pixso-frame-1_183">
      <!-- 头部及导航部分 -->
      <div id="1_184" class="Pixso-vector-1_184"></div>
      <div id="1_185" class="Pixso-vector-1_185"></div>
      <div id="1_186" class="Pixso-vector-1_186"></div>
      <div id="1_189" class="Pixso-vector-1_189"></div>
      <div id="17_34" class="Pixso-vector-17_34"></div>
      <div id="1_194" class="Pixso-vector-1_194"></div>
      <p id="1_197" class="Pixso-paragraph-1_197">{{ "四川飞豹救援" }}</p>
      <p id="1_198" class="Pixso-paragraph-1_198">{{ "Sichuan Feibao Rescue" }}</p>
      
      <!-- 左侧导航 -->
      <div id="1_214" class="Pixso-vector-1_214"></div>
      <div id="1_215" class="Pixso-vector-1_215"></div>
      <div id="1_216" class="Pixso-vector-1_216"></div>
      <div id="1_217" class="Pixso-vector-1_217"></div>
      <div id="1_218" class="Pixso-vector-1_218"></div>
      <p id="1_219" class="Pixso-paragraph-1_219">{{ "OVERV" }}</p>
      <p id="1_220" class="Pixso-paragraph-1_220">{{ "概况信息" }}</p>
      <p id="1_221" class="Pixso-paragraph-1_221">{{ "领导信息                          >" }}</p>
      <p id="1_222" class="Pixso-paragraph-1_222">{{ "组织机构" }}</p>
      <p id="1_223" class="Pixso-paragraph-1_223">{{ "地理位置             " }}</p>
      <p id="1_224" class="Pixso-paragraph-1_224">当前位置：<router-link to="/" style="color: inherit; text-decoration: none;">首页</router-link> > <router-link to="/overview-info" style="color: inherit; text-decoration: none;">概况信息</router-link> > 领导信息</p>
      
      <!-- 领导信息列表（优化为循环渲染） -->
      <div class="leader-list-container">
        <template v-for="(leader, index) in leaderList" :key="index">
          <div :id="`1_${225 + index}`" class="Pixso-text-1_225">
            <p :id="`1_${225 + index}_0`" class="Pixso-paragraph-1_225_0">
              <span :id="`1_${225 + index}_0_1`" class="Pixso-span-1_225_0_1">{{ leader.position1 }}</span>
            </p>
            <p :id="`1_${225 + index}_1`" class="Pixso-paragraph-1_225_1">
              <span :id="`1_${225 + index}_1_1`" class="Pixso-span-1_225_1_1">{{ leader.position2 }}</span>
            </p>
          </div>
          <p 
            :id="`1_${238 + index}`" 
            class="Pixso-paragraph-1_238 leader-name"
            @click="handleLeaderClick(leader)"
          >
            {{ leader.name }}
          </p>
        </template>
      </div>

      <p id="1_237" class="Pixso-paragraph-1_237">{{ "领导信息" }}</p>
      <div id="1_250" class="Pixso-vector-1_250"></div>
      <div id="1_251" class="Pixso-vector-1_251"></div>
      <div id="1_252" class="Pixso-vector-1_252"></div>
      <div id="1_253" class="Pixso-vector-1_253"></div>
      <div id="1_256" class="Pixso-vector-1_256"></div>
      <div id="1_259" class="Pixso-vector-1_259"></div>
      <div id="1_262" class="Pixso-vector-1_262"></div>
      <div id="1_265" class="Pixso-vector-1_265"></div>
      <div id="1_268" class="Pixso-vector-1_268"></div>
      <div id="1_275" class="Pixso-vector-1_275"></div>
      <div id="1_276" class="Pixso-vector-1_276"></div>
      <div id="1_277" class="Pixso-vector-1_277"></div>
      <div id="1_278" class="Pixso-vector-1_278"></div>
      <div id="1_279" class="Pixso-vector-1_279"></div>
      <div id="1_280" class="Pixso-vector-1_280"></div>
      <div id="1_281" class="Pixso-vector-1_281"></div>
      <div id="1_354" class="Pixso-vector-1_354"></div>
      
      <!-- 统计及搜索 -->
      <div id="6_660" class="Pixso-group-6_660">
        <div id="6_661" class="Pixso-vector-6_661"></div>
        <p id="6_735" class="Pixso-paragraph-6_735">{{ "共计 10 条" }}</p>
      </div>
      <div id="33_336" class="Pixso-group-33_336">
        <div id="33_337" class="Pixso-vector-33_337"></div>
        <p id="33_338" class="Pixso-paragraph-33_338">{{ "请输入您要搜索的内容" }}</p>
        <div id="33_339" class="Pixso-vector-33_339"></div>
      </div>
      <div id="33_976" class="Pixso-vector-33_976"></div>
      <router-link id="33_977" to="/overview-info" class="Pixso-paragraph-33_977 main-nav-link">概况信息</router-link>
      <router-link id="33_978" to="/team-building" class="Pixso-paragraph-33_978 main-nav-link">队伍建设</router-link>
      <router-link id="33_979" to="/party-building" class="Pixso-paragraph-33_979 main-nav-link">党建专栏</router-link>
      <router-link id="33_980" to="/info-public" class="Pixso-paragraph-33_980 main-nav-link">信息公开</router-link>
      <router-link id="33_981" to="/dynamic-news" class="Pixso-paragraph-33_981 main-nav-link">动态要闻</router-link>
      <router-link id="33_982" to="/policy-regulations" class="Pixso-paragraph-33_982 main-nav-link">政策法规</router-link>
      <router-link id="33_983" to="/query-system" class="Pixso-paragraph-33_983 main-nav-link">查询系统</router-link>
    </div>

    <!-- 领导信息详情弹窗（默认隐藏） -->
    <div v-if="showDialog" class="dialog-mask">
      <div class="scroll-container-1_360 dialog-content">
        <div id="1_360" class="Pixso-frame-1_360">
          <!-- 关闭按钮 -->
          <div class="close-btn" @click="showDialog = false">×</div>
          
          <div id="1_361" class="Pixso-vector-1_361"></div>
          <div id="1_362" class="Pixso-vector-1_362"></div>
          <div id="1_365" class="Pixso-vector-1_365"></div>
          <p id="1_368" class="Pixso-paragraph-1_368">{{ "四川飞豹救援" }}</p>
          <p id="1_369" class="Pixso-paragraph-1_369">{{ "Sichuan Feibao Rescue" }}</p>
          
          <!-- 左侧导航 -->
          <div id="1_379" class="Pixso-vector-1_379"></div>
          <div id="1_380" class="Pixso-vector-1_380"></div>
          <div id="1_381" class="Pixso-vector-1_381"></div>
          <div id="1_382" class="Pixso-vector-1_382"></div>
          <div id="1_383" class="Pixso-vector-1_383"></div>
          <p id="1_384" class="Pixso-paragraph-1_384">{{ "OVERV" }}</p>
          <p id="1_385" class="Pixso-paragraph-1_385">{{ "概况信息" }}</p>
          <p id="1_386" class="Pixso-paragraph-1_386">{{ "领导信息                        >" }}</p>
          <p id="1_387" class="Pixso-paragraph-1_387">{{ "组织机构                      " }}</p>
          <p id="1_388" class="Pixso-paragraph-1_388">{{ "地理位置                         " }}</p>
          
          <div id="1_405" class="Pixso-vector-1_405"></div>
          <div id="1_424" class="Pixso-vector-1_424"></div>
          
          <!-- 选中的领导详情信息 -->
          <div id="10_33" class="Pixso-group-10_33">
            <div id="1_431" class="Pixso-vector-1_431"></div>
            <div id="1_433" class="Pixso-vector-1_433"></div>
            <p id="1_434" class="Pixso-paragraph-1_434">
              {{ `${selectedLeader.position1}、${selectedLeader.position2}` }}
            </p>
            <p id="1_435" class="Pixso-paragraph-1_435">{{ selectedLeader.name }}</p>
            <p id="1_439" class="Pixso-paragraph-1_439">{{ "工作职责" }}</p>
            <p id="1_440" class="Pixso-paragraph-1_440">{{ selectedLeader.duties }}</p>
            <p id="1_441" class="Pixso-paragraph-1_441">{{ selectedLeader.profile }}</p>
            <div id="1_442" class="Pixso-vector-1_442"></div>
            <div id="1_443" class="Pixso-vector-1_443"></div>
            <div id="6_789" class="Pixso-vector-6_789"></div>
            <p id="6_790" class="Pixso-paragraph-6_790">{{ "救援经验" }}</p>
            <p id="6_791" class="Pixso-paragraph-6_791">{{ selectedLeader.rescueExp }}</p>
            <p id="1_444" class="Pixso-paragraph-1_444">{{ "参与行动" }}</p>
            <p id="1_445" class="Pixso-paragraph-1_445">{{ selectedLeader.actionCount }}</p>
            <div id="1_446" class="Pixso-vector-1_446"></div>
          </div>
          
          <div id="1_448" class="Pixso-vector-1_448"></div>
          <div id="10_34" class="Pixso-vector-10_34"></div>
          <div id="1_460" class="Pixso-vector-1_460"></div>
          
          <!-- 搜索框 -->
          <div id="33_327" class="Pixso-group-33_327">
            <div id="33_328" class="Pixso-vector-33_328"></div>
            <p id="33_329" class="Pixso-paragraph-33_329">{{ "请输入您要搜索的内容" }}</p>
            <div id="33_330" class="Pixso-vector-33_330"></div>
          </div>
          
          <!-- 顶部导航 -->
          <div id="33_968" class="Pixso-vector-33_968"></div>
          <p id="33_969" class="Pixso-paragraph-33_969">{{ "概况信息" }}</p>
          <p id="33_970" class="Pixso-paragraph-33_970">{{ "队伍建设" }}</p>
          <p id="33_971" class="Pixso-paragraph-33_971">{{ "党建专栏" }}</p>
          <p id="33_972" class="Pixso-paragraph-33_972">{{ "信息公开" }}</p>
          <p id="33_973" class="Pixso-paragraph-33_973">{{ "动态要闻" }}</p>
          <p id="33_974" class="Pixso-paragraph-33_974">{{ "政策法规" }}</p>
          <p id="33_975" class="Pixso-paragraph-33_975">{{ "查询系统" }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// 定义领导信息数据（可根据实际需求扩展）
interface Leader {
  name: string;
  position1: string;
  position2: string;
  duties: string;
  profile: string;
  rescueExp: string;
  actionCount: string;
}

// 领导信息列表数据
const leaderList = ref<Leader[]>([
  {
    name: "谢春明",
    position1: "总队长",
    position2: "队委会主任",
    duties: "全面负责救援队各项工作，制定发展战略和救援计划",
    profile: "男，汉族，1967年11月出生，大学学历，工学硕士，中共党员",
    rescueExp: "15+ 年",
    actionCount: "120+ 次"
  },
  {
    name: "蒲凯",
    position1: "副总队长",
    position2: "队委会副主任",
    duties: "协助总队长开展日常管理工作，分管作战训练相关事务",
    profile: "男，汉族，1975年8月出生，大专学历，中共党员",
    rescueExp: "12+ 年",
    actionCount: "98+ 次"
  },
  {
    name: "余芝森",
    position1: "作战训练处处长",
    position2: "队委会委员",
    duties: "负责救援队作战训练计划制定和实施，提升队伍实战能力",
    profile: "男，汉族，1980年5月出生，本科学历，中共党员",
    rescueExp: "10+ 年",
    actionCount: "85+ 次"
  },
  {
    name: "何先伟",
    position1: "副总队长",
    position2: "队委会副主任",
    duties: "协助总队长管理队伍，分管后勤保障和物资管理工作",
    profile: "男，汉族，1978年3月出生，大专学历，中共党员",
    rescueExp: "11+ 年",
    actionCount: "90+ 次"
  },
  {
    name: "丁涛",
    position1: "信息通信处处长",
    position2: "队委会委员",
    duties: "负责救援队通信保障和信息化建设工作",
    profile: "男，汉族，1982年7月出生，本科学历，中共党员",
    rescueExp: "9+ 年",
    actionCount: "78+ 次"
  },
  {
    name: "肖明和",
    position1: "副总队长",
    position2: "队委会副主任",
    duties: "协助总队长开展对外协调和合作交流工作",
    profile: "男，汉族，1976年10月出生，本科学历，中共党员",
    rescueExp: "13+ 年",
    actionCount: "105+ 次"
  },
  {
    name: "陶琛",
    position1: "副总队长",
    position2: "队委会副主任",
    duties: "分管救援队宣传和志愿者管理工作",
    profile: "女，汉族，1981年4月出生，本科学历，中共党员",
    rescueExp: "8+ 年",
    actionCount: "70+ 次"
  },
  {
    name: "李四",
    position1: "支队长",
    position2: "队委会主任",
    duties: "负责支队日常管理和救援任务执行",
    profile: "男，汉族，1979年12月出生，大专学历，中共党员",
    rescueExp: "9+ 年",
    actionCount: "82+ 次"
  },
  {
    name: "李四",
    position1: "大队长",
    position2: "队委会副主任",
    duties: "协助支队长管理大队，负责一线救援指挥",
    profile: "男，汉族，1983年6月出生，大专学历，中共党员",
    rescueExp: "7+ 年",
    actionCount: "65+ 次"
  },
  {
    name: "李四",
    position1: "大队长",
    position2: "队委会主任",
    duties: "负责大队训练和救援任务统筹工作",
    profile: "男，汉族，1984年2月出生，本科学历，中共党员",
    rescueExp: "6+ 年",
    actionCount: "60+ 次"
  }
]);

// 弹窗控制
const showDialog = ref(false);
// 选中的领导信息
const selectedLeader = ref<Leader>(leaderList.value[0]);

// 点击领导姓名打开弹窗并赋值
const handleLeaderClick = (leader: Leader) => {
  selectedLeader.value = leader;
  showDialog.value = true;
};
</script>

<style>
/* 基础滚动容器样式 */
.scroll-container-1_183 {
  height: 100%;
  width: 100%;
  overflow: auto;
  position: relative;
}

/* 弹窗遮罩样式 */
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

/* 弹窗内容样式 */
.dialog-content {
  background-color: #fff;
  max-width: 1920px;
  max-height: 90vh;
  overflow: auto;
  position: relative;
}

/* 关闭按钮样式 */
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  color: #333;
  cursor: pointer;
  z-index: 10000;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background-color: #f5f5f5;
  border-radius: 50%;
}

/* 领导姓名可点击样式 */
.leader-name {
  cursor: pointer;
  transition: color 0.3s;
}

.leader-name:hover {
  color: #3578f8;
}

/* 主页面样式 */
.Pixso-frame-1_183 {
  width: 1920px;
  height: 2343px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 1);
}

.Pixso-vector-1_184 {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_184.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0.64%;
  bottom: -0.64%;
}

.Pixso-vector-1_185 {
  width: 68.33%;
  height: 71.4%;
  background-image: url(@/assets/images/Vector_1_185.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 25.78%;
  right: 5.89%;
  top: 14.94%;
  bottom: 13.66%;
}

.Pixso-vector-1_186 {
  width: 100%;
  height: 8.28%;
  background-image: url(@/assets/images/Vector_1_186.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 91.72%;
}

.Pixso-vector-1_189 {
  width: 100%;
  height: 2.99%;
  background-image: url(@/assets/images/Vector_1_189.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 8.28%;
  bottom: 88.73%;
}

.Pixso-vector-17_34 {
  width: 150px;
  height: 70px;
  background-image: url(@/assets/images/Group_17_34.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 113px;
  top: 194px;
}

.Pixso-vector-1_194 {
  width: 6.72%;
  height: 5.5%;
  background-image: url(@/assets/images/Vector_1_194.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 6.46%;
  right: 86.82%;
  top: 1.41%;
  bottom: 93.09%;
}

.Pixso-paragraph-1_197 {
  font-size: 53px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 53px;
  color: rgba(217, 38, 38, 1);
  width: 16.66%;
  height: 2.26%;
  position: absolute;
  left: 14.69%;
  right: 68.65%;
  top: 2.48%;
  bottom: 95.26%;
}

.Pixso-paragraph-1_198 {
  font-size: 28.5px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 23.5px;
  color: rgba(217, 38, 38, 1);
  width: 16.3%;
  height: 1.03%;
  position: absolute;
  left: 14.9%;
  right: 68.8%;
  top: 5.12%;
  bottom: 93.85%;
}

.Pixso-vector-1_214 {
  width: 18.38%;
  height: 6.95%;
  background-image: url(@/assets/images/Vector_1_214.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.89%;
  right: 75.73%;
  top: 12.51%;
  bottom: 80.54%;
}

.Pixso-vector-1_215 {
  width: 18.38%;
  height: 4.91%;
  background-image: url(@/assets/images/Vector_1_215.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.89%;
  right: 75.73%;
  top: 19.5%;
  bottom: 75.59%;
}

.Pixso-vector-1_216 {
  width: 18.38%;
  height: 4.9%;
  background-image: url(@/assets/images/Vector_1_216.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.89%;
  right: 75.73%;
  top: 24.46%;
  bottom: 70.64%;
}

.Pixso-vector-1_217 {
  width: 18.38%;
  height: 4.9%;
  background-image: url(@/assets/images/Vector_1_217.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.89%;
  right: 75.73%;
  top: 29.41%;
  bottom: 65.69%;
}

.Pixso-vector-1_218 {
  width: 18.38%;
  height: 53.52%;
  background-image: url(@/assets/images/Vector_1_218.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.89%;
  right: 75.73%;
  top: 32.82%;
  bottom: 13.66%;
}

.Pixso-paragraph-1_219 {
  font-size: 75px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 75px;
  color: rgba(188, 211, 255, 1);
  width: 13.75%;
  height: 3.2%;
  position: absolute;
  left: 10%;
  right: 76.25%;
  top: 14.47%;
  bottom: 82.33%;
  opacity: 0.5;
}

.Pixso-paragraph-1_220 {
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
  top: 14.21%;
  bottom: 83.65%;
  white-space: pre;
  flex-grow: 0;
}

.Pixso-paragraph-1_221 {
  font-size: 20px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  white-space: pre-wrap;
  width: auto;
  height: auto;
  position: absolute;
  left: 8.7%;
  right: 79.01%;
  top: 21.47%;
  bottom: 77.68%;
  white-space: pre;
  flex-grow: 0;
}

.Pixso-paragraph-1_222 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  width: 4.22%;
  height: 0.86%;
  position: absolute;
  left: 8.7%;
  right: 87.08%;
  top: 26.46%;
  bottom: 72.68%;
}

.Pixso-paragraph-1_223 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  white-space: pre-wrap;
  width: 4.22%;
  height: 0.86%;
  position: absolute;
  left: 8.7%;
  right: 87.08%;
  top: 31.41%;
  bottom: 67.73%;
}

.Pixso-paragraph-1_224 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(132, 132, 132, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 26.25%;
  right: 56.15%;
  top: 12.89%;
  bottom: 86.26%;
  white-space: pre;
  flex-grow: 0;
}

.Pixso-text-1_225 {
  font-size: 20px;
  font-family: "FZHei-B01S-Regular";
  font-weight: Regular;
  text-align: center;
  line-height: 20px;
  color: rgba(53, 120, 248, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 32.45%;
  right: 62.34%;
  top: 36.49%;
  bottom: 61.8%;
  white-space: nowrap;
  flex-grow: 0;
}

.Pixso-paragraph-1_225_0 {
  line-height: 20px;
  position: relative;
  flex-shrink: 0;
}

.Pixso-span-1_225_0_1 {
  font-size: 20px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  color: rgba(53, 120, 248, 1);
  position: relative;
  flex-shrink: 0;
}

.Pixso-paragraph-1_225_1 {
  line-height: 20px;
  position: relative;
  flex-shrink: 0;
}

.Pixso-span-1_225_1_1 {
  font-size: 20px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  color: rgba(53, 120, 248, 1);
  position: relative;
  flex-shrink: 0;
}

.Pixso-paragraph-1_237 {
  font-size: 20px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(134, 134, 134, 1);
  width: 4.27%;
  height: 0.85%;
  position: absolute;
  left: 28.65%;
  right: 67.08%;
  top: 16.35%;
  bottom: 82.8%;
}

.Pixso-paragraph-1_238 {
  font-size: 25px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(51, 51, 51, 1);
  width: 3.96%;
  height: 1.07%;
  position: absolute;
  left: 33.07%;
  right: 62.97%;
  top: 34.78%;
  bottom: 64.15%;
}

.Pixso-vector-1_250 {
  width: 3.96%;
  height: 6px;
  background-image: url(@/assets/images/Vector_1_250.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 28.8%;
  right: 67.24%;
  top: 50%;
  transform: translateY(calc(-50% + -750.5px));
}

.Pixso-vector-1_251 {
  width: 57.3%;
  height: 1px;
  background-image: url(@/assets/images/Vector_1_251.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 33.85%;
  right: 8.85%;
  top: 50%;
  transform: translateY(calc(-50% + -753px));
}

.Pixso-vector-1_252 {
  width: 0.05%;
  height: 0.98%;
  background-image: url(@/assets/images/Vector_1_252.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 8.05%;
  right: 91.9%;
  top: 21.45%;
  bottom: 77.57%;
}

.Pixso-vector-1_253 {
  width: 12.81%;
  height: 12.98%;
  background-image: url(@/assets/images/Vector_1_253.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 45.16%;
  right: 42.03%;
  top: 20.91%;
  bottom: 66.11%;
}

.Pixso-vector-1_256 {
  width: 12.81%;
  height: 12.98%;
  background-image: url(@/assets/images/Vector_1_256.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 61.67%;
  right: 25.52%;
  top: 20.91%;
  bottom: 66.11%;
}

.Pixso-vector-1_259 {
  width: 12.81%;
  height: 12.98%;
  background-image: url(@/assets/images/Vector_1_259.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 28.65%;
  right: 58.54%;
  top: 20.91%;
  bottom: 66.11%;
}

.Pixso-vector-1_262 {
  width: 12.81%;
  height: 12.93%;
  background-image: url(@/assets/images/Vector_1_262.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 45.16%;
  right: 42.03%;
  top: 40.27%;
  bottom: 46.8%;
}

.Pixso-vector-1_265 {
  width: 12.81%;
  height: 12.93%;
  background-image: url(@/assets/images/Vector_1_265.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 61.67%;
  right: 25.52%;
  top: 40.27%;
  bottom: 46.8%;
}

.Pixso-vector-1_268 {
  width: 100%;
  height: 11.95%;
  background-image: url(@/assets/images/Vector_1_268.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 88.05%;
  bottom: 0%;
}

.Pixso-vector-1_275 {
  width: 12.81%;
  height: 13.02%;
  background-image: url(@/assets/images/Vector_1_275.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 78.28%;
  right: 8.91%;
  top: 20.91%;
  bottom: 66.07%;
}

.Pixso-vector-1_276 {
  width: 12.81%;
  height: 12.93%;
  background-image: url(@/assets/images/Vector_1_276.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 78.28%;
  right: 8.91%;
  top: 40.31%;
  bottom: 46.76%;
}

.Pixso-vector-1_277 {
  width: 12.81%;
  height: 13.01%;
  background-image: url(@/assets/images/Vector_1_277.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 78.28%;
  right: 8.91%;
  top: 59.33%;
  bottom: 27.66%;
}

.Pixso-vector-1_278 {
  width: 12.82%;
  height: 13.01%;
  background-image: url(@/assets/images/Vector_1_278.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 61.61%;
  right: 25.57%;
  top: 59.33%;
  bottom: 27.66%;
}

.Pixso-vector-1_279 {
  width: 12.81%;
  height: 13.01%;
  background-image: url(@/assets/images/Vector_1_279.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 45.47%;
  right: 41.72%;
  top: 59.33%;
  bottom: 27.66%;
}

.Pixso-vector-1_280 {
  width: 12.81%;
  height: 13.01%;
  background-image: url(@/assets/images/Vector_1_280.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 28.65%;
  right: 58.54%;
  top: 59.33%;
  bottom: 27.66%;
}

.Pixso-vector-1_281 {
  width: 12.81%;
  height: 12.97%;
  background-image: url(@/assets/images/Vector_1_281.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 28.65%;
  right: 58.54%;
  top: 40.27%;
  bottom: 46.76%;
}

.Pixso-vector-1_354 {
  width: 2.14%;
  height: 1.79%;
  background-image: url(@/assets/images/Boolean_operation_1_354.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 8.02%;
  right: 89.84%;
  top: 14.47%;
  bottom: 83.74%;
}

.Pixso-group-6_660 {
  width: 35.88%;
  height: 1.79%;
  position: absolute;
  left: 56.2%;
  right: 7.92%;
  top: 82.29%;
  bottom: 15.92%;
}

.Pixso-vector-6_661 {
  width: 87.37%;
  height: 100%;
  background-image: url(@/assets/images/Vector_6_661.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 12.63%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}

.Pixso-paragraph-6_735 {
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

.Pixso-group-33_336 {
  width: 338px;
  height: 42px;
  position: absolute;
  left: 1470px;
  top: 90px;
}

.Pixso-vector-33_337 {
  width: 100%;
  height: 42px;
  background-image: url(@/assets/images/Vector_33_337.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 50%;
  transform: translateY(calc(-50% + 0px));
}

.Pixso-paragraph-33_338 {
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

.Pixso-vector-33_339 {
  width: 7.39%;
  height: 25px;
  background-image: url(@/assets/images/Group_33_339.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 85.21%;
  right: 7.4%;
  top: 50%;
  transform: translateY(calc(-50% + 0.5px));
}

.Pixso-vector-33_976 {
  width: 204px;
  height: 2.99%;
  background-image: url(@/assets/images/Vector_33_976.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 50%;
  top: 8.28%;
  bottom: 88.73%;
  transform: translateX(calc(-50% + -596px));
}

.Pixso-paragraph-33_977 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 9.26%;
  bottom: 89.67%;
  transform: translateX(calc(-50% + -596px));
  white-space: pre;
  flex-grow: 0;
}

.Pixso-paragraph-33_978 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 9.26%;
  bottom: 89.67%;
  transform: translateX(calc(-50% + -392px));
  white-space: pre;
  flex-grow: 0;
}

.Pixso-paragraph-33_979 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 9.26%;
  bottom: 89.67%;
  transform: translateX(calc(-50% + -187px));
  white-space: pre;
  flex-grow: 0;
}

.Pixso-paragraph-33_980 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 9.26%;
  bottom: 89.67%;
  transform: translateX(calc(-50% + 17px));
  white-space: pre;
  flex-grow: 0;
}

.Pixso-paragraph-33_981 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 9.26%;
  bottom: 89.67%;
  transform: translateX(calc(-50% + 221px));
  white-space: pre;
  flex-grow: 0;
}

.Pixso-paragraph-33_982 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 9.26%;
  bottom: 89.67%;
  transform: translateX(calc(-50% + 425px));
  white-space: pre;
  flex-grow: 0;
}

.Pixso-paragraph-33_983 {
  font-size: 20px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(255, 255, 255, 1);
  width: auto;
  height: auto;
  position: absolute;
  left: 50%;
  top: 9.26%;
  bottom: 89.67%;
  transform: translateX(calc(-50% + 631px));
  white-space: pre;
  flex-grow: 0;
}

/* 弹窗页面样式 */
.Pixso-frame-1_360 {
  width: 1920px;
  height: 1838px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background-color: rgba(255, 255, 255, 1);
}

.Pixso-vector-1_361 {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_361.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}

.Pixso-vector-1_362 {
  width: 100%;
  height: 10.55%;
  background-image: url(@/assets/images/Vector_1_362.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 89.45%;
}

.Pixso-vector-1_365 {
  width: 6.72%;
  height: 7.01%;
  background-image: url(@/assets/images/Vector_1_365.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 6.46%;
  right: 86.82%;
  top: 1.8%;
  bottom: 91.19%;
}

.Pixso-paragraph-1_368 {
  font-size: 53px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 53px;
  color: rgba(217, 38, 38, 1);
  width: 16.66%;
  height: 2.88%;
  position: absolute;
  left: 14.69%;
  right: 68.65%;
  top: 3.16%;
  bottom: 93.96%;
}

.Pixso-paragraph-1_369 {
  font-size: 28.5px;
  font-family: "FZDaHei-B02S-Regular";
  font-weight: 400;
  line-height: 23.5px;
  color: rgba(217, 38, 38, 1);
  width: 16.3%;
  height: 1.3%;
  position: absolute;
  left: 14.9%;
  right: 68.8%;
  top: 6.53%;
  bottom: 92.17%;
}

.Pixso-vector-1_379 {
  width: 18.38%;
  height: 8.87%;
  background-image: url(@/assets/images/Vector_1_379.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.89%;
  right: 75.73%;
  top: 15.94%;
  bottom: 75.19%;
}

.Pixso-vector-1_380 {
  width: 18.38%;
  height: 6.26%;
  background-image: url(@/assets/images/Vector_1_380.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.89%;
  right: 75.73%;
  top: 24.86%;
  bottom: 68.88%;
}

.Pixso-vector-1_381 {
  width: 18.38%;
  height: 6.25%;
  background-image: url(@/assets/images/Vector_1_381.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.89%;
  right: 75.73%;
  top: 31.18%;
  bottom: 62.57%;
}

.Pixso-vector-1_382 {
  width: 18.38%;
  height: 6.26%;
  background-image: url(@/assets/images/Vector_1_382.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.89%;
  right: 75.73%;
  top: 37.54%;
  bottom: 56.2%;
}

.Pixso-vector-1_383 {
  width: 18.38%;
  height: 38.25%;
  background-image: url(@/assets/images/Vector_1_383.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 5.89%;
  right: 75.73%;
  top: 43.85%;
  bottom: 17.9%;
}

.Pixso-paragraph-1_384 {
  font-size: 75px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 75px;
  color: rgba(188, 211, 255, 1);
  width: 13.75%;
  height: 4.08%;
  position: absolute;
  left: 10%;
  right: 76.25%;
  top: 18.44%;
  bottom: 77.48%;
  opacity: 0.5;
}

.Pixso-paragraph-1_385 {
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
  top: 18.12%;
  bottom: 79.16%;
  white-space: pre;
  flex-grow: 0;
}

.Pixso-paragraph-1_386 {
  font-size: 20px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  white-space: pre-wrap;
  width: auto;
  height: auto;
  position: absolute;
  left: 8.7%;
  right: 79.58%;
  top: 27.37%;
  bottom: 71.55%;
  white-space: pre;
  flex-grow: 0;
}

.Pixso-paragraph-1_387 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  white-space: pre-wrap;
  width: 4.22%;
  height: 1.09%;
  position: absolute;
  left: 8.7%;
  right: 87.08%;
  top: 33.73%;
  bottom: 65.18%;
}

.Pixso-paragraph-1_388 {
  font-size: 20px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(255, 255, 255, 1);
  white-space: pre-wrap;
  width: 4.22%;
  height: 1.09%;
  position: absolute;
  left: 8.7%;
  right: 87.08%;
  top: 40.04%;
  bottom: 58.87%;
}

.Pixso-vector-1_405 {
  width: 0.05%;
  height: 1.25%;
  background-image: url(@/assets/images/Vector_1_405.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 8.05%;
  right: 91.9%;
  top: 27.34%;
  bottom: 71.41%;
}

.Pixso-vector-1_424 {
  width: 100%;
  height: 15.23%;
  background-image: url(@/assets/images/Vector_1_424.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 84.77%;
  bottom: 0%;
}

.Pixso-group-10_33 {
  width: 1312px;
  height: 1215px;
  position: absolute;
  left: 495px;
  top: 293px;
}

.Pixso-vector-1_431 {
  width: 100%;
  height: 100%;
  background-image: url(@/assets/images/Vector_1_431.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
}

.Pixso-vector-1_433 {
  width: 90.86%;
  height: 42.06%;
  background-image: url(@/assets/images/Vector_1_433.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  left: 4.34%;
  right: 4.8%;
  top: 28.97%;
  bottom: 28.97%;
}

.Pixso-paragraph-1_434 {
  font-size: 20px;
  font-family: "FZHei-B01S-Regular";
  font-weight: 400;
  line-height: 20px;
  color: rgba(53, 120, 248, 1);
  white-space: pre-wrap;
  width: 23.02%;
  height: 1.65%;
  position: absolute;
  left: 40.55%;
  right: 36.43%;
  top: 36.46%;
  bottom: 61.89%;
}

.Pixso-paragraph-1_435 {
  font-size: 25px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(51, 51, 51, 1);
  width: 5.79%;
  height: 2.06%;
  position: absolute;
  left: 33.08%;
  right: 61.13%;
  top: 36.21%;
  bottom: 61.73%;
}

.Pixso-paragraph-1_439 {
  font-size: 25px;
  font-family: "Alibaba PuHuiTi-Regular";
  font-weight: 400;
  line-height: 25px;
  color: rgba(51, 51, 51, 1);
  width: 7.7%;
  height: 2.05%;
  position: absolute;
  left: 33.08%;
  right: 59.22%;
  top: 45.2%;
  bottom: 52.75%;
}
</style>
  top: 45