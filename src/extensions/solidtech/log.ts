import * as PrettyError from 'pretty-error'
import { SolidtechRNToolbox } from '../../types'

export default (toolbox: SolidtechRNToolbox) => {
  /**
   * Prints a debug message to the console.  Used when the user wants to run in --debug.
   *
   * @param {string|Object} message - The message to write
   */
  const pe = new PrettyError()
  function log(message: string) {
    const { parameters, print } = toolbox
    // jet if we're not running in debug mode
    if (!parameters.options.debug) return

    const date = new Date().toISOString().slice(11, 19)
    const prefix = print.colors.muted(date) + ' ' + print.colors.magenta('[SolidtechRN]')

    if (typeof message === 'object') {
      console.log(`${prefix}`)
      console.log(pe.render(message))
    } else {
      console.log(`${prefix} ${message}`)
    }
  }

  return log
}
