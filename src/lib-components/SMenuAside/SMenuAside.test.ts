import { mount } from '@vue/test-utils'
import SMenuAside from '@/lib-components/SMenuAside/SMenuAside.vue'

describe('MenuAside', () => {
  test('Init menu amd static', () => {
    const wrapper: any = mount(SMenuAside, {
      propsData: {
        logo: 'logo',
        items: {
          header: {
            name: 'Предыдущая страница',
            url: '/',
          },
          menu: [
            [
              {
                name: 'Главная',
                iconAppend: 'burger',
              },
              {
                name: 'Заказы',
                active: true,
              },
              {
                name: 'Финансы',
                child: {
                  menu: [
                    [
                      {
                        name: 'Поддержка',
                      },
                    ],
                  ],
                },
              },
              {
                name: 'Программа лояльности',
                iconPrepend: 'burger',
              },
              {
                name: 'Профиль',
              },
              {
                name: 'Компания',
                url: '/',
                type: 'link',
              },
            ],
          ],
          staticBlockMenu: [
            {
              name: 'Склад',
              url: '/',
              type: 'link',
            },
            {
              name: 'Аукционы',
              url: '/',
              type: 'link',
            },
            {
              name: 'Производство',
              url: '/',
              type: 'link',
            },
          ],
        },
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Init menu active', () => {
    const wrapper: any = mount(SMenuAside, {
      propsData: {
        logo: 'logo',
        items: {
          header: {
            name: 'Предыдущая страница',
            url: '/',
          },
          menu: [
            [
              {
                name: 'Главная',
                iconAppend: 'burger',
              },
              {
                name: 'Заказы',
                active: true,
                child: {
                  menu: [
                    [
                      {
                        name: 'О компании',
                        active: true,
                      },
                    ],
                  ],
                },
              },
              {
                name: 'Финансы',
                child: {
                  menu: [
                    [
                      {
                        name: 'Поддержка',
                      },
                    ],
                  ],
                },
              },
              {
                name: 'Программа лояльности',
                iconPrepend: 'burger',
              },
              {
                name: 'Профиль',
              },
              {
                name: 'Компания',
                url: '/',
                type: 'link',
              },
            ],
          ],
          staticBlockMenu: [
            {
              name: 'Склад',
              url: '/',
              type: 'link',
            },
            {
              name: 'Аукционы',
              url: '/',
              type: 'link',
            },
            {
              name: 'Производство',
              url: '/',
              type: 'link',
            },
          ],
        },
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  test('Menu hover click event', async () => {
    const wrapper: any = mount(SMenuAside, {
      propsData: {
        logo: 'logo',
        items: {
          header: {
            name: 'Предыдущая страница',
            url: '/',
          },
          menu: [
            [
              {
                name: 'Главная',
                iconAppend: 'burger',
              },
              {
                name: 'Заказы',
                active: true,
                child: {
                  menu: [
                    [
                      {
                        name: 'О компании',
                        active: true,
                      },
                    ],
                  ],
                },
              },
              {
                name: 'Финансы',
                child: {
                  menu: [
                    [
                      {
                        name: 'Поддержка',
                      },
                    ],
                  ],
                },
              },
              {
                name: 'Программа лояльности',
                iconPrepend: 'burger',
              },
              {
                name: 'Профиль',
              },
              {
                name: 'Компания',
                url: '/',
                type: 'link',
              },
            ],
          ],
        },
      },
    })

    const hoverElement = wrapper.find('.aside-menu-column__header')
    expect(hoverElement.text()).toBe('Меню')
    await hoverElement.trigger('click')
    expect(hoverElement.text()).toBe('Меню')
    expect(wrapper.findAll('.aside__column--children').length).toBe(1)

    await hoverElement.trigger('click')
    expect(hoverElement.text()).toBe('Предыдущая страница')
    expect(wrapper.findAll('.aside__column--children').length).toBe(0)

    const element = wrapper.findAll('.menu-item').at(2) // финансы
    await element.trigger('mouseover')
    expect(wrapper.findAll('.aside__column--children').length).toBe(1)
  })
})
