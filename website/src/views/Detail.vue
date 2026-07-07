<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { getNewsDetail } from '@/api/news';

const route = useRoute();
const newsDetail = ref(null);

// 取消重复请求
onUnmounted(() => {
  if (window.cancelNewsDetailRequest) {
    window.cancelNewsDetailRequest('页面销毁，取消请求');
  }
});

// 加载详情（添加防抖）
const loadDetail = async () => {
  try {
    const res = await getNewsDetail(route.params.id);
    newsDetail.value = res.data;
  } catch (error) {
    console.error('加载详情失败：', error);
  }
};

onMounted(() => {
  loadDetail();
});
</script>