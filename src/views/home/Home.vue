<template>
    <div ref="scrollContainerRef" class="scroll-container-1_2">
        <div ref="contentContainerRef" id="1_2" class="Pixso-frame-1_2">
            <div id="1_3" class="Pixso-vector-1_3"></div>
            <div
                id="1_4"
                class="Pixso-vector-1_4"
                :style="{ backgroundImage: bannerList[currentBannerIndex] ? `url(${bannerList[currentBannerIndex].image})` : 'none' }"
            ></div>
            <div id="1_7" class="Pixso-vector-1_7"></div>
            <div id="1_10" class="Pixso-vector-1_10"></div>
            <p id="1_13" class="Pixso-paragraph-1_13">{{ "四川飞豹救援" }}</p>
            <p id="1_14" class="Pixso-paragraph-1_14">
                {{ "Sichuan Feibao Rescue" }}
            </p>
            <div id="1_17" class="Pixso-vector-1_17"></div>
            <div id="33_2" class="Pixso-group-33_2" @click.stop>
                <div id="1_15" class="Pixso-vector-1_15"></div>
                <!-- 输入框 -->
                <input
                    v-model="searchKey"
                    @keyup.enter="doSearch"
                    placeholder="请输入您要搜索的内容"
                    class="search-input"
                />
                <!-- 搜索图标点击 -->
                <div
                    id="1_18"
                    class="Pixso-vector-1_18"
                    style="cursor: pointer"
                    @click="doSearch"
                ></div>
            </div>
            <div id="1_24" class="Pixso-vector-1_24"></div>
            <div id="1_25" class="Pixso-vector-1_25"></div>
            <div id="1_31" class="Pixso-vector-1_31"></div>
            <!-- Banner 轮播圆点指示器 -->
            <div class="banner-carousel-dots">
                <span
                    v-for="(item, index) in bannerList"
                    :key="item.id"
                    class="banner-dot"
                    :class="{ active: currentBannerIndex === index }"
                    @click="switchBanner(index)"
                ></span>
            </div>
            <p
                v-if="bannerList[currentBannerIndex]"
                id="1_35"
                class="Pixso-paragraph-1_35"
                @click="navigateToNews(bannerList[currentBannerIndex].link)"
                style="cursor: pointer;"
            >
                {{ bannerList[currentBannerIndex].title }}
            </p>
            <p v-if="newsList[0]" id="1_36" class="Pixso-paragraph-1_36" @click="navigateTo(`/dynamic-news/${newsList[0].id}`)" style="cursor: pointer;">
                {{ newsList[0].title }}
            </p>
            <p v-if="newsList[1]" id="1_37" class="Pixso-paragraph-1_37" @click="navigateTo(`/dynamic-news/${newsList[1].id}`)" style="cursor: pointer;">
                {{ newsList[1].title }}
            </p>
            <p v-if="newsList[2]" id="1_38" class="Pixso-paragraph-1_38" @click="navigateTo(`/dynamic-news/${newsList[2].id}`)" style="cursor: pointer;">
                {{ newsList[2].title }}
            </p>
            <p v-if="newsList[3]" id="1_39" class="Pixso-paragraph-1_39" @click="navigateTo(`/dynamic-news/${newsList[3].id}`)" style="cursor: pointer;">
                {{ newsList[3].title }}
            </p>
            <p v-if="newsList[4]" id="1_40" class="Pixso-paragraph-1_40" @click="navigateTo(`/dynamic-news/${newsList[4].id}`)" style="cursor: pointer;">
                {{ newsList[4].title }}
            </p>
            <p v-if="newsList[5]" id="1_41" class="Pixso-paragraph-1_41" @click="navigateTo(`/dynamic-news/${newsList[5].id}`)" style="cursor: pointer;">
                {{ newsList[5].title }}
            </p>
            <p v-if="newsList[6]" id="1_42" class="Pixso-paragraph-1_42" @click="navigateTo(`/dynamic-news/${newsList[6].id}`)" style="cursor: pointer;">
                {{ newsList[6].title }}
            </p>
            <p v-if="newsList[7]" id="1_43" class="Pixso-paragraph-1_43" @click="navigateTo(`/dynamic-news/${newsList[7].id}`)" style="cursor: pointer;">
                {{ newsList[7].title }}
            </p>
            <p v-if="newsList[8]" id="1_44" class="Pixso-paragraph-1_44" @click="navigateTo(`/dynamic-news/${newsList[8].id}`)" style="cursor: pointer;">
                {{ newsList[8].title }}
            </p>
            <p v-if="newsList[9]" id="1_45" class="Pixso-paragraph-1_45" @click="navigateTo(`/dynamic-news/${newsList[9].id}`)" style="cursor: pointer;">
                {{ newsList[9].title }}
            </p>
            <div id="1_46" class="Pixso-text-1_46" @click="navigateTo('/dynamic-news/1')" style="cursor: pointer;">
                <p id="1_46_0" class="Pixso-paragraph-1_46_0">
                    <span id="1_46_0_1" class="Pixso-span-1_46_0_1">{{
                        "为深入贯彻习近平总书记授旗训词精神，按照应急管理部和省委省政府的工作要求，"
                    }}</span>
                </p>
                <p id="1_46_1" class="Pixso-paragraph-1_46_1">
                    <span id="1_46_1_1" class="Pixso-span-1_46_1_1">{{
                        "6月29日，四川在成都举行全省综合性消防救援专业队伍授旗授牌仪式。"
                    }}</span>
                </p>
            </div>
            <div id="1_47" class="Pixso-text-1_47" @click="navigateTo('/dynamic-news/2')" style="cursor: pointer;">
                <p id="1_47_0" class="Pixso-paragraph-1_47_0">
                    <span id="1_47_0_1" class="Pixso-span-1_47_0_1">{{
                        "会议总结了全省消防救援队伍建设工作成效，部署下一阶段重点任务，"
                    }}</span>
                </p>
                <p id="1_47_1" class="Pixso-paragraph-1_47_1">
                    <span id="1_47_1_1" class="Pixso-span-1_47_1_1">{{
                        "强调要持续提升队伍专业化、职业化水平，更好服务人民群众。"
                    }}</span>
                </p>
            </div>
            <div id="1_48" class="Pixso-text-1_48" @click="navigateTo('/dynamic-news/3')" style="cursor: pointer;">
                <p id="1_48_0" class="Pixso-paragraph-1_48_0">
                    <span id="1_48_0_1" class="Pixso-span-1_48_0_1">{{
                        "在省级表彰大会上，四川飞豹救援凭借出色的救援业绩和专业能力，"
                    }}</span>
                </p>
                <p id="1_48_1" class="Pixso-paragraph-1_48_1">
                    <span id="1_48_1_1" class="Pixso-span-1_48_1_1">{{
                        "被授予省级先进集体荣誉称号，展现了队伍的使命担当。"
                    }}</span>
                </p>
            </div>
            <p id="1_49" class="Pixso-paragraph-1_49" @click="navigateTo('/dynamic-news')" style="cursor: pointer;">{{ "更多 >>" }}</p>
            <p id="32_1" class="Pixso-paragraph-32_1" @click="navigateTo('/dynamic-news')" style="cursor: pointer;">{{ "更多 >>" }}</p>
            <div id="1_51" class="Pixso-text-1_51" @click="navigateTo('/dynamic-news/4')" style="cursor: pointer;">
                <p id="1_51_0" class="Pixso-paragraph-1_51_0">
                    <span id="1_51_0_1" class="Pixso-span-1_51_0_1">{{
                        "成都支队组织全体队员开展冬季应急救援综合演练，模拟多种灾害场景，"
                    }}</span>
                </p>
                <p id="1_51_1" class="Pixso-paragraph-1_51_1">
                    <span id="1_51_1_1" class="Pixso-span-1_51_1_1">{{
                        "全面检验队伍应急响应能力和协同作战水平，提升实战能力。"
                    }}</span>
                </p>
            </div>
            <div id="1_52" class="Pixso-text-1_52" @click="navigateTo('/dynamic-news/5')" style="cursor: pointer;">
                <p id="1_52_0" class="Pixso-paragraph-1_52_0">
                    <span id="1_52_0_1" class="Pixso-span-1_52_0_1">{{
                        "乐山支队深入辖区社区、学校、企业开展消防安全知识宣传活动，"
                    }}</span>
                </p>
                <p id="1_52_1" class="Pixso-paragraph-1_52_1">
                    <span id="1_52_1_1" class="Pixso-span-1_52_1_1">{{
                        "普及消防安全常识，提高群众自防自救能力，筑牢安全防线。"
                    }}</span>
                </p>
            </div>
            <div id="1_53" class="Pixso-text-1_53" @click="navigateTo('/dynamic-news/6')" style="cursor: pointer;">
                <p id="1_53_0" class="Pixso-paragraph-1_53_0">
                    <span id="1_53_0_1" class="Pixso-span-1_53_0_1">{{
                        "崇州支队顺利完成年度装备升级改造任务，新增多套先进救援装备，"
                    }}</span>
                </p>
                <p id="1_53_1" class="Pixso-paragraph-1_53_1">
                    <span id="1_53_1_1" class="Pixso-span-1_53_1_1">{{
                        "进一步提升队伍装备现代化水平和综合救援能力。"
                    }}</span>
                </p>
            </div>
            <div id="1_54" class="Pixso-text-1_54" @click="navigateTo('/dynamic-news/7')" style="cursor: pointer;">
                <p id="1_54_0" class="Pixso-paragraph-1_54_0">
                    <span id="1_54_0_1" class="Pixso-span-1_54_0_1">{{
                        "双流支队与成都双流国际机场开展联合应急演练，模拟航空器事故救援，"
                    }}</span>
                </p>
                <p id="1_54_1" class="Pixso-paragraph-1_54_1">
                    <span id="1_54_1_1" class="Pixso-span-1_54_1_1">{{
                        "强化空地协同配合，提升机场应急处置能力。"
                    }}</span>
                </p>
            </div>
            <div id="1_55" class="Pixso-text-1_55" @click="navigateTo('/dynamic-news/8')" style="cursor: pointer;">
                <p id="1_55_0" class="Pixso-paragraph-1_55_0">
                    <span id="1_55_0_1" class="Pixso-span-1_55_0_1">{{
                        "四川飞豹救援接警后迅速出动，成功处置一起高速公路多车连环相撞事故，"
                    }}</span>
                </p>
                <p id="1_55_1" class="Pixso-paragraph-1_55_1">
                    <span id="1_55_1_1" class="Pixso-span-1_55_1_1">{{
                        "及时救出被困人员，展现了专业高效的救援能力。"
                    }}</span>
                </p>
            </div>
            <div id="1_56" class="Pixso-text-1_56" @click="navigateTo('/dynamic-news/9')" style="cursor: pointer;">
                <p id="1_56_0" class="Pixso-paragraph-1_56_0">
                    <span id="1_56_0_1" class="Pixso-span-1_56_0_1">{{
                        "山地救援队接到求助后立即出发，克服恶劣天气和复杂地形，"
                    }}</span>
                </p>
                <p id="1_56_1" class="Pixso-paragraph-1_56_1">
                    <span id="1_56_1_1" class="Pixso-span-1_56_1_1">{{
                        "成功将被困登山者安全转移下山，获得群众高度赞扬。"
                    }}</span>
                </p>
            </div>
            <div id="1_57" class="Pixso-text-1_57">
                <p id="1_57_0" class="Pixso-paragraph-1_57_0">
                    <span id="1_57_0_1" class="Pixso-span-1_57_0_1">{{
                        "水域救援队接到报警后快速响应，利用专业救援装备和技术，"
                    }}</span>
                </p>
                <p id="1_57_1" class="Pixso-paragraph-1_57_1">
                    <span id="1_57_1_1" class="Pixso-span-1_57_1_1">{{
                        "成功将落水群众救起并送医救治，确保了人民群众生命安全。"
                    }}</span>
                </p>
            </div>
            <div
                id="1_58"
                class="Pixso-vector-1_58"
                @click="prevBanner"
                style="cursor: pointer; z-index: 10;"
            ></div>
            <div
                id="1_59"
                class="Pixso-vector-1_59"
                @click="nextBanner"
                style="cursor: pointer; z-index: 10;"
            ></div>
            <p id="1_65" class="Pixso-paragraph-1_65">{{ "12-20" }}</p>
            <p id="1_66" class="Pixso-paragraph-1_66">{{ "12-15" }}</p>
            <p id="1_67" class="Pixso-paragraph-1_67">{{ "12-10" }}</p>
            <p id="1_68" class="Pixso-paragraph-1_68">{{ "12-05" }}</p>
            <p id="1_69" class="Pixso-paragraph-1_69">{{ "11-28" }}</p>
            <p id="1_70" class="Pixso-paragraph-1_70">{{ "11-20" }}</p>
            <p id="1_71" class="Pixso-paragraph-1_71">{{ "11-15" }}</p>
            <p id="1_72" class="Pixso-paragraph-1_72">{{ "11-10" }}</p>
            <p id="1_73" class="Pixso-paragraph-1_73">{{ "11-05" }}</p>
            <div id="1_74" class="Pixso-vector-1_74"></div>
            <p id="1_75" class="Pixso-paragraph-1_75">{{ "10-30" }}</p>
            <p id="1_76" class="Pixso-paragraph-1_76">{{ "2025" }}</p>
            <p id="1_77" class="Pixso-paragraph-1_77">{{ "2025" }}</p>
            <p id="1_78" class="Pixso-paragraph-1_78">{{ "2025" }}</p>
            <p id="1_79" class="Pixso-paragraph-1_79">{{ "2025" }}</p>
            <p id="1_80" class="Pixso-paragraph-1_80">{{ "2025" }}</p>
            <p id="1_81" class="Pixso-paragraph-1_81">{{ "2025" }}</p>
            <p id="1_82" class="Pixso-paragraph-1_82">{{ "2025" }}</p>
            <p id="1_83" class="Pixso-paragraph-1_83">{{ "2025" }}</p>
            <p id="1_84" class="Pixso-paragraph-1_84">{{ "2025" }}</p>
            <p id="1_85" class="Pixso-paragraph-1_85">{{ "2025" }}</p>
            <div id="1_86" class="Pixso-vector-1_86"></div>
            <div id="1_89" class="Pixso-vector-1_89"></div>
            <div id="1_90" class="Pixso-vector-1_90"></div>
            <div id="1_91" class="Pixso-vector-1_91"></div>
            <div id="1_92" class="Pixso-vector-1_92"></div>
            <div id="1_93" class="Pixso-vector-1_93"></div>
            <div id="1_94" class="Pixso-vector-1_94"></div>
            <div id="1_95" class="Pixso-vector-1_95"></div>
            <div id="1_96" class="Pixso-vector-1_96"></div>
            <div id="1_97" class="Pixso-vector-1_97"></div>
            <div id="1_98" class="Pixso-vector-1_98"></div>
            <div id="1_102" class="Pixso-vector-1_102"></div>
            <div id="1_103" class="Pixso-vector-1_103"></div>
            <div id="1_104" class="Pixso-vector-1_104"></div>
            <div id="1_105" class="Pixso-vector-1_105"></div>
            <div id="1_106" class="Pixso-vector-1_106"></div>
            <div id="1_107" class="Pixso-vector-1_107"></div>
            <div id="1_110" class="Pixso-vector-1_110"></div>
            <div id="1_113" ref="bottomBgRef" class="Pixso-vector-1_113"></div>
            <div
                id="1_116"
                class="Pixso-vector-1_116"
                @click="openVideoModal"
                style="cursor: pointer; z-index: 10;"
            ></div>
            <p id="1_117" class="Pixso-paragraph-1_117">
                {{ "燃爆！四川飞豹救援形象片" }}
            </p>
            <!-- 视频播放模态框 -->
            <div v-if="showVideoModal" class="video-modal" @click.self="closeVideoModal">
                <div class="video-modal-content">
                    <button class="video-modal-close" @click="closeVideoModal">✕</button>
                    <video
                        v-if="videoSrc"
                        ref="videoRef"
                        :src="videoSrc"
                        class="video-modal-player"
                        controls
                        @error="handleVideoError"
                    ></video>
                </div>
            </div>
            <div id="32_8" ref="bottomTextRef" class="Pixso-group-32_8">
                <p id="1_118" class="Pixso-paragraph-1_118">
                    {{ websiteConfig.host_unit }}
                </p>
                <p id="1_119" class="Pixso-paragraph-1_119">
                    {{ websiteConfig.organizer_unit }}
                </p>
                <p id="1_120" class="Pixso-paragraph-1_120">
                    {{ websiteConfig.icp_number }}
                </p>
                <p id="1_121" class="Pixso-paragraph-1_121">
                    {{ websiteConfig.copyright }}
                </p>
            </div>
            <!-- 友情链接背景框 -->
            <div id="1_122" class="Pixso-vector-1_122"></div>
            <div id="1_123" class="Pixso-vector-1_123"></div>
            <div id="1_124" class="Pixso-vector-1_124"></div>
            <div id="1_125" class="Pixso-vector-1_125"></div>
            <div id="1_126" class="Pixso-vector-1_126"></div>
            <div id="1_127" class="Pixso-vector-1_127"></div>
            <div id="1_128" class="Pixso-vector-1_128"></div>
            <div id="1_129" class="Pixso-vector-1_129"></div>
            <div id="1_130" class="Pixso-vector-1_130"></div>
            <div id="1_131" class="Pixso-vector-1_131"></div>
            <div id="1_132" class="Pixso-vector-1_132"></div>
            <div id="1_133" class="Pixso-vector-1_133"></div>
            <p v-if="getLinkBySort(1)" id="1_134" class="Pixso-paragraph-1_134" @click="getLinkBySort(1).isActive && getLinkBySort(1).url ? openLink(getLinkBySort(1).url) : null" :style="{ cursor: getLinkBySort(1).isActive && getLinkBySort(1).url ? 'pointer' : 'default' }">
                {{ getLinkBySort(1).name }}
            </p>
            <p v-if="getLinkBySort(2)" id="1_135" class="Pixso-paragraph-1_135" @click="getLinkBySort(2).isActive && getLinkBySort(2).url ? openLink(getLinkBySort(2).url) : null" :style="{ cursor: getLinkBySort(2).isActive && getLinkBySort(2).url ? 'pointer' : 'default' }">
                {{ getLinkBySort(2).name }}
            </p>
            <p v-if="getLinkBySort(3)" id="1_136" class="Pixso-paragraph-1_136" @click="getLinkBySort(3).isActive && getLinkBySort(3).url ? openLink(getLinkBySort(3).url) : null" :style="{ cursor: getLinkBySort(3).isActive && getLinkBySort(3).url ? 'pointer' : 'default' }">
                {{ getLinkBySort(3).name }}
            </p>
            <p v-if="getLinkBySort(4)" id="1_137" class="Pixso-paragraph-1_137" @click="getLinkBySort(4).isActive && getLinkBySort(4).url ? openLink(getLinkBySort(4).url) : null" :style="{ cursor: getLinkBySort(4).isActive && getLinkBySort(4).url ? 'pointer' : 'default' }">
                {{ getLinkBySort(4).name }}
            </p>
            <p v-if="getLinkBySort(5)" id="1_138" class="Pixso-paragraph-1_138" @click="getLinkBySort(5).isActive && getLinkBySort(5).url ? openLink(getLinkBySort(5).url) : null" :style="{ cursor: getLinkBySort(5).isActive && getLinkBySort(5).url ? 'pointer' : 'default' }">
                {{ getLinkBySort(5).name }}
            </p>
            <p v-if="getLinkBySort(6)" id="1_139" class="Pixso-paragraph-1_139" @click="getLinkBySort(6).isActive && getLinkBySort(6).url ? openLink(getLinkBySort(6).url) : null" :style="{ cursor: getLinkBySort(6).isActive && getLinkBySort(6).url ? 'pointer' : 'default' }">
                {{ getLinkBySort(6).name }}
            </p>
            <p v-if="getLinkBySort(7)" id="1_140" class="Pixso-paragraph-1_140" @click="getLinkBySort(7).isActive && getLinkBySort(7).url ? openLink(getLinkBySort(7).url) : null" :style="{ cursor: getLinkBySort(7).isActive && getLinkBySort(7).url ? 'pointer' : 'default' }">
                {{ getLinkBySort(7).name }}
            </p>
            <p v-if="getLinkBySort(8)" id="1_141" class="Pixso-paragraph-1_141" @click="getLinkBySort(8).isActive && getLinkBySort(8).url ? openLink(getLinkBySort(8).url) : null" :style="{ cursor: getLinkBySort(8).isActive && getLinkBySort(8).url ? 'pointer' : 'default' }">{{ getLinkBySort(8).name }}</p>
            <p v-if="getLinkBySort(9)" id="1_142" class="Pixso-paragraph-1_142" @click="getLinkBySort(9).isActive && getLinkBySort(9).url ? openLink(getLinkBySort(9).url) : null" :style="{ cursor: getLinkBySort(9).isActive && getLinkBySort(9).url ? 'pointer' : 'default' }">
                {{ getLinkBySort(9).name }}
            </p>
            <p v-if="getLinkBySort(10)" id="1_143" class="Pixso-paragraph-1_143" @click="getLinkBySort(10).isActive && getLinkBySort(10).url ? openLink(getLinkBySort(10).url) : null" :style="{ cursor: getLinkBySort(10).isActive && getLinkBySort(10).url ? 'pointer' : 'default' }">
                {{ getLinkBySort(10).name }}
            </p>
            <p v-if="getLinkBySort(11)" id="1_144" class="Pixso-paragraph-1_144" @click="getLinkBySort(11).isActive && getLinkBySort(11).url ? openLink(getLinkBySort(11).url) : null" :style="{ cursor: getLinkBySort(11).isActive && getLinkBySort(11).url ? 'pointer' : 'default' }">
                {{ getLinkBySort(11).name }}
            </p>
            <p v-if="getLinkBySort(12)" id="1_145" class="Pixso-paragraph-1_145" @click="getLinkBySort(12).isActive && getLinkBySort(12).url ? openLink(getLinkBySort(12).url) : null" :style="{ cursor: getLinkBySort(12).isActive && getLinkBySort(12).url ? 'pointer' : 'default' }">{{ getLinkBySort(12).name }}</p>
            <div id="1_146" class="Pixso-vector-1_146"></div>
            <p id="1_149" class="Pixso-paragraph-1_149">
                {{ "即刻出征，使命必达" }}
            </p>
            <p id="1_150" class="Pixso-paragraph-1_150">
                {{ "Deploy Now, Mission Accomplished" }}
            </p>
            <div id="1_153" class="Pixso-vector-1_153" :style="{ backgroundImage: `url(${teamShowcase[currentTeamIndex].images[0]})` }"></div>
            <div id="1_158" class="Pixso-vector-1_158" :style="{ backgroundImage: `url(${teamShowcase[currentTeamIndex].images[1]})` }"></div>
            <div id="1_159" class="Pixso-vector-1_159" :style="{ backgroundImage: `url(${teamShowcase[currentTeamIndex].images[2]})` }"></div>
            <div id="1_160" class="Pixso-vector-1_160" :style="{ backgroundImage: `url(${teamShowcase[currentTeamIndex].images[3]})` }"></div>
            <!-- 队伍风采轮播圆点指示器 -->
            <div class="team-carousel-dots">
                <span
                    v-for="(item, index) in teamShowcase"
                    :key="index"
                    class="dot"
                    :class="{ active: currentTeamIndex === index }"
                    @click="switchTeamGroup(index)"
                ></span>
            </div>
            <p id="1_161" class="Pixso-paragraph-1_161">{{ "动态要闻" }}</p>
            <div id="1_162" class="Pixso-vector-1_162"></div>
            <p id="1_163" class="Pixso-paragraph-1_163">{{ "各地动态" }}</p>
            <div id="1_164" class="Pixso-vector-1_164"></div>
            <p id="1_165" class="Pixso-paragraph-1_165">{{ "相关链接" }}</p>
            <div id="1_166" class="Pixso-vector-1_166"></div>
            <p id="1_167" class="Pixso-paragraph-1_167">{{ "救援行动" }}</p>
            <div id="1_168" class="Pixso-vector-1_168"></div>
            <router-link to="/overview-info" id="1_169" class="Pixso-paragraph-1_169">{{ "概况信息" }}</router-link>
            <router-link to="/team-building" id="1_170" class="Pixso-paragraph-1_170">{{ "队伍建设" }}</router-link>
            <router-link to="/party-building" id="1_171" class="Pixso-paragraph-1_171">{{ "党建专栏" }}</router-link>
            <router-link to="/info-public" id="1_172" class="Pixso-paragraph-1_172">{{ "信息公开" }}</router-link>
            <router-link to="/dynamic-news" id="1_173" class="Pixso-paragraph-1_173">{{ "动态要闻" }}</router-link>
            <router-link to="/policy-regulations" id="1_174" class="Pixso-paragraph-1_174">{{ "政策法规" }}</router-link>
            <router-link to="/query-system" id="1_175" class="Pixso-paragraph-1_175">{{ "查询系统" }}</router-link>
            <div id="1_176" class="Pixso-vector-1_176"></div>
            <div id="32_6" class="Pixso-group-32_6">
                <p id="32_4" class="Pixso-paragraph-32_4" @click="navigateTo('/dynamic-news')" style="cursor: pointer;">{{ "MORE >" }}</p>
                <div id="32_5" class="stroke-wrapper-32_5" style="pointer-events: none;">
                    <div class="Pixso-rectangle-32_5"></div>
                    <div class="stroke-32_5"></div>
                </div>
            </div>
            <div id="34_1" class="Pixso-group-34_1">
                <p id="34_2" class="Pixso-paragraph-34_2" @click="navigateTo('/team-building/showcase')" style="cursor: pointer;">{{ "MORE >" }}</p>
                <div id="34_3" class="stroke-wrapper-34_3" style="pointer-events: none;">
                    <div class="Pixso-rectangle-34_3"></div>
                    <div class="stroke-34_3"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getBannerList, getHomeNews, getLocalDynamics, getRescueActions, getPromotionalVideos, getTeamShowcaseForHome, getFriendLinks } from '@/api/home'
