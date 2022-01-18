<template>
  <div class="s-characteristic" :data-test="name">
      <svg-icon v-if="isShowIcon" :name="`${nameIcon}-16`" class="icon-16 mr-4" />
    <span class="h4">{{ value }}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'

export const CHARACTERISTICS = [
  'thickness',
  'width',
  'length',
  'diameter',
  'channel',
  'color',
  'thickness-cover',
]

/** Компонент для отображения основных признаков товара */
@Component({
  components: {
    SvgIcon,
  }
})
export default class SCharacteristic extends Vue {
  /** Название иконки признака */
  @Prop({
    type: String,
    validator(value: string): boolean {
        return CHARACTERISTICS.includes(value) || !(value)
    },
  })
  nameIcon!: string

  /** Наименование признака */
  @Prop({ type: String, required: true })
  name!: string

  /** Значение признака */
  @Prop([String, Number])
  value!: string | number

  get isShowIcon(): boolean {
    return CHARACTERISTICS.includes(this.nameIcon)
  }
}
</script>
