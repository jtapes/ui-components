'use strict'
const glob = require('glob')
const fs = require('fs')
const path = require('path')

async function svgSymbol(name, svg) {
  let attrs = svg.match(/<.+?>/)[0].match(/\w+?=".+?"/gm)
  attrs = attrs.reduce((acc, attr) => {
    attr = attr.split('=')
    acc[attr[0]] = attr[1]
    return acc
  }, {})
  svg = svg.replace(/[\r\n\t]/g, '').replace(/<svg[^>]*>([\s\S]*?)<\/svg>/, '$1')
  // eslint-disable-next-line
  return `<symbol id="${name.toLowerCase()}" ` + (attrs.viewBox ? `viewBox=${attrs.viewBox} ` : '') + (attrs.fill ? `fill=${attrs.fill}`: '') + `>${svg}</symbol>`
}

async function init(pathSvg, pathDist = null) {

  const json = []

  let svgSpriteTemplate = ''

  for (const filePath of glob.sync(path.resolve(`${pathSvg}/**/*.svg`))) {
    const fileName = filePath.split('/').reverse()[0]

    json.push(fileName)

    await fs.promises.readFile(filePath, 'utf-8')
      .then(async (file) => {
        svgSpriteTemplate += await svgSymbol(`${fileName.replace('.svg', '')}`, file)
      })
  }

  if (pathDist) {
    await fs.promises.writeFile(
      `${pathDist}/sprites.json`,
      JSON.stringify(json)
    )

    const xmlSpriteTemplate = '<?xml version="1.0" encoding="UTF-8"?>\n'
    const svgAttrsTemplate = 'version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
    await fs.promises.writeFile(
      `${pathDist}/sprites.svg`,
      `${xmlSpriteTemplate}<svg ${svgAttrsTemplate}>${svgSpriteTemplate}</svg>`
    )
  } else {
    throw Error('Output file path is required!')
  }
}

export default (options = {}) => {
  const { importFolder, outputFolder, hook = 'buildEnd' } = options

  return {
    name: 'generate-sprite',

    [hook]: async () => {
      await init(importFolder, outputFolder).then(() => {
        console.log('svg sprite create')
      })
    },
  }
}
