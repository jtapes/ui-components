<template>
  <div class="s-tabs">
    <div class="s-tabs__header">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :ref="value === tab ? 'activeTab' : null"
        class="s-tabs__header-item bold h4"
        :class="{ 's-tabs__header-item--active': value === tab }"
        @click="handleValueChange(tab)"
      >
        {{ tab }}
      </div>
      <div v-if="tabs.length" ref="slider" class="s-tabs__slider" />
    </div>
    <div class="s-tabs__content">
      <template v-for="(tab, index) in tabs">
        <!-- @slot Слот для контента конкретного таба (tab-1, tab-2 и т.д.) -->
        <slot v-if="value === tab" :name="`tab-${index + 1}`" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'

/** Компонент используется для отображения информации с возможностью переключать контентный блок */
@Component
export default class STabs extends Vue {
  /** Массив с названиями табов */
  @Prop({ type: Array, default: () => [] })
  tabs!: string[]

  /** Переменная, содержащая название активного таба */
  @Model('change')
  value!: string

  $refs!: {
    activeTab: HTMLDivElement[]
    slider: HTMLDivElement
  }

  handleValueChange(tab: string): void {
    if (this.value !== tab) {
      this.$emit('change', tab)
      this.$nextTick(() => {
        this.setSliderStyles()
      })
    }
  }

  setSliderStyles(): void {
    if (this.tabs.length && this.$refs.slider) {
      this.$refs.slider.style.width = `${this.$refs.activeTab[0].clientWidth}px`
      this.$refs.slider.style.left = `${this.$refs.activeTab[0].offsetLeft}px`
    }
  }

  mounted(): void {
    this.setSliderStyles()
  }
}
</script>
