import { reduce, flatten, takeLast, split, map, replace } from 'ramda'
import * as path from 'path'
import { SolidtechRNToolbox, SolidtechRNPluginScreenFile } from '../../types'

export default (toolbox: SolidtechRNToolbox) => {
  /**
   * Generates example screens for in dev screens.
   *
   * example:
   * addScreenExamples([
   *   {title: 'Row Example', screen: 'Row.js', ancillary: ['file1', 'file2']},
   *   {title: 'Grid Example', screen: 'Grid.js', ancillary: ['file']},
   *   {title: 'Section Example', screen: 'Section.js', ancillary: ['file']},
   * ])
   */
  async function addPluginScreenExamples(files: SolidtechRNPluginScreenFile[], props = Object) {
    const { filesystem, SolidtechRN, print, template } = toolbox
    const { SolidtechRNPluginPath } = SolidtechRN

    const config = SolidtechRN.loadSolidtechRNConfig()
    // consider this being part of toolbox.SolidtechRN
    const pluginName = takeLast(1, split(path.sep, SolidtechRNPluginPath()))[0]

    // currently only supporting 1 form of examples
    if (config.examples === 'classic') {
      const spinner = print.spin(`▸ adding screen examples`)

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

      // generate stamped copy of all template files
      const templatePath = SolidtechRNPluginPath() ? `${SolidtechRNPluginPath()}/templates` : `templates`
      const allFilesGen = allFiles.map(fileName => {
        let templateFile
        if (fileName.endsWith('.ejs')) {
          templateFile = fileName
        } else {
          print.warning(
            `DEPRECATION WARNING: addPluginScreenExample called with '${fileName}' and no .ejs extension. Add .ejs to your template filename when calling this function.`,
          )
          templateFile = `${fileName}.ejs`
        }

        const fileNameNoExt = path.basename(templateFile, '.ejs')

        return template.generate({
          directory: templatePath,
          template: templateFile,
          target: `SolidtechRN/Examples/Containers/${pluginName}/${fileNameNoExt}`,
          props,
        })
      })
      await Promise.all(allFilesGen)

      // insert screen, route, and buttons in PluginExamples (if exists)
      const destinationPath = `${process.cwd()}/SolidtechRN/DevScreens/PluginExamplesScreen.js`
      map(file => {
        // turn things like "examples/This File-Example.js" into "ThisFileExample"
        // for decent component names
        const exampleFileName = takeLast(1, split(path.sep, file.screen))[0]
        const componentName = replace(/.js|\s|-/g, '', exampleFileName)

        if (filesystem.exists(destinationPath)) {
          // make sure we have RoundedButton
          SolidtechRN.patchInFile(destinationPath, {
            insert: `import RoundedButton from '../../App/Components/RoundedButton'`,
            after: 'import ExamplesRegistry',
          })

          // insert screen import
          SolidtechRN.patchInFile(destinationPath, {
            after: 'import ExamplesRegistry',
            insert: `import ${componentName} from '../Examples/Containers/${pluginName}/${file.screen}'`,
          })

          // insert screen route
          SolidtechRN.patchInFile(destinationPath, {
            insert: `  ${componentName}: {screen: ${componentName}, navigationOptions: {header: {visible: true}}},`,
            before: 'screen: PluginExamplesScreen',
          })

          // insert launch button
          SolidtechRN.patchInFile(destinationPath, {
            after: 'styles.screenButtons',
            insert: `
            <RoundedButton onPress={() => this.props.navigation.navigate('${componentName}')}>
              ${file.title}
            </RoundedButton>`,
          })
        } // if
      }, files)

      spinner.stop()
    }
  }

  return addPluginScreenExamples
}
