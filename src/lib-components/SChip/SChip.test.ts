import { mount } from '@vue/test-utils'
import SChip from '@/lib-components/SChip/SChip.vue'

describe('SChip', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SChip, {
      propsData: {
        closable: true,
      },
      stubs: ['svg-icon', 'nuxt-link'],
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  test('Is emitted by $emit()', async () => {
    const wrapper = mount(SChip, {
      propsData: {
        closable: true,
      },
      stubs: ['svg-icon', 'nuxt-link'],
    })

    const buttonClose = wrapper.find('.s-chip')
    await buttonClose.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })
  test('Count of chip exist count prop', () => {
    const count = 5
    const wrapper = mount(SChip, {
      propsData: {
        count,
      },
      stubs: ['svg-icon', 'nuxt-link'],
    })

    expect(wrapper.find('.s-chip__count').text()).toBe(String(count))
  })
})
