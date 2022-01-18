<template>
  <div class="s-breadcrumbs text-sm color-font-secondary">
    <template v-for="(crumb, index) in breadcrumbs">
      <div :key="crumb.label" class="s-breadcrumbs__item">
        <template v-if="crumb.link">
          <!-- @slot Слот для вставки компонентов формирования ссылок -->
          <slot
            name="link"
            :crumb="crumb"
            :index="index"
            :crumbFormat="crumbFormat"
          >
            <a
              :href="crumb.link"
              class="link color-font-secondary"
              @click.prevent="pageChange(crumb.link)"
            >
              {{ crumbFormat(crumb.label, index) }}
            </a>
          </slot>
        </template>
        <span v-else>
          {{ crumbFormat(crumb.label, index) }}
        </span>
      </div>
      <div
        v-if="!isLastCrumb(index)"
        :key="index"
        class="s-breadcrumbs__separator"
      >
        <!-- @slot Слот для разделителя между крошками -->
        <slot name="separator">
          <svg-icon name="arrow-16" class="icon-16" />
        </slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'
import { BreadcrumbType } from './SBreadcrumbs.type'

/** Компонент для отображения хлебных крошек */
@Component({
  components: {
    SvgIcon,
  }
})
export default class SBreadcrumbs extends Vue {
  /** Массив с хлебными крошками */
  @Prop({
    type: Array,
    validator(value: BreadcrumbType[]): boolean {
      return value.every((breadcrumb) =>
        Object.prototype.hasOwnProperty.call(breadcrumb, 'label')
      )
    },
  })
  breadcrumbs!: BreadcrumbType[]

  isLastCrumb(index: number): boolean {
    return index + 1 === this.breadcrumbs.length
  }

  crumbFormat(crumb: string, index: number): string {
    const maxLengthOfCrumb = 40
    if (this.isLastCrumb(index) && crumb.length > maxLengthOfCrumb) {
      return `${crumb.slice(0, maxLengthOfCrumb)}...`
    } else {
      return crumb
    }
  }

  pageChange(link: string): void {
    this.$emit('page-change', link)
  }
}
</script>
