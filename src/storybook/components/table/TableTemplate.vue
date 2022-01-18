<template>
  <div>
    <s-table :data="data">
      <s-table-column
        prop="date"
        label="Date"
        width="180"
      />
      <s-table-column
        prop="name"
        label="Name"
        width="180"
      />
      <s-table-column
        prop="address"
        label="Address"
      />
    </s-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import STable from '@/lib-components/STable/STable.vue'
import STableColumn from '@/lib-components/STableColumn/STableColumn.vue'

/** Компонент для выбора значения */
@Component({
  components: {
    STable,
    STableColumn,
  }
})
export default class TableTemplate extends Vue  {

  @Prop(Array)
  data = [{
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }, {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }, {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }, {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }]
}
</script>
