import { SolidtechRNToolbox } from '../../types'

export default (toolbox: SolidtechRNToolbox) => {
  /**
   * The current executing SolidtechRN plugin path.
   */
  let pluginPath = null

  /**
   * Set the current executing SolidtechRN plugin path.
   */
  function setSolidtechRNPluginPath(path) {
    pluginPath = path
  }

  /**
   * Gets the path to the current running SolidtechRN plugin.
   */
  function SolidtechRNPluginPath() {
    return pluginPath
  }

  return {
    setSolidtechRNPluginPath,
    SolidtechRNPluginPath,
  }
}
