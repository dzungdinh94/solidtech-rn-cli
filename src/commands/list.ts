import showPluginDirectory from '../lib/show-plugin-directory'

module.exports = {
  alias: ['ls'],
  description: 'Lists known SolidtechRN plugins.',
  run: showPluginDirectory,
}
