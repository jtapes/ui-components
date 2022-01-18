import { mount } from '@vue/test-utils'
import SButton from '@/lib-components/SButton/SButton.vue'

describe('SButton', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SButton)
    expect(wrapper.element).toMatchSnapshot()
  })
  test('Button contains badge with badge prop', () => {
    const badge = 2
    const wrapper = mount(SButton, {
      propsData: {
        badge,
      },
    }).find('.badge')
    expect(wrapper.text()).toBe(String(badge))
  })
})
