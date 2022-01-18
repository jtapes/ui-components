<template>
  <div class="s-sort">
    Сортировать
    <a
      v-for="(item, index) in sortItems"
      :key="index"
      class="link d-f ai-c ml-24"
      href="#"
      @click.prevent="handleValueChange(item)"
    >
      {{ item.label }}
      <svg-icon
        v-show="value.type === item.field"
        name="sort-16"
        class="icon-16 ml-8 s-sort__icon"
        :class="`s-sort__icon--${value.direct}`"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'
import { SortItem, SortValue } from './SSort.type'

@Component({
  components: {
    SvgIcon,
  }
})
export default class SSort extends Vue {
  @Prop(Array)
  sortItems!: SortItem[]

  @Model('change')
  value!: SortValue

  handleValueChange(item: SortItem): void {
    const newValue = {
      type: item.field,
      direct: 'asc',
    }

    if (item.field === this.value.type) {
      newValue.direct = this.value.direct === 'asc' ? 'desc' : 'asc'
    }

    this.$emit('change', newValue)
  }
}
</script>
