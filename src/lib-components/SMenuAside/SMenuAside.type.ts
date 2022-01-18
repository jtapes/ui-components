export type ElementColumnType = {
  name: string
  url?: string
  type?: string
  active?: boolean
  iconPrepend?: string
  iconAppend?: string
  data?: any
  child?: {
    menu: ElementColumnType[][]
    header?: ElementColumnType
  }
  parentColumn?: {
    menu: ElementColumnType[][]
    header?: ElementColumnType
  }
  parentElement?: ElementColumnType
  column?: {
    menu: ElementColumnType[][]
    header?: ElementColumnType
  }
}

export type ColumnType = {
  menu: ElementColumnType[][]
  header?: ElementColumnType & {
    close?: boolean
  }
}

export type ItemsMenuType = ColumnType & {
  staticBlockMenu?: ElementColumnType[]
}
