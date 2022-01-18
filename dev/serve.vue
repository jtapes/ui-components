<script lang="ts">
import Vue from 'vue'
// Uncomment import and local "components" registration if library is not registered globally.
// import { MarketUilibrarySample } from '@/entry.esm';
import SForm from '@/lib-components/SForm/SForm.vue'
import SButton from '@/lib-components/SButton/SButton.vue'

export default Vue.extend({
  name: 'ServeDev',
  components: {
    SForm,
    SButton,
  },
  data: () => ({
    model: {},
    schema: [{
      name: 'schemaName',
      title: 'schemaTitle',
      layout: 'column',
      errorMessage: 'errmsg test',
      fields: [
        {
          name: '123',
          itemType: 'input',
          valueName: 'inputValue',
          options: {
            placeholder: 'qweq',
          },
          rules: [
            {
              name: 'required'
            },
            {
              name: 'max',
              params: [5]
            }
          ]
        },
        {
          name: '456',
          itemType: 'input',
          valueName: 'inputValueTest',
          options: {
            placeholder: 'test',
          },
          rules: [
            {
              name: 'required',
            },
            {
              name: 'max',
              params: [5],
            },
            {
              name: 'min',
              params: [3],
            },
          ],
        },
      ],
    }],
  }),
  methods: {
    validateForm() {
      this.$refs.form.validate({ silent: false })
    }
  }
})
</script>

<template>
  <div id="app">
    <div class="s-container">
      <s-button @click="validateForm">
        validate
      </s-button>
      <s-form ref="form" v-model="model" :schema="schema" />
    </div>
  </div>
</template>
