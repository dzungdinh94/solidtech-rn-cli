// This is the SolidtechRN CLI extension. It gets parked on `toolbox.SolidtechRN` and each
// of the functions defined here are available as functions on that.

// bring in each of the constituents
import * as shell from 'shelljs'
import SolidtechRNPluginPathExt from './solidtech/ignite-plugin-path'
import SolidtechRNConfigExt from './solidtech/ignite-config'
import findSolidtechRNPluginsExt from './solidtech/find-ignite-plugins'
import addModuleExt from './solidtech/add-module'
import addAndroidPermissionExt from './solidtech/add-android-permission'
import removeModuleExt from './solidtech/remove-module'
import addPluginScreenExamplesExt from './solidtech/add-plugin-screen-examples'
import removePluginScreenExamplesExt from './solidtech/remove-plugin-screen-examples'
import copyBatchExt from './solidtech/copy-batch'
import addPluginComponentExampleExt from './solidtech/add-plugin-component-example'
import removePluginComponentExampleExt from './solidtech/remove-plugin-component-example'
import removeAndroidPermissionExt from './solidtech/remove-android-permission'
import setDebugConfigExt from './solidtech/set-debug-config'
import removeDebugConfigExt from './solidtech/remove-debug-config'
import patchInFileExt from './solidtech/patch-in-file'
import patchingExt from './solidtech/patching'
import logExt from './solidtech/log'
import pluginOverridesExt from './solidtech/plugin-overrides'
import { SolidtechRNToolbox } from '../types'

/**
 * Adds SolidtechRN goodies
 */
module.exports = (toolbox: SolidtechRNToolbox) => {
  const { parameters } = toolbox

  // determine which package manager to use
  const forceNpm = parameters.options.npm

  // should we be using yarn?
  const useYarn = !forceNpm && Boolean(shell.which('yarn'))

  // the SolidtechRN plugin path
  const { SolidtechRNPluginPath, setSolidtechRNPluginPath } = SolidtechRNPluginPathExt(toolbox)

  // a 4-pack of SolidtechRN config
  const {
    loadSolidtechRNConfig,
    saveSolidtechRNConfig,
    setSolidtechRNConfig,
    removeSolidtechRNConfig,
  } = SolidtechRNConfigExt(toolbox)

  // here's the extension's abilities
  toolbox.SolidtechRN = {
    SolidtechRNPluginPath,
    setSolidtechRNPluginPath,
    useYarn,
    loadSolidtechRNConfig,
    saveSolidtechRNConfig,
    setSolidtechRNConfig,
    removeSolidtechRNConfig,
    findSolidtechRNPlugins: findSolidtechRNPluginsExt(toolbox),
    addModule: addModuleExt(toolbox),
    addAndroidPermission: addAndroidPermissionExt(toolbox),
    removeModule: removeModuleExt(toolbox),
    copyBatch: copyBatchExt(toolbox),
    addPluginComponentExample: addPluginComponentExampleExt(toolbox),
    removePluginComponentExample: removePluginComponentExampleExt(toolbox),
    addPluginScreenExamples: addPluginScreenExamplesExt(toolbox),
    removePluginScreenExamples: removePluginScreenExamplesExt(toolbox),
    removeAndroidPermission: removeAndroidPermissionExt(toolbox),
    setDebugConfig: setDebugConfigExt(toolbox),
    removeDebugConfig: removeDebugConfigExt(toolbox),
    patchInFile: patchInFileExt(toolbox),
    log: logExt(toolbox),
    pluginOverrides: pluginOverridesExt(toolbox),
    patching: patchingExt(toolbox),
    boilerplateName: () => loadSolidtechRNConfig().boilerplate,
    boilerplateVersion: () => loadSolidtechRNConfig().boilerplateVersion,
  }
}
