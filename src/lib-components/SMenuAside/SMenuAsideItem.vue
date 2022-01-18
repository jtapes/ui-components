<template>
  <div>
    <div
      v-if="type !== 'link'"
      class="menu-item"
      :class="{ 'menu-item--active': active }"
      v-on="$listeners"
    >
      <span class="menu-item__text">
        <svg-icon v-if="iconPrepend" :name="iconPrepend" class="icon-24 mr-8" />
        {{ name }}
      </span>
      <svg-icon
        v-if="iconAppend !== 'dropdown-24-32' || child"
        :name="iconAppend"
        class="icon-24"
        :class="{ 'menu-item__arrow': iconAppend === 'dropdown-24-32' }"
      />
    </div>
    <a v-else :href="url" class="menu-item menu-item--link">
      <span>{{ name }}</span>
      <svg-icon name="link-blank-24-32" class="icon-24 menu-item__arrow" />
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'

@Component({
  components: {
    SvgIcon
  }
})
export default class SAsideItem extends Vue {
  @Prop({ type: String, required: true })
  name!: string

  @Prop({ type: String })
  url?: string

  @Prop({ type: Boolean, default: false })
  active!: boolean

  @Prop({ type: String })
  iconPrepend?: string

  @Prop({ type: String, default: 'dropdown-24-32' })
  iconAppend!: string

  @Prop({ type: String, default: 'menu-item' })
  type!: string

  @Prop({ type: Object })
  child?: object
}
</script>
