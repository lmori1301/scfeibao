<template>
    <div class="scroll-container-48_168">
        <div id="48_168" class="Pixso-frame-48_168">
            <div id="48_169" class="Pixso-vector-48_169"></div>
            <div id="48_170" class="Pixso-vector-48_170"></div>
            <div id="48_173" class="Pixso-vector-48_173"></div>
            <p id="48_176" class="Pixso-paragraph-48_176">
                {{ "四川飞豹救援" }}
            </p>
            <p id="48_177" class="Pixso-paragraph-48_177">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="48_178" class="Pixso-vector-48_178"></div>
            <div id="48_179" class="Pixso-vector-48_179"></div>
            <div id="48_184" class="Pixso-vector-48_184"></div>
            <p id="48_192" class="Pixso-paragraph-48_192">
                {{ "当前位置：首页 > 政策法规 > 行业标准" }}
            </p>
            <div id="48_193" class="Pixso-group-48_193">
                <div id="48_194" class="Pixso-vector-48_194"></div>
                <p id="48_268" class="Pixso-paragraph-48_268">
                    {{ "共计 10 条" }}
                </p>
            </div>
            <div id="48_269" class="Pixso-vector-48_269"></div>
            <div id="48_270" class="Pixso-vector-48_270"></div>
            <div id="48_271" class="Pixso-vector-48_271"></div>
            <p id="48_272" class="Pixso-paragraph-48_272">
                {{ "国家应急救援队伍建设管理办法" }}
            </p>
            <p id="48_273" class="Pixso-paragraph-48_273">
                {{ "应急救援人员培训考核规定" }}
            </p>
            <p id="48_274" class="Pixso-paragraph-48_274">
                {{ "地震救援队伍建设标准" }}
            </p>
            <p id="48_275" class="Pixso-paragraph-48_275">
                {{
                    "文号：应急管理部令第15号     发布日期：2024-03-15     生效日期：2024-05-01     发布部门：应急管理部"
                }}
            </p>
            <p id="48_276" class="Pixso-paragraph-48_276">
                {{
                    "文号：应急管理部令第15号     发布日期：2024-03-15     生效日期：2024-05-01     发布部门：应急管理部"
                }}
            </p>
            <p id="48_277" class="Pixso-paragraph-48_277">
                {{
                    "文号：应急管理部令第15号     发布日期：2024-03-15     生效日期：2024-05-01     发布部门：应急管理部"
                }}
            </p>
            <p id="48_278" class="Pixso-paragraph-48_278">
                {{
                    "为了规范应急救援队伍建设，提高救援能力，保障人民群众生命财产安全，根据《中华人民共和国突发事件应对法》等法律法规，制定本办法。"
                }}
            </p>
            <p id="48_279" class="Pixso-paragraph-48_279">
                {{
                    "为了规范应急救援人员的培训考核工作，提高救援人员专业素质，制定本规定。"
                }}
            </p>
            <p id="48_280" class="Pixso-paragraph-48_280">
                {{
                    "规定了地震救援队伍的组织架构、人员配置、装备要求和训练标准。"
                }}
            </p>
            <div id="48_281" class="Pixso-vector-48_281"></div>
            <p id="48_282" class="Pixso-paragraph-48_282">{{ "下载文件" }}</p>
            <div id="48_283" class="Pixso-vector-48_283"></div>
            <p id="48_284" class="Pixso-paragraph-48_284">{{ "下载文件" }}</p>
            <div id="48_285" class="Pixso-vector-48_285"></div>
            <p id="48_286" class="Pixso-paragraph-48_286">{{ "下载文件" }}</p>
            <div id="48_287" class="Pixso-vector-48_287"></div>
            <p id="48_288" class="Pixso-paragraph-48_288">{{ "法律法规" }}</p>
            <div id="48_289" class="Pixso-vector-48_289"></div>
            <p id="48_290" class="Pixso-paragraph-48_290">{{ "部门规章" }}</p>
            <div id="48_291" class="Pixso-vector-48_291"></div>
            <p id="48_292" class="Pixso-paragraph-48_292">{{ "行业标准" }}</p>
            <div id="48_293" class="Pixso-vector-48_293"></div>
            <div id="48_295" class="Pixso-vector-48_295"></div>
            <div id="48_296" class="Pixso-vector-48_296"></div>
            <div id="48_297" class="Pixso-vector-48_297"></div>
            <p id="48_298" class="Pixso-paragraph-48_298">{{ "Policies" }}</p>
            <p id="48_299" class="Pixso-paragraph-48_299">{{ "政策法规" }}</p>
            <p id="48_301" class="Pixso-paragraph-48_301">{{ "部门规章" }}</p>
            <p id="48_302" class="Pixso-paragraph-48_302">{{ "法律法规" }}</p>
            <div id="48_304" class="Pixso-vector-48_304"></div>
            <div id="48_310" class="Pixso-group-48_310" @click.stop>
            <div id="48_311" class="Pixso-vector-48_311"></div>
            <!-- 输入框 -->
            <input
                v-model="searchKey"
                @keyup.enter="doSearch"
                placeholder="请输入您要搜索的内容"
                class="search-input"
            />
            <!-- 搜索图标点击 -->
            <div
                id="48_313"
                class="Pixso-vector-48_313"
                style="cursor: pointer"
                @click="doSearch"
            ></div>
        </div>
            <div id="48_319" class="Pixso-vector-48_319"></div>
            <router-link to="/overview-info" id="48_320" class="Pixso-paragraph-48_320">概况信息</router-link>
            <router-link to="/team-building" id="48_321" class="Pixso-paragraph-48_321">队伍建设</router-link>
            <router-link to="/info-public" id="48_322" class="Pixso-paragraph-48_322">信息公开</router-link>
            <router-link to="/dynamic-news" id="48_323" class="Pixso-paragraph-48_323">动态要闻</router-link>
            <router-link to="/policy-regulations" id="48_324" class="Pixso-paragraph-48_324">政策法规</router-link>
            <router-link to="/query-system" id="48_325" class="Pixso-paragraph-48_325">查询系统</router-link>
            <router-link to="/party-building" id="48_326" class="Pixso-paragraph-48_326">党建专栏</router-link>
            <div id="48_331" class="Pixso-vector-48_331"></div>
            <div id="48_333" class="Pixso-vector-48_333"></div>
            <p id="48_332" class="Pixso-paragraph-48_332">
                {{ "行业标准                          >" }}
            </p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
