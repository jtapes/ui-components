<template>
  <div class="s-content-loader">
    <svg
      :width="width"
      :height="height"
      :viewBox=" `0 0 ${width} ${height}`"
      version="1.1"
      :preserveAspectRatio="preserveAspectRatio"
    >
      <rect
        :style="{ fill: `url(${baseUrl}#${idGradient})` }"
        :clip-path="`url(${baseUrl}#${idClip})`"
        x="0"
        y="0"
        width="100%"
        height="100%"
      />

      <defs>
        <clipPath
          :id="idClip"
        >
          <!--  @slot Слот для контента  -->
          <slot>
            <rect
              x="0"
              y="0"
              rx="5"
              ry="5"
              width="100%"
              height="100%"
            />
          </slot>
        </clipPath>

        <linearGradient :id="idGradient">
          <stop
            offset="0%"
            :stop-color="primaryColor"
            :stop-opacity="primaryOpacity"
          >
            <animate
              v-if="animate"
              attributeName="offset"
              values="-2; 1"
              :dur="`${speed}s`"
              repeatCount="indefinite"
            />
          </stop>
          <stop
            offset="50%"
            :stop-color="secondaryColor"
            :stop-opacity="secondaryOpacity"
          >
            <animate
              v-if="animate"
              attributeName="offset"
              values="-1.5; 1.5"
              :dur="`${speed}s`"
              repeatCount="indefinite"
            />
          </stop>
          <stop
            offset="100%"
            :stop-color="primaryColor"
            :stop-opacity="primaryOpacity"
          >
            <animate
              v-if="animate"
              attributeName="offset"
              values="-1; 2"
              :dur="`${speed}s`"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { SContentLoaderType } from '@/lib-components/SContentLoader/SContentLoader.type'

/** Компонент для отображения загрузки контента */
@Component
export default class SContentLoader extends Vue {
  /** Высота */
  @Prop({ type: [String,Number], default: 200 })
  height!: SContentLoaderType

  /** Ширина */
  @Prop({ type: [String,Number], default: 200 })
  width!: SContentLoaderType

  /** Основной цвет */
  @Prop({ type: [String,Number], default: '#f4f4F4' })
  primaryColor!: SContentLoaderType

  /** Второй цвет */
  @Prop({ type: String, default: '#d9e2ec' })
  secondaryColor!: string

  /** Прозрачность основного цвета */
  @Prop({ type: [String,Number], default: 1 })
  primaryOpacity!: SContentLoaderType

  /** Прозрачность второго цвета */
  @Prop({ type: [String,Number], default: 0 })
  secondaryOpacity!: SContentLoaderType

  /** Скорость анимации - чем больше значение, тем скорость медленнее */
  @Prop({ type: [String,Number], default: 2 })
  speed!: SContentLoaderType

  /** Url для маски свг */
  @Prop({ type: String, default: '' })
  baseUrl!: string

  /** Включение анимации */
  @Prop({ type: Boolean, default: true })
  animate!: boolean

  /** Уникальный идентификатор */
  @Prop({ type: [String,Number] })
  uniqueKey?: string | number

  @Prop({ type: String, default: 'xMinYMin slice' })
  preserveAspectRatio!: string

  /** Генерация уникальных id */
  idGradient = this.uniqueKey
    ? `${this.uniqueKey}-idGradient`
    : Math.random().toString(36).substring(2)
  idClip = this.uniqueKey
    ? `${this.uniqueKey}-idClip`
    : Math.random().toString(36).substring(2)

}
</script>
