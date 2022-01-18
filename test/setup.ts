import 'regenerator-runtime/runtime'
import 'jsdom-global/register'
import '@testing-library/jest-dom'
import Vue from 'vue'
import path from 'path'
import glob from 'glob'

Vue.config.productionTip = false
Vue.config.devtools = false

const mockComponents: string[] = ['SvgIcon']

mockComponents.forEach((component: string) => {
  Vue.component(component, { template: '<div class="mock-component"></div>' })
})

glob.sync(path.relative('/', '/src/*.vue')).forEach((file) => {
  const name = file.match(/(\w*)\.vue$/)
  if (name) {
    Vue.component(name[1], require(`@/${file}`).default)
  }
})
