<template>
  <div class="s-carousel">
    <div v-if="title || $slots.title" class="s-carousel__header">
      <slot name="title">
        <span class="h2 bold">
          {{ title }}
        </span>
      </slot>
      <div class="s-carousel__controls" :class="{ 'ml-auto': !$slots.title && !title }">
        <s-button
          class="s-carousel__controls--prev"
          mode="outline"
          :state="isFirstPage && !loop ? 'disabled' : 'default'"
          circle
          @click="changePage(-1)"
        >
          <svg-icon name="dropdown-24-32" class="icon-32" />
        </s-button>
        <s-button
          class="s-carousel__controls--next"
          mode="outline"
          :state="isLastPage && !loop ? 'disabled' : 'default'"
          circle
          @click="changePage(1)"
        >
          <svg-icon name="dropdown-24-32" class="icon-32" />
        </s-button>
      </div>
    </div>
    <carousel
      :style="carouselStyle"
      :value="currentPage"
      :per-page="perPage"
      :loop="loop"
      :scroll-per-page="scrollPerPage"
      :autoplay="autoplay"
      :autoplay-timeout="autoplayTimeout"
      :autoplay-hover-pause="autoplayHoverPause"
      :pagination-enabled="false"
      tag-name="SCarouselItem"
      @page-change="handlePageChange"
    >
      <slot />
    </carousel>
    <div v-if="!title && !$slots.title" class="s-carousel__controls--overlayed">
      <s-button
        class="s-carousel__controls--prev"
        mode="outline"
        :state="isFirstPage && !loop ? 'disabled' : 'default'"
        circle
        @click="changePage(-1)"
      >
        <svg-icon name="dropdown-24-32" class="icon-32" />
      </s-button>
      <s-button
        class="s-carousel__controls--next ml-0"
        mode="outline"
        :state="isLastPage && !loop ? 'disabled' : 'default'"
        circle
        @click="changePage(1)"
      >
        <svg-icon name="dropdown-24-32" class="icon-32" />
      </s-button>
    </div>
    <div v-if="paginationEnabled" class="s-carousel__footer">
      <div
        v-for="(_, page) in indicators"
        :key="page"
        class="s-carousel-indicator"
        :class="{ 's-carousel-indicator--active': currentPage === page }"
        @click="handlePageChange(page)"
      >
        <div class="s-carousel-indicator__button" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, ProvideReactive, Vue, Watch } from 'vue-property-decorator'
import SButton from '@/lib-components/SButton/SButton.vue'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'
import { Carousel } from '@jambonn/vue-concise-carousel'
import { SCarouselSlide } from './SCarousel.type'
import { VNode } from 'vue'

/** Компонент карусель */
@Component({
  components: {
    SButton,
    SvgIcon,
    Carousel,
  }
})
export default class SCarousel extends Vue {
  valueLocal = 0

  /** Модель карусели **/
  @Model('change')
  value?: number

  /** Заголовок в хедере карусели **/
  @Prop(String)
  title?: string

  /** Кол-во отображаемых элементов на слайде (default = 1) **/
  @Prop({ type: Number, default: 1 })
  perPage!: number

  /** Пролистывание по странице (а не по итему) (default = true) **/
  @Prop({ type: Boolean, default: true })
  scrollPerPage!: boolean

  /** Отступ каждого слайда по бокам **/
  @Prop(Number)
  gutter?: number

  /** Ленивая загрузка (подгрузка только предыдущей и следующей страницы карусели) **/
  @Prop({ type: Boolean, default: false })
  lazy!: boolean

  @ProvideReactive('lazy')
  providedLazy?: boolean = this.lazy

  /** Пагинация карусели (default = false) **/
  @Prop({ type: Boolean, default: false })
  paginationEnabled!: boolean

  /** Цикличная прокрутка слайдов (default = false) **/
  @Prop({ type: Boolean, default: false })
  loop!: boolean

  /** Автоматическая прокрутка слайдов (default = false) **/
  @Prop({ type: Boolean, default: false })
  autoplay!: boolean

  /** Пауза между автоматической прокруткой слайдов (default = 3000) **/
  @Prop({ type: Number, default: 3000 })
  autoplayTimeout!: number

  /** Пауза прокрутки при наведении (default = true) **/
  @Prop({ type: Boolean, default: true })
  autoplayHoverPause!: boolean

  get currentPage(): number {
    return this.value !== undefined ? this.value : this.valueLocal
  }

  set currentPage(newPage: number) {
    if (this.value !== undefined) {
      this.$emit('change', newPage)
    } else {
      this.valueLocal = newPage
    }
  }

  get slides(): VNode[] | undefined {
    return this.$slots?.default?.filter((node) => {
      return node?.tag?.includes('SCarouselItem')
    })
  }

  get isFirstPage(): boolean {
    return this.currentPage === 0
  }

  get isLastPage(): boolean {
    if (this.slides) {
      return this.currentPage === Math.floor(this.slides.length / this.perPage) - 1
    }

    return false
  }

  get indicators(): number {
    if (this.slides) {
      return Math.floor(this.slides.length / this.perPage)
    }
    return 0
  }

  get carouselStyle(): { marginLeft?: string, marginRight?: string } {
    if (this.gutter) {
      return {
        marginLeft: `-${this.gutter / 2}px`,
        marginRight: `-${this.gutter / 2}px`
      }
    }
    return {}
  }

  handlePageChange(page: number): void {
    this.currentPage = page
    if (this.lazy) {
      this.updateSlides()
    }
  }

  changePage(value: number): void {
    if (this.slides) {
      let page
      if (this.isLastPage && this.currentPage + value > this.currentPage) {
        page = 0
      } else if (this.isFirstPage && this.currentPage + value < this.currentPage) {
        page = Math.floor(this.slides.length / this.perPage) - 1
      } else {
        page = this.currentPage + value
      }

      this.handlePageChange(page)
    }
  }

  updateGutter(): void {
    this.$nextTick(() => {
      this.slides?.forEach((slide) => {
        if (this.gutter && slide.elm) {
          const slideElement = slide.elm as HTMLElement
          slideElement.style.paddingLeft = `${this.gutter / 2}px`
          slideElement.style.paddingRight = `${this.gutter / 2}px`
        }
      })
    })
  }

  updateSlides(): void {
    this.$nextTick(() => {
      this.slides?.forEach((slide, index) => {
        if (slide && slide.componentInstance && this.slides) {
          const startIndex = this.currentPage * this.perPage - this.perPage
          const endIndex = startIndex + (3 * this.perPage - 1)
          if (startIndex < 0 && index > this.slides.length - 1 - this.perPage) {
            (slide.componentInstance as SCarouselSlide).isVisible = true
          } else if (endIndex > this.slides.length - 1 && index < this.perPage) {
            (slide.componentInstance as SCarouselSlide).isVisible = true
          } else if (index >= startIndex && index <= endIndex) {
            (slide.componentInstance as SCarouselSlide).isVisible = true
          } else {
            (slide.componentInstance as SCarouselSlide).isVisible = false
          }
        }
      })
    })
  }

  @Watch('lazy')
  lazyChange(newValue: boolean): void {
    this.providedLazy = newValue
  }

  beforeMount(): void {
    this.updateGutter()
    this.updateSlides()
  }
}
</script>
