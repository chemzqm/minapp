// 参考： parcel 会获取本地的 babelrc 文件，同时对其中的 presets 和 plugins 去重（避免 babel 重复处理）
// 要使用 transform-runtime 需要手动在项目中安装 babel-runtime 或 @babel/runtime
import {Compiler} from '../Compiler'
import * as fs from 'fs-extra'
import * as path from 'path'

const babel = 'babel-' // v7.x 会改成 @babel/

const defaultPresets = [
  'env',
  'es2015',
  'es2016',
  'es2017',
  'latest',
  'stage-0',
  'stage-1',
  'stage-2',
  'stage-3',
]

const defaultPlugins: Array<string | any[]> = []

export function babelrc(compiler: Compiler) {
  let plugins = [...defaultPlugins]

  // 检查 babel-runtime 是否有安装在本地
  let moduleName = [`${babel}-runtime`].find(k => fs.existsSync(path.join(compiler.modulesDir, k)))
  if (moduleName) plugins.push(['transform-runtime', {moduleName, polyfill: false}])

  return {
    presets: defaultPresets.map(p => require.resolve(`${babel}preset-${p}`)),
    plugins: plugins.map(p => {
      let name = Array.isArray(p) ? p[0] : p
      let opts = Array.isArray(p) ? p[1] : {}
      return [require.resolve(`${babel}plugin-${name}`), opts]
    })
  }
}
