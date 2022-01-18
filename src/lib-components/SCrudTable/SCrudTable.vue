<template>
  <div>
    <div
      v-if="tableTitle || tableActions.create"
      class="table-prepend"
      :class="{ 'jc-fe': !tableTitle, 'table-prepend--bordered': bordered }"
    >
      <template v-if="tableTitle">
        <div class="h3">
          {{ tableTitle }}
        </div>
      </template>
      <s-button mode="outline" :rounded="false" @click="handleRowCreate">
        Добавить
      </s-button>
    </div>
    <el-table :border="bordered" :data="tableData" @sort-change="handleSortChange">
      <template v-for="(column, index) in tableColumns">
        <el-table-column
          v-if="visibleColumns.includes(column.prop)"
          :key="index"
          :prop="column.prop"
          :label="column.label"
          :min-width="column.width"
          :sortable="column.sortable && tableActions.read ? 'custom' : false"
        >
          <template
            v-if="column.filterable && column.filterSchema && column.filterSchema.length"
            #header
          >
            <div class="d-if ai-c c-p" @click.stop="handleFilterOpen(column)">
              <span>{{ column.label }}</span>
              <svg-icon name="filter-24-32" class="icon-32" />
            </div>
          </template>
          <template v-if="column.type === 'date'" #default="{ row }">
            <span>
              {{ dateToFormat(row[column.prop], column.inputFormat, column.outputFormat) }}
            </span>
          </template>
          <template v-else #default="{ row }">
            <span>
              {{ row[column.prop] }}
            </span>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="actionsAvailableCount"
        width="53"
        class-name="flexed"
      >
        <template v-if="columnControl || isFilterAvailable" #header>
          <s-hint
            v-model="columnControlOpened"
            :trigger="false"
            placement="bottom-left"
            append-to-body
            min-width="220px"
            closable
          >
            <s-button
              mode="outline"
              size="xs"
              circle
              @click="handleColumnControl"
            >
              <svg-icon name="settings-24-32" class="icon-24" />
            </s-button>
            <template #content>
              <template v-if="columnControl">
                <div class="mb-16 text-sm">
                  Показать колонки
                </div>
                <div class="d-f fd-c">
                  <s-checkbox
                    v-for="(column, index) in tableColumns"
                    :key="index"
                    v-model="visibleColumns"
                    class="py-4"
                    :checked-value="column.prop"
                    multiple
                    :label="column.label"
                    :state="
                      visibleColumns.length === 1 && visibleColumns.includes(column.prop)
                        ? 'disabled'
                        : 'default'
                    "
                  />
                </div>
              </template>
              <template v-if="isFilterAvailable">
                <s-button
                  class="mt-24"
                  mode="grid"
                  :rounded="false"
                  size="sm"
                  :state="isFilterSelected ? 'default' : 'disabled'"
                  @click="handleFilterClear"
                >
                  Очистить фильтры
                </s-button>
              </template>
            </template>
          </s-hint>
        </template>
        <template #default="{ row, $index }">
          <s-hint
            :value="actionsOpened[$index]"
            :trigger="false"
            placement="bottom-left"
            append-to-body
            min-width="190px"
            closable
            @change="handleActionsVisibleChange($index)"
          >
            <s-button
              mode="outline"
              size="xs"
              circle
              @click="handleActionsVisibleChange($index)"
            >
              <svg-icon name="more-24-32" class="table-actions__icon icon-32" />
            </s-button>
            <template #content>
              <div>
                <s-button
                  v-if="tableActions.update"
                  mode="grid"
                  class="w-100"
                  :rounded="false"
                  @click="handleRowUpdate(row)"
                >
                  Редактировать
                </s-button>
              </div>
              <div class="mt-8">
                <s-button
                  v-if="tableActions.delete"
                  mode="grid"
                  class="w-100"
                  :rounded="false"
                  @click="handleRowDelete(row, $index)"
                >
                  Удалить
                </s-button>
              </div>
            </template>
          </s-hint>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="pagination" class="d-f ai-c jc-sb mt-40">
      <s-pagination
        v-if="paginationPageCount > 1"
        :page="lPagination.page"
        :page-count="paginationPageCount"
        :pager-count="lPagination.pagerCount"
        @change="handlePageChange"
      />
      <s-select
        v-model="lPagination.limit"
        :items="limitItems"
        class="input-width"
        @change="handleLimitChange"
      />
    </div>
    <s-modal
      v-model="modalVisible"
      width="600px"
      @change="handleModalVisibleChange"
    >
      <template #header>
        <div class="mt-16 ml-16">
          <span class="h3 bold">
            {{ modalTitle }}
          </span>
        </div>
      </template>
      <div>
        <template v-if="['create', 'update'].includes(actionType)">
          <s-form ref="form" v-model="model" :schema="tableSchema" />
        </template>
        <template v-else>
          <div>
            {{ `Вы действительно хотите удалить строку №${deletingIndex}?` }}
          </div>
        </template>
      </div>
      <template #footer>
        <div class="d-f jc-fe">
          <s-button size="sm" @click="saveChanges">
            <svg-icon name="checked-24-32" class="icon-32" />
          </s-button>
          <s-button size="sm" @click="cancelChanges">
            <svg-icon name="close-24-32" class="icon-32" />
          </s-button>
        </div>
      </template>
    </s-modal>
    <s-modal
      v-model="filterVisible"
      width="400px"
      @change="handleFilterVisibleChange"
    >
      <template #header>
        <div class="mt-16 ml-16">
          <span class="h3 bold">
            Фильтр
          </span>
        </div>
      </template>
      <s-form ref="filterForm" v-model="tempFilter" :schema="filterSchema" />
      <template #footer>
        <div class="d-f jc-fe">
          <s-button size="sm" @click="saveChanges">
            <svg-icon name="checked-24-32" class="icon-32" />
          </s-button>
          <s-button size="sm" @click="cancelChanges">
            <svg-icon name="close-24-32" class="icon-32" />
          </s-button>
        </div>
      </template>
    </s-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import SModal from '@/lib-components/SModal/SModal.vue'
