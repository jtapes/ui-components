<template>
  <div class="s-stepper">
    <div
      v-for="(step, index) in stepsArray"
      :key="index"
      class="s-stepper-item"
      :style="itemStyle"
    >
      <div class="s-stepper-item__inner">
        <span
          class="s-stepper-item__title bold mb-16"
          :class="{
            'color-primary': step.status === EStepStatuses.FINISH,
            'color-font': step.status === EStepStatuses.ACTIVE,
            'color-font-secondary': step.status === EStepStatuses.WAIT,
          }"
        >
          <slot name="step-title" :step="step">
            {{ step.title }}
          </slot>
        </span>
        <div
          class="s-stepper-item__indicator"
          :class="{
            'bg-primary': step.status === EStepStatuses.FINISH,
            'bg-danger': step.status === EStepStatuses.ACTIVE,
            'bg-border': step.status === EStepStatuses.WAIT,
          }"
        />
      </div>
      <div
        class="s-stepper-item__divider bg-border"
        :class="{
          's-stepper-item__divider--filled':
            step.status === EStepStatuses.FINISH,
        }"
      >
        <div class="s-stepper-item__divider--color bg-primary" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
import { EStepStatuses, SStepType, SStepItemType, SStepItemValue } from './SStepper.type'

/** Компонент используется для отображения шагов */
@Component
export default class SStepper extends Vue {
  /** Массив шагов */
  @Prop({
    type: Array,
    default: () => [],
  })
  steps!: SStepItemType[] | string[]

  @Model('change')
  value!: SStepItemValue

  get stepsArray(): SStepType[] {
    let active: SStepItemValue | undefined
    return this.steps.map((step: SStepItemType | string) => {
      const stepValue = typeof step === 'object' ? step.value : step
      const stepTitle = typeof step === 'object' ? step.title : step
      let status: EStepStatuses

      if (active === undefined) {
        if (this.value !== stepValue) {
          status = EStepStatuses.FINISH
        } else {
          status = EStepStatuses.ACTIVE
          active = stepValue
        }
      } else {
        status = EStepStatuses.WAIT
      }

      return {
        title: stepTitle,
        status,
        value: stepValue,
      }
    })
  }

  get itemStyle(): { [key: string]: string } {
    return {
      'flex-basis': `${100 / this.steps.length}%`,
    }
  }

  EStepStatuses = EStepStatuses
}
</script>
