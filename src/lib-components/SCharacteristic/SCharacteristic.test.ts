import { mount } from '@vue/test-utils'
import SCharacteristic from '@/lib-components/SCharacteristic/SCharacteristic.vue'

describe('SCharacteristic', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SCharacteristic, {
      propsData: {
        nameIcon: 'length',
        name: 'length',
        value: 2000,
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })
  test('should be "console.log" without "name" prop', () => {
    const consoleWarnMock = jest.spyOn(console, 'error').mockImplementation()
    const wrapper = mount(SCharacteristic, {})
    expect(consoleWarnMock).toHaveBeenCalledTimes(1)
    expect(wrapper.text()).toBe('')
    consoleWarnMock.mockRestore()
  })

  test.each(['',null,undefined,'any_text'])
  ('should be without "svg" when prop nameIcon="%s"', (a) => {
    const wrapper = mount(SCharacteristic, {
      propsData: {
        nameIcon: a,
        name: 'length',
      },
    })
    expect(wrapper.find('svg').exists()).toBeFalsy()
    wrapper.destroy()
  })

  test('should be "name" characteristics without icon', () => {
    const value = '2000'
    const wrapper = mount(SCharacteristic, {
      propsData: {
        name: 'length',
        value,
      },
    })
    expect(wrapper.find('svg').exists()).toBeFalsy()
    expect(wrapper.text()).toBe(value)
  })

  test('should be "name" characteristics with icon and special class', () => {
    const nameIcon = 'length'
    const wrapper = mount(SCharacteristic, {
      propsData: {
        nameIcon,
        name: 'length',
        value: '3000',
      },
    })
    expect(wrapper.find('svg').exists()).toBeTruthy()
    expect(wrapper.find('svg').classes().join()).toContain(nameIcon)
  })

})
