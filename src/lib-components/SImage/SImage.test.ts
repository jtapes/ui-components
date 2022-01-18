import { mount } from '@vue/test-utils'
import SImage from '@/lib-components/SImage/SImage.vue'

describe('SImage', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SImage)
    expect(wrapper.element).toMatchSnapshot()
  })
  test('Error load image', () => {
    const wrapper = mount(SImage, {
      propsData: {
        width: 200,
        height: 200,
        src: '/images/test-image.png',
      },
    })
    const image = wrapper.find('img')
    image.trigger('error')
    expect(wrapper.find('img').attributes('src')).toBeTruthy()
    wrapper.destroy()
  })
})
