import { SolidtechRNToolbox } from '../../types'

export default (toolbox: SolidtechRNToolbox) => {
  /**
   * Removes a npm-based module from the project.
   */
  async function removeModule(moduleName: string, options: { unlink?: boolean; dev?: boolean } = {}) {
    const { print, system, SolidtechRN } = toolbox
    const { useYarn } = SolidtechRN

    print.info(`    ${print.checkmark} uninstalling ${moduleName}`)

    // unlink
    if (options.unlink) {
      print.info(`    ${print.checkmark} unlinking`)
      await system.spawn(`npx react-native unlink ${moduleName}`, {
        stdio: 'ignore',
      })
    }

    print.info(`    ${print.checkmark} removing`)
    // uninstall
    if (useYarn) {
      const addSwitch = options.dev ? '--dev' : ''
      await system.run(`yarn remove ${moduleName} ${addSwitch}`)
    } else {
      const uninstallSwitch = options.dev ? '--save-dev' : '--save'
      await system.run(`npm rm ${moduleName} ${uninstallSwitch}`)
    }
  }

  return removeModule
}
