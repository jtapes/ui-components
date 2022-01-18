import { mount } from '@vue/test-utils'
import SSlider from '@/lib-components/SSlider/SSlider.vue'

describe('SSlider', () => {
  const wrapper = mount(SSlider, {
    propsData: {
      value: 150,
      max: 200,
      min: 100,
    },
  })
  test('process', () => {
    const position = 50
    const reg = RegExp(`width: ${position}%`)
    const styles = wrapper.find('.vue-slider-process').attributes('style') || ''
    expect(reg.test(styles)).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })

  test('range', async () => {
    await wrapper.setProps({ value: [110, 150] })

    const position = 40
    const leftPosition = 10
    const reg = RegExp(`left: ${leftPosition}%; width: ${position}%;`)
    const styles = wrapper.find('.vue-slider-process').attributes('style') || ''
    expect(reg.test(styles)).toBeTruthy()
    expect(wrapper.element).toMatchSnapshot()
  })
})
