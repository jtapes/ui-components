<template>
  <div
    class="s-input"
    :class="[
      `s-input--${type}`,
      state ? `s-input--${state}` : '',
      {
        's-input--rounded': rounded,
        's-input--sm': size === 'sm',
      },
    ]"
  >
    <div v-if="$slots.prepend" class="s-input__prepend">
      <!-- @slot Слот для prepend элементов -->
      <slot name="prepend" />
    </div>
    <input
      ref="sInput"
      :disabled="state === 'disabled'"
      :readonly="state === 'readonly'"
      :value="value"
      :type="typeInput"
      :min="min"
      :max="max"
      class="s-input__inner"
      :class="{
        'ta-c': align === 'center',
        'ta-r' : align === 'right',
        's-input__inner--appended': $slots.append,
        's-input__inner--prepended': $slots.prepend,
      }"
      :placeholder="rounded ? placeholder : ''"
      @input="handleValueChange"
      @focus="inputFocus = true"
      @focusout="inputFocus = false"
      v-on="listeners"
    />
    <span
      v-if="placeholder && !rounded"
      class="s-input__placeholder"
      :class="{ 's-input__placeholder--focused': placeholderFocus }"
      @mousedown.prevent="inputFocus = true"
    >
      {{ placeholder }}
    </span>
    <div
      v-if="clearable && inputFocus && value"
      class="s-input__clear"
      @click="handleInputClear"
    >
      <svg-icon name="times-24-32" class="icon-32" />
    </div>
    <div v-if="$slots.append" class="s-input__append">
      <!-- @slot Слот для append элементов -->
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Model, Vue, Watch } from 'vue-property-decorator'
import { EInputState } from '@/lib-components/SInput/SInput.type'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'

/** Компонент для ввода данных */
@Component({
  components: {
    SvgIcon,
  }
})
export default class SInput extends Vue {
  inputFocus = false

  /** Тип инпута */
  @Prop({ type: String, default: 'text' })
  type!: string

  /** Максимальная длина */
  @Prop({ type: Number })
  max!: number

  /** Минимальная длина */
  @Prop({ type: Number })
  min!: number

  /** Свойство округления инпута */
  @Prop({ type: Boolean, default: true })
  rounded!: boolean

  /** Размер инпута */
  @Prop(String)
  size?: string

  /** Возможность очитски инпута */
  @Prop({ type: Boolean, default: false })
  clearable!: boolean

  /** Плэйсхолдер */
  @Prop(String)
  placeholder?: string

  /** Выравнивание текста в иннер инпуте */
  @Prop({ type: String, default: 'left' })
  align!: string

  /** V-model для инпута */
  @Model('change')
  value!: string | number | null

  /** Состояние ("disabled", "error", "readonly") */
  @Prop({
    type: String,
    validator(value: any): boolean {
      return !value || Object.values(EInputState).includes(value)
    },
  })
  state?: EInputState

  $refs!: {
    sInput: HTMLInputElement
  }

  @Watch('inputFocus')
  handleInputFocus(isFocused: boolean): void {
    if (isFocused) {
      this.$refs.sInput.focus()
    }
  }

  get listeners() {
    return {
      ...this.$listeners,
      change: this.handleValueChange,
    }
  }

  get typeInput(): string | null {
    return this.type === 'number' ? null : this.type
  }

  get placeholderFocus(): string | number | boolean | null {
    return this.value || this.inputFocus
  }

  handleValueChange(event: InputEvent): void {
    const target = event.target as HTMLInputElement
    if (target) {
      const value = target.value
      this.$emit('change', value)
    }
  }

  handleInputClear(): void {
    this.$emit('change')
  }
}
</script>
