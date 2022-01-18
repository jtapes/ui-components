<template>
  <vue-slider
    :value="value"
    v-bind="$attrs"
    @change="change"
    @drag-end="onDragEnd"
    @drag-start="onDragStart"
  />
</template>
<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator'

import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'

@Component({ components: { VueSlider } })
export default class SSlider extends Vue {
  @Model('change')
  value!: [number, number] | number

  change(value: [number, number] | number): void {
    this.$emit('change', value)
  }

  onDragEnd(): void {
    this.$emit('drag-end')
  }

  onDragStart(): void {
    this.$emit('drag-start')
  }
}
</script>
