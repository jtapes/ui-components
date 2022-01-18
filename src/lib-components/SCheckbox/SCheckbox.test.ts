import { mount } from '@vue/test-utils'
import SCheckbox from '@/lib-components/SCheckbox/SCheckbox.vue'

describe('SCheckbox', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SCheckbox, {
      propsData: {
        value: 1,
      },
      stubs: ['svg-icon', 'nuxt-link'],
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  test('Is emitted by $emit()', async () => {
    const wrapper = mount(SCheckbox, {
      propsData: {
        value: 1,
        multiple: true,
      },
      stubs: ['svg-icon', 'nuxt-link'],
    })

    const input = wrapper.find('input[type="checkbox"]')
    await input.setChecked((input.element as HTMLInputElement).checked)
    await input.trigger('change')
    expect(wrapper.emitted('change')).toBeTruthy()
  })
  test('Label of checkbox exist label prop && emit on not multiple value', async () => {
    const label = 'Checkbox'

    const wrapper = mount(SCheckbox, {
      propsData: {
        value: 1,
        checkedValue: 1,
        label,
      },
      stubs: ['svg-icon', 'nuxt-link'],
    })

    const labelContent = wrapper.find('.s-checkbox__label')
    expect(labelContent.text()).toBe(label)

    const input = wrapper.find('input[type="checkbox"]')
    await input.setChecked((input.element as HTMLInputElement).checked)
    await input.trigger('change')

    await wrapper.setProps({
      value: 1,
      checkedValue: undefined,
      label,
    })
    await input.setChecked((input.element as HTMLInputElement).checked)
    await input.trigger('change')

    expect(wrapper.emitted('change')).toBeTruthy()
  })
  test('multiple with array value', async () => {
    const wrapper = mount(SCheckbox, {
      propsData: {
        value: [1],
        multiple: true,
        checkedValue: 1,
      },
      stubs: ['svg-icon', 'nuxt-link'],
    })

    const input = wrapper.find('input[type="checkbox"]')
    await input.setChecked((input.element as HTMLInputElement).checked)
    await input.trigger('change')
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
