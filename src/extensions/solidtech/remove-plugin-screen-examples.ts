import { flatten, replace, reduce, takeLast, split } from 'ramda'
import * as path from 'path'
import { SolidtechRNToolbox, SolidtechRNPluginScreenFile } from '../../types'

export default (toolbox: SolidtechRNToolbox) => {
  /**
   * Remove example screens from dev screens.
   *
   * @param {Array} files - Array of Screens and properties
   *
   * example:
   * removeScreenExamples([
   *   {screen: 'Row.js', ancillary: ['file1', 'file2']},
   *   {screen: 'Grid.js', ancillary: ['file']},
   *   {screen: 'Section.js', ancillary: ['file']},
   * ])
   */
  async function removePluginScreenExamples(files: SolidtechRNPluginScreenFile[]) {
    const { filesystem, ignite, print } = toolbox
    const { ignitePluginPath, patching } = ignite

    const config = ignite.loadIgniteConfig()

    // consider this being part of toolbox.SolidtechRN
    const pluginName = takeLast(1, split(path.sep, ignitePluginPath()))[0]

    // currently only supporting 1 form of examples
    if (config.examples === 'classic') {
      const spinner = print.spin(`▸ removing screen examples`)

      // merge and flatten all dem files yo.
      let allFiles = reduce(
        (acc, v) => {
          acc.push(v.screen)
          if (v.ancillary) acc.push(v.ancillary)
          return flatten(acc)
        },
        [],
        files,
      )

      // delete all files that were inserted
      const delAll = allFiles.map(fileName =>
        filesystem.removeAsync(`SolidtechRN/Examples/Containers/${pluginName}/${fileName}`),
      )
      await Promise.all(delAll)

      // delete screen, route, and buttons in PluginExamples (if exists)
      const destinationPath = `${process.cwd()}/SolidtechRN/DevScreens/PluginExamplesScreen.js`
      files.map(file => {
        // turn things like "examples/This File-Example.js" into "ThisFileExample"
        // for decent component names
        const exampleFileName = takeLast(1, split(path.sep, file.screen))[0]
        const componentName = replace(/.js|\s|-/g, '', exampleFileName)

        if (filesystem.exists(destinationPath)) {
          // remove screen import
          patching.replaceInFile(
            destinationPath,
            `import ${componentName} from '../Examples/Containers/${pluginName}/${file.screen}'`,
            '',
          )

          // remove screen route
          patching.replaceInFile(
            destinationPath,
            `  ${componentName}: {screen: ${componentName}, navigationOptions: {header: {visible: true}}},`,
            '',
          )

          // remove launch button
          patching.replaceInFile(
            destinationPath,
            `<RoundedButton.+${componentName}.+[\\s\\S].+\\s*<\\/RoundedButton>`,
            '',
          )
        } // if
      })

      spinner.stop()
    }
  }

  return removePluginScreenExamples
}
