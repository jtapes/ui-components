import { mount } from '@vue/test-utils'
import SModal from '@/lib-components/SModal/SModal.vue'

describe('SModal', () => {
  const wrapper: any = mount(SModal, {
    slots: {
      default: 'Content',
    },
  })
  test('init', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