import { getWebsiteConfig } from '@/api/config'
import { usePixsoScale } from '@/composables/use-pixso-scale'

const router = useRouter()
const route = useRoute()

const { scrollContainerRef, frameRef: contentContainerRef, updateScale } = usePixsoScale(1920, 4310)
// 底部背景引用
const bottomBgRef = ref<HTMLElement | null>(null)
// 底部文字容器引用
const bottomTextRef = ref<HTMLElement | null>(null)

// 导航跳转函数
const navigateTo = (path: string) => {
  router.push(path)
}

// 打开外部链接（新窗口）
const openLink = (url: string) => {
  window.open(url, '_blank')
}

// 搜索
const searchKey = ref('')

// 网站配置
const websiteConfig = ref({
  host_unit: '主办单位：四川飞豹救援',
  organizer_unit: '承办单位：四川飞豹救援新闻宣传处',
  icp_number: '蜀ICP备XXXXXXX号',
  copyright: 'Copyright®2025 sc.feibao.com All rights reserved'
})

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
    // 没匹配到，统一去搜索结果页（你可以自己改路径）
    router.push({
      path: '/search-result',
      query: { keyword: key }
    })
  }

  // 清空搜索框（可选）
  // searchKey.value = ''
}

// Banner 轮播数据
interface BannerItem {
  id: number
  image: string
  title: string
  link: string
}

