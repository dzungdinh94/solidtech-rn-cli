import { split, last, replace, head, match } from 'ramda'
import * as os from 'os'
import { SolidtechRNToolbox } from '../types'

const isWindows = process.platform === 'win32'
const isMac = process.platform === 'darwin'

module.exports = {
  description: 'Checks your dev environment for dependencies.',
  run: async function(toolbox: SolidtechRNToolbox) {
    // fistful of features
    const {
      filesystem: { separator },
      system: { run, which },
      print: { colors, info, table },
      strings: { padEnd },
      solidtechRN,
      runtime,
      meta,
    } = toolbox

    // display helpers
    const column1 = (label, length = 16) => padEnd(label || '', length)
    const column2 = label => colors.yellow(padEnd(label || '-', 10))
    const column3 = label => colors.muted(label)

    // -=-=-=- system -=-=-=-
    const platform = process.platform
    const arch = os.arch()
    const cpus = os.cpus() || []
    const firstCpu = head(cpus) || { model: undefined }
    const cpu = `${firstCpu.model}`
    const cores = `${cpus.length} cores`
    const directory = `${process.cwd()}`

    info(colors.cyan('System'))
    table([
      [column1('platform'), column2(platform), column3('')],
      [column1('arch'), column2(arch), column3('')],
      [column1('cpu'), column2(cores), column3(cpu)],
      [column1('directory'), column2(directory.split(separator).pop()), column3(directory)],
    ])

    // -=-=-=- javascript -=-=-=-
    const nodePath = which('node')
    const nodeVersion = replace('v', '', await run('node --version', { trim: true }))
    const npmPath = which('npm')
    const npmVersion = npmPath && (await run('npm --version', { trim: true }))
    let yarnPath = which('yarn')
    const yarnVersion = yarnPath && (await run('yarn --version', { trim: true }))
    yarnPath = yarnPath || 'not installed'

    info('')
    info(colors.cyan('JavaScript'))
    table([
      [column1('node'), column2(nodeVersion), column3(nodePath)],
      [column1('npm'), column2(npmVersion), column3(npmPath)],
      [column1('yarn'), column2(yarnVersion), column3(yarnPath)],
    ])

    // -=-=-=- solidtechRN -=-=-=-
    const solidtechRNPath = which('solidtechRN')
    const solidtechRNSrcPath = `${meta.src}`
    const solidtechRNVersion = await run('solidtechRN version', { trim: true })
    const solidtechRNJson = solidtechRN.loadSolidtechRNConfig()
    const installedGenerators = runtime.commands
      .filter(cmd => cmd.name === 'generate')
      .sort((a, b) => (a.commandPath.join(' ') < b.commandPath.join(' ') ? -1 : 1))
      .reduce((acc, k) => {
        k.plugin.commands.map(c => {
          if (c.plugin.name === k.plugin.name && k.plugin.name !== 'solidtechRN' && c.name !== 'generate') {
            if (!acc[c.name]) {
              acc[c.name] = [k.plugin.name]
            } else {
              acc[c.name].push(k.plugin.name)
            }
          }
        })
        return acc
      }, {})
    solidtechRNJson.generators = Object.assign({}, installedGenerators, solidtechRNJson.generators)

    info('')
    info(colors.cyan('SolidtechRN'))
    const solidtechRNTable = []
    solidtechRNTable.push([column1('solidtechRN-cli'), column2(solidtechRNVersion), column3(solidtechRNPath)])
    solidtechRNTable.push([
      column1('solidtechRN src'),
      column2(solidtechRNSrcPath.split(separator).pop()),
      column3(solidtechRNSrcPath),
    ])
    if (solidtechRNJson) {
      Object.keys(solidtechRNJson).forEach(k => {
        const v = typeof solidtechRNJson[k] === 'object' ? JSON.stringify(solidtechRNJson[k]) : solidtechRNJson[k]
        if (k === 'generators') {
          solidtechRNTable.push([column1(k), column2(' '), column3('')])
          Object.keys(solidtechRNJson[k]).forEach(t => {
            const l = Array.isArray(solidtechRNJson[k][t]) ? solidtechRNJson[k][t].join(', ') : solidtechRNJson[k][t]
            solidtechRNTable.push([column1(''), column2(t), column3(l)])
          })
        } else {
          solidtechRNTable.push([column1(k), column2(v), column3('')])
        }
      })
    }

    table(solidtechRNTable)

    // -=-=-=- android -=-=-=-
    const androidPath = process.env['ANDROID_HOME']
    const javaPath = which('java')
    const javaVersionCmd = isWindows ? 'java -version' : 'java -version 2>&1'
    const javaVersion = javaPath && last(match(/"(.*)"/, await run(javaVersionCmd)))

    info('')
    info(colors.cyan('Android'))
    table([
      [column1('java'), column2(javaVersion), column3(javaPath)],
      [column1('android home'), column2('-'), column3(androidPath)],
    ])

    // -=-=-=- iOS -=-=-=-
    if (isMac) {
      const xcodePath = which('xcodebuild')
      const xcodeVersion = xcodePath && split(/\s/, await run('xcodebuild -version', { trim: true }))[1] // lulz

      info('')
      info(colors.cyan('iOS'))
      table([[column1('xcode'), column2(xcodeVersion)]])

      const cocoaPodsPath = which('pod') || ''
      const cocoaPodsVersion = cocoaPodsPath ? await run('pod --version', { trim: true }) : 'Not installed'
      table([[column1('cocoapods'), column2(cocoaPodsVersion), column3(cocoaPodsPath)]])
    }

    // -=-=-=- windows -=-=-=-
    // TODO: what can we check on Windows?
    if (isWindows) {
      // info('')
      // info(colors.cyan('Windows'))
      // table([])
    }
  },
}