import SButton from '@/lib-components/SButton/SButton.vue'
import SSelect from '@/lib-components/SSelect/SSelect.vue'
import SvgIcon from '@/lib-components/SvgIcon/SvgIcon.vue'
import SRow from '@/lib-components/SRow/SRow.vue'
import SCol from '@/lib-components/SCol/SCol.vue'
import SForm from '@/lib-components/SForm/SForm.vue'
import SHint from '@/lib-components/SHint/SHint.vue'
import SCheckbox from '@/lib-components/SCheckbox/SCheckbox.vue'
import SPagination from '@/lib-components/SPagination/SPagination.vue'
import type { TFormFieldGroup } from '@/lib-components/SForm/SForm.type'
import { dateToFormat } from '@/plugins/date'
import {
  TableColumnType,
  TableActionsType,
  PaginationType,
  SortType,
} from '@/lib-components/SCrudTable/SCrudTable.type'
import type { Token } from 'path-to-regexp'
import { parse as parseUrlToRegExp } from 'path-to-regexp'

/** Таблица с CRUD-операциями */
@Component({
  components: {
    SModal,
    SButton,
    SSelect,
    SvgIcon,
    SRow,
    SCol,
    SForm,
    SHint,
    SCheckbox,
    SPagination,
  }
})
export default class SCrudTable extends Vue {
  modalVisible = false
  modalTitle = ''
  model: { [key: string]: any } = {}
  actionType = ''
  deletingIndex: number | null = null
  lPagination: PaginationType = {
    page: this.pagination?.page || 1,
    limit: this.pagination?.limit || 10,
    total: this.pagination?.total || 0,
    pageCount: this.pagination?.pageCount || 0,
    pagerCount: this.pagination?.pagerCount || 5
  }
  lSort: SortType | null = null
  filterVisible = false
  tempFilter: { [key: string]: any } = {}
  filter: { [key: string]: any } = {}
  filterSchema: TFormFieldGroup[] = []
  columnControlOpened = false
  actionsOpened: boolean[] = []
  visibleColumns: string[] = []
  limitItems: { text: string, value: number}[] = [
    {
      text: 'Показывать по 10',
      value: 10,
    },
    {
      text: 'Показывать по 30',
      value: 30,
    },
    {
      text: 'Показывать по 50',
      value: 50,
    }
  ]

