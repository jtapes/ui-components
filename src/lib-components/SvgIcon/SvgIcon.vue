<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="svg-icon"
    :class="`svg-icon--${name}`"
    :width="width"
    :height="height"
  >
    <use :href="hrefIcon" :xlink:href="hrefIcon" />
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import _Vue from 'vue'
import type { SvgPluginOptionsType } from '@/lib-components/SvgIcon/SvgIcon.type'

const componentName = 'SvgIcon'
const defaultOptions: SvgPluginOptionsType = {
  spritePath: ''
}

@Component
export default class SvgIcon extends Vue {
  /** Название иконки */
  @Prop(String)
  name?: string

  /** Ширина иконки */
  @Prop([Number, String])
  width?: string | number

  /** Высота иконки */
  @Prop([Number, String])
  height?: string | number

  get hrefIcon(): string {
    return `${defaultOptions.spritePath}#${this.name}`
  }
}

export const SvgIconPlugin = {
  install(Vue: typeof _Vue, options: SvgPluginOptionsType = {}) {
    defaultOptions.spritePath =
      options.spritePath || defaultOptions.spritePath

    Vue.component(componentName, SvgIcon)
  }
}
</script>
