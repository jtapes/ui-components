import { mount } from '@vue/test-utils'
import SAutocomplete from '@/lib-components/SAutocomplete/SAutocomplete.vue'

describe('SAutocomplete', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SAutocomplete)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('$emit() работает', async () => {
    const wrapper = mount(SAutocomplete)
    const input = wrapper.find('input')
    await input.setValue('test text')
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
