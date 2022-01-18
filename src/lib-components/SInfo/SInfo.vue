<template>
  <div class="s-info" :class="`s-info--${type}`">
    <div class="s-info__icon">
      <svg-icon :name="`${iconName}-16`" class="icon-16" />
    </div>
    <div class="text-sm">
      <!-- @slot Слот для сообщения  -->
      <slot>{{ message }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'

const INFO_TYPE = ['error', 'warning', 'success', 'info']

/** Компонент для отображения сообщения */
@Component({
  components: {
    SvgIcon,
  }
})
export default class SInfo extends Vue {
  /** Тип сообщения */
  @Prop({
    type: String,
    validator(value: string): boolean {
      return INFO_TYPE.includes(value)
    },
  })
  type!: string

  /** Текст сообщения */
  @Prop(String)
  message?: string

  get iconName(): string | undefined {
    switch (this.type) {
      case 'error':
        return 'error'
      case 'warning':
        return 'info'
      case 'info':
        return 'info'
      case 'success':
        return 'checked'
    }
  }
}
</script>
