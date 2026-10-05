import './assets/styles/font.css'
import './assets/styles/global.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  ElAlert,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElDescriptions,
  ElDescriptionsItem,
  ElDialog,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElOption,
  ElProgress,
  ElSelect,
  ElTag,
  ElUpload,
} from 'element-plus'
import 'element-plus/es/components/alert/style/css'
import 'element-plus/es/components/breadcrumb/style/css'
import 'element-plus/es/components/breadcrumb-item/style/css'
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/descriptions/style/css'
import 'element-plus/es/components/descriptions-item/style/css'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/icon/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/progress/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/tag/style/css'
import 'element-plus/es/components/upload/style/css'
import './styles.css'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)
const pinia = createPinia()

const elementComponents = [
  ElAlert,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElDescriptions,
  ElDescriptionsItem,
  ElDialog,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElOption,
  ElProgress,
  ElSelect,
  ElTag,
  ElUpload,
]

for (const component of elementComponents) {
  app.component(component.name!, component)
}

app.use(pinia)
app.use(router)

app.mount('#app')


declare global {
  interface Window {
    app: any;
  }
}
