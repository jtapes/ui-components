<template>
  <label
    class="s-radio text-sm"
    :class="[
      {
        's-radio--checked': value === checkedValue,
        's-radio--contented': $slots.content,
      },
      `s-radio--${mode}`,
      `s-radio--${state}`,
    ]"
  >
    <div class="d-f">
      <div class="s-radio__input">
        <div class="s-radio__inner" />
        <input
          class="s-radio__original"
          type="radio"
          aria-hidden="false"
          :value="checkedValue"
          :checked="value === checkedValue"
          :disabled="state === 'disabled'"
          @change="handleModelChange"
        />
      </div>
      <div class="s-radio__label" :class="{ bold: mode === 'grid' }">
        <!--  @slot Слот для контента checkbox   -->
        <slot>{{ label }}</slot>
      </div>
      <div
        v-if="$slots.description"
        class="s-radio__description"
        :class="{ 'color-font-muted': state === 'disabled' }"
      >
        <!-- @slot Слот для доп. описания к label -->
        <slot name="description" />
      </div>
    </div>
    <div v-if="mode === 'grid' && $slots.content" class="s-radio__content">
      <!-- @slot Слот для контента в radio с модом grid -->
      <slot name="content" />
    </div>
  </label>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop } from 'vue-property-decorator'

import type { SRadioValue } from '@/lib-components/SRadio/SRadio.type'

/** Компонент для выбора одного из значений */
@Component
export default class SRadio extends Vue {
  @Model('change')
  value!: SRadioValue

  /** Значение radio button */
  @Prop()
  checkedValue!: SRadioValue

  /** Ярлык checkbox */
  @Prop(String)
  label?: string

  /** Тип радио кнопки */
  @Prop({ type: String, default: 'default' })
  mode!: string

  /** Состояние радио ("disabled", "error") */
  @Prop({ type: String, default: 'default' })
  state!: string

  handleModelChange(): void {
    this.$emit('change', this.checkedValue)
  }
}
</script>
