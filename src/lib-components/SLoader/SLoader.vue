<template>
  <transition name="s-fade" @after-leave="afterLeave">
    <div
      v-show="visible"
      class="s-loader"
      :class="{ 's-loader--group': group, 's-loader--input': input }"
    >
      <div v-show="visible" class="s-loader__wrapper">
        <svg
          ref="spinner"
          class="s-loader-spinner icon-32"
          viewBox="0 0 32 32"
        >
          <circle
            class="s-loader-spinner__path"
            cx="16"
            cy="16"
            r="10"
            fill="none"
            stroke="currentColor"
          />
        </svg>
        <div v-if="text" class="ml-24 bold">
          {{ text }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

/** Компонент для директивы загрузки */
@Component
export default class SLoader extends Vue {
  visible = false
  group = false
  input = false
  text = ''

  afterLeave(): void {
    this.$emit('after-leave')
  }
}
</script>
