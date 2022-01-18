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
      <s-table-column>
        <template>
          <s-hint content="Редактировать" append-to-body min-width="150">
            <s-button
              size="sm"
              class="s-table-column__action color-primary mr-20"
            >
              <svg-icon name="edit-24-32" class="icon-32" />
            </s-button>
          </s-hint>
        </template>
      </s-table-column>
    </s-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import STable from '@/lib-components/STable/STable.vue'
import STableColumn from '@/lib-components/STableColumn/STableColumn.vue'
import SHint from '@/lib-components/SHint/SHint.vue'
import SButton from '@/lib-components/SButton/SButton.vue'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'

/** Компонент для выбора значения */
@Component({
  components: {
    STable,
    STableColumn,
    SHint,
    SButton,
    SvgIcon
  }
})
export default class TableTemplateActions extends Vue  {

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
