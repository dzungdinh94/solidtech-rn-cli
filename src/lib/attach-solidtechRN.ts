import { SolidtechRNToolbox, SolidtechRNProjectConfig } from '../types'

export default async function attachSolidtechRN(toolbox: SolidtechRNToolbox, projectConfig: SolidtechRNProjectConfig) {
  const { ignite, filesystem } = toolbox

  // save ignite config
  ignite.setIgniteConfig(projectConfig)

  // the plugins folder
  filesystem.write('ignite/plugins/.gitkeep', '')
}
