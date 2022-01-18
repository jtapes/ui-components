export type SAutocompleteItem<T> = {
  text: string
  value: T
}

export type SAutocompleteItemValue = { [key: string]: any } | string | number
