<template>
  <aside class="aside us-n">
    <div
      v-if="logo"
      class="aside__logo"
      :style="`width: ${columnWidth * (columns.length + 1)}px;`"
    >
      <svg-icon class="aside__logo-icon" :name="logo" />
    </div>
    <transition-group name="menu" :css="isAnimation">
      <div
        v-for="i of columns.length"
        :key="i"
        class="aside__column aside__column--children"
        :style="`left: ${columnWidth * i}px;`"
      >
        <s-aside-column
          :items="columns[i - 1]"
          @element-click="elementClick"
          @element-hover="elementHover($event, i + 1)"
        />
      </div>
    </transition-group>
    <div v-if="headColumn" class="aside__column">
      <s-aside-column
        :items="headColumn"
        :header-disable="true"
        @element-click="elementClick"
        @element-hover="elementHover"
        @header-click="headerClick"
      />
    </div>
  </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import SAsideColumn from './SMenuColumn.vue'
import type { ColumnType, ElementColumnType, ItemsMenuType } from './SMenuAside.type'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'

@Component({
  components: {
    SAsideColumn,
    SvgIcon,
  },
})
export default class SMenuAside extends Vue {
  columns: ColumnType[] = []
  headColumn: ColumnType | null = null
  columnWidth = 320
  isAnimation = true

  /** Меню */
  @Prop({ type: Object, required: true })
  items!: ItemsMenuType

  /** Логотип */
  @Prop({ type: String })
  logo?: string

  created(): void {
    this.setParent(this.items)
    const elementActive: ElementColumnType | null = this.searchActive(
      this.items.menu
    )
    if (elementActive?.column) {
      this.setHeadColumn(elementActive.column)
    } else {
      this.setHeadColumn(this.items)
    }
  }

  @Watch('columns', { deep: true })
  watchColumn(): void {
    const isDefaultColumn = !this.headColumn?.header?.child
    const name = 'Меню'
    if (this.headColumn?.header && this.items?.header && isDefaultColumn) {
      if (this.columns.length > 0) {
        this.headColumn.header.name = name
        this.headColumn.header.close = true
      } else {
        this.headColumn.header.name = this.items.header.name
        this.headColumn.header.close = false
      }
    }
  }

  // записать в первую колонку
  setHeadColumn(column: ColumnType): void {
    // определяем является ли колонка самым верхним уровнем вложенности
    const isDefaultColumn = !column.header?.child
    let header = null
    if (column.header) {
      header = { ...column.header }
      if (this.items.header) {
        header.name = isDefaultColumn ? this.items.header.name : 'Меню'
      }
    }
    this.headColumn = {
      header: header || undefined,
      menu: this.items.staticBlockMenu
        ? [...column.menu, this.items.staticBlockMenu]
        : column.menu,
    }
  }

  // создание ссылок на родителей
  setParent(
    items: ItemsMenuType,
    parentColumn: null | ColumnType = null,
    parentElement: null | ElementColumnType = null
  ): void {
    if (items.menu) {
      for (const block of items.menu) {
        for (const element of block) {
          element.column = items
          if (parentColumn && parentElement) {
            element.parentColumn = parentColumn
            element.parentElement = parentElement
          }
          if (element.child) {
            element.child.header = element
            if (element.child.header) {
              this.setParent(element.child, items, element)
            }
          }
        }
      }
    }
  }

  // поиск последнего активного элемента
  searchActive(
    menu: ColumnType['menu'],
    elementActive: ElementColumnType | null = null
  ): null | ElementColumnType {
    for (const block in menu) {
      for (const keyEl in menu[block]) {
        if (menu[block][keyEl].active) {
          const child = menu[block][keyEl].child
          if (child) {
            return this.searchActive(child.menu, menu[block][keyEl])
          } else {
            return menu[block][keyEl]
          }
        }
      }
    }
    return elementActive
  }

  // выстраиваем меню активных элементов
  menuActive(menu: ColumnType['menu'], depth = 1): void{
    for (const block in menu) {
      for (const keyEl in menu[block]) {
        if (menu[block][keyEl].active && menu[block][keyEl].child) {
          const child = menu[block][keyEl].child
          if (child) {
            this.$set(this.columns, depth - 1, child)
            if (child.menu) {
              this.menuActive(child.menu, depth + 1)
            }
          }
        }
      }
    }
  }

  // отключить все активные элементы меню
  menuRemoveActive(menu: ColumnType['menu'] = this.items.menu): void {
    for (const block in menu) {
      for (const keyEl in menu[block]) {
        if (menu[block][keyEl].active) {
          menu[block][keyEl].active = false
          this.$set(menu[block], keyEl, menu[block][keyEl])
        }
        if (menu[block][keyEl].child) {
          this.menuRemoveActive(menu[block][keyEl].child?.menu)
        }
      }
    }
  }

  // построить путь из вложенности активных элементов
  menuAddActive(element: ElementColumnType, isHeadColumn = true): void {
    if (element.parentElement) {
      element.parentElement.active = true
      if (isHeadColumn && element.column) {
        this.setHeadColumn(element.column)
      }
      this.menuAddActive(element.parentElement, false)
    }
  }

  elementClick(element: ElementColumnType): void {
    this.isAnimation = false
    this.menuRemoveActive()
    element.active = true
    this.menuAddActive(element)
    this.columns = []
    this.$nextTick(() => {
      this.isAnimation = true
    })
    this.$emit('element-click', element)
  }

  elementHover(element: ElementColumnType, depth = 1): void {
    if (element.child && element.child.menu) {
      this.removeAnimateColumn(this.columns.length - depth)
      element.child.header = element
      this.$set(this.columns, depth - 1, element.child)
    }
  }

  headerClick(header: ElementColumnType): void {
    if (header.column && this.headColumn) {
      this.setHeadColumn(this.items)
      this.menuActive(this.headColumn.menu)
    } else {
      this.isAnimation = false
      this.columns = []
      this.$nextTick(() => {
        this.isAnimation = true
      })
    }
    this.$emit('header-click', header)
  }

  // закрытие колонок меню
  removeAnimateColumn(count = this.columns.length): void {
    if (count > 0) {
      this.columns.pop()
      setTimeout(() => {
        this.removeAnimateColumn(count - 1)
      }, 200)
    }
  }

  closeColumn(event: Event): void {
    if (event.target) {
      const target = event.target as HTMLElement
      if (!target.closest('.aside')) {
        this.removeAnimateColumn()
      }
    }
  }

  mounted(): void {
    document.addEventListener('click', this.closeColumn)
  }

  destroy(): void {
    document.removeEventListener('click', this.closeColumn)
  }
}
</script>
