import exitCodes from '../lib/exit-codes'
import validateName from '../lib/validate-name'
import { SolidtechRNToolbox, SolidtechRNCopyJob } from '../types'

/**
 * Does a walkthrough of questions and returns the answers as an object.
 *
 * @param {Object} toolbox The gluegun toolbox.
 * @returns {Object} The answers.
 */
const walkthrough = async (toolbox: SolidtechRNToolbox) => {
  const minOptions = { boilerplate: 'No', generator: 'No' }
  const maxOptions = { boilerplate: 'Yes', generator: 'Yes' }
  if (toolbox.parameters.options.min) {
    return minOptions
  }
  if (toolbox.parameters.options.max) {
    return maxOptions
  }

  // Okay, we'll ask one by one, fine
  return toolbox.prompt.ask([
    {
      name: 'boilerplate',
      message: 'Is this an app boilerplate plugin?',
      type: 'list',
      choices: ['No', 'Yes'],
    },
    {
      name: 'generator',
      message: 'Will your plugin have a generator command? (e.g. solidtechRN generate <mygenerator> <name>)',
      type: 'list',
      choices: ['No', 'Yes'],
    },
  ])
}

/**
 * Creates a new folder with the plugin files.
 *
 * @param {Object} toolbox The gluegun toolbox.
 */
const createNewPlugin = async (toolbox: SolidtechRNToolbox) => {
  const { parameters, print, solidtechRN, strings, meta } = toolbox
  const pluginName = validateName(parameters.second, toolbox)
  const name = strings.pascalCase(pluginName.replace(/^solidtechRN-/, ''))

  // Plugin generation walkthrough
  const answers = await walkthrough(toolbox)

  // Here we go!
  print.info(`Creating new plugin: ${pluginName}`)

  const copyJobs: SolidtechRNCopyJob[] = [
    { template: 'plugin/gitignore', target: `${pluginName}/.gitignore` },
    { template: 'plugin/plugin.js.ejs', target: `${pluginName}/plugin.js` },
    { template: 'plugin/solidtechRN.json.ejs', target: `${pluginName}/solidtechRN.json` },
    { template: 'plugin/package.json.ejs', target: `${pluginName}/package.json` },
    { template: 'plugin/README.md', target: `${pluginName}/README.md` },
    { template: 'plugin/test/add.js.ejs', target: `${pluginName}/test/add.js` },
    { template: 'plugin/test/remove.js.ejs', target: `${pluginName}/test/remove.js` },
    { template: 'plugin/test/interface.js.ejs', target: `${pluginName}/test/interface.js` },
    // generator command template example
    answers.generator === 'Yes' && {
      template: 'plugin/commands/thing.js.ejs',
      target: `${pluginName}/commands/generate/${pluginName}.js`,
    },
    answers.generator === 'Yes' && {
      template: 'plugin/templates/thing.js.ejs.ejs',
      target: `${pluginName}/templates/${pluginName}.js.ejs`,
    },
  ]
  if (answers.boilerplate === 'Yes') {
    copyJobs.push({ template: 'plugin/boilerplate.js.ejs', target: `${pluginName}/boilerplate.js` })
    copyJobs.push({ template: 'plugin/boilerplate/index.js.ejs.ejs', target: `${pluginName}/boilerplate/index.js.ejs` })
    copyJobs.push({ template: 'plugin/boilerplate/app/app.js', target: `${pluginName}/boilerplate/app/app.js` })
    copyJobs.push({
      template: 'plugin/boilerplate/tests/app.test.js',
      target: `${pluginName}/boilerplate/tests/app.test.js`,
    })
  }

  // copy over the files
  await solidtechRN.copyBatch(toolbox, copyJobs, {
    name,
    pluginName,
    answers,
    solidtechRNVersion: meta.version(),
    isGenerator: answers.generator === 'Yes',
  })
}

/**
 * Shows the command help.
 *
 * @param {Object} toolbox The gluegun toolbox.
 */
const showHelp = (toolbox: SolidtechRNToolbox) => {
  const instructions = `
Generates an SolidtechRN CLI-compatible plugin in the current folder.
Generally, you would run this from ./YourApp/solidtechRN/plugins/

Commands:
  solidtechRN plugin help
  solidtechRN plugin new <your-plugin>

Example:
  solidtechRN plugin new solidtechRN-mobx`
  toolbox.print.info(instructions)
  process.exit(exitCodes.OK)
}

module.exports = {
  alias: ['p'],
  description: 'Manages solidtechRN plugins',
  run: async function(toolbox: SolidtechRNToolbox) {
    const { parameters } = toolbox

    switch (parameters.first) {
      case 'new':
        await createNewPlugin(toolbox)
        break

      case 'help':
      default:
        showHelp(toolbox)
        break
    }
  },
}
