import { mount } from '@vue/test-utils'
import SBreadcrumbs from '@/lib-components/SBreadcrumbs/SBreadcrumbs.vue'

describe('SBreadcrumbs', () => {
  test('Is Vue snapshot', () => {
    const wrapper = mount(SBreadcrumbs, {
      propsData: {
        breadcrumbs: [
          { label: 'Каталог', link: 'catalog' },
          { label: 'Сортовой прокат', link: 'sortovoy-prokat' },
          { label: 'Лист горячетканый горячетканый горячетканый' },
        ],
      },
      stubs: ['svg-icon', 'nuxt-link'],
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})
