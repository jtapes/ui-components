import { mount } from '@vue/test-utils'
import SLoader from '@/lib-components/SLoader/SLoader.vue'

describe('SLoader', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SLoader)
    wrapper.vm.$data.visible = true
    expect(wrapper.element).toMatchSnapshot()
  })
  test('Should change visible', async () => {
    const wrapper = mount(SLoader)

    const loader = wrapper.find('.s-loader')
    expect(loader.isVisible()).toBe(false)

    wrapper.vm.$data.visible = true
    await wrapper.vm.$nextTick()
    expect(loader.isVisible()).toBe(true)
  })
})
