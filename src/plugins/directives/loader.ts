import Vue from 'vue'
import SLoader from '@/lib-components/SLoader/SLoader.vue'
import { DirectiveBinding } from 'vue/types/options'

const Loader = Vue.extend(SLoader)

interface LoaderParent extends HTMLElement {
  instance?: SLoader
}

function getStyle(el: HTMLElement, styleName: string) {
  const styles = getComputedStyle(el) as { [key: string]: any }

  return styles[styleName]
}

function updateStyles(parent: LoaderParent, el: HTMLElement) {
  const borderRadius = getStyle(parent, 'borderRadius')

  el.style.borderRadius = borderRadius
}

function toggleLoading(el: LoaderParent, loadingState: boolean) {
  const spinner = el.instance

  if (spinner) {
    if (loadingState) {
      updateStyles(el, spinner.$el as HTMLElement)

      spinner.$data.visible = true
      el.classList.add('s-loader--relative')
      el.appendChild(spinner.$el)
    } else {
      spinner.$data.visible = false
      spinner.$once('after-leave', () => {
        el.classList.remove('s-loader--relative')
      })
    }
  }
}

export default () => {
  Vue.directive('loading', {
    bind(el: LoaderParent, binding: DirectiveBinding) {
      const group = binding.modifiers.group
      const input = binding.modifiers.input
      const text = typeof binding.value === 'object' ? binding.value.text : null

      el.instance = new Loader({
        el: document.createElement('div'),
        data: {
          group,
          input,
          text,
        },
      })

      const loadingState =
        typeof binding.value === 'object'
          ? binding.value.loading
          : binding.value

      if (loadingState) {
        toggleLoading(el, loadingState)
      }
    },
    update(el: LoaderParent, binding: DirectiveBinding) {
      const group = binding.modifiers.group
      const input = binding.modifiers.input
      const text = typeof binding.value === 'object' ? binding.value.text : null

      const loadingState =
        typeof binding.value === 'object'
          ? binding.value.loading
          : binding.value

      const oldLoadingState =
        typeof binding.oldValue === 'object'
          ? binding.oldValue.loading
          : binding.oldValue

      if (el.instance) {
        el.instance.$set(el.instance, 'group', group)
        el.instance.$set(el.instance, 'input', input)
        el.instance.$set(el.instance, 'text', text)
      }

      if (oldLoadingState !== loadingState) {
        toggleLoading(el, loadingState)
      }
    },
    unbind(el: LoaderParent) {
      if (el.instance) {
        el.instance.$destroy()
      }
    },
  })
}
