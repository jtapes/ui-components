<template>
  <div class="s-image" :style="wrapperSize">
    <div
      v-if="$slots.tags"
      class="s-image__tags"
      :class="[
        tagContainerClass,
        `s-image__tags--${tagsPlacement}`
      ]"
    >
      <!-- @slot Слот для тегов -->
      <slot name="tags" />
    </div>
    <!-- @slot Слот для контена при ошибке загрузки изображения -->
    <slot v-if="$slots.error && isError" name="error" />
    <img
      v-if="!isError || (!$slots.error && isError)"
      ref="image"
      class="s-image__inner"
      :src="src"
      :loading="lazy ? 'lazy' : 'eager'"
      :alt="alt"
      :style="imageStyle"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

enum TagPlacements {
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right'
}

/** Компонент для отображения фотографии */
@Component
export default class SImage extends Vue {
  isError = false

  /** Путь к изображению */
  @Prop({ type: String, default: '/images/no-photo.svg' })
  src!: string

  /** Альтернативный текст изображения */
  @Prop(String)
  alt?: string

  /** Альтернативный текст изображения */
  @Prop(String)
  fit?: string

  /** Ленивая загрузка (default = false) */
  @Prop({ type: Boolean, default: false })
  lazy!: boolean

  /** Ширина изображения */
  @Prop([String, Number])
  width?: string | number

  /** Высота изображения */
  @Prop([String, Number])
  height?: string | number

  /** Класс для контейнера тегов */
  @Prop(String)
  tagContainerClass?: string

  /** Расположение тегов ('top-left' (default) or 'top-right' or 'bottom-left' or 'bottom-right')  */
  @Prop({
    type: String,
    default: 'top-left',
    validator(placement: string): boolean {
      return Object.values(TagPlacements).includes(placement as TagPlacements)
    }
  })
  tagsPlacement!: string

  get wrapperSize(): object {
    return {
      width: Number.isInteger(this.width) ? `${this.width}px` : this.width,
      height: Number.isInteger(this.height) ? `${this.height}px` : this.height,
    }
  }

  get imageStyle(): object {
    return { 'object-fit': this.fit }
  }

  handleError(): void {
    const image = this.$refs.image as HTMLImageElement
    image.src = '/images/no-photo.svg'
    this.isError = true
  }

  mounted(): void {
    const image = this.$refs.image as EventTarget
    image.addEventListener('error', this.handleError, {
      once: true,
    })
  }

  beforeDestroy(): void {
    const image = this.$refs.image as EventTarget
    image.removeEventListener('error', this.handleError)
  }
}
</script>
