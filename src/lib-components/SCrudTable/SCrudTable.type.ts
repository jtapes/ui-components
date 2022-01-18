import type { TFormFieldGroup } from '@/lib-components/SForm/SForm.type'

export type TableColumnType = {
  prop: string
  label: string
  width?: string
  type?: string
  inputFormat?: string
  outputFormat?: string
  sortable: boolean
  filterable: boolean
  filterSchema: TFormFieldGroup[]
} & { [key: string]: string }

export type TableActionsType = {
  create?: {
    url: string
    mode?: string
    method: string
  }
  read?: {
    url: string
    method: string
  }
  update?: {
    url: string
    mode?: string
    method: string
  }
  delete?: {
    url: string
    mode?: string
    method: string
  }
} & { [key: string]: { [key: string]: string } }

export type PaginationType = {
  page: number
  limit?: number
  total?: number
  pageCount?: number
  pagerCount: number
}

export type SortType = {
  order: string | null
  prop: string
}
