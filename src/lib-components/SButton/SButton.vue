<template>
  <button
    class="s-button"
    :disabled="state === 'disabled'"
    :class="[
      `s-button--${mode}`,
      `s-button--${size}`,
      {
        's-button--inverse': inverse,
        's-button--rounded': rounded,
        's-button--circle': mode === 'icon' || mode === 'favorite' || circle,
        's-button--active': state === 'active',
      },
    ]"
    :type="type"
    v-on="$listeners"
  >
    <div v-if="$slots.prepend" class="s-button__prepend">
      <!-- @slot Слот для вставки перед контентом кнопки -->
      <slot name="prepend" />
    </div>

    <div class="s-button__content" :class="contentClass">
      <!-- @slot Слот для контента кнопки -->
      <slot />
    </div>

    <span v-if="badge" class="badge">{{ badge }}</span>

    <div v-if="$slots.append" class="s-button__append">
      <!-- @slot Слот для вставки после контента кнопки -->
      <slot name="append" />
    </div>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'

@Component({
  components: {
    SvgIcon,
  }
})
export default class SButton extends Vue {
  /** Свойство типа кнопки */
  @Prop({ type: String, default: 'button' })
  type!: string

  /** Свойство режима кнопки */
  @Prop({ type: String, default: 'default' })
  mode!: string

  /** Свойство округления кнопки */
  @Prop({ type: Boolean, default: true })
  rounded!: boolean

  /** Форма кнопки (круглая) */
  @Prop({ type: Boolean, default: false })
  circle!: boolean

  /** Размер кнопки ("xs", "sm", "md") */
  @Prop({ type: String, default: 'md' })
  size!: string

  /** Badge - значок с количеством чего-либо  */
  @Prop(Number)
  badge?: number

  /** Инверсированная кнопка */
  @Prop({ type: Boolean, default: false })
  inverse!: boolean

  /** Состояние кнопки ("disabled", "active") */
  @Prop({ type: String, default: 'default' })
  state!: string

  /** Дополнительные классы для контента кнопки */
  @Prop(String)
  contentClass?: string
}
</script>
