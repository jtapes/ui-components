import { mount, createLocalVue } from '@vue/test-utils'
import mask from '@/plugins/directives/mask'
import { fireEvent } from '@testing-library/dom'
import SPriceRange from '@/lib-components/SPriceRange/SPriceRange.vue'

describe('SPriceRange', () => {
  const localVue = createLocalVue()
  localVue.use(mask)

  const wrapper = mount(SPriceRange, {
    localVue,
    propsData: {
      value: [10, 30],
      min: 0,
      max: 100,
    },
  })

  test('init', () => {
    const inputs = wrapper.findAll('input')
    const inputStartPrice = inputs.at(0).element as HTMLInputElement
    const inputEndPrice = inputs.at(1).element as HTMLInputElement

    expect(inputStartPrice.value).toEqual('10')
    expect(inputEndPrice.value).toEqual('30')
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Change input', async () => {
    const inputs = wrapper.findAll('input')
    const inputStartPrice = inputs.at(0).element as HTMLInputElement
    const inputEndPrice = inputs.at(1).element as HTMLInputElement

    await fireEvent.input(inputStartPrice, { target: { value: '35' } })
    await fireEvent.input(inputEndPrice, { target: { value: '5' } })
    const emitted = wrapper.emitted('change')
    expect(emitted).toBeTruthy()
  })
})
