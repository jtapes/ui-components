import { mount } from '@vue/test-utils'
import SProgressBar from '@/lib-components/SProgressBar/SProgressBar.vue'

describe('SProgressBar', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SProgressBar, {
      propsData: {
        progress: 25,
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  test('Test real width of bar', () => {
    const wrapper = mount(SProgressBar, {
      propsData: {
        progress: 25,
      },
    })
    const progressBar = wrapper.find('.s-progress-bar__progress')
    expect((progressBar.element as HTMLElement).style.width).toEqual('25%')
  })
})
