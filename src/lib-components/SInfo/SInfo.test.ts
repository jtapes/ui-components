import { mount } from '@vue/test-utils'
import SInfo from '@/lib-components/SInfo/SInfo.vue'

describe('SInfo', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SInfo, {
      propsData: {
        type: 'success',
        message: 'Test',
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })
  test('Test error type', () => {
    const wrapper = mount(SInfo, {
      propsData: {
        type: 'error',
        message: 'Test',
      },
    })

    expect(wrapper.vm.$props.type).toBe('error')
  })
  test('Test warning type', () => {
    const wrapper = mount(SInfo, {
      propsData: {
        type: 'warning',
        message: 'Test',
      },
    })

    expect(wrapper.vm.$props.type).toBe('warning')
  })
})
