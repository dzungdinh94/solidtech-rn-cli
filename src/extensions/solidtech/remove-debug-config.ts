import exitCodes from '../../lib/exit-codes'
import { SolidtechRNToolbox } from '../../types'

export default (toolbox: SolidtechRNToolbox) => {
  /**
   * Remove Debug Config setting
   *
   * @param {string}  key Key of setting to be removed
   */
  function removeDebugConfig(key: string) {
    const { print, filesystem, SolidtechRN } = toolbox
    const debugConfig = `${process.cwd()}/App/Config/DebugConfig.js`

    if (!filesystem.exists(debugConfig)) {
      print.error(
        '💩 No `App/Config/DebugConfig.js` file found in this folder, are you sure it is an SolidtechRN project?',
      )
      process.exit(exitCodes.GENERIC)
    }

    if (SolidtechRN.patching.isInFile(debugConfig, key)) {
      SolidtechRN.patching.replaceInFile(debugConfig, key, '')
    } else {
      print.warning(`Debug Setting ${key} not found.`)
    }
  }

  return removeDebugConfig
}
