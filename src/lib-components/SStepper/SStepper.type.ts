export enum EStepStatuses {
  WAIT = 'wait',
  ACTIVE = 'active',
  FINISH = 'finish',
}

export type SStepItemValue = number | string

export type SStepType = {
  title: string
  status: EStepStatuses
  value: SStepItemValue
}

export type SStepItemType = {
  title: string
  value: SStepItemValue
}
