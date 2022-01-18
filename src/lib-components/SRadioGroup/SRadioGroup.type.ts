import { SRadioValue, SRadioStates } from '@/lib-components/SRadio/SRadio.type'

export type SRadioGroupItem = {
  label: string
  checkedValue: SRadioValue
  state?: SRadioStates
}

export enum SRadioGroupHiddenStates {
  SHOW_MORE = 'show-more',
  SCROLL = 'scroll'
}
