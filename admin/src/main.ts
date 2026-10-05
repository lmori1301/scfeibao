import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import { installTableScrollReset } from './composables/useTableScrollReset'
import '@/assets/styles/variables.scss'
import '@/assets/styles/global.scss'
import '@/assets/styles/element.scss'
import '@/assets/styles/list-page.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})

// 列表表格：数据更新 / 分页 / 切换筛选后把滚动位置复位到左上角
router.afterEach(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll<HTMLElement>('.el-table .el-scrollbar__wrap').forEach((wrap) => {
      if (wrap.scrollTop) wrap.scrollTop = 0
      if (wrap.scrollLeft) wrap.scrollLeft = 0
    })
  })
})
installTableScrollReset()

app.mount('#app')
