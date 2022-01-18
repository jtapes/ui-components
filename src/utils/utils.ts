export const isObject = (obj: any): boolean => {
  return (
    typeof obj === 'object' &&
    !!obj &&
    Object.prototype.toString.call(obj) !== '[object Array]'
  )
}
