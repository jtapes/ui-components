import Vue, { VNode } from 'vue'
import Dev from './serve.vue'
// To register individual components where they are used (serve.vue) instead of using the
// library as a whole, comment/remove this import and it's corresponding "Vue.use" call
import MarketUilibrary from '@/entry.esm'
Vue.use(MarketUilibrary)

import '@/theme/styles/main.scss'

Vue.config.productionTip = false

import { Table, TableColumn } from 'element-ui'
import 'element-ui/packages/theme-chalk/lib/table.css'
import 'element-ui/packages/theme-chalk/lib/table-column.css'
import ruLocale from 'element-ui/lib/locale/lang/ru-RU'
import locale from 'element-ui/lib/locale'
locale.use(ruLocale)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)

const requireAll = (requireContext: any) => requireContext.keys().forEach(requireContext)
requireAll((require as any).context('@/assets/icons/', true, /\.svg$/))

new Vue({
  render: (h): VNode => h(Dev),
}).$mount('#app')
