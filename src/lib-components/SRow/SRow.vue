<template>
  <div
    class="s-row"
    :class="[
      `s-row--justify-${justify}`,
      `s-row--align-${align}`
    ]"
    :style="rowStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, ProvideReactive, Vue, Watch } from 'vue-property-decorator'
import { SRowStyle } from '@/lib-components/SRow/SRow.type'

/** Компонент для отображения дополнительной информации */
@Component
export default class SRow extends Vue {
  /** Отступ между колонками */
  @Prop(Number)
  gutter?: number

  @ProvideReactive('gutter')
  gutterCol?: number = this.gutter

  /** Горизонтальное выравнивание контента в flex строке */
  @Prop({ type: String, default: 'start' })
  justify!: string

  /** Вертикальное выравнивание контента в flex строке */
  @Prop({ type: String, default: 'center' })
  align!: string

  get rowStyle(): SRowStyle {
    if (this.gutter) {
      return {
        marginLeft: `-${this.gutter / 2}px`,
        marginRight: `-${this.gutter / 2}px`,
      }
    }
    return {}
  }

  @Watch('gutter')
  gutterChange(): void {
    this.gutterCol = this.gutter
  }
}
</script>
