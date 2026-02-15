<template>
    <div class="scroll-container-1_2501">
        <div id="1_2501" class="Pixso-frame-1_2501" :class="rowCountClass">
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
            <p id="1_2526" class="Pixso-paragraph-1_2526">{{ "序号" }}</p>
            <div id="1_2527" class="Pixso-vector-1_2527"></div>
            <p v-if="paginatedData[0]" id="1_2528" class="Pixso-paragraph-1_2528">{{ 1 }}</p>
            <div v-if="paginatedData[0]" id="1_2529" class="Pixso-vector-1_2529"></div>
            <p v-if="paginatedData[1]" id="1_2530" class="Pixso-paragraph-1_2530">{{ 2 }}</p>
            <div v-if="paginatedData[1]" id="1_2531" class="Pixso-vector-1_2531"></div>
            <p v-if="paginatedData[2]" id="1_2532" class="Pixso-paragraph-1_2532">{{ 3 }}</p>
            <div v-if="paginatedData[2]" id="1_2533" class="Pixso-vector-1_2533"></div>
            <p v-if="paginatedData[3]" id="1_2534" class="Pixso-paragraph-1_2534">{{ 4 }}</p>
            <div v-if="paginatedData[3]" id="1_2535" class="Pixso-vector-1_2535"></div>
            <p v-if="paginatedData[4]" id="1_2536" class="Pixso-paragraph-1_2536">{{ 5 }}</p>
            <div v-if="paginatedData[4]" id="1_2537" class="Pixso-vector-1_2537"></div>
            <p v-if="paginatedData[5]" id="1_2538" class="Pixso-paragraph-1_2538">{{ 6 }}</p>
            <div v-if="paginatedData[5]" id="1_2539" class="Pixso-vector-1_2539"></div>
            <p v-if="paginatedData[6]" id="1_2540" class="Pixso-paragraph-1_2540">{{ 7 }}</p>
            <div v-if="paginatedData[6]" id="1_2541" class="Pixso-vector-1_2541"></div>
            <p v-if="paginatedData[7]" id="1_2542" class="Pixso-paragraph-1_2542">{{ 8 }}</p>
            <div v-if="paginatedData[7]" id="1_2543" class="Pixso-vector-1_2543"></div>
            <p v-if="paginatedData[8]" id="1_2544" class="Pixso-paragraph-1_2544">{{ 9 }}</p>
            <div v-if="paginatedData[8]" id="1_2545" class="Pixso-vector-1_2545"></div>
            <p v-if="paginatedData[9]" id="1_2546" class="Pixso-paragraph-1_2546">{{ 10 }}</p>
            <div id="1_2547" class="Pixso-vector-1_2547"></div>
            <div id="1_2548" class="Pixso-vector-1_2548"></div>
            <p id="1_2549" class="Pixso-paragraph-1_2549">{{ "证书编号" }}</p>
            <div id="1_2550" class="Pixso-vector-1_2550"></div>
            <p v-if="paginatedData[0]" id="1_2551" class="Pixso-paragraph-1_2551">
                {{ paginatedData[0].certificateNo }}
            </p>
            <div v-if="paginatedData[0]" id="1_2552" class="Pixso-vector-1_2552"></div>
            <p v-if="paginatedData[1]" id="1_2553" class="Pixso-paragraph-1_2553">
                {{ paginatedData[1].certificateNo }}
            </p>
            <div v-if="paginatedData[1]" id="1_2554" class="Pixso-vector-1_2554"></div>
            <p v-if="paginatedData[2]" id="1_2555" class="Pixso-paragraph-1_2555">
                {{ paginatedData[2].certificateNo }}
            </p>
            <div v-if="paginatedData[2]" id="1_2556" class="Pixso-vector-1_2556"></div>
            <p v-if="paginatedData[3]" id="1_2557" class="Pixso-paragraph-1_2557">
                {{ paginatedData[3].certificateNo }}
            </p>
            <div v-if="paginatedData[3]" id="1_2558" class="Pixso-vector-1_2558"></div>
            <p v-if="paginatedData[4]" id="1_2559" class="Pixso-paragraph-1_2559">
                {{ paginatedData[4].certificateNo }}
            </p>
            <div v-if="paginatedData[4]" id="1_2560" class="Pixso-vector-1_2560"></div>
            <p v-if="paginatedData[5]" id="1_2561" class="Pixso-paragraph-1_2561">
                {{ paginatedData[5].certificateNo }}
            </p>
            <div v-if="paginatedData[5]" id="1_2562" class="Pixso-vector-1_2562"></div>
            <p v-if="paginatedData[6]" id="1_2563" class="Pixso-paragraph-1_2563">
                {{ paginatedData[6].certificateNo }}
            </p>
            <div v-if="paginatedData[6]" id="1_2564" class="Pixso-vector-1_2564"></div>
            <p v-if="paginatedData[7]" id="1_2565" class="Pixso-paragraph-1_2565">
                {{ paginatedData[7].certificateNo }}
            </p>
            <div v-if="paginatedData[7]" id="1_2566" class="Pixso-vector-1_2566"></div>
            <p v-if="paginatedData[8]" id="1_2567" class="Pixso-paragraph-1_2567">
                {{ paginatedData[8].certificateNo }}
            </p>
            <div v-if="paginatedData[8]" id="1_2568" class="Pixso-vector-1_2568"></div>
            <p v-if="paginatedData[9]" id="1_2569" class="Pixso-paragraph-1_2569">
                {{ paginatedData[9].certificateNo }}
            </p>
            <div id="1_2570" class="Pixso-vector-1_2570"></div>
            <div id="1_2571" class="Pixso-vector-1_2571"></div>
            <p id="1_2572" class="Pixso-paragraph-1_2572">{{ "证书类型" }}</p>
            <div id="1_2573" class="Pixso-vector-1_2573"></div>
            <div v-if="paginatedData[0]" id="1_2575" class="Pixso-vector-1_2575"></div>
            <div v-if="paginatedData[1]" id="1_2577" class="Pixso-vector-1_2577"></div>
            <div v-if="paginatedData[2]" id="1_2579" class="Pixso-vector-1_2579"></div>
            <div v-if="paginatedData[3]" id="1_2581" class="Pixso-vector-1_2581"></div>
            <div v-if="paginatedData[4]" id="1_2583" class="Pixso-vector-1_2583"></div>
            <div v-if="paginatedData[5]" id="1_2585" class="Pixso-vector-1_2585"></div>
            <div v-if="paginatedData[6]" id="1_2587" class="Pixso-vector-1_2587"></div>
            <div v-if="paginatedData[7]" id="1_2589" class="Pixso-vector-1_2589"></div>
            <div v-if="paginatedData[8]" id="1_2591" class="Pixso-vector-1_2591"></div>
            <div v-if="paginatedData[9]" id="1_2593" class="Pixso-vector-1_2593"></div>
            <p v-if="paginatedData[0]" id="1_2594" class="Pixso-paragraph-1_2594">
                {{ paginatedData[0].certificateType }}
            </p>
            <div v-if="paginatedData[0]" id="1_2595" class="Pixso-vector-1_2595"></div>
            <p v-if="paginatedData[1]" id="1_2596" class="Pixso-paragraph-1_2596">
                {{ paginatedData[1].certificateType }}
            </p>
            <div v-if="paginatedData[1]" id="1_2597" class="Pixso-vector-1_2597"></div>
            <p v-if="paginatedData[2]" id="1_2598" class="Pixso-paragraph-1_2598">
                {{ paginatedData[2].certificateType }}
            </p>
            <div v-if="paginatedData[2]" id="1_2599" class="Pixso-vector-1_2599"></div>
            <p v-if="paginatedData[3]" id="1_2600" class="Pixso-paragraph-1_2600">
                {{ paginatedData[3].certificateType }}
            </p>
            <div v-if="paginatedData[3]" id="1_2601" class="Pixso-vector-1_2601"></div>
            <p v-if="paginatedData[4]" id="1_2602" class="Pixso-paragraph-1_2602">
                {{ paginatedData[4].certificateType }}
            </p>
            <div v-if="paginatedData[4]" id="1_2603" class="Pixso-vector-1_2603"></div>
            <p v-if="paginatedData[5]" id="1_2604" class="Pixso-paragraph-1_2604">
                {{ paginatedData[5].certificateType }}
            </p>
            <div v-if="paginatedData[5]" id="1_2605" class="Pixso-vector-1_2605"></div>
            <p v-if="paginatedData[6]" id="1_2606" class="Pixso-paragraph-1_2606">{{ paginatedData[6].certificateType }}</p>
            <div v-if="paginatedData[6]" id="1_2607" class="Pixso-vector-1_2607"></div>
            <p v-if="paginatedData[7]" id="1_2608" class="Pixso-paragraph-1_2608">
                {{ paginatedData[7].certificateType }}
            </p>
            <div v-if="paginatedData[7]" id="1_2609" class="Pixso-vector-1_2609"></div>
            <p v-if="paginatedData[8]" id="1_2610" class="Pixso-paragraph-1_2610">
                {{ paginatedData[8].certificateType }}
            </p>
            <div v-if="paginatedData[8]" id="1_2611" class="Pixso-vector-1_2611"></div>
            <p v-if="paginatedData[9]" id="1_2612" class="Pixso-paragraph-1_2612">
                {{ paginatedData[9].certificateType }}
            </p>
            <div id="1_2613" class="Pixso-vector-1_2613"></div>
            <div id="1_2614" class="Pixso-vector-1_2614"></div>
            <p id="1_2615" class="Pixso-paragraph-1_2615">{{ "姓名" }}</p>
            <div id="1_2616" class="Pixso-vector-1_2616"></div>
            <p v-if="paginatedData[0]" id="1_2617" class="Pixso-paragraph-1_2617">{{ paginatedData[0].name }}</p>
            <div v-if="paginatedData[0]" id="1_2618" class="Pixso-vector-1_2618"></div>
            <p v-if="paginatedData[1]" id="1_2619" class="Pixso-paragraph-1_2619">{{ paginatedData[1].name }}</p>
            <div v-if="paginatedData[1]" id="1_2620" class="Pixso-vector-1_2620"></div>
            <p v-if="paginatedData[2]" id="1_2621" class="Pixso-paragraph-1_2621">{{ paginatedData[2].name }}</p>
            <div v-if="paginatedData[2]" id="1_2622" class="Pixso-vector-1_2622"></div>
            <p v-if="paginatedData[3]" id="1_2623" class="Pixso-paragraph-1_2623">{{ paginatedData[3].name }}</p>
            <div v-if="paginatedData[3]" id="1_2624" class="Pixso-vector-1_2624"></div>
            <p v-if="paginatedData[4]" id="1_2625" class="Pixso-paragraph-1_2625">{{ paginatedData[4].name }}</p>
            <div v-if="paginatedData[4]" id="1_2626" class="Pixso-vector-1_2626"></div>
            <p v-if="paginatedData[5]" id="1_2627" class="Pixso-paragraph-1_2627">{{ paginatedData[5].name }}</p>
            <div v-if="paginatedData[5]" id="1_2628" class="Pixso-vector-1_2628"></div>
            <p v-if="paginatedData[6]" id="1_2629" class="Pixso-paragraph-1_2629">{{ paginatedData[6].name }}</p>
            <div v-if="paginatedData[6]" id="1_2630" class="Pixso-vector-1_2630"></div>
            <p v-if="paginatedData[7]" id="1_2631" class="Pixso-paragraph-1_2631">{{ paginatedData[7].name }}</p>
            <div v-if="paginatedData[7]" id="1_2632" class="Pixso-vector-1_2632"></div>
            <p v-if="paginatedData[8]" id="1_2633" class="Pixso-paragraph-1_2633">{{ paginatedData[8].name }}</p>
            <div v-if="paginatedData[8]" id="1_2634" class="Pixso-vector-1_2634"></div>
            <p v-if="paginatedData[9]" id="1_2635" class="Pixso-paragraph-1_2635">{{ paginatedData[9].name }}</p>
            <div id="1_2636" class="Pixso-vector-1_2636"></div>
            <div id="1_2637" class="Pixso-vector-1_2637"></div>
            <p id="1_2638" class="Pixso-paragraph-1_2638">{{ "工作单位" }}</p>
            <div id="1_2639" class="Pixso-vector-1_2639"></div>
            <p v-if="paginatedData[0]" id="1_2640" class="Pixso-paragraph-1_2640">
                {{ paginatedData[0].workUnit }}
            </p>
            <div v-if="paginatedData[0]" id="1_2641" class="Pixso-vector-1_2641"></div>
            <p v-if="paginatedData[1]" id="1_2642" class="Pixso-paragraph-1_2642">
                {{ paginatedData[1].workUnit }}
            </p>
            <div v-if="paginatedData[1]" id="1_2643" class="Pixso-vector-1_2643"></div>
            <p v-if="paginatedData[2]" id="1_2644" class="Pixso-paragraph-1_2644">
                {{ paginatedData[2].workUnit }}
            </p>
            <div v-if="paginatedData[2]" id="1_2645" class="Pixso-vector-1_2645"></div>
            <p v-if="paginatedData[3]" id="1_2646" class="Pixso-paragraph-1_2646">
                {{ paginatedData[3].workUnit }}
            </p>
            <div v-if="paginatedData[3]" id="1_2647" class="Pixso-vector-1_2647"></div>
            <p v-if="paginatedData[4]" id="1_2648" class="Pixso-paragraph-1_2648">
                {{ paginatedData[4].workUnit }}
            </p>
            <div v-if="paginatedData[4]" id="1_2649" class="Pixso-vector-1_2649"></div>
            <p v-if="paginatedData[5]" id="1_2650" class="Pixso-paragraph-1_2650">
                {{ paginatedData[5].workUnit }}
            </p>
            <div v-if="paginatedData[5]" id="1_2651" class="Pixso-vector-1_2651"></div>
            <p v-if="paginatedData[6]" id="1_2652" class="Pixso-paragraph-1_2652">
                {{ paginatedData[6].workUnit }}
            </p>
            <div v-if="paginatedData[6]" id="1_2653" class="Pixso-vector-1_2653"></div>
            <p v-if="paginatedData[7]" id="1_2654" class="Pixso-paragraph-1_2654">
                {{ paginatedData[7].workUnit }}
            </p>
            <div v-if="paginatedData[7]" id="1_2655" class="Pixso-vector-1_2655"></div>
            <p v-if="paginatedData[8]" id="1_2656" class="Pixso-paragraph-1_2656">
                {{ paginatedData[8].workUnit }}
            </p>
            <div v-if="paginatedData[8]" id="1_2657" class="Pixso-vector-1_2657"></div>
            <p v-if="paginatedData[9]" id="1_2658" class="Pixso-paragraph-1_2658">
                {{ paginatedData[9].workUnit }}
            </p>
            <div id="1_2659" class="Pixso-vector-1_2659"></div>
            <div id="1_2660" class="Pixso-vector-1_2660"></div>
            <p id="1_2661" class="Pixso-paragraph-1_2661">{{ "发证日期" }}</p>
            <div id="1_2662" class="Pixso-vector-1_2662"></div>
            <p v-if="paginatedData[0]" id="1_2663" class="Pixso-paragraph-1_2663">{{ paginatedData[0].issueDate }}</p>
            <div v-if="paginatedData[0]" id="1_2664" class="Pixso-vector-1_2664"></div>
            <p v-if="paginatedData[1]" id="1_2665" class="Pixso-paragraph-1_2665">{{ paginatedData[1].issueDate }}</p>
            <div v-if="paginatedData[1]" id="1_2666" class="Pixso-vector-1_2666"></div>
            <p v-if="paginatedData[2]" id="1_2667" class="Pixso-paragraph-1_2667">{{ paginatedData[2].issueDate }}</p>
            <div v-if="paginatedData[2]" id="1_2668" class="Pixso-vector-1_2668"></div>
            <p v-if="paginatedData[3]" id="1_2669" class="Pixso-paragraph-1_2669">{{ paginatedData[3].issueDate }}</p>
            <div v-if="paginatedData[3]" id="1_2670" class="Pixso-vector-1_2670"></div>
            <p v-if="paginatedData[4]" id="1_2671" class="Pixso-paragraph-1_2671">{{ paginatedData[4].issueDate }}</p>
            <div v-if="paginatedData[4]" id="1_2672" class="Pixso-vector-1_2672"></div>
            <p v-if="paginatedData[5]" id="1_2673" class="Pixso-paragraph-1_2673">{{ paginatedData[5].issueDate }}</p>
            <div v-if="paginatedData[5]" id="1_2674" class="Pixso-vector-1_2674"></div>
            <p v-if="paginatedData[6]" id="1_2675" class="Pixso-paragraph-1_2675">{{ paginatedData[6].issueDate }}</p>
            <div v-if="paginatedData[6]" id="1_2676" class="Pixso-vector-1_2676"></div>
            <p v-if="paginatedData[7]" id="1_2677" class="Pixso-paragraph-1_2677">{{ paginatedData[7].issueDate }}</p>
            <div v-if="paginatedData[7]" id="1_2678" class="Pixso-vector-1_2678"></div>
            <p v-if="paginatedData[8]" id="1_2679" class="Pixso-paragraph-1_2679">{{ paginatedData[8].issueDate }}</p>
            <div v-if="paginatedData[8]" id="1_2680" class="Pixso-vector-1_2680"></div>
            <p v-if="paginatedData[9]" id="1_2681" class="Pixso-paragraph-1_2681">{{ paginatedData[9].issueDate }}</p>
            <div id="1_2682" class="Pixso-vector-1_2682"></div>
            <div id="1_2683" class="Pixso-vector-1_2683"></div>
            <p id="1_2684" class="Pixso-paragraph-1_2684">{{ "有效期至" }}</p>
            <div id="1_2685" class="Pixso-vector-1_2685"></div>
            <p v-if="paginatedData[0]" id="1_2686" class="Pixso-paragraph-1_2686">{{ paginatedData[0].expiryDate }}</p>
            <div v-if="paginatedData[0]" id="1_2687" class="Pixso-vector-1_2687"></div>
            <p v-if="paginatedData[1]" id="1_2688" class="Pixso-paragraph-1_2688">{{ paginatedData[1].expiryDate }}</p>
            <div v-if="paginatedData[1]" id="1_2689" class="Pixso-vector-1_2689"></div>
            <p v-if="paginatedData[2]" id="1_2690" class="Pixso-paragraph-1_2690">{{ paginatedData[2].expiryDate }}</p>
            <div v-if="paginatedData[2]" id="1_2691" class="Pixso-vector-1_2691"></div>
            <p v-if="paginatedData[3]" id="1_2692" class="Pixso-paragraph-1_2692">{{ paginatedData[3].expiryDate }}</p>
            <div v-if="paginatedData[3]" id="1_2693" class="Pixso-vector-1_2693"></div>
            <p v-if="paginatedData[4]" id="1_2694" class="Pixso-paragraph-1_2694">{{ paginatedData[4].expiryDate }}</p>
            <div v-if="paginatedData[4]" id="1_2695" class="Pixso-vector-1_2695"></div>
            <p v-if="paginatedData[5]" id="1_2696" class="Pixso-paragraph-1_2696">{{ paginatedData[5].expiryDate }}</p>
            <div v-if="paginatedData[5]" id="1_2697" class="Pixso-vector-1_2697"></div>
            <p v-if="paginatedData[6]" id="1_2698" class="Pixso-paragraph-1_2698">{{ paginatedData[6].expiryDate }}</p>
            <div v-if="paginatedData[6]" id="1_2699" class="Pixso-vector-1_2699"></div>
            <p v-if="paginatedData[7]" id="1_2700" class="Pixso-paragraph-1_2700">{{ paginatedData[7].expiryDate }}</p>
            <div v-if="paginatedData[7]" id="1_2701" class="Pixso-vector-1_2701"></div>
            <p v-if="paginatedData[8]" id="1_2702" class="Pixso-paragraph-1_2702">{{ paginatedData[8].expiryDate }}</p>
            <div v-if="paginatedData[8]" id="1_2703" class="Pixso-vector-1_2703"></div>
            <p v-if="paginatedData[9]" id="1_2704" class="Pixso-paragraph-1_2704">{{ paginatedData[9].expiryDate }}</p>
            <div id="1_2705" class="Pixso-vector-1_2705"></div>
            <div id="1_2706" class="Pixso-vector-1_2706"></div>
            <p id="1_2707" class="Pixso-paragraph-1_2707">{{ "状态" }}</p>
            <div id="1_2708" class="Pixso-vector-1_2708"></div>
            <div v-if="paginatedData[0]" id="1_2710" class="Pixso-vector-1_2710"></div>
            <div v-if="paginatedData[1]" id="1_2712" class="Pixso-vector-1_2712"></div>
            <div v-if="paginatedData[2]" id="1_2714" class="Pixso-vector-1_2714"></div>
            <div v-if="paginatedData[3]" id="1_2716" class="Pixso-vector-1_2716"></div>
            <div v-if="paginatedData[4]" id="1_2718" class="Pixso-vector-1_2718"></div>
            <div v-if="paginatedData[5]" id="1_2720" class="Pixso-vector-1_2720"></div>
            <div v-if="paginatedData[6]" id="1_2722" class="Pixso-vector-1_2722"></div>
            <div v-if="paginatedData[7]" id="1_2724" class="Pixso-vector-1_2724"></div>
            <div v-if="paginatedData[8]" id="1_2726" class="Pixso-vector-1_2726"></div>
            <div v-if="paginatedData[9]" id="1_2728" class="Pixso-vector-1_2728"></div>
            <p v-if="paginatedData[0]" id="1_2729" class="Pixso-paragraph-1_2729">{{ paginatedData[0].status }}</p>
            <div v-if="paginatedData[0]" id="1_2730" class="Pixso-vector-1_2730"></div>
            <p v-if="paginatedData[1]" id="1_2731" class="Pixso-paragraph-1_2731">{{ paginatedData[1].status }}</p>
            <div v-if="paginatedData[1]" id="1_2732" class="Pixso-vector-1_2732"></div>
            <p v-if="paginatedData[2]" id="1_2733" class="Pixso-paragraph-1_2733">{{ paginatedData[2].status }}</p>
            <div v-if="paginatedData[2]" id="1_2734" class="Pixso-vector-1_2734"></div>
            <p v-if="paginatedData[3]" id="1_2735" class="Pixso-paragraph-1_2735">{{ paginatedData[3].status }}</p>
            <div v-if="paginatedData[3]" id="1_2736" class="Pixso-vector-1_2736"></div>
            <p v-if="paginatedData[4]" id="1_2737" class="Pixso-paragraph-1_2737">{{ paginatedData[4].status }}</p>
            <div v-if="paginatedData[4]" id="1_2738" class="Pixso-vector-1_2738"></div>
            <p v-if="paginatedData[5]" id="1_2739" class="Pixso-paragraph-1_2739">{{ paginatedData[5].status }}</p>
            <div v-if="paginatedData[5]" id="1_2740" class="Pixso-vector-1_2740"></div>
            <p v-if="paginatedData[6]" id="1_2741" class="Pixso-paragraph-1_2741">{{ paginatedData[6].status }}</p>
            <div v-if="paginatedData[6]" id="1_2742" class="Pixso-vector-1_2742"></div>
            <p v-if="paginatedData[7]" id="1_2743" class="Pixso-paragraph-1_2743">{{ paginatedData[7].status }}</p>
            <div v-if="paginatedData[7]" id="1_2744" class="Pixso-vector-1_2744"></div>
            <p v-if="paginatedData[8]" id="1_2745" class="Pixso-paragraph-1_2745">{{ paginatedData[8].status }}</p>
            <div v-if="paginatedData[8]" id="1_2746" class="Pixso-vector-1_2746"></div>
            <p v-if="paginatedData[9]" id="1_2747" class="Pixso-paragraph-1_2747">{{ paginatedData[9].status }}</p>
            <div id="1_2748" class="Pixso-vector-1_2748"></div>
            <div id="1_2749" class="Pixso-vector-1_2749"></div>
            <p id="1_2750" class="Pixso-paragraph-1_2750">{{ "操作" }}</p>
            <div id="1_2751" class="Pixso-vector-1_2751"></div>
            <div v-if="paginatedData[0]" id="1_2753" class="Pixso-vector-1_2753"></div>
            <div v-if="paginatedData[1]" id="1_2755" class="Pixso-vector-1_2755"></div>
            <div v-if="paginatedData[2]" id="1_2757" class="Pixso-vector-1_2757"></div>
            <div v-if="paginatedData[3]" id="1_2759" class="Pixso-vector-1_2759"></div>
            <div v-if="paginatedData[4]" id="1_2761" class="Pixso-vector-1_2761"></div>
            <div v-if="paginatedData[5]" id="1_2763" class="Pixso-vector-1_2763"></div>
            <div v-if="paginatedData[6]" id="1_2765" class="Pixso-vector-1_2765"></div>
            <div v-if="paginatedData[7]" id="1_2767" class="Pixso-vector-1_2767"></div>
            <div v-if="paginatedData[8]" id="1_2769" class="Pixso-vector-1_2769"></div>
            <div v-if="paginatedData[9]" id="1_2771" class="Pixso-vector-1_2771"></div>
            <router-link v-if="paginatedData[0]" :to="`/query-system/certificate/detail/${paginatedData[0].certificateNo}`" id="1_2772" class="Pixso-paragraph-1_2772" style="text-decoration: none; color: inherit;">查看详情</router-link>
            <div v-if="paginatedData[0]" id="1_2773" class="Pixso-vector-1_2773"></div>
            <router-link v-if="paginatedData[1]" :to="`/query-system/certificate/detail/${paginatedData[1].certificateNo}`" id="1_2774" class="Pixso-paragraph-1_2774" style="text-decoration: none; color: inherit;">查看详情</router-link>
            <div v-if="paginatedData[1]" id="1_2775" class="Pixso-vector-1_2775"></div>
            <router-link v-if="paginatedData[2]" :to="`/query-system/certificate/detail/${paginatedData[2].certificateNo}`" id="1_2776" class="Pixso-paragraph-1_2776" style="text-decoration: none; color: inherit;">查看详情</router-link>
            <div v-if="paginatedData[2]" id="1_2777" class="Pixso-vector-1_2777"></div>
            <router-link v-if="paginatedData[3]" :to="`/query-system/certificate/detail/${paginatedData[3].certificateNo}`" id="1_2778" class="Pixso-paragraph-1_2778" style="text-decoration: none; color: inherit;">查看详情</router-link>
            <div v-if="paginatedData[3]" id="1_2779" class="Pixso-vector-1_2779"></div>
            <router-link v-if="paginatedData[4]" :to="`/query-system/certificate/detail/${paginatedData[4].certificateNo}`" id="1_2780" class="Pixso-paragraph-1_2780" style="text-decoration: none; color: inherit;">查看详情</router-link>
            <div v-if="paginatedData[4]" id="1_2781" class="Pixso-vector-1_2781"></div>
            <router-link v-if="paginatedData[5]" :to="`/query-system/certificate/detail/${paginatedData[5].certificateNo}`" id="1_2782" class="Pixso-paragraph-1_2782" style="text-decoration: none; color: inherit;">查看详情</router-link>
            <div v-if="paginatedData[5]" id="1_2783" class="Pixso-vector-1_2783"></div>
            <router-link v-if="paginatedData[6]" :to="`/query-system/certificate/detail/${paginatedData[6].certificateNo}`" id="1_2784" class="Pixso-paragraph-1_2784" style="text-decoration: none; color: inherit;">查看详情</router-link>
            <div v-if="paginatedData[6]" id="1_2785" class="Pixso-vector-1_2785"></div>
            <router-link v-if="paginatedData[7]" :to="`/query-system/certificate/detail/${paginatedData[7].certificateNo}`" id="1_2786" class="Pixso-paragraph-1_2786" style="text-decoration: none; color: inherit;">查看详情</router-link>
            <div v-if="paginatedData[7]" id="1_2787" class="Pixso-vector-1_2787"></div>
            <router-link v-if="paginatedData[8]" :to="`/query-system/certificate/detail/${paginatedData[8].certificateNo}`" id="1_2788" class="Pixso-paragraph-1_2788" style="text-decoration: none; color: inherit;">查看详情</router-link>
            <div v-if="paginatedData[8]" id="1_2789" class="Pixso-vector-1_2789"></div>
            <router-link v-if="paginatedData[9]" :to="`/query-system/certificate/detail/${paginatedData[9].certificateNo}`" id="1_2790" class="Pixso-paragraph-1_2790" style="text-decoration: none; color: inherit;">查看详情</router-link>
            <div id="1_2791" class="Pixso-vector-1_2791"></div>
            <p id="1_2802" class="Pixso-paragraph-1_2802">
                查询结果
            </p>
            <div id="1_2879" class="Pixso-vector-1_2879"></div>
            <router-link to="/" id="17_26" class="Pixso-vector-17_26" style="cursor: pointer;"></router-link>
            <div id="1_2892" class="Pixso-vector-1_2892"></div>

            <!-- 分页组件 -->
            <div style="position: absolute; right: 7.29%; top: 69.31%; height: 3.24%;">
                <Pagination
                    :total="totalCount"
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-size-options="[10, 20, 50]"
                    @page-change="handlePageChange"
                />
            </div>

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
import { useRouter, useRoute } from 'vue-router'
import { queryCertificateMock } from '@/data/mock-certificate'
import Pagination from '@/components/common/Pagination.vue'

