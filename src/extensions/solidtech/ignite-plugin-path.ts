import { SolidtechRNToolbox } from '../../types'

export default (toolbox: SolidtechRNToolbox) => {
  /**
   * The current executing Ignite plugin path.
   */
  let pluginPath = null

  /**
   * Set the current executing Ignite plugin path.
   */
  function setIgnitePluginPath(path) {
    pluginPath = path
  }

  /**
   * Gets the path to the current running Ignite plugin.
   */
  function ignitePluginPath() {
    return pluginPath
  }

  return {
    setIgnitePluginPath,
    ignitePluginPath,
  }
}
