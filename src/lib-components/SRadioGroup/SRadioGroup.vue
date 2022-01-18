<template>
  <div class="s-radio-group">
    <s-input v-if="searchable" v-model="searchText">
      <template #append>
        <svg-icon name="search-24-32" class="icon-32 color-font-secondary" />
      </template>
    </s-input>
    <s-row
      v-if="filteredItems.length"
      class="s-radio-group__items"
      :class="{ 'mt-24': searchable }"
      :style="{ maxHeight: `${maxHeight}px` }"
      :gutter="20"
    >
      <s-col
        v-for="(item, index) in filteredItems"
        :key="index"
        :span="spanCount"
        class="s-radio-group__item"
      >
        <s-radio
          :checked-value="item.checkedValue"
          :label="item.label"
          :value="value"
          :state="item.state ? item.state : 'default'"
          multiple
          @change="handleValueChange"
        />
      </s-col>
    </s-row>
    <div v-else class="mt-24 color-font-secondary text-sm">
      Ничего не найдено
    </div>
    <a
      v-if="showMoreVisible"
      href="#"
      class="link d-f ai-c text-sm"
      @click.prevent="handleOpenedChange"
    >
      {{ opened ? 'Свернуть' : 'Показать еще' }}
      <svg-icon :name="opened ? 'minus-16' : 'plus-16'" class="icon-16 ml-4" />
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop, Watch } from 'vue-property-decorator'
import SRadio from '@/lib-components/SRadio/SRadio.vue'
import SInput from '@/lib-components/SInput/SInput.vue'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'
import SCol from '@/lib-components/SCol/SCol.vue'
import SRow from '@/lib-components/SRow/SRow.vue'
import type { SRadioValue } from '@/lib-components/SRadio/SRadio.type'
import type { SRadioGroupItem } from '@/lib-components/SRadioGroup/SRadioGroup.type'
import { SRadioGroupHiddenStates } from '@/lib-components/SRadioGroup/SRadioGroup.type'

const MAX_SPAN_COUNT = 24

/** Группа чекбоксов */
@Component({
  components: {
    SRadio,
    SInput,
    SvgIcon,
    SRow,
    SCol
  }
})
export default class SRadioGroup extends Vue {
  /** Массив чекбоксов */
  @Prop({ type: Array, required: true })
  items!: SRadioGroupItem[]

  /** Разбеение чекбоксов по колонкам */
  @Prop({ type: Number, default: 1 })
  columns!: number

  /** Отображение инпута для поиска */
  @Prop({ type: Boolean, default: true })
  searchable!: boolean

  /** Количество видемых чекбоксов до скрытия */
  @Prop({ type: Number, default: 3 })
  visibleCount!: number

  /** Тип скрытия */
  @Prop({
    type: String,
    default: SRadioGroupHiddenStates.SHOW_MORE,
    validator(value: string): boolean {
      return Object.values(SRadioGroupHiddenStates).includes(value as SRadioGroupHiddenStates)
    }
  })
  hiddenState!: string

  @Model('change')
  value!: SRadioValue | null

  searchText = ''
  opened = false
  maxHeight = 380

  get filteredItems(): SRadioGroupItem[] {
    let items = [...this.items]
    if (this.searchText) {
      items = items.filter((item: SRadioGroupItem) =>
        item.label.toLowerCase().includes(this.searchText.toLowerCase())
      )
    }

    if (
      items.length > this.visibleCount &&
      !this.opened &&
      this.hiddenState === SRadioGroupHiddenStates.SHOW_MORE
    ) {
      items.splice(this.visibleCount, items.length - 1)
    }

    return items
  }

  get showMoreVisible(): boolean {
    if(this.hiddenState !== SRadioGroupHiddenStates.SHOW_MORE) return false

    if (!this.searchText) {
      return this.items.length > this.visibleCount
    }

    return (
      this.items.filter((item: SRadioGroupItem) =>
        item.label.includes(this.searchText)
      ).length > this.visibleCount
    )
  }

  get spanCount(): number {
    return MAX_SPAN_COUNT / this.columns
  }

  @Watch('value')
  onValueChange(value: SRadioValue[] | null): void {
    if (!value || !value.length) {
      this.searchText = ''
    }
  }

  getContainerMaxHeight(): void {
    const items = document.querySelectorAll('.s-radio-group__item')
    let maxHeight = 0

    items.forEach((item, index) => {
      if(index + 1 > this.visibleCount) return

      const itemMargin = parseInt(window.getComputedStyle(item).marginBottom)
      maxHeight += (item.clientHeight + itemMargin)
    })

    this.maxHeight = maxHeight
  }

  handleOpenedChange(): void {
    this.opened = !this.opened
  }

  handleValueChange(value: SRadioValue[]): void {
    this.$emit('change', value)
  }

  mounted(): void {
    if(this.hiddenState === SRadioGroupHiddenStates.SCROLL) {
      this.getContainerMaxHeight()
    }
  }
}
</script>
