import detectInstall from './detect-install'
import importPlugin from './import-plugin'
import { SolidtechRNToolbox, SolidtechRNDetectInstall } from '../types'
import attachSolidtechRN from './attach-solidtechRN'

/**
 * Installs and runs an solidtechRN boilerplate.
 *
 * Overview:
 *
 *    * ensures we're not already in an solidtechRN directory
 *    * installs the boilerplate package
 *    * verifies that the boilerplate is legit
 *    * runs it
 *
 */
export default async (toolbox: SolidtechRNToolbox): Promise<boolean> => {
  const { print, solidtechRN, filesystem, parameters, meta } = toolbox

  solidtechRN.log('running boilerplate-install command')

  const boilerplateName: string = parameters.options.boilerplate || parameters.options.b

  // determine where the package comes from
  let installSource: SolidtechRNDetectInstall
  try {
    installSource = detectInstall(boilerplateName, toolbox)
  } catch (e) {
    print.error(e.message)
    return false
  }

  const { moduleName } = installSource
  const modulePath = `${process.cwd()}/node_modules/${moduleName}`
  const boilerplateJs = modulePath + '/boilerplate.js'
  const boilerplatePackage = modulePath + '/package.json'

  // install the plugin
  solidtechRN.log(`installing plugin ${moduleName} from ${installSource.type}`)
  const exitCode = await importPlugin(toolbox, installSource)
  if (exitCode) return false

  // start the spinner
  const spinner = print.spin('installing boilerplate')

  // read the info from the boilerplate
  solidtechRN.log(`reading boilerplate package.json`)
  type PackageJSON = { name: string; version: string } | void
  const packageJSON: PackageJSON = filesystem.read(boilerplatePackage, 'json')
  if (!packageJSON) {
    spinner.fail(`${moduleName} does not have a package.json`)
    return false
  }

  // ensure we can find the boilerplate.js file
  if (!filesystem.exists(boilerplateJs)) {
    spinner.fail(`${moduleName} does not have a boilerplate.js`)
    return false
  }

  // load the boilerplate.js module
  let pluginModule
  try {
    const boilerplatePath = `${modulePath}/boilerplate.js`
    solidtechRN.log(`loading boilerplate install script from ${boilerplatePath}`)
    pluginModule = require(boilerplatePath)
  } catch (e) {
    print.error('Error call stack:')
    print.error(e.stack)
    spinner.fail(`error loading the boilerplate`)
    return false
  }

  // must have an `install` function
  if (!pluginModule.hasOwnProperty('install')) {
    spinner.fail(`boilerplate.js is missing a 'install' function`)
    return false
  }

  // set the path to the current running solidtechRN plugin
  solidtechRN.setSolidtechRNPluginPath(modulePath)

  // stop the spinner
  spinner.stop()

  // run the boilerplate
  try {
    solidtechRN.log('running install function from boilerplate')
    await pluginModule.install(toolbox)
    solidtechRN.log('done running install function from boilerplate')
  } catch (e) {
    print.error(`an error occured while installing ${moduleName} boilerplate.`)
    print.error(e)
    return false
  }

  // attach SolidtechRN
  solidtechRN.log('attaching SolidtechRN')
  await attachSolidtechRN(toolbox, {
    createdWith: meta.version(),
    boilerplate: packageJSON.name,
    boilerplateVersion: packageJSON.version,
  })
  solidtechRN.log('boilerplate installed')
  return true
}