  $refs!: {
    form: SForm & { validate: (cb: Function) => Promise<boolean> }
  }

  /** Заголовок для таблицы */
  @Prop(String)
  tableTitle?: string

  /** Отображение границ таблицы (default = true)*/
  @Prop({ type: Boolean, default: true })
  bordered!: boolean

  /** Массив данных для таблицы */
  @Prop(Array)
  tableData!: object[]

  /** Массив столбцов для таблицы */
  @Prop(Array)
  tableColumns!: TableColumnType[]

  /** Объект операций для таблицы */
  @Prop(Object)
  tableActions!: TableActionsType

  /** Схема для работы с данными таблицы (create / update) */
  @Prop(Array)
  tableSchema!: TFormFieldGroup[]

  /** Объект с пагинацией */
  @Prop(Object)
  pagination?: PaginationType

  /** Возможность настраивать отображение колонок (default = false) */
  @Prop({ type: Boolean, default: false })
  columnControl!: boolean

  /** Вызов read после create, update, delete (default = true) */
  @Prop({ type: Boolean, default: true })
  autoRead!: boolean

  get paginationPageCount(): number {
    let pages = 0
    if (this.lPagination?.pageCount) {
      pages = this.lPagination?.pageCount
    } else if (this.lPagination?.limit && this.lPagination?.total) {
      pages = Math.ceil(this.lPagination?.total / this.lPagination?.limit)
    }
    return pages
  }

  get isModalNecessary(): boolean {
    const modalActions = Object.entries(this.tableActions)
      .filter(([_, action]) => action.mode === 'modal' || !action.mode)

    return !!modalActions.length
  }

  get isFilterAvailable(): boolean {
    return !!this.tableColumns.filter(column => column.filterable).length
  }

  get isFilterSelected(): boolean {
    return !!Object.values(this.filter).length
  }

  get actionsAvailableCount(): number | boolean {
    return Object.keys(this.tableActions)
      .filter((key) => !['create', 'read'].includes(key)).length
        || this.columnControl
        || this.isFilterAvailable
  }

  @Watch('pagination')
  paginationChanged(): void {
    this.lPagination = {
      page: this.pagination?.page || 1,
      limit: this.pagination?.limit || 10,
      total: this.pagination?.total || 0,
      pageCount: this.pagination?.pageCount || 0,
      pagerCount: this.pagination?.pagerCount || 5
    }
  }

  @Watch('visibleColumns')
  visibleColumnsChange(value: string[]): void {
    if (!this.$isServer) {
      localStorage.setItem('columns', JSON.stringify(value))
    }
  }

  handleRowCreate(): void {
    this.columnControlOpened = false
    this.clearActionHints()

    this.actionType = 'create'
    this.modalTitle = 'Создание'
    this.modalVisible = true
  }

  handleRowUpdate(rowData: object): void {
    this.columnControlOpened = false
    this.clearActionHints()

    this.model = { ...rowData }
    this.actionType = 'update'
    this.modalTitle = 'Редактирование'
    this.modalVisible = true
  }

  handleRowDelete(rowData: object, rowIndex: number): void {
    this.columnControlOpened = false
    this.clearActionHints()

    this.deletingIndex = rowIndex + 1
    this.model = { ...rowData }
    this.actionType = 'delete'
    this.modalTitle = 'Удаление'
    this.modalVisible = true
  }

  isFilterChange(): boolean {
    let isChanged = false

    for (const prop in this.tempFilter) {
      isChanged = this.filter[prop] !== this.tempFilter[prop]

      if (isChanged) break
    }

    return isChanged
  }