const bannerList = ref<BannerItem[]>([])

// 获取轮播图数据
const fetchBanners = async () => {
  try {
    const res = await getBannerList()
    if (res.data && res.data.length > 0) {
      bannerList.value = res.data.map((item: any) => ({
        id: item.id,
        image: item.image,
        title: item.title,
        link: item.link || `/dynamic-news/${item.id}`
      }))
    }
  } catch (error) {
    console.error('获取轮播图失败:', error)
  }
}

// 获取网站配置
const fetchWebsiteConfig = async () => {
  try {
    const res = await getWebsiteConfig()
    if (res.data) {
      websiteConfig.value = {
        host_unit: res.data.host_unit || '主办单位：四川飞豹救援',
        organizer_unit: res.data.organizer_unit || '承办单位：四川飞豹救援新闻宣传处',
        icp_number: res.data.icp_number || '蜀ICP备XXXXXXX号',
        copyright: res.data.copyright || 'Copyright®2025 sc.feibao.com All rights reserved'
      }
    }
  } catch (error) {
    console.error('获取网站配置失败:', error)
  }
}

const currentBannerIndex = ref(0)

// 新闻数据
const newsList = ref<any[]>([])

// 获取新闻数据
const fetchNews = async () => {
  try {
    const res = await getHomeNews({ limit: 10 })
    if (res.data) {
      newsList.value = res.data
    }
  } catch (error) {
    console.error('获取新闻失败:', error)
  }
}

