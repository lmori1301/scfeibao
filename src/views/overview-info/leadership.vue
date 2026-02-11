<template>
    <div class="scroll-container-1_183">
        <div id="1_183" class="Pixso-frame-1_183">
            <div id="1_184" class="Pixso-vector-1_184"></div>
            <div id="1_185" class="Pixso-vector-1_185"></div>
            <div id="1_186" class="Pixso-vector-1_186"></div>
            <div id="1_189" class="Pixso-vector-1_189"></div>
            <div id="17_34" class="Pixso-vector-17_34"></div>
            <div id="1_194" class="Pixso-vector-1_194"></div>
            <p id="1_197" class="Pixso-paragraph-1_197">{{ "四川飞豹救援" }}</p>
            <p id="1_198" class="Pixso-paragraph-1_198">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="1_214" class="Pixso-vector-1_214"></div>
            <div id="1_215" class="Pixso-vector-1_215"></div>
            <div id="1_216" class="Pixso-vector-1_216"></div>
            <div id="1_217" class="Pixso-vector-1_217"></div>
            <div id="1_218" class="Pixso-vector-1_218"></div>
            <p id="1_219" class="Pixso-paragraph-1_219">{{ "OVERV" }}</p>
            <p id="1_220" class="Pixso-paragraph-1_220">{{ "概况信息" }}</p>
            <p id="1_221" class="Pixso-paragraph-1_221">
                {{ "领导信息                          >" }}
            </p>
            <p id="1_222" class="Pixso-paragraph-1_222 overview-nav-item" role="button" tabindex="0" @click="goToOrganization" @keydown.enter="goToOrganization">组织机构</p>
            <p id="1_223" class="Pixso-paragraph-1_223 overview-nav-item" role="button" tabindex="0" @click="goToGeography" @keydown.enter="goToGeography">地理位置</p>
            <p id="1_224" class="Pixso-paragraph-1_224">
                当前位置：<router-link to="/" class="breadcrumb-link">首页</router-link> > <router-link to="/overview-info" class="breadcrumb-link">概况信息</router-link> > <span class="breadcrumb-current">领导信息</span>
            </p>
            <div id="1_225" class="Pixso-text-1_225">
                <p id="1_225_0" class="Pixso-paragraph-1_225_0">
                    <span id="1_225_0_1" class="Pixso-span-1_225_0_1">{{
                        "总队长"
                    }}</span>
                </p>
                <p id="1_225_1" class="Pixso-paragraph-1_225_1">
                    <span id="1_225_1_1" class="Pixso-span-1_225_1_1">{{
                        "队委会主任"
                    }}</span>
                </p>
            </div>
            <div id="1_226" class="Pixso-text-1_226">
                <p id="1_226_0" class="Pixso-paragraph-1_226_0">
                    <span id="1_226_0_1" class="Pixso-span-1_226_0_1">{{
                        "副总队长"
                    }}</span>
                </p>
                <p id="1_226_1" class="Pixso-paragraph-1_226_1">
                    <span id="1_226_1_1" class="Pixso-span-1_226_1_1">{{
                        "队委会副主任"
                    }}</span>
                </p>
            </div>
            <div id="1_227" class="Pixso-text-1_227">
                <p id="1_227_0" class="Pixso-paragraph-1_227_0">
                    <span id="1_227_0_1" class="Pixso-span-1_227_0_1">{{
                        "作战训练处处长"
                    }}</span>
                </p>
                <p id="1_227_1" class="Pixso-paragraph-1_227_1">
                    <span id="1_227_1_1" class="Pixso-span-1_227_1_1">{{
                        "队委会委员"
                    }}</span>
                </p>
            </div>
            <div id="1_228" class="Pixso-text-1_228">
                <p id="1_228_0" class="Pixso-paragraph-1_228_0">
                    <span id="1_228_0_1" class="Pixso-span-1_228_0_1">{{
                        "副总队长"
                    }}</span>
                </p>
                <p id="1_228_1" class="Pixso-paragraph-1_228_1">
                    <span id="1_228_1_1" class="Pixso-span-1_228_1_1">{{
                        "队委会副主任"
                    }}</span>
                </p>
            </div>
            <div id="1_229" class="Pixso-text-1_229">
                <p id="1_229_0" class="Pixso-paragraph-1_229_0">
                    <span id="1_229_0_1" class="Pixso-span-1_229_0_1">{{
                        "信息通信处处长"
                    }}</span>
                </p>
                <p id="1_229_1" class="Pixso-paragraph-1_229_1">
                    <span id="1_229_1_1" class="Pixso-span-1_229_1_1">{{
                        "队委会委员"
                    }}</span>
                </p>
            </div>
            <div id="1_230" class="Pixso-text-1_230">
                <p id="1_230_0" class="Pixso-paragraph-1_230_0">
                    <span id="1_230_0_1" class="Pixso-span-1_230_0_1">{{
                        "副总队长"
                    }}</span>
                </p>
                <p id="1_230_1" class="Pixso-paragraph-1_230_1">
                    <span id="1_230_1_1" class="Pixso-span-1_230_1_1">{{
                        "队委会副主任"
                    }}</span>
                </p>
            </div>
            <div id="1_231" class="Pixso-text-1_231">
                <p id="1_231_0" class="Pixso-paragraph-1_231_0">
                    <span id="1_231_0_1" class="Pixso-span-1_231_0_1">{{
                        "副总队长"
                    }}</span>
                </p>
                <p id="1_231_1" class="Pixso-paragraph-1_231_1">
                    <span id="1_231_1_1" class="Pixso-span-1_231_1_1">{{
                        "队委会副主任"
                    }}</span>
                </p>
            </div>
            <div id="1_232" class="Pixso-text-1_232">
                <p id="1_232_0" class="Pixso-paragraph-1_232_0">
                    <span id="1_232_0_1" class="Pixso-span-1_232_0_1">{{
                        "支队长"
                    }}</span>
                </p>
                <p id="1_232_1" class="Pixso-paragraph-1_232_1">
                    <span id="1_232_1_1" class="Pixso-span-1_232_1_1">{{
                        "队委会主任"
                    }}</span>
                </p>
            </div>
            <div id="1_233" class="Pixso-text-1_233">
                <p id="1_233_0" class="Pixso-paragraph-1_233_0">
                    <span id="1_233_0_1" class="Pixso-span-1_233_0_1">{{
                        "大队长"
                    }}</span>
                </p>
                <p id="1_233_1" class="Pixso-paragraph-1_233_1">
                    <span id="1_233_1_1" class="Pixso-span-1_233_1_1">{{
                        "队委会副主任"
                    }}</span>
                </p>
            </div>
            <div id="1_234" class="Pixso-text-1_234">
                <p id="1_234_0" class="Pixso-paragraph-1_234_0">
                    <span id="1_234_0_1" class="Pixso-span-1_234_0_1">{{
                        "大队长"
                    }}</span>
                </p>
                <p id="1_234_1" class="Pixso-paragraph-1_234_1">
                    <span id="1_234_1_1" class="Pixso-span-1_234_1_1">{{
                        "队委会主任"
                    }}</span>
                </p>
            </div>
            <div id="1_235" class="Pixso-text-1_235">
                <p id="1_235_0" class="Pixso-paragraph-1_235_0">
                    <span id="1_235_0_1" class="Pixso-span-1_235_0_1">{{
                        "副支队长"
                    }}</span>
                </p>
                <p id="1_235_1" class="Pixso-paragraph-1_235_1">
                    <span id="1_235_1_1" class="Pixso-span-1_235_1_1">{{
                        "队委会副主任"
                    }}</span>
                </p>
            </div>
            <div id="1_236" class="Pixso-text-1_236">
                <p id="1_236_0" class="Pixso-paragraph-1_236_0">
                    <span id="1_236_0_1" class="Pixso-span-1_236_0_1">{{
                        "副支队长"
                    }}</span>
                </p>
                <p id="1_236_1" class="Pixso-paragraph-1_236_1">
                    <span id="1_236_1_1" class="Pixso-span-1_236_1_1">{{
                        "队委会副主任"
                    }}</span>
                </p>
            </div>
            <p id="1_237" class="Pixso-paragraph-1_237">{{ "领导信息" }}</p>

            <p id="1_238" class="Pixso-paragraph-1_238">{{ "谢春明" }}</p>
            <p id="1_239" class="Pixso-paragraph-1_239">{{ "蒲凯" }}</p>
            <p id="1_240" class="Pixso-paragraph-1_240">{{ "余芝森" }}</p>
            <p id="1_241" class="Pixso-paragraph-1_241">{{ "何先伟" }}</p>
            <p id="1_242" class="Pixso-paragraph-1_242">{{ "丁涛" }}</p>
            <p id="1_243" class="Pixso-paragraph-1_243">{{ "肖明和" }}</p>
            <p id="1_244" class="Pixso-paragraph-1_244">{{ "陶琛" }}</p>
            <p id="1_245" class="Pixso-paragraph-1_245">{{ "李四" }}</p>
            <p id="1_246" class="Pixso-paragraph-1_246">{{ "李四" }}</p>
            <p id="1_247" class="Pixso-paragraph-1_247">{{ "李四" }}</p>
            <p id="1_248" class="Pixso-paragraph-1_248">{{ "李四" }}</p>
            <p id="1_249" class="Pixso-paragraph-1_249">{{ "李四" }}</p>
            <div id="1_250" class="Pixso-vector-1_250"></div>
            <div id="1_251" class="Pixso-vector-1_251"></div>
            <div id="1_252" class="Pixso-vector-1_252"></div>
            <div id="1_253" class="Pixso-vector-1_253 leader-photo-click" role="button" tabindex="0" @click="openDetail(3)" @keydown.enter="openDetail(3)"></div>
            <div id="1_256" class="Pixso-vector-1_256 leader-photo-click" role="button" tabindex="0" @click="openDetail(5)" @keydown.enter="openDetail(5)"></div>
            <div id="1_259" class="Pixso-vector-1_259 leader-photo-click" role="button" tabindex="0" @click="openDetail(0)" @keydown.enter="openDetail(0)"></div>
            <div id="1_262" class="Pixso-vector-1_262 leader-photo-click" role="button" tabindex="0" @click="openDetail(2)" @keydown.enter="openDetail(2)"></div>
            <div id="1_265" class="Pixso-vector-1_265 leader-photo-click" role="button" tabindex="0" @click="openDetail(6)" @keydown.enter="openDetail(6)"></div>
            <div id="1_268" class="Pixso-vector-1_268"></div>
            <div id="1_275" class="Pixso-vector-1_275 leader-photo-click" role="button" tabindex="0" @click="openDetail(6)" @keydown.enter="openDetail(6)"></div>
            <div id="1_276" class="Pixso-vector-1_276 leader-photo-click" role="button" tabindex="0" @click="openDetail(7)" @keydown.enter="openDetail(7)"></div>
            <div id="1_277" class="Pixso-vector-1_277 leader-photo-click" role="button" tabindex="0" @click="openDetail(11)" @keydown.enter="openDetail(11)"></div>
            <div id="1_278" class="Pixso-vector-1_278 leader-photo-click" role="button" tabindex="0" @click="openDetail(10)" @keydown.enter="openDetail(10)"></div>
            <div id="1_279" class="Pixso-vector-1_279 leader-photo-click" role="button" tabindex="0" @click="openDetail(9)" @keydown.enter="openDetail(9)"></div>
            <div id="1_280" class="Pixso-vector-1_280 leader-photo-click" role="button" tabindex="0" @click="openDetail(8)" @keydown.enter="openDetail(8)"></div>
            <div id="1_281" class="Pixso-vector-1_281 leader-photo-click" role="button" tabindex="0" @click="openDetail(1)" @keydown.enter="openDetail(1)"></div>
            <div id="1_354" class="Pixso-vector-1_354"></div>
            <div id="6_660" class="Pixso-group-6_660">
                <div id="6_661" class="Pixso-vector-6_661"></div>
                <p id="6_735" class="Pixso-paragraph-6_735">
                    {{ "共计 10 条" }}
                </p>
            </div>
            <div id="33_336" class="Pixso-group-33_336">
                <div id="33_337" class="Pixso-vector-33_337"></div>
                <p id="33_338" class="Pixso-paragraph-33_338">
                    {{ "请输入您要搜索的内容" }}
                </p>
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

        <!-- 领导详情弹窗（按设计图排版） -->
        <Teleport to="body">
            <div v-show="detailVisible" class="leader-detail-mask" @click.self="closeDetail">
                <div class="leader-detail-dialog">
                    <button type="button" class="leader-detail-close" aria-label="关闭" @click="closeDetail">×</button>
                    <div v-if="currentLeader" class="leader-detail-content">
                        <div class="leader-detail-photo" :style="{ backgroundImage: currentLeader.photoUrl ? `url(${currentLeader.photoUrl})` : 'none' }"></div>
                        <div class="leader-detail-right">
                            <div class="leader-detail-name-row">
                                <h2 class="leader-detail-name">{{ currentLeader.name }}</h2>
                                <span class="leader-detail-title">{{ currentLeader.title }}</span>
                            </div>
                            <p class="leader-detail-bio">{{ currentLeader.bio }}</p>
                            <h3 class="leader-detail-label">工作职责</h3>
                            <p class="leader-detail-duty">{{ currentLeader.duty }}</p>
                            <div class="leader-detail-cards">
                                <div class="leader-detail-card">
                                    <span class="leader-detail-card-label">救援经验</span>
                                    <span class="leader-detail-card-value">{{ currentLeader.experience }}</span>
                                </div>
                                <div class="leader-detail-card">
                                    <span class="leader-detail-card-label">参与行动</span>
                                    <span class="leader-detail-card-value">{{ currentLeader.actions }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import img253 from '@/assets/images/Vector_1_253.png'
import img256 from '@/assets/images/Vector_1_256.png'
import img259 from '@/assets/images/Vector_1_259.png'
import img262 from '@/assets/images/Vector_1_262.png'
import img265 from '@/assets/images/Vector_1_265.png'
import img275 from '@/assets/images/Vector_1_275.png'
import img276 from '@/assets/images/Vector_1_276.png'
import img277 from '@/assets/images/Vector_1_277.png'
import img278 from '@/assets/images/Vector_1_278.png'
import img279 from '@/assets/images/Vector_1_279.png'
import img280 from '@/assets/images/Vector_1_280.png'
import img281 from '@/assets/images/Vector_1_281.png'

interface LeaderItem {
    name: string
    title: string
    duty: string
    bio: string
    experience: string
    actions: string
    photoUrl?: string
}

const leaders: LeaderItem[] = [
    { name: '谢春明', title: '四川飞豹救援总队长、队委会主任', duty: '全面负责救援队各项工作，制定发展战略和救援计划', bio: '男，汉族，1967年11月出生，大学学历，工学硕士，中共党员', experience: '15+年', actions: '120+次', photoUrl: img259 },
    { name: '蒲凯', title: '副总队长、队委会副主任', duty: '协助总队长开展日常工作，分管综合协调与对外联络', bio: '男，汉族，大学学历，中共党员', experience: '12+年', actions: '90+次', photoUrl: img281 },
    { name: '余芝森', title: '作战训练处处长、队委会委员', duty: '负责作战训练、演练与考核工作', bio: '男，汉族，研究生学历，中共党员', experience: '10+年', actions: '80+次', photoUrl: img262 },
    { name: '何先伟', title: '副总队长、队委会副主任', duty: '协助总队长工作，分管后勤保障与装备管理', bio: '男，汉族，大学学历，中共党员', experience: '11+年', actions: '85+次', photoUrl: img253 },
    { name: '丁涛', title: '信息通信处处长、队委会委员', duty: '负责信息通信、指挥调度系统建设与运维', bio: '男，汉族，大学学历，中共党员', experience: '9+年', actions: '70+次', photoUrl: img265 },
    { name: '肖明和', title: '副总队长、队委会副主任', duty: '协助总队长工作，分管应急救援与预案管理', bio: '男，汉族，大学学历，中共党员', experience: '13+年', actions: '100+次', photoUrl: img256 },
    { name: '陶琛', title: '副总队长、队委会副主任', duty: '协助总队长工作，分管队伍建设与培训', bio: '男，汉族，大学学历，中共党员', experience: '10+年', actions: '75+次', photoUrl: img275 },
    { name: '李四', title: '支队长、队委会主任', duty: '负责支队全面工作', bio: '男，汉族，大学学历，中共党员', experience: '8+年', actions: '60+次', photoUrl: img276 },
    { name: '李四', title: '大队长、队委会副主任', duty: '负责大队日常管理与训练', bio: '男，汉族，大学学历，中共党员', experience: '7+年', actions: '50+次', photoUrl: img280 },
    { name: '李四', title: '大队长、队委会主任', duty: '负责大队全面工作', bio: '男，汉族，大学学历，中共党员', experience: '7+年', actions: '52+次', photoUrl: img279 },
    { name: '李四', title: '副支队长、队委会副主任', duty: '协助支队长开展工作', bio: '男，汉族，大学学历，中共党员', experience: '6+年', actions: '45+次', photoUrl: img278 },
    { name: '李四', title: '副支队长、队委会副主任', duty: '协助支队长开展工作', bio: '男，汉族，大学学历，中共党员', experience: '6+年', actions: '44+次', photoUrl: img277 },
]

const router = useRouter()
const detailVisible = ref(false)
const detailIndex = ref(0)

const currentLeader = computed<LeaderItem | null>(() => leaders[detailIndex.value] ?? null)

function openDetail(index: number) {
    detailIndex.value = index
    detailVisible.value = true
}

function closeDetail() {
    detailVisible.value = false
}

function goToOrganization() {
    router.push('/overview-info/organization')
}

function goToGeography() {
    router.push('/overview-info/geography')
}
</script>

<style>
.scroll-container-1_183 {
    height: 100%;
    width: 100%;
    overflow: auto;
}
.overview-nav-item {
    cursor: pointer;
}
.breadcrumb-link {
    color: #848484;
    text-decoration: none;
}
.breadcrumb-link:hover {
    color: #848484;
    opacity: 0.9;
}
.breadcrumb-link:active,
.breadcrumb-link:visited {
    text-decoration: underline;
}
.breadcrumb-current {
    color: inherit;
}
.main-nav-link {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}
.main-nav-link:hover {
    opacity: 0.9;
}
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
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 32.45%;
    right: 62.34%;
    top: 36.49%;
    bottom: 60.95%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_225_0 {
    line-height: 30px;
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
    line-height: 30px;
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
.Pixso-text-1_226 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 31.93%;
    right: 61.82%;
    top: 55.83%;
    bottom: 41.61%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_226_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_226_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_226_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_226_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_227 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 48.23%;
    right: 44.48%;
    top: 55.87%;
    bottom: 41.57%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_227_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_227_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_227_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_227_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_228 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 48.75%;
    right: 45%;
    top: 36.49%;
    bottom: 60.95%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_228_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_228_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_228_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_228_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_229 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 64.48%;
    right: 28.23%;
    top: 55.87%;
    bottom: 41.57%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_229_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_229_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_229_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_229_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_230 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 64.9%;
    right: 28.85%;
    top: 36.49%;
    bottom: 60.95%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_230_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_230_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_230_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_230_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_231 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 81.56%;
    right: 12.19%;
    top: 36.49%;
    bottom: 60.95%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_231_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_231_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_231_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_231_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_232 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 82.08%;
    right: 12.71%;
    top: 55.87%;
    bottom: 41.57%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_232_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_232_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_232_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_232_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_233 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 81.46%;
    right: 12.29%;
    top: 75.8%;
    bottom: 21.64%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_233_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_233_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_233_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_233_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_234 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 65.31%;
    right: 29.48%;
    top: 75.8%;
    bottom: 21.64%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_234_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_234_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_234_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_234_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_235 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 48.65%;
    right: 45.1%;
    top: 75.8%;
    bottom: 21.64%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_235_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_235_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_235_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_235_1_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_236 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: Regular;
    text-align: center;
    line-height: 30px;
    color: rgba(53, 120, 248, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 31.82%;
    right: 61.93%;
    top: 75.8%;
    bottom: 21.64%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_236_0 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_236_0_1 {
    font-size: 20px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    color: rgba(53, 120, 248, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_236_1 {
    line-height: 30px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_236_1_1 {
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
.Pixso-paragraph-1_239 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    width: 2.71%;
    height: 1.07%;
    position: absolute;
    left: 33.7%;
    right: 63.59%;
    top: 54.12%;
    bottom: 44.81%;
}
.Pixso-paragraph-1_240 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    width: 3.96%;
    height: 1.07%;
    position: absolute;
    left: 49.58%;
    right: 46.46%;
    top: 54.16%;
    bottom: 44.77%;
}
.Pixso-paragraph-1_241 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    width: 3.96%;
    height: 1.07%;
    position: absolute;
    left: 49.58%;
    right: 46.46%;
    top: 34.78%;
    bottom: 64.15%;
}
.Pixso-paragraph-1_242 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    width: 2.71%;
    height: 1.07%;
    position: absolute;
    left: 66.72%;
    right: 30.57%;
    top: 54.16%;
    bottom: 44.77%;
}
.Pixso-paragraph-1_243 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    width: 3.96%;
    height: 1.07%;
    position: absolute;
    left: 66.09%;
    right: 29.95%;
    top: 34.78%;
    bottom: 64.15%;
}
.Pixso-paragraph-1_244 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    width: 2.71%;
    height: 1.07%;
    position: absolute;
    left: 83.33%;
    right: 13.96%;
    top: 34.78%;
    bottom: 64.15%;
}
.Pixso-paragraph-1_245 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    width: 2.71%;
    height: 1.07%;
    position: absolute;
    left: 83.33%;
    right: 13.96%;
    top: 54.16%;
    bottom: 44.77%;
}
.Pixso-paragraph-1_246 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    width: 2.71%;
    height: 1.07%;
    position: absolute;
    left: 83.23%;
    right: 14.06%;
    top: 74.09%;
    bottom: 24.84%;
}
.Pixso-paragraph-1_247 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    width: 2.71%;
    height: 1.07%;
    position: absolute;
    left: 66.56%;
    right: 30.73%;
    top: 74.09%;
    bottom: 24.84%;
}
.Pixso-paragraph-1_248 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    width: 2.7%;
    height: 1.07%;
    position: absolute;
    left: 50.42%;
    right: 46.88%;
    top: 74.09%;
    bottom: 24.84%;
}
.Pixso-paragraph-1_249 {
    font-size: 25px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(51, 51, 51, 1);
    width: 2.71%;
    height: 1.07%;
    position: absolute;
    left: 33.59%;
    right: 63.7%;
    top: 74.09%;
    bottom: 24.84%;
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
    width: 0.2%;
    height: 0.98%;
    background-image: url(@/assets/images/Vector_1_252.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 8.05%;
    right: 91.75%;
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

/* 领导照片可点击 */
.leader-photo-click {
    cursor: pointer;
}

/* 领导详情弹窗（参考设计图排版） */
.leader-detail-mask {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
}
.leader-detail-dialog {
    position: relative;
    width: 100%;
    max-width: 960px;
    max-height: 90vh;
    overflow: auto;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}
.leader-detail-close {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 1;
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    border-radius: 50%;
    cursor: pointer;
    font-size: 30px;
    line-height: 1;
    color: #555;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.leader-detail-close:hover {
    background: rgba(0, 0, 0, 0.06);
    color: #333;
}
.leader-detail-content {
    padding: 48px 48px 44px;
    display: flex;
    gap: 40px;
    align-items: flex-start;
}
.leader-detail-photo {
    min-width: 200px;
    max-width: 220px;
    width: 220px;
    aspect-ratio: 200 / 260;
    flex-shrink: 0;
    align-self: center;
    background: #e8e8e8 center/cover no-repeat;
    border-radius: 10px;
}
.leader-detail-right {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.leader-detail-name-row {
    display: flex;
    align-items: baseline;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 16px;
}
.leader-detail-name {
    font-size: 28px;
    font-weight: 700;
    font-family: "Alibaba PuHuiTi-Regular", "PingFang SC", "Microsoft YaHei", sans-serif;
    color: #1a1a1a;
    margin: 0;
    line-height: 1.3;
}
.leader-detail-title {
    font-size: 20px;
    font-weight: 400;
    font-family: "FZHei-B01S-Regular", "Alibaba PuHuiTi-Regular", sans-serif;
    color: #3578F8;
    line-height: 1.4;
}
.leader-detail-bio {
    font-size: 20px;
    font-weight: 400;
    font-family: "Alibaba PuHuiTi-Regular", "PingFang SC", sans-serif;
    color: #666;
    margin: 0 0 22px;
    line-height: 1.5;
}
.leader-detail-label {
    font-size: 22px;
    font-weight: 700;
    font-family: "Alibaba PuHuiTi-Regular", "PingFang SC", sans-serif;
    color: #1a1a1a;
    margin: 0 0 8px;
    line-height: 1.4;
}
.leader-detail-duty {
    font-size: 20px;
    font-weight: 400;
    font-family: "Alibaba PuHuiTi-Regular", "PingFang SC", sans-serif;
    color: #666;
    margin: 0 0 28px;
    line-height: 1.5;
}
.leader-detail-cards {
    display: flex;
    gap: 24px;
}
.leader-detail-card {
    flex: 1;
    min-width: 0;
    border: 1px solid #a8c8f0;
    border-radius: 10px;
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 100px;
    background: #F2F5FF;
}
.leader-detail-card-label {
    font-size: 20px;
    font-weight: 400;
    font-family: "Alibaba PuHuiTi-Regular", "PingFang SC", sans-serif;
    color: #666;
}
.leader-detail-card-value {
    font-size: 30px;
    font-weight: 700;
    font-family: "Alibaba PuHuiTi-Regular", "PingFang SC", sans-serif;
    color: #1a1a1a;
}
</style>
