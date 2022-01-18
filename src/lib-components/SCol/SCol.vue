<template>
  <div
    class="s-col"
    :class="colClassList"
    :style="colStyle"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, InjectReactive } from 'vue-property-decorator'
import { SColSizeObject, SColStyle } from '@/lib-components/SCol/SCol.type'

/** Компонент для отображения дополнительной информации */
@Component
export default class SCol extends Vue {
  @InjectReactive('gutter')
  gutter!: number

  /** Размер колонки относительно сетки (сетка состоит из 24 колонок) (по умолчанию span = 24) */
  @Prop({ type: String, default: 'start' })
  align!: string

  /** Размер колонки относительно сетки (сетка состоит из 24 колонок) (по умолчанию span = 24) */
  @Prop({ type: [Number, Object], default: 24 })
  span!: number | SColSizeObject

  /** Отступ до колонки слева */
  @Prop(Number)
  offset?: number

  /** Размер колонки (адаптив) (size = xs) */
  @Prop([Number, Object])
  xs?: number | SColSizeObject

  /** Размер колонки (адаптив) (size = sm) */
  @Prop([Number, Object])
  sm?: number | SColSizeObject

  /** Размер колонки (адаптив) (size = md) */
  @Prop([Number, Object])
  md?: number | SColSizeObject

  /** Размер колонки (адаптив) (size = lg) */
  @Prop([Number, Object])
  lg?: number | SColSizeObject

  /** Размер колонки (адаптив) (size = xl) */
  @Prop([Number, Object])
  xl?: number | SColSizeObject

  get colClassList(): string[] {
    const colClass = []

    const sizesProps: { [key: string]: number | undefined | SColSizeObject } = {
      xs: this.xs,
      sm: this.sm,
      md: this.md,
      lg: this.lg,
      xl: this.xl,
    }

    Object.keys(sizesProps).forEach((size) => {
      if (typeof sizesProps[size] === 'number') {
        colClass.push(`s-col-${size}-${sizesProps[size]}`)
      } else if (typeof sizesProps[size] === 'object') {
        const sizeProp = sizesProps[size] as SColSizeObject
        if (sizeProp?.offset) {
          colClass.push(`s-col-${size}-offset-${sizeProp.offset}`)
        }
        if (sizeProp?.span !== undefined) {
          colClass.push(`s-col-${size}-${sizeProp.span}`)
        }
        if (sizeProp?.align) {
          colClass.push(`s-col-${size}--align-${sizeProp.align}`)
        }
      }
    })

    if (typeof this.span === 'number') {
      colClass.push(`s-col-${this.span}`)
    } else if (typeof this.span === 'object') {
      if (this.span.offset) {
        colClass.push(`s-col-offset-${this.span.offset}`)
      }
      if (this.span.span !== undefined) {
        colClass.push(`s-col-${this.span.span}`)
      }
      if (this.span.align) {
        colClass.push(`s-col--align-${this.span.align}`)
      }
    }

    if (this.align) {
      colClass.push(`s-col--align-${this.align}`)
    }

    return colClass
  }

  get colStyle(): SColStyle {
    if (this.gutter) {
      return {
        paddingLeft: `${this.gutter / 2}px`,
        paddingRight: `${this.gutter / 2}px`,
      }
    } else {
      return {}
    }
  }
}
</script>
