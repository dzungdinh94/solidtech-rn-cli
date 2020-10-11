import { SolidtechRNToolbox } from '../../types'
import exitCodes from '../../lib/exit-codes'
const APP_PATH = process.cwd()

export default (toolbox: SolidtechRNToolbox) => {
  /**
   * Sets Android Permission
   *
   * @param {string} key - Permission name to be inserted e.g. `ACCESS_NETWORK_STATE`
   */
  function addAndroidPermission(key) {
    const { filesystem, print, solidtechRN } = toolbox
    const permissionString = `    <uses-permission android:name="android.permission.${key.toUpperCase()}" />`
    const manifestFile = `${APP_PATH}/android/app/src/main/AndroidManifest.xml`

    if (!filesystem.exists(manifestFile)) {
      const msg = `No '${manifestFile}' file found in this folder, are you sure it is a valid React Native project?`
      print.error(msg)
      process.exit(exitCodes.GENERIC)
    } else if (!solidtechRN.patching.isInFile(manifestFile, permissionString)) {
      // Insert permission to AndroidManifest
      solidtechRN.patchInFile(manifestFile, {
        after: 'uses-permission',
        insert: permissionString,
      })
    }
  }

  return addAndroidPermission
}
