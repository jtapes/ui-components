<template>
  <el-table class="s-table" v-bind="$attrs" v-on="$listeners">
    <slot />
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
    <template v-if="$slots.empty" #empty>
      <slot name="empty" />
    </template>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class STable extends Vue {}
</script>
