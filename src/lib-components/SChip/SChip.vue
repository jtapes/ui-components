<template>
  <div
    class="s-chip text-sm"
    :class="{
      's-chip--closable': closable,
      's-chip--active': active,
      's-chip--disabled': disabled,
    }"
    @click="handleChipClose"
  >
    <div class="s-chip__content">
      <div class="s-chip__text">
        <!-- @slot Слот для контента  -->
        <slot>
          {{ label }}
        </slot>
      </div>
      <span v-if="count" class="s-chip__count">{{ count }}</span>
    </div>
    <div v-if="closable" class="s-chip__close">
      <svg-icon name="times-24-32" class="icon-32" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'

/** Компонент используется для передачи небольших фрагментов информации */
@Component({
  components: {
    SvgIcon,
  }
})
export default class SChip extends Vue {
  /** Контент внутри chip */
  @Prop(String)
  label?: string

  /** Добавление кнопки "закрыть" */
  @Prop(Boolean)
  closable?: boolean

  /** Отвечает за активность */
  @Prop(Boolean)
  active?: boolean

  /** Число, которое отображается внутри Chip */
  @Prop(Number)
  count?: number

  /** Disabled свойство компонента */
  @Prop(Boolean)
  disabled?: boolean

  handleChipClose(): void {
    if (this.closable) {
      this.$emit('close')
    }
  }
}
</script>