  async saveChanges(): Promise<void> {
    if (this.isFilterChange()) {
      this.lPagination.page = 1
      this.filter = { ...this.tempFilter }
      this.$emit('filter')
    }

    if (['create', 'update'].includes(this.actionType)) {
      await this.$refs.form.validate((valid: boolean | undefined) => {
        if (valid) {
          this.dispatchEmit()

          this.model = {}
          this.tempFilter = {}
          this.modalVisible = false
          this.filterVisible = false
        }
      })
    } else {
      this.dispatchEmit()

      this.model = {}
      this.tempFilter = {}
      this.modalVisible = false
      this.filterVisible = false
    }

    if (this.autoRead) {
      this.actionType = 'read'

      this.dispatchEmit()
    }
  }

  cancelChanges(): void {
    this.model = {}
    this.tempFilter = {}
    this.modalVisible = false
    this.filterVisible = false
  }

  handleLimitChange(): void {
    this.actionType = 'read'

    this.$emit('limit')

    this.dispatchEmit()
  }

  handleSortChange(sorting: { order: string | null, prop: string }): void {
    this.actionType = 'read'

    this.lPagination.page = 1
    const { order, prop } = sorting
    this.lSort = {
      order,
      prop,
    }

    this.$emit('sort')

    this.dispatchEmit()
  }

  handlePageChange(page: number): void {
    this.actionType = 'read'

    this.lPagination.page = page

    this.dispatchEmit()
  }

  dispatchEmit(): void {
    let url = this.tableActions[this.actionType].url
    const urlPath = new URL(this.tableActions[this.actionType].url).pathname
    const method = this.tableActions[this.actionType].method

    if (Object.values(this.model).some(value => value)) {
      const params: Token[] = parseUrlToRegExp(urlPath)
      params.forEach((param) => {
        if (typeof param !== 'string') {
          url = url.replace(`:${param.name}`, this.model[param.name])
        }
      })
    }

    this.$emit(this.actionType, {
      url,
      method,
      data: {
        model: { ...this.model },
        filter: { ...this.filter },
        sort: { ...this.lSort },
        pagination: { ...this.lPagination }
      }
    })
  }

  handleFilterOpen(column: TableColumnType): void {
    this.columnControlOpened = false
    this.clearActionHints()

    this.actionType = 'read'
    this.filterSchema = column.filterSchema

    if (Object.values(this.filter).some((value) => value)) {
      this.tempFilter = { ...this.filter }
    }

    this.filterVisible = true
  }

  handleFilterVisibleChange(visible: boolean): void {
    this.tempFilter = {}
    this.filterVisible = visible
  }

  handleFilterClear(): void {
    this.actionType = 'read'
    this.filter = {}

    this.dispatchEmit()
  }

  handleModalVisibleChange(visible: boolean): void {
    this.model = {}
    this.modalVisible = visible
  }

  handleColumnControl(): void {
    this.clearActionHints()
    this.columnControlOpened = !this.columnControlOpened
  }

  handleActionsVisibleChange(index: number): void {
    const oldValue = this.actionsOpened[index]
    this.columnControlOpened = false
    this.clearActionHints()
    this.$set(this.actionsOpened, index, !oldValue)
  }

  clearActionHints(): void {
    this.tableData.forEach((_, index) => {
      this.$set(this.actionsOpened, index, false)
    })
  }

  mounted(): void {
    let columns: string | string[] | null = localStorage.getItem('columns')
    if (columns) {
      const parsedColumns = JSON.parse(columns) as string[]
      parsedColumns.forEach((column, index) => {
        this.$set(this.visibleColumns, index, column)
      })
    } else {
      columns = this.tableColumns.map((column) => column.prop)
      localStorage.setItem('columns', JSON.stringify(columns))
      columns.forEach((column: string, index: number) => {
        this.$set(this.visibleColumns, index, column)
      })
    }
    this.clearActionHints()
  }

  dateToFormat = dateToFormat
}
</script>
