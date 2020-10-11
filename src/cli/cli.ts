import * as minimist from 'minimist'
import { build, print } from 'gluegun'
import * as PrettyError from 'pretty-error'
const pe = new PrettyError()

const buildSolidtechCLI = () => {
  return build()
    .brand('solidtech-rn')
    .src(`${__dirname}/..`)
    .plugins(`${process.cwd()}/solidtech-rn/plugins`)
    .plugins(`${process.cwd()}/node_modules`, { matching: 'solidtech-rn-*', hidden: true })
    .create()
}

/**
 * Kick off a run.
 *
 * @param  {array} argv An array of command line arguments.
 * @return {RunContext} The gluegun RunContext
 */
module.exports = {
  run: async function run(argv) {
    // create a runtime
    let runtime
    try {
      runtime = buildSolidtechCLI()
    } catch (e) {
      console.log(pe.render(e))
      throw e // rethrow
    }

    // parse the command line
    const commandLine = minimist(argv.slice(2))

    if (commandLine.verbose && !commandLine.debug) {
      print.error('Use --debug instead of --verbose.')
      return
    }

    // run the command
    let toolbox
    try {
      toolbox = await runtime.run()
    } catch (e) {
      console.log(pe.render(e))
      throw e // rethrow
    }

    if (toolbox.error) {
      print.debug(toolbox.error)
    }

    // send it back to make testing easier
    return toolbox
  },
}
