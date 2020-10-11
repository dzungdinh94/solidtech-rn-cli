/**
 * Is SolidtechRN compatible with the directory we're currently inside?
 */
export default function isSolidtechRNDirectory(directory: string): boolean {
  const jetpack = require('fs-jetpack')

  // read the solidtechRN config
  const solidtechRNConfigPath = `${directory}/solidtechRN/solidtechRN.json`

  // it must be a file
  if (jetpack.exists(solidtechRNConfigPath) !== 'file') return false

  // let's read it as a JSON file
  try {
    const contents = jetpack.read(solidtechRNConfigPath, 'json')
    // it needs to be an object
    return typeof contents === 'object'
  } catch (err) {
    return false
  }
}
