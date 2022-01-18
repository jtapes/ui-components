<template>
  <div class="s-progress-bar">
    <div class="s-progress-bar__above">
      <slot name="above" />
    </div>
    <div class="s-progress-bar__line">
      <div ref="progressLine" class="s-progress-bar__progress" />
    </div>
    <div class="s-progress-bar__under">
      <slot name="under" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class SProgressBar extends Vue {
  @Prop({
    type: Number,
    validator: (val: number) => val >= 0 && val <= 100,
    default: 0,
  })
  progress!: number

  $refs!: {
    progressLine: HTMLDivElement
  }

  @Watch('progress')
  onProgressChanged(newProgressValue: number): void {
    this.updateProgress(newProgressValue)
  }

  updateProgress(val = this.progress): void {
    this.$refs.progressLine.style.width = `${val}%`
  }

  mounted(): void {
    this.updateProgress()
  }
}
</script>
