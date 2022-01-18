import { mount } from '@vue/test-utils'
import SRadio from '@/lib-components/SRadio/SRadio.vue'

describe('SRadio', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SRadio, {
      propsData: {
        value: 1,
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  test('Is emitted by $emit()', async () => {
    const wrapper = mount(SRadio, {
      propsData: {
        value: 1,
      },
    })

    const input = wrapper.find('input[type="radio"]')
    await input.setChecked()

    expect(wrapper.emitted('change')).toBeTruthy()
  })
  test('Label of radio exist label prop', () => {
    const label = 'Radio'

    const wrapper = mount(SRadio, {
      propsData: {
        label,
      },
    })

    const labelContent = wrapper.find('.s-radio__label')

    expect(labelContent.text()).toBe(label)
  })
})
