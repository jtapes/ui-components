import { SlotType } from '@/lib-components/SFormItem/SFormItem.type'
import { MaskType } from '@/plugins/directives/mask'
import { EInputState } from '@/lib-components/SInput/SInput.type'
import { SCheckboxValue } from '@/lib-components/SCheckbox/SCheckbox.type'
import { SCheckboxGroupItem } from '@/lib-components/SCheckboxGroup/SCheckboxGroup.type'
import { SRadioValue } from '@/lib-components/SRadio/SRadio.type'
import { SSelectItem, SSelectItemValue } from '@/lib-components/SSelect/SSelect.type'
import {
  SAutocompleteItem,
  SAutocompleteItemValue
} from '@/lib-components/SAutocomplete/SAutocomplete.type'
import {
  EFormItemTypes,
  EFormFieldStatus,
  EFormFieldComplexLayout,
  FormValidationMode
} from '@/lib-components/SForm/SForm.enum'
import type { SRadioGroupItem } from '@/lib-components/SRadioGroup/SRadioGroup.type'

export type FormRulesType = {
  name: string
  params?: Array<string | number>
}

export type TFormFieldBase = {
  name: string
  valueName: string
  itemType: string
  condition?: () => boolean
  status?: EFormFieldStatus
  classes?: string[]
  style?: string
  slots?: SlotType[]
}

export type TFormFieldPriceRange = TFormFieldBase & {
  itemType: EFormItemTypes.PRICERANGE
  options: {
    min: number
    max: number
  }
}

export type TFormFieldDatePicker = TFormFieldBase & {
  itemType: EFormItemTypes.DATEPICKER
  options: {
    format?: string
    placeholder?: string
    state?: string
    range?: boolean
  }
}

export type TFormFieldInput = TFormFieldBase & {
  itemType: EFormItemTypes.INPUT
  mask?: MaskType
  rules?: FormRulesType[]
  validationMode?: FormValidationMode
  immediate?: boolean
  options?: {
    type?: string
    placeholder?: string
    clearable?: boolean
    size?: string
    rounded?: boolean
    state?: EInputState
  }
}

export type TFormFieldCheckbox = TFormFieldBase & {
  itemType: EFormItemTypes.CHECKBOX
  rules?: FormRulesType[]
  validationMode?: FormValidationMode
  immediate?: boolean
  options?: {
    label?: string
    multiple?: boolean
    checkedValue?: SCheckboxValue
  }
}

export type TFormFieldCheckboxGroup = TFormFieldBase & {
  itemType: EFormItemTypes.CHECKBOX_GROUP
  rules?: FormRulesType[]
  validationMode?: FormValidationMode
  immediate?: boolean
  options?: {
    items: SCheckboxGroupItem[]
    columns?: number
    searchable?: boolean
    visibleCount?: number
    hiddenState?: string
  }
}

export type TFormFieldRadio = TFormFieldBase & {
  itemType: EFormItemTypes.RADIO
  rules?: FormRulesType[]
  validationMode?: FormValidationMode
  immediate?: boolean
  options: {
    label?: string
    checkedValue: SRadioValue
  }
}

export type TFormFieldRadioGroup = TFormFieldBase & {
  itemType: EFormItemTypes.RADIO_GROUP
  rules?: FormRulesType[]
  validationMode?: FormValidationMode
  immediate?: boolean
  options: {
    items: SRadioGroupItem[]
    columns?: number
    searchable?: boolean
    visibleCount?: number
    hiddenState?: string
  }
}

export type TFormFieldSelect = TFormFieldBase & {
  itemType: EFormItemTypes.SELECT
  rules?: FormRulesType[]
  validationMode?: FormValidationMode
  immediate?: boolean
  options: {
    placeholder?: string
    items: SSelectItem<SSelectItemValue>[] | number[] | string[]
    itemText?: string
    itemValue?: string
    multiple?: boolean
    rounded?: boolean
    searchable?: boolean
    appendToBody?: boolean
  }
}

export type TFormFieldAutocomplete = TFormFieldBase & {
  itemType: EFormItemTypes.AUTOCOMPLETE
  rules?: FormRulesType[]
  validationMode?: FormValidationMode
  immediate?: boolean
  options: {
    placeholder?: string
    items: SAutocompleteItem<SAutocompleteItemValue>[] | number[] | string[]
    itemText?: string
    itemValue?: string
    rounded?: boolean,
    size?: string,
    loading?: boolean
  }
}

export type TFormFieldItem =
  | string
  | TFormFieldInput
  | TFormFieldCheckbox
  | TFormFieldRadio
  | TFormFieldSelect
  | TFormFieldPriceRange
  | TFormFieldDatePicker
  | TFormFieldCheckboxGroup
  | TFormFieldRadioGroup
  | TFormFieldAutocomplete

export type TFormFieldGroup = {
  name?: string
  title?: string
  hint?: string
  maxLength?: number
  groupClass?: string
  condition?: () => boolean
  errorMessage?: string
  layout:
    | 'row'
    | 'column'
    | {
        type: 'row'
        gutter: number
      }
    | {
        type: EFormFieldComplexLayout.GRID_COLUMN
        columnCount: number
      }
    | {
        type: EFormFieldComplexLayout.TABLE
        ratio: string
        flow?: 'row' | 'column'
        gaps?: {
          column?: string
          row?: string
        }
        collapses?: { [key: number]: { [key in 'column' | 'row']?: string } }
      }
  fields: TFormFieldItem[]
}