// 各地动态数据
const localDynamicsList = ref<any[]>([])

// 获取各地动态数据
const fetchLocalDynamics = async () => {
  try {
    console.log('开始获取各地动态数据...')
    const res = await getLocalDynamics({ page: 1, pageSize: 4 })
    console.log('各地动态API响应:', res)
    if (res.data) {
      localDynamicsList.value = res.data
      console.log('各地动态数据已设置:', localDynamicsList.value)
    } else {
      console.warn('各地动态API返回数据为空')
    }
  } catch (error) {
    console.error('获取各地动态失败:', error)
  }
}

// 救援行动数据
const rescueActionsList = ref<any[]>([])

// 获取救援行动数据
const fetchRescueActions = async () => {
  try {
    console.log('开始获取救援行动数据...')
    const res = await getRescueActions({ limit: 4 })
    console.log('救援行动API响应:', res)
    if (res.data) {
      rescueActionsList.value = res.data
      console.log('救援行动数据已设置:', rescueActionsList.value)
    } else {
      console.warn('救援行动API返回数据为空')
    }
  } catch (error) {
    console.error('获取救援行动失败:', error)
  }
}

// 友情链接数据
const friendLinks = ref<any[]>([])

// 获取友情链接数据
const fetchFriendLinks = async () => {
  try {
    const res = await getFriendLinks()
    if (res.data) {
      friendLinks.value = res.data
    }
  } catch (error) {
    console.error('获取友情链接失败:', error)
  }
}

// 根据排序获取友情链接
const getLinkBySort = (sort: number) => {
  return friendLinks.value.find(link => link.sort === sort)
}

let bannerCarouselTimer: number | null = null

// 切换到下一张 Banner
const nextBanner = () => {
  currentBannerIndex.value = (currentBannerIndex.value + 1) % bannerList.value.length
  resetBannerCarousel()
}

// 切换到上一张 Banner
const prevBanner = () => {
  currentBannerIndex.value = (currentBannerIndex.value - 1 + bannerList.value.length) % bannerList.value.length
  resetBannerCarousel()
}

// 切换到指定 Banner
const switchBanner = (index: number) => {
  currentBannerIndex.value = index
  resetBannerCarousel()
}

// 重置轮播定时器
const resetBannerCarousel = () => {
  if (bannerCarouselTimer) {
    clearInterval(bannerCarouselTimer)
  }
  startBannerCarousel()
}

// 开始 Banner 自动轮播
const startBannerCarousel = () => {
  if (bannerList.value.length === 0) return
  bannerCarouselTimer = setInterval(() => {
    currentBannerIndex.value = (currentBannerIndex.value + 1) % bannerList.value.length
  }, 5000)
}

// 跳转到新闻详情页
const navigateToNews = (link: string) => {
  router.push(link)
}

// 队伍风采轮播数据 - 初始化为默认图片，避免加载时出错
const teamShowcase = ref<{ images: string[] }[]>([
  {
    images: [
      new URL('@/assets/images/Vector_1_1363.png', import.meta.url).href,
      new URL('@/assets/images/Vector_1_1368.png', import.meta.url).href,
      new URL('@/assets/images/Vector_1_1365.png', import.meta.url).href,
      new URL('@/assets/images/Vector_1_1366.png', import.meta.url).href
    ]
  },
  {
    images: [
      new URL('@/assets/images/Vector_1_1533.png', import.meta.url).href,
      new URL('@/assets/images/Vector_1_1538.png', import.meta.url).href,
      new URL('@/assets/images/Vector_1_1535.png', import.meta.url).href,
      new URL('@/assets/images/Vector_1_1536.png', import.meta.url).href
    ]
  },
  {
    images: [
      new URL('@/assets/images/Vector_1_1539.png', import.meta.url).href,
      new URL('@/assets/images/Vector_1_1544.png', import.meta.url).href,
      new URL('@/assets/images/Vector_1_1541.png', import.meta.url).href,
      new URL('@/assets/images/Vector_1_1542.png', import.meta.url).href
    ]
  },
  {
    images: [
      new URL('@/assets/images/Vector_1_1149.png', import.meta.url).href,
      new URL('@/assets/images/Vector_1_1154.png', import.meta.url).href,
      new URL('@/assets/images/Vector_1_1151.png', import.meta.url).href,
      new URL('@/assets/images/Vector_1_1152.png', import.meta.url).href
    ]
  }
])

// 获取队伍风采图片
const fetchTeamShowcase = async () => {
  try {
    const response = await getTeamShowcaseForHome({ limit: 16 })

    if (response.data && response.data.length > 0) {
      // 将16条数据分成4组，每组4张图片
      const groups = []
      for (let i = 0; i < response.data.length; i += 4) {
        groups.push({
          images: response.data.slice(i, i + 4).map(item => item.image)
        })
      }
      teamShowcase.value = groups
    }

    // 如果API没有返回数据，使用默认图片作为后备
    if (teamShowcase.value.length === 0) {
      teamShowcase.value = [
        {
          images: [
            new URL('@/assets/images/Vector_1_1363.png', import.meta.url).href,
            new URL('@/assets/images/Vector_1_1368.png', import.meta.url).href,
            new URL('@/assets/images/Vector_1_1365.png', import.meta.url).href,
            new URL('@/assets/images/Vector_1_1366.png', import.meta.url).href
          ]
        },
        {
          images: [
            new URL('@/assets/images/Vector_1_1533.png', import.meta.url).href,
            new URL('@/assets/images/Vector_1_1538.png', import.meta.url).href,
            new URL('@/assets/images/Vector_1_1535.png', import.meta.url).href,
            new URL('@/assets/images/Vector_1_1536.png', import.meta.url).href
          ]
        },
        {
          images: [
            new URL('@/assets/images/Vector_1_1539.png', import.meta.url).href,
            new URL('@/assets/images/Vector_1_1544.png', import.meta.url).href,
            new URL('@/assets/images/Vector_1_1541.png', import.meta.url).href,
            new URL('@/assets/images/Vector_1_1542.png', import.meta.url).href
          ]
        },
        {
          images: [
            new URL('@/assets/images/Vector_1_1149.png', import.meta.url).href,
            new URL('@/assets/images/Vector_1_1154.png', import.meta.url).href,
            new URL('@/assets/images/Vector_1_1151.png', import.meta.url).href,
            new URL('@/assets/images/Vector_1_1152.png', import.meta.url).href
          ]
        }
      ]
    }
  } catch (error) {
    console.error('获取队伍风采图片失败:', error)
    // 使用默认图片作为后备
    teamShowcase.value = [
      {
        images: [
          new URL('@/assets/images/Vector_1_1363.png', import.meta.url).href,
          new URL('@/assets/images/Vector_1_1368.png', import.meta.url).href,
          new URL('@/assets/images/Vector_1_1365.png', import.meta.url).href,
          new URL('@/assets/images/Vector_1_1366.png', import.meta.url).href
        ]
      },
      {
        images: [
          new URL('@/assets/images/Vector_1_1533.png', import.meta.url).href,
          new URL('@/assets/images/Vector_1_1538.png', import.meta.url).href,
          new URL('@/assets/images/Vector_1_1535.png', import.meta.url).href,
          new URL('@/assets/images/Vector_1_1536.png', import.meta.url).href
        ]
      },
      {
        images: [
          new URL('@/assets/images/Vector_1_1539.png', import.meta.url).href,
          new URL('@/assets/images/Vector_1_1544.png', import.meta.url).href,
          new URL('@/assets/images/Vector_1_1541.png', import.meta.url).href,
          new URL('@/assets/images/Vector_1_1542.png', import.meta.url).href
        ]
      },
      {
        images: [
          new URL('@/assets/images/Vector_1_1149.png', import.meta.url).href,
          new URL('@/assets/images/Vector_1_1154.png', import.meta.url).href,
          new URL('@/assets/images/Vector_1_1151.png', import.meta.url).href,
          new URL('@/assets/images/Vector_1_1152.png', import.meta.url).href
        ]
      }
    ]
  }
}

const currentTeamIndex = ref(0)
let teamCarouselTimer: number | null = null

const switchTeamGroup = (index: number) => {
  currentTeamIndex.value = index
  if (teamCarouselTimer) {
    clearInterval(teamCarouselTimer)
  }
  startTeamCarousel()
}

const startTeamCarousel = () => {
  teamCarouselTimer = setInterval(() => {
    currentTeamIndex.value = (currentTeamIndex.value + 1) % teamShowcase.value.length
  }, 5000)
}

// 宣传视频模态框相关
const showVideoModal = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
const promotionalVideos = ref<any[]>([])
const videoSrc = computed(() => {
  // 使用后台管理的第一个视频，如果没有则使用默认视频
  return promotionalVideos.value.length > 0
    ? promotionalVideos.value[0].url
    : '/videos/四川甘孜泸定县6.8级地震-四川飞豹救援.mp4'
})

