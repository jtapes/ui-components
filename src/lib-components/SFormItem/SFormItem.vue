<template>
  <validation-provider
    v-slot="{ validated, valid, dirty, errors }"
    :name="name"
    :mode="validationMode"
    :immediate="immediate"
    tag="div"
    class="s-form-item"
    :rules="rules"
    :class="{ 's-form-item--required' : isObject(rules) && rules.hasOwnProperty('required') }"
  >
    <component
      :is="component"
      v-mask="mask"
      :value="value"
      v-bind="$attrs"
      :state="(validated || dirty) && !valid ? 'error' : $attrs.state"
      @change="handleValueChange"
    >
      <template v-for="(slot, index) in slots" #[slot.name]>
        <div
          :key="index"
          @click="slot.callback ? slot.callback : false"
          v-html="slot.content"
        />
        <svg-icon
          v-if="slot.icon"
          :key="`svg-${index}`"
          :name="slot.icon.name"
          :class="slot.icon.class"
          @click="slot.callback ? slot.callback : false"
        />
      </template>
    </component>
    <div
      v-if="errors.length"
      class="s-form-item__error"
    >
      <!-- @slot Слот для ошибок -->
      <slot name="errors" :errors="errors">
        <div v-for="(error, errorIndex) in errors" :key="`error-${errorIndex}`">
          <!-- @slot Слот для конкретной ошибки -->
          <slot v-if="error" :name="`error-${errorIndex}`" :error="error">
            {{ error }}
          </slot>
        </div>
      </slot>
    </div>
  </validation-provider>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Model,
  Vue,
} from 'vue-property-decorator'

import SAutocomplete from '@/lib-components/SAutocomplete/SAutocomplete.vue'
import SInput from '@/lib-components/SInput/SInput.vue'
import SCheckbox from '@/lib-components/SCheckbox/SCheckbox.vue'
import SCheckboxGroup from '@/lib-components/SCheckboxGroup/SCheckboxGroup.vue'
import SRadioGroup from '@/lib-components/SRadioGroup/SRadioGroup.vue'
import SSelect from '@/lib-components/SSelect/SSelect.vue'
import SRadio from '@/lib-components/SRadio/SRadio.vue'
import SDatePicker from '@/lib-components/SDatePicker/SDatePicker.vue'
import SPriceRange from '@/lib-components/SPriceRange/SPriceRange.vue'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'
import { MaskType } from '@/plugins/directives/mask'
import { isObject } from '@/utils/utils'

import { extend } from 'vee-validate'
import locale from './validation/locales/ru.json'
import { ValidationProvider } from 'vee-validate'
import * as validationRules from 'vee-validate/dist/rules'

for (const [rule, validation] of Object.entries(validationRules)) {
  extend(rule, {
    ...validation,
    message: (locale.messages as { [key: string]: any })[rule],
  })
}

import type { FormItemRulesType, SlotType } from '@/lib-components/SFormItem/SFormItem.type'

export const COMPONENT_TYPES = [
  's-input',
  's-checkbox',
  's-checkbox-group',
  's-select',
  's-radio',
  's-radio-group',
  's-price-range',
  's-date-picker',
  's-autocomplete'
]

@Component({
  components: {
    SAutocomplete,
    SInput,
    SCheckbox,
    SCheckboxGroup,
    SSelect,
    SRadio,
    SPriceRange,
    SDatePicker,
    SRadioGroup,
    SvgIcon,
    ValidationProvider
  }
})
export default class SFormItem extends Vue {
  @Prop({
    type: String,
    validator(value: any): boolean {
      return COMPONENT_TYPES.includes(value)
    },
  })
  component!: string

  @Model('change')
  value!: any

  @Prop({ type: String, default: ' ' })
  name!: string

  @Prop({ type: String, default: 'eager' })
  validationMode!: string

  @Prop({ type: Boolean, default: false })
  immediate!: boolean

  @Prop(Object)
  rules?: FormItemRulesType

  @Prop()
  mask?: MaskType

  @Prop({ type: Array, default: () => [] })
  slots!: SlotType[]

  handleValueChange(value: any): void {
    this.$emit('change', value)
  }

  isObject = isObject
}
</script>
