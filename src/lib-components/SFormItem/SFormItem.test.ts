import { mount } from '@vue/test-utils'
import Vue from 'vue'
import SFormItem from '@/lib-components/SFormItem/SFormItem.vue'
import mask from '@/plugins/directives/mask'

Vue.use(mask)

describe('SFormItem', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SFormItem, {
      propsData: {
        component: 's-input',
      },
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
