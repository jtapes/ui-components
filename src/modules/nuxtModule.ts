function nuxtifyMarketUiLibrary(this: any): void {
  const { nuxt } = this
  nuxt.options.alias = {
    ...nuxt.options.alias,
    '~vue-slider-component': 'node_modules/vue-slider-component',
    '~vue2-datepicker': 'node_modules/vue2-datepicker',
  }
}

export default nuxtifyMarketUiLibrary
