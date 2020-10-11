import { SolidtechRNConfig, SolidtechRNToolbox } from '../types'
import * as R from 'ramda'
import detectedChanges from '../lib/detected-changes'
import detectInstall from '../lib/detect-install'
import importPlugin from '../lib/import-plugin'
import findPluginFile from '../lib/find-plugin-file'
import exitCodes from '../lib/exit-codes'

/**
 * Removes the solidtechRN plugin.
 */
const rollbackFailedSolidtechRNPlugin = async (moduleName: string, toolbox: SolidtechRNToolbox) => {
  const { print, system, solidtechRN } = toolbox

  print.warning('Rolling back...run with --debug to see more info')

  if (solidtechRN.useYarn) {
    await system.run(`yarn remove ${moduleName} --dev`)
  } else {
    await system.run(`npm rm ${moduleName} --save-dev`)
  }
}

module.exports = {
  description: 'Adds a plugin to your SolidtechRNd project',
  alias: ['a'],
  run: async function(toolbox: SolidtechRNToolbox) {
    // grab a fist-full of features...
    const { print, filesystem, prompt, solidtechRN, parameters, strings } = toolbox
    const { log } = solidtechRN

    const perfStart = new Date().getTime()

    log('running add command')
    const config = solidtechRN.loadSolidtechRNConfig()
    const currentGenerators = config.generators || {}

    // the thing we're trying to install
    if (strings.isBlank(parameters.first)) {
      const instructions = `An solidtechRN plugin is required.

Examples:
  solidtechRN add i18n
  solidtechRN add vector-icons
  solidtechRN add maps
  solidtechRN add gantman/solidtechRN-react-native-config
  solidtechRN add /path/to/plugin/you/are/building`
      print.info(instructions)
      process.exit(exitCodes.OK)
    }

    // find out the type of install
    const specs = detectInstall(parameters.first, toolbox)
    const moduleName = specs.moduleName
    const modulePath = `${process.cwd()}/node_modules/${moduleName}`

    log(`installing ${modulePath} from source ${specs.type}`)

    // import the solidtechRN plugin node module
    // const spinner = spin(`adding ${print.colors.cyan(moduleName)}`)
    const spinner = print.spin('')

    const exitCode = await importPlugin(toolbox, specs)
    if (exitCode) {
      spinner.stop()
      process.exit(exitCode)
    }

    // optionally load some configuration from the solidtechRN.json from the plugin.
    const solidtechRNPluginConfigPath = `${modulePath}/solidtechRN.json`
    const newConfig: SolidtechRNConfig = filesystem.exists(solidtechRNPluginConfigPath)
      ? filesystem.read(solidtechRNPluginConfigPath, 'json')
      : {}

    const proposedGenerators = (newConfig.generators || []).reduce((acc, k) => {
      acc[k] = moduleName
      return acc
    }, {})

    // we compare the generator config changes against ours
    const changes = detectedChanges(currentGenerators, proposedGenerators)
    if (changes.length > 0) {
      spinner.stop()
      // we warn the user on changes
      print.warning(`🔥  The following generators would be changed: ${R.join(', ', changes)}`)
      const ok = await prompt.confirm('You ok with that?')
      // if they refuse, then npm/yarn uninstall
      if (!ok) {
        await rollbackFailedSolidtechRNPlugin(moduleName, toolbox)
        process.exit(exitCodes.OK)
      }
      spinner.text = `adding ${print.colors.cyan(moduleName)}`
      spinner.start()
    }

    // ok, are we ready?
    try {
      let pluginFile: string = findPluginFile(toolbox, modulePath)
      if (pluginFile) {
        // bring the solidtechRN plugin to life
        log(`requiring solidtechRN plugin from ${modulePath}`)
        const pluginModule = require(pluginFile)

        if (!pluginModule.hasOwnProperty('add') || !pluginModule.hasOwnProperty('remove')) {
          spinner.fail(`'add' or 'remove' method missing.`)
          process.exit(exitCodes.PLUGIN_INVALID)
        }

        // set the path to the current running solidtechRN plugin
        solidtechRN.setSolidtechRNPluginPath(modulePath)

        // now let's try to run it
        try {
          // save new solidtechRN config if something changed
          if (proposedGenerators !== {}) {
            const combinedGenerators = Object.assign({}, currentGenerators, proposedGenerators)
            const updatedConfig = R.assoc('generators', combinedGenerators, solidtechRN.loadSolidtechRNConfig())
            solidtechRN.saveSolidtechRNConfig(updatedConfig)
          }

          spinner.stop()
          log(`running add() on solidtechRN plugin`)
          await pluginModule.add(toolbox)

          const perfDuration = parseInt(((new Date().getTime() - perfStart) / 10).toString(), 10) / 100

          spinner.text = `added ${print.colors.cyan(moduleName)} in ${perfDuration}s`
          spinner.start()
          spinner.succeed()

          // Sweet! We did it!
          return exitCodes.OK
        } catch (err) {
          // it's up to the throwers of this error to ensure the error message is human friendly.
          // to do this, we need to ensure all our core features like `addModule`, `addPluginComponentExample`, etc
          // all play along nicely.
          spinner.fail(err.message)
          process.exit(exitCodes.PLUGIN_INSTALL)
        }
      } else {
        spinner.fail(`${modulePath}/plugin.js does not exist.  skipping.`)
      }
      spinner.stop()
    } catch (err) {
      // we couldn't require the plugin, it probably has some nasty js!
      spinner.fail('problem loading the plugin JS')
      await rollbackFailedSolidtechRNPlugin(moduleName, toolbox)
      log(err)
      process.exit(exitCodes.PLUGIN_INVALID)
    }
  },
}
