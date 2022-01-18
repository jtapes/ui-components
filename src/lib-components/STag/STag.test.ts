import { mount } from '@vue/test-utils'
import STag from '@/lib-components/STag/STag.vue'

describe('STag', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(STag, {
      propsData: {
        label: '1213',
        bgColor: 'primary',
        textColor: 'primary-accent',
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
