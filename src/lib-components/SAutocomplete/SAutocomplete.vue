<template>
  <div
    ref="wrapper"
    class="s-autocomplete"
    :class="{
      's-autocomplete--open' : opened,
      's-autocomplete--sm': size === 'sm',
      's-autocomplete--rounded': rounded,
      's-autocomplete--readonly': state === 'readonly',
      's-autocomplete--error': state === 'error'
    }"
  >
    <s-input
      :value="value"
      :size="size"
      v-bind="$attrs"
      :clearable="clearable"
      :rounded="rounded"
      :state="state"
      v-on="listeners"
      @focus="handleFocus"
    >
      <template v-if="!iconHidden" #append>
        <!-- @slot Слот для кастомной иконки -->
        <slot v-if="!loading" name="icon">
          <svg-icon name="search-24-32" class="icon-32" />
        </slot>
        <svg
          v-else
          class="s-loader-spinner icon-32 color-font-secondary"
          viewBox="0 0 32 32"
        >
          <circle
            class="s-loader-spinner__path"
            cx="16"
            cy="16"
            r="10"
            fill="none"
            stroke="currentColor"
          />
        </svg>
      </template>
    </s-input>
    <transition name="s-zoom-in-top">
      <div
        v-show="opened"
        ref="dropdown"
        class="s-autocomplete-suggestions"
        :style="{ ...appendedToBodyPosition, ...appendedToBodySize }"
      >
        <div
          v-if="!loading"
          class="s-autocomplete-suggestions__list"
        >
          <div
            v-for="(item, index) in mappedItems"
            :key="index"
            class="s-autocomplete-suggestions__item"
            @click="handleSelectedChange(item)"
          >
            <!-- @slot Слот для элемента списка -->
            <slot :item="item">
              <div class="text-sm">
                {{ item.text }}
              </div>
            </slot>
          </div>
          <div
            v-if="!items.length"
            class="s-autocomplete-suggestions__empty text-sm color-font-secondary"
          >
            Ничего не найдено
          </div>
        </div>
        <div v-else class="s-autocomplete-suggestions__loading">
          <s-content-loader height="140" width="100" preserve-aspect-ratio="none">
            <rect
              x="0"
              y="0"
              width="100%"
              height="20"
            />
            <rect
              x="0"
              y="40"
              width="100%"
              height="20"
            />
            <rect
              x="0"
              y="80"
              width="100%"
              height="20"
            />
            <rect
              x="0"
              y="120"
              width="100%"
              height="20"
            />
          </s-content-loader>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
import SInput from '@/lib-components/SInput/SInput.vue'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'
import SContentLoader from '@/lib-components/SContentLoader/SContentLoader.vue'
import {
  SAutocompleteItem,
  SAutocompleteItemValue
} from '@/lib-components/SAutocomplete/SAutocomplete.type'

type AppendedToBodySize = {
  width?: string
}

type AppendedToBodyPosition = {
  top?: string
  left?: string
}

/** Компонент для поискового инпута с подгрузкой списка */
@Component({
  components: {
    SInput,
    SvgIcon,
    SContentLoader
  },
})
export default class SAutocomplete extends Vue {
  @Model('change')
  value!: SAutocompleteItemValue

  appendedToBodyPosition: AppendedToBodyPosition = {}
  appendedToBodySize: AppendedToBodySize = {}

  /** Массив данных для выпадающего списка */
  @Prop({ type: Array, default: () => [] })
  items!: SAutocompleteItem<SAutocompleteItemValue>[] | number[] | string[]

  /** Идентификатор предзагрузки */
  @Prop(Boolean)
  loading?: boolean

  /** Размер инпута */
  @Prop(String)
  size?: string

  /** Свойство округления инпута */
  @Prop({ type: Boolean, default: true })
  rounded!: boolean

  /** Свойство очистки инпута */
  @Prop(Boolean)
  clearable?: boolean

  /** Название свойства для лэйбла */
  @Prop({ type: String, default: 'text' })
  itemText!: string

  /** Название свойства для значения */
  @Prop({ type: String, default: 'value' })
  itemValue!: string

  /** Свойство выноса списка в body документа */
  @Prop({ type: Boolean, default: false })
  appendToBody!: boolean

  /** Свойство для скрытия иконки */
  @Prop({ type: Boolean, default: false })
  iconHidden!: boolean

  @Prop(String)
  state!: string

  opened = false

  get listeners() {
    return {
      ...this.$listeners,
      change: this.handleInput,
    }
  }

  get mappedItems(): SAutocompleteItem<SAutocompleteItemValue>[] {
    return this.items.map((item: SAutocompleteItemValue) => {
      const text = typeof item === 'object' ? item[this.itemText] : String(item)
      const value = typeof item === 'object' ? item[this.itemValue] : item
      return {
        text,
        value,
      }
    })
  }

  handleInput(value: string): void {
    // TODO: Более изощренного решения для избавления от двойного эмита без переписывания функцианала s-input пока нет

    if (value !== this.value) {
      this.opened = true
      if (this.appendToBody) this.prepareDropdown()
      this.$emit('change', value)
    }
  }

  handleFocus(): void {
    if (this.appendToBody) this.prepareDropdown()
    if (this.value) {
      this.opened = true
    }
  }

  handleSelectedChange(value: SAutocompleteItem<SAutocompleteItemValue>): void {
    this.opened = false

    this.$emit('select-item', value)
    this.$emit('change', value.text)
  }

  handleOpenedChange(): void {
    this.opened = !this.opened
    if (this.opened && this.appendToBody) {
      this.prepareDropdown()
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

    if (!this.$el.contains(element)) {
      this.opened = false
    }
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
