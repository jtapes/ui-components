import { mount } from '@vue/test-utils'
import Pagination from '@/lib-components/SPagination/SPagination.vue'

describe('Pagination', () => {
  const wrapper: any = mount(Pagination, {
    propsData: {
      page: 1,
      pageCount: 10,
      pagerCount: 5,
    },
  })
  let prevBtn = wrapper.find('.s-pagination__arrow--prev')
  let nextBtn = wrapper.find('.s-pagination__arrow--next')
  let pages = wrapper.findAll('.s-pagination__page')

  test('Control buttons visible test', async () => {
    await wrapper.setProps({
      page: 1,
      pageCount: 10,
      pagerCount: 5,
    })
    prevBtn = wrapper.find('.s-pagination__arrow--prev')
    nextBtn = wrapper.find('.s-pagination__arrow--next')
    expect(prevBtn.isVisible()).toBeFalsy()
    expect(nextBtn.isVisible()).toBeTruthy()

    await wrapper.setProps({
      page: 10,
      pageCount: 10,
      pagerCount: 5,
    })
    prevBtn = wrapper.find('.s-pagination__arrow--prev')
    nextBtn = wrapper.find('.s-pagination__arrow--next')
    expect(prevBtn.isVisible()).toBeTruthy()
    expect(nextBtn.isVisible()).toBeFalsy()
  })

  test('Props test', async () => {
    await wrapper.setProps({
      page: 2,
      pageCount: 10,
      pagerCount: 5,
    })
    pages = wrapper.findAll('.s-pagination__page')
    expect(pages.length).toBe(5)

    expect(pages.at(1).classes('s-pagination__page--active')).toBeTruthy()

    prevBtn = wrapper.find('.s-pagination__arrow--prev')
    nextBtn = wrapper.find('.s-pagination__arrow--next')
    expect(prevBtn.isVisible()).toBeTruthy()
    expect(nextBtn.isVisible()).toBeTruthy()

    expect(pages.at(0).text()).toBe('1')
    expect(pages.at(1).text()).toBe('2')
    expect(pages.at(2).text()).toBe('3')
    expect(pages.at(3).text()).toBe('4')
    expect(pages.at(4).text()).toBe('10')

    expect(wrapper.find('.s-pagination__ellipsis')).toBeTruthy()
  })

  test('Change page', async () => {
    await wrapper.setProps({
      page: 1,
      pageCount: 10,
      pagerCount: 5,
    })
    const elemNumber = 4
    pages = wrapper.findAll('.s-pagination__page')
    await pages.at(elemNumber - 1).trigger('click')

    await wrapper.setProps({
      page: wrapper.emitted('change')[0][0],
      pageCount: 10,
      pagerCount: 5,
    })

    pages = wrapper.findAll('.s-pagination__page')
    expect(pages.length).toBe(5)
    expect(pages.at(2).classes('s-pagination__page--active')).toBeTruthy()
    expect(pages.at(0).text()).toBe('1')
    expect(pages.at(1).text()).toBe('3')
    expect(pages.at(2).text()).toBe('4')
    expect(pages.at(3).text()).toBe('5')
    expect(pages.at(4).text()).toBe('10')

    expect(wrapper.find('.s-pagination__ellipsis')).toBeTruthy()

    await wrapper.setProps({
      page: 1,
      pageCount: 10,
      pagerCount: 5,
    })
    prevBtn = wrapper.find('.s-pagination__arrow--prev')
    await prevBtn.trigger('click')
    expect(wrapper.vm.$props.page).toBe(1)

    await wrapper.setProps({
      page: 10,
      pageCount: 10,
      pagerCount: 5,
    })
    nextBtn = wrapper.find('.s-pagination__arrow--next')
    await nextBtn.trigger('click')
    expect(wrapper.vm.$props.page).toBe(10)

    await wrapper.setProps({
      page: 1,
      pageCount: 1,
    })
    prevBtn = wrapper.find('.s-pagination__arrow--prev')
    nextBtn = wrapper.find('.s-pagination__arrow--next')
    expect(prevBtn.isVisible()).toBeFalsy()
    expect(nextBtn.isVisible()).toBeFalsy()
  })

  test('Mobile mode', async () => {
    await wrapper.setProps({
      page: 2,
      pageCount: 10,
      pagerCount: 5,
      mobileMode: true,
    })
    pages = wrapper.findAll('.s-pagination__page')

    expect(pages.at(0).text()).toBe('1')
    expect(pages.at(1).text()).toBe('2')
    expect(pages.at(2).text()).toBe('3')
    expect(pages.at(3).text()).toBe('4')
    expect(pages.at(4).text()).toBe('5')
  })
})
