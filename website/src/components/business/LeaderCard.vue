<template>
  <div class="leader-card" @click="handleClick">
    <div class="leader-photo">
      <img :src="leader.photoUrl" :alt="leader.name" />
    </div>
    <div class="leader-info">
      <p class="leader-name">{{ leader.name }}</p>
      <p class="leader-position" v-html="formattedTitle"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Leader {
  name: string
  title: string
  duty: string
  bio: string
  experience: string
  actions: string
  photoUrl?: string
}

const props = defineProps<{
  leader: Leader
}>()

const emit = defineEmits<{
  click: []
}>()

// 处理职务换行（支持 \n）
const formattedTitle = computed(() => {
  return props.leader.title.replace(/\n/g, '<br>')
})

const handleClick = () => {
  emit('click')
}
</script>

<style scoped lang="scss">
.leader-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.leader-photo {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 0;
  background-color: #f5f5f5;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
}

.leader-info {
  width: 100%;
  text-align: center;
}

.leader-name {
  font-size: 25px;
  font-family: "Alibaba PuHuiTi-Regular", sans-serif;
  font-weight: 400;
  line-height: 25px;
  color: rgba(51, 51, 51, 1);
  margin: 0 0 8px 0;
  white-space: nowrap;
}

.leader-position {
  font-size: 20px;
  font-family: "FZHei-B01S-Regular", sans-serif;
  font-weight: 400;
  line-height: 30px;
  color: rgba(53, 120, 248, 1);
  margin: 0;
}
</style>
