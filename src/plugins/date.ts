import { format } from 'date-fns'
import parse from 'date-fns/parse/index.js'
import ru from 'date-fns/locale/ru'

const customFormat = (date: Date | number, formatting: string, options?: any) => {
  return format(date, formatting, {
    ...options,
    locale: ru
  })
}

const secondsToFormat = (
  seconds: number | string,
  formatting: string
) => {
  return format(parse(seconds as string, 't', new Date()), formatting)
}

const dateToFormat = (
  date: Date | string,
  inputFormat: string,
  outputFormat: string
) => {
  return format(parse(date as string, inputFormat, new Date()), outputFormat)
}

export { customFormat as format, parse, secondsToFormat, dateToFormat }
