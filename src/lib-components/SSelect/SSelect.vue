<template>
  <div
    class="s-select"
    :class="[
      `s-select--${state}`,
      {
        's-select--opened': opened,
        's-select--rounded': rounded,
      },
    ]"
  >
    <div ref="wrapper" class="s-select__wrapper">
      <div class="s-select__toggler" @click="handleOpenedChange">
        <s-input
          :value="currentValue"
          v-bind="$attrs"
          :state="state !== 'disabled' ? 'readonly': 'disabled'"
          :rounded="rounded"
          :placeholder="placeholder"
        >
          <template v-if="state !== 'disabled'" #append>
            <svg-icon name="dropdown-24-32" class="icon-32" />
          </template>
        </s-input>
      </div>
      <transition name="s-zoom-in-top">
        <div
          v-show="opened"
          ref="dropdown"
          class="s-select__dropdown text-sm"
          :class="{
            's-select__dropdown--opened': opened,
            's-select__dropdown--appended-to-body': appendToBody,
          }"
          :style="{ ...appendedToBodyPosition, ...appendedToBodySize }"
        >
          <div v-if="searchable" class="s-select__search">
            <s-input v-model="searchText" placeholder="Искать">
              <template #append>
                <svg-icon name="search-24-32" class="icon-32"/>
              </template>
            </s-input>
          </div>
          <div class="s-select__items">
            <template v-if="filteredItems.length">
              <template v-if="multiple">
                <s-checkbox
                  v-for="(item, index) in searchable ? filteredItems : mappedItems"
                  :key="index"
                  class="s-select__item ai-fs"
                  :value="value"
                  :checked-value="item.value"
                  multiple
                  @change="handleSelectedChange"
                >
                  <span class="s-select__item--multiple">{{ item.text }}</span>
                </s-checkbox>
              </template>
              <div
                v-for="(item, index) in searchable ? filteredItems : mappedItems"
                v-else
                :key="index"
                class="s-select__item"
                :class="{
                's-select__item--selected bold': item.value === value,
              }"
                @click="handleSelectedChange(item.value)"
              >
                {{ item.text }}
              </div>
            </template>
            <div v-else class="s-select__empty">
              <span class="color-font-muted">Ничего не найдено</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
import SInput from '@/lib-components/SInput/SInput.vue'
import SButton from '@/lib-components/SButton/SButton.vue'
import SCheckbox from '@/lib-components/SCheckbox/SCheckbox.vue'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'

import type { SSelectItem, SSelectItemValue } from '@/lib-components/SSelect/SSelect.type'

type AppendedToBodySize = {
  width?: string
}

type AppendedToBodyPosition = {
  top?: string
  left?: string
}

@Component({
  components: {
    SInput,
    SButton,
    SCheckbox,
    SvgIcon,
  },
})

export default class SSelect extends Vue {
  opened = false
  searchText = ''

  appendedToBodyPosition: AppendedToBodyPosition = {}
  appendedToBodySize: AppendedToBodySize = {}

  @Model('change')
  value!: SSelectItemValue

  /** Массив данных для контента */
  @Prop({ type: Array, default: () => [] })
  items!: SSelectItem<SSelectItemValue>[] | number[] | string[]

  /** Placeholder для селекта */
  @Prop({ type: String, default: 'Выберите' })
  placeholder!: string

  /** Название свойства для лэйбла */
  @Prop({ type: String, default: 'text' })
  itemText!: string

  /** Название свойства для значения */
  @Prop({ type: String, default: 'value' })
  itemValue!: string

  /** Отвечает за возможность выбирать множество значений */
  @Prop({ type: Boolean, default: false })
  multiple!: boolean

  /** Отвечает за возможность поиска в селекте */
  @Prop({ type: Boolean, default: false })
  searchable!: boolean

  /** Состояние радио ("disabled", "error") */
  @Prop({ type: String, default: 'default' })
  state!: string

  /** Свойство округления селекта */
  @Prop({ type: Boolean, default: true })
  rounded!: boolean

  /** Свойство выноса списка в body документа */
  @Prop({ type: Boolean, default: false })
  appendToBody!: boolean

  get mappedItems(): SSelectItem<SSelectItemValue>[] {
    return this.items.map((item: SSelectItemValue) => {
      const text = typeof item === 'object' ? item[this.itemText] : String(item)
      const value = typeof item === 'object' ? item[this.itemValue] : item
      return {
        text,
        value,
      }
    })
  }

  get filteredItems(): SSelectItem<SSelectItemValue>[] {
    return this.mappedItems.filter((item: SSelectItem<SSelectItemValue>) =>
      item.text.toLowerCase().includes(this.searchText.toLowerCase())
    )
  }

  get currentValue(): string {
    if (this.multiple && this.value && Array.isArray(this.value)) {
      return this.value.length
        ? `Выбрано ${this.value.length} ${this.declination}`
        : ''
    }

    const index = this.mappedItems.findIndex(
      (item) => item.value === this.value
    )
    return index !== -1 ? this.mappedItems[index].text : ''
  }

  get declination(): string {
    const cases = [2, 0, 1, 1, 1, 2]
    let number = this.multiple && this.value && Array.isArray(this.value) ? this.value.length : 0
    const words = ['значение', 'значения','значений']
    return words[
      number % 1 !== 0
        ? 1
        : number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ]
  }

  handleOpenedChange(): void {
    if (this.state !== 'disabled') {
      this.opened = !this.opened
      this.searchText = ''
      if (this.opened && this.appendToBody) {
        this.prepareDropdown()
      }
    }
  }

  prepareDropdown(): void {
    if (!this.$isServer) {
      this.$nextTick(async () => {
        if (this.$refs.wrapper && this.$refs.dropdown) {
          const slotRect = (this.$refs.wrapper as Element).getBoundingClientRect()
          this.appendedToBodySize = {
            width: `${slotRect.width}px`,
          }
          this.appendedToBodyPosition = {
            top: `${slotRect.top + slotRect.height + window.scrollY}px`,
            left: `${slotRect.left}px`,
          }
        }
      })
    }
  }

  close(e: MouseEvent): void {
    const element = e.target as Node

    if (!(this.$refs.dropdown as Node).contains(element) && !this.$el.contains(element)) {
      this.opened = false
      this.searchText = ''
    }
  }

  handleSelectedChange(value: SSelectItemValue): void {
    if (!this.multiple) {
      this.handleOpenedChange()
    }
    this.$emit('change', value)
  }

  mounted(): void {
    document.addEventListener('click', this.close, true)
    if (this.appendToBody) {
      document.body.append((this.$refs.dropdown as Node))
      this.prepareDropdown()
    }
  }

  beforeDestroy(): void {
    document.removeEventListener('click', this.close, true)
  }
}
</script>
