import { mount } from '@vue/test-utils'
import SContentLoader from '@/lib-components/SContentLoader/SContentLoader.vue'

describe('SContentLoader', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SContentLoader, {
      propsData: {
        width: '100%',
        height: '100%',
        primaryColor: '#f4f4F4',
        secondaryColor: '#d9e2ec',
        primaryOpacity: 1,
        secondaryOpacity: 0,
        speed: 1,
        baseUrl: 'loader',
        animate: true,
        uniqueKey: 'uniqueKey-content'
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
