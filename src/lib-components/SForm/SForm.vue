<template>
  <validation-observer ref="form" tag="form" class="s-form">
    <template v-for="(block, block_i) in schema">
      <template v-if="typeof block === 'string'">
        <slot :name="`slot-${block}`" />
      </template>
      <div
        v-else-if="
          isObject(block) &&
            (!block.condition || (block.condition && block.condition()))
        "
        :key="block_i"
        :class="`fields-group mb-40${
          block.groupClass ? ' ' + block.groupClass : ''
        }`"
      >
        <div class="d-f ai-c" :class="{ 'mb-24': block.title }">
          <legend v-if="block.title" class="text bold">
            {{ block.title }}
          </legend>
          <s-hint v-if="block.hint" :content="block.hint" />
        </div>
        <div
          class="fields-group__block"
          :class="
            block.layout === 'row'
              ? `fields-group__block--row`
              : isObject(block.layout)
                ? `fields-group__block--${block.layout.type}`
                : ''
          "
          :style="
            isObject(block.layout) && block.layout.type === 'row' && block.layout.gutter
              ? `
                margin-left: -${block.layout.gutter / 2}px;
                margin-right: -${block.layout.gutter / 2}px;
                `
              : isObject(block.layout) && block.layout.type === 'grid-column'
                ? `
                  grid-template-columns: repeat(${block.layout.columnCount}, 1fr);
                  grid-template-rows: repeat(${Math.ceil(
                    (block.maxLength
                      ? block.fields.slice(0, block.maxLength)
                      : block.fields
                    ).length / block.layout.columnCount
                )}, 1fr);
                  `
                : isObject(block.layout) && block.layout.type === 'table'
                  ? `
                  grid-auto-flow: ${
                    block.layout.flow ? block.layout.flow : 'column'
                  };
                  grid-template-rows: repeat(${
                    block.layout.ratio.split(':')[0]
                  }, auto);
                  grid-template-columns: repeat(${
                    block.layout.ratio.split(':')[1]
                  }, 1fr);
                  ${
                    block.layout.gaps
                      ? (block.layout.gaps.column
                        ? `grid-column-gap: ${block.layout.gaps.column};`
                        : '') +
                        (block.layout.gaps.row
                          ? `grid-row-gap: ${block.layout.gaps.row};`
                          : '')
                      : ''
                  }`
                  : ``
          "
        >
          <template
            v-for="(field, field_i) in block.maxLength
              ? block.fields.slice(0, block.maxLength)
              : block.fields"
          >
            <s-form-item
              v-if="isObject(field)"
              :key="`field-${field_i}`"
              :ref="`formItem_${block_i}_${field_i}`"
              :name="field.valueName"
              :validation-mode="field.validationMode"
              :immediate="field.immediate"
              :mask="field.mask"
              :value="value[field.valueName]"
              :class="`fields-group__field mb-20${
                field.classes ? ' ' + field.classes.join(' ') : ''
              }`"
              :style="getFieldStyles(block, field_i)"
              :component="`s-${field.itemType}`"
              v-bind="field.options ? field.options : []"
              :rules="field.rules
                ? Object.fromEntries(field.rules.map((rule) => [rule.name, rule.params]))
                : {}
              "
              :slots="field.slots ? field.slots : []"
              @change="handleValueChange($event, field)"
            />
            <div
              v-else
              :key="`field-${field_i}`"
              class="fields-group__field mb-20"
              :style="getFieldStyles(block, field_i)"
            >
              <slot :name="`field-${field}`" />
            </div>
          </template>
          <div
            v-if="isBlockError"
            class="mt-8 color-danger"
          >
            {{ block.errorMessage }}
          </div>
        </div>
      </div>
    </template>
  </validation-observer>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model } from 'vue-property-decorator'
import { TFormFieldItem, TFormFieldGroup } from '@/lib-components/SForm/SForm.type'
import SFormItem from '@/lib-components/SFormItem/SFormItem.vue'
import SHint from '@/lib-components/SHint/SHint.vue'
import { isObject } from '@/utils/utils'
import { ValidationObserver } from 'vee-validate'

export enum EFormFieldComplexLayout {
  GRID_COLUMN = 'grid-column',
  TABLE = 'table',
}

export type TFormSchema = Array<string | TFormFieldGroup>
export type FormValidateType = () => Promise<boolean>
export type FormResetValidateType = () => void

@Component({
  components: {
    SFormItem,
    SHint,
    ValidationObserver
  },
})
export default class SForm extends Vue {
  @Model('change')
  value!: any

  @Prop({
    type: Array,
    validator: (val: any[]) =>
      val.every((el) => typeof el === 'string' || isObject(el)),
  })
  schema!: TFormSchema

  $refs!: {
    form: InstanceType<typeof ValidationObserver>
  }

  isBlockError = false
  validate!: FormValidateType
  resetValidation!: FormResetValidateType

  mounted(): void {
    this.$watch(() => this.$refs.form.errors, (val: Record<string, string[]>) => {
      if (val) {
        this.isBlockError = Object.values(val).some((errorsArray) => errorsArray.length)
      }
    }, { deep: true })

    this.validate = this.$refs.form.validate
    this.resetValidation = this.$refs.form.reset
  }

  handleValueChange(value: any, field: TFormFieldItem): void {
    if (typeof field === 'object') {
      const newValue = { ...this.value }
      newValue[field.valueName] = value
      this.$emit('change', newValue)
    }
  }

  getFieldStyles(block: string | TFormFieldGroup, fieldIndex: number): string {
    if (typeof block !== 'string') {
      return isObject(block.layout) && typeof block.layout !== 'string' &&
      block.layout.type === 'row' && block.layout.gutter
        ? `
          padding-left: ${block.layout.gutter / 2}px;
          padding-right: ${block.layout.gutter / 2}px;
        `
        : isObject(block.layout) && typeof block.layout !== 'string' &&
        block.layout.type === EFormFieldComplexLayout.TABLE &&
        block.layout.collapses &&
        Object.keys(block.layout.collapses).includes(String(fieldIndex))
          ? (block.layout.collapses[fieldIndex].column
          ? `grid-column: ${block.layout.collapses[fieldIndex].column}`
          : '') +
          (block.layout.collapses[fieldIndex].row
            ? `grid-row: ${block.layout.collapses[fieldIndex].row}`
            : '')
          : ''
    }
    return ''
  }

  isObject = isObject
}
</script>
