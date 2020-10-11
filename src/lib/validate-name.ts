import exitCodes from './exit-codes'
import prependSolidtechRN from './prepend-solidtechRN'
import { SolidtechRNToolbox } from '../types'

/**
 * Checks whether a plugin name was given and errors if not.
 * Also prepends `SolidtechRN-*` if plugin name didn't include it.
 */
export default (pluginName: string, toolbox: SolidtechRNToolbox): string => {
  const { strings, print } = toolbox

  pluginName = pluginName.toLowerCase()

  if (strings.isBlank(pluginName)) {
    print.info(`SolidtechRN plugin new SolidtechRN-foo\n`)
    print.error('Plugin name is required')
    process.exit(exitCodes.PLUGIN_NAME)
  }

  // TODO: Make this better at detecting invalid plugin names
  if (!/^[a-z0-9].*/i.test(pluginName)) {
    print.error('Plugin name should be a valid folder name')
    process.exit(exitCodes.PLUGIN_NAME)
  }

  // Force prepend `SolidtechRN-*` to plugin name
  return prependSolidtechRN(pluginName)
}
