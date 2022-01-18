<template>
  <div
    ref="wrapper"
    class="s-date-picker"
    :class="{
      's-date-picker--range': range,
      's-date-picker--focused': isOpen
    }"
  >
    <date-picker
      :value="value"
      v-bind="$attrs"
      :append-to-body="appendToBody"
      :open.sync="isOpen"
      :range="range"
      :clearable="false"
      :popup-style="{
        width: appendToBody ? appendedToBodyWidth : ''
      }"
      v-on="$listeners"
      @change="change"
    >
      <template #input>
        <template v-if="range">
          <s-input
            :value="dateString[0]"
            :state="state"
            :rounded="true"
            :placeholder="dateString[0] ? '' : placeholder"
            :class="{
              'w-100': !dateString[0]
            }"
          >
            <template v-if="dateString[0]" #prepend>
              <div class="mr-8 color-font-secondary text-sm">
                c
              </div>
            </template>
          </s-input>
          <s-input
            v-if="dateString[1]"
            :value="dateString[1]"
            :state="state"
            :rounded="false"
          >
            <template #prepend>
              <div class="mr-8 color-font-secondary text-sm">
                по
              </div>
            </template>
          </s-input>
        </template>
        <template v-else>
          <s-input
            :value="dateString"
            :placeholder="placeholder"
            :state="state"
          />
        </template>
      </template>
      <template #icon-calendar>
        <svg-icon :name="'calendar-24-32'" class="icon-24" />
      </template>
    </date-picker>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Prop } from 'vue-property-decorator'
import DatePicker from 'vue2-datepicker'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'
import SInput from '@/lib-components/SInput/SInput.vue'
import { format, parse } from '@/plugins/date'
import 'vue2-datepicker/locale/ru'
import { SDatePickerValueType } from '@/lib-components/SDatePicker/SDatePicker.type'

@Component({ components: { DatePicker, SInput, SvgIcon } })
export default class SDatePicker extends Vue {
  @Model('change-date')
  value!: SDatePickerValueType

  /** Формат даты */
  @Prop({ type: String, default: 'dd.MM.yyyy' })
  format!: string

  /** Плейсхолдер */
  @Prop({ type: String, default: '' })
  placeholder!: string

  /** Состояние инпута */
  @Prop(String)
  state?: string

  /** Возможность выбора интервала дат */
  @Prop(Boolean)
  range?: boolean

  /** Свойство выноса дропдауна календаря в body документа */
  @Prop({ type: Boolean, default: false })
  appendToBody!: boolean

  isOpen = false
  appendedToBodyWidth = ''

  get date(): Date | [Date, Date] {
    if (typeof this.value === 'string' && this.value.length) {
      return parse(this.value, this.format, new Date())
    } else if (
      Array.isArray(this.value) &&
      typeof this.value[0] === 'string' &&
      typeof this.value[1] === 'string' &&
      this.value[0].length && this.value[1].length
    ) {
      return [
        parse(this.value[0], this.format, new Date()),
        parse(this.value[1], this.format, new Date()),
      ]
    } else {
      return this.value as Date | [Date, Date]
    }
  }

  get dateString(): string | [string, string] | undefined {
    if (this.date) {
      if (!Array.isArray(this.date)) {
        return format(this.date, this.format)
      } else {
        const dateStart = this.date[0] ? format(this.date[0], this.format) : ''
        const dateEnd = this.date[1] ? format(this.date[1], this.format) : ''
        return [dateStart, dateEnd]
      }
    }
  }

  change(date: Date | [Date, Date]): void {
    let dateString: string | [string, string] | undefined
    if (typeof this.value === 'string' && !Array.isArray(date)) {
      dateString = format(date, this.format)
    } else if (
      Array.isArray(this.value) &&
      typeof this.value[0] === 'string' &&
      typeof this.value[1] === 'string' &&
      Array.isArray(date)
    ) {
      dateString = [format(date[0], this.format), format(date[1], this.format)]
    }
    this.$emit('change-date', date || dateString)
  }

  prepareDropdown(): void {
    if (!this.$isServer) {
      this.$nextTick(async () => {
        if (this.$refs.wrapper) {
          const slotRect = (this.$refs.wrapper as Element).getBoundingClientRect()
          this.appendedToBodyWidth = `${slotRect.width}px`
        }
      })
    }
  }

  mounted(): void {
    window.addEventListener('resize', this.prepareDropdown, true)
    if (this.appendToBody) {
      this.prepareDropdown()
    }
  }

  beforeDestroy(): void {
    document.removeEventListener('resize', this.prepareDropdown, true)
  }
}
</script>
