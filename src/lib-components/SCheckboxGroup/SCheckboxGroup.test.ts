import { mount } from '@vue/test-utils'
import SCheckboxGroup from '@/lib-components/SCheckboxGroup/SCheckboxGroup.vue'

describe('SCheckboxGroup', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SCheckboxGroup, {
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

  test('CheckboxGroup should be change visible when opened', async () => {
    const wrapper = mount(SCheckboxGroup, {
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

    let checkboxCount = wrapper.findAll('.s-checkbox-group__item').length
    expect(checkboxCount).toBe(3)

    await showMoreButton.trigger('click')
    await wrapper.vm.$nextTick()

    checkboxCount = wrapper.findAll('.s-checkbox-group__item').length
    expect(checkboxCount !== 3).toBe(true)
    expect(showMoreButton.text()).toBe('Свернуть')
  })

  test('Should be filtered by search text and emitted by $emit()', async () => {
    const wrapper = mount(SCheckboxGroup, {
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

    const checkboxCount = wrapper.findAll('.s-checkbox-group__item').length
    expect(checkboxCount).toBe(1)

    const checkbox = wrapper.find('input[type="checkbox"]')
    await checkbox.setChecked((checkbox.element as HTMLInputElement).checked)
    await checkbox.trigger('change')
    expect(wrapper.emitted('change')).toBeTruthy()
  })
})
