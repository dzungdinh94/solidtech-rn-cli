import { SolidtechRNToolbox } from '../../types'
import { uniq } from 'ramda'

// Lists the additional places to look for plugins before falling back to npm.
const isWindows = process.platform === 'win32'
const homeDir = process.env[isWindows ? 'USERPROFILE' : 'HOME']

export default (toolbox: SolidtechRNToolbox) => {
  const { filesystem } = toolbox
  // grab ~/.SolidtechRN/overrides
  const overrideDir: string = filesystem.path(`${homeDir}`, '.SolidtechRN', 'overrides')

  // grab the environment var
  const envDir: string = process.env.SolidtechRN_PLUGIN_PATH || ''

  // sanitize & verify they exist
  return uniq(envDir.split(';').map(s => s.trim()))
    .map(s => `${overrideDir}${s}`)
    .filter(s => filesystem.exists(s))
}
