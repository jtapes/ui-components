<template>
  <slide>
    <template v-if="lazy ? isVisible : true">
      <slot />
    </template>
  </slide>
</template>

<script lang="ts">
import { Component, InjectReactive, Vue } from 'vue-property-decorator'
import { Slide } from '@jambonn/vue-concise-carousel'

/** Компонент карусель */
@Component({
  name: 'SCarouselItem',
  components: {
    Slide,
  }
})
export default class SCarouselItem extends Vue {
  isVisible = false

  @InjectReactive('lazy')
  lazy!: boolean
}
</script>
