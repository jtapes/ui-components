export enum EFormItemTypes {
  INPUT = 'input',
  CHECKBOX = 'checkbox',
  CHECKBOX_GROUP = 'checkbox-group',
  DROPDOWN = 'dropdown',
  RADIO = 'radio',
  RADIO_GROUP = 'radio-group',
  SELECT = 'select',
  PRICERANGE = 'price-range',
  DATEPICKER = 'date-picker',
  AUTOCOMPLETE = 'autocomplete'
}

export enum EFormFieldStatus {
  ACTIVE = 'active',
  DISABLED = 'disabled',
  READONLY = 'readonly',
  LOAD = 'load',
}

export enum EFormFieldComplexLayout {
  GRID_COLUMN = 'grid-column',
  TABLE = 'table',
}

export enum FormValidationMode {
  AGGRESSIVE = 'aggressive',
  LAZY = 'lazy',
  PASSIVE = 'passive',
  EAGER = 'eager'
}
