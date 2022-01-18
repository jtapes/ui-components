<template>
  <label
    class="s-checkbox text-sm"
    :class="[
      `s-checkbox--${state}`,
      {
        's-checkbox--checked': isChecked,
      },
    ]"
  >
    <div class="s-checkbox__input">
      <div class="s-checkbox__inner">
        <svg-icon name="checked-16" class="icon-16" />
      </div>
      <input
        class="s-checkbox__original"
        type="checkbox"
        :checked="isChecked"
        aria-hidden="false"
        :value="checkedValue"
        :disabled="state === 'disabled'"
        @change="handleModelChange"
      />
    </div>
    <div v-if="label || $slots.default" class="s-checkbox__label">
      <!--  @slot Слот для контента checkbox   -->
      <slot>{{ label }}</slot>
    </div>
  </label>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop } from 'vue-property-decorator'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'
import type { SCheckboxValue } from '@/lib-components/SCheckbox/SCheckbox.type'

/** Компонент для выбора значения */
@Component({
  components: {
    SvgIcon,
  }
})
export default class SCheckbox extends Vue {
  @Model('change')
  value!: SCheckboxValue[] | SCheckboxValue | null

  /** Значение checkbox */
  @Prop()
  checkedValue?: SCheckboxValue

  /** Ярлык checkbox */
  @Prop(String)
  label?: string

  /** Возможность использовать один v-model на несколько checkbox */
  @Prop({ type: Boolean, default: false })
  multiple!: boolean

  /** Состояние чекбокса ("disabled", "error") */
  @Prop({ type: String, default: 'default' })
  state!: string

  get isChecked(): SCheckboxValue[] | SCheckboxValue | null {
    if (this.multiple && this.checkedValue !== undefined) {
      if (!Array.isArray(this.value)) return false

      return Array.isArray(this.value) && this.value.includes(this.checkedValue)
    }

    if (this.checkedValue === undefined) {
      return this.value
    }

    return this.checkedValue === this.value
  }

  handleModelChange(event: InputEvent): void {
    let input = this.value
    const element = event.target as HTMLInputElement

    if (this.multiple) {
      if (!Array.isArray(input)) {
        input = []
      }

      if (Array.isArray(input) && this.checkedValue !== undefined) {
        const index = input.indexOf(this.checkedValue)

        if (index !== -1) {
          input.splice(index, 1)
        } else {
          input.push(this.checkedValue)
        }
      }
    } else if (this.checkedValue !== undefined && element) {
      input = element.checked ? this.checkedValue : null
    } else if (element) {
      input = element.checked
    }

    this.$emit('change', input)
  }

  created(): void {
    if (this.multiple && !Array.isArray(this.value) && this.value) {
      this.$emit('change', [this.value])
    }
  }
}
</script>
