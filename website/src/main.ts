import './assets/styles/font.css'
import './assets/styles/global.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDescriptions,
  ElDescriptionsItem,
  ElIcon,
  ElInput,
  ElOption,
  ElSelect,
  ElTag,
} from 'element-plus'
import 'element-plus/es/components/breadcrumb/style/css'
import 'element-plus/es/components/breadcrumb-item/style/css'
import 'element-plus/es/components/descriptions/style/css'
import 'element-plus/es/components/descriptions-item/style/css'
import 'element-plus/es/components/icon/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/tag/style/css'
import './styles.css'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)
const pinia = createPinia()

const elementComponents = [
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDescriptions,
  ElDescriptionsItem,
  ElIcon,
  ElInput,
  ElOption,
  ElSelect,
  ElTag,
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
