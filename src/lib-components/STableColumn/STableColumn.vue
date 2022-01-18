<template>
  <el-table-column class-name="s-table-column" v-bind="$attrs" v-on="$listeners">
    <template v-if="$scopedSlots.header" #header="{ column, $index }">
      <slot name="header" :column="column" :$index="$index" />
    </template>
    <template v-if="$scopedSlots.default" #default="{ row, column, $index }">
      <slot :row="row" :column="column" :$index="$index" />
    </template>
  </el-table-column>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class STableColumn extends Vue {}
</script>
