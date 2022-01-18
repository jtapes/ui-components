import { mount } from '@vue/test-utils'
import SHint from '@/lib-components/SHint/SHint.vue'

describe('SHint', () => {
  const hintContent = 'Подсказка'

  const template = `
    <s-hint content="${hintContent}" v-model="hintVisible">
      <span>Hover</span>
    </s-hint>
  `

  test('Is Vue snapshot', () => {
    const wrapper = mount({
      template,
      components: { SHint },
      data: () => ({
        hintVisible: true,
      }),
    })

    expect(wrapper.element).toMatchSnapshot()
  })
  test('Should change visible with v-model', async () => {
    const wrapper = mount({
      template,
      components: { SHint },
      data: () => ({
        hintVisible: true,
      }),
    })


    await wrapper.trigger('mouseleave')
    await wrapper.vm.$nextTick()

    const hint = wrapper.find('.s-hint__wrapper')

    expect(hint.element.classList.contains('s-hint__wrapper--hidden')).toBe(true)
    expect(wrapper.vm.$data.hintVisible).toBe(false)
  })
  test('Should change visible without v-model', async () => {
    const wrapper = mount({
      template: `
        <s-hint content="${hintContent}">
          <span>Hover</span>
        </s-hint>
      `,
      components: { SHint },
    })
    const hint = wrapper.find('.s-hint__wrapper')

    await wrapper.trigger('mouseenter')
    expect(hint.element.classList.contains('s-hint__wrapper--hidden')).toBe(false)

    await wrapper.trigger('mouseleave')
    expect(hint.element.classList.contains('s-hint__wrapper--hidden')).toBe(true)
  })
  test('Component should has content of content prop', () => {
    const wrapper = mount({
      template,
      components: { SHint },
      data: () => ({
        hintVisible: true,
      }),
    })

    expect(wrapper.find('.s-hint__content').text()).toBe(hintContent)
  })
})
