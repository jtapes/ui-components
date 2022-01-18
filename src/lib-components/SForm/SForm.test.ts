import { createLocalVue, mount } from '@vue/test-utils'
import SForm from '@/lib-components/SForm/SForm.vue'
import mask from '@/plugins/directives/mask'

describe('SForm', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SForm, {
      propsData: {
        schema: [],
        model: {},
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  test('Simple schema', () => {
    const localVue = createLocalVue()
    localVue.use(mask)
    const wrapper = mount(
      {
        template: '<s-form v-model="model" :schema="schema" />',
        components: { SForm },
        data: () => ({
          model: {
            storageValue: null,
            isInStockValue: null,
          },
          schema: [
            {
              name: 'sklad',
              title: 'Склад',
              layout: 'column',
              fields: [
                {
                  itemType: 'select',
                  name: 'storageField',
                  valueName: 'storageValue',
                  rules: [{ name: 'required' }],
                  options: {
                    items: ['Череповец (СМ)', 'Москва (Толбино)', 'Воронеж'],
                  },
                },
                {
                  itemType: 'checkbox',
                  name: 'isInStock',
                  valueName: 'isInStockValue',
                  rules: [{ name: 'required' }],
                  options: {
                    label: 'Сейчас в наличии',
                  },
                },
              ],
            },
          ],
        }),
      },
      { localVue }
    )
    expect(wrapper.findAll('.fields-group__block').length).toBe(1)
    expect(wrapper.findAll('.fields-group__field').length).toBe(2)
  })
})
