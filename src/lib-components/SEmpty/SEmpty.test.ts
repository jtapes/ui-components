import { mount } from '@vue/test-utils'
import SEmpty from '@/lib-components/SEmpty/SEmpty.vue'
import SButton from '@/lib-components/SButton/SButton.vue'

describe('SEmpty', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SEmpty, {
      propsData: {
        title: 'Нет подходящих товаров',
        description: 'Попробуйте изменить условия в фильтрах',
      },
      stubs: {
        's-button': SButton,
      },
      slots: {
        content: `
          <s-button mode="outline">
            Очистить фильтр
            <template #append>
              <svg-icon name="close-24-32" class="icon-32" />
            </template>
          </s-button>`,
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
