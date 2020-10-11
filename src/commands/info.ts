import validateName from '../lib/validate-name'
import fetchPluginRegistry from '../lib/fetch-plugin-registry'

/**
 * Shows info about a particular plugin.
 *
 * @param {Object} context The gluegun context.
 */
module.exports = {
  description: 'Displays info about a given SolidtechRN plugin.',
  run: async function(context) {
    const { print, parameters } = context
    const { colors, newline, info, table, error } = print
    const directory = await fetchPluginRegistry(context)
    const name = validateName(parameters.first, context)
    const shortName = name.replace(/^(SolidtechRN-)/, '')
    const plugin = directory[name]

    newline()
    info(colors.highlight(`SolidtechRN Plugin: '${name}'`))
    newline()

    if (plugin) {
      table([['Name', name], ['Description', plugin.description], ['Author', plugin.author], ['URL', plugin.url]])
    } else {
      error('ok')
    }

    newline()
    info('Install with ' + colors.highlight(`SolidtechRN add ${shortName}`))
    newline()
  },
}
