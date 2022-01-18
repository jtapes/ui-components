import _Vue, { PluginFunction } from 'vue'
import type { SvgPluginOptionsType } from '@/lib-components/SvgIcon/SvgIcon.type'

// Import vue components
import * as components from '@/lib-components/index'

// Import plugins
import * as plugins from '@/plugins/index'

// @ts-ignore
import { SvgIconPlugin } from '@/lib-components/SvgIcon/SvgIcon.vue'

// install function executed by Vue.use()
const install: PluginFunction<any> =
  function installMarketUilibrary(Vue: typeof _Vue, options: SvgPluginOptionsType = {}) {
  // Use svg plugin
  Vue.use(SvgIconPlugin, options)

  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component)
  })

  Object.entries(plugins).forEach(([_, plugin]) => {
    Vue.use(plugin)
  })
}

// Create module definition for Vue.use()
export default install

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index'

export * from '@/plugins/index'

export { SvgIconPlugin }
