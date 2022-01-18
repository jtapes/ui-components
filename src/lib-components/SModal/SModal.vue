<template>
  <transition name="s-modal">
    <div v-if="value" class="s-modal">
      <div class="s-modal__inner" :style="modalInnerStyle">
        <div class="s-modal__header">
          <slot name="header" />
          <div v-if="closable" class="s-modal__close">
            <svg-icon
              class="s-modal__close-icon icon-24"
              name="close-24-32"
              @click.native="close"
            />
          </div>
        </div>
        <div class="s-modal__body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="s-modal__footer">
          <slot name="footer" />
        </div>
      </div>
      <div class="s-modal__backdrop" @click="close" />
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, Watch } from 'vue-property-decorator'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'

type ModalInnerStyle = {
  width?: string | number
  maxWidth?: string | number
}

@Component({
  components: {
    SvgIcon,
  }
})
export default class SModal extends Vue {
  /** Модель, отвечающая за видимость окна **/
  @Model('change')
  value!: boolean

  /** Ширина модального окна **/
  @Prop([String, Number])
  width?: string | number

  /** Максимальная ширина модального окна **/
  @Prop([String, Number])
  maxWidth?: string | number

  /** Максимальная ширина модального окна **/
  @Prop({ type: Boolean, default: true })
  closable!: boolean

  get modalInnerStyle(): ModalInnerStyle {
    const innerStyle: ModalInnerStyle = {}
    if (this.width) {
      if (Number.isInteger(this.width)) {
        innerStyle.width = `${this.width}px`
      } else {
        innerStyle.width = this.width
      }
    }

    if (this.maxWidth) {
      if (Number.isInteger(this.maxWidth)) {
        innerStyle.maxWidth = `${this.maxWidth}px`
      } else {
        innerStyle.maxWidth = this.maxWidth
      }
    }

    return innerStyle
  }

  close(): void {
    this.$emit('change', false)
  }

  @Watch('value', { immediate: true })
  handleValueChange(value: boolean): void {
    if (!this.$isServer) {
      document.body.style.overflow = value ? 'hidden' : 'auto'
    }
  }
}
</script>
