<template>
  <ul class="s-pagination h4 us-n">
    <li
      v-show="page > 1"
      class="s-pagination__arrow s-pagination__arrow--prev"
      @click="onPagerClick(page - 1)"
    >
      <svg-icon name="dropdown-24-32" class="icon-32" />
    </li>
    <li
      v-if="!mobileMode"
      :class="{ 's-pagination__page--active': page === 1 }"
      class="s-pagination__page"
      @click="onPagerClick(1)"
    >
      1
    </li>
    <li
      v-if="!mobileMode"
      v-show="pagers.showPrevMore"
      class="s-pagination__ellipsis"
    >
      ...
    </li>
    <li
      v-for="pager in pagers.pages"
      :key="pager"
      :class="{ 's-pagination__page--active': page === pager }"
      class="s-pagination__page"
      @click="onPagerClick(pager)"
    >
      {{ pager }}
    </li>
    <li
      v-if="!mobileMode"
      v-show="pagers.showNextMore"
      class="s-pagination__ellipsis"
    >
      ...
    </li>
    <li
      v-if="!mobileMode && pageCount > 1"
      :class="{ 's-pagination__page--active': page === pageCount }"
      class="s-pagination__page"
      @click="onPagerClick(pageCount)"
    >
      {{ pageCount }}
    </li>
    <li
      v-show="page < pageCount"
      class="s-pagination__arrow s-pagination__arrow--next"
      @click="onPagerClick(page + 1)"
    >
      <svg-icon name="dropdown-24-32" class="icon-32" />
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Pager } from './SPagination.type'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'

/** Пагинация */
@Component({
  components: {
    SvgIcon,
  }
})
export default class SPagination extends Vue {
  showPrevMore = false
  showNextMore = false
  desktopMode = true

  /** Отображение на мобильных устройствах */
  @Prop({
    type: Boolean,
    default: false,
  })
  mobileMode!: boolean

  @Prop({
    type: Number,
    default: 1,
  })
  page!: number

  /** Общее количество страниц */
  @Prop({
    type: Number,
    required: true,
  })
  pageCount!: number

  /** Количество выводимых элементов страниц */
  @Prop({
    type: Number,
    required: true,
  })
  pagerCount!: number

  get pagers(): Pager {
    const pagerCount: number = this.pagerCount
    const halfPagerCount: number = (pagerCount - 1) / 2

    const page: number = this.page
    const pageCount: number = this.pageCount
    let showPrevMore = false
    let showNextMore = false

    if (pageCount > pagerCount) {
      if (page > pagerCount - halfPagerCount) {
        showPrevMore = true
      }
      if (page < pageCount - halfPagerCount) {
        showNextMore = true
      }
    }

    const pagers: Array<number> = []

    if (showPrevMore && !showNextMore) {
      const startPage: number = pageCount - (pagerCount - 2)
      for (let i: number = startPage; i < pageCount; i++) {
        pagers.push(i)
      }
    } else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < pagerCount; i++) {
        pagers.push(i)
      }
    } else if (showPrevMore && showNextMore) {
      const offset = Math.floor(pagerCount / 2) - 1
      for (let i = page - offset; i <= page + offset; i++) {
        pagers.push(i)
      }
    } else {
      for (let i = 2; i < pageCount; i++) {
        pagers.push(i)
      }
    }

    if (this.mobileMode) {
      let prevPage = 1
      if (pagers.length) {
        prevPage = pagers[0] - 1
      }

      pagers.unshift(prevPage)
      pagers.push(pagers[pagers.length - 1] + 1)
    }

    return {
      pages: pagers,
      showPrevMore,
      showNextMore,
    }
  }

  onPagerClick(newPage: number): void {
    if (!isNaN(newPage)) {
      if (newPage < 1) {
        newPage = 1
      }

      if (newPage > this.pageCount) {
        newPage = this.pageCount
      }
    }

    if (newPage !== this.page) {
      this.$emit('change', newPage)
    }
  }
}
</script>