const router = useRouter()
const route = useRoute()

// 从路由获取查询参数
const queryName = ref((route.query.name as string) || '')
const queryIdCard = ref((route.query.idCard as string) || '')
const queryCertificateNo = ref((route.query.certificateNo as string) || '')

// 分页
const currentPage = ref(1)
const pageSize = ref(10)

// 获取证书数据
const certificatesData = computed(() => {
  const result = queryCertificateMock(
    queryCertificateNo.value || undefined,
    queryName.value || undefined,
    queryIdCard.value || undefined
  )

  if (result.status === 'success' && result.data) {
    return result.data.map(cert => ({
      id: cert.id,
      certificateNo: cert.certificateNo,
      certificateType: cert.certificateType,
      name: cert.name,
      workUnit: cert.workUnit,
      issueDate: cert.issueDate,
      expiryDate: cert.expiryDate,
      status: cert.status,
      idCard: cert.idCard
    }))
  }
  return []
})

// 总记录数
const totalCount = computed(() => certificatesData.value.length)

// 当前页数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return certificatesData.value.slice(start, end)
})

// 根据行数生成CSS类
const rowCountClass = computed(() => {
  const count = paginatedData.value.length
  return `table-rows-${count}`
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

// 页码改变处理
function handlePageChange() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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
.Pixso-vector-1_2502 {
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/Vector_1_2502.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;
}
.Pixso-vector-1_2503 {
    width: 100%;
    height: 14.96%;
    background-image: url(@/assets/images/Vector_1_2503.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 85.04%;
}
.Pixso-vector-1_2506 {
    width: 6.72%;
    height: 9.95%;
    background-image: url(@/assets/images/Vector_1_2506.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 6.46%;
    right: 86.82%;
    top: 2.54%;
    bottom: 87.51%;
}
.Pixso-paragraph-1_2509 {
    font-size: 53px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 53px;
    color: rgba(217, 38, 38, 1);
    width: 16.66%;
    height: 4.09%;
    position: absolute;
    left: 14.69%;
    right: 68.65%;
    top: 4.47%;
    bottom: 91.44%;
}
.Pixso-paragraph-1_2510 {
    font-size: 28.5px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 23.5px;
    color: rgba(217, 38, 38, 1);
    width: 16.3%;
    height: 1.85%;
    position: absolute;
    left: 14.9%;
    right: 68.8%;
    top: 9.25%;
    bottom: 88.9%;
}
.Pixso-paragraph-1_2519 {
    font-size: 20px;
    font-family: "Alibaba PuHuiTi-Regular";
    font-weight: 400;
    line-height: 20px;
    color: rgba(132, 132, 132, 1);
    width: 30%;
    height: auto;
    position: absolute;
    left: 5.83%;
    right: 64.17%;
    top: 22.74%;
    bottom: 75.71%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.Pixso-text-1_2520 {
    font-size: 18px;
    font-family: "Roboto-Regular";
    font-weight: Regular;
    line-height: 21px;
    color: rgba(0, 0, 0, 1);
    width: 0.11%;
    height: 1.31%;
    position: absolute;
    left: 55.36%;
    right: 44.53%;
    top: 71.09%;
    bottom: 27.6%;
}
.Pixso-vector-1_2521 {
    width: 89.14%;
    height: 49.11%;
    background-image: url(@/assets/images/Vector_1_2521.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 26.6%;
    bottom: 24.29%;
}
.Pixso-vector-1_2522 {
    width: 85.52%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2522.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 7.29%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2523 {
    width: 85.52%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2523.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 7.29%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2524 {
    width: 3.23%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2524.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2525 {
    width: 3.23%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2525.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2526 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.7%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2527 {
    width: 3.23%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2527.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-paragraph-1_2528 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.69%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 36.78%;
    bottom: 61.53%;
}
.Pixso-vector-1_2529 {
    width: 3.23%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2529.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-paragraph-1_2530 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.7%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2531 {
    width: 3.23%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2531.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-paragraph-1_2532 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.69%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2533 {
    width: 3.23%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2533.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-paragraph-1_2534 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.7%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2535 {
    width: 3.23%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2535.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-paragraph-1_2536 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.7%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2537 {
    width: 3.23%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2537.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-paragraph-1_2538 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.69%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2539 {
    width: 3.23%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2539.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-paragraph-1_2540 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.7%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2541 {
    width: 3.23%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2541.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-paragraph-1_2542 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.69%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2543 {
    width: 3.23%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2543.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-paragraph-1_2544 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.7%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2545 {
    width: 3.23%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2545.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.19%;
    right: 89.58%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-paragraph-1_2546 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 1.67%;
    height: 1.7%;
    position: absolute;
    left: 7.97%;
    right: 90.36%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2547 {
    width: 13.02%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2547.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2548 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2548.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2549 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2550 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2550.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-paragraph-1_2551 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 36.78%;
    bottom: 61.53%;
}
.Pixso-vector-1_2552 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2552.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-paragraph-1_2553 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2554 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2554.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-paragraph-1_2555 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2556 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2556.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-paragraph-1_2557 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2558 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2558.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-paragraph-1_2559 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2560 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2560.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-paragraph-1_2561 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2562 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2562.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-paragraph-1_2563 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2564 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2564.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-paragraph-1_2565 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2566 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2566.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-paragraph-1_2567 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2568 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2568.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 10.42%;
    right: 76.56%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-paragraph-1_2569 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 11.2%;
    right: 77.34%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2570 {
    width: 10.41%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2570.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2571 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2571.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2572 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 24.22%;
    right: 66.93%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2573 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2573.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-vector-1_2575 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2575.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-vector-1_2577 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2577.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-vector-1_2579 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2579.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-vector-1_2581 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2581.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-vector-1_2583 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2583.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-vector-1_2585 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2585.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-vector-1_2587 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2587.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-vector-1_2589 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2589.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-vector-1_2591 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2591.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 23.44%;
    right: 66.15%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-vector-1_2593 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2593.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 36.55%;
    bottom: 61.68%;
}
.Pixso-paragraph-1_2594 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.69%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 36.55%;
    bottom: 61.76%;
}
.Pixso-vector-1_2595 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2595.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 39.86%;
    bottom: 58.37%;
}
.Pixso-paragraph-1_2596 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.7%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2597 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2597.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 42.95%;
    bottom: 55.28%;
}
.Pixso-paragraph-1_2598 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.69%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2599 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2599.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 46.03%;
    bottom: 52.2%;
}
.Pixso-paragraph-1_2600 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.7%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2601 {
    width: 6.4%;
    height: 1.78%;
    background-image: url(@/assets/images/Vector_1_2601.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 49.11%;
    bottom: 49.11%;
}
.Pixso-paragraph-1_2602 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.7%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2603 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2603.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 52.2%;
    bottom: 46.03%;
}
.Pixso-paragraph-1_2604 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.69%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2605 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2605.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 55.28%;
    bottom: 42.95%;
}
.Pixso-paragraph-1_2606 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.7%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2607 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2607.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 58.37%;
    bottom: 39.86%;
}
.Pixso-paragraph-1_2608 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.69%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2609 {
    width: 6.4%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2609.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 61.45%;
    bottom: 36.78%;
}
.Pixso-paragraph-1_2610 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.7%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2611 {
    width: 6.4%;
    height: 1.78%;
    background-image: url(@/assets/images/Vector_1_2611.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 25.47%;
    right: 68.13%;
    top: 64.53%;
    bottom: 33.69%;
}
.Pixso-paragraph-1_2612 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.63%;
    height: 1.7%;
    position: absolute;
    left: 25.83%;
    right: 68.54%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2613 {
    width: 7.3%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2613.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2614 {
    width: 7.3%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2614.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2615 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.7%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2616 {
    width: 7.3%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2616.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-paragraph-1_2617 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.69%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 36.78%;
    bottom: 61.53%;
}
.Pixso-vector-1_2618 {
    width: 7.3%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2618.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-paragraph-1_2619 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.7%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2620 {
    width: 7.3%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2620.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-paragraph-1_2621 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.69%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2622 {
    width: 7.3%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2622.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-paragraph-1_2623 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.7%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2624 {
    width: 7.3%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2624.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-paragraph-1_2625 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.7%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2626 {
    width: 7.3%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2626.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-paragraph-1_2627 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.69%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2628 {
    width: 7.3%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2628.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-paragraph-1_2629 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.7%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2630 {
    width: 7.3%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2630.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-paragraph-1_2631 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.69%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2632 {
    width: 7.3%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2632.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-paragraph-1_2633 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.7%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2634 {
    width: 7.3%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2634.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 33.85%;
    right: 58.85%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-paragraph-1_2635 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.72%;
    height: 1.7%;
    position: absolute;
    left: 34.64%;
    right: 59.64%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2636 {
    width: 13.02%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2636.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2637 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2637.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2638 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2639 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2639.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-paragraph-1_2640 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 36.78%;
    bottom: 61.53%;
}
.Pixso-vector-1_2641 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2641.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-paragraph-1_2642 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2643 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2643.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-paragraph-1_2644 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2645 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2645.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-paragraph-1_2646 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2647 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2647.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-paragraph-1_2648 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2649 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2649.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-paragraph-1_2650 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2651 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2651.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-paragraph-1_2652 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2653 {
    width: 13.02%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2653.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-paragraph-1_2654 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.69%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2655 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2655.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-paragraph-1_2656 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2657 {
    width: 13.02%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2657.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 41.15%;
    right: 45.83%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-paragraph-1_2658 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 11.46%;
    height: 1.7%;
    position: absolute;
    left: 41.93%;
    right: 46.61%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2659 {
    width: 10.41%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2659.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2660 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2660.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2661 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2662 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2662.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-paragraph-1_2663 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.69%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 36.78%;
    bottom: 61.53%;
}
.Pixso-vector-1_2664 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2664.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-paragraph-1_2665 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2666 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2666.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-paragraph-1_2667 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.69%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2668 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2668.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-paragraph-1_2669 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2670 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2670.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-paragraph-1_2671 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2672 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2672.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-paragraph-1_2673 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.69%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2674 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2674.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-paragraph-1_2675 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2676 {
    width: 10.41%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2676.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-paragraph-1_2677 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.69%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2678 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2678.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-paragraph-1_2679 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2680 {
    width: 10.41%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2680.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 54.17%;
    right: 35.42%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-paragraph-1_2681 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.85%;
    height: 1.7%;
    position: absolute;
    left: 54.95%;
    right: 36.2%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2682 {
    width: 10.42%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2682.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2683 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2683.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2684 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2685 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2685.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-paragraph-1_2686 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.69%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 36.78%;
    bottom: 61.53%;
}
.Pixso-vector-1_2687 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2687.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-paragraph-1_2688 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2689 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2689.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-paragraph-1_2690 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.69%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2691 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2691.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-paragraph-1_2692 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2693 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2693.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-paragraph-1_2694 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2695 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2695.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-paragraph-1_2696 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.69%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2697 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2697.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-paragraph-1_2698 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2699 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2699.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-paragraph-1_2700 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.69%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2701 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2701.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-paragraph-1_2702 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2703 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2703.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 64.58%;
    right: 25%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-paragraph-1_2704 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 65.36%;
    right: 25.78%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2705 {
    width: 7.29%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2705.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2706 {
    width: 7.29%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2706.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2707 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 5.73%;
    height: 1.7%;
    position: absolute;
    left: 75.78%;
    right: 18.49%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2708 {
    width: 7.29%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2708.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-vector-1_2710 {
    width: 7.29%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2710.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-vector-1_2712 {
    width: 7.29%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2712.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-vector-1_2714 {
    width: 7.29%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2714.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-vector-1_2716 {
    width: 7.29%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2716.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-vector-1_2718 {
    width: 7.29%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2718.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-vector-1_2720 {
    width: 7.29%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2720.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-vector-1_2722 {
    width: 7.29%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2722.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-vector-1_2724 {
    width: 7.29%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2724.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-vector-1_2726 {
    width: 7.29%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2726.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 75%;
    right: 17.71%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-vector-1_2728 {
    width: 2.39%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2728.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 36.78%;
    bottom: 61.45%;
}
.Pixso-paragraph-1_2729 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(82, 196, 26, 1);
    width: 1.62%;
    height: 1.54%;
    position: absolute;
    left: 77.81%;
    right: 20.57%;
    top: 36.78%;
    bottom: 61.68%;
}
.Pixso-vector-1_2730 {
    width: 2.39%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2730.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 39.86%;
    bottom: 58.37%;
}
.Pixso-paragraph-1_2731 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(82, 196, 26, 1);
    width: 1.62%;
    height: 1.54%;
    position: absolute;
    left: 77.81%;
    right: 20.57%;
    top: 39.86%;
    bottom: 58.6%;
}
.Pixso-vector-1_2732 {
    width: 2.39%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2732.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 46.03%;
    bottom: 52.2%;
}
.Pixso-paragraph-1_2733 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(82, 196, 26, 1);
    width: 1.62%;
    height: 1.54%;
    position: absolute;
    left: 77.81%;
    right: 20.57%;
    top: 46.03%;
    bottom: 52.43%;
}
.Pixso-vector-1_2734 {
    width: 2.39%;
    height: 1.78%;
    background-image: url(@/assets/images/Vector_1_2734.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 49.11%;
    bottom: 49.11%;
}
.Pixso-paragraph-1_2735 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(82, 196, 26, 1);
    width: 1.62%;
    height: 1.55%;
    position: absolute;
    left: 77.81%;
    right: 20.57%;
    top: 49.11%;
    bottom: 49.34%;
}
.Pixso-vector-1_2736 {
    width: 2.39%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2736.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 58.37%;
    bottom: 39.86%;
}
.Pixso-paragraph-1_2737 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(82, 196, 26, 1);
    width: 1.62%;
    height: 1.54%;
    position: absolute;
    left: 77.81%;
    right: 20.57%;
    top: 58.37%;
    bottom: 40.09%;
}
.Pixso-vector-1_2738 {
    width: 2.39%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2738.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 61.45%;
    bottom: 36.78%;
}
.Pixso-paragraph-1_2739 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(82, 196, 26, 1);
    width: 1.62%;
    height: 1.54%;
    position: absolute;
    left: 77.81%;
    right: 20.57%;
    top: 61.45%;
    bottom: 37.01%;
}
.Pixso-vector-1_2740 {
    width: 2.39%;
    height: 1.78%;
    background-image: url(@/assets/images/Vector_1_2740.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 64.53%;
    bottom: 33.69%;
}
.Pixso-paragraph-1_2741 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(82, 196, 26, 1);
    width: 1.62%;
    height: 1.55%;
    position: absolute;
    left: 77.81%;
    right: 20.57%;
    top: 64.53%;
    bottom: 33.92%;
}
.Pixso-vector-1_2742 {
    width: 2.39%;
    height: 1.78%;
    background-image: url(@/assets/images/Vector_1_2742.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 55.2%;
    bottom: 43.02%;
}
.Pixso-paragraph-1_2743 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(245, 34, 45, 1);
    width: 1.72%;
    height: 1.55%;
    position: absolute;
    left: 77.81%;
    right: 20.47%;
    top: 55.2%;
    bottom: 43.25%;
}
.Pixso-vector-1_2744 {
    width: 2.39%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2744.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 52.2%;
    bottom: 46.03%;
}
.Pixso-paragraph-1_2745 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(245, 34, 45, 1);
    width: 1.72%;
    height: 1.54%;
    position: absolute;
    left: 77.81%;
    right: 20.47%;
    top: 52.2%;
    bottom: 46.26%;
}
.Pixso-vector-1_2746 {
    width: 2.39%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2746.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 77.45%;
    right: 20.16%;
    top: 42.95%;
    bottom: 55.28%;
}
.Pixso-paragraph-1_2747 {
    font-size: 12px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 20px;
    color: rgba(245, 34, 45, 1);
    width: 1.72%;
    height: 1.54%;
    position: absolute;
    left: 77.81%;
    right: 20.47%;
    top: 42.95%;
    bottom: 55.51%;
}
.Pixso-vector-1_2748 {
    width: 10.42%;
    height: 33.92%;
    background-image: url(@/assets/images/Vector_1_2748.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 33%;
    bottom: 33.08%;
}
.Pixso-vector-1_2749 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2749.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 33%;
    bottom: 63.92%;
}
.Pixso-paragraph-1_2750 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 8.86%;
    height: 1.7%;
    position: absolute;
    left: 83.07%;
    right: 8.07%;
    top: 33.69%;
    bottom: 64.61%;
}
.Pixso-vector-1_2751 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2751.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 36.08%;
    bottom: 60.83%;
}
.Pixso-vector-1_2753 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2753.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 39.17%;
    bottom: 57.75%;
}
.Pixso-vector-1_2755 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2755.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 42.25%;
    bottom: 54.66%;
}
.Pixso-vector-1_2757 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2757.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 45.34%;
    bottom: 51.58%;
}
.Pixso-vector-1_2759 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2759.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 48.42%;
    bottom: 48.5%;
}
.Pixso-vector-1_2761 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2761.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 51.5%;
    bottom: 45.41%;
}
.Pixso-vector-1_2763 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2763.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 54.59%;
    bottom: 42.33%;
}
.Pixso-vector-1_2765 {
    width: 10.42%;
    height: 3.09%;
    background-image: url(@/assets/images/Vector_1_2765.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 57.67%;
    bottom: 39.24%;
}
.Pixso-vector-1_2767 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2767.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 60.76%;
    bottom: 36.16%;
}
.Pixso-vector-1_2769 {
    width: 10.42%;
    height: 3.08%;
    background-image: url(@/assets/images/Vector_1_2769.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 82.29%;
    right: 7.29%;
    top: 63.84%;
    bottom: 33.08%;
}
.Pixso-vector-1_2771 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2771.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 36.78%;
    bottom: 61.45%;
}
.Pixso-paragraph-1_2772 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.69%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 36.78%;
    bottom: 61.53%;
}
.Pixso-vector-1_2773 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2773.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 39.86%;
    bottom: 58.37%;
}
.Pixso-paragraph-1_2774 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.7%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 39.86%;
    bottom: 58.44%;
}
.Pixso-vector-1_2775 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2775.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 42.95%;
    bottom: 55.28%;
}
.Pixso-paragraph-1_2776 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.69%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 42.95%;
    bottom: 55.36%;
}
.Pixso-vector-1_2777 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2777.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 46.03%;
    bottom: 52.2%;
}
.Pixso-paragraph-1_2778 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.7%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 46.03%;
    bottom: 52.27%;
}
.Pixso-vector-1_2779 {
    width: 3.74%;
    height: 1.78%;
    background-image: url(@/assets/images/Vector_1_2779.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 49.11%;
    bottom: 49.11%;
}
.Pixso-paragraph-1_2780 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.7%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 49.11%;
    bottom: 49.19%;
}
.Pixso-vector-1_2781 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2781.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 52.2%;
    bottom: 46.03%;
}
.Pixso-paragraph-1_2782 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.69%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 52.2%;
    bottom: 46.11%;
}
.Pixso-vector-1_2783 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2783.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 55.28%;
    bottom: 42.95%;
}
.Pixso-paragraph-1_2784 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.7%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 55.28%;
    bottom: 43.02%;
}
.Pixso-vector-1_2785 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2785.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 58.37%;
    bottom: 39.86%;
}
.Pixso-paragraph-1_2786 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.69%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 58.37%;
    bottom: 39.94%;
}
.Pixso-vector-1_2787 {
    width: 3.74%;
    height: 1.77%;
    background-image: url(@/assets/images/Vector_1_2787.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 61.45%;
    bottom: 36.78%;
}
.Pixso-paragraph-1_2788 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.7%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 61.45%;
    bottom: 36.85%;
}
.Pixso-vector-1_2789 {
    width: 3.74%;
    height: 1.78%;
    background-image: url(@/assets/images/Vector_1_2789.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.63%;
    right: 10.63%;
    top: 64.53%;
    bottom: 33.69%;
}
.Pixso-paragraph-1_2790 {
    font-size: 14px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: center;
    line-height: 22px;
    color: rgba(29, 33, 41, 1);
    width: 3.02%;
    height: 1.7%;
    position: absolute;
    left: 85.99%;
    right: 10.99%;
    top: 64.53%;
    bottom: 33.77%;
}
.Pixso-vector-1_2791 {
    width: 1.12%;
    height: 1.45%;
    background-image: url(@/assets/images/Boolean_operation_1_2791.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 7.07%;
    right: 91.81%;
    top: 29.08%;
    bottom: 69.47%;
}
.Pixso-paragraph-1_2802 {
    font-size: 16px;
    font-family: "PingFang SC-Medium";
    font-weight: 500;
    text-align: left;
    line-height: 22px;
    color: rgba(50, 50, 50, 1);
    white-space: nowrap;
    width: auto;
    height: 1.7%;
    position: absolute;
    left: 8.4%;
    top: 28.91%;
    bottom: 69.39%;
}
.Pixso-vector-1_2879 {
    width: 100%;
    height: 5.39%;
    background-image: url(@/assets/images/Vector_1_2879.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 14.96%;
    bottom: 79.65%;
}
.Pixso-vector-17_26 {
    width: 150px;
    height: 70px;
    background-image: url(@/assets/images/Group_17_26.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 113px;
    top: 194px;
}
.Pixso-vector-1_2892 {
    width: 1920px;
    height: 280px;
    background-image: url(@/assets/images/Vector_1_2892.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(calc(-50% + 0px)) translateY(calc(-50% + 510.5px));
}
.Pixso-group-33_237 {
    width: 338px;
    height: 42px;
    position: absolute;
    left: 1431.9990234375px;
    top: 90px;
}
.Pixso-vector-33_238 {
    width: 100%;
    height: 42px;
    background-image: url(@/assets/images/Vector_33_238.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0%;
    right: 0%;
    top: 50%;
    transform: translateY(calc(-50% + 0px));
}
.Pixso-paragraph-33_239 {
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
.Pixso-vector-33_240 {
    width: 7.39%;
    height: 25px;
    background-image: url(@/assets/images/Group_33_240.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 85.21%;
    right: 7.4%;
    top: 50%;
    transform: translateY(calc(-50% + 0.5px));
}
.Pixso-paragraph-33_785 {
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
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + -595px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_786 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + -391px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_787 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + 17px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_788 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + -187px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_789 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + 221px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-paragraph-33_790 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + 425px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-vector-33_791 {
    width: 204px;
    height: 5.39%;
    background-image: url(@/assets/images/Vector_33_791.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 50%;
    top: 14.96%;
    bottom: 79.65%;
    transform: translateX(calc(-50% + 627px));
}
.Pixso-paragraph-33_792 {
    font-size: 20px;
    font-family: "FZDaHei-B02S-Regular";
    font-weight: 400;
    line-height: 25px;
    color: rgba(255, 255, 255, 1);
    width: auto;
    height: auto;
    position: absolute;
    left: 50%;
    top: 16.73%;
    bottom: 81.34%;
    transform: translateX(calc(-50% + 627px));
    white-space: pre;
    flex-grow: 0;
}
.Pixso-group-34_80 {
    width: 460px;
    height: 170px;
    position: absolute;
    left: 50%;
    top: 1079px;
    transform: translateX(calc(-50% + 0px));
    user-select: text !important;
    -webkit-user-select: text !important;
    -moz-user-select: text !important;
    -ms-user-select: text !important;
    z-index: 100;
}
.Pixso-paragraph-34_81 {
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
}
.Pixso-paragraph-34_82 {
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
}
.Pixso-paragraph-34_83 {
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
}
.Pixso-paragraph-34_84 {
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
}
.query-breadcrumb-link {
  color: #848484;
  text-decoration: none;
}
.query-breadcrumb-link:hover {
  opacity: 0.9;
}
.query-breadcrumb-link:active,
.query-breadcrumb-link:visited {
  text-decoration: underline;
}
.query-breadcrumb-current {
  color: inherit;
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

/* 表格单元格文本对齐和溢出处理 */
.Pixso-frame-1_2501 p[id^="1_2528"],
.Pixso-frame-1_2501 p[id^="1_2530"],
.Pixso-frame-1_2501 p[id^="1_2532"],
.Pixso-frame-1_2501 p[id^="1_2534"],
.Pixso-frame-1_2501 p[id^="1_2536"],
.Pixso-frame-1_2501 p[id^="1_2538"],
.Pixso-frame-1_2501 p[id^="1_2540"],
.Pixso-frame-1_2501 p[id^="1_2542"],
.Pixso-frame-1_2501 p[id^="1_2544"],
.Pixso-frame-1_2501 p[id^="1_2546"],
.Pixso-frame-1_2501 p[id^="1_255"],
.Pixso-frame-1_2501 p[id^="1_256"],
.Pixso-frame-1_2501 p[id^="1_259"],
.Pixso-frame-1_2501 p[id^="1_260"],
.Pixso-frame-1_2501 p[id^="1_261"],
.Pixso-frame-1_2501 p[id^="1_262"],
.Pixso-frame-1_2501 p[id^="1_263"],
.Pixso-frame-1_2501 p[id^="1_264"],
.Pixso-frame-1_2501 p[id^="1_265"],
.Pixso-frame-1_2501 p[id^="1_266"],
.Pixso-frame-1_2501 p[id^="1_267"],
.Pixso-frame-1_2501 p[id^="1_268"],
.Pixso-frame-1_2501 p[id^="1_269"],
.Pixso-frame-1_2501 p[id^="1_270"],
.Pixso-frame-1_2501 p[id^="1_272"],
.Pixso-frame-1_2501 p[id^="1_273"],
.Pixso-frame-1_2501 p[id^="1_274"],
.Pixso-frame-1_2501 a[id^="1_277"] {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 根据数据行数动态调整页面高度，避免黑色区域显示 */
.table-rows-1 .Pixso-frame-1_2501,
.table-rows-2 .Pixso-frame-1_2501,
.table-rows-3 .Pixso-frame-1_2501 {
    height: 900px;
}

.table-rows-4 .Pixso-frame-1_2501,
.table-rows-5 .Pixso-frame-1_2501,
.table-rows-6 .Pixso-frame-1_2501 {
    height: 1100px;
}

.table-rows-7 .Pixso-frame-1_2501,
.table-rows-8 .Pixso-frame-1_2501,
.table-rows-9 .Pixso-frame-1_2501 {
    height: 1200px;
}

/* 隐藏证书类型的标签背景，改为纯文字显示 */
.Pixso-vector-1_2593,
.Pixso-vector-1_2595,
.Pixso-vector-1_2597,
.Pixso-vector-1_2599,
.Pixso-vector-1_2601,
.Pixso-vector-1_2603,
.Pixso-vector-1_2605,
.Pixso-vector-1_2607,
.Pixso-vector-1_2609,
.Pixso-vector-1_2611,
.Pixso-vector-1_2613 {
    display: none;
}

/* 将"查看详情"链接改为蓝色，表示可点击 */
.Pixso-paragraph-1_2772,
.Pixso-paragraph-1_2774,
.Pixso-paragraph-1_2776,
.Pixso-paragraph-1_2778,
.Pixso-paragraph-1_2780,
.Pixso-paragraph-1_2782,
.Pixso-paragraph-1_2784,
.Pixso-paragraph-1_2786,
.Pixso-paragraph-1_2788,
.Pixso-paragraph-1_2790 {
    color: #1890ff !important;
    cursor: pointer;
}

.Pixso-paragraph-1_2772:hover,
.Pixso-paragraph-1_2774:hover,
.Pixso-paragraph-1_2776:hover,
.Pixso-paragraph-1_2778:hover,
.Pixso-paragraph-1_2780:hover,
.Pixso-paragraph-1_2782:hover,
.Pixso-paragraph-1_2784:hover,
.Pixso-paragraph-1_2786:hover,
.Pixso-paragraph-1_2788:hover,
.Pixso-paragraph-1_2790:hover {
    color: #40a9ff !important;
    text-decoration: underline;
}

</style>
