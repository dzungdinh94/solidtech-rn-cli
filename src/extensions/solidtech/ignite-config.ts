import { dissoc } from 'ramda'
import { SolidtechRNToolbox, SolidtechRNProjectConfig } from '../../types'

const IgniteConfigFilename = `./Ignite/Ignite.json`

export default (toolbox: SolidtechRNToolbox) => {
  const { filesystem } = toolbox

  /**
   * Reads the contents of the Ignite/Ignite.json configuration.
   */
  function loadIgniteConfig(): SolidtechRNProjectConfig {
    return filesystem.exists(IgniteConfigFilename) ? filesystem.read(IgniteConfigFilename, 'json') || {} : {}
  }

  /**
   * Saves a new Ignite config file.
   */
  function saveIgniteConfig(config: SolidtechRNProjectConfig = {}) {
    filesystem.write(IgniteConfigFilename, config, { jsonIndent: 2 })
  }

  /**
   * Sets an Ignite config setting. Takes an object or a key/value pair.
   */
  function setIgniteConfig(keyOrObject: string | object, value?: string) {
    const IgniteConfig = loadIgniteConfig()
    if (typeof keyOrObject === 'string') {
      IgniteConfig[keyOrObject] = value
    } else {
      Object.assign(IgniteConfig, keyOrObject)
    }
    saveIgniteConfig(IgniteConfig)
  }

  /**
   * Remove Global Config setting
   */
  function removeIgniteConfig(key: string) {
    const IgniteConfig = dissoc(key, loadIgniteConfig())
    saveIgniteConfig(IgniteConfig)
  }

  return {
    setIgniteConfig,
    removeIgniteConfig,
    saveIgniteConfig,
    loadIgniteConfig,
  }
}
