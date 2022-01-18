import { mount } from '@vue/test-utils'
import SRadioGroup from '@/lib-components/SRadioGroup/SRadioGroup.vue'

describe('SRadioGroup', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SRadioGroup, {
      propsData: {
        items: [
          {
            label: '1',
            checkedValue: 1,
          },
        ],
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })

  test('RadioGroup should be change visible when opened', async () => {
    const wrapper = mount(SRadioGroup, {
      propsData: {
        items: [
          {
            label: '1',
            checkedValue: 1,
          },
          {
            label: '2',
            checkedValue: 2,
          },
          {
            label: '3',
            checkedValue: 3,
          },
          {
            label: '4',
            checkedValue: 4,
          },
        ],
      },
    })

    const showMoreButton = wrapper.find('a.link')
    expect(showMoreButton.text()).toBe('Показать еще')

    let radioCount = wrapper.findAll('.s-radio-group__item').length
    expect(radioCount).toBe(3)

    await showMoreButton.trigger('click')
    await wrapper.vm.$nextTick()

    radioCount = wrapper.findAll('.s-radio-group__item').length
    expect(radioCount !== 3).toBe(true)
    expect(showMoreButton.text()).toBe('Свернуть')
  })

  test('Should be filtered by search text and emitted by $emit()', async () => {
    const wrapper = mount(SRadioGroup, {
      propsData: {
        items: [
          {
            label: '1',
            checkedValue: 1,
          },
          {
            label: '2',
            checkedValue: 2,
          },
          {
            label: '3',
            checkedValue: 3,
          },
          {
            label: '4',
            checkedValue: 4,
          },
        ],
      },
    })

    wrapper.vm.$data.searchText = '1'
    await wrapper.vm.$nextTick()

    const radioCount = wrapper.findAll('.s-radio-group__item').length
    expect(radioCount).toBe(1)

    const radio = wrapper.find('input[type="radio"]')
    await radio.setChecked()
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
