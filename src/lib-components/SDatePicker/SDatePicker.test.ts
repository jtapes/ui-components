import { mount } from '@vue/test-utils'
import SDatePicker from '@/lib-components/SDatePicker/SDatePicker.vue'

describe('SDatePicker', () => {
  test('SDatePicker', () => {
    const wrapper: any = mount(SDatePicker, {
      propsData: {
        value: new Date('2021-08-23'),
      },
    })
    expect(wrapper.find('input').element.value).toBe('23.08.2021')
    expect(wrapper.element).toMatchSnapshot()
  })

  test('SDatePicker range', () => {
    const wrapper: any = mount(SDatePicker, {
      propsData: {
        value: [new Date('2021-08-23'), new Date('2021-09-24')],
        range: true,
      },
    })
    expect(wrapper.findAll('input').wrappers[0].element.value).toBe(
      '23.08.2021'
    )
    expect(wrapper.findAll('input').wrappers[1].element.value).toBe(
      '24.09.2021'
    )
    expect(wrapper.element).toMatchSnapshot()
  })
})
