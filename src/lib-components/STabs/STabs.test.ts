import { mount } from '@vue/test-utils'
import STabs from '@/lib-components/STabs/STabs.vue'

describe('STabs', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount({
      template: `
        <s-tabs v-model="activeTab" :tabs="tabs">
          <template #tab-1>
            <span class="mt-40">111</span>
          </template>
          <template #tab-2>
              <span>222</span>
          </template>
          <template #tab-3>
              <span>333</span>
          </template>
        </s-tabs>`,
      components: { STabs },
      data: () => ({
        activeTab: 'Пункт 1',
        tabs: ['Пункт 1', 'Пункт 2', 'Пункт 3'],
      }),
    })
    expect(wrapper.element).toMatchSnapshot()
  })
  test('Is emitted by $emit', async () => {
    const wrapper = mount(STabs, {
      propsData: {
        value: 'Пункт 1',
        tabs: ['Пункт 1', 'Пункт 2', 'Пункт 3'],
      },
    })

    const nextTab = wrapper.findAll('.s-tabs__header-item').wrappers[1]
    await nextTab.trigger('click')

    expect(wrapper.emitted('change')).toBeTruthy()
  })
  test('Test with empty props', () => {
    const wrapper = mount(STabs)

    expect(wrapper.vm.$props.tabs.length).toBe(0)
  })
})
