import { SolidtechRNToolbox } from '../../types'

export default (toolbox: SolidtechRNToolbox) => {
  /**
   * Removes the component example.
   */
  function removePluginComponentExample(fileName: string) {
    const { filesystem, ignite, print } = toolbox
    print.info(`    ${print.checkmark} removing component example`)
    // remove file from Components/Examples folder
    filesystem.remove(`${process.cwd()}/SolidtechRN/Examples/Components/${fileName}`)
    // remove reference in usage example screen (if it exists)
    const destinationPath = `${process.cwd()}/SolidtechRN/DevScreens/PluginExamplesScreen.js`
    if (filesystem.exists(destinationPath)) {
      ignite.patching.replaceInFile(destinationPath, `import '../Examples/Components/${fileName}`, '')
    }
  }

  return removePluginComponentExample
}
