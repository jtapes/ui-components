const defaultPlugins = [
  ['component', { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' }]
]
const defaultPresets = [
  ['@babel/preset-env', { targets: { node: 'current' } }]
]
const devPresets = [
  '@vue/babel-preset-app'
]
const buildPresets = [
  ...defaultPresets,
  '@babel/preset-typescript',
]
module.exports = {
  plugins: [
    ...defaultPlugins,
    ['@babel/plugin-proposal-private-methods', { loose: true }],
    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
    ['@babel/plugin-syntax-dynamic-import', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
  presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
}
