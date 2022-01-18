<template>
  <div ref="tag" class="s-tag text-sm" :class="tagClasses">
    <span class="s-tag__content">
      <!-- @slot Слот для контента тега  -->
      <slot>
        {{ label }}
      </slot>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

/** Компонент для отображения дополнительной информации */
@Component
export default class STag extends Vue {
  /** Цвет текста (наименование) */
  @Prop(String)
  textColor!: string

  /** Цвет фона (наименование) */
  @Prop(String)
  bgColor?: string

  /** Контент тега */
  @Prop(String)
  label!: string

  get tagClasses(): (string | null)[] {
    const color = `color-${this.textColor}`
    let backgroundColor = `bg-${this.textColor}`
    let filled = null

    if (this.bgColor) {
      backgroundColor = `bg-${this.bgColor}`
      filled = 's-tag--filled'
    }

    return [color, backgroundColor, filled]
  }
}
</script>
