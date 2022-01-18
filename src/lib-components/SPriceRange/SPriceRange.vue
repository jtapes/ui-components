<template>
  <div class="s-price-range">
    <div class="d-f mb-16">
      <s-input
        v-mask="'#*'"
        :value="localValue[0]"
        :max="max"
        :min="min"
        type="number"
        @change="changeInput($event, 0)"
      >
        <template #prepend>
          <span class="ml-16 color-font-secondary">от</span>
        </template>
      </s-input>
      <s-input
        v-mask="'#*'"
        :value="localValue[1]"
        :max="max"
        :min="min"
        type="number"
        class="ml-8"
        @change="changeInput($event, 1)"
      >
        <template #prepend>
          <span class="ml-16 color-font-secondary">до</span>
        </template>
      </s-input>
    </div>
    <s-slider
      v-model="localValue"
      :tooltip="'none'"
      :max="max"
      :min="min"
      :enable-cross="false"
      @drag-start="handleDragStart"
      @drag-end="handleDragEnd"
      @change="handleValueChange"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator'
import SSlider from '../SSlider/SSlider.vue'
import SInput from '../SInput/SInput.vue'

/** Компонент для отображения цены */
@Component({
  components: { SSlider, SInput },
})
export default class SPriceRange extends Vue {
  /** Диапозон цен */
  @Model('change', {
    type: Array,
    validator(array: [number, number]): boolean {
      return array.length === 2
    },
  })
  value!: [number, number]

  /** Минимальная цена */
  @Prop(Number)
  min!: number

  /** Максимальная цена */
  @Prop(Number)
  max!: number

  private localValue: [number, number] | [] = []
  private dragging = false

  @Watch('value')
  onValueChange(value: [number, number]): void {
    if (value) {
      const isDifference = value.some(
        (value, index) => value !== this.localValue[index]
      )

      if (isDifference) {
        this.localValue = value
      }
    } else {
      this.localValue = [this.min, this.max]
    }
  }

  @Watch('min')
  onMinChange(value: number): void {
    this.localValue = [
      value,
      this.localValue[1] ? this.localValue[1] : this.max,
    ]
  }

  @Watch('max')
  onMaxChange(value: number): void {
    this.localValue = [
      this.localValue[0] ? this.localValue[0] : this.min,
      value,
    ]
  }

  changeInput(price: number, index: number): void {
    if (this.localValue.length) {
      if (this.min > price) price = this.min
      if (this.max < price) price = this.max
      if (index === 0) {
        if (this.localValue[1] < price) {
          price = this.localValue[1]
        }
        this.$emit('change', [price, this.localValue[1]])
      }
      if (index === 1) {
        if (this.localValue[0] > price) {
          price = this.localValue[0]
        }
        this.$emit('change', [this.localValue[0], price])
      }
    }
  }

  handleDragStart(): void {
    this.dragging = true
  }

  handleDragEnd(): void {
    this.dragging = false
    this.$emit('change', this.localValue)
  }

  handleValueChange(): void {
    if (!this.dragging) {
      this.$emit('change', this.localValue)
    }
  }

  mounted(): void {
    if (this.value) {
      this.localValue = this.value

      if (this.min > this.localValue[0]) {
        this.$emit('change', [this.min, this.localValue[1]])
      }
      if (this.max < this.localValue[1]) {
        this.$emit('change', [this.localValue[0], this.max])
      }
    } else {
      this.localValue = [this.min, this.max]
    }
  }
}
</script>
