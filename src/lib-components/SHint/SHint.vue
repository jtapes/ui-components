<template>
  <div
    class="s-hint"
    :class="{ 'mx-8': !$slots.default }"
    @mouseleave="handleVisibleChange(false)"
    @mouseenter="handleVisibleChange(true)"
  >
    <!-- @slot Слот для компонента, на котором висит hint  -->
    <slot>
      <span class="s-hint__inner">
        <svg-icon name="question-16" class="icon-16" />
      </span>
    </slot>
    <div
      v-show="!disabled"
      ref="hint"
      class="s-hint__wrapper"
      :class="[
        `s-hint__wrapper--${placement}`,
        { 's-hint__wrapper--appended-to-body': appendToBody },
        { 's-hint__wrapper--hidden': !hintVisible },
      ]"
      :style="{ minWidth, maxWidth, ...appendedToBodyPosition, ...appendedToBodySize }"
      @mouseleave="handleVisibleChange(false)"
      @mouseenter="handleVisibleChange(true)"
    >
      <div class="s-hint__header">
        <!--  @slot Слот контента хедера -->
        <slot name="header" />

        <button v-if="closable" class="s-hint__close" @click="handleCloseHint">
          <!-- @slot Слот иконки закрытия -->
          <slot name="close-icon">
            <svg-icon class="icon-16" name="close-24-32" />
          </slot>
        </button>
      </div>
      <div class="s-hint__content text-sm" :class="{ 'pt-16': !closable }">
        <!--  @slot  Слот контента хинта  -->
        <slot name="content">
          {{ content }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'
import SButton from '@/lib-components/SButton/SButton.vue'

type AppendedToBodyPosition = {
  top?: string
  left?: string
}

type AppendedToBodySize = {
  minHeight?: string
  maxWidth?: string
}

const PLACEMENT = ['top-left', 'top-right', 'bottom-left', 'bottom-right']

/** Компонент для отображения подсказок  */
@Component({
  components: {
    SButton,
    SvgIcon,
  }
})
export default class SHint extends Vue {
  visible = false
  appendedToBodyPosition: AppendedToBodyPosition = {}
  appendedToBodySize: AppendedToBodySize = {}

  /** Текст хинта, может быть заменен слотом #content */
  @Prop(String)
  content?: string

  /** Свойство отвечающее за дефолтное поведение hint ( hover ) */
  @Prop({ type: Boolean, default: true })
  trigger!: boolean

  /** Положение hint ('top-left', 'top-right', 'bottom-left', 'bottom-right') */
  @Prop({
    type: String,
    default: 'top-left',
    validator(value: string): boolean {
      return PLACEMENT.includes(value)
    },
  })
  placement!: string

  /** Минимальная длина контента hint */
  @Prop(String)
  minWidth?: string

  /** Максимальная длина контента hint */
  @Prop(String)
  maxWidth?: string

  /** Свойство отключения хинта */
  @Prop({ type: Boolean, default: false })
  disabled!: boolean

  /** Свойство выноса хинта в body документа */
  @Prop({ type: Boolean, default: false })
  appendToBody!: boolean

  /** Свойство добавления кнопки закрытия хинта */
  @Prop({ type: Boolean, default: false })
  closable!: boolean

  @Model('change')
  readonly value?: boolean

  get hintVisible(): boolean {
    const visible = this.value !== undefined ? this.value : this.visible
    if (visible && this.appendToBody) {
      this.prepareHint()
    }

    return visible
  }

  set hintVisible(value: boolean) {
    if (this.value !== undefined) {
      this.$emit('change', value)
    } else {
      this.visible = value
    }
  }

  handleVisibleChange(visible: boolean): void {
    if (this.trigger) {
      this.hintVisible = visible
    }
  }

  handleCloseHint(): void {
    this.hintVisible = false
  }

  prepareHint(): void {
    if (!this.$isServer) {
      this.$nextTick(async () => {
        if (this.$slots.default && this.$slots.default[0].elm && this.$refs.hint) {
          const slotRect = (this.$slots.default[0].elm as Element).getBoundingClientRect()
          const hintRect = (this.$refs.hint as Element).getBoundingClientRect()
          let hintWidth
          if (this.minWidth && parseInt(this.minWidth) > slotRect.width) {
            hintWidth = parseInt(this.minWidth)
          } else if (this.maxWidth) {
            hintWidth = parseInt(this.maxWidth)
          } else {
            hintWidth = slotRect.width
          }
          await this.calculateSize(slotRect, hintWidth)
          await this.calculatePosition(slotRect, hintRect, hintWidth)
        }
      })
    }
  }

  calculateSize(slotRect: DOMRect, hintWidth: number): void {
    this.appendedToBodySize = {
      minHeight: `${slotRect.height}px`,
      maxWidth: `${hintWidth}px`,
    }
  }

  calculatePosition(slotRect: DOMRect, hintRect: DOMRect, hintWidth: number): void {
    switch (this.placement) {
      case 'top-left': {
        this.appendedToBodyPosition = {
          top: `${slotRect.top - hintRect.height - 18 + window.scrollY}px`,
          left: `${slotRect.left - hintWidth + slotRect.width / 2}px`,
        }
        break
      }
      case 'top-right': {
        this.appendedToBodyPosition = {
          top: `${slotRect.top - hintRect.height - 18 + window.scrollY}px`,
          left: `${slotRect.left + hintWidth - slotRect.width / 2}px`,
        }
        break
      }
      case 'bottom-left': {
        this.appendedToBodyPosition = {
          top: `${slotRect.top + slotRect.height + 18 + window.scrollY}px`,
          left: `${slotRect.left - hintWidth + slotRect.width / 2}px`,
        }
        break
      }
      case 'bottom-right': {
        this.appendedToBodyPosition = {
          top: `${slotRect.top + slotRect.height + 18 + window.scrollY}px`,
          left: `${slotRect.left + hintWidth - slotRect.width / 2}px`,
        }
        break
      }
    }
  }

  mounted(): void {
    if (this.appendToBody) {
      this.prepareHint()
      document.body.append((this.$refs.hint as Node))
    }
  }
}
</script>