// 获取宣传视频列表
const fetchPromotionalVideos = async () => {
  try {
    const response = await getPromotionalVideos({ limit: 10 })
    promotionalVideos.value = response.data.items || []
  } catch (error) {
    console.error('获取宣传视频失败:', error)
  }
}

// 打开视频模态框
const openVideoModal = () => {
  // 检查是否有可用的视频
  if (promotionalVideos.value.length === 0) {
    ElMessage.warning('无视频宣传')
    return
  }

  showVideoModal.value = true
  // 等待 DOM 更新后自动播放视频
  setTimeout(() => {
    if (videoRef.value) {
      videoRef.value.play()
    }
  }, 100)
}

// 关闭视频模态框
const closeVideoModal = () => {
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.currentTime = 0
  }
  showVideoModal.value = false
}

// 视频错误处理
const handleVideoError = (e: Event) => {
  console.error('视频加载失败:', e)
}

// 初始化页面布局和底部元素位置
const initializePageLayout = async () => {
  await nextTick()

  // 动态设置底部元素位置
  if (bottomBgRef.value && bottomTextRef.value) {
    const containerHeight = 4310
    const bgHeight = 280
    const textHeight = 170
    const textBottomMargin = 56

    bottomBgRef.value.style.top = `${containerHeight - bgHeight}px`
    bottomBgRef.value.style.position = 'absolute'
    bottomBgRef.value.style.height = `${bgHeight}px`

    bottomTextRef.value.style.top = `${containerHeight - textHeight - textBottomMargin}px`
    bottomTextRef.value.style.position = 'absolute'
    bottomTextRef.value.style.height = `${textHeight}px`
  }

  setTimeout(() => {
    window.scrollTo(0, 0)
    if (scrollContainerRef.value) {
      scrollContainerRef.value.scrollTop = 0
    }
  }, 50)
}

// 监听路由变化，确保每次导航到首页时都重新初始化布局
watch(() => route.path, async (newPath) => {
  if (newPath === '/') {
    await initializePageLayout()
  }
}, { immediate: false })

onMounted(async () => {
  await initializePageLayout()
  await fetchBanners() // 获取轮播图数据
  await fetchNews() // 获取新闻数据
  await fetchLocalDynamics() // 获取各地动态数据
  await fetchRescueActions() // 获取救援行动数据
  await fetchPromotionalVideos() // 获取宣传视频数据
  await fetchFriendLinks() // 获取友情链接数据
  await fetchWebsiteConfig() // 获取网站配置
  fetchTeamShowcase() // 获取队伍风采图片
  startBannerCarousel() // 启动 Banner 轮播
  startTeamCarousel()
})

