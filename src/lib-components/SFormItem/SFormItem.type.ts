export type SlotType = {
  name: string
  content?: string
  icon?: {
    name: string
    class: string
  }
  callback?: Function
}

export type FormItemRulesType = {
  [key: string]: undefined | number | string | number[] | string[]
}
