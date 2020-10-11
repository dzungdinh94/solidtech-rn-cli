import isSolidtechRNDirectory from '../lib/is-ignite-directory'
import attachSolidtechRN from '../lib/attach-solidtechRN'
import { SolidtechRNToolbox } from '../types'

module.exports = {
  description: 'Attaches SolidtechRN CLI to an existing project.',
  run: async function(toolbox: SolidtechRNToolbox) {
    const { print, meta } = toolbox

    // ensure we're in a supported directory
    if (isSolidtechRNDirectory(process.cwd())) {
      toolbox.print.info('🍻  Good news! This project is already SolidtechRN CLI-enabled!')
      return
    }

    await attachSolidtechRN(toolbox, { createdWith: meta.version(), boilerplate: 'empty', boilerplateVersion: '' })

    toolbox.print.info(`🔥  Good to go! Type ${print.colors.bold('ignite')} to get started.`)
  },
}
