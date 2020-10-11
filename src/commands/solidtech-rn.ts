import { GluegunToolbox } from 'gluegun'
module.exports = {
  description: '🔥 The SolidtechRN CLI 🔥',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters: { first },
      print: { error },
    } = toolbox
    if (first !== undefined) {
      error(`SolidtechRN '${first}' is not a command`)
    } else {
      return require('./help').run(toolbox)
    }
  },
}
