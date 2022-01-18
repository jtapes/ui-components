import { mount } from '@vue/test-utils'
// import { fireEvent } from '@testing-library/dom'
import SInput from '@/lib-components/SInput/SInput.vue'

describe('SInput', () => {
  test('Snapshot', () => {
    const wrapper = mount(SInput)
    expect(wrapper.element).toMatchSnapshot()
  })
  test('$emit() работает', async () => {
    const wrapper = mount(SInput)

    const input = wrapper.find('input')
    await input.setValue('test text')

    expect(wrapper.emitted('change')).toBeTruthy()
  })
  test('$emit() работает', async () => {
    const wrapper = mount(SInput, {
      attachTo: document.body,
      propsData: {
        clearable: true,
        value: 'text',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('test text')
    await input.trigger('focus')

    const clearButton = wrapper.find('.s-input__clear')
    await clearButton.trigger('click')

    const emitted = wrapper.emitted('change')

    if (emitted) {
      expect(emitted.length).toBeGreaterThan(1)
      expect(emitted[1]).toEqual([])
    }
  })
  // test('Test not rounded input', () => {
  //   const wrapper = mount(SInput, {
  //     propsData: {
  //       rounded: false,
  //       placeholder: 'Введите',
  //     },
  //   })
  //
  //   const input = wrapper.find('input')
  //   fireEvent.focus(input.element)
  //   expect(wrapper.vm.$data.inputFocus).toBeTruthy()
  // })
})
