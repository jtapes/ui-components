import { mount } from '@vue/test-utils'
import SSort from '@/lib-components/SSort/SSort.vue'

describe('SSort', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SSort, {
      propsData: {
        value: {
          field: 'price',
          method: 'desc',
        },
        sortItems: [
          {
            label: 'по цене',
            field: 'price',
          },
          {
            label: 'по количеству',
            field: 'amount',
          },
          {
            label: 'по размеру',
            field: 'length',
          },
        ],
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })
  test('Is emitted by $emit', async () => {
    const wrapper = mount(SSort, {
      propsData: {
        value: {
          field: 'price',
          method: 'desc',
        },
        sortItems: [
          {
            label: 'по цене',
            field: 'price',
          },
          {
            label: 'по количеству',
            field: 'amount',
          },
          {
            label: 'по размеру',
            field: 'length',
          },
        ],
      },
    })

    const sortItem = wrapper.find('.link')
    await sortItem.trigger('click')
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
