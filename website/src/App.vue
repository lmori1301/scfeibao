<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import zhCn from 'element-plus/es/locale/lang/zh-cn';

window.app = getCurrentInstance();
</script>
