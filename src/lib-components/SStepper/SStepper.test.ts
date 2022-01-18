import { mount } from '@vue/test-utils'
import SStepper from '@/lib-components/SStepper/SStepper.vue'

describe('SStepper', () => {
  test('Is Vue snapshot', async () => {
    const wrapper = mount(SStepper, {})
    wrapper.setProps({
      steps: ['Корзина', 'Договор', 'Получение', 'Оплата'],
      value: 'Договор',
    })

    await wrapper.vm.$nextTick()
    const steppers = wrapper.findAll('.s-stepper-item')
    expect(steppers).toHaveLength(4)
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Another steps format', () => {
    const wrapper = mount(SStepper, {
      propsData: {
        steps: [
          {
            title: 'Корзина',
            value: 1
          },
          {
            title: 'Договор',
            value: 2
          },
          {
            title: 'Получение',
            value: 3
          },
          {
            title: 'Оплата',
            value: 4
          },
        ]
      }
    })

    const steppers = wrapper.findAll('.s-stepper-item')
    expect(steppers).toHaveLength(4)
  })
})
