import loader from '@/plugins/directives/loader'
import { createLocalVue, mount } from '@vue/test-utils'
import SButton from '@/lib-components/SButton/SButton.vue'

describe('Loading directive', () => {
  const localVue = createLocalVue()
  localVue.use(loader)

  test('Loading spinner insert to the element', () => {
    const wrapper = mount(
      {
        template: '<div> <s-button v-loading="isLoading">Content</s-button> </div>',
        components: { SButton },
        data: () => ({
          isLoading: true,
        }),
      },
      { localVue }
    )

    const spinner = wrapper.find('.s-loader')

    expect(wrapper.find('.s-button').classes('s-loader--relative')).toBeTruthy()
    expect(spinner.element).toBeDefined()
    wrapper.destroy()
  })
  test('Test component styles on loader', () => {
    const borderRadius = '45%'
    const wrapper = mount(
      {
        template: `<div>
          <s-button v-loading="isLoading" style="border-radius: ${borderRadius}">Content</s-button>
        </div>`,
        components: { SButton },
        data: () => ({
          isLoading: true,
        }),
      },
      { localVue }
    )

    const spinner = wrapper.find('.s-loader')
    expect(getComputedStyle(spinner.element).borderRadius).toBe(borderRadius)
  })
  test('Test update hook in directive', async () => {
    const wrapper = mount(
      {
        template: '<div> <s-button v-loading="isLoading">Content</s-button> </div>',
        components: { SButton },
        data: () => ({
          isLoading: true,
        }),
      },
      { localVue }
    )
    const spinner = wrapper.find('.s-loader')

    wrapper.vm.$data.isLoading = false
    await wrapper.vm.$nextTick()
    expect(spinner.isVisible()).toBe(false)
  })
  test('Component should has modifier', () => {
    const wrapper = mount(
      {
        template: '<div> <s-button v-loading.group="isLoading">Content</s-button> </div>',
        components: { SButton },
        data: () => ({
          isLoading: true,
        }),
      },
      { localVue }
    )

    const spinner = wrapper.find('.s-loader')
    expect(spinner.classes('s-loader--group')).toBeTruthy()
  })
})
