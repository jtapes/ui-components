import { mount } from '@vue/test-utils'
import SSelect from '@/lib-components/SSelect/SSelect.vue'

describe('SSelect', () => {
  const items = ['Значение 1', 'Значение 2']

  test('Is Vue snapshot', () => {
    const wrapper = mount(SSelect, {
      propsData: {
        multiple: true,
        searchable: true,
        items,
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  test('Is emitted by $emit()', async () => {
    const wrapper = mount({
      template: `
        <s-select
          v-model="selectedValue"
          :items="items"
          :multiple="isMultiple"
          @change="change"
        />`,
      components: { SSelect },
      data: () => ({
        isMultiple: true,
        items,
        selectedValue: [],
      }),
      methods: {
        change(value) {
          this.$emit('change', value)
        },
      },
    })

    let selectItem = wrapper.find('input[type="checkbox"]')
    await selectItem.setChecked()
    await selectItem.trigger('change')

    await wrapper.setData({
      isMultiple: false,
    })
    selectItem = wrapper.find('.s-select__item')
    await selectItem.trigger('click')

    expect(wrapper.emitted('change')).toBeTruthy()
  })
  test('Close select when click on body', async () => {
    const wrapper = mount(SSelect, {
      propsData: {
        items,
      },
    })

    await wrapper.find('.s-select__toggler').trigger('click')
    await document.body.click()

    expect(wrapper.vm.$data.opened).toBe(false)
    wrapper.destroy()
  })
  test('Test with empty props', () => {
    const wrapper = mount(SSelect)

    expect(wrapper.vm.$props.items.length).toBe(0)
  })
})