.scroll-container-48_168 {
    height: 100%;
    width: 100%;
    overflow: auto;
}
.Pixso-frame-48_168 {
    width: 1920px;
    height: 1671px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(255, 255, 255, 1);
}
.Pixso-vector-48_169 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_48_169.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-48_170 {
    width: 100%;
    height: 11.61%;
    background-image: url(@/assets/images/Vector_48_170.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 88.39%;
}
.Pixso-vector-48_173 {
    width: 6.72%;
    height: 7.72%;
    background-image: url(@/assets/images/Vector_48_173.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 1.97%;
    bottom: 90.31%;
}
.Pixso-paragraph-48_176 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 3.17%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 3.47%;
    bottom: 93.36%;
}
.Pixso-paragraph-48_177 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 1.44%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 7.18%;
    bottom: 91.38%;
}
.Pixso-vector-48_178 {
    width: 100%;
    height: 4.19%;
    background-image: url(@/assets/images/Vector_48_178.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 11.61%;
    bottom: 84.2%;
}
.Pixso-vector-48_179 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_48_179.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 194px;
}
.Pixso-vector-48_184 {
    width: 100%;
    height: 16.76%;
    background-image: url(@/assets/images/Vector_48_184.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 83.24%;
    bottom: 0%;
}
.Pixso-paragraph-48_192 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 5.89%;
    right: 76.51%;
    top: 17.65%;
    bottom: 81.15%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-group-48_193 {
    width: 689px;
    height: 42px;
    position: absolute;
    left: 1132px;
    top: 1274px;
}
.Pixso-vector-48_194 {
    width: 87.37%;
    height: 100%;
    background-image: url(@/assets/images/Vector_48_194.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 12.63%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-paragraph-48_268 {
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
.Pixso-vector-48_269 {
    width: 68.33%;
    height: 16.69%;
    background-image: url(@/assets/images/Vector_48_269.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.2%;
    right: 5.47%;
    top: 20.29%;
    bottom: 63.02%;
}
.Pixso-vector-48_270 {
    width: 68.33%;
    height: 16.7%;
    background-image: url(@/assets/images/Vector_48_270.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.2%;
    right: 5.47%;
    top: 38.48%;
    bottom: 44.82%;
}
.Pixso-vector-48_271 {
    width: 68.33%;
    height: 16.7%;
    background-image: url(@/assets/images/Vector_48_271.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 26.2%;
    right: 5.47%;
    top: 56.67%;
    bottom: 26.63%;
}
.Pixso-paragraph-48_272 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: 20.52%;
    height: 1.2%;
    position: absolute;
    left: 28.07%;
    right: 51.41%;
    top: 22.62%;
    bottom: 76.18%;
}
.Pixso-paragraph-48_273 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: 17.61%;
    height: 1.2%;
    position: absolute;
    left: 28.07%;
    right: 54.32%;
    top: 40.81%;
    bottom: 57.99%;
}
.Pixso-paragraph-48_274 {
    font-size: 28px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(68, 68, 68, 1);
    width: 14.69%;
    height: 1.19%;
    position: absolute;
    left: 28.07%;
    right: 57.24%;
    top: 59.01%;
    bottom: 39.8%;
}
.Pixso-paragraph-48_275 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    white-space: pre-wrap;
    width: 48.54%;
    height: 1.2%;
    position: absolute;
    left: 28.07%;
    right: 23.39%;
    top: 26.15%;
    bottom: 72.65%;
}
.Pixso-paragraph-48_276 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    white-space: pre-wrap;
    width: 48.54%;
    height: 1.2%;
    position: absolute;
    left: 28.07%;
    right: 23.39%;
    top: 44.34%;
    bottom: 54.46%;
}
.Pixso-paragraph-48_277 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    white-space: pre-wrap;
    width: 48.54%;
    height: 1.19%;
    position: absolute;
    left: 28.07%;
    right: 23.39%;
    top: 62.54%;
    bottom: 36.27%;
}
.Pixso-paragraph-48_278 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 28.07%;
    right: 7.34%;
    top: 29.68%;
    bottom: 69.12%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-48_279 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 28.07%;
    right: 36.04%;
    top: 47.88%;
    bottom: 50.93%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-48_280 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(70, 70, 70, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 28.07%;
    right: 41.15%;
    top: 66.07%;
    bottom: 32.73%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-48_281 {
    width: 5.63%;
    height: 2.16%;
    background-image: url(@/assets/images/Vector_48_281.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.85%;
    right: 65.52%;
    top: 33.21%;
    bottom: 64.63%;
}
.Pixso-paragraph-48_282 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(21, 112, 206, 1);
    width: 4.27%;
    height: 1.2%;
    position: absolute;
    left: 29.53%;
    right: 66.2%;
    top: 33.69%;
    bottom: 65.11%;
}
.Pixso-vector-48_283 {
    width: 5.63%;
    height: 2.15%;
    background-image: url(@/assets/images/Vector_48_283.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.85%;
    right: 65.52%;
    top: 51.41%;
    bottom: 46.44%;
}
.Pixso-paragraph-48_284 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(21, 112, 206, 1);
    width: 4.27%;
    height: 1.19%;
    position: absolute;
    left: 29.53%;
    right: 66.2%;
    top: 51.89%;
    bottom: 46.92%;
}
.Pixso-vector-48_285 {
    width: 5.63%;
    height: 2.15%;
    background-image: url(@/assets/images/Vector_48_285.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 28.85%;
    right: 65.52%;
    top: 69.6%;
    bottom: 28.25%;
}
.Pixso-paragraph-48_286 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(21, 112, 206, 1);
    width: 4.27%;
    height: 1.19%;
    position: absolute;
    left: 29.53%;
    right: 66.2%;
    top: 70.08%;
    bottom: 28.73%;
}
.Pixso-vector-48_287 {
    width: 5.63%;
    height: 2.1%;
    background-image: url(@/assets/images/Vector_48_287.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 87.08%;
    right: 7.29%;
    top: 22.2%;
    bottom: 75.7%;
}
.Pixso-paragraph-48_288 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 4.27%;
    height: 1.2%;
    position: absolute;
    left: 87.76%;
    right: 7.97%;
    top: 22.68%;
    bottom: 76.12%;
}
.Pixso-vector-48_289 {
    width: 5.63%;
    height: 2.1%;
    background-image: url(@/assets/images/Vector_48_289.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 87.08%;
    right: 7.29%;
    top: 40.39%;
    bottom: 57.51%;
}
.Pixso-paragraph-48_290 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 4.27%;
    height: 1.2%;
    position: absolute;
    left: 87.76%;
    right: 7.97%;
    top: 40.87%;
    bottom: 57.93%;
}
.Pixso-vector-48_291 {
    width: 5.63%;
    height: 2.09%;
    background-image: url(@/assets/images/Vector_48_291.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 87.08%;
    right: 7.29%;
    top: 58.59%;
    bottom: 39.32%;
}
.Pixso-paragraph-48_292 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 4.27%;
    height: 1.19%;
    position: absolute;
    left: 87.76%;
    right: 7.97%;
    top: 59.07%;
    bottom: 39.74%;
}
.Pixso-vector-48_293 {
    width: 18.38%;
    height: 9.75%;
    background-image: url(@/assets/images/Vector_48_293.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 20.29%;
    bottom: 69.96%;
}
.Pixso-vector-48_295 {
    width: 18.38%;
    height: 6.89%;
    background-image: url(@/assets/images/Vector_48_295.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 36.98%;
    bottom: 56.13%;
}
.Pixso-vector-48_296 {
    width: 18.38%;
    height: 6.88%;
    background-image: url(@/assets/images/Vector_48_296.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 30.04%;
    bottom: 63.08%;
}
.Pixso-vector-48_297 {
    width: 18.38%;
    height: 27.89%;
    background-image: url(@/assets/images/Vector_48_297.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 50.87%;
    bottom: 21.24%;
}
.Pixso-paragraph-48_298 {
    font-size: 75px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 75px;
    color: rgba(188, 211, 255, 1);
    width: 14.22%;
    height: 4.49%;
    position: absolute;
    left: 10.05%;
    right: 75.73%;
    top: 23.04%;
    bottom: 72.47%;
    opacity: 0.5;
}
.Pixso-paragraph-48_299 {
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
    top: 22.68%;
    bottom: 74.33%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-48_301 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 4.22%;
    height: 1.19%;
    position: absolute;
    left: 8.75%;
    right: 87.03%;
    top: 39.8%;
    bottom: 59.01%;
}
.Pixso-paragraph-48_302 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: 4.22%;
    height: 1.2%;
    position: absolute;
    left: 8.75%;
    right: 87.03%;
    top: 32.85%;
    bottom: 65.95%;
}
.Pixso-vector-48_304 {
    width: 2.14%;
    height: 2.52%;
    background-image: url(@/assets/images/Boolean_operation_48_304.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 8.07%;
    right: 89.79%;
    top: 23.04%;
    bottom: 74.44%;
}
.Pixso-group-48_310 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1477px;
    top: 90px;
}
.Pixso-vector-48_311 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_48_311.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-48_312 {
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
.Pixso-vector-48_313 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_48_313.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.21%;
    right: 7.4%;
    top: 50%;
    transform: translateY(calc(-50% + 0.5px));
}
.Pixso-vector-48_319 {
    width: 10.63%;
    height: 4.19%;
    background-image: url(@/assets/images/Vector_48_319.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 66.61%;
    right: 22.76%;
    top: 11.61%;
    bottom: 84.2%;
}
.Pixso-paragraph-48_320 {
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
    top: 12.99%;
    bottom: 85.52%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-48_321 {
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
    top: 12.99%;
    bottom: 85.52%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-48_322 {
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
    top: 12.99%;
    bottom: 85.52%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-48_323 {
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
    top: 12.99%;
    bottom: 85.52%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-48_324 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 69.58%;
    right: 26.25%;
    top: 12.99%;
    bottom: 85.52%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-48_325 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 12.99%;
    bottom: 85.52%;
    transform: translateX(calc(-50% + 624px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-48_326 {
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
    top: 12.99%;
    bottom: 85.52%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-48_331 {
    width: 18.38%;
    height: 6.88%;
    background-image: url(@/assets/images/Vector_48_331.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.94%;
    right: 75.68%;
    top: 43.93%;
    bottom: 49.19%;
}
.Pixso-vector-48_333 {
    width: 0.05%;
    height: 1.38%;
    background-image: url(@/assets/images/Vector_48_333.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 8.07%;
    right: 91.88%;
    top: 46.62%;
    bottom: 52%;
}
.Pixso-paragraph-48_332 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    white-space: pre-wrap;
    width: 11.77%;
    height: 1.2%;
    position: absolute;
    left: 8.75%;
    right: 79.48%;
    top: 46.68%;
    bottom: 52.12%;
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
