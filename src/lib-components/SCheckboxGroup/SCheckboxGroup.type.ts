import { SCheckboxValue, SCheckboxStates } from '@/lib-components/SCheckbox/SCheckbox.type'

export type SCheckboxGroupItem = {
  label: string
  checkedValue: SCheckboxValue
  state?: SCheckboxStates
}

export enum SCheckboxGroupHiddenStates {
  SHOW_MORE = 'show-more',
  SCROLL = 'scroll'
}
