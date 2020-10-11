import { dissoc } from 'ramda'
import { SolidtechRNToolbox, SolidtechRNProjectConfig } from '../../types'

const SolidtechRNConfigFilename = `./SolidtechRN/SolidtechRN.json`

export default (toolbox: SolidtechRNToolbox) => {
  const { filesystem } = toolbox

  /**
   * Reads the contents of the SolidtechRN/SolidtechRN.json configuration.
   */
  function loadSolidtechRNConfig(): SolidtechRNProjectConfig {
    return filesystem.exists(SolidtechRNConfigFilename) ? filesystem.read(SolidtechRNConfigFilename, 'json') || {} : {}
  }

  /**
   * Saves a new SolidtechRN config file.
   */
  function saveSolidtechRNConfig(config: SolidtechRNProjectConfig = {}) {
    filesystem.write(SolidtechRNConfigFilename, config, { jsonIndent: 2 })
  }

  /**
   * Sets an SolidtechRN config setting. Takes an object or a key/value pair.
   */
  function setSolidtechRNConfig(keyOrObject: string | object, value?: string) {
    const SolidtechRNConfig = loadSolidtechRNConfig()
    if (typeof keyOrObject === 'string') {
      SolidtechRNConfig[keyOrObject] = value
    } else {
      Object.assign(SolidtechRNConfig, keyOrObject)
    }
    saveSolidtechRNConfig(SolidtechRNConfig)
  }

  /**
   * Remove Global Config setting
   */
  function removeSolidtechRNConfig(key: string) {
    const SolidtechRNConfig = dissoc(key, loadSolidtechRNConfig())
    saveSolidtechRNConfig(SolidtechRNConfig)
  }

  return {
    setSolidtechRNConfig,
    removeSolidtechRNConfig,
    saveSolidtechRNConfig,
    loadSolidtechRNConfig,
  }
}
