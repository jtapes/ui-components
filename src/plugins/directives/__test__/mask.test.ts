import { createLocalVue, mount } from '@vue/test-utils'
import mask from '@/plugins/directives/mask'
import SInput from '@/lib-components/SInput/SInput.vue'

describe('Mask directive', () => {
  const localVue = createLocalVue()
  localVue.use(mask)

  test('Should update model value after bind', () => {
    const wrapper = mount(
      {
        template: '<div> <s-input v-mask="mask" v-model="value"/> </div>',
        components: { SInput },
        data: () => ({
          value: '11112011',
          mask: '##.##.####',
        }),
      },
      { localVue }
    )
    expect(wrapper.vm.$data.value).toBe('11.11.2011')
  })
  test('Test repeat token', () => {
    const wrapper = mount(
      {
        template: '<div> <s-input v-mask="mask" v-model="value"/> </div>',
        components: { SInput },
        data: () => ({
          value: '6546,456',
          mask: '#*.###',
        }),
      },
      { localVue }
    )
    expect(wrapper.vm.$data.value).toBe('6546.456')
  })
  test('Test custom tokens', () => {
    const wrapper = mount(
      {
        template: '<div> <s-input v-mask="mask" v-model="value"/> </div>',
        components: { SInput },
        data: () => ({
          value: '1243',
          mask: {
            mask: 'aaa',
            tokens: {
              a: { pattern: /[1-3]/ },
            },
          },
        }),
      },
      { localVue }
    )
    expect(wrapper.vm.$data.value).toBe('123')
    wrapper.destroy()
  })
})
