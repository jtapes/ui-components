<template>
  <div class="aside-menu-column">
    <header
      v-if="items.header && items.header.name"
      class="aside-menu-column__header"
      :class="{ 'aside-menu-column__header--active': headerDisable }"
      @click="headerClick(items.header)"
    >
      <svg-icon
        v-if="headerDisable"
        :name="!items.header.close ? 'arrow-24-32' : 'close-24-32'"
        class="aside-menu-column__header-icon icon-24 mr-8 color-primary"
      />
      {{ items.header.name }}
    </header>
    <div class="aside-menu-column__blocks">
      <div
        v-for="(item, i) of items.menu"
        :key="i"
        class="aside-menu-column__block"
      >
        <s-menu-aside-item
          v-for="element in item"
          :key="element.name"
          v-bind="element"
          @click="elementClick(element)"
          @mouseover="elementHover(element)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SMenuAsideItem from './SMenuAsideItem.vue'
import type { ColumnType, ElementColumnType } from './SMenuAside.type'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'

@Component({
  components: {
    SMenuAsideItem,
    SvgIcon,
  },
})
export default class SMenuAsideColumn extends Vue {
  @Prop({ type: Object, required: true })
  items!: ColumnType

  @Prop({ type: Boolean, default: false })
  headerDisable!: boolean

  elementClick(element: ElementColumnType): void {
    this.$emit('element-click', element)
  }

  elementHover(element: ElementColumnType): void {
    this.$emit('element-hover', element)
  }

  headerClick(element: ElementColumnType): void {
    this.$emit('header-click', element)
  }
}
</script>
