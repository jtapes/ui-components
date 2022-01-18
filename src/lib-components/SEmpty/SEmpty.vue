<template>
  <div class="s-empty">
    <div class="s-empty__title">
      <!-- @slot Слот для заголовка -->
      <slot name="title">
        <span class="text-xl color-font-muted">
          {{ title }}
        </span>
      </slot>
    </div>
    <div v-if="description || $slots.description" class="s-empty__description">
      <!-- @slot Слот для описания -->
      <slot name="description">
        {{ description }}
      </slot>
    </div>
    <div v-if="$slots.content" class="s-empty__content">
      <!-- @slot Слот для контента -->
      <slot name="content" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

/** Компонент для отображения информации, когда данных нет */
@Component
export default class SEmpty extends Vue {
  /** Заголовок */
  @Prop({ type: String, default: 'Нет данных' })
  title!: string

  /** Описание */
  @Prop(String)
  description?: string
}
</script>