onUnmounted(() => {
  if (bannerCarouselTimer) {
    clearInterval(bannerCarouselTimer)
  }
  if (teamCarouselTimer) {
    clearInterval(teamCarouselTimer)
  }
})
</script>
<style>
.scroll-container-1_2 {
    width: 100%;
    overflow: hidden;
    position: relative;
}
.Pixso-frame-1_2 {
    width: 1920px;
    height: 4310px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
    background-color: rgba(0, 0, 0, 1);
}
.Pixso-vector-1_3 {
    width: 100%;
    height: 87.37%;
    background-image: url(@/assets/images/Vector_1_3.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 6.13%;
    bottom: 6.5%;
}
.Pixso-vector-1_4 {
    width: 88.28%;
    height: 14.68%;
    background-image: url(@/assets/images/Vector_1_4.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 5.83%;
    top: 6.13%;
    bottom: 79.19%;
}
.Pixso-vector-1_7 {
    width: 100%;
    height: 4.5%;
    background-image: url(@/assets/images/Vector_1_7.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 95.5%;
}
.Pixso-vector-1_10 {
    width: 6.72%;
    height: 2.99%;
    background-image: url(@/assets/images/Vector_1_10.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 0.77%;
    bottom: 96.24%;
}
.Pixso-paragraph-1_13 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 1.23%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 1.35%;
    bottom: 97.42%;
}
.Pixso-paragraph-1_14 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 0.56%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 2.78%;
    bottom: 96.66%;
}
.Pixso-vector-1_17 {
    width: 1.86%;
    height: 0.83%;
    background-image: url(@/assets/images/Vector_1_17.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 89.48%;
    right: 8.66%;
    top: 2.41%;
    bottom: 96.76%;
}
.Pixso-group-33_2 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1467px;
    top: 90px;
}
.Pixso-vector-1_15 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_1_15.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-1_16 {
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
.Pixso-vector-1_18 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_1_18.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.21%;
    right: 7.4%;
    top: 50%;
    transform: translateY(calc(-50% + 0.5px));
}
.Pixso-vector-1_24 {
    width: 100%;
    height: 1.63%;
    background-image: url(@/assets/images/Vector_1_24.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 4.5%;
    bottom: 93.87%;
}
.Pixso-vector-1_25 {
    width: 7.81%;
    height: 1.63%;
    background-image: url(@/assets/images/Vector_1_25.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 86.3%;
    top: 4.5%;
    bottom: 93.87%;
}
.Pixso-vector-1_31 {
    width: 88.28%;
    height: 2.62%;
    background-image: url(@/assets/images/Vector_1_31.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 5.83%;
    top: 20.81%;
    bottom: 76.57%;
}
/* 轮播圆点指示器：20x20 */
.Pixso-vector-1_32 {
    width: 92px; /* 4 个 20px 圆点 + 间距 */
    height: 20px;
    background-image: url(@/assets/images/Vector_1_32.png);
    background-size: 92px 20px;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 90.83%;
    top: 20.81%;
    bottom: 77.73%;
}
.Pixso-paragraph-1_35 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 13.14%;
    right: 52.55%;
    top: 21.9%;
    bottom: 77.63%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_36 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(39, 39, 39, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 7.47%;
    right: 59.71%;
    top: 34.48%;
    bottom: 65.06%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_37 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(39, 39, 39, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 7.99%;
    top: 26.03%;
    bottom: 73.5%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_38 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(39, 39, 39, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 7.37%;
    right: 59.82%;
    top: 43.83%;
    bottom: 55.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_39 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(39, 39, 39, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 7.99%;
    top: 43.83%;
    bottom: 55.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_40 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(39, 39, 39, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 7.99%;
    top: 29.93%;
    bottom: 69.61%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_41 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(39, 39, 39, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 7.37%;
    right: 59.82%;
    top: 47.73%;
    bottom: 51.81%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_42 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(39, 39, 39, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 7.99%;
    top: 47.73%;
    bottom: 51.81%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_43 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(39, 39, 39, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 7.99%;
    top: 33.83%;
    bottom: 65.71%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_44 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(39, 39, 39, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 7.37%;
    right: 59.82%;
    top: 51.62%;
    bottom: 47.91%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_45 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(39, 39, 39, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 7.99%;
    top: 51.62%;
    bottom: 47.91%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-text-1_46 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: Regular;
    line-height: 18px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 13.93%;
    right: 51.9%;
    top: 35.8%;
    bottom: 63.36%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_46_0 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_46_0_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_46_1 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_46_1_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_47 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: Regular;
    line-height: 18px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 65.6%;
    right: 9.45%;
    top: 27.33%;
    bottom: 71.83%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_47_0 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_47_0_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_47_1 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_47_1_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_48 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: Regular;
    line-height: 18px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 13.78%;
    right: 61.28%;
    top: 45.13%;
    bottom: 54.04%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_48_0 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_48_0_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_48_1 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_48_1_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_49 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 18px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 37.86%;
    right: 59.01%;
    top: 50%;
    transform: translateY(calc(-50% + -340px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-32_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 18px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 90.89%;
    right: 5.99%;
    top: 41.91%;
    bottom: 57.67%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-text-1_51 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: Regular;
    line-height: 18px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 65.6%;
    right: 9.45%;
    top: 45.13%;
    bottom: 54.04%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_51_0 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_51_0_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_51_1 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_51_1_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_52 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: Regular;
    line-height: 18px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 65.6%;
    right: 9.45%;
    top: 49%;
    bottom: 50.16%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_52_0 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_52_0_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_52_1 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_52_1_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_53 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: Regular;
    line-height: 18px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 65.6%;
    right: 9.45%;
    top: 31.23%;
    bottom: 67.94%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_53_0 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_53_0_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_53_1 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_53_1_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_54 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: Regular;
    line-height: 18px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 13.78%;
    right: 61.28%;
    top: 49.03%;
    bottom: 50.14%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_54_0 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_54_0_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_54_1 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_54_1_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_55 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: Regular;
    line-height: 18px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 65.6%;
    right: 9.45%;
    top: 35.13%;
    bottom: 64.04%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_55_0 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_55_0_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_55_1 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_55_1_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_56 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: Regular;
    line-height: 18px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 13.78%;
    right: 61.28%;
    top: 52.92%;
    bottom: 46.24%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_56_0 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_56_0_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_56_1 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_56_1_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-text-1_57 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: Regular;
    line-height: 18px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 65.6%;
    right: 9.45%;
    top: 52.92%;
    bottom: 46.24%;
    white-space: nowrap;
    flex-grow: 0;
}
.Pixso-paragraph-1_57_0 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_57_0_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-paragraph-1_57_1 {
    line-height: 18px;
    position: relative;
    flex-shrink: 0;
}
.Pixso-span-1_57_1_1 {
    font-size: 18px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    color: rgba(132, 132, 132, 1);
    position: relative;
    flex-shrink: 0;
}
.Pixso-vector-1_58 {
    width: 0.81%;
    height: 0.63%;
    background-image: url(@/assets/images/Vector_1_58.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.66%;
    right: 90.03%;
    top: 21.83%;
    bottom: 77.54%;
}
.Pixso-vector-1_59 {
    width: 0.8%;
    height: 0.63%;
    background-image: url(@/assets/images/Boolean_operation_1_59.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.50%;
    right: 87.46%;
    top: 21.83%;
    bottom: 77.54%;
}
.Pixso-vector-1_61 {
    width: 1.3%;
    height: 0.58%;
    background-image: url(@/assets/images/Vector_1_61.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 83.75%;
    right: 14.95%;
    top: 21.83%;
    bottom: 77.59%;
}
.Pixso-vector-1_62 {
    width: 1.31%;
    height: 0.58%;
    background-image: url(@/assets/images/Vector_1_62.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 86.09%;
    right: 12.6%;
    top: 21.83%;
    bottom: 77.59%;
}
.Pixso-vector-1_63 {
    width: 1.3%;
    height: 0.58%;
    background-image: url(@/assets/images/Vector_1_63.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 88.44%;
    right: 10.26%;
    top: 21.83%;
    bottom: 77.59%;
}
.Pixso-vector-1_64 {
    width: 1.3%;
    height: 0.58%;
    background-image: url(@/assets/images/Vector_1_64.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 90.78%;
    right: 7.92%;
    top: 21.83%;
    bottom: 77.59%;
}
.Pixso-paragraph-1_65 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 39.14%;
    top: 27.94%;
    bottom: 71.6%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_66 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 7.37%;
    right: 90.96%;
    top: 45.73%;
    bottom: 53.81%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_67 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 39.14%;
    top: 45.73%;
    bottom: 53.81%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_68 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 39.14%;
    top: 31.83%;
    bottom: 67.7%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_69 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 7.37%;
    right: 90.96%;
    top: 49.63%;
    bottom: 49.91%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_70 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 39.14%;
    top: 49.63%;
    bottom: 49.91%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_71 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 39.14%;
    top: 35.73%;
    bottom: 63.81%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_72 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 7.37%;
    right: 90.96%;
    top: 53.53%;
    bottom: 46.01%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_73 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 39.14%;
    top: 53.53%;
    bottom: 46.01%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_74 {
    width: 3.02%;
    height: 1.18%;
    background-image: url(@/assets/images/Vector_1_74.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.55%;
    right: 89.43%;
    top: 35.64%;
    bottom: 63.18%;
}
.Pixso-paragraph-1_75 {
    font-size: 20px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 7.63%;
    right: 90.7%;
    top: 36.36%;
    bottom: 63.18%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_76 {
    font-size: 25px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(44, 44, 44, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 7.63%;
    right: 90.18%;
    top: 35.64%;
    bottom: 63.78%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_77 {
    font-size: 25px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(44, 44, 44, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 38.62%;
    top: 27.22%;
    bottom: 72.2%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_78 {
    font-size: 25px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(44, 44, 44, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 7.37%;
    right: 90.44%;
    top: 45.01%;
    bottom: 54.41%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_79 {
    font-size: 25px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(44, 44, 44, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 38.62%;
    top: 45.01%;
    bottom: 54.41%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_80 {
    font-size: 25px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(44, 44, 44, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 38.62%;
    top: 31.11%;
    bottom: 68.31%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_81 {
    font-size: 25px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(44, 44, 44, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 7.37%;
    right: 90.44%;
    top: 48.91%;
    bottom: 50.51%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_82 {
    font-size: 25px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(44, 44, 44, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 38.62%;
    top: 48.91%;
    bottom: 50.51%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_83 {
    font-size: 25px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(44, 44, 44, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 38.62%;
    top: 35.01%;
    bottom: 64.41%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_84 {
    font-size: 25px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(44, 44, 44, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 7.37%;
    right: 90.44%;
    top: 52.81%;
    bottom: 46.61%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_85 {
    font-size: 25px;
    font-family: "DINCondensedC-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(44, 44, 44, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.19%;
    right: 38.62%;
    top: 52.81%;
    bottom: 46.61%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_86 {
    width: 46.04%;
    height: 7.8%;
    background-image: url(@/assets/images/Vector_1_86.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.04%;
    right: 47.92%;
    top: 25.8%;
    bottom: 66.4%;
}
.Pixso-vector-1_89 {
    width: 0.05%;
    height: 1.02%;
    background-image: url(@/assets/images/Vector_1_89.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 11.88%;
    right: 88.07%;
    top: 35.77%;
    bottom: 63.21%;
}
.Pixso-vector-1_90 {
    width: 0.05%;
    height: 1.02%;
    background-image: url(@/assets/images/Vector_1_90.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 63.57%;
    right: 36.38%;
    top: 27.3%;
    bottom: 71.68%;
}
.Pixso-vector-1_91 {
    width: 0.06%;
    height: 1.02%;
    background-image: url(@/assets/images/Vector_1_91.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 11.74%;
    right: 88.2%;
    top: 45.09%;
    bottom: 53.89%;
}
.Pixso-vector-1_92 {
    width: 0.05%;
    height: 1.02%;
    background-image: url(@/assets/images/Vector_1_92.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 63.57%;
    right: 36.38%;
    top: 45.09%;
    bottom: 53.89%;
}
.Pixso-vector-1_93 {
    width: 0.05%;
    height: 1.03%;
    background-image: url(@/assets/images/Vector_1_93.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 63.57%;
    right: 36.38%;
    top: 31.19%;
    bottom: 67.78%;
}
.Pixso-vector-1_94 {
    width: 0.06%;
    height: 1.02%;
    background-image: url(@/assets/images/Vector_1_94.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 11.74%;
    right: 88.2%;
    top: 48.99%;
    bottom: 49.99%;
}
.Pixso-vector-1_95 {
    width: 0.05%;
    height: 1.02%;
    background-image: url(@/assets/images/Vector_1_95.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 63.57%;
    right: 36.38%;
    top: 48.99%;
    bottom: 49.99%;
}
.Pixso-vector-1_96 {
    width: 0.05%;
    height: 1.02%;
    background-image: url(@/assets/images/Vector_1_96.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 63.57%;
    right: 36.38%;
    top: 35.09%;
    bottom: 63.89%;
}
.Pixso-vector-1_97 {
    width: 0.06%;
    height: 1.02%;
    background-image: url(@/assets/images/Vector_1_97.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 11.74%;
    right: 88.2%;
    top: 52.89%;
    bottom: 46.09%;
}
.Pixso-vector-1_98 {
    width: 0.05%;
    height: 1.02%;
    background-image: url(@/assets/images/Vector_1_98.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 63.57%;
    right: 36.38%;
    top: 52.89%;
    bottom: 46.09%;
}
.Pixso-vector-1_102 {
    width: 35.1%;
    height: 0.02%;
    background-image: url(@/assets/images/Vector_1_102.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 59.01%;
    right: 5.89%;
    top: 29.1%;
    bottom: 70.88%;
}
.Pixso-vector-1_103 {
    width: 35.31%;
    height: 0.02%;
    background-image: url(@/assets/images/Vector_1_103.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.98%;
    right: 57.71%;
    top: 46.89%;
    bottom: 53.09%;
}
.Pixso-vector-1_104 {
    width: 35.1%;
    height: 0.02%;
    background-image: url(@/assets/images/Vector_1_104.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 59.01%;
    right: 5.89%;
    top: 46.89%;
    bottom: 53.09%;
}
.Pixso-vector-1_105 {
    width: 35.1%;
    height: 0.03%;
    background-image: url(@/assets/images/Vector_1_105.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 59.01%;
    right: 5.89%;
    top: 32.99%;
    bottom: 66.98%;
}
.Pixso-vector-1_106 {
    width: 35.31%;
    height: 0.02%;
    background-image: url(@/assets/images/Vector_1_106.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.98%;
    right: 57.71%;
    top: 50.79%;
    bottom: 49.19%;
}
.Pixso-vector-1_107 {
    width: 35.1%;
    height: 0.02%;
    background-image: url(@/assets/images/Vector_1_107.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 59.01%;
    right: 5.89%;
    top: 50.79%;
    bottom: 49.19%;
}
.Pixso-vector-1_110 {
    width: 100%;
    height: 10.72%;
    background-image: url(@/assets/images/Vector_1_110.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 55.68%;
    bottom: 33.6%;
}
.Pixso-vector-1_113 {
    width: 1920px;
    height: 280px;
    background-image: url(@/assets/images/Vector_1_113.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(calc(-50% + 0px));
}
.Pixso-vector-1_116 {
    width: 6.24%;
    height: 2.78%;
    background-image: url(@/assets/images/Vector_1_116.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 46.88%;
    right: 46.88%;
    top: 58.82%;
    bottom: 38.4%;
}
.Pixso-paragraph-1_117 {
    font-size: 30px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 30px;
    color: rgba(255, 255, 255, 1);
    width: 18.86%;
    height: 0.7%;
    position: absolute;
    left: 40.57%;
    right: 40.57%;
    top: 62.53%;
    bottom: 36.77%;
}
.Pixso-group-32_8 {
    width: 460px;
    height: 170px;
    position: absolute;
    left: 50%;
    bottom: 65px;
    transform: translateX(calc(-50% + 0px));
    user-select: text !important;
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
    z-index: 100;
}
.Pixso-paragraph-1_118 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 0%;
    bottom: 88.24%;
    transform: translateX(calc(-50% + 0.5px));
    white-space: pre;
    flex-grow: 0;
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
}
.Pixso-paragraph-1_119 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 29.41%;
    bottom: 58.82%;
    transform: translateX(calc(-50% + 0.5px));
    white-space: pre;
    flex-grow: 0;
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
}
.Pixso-paragraph-1_120 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 88.24%;
    bottom: 0%;
    transform: translateX(calc(-50% + 0px));
    white-space: pre;
    flex-grow: 0;
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
}
.Pixso-paragraph-1_121 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 58.82%;
    bottom: 29.41%;
    transform: translateX(calc(-50% + 0px));
    white-space: pre;
    flex-grow: 0;
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
}
.Pixso-vector-1_122 {
    width: 12.86%;
    height: 2.23%;
    background-image: url(@/assets/images/Vector_1_122.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 20.26%;
    right: 66.88%;
    top: 89.59%;
    bottom: 8.18%;
}
.Pixso-vector-1_123 {
    width: 12.86%;
    height: 2.23%;
    background-image: url(@/assets/images/Vector_1_123.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 20.26%;
    right: 66.88%;
    top: 86.55%;
    bottom: 11.22%;
}
.Pixso-vector-1_124 {
    width: 12.86%;
    height: 2.23%;
    background-image: url(@/assets/images/Vector_1_124.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.99%;
    right: 81.15%;
    top: 89.59%;
    bottom: 8.18%;
}
.Pixso-vector-1_125 {
    width: 12.86%;
    height: 2.23%;
    background-image: url(@/assets/images/Vector_1_125.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 81.25%;
    top: 86.55%;
    bottom: 11.22%;
}
.Pixso-vector-1_126 {
    width: 12.87%;
    height: 2.23%;
    background-image: url(@/assets/images/Vector_1_126.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 34.58%;
    right: 52.55%;
    top: 89.59%;
    bottom: 8.18%;
}
.Pixso-vector-1_127 {
    width: 12.87%;
    height: 2.23%;
    background-image: url(@/assets/images/Vector_1_127.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 34.58%;
    right: 52.55%;
    top: 86.55%;
    bottom: 11.22%;
}
.Pixso-vector-1_128 {
    width: 12.86%;
    height: 2.23%;
    background-image: url(@/assets/images/Vector_1_128.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 48.96%;
    right: 38.18%;
    top: 89.59%;
    bottom: 8.18%;
}
.Pixso-vector-1_129 {
    width: 12.86%;
    height: 2.23%;
    background-image: url(@/assets/images/Vector_1_129.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 48.96%;
    right: 38.18%;
    top: 86.55%;
    bottom: 11.22%;
}
.Pixso-vector-1_130 {
    width: 247px;
    height: 2.22%;
    background-image: url(@/assets/images/Vector_1_130.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 89.61%;
    bottom: 8.17%;
    transform: translateX(calc(-50% + 378.5px));
}
.Pixso-vector-1_131 {
    width: 247px;
    height: 2.22%;
    background-image: url(@/assets/images/Vector_1_131.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 86.57%;
    bottom: 11.21%;
    transform: translateX(calc(-50% + 378.5px));
}
.Pixso-vector-1_132 {
    width: 315px;
    height: 2.22%;
    background-image: url(@/assets/images/Vector_1_132.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 89.61%;
    bottom: 8.17%;
    transform: translateX(calc(-50% + 689.5px));
}
.Pixso-vector-1_133 {
    width: 315px;
    height: 2.22%;
    background-image: url(@/assets/images/Vector_1_133.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 86.57%;
    bottom: 11.21%;
    transform: translateX(calc(-50% + 689.5px));
}
.Pixso-paragraph-1_134 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(38, 38, 38, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 35.83%;
    right: 53.91%;
    top: 90.45%;
    bottom: 9.08%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_135 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(38, 38, 38, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50.94%;
    right: 39.79%;
    top: 90.45%;
    bottom: 9.08%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_136 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(38, 38, 38, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 90.46%;
    bottom: 9.07%;
    transform: translateX(calc(-50% + 378.5px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_137 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(38, 38, 38, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 90.46%;
    bottom: 9.07%;
    transform: translateX(calc(-50% + 689.5px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_138 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(38, 38, 38, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 22.4%;
    right: 68.33%;
    top: 87.41%;
    bottom: 12.12%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_139 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(38, 38, 38, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 23.44%;
    right: 69.38%;
    top: 90.45%;
    bottom: 9.08%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_140 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(38, 38, 38, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 8.28%;
    right: 83.49%;
    top: 90.45%;
    bottom: 9.08%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_141 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(38, 38, 38, 1);
    width: 5.26%;
    height: 0.47%;
    position: absolute;
    left: 9.69%;
    right: 85.05%;
    top: 87.41%;
    bottom: 12.12%;
}
.Pixso-paragraph-1_142 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(38, 38, 38, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 34.79%;
    right: 52.86%;
    top: 87.41%;
    bottom: 12.12%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_143 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(38, 38, 38, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 51.72%;
    right: 41.09%;
    top: 87.41%;
    bottom: 12.12%;
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_144 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(38, 38, 38, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 87.42%;
    bottom: 12.11%;
    transform: translateX(calc(-50% + 378px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-1_145 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(38, 38, 38, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 87.45%;
    bottom: 12.09%;
    transform: translateX(calc(-50% + 689.5px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-1_146 {
    width: 88.22%;
    height: 15.17%;
    background-image: url(@/assets/images/Vector_1_146.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 5.89%;
    right: 5.89%;
    top: 67.8%;
    bottom: 17.03%;
}
.Pixso-paragraph-1_149 {
    font-size: 40px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 40px;
    color: rgba(228, 90, 63, 1);
    width: 18.85%;
    height: 0.93%;
    position: absolute;
    left: 12.4%;
    right: 68.75%;
    top: 72.41%;
    bottom: 26.66%;
}
.Pixso-paragraph-1_150 {
    font-size: 35px;
    font-family: "FZHei-B01S-Regular";
    font-weight: 400;
    line-height: 35px;
    color: rgba(228, 90, 63, 1);
    width: 31.36%;
    height: 0.81%;
    position: absolute;
    left: 12.29%;
    right: 56.35%;
    top: 73.85%;
    bottom: 25.34%;
}
.Pixso-vector-1_153 {
    width: 16.14%;
    height: 5.41%;
    background-image: url(@/assets/images/Vector_1_153.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 57.14%;
    right: 26.72%;
    top: 69%;
    bottom: 25.59%;
}
.Pixso-vector-1_154 {
    width: 0.93%;
    height: 0.41%;
    background-image: url(@/assets/images/Vector_1_154.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 71.88%;
    right: 27.19%;
    top: 81.35%;
    bottom: 18.24%;
}
.Pixso-vector-1_155 {
    width: 0.94%;
    height: 0.41%;
    background-image: url(@/assets/images/Vector_1_155.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 73.54%;
    right: 25.52%;
    top: 81.35%;
    bottom: 18.24%;
}
.Pixso-vector-1_156 {
    width: 0.94%;
    height: 0.41%;
    background-image: url(@/assets/images/Vector_1_156.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75.21%;
    right: 23.85%;
    top: 81.35%;
    bottom: 18.24%;
}
.Pixso-vector-1_157 {
    width: 0.93%;
    height: 0.41%;
    background-image: url(@/assets/images/Vector_1_157.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 76.88%;
    right: 22.19%;
    top: 81.35%;
    bottom: 18.24%;
}
.Pixso-vector-1_158 {
    width: 16.15%;
    height: 5.41%;
    background-image: url(@/assets/images/Vector_1_158.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 74.84%;
    right: 9.01%;
    top: 74.87%;
    bottom: 19.72%;
}
.Pixso-vector-1_159 {
    width: 16.14%;
    height: 5.41%;
    background-image: url(@/assets/images/Vector_1_159.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 57.14%;
    right: 26.72%;
    top: 74.87%;
    bottom: 19.72%;
}
.Pixso-vector-1_160 {
    width: 16.17%;
    height: 5.41%;
    background-image: url(@/assets/images/Vector_1_160.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 74.84%;
    right: 8.99%;
    top: 69%;
    bottom: 25.59%;
}
.Pixso-paragraph-1_161 {
    font-size: 25px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 28px;
    color: rgba(0, 92, 190, 1);
    width: 5.94%;
    height: 0.65%;
    position: absolute;
    left: 6.98%;
    right: 87.08%;
    top: 24.37%;
    bottom: 74.98%;
}
.Pixso-paragraph-1_161::before {
    content: '';
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 28px;
    background-color: rgba(0, 92, 190, 1);
}
.Pixso-vector-1_162 {
    width: 0.5%;
    height: 0.74%;
    background-image: url(@/assets/images/Vector_1_162.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.28%;
    right: 93.22%;
    top: 24.34%;
    bottom: 74.92%;
}
.Pixso-paragraph-1_163 {
    font-size: 25px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 28px;
    color: rgba(0, 92, 190, 1);
    width: 5.93%;
    height: 28px;
    position: absolute;
    left: 7.4%;
    right: 86.67%;
    top: 50%;
    transform: translateY(calc(-50% + -340px));
}
.Pixso-paragraph-1_163::before {
    content: '';
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 28px;
    background-color: rgba(0, 92, 190, 1);
}
.Pixso-vector-1_164 {
    width: 0.5%;
    height: 0.74%;
    background-image: url(@/assets/images/Vector_1_164.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.69%;
    right: 92.81%;
    top: 41.74%;
    bottom: 57.52%;
}
.Pixso-paragraph-1_165 {
    font-size: 25px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 28px;
    color: rgba(0, 92, 190, 1);
    width: 5.93%;
    height: 0.65%;
    position: absolute;
    left: 7.4%;
    right: 86.67%;
    top: 84.94%;
    bottom: 14.41%;
}
.Pixso-paragraph-1_165::before {
    content: '';
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 28px;
    background-color: rgba(0, 92, 190, 1);
}
.Pixso-vector-1_166 {
    width: 0.5%;
    height: 0.74%;
    background-image: url(@/assets/images/Vector_1_166.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.69%;
    right: 92.81%;
    top: 84.91%;
    bottom: 14.35%;
}
.Pixso-paragraph-1_167 {
    font-size: 25px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 28px;
    color: rgba(0, 92, 190, 1);
    width: 5.94%;
    height: 0.65%;
    position: absolute;
    left: 60.13%;
    right: 33.93%;
    top: 41.77%;
    bottom: 57.58%;
}
.Pixso-paragraph-1_167::before {
    content: '';
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 28px;
    background-color: rgba(0, 92, 190, 1);
}
.Pixso-vector-1_168 {
    width: 0.5%;
    height: 0.74%;
    background-image: url(@/assets/images/Vector_1_168.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 59.43%;
    right: 40.07%;
    top: 41.74%;
    bottom: 57.52%;
}
.Pixso-paragraph-1_169 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 16.51%;
    right: 79.32%;
    top: 5.03%;
    bottom: 94.39%;
    white-space: pre;
    flex-grow: 0;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.3s;
}

.Pixso-paragraph-1_169:hover {
    opacity: 0.8;
}
.Pixso-paragraph-1_170 {
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
    top: 5.03%;
    bottom: 94.39%;
    white-space: pre;
    flex-grow: 0;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.3s;
}

.Pixso-paragraph-1_170:hover {
    opacity: 0.8;
}
.Pixso-paragraph-1_171 {
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
    top: 5.03%;
    bottom: 94.39%;
    white-space: pre;
    flex-grow: 0;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.3s;
}

.Pixso-paragraph-1_171:hover {
    opacity: 0.8;
}
.Pixso-paragraph-1_172 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 48.75%;
    right: 47.08%;
    top: 5.03%;
    bottom: 94.39%;
    white-space: pre;
    flex-grow: 0;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.3s;
}

.Pixso-paragraph-1_172:hover {
    opacity: 0.8;
}
.Pixso-paragraph-1_173 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 59.38%;
    right: 36.46%;
    top: 5.03%;
    bottom: 94.39%;
    white-space: pre;
    flex-grow: 0;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.3s;
}

.Pixso-paragraph-1_173:hover {
    opacity: 0.8;
}
.Pixso-paragraph-1_174 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 70%;
    right: 25.83%;
    top: 5.03%;
    bottom: 94.39%;
    white-space: pre;
    flex-grow: 0;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.3s;
}

.Pixso-paragraph-1_174:hover {
    opacity: 0.8;
}
.Pixso-paragraph-1_175 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    text-align: center;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 80.63%;
    right: 15.21%;
    top: 5.03%;
    bottom: 94.39%;
    white-space: pre;
    flex-grow: 0;
    text-decoration: none;
    cursor: pointer;
    transition: opacity 0.3s;
}

.Pixso-paragraph-1_175:hover {
    opacity: 0.8;
}
.Pixso-vector-1_176 {
    width: 6.25%;
    height: 2.78%;
    background-image: url(@/assets/images/Vector_1_176.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 46.82%;
    right: 46.93%;
    top: 58.84%;
    bottom: 38.38%;
}
.Pixso-group-32_6 {
    width: 160px;
    height: 59px;
    position: absolute;
    left: 896px;
    top: 1651px;
}
.Pixso-paragraph-32_4 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(calc(-50% + 0px)) translateY(calc(-50% + 0.5px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-rectangle-32_5 {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: transparent;
}
.stroke-wrapper-32_5 {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 160px;
    height: 59px;
    transform: translateX(calc(-50% + 0px)) translateY(calc(-50% + 0px));
}
.stroke-32_5 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 1px 1px 1px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
    border-color: rgba(199, 199, 199, 1);
}
.Pixso-group-34_1 {
    width: 160px;
    height: 59px;
    position: absolute;
    left: 241px;
    top: 3314px;
}
.Pixso-paragraph-34_2 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(254, 254, 254, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(calc(-50% + 0px)) translateY(calc(-50% + 0.5px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-rectangle-34_3 {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: transparent;
}
.stroke-wrapper-34_3 {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 160px;
    height: 59px;
    transform: translateX(calc(-50% + 0px)) translateY(calc(-50% + 0px));
}
.stroke-34_3 {
    position: absolute;
    inset: 0px;
    border-radius: 0px 0px 0px 0px;
    border-width: 1px 1px 1px 1px;
    border-style: solid;
    pointer-events: none;
    box-sizing: border-box;
    border-color: rgba(254, 254, 254, 1);
}

/* 队伍风采轮播圆点指示器 */
.team-carousel-dots {
    position: absolute;
    left: 71.5%;
    top: 81.35%;
    display: flex;
    gap: 16px;
    z-index: 10;
}

.team-carousel-dots .dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgba(128, 128, 128, 0.6);
    background-color: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
}

.team-carousel-dots .dot:hover {
    border-color: rgba(0, 92, 190, 0.8);
}

.team-carousel-dots .dot.active {
    background-color: rgba(0, 92, 190, 1);
    border-color: rgba(0, 92, 190, 1);
}

/* 队伍风采图片去除圆角 */
.Pixso-vector-1_153 {
    border-radius: 0 !important;
}
.Pixso-vector-1_158 {
    border-radius: 0 !important;
}
.Pixso-vector-1_159 {
    border-radius: 0 !important;
}
.Pixso-vector-1_160 {
    border-radius: 0 !important;
}

/* Banner 轮播圆点指示器 */
.banner-carousel-dots {
    position: absolute;
    right: 8%;
    top: 21.83%;
    display: flex;
    gap: 12px;
    z-index: 10;
}

.banner-carousel-dots .banner-dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.8);
    background-color: transparent;
    cursor: pointer;
}

.banner-carousel-dots .banner-dot.active {
    background-color: #A7A7A7;
    border-color: #A7A7A7;
}

/* 视频播放模态框 */
.video-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.video-modal-content {
    position: relative;
    width: 90%;
    max-width: 1200px;
    background-color: #000;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.video-modal-close {
    position: absolute;
    top: -40px;
    right: 0;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    z-index: 10000;
}

.video-modal-close:hover {
    background-color: rgba(217, 38, 38, 0.8);
    transform: rotate(90deg);
}

.video-modal-player {
    width: 100%;
    height: auto;
    display: block;
}

/* 新闻列表项悬停效果 */
.Pixso-paragraph-1_36:hover,
.Pixso-paragraph-1_37:hover,
.Pixso-paragraph-1_38:hover,
.Pixso-paragraph-1_39:hover,
.Pixso-paragraph-1_40:hover,
.Pixso-paragraph-1_41:hover,
.Pixso-paragraph-1_42:hover,
.Pixso-paragraph-1_43:hover,
.Pixso-paragraph-1_44:hover,
.Pixso-paragraph-1_45:hover {
    color: rgba(0, 92, 190, 1) !important;
}

.Pixso-text-1_46:hover,
.Pixso-text-1_47:hover,
.Pixso-text-1_48:hover,
.Pixso-text-1_51:hover,
.Pixso-text-1_52:hover,
.Pixso-text-1_53:hover,
.Pixso-text-1_54:hover,
.Pixso-text-1_55:hover,
.Pixso-text-1_56:hover {
    color: rgba(0, 92, 190, 1) !important;
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

/* 调整新闻描述行距 - 使用margin-bottom而不是line-height，避免影响对齐 */
.Pixso-paragraph-1_46_0,
.Pixso-paragraph-1_47_0,
.Pixso-paragraph-1_48_0,
.Pixso-paragraph-1_51_0,
.Pixso-paragraph-1_52_0,
.Pixso-paragraph-1_53_0,
.Pixso-paragraph-1_54_0,
.Pixso-paragraph-1_55_0,
.Pixso-paragraph-1_56_0,
.Pixso-paragraph-1_57_0 {
  margin-bottom: 8px !important;
}

/* 各地动态列表样式 - 4行布局，减少间距 */
.dynamics-item {
  position: absolute;
  left: 6%;
  width: 40%;
  height: 30px;
  display: flex;
  align-items: center;
}

.dynamics-item-0 { top: 84%; }
.dynamics-item-1 { top: 85.2%; }
.dynamics-item-2 { top: 86.4%; }
.dynamics-item-3 { top: 87.6%; }

/* 救援行动列表样式 - 4行布局，减少间距 */
.action-item {
  position: absolute;
  left: 52%;
  width: 40%;
  height: 30px;
  display: flex;
  align-items: center;
}

.action-item-0 { top: 84%; }
.action-item-1 { top: 85.2%; }
.action-item-2 { top: 86.4%; }
.action-item-3 { top: 87.6%; }

.item-content {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 12px;
}

.item-date {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  min-width: 80px;
}

.item-title {
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.dynamics-item:hover .item-title,
.action-item:hover .item-title {
  color: #005cbe;
}

</style>
